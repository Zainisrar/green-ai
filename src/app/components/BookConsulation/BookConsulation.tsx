"use client";
import React, { useState } from "react";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";
import Booking from "./Modals/Booking";

const BookConsulation = () => {
  const [booking, setBooking] = useState(false);

  return (
    <React.Fragment>
      <div className="">
        <TopNavigation />
        <div className="flex h-full">
          <div className=" lg:w-1/6 hidden lg:flex items-center justify-center">
            <div className="fixed top-1/4 left-14">
              <img
                src="/images/book-consulation/book-consulation.png"
                alt="globalsnapshot"
                className="w-10"
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="  flex flex-col   md:pl-38 md:mr-4  md:my-10  lg:my-0 lg:pl-8 lg:px-8  lg:mr-8 ml-4 rounded-lg">
            <div className="ml-10">
              {/* Main Heading */}
              <h1 className="text-2xl lg:text-3xl font-black text-gray-800 mb-4">
                BOOK A <span className="text-[#23B14D]">CONSULTATION</span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl lg:text-2xl text-[#23B14D] italic font-bold mb-2">
                Let's Solve Energy, Together.
              </p>

              {/* Description */}
              <p className="text-gray-700 text-base lg:text-lg max-w-7xl mb-4 leading-relaxed">
                Whether you're developing a project, designing a grant, or
                planning a regional rollout — schedule a tailored consultation
                with <span className="font-bold text-[#23B14D]">GREEN's</span>{" "}
                technical, strategy, or policy teams. Get real answers from
                those who deliver real energy systems.
              </p>

              {/* Consultation Focus Areas */}
              <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4">
                Consultation Focus Areas
              </h2>

              <div className="overflow-x-auto mb-4">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="">
                      <th className=" px-4 py-3 text-left text-lg font-bold text-[#23B14D]">
                        Benefit
                      </th>
                      <th className=" px-4 py-3 text-left text-lg font-bold text-[#23B14D]">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className=" px-4 py-3 font-semibold">
                        Project Planning
                      </td>
                      <td className=" px-4 py-3">
                        Site evaluation, load estimation, feasibility reviews
                      </td>
                    </tr>
                    <tr className="">
                      <td className=" px-4 py-3 font-semibold">
                        Solar EPCM Advisory
                      </td>
                      <td className=" px-4 py-3">
                        Procurement design, component selection, commissioning
                        guidance
                      </td>
                    </tr>
                    <tr>
                      <td className=" px-4 py-3 font-semibold">
                        Policy & Energy Access
                      </td>
                      <td className=" px-4 py-3">
                        Regulatory navigation, rural electrification roadmaps
                      </td>
                    </tr>
                    <tr className="">
                      <td className=" px-4 py-3 font-semibold">
                        Donor & Development
                      </td>
                      <td className=" px-4 py-3">
                        Proposal alignment, ESG integration, monitoring &
                        verification
                      </td>
                    </tr>
                    <tr>
                      <td className=" px-4 py-3 font-semibold">
                        Technology Vendors
                      </td>
                      <td className=" px-4 py-3">
                        Product qualification, integration testing, local market
                        readiness
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Booking Details */}
              <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4">Booking Details</h2>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center space-x-3">
                  <span>
                    <img
                      src="/images/grid-intel/lighting.png"
                      className="w-14 -mt-4"
                      alt="lighting"
                    />
                  </span>
                  <span className="font-semibold italic">
                    30-Minute Discovery Call (Zoom / Google Meet)
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <span>
                    <img
                      src="/images/grid-intel/lighting.png"
                      className="w-14 -mt-4"
                      alt="lighting"
                    />
                  </span>
                  <span className="font-semibold italic">
                    One-Hour Technical Session
                  </span>
                </div>

                <div className="flex items-center space-x-3 md:col-span-2">
                  <span>
                    <img
                      src="/images/grid-intel/lighting.png"
                      className="w-14 -mt-4"
                      alt="lighting"
                    />
                  </span>
                  <span className="font-semibold italic">
                    In-Person (Port Moresby HQ Or Field Offices)
                  </span>
                </div>
              </div>

              {/* Schedule Info */}
              <div className="flex space-x-2  items-center mb-4">
                <div
                 style={{
                  transform:"skewX(-16deg)"
                 }}
                className="flex items-center  border-[#f0f9da] p-4 border-3  px-6 space-x-3 ">
                  <span>
                    <img
                      style={
                        {
                          transform:"skewX(16deg)"
                        }
                      }
                      src="/images/book-consulation/calendar.png"
                      className="w-6"
                      alt="lighting"
                    />
                  </span>
                  <span
                   style={{
                    transform:"skewX(16deg)"
                   }}
                  className="font-semibold  italic">
                    Monday-Friday | 9 AM To 5 PM GMT+10
                  </span>
                </div>
                <div
                style={{
                  transform:"skewX(-16deg)"
                }}
                className="flex border-3 p-4  px-4  border-[#f0f9da] items-center space-x-3">
                  <p
                  style={
                    {
                      transform:"skewX(16deg)"
                    }
                  }
                  className="font-semibold  italic ">
                    Other Slots By Request (For Global Partners)
                  </p>
                </div>
              </div>

              {/* Free Consultation Note */}
              <p className="text-center text-gray-600 ">
                Consultations are free for{" "}
                <span className="text-[#23B14D] font-semibold">
                  government agencies, donors, NGOs,
                </span>{" "}
                and registered local businesses.
              </p>
            </div>
          </div>
          <div className=" absolute right-0 bottom-0   -z-10">
            <img src="/images/book-consulation/mainImg.png " alt="bg" />
          </div>
          {/* Sidebar Content */}
          <div className="hidden  lg:flex flex-col items-center h-screen justify-center max-w-xs">
            <div className="relative flex items-center ">
              <div className="absolute -left-16 top-20">
                <img
                  src="/images/book-consulation/shape.png"
                  className="w-12"
                  alt="shape"
                />
              </div>
              <div>
                <h3 className="text-lg lg:text-xl font-bold ">
                  You Don't Need To Navigate Energy Decisions Alone.
                </h3>
                <p className="text-lg font-bold mb-4">
                  With <span className="text-[#23B14D] font-bold">GREEN</span>,
                  Expert Insight Is Just A Click Away.
                </p>
              </div>
              <div className="absolute right-4 -top-2">
                <img
                  src="/images/book-consulation/shape2.png"
                  className="w-12"
                  alt="shape"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex lg:block space-x-2 mb-32 p-2 my-4">
          <div 
           onClick={()=>{
             setBooking(true);
           }}
          className=" flex justify-end cursor-pointer">
            <img
              src="/images/book-consulation/book-my-consulation.png"
              alt="book-my-consulation"
            />
          </div>
        </div>
      </div>
      <Chatbot />
      <Booking
        isOpen={booking}
        onClose={() => setBooking(false)}
      />
    </React.Fragment>
  );
};

export default BookConsulation;
