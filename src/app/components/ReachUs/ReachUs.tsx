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
        <div className="lg:flex h-full">
          <div className=" lg:w-1/7 hidden lg:flex items-center justify-center">
            <div className="fixed top-1/4 left-4 lg:left-14">
              <img
                src="/images/reach-us/reach-us.png"
                className="w-4 lg:w-16"
                alt="reach-us"
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="  flex flex-col lg:mt-10  md:pl-38 md:mr-4  md:my-10 lg:my-0 lg:pl-8 lg:px-8  lg:mr-8 ml-4 rounded-lg">
            <div className="">
              {/* Header Text */}
              <div className="pl-20 lg:pl-0 space-y-4 lg:space-y-0 mb-6 lg:flex justify-between">
                <p className="text-gray-700 text-lg">
                  Are you prepared to get started on your Energy Deployment
                  right away? Let's connect!
                </p>
              <div {...getContainerProps()} onClick={openForm}>
                <img
                  src="/images/reach-us/enquiry.png"
                  alt="Enquiry Button"
                  className="cursor-pointer"
                />
              </div>
              </div>

              {/* Enquiry Button - Top Right */}

              {/* World Map with Animation */}
              <div className="relative  mb-6 lg:pt-20">
                <div className="relative lg:w-[75%]">
                  <img
                    src={mapImages[currentMapIndex]}
                    alt={`World Map ${currentMapIndex + 1}`}
                    className="w-full transition-opacity  duration-500 ease-in-out"
                  />
                </div>
              </div>

              {/* Sidebar Elements */}
              <div className="lg:absolute pb-40 lg:pb-0 lg:right-8 lg:top-1/2 lg:transform lg:-translate-y-1/2 space-y-8 lg:space-y-16">
                <img
                  src="/images/reach-us/transformation.png"
                  alt="Transformation Card"
                />
                <img src="/images/reach-us/join-us.png" alt="Join Us Card" />
              </div>
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
