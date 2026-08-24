"use client";
import React, { useEffect, useState } from "react";

interface CorePrincipleItem {
  principle: string;
  statement: string;
}

interface CorePrinciplesData {
  items: CorePrincipleItem[];
  title: string;
  subHeadline: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: CorePrinciplesData;
}
const CorePrinciples = ({ isOpen, onClose, data }: Props) => {
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
          {data?.title || "Core Principles"}
        </h2>
        <div className="lg:flex items-center">
          {!isMobile && (
            <span className="text-2xl text-black font-bold mr-2">-</span>
          )}
          <h3 className="text-xl text-[#4CAF50] font-semibold">
            {data?.subHeadline || "What Guides Our Procurement Decisions"}
          </h3>
        </div>
        <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
      </div>

      {/* Main Content */}
      {isMobile ? (
        /* Mobile: Card Layout */
        <div className="space-y-4">
          {(
            data?.items || [
              {
                principle: "Performance First",
                statement:
                  "Every component must perform in real field conditions — not just on paper.",
              },
              {
                principle: "Value over Price",
                statement:
                  "We invest in lifecycle value, not just low upfront costs.",
              },
              {
                principle: "Fit-for-Environment",
                statement:
                  "Equipment must withstand PNG's terrain, humidity, and intermittency.",
              },
              {
                principle: "Partner Reliability",
                statement:
                  "We choose partners who stand behind their products — long after shipping.",
              },
              {
                principle: "Scalability Ready",
                statement:
                  "What we deploy today must be compatible with tomorrow's growth.",
              },
            ]
          ).map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
            >
              <h4 className="font-bold text-gray-800 mb-2">{item.principle}</h4>
              <p className="text-gray-700 text-sm">{item.statement}</p>
            </div>
          ))}
        </div>
      ) : (
        /* Desktop: Table Layout */
        <div className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-6 py-4 text-left text-lg font-bold text-gray-800">
                  Principle
                </th>
                <th className="px-6 py-4 text-left text-lg font-bold text-gray-800">
                  Statement
                </th>
              </tr>
            </thead>
            <tbody>
              {(
                data?.items || [
                  {
                    principle: "Performance First",
                    statement:
                      "Every component must perform in real field conditions — not just on paper.",
                  },
                  {
                    principle: "Value over Price",
                    statement:
                      "We invest in lifecycle value, not just low upfront costs.",
                  },
                  {
                    principle: "Fit-for-Environment",
                    statement:
                      "Equipment must withstand PNG's terrain, humidity, and intermittency.",
                  },
                  {
                    principle: "Partner Reliability",
                    statement:
                      "We choose partners who stand behind their products — long after shipping.",
                  },
                  {
                    principle: "Scalability Ready",
                    statement:
                      "What we deploy today must be compatible with tomorrow's growth.",
                  },
                ]
              ).map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 font-semibold text-gray-800">
                    {item.principle}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{item.statement}</td>
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
            <div className="bg-gray-100 h-[80vh] p-3 overflow-y-auto py-14 border-2 border-[#4CAF50] relative shadow-2xl">
              {/* Close Button */}
              <div className="flex justify-end w-full">
                <button
                  type="button"
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
            <div className="bg-gray-100 max-h-[90vh] overflow-y-auto rounded-lg py-14 border-2 border-[#4CAF50] px-16 relative shadow-2xl">
              {/* Close Button */}
              <div className="flex justify-end w-full">
                <button
                  type="button"
                  onClick={onClose}
                  className="cursor-pointer text-gray-600 hover:text-gray-800 text-2xl z-10"
                >
                  <img loading="lazy" decoding="async" src="/images/join-us/xicon.png" alt="Close Icon" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="max-w-5xl mx-auto">{renderContent()}</div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default CorePrinciples;
