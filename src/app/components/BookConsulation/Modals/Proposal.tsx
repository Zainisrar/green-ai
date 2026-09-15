"use client";

import type React from "react";
import { useEffect, useState } from "react";
import CountryCodeDropdown from "@/app/components/shared/CountryCodeDropdown";
import EngineeringFormModal from "@/app/components/shared/EngineeringFormModal";
import {
  buildReachUsPayload,
  generateCaptcha,
  submitReachUs,
} from "@/app/lib/forms";
import styles from "./ConsultationModal.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  organization: string;
  contactName: string;
  email: string;
  phone: string;
  projectType: string;
  projectDescription: string;
  captcha: string;
}

const Proposal = ({ isOpen, onClose }: Props) => {
  const [formData, setFormData] = useState<FormData>({
    organization: "",
    contactName: "",
    email: "",
    phone: "",
    projectType: "",
    projectDescription: "",
    captcha: "",
  });
  const [phoneCountry, setPhoneCountry] = useState({
    dial_code: "+675",
    country_code: "pg",
  });
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

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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

    const message = [
      "Request for Proposal (RFP)",
      `Organization: ${formData.organization}`,
      `Project type: ${formData.projectType}`,
      `Description: ${formData.projectDescription}`,
    ].join("\n");

    try {
      const data = await submitReachUs(
        buildReachUsPayload({
          firstname: formData.contactName,
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
          data.Message ||
            "Your proposal request has been submitted successfully!",
        );
        setFormData({
          organization: "",
          contactName: "",
          email: "",
          phone: "",
          projectType: "",
          projectDescription: "",
          captcha: "",
        });
        setCaptcha(generateCaptcha());
        setCaptchaInput("");
        setTimeout(() => {
          onClose();
          setSuccessMessage("");
        }, 2000);
      } else {
        setErrorMessage(
          data.Message ||
            "Failed to submit proposal request. Please try again.",
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
    <EngineeringFormModal
      isOpen={isOpen}
      onClose={onClose}
      geometry="consultation"
      maxWidthClass="max-w-[1520px]"
      title={
        <>
          REQUEST A <span className="text-[#23B14D]">PROPOSAL</span> (RFP)
        </>
      }
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Row 1: Contact Name | Organization */}
        <div className={`${styles.grid} ${styles.rowStagger1}`}>
          <div className={styles.fieldWrap}>
            <input
              type="text"
              name="contactName"
              placeholder="CONTACT NAME"
              value={formData.contactName}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.fieldWrap}>
            <input
              type="text"
              name="organization"
              placeholder="ORGANIZATION"
              value={formData.organization}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </div>
        </div>

        {/* Row 2: E-Mail ID | Phone */}
        <div className={`${styles.grid} ${styles.rowStagger2}`}>
          <div className={styles.fieldWrap}>
            <input
              type="email"
              name="email"
              placeholder="E-MAIL ID"
              value={formData.email}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.fieldWrap}>
            <input
              type="tel"
              name="phone"
              placeholder="PHONE"
              value={formData.phone}
              onChange={handleInputChange}
              className={`${styles.input} pr-28`}
              required
            />
            <div className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
              <CountryCodeDropdown
                dialCode={phoneCountry.dial_code}
                countryCode={phoneCountry.country_code}
                onSelect={(dial_code, country_code) =>
                  setPhoneCountry({ dial_code, country_code })
                }
                className="flex cursor-pointer items-center gap-1.5 bg-transparent text-xs text-gray-700 sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Row 3: Project Type */}
        <div className={`${styles.fieldWrap} ${styles.rowStagger3}`}>
          <select
            name="projectType"
            value={formData.projectType}
            onChange={handleInputChange}
            className={styles.select}
            required
          >
            <option value="">PROJECT TYPE</option>
            <option value="solar-epcm">Solar EPCM</option>
            <option value="microgrid">Hybrid Microgrid</option>
            <option value="energy-storage">Energy Storage</option>
            <option value="grid-integration">Grid Integration</option>
            <option value="other">Other</option>
          </select>
          <span className={styles.dropdownIcon} aria-hidden="true">
            <svg width="12" height="7" viewBox="0 0 12 7" fill="none">
              <title>Dropdown icon</title>
              <path
                d="M1 1L6 6L11 1"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        {/* Row 4: Project Description */}
        <div className={`${styles.textareaWrap} ${styles.rowStaggerTextarea}`}>
          <textarea
            name="projectDescription"
            placeholder="PROJECT DESCRIPTION / REQUIREMENTS"
            value={formData.projectDescription}
            onChange={handleInputChange}
            className={styles.textarea}
            required
          />
        </div>

        {/* Row 5: Captcha & Send Button */}
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

export default Proposal;
