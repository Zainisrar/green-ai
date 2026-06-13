"use client";
import React, { useEffect, useState } from "react";

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
        <h2 className="text-3xl font-black text-gray-800 mb-4">
          {data?.title || "Built for These Scenarios"}
        </h2>
        <div className="flex items-center">
          {!isMobile && <span className="text-2xl text-black font-bold mr-2">-</span>}
          <h3 className="text-xl text-[#4CAF50] font-semibold">
            {data?.subtitle || "Where GRID-INTEL™ Is Already Running"}
          </h3>
        </div>
        <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
      </div>

      {/* Main Content */}
      <div className="lg:flex items-start space-x-12">
        {/* Left Side - Scenarios List */}
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

        {/* Right Side - Image */}
        <div className="flex-shrink-0">
          <div className="relative">
            <img
              src="/images/grid-intel/scenerios.png"
              alt="Solar panels and energy infrastructure"
              className="w-[480px] pt-10"
            />
          </div>
        </div>
      </div>
    </>
  );

  return (
    <React.Fragment>
      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-black/20 z-[99999999999999999999999999] flex items-center justify-center">
        {/* Modal Container */}
        <div className="relative w-full lg:max-w-6xl mx-4">
          {/* Mobile Layout */}
          {isMobile ? (
            <div className="bg-gray-100 h-[80vh] overflow-y-auto p-5 relative shadow-2xl">
              {/* Close Button */}
              <div className="flex justify-end w-full">
                <button
                  onClick={onClose}
                  className="cursor-pointer text-gray-600 hover:text-gray-800 text-2xl z-10"
                >
                  <img src="/images/join-us/xicon.png" alt="Close Icon" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="mx-auto">
                {renderContent()}
              </div>

              {/* Result Section */}
              <div className="mt-8 pt-6 text-center border-t border-gray-200">
                <p className="text-gray-800 font-bold text-lg italic">
                  {data?.tagline || "GRID-INTEL™ Is Deployed Where Energy Failure Is Unacceptable — And Intelligence Is Essential."}
                </p>
              </div>
            </div>
          ) : (
            /* Desktop Layout */
            <div
              className="bg-gray-100 transform  py-14 border-2 border-[#4CAF50] px-16 relative shadow-2xl"
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
                  className="cursor-pointer text-gray-600 hover:text-gray-800 text-2xl z-10 transform "
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

              {/* Result Section */}
              <div className="mt-8 pt-6 text-center border-t border-gray-200">
                <p className="text-gray-800 font-bold text-lg italic">
                  {data?.tagline || "GRID-INTEL™ Is Deployed Where Energy Failure Is Unacceptable — And Intelligence Is Essential."}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Scenerios;