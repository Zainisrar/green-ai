"use client";
import React, { useEffect, useState } from "react";

interface MediaKitDownloadProps {
  isOpen: boolean;
  onClose: () => void;
}

const MediaKitDownload: React.FC<MediaKitDownloadProps> = ({ isOpen, onClose }) => {
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

  const downloadItems = [
    { label: "Brand Logo Files (PNG, SVG)", color: "bg-[#C8E67C]" },
    { label: "Executive Headshots", color: "bg-[#C8E67C]" },
    { label: "Company Profile (PDF)", color: "bg-[#C8E67C]" },
    { label: "Fact Packs & Data Sheet", color: "bg-[#C8E67C]" },
    { label: "Approved Images for Press Use", color: "bg-[#C8E67C]" },
    { label: "Quote Sheet / Boilerplate", color: "bg-[#C8E67C]" },
    { label: "Brand Logo Files (PNG, SVG)", color: "bg-[#C8E67C]" },
    { label: "Executive Headshots", color: "bg-[#C8E67C]" },
    { label: "Company Profile (PDF)", color: "bg-[#C8E67C]" },
    { label: "Fact Packs & Data Sheet", color: "bg-[#C8E67C]" },
    { label: "Approved Images for Press Use", color: "bg-[#C8E67C]" },
    { label: "Quote Sheet / Boilerplate", color: "bg-[#C8E67C]" },
  ];

  const renderContent = () => (
    <>
      {/* Title Section */}
      <div className="mb-8">
        <h2 className="text-2xl lg:text-3xl font-black text-gray-800 mb-4">
          Media Kit Download
        </h2>
        <div className="flex items-center justify-between">
          <div className="lg:flex items-center">
            {!isMobile && (
              <span className="text-lg text-[#23B14D] font-bold mr-2">
                Download <span className="text-black italic">GREEN Media Kit (ZIP)</span>
              </span>
            )}
          </div>
        </div>
        <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
      </div>

      {/* Download Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {downloadItems.map((item, idx) => (
          <div
            key={idx}
           
            className={`${item.color} p-4  cursor-pointer hover:opacity-80 transition-opacity transform hover:-skew-x-2`}
          >
            <div className="flex items-center justify-between">
              <span className="text-gray-900 font-semibold text-sm">
                {item.label}
              </span>
              <svg
                className="w-5 h-5 text-gray-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
          </div>
        ))}
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
            <div className="bg-gray-100 h-[80vh] p-3 overflow-y-auto py-14 border-2 border-[#23B14D] relative shadow-2xl">
              {/* Close Button */}
              <div className="flex justify-end w-full">
                <button
                  onClick={onClose}
                  className="cursor-pointer text-gray-600 hover:text-gray-800 text-2xl z-10"
                >
                  <img loading="lazy" decoding="async" src="/images/join-us/xicon.png" alt="Close Icon" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="mx-auto">{renderContent()}</div>
            </div>
          ) : (
            /* Desktop Layout */
            <div

              className="bg-gray-100 transform  py-14 border-2 border-[#23B14D] px-16 relative shadow-2xl overflow-y-auto max-h-[85vh]"
              style={{
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
                  <img loading="lazy" decoding="async" src="/images/join-us/xicon.png" alt="Close Icon" />
                </button>
              </div>

              {/* Modal Content */}
              <div 
              style={{
                transform:"skewX(12deg)"
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

export default MediaKitDownload;
