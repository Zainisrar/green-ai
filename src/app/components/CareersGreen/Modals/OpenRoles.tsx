"use client";
import React, { useState, useEffect } from "react";
import { useInteractiveZIndex } from "../../../../hooks/useInteractiveZIndex";

interface OpenRolesData {
  roles: Array<{
    name: string;
    place: string;
    closing: string;
  }>;
  title: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: OpenRolesData;
}

const OpenRoles = ({ isOpen, onClose, data }: Props) => {
  const [isMobile, setIsMobile] = useState(false);
  const closeButtonProps = useInteractiveZIndex();

  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== "undefined") {
        const mobile = window.innerWidth < 768;
        setIsMobile(mobile);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isOpen) return null;

  const renderContent = () => (
    <>
      {/* Title Section */}
      <div className="mb-8">
        <h2 className="text-2xl lg:text-3xl font-black text-gray-800 mb-4">
          Open Roles
        </h2>
        <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
      </div>

      {/* Roles Grid - 2x2 layout like in the image */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {data?.roles?.map((role, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <span>
                  <img
                    src="/images/grid-intel/lighting.png"
                    className="w-14 -mt-4"
                    alt="lighting"
                  />
                </span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-800 text-lg">{role.name}</h4>
                <p className="text-[#4CAF50] font-medium">{role.place}</p>
                <p className="text-gray-600 text-sm">{role.closing}</p>
              </div>
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
            <div className="bg-white h-[80vh] p-6 overflow-y-auto border-2 border-[#4CAF50] relative shadow-2xl">
              {/* Close Button */}
              <div className="flex justify-end w-full mb-4">
                <div {...closeButtonProps.getContainerProps()}>
                  <button
                    onClick={onClose}
                    className="cursor-pointer text-gray-600 hover:text-gray-800 text-2xl"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="mx-auto">{renderContent()}</div>
            </div>
          ) : (
            /* Desktop Layout - Skewed design */
            <div
              className="bg-white transform  py-10 border-2 border-[#4CAF50] px-16 relative shadow-2xl"
              style={{
                transform: "skewX(-12deg)",
              }}
            >
              {/* Close Button */}
              <div className="flex justify-end w-full mb-4">
                <div {...closeButtonProps.getContainerProps()}>
                  <button
                    onClick={onClose}
                    style={{
                      transform: "skewX(12deg)",
                    }}
                    className="cursor-pointer text-gray-600 hover:text-gray-800 text-2xl transform "
                  >
                    ✕
                  </button>
                </div>
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

export default OpenRoles;
