"use client";

import React, { useEffect, useState } from "react";
import {
  buildReachUsPayload,
  generateCaptcha,
  submitReachUs,
} from "@/app/lib/forms";
import EngineeringFormModal, {
  captchaInputGroupClass,
  captchaRowClass,
  formFieldClass,
  formGridClass,
} from "@/app/components/shared/EngineeringFormModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  organization: string;
  contactName: string;
  email: string;
  phone: string;
  projectType: string;
  projectDescription: string;
  captcha: string;
}

const Proposal = ({ isOpen, onClose }: Props) => {
  const [formData, setFormData] = useState<FormData>({
    organization: "",
    contactName: "",
    email: "",
    phone: "",
    projectType: "",
    projectDescription: "",
    captcha: "",
  });
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      setCaptcha(generateCaptcha());
      setCaptchaInput("");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    if (captchaInput.replace(/\s/g, "") !== captcha.replace(/\s/g, "")) {
      setErrorMessage("Captcha verification failed. Please try again.");
      setCaptcha(generateCaptcha());
      setCaptchaInput("");
      setIsLoading(false);
      return;
    }

    const message = [
      "Request for Proposal (RFP)",
      `Organization: ${formData.organization}`,
      `Project type: ${formData.projectType}`,
      `Description: ${formData.projectDescription}`,
    ].join("\n");

    try {
      const data = await submitReachUs(
        buildReachUsPayload({
          firstname: formData.contactName,
          lastname: formData.organization,
          email: formData.email,
          phone: formData.phone,
          message,
        }),
      );

      if (data.Code === "001") {
        setSuccessMessage(data.Message || "Your proposal request has been submitted successfully!");
        setFormData({
          organization: "",
          contactName: "",
          email: "",
          phone: "",
          projectType: "",
          projectDescription: "",
          captcha: "",
        });
        setCaptcha(generateCaptcha());
        setCaptchaInput("");
        setTimeout(() => {
          onClose();
          setSuccessMessage("");
        }, 2000);
      } else {
        setErrorMessage(data.Message || "Failed to submit proposal request. Please try again.");
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
          REQUEST A <span className="text-green-600">PROPOSAL</span>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className={formGridClass}>
          <input type="text" name="contactName" placeholder="CONTACT NAME" value={formData.contactName} onChange={handleInputChange} className={formFieldClass} required />
          <input type="text" name="organization" placeholder="ORGANIZATION" value={formData.organization} onChange={handleInputChange} className={formFieldClass} required />
        </div>

        <div className={formGridClass}>
          <input type="email" name="email" placeholder="E-MAIL ID" value={formData.email} onChange={handleInputChange} className={formFieldClass} required />
          <input type="tel" name="phone" placeholder="PHONE" value={formData.phone} onChange={handleInputChange} className={formFieldClass} required />
        </div>

        <select name="projectType" value={formData.projectType} onChange={handleInputChange} className={formFieldClass} required>
          <option value="">PROJECT TYPE</option>
          <option value="solar-epcm">Solar EPCM</option>
          <option value="microgrid">Hybrid Microgrid</option>
          <option value="energy-storage">Energy Storage</option>
          <option value="grid-integration">Grid Integration</option>
          <option value="other">Other</option>
        </select>

        <textarea name="projectDescription" placeholder="PROJECT DESCRIPTION / REQUIREMENTS" value={formData.projectDescription} onChange={handleInputChange} rows={3} className={`${formFieldClass} resize-none`} required />

        <div className={captchaRowClass}>
          <div className={captchaInputGroupClass}>
            <div className="rounded border bg-gray-200 px-3 py-2 sm:px-4">
              <span className="font-mono text-base sm:text-lg">{captcha}</span>
            </div>
            <input type="text" placeholder="Enter captcha" value={captchaInput} onChange={(e) => setCaptchaInput(e.target.value)} className={`${formFieldClass} sm:max-w-[200px]`} required />
          </div>
          <button type="submit" disabled={isLoading} className="shrink-0 cursor-pointer self-end disabled:opacity-50">
            <img src="/images/book-consulation/formBtn.png" className="w-28 sm:w-40" alt="Submit proposal" />
          </button>
        </div>

        {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
        {successMessage && <p className="text-sm text-green-600">{successMessage}</p>}
      </form>
    </EngineeringFormModal>
  );
};

export default Proposal;
