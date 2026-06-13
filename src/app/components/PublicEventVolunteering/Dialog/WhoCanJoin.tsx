"use client";
import React, { useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const WhoCanJoin = ({ isOpen, onClose }: Props) => {
  if (!isOpen) return null;

  return (
    <React.Fragment>
      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-black/20 z-[999999999999999] flex items-center justify-center">
        {/* Modal Container */}
        <div className="relative w-full max-w-6xl mx-4">
          {/* Skewed Modal Background */}
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
            className="transform  max-w-5xl mx-auto">
              {/* Header */}
              <div className="mb-12">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                  Who Can Join?
                </h2>
                <div className="w-full h-px bg-gray-400 mb-8"></div>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-2 gap-12 gap-y-16">
                {/* Secondary & University Students */}
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 flex-shrink-0">
                    <img 
                      src="/images/public-events-volunteering/university-students.png" 
                      alt="Student Icon" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Secondary & University Students
                    </h3>
                    <p className="text-gray-600 text-lg">
                      (PNG-Based Or International)
                    </p>
                  </div>
                </div>

                {/* Local NGOs, youth groups, and church networks */}
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 flex-shrink-0">
                    <img 
                      src="/images/public-events-volunteering/university-students.png" 
                      alt="Community Icon" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Local NGOs, youth groups, and church networks
                    </h3>
                  </div>
                </div>

                {/* Individual volunteers passionate about energy & sustainability */}
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 flex-shrink-0">
                    <img 
                      src="/images/public-events-volunteering/church-networks.png" 
                      alt="Volunteer Icon" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Individual volunteers passionate about energy & sustainability
                    </h3>
                  </div>
                </div>

                {/* Educators and STEM facilitators */}
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 flex-shrink-0">
                    <img 
                      src="/images/public-events-volunteering/energy-sustainability.png" 
                      alt="Educator Icon" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Educators and STEM facilitators
                    </h3>
                  </div>
                </div>

                {/* Community leaders and ward-level organisers */}
                <div className="flex items-start gap-6 col-span-2 justify-center">
                  <div className="w-16 h-16 flex-shrink-0">
                    <img 
                      src="/images/public-events-volunteering/ward-level-organisers.png" 
                      alt="Leader Icon" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Community leaders and ward-level organisers
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default WhoCanJoin;
