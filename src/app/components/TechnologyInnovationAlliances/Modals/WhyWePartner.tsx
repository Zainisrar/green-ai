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
  { text: "Next-generation solar & storage technologies" },
  { text: "AI-driven energy management solutions" },
  { text: "Off-grid microgrid controllers" },
  { text: "Smart meters, IoT, and remote diagnostics tools" },
  { text: "Advanced manufacturing or material innovations" },
];

export default function WhyWePartner({ isOpen, onClose, data }: Props) {
  const bullets =
    data?.keys?.map((key) => ({
      text: key.text,
      highlight: key.highlighted,
    })) ?? BULLETS;
  return (
    <TechInfoModal
      isOpen={isOpen}
      onClose={onClose}
      title={data?.title ?? "Why We Partner"}
      titleDash={`- ${data?.subHeadline ?? "We believe that no single player has all the answers. That's why GREEN seeks out:"}`}
      subtitle={
        data?.description ??
        "We co-create value with clients through a model that emphasizes"
      }
      imageSide="right"
      imageSrc={
        data?.img?.src ??
        "/images/technology-innovation-alliances/modal_why_we_partner.png"
      }
      imageAlt={data?.img?.alt ?? "Why We Partner"}
      bullets={bullets}
      quote={
        data?.quote?.text ??
        "“Our goal : Build a future-proof ecosystem that outperforms today’s limitations.”"
      }
    />
  );
}
