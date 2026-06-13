"use client";
import React, { useEffect, useState } from "react";

interface SolutionItem {
  icon: string;
  text: string;
}

interface SolvesData {
  title: string;
  subtitle: string;
  description: string;
  solutions: SolutionItem[];
  bottomStatement: {
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isOpen) return null;

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
                  <img
                    src="/images/grid-intel/lighting.png"
                    className="w-14 -mt-4"
                    alt="lighting"
                  />
                </span>
                <p className="text-gray-800 font-medium">
                  {solution.text}
                </p>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {rightColumn.map((solution, index) => (
              <div key={index} className="flex items-start space-x-3">
                <span>
                  <img
                    src="/images/grid-intel/lighting.png"
                    className="w-14 -mt-4"
                    alt="lighting"
                  />
                </span>
                <p className="text-gray-800 font-medium">
                  {solution.text}
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
              <img
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
              <img
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
              <img
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
              <img
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
              <img
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
              <img
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
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          {data?.title || "What GRID-INTEL™ Solves"}
        </h2>
        <div className="flex items-center">
          {!isMobile && <span className="text-2xl font-bold mr-2">-</span>}
          <h3 className="text-xl text-[#4CAF50] font-semibold">
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
            {data?.bottomStatement?.text || " turns distributed power systems into orchestrated, intelligent infrastructure."}
          </span>
        </p>
      </div>
    </>
  );
  return (
    <React.Fragment>
      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-black/20 z-[99999999999999999999999999] flex items-center justify-center">
        {/* Modal Container */}
        <div className="relative w-full lg:max-w-6xl mx-4">
          {/* Skewed Modal Background */}
          {isMobile ? (
            <div
              className="bg-gray-100 p-5 h-[80vh] overflow-y-auto relative shadow-2xl"
            >
              {/* Close Button */}
              <div className="flex justify-end w-full">
                <button
                  onClick={onClose}
                  className="   cursor-pointer text-gray-600 hover:text-gray-800 text-2xl z-10 "
                >
                  <img src="/images/join-us/xicon.png" alt="Close Icon" />
                </button>
              </div>
              {/* Modal Content */}
              <div className="mx-auto">
                {renderContent()}
              </div>
            </div>
          ) : (
            <div
            
              className="bg-gray-100 transform py-14 border-2 border-[#4CAF50] px-16 relative shadow-2xl"
              style={{ clipPath: "polygon(0 0, 95% 0, 100% 100%, 5% 100%)",
                transform:"skewX(-12deg)"
               }}
            >
              {/* Close Button */}
              <div className="flex justify-end w-full">
                <button
                  onClick={onClose}
                  style={{
                    transform:"skewX(12deg)"
                  }}
                  className="   cursor-pointer text-gray-600 hover:text-gray-800 text-2xl z-10 transform "
                >
                  <img src="/images/join-us/xicon.png" alt="Close Icon" />
                </button>
              </div>
              {/* Modal Content */}
              <div
              style={{
                transform:"skewX(6deg)"
              }}
              className="transform  max-w-5xl mx-auto">
                {renderContent()}
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Solves;
