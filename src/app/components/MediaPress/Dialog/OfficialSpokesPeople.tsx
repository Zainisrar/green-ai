"use client";
import React, { useEffect, useState } from "react";

interface OfficialSpokesPeopleProps {
  isOpen: boolean;
  onClose: () => void;
}

const OfficialSpokesPeople: React.FC<OfficialSpokesPeopleProps> = ({
  isOpen,
  onClose,
}) => {
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

  const spokespeople = [
    {
      name: "Michael Chen",
      title: "Strategy & Corporate Vision",
      image: "/images/media-press/spokespersonplaceholder.png",
    },
    {
      name: "Sarah Williams",
      title: "EPCM Deployment",
      image: "/images/media-press/spokespersonplaceholder.png",
    },
    {
      name: "David Rodriguez",
      title: "Media & Partnerships",
      image: "/images/media-press/spokespersonplaceholder.png",
    },
    {
      name: "Emily Thompson",
      title: "ESG & Community Engagement",
      image: "/images/media-press/spokespersonplaceholder.png",
    },
    {
      name: "James Anderson",
      title: "Technology Innovation",
      image: "/images/media-press/spokespersonplaceholder.png",
    },
    {
      name: "Maria Santos",
      title: "Investor Relations",
      image: "/images/media-press/spokespersonplaceholder.png",
    },
    {
      name: "Robert Taylor",
      title: "Operations & Delivery",
      image: "/images/media-press/spokespersonplaceholder.png",
    },
    {
      name: "Jennifer Lee",
      title: "Legal & Compliance",
      image: "/images/media-press/spokespersonplaceholder.png",
    },
  ];

  const renderContent = () => (
    <>
      {/* Title Section */}
      <div className="mb-8">
        <h2 className="text-2xl  lg:text-3xl font-black text-gray-800 mb-4">
          Official Spokespeople
        </h2>
        <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
        <p className="text-gray-600 mt-4 text-sm">
          For media inquiries, please contact any of our authorized
          representatives below.
        </p>
      </div>

      {/* Spokespeople Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 px-20  lg:grid-cols-4 gap-y-2 gap-6">
        {spokespeople.map((person, idx) => (
          <div
            key={idx}
            className=""
          >
            <div className="">
              <img
                src={person.image}
                alt={person.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-2 ">
              <h3 className="text-gray-900 font-bold text-base mb-1">
                {person.name}
              </h3>
              <p className="text-gray-700 text-xs font-medium">
                {person.title}
              </p>
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
            <div className="bg-gray-100 h-[80vh] p-3 overflow-y-auto py-14  relative shadow-2xl">
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
              className="bg-gray-100 transform  py-14  px-16 relative shadow-2xl max-h-[85vh]"
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
              className="transform max-w-5xl mx-auto">
                {renderContent()}
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default OfficialSpokesPeople;
