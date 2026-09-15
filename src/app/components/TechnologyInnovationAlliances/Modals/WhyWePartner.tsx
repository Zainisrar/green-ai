"use client";

import React from "react";
import TechInfoModal, { BulletItem } from "./TechInfoModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const BULLETS: BulletItem[] = [
  { text: "Next-generation solar & storage technologies" },
  { text: "AI-driven energy management solutions" },
  { text: "Off-grid microgrid controllers" },
  { text: "Smart meters, IoT, and remote diagnostics tools" },
  { text: "Advanced manufacturing or material innovations" },
];

export default function WhyWePartner({ isOpen, onClose }: Props) {
  return (
    <TechInfoModal
      isOpen={isOpen}
      onClose={onClose}
      title="Why We Partner"
      titleDash="- We believe that no single player has all the answers. That's why GREEN seeks out:"
      subtitle="We co-create value with clients through a model that emphasizes"
      imageSide="right"
      imageSrc="/images/technology-innovation-alliances/modal_why_we_partner.png"
      imageAlt="Why We Partner"
      bullets={BULLETS}
      quote="“Our goal : Build a future-proof ecosystem that outperforms today’s limitations.”"
    />
  );
}
