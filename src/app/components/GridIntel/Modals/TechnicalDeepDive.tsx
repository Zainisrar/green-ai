"use client";

import React, { useEffect, useState } from "react";
import { buildReachUsPayload, submitReachUs } from "@/app/lib/forms";
import { ProductEnquiryFrame } from "@/app/components/Product/Modals/ProductEnquiry";
import PhoneInput from "@/app/components/shared/PhoneInput";
import styles from "@/app/components/SmartGrid/Modals/SmartGridModals.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  fullName: string;
  organization: string;
  email: string;
  phone: string;
  focusArea: string;
  consultationType: string;
  details: string;
}

const initialFormData: FormData = {
  fullName: "",
  organization: "",
  email: "",
  phone: "",
  focusArea: "",
  consultationType: "",
  details: "",
};

const TechnicalDeepDive = ({ isOpen, onClose }: Props) => {
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
        "Please agree that GREEN may contact me about this request.",
      );
      return;
    }

    setIsLoading(true);

    const message = [
      "GRID-INTEL — Schedule a Technical Deep-Dive",
      `Organization: ${formData.organization}`,
      `Focus area: ${formData.focusArea}`,
      `Preferred consultation type: ${formData.consultationType}`,
      `Brief details: ${formData.details || "None"}`,
    ].join("\n");

    try {
      const data = await submitReachUs(
        buildReachUsPayload({
          firstname: formData.fullName,
          lastname: formData.organization,
          email: formData.email,
          phone: formData.phone,
          phone_dial_code: phoneCountry.dial_code,
          phone_country_code: phoneCountry.country_code,
          message,
        }),
      );

      if (data.Code === "001") {
        setSuccessMessage(
          data.Message || "Your request has been submitted successfully!",
        );
        resetForm();
        setTimeout(() => {
          onClose();
          setSuccessMessage("");
        }, 2000);
      } else {
        setErrorMessage(
          data.Message || "Failed to submit request. Please try again.",
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
      labelledBy="technical-deep-dive-title"
      onClose={onClose}
      closeLabel="Close technical deep-dive dialog"
    >
      <div className={styles.content}>
        <header className={styles.dialogHeader}>
          <h2 id="technical-deep-dive-title">
            SCHEDULE A <strong>TECHNICAL DEEP-DIVE</strong>
          </h2>
        </header>

        <form className={styles.form} onSubmit={handleSubmit}>
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
                type="text"
                name="organization"
                placeholder="ORGANIZATION"
                value={formData.organization}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>

          <div className={`${styles.row} ${styles.row2}`}>
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
          </div>

          <div className={`${styles.row} ${styles.row3}`}>
            <div className={styles.fieldShape}>
              <select
                name="focusArea"
                value={formData.focusArea}
                onChange={handleInputChange}
                className={formData.focusArea ? styles.hasValue : ""}
                required
              >
                <option value="">SELECT FOCUS AREA</option>
                <option value="system-architecture">System Architecture</option>
                <option value="grid-simulation">
                  Grid Simulation &amp; Analytics
                </option>
                <option value="forecasting">Forecasting &amp; Dispatch</option>
                <option value="cybersecurity">
                  Cybersecurity &amp; Resilience
                </option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className={styles.fieldShape}>
              <select
                name="consultationType"
                value={formData.consultationType}
                onChange={handleInputChange}
                className={formData.consultationType ? styles.hasValue : ""}
                required
              >
                <option value="">PREFERRED CONSULTATION TYPE</option>
                <option value="virtual">Virtual (Zoom / Google Meet)</option>
                <option value="in-person">In-Person Session</option>
                <option value="phone-call">Phone Consultation</option>
              </select>
            </div>
          </div>

          <div className={`${styles.row} ${styles.row4}`}>
            <div className={`${styles.fieldShape} ${styles.messageShape}`}>
              <textarea
                name="details"
                placeholder="BRIEF DETAILS"
                value={formData.details}
                onChange={handleInputChange}
                rows={3}
              />
            </div>
          </div>

          <div className={`${styles.agreement} ${styles.row5}`}>
            <input
              type="checkbox"
              id="deep-dive-agree"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <label htmlFor="deep-dive-agree">
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
              <span>{isLoading ? "Submitting..." : "Schedule Session"}</span>
            </button>
          </div>
        </form>
      </div>
    </ProductEnquiryFrame>
  );
};

export default TechnicalDeepDive;
