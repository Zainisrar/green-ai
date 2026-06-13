"use client";

import React, { useEffect, useState } from "react";
import type { ClientPartnershipsUseCases } from "../../../lib/api";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: ClientPartnershipsUseCases;
}
const UseCases = ({ isOpen, onClose, data }: Props) => {
  if (!isOpen) return null;

  const title = data?.title ?? "Client Testimonials / Use Cases";
  
  const defaultItems = [
    {
      img: {
        alt: "Nurse at clinic",
        src: "/images/client-partnerships/nurse-review.png"
      },
      title: '"Before GREEN, Our Clinic Had No Light After 5 PM. Now We Perform Safe Deliveries At Night."',
      reference: "– Nurse, Gulf Province"
    },
    {
      img: {
        alt: "Parent with children",
        src: "/images/client-partnerships/rural-review.png"
      },
      title: '"This Solar System Lets My Children Study In The Evening. That\'s Something We Never Had Before."',
      reference: "– Parent, Rural Central PNG"
    },
    {
      img: {
        alt: "Local technician",
        src: "/images/client-partnerships/incubator-review.png"
      },
      title: '"I Was Trained By GREEN. Now I Earn As An O&M Technician And Support My Family."',
      reference: "– Incubator Graduate, Madang"
    },
    {
      img: {
        alt: "Village elder",
        src: "/images/client-partnerships/elder-review.png"
      },
      title: '"We Used To Travel Hours For Fuel. Now We Have Clean Power In The Village — Always."',
      reference: "– Village Elder, Eastern Highlands"
    }
  ];

  const items = data?.items ?? defaultItems;
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
            <div className="">
              {/* Title Section */}
              <div className="mb-8">
                <h2 className="text-3xl font-black text-gray-800 mb-4">
                  {title}
                </h2>
                <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
              </div>

              {/* Testimonials Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {items.map((item, idx) => (
                  <div key={idx} className=" overflow-hidden">
                    <div className="aspect-w-16 aspect-h-12">
                      <img 
                        src={item.img.src}
                        alt={item.img.alt}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-gray-800 font-medium text-sm mb-3 italic leading-relaxed">
                        {item.title}
                      </p>
                      <p className="text-[#4CAF50] font-semibold text-xs">
                        {item.reference}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>:
              <div 
            className="bg-white transform  py-14 border-2 border-[#4CAF50] px-16 relative shadow-2xl"
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
                <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
              </div>

              {/* Testimonials Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {items.map((item, idx) => (
                  <div key={idx} className=" overflow-hidden">
                    <div className="aspect-w-16 aspect-h-12">
                      <img 
                        src={item.img.src}
                        alt={item.img.alt}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-gray-800 font-medium text-sm mb-3 italic leading-relaxed">
                        {item.title}
                      </p>
                      <p className="text-[#4CAF50] font-semibold text-xs">
                        {item.reference}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
       }
        </div>
      </div>
    </React.Fragment>
  );
};

export default UseCases;
