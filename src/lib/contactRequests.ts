import { randomUUID } from "node:crypto";
import { getStrictSupabaseAdmin } from "./supabase";

// Server-side only: uses the service role. Never import from a client component.
const TIMEOUT_MS = 5000;

export interface ContactRequestRow {
  lead_type: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string;
  details: Record<string, string>;
}

/** Returns the saved row id, or null when the request could not be stored. */
export async function saveContactRequest(row: ContactRequestRow): Promise<string | null> {
  const id = randomUUID();
  try {
    const { error } = await getStrictSupabaseAdmin()
      .from("contact_requests")
      .insert({ id, ...row })
      .abortSignal(AbortSignal.timeout(TIMEOUT_MS));
    if (error) {
      console.error("Contact request not stored:", error.code || "unknown error");
      return null;
    }
    return id;
  } catch (error) {
    console.error("Contact request not stored:", error instanceof Error ? error.name : "unknown error");
    return null;
  }
}

/** Best effort: a failed update never affects the visitor's request. */
export async function setContactEmailStatus(id: string, status: "accepted" | "failed"): Promise<void> {
  try {
    const { error } = await getStrictSupabaseAdmin()
      .from("contact_requests")
      .update({ email_status: status })
      .eq("id", id)
      .abortSignal(AbortSignal.timeout(TIMEOUT_MS));
    if (error) console.error("Contact email status not stored:", error.code || "unknown error");
  } catch (error) {
    console.error("Contact email status not stored:", error instanceof Error ? error.name : "unknown error");
  }
}
