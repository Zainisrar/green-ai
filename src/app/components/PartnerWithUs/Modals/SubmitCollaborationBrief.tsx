"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { buildReachUsPayload, submitReachUs } from "@/app/lib/forms";
import { ProductEnquiryFrame } from "@/app/components/Product/Modals/ProductEnquiry";
import PhoneInput from "@/app/components/shared/PhoneInput";
import modalStyles from "@/app/components/SmartGrid/Modals/SmartGridModals.module.css";
import styles from "./SubmitCollaborationBrief.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  requestKind?: "brief" | "overview";
}

interface FormData {
  fullName: string;
  organization: string;
  email: string;
  phone: string;
  country: string;
  collaborationType: string;
  description: string;
}

const initialFormData: FormData = {
  fullName: "",
  organization: "",
  email: "",
  phone: "",
  country: "",
  collaborationType: "",
  description: "",
};

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const SubmitCollaborationBrief = ({
  isOpen,
  onClose,
  requestKind = "brief",
}: Props) => {
  const isOverviewRequest = requestKind === "overview";
  const requestLabel = isOverviewRequest
    ? "Partnership Overview"
    : "Collaboration Brief";
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

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setAgreed(false);
    setFileName("");
    setErrorMessage("");
    setSuccessMessage("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, requestKind, resetForm]);

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
      `Partner With Us — ${isOverviewRequest ? "Request Partnership Overview" : "Submit a Collaboration Brief"}`,
      `Organization: ${formData.organization}`,
      `Country / region: ${formData.country}`,
      `Collaboration type: ${formData.collaborationType}`,
      `Brief description: ${formData.description}`,
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
            `Your ${requestLabel.toLowerCase()} request has been submitted successfully!`,
        );
        resetForm();
        setTimeout(() => {
          onClose();
          setSuccessMessage("");
        }, 2000);
      } else {
        setErrorMessage(
          data.Message ||
            `Failed to submit ${requestLabel.toLowerCase()}. Please try again.`,
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
      labelledBy="collaboration-brief-title"
      onClose={onClose}
      closeLabel="Close collaboration request"
    >
      <div className={modalStyles.content}>
        <header className={modalStyles.dialogHeader}>
          <h2 id="collaboration-brief-title">
            {isOverviewRequest ? "REQUEST A " : "SUBMIT A "}
            <strong>
              {isOverviewRequest
                ? "PARTNERSHIP OVERVIEW"
                : "COLLABORATION BRIEF"}
            </strong>
          </h2>
        </header>

        <form className={modalStyles.form} onSubmit={handleSubmit}>
          <div className={`${modalStyles.row} ${modalStyles.row1}`}>
            <label
              className={`${modalStyles.fieldShape} ${modalStyles.activeField}`}
            >
              <span className={styles.srOnly}>Full Name</span>
              <input
                type="text"
                name="fullName"
                placeholder="FULL NAME"
                aria-label="Full Name"
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
                aria-label="Organization"
                value={formData.organization}
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className={`${modalStyles.row} ${modalStyles.row2}`}>
            <label className={modalStyles.fieldShape}>
              <span className={styles.srOnly}>Email ID</span>
              <input
                type="email"
                name="email"
                placeholder="EMAIL ID"
                aria-label="Email ID"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </label>
            <div
              className={`${modalStyles.fieldShape} ${modalStyles.phoneField}`}
            >
              <span className={styles.srOnly}>Phone Number</span>
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
              <span className={styles.srOnly}>Country or Region</span>
              <select
                name="country"
                aria-label="Country or region"
                value={formData.country}
                onChange={handleInputChange}
                className={formData.country ? modalStyles.hasValue : ""}
                required
              >
                <option value="">COUNTRY / REGION</option>
                <option value="papua-new-guinea">Papua New Guinea</option>
                <option value="pacific-islands">Pacific Islands</option>
                <option value="australia">Australia</option>
                <option value="asia">Asia</option>
                <option value="other">Other</option>
              </select>
            </label>
            <label className={modalStyles.fieldShape}>
              <span className={styles.srOnly}>Collaboration Type</span>
              <select
                name="collaborationType"
                aria-label="Collaboration type"
                value={formData.collaborationType}
                onChange={handleInputChange}
                className={
                  formData.collaborationType ? modalStyles.hasValue : ""
                }
                required
              >
                <option value="">COLLABORATION TYPE</option>
                <option value="government">Government Ministry</option>
                <option value="donor-ngo">Donor &amp; NGO Program</option>
                <option value="climate-fund-mdb">Climate Fund &amp; MDB</option>
                <option value="private-sector">Private Sector</option>
                <option value="other">Other</option>
              </select>
            </label>
          </div>

          <div className={`${modalStyles.row} ${styles.documentRow}`}>
            <label className={modalStyles.fieldShape}>
              <span className={styles.srOnly}>Brief Description</span>
              <input
                type="text"
                name="description"
                placeholder="BRIEF DESCRIPTION"
                aria-label="Brief description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </label>
            <div className={styles.uploadFieldWrap}>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={`${modalStyles.fieldShape} ${styles.uploadField}`}
                aria-label={
                  fileName
                    ? `Selected file: ${fileName}. Click to change document.`
                    : "Upload document (PDF or DOC format below 2MB)"
                }
              >
                <span>{fileName || "UPLOAD DOCUMENT"}</span>
                <span className={styles.uploadIcon} aria-hidden="true">
                  ↥
                </span>
              </button>
              <label
                htmlFor="collaboration-brief-file"
                className={styles.srOnly}
              >
                Upload document file
              </label>
              <input
                id="collaboration-brief-file"
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
                aria-label="Upload document file"
              />
              <p>(Formats: PDF/DOC, Size: Below 2Mb)</p>
            </div>
          </div>

          <div className={`${modalStyles.agreement} ${styles.agreementRow}`}>
            <input
              type="checkbox"
              id="collaborationbrief-agree"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <label htmlFor="collaborationbrief-agree">
              I agree that GREEN may contact me about this request.
            </label>
          </div>

          {errorMessage && (
            <p className={modalStyles.error} role="alert" aria-live="assertive">
              {errorMessage}
            </p>
          )}
          {successMessage && (
            <p className={modalStyles.success} role="status" aria-live="polite">
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
              <span>
                {isLoading
                  ? "Submitting..."
                  : isOverviewRequest
                    ? "Request Overview"
                    : "Submit Brief"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </ProductEnquiryFrame>
  );
};

export default SubmitCollaborationBrief;
