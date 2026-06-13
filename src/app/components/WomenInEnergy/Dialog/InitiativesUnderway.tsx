"use client";
import React from "react";
import { useInteractiveZIndex } from "../../../../hooks/useInteractiveZIndex";
import { useWomenInEnergy } from "../../../../hooks/useWomenInEnergy";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const InitiativesUnderway = ({ isOpen, onClose }: Props) => {
  const closeButtonProps = useInteractiveZIndex();
  const { data } = useWomenInEnergy();
  
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isOpen || !data) return null;

  const modalData = data.modal.initiativesUnderway;

  // Helper function to highlight text
  const highlightText = (text: string, highlight: string) => {
    if (!highlight) return text;
    
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} className="text-green-600">{part}</span>
      ) : (
        part
      )
    );
  };

  return (
    <React.Fragment>
      {/* Modal Overlay */}
      <div className="fixed z-[9999999999999999999] inset-0 bg-black/20 flex items-center justify-center">
        {/* Modal Container */}
        <div className="relative w-full max-w-6xl mx-4">
          {/* Skewed Modal Background */}
          {isMobile ? (
            <div className="bg-gray-100 h-[80vh] overflow-y-auto py-14 border-2 border-[#4CAF50] px-4 relative shadow-2xl">
              {/* Close Button */}
              <div className="flex justify-end w-full">
                <div {...closeButtonProps.getContainerProps()}>
                  <button
                    onClick={onClose}
                    className="cursor-pointer text-gray-600 hover:text-gray-800 text-2xl z-10"
                  >
                    <img src="/images/join-us/xicon.png" alt="Close Icon" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="">
                {/* Title Section */}
                <div className="mb-8">
                  <h2 className="text-3xl font-black text-gray-800 mb-4">
                    {modalData.title}
                  </h2>
                  <h3 className="text-lg mb-4">
                    <span className="text-green-600 italic">
                      {modalData.subHeadline}
                    </span>
                  </h3>
                  <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
                </div>

                {/* Table */}
                <div className="mb-8 overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="px-4 py-3 text-left text-lg font-bold text-gray-800 border-b-2 border-gray-300">
                          Program
                        </th>
                        <th className="px-4 py-3 text-left text-lg font-bold text-gray-800 border-b-2 border-gray-300">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {modalData.key.map((initiative, idx) => (
                        <tr key={idx} className="border-b border-gray-200">
                          <td className="px-4 py-4 font-semibold text-gray-800">
                            {initiative.program}
                          </td>
                          <td className="px-4 py-4 text-gray-700">
                            {initiative.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Quote Section */}
                <div className="mt-12 pt-8 border-t border-gray-300">
                  <blockquote className="text-xl font-bold text-center text-gray-800 italic leading-relaxed">
                    {highlightText(modalData.quote.text, modalData.quote.highlighted)}
                  </blockquote>
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
                <div {...closeButtonProps.getContainerProps()}>
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
              </div>

              {/* Modal Content */}
              <div
              style={{
                transform:"skewX(6deg)"
              }}
              className="transform max-w-5xl mx-auto">
                {/* Title Section */}
                <div className="mb-8">
                  <h2 className="text-3xl font-black text-gray-800 mb-4">
                    {modalData.title}
                  </h2>
                  <h3 className="text-lg mb-4">
                    <span className="text-green-600 italic">
                      {modalData.subHeadline}
                    </span>
                  </h3>
                  <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
                </div>

                {/* Table */}
                <div className="mb-8 overflow-hidden">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="px-4 py-3 text-left text-lg font-bold text-gray-800 border-b-2 border-gray-300">
                          Program
                        </th>
                        <th className="px-4 py-3 text-left text-lg font-bold text-gray-800 border-b-2 border-gray-300">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {modalData.key.map((initiative, idx) => (
                        <tr key={idx} className="border-b border-gray-200">
                          <td className="px-4 py-4 font-semibold text-gray-800">
                            {initiative.program}
                          </td>
                          <td className="px-4 py-4 text-gray-700">
                            {initiative.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Quote Section */}
                <div className="mt-12 pt-8 border-t border-gray-300">
                  <blockquote className="text-xl font-bold text-center text-gray-800 italic leading-relaxed">
                    {highlightText(modalData.quote.text, modalData.quote.highlighted)}
                  </blockquote>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default InitiativesUnderway;