"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const LatestPressReleases = ({ isOpen, onClose }: Props) => {
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
            style={{
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
              transform:"skewX(12deg)"
            }}
            className="transform  max-w-5xl mx-auto">
              {/* Header */}
              <div className="mb-10">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                  Latest Press Releases
                </h2>
                <div className="w-full h-px bg-gray-400 mb-8"></div>
              </div>

              {/* Press Release Cards Grid */}
              <div className="grid grid-cols-3  mb-12">
                {/* Press Release 1 */}
                <div className=" relative">
                  <div className="absolute bottom-2 -left-6">
                    <img src="/images/media-press/shape.png" alt="vector" />
                  </div>
                  <div className="absolute -top-4 -right-8">
                    <img src="/images/media-press/shape2.png" alt="vector2" />
                  </div>
                  <div className="ml-10">
                    <div className="mb-4">
                      <img
                        src="/images/media-press/easter-higherlands.png"
                        alt="GREEN Launches GRID-INTEL"
                        className=""
                      />
                    </div>
                    <div className="mb-4">
                      <h3 className="font-bold text-gray-800 ">
                        GREEN Launches GRID-INTEL™
                      </h3>
                      <h3 className="font-bold text-gray-800  mb-3">
                        in Eastern Highlands
                      </h3>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8">
                            <img
                              src="/images/media-press/calendar.png"
                              alt="Calendar"
                            />
                          </div>
                          <span className="text-sm text-gray-600">
                            10 July 2025
                          </span>
                        </div>
                        <button className="w-32 cursor-pointer">
                          <img
                            src="/images/media-press/read-more.png"
                            className=""
                            alt="Read More"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              
                <div className=" relative">
                  <div className="absolute bottom-2 -left-6">
                    <img src="/images/media-press/shape.png" alt="vector" />
                  </div>
                  <div className="absolute -top-4 -right-8">
                    <img src="/images/media-press/shape2.png" alt="vector2" />
                  </div>
                  <div className="ml-10">
                    <div className="mb-4">
                      <img
                        src="/images/media-press/easter-higherlands.png"
                        alt="GREEN Launches GRID-INTEL"
                        className=""
                      />
                    </div>
                    <div className="mb-4">
                      <h3 className="font-bold text-gray-800 ">
                        GREEN Launches GRID-INTEL™
                      </h3>
                      <h3 className="font-bold text-gray-800  mb-3">
                        in Eastern Highlands
                      </h3>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8">
                            <img
                              src="/images/media-press/calendar.png"
                              alt="Calendar"
                            />
                          </div>
                          <span className="text-sm text-gray-600">
                            10 July 2025
                          </span>
                        </div>
                        <button className="w-32 cursor-pointer">
                          <img
                            src="/images/media-press/read-more.png"
                            className=""
                            alt="Read More"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              
                <div className=" relative">
                  <div className="absolute bottom-2 -left-6">
                    <img src="/images/media-press/shape.png" alt="vector" />
                  </div>
                  <div className="absolute -top-4 -right-8">
                    <img src="/images/media-press/shape2.png" alt="vector2" />
                  </div>
                  <div className="ml-10">
                    <div className="mb-4">
                      <img
                        src="/images/media-press/easter-higherlands.png"
                        alt="GREEN Launches GRID-INTEL"
                        className=""
                      />
                    </div>
                    <div className="mb-4">
                      <h3 className="font-bold text-gray-800 ">
                        GREEN Launches GRID-INTEL™
                      </h3>
                      <h3 className="font-bold text-gray-800  mb-3">
                        in Eastern Highlands
                      </h3>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8">
                            <img
                              src="/images/media-press/calendar.png"
                              alt="Calendar"
                            />
                          </div>
                          <span className="text-sm text-gray-600">
                            10 July 2025
                          </span>
                        </div>
                        <button className="w-32 cursor-pointer">
                          <img
                            src="/images/media-press/read-more.png"
                            className=""
                            alt="Read More"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              

              
              </div>

              {/* View All Link */}
              <div className="flex justify-end">
                <Link
                  href="#"
                  className="text-gray-700 flex items-center space-x-4 text-lg hover:text-gray-900"
                >
                  <span className="italic">View All Press Releases</span>{" "}
                  <div>
                    <img src="/images/media-press/arrow.png" alt="" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LatestPressReleases;
