"use client";
import Link from "next/link";
import React, {  useState } from "react";
import ExistingUsers from "./ExistingUsers";
import NewUsers from "./NewUsers";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";
import { useJoinUs } from "../../../hooks/useJoinUs";

const JoinUs = () => {
  const { data: joinUsData, error } = useJoinUs();
  const [isExistingUsersOpen, setIsExistingUsersOpen] = useState(false);
  const [isNewUsersOpen, setIsNewUsersOpen] = useState(false);



  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <div className="text-xl text-red-600 mb-2">Error loading join us data</div>
          <div className="text-gray-500">Please try refreshing the page</div>
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="">
        <TopNavigation />

        {/* Main Content */}
        <div className="flex h-full">
          {/* Left Side  */}
          <div className=" w-1/8  flex items-center justify-center">
            <div className="fixed top-1/4 lg:top-1/5 left-4 lg:left-14">
              <img
                src="/images/join-us/industry-affiliations-certifications.png"
                alt="industry-affiliations-certifications"
                className="w-5 lg:w-6"
              />
            </div>
          </div>

          {/* Center Content Area */}
          <div className="flex-1   relative z-10">
            <div className="">
              {/* Main Title */}
              <div className="mb-8 pl-20">
                <h1 className="lg:text-3xl font-black text-gray-800 mb-4">
                  {joinUsData?.data?.title || "JOIN US LOGIN"}
                </h1>
                <p className="text-xl lg:text-2xl font-bold text-[#4CAF50] italic mb-6">
                  {joinUsData?.data?.subHeadline ||
                    "Step Into a Career That Builds the Future."}
                </p>
                <p className="text-gray-700 font-semibold lg:max-w-4xl">
                  {joinUsData?.data?.description ||
                    "Whether you're a solar enthusiast, a seasoned engineer, or a fresh graduate, your journey into GREEN begins here. Login to apply, track your applications, and access exclusive career-building resources."}
                </p>
              </div>
              <div className="lg:block hidden absolute   right-0 -z-10">
                <img
                  src="/images/join-us/mainImg.png"
                  className="  h-[80vh]"
                  alt="img"
                />
              </div>
              {/* Login Buttons */}
              <div className="flex space-x-4 lg:mx-20 mb-12">
                <button
                  onClick={() => setIsExistingUsersOpen(true)}
                  className="cursor-pointer"
                >
                  <img
                    src="/images/join-us/existing-users.png"
                    alt="Existing User"
                  />
                </button>
                <button
                  onClick={() => setIsNewUsersOpen(true)}
                  className="cursor-pointer"
                >
                  <img src="/images/join-us/new-users.png" alt="New Users" />
                </button>
              </div>

              {/* Features Section */}
              <div className="mb-8">
                <h3 className="text-xl font-black text-gray-800 mb-6">
                  What You'll Access After Logging In:
                </h3>
                <div className="mb-14">
                  <hr className="w-[67%] text-[#4CAF50]" />
                </div>
                <div className="lg:flex justify-between space-x-10">
                  <div className="grid md:grid-cols-2 max-w-6xl gap-8 mb-8">
                    {/* Left Column */}
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <img
                          src="/images/join-us/lighting.png"
                          alt="Application Tracker Icon"
                          className="w-14"
                        />
                        <div>
                          <h4 className="font-bold text-xl italic text-gray-800">
                            Application Tracker
                          </h4>
                          <p className="text-sm text-gray-600 font-bold">
                            (View, Update, Withdraw)
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <img
                          src="/images/join-us/lighting.png"
                          alt="Application Tracker Icon"
                          className="w-14"
                        />
                        <div>
                          <h4 className="font-bold text-xl italic text-gray-800">
                            Access The GREEN Career Toolkit
                          </h4>
                          <p className="text-sm text-gray-600 font-bold">
                            (Interview Prep, Resume Tips, Field-Readiness Guide)
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <img
                          src="/images/join-us/lighting.png"
                          alt="Application Tracker Icon"
                          className="w-14"
                        />
                        <div>
                          <h4 className="font-bold text-xl italic text-gray-800">
                            Save Jobs & Internship Openings
                          </h4>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <img
                          src="/images/join-us/lighting.png"
                          alt="Application Tracker Icon"
                          className="w-14"
                        />
                        <div>
                          <h4 className="font-bold text-xl italic text-gray-800">
                            Schedule Technical Assessments
                          </h4>
                          <p className="text-sm font-bold text-gray-600">
                            (Where Applicable)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Partner Section */}
                  <div className="text-xl lg:text-3xl">
                    {joinUsData?.data?.quote?.text ? (
                      <div className="font-bold text-gray-800 whitespace-pre-line">
                        {joinUsData.data.quote.text
                          .split("GREEN")
                          .map((part, index) => (
                            <React.Fragment key={index}>
                              {part}
                              {index <
                                joinUsData.data.quote.text.split("GREEN")
                                  .length -
                                  1 && (
                                <span className="text-[#4CAF50]">GREEN</span>
                              )}
                            </React.Fragment>
                          ))}
                      </div>
                    ) : (
                      <>
                        <h4 className="font-bold text-gray-800 mb-2">
                          Already Working With
                        </h4>
                        <p className="text-[#4CAF50] font-bold">
                          GREEN{" "}
                          <span className="text-gray-800">
                            As A Trainee Or Partner?
                          </span>
                        </p>
                        <p className="text-gray-800 font-semibold">
                          Login Via Partner Portal
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Data Policy Section */}
              <div className="lg:flex justify-between mb-32 lg:mb-20">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {joinUsData?.data?.dataPolicyEthics?.title ||
                      "Data Policy & Ethics"}
                  </h3>
                  <p className="text-gray-700 max-w-5xl text-lg mb-4">
                    {joinUsData?.data?.dataPolicyEthics?.description ||
                      "Your Data Is Secure. GREEN Limited Commits To Using All Submitted Information For Recruitment, Training, And Placement Only. No Third-Party Access Is Granted."}
                  </p>

                  <div className="flex flex-wrap gap-10 pt-4 text-sm">
                    <Link
                      href={
                        joinUsData?.data?.email?.href ||
                        "mailto:careers.support@green.com.pg"
                      }
                      className="flex items-center space-x-4"
                    >
                      <img
                        src="/images/join-us/mail.png"
                        alt="Email Icon"
                        className="w-8"
                      />
                      <span className="text-base font-semibold italic">
                        {joinUsData?.data?.email?.text ||
                          "careers.support@green.com.pg"}
                      </span>
                    </Link>
                    <div className="flex items-center space-x-4">
                      <img
                        src="/images/join-us/call.png"
                        alt="Phone Icon"
                        className="w-8"
                      />
                      <span className="text-base font-semibold italic">
                        {joinUsData?.data?.phone?.text ||
                          "+675 XXX XXX XXX (Careers Desk)"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-8">
                  {joinUsData && joinUsData?.data?.cta?.length > 0 ? (
                    <>
                      <div className="flex justify-end cursor-pointer z-50">
                        <Link
                          href={joinUsData?.data.cta[0].href || "#"}
                          className="cursor-pointer"
                        >
                          <button>
                           <img
              src="/images/join-us/view-current-vacancies.png"
              alt="view-current-vacancies"
              className="cursor-pointer"
            />
                          </button>
                        </Link>
                      </div>
                      <div className="flex justify-end cursor-pointer z-50">
                        <Link
                          href={joinUsData?.data.cta[1].href || "#"}
                          className="cursor-pointer"
                        >
                          <button>
                              <img
                            src="/images/join-us/view-our-recruitment-privacy-policy.png"
                            alt="view-our-recruitment-privacy-policy"
                            className="cursor-pointer"
                          />
                          </button>
                        </Link>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-end cursor-pointer z-50">
                        <button className="cursor-pointer">
                           <img
              src="/images/join-us/view-current-vacancies.png"
              alt="view-current-vacancies"
              className="cursor-pointer"
            />
                        </button>
                      </div>
                      <div className="flex justify-end cursor-pointer z-50">
                        <button className="cursor-pointer">
                          <img
                            src="/images/join-us/view-our-recruitment-privacy-policy.png"
                            alt="view-our-recruitment-privacy-policy"
                            className="cursor-pointer"
                          />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Chatbot />
      </div>
      <ExistingUsers
        isOpen={isExistingUsersOpen}
        onClose={() => setIsExistingUsersOpen(false)}
      />
      <NewUsers
        isOpen={isNewUsersOpen}
        onClose={() => setIsNewUsersOpen(false)}
      />
    </React.Fragment>
  );
};

export default JoinUs;
