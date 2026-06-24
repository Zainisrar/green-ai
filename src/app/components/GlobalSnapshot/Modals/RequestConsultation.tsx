"use client";

import React, { useEffect, useRef, useState } from "react";
import { buildReachUsPayload, submitReachUs } from "@/app/lib/forms";
import EngineeringFormModal, {
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
  helpWith: string;
  consultationType: string;
  projectDetails: string;
}

const initialFormData: FormData = {
  fullName: "",
  organization: "",
  email: "",
  phone: "",
  helpWith: "",
  consultationType: "",
  projectDetails: "",
};

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const fieldBox =
  "flex w-full min-w-0 items-center rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm focus-within:border-green-500 sm:px-4 sm:py-3 sm:text-base";
const fieldInner =
  "w-full min-w-0 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none";

const RequestConsultation = ({ isOpen, onClose }: Props) => {
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
      "Request a Consultation (Global Snapshot)",
      `Organization: ${formData.organization}`,
      `What they need help with: ${formData.helpWith}`,
      `Preferred consultation type: ${formData.consultationType}`,
      `Project details: ${formData.projectDetails || "None"}`,
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
          data.Message || "Your consultation request has been submitted successfully!",
        );
        resetForm();
        setTimeout(() => {
          onClose();
          setSuccessMessage("");
        }, 2000);
      } else {
        setErrorMessage(
          data.Message || "Failed to submit consultation request. Please try again.",
        );
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
          REQUEST A <span className="text-green-600">CONSULTATION</span>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className={formGridClass}>
          <div className={fieldBox}>
            <input
              type="text"
              name="fullName"
              placeholder="FULL NAME"
              value={formData.fullName}
              onChange={handleInputChange}
              className={fieldInner}
              required
            />
          </div>
          <div className={fieldBox}>
            <input
              type="text"
              name="organization"
              placeholder="ORGANIZATION"
              value={formData.organization}
              onChange={handleInputChange}
              className={fieldInner}
              required
            />
          </div>
        </div>

        <div className={formGridClass}>
          <div className={fieldBox}>
            <input
              type="email"
              name="email"
              placeholder="EMAIL ID"
              value={formData.email}
              onChange={handleInputChange}
              className={fieldInner}
              required
            />
          </div>
          <PhoneInput
            phone={formData.phone}
            onPhoneChange={handleInputChange}
            dialCode={phoneCountry.dial_code}
            countryCode={phoneCountry.country_code}
            onCountryChange={(dial_code, country_code) => setPhoneCountry({ dial_code, country_code })}
          />
        </div>

        <div className={formGridClass}>
          <div className={fieldBox}>
            <select
              name="helpWith"
              value={formData.helpWith}
              onChange={handleInputChange}
              className={`${fieldInner} cursor-pointer ${
                formData.helpWith ? "text-gray-700" : "text-gray-500"
              }`}
              required
            >
              <option value="">WHAT DO YOU NEED HELP WITH?</option>
              <option value="project-planning">Project Planning</option>
              <option value="solar-epcm">Solar EPCM Advisory</option>
              <option value="policy-energy-access">Policy &amp; Energy Access</option>
              <option value="donor-development">Donor &amp; Development</option>
              <option value="technology-vendors">Technology Vendors</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className={fieldBox}>
            <select
              name="consultationType"
              value={formData.consultationType}
              onChange={handleInputChange}
              className={`${fieldInner} cursor-pointer ${
                formData.consultationType ? "text-gray-700" : "text-gray-500"
              }`}
              required
            >
              <option value="">PREFERRED CONSULTATION TYPE</option>
              <option value="discovery-call">30-Minute Discovery Call</option>
              <option value="technical-session">One-Hour Technical Session</option>
              <option value="in-person">In-Person (HQ / Field Offices)</option>
            </select>
          </div>
        </div>

        <div className={formGridClass}>
          <div className={fieldBox}>
            <textarea
              name="projectDetails"
              placeholder="PROJECT DETAILS"
              value={formData.projectDetails}
              onChange={handleInputChange}
              rows={1}
              className={`${fieldInner} resize-none`}
            />
          </div>
          <div className="min-w-0">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={`${fieldBox} justify-between text-left`}
            >
              <span className="truncate text-gray-500">
                {fileName || "UPLOAD FILES"}
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
              Formats: PDF/DOC, Size: Below 2Mb
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="consultation-agree"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
          />
          <label htmlFor="consultation-agree" className="text-sm text-gray-700 sm:text-base">
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

export default RequestConsultation;
