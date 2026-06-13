"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const MediaContactInterviewRequests = ({ isOpen, onClose }: Props) => {
  if (!isOpen) return null;

  return (
    <React.Fragment>
      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center">
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
              <h2 className="text-2xl font-bold  mb-6">
                Media Contact & Interview Requests
              </h2>
                    <div className="w-full h-0.5 bg-gray-300 mt-4"></div>

              <div className="my-10 grid grid-cols-2 gap-8">
                {/* Contact Type Section */}
                <div>
                  <h3 className="text-xl font-bold text-[#4CAF50] mb-4">
                    Contact Type
                  </h3>
                  <ul className="space-y-2">
                    <li className="font-bold">General Media Inquiries</li>
                    <li className="font-bold">Interview Requests</li>
                    <li className="font-bold">Speaking Engagements</li>
                    <li className="mt-20">
                      <div className="flex items-center space-x-2 border border-[#4CAF50] px-4 py-2 ">
                        <img
                          src="/images/media-press/phone.png"
                          alt="Phone Icon"
                          className="w-6 h-6"
                        />
                        <Link href="tel:+675 XXX XXX XXX">
                        <span>Media Desk: +675 XXX XXX XXX</span>
                      </Link>
                      </div>
                    </li>
                  </ul>
                </div>
                {/* Email Section */}
                <div>
                  <h3 className="text-xl font-bold text-[#4CAF50] mb-4">
                    Email
                  </h3>
                  <ul className="space-y-2">
                    <li className="font-bold">
                      <Link href="mailto:media@green.com.pg">
                        media@green.com.pg
                      </Link>
                    </li>
                    <li className="font-bold">
                      <Link href="mailto:comms.director@green.com.pg">
                      comms.director@green.com.pg</Link>
                    </li>
                    <li className="font-bold">
                      <Link href="mailto:outreach@green.com.pg">
                        outreach@green.com.pg
                      </Link>
                    </li>
                    <li className="mt-20">
                      <div className="flex items-center space-x-2 border border-[#4CAF50] px-4 py-2 ">
                        <img
                          src="/images/media-press/calendar.png"
                          alt="Calendar Icon"
                          className="w-6 h-6"
                        />
                        <span>Mon–Fri | 9 AM–5 PM | GMT+10</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MediaContactInterviewRequests;
