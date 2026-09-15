"use client";

import ProductEnquiry from "@/app/components/Product/Modals/ProductEnquiry";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

/** The Join the Network CTA intentionally shares the Elements enquiry dialog. */
export default function JoinTheNetwork({ isOpen, onClose }: Props) {
  return (
    <ProductEnquiry
      isOpen={isOpen}
      onClose={onClose}
      productName="Women in Energy"
      titlePrefix="JOIN THE"
      titleAccent="NETWORK"
      interestLabel="AREA OF INTEREST"
      interestOptions={[
        "Women in Energy",
        "Partnerships",
        "Training and mentorship",
        "Career opportunities",
      ]}
      defaultInterest="Women in Energy"
      subtitle="Tell us how you would like to connect with GREEN."
      submitButtonText="JOIN THE NETWORK"
    />
  );
}
