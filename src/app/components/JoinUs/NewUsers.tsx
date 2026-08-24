"use client";

import { useEffect, useState } from "react";
import { ProductEnquiryFrame } from "@/app/components/Product/Modals/ProductEnquiry";
import PhoneInput from "@/app/components/shared/PhoneInput";
import styles from "./AuthDialogs.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewUsers({ isOpen, onClose }: Props) {
  const [firstName, setFirstName] = useState("");
  const [phoneCountry, setPhoneCountry] = useState({
    dial_code: "+675",
    country_code: "pg",
  });
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [isApplyingForVacancy, setIsApplyingForVacancy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
      labelledBy="new-users-title"
      onClose={onClose}
      closeLabel="Close new users registration"
    >
      <div className={styles.newContent}>
        <header className={styles.dialogHeader}>
          <h2 id="new-users-title">
            New to <strong>GREEN</strong>? Create your <strong>Profile</strong>
          </h2>
          <p>
            Join the growing talent network powering the Pacific&apos;s
            renewable energy transformation.
          </p>
        </header>

        <form
          className={styles.newForm}
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

          <label className={styles.fieldShape}>
            <span className={styles.srOnly}>Email address</span>
            <input
              type="email"
              placeholder="E-MAIL ID"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>

          <div className={`${styles.fieldShape} ${styles.phoneField}`}>
            <PhoneInput
              phone={phone}
              onPhoneChange={(event) => setPhone(event.target.value)}
              dialCode={phoneCountry.dial_code}
              countryCode={phoneCountry.country_code}
              onCountryChange={(dial_code, country_code) =>
                setPhoneCountry({ dial_code, country_code })
              }
              required={false}
            />
          </div>

          <label className={`${styles.fieldShape} ${styles.passwordField}`}>
            <span className={styles.srOnly}>Password</span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="PASSWORD"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <img loading="lazy" decoding="async" src="/images/join-us/arrow.png" alt="" />
            </button>
          </label>

          <label className={styles.fieldShape}>
            <span className={styles.srOnly}>Confirm password</span>
            <input
              type="password"
              placeholder="CONFIRM PASSWORD"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </label>

          <div className={styles.uploadGroup}>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(event) => setResume(event.target.files?.[0] ?? null)}
              className={styles.fileInput}
              id="resume-upload"
            />
            <label className={styles.fieldShape} htmlFor="resume-upload">
              <span>{resume?.name || "RESUME UPLOAD"}</span>
              <img loading="lazy" decoding="async" src="/images/join-us/upload.png" alt="" />
            </label>
            <p>
              (Formats: <strong>PDF/DOC</strong>, Size:{" "}
              <strong>Below 2Mb</strong>)
            </p>
          </div>

          <label className={styles.vacancyCheck}>
            <input
              type="checkbox"
              checked={isApplyingForVacancy}
              onChange={(event) =>
                setIsApplyingForVacancy(event.target.checked)
              }
            />
            <span>I&apos;m applying for a current vacancy</span>
          </label>

          <button type="submit" className={styles.sendButton}>
            <img loading="lazy" decoding="async" src="/images/join-us/send.png" alt="Send" />
          </button>
        </form>
      </div>
    </ProductEnquiryFrame>
  );
}
