"use client";

import React from "react";
import ProductEnquiry from "@/app/components/Product/Modals/ProductEnquiry";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const BookTechnicalDebrief = ({ isOpen, onClose }: Props) => {
  return (
    <ProductEnquiry
      isOpen={isOpen}
      onClose={onClose}
      productName="Sustainability & ESG Commitments"
      titlePrefix="BOOK A"
      titleAccent="TECHNICAL DEBRIEF"
      subtitle="Schedule a technical debrief on GREEN's sustainability frameworks and ESG commitments."
      interestLabel="WHAT WOULD YOU LIKE TO REVIEW?"
      interestOptions={[
        "Environmental Stewardship",
        "Social Responsibility",
        "Ethical Governance",
        "ESG Reporting & KPIs",
        "Other",
      ]}
      submitButtonText="Book Technical Debrief"
    />
  );
};

export default BookTechnicalDebrief;
