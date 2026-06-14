"use client";
import React from "react";
import { useInteractiveZIndex } from "../../../../hooks/useInteractiveZIndex";
import { useWomenInEnergy } from "../../../../hooks/useWomenInEnergy";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const WhyThisMatters = ({ isOpen, onClose }: Props) => {
  const closeButtonProps = useInteractiveZIndex();
  const { data } = useWomenInEnergy();
  
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

  const modalData = data.modal.whyThisMatters;

  // Helper function to highlight text
  const highlightText = (text: string, highlight: string) => {
    if (!highlight) return text;
    
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} className="text-green-600">{part}</span>
      ) : (
        part
      )
    );
  };

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
                    <img src="/images/join-us/xicon.png" alt="Close Icon" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="">
                {/* Title Section */}
                <div className="mb-8">
                  <h2 className="text-2xl lg:text-3xl font-black text-gray-800 mb-4">
                    {modalData.title}
                  </h2>
                  <h3 className="text-lg mb-4">
                    <span className="text-green-600 italic">
                      {modalData.subHeadline}
                    </span>
                  </h3>
                  <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
                </div>

                {/* Introduction */}
                <div className="mb-8">
                  <p className="text-gray-700 leading-relaxed text-lg mb-4">
                    {modalData.description}
                  </p>
                </div>

                {/* Content Layout - Text and Image */}
                <div className="flex flex-col lg:flex-row items-start gap-8">
                  {/* Left Column - Key Points */}
                  <div className="flex-1 space-y-5">
                    {modalData.keys.map((key, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          <span>
                            <img
                              src="/images/grid-intel/lighting.png"
                              className="w-14 -mt-4"
                              alt="lighting"
                            />
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-700 ml-2">
                            {key}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Right Column - Image */}
                  <div className="w-full lg:w-6/12">
                    <img
                      src={modalData.img.src}
                      alt={modalData.img.alt}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Quote Section */}
                <div className="mt-12 pt-8 border-t border-gray-300">
                  <blockquote className="text-xl capitalize font-bold text-center text-gray-800 italic leading-relaxed">
                    {highlightText(modalData.quote.text, modalData.quote.highlighted)}
                  </blockquote>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="bg-gray-100 transform py-14 border-2 border-[#4CAF50] px-16 relative shadow-2xl"
              style={{
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
                    <img src="/images/join-us/xicon.png" alt="Close Icon" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div 
              style={{
                transform:"skewX(12deg)"
              }}
              className="transform max-w-5xl mx-auto">
                {/* Title Section */}
                <div className="mb-8">
                  <h2 className="text-2xl lg:text-3xl font-black text-gray-800 mb-4">
                    {modalData.title}
                  </h2>
                  <h3 className="text-lg mb-4">
                    <span className="text-green-600 italic">
                      {modalData.subHeadline}
                    </span>
                  </h3>
                  <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
                </div>

                {/* Introduction */}
                <div className="mb-8">
                  <p className="text-gray-700 leading-relaxed text-lg mb-4">
                    {modalData.description}
                  </p>
                </div>

                {/* Content Layout - Text and Image */}
                <div className="flex flex-col lg:flex-row items-start gap-8">
                  {/* Left Column - Key Points */}
                  <div className="flex-1 space-y-5">
                    {modalData.keys.map((key, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          <span>
                            <img
                              src="/images/grid-intel/lighting.png"
                              className="w-14 -mt-4"
                              alt="lighting"
                            />
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-700 ml-2">
                            {key}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Right Column - Image */}
                  <div className="w-6/12">
                    <img
                      src={modalData.img.src}
                      alt={modalData.img.alt}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Quote Section */}
                <div className="mt-12 pt-8 border-t border-gray-300">
                  <blockquote className="text-xl capitalize font-bold text-center text-gray-800 italic leading-relaxed">
                    {highlightText(modalData.quote.text, modalData.quote.highlighted)}
                  </blockquote>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default WhyThisMatters;