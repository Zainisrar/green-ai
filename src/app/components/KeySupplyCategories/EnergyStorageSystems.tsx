"use client";
import React, { useEffect, useState } from "react";

interface ModalItem {
  component: string;
  technicalNotes: string;
}

interface ModalData {
  item: ModalItem[];
  title: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: ModalData;
}

const EnergyStorageSystems = ({ isOpen, onClose, data }: Props) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderContent = () => (
    <>
      {/* Title Section */}
      <div className="mb-8">
        <h2 className="text-2xl lg:text-3xl font-black text-gray-800 mb-4">
          {data?.title || "Energy Storage Systems"}
        </h2>
        <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
      </div>

      {/* Main Content */}
      {isMobile ? (
        /* Mobile: Card Layout */
        <div className="space-y-4">
          {(
            data?.item || [
              {
                component: "Battery Banks",
                technicalNotes:
                  "LFP (preferred), GEL or Lead-carbon (secondary), >4000 cycle life @ 80% DoD, BMS-integrated, modular racking",
              },
              {
                component: "BESS Controllers",
                technicalNotes:
                  "Programmable dispatch, remote firmware updates, peak shaving/logging features, load-proportional discharge",
              },
              {
                component: "Racks & Enclosures",
                technicalNotes:
                  "Ventilated or climate-sealed; modular design for scale-out; compliant with AS/NZS 5139 & IEEE 1547",
              },
            ]
          ).map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 p-4 rounded-lg border border-gray-200"
            >
              <h4 className="font-bold text-[#4CAF50] mb-2">
                {item.component}
              </h4>
              <p className="text-gray-700 text-sm">{item.technicalNotes}</p>
            </div>
          ))}
        </div>
      ) : (
        /* Desktop: Table Layout */
        <div className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-6 py-4 text-left text-lg font-bold text-[#4CAF50]">
                  Component
                </th>
                <th className="px-6 py-4 text-left text-lg font-bold text-[#4CAF50]">
                  Technical Notes
                </th>
              </tr>
            </thead>
            <tbody>
              {(
                data?.item || [
                  {
                    component: "Battery Banks",
                    technicalNotes:
                      "LFP (preferred), GEL or Lead-carbon (secondary), >4000 cycle life @ 80% DoD, BMS-integrated, modular racking",
                  },
                  {
                    component: "BESS Controllers",
                    technicalNotes:
                      "Programmable dispatch, remote firmware updates, peak shaving/logging features, load-proportional discharge",
                  },
                  {
                    component: "Racks & Enclosures",
                    technicalNotes:
                      "Ventilated or climate-sealed; modular design for scale-out; compliant with AS/NZS 5139 & IEEE 1547",
                  },
                ]
              ).map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 font-semibold text-gray-800">
                    {item.component}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {item.technicalNotes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
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
              className="bg-white transform  py-14 border-2 border-[#4CAF50] px-16 relative shadow-2xl"
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
                className="transform max-w-5xl mx-auto"
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

export default EnergyStorageSystems;
