"use client";
import React from "react";
import { useInteractiveZIndex } from "../../../../hooks/useInteractiveZIndex";
import { useCommunityVoices } from "../../../../hooks/useCommunityVoices";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const WhatMakesOurImpactDifferent = ({ isOpen, onClose }: Props) => {
  const closeButtonProps = useInteractiveZIndex();
  const { data } = useCommunityVoices();
  
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isOpen || !data) return null;

  const modalData = data.modals.whatMakesOurImpactDifferent;

  return (
    <React.Fragment>
      {/* Modal Overlay */}
      <div className="fixed z-[9999999999999999999] inset-0 bg-black/20 flex items-center justify-center">
        {/* Modal Container */}
        <div className="relative w-full max-w-6xl mx-4">
          {/* Skewed Modal Background */}
          {isMobile ? (
            <div className="bg-gray-100 h-[80vh] overflow-y-auto py-14 border-2 border-[#4CAF50] px-4 relative shadow-2xl">
              {/* Close Button */}
              <div className="flex justify-end w-full">
                <div {...closeButtonProps.getContainerProps()}>
                  <button
                    onClick={onClose}
                    className="cursor-pointer text-gray-600 hover:text-gray-800 text-2xl z-10"
                  >
                    <img loading="lazy" decoding="async" src="/images/join-us/xicon.png" alt="Close Icon" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="">
                {/* Title Section */}
                <div className="mb-8">
                  <h2 className="text-3xl font-black text-gray-800 mb-4">
                    {modalData.title}
                  </h2>
                  <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
                </div>

                {/* Comparison Grid */}
                <div className="grid grid-cols-1 gap-8">
                  {/* Typical Project */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      {modalData.key1.title}
                    </h3>
                    <div className="space-y-3">
                      {modalData.key1.items.map((item, idx) => (
                        <div key={idx} className="text-gray-700 text-base">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* GREEN Project */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-green-600 mb-4">
                      {modalData.key2.title}
                    </h3>
                    <div className="space-y-3">
                      {modalData.key2.items.map((item, idx) => (
                        <div key={idx} className="text-gray-700 text-base font-semibold">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
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
                <div {...closeButtonProps.getContainerProps()}>
                  <button
                    onClick={onClose}
                    style={{
                      transform:"skewX(12deg)"
                    }}
                    className="cursor-pointer text-gray-600 hover:text-gray-800 text-2xl z-10 transform "
                  >
                    <img loading="lazy" decoding="async" src="/images/join-us/xicon.png" alt="Close Icon" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div
              style={{
                transform:"skewX(6deg)"
              }}
              className="transform  max-w-5xl mx-auto">
                {/* Title Section */}
                <div className="mb-8">
                  <h2 className="text-3xl font-black text-gray-800 mb-4">
                    {modalData.title}
                  </h2>
                  <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
                </div>

                {/* Comparison Grid */}
                <div className="grid grid-cols-2 gap-12">
                  {/* Typical Project */}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">
                      {modalData.key1.title}
                    </h3>
                    <div className="space-y-4">
                      {modalData.key1.items.map((item, idx) => (
                        <div key={idx} className="text-gray-700 text-lg">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* GREEN Project */}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-green-600 mb-6">
                      {modalData.key2.title}
                    </h3>
                    <div className="space-y-4">
                      {modalData.key2.items.map((item, idx) => (
                        <div key={idx} className="text-gray-700 text-lg font-semibold">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default WhatMakesOurImpactDifferent;
