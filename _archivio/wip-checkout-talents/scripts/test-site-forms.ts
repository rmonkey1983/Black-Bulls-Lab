import assert from "node:assert/strict";

// All outbound requests are intercepted. Never load production credentials here.
async function main() {
  process.env.NEXT_PUBLIC_SUPABASE_URL = "https://audit.invalid";
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "audit-anon";
  process.env.SUPABASE_SERVICE_ROLE_KEY = "audit-service";
  process.env.RESEND_API_KEY = "re_audit";
  delete process.env.STRIPE_SECRET_KEY;

  const requests: { url: URL; body: unknown; headers: Headers }[] = [];
  let dbError = false;
  let mailError = false;
  let leadDbError = false;
  let rpcError = false;
  let event: Record<string, unknown> | null = null;
  globalThis.fetch = async (input, init) => {
    const url = new URL(typeof input === "string" ? input : input instanceof URL ? input.href : input.url);
    requests.push({ url, body: init?.body ? JSON.parse(String(init.body)) : null, headers: new Headers(init?.headers) });
    if (url.hostname === "api.resend.com") {
      return Response.json(mailError ? { message: "Simulated mail failure", name: "validation_error" } : { id: "mail-test" }, { status: mailError ? 422 : 200 });
    }
    assert.equal(url.hostname, "audit.invalid", "Unexpected outbound request");
    if (url.pathname.endsWith("/rpc/fulfill_site_checkout")) {
      return rpcError ? Response.json({ message: "Simulated transaction failure" }, { status: 500 }) : Response.json({ success: true, booking_id: "audit", replayed: false });
    }
    if (url.pathname.endsWith("/contact_requests")) {
      return leadDbError ? Response.json({ message: "Simulated missing table", code: "PGRST205" }, { status: 404 }) : new Response(null, { status: init?.method === "POST" ? 201 : 204 });
    }
    if (url.pathname.endsWith("/liar_system_waitlist")) return init?.method === "POST" ? new Response(null, { status: 201 }) : Response.json(null);
    if (url.pathname.endsWith("/events")) return Response.json(event);
    if (url.pathname.endsWith("/golden_voice_casting")) {
      return dbError ? Response.json({ message: "Simulated DB failure", code: "42501" }, { status: 403 }) : new Response(null, { status: 201 });
    }
    throw new Error(`Unexpected request: ${url.pathname}`);
  };

  const { submitContactForm } = await import("../src/app/actions/contact");
  const { submitCasting } = await import("../src/app/actions/casting");
  const { POST: contact } = await import("../src/app/api/contact/route");
  const { POST: corporate } = await import("../src/app/api/corporate/contact/route");
  const { POST: checkout } = await import("../src/app/api/checkout/route");
  const { POST: corporateCheckout } = await import("../src/app/api/checkout/corporate/route");
  const request = (body: unknown) => new Request("http://localhost:3000/api/contact", { method: "POST", body: JSON.stringify(body) });
  let passed = 0;
  async function check(name: string, run: () => Promise<void>) {
    requests.length = 0;
    await run();
    passed++;
    console.log(`PASS ${name}`);
  }
  const valid = { name: "Audit <test>", email: "audit@example.com", leadType: "contact" as const, message: "Richiesta di prova" };
  await check("contact validates malformed data before delivery", async () => {
    for (const value of [null, { ...valid, email: "@" }, { ...valid, leadType: "toString" }, { ...valid, message: " " }, { ...valid, b_contact_name: "bot" }]) {
      assert.equal((await submitContactForm(value as typeof valid)).success, false);
    }
    assert.equal(requests.length, 0);
  });
  const mails = () => requests.filter(({ url }) => url.hostname === "api.resend.com");
  const leadRows = () => requests.filter(({ url }) => url.pathname.endsWith("/contact_requests"));
  await check("all four contact types send once and escape HTML", async () => {
    for (const leadType of ["contact", "corporate", "private", "partner"] as const) {
      assert.equal((await submitContactForm({ ...valid, leadType })).success, true);
    }
    assert.equal(mails().length, 4);
    assert.ok(mails().every(({ body }) => JSON.stringify((body as { to: unknown }).to) === '["eventi@blackbullslab.it"]'));
    assert.ok(JSON.stringify(mails()[0].body).includes("&lt;test&gt;"));
  });
  await check("contact is stored before the email, then marked accepted", async () => {
    assert.equal((await submitContactForm({ ...valid, leadType: "corporate", company: "Audit", phone: "+390000000000", guests: "42" })).success, true);
    assert.equal(requests.length, 3);
    assert.ok(requests[0].url.pathname.endsWith("/contact_requests"));
    const row = requests[0].body as Record<string, unknown>;
    assert.equal(row.lead_type, "corporate");
    assert.equal(row.name, "Audit <test>");
    assert.equal(row.phone, "+390000000000");
    assert.deepEqual(row.details, { guests: "42" });
    assert.deepEqual(requests[2].body, { email_status: "accepted" });
    assert.ok(requests[2].url.search.includes(String(row.id)));
  });
  await check("mail failure keeps the stored contact and marks it failed", async () => {
    mailError = true;
    assert.equal((await submitContactForm(valid)).success, true);
    assert.deepEqual(leadRows()[1].body, { email_status: "failed" });
    mailError = false;
  });
  await check("missing contact table still delivers by email", async () => {
    leadDbError = true;
    assert.equal((await submitContactForm(valid)).success, true);
    assert.equal(mails().length, 1);
    assert.equal(leadRows().length, 1);
  });
  await check("contact reports failure only when storage and email both fail", async () => {
    mailError = true;
    assert.equal((await submitContactForm(valid)).success, false);
    mailError = false;
    leadDbError = false;
  });
  await check("missing mail key still stores the contact", async () => {
    const key = process.env.RESEND_API_KEY;
    delete process.env.RESEND_API_KEY;
    assert.equal((await submitContactForm(valid)).success, true);
    assert.equal(mails().length, 0);
    process.env.RESEND_API_KEY = key;
  });
  await check("contact API rejects malformed JSON and forwards honeypot", async () => {
    assert.equal((await contact(new Request("http://localhost", { method: "POST", body: "{" }))).status, 400);
    assert.equal((await contact(request(null))).status, 400);
    assert.equal((await contact(request({ ...valid, b_contact_name: "bot" }))).status, 400);
    assert.equal(requests.length, 0);
  });
  await check("corporate API preserves guest count", async () => {
    assert.equal((await corporate(request({ ...valid, company: "Audit", phone: "+390000000000", guests: "42" }))).status, 200);
    assert.ok(JSON.stringify(mails()[0].body).includes("42"));
  });
  const casting = (extra: Record<string, string> = {}) => {
    const data = new FormData();
    Object.entries({ name: "Audit <test>", email: "audit@example.com", phone: "+390000000000", signature_song: "Brano <test>", age: "", media_link: "", ...extra }).forEach(([key, value]) => data.set(key, value));
    return data;
  };
  await check("casting optional age uses null and saves before notification", async () => {
    assert.equal((await submitCasting(casting())).success, true);
    assert.equal(requests.length, 2);
    assert.ok(requests[0].url.pathname.endsWith("/golden_voice_casting"));
    assert.equal((requests[0].body as { age: unknown }[])[0].age, null);
    assert.ok(JSON.stringify(requests[1].body).includes("&lt;test&gt;"));
  });
  await check("casting rejects invalid age, email and unsafe links", async () => {
    for (const extra of [{ age: "-1" }, { age: "1.5" }, { email: "@" }, { media_link: "javascript:alert(1)" }] as Record<string, string>[]) {
      assert.equal((await submitCasting(casting(extra))).success, false);
    }
    assert.equal(requests.length, 0);
  });
  await check("casting DB failure does not send email", async () => {
    dbError = true;
    assert.equal((await submitCasting(casting())).success, false);
    assert.equal(requests.length, 1);
    dbError = false;
  });
  await check("casting mail failure preserves successful submission", async () => {
    mailError = true;
    assert.equal((await submitCasting(casting())).success, true);
    assert.equal(requests.length, 2);
    mailError = false;
  });
  const purchase = { eventId: "serata-test", quantity: 1, customerName: "Audit Test", customerEmail: "audit@example.com" };
  await check("checkout rejects invalid payloads before external requests", async () => {
    for (const body of [null, { ...purchase, quantity: 11 }, { ...purchase, eventId: "x,id.neq.y" }]) assert.equal((await checkout(request(body))).status, 400);
    assert.equal((await corporateCheckout(request(null))).status, 400);
    assert.equal(requests.length, 0);
  });
  await check("checkout uses slug equality without UUID OR cast", async () => {
    event = null;
    assert.equal((await checkout(request(purchase))).status, 404);
    assert.equal(requests[0].url.searchParams.get("slug"), "eq.serata-test");
    assert.equal(requests[0].url.searchParams.has("or"), false);
  });
  await check("checkout UUID uses ID equality", async () => {
    const id = "00000000-0000-4000-8000-000000000001";
    assert.equal((await checkout(request({ ...purchase, eventId: id }))).status, 404);
    assert.equal(requests[0].url.searchParams.get("id"), `eq.${id}`);
  });
  await check("checkout refuses unavailable, past and unpriced events", async () => {
    for (const [row, status] of [
      [{ available_slots: 0, price: 30 }, 409],
      [{ event_date: "2000-01-01", price: 30 }, 409],
      [{ available_slots: 10 }, 500],
    ] as const) {
      event = row;
      assert.equal((await checkout(request({ ...purchase, price: 0.01 }))).status, status);
    }
  });
  const { POST: waitlist } = await import("../src/app/api/liar-system/waitlist/route");
  process.env.WAITLIST_TURNSTILE_ENABLED = "false";
  await check("waitlist rejects missing consent and ignores bot requests", async () => {
    assert.equal((await waitlist(request({ name: "Audit", email: "audit@example.com", phone: "+390000000000", event_consent: false }))).status, 400);
    assert.equal((await waitlist(request({ website: "bot" }))).status, 200);
    assert.equal(requests.length, 0);
  });
  await check("waitlist saves consent and normalized phone without marketing opt-in", async () => {
    assert.equal((await waitlist(request({ name: "Audit", email: "AUDIT@example.com", phone: "333 000 0000", event_consent: true }))).status, 201);
    const saved = requests.at(-1)?.body as { email: string; phone_e164: string; marketing_consent: boolean }[];
    assert.equal(saved[0].email, "audit@example.com");
    assert.equal(saved[0].phone_e164, "+393330000000");
    assert.equal(saved[0].marketing_consent, false);
  });
  process.env.STRIPE_SECRET_KEY = "sk_test_audit";
  process.env.STRIPE_WEBHOOK_SECRET = "whsec_audit";
  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe("sk_test_audit");
  const { POST: webhook } = await import("../src/app/api/webhook/checkout/route");
  const delivery = (paid = true) => {
    const payload = JSON.stringify({ id: "evt_audit", type: "checkout.session.completed", data: { object: {
      id: "cs_test_audit", payment_status: paid ? "paid" : "unpaid", amount_total: 4000,
      customer_details: { email: "audit@example.com", name: "Audit" }, created: 1000,
      metadata: { eventId: "00000000-0000-4000-8000-000000000001", quantity: "2", guestNames: '["Secondo"]' },
    } } });
    return new Request("http://localhost:3000/api/webhook/checkout", { method: "POST", body: payload, headers: {
      "stripe-signature": stripe.webhooks.generateTestHeaderString({ payload, secret: "whsec_audit" }),
    } });
  };
  await check("unsigned or unpaid checkout never creates tickets", async () => {
    assert.equal((await webhook(request({}))).status, 400);
    assert.equal((await webhook(delivery(false))).status, 200);
    assert.equal(requests.length, 0);
  });
  await check("paid checkout uses transaction then correct event email", async () => {
    event = { event_date: "2030-12-20T19:30:00+01:00", location_name: "Audit venue" };
    assert.equal((await webhook(delivery())).status, 200);
    assert.ok(requests[0].url.pathname.endsWith("/rpc/fulfill_site_checkout"));
    assert.deepEqual((requests[0].body as { p_guest_names: string[] }).p_guest_names, ["Audit", "Secondo"]);
    const email = requests.find(r => r.url.hostname === "api.resend.com")?.body as { from: string; html: string };
    assert.equal(email.from, "Black Bulls Lab <info@blackbullslab.com>");
    assert.ok(email.html.includes("dicembre"));
    assert.ok(email.html.includes("19:30"));
    assert.ok(email.html.includes("https://blackbullslab.com/success"));
    assert.equal(requests.find(r => r.url.hostname === "api.resend.com")?.headers.get("Idempotency-Key"), "checkout/cs_test_audit");
  });
  await check("failed booking transaction prevents notification and asks Stripe to retry", async () => {
    rpcError = true;
    assert.equal((await webhook(delivery())).status, 500);
    assert.equal(requests.length, 1);
    rpcError = false;
  });
  await check("email failure asks Stripe to retry after atomic fulfillment", async () => {
    mailError = true;
    assert.equal((await webhook(delivery())).status, 500);
    assert.ok(requests[0].url.pathname.endsWith("/rpc/fulfill_site_checkout"));
    mailError = false;
  });
  console.log(`${passed} regression checks passed; no real email, booking or DB write.`);
}

main().catch(error => { console.error(error); process.exitCode = 1; });
