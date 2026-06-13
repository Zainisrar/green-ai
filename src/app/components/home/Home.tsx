import React from "react";
import D6Template from "../D6Template";

interface GreenHeroSectionProps {
  slug: string;
}

const GreenHeroSection: React.FC<GreenHeroSectionProps> = ({ slug }) => {
  return (
    <>
      <D6Template slug={slug} />
    </>
  );
};

export default GreenHeroSection;
