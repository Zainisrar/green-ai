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
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  phone_dial_code: string;
  phone_country_code: string;
  message: string;
  is_whatsapp_number: boolean;
}

// Countries with dial codes
const COUNTRIES = [
  { name: "Papua New Guinea", dial_code: "+675", code: "pg" },
  { name: "Australia", dial_code: "+61", code: "au" },
  { name: "Austria", dial_code: "+43", code: "at" },
  { name: "Belgium", dial_code: "+32", code: "be" },
  { name: "Brazil", dial_code: "+55", code: "br" },
  { name: "Canada", dial_code: "+1", code: "ca" },
  { name: "China", dial_code: "+86", code: "cn" },
  { name: "Denmark", dial_code: "+45", code: "dk" },
  { name: "Finland", dial_code: "+358", code: "fi" },
  { name: "France", dial_code: "+33", code: "fr" },
  { name: "Germany", dial_code: "+49", code: "de" },
  { name: "Greece", dial_code: "+30", code: "gr" },
  { name: "Hong Kong", dial_code: "+852", code: "hk" },
  { name: "India", dial_code: "+91", code: "in" },
  { name: "Indonesia", dial_code: "+62", code: "id" },
  { name: "Ireland", dial_code: "+353", code: "ie" },
  { name: "Israel", dial_code: "+972", code: "il" },
  { name: "Italy", dial_code: "+39", code: "it" },
  { name: "Japan", dial_code: "+81", code: "jp" },
  { name: "Mexico", dial_code: "+52", code: "mx" },
  { name: "Malaysia", dial_code: "+60", code: "my" },
  { name: "Netherlands", dial_code: "+31", code: "nl" },
  { name: "New Zealand", dial_code: "+64", code: "nz" },
  { name: "Norway", dial_code: "+47", code: "no" },
  { name: "Pakistan", dial_code: "+92", code: "pk" },
  { name: "Philippines", dial_code: "+63", code: "ph" },
  { name: "Poland", dial_code: "+48", code: "pl" },
  { name: "Portugal", dial_code: "+351", code: "pt" },
  { name: "Russia", dial_code: "+7", code: "ru" },
  { name: "Saudi Arabia", dial_code: "+966", code: "sa" },
  { name: "Singapore", dial_code: "+65", code: "sg" },
  { name: "South Africa", dial_code: "+27", code: "za" },
  { name: "South Korea", dial_code: "+82", code: "kr" },
  { name: "Spain", dial_code: "+34", code: "es" },
  { name: "Sweden", dial_code: "+46", code: "se" },
  { name: "Switzerland", dial_code: "+41", code: "ch" },
  { name: "Taiwan", dial_code: "+886", code: "tw" },
  { name: "Thailand", dial_code: "+66", code: "th" },
  { name: "Turkey", dial_code: "+90", code: "tr" },
  { name: "United Arab Emirates", dial_code: "+971", code: "ae" },
  { name: "United Kingdom", dial_code: "+44", code: "gb" },
  { name: "United States", dial_code: "+1", code: "us" },
  { name: "Vietnam", dial_code: "+84", code: "vn" },
];

const initialFormData: FormData = {
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  phone_dial_code: "+675",
  phone_country_code: "pg",
  message: "",
  is_whatsapp_number: false,
};

const Form = ({ isOpen, onClose }: Props) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState("");

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
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name === "phone_country") {
      const selected = COUNTRIES.find((c) => c.code === value);
      if (selected) {
        setFormData((prev) => ({
          ...prev,
          phone_dial_code: selected.dial_code,
          phone_country_code: selected.code,
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
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

    try {
      const data = await submitReachUs(
        buildReachUsPayload({
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          phone: formData.phone,
          phone_dial_code: formData.phone_dial_code,
          phone_country_code: formData.phone_country_code,
          is_whatsapp_number: formData.is_whatsapp_number,
          message: formData.message,
        }),
      );

      if (data.Code === "001") {
        setSuccessMessage(
          data.Message || "Your enquiry has been submitted successfully!",
        );
        setFormData(initialFormData);
        setCaptcha(generateCaptcha());
        setCaptchaInput("");
        setTimeout(() => {
          onClose();
          setSuccessMessage("");
        }, 2000);
      } else {
        setErrorMessage(data.Message || "Failed to submit enquiry. Please try again.");
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
      maxWidthClass="max-w-6xl"
      title={
        <>
          REACH <span className="text-green-600">US</span>
        </>
      }
      subtitle="Let's connect and power your future."
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className={formGridClass}>
            <input
              type="text"
              name="firstname"
              placeholder="FIRST NAME"
              value={formData.firstname}
              onChange={handleInputChange}
              className={formFieldClass}
              required
            />
            <input
              type="text"
              name="lastname"
              placeholder="LAST NAME"
              value={formData.lastname}
              onChange={handleInputChange}
              className={formFieldClass}
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="E-MAIL ID"
            value={formData.email}
            onChange={handleInputChange}
            className={formFieldClass}
            required
          />

          <div className={formGridClass}>
            <select
              name="phone_country"
              value={formData.phone_country_code}
              onChange={handleInputChange}
              className={`${formFieldClass} cursor-pointer`}
              required
            >
              {COUNTRIES.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name} ({country.dial_code})
                </option>
              ))}
            </select>
            <div className="flex min-w-0">
              <div className="flex shrink-0 items-center rounded-l-lg border border-r-0 border-gray-300 bg-white px-2 py-2.5 sm:px-3 sm:py-3">
                <span className="text-sm text-gray-700 sm:text-base">
                  {formData.phone_dial_code}
                </span>
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
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="reachus-whatsapp"
              name="is_whatsapp_number"
              checked={formData.is_whatsapp_number}
              onChange={handleInputChange}
              className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <label htmlFor="reachus-whatsapp" className="text-sm text-gray-700 sm:text-base">
              Is this your WhatsApp number?
            </label>
          </div>

          <textarea
            name="message"
            placeholder="MESSAGE"
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
            className={`${formFieldClass} resize-none`}
            required
          />

          {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
          {successMessage && <p className="text-sm text-green-600">{successMessage}</p>}

          <div className={captchaRowClass}>
            <div className={captchaInputGroupClass}>
              <div className="rounded border bg-gray-200 px-3 py-2 sm:px-4">
                <span className="font-mono text-base tracking-widest sm:text-lg">
                  {captcha}
                </span>
              </div>
              <input
                type="text"
                placeholder="Enter captcha"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                className={`${formFieldClass} sm:max-w-[200px]`}
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="shrink-0 cursor-pointer self-end disabled:opacity-50"
            >
              <img
                src="/images/book-consulation/formBtn.png"
                className="w-28 sm:w-40"
                alt={isLoading ? "Submitting..." : "Submit"}
              />
            </button>
          </div>
        </form>

        {/* Marketing Message */}
        <div className="flex flex-col items-center justify-center text-center lg:items-start lg:text-left">
          <h3 className="mb-3 text-2xl font-bold italic text-green-600 sm:text-3xl lg:text-4xl">
            &quot;Power Your Future&quot;
          </h3>
          <h2 className="text-2xl font-bold leading-tight text-gray-800 sm:text-3xl lg:text-4xl">
            Get a Free <span className="italic">Solar</span> Quote Today!
          </h2>
        </div>
      </div>
    </EngineeringFormModal>
  );
};

export default Form;
