"use client";

import type React from "react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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
  organization: string;
  email: string;
  phone: string;
  proposalTitle: string;
  consultationType: string;
  helpWith: string;
}

const initialFormData: FormData = {
  fullName: "",
  organization: "",
  email: "",
  phone: "",
  proposalTitle: "",
  consultationType: "",
  helpWith: "",
};

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

const OMProposal = ({ isOpen, onClose }: Props) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [phoneCountry, setPhoneCountry] = useState({
    dial_code: "+675",
    country_code: "pg",
  });
  const [agreed, setAgreed] = useState(false);
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setFileName("");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setErrorMessage("File is too large. Please upload a file below 2MB.");
      e.target.value = "";
      setFileName("");
      return;
    }
    setErrorMessage("");
    setFileName(file.name);
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setAgreed(false);
    setFileName("");
    setErrorMessage("");
    setSuccessMessage("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (Object.values(formData).some((value) => !value.trim())) {
      setErrorMessage("Please complete all required fields.");
      return;
    }

    if (!EMAIL_REGEX.test(formData.email.trim())) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!agreed) {
      setErrorMessage(
        "Please agree that GREEN may contact me about this request.",
      );
      return;
    }

    setIsLoading(true);

    const message = [
      "O&M & Monitoring — Request an O&M Proposal",
      `Organization: ${formData.organization}`,
      `Project / proposal title: ${formData.proposalTitle}`,
      `Preferred consultation type: ${formData.consultationType}`,
      `What they need help with: ${formData.helpWith}`,
      `Attached file: ${fileName || "None"}`,
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
          data.Message ||
            "Your O&M proposal request has been submitted successfully!",
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
      labelledBy="om-proposal-title"
      onClose={onClose}
      closeLabel="Close O&M proposal dialog"
    >
      <div className={styles.content}>
        <header className={styles.dialogHeader}>
          <h2 id="om-proposal-title">
            REQUEST AN <strong>O&amp;M PROPOSAL</strong>
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
            <label className={styles.fieldShape}>
              <input
                type="text"
                name="proposalTitle"
                placeholder="PROJECT / PROPOSAL TITLE"
                value={formData.proposalTitle}
                onChange={handleInputChange}
                required
              />
            </label>

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
                <option value="in-person">In-Person</option>
                <option value="phone-call">Phone Call</option>
              </select>
            </div>
          </div>

          <div className={`${styles.row} ${styles.row4}`}>
            <div className={styles.fieldShape}>
              <select
                name="helpWith"
                value={formData.helpWith}
                onChange={handleInputChange}
                className={formData.helpWith ? styles.hasValue : ""}
                required
              >
                <option value="">WHAT DO YOU NEED HELP WITH?</option>
                <option value="om-services">O&amp;M Services</option>
                <option value="monitoring">Remote Monitoring</option>
                <option value="performance-audit">Performance Audit</option>
                <option value="asset-health">Asset Health Reports</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={styles.fieldShape}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 34px",
                  cursor: "pointer",
                  color: "inherit",
                }}
              >
                <span
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    color: "rgba(48, 48, 48, 0.8)",
                    fontSize: 14,
                  }}
                >
                  {fileName || "UPLOAD SUPPORTING DOCUMENTS"}
                </span>
                <Image
                  src="/images/osm-monitoring/upload.svg"
                  alt=""
                  aria-hidden="true"
                  width={24}
                  height={22}
                />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <span
                style={{
                  alignSelf: "flex-end",
                  fontSize: 11,
                  color: "#23B14D",
                  marginTop: 4,
                }}
              >
                (Formats: PDF/DOC, Size: Below 2Mb)
              </span>
            </div>
          </div>

          <div className={`${styles.agreement} ${styles.row5}`}>
            <input
              type="checkbox"
              id="om-proposal-agree"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <label htmlFor="om-proposal-agree">
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
              <span>{isLoading ? "Submitting..." : "Request Proposal"}</span>
            </button>
          </div>
        </form>
      </div>
    </ProductEnquiryFrame>
  );
};

export default OMProposal;
