"use client";

import React, { useEffect, useState } from "react";
import { buildReachUsPayload, submitReachUs } from "@/app/lib/forms";
import EngineeringFormModal, {
  formFieldClass,
  formGridClass,
} from "@/app/components/shared/EngineeringFormModal";
import PhoneInput from "@/app/components/shared/PhoneInput";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  /** Service options to choose from (defaults to the EPCM phases). */
  services?: string[];
  /** Service preselected when the modal opens. */
  defaultService?: string;
}

interface FormData {
  fullName: string;
  organization: string;
  email: string;
  phone: string;
  serviceInterest: string;
  consultationType: string;
  message: string;
}

const DEFAULT_SERVICES = [
  "Engineering",
  "Procurement",
  "Construction",
  "Management",
  "Full EPCM",
];

const initialFormData: FormData = {
  fullName: "",
  organization: "",
  email: "",
  phone: "",
  serviceInterest: "",
  consultationType: "",
  message: "",
};

const Enquiry = ({ isOpen, onClose, services, defaultService }: Props) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [phoneCountry, setPhoneCountry] = useState({ dial_code: "+675", country_code: "pg" });
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const serviceOptions = services && services.length > 0 ? services : DEFAULT_SERVICES;

  useEffect(() => {
    if (isOpen) {
      setSuccessMessage("");
      setErrorMessage("");
      setFormData((prev) => ({ ...prev, serviceInterest: defaultService ?? "" }));
    }
  }, [isOpen, defaultService]);

  if (!isOpen) return null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({ ...initialFormData, serviceInterest: defaultService ?? "" });
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
      "EPCM Energy Enquiry",
      `Organization: ${formData.organization}`,
      `Service of interest: ${formData.serviceInterest}`,
      `Preferred consultation type: ${formData.consultationType}`,
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
          data.Message || "Your enquiry has been submitted successfully!",
        );
        resetForm();
        setTimeout(() => {
          onClose();
          setSuccessMessage("");
        }, 2000);
      } else {
        setErrorMessage(data.Message || "Failed to submit your enquiry. Please try again.");
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
          EPCM <span className="text-green-600">ENQUIRY</span>
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
            required
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
            name="serviceInterest"
            value={formData.serviceInterest}
            onChange={handleInputChange}
            className={`${formFieldClass} cursor-pointer ${
              formData.serviceInterest ? "text-gray-700" : "text-gray-500"
            }`}
            required
          >
            <option value="">SERVICE OF INTEREST</option>
            {serviceOptions.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
          <select
            name="consultationType"
            value={formData.consultationType}
            onChange={handleInputChange}
            className={`${formFieldClass} cursor-pointer ${
              formData.consultationType ? "text-gray-700" : "text-gray-500"
            }`}
            required
          >
            <option value="">PREFERRED CONSULTATION TYPE</option>
            <option value="virtual">Virtual (Zoom / Google Meet)</option>
            <option value="in-person">In-Person</option>
            <option value="phone-call">Phone Call</option>
          </select>
        </div>

        <textarea
          name="message"
          placeholder="BRIEF MESSAGE"
          value={formData.message}
          onChange={handleInputChange}
          rows={3}
          className={`${formFieldClass} resize-none`}
        />

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="energy-enquiry-agree"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
          />
          <label htmlFor="energy-enquiry-agree" className="text-sm text-gray-700 sm:text-base">
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
              {isLoading ? "Submitting..." : "Send Enquiry"}
            </span>
          </button>
        </div>
      </form>
    </EngineeringFormModal>
  );
};

export default Enquiry;
