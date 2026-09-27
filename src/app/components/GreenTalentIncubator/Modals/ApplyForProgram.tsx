"use client";

import React, { useEffect, useRef, useState } from "react";
import modalStyles from "@/app/components/SmartGrid/Modals/SmartGridModals.module.css";
import { ProductEnquiryFrame } from "@/app/components/Product/Modals/ProductEnquiry";
import PhoneInput from "@/app/components/shared/PhoneInput";
import { buildReachUsPayload, submitReachUs } from "@/app/lib/forms";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  fullName: string;
  organization: string;
  email: string;
  phone: string;
  program: string;
  role: string;
  description: string;
}

const initialFormData: FormData = {
  fullName: "",
  organization: "",
  email: "",
  phone: "",
  program: "",
  role: "",
  description: "",
};

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const ApplyForProgram = ({ isOpen, onClose }: Props) => {
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
      "GREEN Talent Incubator — Apply for a Program",
      `Organization: ${formData.organization}`,
      `Program of interest: ${formData.program}`,
      `Role / position: ${formData.role}`,
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
          data.Message || "Your application has been submitted successfully!",
        );
        resetForm();
        setTimeout(() => {
          onClose();
          setSuccessMessage("");
        }, 2000);
      } else {
        setErrorMessage(
          data.Message || "Failed to submit application. Please try again.",
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
      labelledBy="apply-program-title"
      onClose={onClose}
      closeLabel="Close apply for a program dialog"
    >
      <div className={modalStyles.content}>
        <header className={modalStyles.dialogHeader}>
          <h2 id="apply-program-title">
            APPLY FOR A <strong>PROGRAM</strong>
          </h2>
        </header>

        <form className={modalStyles.form} onSubmit={handleSubmit}>
          <div className={`${modalStyles.row} ${modalStyles.row1}`}>
            <label
              className={`${modalStyles.fieldShape} ${modalStyles.activeField}`}
            >
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
              <input
                type="text"
                name="organization"
                placeholder="ORGANIZATION"
                value={formData.organization}
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className={`${modalStyles.row} ${modalStyles.row2}`}>
            <label className={modalStyles.fieldShape}>
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
            <div className={modalStyles.fieldShape}>
              <select
                name="program"
                value={formData.program}
                onChange={handleInputChange}
                className={formData.program ? modalStyles.hasValue : ""}
                required
              >
                <option value="">PROGRAM OF INTEREST</option>
                <option value="apprenticeship">Apprenticeship</option>
                <option value="internship">Internship</option>
                <option value="graduate-program">Graduate Program</option>
                <option value="field-technician-training">
                  Field Technician Training
                </option>
                <option value="leadership-track">Leadership Track</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className={modalStyles.fieldShape}>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className={formData.role ? modalStyles.hasValue : ""}
                required
              >
                <option value="">YOUR ROLE / POSITION</option>
                <option value="student">Student</option>
                <option value="recent-graduate">Recent Graduate</option>
                <option value="working-professional">Working Professional</option>
                <option value="educator">Educator</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className={`${modalStyles.row} ${modalStyles.row4}`}>
            <label className={modalStyles.fieldShape}>
              <input
                type="text"
                name="description"
                placeholder="BRIEF DESCRIPTION OF INTEREST OR APPLICATION"
                value={formData.description}
                onChange={handleInputChange}
              />
            </label>
            <div className={modalStyles.fieldShape}>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex h-full w-full items-center justify-between px-[34px] text-left text-sm text-[rgb(48_48_48_/_80%)]"
              >
                <span className="truncate">
                  {fileName || "UPLOAD SUPPORTING DOCUMENT"}
                </span>
                <span aria-hidden="true" className="ml-3 text-xl">
                  ⇧
                </span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>
          <p className="-mt-3 ml-1 text-xs text-[#23B14D]">
            (Formats: PDF/DOC, Size: Below 2Mb)
          </p>

          <div className={`${modalStyles.agreement} ${modalStyles.row5}`}>
            <input
              type="checkbox"
              id="applyprogram-agree"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <label htmlFor="applyprogram-agree">
              I agree that GREEN may contact me about this request.
            </label>
          </div>

          {errorMessage && <p className={modalStyles.error}>{errorMessage}</p>}
          {successMessage && (
            <p className={modalStyles.success}>{successMessage}</p>
          )}

          <div className={`${modalStyles.row} ${modalStyles.row6}`}>
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
              <span>{isLoading ? "Submitting..." : "Submit"}</span>
            </button>
          </div>
        </form>
      </div>
    </ProductEnquiryFrame>
  );
};

export default ApplyForProgram;
