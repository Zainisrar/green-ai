"use client";
import React, { useEffect, useState } from "react";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";
import Form from "./Modal/Form";
import { useInteractiveZIndex } from "../../../hooks/useInteractiveZIndex";

const ReachUs = () => {
  const [currentMapIndex, setCurrentMapIndex] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { getContainerProps } = useInteractiveZIndex();
  const enquiryProps = getContainerProps();

  const openForm = () => {
    setIsFormOpen(true);
  };

  const mapImages = [
    "/images/reach-us/map1.png",
    "/images/reach-us/map2.png",
    "/images/reach-us/map3.png",
    "/images/reach-us/map4.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMapIndex((prevIndex) => (prevIndex + 1) % mapImages.length);
    }, 2000); // Change map every 2 seconds

    return () => clearInterval(interval);
  }, [mapImages.length]);

  return (
    <React.Fragment>
      <div className="">
        <TopNavigation />

        {/* Side watermark icon (desktop only, fixed — does not affect layout) */}
        <div className="fixed top-1/4 left-6 lg:left-14 z-20 hidden lg:block">
          <img
            src="/images/reach-us/reach-us.png"
            className="w-12 lg:w-16"
            alt="reach-us"
          />
        </div>

        {/* Main Content Area */}
        <div className="relative w-full px-6 py-8 lg:py-10 lg:pl-32 lg:pr-10">
          <div className="relative">
            {/* Header Text + Enquiry Button (top right) */}
            <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <p className="text-gray-700 text-lg max-w-xl">
                Are you prepared to get started on your Energy Deployment right
                away? Let&apos;s connect!
              </p>
              <div
                {...enquiryProps}
                onClick={openForm}
                className={`${enquiryProps.className} shrink-0 cursor-pointer self-start lg:self-auto`}
              >
                <img
                  src="/images/reach-us/enquiry.png"
                  alt="Enquiry Button"
                  className="cursor-pointer"
                />
              </div>
            </div>

            {/* World Map with Animation */}
            <div className="relative mb-6 lg:pt-10">
              <div className="relative w-full lg:w-[72%]">
                <img
                  src={mapImages[currentMapIndex]}
                  alt={`World Map ${currentMapIndex + 1}`}
                  className="w-full transition-opacity duration-500 ease-in-out"
                />
              </div>
            </div>

            {/* Sidebar cards — stacked & centered on mobile, floated right on desktop */}
            <div className="flex flex-col items-center gap-8 pb-10 lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:items-end lg:gap-12 lg:pb-0">
              <img
                src="/images/reach-us/transformation.png"
                alt="Transformation Card"
                className="w-64 lg:w-72"
              />
              <img
                src="/images/reach-us/join-us.png"
                alt="Join Us Card"
                className="w-64 lg:w-72"
              />
            </div>
          </div>
        </div>
        <Form
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
        />
        <Chatbot />
      </div>
    </React.Fragment>
  );
};

export default ReachUs;
