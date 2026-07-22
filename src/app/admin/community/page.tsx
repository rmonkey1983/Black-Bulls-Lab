import CommunityDashboardClient from "@/app/admin/community/CommunityDashboardClient";

export const metadata = {
  title: "Crescita Community | Black Bulls Lab",
  robots: { index: false, follow: false },
};

export default function CommunityPage() {
  return <CommunityDashboardClient />;
}
