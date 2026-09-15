"use client";

import React from "react";
import TechInfoModal, { BulletItem } from "./TechInfoModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const BULLETS: BulletItem[] = [
  { text: "AI for load pattern recognition in rural grids" },
  { text: "Blockchain-based energy credit validation" },
  { text: "Flexible storage control algorithms for PNG topographies" },
  { text: "Next-gen panel durability testing under tropical climate extremes" },
];

export default function ResearchCoDevelopment({ isOpen, onClose }: Props) {
  return (
    <TechInfoModal
      isOpen={isOpen}
      onClose={onClose}
      title="Research & Co-Development"
      titleDash="- We believe that no single player has all the answers. That's why GREEN seeks out:"
      subtitle="We co-create value with clients through a model that emphasizes"
      imageSide="right"
      imageSrc="/images/technology-innovation-alliances/modal_research_co_dev.png"
      imageAlt="Research & Co-Development"
      bullets={BULLETS}
      quote="“Our goal : Build a future-proof ecosystem that outperforms today’s limitations.”"
    />
  );
}
