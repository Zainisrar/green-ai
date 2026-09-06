"use client";

import React, { useEffect, useState } from "react";
import { buildReachUsPayload, submitReachUs } from "@/app/lib/forms";
import { ProductEnquiryFrame } from "@/app/components/Product/Modals/ProductEnquiry";
import styles from "@/app/components/Product/Modals/ProductEnquiry.module.css";
import CountryCodeDropdown from "@/app/components/shared/CountryCodeDropdown";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  consultationType: string;
  helpWith: string;
  message: string;
}

const initialFormData: FormData = {
  fullName: "",
  email: "",
  phone: "",
  organization: "",
  consultationType: "",
  helpWith: "",
  message: "",
};

const DiscoveryConsultation = ({ isOpen, onClose }: Props) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [phoneCountry, setPhoneCountry] = useState({ dial_code: "+675", country_code: "pg" });
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
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
      setErrorMessage("Please agree that GREEN may contact you about this request.");
      return;
    }

    setIsLoading(true);

    const message = [
      "Solar EPCM Services — Book a Discovery Consultation",
      `Organization: ${formData.organization}`,
      `Preferred consultation type: ${formData.consultationType}`,
      `What they need help with: ${formData.helpWith}`,
      `Brief message: ${formData.message || "None"}`,
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
          data.Message || "Your discovery consultation request has been submitted successfully!",
        );
        resetForm();
        setTimeout(() => {
          onClose();
          setSuccessMessage("");
        }, 2000);
      } else {
        setErrorMessage(data.Message || "Failed to submit request. Please try again.");
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "An error occurred while submitting the form.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProductEnquiryFrame
      labelledBy="epcm-discovery-title"
      onClose={onClose}
      closeLabel="Close discovery consultation"
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 id="epcm-discovery-title" className={styles.title}>
          BOOK A <span>DISCOVERY CONSULTATION</span>
        </h2>
        <div className={styles.grid}>
          <input
            type="text"
            name="fullName"
            placeholder="FULL NAME"
            value={formData.fullName}
            onChange={handleInputChange}
            className={`${styles.field} ${styles.skewForward}`}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="EMAIL ID"
            value={formData.email}
            onChange={handleInputChange}
            className={`${styles.field} ${styles.skewBack}`}
            required
          />
          <div className={`${styles.phoneField} ${styles.skewForward}`}>
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
              onSelect={(dial_code, country_code) => setPhoneCountry({ dial_code, country_code })}
              className={styles.countryCode}
            />
          </div>
          <input
            type="text"
            name="organization"
            placeholder="ORGANIZATION"
            value={formData.organization}
            onChange={handleInputChange}
            className={`${styles.field} ${styles.skewBack}`}
            required
          />
          <select
            name="consultationType"
            value={formData.consultationType}
            onChange={handleInputChange}
            className={`${styles.field} ${styles.select} ${styles.skewForward} ${
              formData.consultationType ? styles.hasValue : ""
            }`}
            required
          >
            <option value="">PREFERRED CONSULTATION TYPE</option>
            <option value="virtual">Virtual (Zoom / Google Meet)</option>
            <option value="in-person">In-Person</option>
            <option value="phone-call">Phone Call</option>
          </select>
          <select
            name="helpWith"
            value={formData.helpWith}
            onChange={handleInputChange}
            className={`${styles.field} ${styles.select} ${styles.skewBack} ${
              formData.helpWith ? styles.hasValue : ""
            }`}
            required
          >
            <option value="">WHAT DO YOU NEED HELP WITH?</option>
            <option value="engineering">Engineering</option>
            <option value="procurement">Procurement</option>
            <option value="construction">Construction</option>
            <option value="management">Management</option>
            <option value="full-epcm">Full EPCM Scope</option>
            <option value="other">Other</option>
          </select>
        </div>

        <textarea
          name="message"
          placeholder="BRIEF MESSAGE"
          value={formData.message}
          onChange={handleInputChange}
          rows={3}
          className={`${styles.field} ${styles.message}`}
        />

        <div className={styles.agreement}>
          <input
            type="checkbox"
            id="epcm-discovery-agree"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <label htmlFor="epcm-discovery-agree">
            I agree that GREEN may contact me about this request.
          </label>
        </div>

        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        {successMessage && <p className={styles.success}>{successMessage}</p>}

        <div className={styles.actions}>
          <button
            type="button"
            onClick={resetForm}
            disabled={isLoading}
            className={styles.action}
          >
            <span>Reset</span>
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className={`${styles.action} ${styles.submit}`}
          >
            <span>
              {isLoading ? "Submitting..." : "Book Consultation"}
            </span>
          </button>
        </div>
      </form>
    </ProductEnquiryFrame>
  );
};

export default DiscoveryConsultation;
