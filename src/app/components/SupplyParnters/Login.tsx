"use client";

import Link from "next/link";
import type React from "react";
import { useRef, useState } from "react";
import ProductEnquiry from "@/app/components/Product/Modals/ProductEnquiry";
import { loginSupplyPartner } from "@/app/lib/forms";
import D6Chatbot from "../D6Chatbot";
import SiteHeader from "../SiteHeader/SiteHeader";
import FigmaPageCanvas from "../shared/FigmaPageCanvas";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState<"email" | "password">("email");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!email.trim()) {
      setErrorMessage("Please enter your email ID.");
      return;
    }

    setStep("password");
    setTimeout(() => {
      passwordInputRef.current?.focus();
    }, 100);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const data = await loginSupplyPartner(email, password);
      if (data.Code === "001") {
        setSuccessMessage(data.Message || "Login successful.");
      } else {
        setErrorMessage(
          data.Message || "Login failed. Please check your credentials.",
        );
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Login failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const desktop = (
    <main className={styles.desktopPage} data-node-id="7077:13930">
      {/* Background Cargo Ship Artwork */}
      <img
        loading="lazy"
        decoding="async"
        className={styles.backgroundArt}
        src="/images/supply-partners/login/bg.jpg"
        alt=""
        width="1050"
        height="970"
      />

      {/* Reusable Figma Canvas Header */}
      <SiteHeader layout="figmaCanvas" highlightActive={false} />

      {/* Outline Watermark on Left */}
      <img
        loading="lazy"
        decoding="async"
        className={styles.verticalWatermark}
        src="/images/supply-partners/supply-partner.png"
        alt=""
        aria-hidden="true"
      />

      {/* Main Heading */}
      <div className={styles.headerGroup}>
        <h1 className={styles.title}>
          <span className={styles.titleGreen}>SUPPLY</span>{" "}
          <span className={styles.titleBlack}>PARTNER</span>
        </h1>
      </div>

      {/* Body Copy */}
      <div className={styles.bodyText}>
        <p>
          In and of itself, the energy solutions we provide our clients
          constitute an investment.
        </p>
        <p>
          GREEN Limited is dedicated to maintaining the utmost level of quality
          and adhering to the highest standards in all of our endeavours, both
          presently and in the future.
        </p>
        <p>
          The success of our solution delivery for our clients is heavily
          dependent on the materials and services provided by our suppliers.
          Suppliers are our invisible backend power they provide the momentum
          for solution
        </p>
        <p>
          Our strategic importance and improved performance are both boosted by
          our partnerships and collaborations with suppliers.
        </p>
        <p>
          Therefore, we believe that partnering with suppliers is crucial to our
          business and see it as a value proposition.
        </p>
        <p>We welcome potential suppliers to be part of success stories.</p>
        <p>
          <Link
            href="/ecosystem/supply-partners/register"
            className={styles.registerLink}
          >
            Please Register to start
          </Link>
        </p>
      </div>

      {/* Right Login Card (Vector 7364) */}
      <div className={styles.cardContainer}>
        <img
          className={styles.cardSvg}
          src="/images/supply-partners/login/card-bg.svg"
          alt=""
          aria-hidden="true"
        />

        <div className={styles.cardContent}>
          <h2 className={styles.cardTitle}>LOGIN</h2>
          <p className={styles.cardSubtitle}>
            Please login here to check your quotation status and / or update
            order and shipment status.
          </p>

          <form
            onSubmit={
              step === "email" ? handleEmailSubmit : handlePasswordSubmit
            }
            className={styles.loginForm}
          >
            <div className={styles.inputWrapper}>
              <svg
                className={styles.inputBgSvg}
                aria-hidden="true"
                viewBox="0 0 599 97"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <defs>
                  <filter
                    id="supplyInputDropShadow"
                    x="0"
                    y="0"
                    width="599"
                    height="97"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feDropShadow
                      dx="0"
                      dy="4"
                      stdDeviation="10"
                      floodColor="#000000"
                      floodOpacity="0.14"
                    />
                  </filter>
                </defs>
                <path
                  d="M47.84 20.0057H574.991L549.529 68.5197H24.0069L47.84 20.0057Z"
                  fill="#FFFFFF"
                  filter="url(#supplyInputDropShadow)"
                />
                <path
                  d="M47.84 20L45.0 20L21.2 68.5L24.0 68.5Z"
                  fill="#23B14D"
                />
              </svg>

              {step === "email" ? (
                <input
                  type="email"
                  name="email"
                  placeholder="supplytest@nexttechnosolutions.co.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.inputField}
                  autoComplete="email"
                  required
                  aria-label="Email address"
                />
              ) : (
                <input
                  ref={passwordInputRef}
                  type="password"
                  name="password"
                  placeholder="PASSWORD"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.inputField}
                  autoComplete="current-password"
                  required
                  aria-label="Password"
                />
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={styles.inputSubmitBtn}
                aria-label={step === "email" ? "Next step" : "Submit login"}
              >
                <svg
                  className={styles.arrowIcon}
                  aria-hidden="true"
                  viewBox="0 0 45 45"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M21.7597 18.8741C21.5524 19.0672 21.3862 19.3001 21.2709 19.5588C21.1556 19.8176 21.0936 20.0969 21.0886 20.3801C21.0837 20.6633 21.1358 20.9447 21.2418 21.2073C21.3479 21.47 21.5058 21.7086 21.7061 21.9089C21.9064 22.1092 22.145 22.2671 22.4077 22.3732C22.6703 22.4793 22.9517 22.5314 23.2349 22.5264C23.5181 22.5214 23.7975 22.4594 24.0562 22.3441C24.3149 22.2288 24.5478 22.0626 24.7409 21.8553L33.8844 12.7147L35.375 11.2241L33.8844 9.73345L24.7438 0.592826C24.3461 0.208394 23.8134 -0.00447277 23.2603 7.07372e-05C22.7072 0.00461424 22.178 0.226206 21.7868 0.617118C21.3955 1.00803 21.1734 1.53699 21.1683 2.09006C21.1633 2.64313 21.3756 3.17606 21.7597 3.57408L27.3003 9.1147L-1.89062 9.1147C-2.45006 9.1147 -2.98659 9.33694 -3.38218 9.73252C-3.77776 10.1281 -4 10.6646 -4 11.2241C-4 11.7835 -3.77776 12.32 -3.38218 12.7156C-2.98659 13.1112 -2.45006 13.3335 -1.89062 13.3335L27.3003 13.3335L21.7597 18.8741Z"
                    fill="#32A928"
                  />
                </svg>
              </button>
            </div>

            {step === "password" && (
              <div className={styles.stepIndicator}>
                <span>
                  Logging in as <strong>{email}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setStep("email")}
                  className={styles.backBtn}
                >
                  Change
                </button>
              </div>
            )}

            {errorMessage && (
              <p className={styles.errorMessage} role="alert">
                {errorMessage}
              </p>
            )}
            {successMessage && (
              <p className={styles.successMessage} role="status">
                {successMessage}
              </p>
            )}

            <span className={styles.orDivider}>OR</span>

            <Link
              href="/ecosystem/supply-partners/register"
              className={styles.registerCardLink}
            >
              Register
            </Link>
          </form>
        </div>
      </div>

      {/* Reusable Figma Canvas Enquiry Button */}
      <button
        type="button"
        onClick={() => setIsFormOpen(true)}
        className={styles.enquiryBtn}
        aria-label="Open supply enquiry form"
      >
        <img
          loading="lazy"
          decoding="async"
          src="/images/supply-partners/login/enquiry-cta.svg"
          alt="Enquiry"
          className={styles.enquiryImg}
        />
      </button>

      {/* Reusable Figma Canvas Chatbot Button */}
      <D6Chatbot
        canvasAnchored
        triggerVariant="figmaCanvas"
        figmaPlaceholder="Let’s Talk Energy"
        triggerStyle={{
          top: 899,
          right: "auto",
          bottom: "auto",
          left: 1489,
          width: 427,
        }}
      />
    </main>
  );

  const mobile = (
    <main className={styles.mobilePage} data-node-id="7077:13930-mobile">
      <SiteHeader panel="logoOnly" />

      <div className={styles.mobileContent}>
        <h1 className={styles.mobileTitle}>
          <span className={styles.titleGreen}>SUPPLY</span>{" "}
          <span className={styles.titleBlack}>PARTNER</span>
        </h1>

        <div className={styles.mobileBodyText}>
          <p>
            In and of itself, the energy solutions we provide our clients
            constitute an investment.
          </p>
          <p>
            GREEN Limited is dedicated to maintaining the utmost level of
            quality and adhering to the highest standards in all of our
            endeavours, both presently and in the future.
          </p>
          <p>
            The success of our solution delivery for our clients is heavily
            dependent on the materials and services provided by our suppliers.
          </p>
          <p>
            <Link
              href="/ecosystem/supply-partners/register"
              className={styles.registerLink}
            >
              Please Register to start
            </Link>
          </p>
        </div>

        <div className={styles.mobileCard}>
          <h2 className={styles.cardTitle}>LOGIN</h2>
          <p className={styles.cardSubtitle}>
            Please login here to check your quotation status and / or update
            order and shipment status.
          </p>

          <form
            onSubmit={
              step === "email" ? handleEmailSubmit : handlePasswordSubmit
            }
            className={styles.loginForm}
          >
            <div className={styles.inputWrapper}>
              <svg
                className={styles.inputBgSvg}
                aria-hidden="true"
                viewBox="0 0 599 97"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M47.84 20.0057H574.991L549.529 68.5197H24.0069L47.84 20.0057Z"
                  fill="#FFFFFF"
                />
                <path
                  d="M47.84 20L45.0 20L21.2 68.5L24.0 68.5Z"
                  fill="#23B14D"
                />
              </svg>

              <input
                type={step === "email" ? "email" : "password"}
                placeholder={
                  step === "email"
                    ? "supplytest@nexttechnosolutions.co.in"
                    : "PASSWORD"
                }
                value={step === "email" ? email : password}
                onChange={(e) =>
                  step === "email"
                    ? setEmail(e.target.value)
                    : setPassword(e.target.value)
                }
                className={styles.inputField}
                required
              />

              <button
                type="submit"
                className={styles.inputSubmitBtn}
                aria-label="Submit"
              >
                <svg
                  className={styles.arrowIcon}
                  aria-hidden="true"
                  viewBox="0 0 45 45"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M21.7597 18.8741C21.5524 19.0672 21.3862 19.3001 21.2709 19.5588C21.1556 19.8176 21.0936 20.0969 21.0886 20.3801C21.0837 20.6633 21.1358 20.9447 21.2418 21.2073C21.3479 21.47 21.5058 21.7086 21.7061 21.9089C21.9064 22.1092 22.145 22.2671 22.4077 22.3732C22.6703 22.4793 22.9517 22.5314 23.2349 22.5264C23.5181 22.5214 23.7975 22.4594 24.0562 22.3441C24.3149 22.2288 24.5478 22.0626 24.7409 21.8553L33.8844 12.7147L35.375 11.2241L33.8844 9.73345L24.7438 0.592826C24.3461 0.208394 23.8134 -0.00447277 23.2603 7.07372e-05C22.7072 0.00461424 22.178 0.226206 21.7868 0.617118C21.3955 1.00803 21.1734 1.53699 21.1683 2.09006C21.1633 2.64313 21.3756 3.17606 21.7597 3.57408L27.3003 9.1147L-1.89062 9.1147C-2.45006 9.1147 -2.98659 9.33694 -3.38218 9.73252C-3.77776 10.1281 -4 10.6646 -4 11.2241C-4 11.7835 -3.77776 12.32 -3.38218 12.7156C-2.98659 13.1112 -2.45006 13.3335 -1.89062 13.3335L27.3003 13.3335L21.7597 18.8741Z"
                    fill="#32A928"
                  />
                </svg>
              </button>
            </div>

            {errorMessage && (
              <p className={styles.errorMessage} role="alert">
                {errorMessage}
              </p>
            )}
            {successMessage && (
              <p className={styles.successMessage} role="status">
                {successMessage}
              </p>
            )}

            <span className={styles.orDivider}>OR</span>

            <Link
              href="/ecosystem/supply-partners/register"
              className={styles.registerCardLink}
            >
              Register
            </Link>
          </form>
        </div>

        <div className={styles.mobileEnquiryWrapper}>
          <button
            type="button"
            onClick={() => setIsFormOpen(true)}
            className={styles.enquiryBtn}
            style={{ position: "static", width: 150, height: 46 }}
          >
            <img
              src="/images/supply-partners/login/enquiry-cta.svg"
              alt="Enquiry"
              className={styles.enquiryImg}
            />
          </button>
        </div>
      </div>

      <D6Chatbot />
    </main>
  );

  return (
    <>
      <FigmaPageCanvas desktop={desktop} mobile={mobile} nodeId="7077:13930" />
      <ProductEnquiry
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        titlePrefix="SUPPLY"
        titleAccent="ENQUIRY"
        interestLabel="PRODUCT / SYSTEM OF INTEREST"
      />
    </>
  );
};

export default Login;
