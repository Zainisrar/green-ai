"use client";
import React, { useEffect, useState } from "react";
import Chatbot from "../Chatbot";
import TopNavigation from "../TopNavigation/TopNavigation";
import { useCommunityImpactLoop } from "../../../hooks/useCommunityImpactLoop";
import Link from "next/link";

const CommunityImpactLoop = () => {
  const { data, isLoading, error } = useCommunityImpactLoop();
  const main = data?.mainPage;
  const gcil = data?.greenCommunityImpactLoop;
  const loop = data?.howLoopWorks;
  const measured = data?.measuredImpact;
  const join = data?.joinTheLoop;
  const [active, setActive] = useState<{
    activeIndex: number;
    data: React.JSX.Element;
  }>({
    activeIndex: 0,
    data: (
      <div className=" ">
        {/* Impact Description Box */}
        <div className="mb-8">
          <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4">
            {"What is the GREEN Community Impact Loop?"}
          </h3>

          <p className="text-gray-900 font-semibold mb-4">
            It's our model to maximize every watt we deploy.
          </p>

          <p className="text-gray-900 font-semibold">
            We engineer systems that don't just produce power
            <br />— they spark progress
          </p>
        </div>

        {/* Impact Flow Grid */}
        <div className="grid grid-cols-2 gap-0 mb-8">
          <div className="flex items-center space-x-2">
            <span>
              <img
                src="/images/grid-intel/lighting.png"
                className="w-14 "
                alt="lighting"
              />
            </span>
            <span className="text-sm font-semibold text-gray-800">
              Clean Energy
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span>
              <img
                src="/images/grid-intel/lighting.png"
                className="w-14 "
                alt="lighting"
              />
            </span>
            <span className="text-sm font-semibold text-gray-800">
              Fuels Demand
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span>
              <img
                src="/images/grid-intel/lighting.png"
                className="w-14 "
                alt="lighting"
              />
            </span>
            <span className="text-sm font-semibold text-gray-800">
              Enables Activity
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span>
              <img
                src="/images/grid-intel/lighting.png"
                className="w-14 "
                alt="lighting"
              />
            </span>
            <span className="text-sm font-semibold text-gray-800">
              Sustains Systems
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span>
              <img
                src="/images/grid-intel/lighting.png"
                className="w-14 "
                alt="lighting"
              />
            </span>
            <span className="text-sm font-semibold text-gray-800">
              Builds Income
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span>
              <img
                src="/images/grid-intel/lighting.png"
                className="w-14 "
                alt="lighting"
              />
            </span>
            <span className="text-sm font-semibold text-gray-800">
              Uplifts Communities.
            </span>
          </div>
        </div>
      </div>
    ),
  });
  const handleActive = (index: number) => {
    setActive((prev) => ({ ...prev, activeIndex: index }));
  };
  const handleData = (index: number) => {
    switch (index) {
      case 0:
        return (
          <div className=" ">
            {/* Impact Description Box */}
            <div className="mb-8">
              <h3 className=" text-xl lg:text-2xl font-bold text-gray-800 mb-4">
                {gcil?.title ?? "What is the GREEN Community Impact Loop?"}
              </h3>
              {gcil?.description?.text1 ? (
                <div className="text-gray-900 font-semibold mb-4 whitespace-pre-line">
                  {gcil.description.text1}
                </div>
              ) : (
                <p className="text-gray-900 font-semibold mb-4">
                  It's our model to maximize every watt we deploy.
                </p>
              )}
           
            </div>

            {/* Impact Flow Grid */}
            <div className="grid grid-cols-2 gap-0 mb-8">
              {(
                gcil?.keys ?? [
                  "Clean energy",
                  "fuels demand",
                  "enables activity",
                  "sustains systems",
                  "builds income",
                  "uplifts communities.",
                ]
              ).map((k, idx) => (
                <div key={idx} className="flex  items-center space-x-2">
                  <span>
                    <img
                      src="/images/grid-intel/lighting.png"
                      className="w-14 "
                      alt="lighting"
                    />
                  </span>
                  <span className="text-sm font-semibold text-gray-800">
                    {k.charAt(0).toUpperCase() + k.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 1:
        return (
          <div>
            <h3 className=" text-xl lg:text-2xl font-bold text-gray-800 mb-2">
              {loop?.title ?? "How the Loop Works"}
            </h3>
            {(
              loop?.items ?? [
                {
                  title: "ACCESS",
                  description:
                    "We deploy off-grid or hybrid power systems where the grid can’t reach — schools, clinics, economic centers, remote villages.",
                },
                {
                  title: "ENABLEMENT",
                  description:
                    "Electricity powers cold chains, communication, classrooms, clinics, and commerce — opening doors for better outcomes.",
                },
                {
                  title: "LOCAL ECONOMY",
                  description:
                    "We prioritize local labor, training, and enterprise opportunities tied to our systems — from installation to productive use.",
                },
                {
                  title: "CONTINUITY",
                  description:
                    "With GRID-INTEL™, our systems are monitored remotely and maintained locally — ensuring continuous uptime.",
                },
                {
                  title: "REINVESTMENT",
                  description:
                    "Sustainable O&M models, micro-tariffs, donor support, and community contribution feed back into system longevity and growth.",
                },
              ]
            ).map((item, idx) => {
              const offsets = ["", "lg:-ml-4", "lg:-ml-16", "lg:-ml-24", "lg:-ml-32"];
              const ml = offsets[idx] ?? "";
              return (
                <div key={idx} className={`${ml} space-y-4 flex flex-col my-4`}>
                  <div className="flex flex-col space-y-2">
                    <div className=" text-[#23B14D] font-bold">
                      {item.title}
                    </div>
                    <div className="-ml-2 text-gray-700 font-semibold">
                      {item.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
        break;

      case 2:
        return (
          <div>
            <h3 className=" text-xl lg:text-2xl font-bold text-gray-800 mb-6">
              {measured?.title ?? "Measured Impact"}
            </h3>

            {/* Impact Table */}
            <div className="overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-lg font-bold text-[#23B14D]">
                      Impact Area
                    </th>
                    <th className="px-4 py-3 text-left text-lg font-bold text-[#23B14D]">
                      Metrics Tracked
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(
                    measured?.items ?? [
                      {
                        title: "Energy Access",
                        description: "Households/Institutions electrified",
                      },
                      {
                        title: "Education",
                        description: "Student hours gained via lighting & tech",
                      },
                      {
                        title: "Health",
                        description: "Clinics powered, vaccines preserved",
                      },
                      {
                        title: "Livelihoods",
                        description: "Micro-enterprises supported",
                      },
                      {
                        title: "Environment",
                        description:
                          "Diesel displacement, carbon reduction (tCO₂e)",
                      },
                    ]
                  ).map((row, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-3 font-semibold text-gray-800 italic">
                        {row.title}
                      </td>
                      <td className="px-4 py-3 text-gray-700 italic ">
                        {row.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom Note */}
            <div className="mt-6 pt-4  border-gray-200">
              {measured?.quote ? (
                <p className="text-gray-900 font-bold text-xl">
                  {measured.quote.text
                    .split(measured.quote.highlighted)
                    .map((part, i, arr) => (
                      <React.Fragment key={i}>
                        {part}
                        {i < arr.length - 1 && (
                          <span className="font-bold text-[#23B14D]">
                            {measured.quote.highlighted}
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                </p>
              ) : (
                <p className="text-gray-900  font-bold text-xl">
                  Each <span className="font-bold text-[#23B14D]">GREEN</span>{" "}
                  project includes an embedded
                  <br />
                  <span className="font-bold">Impact Dashboard</span> monitored
                  over time
                </p>
              )}
            </div>
          </div>
        );
        break;

      case 3:
        return (
          <div className="flex flex-col lg:w-96 items-center">
            <h3 className="lg:text-2xl text-xl text-center font-bold text-gray-800 mb-6">
              {join?.title ?? "Join the Loop"}
            </h3>

            {/* Partnership Image */}
            <div className="mb-6">
              <div className="relative">
                <img
                  src={
                    join?.img?.src ??
                    "/images/community-impact-loop/join-the-loop.png"
                  }
                  alt={join?.img?.alt ?? "Partnership Handshake"}
                  className="lg:w-96 "
                />
              </div>
            </div>

            {/* Partnership Message */}
            <div className="space-y-4">
              {join?.quote ? (
                <p className="mx-auto font-black lg:w-9/12 text-gray-800 leading-relaxed">
                  {join.quote.text
                    .split(join.quote.highlighted)
                    .map((part, i, arr) => (
                      <React.Fragment key={i}>
                        {part}
                        {i < arr.length - 1 && (
                          <span className="font-bold text-[#23B14D]">
                            {join.quote.highlighted}
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                </p>
              ) : (
                <p className="mx-auto font-black w-9/12 text-gray-800 leading-relaxed">
                  Want your organization, ministry, or donor program to plug
                  into the{" "}
                  <span className="font-bold text-[#23B14D]">GREEN</span>{" "}
                  Community Impact Loop?
                </p>
              )}
            </div>
          </div>
        );
        break;

      default:
        return null;
    }
  };
  return (
    <React.Fragment>
      <div className="lg:block hidden absolute top-0 left-32">
        <img
          src="/images/community-impact-loop/mainImg.png"
          className="h-[160vh]"
          alt="bg"
        />
      </div>
      <div className="mb-40">
        <TopNavigation />
        <div className="flex h-full ">
          {/* Left Side - GLOBAL SNAPSHOT Text */}
          <div className="w-1/10 flex items-center justify-center">
            <div className="fixed top-1/2 lg:top-1/5 left-4 lg:left-14">
              <img
                src="/images/community-impact-loop/community-impact-loop.png"
                alt="communityimpactloop"
                className=" w-4 lg:w-7"
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="pl-14 lg:pl-24 relative z-20 pr-4 pt-8">
            {/* Main Title */}
            <div className="">
              <div className="mb-8">
                <h1 className=" text-2xl lg:text-3xl font-black text-gray-800 mb-4">
                  {main?.title ? (
                    <>
                      {main.title.includes("Impact") ? (
                        <>
                          {main.title.split("Impact")[0]}
                          <span className="text-[#23B14D]">Impact</span>
                          {main.title.split("Impact")[1] ?? ""}
                        </>
                      ) : (
                        main.title
                      )}
                    </>
                  ) : (
                    <>
                      COMMUNITY <span className="text-[#23B14D]">IMPACT</span>{" "}
                      LOOP
                    </>
                  )}
                </h1>
                <h2 className=" text-xl lg:text-2xl font-bold text-[#23B14D] italic mb-4">
                  {main?.subHeadline ??
                    "From Access to Impact. From Energy to Empowerment."}
                </h2>
                {main?.description ? (
                  <div className="text-gray-600 font-semibold text-lg mb-8 whitespace-pre-line">
                    {main.description}
                  </div>
                ) : (
                  <p className="text-gray-600 font-semibold text-lg mb-8">
                    When GREEN electrifies a region, we don't stop at switching
                    the lights on.
                    <br />
                    We create a loop — where clean energy powers education,
                    health, productivity,
                    <br />
                    and lasting transformation.
                  </p>
                )}
              </div>
     <div className=" flex my-20 lg:hidden p-2   relative ">
                  <div className="absolute -left-14 top-12">
                    <img
                      src="/images/community-impact-loop/shape.png"
                      alt="Technology You Can Trust"
                      className="w-14"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-2">
                      <span className="text-[#23B14D]">Technology</span> You Can
                      Trust.
                    </h3>
                    <h3 className="text-lg lg:text-xl font-bold text-gray-800">
                      Partners Who Deliver.
                    </h3>
                  </div>
                  <div className="-mt-4">
                    <img
                      src="/images/community-impact-loop/shape2.png"
                      alt="Technology You Can Trust"
                      className="w-14"
                    />
                  </div>
                </div>
              {/* Content Layout */}
              <div className="lg:flex space-x-8">
                {/* Left Column - Content List */}
                <div className=" space-y-8">
                  {/* What is the GREEN Community Impact Loop? */}
                  <div
                    className=" cursor-pointer"
                    onClick={() => {
                      handleActive(0);
                      const newData = handleData(0);
                      if (newData) {
                        setActive((prev) => ({ ...prev, data: newData }));
                      }
                    }}
                  >
                    <h3
                      className={`text-lg lg:text-xl font-bold ${
                        active.activeIndex === 0
                          ? "text-[#23B14D]"
                          : "text-gray-800"
                      } mb-2`}
                    >
                      {gcil?.title ??
                        "What is the GREEN Community Impact Loop?"}
                    </h3>
                  </div>

                  {/* How the Loop Works */}
                  <div
                    className=" cursor-pointer"
                    onClick={() => {
                      handleActive(1);
                      const newData = handleData(1);
                      if (newData) {
                        setActive((prev) => ({ ...prev, data: newData }));
                      }
                    }}
                  >
                    <h3
                      className={`text-lg lg:text-xl font-bold ${
                        active.activeIndex === 1
                          ? "text-[#23B14D]"
                          : "text-gray-800"
                      } mb-2`}
                    >
                      {loop?.title ?? "How the Loop Works"}
                    </h3>
                  </div>

                  {/* Measured Impact */}
                  <div
                    className=" cursor-pointer"
                    onClick={() => {
                      handleActive(2);
                      const newData = handleData(2);
                      if (newData) {
                        setActive((prev) => ({ ...prev, data: newData }));
                      }
                    }}
                  >
                    <h3
                      className={`text-lg lg:text-xl font-bold ${
                        active.activeIndex === 2
                          ? "text-[#23B14D]"
                          : "text-gray-800"
                      } mb-2`}
                    >
                      {measured?.title ?? "Measured Impact"}
                    </h3>
                  </div>

                  {/* Join the Loop */}
                  <div
                    className=" cursor-pointer"
                    onClick={() => {
                      handleActive(3);
                      const newData = handleData(3);
                      if (newData) {
                        setActive((prev) => ({ ...prev, data: newData }));
                      }
                    }}
                  >
                    <h3
                      className={`text-lg lg:text-xl font-bold ${
                        active.activeIndex === 3
                          ? "text-[#23B14D]"
                          : "text-gray-800"
                      } mb-2`}
                    >
                      {join?.title ?? "Join the Loop"}
                    </h3>
                  </div>
                </div>

                <div className=" lg:flex hidden p-2   relative ">
                  <div className="absolute -left-14 top-12">
                    <img
                      src="/images/community-impact-loop/shape.png"
                      alt="Technology You Can Trust"
                      className="w-14"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-2">
                      <span className="text-[#23B14D]">Technology</span> You Can
                      Trust.
                    </h3>
                    <h3 className="text-lg lg:text-xl font-bold text-gray-800">
                      Partners Who Deliver.
                    </h3>
                  </div>
                  <div className="-mt-4">
                    <img
                      src="/images/community-impact-loop/shape2.png"
                      alt="Technology You Can Trust"
                      className="w-14"
                    />
                  </div>
                </div>
                <div className={`my-12 lg:my-0`}>{active.data}</div>
              </div>
            </div>

            {/* Bottom Flow Statement */}
            <div className="mt-12  ">
              {main?.quote ? (
                <h3 className="text-xl lg:text-2xl max-w-xl  capitalize leading-9  font-bold text-gray-800">
                  {main.quote.text
                    .split(main.quote.highlighted)
                    .map((part, i, arr) => (
                      <React.Fragment key={i}>
                        {part}
                        {i < arr.length - 1 && (
                          <span className="text-[#23B14D]">
                            {main.quote.highlighted}
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                </h3>
              ) : (
                <h3 className="text-xl lg:text-2xl font-bold text-gray-800">
                  <span className="text-[#23B14D]">Clean Energy</span> → Enables
                  Activity → Builds Income →{" "}
                  <span className="text-[#23B14D]">Fuels Demand</span> →<br />
                  <span className="text-[#23B14D]">Sustains Systems</span> →
                  Uplifts Communities.
                </h3>
              )}
            </div>
          </div>
        </div>

        {main?.cta && main.cta.length > 0 ? (
          <div className="flex flex-col items-end gap-8 my-8">
            <Link
              href={main.cta[0].href}
              className=" relative flex justify-end cursor-pointer"
            >
              <img
                src="/images/community-impact-loop/submit.png"
                alt="Submit Proposal / Collaboration Inquiry"
              />
              <div className="absolute top-4 font-bold right-16 lg:right-20">
                {main.cta[0].text}
              </div>
            </Link>
            <Link
              href={main.cta[0].href}
              className=" relative flex justify-end  cursor-pointer"
            >
              <img
                src="/images/community-impact-loop/green.png"
                alt="GREEN Innovation Partnership Framework (PDF)"
              />
              <div className="absolute top-3 lg:top-4 lg:text-base text-sm font-bold right-16 lg:right-20">
                {main.cta[1].text}
              </div>
            </Link>
          </div>
        ) : (
          <>
            <div className=" flex justify-end my-8 cursor-pointer">
              <img
                src="/images/community-impact-loop/submit.png"
                alt="Submit Proposal / Collaboration Inquiry"
              />
            </div>
            <div className=" flex justify-end my-8 cursor-pointer">
              <img
                src="/images/community-impact-loop/green.png"
                alt="GREEN Innovation Partnership Framework (PDF)"
              />
            </div>
          </>
        )}
      </div>
      <Chatbot />
    </React.Fragment>
  );
};

export default CommunityImpactLoop;
