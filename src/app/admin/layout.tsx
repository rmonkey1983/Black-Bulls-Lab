import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import AdminLayoutClient from "./AdminLayoutClient";

export const metadata: Metadata = {
  title: "Admin Panel | Black Bulls Lab",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";

  // Allow standalone login page to render directly without wrapping in admin shell
  if (pathname === "/admin/login" || pathname.startsWith("/admin/login")) {
    return <>{children}</>;
  }

  // Server-side strict authorization check
  const auth = await requireAdmin();
  if (!auth.authorized) {
    redirect("/admin/login");
  }

  return <AdminLayoutClient adminEmail={auth.email}>{children}</AdminLayoutClient>;
}
