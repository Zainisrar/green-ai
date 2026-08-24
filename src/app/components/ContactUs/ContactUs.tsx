"use client";
import React, { useState } from "react";
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
      <div className="min-h-screen">
        <TopNavigation />

        {/* Decorative vertical label (desktop only) */}
        <div className="hidden lg:block fixed top-1/4 left-6 z-10">
          <img loading="lazy" decoding="async"
            src="/images/reach-us/reach-us.png"
            className="w-12 xl:w-16"
            alt="contact-us"
          />
        </div>

        {/* Main Content Area */}
        <main className="mx-auto w-full max-w-6xl px-4 sm:px-6 pt-24 md:pt-28 lg:pl-28 xl:pl-32 lg:pr-8 pb-16">
          {/* Header Text + Enquiry */}
          <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-base sm:text-lg text-gray-700">
              Have questions about GREEN's energy solutions? Get in touch with
              our team. We're here to help!
            </p>
            <div
              {...getContainerProps()}
              onClick={openForm}
              className="shrink-0 cursor-pointer"
            >
              <img loading="lazy" decoding="async"
                src="/images/reach-us/enquiry.png"
                alt="Contact Button"
                className="w-40 sm:w-44 lg:w-48"
              />
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Email */}
            <div className="p-6 border border-gray-300 rounded-lg bg-white hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Email</h3>
              <p className="text-green-600 font-semibold break-words">
                info@green.com.pg
              </p>
            </div>

            {/* Phone */}
            <div className="p-6 border border-gray-300 rounded-lg bg-white hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Phone</h3>
              <p className="text-green-600 font-semibold">+675 123 4567</p>
            </div>

            {/* Location */}
            <div className="p-6 border border-gray-300 rounded-lg bg-white hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Location</h3>
              <p className="text-green-600 font-semibold">
                Port Moresby, Papua New Guinea
              </p>
            </div>
          </div>

          {/* Promo Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">
            <img loading="lazy" decoding="async"
              src="/images/reach-us/transformation.png"
              alt="Transformation Card"
              className="w-full h-auto rounded-lg"
            />
            <img loading="lazy" decoding="async"
              src="/images/reach-us/join-us.png"
              alt="Join Us Card"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </main>

        <Form isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
        <Chatbot />
      </div>
    </React.Fragment>
  );
};

export default ContactUs;
