"use client";

import React, { useEffect, useRef, useState } from "react";
import { buildReachUsPayload, submitReachUs } from "@/app/lib/forms";
import { ProductEnquiryFrame } from "@/app/components/Product/Modals/ProductEnquiry";
import PhoneInput from "@/app/components/shared/PhoneInput";
import modalStyles from "@/app/components/SmartGrid/Modals/SmartGridModals.module.css";
import styles from "./SubmitProposal.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  fullName: string;
  organization: string;
  email: string;
  phone: string;
  country: string;
  consultationType: string;
  proposalType: string;
}

const initialFormData: FormData = {
  fullName: "",
  organization: "",
  email: "",
  phone: "",
  country: "",
  consultationType: "",
  proposalType: "",
};

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const SubmitProposal = ({ isOpen, onClose }: Props) => {
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

    if (!agreed) {
      setErrorMessage(
        "Please agree that GREEN may contact me about this request.",
      );
      return;
    }

    setIsLoading(true);

    const message = [
      "Submit Proposal / Collaboration Inquiry (Community Impact Loop)",
      `Organization: ${formData.organization}`,
      `Country / region: ${formData.country}`,
      `Preferred consultation type: ${formData.consultationType}`,
      `Proposal / collaboration type: ${formData.proposalType}`,
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
          data.Message || "Your proposal has been submitted successfully!",
        );
        resetForm();
        setTimeout(() => {
          onClose();
          setSuccessMessage("");
        }, 2000);
      } else {
        setErrorMessage(
          data.Message || "Failed to submit your proposal. Please try again.",
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
      labelledBy="community-impact-proposal-title"
      onClose={onClose}
      closeLabel="Close proposal request"
    >
      <div className={modalStyles.content}>
        <header className={modalStyles.dialogHeader}>
          <h2 id="community-impact-proposal-title">
            SUBMIT PROPOSAL / <strong>COLLABORATION INQUIRY</strong>
          </h2>
        </header>

        <form className={modalStyles.form} onSubmit={handleSubmit}>
          <div className={`${modalStyles.row} ${modalStyles.row1}`}>
            <label
              className={`${modalStyles.fieldShape} ${modalStyles.activeField}`}
            >
              <span className={styles.srOnly}>Full name</span>
              <input
                type="text"
                name="fullName"
                placeholder="FULL NAME"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </label>
            <label className={modalStyles.fieldShape}>
              <span className={styles.srOnly}>Organization</span>
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

          <div className={`${modalStyles.row} ${modalStyles.row2}`}>
            <label className={modalStyles.fieldShape}>
              <span className={styles.srOnly}>Email address</span>
              <input
                type="email"
                name="email"
                placeholder="EMAIL ID"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </label>
            <div
              className={`${modalStyles.fieldShape} ${modalStyles.phoneField}`}
            >
              <span className={styles.srOnly}>Phone number</span>
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

          <div className={`${modalStyles.row} ${modalStyles.row3}`}>
            <label className={modalStyles.fieldShape}>
              <span className={styles.srOnly}>Country or region</span>
              <input
                type="text"
                name="country"
                placeholder="COUNTRY / REGION"
                value={formData.country}
                onChange={handleInputChange}
                required
              />
            </label>
            <label className={modalStyles.fieldShape}>
              <span className={styles.srOnly}>Preferred consultation type</span>
              <select
                name="consultationType"
                value={formData.consultationType}
                onChange={handleInputChange}
                className={
                  formData.consultationType ? modalStyles.hasValue : ""
                }
                required
              >
                <option value="">PREFERRED CONSULTATION TYPE</option>
                <option value="virtual">Virtual (Zoom / Google Meet)</option>
                <option value="in-person">In-Person</option>
                <option value="phone-call">Phone Call</option>
              </select>
            </label>
          </div>

          <div className={`${modalStyles.row} ${styles.documentRow}`}>
            <label className={modalStyles.fieldShape}>
              <span className={styles.srOnly}>
                Proposal or collaboration type
              </span>
              <select
                name="proposalType"
                value={formData.proposalType}
                onChange={handleInputChange}
                className={formData.proposalType ? modalStyles.hasValue : ""}
                required
              >
                <option value="">PROPOSAL / COLLABORATION TYPE</option>
                <option value="community-program">Community Program</option>
                <option value="ngo-partnership">NGO Partnership</option>
                <option value="research">Research Collaboration</option>
                <option value="funding">Funding / Grant</option>
                <option value="other">Other</option>
              </select>
            </label>
            <div className={styles.uploadFieldWrap}>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={`${modalStyles.fieldShape} ${styles.uploadField}`}
                aria-label={
                  fileName
                    ? `Selected file: ${fileName}. Click to change file.`
                    : "Upload files (PDF or DOC format below 2MB)"
                }
              >
                <span>{fileName || "UPLOAD FILES"}</span>
                <span className={styles.uploadIcon} aria-hidden="true">
                  ↥
                </span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
                aria-label="Upload proposal file"
              />
              <p>(Formats: PDF/DOC, Size: Below 2Mb)</p>
            </div>
          </div>

          <div className={`${modalStyles.agreement} ${styles.agreementRow}`}>
            <input
              type="checkbox"
              id="proposal-agree"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <label htmlFor="proposal-agree">
              I agree that GREEN may contact me about this request.
            </label>
          </div>

          {errorMessage && (
            <p className={modalStyles.error} role="alert">
              {errorMessage}
            </p>
          )}
          {successMessage && (
            <p className={modalStyles.success} role="status">
              {successMessage}
            </p>
          )}

          <div
            className={`${modalStyles.row} ${modalStyles.row6} ${styles.actions}`}
          >
            <button
              type="button"
              onClick={resetForm}
              disabled={isLoading}
              className={modalStyles.btnReset}
            >
              <span>Reset</span>
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={modalStyles.btnSubmit}
            >
              <span>{isLoading ? "Submitting..." : "Submit Proposal"}</span>
            </button>
          </div>
        </form>
      </div>
    </ProductEnquiryFrame>
  );
};

export default SubmitProposal;
