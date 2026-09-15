"use client";

import React from "react";
import ProductEnquiry from "@/app/components/Product/Modals/ProductEnquiry";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const RequestEngineeringDossier = ({ isOpen, onClose }: Props) => {
  return (
    <ProductEnquiry
      isOpen={isOpen}
      onClose={onClose}
      productName="Sustainability & ESG Commitments"
      titlePrefix="REQUEST OUR"
      titleAccent="ENGINEERING DOSSIER"
      subtitle="Receive the comprehensive engineering dossier and ESG impact metrics."
      interestLabel="PURPOSE / SYSTEM OF INTEREST"
      interestOptions={[
        "Comprehensive ESG Engineering Dossier",
        "Renewable Transition Framework",
        "Carbon Accounting & Offsets",
        "Governance & Supply Chain ESG",
        "Other",
      ]}
      submitButtonText="Request Dossier"
    />
  );
};

export default RequestEngineeringDossier;
