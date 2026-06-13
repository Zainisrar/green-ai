"use client";
import React, { useEffect, useState } from "react";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";
import Form from "./Modal/Form";
import { useInteractiveZIndex } from "../../../hooks/useInteractiveZIndex";

const ContactUs = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { getContainerProps } = useInteractiveZIndex();

  const openForm = () => {
    setIsFormOpen(true);
  };

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
                alt="contact-us"
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="  flex flex-col lg:mt-10  md:pl-38 md:mr-4  md:my-10 lg:my-0 lg:pl-8 lg:px-8  lg:mr-8 ml-4 rounded-lg">
            <div className="">
              {/* Header Text */}
              <div className="pl-20 lg:pl-0 space-y-4 lg:space-y-0 mb-6 lg:flex justify-between">
                <p className="text-gray-700 text-lg">
                  Have questions about GREEN's energy solutions? Get in touch with our team. We're here to help!
                </p>
              <div {...getContainerProps()} onClick={openForm}>
                <img
                  src="/images/reach-us/enquiry.png"
                  alt="Contact Button"
                  className="cursor-pointer"
                />
              </div>
              </div>

              {/* Contact Information Section */}
              <div className="relative mb-6 lg:pt-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Email */}
                  <div className="p-6 border border-gray-300 rounded-lg bg-white hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Email</h3>
                    <p className="text-green-600 font-semibold">info@green.com.pg</p>
                  </div>

                  {/* Phone */}
                  <div className="p-6 border border-gray-300 rounded-lg bg-white hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Phone</h3>
                    <p className="text-green-600 font-semibold">+675 123 4567</p>
                  </div>

                  {/* Location */}
                  <div className="p-6 border border-gray-300 rounded-lg bg-white hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Location</h3>
                    <p className="text-green-600 font-semibold">Port Moresby, Papua New Guinea</p>
                  </div>
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

export default ContactUs;
