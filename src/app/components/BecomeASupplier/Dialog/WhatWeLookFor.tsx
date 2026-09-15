"use client";

import React from "react";
import SupplierModalFrame from "./SupplierModalFrame";
import styles from "./SupplierDialogs.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const leftCriteria = [
  { text: "ISO-compliant, tested technologies", left: 309 },
  { text: "Verified supply chain traceability", left: 283 },
  { text: "Strong logistics and last-mile support", left: 264 },
];

const rightCriteria = [
  { text: "Competitive pricing with lifecycle value", left: 1019 },
  { text: "Clean record in ethical and sustainable practices", left: 987 },
];

export default function WhatWeLookFor({ isOpen, onClose }: Props) {
  return (
    <SupplierModalFrame
      isOpen={isOpen}
      onClose={onClose}
      title="What We Look For"
      titleDash="- We work with vendors who deliver"
    >
      <div className={styles.lookForContainer}>
        <div className={styles.lookForLeftCol}>
          {leftCriteria.map((item, idx) => (
            <div
              key={idx}
              className={styles.lookForItem}
              style={{ marginLeft: `${item.left}px` }}
            >
              <img
                loading="lazy"
                decoding="async"
                src="/images/technology-innovation-alliances/modal_bolt.png"
                className={styles.lookForBolt}
                alt=""
                aria-hidden="true"
              />
              <p className={styles.lookForText}>{item.text}</p>
            </div>
          ))}
        </div>

        <div className={styles.lookForRightCol}>
          {rightCriteria.map((item, idx) => (
            <div
              key={idx}
              className={styles.lookForItem}
              style={{ marginLeft: `${item.left}px` }}
            >
              <img
                loading="lazy"
                decoding="async"
                src="/images/technology-innovation-alliances/modal_bolt.png"
                className={styles.lookForBolt}
                alt=""
                aria-hidden="true"
              />
              <p className={styles.lookForText}>{item.text}</p>
            </div>
          ))}
        </div>

        <div className={styles.lookForFooter}>
          <p className={styles.footerQuote}>
            We value partners, not just products.{" "}
            <span className={styles.greenText}>GREEN</span> vendors become part
            of our extended ecosystem.
          </p>
        </div>
      </div>
    </SupplierModalFrame>
  );
}
