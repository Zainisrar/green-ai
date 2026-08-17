"use client";
import React, { useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ProcurementNotes = ({ isOpen, onClose }: Props) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const procurementNotes = [
    {
      title: "Prequalified Vendor Requirement:",
      description:
        "All categories require documentation of IEC/UL certification, product test reports, and after-sales service presence in APAC or Pacific.",
    },
    {
      title: "Lead Time Sensitivity:",
      description:
        "All critical components tracked in GREEN's ERP for staggered delivery schedules and JIT staging.",
    },
    {
      title: "Sustainability Factor:",
      description:
        "Preference given to recyclable or low-impact manufacturing processes.",
    },
    {
      title: "Warranty Requirements:",
      description:
        "Minimum 5 years for electronics, 10 years for structural/solar, 3 years for BoS.",
    },
  ];

  const renderContent = () => (
    <>
      {/* Title Section */}
      <div className="mb-8">
        <h2 className="text-2xl lg:text-3xl font-black text-gray-800 mb-4">
          Supply Chain & Procurement Notes
        </h2>
        <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
      </div>

      {/* Procurement Notes List */}
      <div className={`${isMobile ? "space-y-4" : "space-y-6"}`}>
        {procurementNotes.map((note, index) => (
          <div
            key={index}
            className={`${isMobile ? "bg-gray-50 p-4 rounded-lg border border-gray-200" : "flex items-start gap-4"}`}
          >
            {!isMobile && (
              <div className="flex-shrink-0 mt-1">
                <img
                  src="/images/grid-intel/lighting.png"
                  className="w-10 lg:w-14 -mt-2 lg:-mt-4"
                  alt="lighting"
                />
              </div>
            )}
            <div className={isMobile ? "" : "flex-1"}>
              <span
                className={`font-bold text-gray-800 ${isMobile ? "block mb-2" : ""}`}
              >
                {note.title}
              </span>
              <span
                className={`text-gray-700 text-sm lg:text-base ${isMobile ? "block" : "ml-2"}`}
              >
                {note.description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  if (!isOpen) return null;

  return (
    <React.Fragment>
      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-black/20 z-[99999999999999999999999999] flex items-center justify-center">
        {/* Modal Container */}
        <div className="relative w-full lg:max-w-6xl mx-4">
          {/* Mobile Layout */}
          {isMobile ? (
            <div className="bg-white h-[80vh] p-3 overflow-y-auto py-14 border-2 border-[#4CAF50] relative shadow-2xl">
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
            </div>
          ) : (
            /* Desktop Layout */
            <div
              className="bg-white transform py-14 border-2 border-[#4CAF50] px-16 relative shadow-2xl"
              style={{
                clipPath: "polygon(0 0, 95% 0, 100% 100%, 5% 100%)",
                transform: "skewX(-12deg)",
              }}
            >
              {/* Close Button */}
              <div className="flex justify-end w-full">
                <button
                  onClick={onClose}
                  style={{
                    transform: "skewX(12deg)",
                  }}
                  className="cursor-pointer text-gray-600 hover:text-gray-800 text-2xl z-10 transform "
                >
                  <img src="/images/join-us/xicon.png" alt="Close Icon" />
                </button>
              </div>

              {/* Modal Content */}
              <div
                style={{
                  transform: "skewX(6deg)",
                }}
                className="transform  max-w-5xl mx-auto"
              >
                {renderContent()}
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProcurementNotes;
