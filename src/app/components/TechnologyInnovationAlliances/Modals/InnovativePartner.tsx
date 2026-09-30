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
  { text: "Startups seeking scale and field validation" },
  { text: "Universities and research institutes with active grants" },
  { text: "Corporate R&D looking for deployment labs" },
  { text: "NGOs with impact-driven tech pilots" },
];

export default function InnovativePartner({ isOpen, onClose, data }: Props) {
  const bullets =
    data?.keys?.map((key) => ({
      text: key.text,
      highlight: key.highlighted,
    })) ?? BULLETS;
  return (
    <TechInfoModal
      isOpen={isOpen}
      onClose={onClose}
      title={data?.title ?? "Become an Innovation Partner"}
      titleDash={`- ${data?.subHeadline ?? "We believe that no single player has all the answers. That's why GREEN seeks out:"}`}
      subtitle={
        data?.description ??
        "We co-create value with clients through a model that emphasizes"
      }
      imageSide="left"
      imageSrc={
        data?.img?.src ??
        "/images/technology-innovation-alliances/modal_innovation_partner.png"
      }
      imageAlt={data?.img?.alt ?? "Become an Innovation Partner"}
      bullets={bullets}
      quote={
        data?.quote?.text ??
        "“Our goal : Build a future-proof ecosystem that outperforms today’s limitations.”"
      }
    />
  );
}
