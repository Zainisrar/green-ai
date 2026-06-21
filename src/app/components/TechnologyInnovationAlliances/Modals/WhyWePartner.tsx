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

const WhyWePartner = ({ isOpen, onClose, title, subHeadline, description, img, keys, quote }: Props) => (
  <TechInfoModal
    isOpen={isOpen}
    onClose={onClose}
    title={title || "Why We Partner"}
    subHeadline={subHeadline}
    description={description}
    img={img}
    fallbackImg="/images/technology-innovation-alliances/whywepartner.png"
    keys={keys}
    quote={quote}
  />
);

export default WhyWePartner;
