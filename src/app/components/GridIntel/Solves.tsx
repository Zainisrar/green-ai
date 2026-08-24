"use client";
import React from "react";
import GridIntelInfoModal from "./GridIntelInfoModal";

interface SolutionItem {
  icon: string;
  text?: string;
  title?: string;
  description?: string;
}

interface SolvesData {
  title: string;
  subtitle: string;
  description: string;
  solutions: SolutionItem[];
  tagline?: string;
  bottomStatement?: {
    highlight: string;
    text: string;
  };
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: SolvesData;
}

const Solves = ({ isOpen, onClose, data }: Props) => {
  if (!isOpen) return null;

  const getSolutionText = (solution: SolutionItem) =>
    solution.text || solution.title || solution.description || "";

  const renderSolutions = () => {
    if (data?.solutions) {
      const midpoint = Math.ceil(data.solutions.length / 2);
      const leftColumn = data.solutions.slice(0, midpoint);
      const rightColumn = data.solutions.slice(midpoint);

      return (
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Left Column */}
          <div className="space-y-6">
            {leftColumn.map((solution, index) => (
              <div key={index} className="flex items-start space-x-3">
                <span>
                  <img loading="lazy" decoding="async"
                    src="/images/grid-intel/lighting.png"
                    className="w-14 -mt-4"
                    alt="lighting"
                  />
                </span>
                <p className="font-medium text-gray-800">
                  {getSolutionText(solution)}
                </p>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {rightColumn.map((solution, index) => (
              <div key={index} className="flex items-start space-x-3">
                <span>
                  <img loading="lazy" decoding="async"
                    src="/images/grid-intel/lighting.png"
                    className="w-14 -mt-4"
                    alt="lighting"
                  />
                </span>
                <p className="font-medium text-gray-800">
                  {getSolutionText(solution)}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    // Fallback static content
    return (
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Left Column */}
        <div className="space-y-6">
          <div className="flex items-start space-x-3">
            <span>
              <img loading="lazy" decoding="async"
                src="/images/grid-intel/lighting.png"
                className="w-14 -mt-4"
                alt="lighting"
              />
            </span>
            <p className="text-gray-800 font-medium">
              Predicts And Maps Demand Patterns
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <span>
              <img loading="lazy" decoding="async"
                src="/images/grid-intel/lighting.png"
                className="w-14 -mt-4"
                alt="lighting"
              />
            </span>
            <p className="text-gray-800 font-medium">
              Prioritizes Renewable Energy Intelligently
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <span>
              <img loading="lazy" decoding="async"
                src="/images/grid-intel/lighting.png"
                className="w-14 -mt-4"
                alt="lighting"
              />
            </span>
            <p className="text-gray-800 font-medium">
              Provides Remote Monitoring And Diagnostics
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="flex items-start space-x-3">
            <span>
              <img loading="lazy" decoding="async"
                src="/images/grid-intel/lighting.png"
                className="w-14 -mt-4"
                alt="lighting"
              />
            </span>
            <p className="text-gray-800 font-medium">
              Switches Sources Dynamically And Instantly
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <span>
              <img loading="lazy" decoding="async"
                src="/images/grid-intel/lighting.png"
                className="w-14 -mt-4"
                alt="lighting"
              />
            </span>
            <p className="text-gray-800 font-medium">
              Reduces Diesel Runtime And Fuel Consumption
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <span>
              <img loading="lazy" decoding="async"
                src="/images/grid-intel/lighting.png"
                className="w-14 -mt-4"
                alt="lighting"
              />
            </span>
            <p className="text-gray-800 font-medium">
              Delivers Full Performance Visibility To Stakeholders
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => (
    <>
      {/* Title Section */}
      <div className="mb-12">
        <h2 className="text-3xl lg:text-4xl font-black text-gray-800 mb-4 leading-tight">
          {data?.title || "What GRID-INTEL™ Solves"}
        </h2>
        <div className="flex items-center">
          <span className="mr-2 hidden text-2xl font-bold md:inline">-</span>
          <h3 className="text-xl font-semibold text-[#4CAF50]">
            {data?.subtitle || "GRID-INTEL™ Is Built to Solve This — With Embedded Intelligence."}
          </h3>
        </div>
        <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
      </div>

      {/* Solutions Grid */}
      {renderSolutions()}

      {/* Bottom Statement */}
      <div className="text-center pt-8 border-t border-gray-200">
        <p className="text-gray-800 font-medium text-lg">
          <span className="text-[#4CAF50] font-bold">
            {data?.bottomStatement?.highlight || "GRID-INTEL™"}
          </span>
          <span className="italic">
            {data?.bottomStatement?.text ||
              data?.tagline ||
              " turns distributed power systems into orchestrated, intelligent infrastructure."}
          </span>
        </p>
      </div>
    </>
  );
  return (
    <GridIntelInfoModal isOpen={isOpen} onClose={onClose}>
      {renderContent()}
    </GridIntelInfoModal>
  );
};

export default Solves;
