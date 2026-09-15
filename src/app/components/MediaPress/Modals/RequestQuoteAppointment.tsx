"use client";

import ProductEnquiry from "@/app/components/Product/Modals/ProductEnquiry";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const RequestQuoteAppointment = ({ isOpen, onClose }: Props) => {
  return (
    <ProductEnquiry
      isOpen={isOpen}
      onClose={onClose}
      titlePrefix="REQUEST QUOTE /"
      titleAccent="APPOINTMENT"
      defaultInterest="Media & Press Inquiries"
      interestLabel="PROJECT / SERVICE INTEREST"
      interestOptions={[
        "Solar Energy Solutions",
        "Microgrid Solutions",
        "Grid Integration",
        "Energy Storage",
        "ESG & Sustainability",
        "Media & Press Inquiries",
        "Other",
      ]}
    />
  );
};

export default RequestQuoteAppointment;
