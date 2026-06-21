"use client";
import React from "react";
import TechInfoModal from "./TechInfoModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subHeadline: string;
  description: string;
  img: { alt: string; src: string };
  keys: { text: string; highlighted: string }[];
  quote: { text: string; highlighted: string };
}

const ResearchCoDevelopment = ({
  isOpen,
  onClose,
  title,
  subHeadline,
  description,
  img,
  keys,
  quote,
}: Props) => (
  <TechInfoModal
    isOpen={isOpen}
    onClose={onClose}
    title={title || "Research & Co-Development"}
    subHeadline={subHeadline}
    description={description}
    img={img}
    fallbackImg="/images/technology-innovation-alliances/researchdevelopment.png"
    keys={keys}
    quote={quote}
  />
);

export default ResearchCoDevelopment;
