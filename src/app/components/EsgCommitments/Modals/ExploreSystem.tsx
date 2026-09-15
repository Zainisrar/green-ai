"use client";

import React from "react";
import ProductEnquiry from "@/app/components/Product/Modals/ProductEnquiry";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ExploreSystem = ({ isOpen, onClose }: Props) => {
  return (
    <ProductEnquiry
      isOpen={isOpen}
      onClose={onClose}
      productName="Sustainability & ESG Commitments"
      titlePrefix="EXPLORE A SYSTEM"
      titleAccent="BUILT FOR YOUR REALITY"
      subtitle="Consult with our engineering team on clean energy architectures tailored to your operational realities."
      interestLabel="SYSTEM / ARCHITECTURE OF INTEREST"
      interestOptions={[
        "Solar EPCM & Hybrid Integration",
        "Industrial Energy Storage",
        "Microgrid & Off-Grid Infrastructure",
        "Smart Grid & Dispatch Automation",
        "Turnkey Clean Energy Architecture",
      ]}
      submitButtonText="Explore Solutions"
    />
  );
};

export default ExploreSystem;
