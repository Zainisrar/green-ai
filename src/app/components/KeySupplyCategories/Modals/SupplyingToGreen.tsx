"use client";

import type React from "react";
import { useEffect, useState } from "react";
import FigmaAngledCta from "@/app/components/FigmaAngledCta/FigmaAngledCta";
import { ProductEnquiryFrame } from "@/app/components/Product/Modals/ProductEnquiry";
import CountryCodeDropdown from "@/app/components/shared/CountryCodeDropdown";
import { buildReachUsPayload, submitReachUs } from "@/app/lib/forms";
import styles from "./SupplyingToGreen.module.css";

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
      width={1688}
      height={665}
      stageClassName={styles.stage}
      surfaceImage="/images/key-supplier-categories/supplying-form-window.svg"
      surfaceImageInset="-18.5px -26.8px -26.5px -18.9px"
      surfaceImageWidth="auto"
      surfaceImageHeight="auto"
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 id="supplying-to-green-title" className={styles.title}>
          SUPPLYING TO GREEN?
        </h2>

        <input
          type="text"
          name="fullName"
          aria-label="Full name"
          placeholder="FULL NAME"
          value={formData.fullName}
          onChange={handleInputChange}
          className={`${styles.field} ${styles.fullName}`}
          required
        />
        <input
          type="email"
          name="email"
          aria-label="Email address"
          placeholder="EMAIL ID"
          value={formData.email}
          onChange={handleInputChange}
          className={`${styles.field} ${styles.email}`}
          required
        />

        <div className={styles.phoneField}>
          <input
            type="tel"
            name="phone"
            placeholder="PHONE"
            value={formData.phone}
            onChange={handleInputChange}
            required
            aria-label={`Phone number, dial code ${phoneCountry.dial_code}`}
          />
          <CountryCodeDropdown
            dialCode={phoneCountry.dial_code}
            countryCode={phoneCountry.country_code}
            onSelect={(dial_code, country_code) =>
              setPhoneCountry({ dial_code, country_code })
            }
            className={styles.countryCode}
          />
        </div>

        <select
          name="supplyType"
          aria-label="What do you supply?"
          value={formData.supplyType}
          onChange={handleInputChange}
          className={`${styles.field} ${styles.supplyType} ${
            formData.supplyType ? styles.hasValue : ""
          }`}
          required
        >
          <option value="">WHAT DO YOU SUPPLY?</option>
          <option value="solar-generation">Solar Generation Equipment</option>
          <option value="power-conversion">Power Conversion Systems</option>
          <option value="energy-storage">Energy Storage Systems</option>
          <option value="system-intelligence">
            System Intelligence &amp; Data
          </option>
          <option value="balance-of-system">Balance of System (BoS)</option>
          <option value="supply-chain">Supply Chain &amp; BOS Hardware</option>
          <option value="other">Other</option>
        </select>

        <textarea
          name="details"
          aria-label="Brief details"
          placeholder="BRIEF DETAILS"
          value={formData.details}
          onChange={handleInputChange}
          rows={3}
          className={`${styles.field} ${styles.details}`}
        />

        <div className={styles.agreement}>
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

        <div className={styles.actions}>
          <FigmaAngledCta
            type="button"
            onClick={resetForm}
            disabled={isLoading}
            showArrow={false}
            className={styles.reset}
          >
            Reset
          </FigmaAngledCta>
          <FigmaAngledCta
            type="submit"
            disabled={isLoading}
            showArrow={false}
            className={styles.submit}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </FigmaAngledCta>
        </div>
      </form>
    </ProductEnquiryFrame>
  );
};

export default SupplyingToGreen;
