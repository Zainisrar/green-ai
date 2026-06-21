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
  firstName: string;
  organization: string;
  email: string;
  areaOfConsultation: string;
  phone: string;
  preferredDateTime: string;
  whatsappNumber: string;
  notes: string;
}

const Booking = ({ isOpen, onClose }: Props) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    organization: "",
    email: "",
    areaOfConsultation: "",
    phone: "",
    preferredDateTime: "",
    whatsappNumber: "",
    notes: "",
  });

  const [useWhatsapp, setUseWhatsapp] = useState(false);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
      "Book a Consultation request",
      `Organization: ${formData.organization}`,
      `Area of consultation: ${formData.areaOfConsultation}`,
      `Preferred date/time: ${formData.preferredDateTime}`,
      `WhatsApp number: ${useWhatsapp ? "Yes" : "No"}`,
      `Notes: ${formData.notes || "None"}`,
    ].join("\n");

    try {
      const data = await submitReachUs(
        buildReachUsPayload({
          firstname: formData.firstName,
          lastname: formData.organization,
          email: formData.email,
          phone: formData.phone,
          is_whatsapp_number: useWhatsapp,
          message,
        }),
      );

      if (data.Code === "001") {
        setSuccessMessage(data.Message || "Your consultation request has been submitted successfully!");
        setFormData({
          firstName: "",
          organization: "",
          email: "",
          areaOfConsultation: "",
          phone: "",
          preferredDateTime: "",
          whatsappNumber: "",
          notes: "",
        });
        setUseWhatsapp(false);
        setCaptcha(generateCaptcha());
        setCaptchaInput("");
        setTimeout(() => {
          onClose();
          setSuccessMessage("");
        }, 2000);
      } else {
        setErrorMessage(data.Message || "Failed to submit consultation request. Please try again.");
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
          BOOK A <span className="text-green-600">CONSULTATION</span>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className={formGridClass}>
          <input type="text" name="firstName" placeholder="FIRST NAME" value={formData.firstName} onChange={handleInputChange} className={formFieldClass} required />
          <input type="text" name="organization" placeholder="ORGANIZATION / AFFILIATION" value={formData.organization} onChange={handleInputChange} className={formFieldClass} required />
        </div>

        <div className={formGridClass}>
          <input type="email" name="email" placeholder="E-MAIL ID" value={formData.email} onChange={handleInputChange} className={formFieldClass} required />
          <select name="areaOfConsultation" value={formData.areaOfConsultation} onChange={handleInputChange} className={formFieldClass} required>
            <option value="">AREA OF CONSULTATION</option>
            <option value="solar-energy">Solar Energy Solutions</option>
            <option value="grid-integration">Grid Integration</option>
            <option value="energy-storage">Energy Storage</option>
            <option value="microgrid">Microgrid Solutions</option>
            <option value="sustainability">Sustainability Consulting</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className={formGridClass}>
          <div className="flex min-w-0">
            <div className="flex shrink-0 items-center rounded-l-lg border border-r-0 border-gray-300 bg-white px-2 py-2.5 sm:px-3 sm:py-3">
              <img src="/images/book-consulation/countryCode.png" alt="" className="mr-1 h-4 w-5 sm:mr-2 sm:w-6" />
              <span className="text-sm text-gray-700 sm:text-base">+675</span>
            </div>
            <input type="tel" name="phone" placeholder="PHONE" value={formData.phone} onChange={handleInputChange} className={`${formFieldClass} rounded-l-none`} required />
          </div>
          <input type="datetime-local" name="preferredDateTime" value={formData.preferredDateTime} onChange={handleInputChange} className={formFieldClass} required />
        </div>

        <div className="flex items-center gap-3">
          <input type="checkbox" id="whatsapp" checked={useWhatsapp} onChange={(e) => setUseWhatsapp(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
          <label htmlFor="whatsapp" className="text-sm text-gray-700 sm:text-base">
            Is this your WhatsApp number?
          </label>
        </div>

        <textarea name="notes" placeholder="NOTES OR SPECIFIC QUESTIONS" value={formData.notes} onChange={handleInputChange} rows={3} className={`${formFieldClass} resize-none`} />

        <div className={captchaRowClass}>
          <div className={captchaInputGroupClass}>
            <div className="rounded border bg-gray-200 px-3 py-2 sm:px-4">
              <span className="font-mono text-base sm:text-lg">{captcha}</span>
            </div>
            <input type="text" placeholder="Enter captcha" value={captchaInput} onChange={(e) => setCaptchaInput(e.target.value)} className={`${formFieldClass} sm:max-w-[200px]`} required />
          </div>
          <button type="submit" disabled={isLoading} className="shrink-0 cursor-pointer self-end disabled:opacity-50">
            <img src="/images/book-consulation/formBtn.png" className="w-28 sm:w-40" alt="Submit" />
          </button>
        </div>

        {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
        {successMessage && <p className="text-sm text-green-600">{successMessage}</p>}
      </form>
    </EngineeringFormModal>
  );
};

export default Booking;
