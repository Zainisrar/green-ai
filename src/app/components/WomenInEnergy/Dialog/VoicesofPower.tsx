"use client";
import React from "react";
import { useInteractiveZIndex } from "../../../../hooks/useInteractiveZIndex";
import { useWomenInEnergy } from "../../../../hooks/useWomenInEnergy";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

// Placeholder categories for the left-side menu.
// Swap these for API-provided designations/categories once the
// women-in-energy endpoint groups its members.
const PLACEHOLDER_CATEGORIES = [
  "Leadership",
  "Engineers",
  "Field Ops",
  "Trainees",
];

const VoicesofPower = ({ isOpen, onClose }: Props) => {
  const closeButtonProps = useInteractiveZIndex();
  const { data } = useWomenInEnergy();

  const [isMobile, setIsMobile] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState(0);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isOpen || !data) return null;

  const modalData = data.modal.voicesOfPower;

  // Left-side category menu (copied from the Team GREEN "Meet the Team" pattern).
  // Categories are placeholders until the API supplies member groupings, so every
  // category currently shows the full set of members.
  const renderContent = () => (
    <>
      {/* Title Section */}
      <div className="mb-8">
        <h2 className="text-2xl lg:text-3xl font-black text-gray-800 mb-4">
          {modalData.title}
        </h2>
        <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
      </div>

      {/* Main Content with left-side category navigation */}
      <div className={`${isMobile ? "flex flex-col space-y-6" : "flex gap-8"}`}>
        {/* Left-side Category Menu */}
        <div className={`${isMobile ? "w-full" : "w-40"} flex-shrink-0`}>
          <div
            className={`${
              isMobile ? "flex flex-wrap gap-2 justify-center" : "space-y-4"
            }`}
          >
            {PLACEHOLDER_CATEGORIES.map((category, idx) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(idx)}
                className={`${
                  isMobile
                    ? "px-3 py-2 text-sm rounded-full"
                    : "w-full text-left px-4 py-3 text-xl"
                } font-bold transition-all ${
                  selectedCategory === idx ? "text-green-600" : "text-gray-800"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Team Members / Testimonials Grid */}
        <div className="flex-1">
          <div
            className={`grid ${
              isMobile ? "grid-cols-1 gap-4" : "grid-cols-2 lg:grid-cols-3 gap-6"
            }`}
          >
            {modalData.items.map((testimonial, idx) => (
              <div key={idx} className="overflow-hidden">
                <div className="relative">
                  <img
                    src={testimonial.img.src}
                    alt={testimonial.img.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="text-gray-800 font-semibold italic text-sm mb-2">
                    {testimonial.title}
                  </p>
                  <p className="text-green-600 text-xs font-medium">
                    {testimonial.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <React.Fragment>
      {/* Modal Overlay */}
      <div className="fixed z-[9999999999999999999] inset-0 bg-black/20 flex items-center justify-center">
        {/* Modal Container */}
        <div className="relative w-full max-w-6xl mx-4">
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
              <div className="">{renderContent()}</div>
            </div>
          ) : (
            <div
              className="bg-gray-100 transform py-14 border-2 border-[#4CAF50] px-16 relative shadow-2xl"
              style={{ transform: "skewX(-12deg)" }}
            >
              {/* Close Button */}
              <div className="flex justify-end w-full">
                <div {...closeButtonProps.getContainerProps()}>
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
              </div>

              {/* Modal Content */}
              <div
                style={{
                  transform: "skewX(12deg)",
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

export default VoicesofPower;
