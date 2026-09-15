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
    component: "Monitoring Platforms",
    technicalNotes:
      "GRID-INTEL™ or equivalent; real-time I/O, remote diagnostics, API push-pull, OTA upgrades",
  },
  {
    component: "Sensors & Meters",
    technicalNotes:
      "CT/VT class 0.5 or better, 3-phase/bi-directional metering, IP65 enclosures",
  },
  {
    component: "IoT Interfaces",
    technicalNotes:
      "RS485, Modbus TCP/IP, LoRa/4G fallback; sync with SCADA/BMS platforms",
  },
];

export default function SystemIntelligence({ isOpen, onClose, data }: Props) {
  return (
    <TechnicalCategoryModal
      isOpen={isOpen}
      onClose={onClose}
      title={data?.title || "System Intelligence & Data"}
      items={data?.item?.length ? data.item : fallbackItems}
      compactTitle
    />
  );
}
