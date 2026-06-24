"use client";
import React, { useState } from "react";
import ListofCertificates from "./ListofCertificates";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";
import { useCertificationsAccreditations } from "../../../hooks/useCertificationsAccreditations";
import Link from "next/link";
import LetsStart from "./Modals/LetsStart";

const Accrediations = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const { certificationsData, error } =
    useCertificationsAccreditations();
  // const ctaButton=certificationsData.

  if (error) {
    return (
      <React.Fragment>
        <div className="min-h-screen">
          <TopNavigation />
          <div className="flex items-center justify-center h-screen">
            <div className="text-xl text-red-500">
              Error loading certifications data
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <div className="">
        {/* Background Image */}
        <div className="absolute left-0 hidden lg:block lg:top-10 pointer-events-none">
          <img
            src="/images/certifications-accredication/mainImg.png"
            className="w-8/12 ml-10"
            alt="mainImg"
          />
        </div>

        <TopNavigation />

        {/* Mobile Layout */}
        <div className="lg:hidden px-4 py-6 relative z-50">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl lg:text-3xl font-black text-gray-800">
              {certificationsData?.title?.split(" & ")[0] || "CERTIFICATIONS"} &
            </h1>
            <h1 className="text-2xl lg:text-3xl font-black text-[#23B14D]">
              {certificationsData?.title?.split(" & ")[1] || "ACCREDITATIONS"}
            </h1>
          </div>

          {/* Quote */}
          <div className="bg-[#f0f9da] p-4 rounded-lg mb-8 text-center">
            <p className="text-lg font-bold italic">
              "
              {certificationsData?.tagline ||
                "Setting the Benchmark for Excellence."}
              "
            </p>
          </div>

          {/* Clean Energy Council */}
          <div className="text-center mb-8">
            <img
              src={
                certificationsData?.cleanEnergySection?.logo?.src ||
                "/images/certifications-accredication/cleanenergy.png"
              }
              alt={
                certificationsData?.cleanEnergySection?.logo?.alt ||
                "clean energy certification"
              }
              className="mx-auto mb-4 w-24"
            />
            <h3 className="text-lg lg:text-xl font-bold mb-2">
              {certificationsData?.cleanEnergySection?.heading ||
                "Clean Energy Council"}
            </h3>
            <p className="text-sm text-gray-600">
              {certificationsData?.cleanEnergySection?.description ||
                "Australian industry association that represents businesses involved in renewable energy and energy storage"}
            </p>
          </div>

          {/* ESG Section */}
          <div className="mb-8">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4 text-center">
              {certificationsData?.esgSection?.heading ||
                "Environmental, Social, and Governance (ESG)"}
            </h2>
            <div className="text-gray-700 space-y-3 text-sm">
              <p>
                {certificationsData?.esgSection?.description ||
                  "Our ESG standards reflect a deep commitment to sustainable growth, ethical practices, and positive impact on society and the environment. We align our actions with globally recognized ESG frameworks to create long-term value for all stakeholders."}
              </p>
              {certificationsData?.esgSection?.points?.map((point, index) => (
                <p key={index}>• {point}</p>
              )) || (
                <>
                  <p>
                    • Environmental: We reduce emissions, conserve resources,
                    and support climate-resilient operations.
                  </p>
                  <p>
                    • Social: We promote diversity, equity, inclusion, employee
                    well-being, and community engagement.
                  </p>
                  <p>
                    • Governance: We ensure transparent leadership, ethical
                    conduct, and regulatory compliance.
                  </p>
                  <p>
                    • ESG Integration: We align with <strong>GRI, SASB</strong>,
                    and <strong>UN SDGs</strong> with clear reporting and
                    measurable progress.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* ISO Standards */}
          <div className="mb-8">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4 text-center">
              {certificationsData?.isoSection?.heading || "ISO Standards"}
            </h2>
            <p className="text-gray-700 mb-6 text-sm">
              {certificationsData?.isoSection?.description ||
                "At GREEN Limited, we adhere to globally recognized ISO standards to ensure quality, efficiency, and continuous improvement across our operations. These certifications reflect our commitment to excellence, customer satisfaction, and regulatory compliance."}
            </p>

            {/* ISO Certificates - Mobile Grid */}
            <div className="space-y-6">
              {certificationsData?.isoSection?.certificates?.map(
                (cert, index) => (
                  <div
                    key={index}
                    className="text-center cursor-pointer"
                    onClick={openModal}
                  >
                    <img
                      src={`/images/certifications-accredication/c${
                        index + 1
                      }.png`}
                      alt={`c${index + 1}`}
                      className="mx-auto mb-3 w-16"
                    />
                    <h5 className="font-semibold text-sm">{cert.name}</h5>
                    <h6 className="font-semibold text-xs mb-2">
                      ({cert.title})
                    </h6>
                    <p className="text-gray-600 text-xs">{cert.description}</p>
                  </div>
                )
              ) || (
                <>
                  <div
                    className="text-center cursor-pointer"
                    onClick={openModal}
                  >
                    <img
                      src="/images/certifications-accredication/c1.png"
                      alt="c1"
                      className="mx-auto mb-3 w-16"
                    />
                    <h5 className="font-semibold text-sm">ISO 9001</h5>
                    <h6 className="font-semibold text-xs mb-2">
                      (Quality Management)
                    </h6>
                    <p className="text-gray-600 text-xs">
                      Ensures consistent product and service quality through
                      robust process management and continuous focus.
                    </p>
                  </div>
                  {/* Other fallback certificates... */}
                </>
              )}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="flex justify-center">
             <button
              type="button"
              onClick={() => setIsStartOpen(true)}
              className=" cursor-pointer relative"
            >
              <img
                src="/images/certifications-accredication/letstart.png"
                alt="call to action"
              />
              <div className="absolute inset-0 flex items-center justify-center px-4 italic text-base lg:text-lg font-bold whitespace-nowrap">
                {certificationsData?.cta.text || "Let's Start"}
              </div>
            </button>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden  lg:flex h-full">
          {/* Left Side - CERTIFICATION Text */}
          <div className="w-1/6 flex items-center justify-center">
            <div className="fixed top-1/4 left-10">
              <img
                className="w-14"
                src="/images/certifications-accredication/CERTIFICATE.png"
                alt="certification"
              />
            </div>
          </div>
          <div className="grid my-8 gap-x-8 pr-10 grid-cols-[1fr_2fr]">
            {/* Header Section */}
            <div className="lg:ml-20 2xl:ml-40">
              <h1 className="text-3xl 2xl:text-4xl font-black leading-tight mb-2">
                <span className="text-gray-800">
                  {certificationsData?.title?.split(" & ")[0] ||
                    "Certifications"}
                </span>{" "}
                &
                <br />
                <span className="text-[#23B14D]">
                  {certificationsData?.title?.split(" & ")[1] ||
                    "Accreditations"}
                </span>
              </h1>
            </div>
            <div className="">
              <div className="mb-4">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                  {certificationsData?.esgSection?.heading ||
                    "Environmental, Social, and Governance (ESG)"}
                </h2>
                <div className="text-gray-700 space-y-1">
                  <p>
                    {certificationsData?.esgSection?.description ||
                      "Our ESG standards reflect a deep commitment to sustainable growth, ethical practices, and positive impact on society and the environment. We align our actions with globally recognized ESG frameworks to create long-term value for all stakeholders."}
                  </p>
                  {certificationsData?.esgSection?.points?.map(
                    (point, index) => <p key={index}>• {point}</p>
                  ) || (
                    <>
                      <p>
                        • Environmental: We reduce emissions, conserve
                        resources, and support climate-resilient operations.
                      </p>
                      <p>
                        • Social: We promote diversity, equity, inclusion,
                        employee well-being, and community engagement.
                      </p>
                      <p>
                        • Governance: We ensure transparent leadership, ethical
                        conduct, and regulatory compliance.
                      </p>
                      <p>
                        • ESG Integration: We align with{" "}
                        <strong>GRI, SASB</strong>, and <strong>UN SDGs</strong>{" "}
                        with clear reporting and measurable progress.
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-xl lg:text-2xl my-2 font-bold text-gray-800 mb-2">
                  {certificationsData?.isoSection?.heading || "ISO Standards"}
                </h2>
                <p className="text-gray-700 mb-3">
                  {certificationsData?.isoSection?.description ||
                    "At [Your Company Name], we adhere to globally recognized ISO standards to ensure quality, efficiency, and continuous improvement across our operations. These certifications reflect our commitment to excellence, customer satisfaction, and regulatory compliance."}
                </p>

                <div className="grid grid-cols-4 my-4 gap-3">
                  {certificationsData?.isoSection?.certificates?.map(
                    (cert, index) => (
                      <div
                        key={index}
                        className="cursor-pointer"
                        onClick={openModal}
                      >
                        <img
                          src={`/images/certifications-accredication/c${
                            index + 1
                          }.png`}
                          alt={`c${index + 1}`}
                        />
                        <h5 className="font-semibold">{cert.name}</h5>
                        <h6 className="font-semibold">({cert.title})</h6>
                        <p className="text-gray-600">{cert.description}</p>
                      </div>
                    )
                  ) || (
                    <>
                      <div className="cursor-pointer" onClick={openModal}>
                        <img
                          src="/images/certifications-accredication/c1.png"
                          alt="c1"
                        />
                        <h5 className="font-semibold">ISO 9001</h5>
                        <h6 className="font-semibold">(Quality Management)</h6>
                        <p className="text-gray-600">
                          Ensures consistent product and service quality through
                          robust process management and continuous focus.
                        </p>
                      </div>
                      {/* Other fallback certificates would go here */}
                    </>
                  )}
                </div>
                   <div className="flex items-center justify-between gap-6 mb-24">
            <div className="flex space-x-8 items-center">
              <div className="flex flex-col space-y-2">
                <div className="text-xl lg:text-2xl font-bold">
                  {certificationsData?.cleanEnergySection?.heading ||
                    "Clean Energy Council"}
                </div>
                <div className="max-w-sm">
                  {certificationsData?.cleanEnergySection?.description ||
                    "Australian industry association that represents businesses involved in renewable energy and energy storage"}
                </div>
              </div>
              <div className="shrink-0">
                <img
                  src={
                    certificationsData?.cleanEnergySection?.logo?.src ||
                    "/images/certifications-accredication/cleanenergy.png"
                  }
                  alt={
                    certificationsData?.cleanEnergySection?.logo?.alt ||
                    "clean energy certification"
                  }
                  className="w-44 2xl:w-56 object-contain"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsStartOpen(true)}
              className="relative inline-block shrink-0 cursor-pointer"
            >
              <img
                src="/images/certifications-accredication/letstart.png"
                alt="call to action"
              />
              <div className="absolute inset-0 flex items-center justify-center px-4 italic text-base lg:text-lg font-bold whitespace-nowrap">
                {certificationsData?.cta.text || "Let's Start"}
              </div>
            </button>
          </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Only Elements */}
        <div className="hidden lg:block">
          <div
            style={{
              transform: "skewX(-16deg)",
            }}
          className="w-[300px]  shadow shadow-2xl absolute left-32 top-1/2">
            <div
            style={{
              transform:"skewX(16deg)"
            }}
            className="text-xl font-bold p-4 px-14 tracking-wider bg-[#f0f9da]/80">
              "
              {certificationsData?.tagline ||
                "Setting the Benchmark for Excellence."}
              "
            </div>
          </div>

       
        </div>
      </div>

      <div className="lg:block hidden">
        <Chatbot />
      </div>
      <ListofCertificates isOpen={isOpen} onClose={closeModal} />
      <LetsStart isOpen={isStartOpen} onClose={() => setIsStartOpen(false)} />
    </React.Fragment>
  );
};

export default Accrediations;
