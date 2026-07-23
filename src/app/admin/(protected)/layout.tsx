import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import AdminLayoutClient from "../AdminLayoutClient";

export const dynamic = "force-dynamic";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = await requireAdmin();

  if (!auth.authorized) {
    redirect("/admin/login");
  }

  return <AdminLayoutClient adminEmail={auth.email}>{children}</AdminLayoutClient>;
}
