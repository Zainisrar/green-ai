"use client";

import React from 'react'
import GreenHeroSection from '@/app/components/home/Home';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const page = ({ params }: PageProps) => {
  const { slug } = React.use(params);
  const fullSlug = `/home/${slug}`;
  
  return (
    <React.Fragment>
      <GreenHeroSection slug={fullSlug} />
    </React.Fragment>
  )
}

export default page