"use client";
import React from "react";
import type { CollaborationInnovationOurPhilosophy } from "../../../lib/api";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: CollaborationInnovationOurPhilosophy;
}
const OurPhilosophy = ({ isOpen, onClose, data }: Props) => {
  if (!isOpen) return null;

  const title = data?.title ?? 'Our Philosophy';
  const subHeadline = data?.subHeadline ?? '“We don’t chase trends. We co-create breakthroughs.”';
  const descText = data?.description?.text ?? "GREEN's innovation model is built on trust, experimentation, and field-tested ingenuity. We pursue partnerships that yield measurable results — not just prototypes or press releases.";
  const descHighlighted = data?.description?.highlighted ?? "GREEN's";
  const keys = data?.keys ?? [
    'Remote-ready technologies',
    'Resilient off-grid and microgrid systems',
    'Low-cost scalable storage',
    'AI-enabled smart grid analytics',
    'Climate-adaptive solar architecture',
  ];
  const imgSrc = data?.img?.src ?? '/images/collaboration-innovation/our-philosophy-model.png';
  const imgAlt = data?.img?.alt ?? 'Solar Installation';

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
        <div className="relative w-full max-w-6xl mx-4">
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
                <h2 className="text-3xl font-black text-gray-800 mb-4">{title}</h2>
                <p className="text-lg text-[#4CAF50] font-medium mb-4">- {subHeadline}</p>
                <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
              </div>

              {/* Philosophy Description */}
              <div className="mb-8">
                <p className="text-gray-700 leading-relaxed">
                  <span className="font-bold text-[#4CAF50]">{descHighlighted}</span>{' '}
                  {descText.replace(descHighlighted, '').trim()}
                </p>
              </div>

              {/* Content Layout - Text and Image */}
              <div className="flex flex-col lg:flex-row items-start gap-8">
                {/* Left Column - Innovation Areas */}
                <div className="flex-1 space-y-4">
                  {keys.map((k, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <img src="/images/grid-intel/lighting.png" className="w-14 -mt-4" alt="lighting" />
                      </div>
                      <span className="text-gray-700 text-sm leading-relaxed">{k}</span>
                    </div>
                  ))}
                </div>

                {/* Right Column - Image */}
                <div className="flex-shrink-0 lg:w-[500px]">
                  <img src={imgSrc} alt={imgAlt} />
                </div>
              </div>
            </div>
          
          </div>:
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
                <h2 className="text-3xl font-black text-gray-800 mb-4">{title}</h2>
                <p className="text-lg text-[#4CAF50] font-medium mb-4">- {subHeadline}</p>
                <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
              </div>

              {/* Philosophy Description */}
              <div className="mb-8">
                <p className="text-gray-700 leading-relaxed">
                  <span className="font-bold text-[#4CAF50]">{descHighlighted}</span>{' '}
                  {descText.replace(descHighlighted, '').trim()}
                </p>
              </div>

              {/* Content Layout - Text and Image */}
              <div className="flex flex-col lg:flex-row items-start gap-8">
                {/* Left Column - Innovation Areas */}
                <div className="flex-1 space-y-4">
                  {keys.map((k, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <img src="/images/grid-intel/lighting.png" className="w-14 -mt-4" alt="lighting" />
                      </div>
                      <span className="text-gray-700 text-sm leading-relaxed">{k}</span>
                    </div>
                  ))}
                </div>

                {/* Right Column - Image */}
                <div className="flex-shrink-0 lg:w-[500px]">
                  <img src={imgSrc} alt={imgAlt} />
                </div>
              </div>
            </div>
          
          </div>
        }
        </div>
      </div>
    </React.Fragment>
  );
};

export default OurPhilosophy;
