"use client";
import React from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  items: { scope: string; issuingBody: string; certification: string }[];
}
const OurCurrentCertifications = ({ isOpen, onClose, title, items }: Props) => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Example breakpoint for mobile
    };
    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isOpen) return null;

  return (
    <React.Fragment>
      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center">
        {/* Modal Container */}
        <div className="relative w-full lg:max-w-6xl mx-4">
          {/* Skewed Modal Background */}
        {
          isMobile?
            <div
            className="bg-gray-100 h-[80vh] overflow-y-auto py-14 border-2 border-[#4CAF50] px-4 relative shadow-2xl"
          >
            {/* Close Button */}
            <div className="flex justify-end w-full">
              <button
                onClick={onClose}
                className="   cursor-pointer text-gray-600 hover:text-gray-800 text-2xl z-10"
              >
                <img src="/images/join-us/xicon.png" alt="Close Icon" />
              </button>
            </div>
            {/* Modal Content */}
            <div className="">
              {/* Title Section */}
              <div className="mb-8">
                <h2 className="text-3xl font-black text-gray-800 mb-4">
                  {title || "Our Current Certifications"}
                </h2>
                <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
              </div>

              {/* Certifications Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="px-6 py-4 text-left text-lg font-bold text-[#4CAF50]">
                        Certification
                      </th>
                      <th className="px-6 py-4 text-left text-lg font-bold text-[#4CAF50]">
                        Issuing Body
                      </th>
                      <th className="px-6 py-4 text-left text-lg font-bold text-[#4CAF50]">
                        Scope
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {items?.map((item, idx) => (
                      <tr key={`${item.certification}-${idx}`}>
                        <td className="px-6 py-4 font-semibold text-gray-800">
                          {item.certification}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {item.issuingBody}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {item.scope}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          :
            <div
            className="bg-gray-100 transform py-14 border-2 border-[#4CAF50] px-16 relative shadow-2xl"
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
                className="   cursor-pointer text-gray-600 hover:text-gray-800 text-2xl z-10 transform "
              >
                <img src="/images/join-us/xicon.png" alt="Close Icon" />
              </button>
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
                  {title || "Our Current Certifications"}
                </h2>
                <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
              </div>

              {/* Certifications Table */}
              <div className="overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="px-6 py-4 text-left text-lg font-bold text-[#4CAF50]">
                        Certification
                      </th>
                      <th className="px-6 py-4 text-left text-lg font-bold text-[#4CAF50]">
                        Issuing Body
                      </th>
                      <th className="px-6 py-4 text-left text-lg font-bold text-[#4CAF50]">
                        Scope
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {items?.map((item, idx) => (
                      <tr key={`${item.certification}-${idx}`}>
                        <td className="px-6 py-4 font-semibold text-gray-800">
                          {item.certification}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {item.issuingBody}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {item.scope}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        }
        </div>
      </div>
    </React.Fragment>
  );
};

export default OurCurrentCertifications;
