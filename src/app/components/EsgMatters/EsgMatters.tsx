"use client";
import React, { useEffect, useState } from "react";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";
import { useImpactMeasurementEsg } from "../../../hooks/useImpactMeasurementEsg";
import SampleImpactReport from "./Modals/SampleImpactReport";

const EsgMatters = () => {
  const { data,  error } = useImpactMeasurementEsg();
  const [isSampleOpen, setIsSampleOpen] = useState(false);

  const [active, setActive] = useState<{
    index: number;
    data: React.JSX.Element;
  }>({
    index: 0,
    data: (
      <div className="mt-8 lg:ml-4 ">
        {/* Why ESG Matters Box */}
        <div className="">
          <h3 className="text-xl lg:text-2xl lg:ml-8 font-bold text-gray-800 mb-4">
            Why ESG Matters to GREEN
          </h3>
          <p className="lg:ml-6 text-[#23B14D] text-lg font-semibold italic mb-4">
            "We operate in environments where energy is everything.
            <br />
            So impact isn't an afterthought — it's the foundation."
          </p>
          <p className="text-gray-600 ml-4 text-lg  italic mb-4">
            GREEN's projects are designed and reported in full alignment with:
          </p>
          <div className="space-y-2 italic">
            <div className="flex items-center  space-x-2">
              <span>
                <img
                  src="/images/grid-intel/lighting.png"
                  className="w-14 -mt-4"
                  alt="lighting"
                />
              </span>
              <span className="text-sm font-semibold text-gray-800">
                ESG frameworks{" "}
                <span className="text-[#23B14D]">
                  (Environmental, Social, Governance){" "}
                </span>
              </span>
            </div>
            <div className="flex items-center -ml-10 space-x-2">
              <span>
                <img
                  src="/images/grid-intel/lighting.png"
                  className="w-14 -mt-4"
                  alt="lighting"
                />
              </span>
              <span className="text-sm font-semibold text-gray-800">
                UN SDGs{" "}
                <span className="text-[#23B14D]">
                  (Sustainable Development Goals)
                </span>{" "}
              </span>
            </div>
            <div className="flex items-center -ml-16 space-x-2">
              <span>
                <img
                  src="/images/grid-intel/lighting.png"
                  className="w-14 -mt-4"
                  alt="lighting"
                />
              </span>
              <span className="text-sm font-semibold text-gray-800">
                Donor and Ministry reporting protocols
              </span>
            </div>
            <div className="flex items-center -ml-20 space-x-2">
              <span>
                <img
                  src="/images/grid-intel/lighting.png"
                  className="w-14 -mt-4"
                  alt="lighting"
                />
              </span>
              <span className="text-sm font-semibold text-gray-800">
                Community-led verification models
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
  });

  useEffect(() => {
    if (data) {
      handleActive(0);
    }
  }, [data]);

  const handleActive = (index: number) => {
    if (!data) return;
    switch (index) {
      case 0:
        setActive({
          index: 0,
          data: (
            <div className="mt-8 lg:ml-4 ">
              <div className="">
                <h3 className="text-xl lg:text-2xl lg:ml-8 font-bold text-gray-800 mb-4">
                  {data.whyEsgMattersGreen.title}
                </h3>
                <p className="ml-6 text-[#23B14D] text-lg font-semibold italic mb-4">
                  {data.whyEsgMattersGreen.subHeadline}
                </p>
                <p className="text-gray-600 lg:ml-4 text-lg italic mb-4">
                  {data.whyEsgMattersGreen.description}
                </p>
                <div className="space-y-2 italic">
                  {data.whyEsgMattersGreen.keys.map((key, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-2"
                      style={{ marginLeft: `-${idx * 10}px` }}
                    >
                      <span>
                        <img
                          src="/images/grid-intel/lighting.png"
                          className="w-14 -mt-4"
                          alt="lighting"
                        />
                      </span>
                      <span className="text-sm font-semibold text-gray-800">
                        {key.highlighted ? (
                          <>
                            {key.text.split(key.highlighted)[0]}
                            <span className="text-[#23B14D]">{key.highlighted}</span>
                            {key.text.split(key.highlighted)[1]}
                          </>
                        ) : (
                          key.text
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ),
        });
        break;
      case 1:
        setActive({
          index: 1,
          data: (
            <div className="mt-8 lg:ml-4 lg:w-[40%]">
              <h3 className="text-xl lg:text-2xl lg:ml-8 font-bold text-gray-800 mb-6">
                How We Measure Impact
              </h3>

              {/* Impact Measurement Table */}
              <div className="lg:ml-4 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-lg font-bold text-[#23B14D]">
                        Category
                      </th>
                      <th className="px-4 py-3 text-left text-lg font-bold text-[#23B14D]">
                        Key Metrics Tracked
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.howWeMeasureImpact.metrics.map((metric, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-3 font-semibold text-gray-800 italic">
                          {metric.category}
                        </td>
                        <td className="px-4 py-3 text-gray-700 italic">
                          {metric.keyMetricsTracked}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                    
                      <div className=" text-green-600 italic">
                        “All metrics are monitored via GRID-INTEL™ and
                        third-party field audits.”
                      </div>
              </div>
            </div>
          ),
        });
        break;
      case 2:
        setActive({
          index: 2,
          data: (
            <div className="mt-8 lg:ml-4">
              <h3 className="text-xl lg:text-2xl lg:ml-8 font-bold text-gray-800 mb-6">
                {data.esgIntegrationProjectLifeCycle.title}
              </h3>

              {/* ESG Integration List */}
              <div className="lg:ml-4 space-y-4">
                {data.esgIntegrationProjectLifeCycle.items.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-6">
                    <div className="w-32">
                      <h4 className="font-bold text-gray-800 italic text-lg lg:text-xl">
                        {item.title}
                      </h4>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 italic">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ),
        });
        break;
      case 3:
        setActive({
          index: 3,
          data: (
            <div className="mt-8 lg:ml-4">
              <h3 className="text-xl lg:text-2xl lg:ml-8 font-bold text-gray-800 mb-6">
                {data.trustSignals.title}
              </h3>

              {/* Trust Signals List */}
              <div className="lg:ml-4 space-y-4">
                {data.trustSignals.items.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <span>
                        <img
                          src="/images/grid-intel/lighting.png"
                          className="w-14 -mt-4"
                          alt="lighting"
                        />
                      </span>
                    </div>
                    <p className="text-gray-700 italic leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ),
        });
        break;
      case 4:
        setActive({
          index: 4,
          data: (
            <div className="mt-8 lg:ml-4">
              <h3 className="text-xl lg:text-2xl lg:ml-8 font-bold text-gray-800 mb-6">
                {data.sampleMetricsSnapshot.title}
              </h3>

              {/* Year Range and Project Type */}
              <div className="lg:ml-4 mb-8">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  {data.sampleMetricsSnapshot.description.highlighted && (
                    <span className="font-bold">{data.sampleMetricsSnapshot.description.highlighted}</span>
                  )}
                  {data.sampleMetricsSnapshot.description.text.replace(data.sampleMetricsSnapshot.description.highlighted, '')}
                </h4>
              </div>

              {/* Metrics List */}
              <div className="lg:ml-4 space-y-4">
                {data.sampleMetricsSnapshot.keys.map((key, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <span>
                        <img
                          src="/images/grid-intel/lighting.png"
                          className="w-14 -mt-4"
                          alt="lighting"
                        />
                      </span>
                    </div>
                    <p className="text-gray-700 italic leading-relaxed">
                      {key.highlighted && (
                        <span className="text-[#23B14D] font-bold text-lg">
                          {key.highlighted}
                        </span>
                      )}{" "}
                      {key.text.replace(key.highlighted, "")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ),
        });
        break;
      default:
        break;
    }
  };


  if (error || !data) {
    return null
  }

  return (
    <React.Fragment>
      <div className='bg-fixed bg-cover bg-center bg-no-repeat lg:bg-[url("/images/why-esg-matters-to-green/bg.jpg")]'>
        <TopNavigation />
        <div className="flex h-full z-[20] relative">
          {/* Left Side  */}
          <div className="w-1/8 flex items-center justify-center">
            <div className="fixed top-1/4 left-4 lg:left-14">
              <img
                src="/images/why-esg-matters-to-green/why-esg-matters-to-green.png"
                alt="esg-matters-to-green"
                className="w-4 lg:w-8"
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className=" px-8 pl-14 lg:pl-20 pt-8">
            {/* Main Title */}
            <div className="mb-8">
              <h1 className="text-2xl lg:text-3xl font-black text-gray-800 mb-4">
                IMPACT <span className="text-[#23B14D]">MEASUREMENT</span> & ESG
              </h1>
              <h2 className="text-xl lg:text-2xl font-bold text-[#23B14D] italic mb-4">
                {data.mainPage.subHeadline}
              </h2>
              <p className="text-gray-600 text-lg mb-4" style={{ whiteSpace: "pre-line" }}>
                {data.mainPage.description.highlighted ? (
                  <>
                    {data.mainPage.description.text.split(data.mainPage.description.highlighted)[0]}
                    <span className="text-[#23B14D] font-semibold">
                      {data.mainPage.description.highlighted}
                    </span>
                    {data.mainPage.description.text.split(data.mainPage.description.highlighted)[1]}
                  </>
                ) : (
                  data.mainPage.description.text
                )}
              </p>
            </div>
 <div className="z-[20] flex lg:hidden relative   ">
          <div className="relative flex items-center">
            <div className=" absolute top-12 -left-16">
              <img
                src="/images/why-esg-matters-to-green/shape.png"
                alt="shape"
                className="w-12"
              />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-800 mb-2">
                All metrics are monitored via
                <br />
                <span className="text-[#23B14D]">{data.mainPage.quote.highlighted}</span> and third-party
                <br />
                field audits.
              </p>
            </div>
            <div>
              <img
                src="/images/why-esg-matters-to-green/shape2.png"
                alt="shape"
                className="w-12 absolute -right-14 -top-5 "
              />
            </div>
          </div>
        </div>
            {/* Content Layout */}
            <div className="lg:flex  mt-16">
              {/* Left Column - Content List */}
              <div className=" space-y-8">
                {/* Why ESG Matters to GREEN */}
                <div className="cursor-pointer" onClick={() => handleActive(0)}>
                  <h3
                    className={`text-xl lg:text-2xl font-bold mb-2 ${
                      active.index === 0 ? "text-[#23B14D]" : "text-gray-800"
                    }`}
                  >
                    {data.whyEsgMattersGreen.title}
                  </h3>
                </div>

                {/* How We Measure Impact */}
                <div className="cursor-pointer" onClick={() => handleActive(1)}>
                  <h3
                    className={`text-xl lg:text-2xl font-bold mb-2 ${
                      active.index === 1 ? "text-[#23B14D]" : "text-gray-800"
                    }`}
                  >
                    How We Measure Impact
                  </h3>
                </div>

                {/* ESG Integration in Project Lifecycle */}
                <div className="cursor-pointer" onClick={() => handleActive(2)}>
                  <h3
                    className={`text-xl lg:text-2xl font-bold mb-2 ${
                      active.index === 2 ? "text-[#23B14D]" : "text-gray-800"
                    }`}
                  >
                    {data.esgIntegrationProjectLifeCycle.title}
                  </h3>
                </div>

                {/* Trust Signals */}
                <div className="cursor-pointer" onClick={() => handleActive(3)}>
                  <h3
                    className={`text-xl lg:text-2xl font-bold mb-2 ${
                      active.index === 3 ? "text-[#23B14D]" : "text-gray-800"
                    }`}
                  >
                    {data.trustSignals.title}
                  </h3>
                </div>

                {/* Sample Metrics Snapshot */}
                <div className="cursor-pointer" onClick={() => handleActive(4)}>
                  <h3
                    className={`text-xl lg:text-2xl font-bold mb-2 ${
                      active.index === 4 ? "text-[#23B14D]" : "text-gray-800"
                    }`}
                  >
                    {data.sampleMetricsSnapshot.title}
                  </h3>
                </div>
              </div>
              <div className="lg:block hidden">
                <img
                  src="/images/why-esg-matters-to-green/line.png"
                  alt="line"
                />
              </div>
              {/* Right Column - ESG Details */}
              {active.data}
            </div>
          </div>
        </div>

        {/* Monitoring Box */}
        <div className="z-[20] lg:flex hidden relative  justify-end pr-4">
          <div className="relative flex items-center">
            <div className=" absolute top-12 -left-16">
              <img
                src="/images/why-esg-matters-to-green/shape.png"
                alt="shape"
                className="w-12"
              />
            </div>
            <div>
              <p className="text-xl mr-12 font-bold text-gray-800 mb-2">
                All metrics are monitored via
                <br />
                <span className="text-[#23B14D]">{data.mainPage.quote.highlighted}</span> and third-party
                <br />
                field audits.
              </p>
            </div>
            <div>
              <img
                src="/images/why-esg-matters-to-green/shape2.png"
                alt="shape"
                className="w-12 absolute right-0 -top-5 "
              />
            </div>
          </div>
        </div>

        {/* Bottom Statement */}
        <div className="z-[20] px-10 my-10 lg:relative flex justify-center  ">
          <h3 className="text-xl lg:text-2xl font-bold text-gray-800">
            <span className="text-[#23B14D]">GREEN</span> Doesn't Just Talk{" "}
            <span className="text-[#23B14D]">ESG</span>.<br />
            We Operationalize It, Measure It, And Report It —{" "}
            <span className="text-[#23B14D]">Project By Project</span>.
          </h3>
        </div>
        <div className="z-[20] relative flex flex-col items-end gap-6 mt-4 mb-20 cursor-pointer">
          <a href={data.mainPage.cta[0]?.href || "#"} target="_blank" rel="noopener noreferrer">
            <img
              src="/images/why-esg-matters-to-green/green.png"
              alt={data.mainPage.cta[0]?.text || "GREEN ESG Policy Brief"}
            />
          </a>
          <button
            type="button"
            onClick={() => setIsSampleOpen(true)}
            className="cursor-pointer hover:opacity-80 transition-opacity"
          >
            <img
              src="/images/why-esg-matters-to-green/sample.png"
              alt={data.mainPage.cta[1]?.text || "Sample Impact Report or M&E Framework"}
            />
          </button>
        </div>
      </div>
      <Chatbot />
      <SampleImpactReport isOpen={isSampleOpen} onClose={() => setIsSampleOpen(false)} />
    </React.Fragment>
  );
};

export default EsgMatters;
