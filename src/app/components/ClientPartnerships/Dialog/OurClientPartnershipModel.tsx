"use client";

import React  from "react";
import type { ClientPartnershipsOurClientPartnership } from "../../../lib/api";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: ClientPartnershipsOurClientPartnership;
}
const OurClientPartnershipModel = ({ isOpen, onClose, data }: Props) => {
  if (!isOpen) return null;

  const title = data?.title ?? "Our Client Partnership Model";
  const subHeadline = data?.subHeadline ?? "Aligned by Design. Delivered with Accountability.";
  const description = data?.description ?? "We co-create value with clients through a model that emphasises";
  const imgSrc = data?.img?.src ?? "/images/client-partnerships/future-visions-business-technology.png";
  const imgAlt = data?.img?.alt ?? "Partnership handshake in business setting";
  
  const defaultItems = [
    {
      title: "Needs-Based Engineering",
      description: "Every solution designed around mission-critical needs"
    },
    {
      title: "Delivery Discipline",
      description: "Timelines. Compliance. Zero-excuse execution"
    },
    {
      title: "Transparency & Reporting",
      description: "Real-time monitoring, impact dashboards, partner visibility"
    },
    {
      title: "Post-Project Continuity",
      description: "Training, O&M, warranty coverage, GRID-INTEL™ support"
    }
  ];

  const items = data?.items ?? defaultItems;
  const quoteText = data?.quote?.text ?? "\"Our goal isn't just to deploy. It's to ensure your project is still running — 10 years later.\"";
  const quoteHighlighted = data?.quote?.highlighted?.split('\n') ?? ['goal', 'project'];
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Example breakpoint for mobile
    };
    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
            className="bg-white h-[80vh] overflow-y-auto py-14 border-2 border-[#4CAF50] px-4 relative shadow-2xl"
          >
            {/* Close Button */}
          <div className='flex justify-end w-full'>
            <button 
              onClick={onClose}
              className="cursor-pointer text-gray-600 hover:text-gray-800 text-2xl z-10"
            >
              <img src="/images/join-us/xicon.png" alt="Close Icon" />
            </button>
          </div>
            
            {/* Modal Content */}
            <div className=" max-w-5xl">
              {/* Title Section */}
              <div className="mb-8">
                <h2 className="text-3xl font-black text-gray-800 mb-4">
                  {title}
                </h2>
                <div className="flex items-center">
                  <span className="text-2xl text-black font-bold mr-2">-</span>
                  <h3 className="text-xl text-[#4CAF50] font-semibold">
                    {subHeadline}
                  </h3>
                </div>
                <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
              </div>

              <div className="mb-6">
                <p className="text-gray-700 text-lg font-medium">
                  {description}
                </p>
              </div>

              {/* Main Content */}
              <div className="">
                {/* Left Side - Content */}
                <div className="flex-1">
                  <div className="space-y-6">
                    {/* Partnership Model List */}
                    {items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="font-bold text-gray-800 text-lg">
                          {item.title}
                        </div>
                        <div className="text-gray-700 text-lg">
                          - {item.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side - Image */}
                <div className="flex-shrink-0">
                  <div className="relative flex justify-center my-8">
                    <img 
                      src={imgSrc}
                      alt={imgAlt}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Quote */}
              <div className="mt-12 text-center">
                <p className="text-gray-800 font-bold text-xl italic">
                  {quoteText.split(new RegExp(`(${quoteHighlighted.join('|')})`, 'gi')).map((part, i) => 
                    quoteHighlighted.some(h => h.toLowerCase() === part.toLowerCase()) ? (
                      <span key={i} className="text-[#4CAF50]">{part}</span>
                    ) : (
                      <React.Fragment key={i}>{part}</React.Fragment>
                    )
                  )}
                </p>
              </div>
            </div>
          </div>:
            <div 
            className="bg-white transform py-14 border-2 border-[#4CAF50] px-16 relative shadow-2xl"
            style={{ clipPath: 'polygon(0 0, 95% 0, 100% 100%, 5% 100%)',
              transform:"skewX(-12deg)"
             }}
          >
            {/* Close Button */}
          <div className='flex justify-end w-full'>
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
              transform:"skewX(6deg)"
             }}
            className="transform  max-w-5xl mx-auto">
              {/* Title Section */}
              <div className="mb-8">
                <h2 className="text-3xl font-black text-gray-800 mb-4">
                  {title}
                </h2>
                <div className="flex items-center">
                  <span className="text-2xl text-black font-bold mr-2">-</span>
                  <h3 className="text-xl text-[#4CAF50] font-semibold">
                    {subHeadline}
                  </h3>
                </div>
                <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
              </div>

              <div className="mb-6">
                <p className="text-gray-700 text-lg font-medium">
                  {description}
                </p>
              </div>

              {/* Main Content */}
              <div className="flex items-start space-x-12">
                {/* Left Side - Content */}
                <div className="flex-1">
                  <div className="space-y-6">
                    {/* Partnership Model List */}
                    {items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="font-bold text-gray-800 text-lg">
                          {item.title}
                        </div>
                        <div className="text-gray-700 text-lg">
                          - {item.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side - Image */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img 
                      src={imgSrc}
                      alt={imgAlt}
                      style={{
                        transform:"skewX(4deg)"
                      }}
                      className="w-[300px] "
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Quote */}
              <div className="mt-12 text-center">
                <p className="text-gray-800 font-bold text-xl italic">
                  {quoteText.split(new RegExp(`(${quoteHighlighted.join('|')})`, 'gi')).map((part, i) => 
                    quoteHighlighted.some(h => h.toLowerCase() === part.toLowerCase()) ? (
                      <span key={i} className="text-[#4CAF50]">{part}</span>
                    ) : (
                      <React.Fragment key={i}>{part}</React.Fragment>
                    )
                  )}
                </p>
              </div>
            </div>
          </div>
         }
        </div>
      </div>
    </React.Fragment>
  );
};

export default OurClientPartnershipModel;
