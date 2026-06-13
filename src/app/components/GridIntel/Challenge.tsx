"use client";
import React, { useEffect, useState } from "react";

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

  const renderChallenges = () => {
    if (data?.challenges) {
      return data.challenges.map((challenge, index) => (
        <div key={index} className="flex items-start space-x-3">
          <img
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
          <img
            src="/images/grid-intel/lighting.png"
            className="w-14 -mt-4"
            alt="lighting"
          />
          <p className="text-gray-800 font-medium italic">
            Uncoordinated power sources
          </p>
        </div>
        <div className="flex items-start space-x-3">
          <img
            src="/images/grid-intel/lighting.png"
            className="w-14 -mt-4"
            alt="lighting"
          />
          <p className="text-gray-800 font-medium italic">
            High reliance on diesel during solar drop-offs
          </p>
        </div>
        <div className="flex items-start space-x-3">
          <img
            src="/images/grid-intel/lighting.png"
            className="w-14 -mt-4"
            alt="lighting"
          />
          <p className="text-gray-800 font-medium italic">
            Manual switching and reactive maintenance
          </p>
        </div>
        <div className="flex items-start space-x-3">
          <img
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
        <h2 className="text-2xl lg:text-3xl font-black text-gray-800 mb-4">
          {data?.title || "The Challenge"}
        </h2>
        <div className="lg:flex items-center">
          {!isMobile && (
            <span className="text-2xl text-black font-bold mr-2">-</span>
          )}
          <h3 className="text-xl text-[#4CAF50] font-semibold">
            {data?.subtitle ||
              "Energy Systems Are Being Installed Without Intelligence"}
          </h3>
        </div>
        <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
      </div>

      {/* Main Content */}
      <div className="lg:flex items-start space-x-12">
        {/* Left Side - Image */}
        <div className="flex-shrink-0">
          <div className="relative">
            <img
              src="/images/grid-intel/challenge.png"
              alt="People working on energy systems"
              className="w-[520px] pt-10"
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
    <React.Fragment>
      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-black/20 z-[99999999999999999999999999] flex items-center justify-center">
        {/* Modal Container */}
        <div className="relative w-full lg:max-w-6xl mx-4">
          {/* Mobile Layout */}
          {isMobile ? (
            <div className="bg-gray-100 h-[80vh] p-3 overflow-y-auto py-14 border-2 border-[#4CAF50] relative shadow-2xl">
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
              <div className="mx-auto">{renderContent()}</div>

              {/* Result Section */}
              <div className="mt-8 pt-6 text-center border-t border-gray-200">
                <p className="text-gray-800 font-bold text-lg italic">
                  {data?.resultText ||
                    "The Result: Energy Loss, Operational Downtime, And High Cost Of Ownership."}
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
                  {data?.resultText ||
                    "The Result: Energy Loss, Operational Downtime, And High Cost Of Ownership."}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Challenge;
