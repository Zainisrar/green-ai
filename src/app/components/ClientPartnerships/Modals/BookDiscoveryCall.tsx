"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { ProductEnquiryFrame } from "@/app/components/Product/Modals/ProductEnquiry";
import PhoneInput from "@/app/components/shared/PhoneInput";
import { buildReachUsPayload, submitReachUs } from "@/app/lib/forms";
import styles from "@/app/components/SmartGrid/Modals/SmartGridModals.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  areaOfInterest: string;
  message: string;
}

const initialFormData: FormData = {
  fullName: "",
  email: "",
  phone: "",
  areaOfInterest: "",
  message: "",
};

const BookDiscoveryCall = ({ isOpen, onClose }: Props) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [phoneCountry, setPhoneCountry] = useState({
    dial_code: "+675",
    country_code: "pg",
  });
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      setSuccessMessage("");
      setErrorMessage("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setAgreed(false);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!agreed) {
      setErrorMessage(
        "Please agree that GREEN may contact you about this request.",
      );
      return;
    }

    setIsLoading(true);

    const message = [
      "Book a Discovery Call (Client Partnerships)",
      `Area of interest: ${formData.areaOfInterest}`,
      `Brief message: ${formData.message || "None"}`,
    ].join("\n");

    try {
      const data = await submitReachUs(
        buildReachUsPayload({
          firstname: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          phone_dial_code: phoneCountry.dial_code,
          phone_country_code: phoneCountry.country_code,
          message,
        }),
      );

      if (data.Code === "001") {
        setSuccessMessage(
          data.Message ||
            "Your discovery call request has been submitted successfully!",
        );
        resetForm();
        setTimeout(() => {
          onClose();
          setSuccessMessage("");
        }, 2000);
      } else {
        setErrorMessage(
          data.Message || "Failed to submit your request. Please try again.",
        );
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "An error occurred while submitting the form.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProductEnquiryFrame
      onClose={onClose}
      labelledBy="client-discovery-call-title"
      closeLabel="Close discovery call form"
    >
      <div className={styles.content}>
        <header className={styles.dialogHeader}>
          <h2 id="client-discovery-call-title">
            BOOK A <strong>DISCOVERY CALL</strong>
          </h2>
        </header>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={`${styles.row} ${styles.row1}`}>
            <label className={`${styles.fieldShape} ${styles.activeField}`}>
              <input
                type="text"
                name="fullName"
                placeholder="FULL NAME"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </label>

            <label className={styles.fieldShape}>
              <input
                type="email"
                name="email"
                placeholder="EMAIL ID"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>

          <div className={`${styles.row} ${styles.row2}`}>
            <div className={`${styles.fieldShape} ${styles.phoneField}`}>
              <PhoneInput
                phone={formData.phone}
                onPhoneChange={handleInputChange}
                dialCode={phoneCountry.dial_code}
                countryCode={phoneCountry.country_code}
                onCountryChange={(dial_code, country_code) =>
                  setPhoneCountry({ dial_code, country_code })
                }
              />
            </div>

            <div className={styles.fieldShape}>
              <select
                name="areaOfInterest"
                value={formData.areaOfInterest}
                onChange={handleInputChange}
                className={formData.areaOfInterest ? styles.hasValue : ""}
                required
              >
                <option value="">AREA OF INTEREST</option>
                <option value="government-utilities">
                  Government &amp; Utilities
                </option>
                <option value="donors-development">
                  Donors &amp; Development Banks
                </option>
                <option value="private-sector">
                  Private Sector Enterprise
                </option>
                <option value="institutions">
                  Institutions (Health, Education, Telecom)
                </option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className={`${styles.row} ${styles.row2FieldMessage}`}>
            <div className={`${styles.fieldShape} ${styles.messageShape}`}>
              <textarea
                name="message"
                placeholder="BRIEF MESSAGE"
                value={formData.message}
                onChange={handleInputChange}
                rows={3}
              />
            </div>
          </div>

          <div className={`${styles.agreement} ${styles.row2FieldAgreement}`}>
            <input
              type="checkbox"
              id="client-discovery-agree"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <label htmlFor="client-discovery-agree">
              I agree that GREEN may contact me about this request.
            </label>
          </div>

          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          {successMessage && <p className={styles.success}>{successMessage}</p>}

          <div className={`${styles.row} ${styles.row6}`}>
            <button
              type="button"
              onClick={resetForm}
              disabled={isLoading}
              className={styles.btnReset}
            >
              <span>Reset</span>
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={styles.btnSubmit}
            >
              <span>{isLoading ? "Submitting..." : "Book Call"}</span>
            </button>
          </div>
        </form>
      </div>
    </ProductEnquiryFrame>
  );
};

export default BookDiscoveryCall;
