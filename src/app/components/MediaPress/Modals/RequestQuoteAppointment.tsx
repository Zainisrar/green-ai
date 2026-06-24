"use client";

import React, { useEffect, useRef, useState } from "react";
import { buildReachUsPayload, submitReachUs } from "@/app/lib/forms";
import EngineeringFormModal, {
  formFieldClass,
  formGridClass,
} from "@/app/components/shared/EngineeringFormModal";
import PhoneInput from "@/app/components/shared/PhoneInput";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  fullName: string;
  organization: string;
  email: string;
  phone: string;
  requestType: string;
  projectInterest: string;
  description: string;
}

const initialFormData: FormData = {
  fullName: "",
  organization: "",
  email: "",
  phone: "",
  requestType: "",
  projectInterest: "",
  description: "",
};

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const RequestQuoteAppointment = ({ isOpen, onClose }: Props) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [phoneCountry, setPhoneCountry] = useState({ dial_code: "+675", country_code: "pg" });
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
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
      setErrorMessage("Please agree that GREEN may contact you about this request.");
      return;
    }

    setIsLoading(true);

    const message = [
      "Media & Press — Request Quote / Appointment",
      `Organization: ${formData.organization}`,
      `Request type: ${formData.requestType}`,
      `Project / service interest: ${formData.projectInterest}`,
      `Brief project description: ${formData.description}`,
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
          data.Message || "Your request has been submitted successfully!",
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
    <EngineeringFormModal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <>
          REQUEST QUOTE / <span className="text-green-600">APPOINTMENT</span>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className={formGridClass}>
          <input
            type="text"
            name="fullName"
            placeholder="FULL NAME"
            value={formData.fullName}
            onChange={handleInputChange}
            className={formFieldClass}
            required
          />
          <input
            type="text"
            name="organization"
            placeholder="ORGANIZATION"
            value={formData.organization}
            onChange={handleInputChange}
            className={formFieldClass}
          />
        </div>

        <div className={formGridClass}>
          <input
            type="email"
            name="email"
            placeholder="EMAIL ID"
            value={formData.email}
            onChange={handleInputChange}
            className={formFieldClass}
            required
          />
          <PhoneInput
            phone={formData.phone}
            onPhoneChange={handleInputChange}
            dialCode={phoneCountry.dial_code}
            countryCode={phoneCountry.country_code}
            onCountryChange={(dial_code, country_code) => setPhoneCountry({ dial_code, country_code })}
          />
        </div>

        <div className={formGridClass}>
          <select
            name="requestType"
            value={formData.requestType}
            onChange={handleInputChange}
            className={`${formFieldClass} cursor-pointer ${
              formData.requestType ? "text-gray-700" : "text-gray-500"
            }`}
            required
          >
            <option value="">REQUEST TYPE</option>
            <option value="media-interview">Media Interview</option>
            <option value="press-appointment">Press Appointment</option>
            <option value="quote-statement">Quote / Statement</option>
            <option value="speaking-engagement">Speaking Engagement</option>
            <option value="brand-assets">Brand Assets / Media Kit</option>
            <option value="other">Other</option>
          </select>
          <select
            name="projectInterest"
            value={formData.projectInterest}
            onChange={handleInputChange}
            className={`${formFieldClass} cursor-pointer ${
              formData.projectInterest ? "text-gray-700" : "text-gray-500"
            }`}
            required
          >
            <option value="">PROJECT / SERVICE INTEREST</option>
            <option value="solar-energy">Solar Energy Solutions</option>
            <option value="microgrid">Microgrid Solutions</option>
            <option value="grid-integration">Grid Integration</option>
            <option value="energy-storage">Energy Storage</option>
            <option value="esg-sustainability">ESG &amp; Sustainability</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className={formGridClass}>
          <input
            type="text"
            name="description"
            placeholder="BRIEF PROJECT DESCRIPTION"
            value={formData.description}
            onChange={handleInputChange}
            className={formFieldClass}
          />
          <div className="min-w-0">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={`${formFieldClass} flex items-center justify-between text-left`}
            >
              <span className="truncate text-gray-500">
                {fileName || "UPLOAD DOCUMENT"}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 h-5 w-5 shrink-0 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16V4m0 0L8 8m4-4l4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
                />
              </svg>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
            />
            <p className="mt-1 text-xs text-[#23B14D]">
              (Formats: PDF/DOC, Size: Below 2Mb)
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="requestquote-agree"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
          />
          <label htmlFor="requestquote-agree" className="text-sm text-gray-700 sm:text-base">
            I agree that GREEN may contact me about this request.
          </label>
        </div>

        {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
        {successMessage && <p className="text-sm text-green-600">{successMessage}</p>}

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-end sm:gap-6">
          <button
            type="button"
            onClick={resetForm}
            disabled={isLoading}
            className="cursor-pointer -skew-x-[16deg] rounded-md bg-gradient-to-r from-[#23B14D]/70 to-[#FFFE50]/70 px-10 py-3 shadow-md transition hover:brightness-105 disabled:opacity-50"
          >
            <span className="block text-sm font-bold text-gray-800 sm:text-base">
              Reset
            </span>
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="cursor-pointer -skew-x-[16deg] rounded-md bg-gradient-to-r from-[#23B14D]/70 to-[#FFFE50]/70 px-10 py-3 shadow-md transition hover:brightness-105 disabled:opacity-50"
          >
            <span className="block text-sm font-bold text-gray-900 sm:text-base">
              {isLoading ? "Submitting..." : "Submit Request"}
            </span>
          </button>
        </div>
      </form>
    </EngineeringFormModal>
  );
};

export default RequestQuoteAppointment;
