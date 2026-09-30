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
  { text: "AI for load pattern recognition in rural grids" },
  { text: "Blockchain-based energy credit validation" },
  { text: "Flexible storage control algorithms for PNG topographies" },
  { text: "Next-gen panel durability testing under tropical climate extremes" },
];

export default function ResearchCoDevelopment({
  isOpen,
  onClose,
  data,
}: Props) {
  const bullets =
    data?.keys?.map((key) => ({
      text: key.text,
      highlight: key.highlighted,
    })) ?? BULLETS;
  return (
    <TechInfoModal
      isOpen={isOpen}
      onClose={onClose}
      title={data?.title ?? "Research & Co-Development"}
      titleDash={`- ${data?.subHeadline ?? "We believe that no single player has all the answers. That's why GREEN seeks out:"}`}
      subtitle={
        data?.description ??
        "We co-create value with clients through a model that emphasizes"
      }
      imageSide="right"
      imageSrc={
        data?.img?.src ??
        "/images/technology-innovation-alliances/modal_research_co_dev.png"
      }
      imageAlt={data?.img?.alt ?? "Research & Co-Development"}
      bullets={bullets}
      quote={
        data?.quote?.text ??
        "“Our goal : Build a future-proof ecosystem that outperforms today’s limitations.”"
      }
    />
  );
}
