"use client";

import React, { useState } from "react";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";
import { useEnergyServices } from "../../../hooks/useEnergyServices";
import Enquiry from "./Modals/Enquiry";

const Services = () => {
  const { energyData } = useEnergyServices();
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  // Transform API data to match component structure
  const transformedData = energyData
    ? [
        {
          title: energyData.service1.title,
          description: (
            <div className="text-gray-600 mb-4 leading-relaxed flex flex-col space-y-2">
              <div
                dangerouslySetInnerHTML={{
                  __html: energyData.service1.description,
                }}
              />
            </div>
          ),
          active: activeServiceIndex === 0,
          service: energyData.service1.shortDescription,
        },
        {
          title: energyData.service2.title,
          description: (
            <div className="text-gray-600 mb-4 leading-relaxed flex flex-col space-y-2">
              <div
                dangerouslySetInnerHTML={{
                  __html: energyData.service2.description,
                }}
              />
            </div>
          ),
          active: activeServiceIndex === 1,
          service: energyData.service2.shortDescription,
        },
        {
          title: energyData.service3.title,
          description: (
            <div className="text-gray-600 mb-4 leading-relaxed flex flex-col space-y-2">
              <div
                dangerouslySetInnerHTML={{
                  __html: energyData.service3.description,
                }}
              />
            </div>
          ),
          active: activeServiceIndex === 2,
          service: energyData.service3.shortDescription,
        },
        {
          title: energyData.service4.title,
          description: (
            <div className="text-gray-600 mb-4 leading-relaxed flex flex-col space-y-2">
              <div
                dangerouslySetInnerHTML={{
                  __html: energyData.service4.description,
                }}
              />
            </div>
          ),
          active: activeServiceIndex === 3,
          service: energyData.service4.shortDescription,
        },
      ]
    : [];

  const data = transformedData;
  const handleServiceClick = (index: number) => {
    setActiveServiceIndex(index);
  };

  // Transform API data for points section
  const points = energyData
    ? [
        {
          id: 1,
          name: "ENGINEERING",
          items: energyData.service1.keys.map((key: any) => key.text),
        },
        {
          id: 2,
          name: "PROCUREMENT",
          items: energyData.service2.keys.map((key: any) => key.text),
        },
        {
          id: 3,
          name: "CONSTRUCTION",
          items: energyData.service3.keys.map((key: any) => key.text),
        },
        {
          id: 4,
          name: "MANAGEMENT",
          items: energyData.service4.keys.map((key: any) => key.text),
        },
      ]
    : [];

  if (!energyData) {
    return null;
  }

  return (
    <React.Fragment>
      <TopNavigation />
      <div className="absolute lg:block  -z-10 top-0 hidden   lg:left-0">
        <img loading="lazy" decoding="async"
          src="/images/service/lgImg.png"
          className="w-8/12 lg:h-[150vh]  "
          alt="mainBg"
        />
      </div>
      <div className="absolute   -z-10 top-0 lg:hidden   right-0">
        <img loading="lazy" decoding="async"
          src="/images/service/mbImg.png"
          className="w-full   "
          alt="mainBg"
        />
      </div>
      <div className="mt-8  p-8 lg:pl-32">
        <div className="lg:flex lg:min-h-[65vh]  relative">
          <div className="flex flex-col    justify-center">
            {/* Desktop layout */}
            <div className="hidden lg:flex mb-8">
              {points.map((item, index) => {
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-center"
                  >
                    <div
                      style={{
                        transform: "skewX(-16deg)",
                      }}
                      className="p-[8px] w-[120px] xl:w-[155px] overflow-hidden h-[150px] xl:h-[164px] border-4 border-[#d9e74b] bg-white"
                    >
                      <div className="p-1 pl-4">
                        <h4
                          style={{
                            transform: "skewX(16deg)",
                          }}
                          className=" text-[#23B14D] mb-2 font-bold text-xs xl:text-sm"
                        >
                          {item.name}
                        </h4>
                        <ul className="font-bold text-[11px] xl:text-xs text-gray-700 space-y-1">
                          {item.items.map((listItem: string, index: number) => {
                            return <li key={index}>{listItem}</li>;
                          })}
                        </ul>
                      </div>
                    </div>

                    {index != 3 && (
                      <div className="-ml-6">
                        <img loading="lazy" decoding="async"
                          className="w-8 xl:w-10"
                          src="/images/service/arrow.png"
                          alt="arrow"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile 2x2 grid layout */}
            <div className="lg:hidden mb-8">
              <div className="grid grid-cols-2 gap-4 sm:gap-6 relative justify-items-center">
                {/* Top row: Engineering -> Procurement */}
                <div className="flex justify-center relative">
                  <div
                   style={{
                            transform: "skewX(-16deg)",
                          }}
                  className="p-[8px] w-full max-w-[140px] overflow-hidden  border-4 border-[#d9e74b] bg-white">
                    <div className="p-1 pl-4">
                      <h4
                       style={{
                            transform: "skewX(16deg)",
                          }}
                      className=" text-[#23B14D] mb-2 font-bold text-xs">
                        {points[0]?.name}
                      </h4>
                      <ul className="font-bold text-xs text-gray-700 space-y-1">
                        {points[0]?.items.map(
                          (listItem: string, index: number) => {
                            return <li key={index}>{listItem}</li>;
                          }
                        )}
                      </ul>
                    </div>
                  </div>
                  {/* Right arrow */}
                  <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 z-10">
                    <img loading="lazy" decoding="async"
                      className="w-6"
                      src="/images/service/arrow.png"
                      alt="arrow"
                    />
                  </div>
                </div>

                <div className="flex justify-center relative">
                  <div
                   style={{
                            transform: "skewX(-16deg)",
                          }}
                  className="p-[8px] w-full max-w-[140px] overflow-hidden  border-4 border-[#d9e74b] bg-white">
                    <div className="p-1 pl-4">
                      <h4
                       style={{
                            transform: "skewX(16deg)",
                          }}
                      className=" text-[#23B14D] mb-2 font-bold text-xs">
                        {points[1]?.name}
                      </h4>
                      <ul className="font-bold text-xs text-gray-700 space-y-1">
                        {points[1]?.items.map(
                          (listItem: string, index: number) => {
                            return <li key={index}>{listItem}</li>;
                          }
                        )}
                      </ul>
                    </div>
                  </div>
                  {/* Down arrow */}
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 z-10">
                    <img loading="lazy" decoding="async"
                      className="w-6 rotate-90"
                      src="/images/service/arrow.png"
                      alt="arrow"
                    />
                  </div>
                </div>

                {/* Bottom row: Management <- Construction */}
                <div className="flex justify-center relative">
                  <div
                   style={{
                            transform: "skewX(-16deg)",
                          }}
                  className="p-[8px] w-full max-w-[140px] overflow-hidden  border-4 border-[#d9e74b] bg-white">
                    <div className="p-1 pl-4">
                      <h4
                       style={{
                            transform: "skewX(16deg)",
                          }}
                      className=" text-[#23B14D] mb-2 font-bold text-xs">
                        {points[3]?.name}
                      </h4>
                      <ul className="font-bold text-xs text-gray-700 space-y-1">
                        {points[3]?.items.map(
                          (listItem: string, index: number) => {
                            return <li key={index}>{listItem}</li>;
                          }
                        )}
                      </ul>
                    </div>
                  </div>
                  {/* Left arrow */}
                  <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 z-10">
                    <img loading="lazy" decoding="async"
                      className="w-6 rotate-180"
                      src="/images/service/arrow.png"
                      alt="arrow"
                    />
                  </div>
                </div>

                <div className="flex justify-center">
                  <div
                  style={{
                    transform:"skewX(-16deg)"
                  }}
                  className="p-[8px] w-full max-w-[140px] overflow-hidden  border-4 border-[#d9e74b] bg-white">
                    <div className="p-1 pl-4">
                      <h4
                      style={{
                        transform:"skewX(16deg)"
                      }}
                      className=" text-[#23B14D] mb-2 font-bold text-xs">
                        {points[2]?.name}
                      </h4>
                      <ul className="font-bold text-xs text-gray-700 space-y-1">
                        {points[2]?.items.map(
                          (listItem: string, index: number) => {
                            return <li key={index}>{listItem}</li>;
                          }
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:block fixed top-20 lg:top-1/3 left-4 ">
            <img loading="lazy" decoding="async"
              src="/images/service/services.svg"
              alt="Services"
              className=" w-5 lg:w-14 object-contain"
            />
          </div>
          <div className=" flex flex-col items-end w-full  lg:hidden">
            <h3 className="text-3xl font-bold text-gray-800 mb-2">
              {energyData?.headline || "EPCM"}
            </h3>
            <p className="text-[#23B14D] pt-2 lg:text-xl text-right 2xl:text-2xl font-semibold">
              {energyData?.subheadline ||
                "INTEGRATED RENEWABLE ENERGY TRANSFORMATION"}
            </p>
          </div>
          <div className=" flex flex-col justify-center  max-w-[450px]  ml-auto">
            <div className="flex lg:block space-x-4 justify-between lg:mb-0 mb-8">
              <h1 className=" text-gray-800 text-2xl lg:text-3xl  mb-4 font-black">
                {data.find((item) => item.active)?.title}
              </h1>
              <div
              style={{
                transform:"skewX(-16deg)"
              }}
              className="border-2 lg:hidden p-2 font-bold text-gray-400 flex space-x-4 border-lime-300 ">
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    handleServiceClick(
                      activeServiceIndex === 0
                        ? data.length - 1
                        : activeServiceIndex - 1
                    );
                  }}
                >
                  {`<`}
                </div>
                <div>
                  {(() => {
                    const len = data?.length ?? 0;
                    if (!len) return null;
                    const activeIndex = data.findIndex((item) => item.active);
                    const nextIndex =
                      activeIndex === -1 ? 0 : (activeIndex + 1) % len;
                    return data[nextIndex]?.title ?? null;
                  })()}
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    handleServiceClick((activeServiceIndex + 1) % data.length);
                  }}
                >
                  {`>`}
                </div>
              </div>
            </div>
            <div className="">
              {(() => {
                const key = `service${activeServiceIndex + 1}`;
                const raw =
                  ((energyData as any)?.[key]?.description as string) || "";
                const plain = raw
                  .replace(/<[^>]*>/g, " ")
                  .replace(/\s+/g, " ")
                  .trim();
                const sentences = plain
                  .split(".")
                  .map((s) => s.trim())
                  .filter(Boolean);

                return (
                  <div className="text-gray-600 mb-4 leading-relaxed flex flex-col space-y-4">
                    {sentences.map((s, idx) => (
                      <p key={idx}>{s}.</p>
                    ))}
                  </div>
                );
              })()}
            </div>

            <div
              className={`  ${data[0].active ? "" : ""} ${
                data[1].active ? "" : ""
              } ${data[2].active ? " " : ""} ${data[3].active ? "" : ""}`}
            ></div>
          </div>
        </div>
        <div className="lg:flex  space-x-20">
          <div className="lg:block hidden">
            <h3 className="text-3xl font-bold text-gray-800 mb-2">
              {energyData?.headline || "EPCM"}
            </h3>
            <p className="text-[#23B14D] pt-2 lg:text-xl 2xl:text-2xl font-semibold">
              {energyData?.subheadline ||
                "INTEGRATED RENEWABLE ENERGY TRANSFORMATION"}
            </p>
          </div>
          <div className=" lg:relative lg:block hidden  ">
            <div
             style={{
              transform:"skewX(-16deg)"
             }}
            className="p-6  bg-[#f8f9d9]   shadow-xl lg:h-[350px]  lg:w-[300px]  to-[#FFFE30] transform  relative">
              <div className="absolute inset-0 pointer-events-none">
                {/* <div className="absolute rotate-90 top-72 -left-42   w-[388px] h-1 bg-white" /> */}
              </div>

              <h3 className="lg:text-xl 2xl:text-2xl mt-2 font-bold text-gray-800 mb-6 relative z-10">
                OUR SERVICES
              </h3>
              <div className="space-y-4 relative z-10">
                {data.map((service, index) => (
                  <div
                    key={index}
                    className={`pl-4 ${
                      service.active ? "border-l-4 border-[#23B14D]" : ""
                    } cursor-pointer`}
                    onClick={() => handleServiceClick(index)}
                  >
                    <h4
                      className={`${
                        index === 0
                          ? "text-[#23B14D] lg:text-lg 2xl:text-xl font-bold mb-2"
                          : "text-gray-700 font-semibold"
                      } ${index === 2 ? "2xl:text-lg" : ""}`}
                    >
                      {service.title}
                    </h4>
                    {service.active && (
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {service.service}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex  justify-end mb-20">
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => setIsEnquiryOpen(true)}
          >
            <img loading="lazy" decoding="async"
              src="/images/service/enquiry.svg"
              alt={energyData?.cta?.text || "Enquiry"}
              className=""
            />
          </button>
        </div>

        <Enquiry
          isOpen={isEnquiryOpen}
          onClose={() => setIsEnquiryOpen(false)}
          services={points.map((p) => p.name)}
          defaultService={points[activeServiceIndex]?.name}
        />

        <Chatbot />
      </div>
    </React.Fragment>
  );
};

export default Services;
