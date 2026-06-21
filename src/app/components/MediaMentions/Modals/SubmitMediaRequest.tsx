"use client";

import React, { useEffect, useState } from "react";
import { buildReachUsPayload, submitReachUs } from "@/app/lib/forms";
import EngineeringFormModal, {
  formFieldClass,
  formGridClass,
} from "@/app/components/shared/EngineeringFormModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  requestType: string;
  details: string;
}

const initialFormData: FormData = {
  fullName: "",
  email: "",
  phone: "",
  requestType: "",
  details: "",
};

const SubmitMediaRequest = ({ isOpen, onClose }: Props) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

  const resetForm = () => {
    setFormData(initialFormData);
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
      "Submit Media Request (Media & Mentions)",
      `Request type: ${formData.requestType}`,
      `Message / details: ${formData.details || "None"}`,
    ].join("\n");

    try {
      const data = await submitReachUs(
        buildReachUsPayload({
          firstname: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          message,
        }),
      );

      if (data.Code === "001") {
        setSuccessMessage(
          data.Message || "Your media request has been submitted successfully!",
        );
        resetForm();
        setTimeout(() => {
          onClose();
          setSuccessMessage("");
        }, 2000);
      } else {
        setErrorMessage(data.Message || "Failed to submit your request. Please try again.");
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
          SUBMIT <span className="text-green-600">MEDIA REQUEST</span>
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
            type="email"
            name="email"
            placeholder="EMAIL ID"
            value={formData.email}
            onChange={handleInputChange}
            className={formFieldClass}
            required
          />
        </div>

        <div className={formGridClass}>
          <div className="flex min-w-0">
            <div className="flex shrink-0 items-center rounded-l-lg border border-r-0 border-gray-300 bg-white px-2 py-2.5 sm:px-3 sm:py-3">
              <img
                src="/images/book-consulation/countryCode.png"
                alt=""
                className="mr-1 h-4 w-5 sm:mr-2 sm:w-6"
              />
              <span className="text-sm text-gray-700 sm:text-base">+675</span>
            </div>
            <input
              type="tel"
              name="phone"
              placeholder="PHONE"
              value={formData.phone}
              onChange={handleInputChange}
              className={`${formFieldClass} rounded-l-none`}
              required
            />
          </div>
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
            <option value="interview">Interview Request</option>
            <option value="press-release">Press Release</option>
            <option value="media-kit">Media Kit</option>
            <option value="speaking">Speaking Engagement</option>
            <option value="partnership">Media Partnership</option>
            <option value="other">Other</option>
          </select>
        </div>

        <textarea
          name="details"
          placeholder="MESSAGE / DETAILS"
          value={formData.details}
          onChange={handleInputChange}
          rows={3}
          className={`${formFieldClass} resize-none`}
        />

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="media-request-agree"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
          />
          <label htmlFor="media-request-agree" className="text-sm text-gray-700 sm:text-base">
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
            className="cursor-pointer rounded-md bg-gradient-to-r from-[#23B14D]/70 to-[#FFFE50]/70 px-10 py-3 shadow-md transition hover:brightness-105 disabled:opacity-50"
          >
            <span className="block text-sm font-bold text-gray-800 sm:text-base">
              Reset
            </span>
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="cursor-pointer rounded-md bg-gradient-to-r from-[#23B14D]/70 to-[#FFFE50]/70 px-10 py-3 shadow-md transition hover:brightness-105 disabled:opacity-50"
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

export default SubmitMediaRequest;
