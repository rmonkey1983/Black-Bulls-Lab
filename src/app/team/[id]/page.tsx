import { Metadata } from "next";
import { teamMembers } from "@/lib/teamData";
import { notFound } from "next/navigation";
import { TeamMemberClient } from "./TeamMemberClient";

interface TeamMemberPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return teamMembers.map((member) => ({
    id: member.id,
  }));
}

export async function generateMetadata({
  params,
}: TeamMemberPageProps): Promise<Metadata> {
  const { id } = await params;
  const member = teamMembers.find((m) => m.id === id);

  if (!member) return {};

  return {
    title: member.name,
    description: member.bio.substring(0, 155),
    openGraph: {
      title: `${member.name} | Black Bulls Lab`,
      description: member.bio.substring(0, 155),
      images: [{ url: member.imageUrl || "/og-image.jpg" }],
    },
  };
}

export default async function TeamMemberPage({ params }: TeamMemberPageProps) {
  const { id } = await params;
  const member = teamMembers.find((m) => m.id === id);

  if (!member) {
    notFound();
  }

  return <TeamMemberClient member={member} />;
}
