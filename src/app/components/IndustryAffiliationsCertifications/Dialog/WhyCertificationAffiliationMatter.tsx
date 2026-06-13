"use client";
import React from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  keys: { text: string; highlighted: string }[];
  quoteText: string;
  img: { alt: string; src: string };
}
const WhyCertificationAffiliationMatter = ({ isOpen, onClose, title, description, keys, quoteText, img }: Props) => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Example breakpoint for mobile
    };
    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isOpen) return null;

  return (
    <React.Fragment>
      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center">
        {/* Modal Container */}
        <div className="relative w-full lg:max-w-6xl mx-4">
          {/* Skewed Modal Background */}
         {
          isMobile?
           <div
            className="bg-gray-100 h-[80vh] overflow-y-auto  py-14 border-2 border-[#4CAF50] px-4 relative shadow-2xl"
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
            <div className="">
              {/* Title Section */}
              <div className="mb-8">
                <h2 className="text-3xl font-black text-gray-800 mb-4">
                  {title || "Why Certification & Affiliation Matter"}
                </h2>
                <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
              </div>

              {/* Introduction */}
              <div className="mb-8">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {description}
                </p>
              </div>

              {/* Content Layout - Text and Image */}
              <div className="flex flex-col lg:flex-row items-start gap-8">
                {/* Left Column - Certification Benefits */}
                <div className="flex-1 space-y-5">
                  {keys?.map((k, idx) => (
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
                        <span className="font-bold text-gray-800">{k.highlighted}</span>
                        <span className="text-gray-700 ml-2">{k.text.replace(k.highlighted, '').trim() || k.text}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right Column - Standards Image */}
                <div className="flex-shrink-0 lg:w-[400px]">
                  {img?.src ? (
                    <img src={img.src} alt={img.alt || "Standards and Certification"} />
                  ) : (
                    <img 
                      src="/images/industry-affiliations-certifications/why-certification-model.png" 
                      alt="Standards and Certification"
                    />
                  )}
                </div>
              </div>

              {/* Quote Section */}
              <div className="mt-12 pt-8 border-t border-gray-300">
                {quoteText && (
                  <blockquote className="text-xl font-medium text-gray-800 italic leading-relaxed">
                    {quoteText}
                  </blockquote>
                )}
              </div>
            </div>
          
          </div>
          :
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
            className="transform max-w-5xl mx-auto">
              {/* Title Section */}
              <div className="mb-8">
                <h2 className="text-3xl font-black text-gray-800 mb-4">
                  {title || "Why Certification & Affiliation Matter"}
                </h2>
                <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
              </div>

              {/* Introduction */}
              <div className="mb-8">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {description}
                </p>
              </div>

              {/* Content Layout - Text and Image */}
              <div className="flex flex-col lg:flex-row items-start gap-8">
                {/* Left Column - Certification Benefits */}
                <div className="flex-1 space-y-5">
                  {keys?.map((k, idx) => (
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
                        <span className="font-bold text-gray-800">{k.highlighted}</span>
                        <span className="text-gray-700 ml-2">{k.text.replace(k.highlighted, '').trim() || k.text}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right Column - Standards Image */}
                <div className="flex-shrink-0  lg:w-[400px]">
                  {img?.src ? (
                    <img src={img.src} alt={img.alt || "Standards and Certification"} />
                  ) : (
                    <img 
                      src="/images/industry-affiliations-certifications/why-certification-model.png" 
                      alt="Standards and Certification"
                    />
                  )}
                </div>
              </div>

              {/* Quote Section */}
              <div className="mt-12 pt-8 border-t border-gray-300">
                {quoteText && (
                  <blockquote className="text-xl font-medium text-gray-800 italic leading-relaxed">
                    {quoteText}
                  </blockquote>
                )}
              </div>
            </div>
          
          </div>
         }
        </div>
      </div>
    </React.Fragment>
  );
};

export default WhyCertificationAffiliationMatter;
