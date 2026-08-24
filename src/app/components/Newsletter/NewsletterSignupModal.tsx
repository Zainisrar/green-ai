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
} from "@/app/components/shared/EngineeringFormModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const NewsletterSignupModal = ({ isOpen, onClose }: Props) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
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
          firstname: firstName || "Newsletter",
          lastname: "Subscriber",
          email,
          message: "Newsletter subscription request from GREEN Insights signup page.",
        }),
      );

      if (data.Code === "001") {
        setSuccessMessage(data.Message || "You have been subscribed successfully!");
        setEmail("");
        setFirstName("");
        setCaptcha(generateCaptcha());
        setCaptchaInput("");
        setTimeout(() => {
          onClose();
          setSuccessMessage("");
        }, 2000);
      } else {
        setErrorMessage(data.Message || "Subscription failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "An error occurred while subscribing.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <EngineeringFormModal
      isOpen={isOpen}
      onClose={onClose}
      maxWidthClass="max-w-lg"
      title={
        <>
          NEWSLETTER <span className="text-green-600">SIGNUP</span>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="firstName" placeholder="FIRST NAME (OPTIONAL)" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={formFieldClass} />
        <input type="email" name="email" placeholder="E-MAIL ID" value={email} onChange={(e) => setEmail(e.target.value)} className={formFieldClass} required />

        <div className={captchaInputGroupClass}>
          <div className="flex shrink-0 items-center justify-center rounded-lg border border-gray-300 bg-gray-100 px-5 py-2.5 sm:py-3">
            <span className="select-none whitespace-nowrap font-mono text-lg font-bold tracking-[0.35em] text-gray-700">{captcha}</span>
          </div>
          <input type="text" placeholder="Enter captcha" value={captchaInput} onChange={(e) => setCaptchaInput(e.target.value)} className={formFieldClass} required />
        </div>

        {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
        {successMessage && <p className="text-sm text-green-600">{successMessage}</p>}

        <div className="flex justify-end">
          <button type="submit" disabled={isLoading} className="cursor-pointer disabled:opacity-50">
            <img loading="lazy" decoding="async" src="/images/book-consulation/formBtn.png" className="w-28 sm:w-40" alt="Subscribe" />
          </button>
        </div>
      </form>
    </EngineeringFormModal>
  );
};

export default NewsletterSignupModal;
