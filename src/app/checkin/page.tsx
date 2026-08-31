import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import CheckinClient from "./CheckinClient";

export const dynamic = "force-dynamic";

export default async function CheckinPage() {
  const auth = await requireAdmin();

  if (!auth.authorized) {
    redirect(`/admin/login?next=${encodeURIComponent("/checkin")}`);
  }

  return <CheckinClient />;
}
