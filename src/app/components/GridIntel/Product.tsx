"use client";
import React, { useEffect, useState } from "react";

interface ProductIntegrationItem {
  icon: string;
  title: string;
  description: string;
}

interface ProductIntegrationData {
  image: {
    alt: string;
    src: string;
  };
  items: ProductIntegrationItem[];
  title: string;
  tagline: string;
  subtitle: string;
  description: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: ProductIntegrationData;
}
const Product = ({ isOpen, onClose, data }: Props) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Example breakpoint for mobile
    };
    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isOpen) return null;

  const renderIntegrationItems = () => {
    if (data?.items) {
      return data.items.map((item, index) => (
        <div key={index} className="flex items-start space-x-3">
          <img
            src="/images/grid-intel/lighting.png"
            className="w-14 -mt-4"
            alt="lighting"
          />
          <div>
            <p className="text-gray-800 font-medium italic">{item.title}</p>
            <p className="text-gray-600 text-sm mt-1">{item.description}</p>
          </div>
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
            GREEN SunShine Systems
          </p>
        </div>

        <div className="flex items-start space-x-3">
          <img
            src="/images/grid-intel/lighting.png"
            className="w-14 -mt-4"
            alt="lighting"
          />
          <p className="text-gray-800 font-medium italic">
            GREEN Em'Pawa Hybrid Energy Platforms
          </p>
        </div>

        <div className="flex items-start space-x-3">
          <img
            src="/images/grid-intel/lighting.png"
            className="w-14 -mt-4"
            alt="lighting"
          />
          <p className="text-gray-800 font-medium italic">
            Custom-Engineered Microgrids And EPCM Solutions
          </p>
        </div>
      </>
    );
  };
  return (
    <React.Fragment>
      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-black/20 z-[99999999999999999999999999] flex items-center justify-center">
        {/* Modal Container */}
        <div className="relative w-full lg:max-w-6xl mx-4">
          {/* Skewed Modal Background */}

          {isMobile ? (
            <div className="bg-gray-100 p-5 h-[80vh] overflow-y-auto relative shadow-2xl">
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
              <div className="transform  mx-auto">
                {/* Title Section */}
                <div className="mb-8">
                  <h2 className="text-3xl lg:text-4xl font-black text-gray-800 mb-4 leading-tight">
                    {data?.title || "Product Integration"}
                  </h2>
                  <div className="flex items-center">
                    <span className="text-2xl text-black font-bold mr-2">
                      -
                    </span>
                    <h3 className="text-xl text-[#4CAF50] font-semibold">
                      {data?.subtitle ||
                        "GRID-INTEL™ is fully integrated with."}
                    </h3>
                  </div>
                  <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
                </div>

                {/* Main Content */}
                <div className="lg:flex items-start space-x-12">
                  {/* Left Side - Integration List */}
                  <div className="flex-1">
                    <div className="mb-8">
                      {/* Integration List */}
                      <div className="space-y-4">
                        {renderIntegrationItems()}
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Image */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <img
                        src="/images/grid-intel/product-integration.png"
                        alt="Product Integration Interface"
                        className="w-[520px] pt-10"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Result Section */}
              <div className="mt-8 pt-6 text-center border-t border-gray-200">
                <p className="text-gray-800 font-bold text-lg italic">
                  {data?.tagline ||
                    "GRID-INTEL™ turns distributed power systems into orchestrated, intelligent infrastructure."}
                </p>
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
                {/* Title Section */}
                <div className="mb-8">
                  <h2 className="text-3xl lg:text-4xl font-black text-gray-800 mb-4 leading-tight">
                    {data?.title || "Product Integration"}
                  </h2>
                  <div className="flex items-center">
                    <span className="text-2xl text-black font-bold mr-2">
                      -
                    </span>
                    <h3 className="text-xl text-[#4CAF50] font-semibold">
                      {data?.subtitle ||
                        "GRID-INTEL™ is fully integrated with."}
                    </h3>
                  </div>
                  <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
                </div>

                {/* Main Content */}
                <div className="flex items-start space-x-12">
                  {/* Left Side - Integration List */}
                  <div className="flex-1">
                    <div className="mb-8">
                      {/* Integration List */}
                      <div className="space-y-4">
                        {renderIntegrationItems()}
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Image */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <img
                        src="/images/grid-intel/product-integration.png"
                        alt="Product Integration Interface"
                        className="w-[520px] pt-10"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Result Section */}
              <div className="mt-8 pt-6 text-center border-t border-gray-200">
                <p className="text-gray-800 font-bold text-lg italic">
                  {data?.tagline ||
                    "GRID-INTEL™ turns distributed power systems into orchestrated, intelligent infrastructure."}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Product;
