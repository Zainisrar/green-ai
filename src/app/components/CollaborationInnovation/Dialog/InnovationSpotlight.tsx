"use client";
import React from "react";
import type { CollaborationInnovationSpotlight } from "../../../lib/api";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: CollaborationInnovationSpotlight;
}
const InnovationSpotlight = ({ isOpen, onClose, data }: Props) => {
  if (!isOpen) return null;

  const title = data?.title ?? "Innovation Spotlight";
  const keys = data?.keys ?? [
    {
      title: "GRID-INTEL™",
      description:
        "Smart grid intelligence with real-time monitoring, predictive diagnostics, and interoperable architecture.",
    },
    {
      title: "Modular Microgrid Kits",
      description:
        "Rapid deployment kits engineered for island and rural electrification — scalable, smart, and robust.",
    },
    {
      title: "Community-Tied Energy Business Models",
      description:
        "Pilots with built-in economic uplift models (co-ops, productive use case layering, mobile billing integration)",
    },
  ];
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Example breakpoint for mobile
    };
    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <React.Fragment>
      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center">
        {/* Modal Container */}
        <div className="relative w-full lg:max-w-6xl mx-4">
          {/* Skewed Modal Background */}
          {isMobile ? (
            <div className="bg-gray-100 h-[80vh] overflow-y-auto py-14 border-2 border-[#4CAF50] px-4 relative shadow-2xl">
              {/* Close Button */}
              <div className="flex justify-end w-full">
                <button
                  onClick={onClose}
                  className="   cursor-pointer text-gray-600 hover:text-gray-800 text-2xl z-10"
                >
                  <img loading="lazy" decoding="async" src="/images/join-us/xicon.png" alt="Close Icon" />
                </button>
              </div>
              {/* Modal Content */}
              <div className="">
                {/* Title Section */}
                <div className="mb-8">
                  <h2 className="text-3xl font-black text-gray-800 mb-4">
                    {title}
                  </h2>
                  <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
                </div>

                {/* Innovation Items */}
                <div className="space-y-8">
                  {keys.map((k, idx) => (
                    <div key={idx} className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          <img loading="lazy" decoding="async"
                            src="/images/grid-intel/lighting.png"
                            className="w-14 -mt-4"
                            alt="lighting"
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-800 mb-2">
                            {k.title}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed italic">
                            {k.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
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
                  <img loading="lazy" decoding="async" src="/images/join-us/xicon.png" alt="Close Icon" />
                </button>
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
                    {title}
                  </h2>
                  <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
                </div>

                {/* Innovation Items */}
                <div className="space-y-8">
                  {keys.map((k, idx) => (
                    <div key={idx} className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          <img loading="lazy" decoding="async"
                            src="/images/grid-intel/lighting.png"
                            className="w-14 -mt-4"
                            alt="lighting"
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-800 mb-2">
                            {k.title}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed italic">
                            {k.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default InnovationSpotlight;
