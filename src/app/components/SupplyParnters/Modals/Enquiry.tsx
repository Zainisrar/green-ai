"use client";

import React from "react";
import ProductEnquiry from "@/app/components/Product/Modals/ProductEnquiry";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const Enquiry = ({ isOpen, onClose }: Props) => {
  return (
    <ProductEnquiry
      isOpen={isOpen}
      onClose={onClose}
      titlePrefix="SUPPLY"
      titleAccent="ENQUIRY"
      interestLabel="PRODUCT / SYSTEM OF INTEREST"
    />
  );
};

export default Enquiry;
