"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import CountryCodeDropdown from "@/app/components/shared/CountryCodeDropdown";
import { buildReachUsPayload, submitReachUs } from "@/app/lib/forms";
import styles from "./ProductEnquiry.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
  titlePrefix?: string;
  titleAccent?: string;
  interestLabel?: string;
  interestOptions?: string[];
  defaultInterest?: string;
}

interface ProductEnquiryFrameProps {
  children: React.ReactNode;
  closeRight?: number;
  labelledBy: string;
  onClose: () => void;
  closeLabel?: string;
  closeTop?: number;
  compact?: boolean;
  designCanvasHeight?: number;
  designCanvasWidth?: number;
  designCanvasX?: number;
  designCanvasY?: number;
  height?: number;
  maxScale?: number;
  maximizeRight?: number;
  maximizeTop?: number;
  overlayClassName?: string;
  shape?: string;
  surfaceClassName?: string;
  surfaceImage?: string;
  surfaceImageHeight?: string;
  surfaceImageInset?: string;
  surfaceImageWidth?: string;
  surfaceSrc?: string;
  stageClassName?: string;
  showMaximize?: boolean;
  width?: number;
}

export const ProductEnquiryFrame = ({
  children,
  closeRight,
  labelledBy,
  onClose,
  closeLabel = "Close dialog",
  closeTop,
  compact = false,
  designCanvasHeight,
  designCanvasWidth,
  designCanvasX = 0,
  designCanvasY = 0,
  height = 702,
  maxScale = 1,
  maximizeRight,
  maximizeTop,
  overlayClassName,
  shape,
  surfaceClassName,
  surfaceImage,
  surfaceImageHeight,
  surfaceImageInset,
  surfaceImageWidth,
  surfaceSrc = "/images/shared/engineering-form-window.svg",
  stageClassName,
  showMaximize = true,
  width = 1710,
}: ProductEnquiryFrameProps) => {
  const [desktopScale, setDesktopScale] = useState(1);
  const [desktopPosition, setDesktopPosition] = useState<{
    left: number;
    top: number;
  } | null>(null);
  const stageRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const updateDesktopScale = () => {
      if (window.innerWidth <= 1200) {
        setDesktopScale(1);
        setDesktopPosition(null);
        return;
      }

      if (designCanvasWidth && designCanvasHeight) {
        const scale = Math.min(
          maxScale,
          window.innerWidth / designCanvasWidth,
          window.innerHeight / designCanvasHeight,
        );
        setDesktopScale(scale);
        setDesktopPosition({
          left:
            (window.innerWidth - designCanvasWidth * scale) / 2 +
            designCanvasX * scale,
          top:
            (window.innerHeight - designCanvasHeight * scale) / 2 +
            designCanvasY * scale,
        });
        return;
      }

      setDesktopPosition(null);
      setDesktopScale(
        Math.min(
          maxScale,
          (window.innerWidth - 36) / width,
          (window.innerHeight - 36) / height,
        ),
      );
    };

    updateDesktopScale();
    window.addEventListener("resize", updateDesktopScale);
    return () => window.removeEventListener("resize", updateDesktopScale);
  }, [
    designCanvasHeight,
    designCanvasWidth,
    designCanvasX,
    designCanvasY,
    height,
    maxScale,
    width,
  ]);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [onClose]);

  const trapFocus = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Tab") return;

    const focusable = stageRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    if (!focusable?.length) {
      event.preventDefault();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className={`${styles.overlay} ${overlayClassName ?? ""}`}
      role="presentation"
    >
      <button
        type="button"
        className={styles.backdropClose}
        onClick={onClose}
        aria-label={closeLabel}
      />
      <section
        ref={stageRef}
        onKeyDown={trapFocus}
        className={`${styles.stage} ${compact ? styles.compactStage : ""} ${stageClassName ?? ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        style={
          {
            "--product-enquiry-scale": desktopScale,
            "--product-enquiry-width": `${width}px`,
            "--product-enquiry-height": `${height}px`,
            ...(closeRight !== undefined
              ? { "--product-enquiry-close-right": `${closeRight}px` }
              : {}),
            ...(closeTop !== undefined
              ? { "--product-enquiry-close-top": `${closeTop}px` }
              : {}),
            ...(maximizeRight !== undefined
              ? { "--product-enquiry-maximize-right": `${maximizeRight}px` }
              : {}),
            ...(maximizeTop !== undefined
              ? { "--product-enquiry-maximize-top": `${maximizeTop}px` }
              : {}),
            ...(surfaceImageInset
              ? { "--product-enquiry-surface-inset": surfaceImageInset }
              : {}),
            ...(surfaceImageWidth
              ? { "--product-enquiry-surface-width": surfaceImageWidth }
              : {}),
            ...(surfaceImageHeight
              ? { "--product-enquiry-surface-height": surfaceImageHeight }
              : {}),
            ...(shape ? { "--product-enquiry-shape": shape } : {}),
            ...(desktopPosition
              ? {
                  position: "fixed",
                  left: `${desktopPosition.left}px`,
                  top: `${desktopPosition.top}px`,
                }
              : {}),
          } as React.CSSProperties
        }
      >
        <div className={styles.modal}>
          <div
            className={`${styles.surface} ${surfaceClassName ?? ""}`}
            aria-hidden="true"
          >
            {!surfaceImage ? (
              <img className={styles.surfaceVector} src={surfaceSrc} alt="" />
            ) : null}
            {surfaceImage ? (
              <img alt="" className={styles.surfaceImage} src={surfaceImage} />
            ) : null}
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className={styles.close}
            aria-label={closeLabel}
          >
            <img src="/images/job-openings/job-query-close.svg" alt="" />
          </button>
          {showMaximize ? (
            <span className={styles.maximize} aria-hidden="true">
              <img src="/images/join-us/solar_maximize.png" alt="" />
            </span>
          ) : null}
          {children}
        </div>
      </section>
    </div>,
    document.body,
  );
};

interface FormData {
  fullName: string;
  organization: string;
  email: string;
  phone: string;
  productInterest: string;
  consultationType: string;
  message: string;
}

const initialFormData: FormData = {
  fullName: "",
  organization: "",
  email: "",
  phone: "",
  productInterest: "",
  consultationType: "",
  message: "",
};

const ProductEnquiry = ({
  isOpen,
  onClose,
  productName,
  titlePrefix = "PRODUCT",
  titleAccent = "ENQUIRY",
  interestLabel = "PRODUCT / SYSTEM OF INTEREST",
  interestOptions,
  defaultInterest,
}: Props) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [phoneCountry, setPhoneCountry] = useState({
    dial_code: "+675",
    country_code: "pg",
  });
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      setSuccessMessage("");
      setErrorMessage("");
      setFormData((current) => ({
        ...current,
        productInterest: defaultInterest ?? current.productInterest,
      }));
    }
  }, [defaultInterest, isOpen]);

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
    setAgreed(false);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!agreed) {
      setErrorMessage(
        "Please agree that GREEN may contact you about this request.",
      );
      return;
    }

    setIsLoading(true);

    const message = [
      "Product Enquiry (GREEN SunShine)",
      `Organization: ${formData.organization}`,
      `Product / system of interest: ${formData.productInterest}`,
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
        setErrorMessage(
          data.Message || "Failed to submit your enquiry. Please try again.",
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
      labelledBy="product-enquiry-title"
      onClose={onClose}
      closeLabel="Close product enquiry"
      surfaceClassName={styles.opaqueSurface}
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 id="product-enquiry-title" className={styles.title}>
          {titlePrefix} <span>{titleAccent}</span>
        </h2>

        <div className={styles.grid}>
          <input
            type="text"
            name="fullName"
            placeholder="FULL NAME"
            value={formData.fullName}
            onChange={handleInputChange}
            className={`${styles.field} ${styles.skewForward}`}
            required
          />
          <input
            type="text"
            name="organization"
            placeholder="ORGANIZATION"
            value={formData.organization}
            onChange={handleInputChange}
            className={`${styles.field} ${styles.skewBack}`}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="EMAIL ID"
            value={formData.email}
            onChange={handleInputChange}
            className={`${styles.field} ${styles.skewForward}`}
            required
          />
          <div className={`${styles.phoneField} ${styles.skewBack}`}>
            <input
              type="tel"
              name="phone"
              placeholder="PHONE"
              value={formData.phone}
              onChange={handleInputChange}
              required
              aria-label={`Phone number, dial code ${phoneCountry.dial_code}`}
            />
            <CountryCodeDropdown
              dialCode={phoneCountry.dial_code}
              countryCode={phoneCountry.country_code}
              onSelect={(dial_code, country_code) =>
                setPhoneCountry({ dial_code, country_code })
              }
              className={styles.countryCode}
            />
          </div>
          <select
            name="productInterest"
            value={formData.productInterest}
            onChange={handleInputChange}
            className={`${styles.field} ${styles.select} ${styles.skewForward} ${
              formData.productInterest ? styles.hasValue : ""
            }`}
            required
          >
            <option value="">{interestLabel}</option>
            {(interestOptions ?? [productName || "GREEN SunShine"]).map(
              (option) => (
                <option value={option} key={option}>
                  {option}
                </option>
              ),
            )}
          </select>
          <select
            name="consultationType"
            value={formData.consultationType}
            onChange={handleInputChange}
            className={`${styles.field} ${styles.select} ${styles.skewBack} ${
              formData.consultationType ? styles.hasValue : ""
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
          className={`${styles.field} ${styles.message}`}
        />

        <div className={styles.agreement}>
          <input
            type="checkbox"
            id="product-enquiry-agree"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <label htmlFor="product-enquiry-agree">
            I agree that GREEN may contact me about this request.
          </label>
        </div>

        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        {successMessage && <p className={styles.success}>{successMessage}</p>}

        <div className={styles.actions}>
          <button
            type="button"
            onClick={resetForm}
            disabled={isLoading}
            className={styles.action}
          >
            <span>Reset</span>
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className={`${styles.action} ${styles.submit}`}
          >
            <span>{isLoading ? "Submitting..." : "Send Enquiry"}</span>
          </button>
        </div>
      </form>
    </ProductEnquiryFrame>
  );
};

export default ProductEnquiry;
