"use client";

import React from "react";
import TechInfoModal, { BulletItem } from "./TechInfoModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const BULLETS: BulletItem[] = [
  {
    prefix: "Smart Grid Platforms:",
    text: "AI analytics partners for ",
    highlight: "GRID-INTEL™",
  },
  {
    prefix: "Battery Providers:",
    text: "Tier-1 lithium, LFP, and hybrid chemistries",
  },
  {
    prefix: "Controller Innovators:",
    text: "Modular microgrid and demand response units",
  },
  {
    prefix: "Remote Sensing:",
    text: "Satellite + drone-based mapping alliances",
  },
  {
    prefix: "Digital Twins:",
    text: "Simulation partners for design & predictive ops",
  },
];

export default function CurrentTechnologyCollaborators({
  isOpen,
  onClose,
}: Props) {
  return (
    <TechInfoModal
      isOpen={isOpen}
      onClose={onClose}
      title="Current Technology Collaborators"
      titleDash="- Partnered pilots and prototypes include:"
      subtitle="We co-create value with clients through a model that emphasizes"
      imageSide="left"
      imageSrc="/images/technology-innovation-alliances/modal_current_collaborators.png"
      imageAlt="Current Technology Collaborators"
      bullets={BULLETS}
      quote="“Our goal : Build a future-proof ecosystem that outperforms today’s limitations.”"
    />
  );
}
