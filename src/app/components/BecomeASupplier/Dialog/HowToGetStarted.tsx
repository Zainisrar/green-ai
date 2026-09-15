"use client";

import React from "react";
import Link from "next/link";
import SupplierModalFrame from "./SupplierModalFrame";
import styles from "./SupplierDialogs.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onRegister?: () => void;
}

const steps = [
  {
    step: "Step 1",
    action: "Create a Supplier Profile →",
    hasRegister: true,
    left: 450,
  },
  {
    step: "Step 2",
    action: "Review GREEN’s Procurement Philosophy",
    left: 423,
  },
  {
    step: "Step 3",
    action: "Sign & Accept Supplier Code of Conduct",
    left: 401,
  },
  {
    step: "Step 4",
    action: "Upload Documents (Certifications, Catalogs, Past Work)",
    left: 379,
  },
  {
    step: "Step 5",
    action: "Await Qualification / Tender Invitations",
    left: 335,
  },
];

export default function HowToGetStarted({
  isOpen,
  onClose,
  onRegister,
}: Props) {
  return (
    <SupplierModalFrame
      isOpen={isOpen}
      onClose={onClose}
      title="How to Get Started"
    >
      <div className={styles.getStartedContainer}>
        <div className={styles.getStartedHeader}>
          <span className={styles.stepColHead}>Step</span>
          <span className={styles.actionColHead}>Action</span>
        </div>

        <div className={styles.stepsRows}>
          {steps.map((row, idx) => (
            <div
              key={idx}
              className={styles.stepRow}
              style={{ marginLeft: `${row.left}px` }}
            >
              <p className={styles.stepName}>{row.step}</p>
              <p className={styles.stepAction}>
                {row.action.includes("GREEN")
                  ? row.action.split("GREEN").map((part, i, arr) => (
                      <React.Fragment key={i}>
                        {part}
                        {i < arr.length - 1 && (
                          <span className={styles.greenText}>GREEN</span>
                        )}
                      </React.Fragment>
                    ))
                  : row.action}
                {row.hasRegister && onRegister && (
                  <button
                    type="button"
                    onClick={onRegister}
                    className={styles.stepRegisterBtn}
                  >
                    [Register Here]
                  </button>
                )}
              </p>
            </div>
          ))}
        </div>

        <div className={styles.getStartedFooter}>
          <p
            className={styles.footerQuote}
            style={{ fontStyle: "normal", fontSize: "22px" }}
          >
            Already a supplier?{" "}
            <Link
              href="/ecosystem/supply-partners/login"
              className={styles.portalLink}
            >
              Login to Supplier Portal
            </Link>
          </p>
        </div>
      </div>
    </SupplierModalFrame>
  );
}
