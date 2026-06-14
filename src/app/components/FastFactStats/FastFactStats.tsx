"use client";
import React from "react";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";
import { useFastFactStats } from "../../../hooks/useFastFactStats";
import Link from "next/link";
import { handleImageError } from "../lib/utils";

const FastFactStats = () => {
  const { fastFactsSection, impactSummarySection } = useFastFactStats();

  // Fallback data matching current static content
  const fallbackData = {
    title: "FAST FACTS & STATS",
    subtitle: "Where We Prove What's Possible",
    description: "In the world's most challenging terrain, GREEN delivered measurable transformation. Not theory. Not potential. Execution.",
    blocks: [
      {
        icon: { src: "/images/facts/energy.png", alt: "energy" },
        title: "Energy Delivered",
        content: {
          data: {
            MW_deployed: "3.91 MW",
            Homes_electrified: "200,014",
            Schools: 526,
            Health_posts: 28,
            Modular_systems_installed: "280+"
          }
        }
      },
      {
        icon: { src: "/images/facts/economics.png", alt: "economics" },
        title: "Economies Triggered",
        content: {
          data: {
            SMEs_powered: 3505,
            SME_jobs_created: 7010
          }
        }
      },
      {
        icon: { src: "/images/facts/people.png", alt: "people" },
        title: "People Reached",
        content: {
          data: {
            Lives_touched: 796270
          }
        }
      },
      {
        icon: { src: "/images/facts/fossil.png", alt: "fossil" },
        title: "Fossil Fuels Displaced",
        content: {
          data: {
            Diesel_avoided_litres: 2734979,
            CO2_cut_tonnes: 6126
          }
        }
      }
    ],
    impactCards: [
      { title: "200,014", subtitle: "Rural Homes Energized", details: "GREEN SunShine, Em'Pawa, SunShine Scale-Up" },
      { title: "223", subtitle: "Green Jobs Created", details: "Local Technicians, Trades & SME Jobs" },
      { title: "796,270", subtitle: "People Positively Affected", details: "Healthcare, Hospitals, Schools, Connectivity, Household Solar Expansion" },
      { title: "6,126", subtitle: "Tonnes Annually Emissions Avoided", details: "Hybrid Solar and Storage Deployment" }
    ]
  };

  // Use API data if available, otherwise use fallback
  const sectionData = fastFactsSection || fallbackData;
  const impactData = impactSummarySection || { cards: fallbackData.impactCards };
  const ctaButtons= impactSummarySection?.cta
  const quote=  impactSummarySection?.quote

  if (!sectionData) {
    return null;
  }

  return (
    <React.Fragment>
      <div className="relative overflow-x-hidden">
        <TopNavigation />

        {/* Right-side diagonal background watermark (desktop) */}
        <div className="absolute right-0 top-0 -z-10 hidden lg:block pointer-events-none">
          <img
            src="/images/facts/lgImage.png"
            alt=""
            role="presentation"
            className="h-screen object-contain"
          />
        </div>
        {/* Background watermark (mobile / tablet) */}
        <div className="absolute right-0 top-0 -z-10 lg:hidden pointer-events-none">
          <img
            src="/images/facts/fast-facts-stats-mbImg.png"
            alt=""
            role="presentation"
            className="w-2/3 object-contain opacity-60"
          />
        </div>

        <div className=" absolute z-[9999] left-4 top-40 md:top-30  md:right-4 md:hidden">
          <img
            src="/images/facts/fast-facts-stats.png"
            alt="Fast Facts Stats"
            className="w-8"
          />
        </div>

        <div className="flex h-full overflow-x-hidden">
          <div className="lg:w-1/6  flex items-center justify-center">
            <div className=" fixed z-50 lg:top-1/3">
              <img
                src="/images/facts/fast-facts-stats.png"
                alt="Fast Facts Stats"
                className="w-10"
              />
            </div>
          </div>

          <div className="w-full lg:pl-16 mt-10 2xl:pl-10 flex flex-col  rounded-lg">
            <div className="mb-8 px-4 lg:px-0 py-10 lg:py-0 lg:flex lg:items-start lg:space-x-10">
              <div>
                <h1 className=" text-3xl lg:text-3xl 2xl:text-4xl lg:text-left text-center font-black mb-4">
                  {
                    sectionData.title.split(" " )[0]
                  }{` `}
                   <span className="text-[#23B14D]">
                    {sectionData.title.split(" " )[1]}
                   </span>
                  <br /><span className="text-gray-800">
                    {sectionData.title.split(" ").slice(2).join(" ")}
                  </span>
                </h1>
              </div>
              <div className="mb-6">
                <h2 className="md:text-xl lg:text-xl lg:text-left md:text-center  2xl:text-2xl font-bold text-gray-800 mb-2">
                  {sectionData.subtitle || "Where We Prove What's Possible"}
                </h2>
                <p className="text-[#23B14D] lg:block hidden 2xl:text-lg italic">
                  — {sectionData.description || "In the world's most challenging terrain, GREEN delivered measurable transformation. Not theory. Not potential. Execution."}
                </p>
              </div>
            </div>

            <div className="lg:flex gap-10 px-4 lg:px-0">
              <div className="space-y-8 w-full min-w-0">
                <div className="hidden lg:grid  lg:grid-cols-2 gap-8">
                  {sectionData.blocks?.slice(0, 2).map((block, index) => (
                    <div key={index} className="flex space-x-4 ">
                      <div className=" mb-3">
                        <img
                          src={block.icon.src}
                          alt={block.icon.alt || block.title}
                          className="w-16"
                          onError={(e) => handleImageError(e, "/images/facts/energy.png")}
                        />
                      </div>
                      <div>
                        <h3 className="lg:text-xl 2xl:text-2xl font-bold text-gray-800">
                          {block.title}
                        </h3>
                        <div className="space-y-1 lg:text-base 2xl:text-lg mt-2 font-semibold">
                          {block.title === "Energy Delivered" && (
                            <>
                              <p>
                                <span className="text-[#23B14D] font-black lg:text-base 2xl:text-lg">
                                  {block.content.data.MW_deployed}
                                </span>{" "}
                                deployed.
                              </p>
                              <p>
                                <span className="text-[#23B14D] font-black lg:text-base 2xl:text-lg">
                                  {block.content.data.Homes_electrified}
                                </span>{" "}
                                Homes electrified.
                              </p>
                              <p>
                                <span className="text-[#23B14D] font-black lg:text-base 2xl:text-lg">
                                  {block.content.data.Schools}
                                </span>{" "}
                                Schools.{" "}
                                <span className="text-[#23B14D] font-black lg:text-base 2xl:text-lg">
                                  {block.content.data.Health_posts}
                                </span>{" "}
                                Health posts.
                              </p>
                              <p>{block.content.data.Modular_systems_installed} modular systems installed.</p>
                            </>
                          )}
                          {block.title === "Economies Triggered" && (
                            <>
                              <p>
                                <span className="text-[#23B14D] font-black lg:text-base 2xl:text-lg">
                                  {block.content.data.SMEs_powered?.toLocaleString()}
                                </span>{" "}
                                SME / microbusinesses now powered..
                              </p>
                              <p>
                                <span className="text-[#23B14D] font-black lg:text-base 2xl:text-lg">
                                  {block.content.data.SME_jobs_created?.toLocaleString()}
                                </span>{" "}
                                SME jobs created in remote provinces.
                              </p>
                              <p>New service economies built on energy access.</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="hidden lg:grid  lg:grid-cols-2 gap-8">
                  {sectionData.blocks?.slice(2, 4).map((block, index) => (
                    <div key={index + 2} className="flex space-x-4 ">
                      <div className=" mb-3">
                        <img
                          src={block.icon.src}
                          alt={block.icon.alt || block.title}
                          className="w-16"
                          onError={(e) => handleImageError(e, "/images/facts/energy.png")}
                        />
                      </div>
                      <div>
                        <h3 className="lg:text-xl 2xl:text-2xl font-bold text-gray-800">
                          {block.title}
                        </h3>
                        <div className="space-y-1 lg:text-base 2xl:text-lg mt-2 font-semibold">
                          {block.title === "People Reached" && (
                            <>
                              <p>
                                <span className="text-[#23B14D] font-black lg:text-base 2xl:text-lg">
                                  {block.content.data.Lives_touched?.toLocaleString()}
                                </span>{" "}
                                lives touched.
                              </p>
                              <p>Study hours extended.</p>
                              <p>Medical care stabilized.</p>
                              <p>Connectivity where none existed.</p>
                            </>
                          )}
                          {block.title === "Fossil Fuels Displaced" && (
                            <>
                              <p>
                                <span className="text-[#23B14D] font-black lg:text-base 2xl:text-lg">
                                  {block.content.data.Diesel_avoided_litres?.toLocaleString()}
                                </span>{" "}
                                Litres of diesel avoided each year.
                              </p>
                              <p>
                                <span className="text-[#23B14D] font-black lg:text-base 2xl:text-lg">
                                  {block.content.data.CO2_cut_tonnes?.toLocaleString()}
                                </span>{" "}
                                Tonnes of CO₂ cut.
                              </p>
                              <p>Clean energy adoption rising across regions</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="lg:hidden flex lg:w-1/3  md:items-center items-end pl-8  flex-col ">
                  <div
                  style={{
                    transform:"skewX(-12deg)"
                  }}
                  className="  text-center mb-8 bg-[#e6f7bc]/70 shadow-lg md:p-8 p-2 md:w-auto w-[60%]  ">
                    <div
                      style={{ transform: "skewX(12deg)" }}
                      className=" font-bold mb-2 md:text-3xl"
                    >
                      {
                        quote?.headline.split(" " )[0]
                      }
                       <span className="text-[#23B14D]">
                        {quote?.headline.split(" " )[1]}
                       </span>
                      <p className="mt-2">
                        {quote?.headline.split(" ").slice(2).join(" ")}
                      </p>
                    </div>
                  </div>

                  <div className="text-center lg:mb-8">
                    <p className="text-lg md:text-2xl italic font-bold text-gray-800 mb-2">
                      {
                        quote?.description.split("." )[0]
                      }
                    </p>
                    <p className="text-lg md:text-2xl italic font-bold text-gray-800 mb-2">
                      {quote?.description.split("." ).slice(1).join(" ")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:flex hidden lg:w-1/3  pl-8  flex-col ">
                <div
                style={{
                  transform:"skewX(-12deg)"
                }}
                className="text-center mb-8 bg-[#e6f7bc]/70 p-4 py-6  shadow-lg  w-96">
                  <div
                    style={{ transform: "skewX(12deg)" }}
                    className="text-4xl font-bold mb-2"
                  >
                     {
                        quote?.headline.split(" " )[0]
                      } <span className="text-[#23B14D]">  {quote?.headline.split(" " )[1]}</span>
                    <p className="mt-2">{quote?.headline.split(" ").slice(2).join(" ")}</p>
                  </div>
                </div>

                <div className="text-center mb-8">
                  <p className="text-2xl italic font-bold text-gray-800 mb-2">
                    {
                      quote?.description.split("." )[0]
                    }
                  </p>
                  <p className="text-2xl italic font-bold text-green-600 mb-2">
                    {quote?.description.split("." )[1]}
                  </p>
                 
                </div>
              </div>
              <div className="p-4 lg:hidden">
                <p className="text-xl md:flex md:justify-end lg:block justify-start text-[#23B14D] italic">
                  — structured, scalable,
                  <br />
                  and underway.
                </p>
                <div className=" text-[#23B14D] my-4 text-lg text-right flex justify-end italic">
                  –In the world’s most challenging terrain, GREEN Delivered
                  measurable transformation. Not theory. Not potential.
                  Execution.
                </div>
              </div>
              <div className="grid px-4 lg:hidden lg:grid-cols-2 gap-8">
                {sectionData.blocks?.slice(0, 2).map((block, index) => (
                  <div key={index} className="flex flex-col lg:flex-row lg:items-start lg:text-left items-center text-center  ">
                    <div className={index === 0 ? " mb-6" : " mb-3"}>
                      <img
                        src={block.icon.src}
                        alt={block.icon.alt || block.title}
                        className={index === 0 ? "w-16" : "w-14"}
                        onError={(e) => handleImageError(e, "/images/facts/energy.png")}
                      />
                    </div>
                    <div className={index === 0 ? "" : ""}>
                      <h3 className="mb-4 lg:my-0 text-xl lg:text-2xl font-bold text-gray-800">
                        {block.title}
                      </h3>
                      <div className="space-y-1 lg:text-base 2xl:text-lg mt-2 font-semibold">
                        {block.title === "Energy Delivered" && (
                          <>
                            <p>
                              <span className="text-[#23B14D] font-black lg:text-base 2xl:text-lg">
                                {block.content.data.MW_deployed}
                              </span>{" "}
                              deployed.
                            </p>
                            <p>
                              <span className="text-[#23B14D] font-black lg:text-base 2xl:text-lg">
                                {block.content.data.Homes_electrified}
                              </span>{" "}
                              Homes electrified.
                            </p>
                            <p>
                              <span className="text-[#23B14D] font-black lg:text-base 2xl:text-lg">
                                {block.content.data.Schools}
                              </span>{" "}
                              Schools.{" "}
                              <span className="text-[#23B14D] font-black lg:text-base 2xl:text-lg">
                                {block.content.data.Health_posts}
                              </span>{" "}
                              Health posts.
                            </p>
                            <p>{block.content.data.Modular_systems_installed} modular systems installed.</p>
                          </>
                        )}
                        {block.title === "Economies Triggered" && (
                          <>
                            <p>
                              <span className="text-[#23B14D] font-black lg:text-base 2xl:text-lg">
                                {block.content.data.SMEs_powered?.toLocaleString()}
                              </span>{" "}
                              SME / microbusinesses now powered..
                            </p>
                            <p>
                              <span className="text-[#23B14D] font-black lg:text-base 2xl:text-lg">
                                {block.content.data.SME_jobs_created?.toLocaleString()}
                              </span>{" "}
                              SME jobs created in remote provinces.
                            </p>
                            <p>New service economies built on energy access.</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid lg:hidden p-4 my-4  lg:grid-cols-2 gap-8">
                {sectionData.blocks?.slice(2, 4).map((block, index) => (
                  <div key={index + 2} className="flex flex-col lg:flex-row lg:items-start lg:text-left items-center text-center  ">
                    <div className=" mb-3">
                      <img
                        src={block.icon.src}
                        alt={block.icon.alt || block.title}
                        className="w-14"
                        onError={(e) => handleImageError(e, "/images/facts/energy.png")}
                      />
                    </div>
                    <div>
                      <h3 className="mb-4 lg:my-0 text-xl lg:text-2xl font-bold text-gray-800">
                        {block.title}
                      </h3>
                      <div className="space-y-1 lg:text-base 2xl:text-lg mt-2 font-semibold">
                        {block.title === "People Reached" && (
                          <>
                            <p>
                              <span className="text-[#23B14D] font-black lg:text-base 2xl:text-lg">
                                {block.content.data.Lives_touched?.toLocaleString()}
                              </span>{" "}
                              lives touched.
                            </p>
                            <p>Study hours extended.</p>
                            <p>Medical care stabilized.</p>
                            <p>Connectivity where none existed.</p>
                          </>
                        )}
                        {block.title === "Fossil Fuels Displaced" && (
                          <>
                            <p>
                              <span className="text-[#23B14D] font-black lg:text-base 2xl:text-lg">
                                {block.content.data.Diesel_avoided_litres?.toLocaleString()}
                              </span>{" "}
                              Litres of diesel avoided each year.
                            </p>
                            <p>
                              <span className="text-[#23B14D] font-black lg:text-base 2xl:text-lg">
                                {block.content.data.CO2_cut_tonnes?.toLocaleString()}
                              </span>{" "}
                              Tonnes of CO₂ cut.
                            </p>
                            <p>Clean energy adoption rising across regions</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="lg:my-4 mb-32 gap-8 lg:gap-4 flex-col lg:flex-row space-y-8 lg:space-y-0 overflow-hidden flex lg:justify-between px-4 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 text-center">
            {impactData.cards?.map((card, index) => (
              <div
               style={{
                transform:"skewX(-16deg)"
               }}
              key={index} className=" border-[#bcea7e] py-4 2xl:py-10 px-2 border-4 ">
                <div style={{ transform: "skewX(16deg)" }} className="px-2">
                <p className={`${index === 1 ? 'text-xl lg:text-3xl' : index === 3 ? 'lg:text-2xl 2xl:text-3xl' : ' lg:text-xl 2xl:text-3xl'} ${index === 1 ? 'mb-1' : index === 3 ? 'leading-6' : 'mb-2'} font-black text-gray-800`}>
                  {card.title}
                </p>
                <p className={`${index === 1 ? 'text-lg lg:text-2xl' : index === 2 ? ' lg:text-xl mt-1' : ' lg:text-base 2xl:text-xl'} font-semibold`}>
                  {index === 3 && <span className="text-sm mb-2 ">tonnes annually</span>}
                  {index === 3 && <br />}
                  {index === 3 ? (
                    <span className="2xl:-ml-10">{card.subtitle.replace('Tonnes Annually ', '')}</span>
                  ) : (
                    card.subtitle.split(' ').map((word, wordIndex, words) => (
                      <span key={wordIndex}>
                        {word}
                        {wordIndex === Math.floor(words.length / 2) - 1 && <br />}
                        {wordIndex !== words.length - 1 && wordIndex !== Math.floor(words.length / 2) - 1 && ' '}
                      </span>
                    ))
                  )}
                </p>
                <p className={`text-sm text-[#23B14D] ${index === 3 ? 'mt-6' : 'mt-1'}`}>
                  {card.details.split(',').map((detail, detailIndex) => (
                    <span key={detailIndex}>
                      {detail.trim()}
                      {detailIndex < card.details.split(',').length - 1 && <br />}
                    </span>
                  ))}
                </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center lg:items-end gap-8 lg:mr-10 shrink-0">
            <Link
              href={ctaButtons?.[0]?.link || "#"}
              className="relative inline-block cursor-pointer"
            >
              <img
                src="/images/facts/connectwithgreen.png"
                alt="Connect with Green"
                className="w-64 sm:w-72 lg:w-auto"
              />
              <div className="absolute inset-0 flex items-center justify-center px-6 text-base lg:text-lg font-bold whitespace-nowrap">
                {ctaButtons?.[0]?.text || "Connect with GREEN"} {` >`}
              </div>
            </Link>
            <Link
              href={ctaButtons?.[1]?.link || "#"}
              className="relative inline-block cursor-pointer"
            >
              <img
                src="/images/facts/downloadimpactsummary.png"
                alt="Download Impact Summary"
                className="w-64 sm:w-72 lg:w-auto"
              />
              <div className="absolute inset-0 flex items-center justify-center px-6 text-base lg:text-lg font-bold whitespace-nowrap">
                {ctaButtons?.[1]?.text || "Download Impact Summary"} {` >`}
              </div>
            </Link>
           
          </div>
        </div>

        <Chatbot />
      </div>
    </React.Fragment>
  );
};

export default FastFactStats;
