"use client";

import { Link } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";
import Enquiry from "../SupplyParnters/Modals/Enquiry";

// Standard RFC-5322-style email format check: local-part@domain.tld
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

const SupplyPartnersRegister = () => {

const router = useRouter();
const [isDesktop, setIsDesktop] = useState(false);
const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
const [email, setEmail] = useState("");
const [emailError, setEmailError] = useState("");
const [password, setPassword] = useState("");
const [passwordError, setPasswordError] = useState("");

const handleContinue = () => {
  const value = email.trim();
  let hasError = false;
  if (!value) {
    setEmailError("Please enter your email address.");
    hasError = true;
  } else if (!EMAIL_REGEX.test(value)) {
    setEmailError("Please enter a valid email address (e.g. name@gmail.com).");
    hasError = true;
  } else {
    setEmailError("");
  }

  if (password.length < 8) {
    setPasswordError("Password must be at least 8 characters.");
    hasError = true;
  } else {
    setPasswordError("");
  }

  if (hasError) return;
  router.push("/client-value-engineering/dashboard");
};

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  handleContinue();
};

useEffect(() => {
  const handleResize = () => {
    setIsDesktop(window.innerWidth >= 1100); // Assuming 1024px as the breakpoint for desktop
  };
  handleResize(); // Initial check
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);
  return (
    <React.Fragment>
      <div className='min-h-screen bg-cover lg:bg-[url("/images/client-value-engineering/bg.jpg")] relative'>
      <TopNavigation/>
        <div className="flex h-full">
          <div className=" lg:w-1/6 hidden lg:flex items-center justify-center">
            <div className="absolute bottom-4 2xl:left-24">
              <img
                src="/images/supply-partners/supply-partner.png"
                alt="supply-partners"
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex flex-1 min-w-0 flex-col px-4 md:my-10 lg:my-0 lg:px-8 lg:mr-8 rounded-lg">
            <div className="flex flex-col lg:flex-row h-full">
              {/* Left Content */}
              <div className="lg:w-1/2 mt-20 px-4 lg:px-8">
                <div className="mb-8">
                  <h1 className="text-4xl lg:text-5xl font-black mb-4">
                    <span className="text-[#4CAF50]">CLIENT</span>{" "}
                  </h1>
                  <h2 className="text-4xl lg:text-5xl font-bold mb-2">
                    <span className="text-black">Value Engineering</span>
                  </h2>
                </div>

                <div className="space-y-4 text-gray-700 text-sm lg:text-base leading-relaxed">
                  <p>
                    We, GREEN, endeavor to be of value rather than just a
                    success. As a provider of energy engineering, GREEN is
                    delighted to introduce you to our value engineering delivery
                    to all of our clients.
                  </p>
                  <p>
                    Our primary focus is to deliver customizable renewable
                    energy solutions and services to regions lacking access to
                    conventional energy sources, or unelectrified areas. By
                    empowering communities where reliable access to electricity
                    is still a distant fantasy, we promote well-being and
                    sustainability while fostering economic and social
                    development. Our relentless commitment to providing superior
                    quality solutions, products, and services guarantees that we
                    make a constructive impact on the environment.
                  </p>
                  <p>
                    We engineer to deliver value for your energy needs and
                    environmental sustainability!
                  </p>
                </div>
              </div>

              {/* Right Login Form */}
              <div className="lg:w-1/2 flex items-center justify-center px-4 lg:px-8 pb-10 lg:pb-0">
                <div
                  style={{ transform: isDesktop ? "skewX(-16deg)" : "none" }}
                  className="my-10 w-full max-w-xl bg-[#f8f9d9]/80 p-8 py-20 shadow-2xl sm:px-12"
                >
                  <div style={{ transform: isDesktop ? "skewX(16deg)" : "none" }}>
                    <div className="mb-6 text-center">
                      <p className="text-sm text-gray-600 sm:text-base">
                        Leverage the Value Engineered for your project!
                      </p>
                      <p className="text-sm text-gray-600 sm:text-base">By Logging In</p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                      <div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (emailError) setEmailError("");
                          }}
                          placeholder="solutions@nexttechnosolutions.co.in"
                          aria-invalid={!!emailError}
                          className={`w-full rounded-lg border bg-white px-4 py-3 text-gray-700 placeholder:text-xs focus:outline-none lg:placeholder:text-base ${
                            emailError
                              ? "border-red-500 focus:border-red-500"
                              : "border-gray-300 focus:border-[#4CAF50]"
                          }`}
                        />
                        {emailError && (
                          <p className="text-xs text-red-600 px-1 mt-1" role="alert">
                            {emailError}
                          </p>
                        )}
                      </div>

                      <div className="relative">
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            if (passwordError) setPasswordError("");
                          }}
                          placeholder="Password (min 8 characters)"
                          aria-invalid={!!passwordError}
                          className={`w-full rounded-lg border bg-white px-4 py-3 pr-12 text-gray-700 placeholder:text-xs focus:outline-none lg:placeholder:text-base ${
                            passwordError
                              ? "border-red-500 focus:border-red-500"
                              : "border-gray-300 focus:border-[#4CAF50]"
                          }`}
                        />
                        <button
                          type="submit"
                          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                          aria-label="Continue"
                        >
                          <svg
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#32A928"
                            strokeWidth="2"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                      {passwordError && (
                        <p className="text-xs text-red-600 px-1" role="alert">
                          {passwordError}
                        </p>
                      )}

                      <button
                        type="submit"
                        className="w-full rounded-lg bg-[#4CAF50] py-3 text-center font-semibold text-white transition-colors hover:bg-[#43a047] cursor-pointer"
                      >
                        Login
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex mb-32 justify-center  lg:mb-0 lg:block space-x-2 p-2 my-4">
          <button
            type="button"
            onClick={() => setIsEnquiryOpen(true)}
            className=" lg:absolute right-2 bottom-10 cursor-pointer"
          >
            <img
              src="/images/supply-partners/login/enquiry.png"
              alt="enquiry"
            />
          </button>
        </div>
        <Chatbot/>
        <Enquiry isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} />
      </div>
    </React.Fragment>
  );
};

export default SupplyPartnersRegister;
