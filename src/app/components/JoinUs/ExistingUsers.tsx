"use client";

import { useEffect, useState } from "react";
import { ProductEnquiryFrame } from "@/app/components/Product/Modals/ProductEnquiry";
import styles from "./AuthDialogs.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExistingUsers({ isOpen, onClose }: Props) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <ProductEnquiryFrame
      labelledBy="existing-users-title"
      onClose={onClose}
      closeLabel="Close existing users login"
      compact
      width={995}
      height={480}
      shape="polygon(21% 0, 100% 0, 79% 100%, 0 100%)"
    >
      <div className={styles.existingContent}>
        <header className={styles.dialogHeader}>
          <h2 id="existing-users-title">
            Existing <strong>Users</strong>
          </h2>
          <p>Enter your credentials to access your GREEN Careers Dashboard.</p>
        </header>

        <form
          className={styles.existingForm}
          onSubmit={(event) => event.preventDefault()}
        >
          <label className={`${styles.fieldShape} ${styles.activeField}`}>
            <span className={styles.srOnly}>First name</span>
            <input
              type="text"
              placeholder="FIRST NAME"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </label>

          <label className={`${styles.fieldShape} ${styles.offsetField}`}>
            <span className={styles.srOnly}>Email address</span>
            <input
              type="email"
              placeholder="E-MAIL ID"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>

          <button type="submit" className={styles.imageSubmit}>
            <img src="/images/join-us/login.png" alt="Login" />
          </button>

          <p className={styles.resetCopy}>
            Forgot Password? <button type="button">Reset Here</button>
          </p>
        </form>
      </div>
    </ProductEnquiryFrame>
  );
}
