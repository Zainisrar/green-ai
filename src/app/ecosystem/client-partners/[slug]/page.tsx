import ClientPartnerships from "@/app/components/ClientPartnerships/ClientPartnerships";
import { redirect } from "next/navigation";

export const revalidate = 86400;

export function generateStaticParams() {
  return [
    { slug: "partner-with-green" },
    { slug: "login" },
    { slug: "client-login" },
    { slug: "industries-we-serve" },
    { slug: "partner-success-stories" },
    { slug: "client-testimonials" },
  ];
}

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
