"use client";

import React, { useEffect, useState } from "react";
import type { ClientPartnershipsWhoWePartnerWith } from "../../../lib/api";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: ClientPartnershipsWhoWePartnerWith;
}
const WhoWePartnerWith = ({ isOpen, onClose, data }: Props) => {
  if (!isOpen) return null;

  const defaultItems = [
    {
      clientType: "Government Ministries & Utilities",
      valueDelivered: "Grid expansion, off-grid programs, energy access delivery"
    },
    {
      clientType: "Multilateral Donors & Development Banks",
      valueDelivered: "Policy-aligned execution, transparent compliance, verified impact"
    },
    {
      clientType: "Private Sector Enterprises",
      valueDelivered: "Clean power, hybrid resilience, ESG-integrated infrastructure"
    },
    {
      clientType: "Institutions (Health, Education, Telecom)",
      valueDelivered: "Reliable systems, custom-engineered uptime, long-term O&M models"
    }
  ];

  const items = data?.items ?? defaultItems;
  const title = data?.title ?? "Who We Partner With";
  const subHeadline = data?.subHeadline ?? "Strategic Clients. Transformational Outcomes.";
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
            className="bg-white h-[80vh] overflow-y-auto  py-14 border-2 border-[#4CAF50] px-4 relative shadow-2xl"
          >
            {/* Close Button */}
          <div className='flex justify-end w-full'>
            <button 
              onClick={onClose}
              className="cursor-pointer text-gray-600 hover:text-gray-800 text-2xl z-10 "
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
                <div className="flex items-center">
                  <span className="text-2xl text-black font-bold mr-2">-</span>
                  <h3 className="text-xl text-[#4CAF50] font-semibold">
                    {subHeadline}
                  </h3>
                </div>
                <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
              </div>

              {/* Main Content - Table */}
              <div className=" overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="">
                      <th className="px-6 py-4 text-left text-lg font-bold text-[#4CAF50] ">
                        Client Type
                      </th>
                      <th className="px-6 py-4 text-left text-lg font-bold text-[#4CAF50] ">
                        Value Delivered
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, idx) => (
                      <tr key={idx} className="">
                        <td className="px-6 py-4 font-semibold text-gray-800">
                          {item.clientType}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {item.valueDelivered}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          :
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
                <div className="flex items-center">
                  <span className="text-2xl text-black font-bold mr-2">-</span>
                  <h3 className="text-xl text-[#4CAF50] font-semibold">
                    {subHeadline}
                  </h3>
                </div>
                <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
              </div>

              {/* Main Content - Table */}
              <div className=" overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="">
                      <th className="px-6 py-4 text-left text-lg font-bold text-[#4CAF50] ">
                        Client Type
                      </th>
                      <th className="px-6 py-4 text-left text-lg font-bold text-[#4CAF50] ">
                        Value Delivered
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, idx) => (
                      <tr key={idx} className="">
                        <td className="px-6 py-4 font-semibold text-gray-800">
                          {item.clientType}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {item.valueDelivered}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
         }
        </div>
      </div>
    </React.Fragment>
  );
};

export default WhoWePartnerWith;
