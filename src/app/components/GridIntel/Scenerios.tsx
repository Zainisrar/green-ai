"use client";
import React from "react";
import GridIntelInfoModal from "./GridIntelInfoModal";
import SafeImage from "../shared/SafeImage";

interface ScenarioItem {
  icon: string;
  text: string;
}

interface ScenariosData {
  image: {
    alt: string;
    src: string;
  };
  title: string;
  tagline: string;
  subtitle: string;
  scenarios: ScenarioItem[];
  description: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: ScenariosData;
}

const Scenerios = ({ isOpen, onClose, data }: Props) => {
  if (!isOpen) return null;

  const renderScenarios = () => {
    if (data?.scenarios) {
      return data.scenarios.map((scenario, index) => (
        <div key={index} className="flex items-start space-x-3">
          <img
            src="/images/grid-intel/lighting.png"
            className="w-14 -mt-4"
            alt="lighting"
          />
          <p className="text-gray-800 font-medium italic">
            {scenario.text}
          </p>
        </div>
      ));
    }
    
    // Fallback static content
    return (
      <>
        <div className="flex items-start space-x-3">
          <img
            src="/images/grid-intel/lighting.png"
            className="w-14 -mt-4"
            alt="lighting"
          />
          <p className="text-gray-800 font-medium italic">
            Solar-diesel hybrid mini-grids for rural and island communities
          </p>
        </div>
        <div className="flex items-start space-x-3">
          <img
            src="/images/grid-intel/lighting.png"
            className="w-14 -mt-4"
            alt="lighting"
          />
          <p className="text-gray-800 font-medium italic">
            Off-grid telecommunications infrastructure
          </p>
        </div>
        <div className="flex items-start space-x-3">
          <img
            src="/images/grid-intel/lighting.png"
            className="w-14 -mt-4"
            alt="lighting"
          />
          <p className="text-gray-800 font-medium italic">
            Remote institutional microgrids (schools, health centers)
          </p>
        </div>
        <div className="flex items-start space-x-3">
          <img
            src="/images/grid-intel/lighting.png"
            className="w-14 -mt-4"
            alt="lighting"
          />
          <p className="text-gray-800 font-medium italic">
            Agricultural processing and storage systems
          </p>
        </div>
        <div className="flex items-start space-x-3">
          <img
            src="/images/grid-intel/lighting.png"
            className="w-14 -mt-4"
            alt="lighting"
          />
          <p className="text-gray-800 font-medium italic">
            Government-backed electrification pilots with uptime KPIs
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
          {data?.title || "Built for These Scenarios"}
        </h2>
        <div className="flex items-center">
          <span className="mr-2 hidden text-2xl font-bold text-black md:inline">-</span>
          <h3 className="text-xl font-semibold text-[#4CAF50]">
            {data?.subtitle || "Where GRID-INTEL™ Is Already Running"}
          </h3>
        </div>
        <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-start gap-8 lg:flex-row lg:space-x-12">
        <div className="flex-1">
          <div className="mb-8">
            <p className="text-gray-700 text-lg font-medium mb-6">
              {data?.description || "GRID-INTEL™ is deployed in critical scenarios where intelligent energy management is essential:"}
            </p>

            {/* Scenarios List */}
            <div className="space-y-4">
              {renderScenarios()}
            </div>
          </div>
        </div>

        <div className="shrink-0">
          <div className="relative">
            <SafeImage
              src={data?.image?.src}
              fallbackSrc="/images/grid-intel/scenerios.png"
              alt={data?.image?.alt || "Solar panels and energy infrastructure"}
              className="w-full max-w-[240px] pt-4 sm:max-w-[280px] lg:max-w-[320px] lg:pt-6"
            />
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
            {data?.tagline ||
              "GRID-INTEL™ Is Deployed Where Energy Failure Is Unacceptable — And Intelligence Is Essential."}
          </p>
        </div>
      }
    >
      {renderContent()}
    </GridIntelInfoModal>
  );
};

export default Scenerios;