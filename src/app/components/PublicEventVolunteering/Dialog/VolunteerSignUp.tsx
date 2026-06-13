"use client";
import React, { useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const VolunteerSignUp = ({ isOpen, onClose }: Props) => {
  if (!isOpen) return null;

  return (
    <React.Fragment>
      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-black/20 z-[9999999999999999999] flex items-center justify-center">
        {/* Modal Container */}
        <div className="relative w-full max-w-6xl mx-4">
          {/* Skewed Modal Background */}
          <div
            className="bg-gray-100 transform py-14 border-2 border-[#4CAF50] px-16 relative shadow-2xl"
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
              {/* Header */}
              <div className="mb-10">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                  Volunteer Sign-Up
                </h2>
                <div className="w-full h-px bg-gray-400 mb-8"></div>
              </div>

              {/* Table Layout */}
              <div className="mb-12">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left text-xl font-bold text-[#23B14D] pb-6 w-1/4">
                        Step
                      </th>
                      <th className="text-left text-xl font-bold text-[#23B14D] pb-6">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="space-y-4">
                    <tr className="">
                      <td className="py-4 text-lg font-semibold text-gray-800">
                        Step 1
                      </td>
                      <td className="py-4 text-lg text-gray-700">
                        Fill the Volunteer Interest Form → <a href="#" className="text-[#23B14D] font-medium underline hover:text-[#1B8F3A]">Join Now</a>
                      </td>
                    </tr>
                    <tr className="">
                      <td className="py-4 text-lg font-semibold text-gray-800">
                        Step 2
                      </td>
                      <td className="py-4 text-lg text-gray-700">
                        Get matched with a program/event near you
                      </td>
                    </tr>
                    <tr className="">
                      <td className="py-4 text-lg font-semibold text-gray-800">
                        Step 3
                      </td>
                      <td className="py-4 text-lg text-gray-700">
                        Receive onboarding brief and safety training
                      </td>
                    </tr>
                    <tr className="">
                      <td className="py-4 text-lg font-semibold text-gray-800">
                        Step 4
                      </td>
                      <td className="py-4 text-lg text-gray-700">
                        Show up, energize lives, and gain impact experience
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Bottom Note */}
              <div className="text-center mt-16">
                <p className="text-gray-800 text-lg italic font-medium">
                  Volunteer insurance and safety briefings are mandatory
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default VolunteerSignUp;
