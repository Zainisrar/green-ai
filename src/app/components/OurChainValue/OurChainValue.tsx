"use client";
import React from "react";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";
import { useOurValueChain } from "../../../hooks/useOurValueChain";
import { handleImageError } from "../lib/utils";

interface ValueChainItem {
  img: {
    alt: string;
    src: string;
  };
  title: string;
  description: string;
}

interface Quote {
  text: string;
  highlighted: string;
}

interface CTA {
  href: string;
  text: string;
}

interface Description {
  text: string;
  highlighted: string;
}

interface OurValueChainData {
  id: number;
  title: string;
  subHeadline: string;
  description: Description;
  quote: Quote[];
  cta: CTA[];
  valueChainStrip: ValueChainItem[];
  createdAt: string;
  updatedAt: string;
}

const OurChainValue = () => {
  const { data: apiData } = useOurValueChain();
  // Type assertion to help TypeScript understand the data structure
  const data = apiData as OurValueChainData | undefined;

  if (!data) {
    return null;
  }

  return (
    <React.Fragment>
      <div className="  ">
        <TopNavigation />
        <div className="absolute top-0 left-0 lg:left-10 lg:block hidden">
          <img
            src="/images/our-value-chain/mainImg.png"
            className="w-screen lg:w-auto lg:h-[125vh]"
            alt="bg"
          />
        </div>
        <div className="flex h-full">
          {/* Left Side */}
          <div className="lg:w-1/6 flex items-center justify-center">
            <div className="fixed top-1/4 left-4 lg:left-14">
              <img
                src="/images/our-value-chain/our-value-chain.png"
                alt="our value chain"
                className="w-5 lg:w-auto"
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:flex space-x-4  ml-10 mt-10 ">
            {/* Main Title */}
            <div className="mb-8 pl-10 lg:pl-0 lg:w-5/12">
              <h1 className="text-2xl lg:text-3xl font-black text-gray-800 mb-4">
                {data?.title ? (
                  data.title.split(/\b(value)\b/gi).map((part, index) => 
                    part.toLowerCase() === 'value' ? (
                      <span key={index} className="text-[#23B14D]">{part.toUpperCase()}</span>
                    ) : (
                      <span key={index}>{part.toUpperCase()}</span>
                    )
                  )
                ) : (
                  "OUR VALUE CHAIN"
                )}
              </h1>
              <h2 className="text-lg lg:text-2xl font-bold text-[#23B14D] italic mb-4">
                {data?.subHeadline || "Built by Design. Delivered End-to-End."}
              </h2>
              <div className="absolute lg:block hidden bottom-10">
                <div className="">
                  <div
                  style={{
                    transform:"skewX(-16deg)"
                  }}
                  className="bg-[#f7fadb]  p-5 mb-10 shadow-lg">
                    <h3
                    style={{
                      transform:"skewX(16deg)"
                    }}
                    className="text-xl lg:text-2xl capitalize font-bold text-gray-800  ">
                      {data?.quote?.[0]?.highlighted ? (
                        <>
                          {data?.quote?.[0]?.text
                            ?.split("\n")
                            ?.filter((line) => line.trim() !== "") // remove empty/extra lines
                            ?.map((line, i) => (
                              <div key={i}>
                                {line.includes(
                                  data?.quote?.[0]?.highlighted
                                ) ? (
                                  <>
                                    {
                                      line.split(
                                        data?.quote?.[0]?.highlighted
                                      )[0]
                                    }
                                    <span className="text-[#23B14D]">
                                      {data?.quote?.[0]?.highlighted}
                                    </span>
                                    {
                                      line.split(
                                        data?.quote?.[0]?.highlighted
                                      )[1]
                                    }
                                  </>
                                ) : (
                                  line
                                )}
                              </div>
                            ))}
                        </>
                      ) : (
                        <>
                          End-To-End{" "}
                          <span className="text-[#23B14D]">Solution</span>
                          <br />
                          Ecosystem.
                        </>
                      )}
                    </h3>
                  </div>
                </div>
                <div className=" font-bold">
                  <div className="text-lg italic text-gray-700 mb-4">
                    {data?.quote?.[1]?.text?.split("\n")?.map((line, index) => (
                      <div key={index}>{line}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Value Chain Strip */}
            <div className="mb-12">
              <div className="text-gray-600 text-lg mb-6">
                {data?.description?.highlighted ? (
                  <>
                    {
                      data.description.text.split(
                        data.description.highlighted
                      )[0]
                    }
                    <span className="text-[#23B14D] font-semibold">
                      {data.description.highlighted}
                    </span>
                    {
                      data.description.text.split(
                        data.description.highlighted
                      )[1]
                    }
                  </>
                ) : (
                  <>
                    <span className="text-[#23B14D] font-semibold">GREEN</span>{" "}
                    doesn't outsource reliability — we engineer it. From
                    sourcing to service, every step is owned, optimized, and
                    accountable.
                  </>
                )}
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6">
                Value Chain Strip
              </h3>

              {/* Chain Steps Grid */}
              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                {(data?.valueChainStrip || []).map(
                  (item: ValueChainItem, index: number) => (
                    <div key={index} className="flex space-x-4">
                      <div className="">
                        <img
                          src={item.img.src}
                          alt={item.img.alt || `${item.title} icon`}
                          className="w-8"
                          onError={(e) => handleImageError(e, "/images/our-value-chain/globe.png")}
                        />
                      </div>
                      <div>
                        <h4 className="text-lg lg:text-xl font-bold text-gray-800 ">
                          {item.title}
                        </h4>
                        <div className="text-sm text-gray-900 ">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
              <div className="flex space-x-12 mb-8">
                {/* End-to-End Solution Box */}

                {/* Right Side Content */}
                <div className="">
                  {/* Quote Section */}
                  <div>
                    <div className="mb-4">
                      <div className="text-lg font-bold text-gray-800">
                        {data?.quote?.[2]?.highlighted && (
                          <>
                            {data?.quote?.[2]?.text
                              ?.split("\n")
                              ?.filter((line) => line.trim() !== "") // remove empty lines
                              ?.map((line, i) => (
                                <div key={i}>
                                  {line.includes(
                                    data?.quote?.[2]?.highlighted
                                  ) ? (
                                    <>
                                      {
                                        line.split(
                                          data?.quote?.[2]?.highlighted
                                        )[0]
                                      }
                                      <span className="text-[#23B14D]">
                                        {data?.quote?.[2]?.highlighted}
                                      </span>
                                      {
                                        line.split(
                                          data?.quote?.[2]?.highlighted
                                        )[1]
                                      }
                                    </>
                                  ) : (
                                    line
                                  )}
                                </div>
                              ))}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Left Side Content */}
          </div>
        </div>

        <div className=" flex justify-end my-8 cursor-pointer">
          <a
            href={data?.cta?.[0]?.href || "#"}
            className="cursor-pointer hover:opacity-80 transition-opacity duration-200"
          >
            <img
              src="/images/our-value-chain/request.png"
              alt={data?.cta?.[0]?.text || "Request a Consultation"}
            />
          </a>
        </div>
        <div className=" flex justify-end my-4 mb-20 cursor-pointer">
          <a
            href={data?.cta?.[1]?.href || "#"}
            className="cursor-pointer hover:opacity-80 transition-opacity duration-200"
          >
            <img
              src="/images/our-value-chain/green.png"
              alt={data?.cta?.[1]?.text || "Green Project Delivery Framework"}
            />
          </a>
        </div>
      </div>
        <Chatbot />
    </React.Fragment>
  );
};

export default OurChainValue;
