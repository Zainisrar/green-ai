import ClientPartnerships from "@/app/components/ClientPartnerships/ClientPartnerships";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ClientPartnerSubPage({ params }: Props) {
  const { slug } = await params;

  if (slug === "partner-with-green") {
    redirect("/engage/partner-with-us");
  }

  if (slug === "login" || slug === "client-login") {
    redirect("/client-value-engineering");
  }

  return <ClientPartnerships />;
}
