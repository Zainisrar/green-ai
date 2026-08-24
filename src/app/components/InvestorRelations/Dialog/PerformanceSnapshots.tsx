"use client";
import React, { useEffect, useState } from "react";
import { useInvestorRelations } from "../../../../hooks/useInvestorRelations";

interface PerformanceSnapshotsProps {
  isOpen: boolean;
  onClose: () => void;
}

const PerformanceSnapshots: React.FC<PerformanceSnapshotsProps> = ({
  isOpen,
  onClose,
}) => {
  const { data } = useInvestorRelations();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isOpen || !data) return null;

  const modalData = data.performanceSnapshots;

  const renderContent = () => (
    <>
      {/* Title Section */}
      <div className="mb-8">
        <h2 className="text-2xl lg:text-3xl font-black text-gray-800 mb-4">
          {modalData.title}
        </h2>
        <div className="lg:flex items-center">
          
          <h3 className="text-xl text-[#23B14D] font-semibold">
            {modalData.headline}
          </h3>
        </div>
        <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
      </div>

      {/* Metrics Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="">
              <th className="p-4 text-left font-bold text-gray-900">
                Metric
              </th>
              <th className="p-4 text-left font-bold text-gray-900 ">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {modalData.metric.items.map((metric, idx) => (
              <tr
                key={idx}
                className=""
              >
                <td className="p-4 text-gray-800 font-medium">{metric}</td>
                <td className="p-4 text-[#23B14D] font-bold text-lg">
                  {modalData.value.items[idx]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

  return (
    <React.Fragment>
      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-black/20 z-[99999999999999999999999999] flex items-center justify-center">
        {/* Modal Container */}
        <div className="relative w-full lg:max-w-5xl mx-4">
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
              className="bg-gray-100 transform  py-14 border-2 border-[#23B14D] px-16 relative shadow-2xl"
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
                  <img loading="lazy" decoding="async" src="/images/join-us/xicon.png" alt="Close Icon" />
                </button>
              </div>

              {/* Modal Content */}
              <div
              style={{
                transform:"skewX(6deg)"
              }}
              className="transform  max-w-4xl mx-auto">
                {renderContent()}
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default PerformanceSnapshots;
