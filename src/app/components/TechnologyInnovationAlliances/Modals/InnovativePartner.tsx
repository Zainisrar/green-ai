"use client";

import React from "react";
import TechInfoModal, { BulletItem } from "./TechInfoModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const BULLETS: BulletItem[] = [
  { text: "Startups seeking scale and field validation" },
  { text: "Universities and research institutes with active grants" },
  { text: "Corporate R&D looking for deployment labs" },
  { text: "NGOs with impact-driven tech pilots" },
];

export default function InnovativePartner({ isOpen, onClose }: Props) {
  return (
    <TechInfoModal
      isOpen={isOpen}
      onClose={onClose}
      title="Become an Innovation Partner"
      titleDash="- We believe that no single player has all the answers. That's why GREEN seeks out:"
      subtitle="We co-create value with clients through a model that emphasizes"
      imageSide="left"
      imageSrc="/images/technology-innovation-alliances/modal_innovation_partner.png"
      imageAlt="Become an Innovation Partner"
      bullets={BULLETS}
      quote="“Our goal : Build a future-proof ecosystem that outperforms today’s limitations.”"
    />
  );
}
