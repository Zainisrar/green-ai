"use client";

import TechnicalCategoryModal, {
  type TechnicalCategoryItem,
} from "./TechnicalCategoryModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: { item: TechnicalCategoryItem[]; title: string };
}

const fallbackItems: TechnicalCategoryItem[] = [
  {
    component: "Battery Banks",
    technicalNotes:
      "LFP (preferred), GEL or Lead-carbon (secondary), >4000 cycle life @ 80% DoD, BMS-integrated, modular racking",
  },
  {
    component: "BESS Controllers",
    technicalNotes:
      "Programmable dispatch, remote firmware updates, peak shaving/logging features, load-proportional discharge",
  },
  {
    component: "Racks & Enclosures",
    technicalNotes:
      "Ventilated or climate-sealed; modular design for scale-out; compliant with AS/NZS 5139 & IEEE 1547",
  },
];

export default function EnergyStorageSystems({ isOpen, onClose, data }: Props) {
  return (
    <TechnicalCategoryModal
      isOpen={isOpen}
      onClose={onClose}
      title={data?.title || "Energy Storage Systems"}
      items={data?.item?.length ? data.item : fallbackItems}
    />
  );
}
