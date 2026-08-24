"use client";
import React, { useEffect, useState } from "react";
import WhyCertificationAffiliationMatter from "./Dialog/WhyCertificationAffiliationMatter";
import OurClientPartnershipModel from "../ClientPartnerships/Dialog/OurClientPartnershipModel";
import OurCurrentCertifications from "./Dialog/OurCurrentCertifications";
import IndustryAffiliations from "./Dialog/IndustryAffiliations";
import WhatThisMeansforClients from "./Dialog/WhatThisMeansforClients";
import TopNavigation from "../TopNavigation/TopNavigation";
import { useIndustryAffiliationsCertifications } from "@/app/hooks/useIndustryAffiliationsCertifications";
import Chatbot from "../Chatbot";
import Link from "next/link";
import IndividualCertification from "./Modals/IndividualCertification";

const IndustryAffiliationsCertifications = () => {
  const [isWhyCertOpen, setIsWhyCertOpen] = useState(false);
  const [isOurCurrentCertOpen, setIsOurCurrentCertOpen] = useState(false);
  const [isIndustryAffiliationsOpen, setIsIndustryAffiliationsOpen] =
    useState(false);
  const [isWhatThisMeansForClientsOpen, setIsWhatThisMeansForClientsOpen] =
    useState(false);
  const [isIndividualCertOpen, setIsIndividualCertOpen] = useState(false);

  const handleWhyCertOpen = () => {
    setIsWhyCertOpen(true);
  };
  const handleOurCurrentCertOpen = () => {
    setIsOurCurrentCertOpen(true);
  };
  const handleIndustryAffiliationsOpen = () => {
    setIsIndustryAffiliationsOpen(true);
  };
  const handleWhatThisMeansForClientsOpen = () => {
    setIsWhatThisMeansForClientsOpen(true);
  };
  const handleClose = () => {
    setIsWhyCertOpen(false);
    setIsOurCurrentCertOpen(false);
    setIsIndustryAffiliationsOpen(false);
    setIsWhatThisMeansForClientsOpen(false);
  };
  const { data, loading, error } = useIndustryAffiliationsCertifications();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="text-gray-500">Loading…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="text-red-600">{error}</span>
      </div>
    );
  }

  if (!data) return null;

  const {
    mainPage,
    whyCertificationAffiliationMatter,
    ourCurrentCertifications,
    industryAffiliations,
    whatThisMeansClients,
  } = data;

  return (
    <React.Fragment>
      <div className=" ">
        <div className="absolute lg:block hidden -z-10 top-0 right-0">
          <img loading="lazy" decoding="async"
            src="/images/industry-affiliations-certifications/mainImg.png"
            alt="mainImg"
            className=" h-[140vh]"
          />
        </div>
        <TopNavigation />
        <div className="flex h-full">
          {/* Left Side  */}
          <div className="w-1/6 flex items-center justify-center">
            <div className="fixed top-1/4 left-4 lg:left-14">
              <img loading="lazy" decoding="async"
                src="/images/industry-affiliations-certifications/industry-affiliations-certifications.png"
                alt="Industry Affiliations & Certifications"
                className="w-4 lg:w-6"
              />
            </div>
          </div>
          {/* Main Content Area */}
          <div className=" lg:px-8 pr-4 pl-8 lg:pl-14 pt-8">
            {/* Main Title */}
            <div className="mb-8">
              <h1 className=" text-2xl lg:text-3xl font-black text-gray-800 mb-4">
                {mainPage?.title?.toUpperCase()}
              </h1>
              <h2 className=" text-xl lg:text-2xl font-bold text-[#23B14D] italic mb-4">
                {mainPage?.subHeadline?.trim()}
              </h2>
              <p className="text-gray-600 text-base lg:text-lg mb-8 lg:max-w-3xl whitespace-pre-line">
                {mainPage?.description?.text}
              </p>
            </div>
            <div className="lg:hidden my-8">
              <div className="">
                <div className="">
                  {mainPage?.quote && (
                    <div>
                      {mainPage.quote.map((q, idx) => (
                        <p
                          key={idx}
                          className={`text-2xl ${
                            q.highlighted
                              ? "text-[#23B14D] font-semibold italic"
                              : "font-bold text-gray-800"
                          }`}
                        >
                          {q.text}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Content Layout */}
            <div className="lg:flex lg:space-x-14">
              {/* Left Column - Content List */}
              <div className="w-full lg:w-1/2 space-y-4 lg:space-y-8">
                {/* Why Certification & Affiliation Matter */}
                <div
                style={{
                  transform:"skewX(-16deg)"
                }}
                className="flex items-center justify-between  p-4 border-4 border-[#f8f9d9]/80  shadow-lg">
                  <h3
                   style={{
                    transform:"skewX(16deg)"
                   }}
                  className="text-xl lg:text-2xl font-bold  text-gray-800">
                    Why Certification & Affiliation Matter
                  </h3>
                  <button
                    onClick={handleWhyCertOpen}
                    className="cursor-pointer"
                  >
                    <img loading="lazy" decoding="async"
                      src="/images/collaboration-innovation/explore.png"
                      alt="explore"
                    />
                  </button>
                </div>
                <div
                 style={{
                  transform:"skewX(-16deg)"
                 }}
                className="flex items-center justify-between lg:-ml-10  p-4 border-4 border-[#f8f9d9]/80  shadow-lg">
                  <h3
                  style={{
                    transform:"skewX(16deg)"
                  }}
                  className="text-xl lg:text-2xl font-bold  text-gray-800">
                    Our Current Certifications
                  </h3>
                  <button
                    onClick={handleOurCurrentCertOpen}
                    className="cursor-pointer"
                  >
                    <img loading="lazy" decoding="async"
                      src="/images/collaboration-innovation/explore.png"
                      alt="explore"
                    />
                  </button>
                </div>
                <div
                 style={{
                  transform:"skewX(-16deg)"
                 }}
                className="flex items-center justify-between lg:-ml-16  p-4 border-4 border-[#f8f9d9]/80 shadow-lg">
                  <h3 
                  style={{
                    transform:"skewX(16deg)"
                  }}
                  className="text-xl lg:text-2xl font-bold  text-gray-800">
                    Industry Affiliations
                  </h3>
                  <button
                    onClick={handleIndustryAffiliationsOpen}
                    className="cursor-pointer"
                  >
                    <img loading="lazy" decoding="async"
                      src="/images/collaboration-innovation/explore.png"
                      alt="explore"
                    />
                  </button>
                </div>
                <div 
                  style={{
                  transform:"skewX(-16deg)"
                 }}
                className="flex items-center justify-between lg:-ml-24  p-4 border-4 border-[#f8f9d9]/80  shadow-lg">
                  <h3
                    style={{
                      transform:"skewX(16deg)"
                    }}
                  className="text-xl lg:text-2xl font-bold  text-gray-800">
                    What This Means for Clients
                  </h3>
                  <button
                    onClick={handleWhatThisMeansForClientsOpen}
                    className="cursor-pointer"
                  >
                    <img loading="lazy" decoding="async"
                      src="/images/collaboration-innovation/explore.png"
                      alt="explore"
                    />
                  </button>
                </div>
              </div>

              {/* Right Column - Quote Box */}
              <div className="lg:block hidden lg:mt-20 relative z-10">
                <div className="max-w-md">
                  {mainPage?.quote && (
                    <div>
                      {mainPage.quote.map((q, idx) => (
                        <p
                          key={idx}
                          className={`text-xl lg:text-2xl ${
                            q.highlighted
                              ? "text-[#23B14D] font-semibold italic"
                              : "font-bold text-gray-800"
                          }`}
                        >
                          {q.text}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Quote */}
          </div>
        </div>
        <div className="lg:flex justify-between px-4 lg:px-0 lg:pl-32 my-20">
          <div className="lg:max-w-3xl">
            {whyCertificationAffiliationMatter?.quote?.text && (
              <h3 className="text-xl lg:text-2xl font-bold text-gray-800">
                {whyCertificationAffiliationMatter.quote.text}
              </h3>
            )}
          </div>
          <div className="mt-10 lg:mt-0">
            <div className="  flex justify-end  cursor-pointer">
              {mainPage?.cta?.[0]?.href ? (
                <Link href={mainPage.cta[0].href}>
                  <img loading="lazy" decoding="async"
                    src="/images/industry-affiliations-certifications/green.png"
                    alt={
                      mainPage?.cta?.[0]?.text || "GREEN Certification Dossier"
                    }
                    className="w-full h-full"
                  />
                </Link>
              ) : (
                <img loading="lazy" decoding="async"
                  src="/images/industry-affiliations-certifications/green.png"
                  alt="GREEN Certification Dossier"
                />
              )}
            </div>
            <div className=" flex justify-end my-8 cursor-pointer">
              <button
                type="button"
                onClick={() => setIsIndividualCertOpen(true)}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              >
                <img loading="lazy" decoding="async"
                  src="/images/industry-affiliations-certifications/individual.png"
                  alt={
                    mainPage?.cta?.[1]?.text ||
                    "Individual Certificate or Verification Letter"
                  }
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Chatbot />
      <WhyCertificationAffiliationMatter
        isOpen={isWhyCertOpen}
        onClose={handleClose}
        title={whyCertificationAffiliationMatter?.title || ""}
        description={whyCertificationAffiliationMatter?.description || ""}
        keys={whyCertificationAffiliationMatter?.keys || []}
        quoteText={whyCertificationAffiliationMatter?.quote?.text || ""}
        img={whyCertificationAffiliationMatter?.img || { alt: "", src: "" }}
      />
      <OurCurrentCertifications
        isOpen={isOurCurrentCertOpen}
        onClose={handleClose}
        title={ourCurrentCertifications?.title || "Our Current Certifications"}
        items={ourCurrentCertifications?.items || []}
      />
      <IndustryAffiliations
        isOpen={isIndustryAffiliationsOpen}
        onClose={handleClose}
        title={industryAffiliations?.title?.trim() || "Industry Affiliations"}
        keys={industryAffiliations?.keys || []}
      />
      <WhatThisMeansforClients
        isOpen={isWhatThisMeansForClientsOpen}
        onClose={handleClose}
        title={whatThisMeansClients?.title || "What This Means for Clients"}
        keys={whatThisMeansClients?.keys || []}
        img={whatThisMeansClients?.img || { alt: "", src: "" }}
      />
      <IndividualCertification
        isOpen={isIndividualCertOpen}
        onClose={() => setIsIndividualCertOpen(false)}
      />
    </React.Fragment>
  );
};

export default IndustryAffiliationsCertifications;
