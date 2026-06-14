"use client";

import React from "react";
import GreenHeroSection from "@/app/components/home/Home";
import StructuredData from "@/app/components/StructuredData";
import { organizationStructuredData, websiteStructuredData } from "@/app/lib/structured-data";

const page = () => {
  return (
    <React.Fragment>
      <StructuredData data={organizationStructuredData} />
      <StructuredData data={websiteStructuredData} />
      <GreenHeroSection slug="/home/renewable-energy-the-core" />
    </React.Fragment>
  );
};

export default page;
