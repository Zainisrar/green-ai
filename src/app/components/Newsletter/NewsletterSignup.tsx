"use client";
import React, { useEffect, useState } from "react";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";

const NewsLetterSignUp = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Example breakpoint for mobile
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024); // Example breakpoint for tablet
    };
    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <React.Fragment>
      <div className="absolute top-0 left-0">
        <img src="/images/newsletter/mainImg.png" className="w-8/12 h-[150vh]" alt="bg" />
      </div>
      <div className="">
        <TopNavigation />
        <div className="flex h-full ">
          <div className=" lg:w-1/6 hidden lg:flex items-center justify-center">
            <div className="fixed top-1/4 left-14">
              <img
                src="/images/newsletter/newsletter-signup.png"
                alt="newsletter signup"
                className="w-10"
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="   flex flex-col   md:pl-38 md:mr-4  md:my-10 lg:my-0 lg:pl-8 lg:px-8  lg:mr-8 ml-4 rounded-lg">
            <div className=" mt-10 flex  justify-between ">
              <div>
                {/* Main Heading */}
                <h1 className="text-2xl lg:text-3xl font-black mb-4">
                  NEWSLETTER <span className="text-green-600">SIGNUP</span>
                </h1>

                {/* Subtitle */}
                <p className="text-2xl text-green-600 font-semibold mb-6 italic">
                  Stay Informed. Stay Energized.
                </p>

                {/* Description */}
                <p className="text-gray-700 max-w-lg font-bold mb-8 leading-relaxed">
                  Subscribe to{" "}
                  <span className="font-bold text-green-600">
                    GREEN Insights
                  </span>{" "}
                  — your monthly pulse on solar innovation, impact projects,
                  energy access breakthroughs, and exclusive behind-the-scenes
                  content from across PNG and the South Pacific.
                </p>
              </div>
              {/* Two Column Layout */}
              <div className="flex flex-col space-y-8">
                {/* Left Column - Why Subscribe */}
                <div>
                  <h2 className="text-xl lg:text-2xl font-bold mb-4">Why Subscribe?</h2>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="">
                          <th className=" px-4 py-3 text-lg text-left font-black text-green-600">
                            Benefit
                          </th>
                          <th className="  px-4 py-3 text-lg text-left font-black text-green-600">
                            Description
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className=" px-4 py-3 font-black">
                            Insider Updates
                          </td>
                          <td className="text-lg font-medium  px-4 py-3">
                            See the projects before they make headlines
                          </td>
                        </tr>
                        <tr className="">
                          <td className=" px-4 py-3 font-black">
                            Expert Insights
                          </td>
                          <td className=" text-lg font-medium px-4 py-3">
                            Get briefings from GREEN engineers, strategists &
                            partners
                          </td>
                        </tr>
                        <tr>
                          <td className=" px-4 py-3 font-black">
                            Event Access
                          </td>
                          <td className=" text-lg font-medium px-4 py-3">
                            Early invites to webinars, expos, and community
                            events
                          </td>
                        </tr>
                        <tr className="">
                          <td className=" px-4 py-3 font-black">
                            Opportunity Alerts
                          </td>
                          <td className="text-lg font-medium  px-4 py-3">
                            Be first to hear about RFPs, tenders, job openings
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Right Column - What You'll Receive */}
                <div className="mt-10">
                  <h2 className="text-xl lg:text-2xl font-bold mb-8">
                    What You'll <span className="text-green-600">Receive</span>
                  </h2>

                  <div className="space-y-4">
                    <div className="flex  gap-8">
                      <span
                      style={{
                        transform:"skewX(-12deg)"
                      }}
                      className=" border-2  border-[#f0f9da] px-6 py-2  text-sm font-semibold">
                        1 Monthly Email (No Spam)
                      </span>
                      <span
                        style={{
                        transform:"skewX(-12deg)"
                      }}
                      className=" border-2  border-[#f0f9da] px-6 py-2  text-sm font-semibold">
                        Curated Project Highlights
                      </span>
                      <span 
                        style={{
                        transform:"skewX(-12deg)"
                      }}
                      className=" border-2  border-[#f0f9da] px-6 py-2  text-sm font-semibold">
                        Thought Leadership Articles
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span
                        style={{
                        transform:"skewX(-12deg)"
                      }}
                      
                      className=" border-2 border-[#f0f9da] px-6 py-2  text-sm font-semibold">
                        Thought Leadership Articles
                      </span>
                      <span
                        style={{
                        transform:"skewX(-12deg)"
                      }}
                      className=" border-2  border-[#f0f9da] px-6 py-2  text-sm font-semibold">
                        Tools, Templates, & Free Downloads
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Contact Info */}
            <div className="mb-6 relative flex items-center space-x-4 mt-10">
              <div className="absolute top-4 -left-20">
                <img src="/images/newsletter/shape.png" className="w-14" alt="shape" />
              </div>
              <div>
                <h3 className="text-xl lg:text-2xl font-bold mb-2">Contact</h3>
                <p className="text-green-600 text-lg font-semibold">
                  —{" "}
                  <span className="italic">
                    <a href="mailto:insights@green.com.pg">
                      insights@green.com.pg
                    </a>
                  </span>{" "}
                  .
                </p>
              </div>
              <div className="-ml-4 ">
                <img src="/images/newsletter/shape2.png" className="w-14" alt="shape2" />
              </div>
            </div>
            {/* Bottom Message */}
            <div className="flex mb-40 justify-between">
              <div className="text-center text-xl font-semibold">
                <p className="text-gray-900 italic mb-2">
                  From remote installations to regional milestones
                </p>
                <p className="text-gray-900">
                  — let <span className="font-bold text-green-600">GREEN</span>{" "}
                  power your inbox with content that matters.
                </p>
              </div>
              <div className="  relative flex justify-end cursor-pointer">
                <img src="/images/newsletter/sign-up-now.png" alt="sign up" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Chatbot />
    </React.Fragment>
  );
};

export default NewsLetterSignUp;
