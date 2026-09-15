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
    component: "AC Cabling & Distribution",
    technicalNotes:
      "XLPE armored cables, properly derated, color-coded to AS/NZS 3000 standards",
  },
  {
    component: "Earthing Systems",
    technicalNotes:
      "Copper-bonded rods, ≤5Ω resistance, SPD-integrated grounding at inverter & battery level",
  },
  {
    component: "Enclosures & Cabinets",
    technicalNotes:
      "IP-rated (IP55/IP65), UV & corrosion resistant, stainless/galvanized steel; custom busbar-ready",
  },
];

export default function BalanceofSystem({ isOpen, onClose, data }: Props) {
  return (
    <TechnicalCategoryModal
      isOpen={isOpen}
      onClose={onClose}
      title={data?.title || "Balance of System (BoS)"}
      items={data?.item?.length ? data.item : fallbackItems}
    />
  );
}
