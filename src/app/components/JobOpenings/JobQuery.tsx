"use client";

import type React from "react";
import { useEffect, useState } from "react";
import EngineeringFormModal, {
  formFieldClass,
  formGridClass,
} from "@/app/components/shared/EngineeringFormModal";
import sharedStyles from "@/app/components/shared/EngineeringFormModal.module.css";
import PhoneInput from "@/app/components/shared/PhoneInput";
import { buildReachUsPayload, submitReachUs } from "@/app/lib/forms";

interface JobQueryProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  feedbackType: string;
  role: string;
  queries: string;
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  feedbackType: "",
  role: "",
  queries: "",
};

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

/** Figma node 7077:17222 — Job Query overlay. */
export default function JobQuery({ isOpen, onClose }: JobQueryProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneCountry, setPhoneCountry] = useState({
    dial_code: "+675",
    country_code: "pg",
  });

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
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
    setPhone("");
    setPhoneCountry({ dial_code: "+675", country_code: "pg" });
    setErrorMessage("");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage("");

    if (!EMAIL_REGEX.test(formData.email.trim())) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    const message = [
      "Careers — Job Query",
      `Type of feedback: ${formData.feedbackType}`,
      `Role: ${formData.role || "General"}`,
      `Queries: ${formData.queries}`,
    ].join("\n");

    try {
      const data = await submitReachUs(
        buildReachUsPayload({
          firstname: formData.firstName,
          lastname: formData.lastName,
          email: formData.email,
          phone: phone,
          phone_dial_code: phoneCountry.dial_code,
          phone_country_code: phoneCountry.country_code,
          message,
        }),
      );

      if (data.Code === "001") {
        setSubmitted(true);
        resetForm();
      } else {
        setErrorMessage(
          data.Message || "Failed to submit your query. Please try again.",
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
      title={
        <span className="relative left-5 top-2 text-black">
          JOB <span className="text-[#23B14D]">QUERY</span>
        </span>
      }
      geometry="liveDemo"
    >
      {submitted ? (
        <output className="flex min-h-[25rem] flex-col items-center justify-center text-center">
          <h3 className="text-2xl font-bold text-[#23B14D]">Thank you</h3>
          <p className="mt-3 max-w-lg text-gray-700">
            Your job query has been received. Our careers team will respond
            shortly.
          </p>
          <button
            className="mt-6 font-semibold text-[#23B14D]"
            onClick={onClose}
            type="button"
          >
            Close
          </button>
        </output>
      ) : (
        <form
          className={`space-y-4 sm:space-y-6 ${sharedStyles.jobQueryForm}`}
          onReset={resetForm}
          onSubmit={handleSubmit}
        >
          <div className={formGridClass}>
            <input
              aria-label="First name"
              name="firstName"
              placeholder="FIRST NAME"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className={`${formFieldClass} ${sharedStyles.initialFocusField}`}
            />
            <input
              aria-label="Last name"
              name="lastName"
              placeholder="LAST NAME"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              className={formFieldClass}
            />
          </div>
          <div className={formGridClass}>
            <input
              aria-label="Email ID"
              name="email"
              placeholder="EMAIL ID"
              value={formData.email}
              onChange={handleInputChange}
              required
              type="email"
              className={formFieldClass}
            />
            <PhoneInput
              phone={phone}
              onPhoneChange={(event) => setPhone(event.target.value)}
              dialCode={phoneCountry.dial_code}
              countryCode={phoneCountry.country_code}
              onCountryChange={(dial_code, country_code) =>
                setPhoneCountry({ dial_code, country_code })
              }
            />
          </div>
          <div className={formGridClass}>
            <select
              aria-label="Type of feedback"
              name="feedbackType"
              value={formData.feedbackType}
              onChange={handleInputChange}
              required
              className={formFieldClass}
            >
              <option disabled value="">
                TYPE OF FEEDBACK
              </option>
              <option value="Job application">Job application</option>
              <option value="Role information">Role information</option>
              <option value="General enquiry">General enquiry</option>
            </select>
            <select
              aria-label="Role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className={formFieldClass}
            >
              <option disabled value="">
                ROLE
              </option>
              <option value="Security Supervisor">Security Supervisor</option>
              <option value="Solar Project Engineer">
                Solar Project Engineer
              </option>
              <option value="Client Service Coordinator">
                Client Service Coordinator
              </option>
            </select>
          </div>
          <textarea
            aria-label="Queries"
            name="queries"
            placeholder="QUERIES"
            value={formData.queries}
            onChange={handleInputChange}
            required
            rows={3}
            className={`${formFieldClass} resize-none`}
          />
          {errorMessage && (
            <p className="text-sm text-red-600">{errorMessage}</p>
          )}
          <div
            className={`flex flex-col gap-4 sm:flex-row sm:justify-end sm:gap-6 ${sharedStyles.liveDemoActions} ${sharedStyles.jobQueryActions}`}
          >
            <button type="reset" disabled={isLoading}>
              <span className="block text-sm font-bold sm:text-base">
                Reset
              </span>
            </button>
            <button type="submit" disabled={isLoading}>
              <span className="block text-sm font-bold sm:text-base">
                {isLoading ? "Sending..." : "Send Enquiry"}
              </span>
            </button>
          </div>
        </form>
      )}
    </EngineeringFormModal>
  );
}
