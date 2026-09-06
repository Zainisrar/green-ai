"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { ProductEnquiryFrame } from "@/app/components/Product/Modals/ProductEnquiry";
import enquiryStyles from "@/app/components/Product/Modals/ProductEnquiry.module.css";
import CountryCodeDropdown from "@/app/components/shared/CountryCodeDropdown";
import { buildReachUsPayload, submitReachUs } from "@/app/lib/forms";
import styles from "./BookDiscoveryCall.module.css";

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
      width={1688}
      height={665}
      maxScale={1.14}
      surfaceClassName={styles.surface}
      surfaceSrc="/images/client-partnerships/discovery-call-window.svg"
    >
      <form
        onSubmit={handleSubmit}
        className={`${enquiryStyles.form} ${styles.form}`}
      >
        <h2
          id="client-discovery-call-title"
          className={`${enquiryStyles.title} ${styles.title}`}
        >
          BOOK A DISCOVERY CALL
        </h2>

        <div className={`${enquiryStyles.grid} ${styles.grid}`}>
          <div className={`${styles.fieldShell} ${styles.activeField}`}>
            <input
              type="text"
              name="fullName"
              placeholder="FULL NAME"
              value={formData.fullName}
              onChange={handleInputChange}
              className={`${enquiryStyles.field} ${enquiryStyles.skewForward}`}
              required
            />
          </div>
          <div className={styles.fieldShell}>
            <input
              type="email"
              name="email"
              placeholder="EMAIL ID"
              value={formData.email}
              onChange={handleInputChange}
              className={`${enquiryStyles.field} ${enquiryStyles.skewBack}`}
              required
            />
          </div>
          <div
            className={`${enquiryStyles.phoneField} ${enquiryStyles.skewBack} ${styles.phoneField}`}
          >
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
              className={`${enquiryStyles.countryCode} ${styles.countryCode}`}
            />
          </div>
          <div className={styles.fieldShell}>
            <select
              name="areaOfInterest"
              value={formData.areaOfInterest}
              onChange={handleInputChange}
              className={`${enquiryStyles.field} ${enquiryStyles.select} ${enquiryStyles.skewForward} ${
                formData.areaOfInterest ? enquiryStyles.hasValue : ""
              }`}
              required
            >
              <option value="">AREA OF INTEREST</option>
              <option value="government-utilities">
                Government &amp; Utilities
              </option>
              <option value="donors-development">
                Donors &amp; Development Banks
              </option>
              <option value="private-sector">Private Sector Enterprise</option>
              <option value="institutions">
                Institutions (Health, Education, Telecom)
              </option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className={styles.messageShell}>
          <textarea
            name="message"
            placeholder="BRIEF MESSAGE"
            value={formData.message}
            onChange={handleInputChange}
            rows={3}
            className={`${enquiryStyles.field} ${styles.message}`}
          />
        </div>

        <label className={`${enquiryStyles.agreement} ${styles.agreement}`}>
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <span>I agree that GREEN may contact me about this request.</span>
        </label>

        {errorMessage && <p className={enquiryStyles.error}>{errorMessage}</p>}
        {successMessage && (
          <p className={enquiryStyles.success}>{successMessage}</p>
        )}

        <div className={`${enquiryStyles.actions} ${styles.actions}`}>
          <button
            type="button"
            onClick={resetForm}
            disabled={isLoading}
            className={enquiryStyles.action}
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className={`${enquiryStyles.action} ${enquiryStyles.submit}`}
          >
            {isLoading ? "Submitting..." : "Book Call"}
          </button>
        </div>
      </form>
    </ProductEnquiryFrame>
  );
};

export default BookDiscoveryCall;
