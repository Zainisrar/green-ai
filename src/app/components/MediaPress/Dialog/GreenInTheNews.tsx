"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface GreenInTheNewsProps {
  isOpen: boolean;
  onClose: () => void;
}

const GreenInTheNews: React.FC<GreenInTheNewsProps> = ({ isOpen, onClose }) => {
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

  const newsItems = [
    {
      source: "The National",
      title: "GREEN Brings Solar to Remote Health Posts",
      image: "/images/media-press/newsplaceholder.png",
    },
    {
      source: "CleanTech Wire",
      title: "GRID-INTEL™ Puts PNG on the Energy Data Map",
      image: "/images/media-press/newsplaceholder.png",
    },
    {
      source: "The National",
      title: "GREEN Brings Solar to Remote Health Posts",
      image: "/images/media-press/newsplaceholder.png",
    },
    {
      source: "CleanTech Wire",
      title: "GRID-INTEL™ Puts PNG on the Energy Data Map",
      image: "/images/media-press/newsplaceholder.png",
    },
    {
      source: "The National",
      title: "GREEN Brings Solar to Remote Health Posts",
      image: "/images/media-press/newsplaceholder.png",
    },
    {
      source: "CleanTech Wire",
      title: "GRID-INTEL™ Puts PNG on the Energy Data Map",
      image: "/images/media-press/newsplaceholder.png",
    },
  ];

  const renderContent = () => (
    <>
      {/* Title Section */}
      <div className="mb-8">
        <h2 className="text-2xl lg:text-3xl font-black text-gray-800 mb-4">
          GREEN in the News
        </h2>
        <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-y-0 ">
        {newsItems.map((item, idx) => (
          <div
            key={idx}
            className="flex"
          >
            <div className="relative ">
              <img
                src={item.image}
                alt={item.title}
                className=" object-cover"
              />
            </div>
            <div className="p-4">
              <p className="text-sm  font-semibold mb-2">
                {item.source}
              </p>
              <h3 className="text-gray-900 font-bold text-base mb-3">
                {item.title}
              </h3>
              <Link
              href={"#"}
              className=" cursor-pointer">
              <img src="/images/media-press/ctanews.png" className="w-32" alt="cta" />
              </Link>
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
                  <img src="/images/join-us/xicon.png" alt="Close Icon" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="mx-auto">{renderContent()}</div>
            </div>
          ) : (
            /* Desktop Layout */
            <div
              className="bg-gray-100 transform  py-14 border-2 border-[#23B14D] px-16 relative shadow-2xl  max-h-[85vh]"
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
                  <img src="/images/join-us/xicon.png" alt="Close Icon" />
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

export default GreenInTheNews;
