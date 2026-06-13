import Product from "@/app/components/Product/Product";
import React from "react";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const page = async ({ params }: PageProps) => {
  const { slug } = await params;
  
  return (
    <React.Fragment>
      <Product slug={slug} />
    </React.Fragment>
  );
};

export default page;
