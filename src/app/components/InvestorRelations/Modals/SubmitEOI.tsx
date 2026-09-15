"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { ProductEnquiryFrame } from "@/app/components/Product/Modals/ProductEnquiry";
import modalStyles from "@/app/components/SmartGrid/Modals/SmartGridModals.module.css";
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
  country: string;
  eoiType: string;
  message: string;
}

const initialFormData: FormData = {
  fullName: "",
  organization: "",
  email: "",
  phone: "",
  country: "",
  eoiType: "",
  message: "",
};

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const SubmitEOI = ({ isOpen, onClose }: Props) => {
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
        "Please agree that GREEN may contact you about this request.",
      );
      return;
    }

    setIsLoading(true);

    const message = [
      "Investor Relations — Submit an Expression of Interest",
      `Organization: ${formData.organization}`,
      `Country / region: ${formData.country}`,
      `EOI type: ${formData.eoiType}`,
      `Brief message: ${formData.message}`,
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
            "Your expression of interest has been submitted successfully!",
        );
        resetForm();
        setTimeout(() => {
          onClose();
          setSuccessMessage("");
        }, 2000);
      } else {
        setErrorMessage(
          data.Message || "Failed to submit EOI. Please try again.",
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
      labelledBy="submit-eoi-title"
      onClose={onClose}
      closeLabel="Close expression of interest form"
    >
      <div className={modalStyles.content}>
        <header className={modalStyles.dialogHeader}>
          <h2 id="submit-eoi-title">
            SUBMIT AN <strong>EXPRESSION OF INTEREST</strong>
          </h2>
        </header>

        <form className={modalStyles.form} onSubmit={handleSubmit}>
          <div className={`${modalStyles.row} ${modalStyles.row1}`}>
            <label className={modalStyles.fieldShape}>
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
                name="country"
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
            </div>
            <div className={modalStyles.fieldShape}>
              <select
                name="eoiType"
                value={formData.eoiType}
                onChange={handleInputChange}
                className={formData.eoiType ? modalStyles.hasValue : ""}
                required
              >
                <option value="">EOI TYPE</option>
                <option value="equity-investment">Equity Investment</option>
                <option value="debt-bonds">Debt / Green Bonds</option>
                <option value="grant-concessional">
                  Grant / Concessional Capital
                </option>
                <option value="strategic-partnership">
                  Strategic Partnership
                </option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className={`${modalStyles.row} ${modalStyles.row4}`}>
            <label className={modalStyles.fieldShape}>
              <input
                type="text"
                name="message"
                placeholder="BRIEF MESSAGE"
                value={formData.message}
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
          <p className="-mt-4 ml-2 text-xs text-[#23B14D]">
            (Formats: PDF/DOC, Size: Below 2Mb)
          </p>

          <div className={`${modalStyles.agreement} ${modalStyles.row5}`}>
            <input
              type="checkbox"
              id="submiteoi-agree"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <label htmlFor="submiteoi-agree">
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
              <span>{isLoading ? "Submitting..." : "Submit EOI"}</span>
            </button>
          </div>
        </form>
      </div>
    </ProductEnquiryFrame>
  );
};

export default SubmitEOI;
