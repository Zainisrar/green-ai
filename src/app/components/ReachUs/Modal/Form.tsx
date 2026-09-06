"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { ProductEnquiryFrame } from "@/app/components/Product/Modals/ProductEnquiry";
import {
  buildReachUsPayload,
  generateCaptcha,
  submitReachUs,
} from "@/app/lib/forms";
import styles from "./Form.module.css";

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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
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
        setErrorMessage(
          data.Message || "Failed to submit enquiry. Please try again.",
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
      labelledBy="reach-us-title"
      onClose={onClose}
      closeLabel="Close Reach Us form"
      closeRight={74.34}
      closeTop={44.75}
      designCanvasWidth={1920}
      designCanvasHeight={970}
      designCanvasX={169}
      designCanvasY={57}
      width={1718}
      height={835}
      maxScale={2}
      maximizeRight={116}
      maximizeTop={44.75}
      surfaceImage="/images/reach-us/contact-form-window.svg"
      surfaceImageInset="-2.22% -1.56% -3.17% -1.09%"
      surfaceImageWidth="102.65%"
      surfaceImageHeight="105.39%"
      overlayClassName={styles.figmaEnter}
    >
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 id="reach-us-title" className={styles.visuallyHidden}>
          Reach Us
        </h2>

        <div className={styles.nameFields}>
          <div className={styles.fieldShell}>
            <input
              type="text"
              name="firstname"
              placeholder="FIRST NAME"
              value={formData.firstname}
              onChange={handleInputChange}
              className={styles.field}
              autoComplete="given-name"
              required
            />
          </div>
          <div className={styles.fieldShell}>
            <input
              type="text"
              name="lastname"
              placeholder="LAST NAME"
              value={formData.lastname}
              onChange={handleInputChange}
              className={styles.field}
              autoComplete="family-name"
            />
          </div>
        </div>

        <div className={`${styles.fieldShell} ${styles.emailField}`}>
          <input
            type="email"
            name="email"
            placeholder="E-MAIL ID"
            value={formData.email}
            onChange={handleInputChange}
            className={styles.field}
            autoComplete="email"
            required
          />
        </div>

        <div className={styles.phoneField}>
          <span className={styles.phoneLabel}>PHONE</span>
          <div className={styles.countryCode}>
            <span className={styles.countryFlag} aria-hidden="true">
              {formData.phone_country_code === "pg" ? (
                <img src="/images/book-consulation/countryCode.png" alt="" />
              ) : (
                formData.phone_country_code
                  .toUpperCase()
                  .split("")
                  .map((letter) =>
                    String.fromCodePoint(127397 + letter.charCodeAt(0)),
                  )
                  .join("")
              )}
            </span>
            <span className={styles.countryArrow} aria-hidden="true" />
            <span className={styles.dialCode}>{formData.phone_dial_code}</span>
            <select
              name="phone_country"
              value={formData.phone_country_code}
              onChange={handleInputChange}
              aria-label="Country code"
            >
              {COUNTRIES.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name} ({country.dial_code})
                </option>
              ))}
            </select>
          </div>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            aria-label="Phone number"
            autoComplete="tel"
            required
          />
        </div>

        <label className={styles.whatsApp} htmlFor="reachus-whatsapp">
          <input
            id="reachus-whatsapp"
            type="checkbox"
            name="is_whatsapp_number"
            checked={formData.is_whatsapp_number}
            onChange={handleInputChange}
          />
          <span>Is this your WhatsApp number?</span>
        </label>

        <div className={styles.messageShell}>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className={styles.message}
            aria-label="Message"
            required
          />
        </div>

        <aside className={styles.callout} aria-label="Contact us promotion">
          <p>
            &quot;<span>Power Your Future</span>&quot;
          </p>
          <h3>
            Get a Free Solar
            <br />
            Quote Today!
          </h3>
        </aside>

        <div className={styles.captchaGroup}>
          <output className={styles.captcha} aria-label="Captcha code">
            {captcha.replace(/\s/g, "")}
          </output>
          <input
            type="text"
            value={captchaInput}
            onChange={(event) => setCaptchaInput(event.target.value)}
            className={styles.captchaInput}
            aria-label="Enter captcha"
            required
          />
        </div>

        {errorMessage ? <p className={styles.error}>{errorMessage}</p> : null}
        {successMessage ? (
          <p className={styles.success}>{successMessage}</p>
        ) : null}

        <button type="submit" disabled={isLoading} className={styles.submit}>
          {isLoading ? "Sending…" : "Send"}
        </button>
      </form>
    </ProductEnquiryFrame>
  );
};

export default Form;
