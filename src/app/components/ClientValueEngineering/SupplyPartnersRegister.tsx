"use client";

import { Link } from "lucide-react";
import React, { useEffect, useState } from "react";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";

const SupplyPartnersRegister = () => {

const [isDesktop, setIsDesktop] = useState(false);

useEffect(() => {
  const handleResize = () => {
    setIsDesktop(window.innerWidth >= 1100); // Assuming 1024px as the breakpoint for desktop
  };  
  handleResize(); // Initial check
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);
  return (
    <React.Fragment>
      <div className='lg:h-screen lg:overflow-hidden bg-cover lg:bg-[url("/images/client-value-engineering/bg.jpg")] relative'>
      <TopNavigation/>
        <div className="flex h-full">
          <div className=" lg:w-1/6 hidden lg:flex items-center justify-center">
            <div className="absolute bottom-4 2xl:left-24">
              <img
                src="/images/supply-partners/supply-partner.png"
                alt="supply-partners"
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:w-5/4  flex flex-col   md:pl-38 md:mr-4  md:my-10 lg:my-0 lg:pl-8 lg:px-8  lg:mr-8 ml-4 rounded-lg">
            <div className="flex flex-col lg:flex-row h-full">
              {/* Left Content */}
              <div className="lg:w-1/2 mt-20 px-4 lg:px-8">
                <div className="mb-8">
                  <h1 className="text-4xl lg:text-5xl font-black mb-4">
                    <span className="text-[#4CAF50]">CLIENT</span>{" "}
                  </h1>
                  <h2 className="text-4xl lg:text-5xl font-bold mb-2">
                    <span className="text-black">Value Engineering</span>
                  </h2>
                </div>

                <div className="space-y-4 text-gray-700 text-sm lg:text-base leading-relaxed">
                  <p>
                    We, GREEN, endeavor to be of value rather than just a
                    success. As a provider of energy engineering, GREEN is
                    delighted to introduce you to our value engineering delivery
                    to all of our clients.
                  </p>
                  <p>
                    Our primary focus is to deliver customizable renewable
                    energy solutions and services to regions lacking access to
                    conventional energy sources, or unelectrified areas. By
                    empowering communities where reliable access to electricity
                    is still a distant fantasy, we promote well-being and
                    sustainability while fostering economic and social
                    development. Our relentless commitment to providing superior
                    quality solutions, products, and services guarantees that we
                    make a constructive impact on the environment.
                  </p>
                  <p>
                    We engineer to deliver value for your energy needs and
                    environmental sustainability!
                  </p>
                </div>
              </div>

              {/* Right Login Form */}
              <div className="lg:w-1/2 flex items-center justify-center px-4 lg:px-8">
                <div
                 style={{
                     transform:isDesktop?"skewX(-16deg)":"none"
                 }}
                 className="bg-[#f8f9d9]/80 my-10   shadow-2xl p-8 py-32 w-full max-w-xl">
                  <div className="text-center mb-6">
                    <p className="text-gray-600 text-base ">
                      Leverage the Value Engineered for your project!
                    </p>
                    <p className="text-gray-600 text-base ">By Logging In</p>
                  </div>

                  <form className="space-y-4">
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="solutions@nexttechnosolutions.co.in"
                        className="w-full placeholder:text-xs lg:placeholder:text-base px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-[#4CAF50] text-gray-700"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        <svg
                          width="40"
                          height="40"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#32A928"
                          strokeWidth="2"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex mb-32 justify-center  lg:mb-0 lg:block space-x-2 p-2 my-4">
          <div className=" lg:absolute right-2 bottom-28 cursor-pointer">
            <img
              src="/images/supply-partners/login/enquiry.png"
              alt="enquiry"
            />
          </div>
        </div>
        <Chatbot/>
      </div>
    </React.Fragment>
  );
};

export default SupplyPartnersRegister;
