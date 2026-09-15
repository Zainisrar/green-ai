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
  supplyType: string;
  details: string;
}

const initialFormData: FormData = {
  fullName: "",
  email: "",
  phone: "",
  supplyType: "",
  details: "",
};

const SupplyingToGreen = ({ isOpen, onClose }: Props) => {
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
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setAgreed(false);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
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
      "Supplying to GREEN (Key Supply Categories)",
      `What they supply: ${formData.supplyType}`,
      `Brief details: ${formData.details || "None"}`,
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
          data.Message || "Your details have been submitted successfully!",
        );
        resetForm();
        setTimeout(() => {
          onClose();
          setSuccessMessage("");
        }, 2000);
      } else {
        setErrorMessage(
          data.Message || "Failed to submit your details. Please try again.",
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
      labelledBy="supplying-to-green-title"
      onClose={onClose}
      closeLabel="Close supplying to GREEN form"
    >
      <div className={styles.content}>
        <header className={styles.dialogHeader}>
          <h2 id="supplying-to-green-title" className="!text-black">
            SUPPLYING TO GREEN?
          </h2>
        </header>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={`${styles.row} ${styles.row1}`}>
            <label className={`${styles.fieldShape} ${styles.activeField}`}>
              <input
                type="text"
                name="fullName"
                aria-label="Full name"
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
                aria-label="Email address"
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
                name="supplyType"
                aria-label="What do you supply?"
                value={formData.supplyType}
                onChange={handleInputChange}
                className={formData.supplyType ? styles.hasValue : ""}
                required
              >
                <option value="">WHAT DO YOU SUPPLY?</option>
                <option value="solar-generation">
                  Solar Generation Equipment
                </option>
                <option value="power-conversion">
                  Power Conversion Systems
                </option>
                <option value="energy-storage">Energy Storage Systems</option>
                <option value="system-intelligence">
                  System Intelligence &amp; Data
                </option>
                <option value="balance-of-system">
                  Balance of System (BoS)
                </option>
                <option value="supply-chain">
                  Supply Chain &amp; BOS Hardware
                </option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className={`${styles.row} ${styles.row2FieldMessage}`}>
            <div className={`${styles.fieldShape} ${styles.messageShape}`}>
              <textarea
                name="details"
                aria-label="Brief details"
                placeholder="BRIEF DETAILS"
                value={formData.details}
                onChange={handleInputChange}
                rows={3}
              />
            </div>
          </div>

          <div className={`${styles.agreement} ${styles.row2FieldAgreement}`}>
            <input
              type="checkbox"
              id="supplying-green-agree"
              checked={agreed}
              onChange={(event) => setAgreed(event.target.checked)}
            />
            <label htmlFor="supplying-green-agree">
              I agree that GREEN may contact me about this request.
            </label>
          </div>

          {errorMessage ? <p className={styles.error}>{errorMessage}</p> : null}
          {successMessage ? (
            <p className={styles.success}>{successMessage}</p>
          ) : null}

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
              <span>{isLoading ? "Submitting..." : "Submit"}</span>
            </button>
          </div>
        </form>
      </div>
    </ProductEnquiryFrame>
  );
};

export default SupplyingToGreen;
