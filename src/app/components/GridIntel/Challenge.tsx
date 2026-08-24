"use client";
import React from "react";
import GridIntelInfoModal from "./GridIntelInfoModal";
import SafeImage from "../shared/SafeImage";

interface ChallengeItem {
  icon: string;
  text: string;
}

interface ChallengeData {
  image: {
    alt: string;
    src: string;
  };
  title: string;
  subtitle: string;
  challenges: ChallengeItem[];
  resultText: string;
  description: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: ChallengeData;
}

const Challenge = ({ isOpen, onClose, data }: Props) => {
  if (!isOpen) return null;

  const renderChallenges = () => {
    if (data?.challenges) {
      return data.challenges.map((challenge, index) => (
        <div key={index} className="flex items-start space-x-3">
          <img loading="lazy" decoding="async"
            src="/images/grid-intel/lighting.png"
            className="w-14 -mt-4"
            alt="lighting"
          />
          <p className="text-gray-800 font-medium italic">{challenge.text}</p>
        </div>
      ));
    }

    // Fallback static content
    return (
      <>
        <div className="flex items-start space-x-3">
          <img loading="lazy" decoding="async"
            src="/images/grid-intel/lighting.png"
            className="w-14 -mt-4"
            alt="lighting"
          />
          <p className="text-gray-800 font-medium italic">
            Uncoordinated power sources
          </p>
        </div>
        <div className="flex items-start space-x-3">
          <img loading="lazy" decoding="async"
            src="/images/grid-intel/lighting.png"
            className="w-14 -mt-4"
            alt="lighting"
          />
          <p className="text-gray-800 font-medium italic">
            High reliance on diesel during solar drop-offs
          </p>
        </div>
        <div className="flex items-start space-x-3">
          <img loading="lazy" decoding="async"
            src="/images/grid-intel/lighting.png"
            className="w-14 -mt-4"
            alt="lighting"
          />
          <p className="text-gray-800 font-medium italic">
            Manual switching and reactive maintenance
          </p>
        </div>
        <div className="flex items-start space-x-3">
          <img loading="lazy" decoding="async"
            src="/images/grid-intel/lighting.png"
            className="w-14 -mt-4"
            alt="lighting"
          />
          <p className="text-gray-800 font-medium italic">
            Zero visibility into system health and efficiency
          </p>
        </div>
      </>
    );
  };

  const renderContent = () => (
    <>
      {/* Title Section */}
      <div className="mb-8">
        <h2 className="text-3xl lg:text-4xl font-black text-gray-800 mb-4 leading-tight">
          {data?.title || "The Challenge"}
        </h2>
        <div className="flex items-center">
          <span className="mr-2 hidden text-2xl font-bold text-black md:inline">-</span>
          <h3 className="text-xl font-semibold text-[#4CAF50]">
            {data?.subtitle ||
              "Energy Systems Are Being Installed Without Intelligence"}
          </h3>
        </div>
        <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-start gap-8 lg:flex-row lg:space-x-12">
        <div className="shrink-0">
          <div className="relative">
            <SafeImage
              src={data?.image?.src}
              fallbackSrc="/images/grid-intel/challenge.png"
              alt={data?.image?.alt || "People working on energy systems"}
              className="w-full max-w-[240px] pt-4 sm:max-w-[280px] lg:max-w-[320px] lg:pt-6"
            />
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="flex-1">
          <div className="mb-8">
            <p className="text-gray-700 text-lg font-medium mb-6">
              {data?.description ||
                "Across emerging markets and decentralized energy deployments, key problems persist:"}
            </p>

            {/* Problem List */}
            <div className="space-y-4">{renderChallenges()}</div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <GridIntelInfoModal
      isOpen={isOpen}
      onClose={onClose}
      footer={
        <div className="mt-8 border-t border-gray-200 pt-6 text-center">
          <p className="text-lg font-bold italic text-gray-800">
            {data?.resultText ||
              "The Result: Energy Loss, Operational Downtime, And High Cost Of Ownership."}
          </p>
        </div>
      }
    >
      {renderContent()}
    </GridIntelInfoModal>
  );
};

export default Challenge;
