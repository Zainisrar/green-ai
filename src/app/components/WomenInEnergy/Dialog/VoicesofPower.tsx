"use client";
import React from "react";
import { useInteractiveZIndex } from "../../../../hooks/useInteractiveZIndex";
import { useWomenInEnergy } from "../../../../hooks/useWomenInEnergy";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const VoicesofPower = ({ isOpen, onClose }: Props) => {
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

  const modalData = data.modal.voicesOfPower;

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
                  <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 gap-6">
                  {modalData.items.map((testimonial, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
                    >
                      <div className="relative h-48">
                        <img
                          src={testimonial.img.src}
                          alt={testimonial.img.alt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-gray-800 font-semibold italic mb-2">
                          {testimonial.title}
                        </p>
                        <p className="text-green-600 text-sm font-medium">
                          {testimonial.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div
              className="bg-gray-100 transform py-14 border-2 border-[#4CAF50] px-16 relative shadow-2xl"
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
                  <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {modalData.items.map((testimonial, idx) => (
                    <div
                      key={idx}
                      className="  overflow-hidden "
                    >
                      <div className="relative ">
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
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default VoicesofPower;