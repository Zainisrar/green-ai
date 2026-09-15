"use client";

import type React from "react";
import { useEffect, useState } from "react";
import EngineeringFormModal from "@/app/components/shared/EngineeringFormModal";
import {
  buildReachUsPayload,
  generateCaptcha,
  submitReachUs,
} from "@/app/lib/forms";
import styles from "./NewsletterSignupModal.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const NewsletterSignupModal = ({ isOpen, onClose }: Props) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      setCaptcha(generateCaptcha());
      setCaptchaInput("");
      setSuccessMessage("");
      setErrorMessage("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    if (captchaInput.replace(/\s/g, "") !== captcha.replace(/\s/g, "")) {
      setErrorMessage("Captcha verification failed. Please try again.");
      setCaptcha(generateCaptcha());
      setCaptchaInput("");
      setIsLoading(false);
      return;
    }

    try {
      const data = await submitReachUs(
        buildReachUsPayload({
          firstname: firstName || "Newsletter",
          lastname: "Subscriber",
          email,
          message:
            "Newsletter subscription request from GREEN Insights signup page.",
        }),
      );

      if (data.Code === "001") {
        setSuccessMessage(
          data.Message || "You have been subscribed successfully!",
        );
        setEmail("");
        setFirstName("");
        setCaptcha(generateCaptcha());
        setCaptchaInput("");
        setTimeout(() => {
          onClose();
          setSuccessMessage("");
        }, 2000);
      } else {
        setErrorMessage(
          data.Message || "Subscription failed. Please try again.",
        );
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "An error occurred while subscribing.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <EngineeringFormModal
      isOpen={isOpen}
      onClose={onClose}
      geometry="consultation"
      maxWidthClass="max-w-[1520px]"
      title={
        <>
          NEWSLETTER <span className="text-[#23B14D]">SIGNUP</span>
        </>
      }
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Row 1: First Name */}
        <div className={`${styles.fieldWrap} ${styles.rowStagger1}`}>
          <input
            type="text"
            name="firstName"
            placeholder="FIRST NAME (OPTIONAL)"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={styles.input}
            autoComplete="given-name"
          />
        </div>

        {/* Row 2: E-Mail ID */}
        <div className={`${styles.fieldWrap} ${styles.rowStagger2}`}>
          <input
            type="email"
            name="email"
            placeholder="E-MAIL ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            autoComplete="email"
            required
          />
        </div>

        {/* Row 3: Captcha & Send Button */}
        <div className={`${styles.footerRow} ${styles.rowStaggerFooter}`}>
          <div className={styles.captchaGroup}>
            <button
              type="button"
              className={styles.captchaBox}
              onClick={() => setCaptcha(generateCaptcha())}
              title="Click to refresh captcha"
              aria-label={`Captcha code ${captcha}. Click to refresh`}
            >
              <span className={styles.captchaText}>{captcha}</span>
            </button>
            <div className={styles.captchaInputWrap}>
              <input
                type="text"
                placeholder="Enter captcha"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                className={styles.captchaInput}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={styles.sendButton}
          >
            <span className={styles.sendButtonText}>
              {isLoading ? "Sending..." : "Send"}
            </span>
          </button>
        </div>

        {errorMessage && (
          <p className={`${styles.statusMessage} ${styles.statusError}`}>
            {errorMessage}
          </p>
        )}
        {successMessage && (
          <p className={`${styles.statusMessage} ${styles.statusSuccess}`}>
            {successMessage}
          </p>
        )}
      </form>
    </EngineeringFormModal>
  );
};

export default NewsletterSignupModal;
