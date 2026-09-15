"use client";

import { useRouter } from "next/navigation";
import type React from "react";
import { useRef, useState } from "react";
import ProductEnquiry from "@/app/components/Product/Modals/ProductEnquiry";
import { loginClient } from "@/app/lib/forms";
import D6Chatbot from "../D6Chatbot";
import SiteHeader from "../SiteHeader/SiteHeader";
import FigmaPageCanvas from "../shared/FigmaPageCanvas";
import styles from "./ClientValueEngineering.module.css";

const SupplyPartnersRegister = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState<"email" | "password">("email");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStep("password");
    setTimeout(() => {
      passwordInputRef.current?.focus();
    }, 100);
  };

  const createClientSession = (userEmail: string, token?: string) => {
    if (typeof window !== "undefined") {
      const sessionPayload = {
        email: userEmail,
        token: token || `client_${Date.now()}`,
        loggedInAt: new Date().toISOString(),
      };
      sessionStorage.setItem(
        "green_client_session",
        JSON.stringify(sessionPayload),
      );
      localStorage.setItem(
        "green_client_session",
        JSON.stringify(sessionPayload),
      );
      document.cookie = `client_session=${encodeURIComponent(userEmail)}; path=/; max-age=86400; SameSite=Lax`;
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const trimmedEmail = email.trim();
    const trimmedPassword = password;

    if (!trimmedPassword) {
      setErrorMessage("Please enter your password.");
      setIsLoading(false);
      return;
    }

    if (trimmedPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      setIsLoading(false);
      return;
    }

    try {
      const data = await loginClient(trimmedEmail, trimmedPassword);

      if (data.Code === "001") {
        createClientSession(trimmedEmail, data.token);
        setSuccessMessage("Login successful! Redirecting...");
        setTimeout(() => {
          router.push("/client-value-engineering/dashboard");
        }, 800);
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
    <main className={styles.desktopPage} data-node-id="7077:13886">
      {/* Background Meeting Artwork */}
      <img
        loading="lazy"
        decoding="async"
        className={styles.backgroundArt}
        src="/images/client-value-engineering/bg.jpg"
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
        src="/images/client-value-engineering/client-partner.svg"
        alt=""
        aria-hidden="true"
      />

      {/* Main Heading */}
      <div className={styles.headerGroup}>
        <span className={styles.titleGreen}>CLIENT</span>
        <span className={styles.titleBlack}>Value Engineering</span>
      </div>

      {/* Body Copy */}
      <div className={styles.bodyText}>
        <p>
          We, GREEN, endeavor to be of value rather than just a success. As a
          provider of energy engineering, GREEN is delighted to introduce you to
          our value engineering delivery to all of our clients.
        </p>
        <p>
          Our primary focus is to deliver customizable renewable energy
          solutions and services to regions lacking access to conventional
          energy sources, or unelectrified areas. By empowering communities
          where reliable access to electricity is still a distant fantasy, we
          promote well-being and sustainability while fostering economic and
          social development. Our relentless commitment to providing superior
          quality solutions, products, and services guarantees that we make a
          constructive impact on the environment.
        </p>
        <p>
          We engineer to deliver value for your energy needs and environmental
          sustainability!
        </p>
      </div>

      {/* Right Login Card (Vector 7364) */}
      <div className={styles.cardContainer}>
        <svg
          className={styles.cardSvg}
          aria-hidden="true"
          viewBox="0 0 1094 529"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <filter
              id="clientCardShadow"
              x="-5"
              y="-8"
              width="1104"
              height="539"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feDropShadow
                dx="0"
                dy="3"
                stdDeviation="6"
                floodColor="#000000"
                floodOpacity="0.2"
              />
            </filter>
            <linearGradient
              id="clientCardGradient"
              x1="0%"
              y1="50%"
              x2="100%"
              y2="50%"
            >
              <stop offset="0%" stopColor="#23B14D" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#FFFE50" stopOpacity="0.28" />
            </linearGradient>
          </defs>
          <path
            d="M1084 7H238.053L10 516H849.626L1084 7Z"
            fill="url(#clientCardGradient)"
            filter="url(#clientCardShadow)"
            style={{ backdropFilter: "blur(15px)" }}
          />
        </svg>

        <div className={styles.cardContent}>
          <p className={styles.cardHeading}>
            Leverage the Value Engineered for your project!
          </p>
          <p className={styles.cardSubheading}>By Logging In</p>

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
                    id="clientInputShadow"
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
                  filter="url(#clientInputShadow)"
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
                  placeholder="solutions@nexttechnosolutions.co.in"
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
                  onClick={() => {
                    setStep("email");
                    setPassword("");
                    setErrorMessage("");
                    setSuccessMessage("");
                  }}
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
          </form>
        </div>
      </div>

      {/* Reusable Figma Canvas Enquiry Button */}
      <button
        type="button"
        onClick={() => setIsEnquiryOpen(true)}
        className={styles.enquiryBtn}
        aria-label="Open enquiry form"
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
    <main className={styles.mobilePage} data-node-id="7077:13886-mobile">
      <SiteHeader panel="logoOnly" />

      <div className={styles.mobileContent}>
        <span className={styles.mobileTitleGreen}>CLIENT</span>
        <span className={styles.mobileTitleBlack}>Value Engineering</span>

        <div className={styles.mobileBodyText}>
          <p>
            We, GREEN, endeavor to be of value rather than just a success. As a
            provider of energy engineering, GREEN is delighted to introduce you
            to our value engineering delivery to all of our clients.
          </p>
          <p>
            Our primary focus is to deliver customizable renewable energy
            solutions and services to regions lacking access to conventional
            energy sources, or unelectrified areas.
          </p>
          <p>
            We engineer to deliver value for your energy needs and environmental
            sustainability!
          </p>
        </div>

        <div className={styles.mobileCard}>
          <p className={styles.cardHeading}>
            Leverage the Value Engineered for your project!
          </p>
          <p className={styles.cardSubheading}>By Logging In</p>

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
                    ? "solutions@nexttechnosolutions.co.in"
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
                disabled={isLoading}
                className={styles.inputSubmitBtn}
                aria-label={step === "email" ? "Next step" : "Submit login"}
              >
                <svg
                  className={styles.arrowIcon}
                  viewBox="0 0 45 45"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
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
                  onClick={() => {
                    setStep("email");
                    setPassword("");
                    setErrorMessage("");
                    setSuccessMessage("");
                  }}
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
          </form>
        </div>

        <div className={styles.mobileEnquiryWrapper}>
          <button
            type="button"
            onClick={() => setIsEnquiryOpen(true)}
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
      <FigmaPageCanvas desktop={desktop} mobile={mobile} nodeId="7077:13886" />
      <ProductEnquiry
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        titlePrefix="CLIENT"
        titleAccent="ENQUIRY"
        interestLabel="PRODUCT / SYSTEM OF INTEREST"
      />
    </>
  );
};

export default SupplyPartnersRegister;
