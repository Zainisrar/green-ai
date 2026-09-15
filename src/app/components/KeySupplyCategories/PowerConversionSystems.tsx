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
    component: "Inverters",
    technicalNotes:
      "Hybrid/off-grid capable, MPPT tracking, load-shedding logic, min. 95% EU efficiency; Victron/SMA/Studer equivalent or higher",
  },
  {
    component: "Charge Controllers",
    technicalNotes:
      "MPPT preferred, compatibility with LFP/VRLA banks, current capacity ≥50A DC; real-time data sync capability",
  },
  {
    component: "ATS / Switchgear",
    technicalNotes:
      "Dual-input synchronization, <10ms changeover, built-in surge & arc protection, IP65+ enclosures",
  },
];

export default function PowerConversionSystems({
  isOpen,
  onClose,
  data,
}: Props) {
  return (
    <TechnicalCategoryModal
      isOpen={isOpen}
      onClose={onClose}
      title={data?.title || "Power Conversion Systems"}
      items={data?.item?.length ? data.item : fallbackItems}
    />
  );
}
