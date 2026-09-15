"use client";

import React from "react";
import SupplierModalFrame from "./SupplierModalFrame";
import styles from "./SupplierDialogs.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  {
    category: "Solar PV Modules",
    examples: "Tier 1 mono PERC, bifacial, floating PV",
    left: 306,
  },
  {
    category: "Inverters & Controllers",
    examples: "Grid-tied, hybrid, off-grid, MPPTs",
    left: 288,
  },
  {
    category: "Battery Storage Systems",
    examples: "LiFePO₄, Lithium-ion, flow batteries",
    left: 269,
  },
  {
    category: "Mounting & Cabling",
    examples: "Structural steel/aluminum, weather-rated connectors",
    left: 251,
  },
  {
    category: "Monitoring Systems",
    examples: "Smart meters, sensors, IoT gateways",
    left: 232,
  },
  {
    category: "Mini-grid Hardware",
    examples: "Hybrid controllers, gensets, ATS",
    left: 214,
  },
  {
    category: "AC Infrastructure",
    examples: "Switchgear, panels, protection relays",
    left: 195,
  },
  {
    category: "Tools, PPE & Field Gear",
    examples: "Specialized equipment for field teams",
    left: 177,
  },
  {
    category: "Electrical & Civil Works",
    examples: "Conduits, trenches, earthwork kits",
    left: 158,
  },
];

export default function KeySupplyCategories({ isOpen, onClose }: Props) {
  return (
    <SupplierModalFrame
      isOpen={isOpen}
      onClose={onClose}
      title="Key Supply Categories"
      titleDash="- We work with vendors who deliver"
    >
      <div className={styles.categoriesContainer}>
        <div className={styles.categoriesHeader}>
          <span className={styles.categoryColHead}>Category</span>
          <span className={styles.examplesColHead}>Examples</span>
        </div>

        <div className={styles.categoriesRows}>
          {categories.map((row, idx) => (
            <div
              key={idx}
              className={styles.categoryRow}
              style={{ marginLeft: `${row.left}px` }}
            >
              <p className={styles.categoryName}>{row.category}</p>
              <p className={styles.categoryExamples}>{row.examples}</p>
            </div>
          ))}
        </div>
      </div>
    </SupplierModalFrame>
  );
}
