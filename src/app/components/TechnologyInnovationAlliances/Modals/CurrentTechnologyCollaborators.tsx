"use client";

import React from "react";
import type { TIAModal } from "@/app/hooks/useTechnologyInnovationAlliances";
import TechInfoModal, { BulletItem } from "./TechInfoModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: TIAModal;
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
  data,
}: Props) {
  const bullets =
    data?.keys?.map((key) => ({ prefix: key.text, text: key.highlighted })) ??
    BULLETS;
  return (
    <TechInfoModal
      isOpen={isOpen}
      onClose={onClose}
      title={data?.title ?? "Current Technology Collaborators"}
      titleDash={`- ${data?.subHeadline ?? "Partnered pilots and prototypes include:"}`}
      subtitle={
        data?.description ??
        "We co-create value with clients through a model that emphasizes"
      }
      imageSide="left"
      imageSrc={
        data?.img?.src ??
        "/images/technology-innovation-alliances/modal_current_collaborators.png"
      }
      imageAlt={data?.img?.alt ?? "Current Technology Collaborators"}
      bullets={bullets}
      quote={
        data?.quote?.text ??
        "“Our goal : Build a future-proof ecosystem that outperforms today’s limitations.”"
      }
    />
  );
}
