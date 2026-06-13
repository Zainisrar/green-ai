"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";
import { useNavigationState } from "@/hooks/useNavigationState";

const Login = () => {
const nav=useNavigationState()
  return (
    <React.Fragment>
      <div className=''>
    <TopNavigation/>
        <div className={`overflow-hidden flex h-full ${nav.isNavigationOpen?"":"z-[9999999999999999]"} relative`}>
          <div className=" lg:w-1/8 hidden lg:flex items-center justify-center">
            <div className="fixed top-1/4 left-10">
              <img
                src="/images/supply-partners/supply-partner.png"
                alt="supply-partner"
                className="w-10"
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:w-5/4  flex flex-col   md:pl-38 md:mr-4  md:my-10 lg:my-0 lg:pl-8 lg:px-8  lg:mr-8 ml-4 rounded-lg">
            <div className="flex flex-col lg:flex-row h-full">
              {/* Left Content */}
              <div className="lg:w-1/2 mt-20 px-4 lg:px-8">
                <div className="mb-8">
                  <h1 className="text-2xl lg:text-3xl font-black mb-2">
                    <span className="text-[#4CAF50]">SUPPLY</span>{" "}
                    <span className="text-black">PARTNER</span>
                  </h1>
                </div>

                <div className="space-y-4 text-gray-700 text-sm lg:text-base leading-relaxed">
                  <p>
                    In and of itself the energy solutions we provide our clients
                    constitute an investment.
                  </p>
                  <p>
                    GREEN Limited is dedicated to maintaining the utmost level
                    of quality and adhering to the highest standards in all of
                    our endeavours, both products and services.
                  </p>
                  <p>
                    The success of our solution delivery for our clients is
                    heavily dependent on the materials and services provided by
                    our supply chains. It is our suppliers and power they
                    provide the momentum for solution.
                  </p>
                  <p>
                    Our strategic importance and improved performance are both
                    boosted by our partnerships and collaborations with
                    suppliers.
                  </p>
                  <p>
                    Therefore, we believe that partnering with suppliers is
                    crucial to our business and see it as a value proposition.
                  </p>
                  <p>
                    We welcome potential suppliers to be part of success
                    stories.
                  </p>
                  <p className="text-[#4CAF50] font-semibold">
                    Please Register to start
                  </p>
                </div>
              </div>

              {/* Right Login Form */}
              <div className="lg:w-1/2 flex items-center justify-center px-4 lg:px-8">
                <div 
                style={{
                  transform:"skewX(-16deg)"
                }}
                className="bg-[#eaf7db]/60   shadow-2xl p-8 py-20 w-full max-w-xl">
                  <div
                  style={{
                    transform:"skewX(16deg)"
                  }}
                  className="text-center mb-6 ">
                    <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                      LOGIN
                    </h2>
                    <p className="text-gray-600 text-sm">
                      Please login here to check your quotation status and / or
                      update order and shipment status.
                    </p>
                  </div>

                  <form
                  style={{
                    transform:"skewX(16deg)"
                  }}
                  className="space-y-4 ">
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="supplytest@nexttechnosolutions.co.in"
                        style={{
                          transform:"skewX(-12deg)"
                        }}
                        className="w-full px-4 py-3 bg-white border border-gray-300  focus:outline-none focus:border-[#4CAF50] text-gray-700"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#4CAF50"
                          strokeWidth="2"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>

                    <div className="text-center">
                      <p className="text-gray-500 text-sm font-semibold mb-4">
                        OR
                      </p>
                      <Link
                        href={"/client-value-engineering"}
                        className="text-[#4CAF50] cursor-pointer font-semibold hover:underline"
                      >
                        Register
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

          <div className="  flex justify-end my-8 mb-40 cursor-pointer">
            <img
              src="/images/supply-partners/login/enquiry.png"
              alt="Enquiry"
            />
          </div>
     
       <Chatbot/>
      </div>
    </React.Fragment>
  );
};

export default Login;
