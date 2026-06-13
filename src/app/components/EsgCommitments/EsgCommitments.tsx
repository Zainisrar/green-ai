"use client";
import React from "react";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";
import { useSustainabilityESG } from "../../../hooks/useSustainabilityESG";

const EsgCommitments = () => {
  const { sustainabilityData, isLoading, error } = useSustainabilityESG();



  if (error) {
    return (
      <React.Fragment>
        <div className="min-h-screen">
          <TopNavigation />
          <div className="flex items-center justify-center h-screen">
            <div className="text-xl text-red-500">Error loading sustainability data</div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <div className="">
        <TopNavigation />
        
        {/* Background Image */}
        <div className="absolute top-0 left-0 lg:block hidden">
          <img src="/images/esg-commitments/mainImg.png" alt="mainImg" className="w-9/12 h-[120vh]" />
        </div>

        {/* Main Layout - Responsive */}
        <div className="px-4  lg:ml-52 mt-8 lg:mt-20">
          <div className="lg:flex  space-x-20">
            <div>
              <h1 className="text-2xl pl-20 lg:pl-0 lg:text-3xl uppercase font-black mb-6">
                {sustainabilityData?.header?.title?.split(' & ')[0] || "Sustainability"} <br /> & ESG
                <br />
                <span className="text-[#23B14D]">
                  {sustainabilityData?.header?.title?.split(' ')[3] || "Commitments"}
                </span>
              </h1>
            </div>
            <div className="w-full">
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-3xl font-black text-gray-800 mb-3">
                  A Greener Mission, A Lasting Impact
                </h2>
                <p className="text-base font-semibold text-gray-700">
                  <span className="font-black text-green-600 italic">
                    — At GREEN
                  </span>
                  , {sustainabilityData?.header?.subtitle || "sustainability is more than a goal—it's our core operating principle. We integrate Environmental, Social, and Governance (ESG) values into everything we do, from product design to energy use, supply chains, and community partnerships."}
                </p>
              </div>

              <div className="space-y-6 my-8">
                <div className="grid lg:grid-cols-2 gap-6">
                  {sustainabilityData?.sections?.slice(0, 2).map((section, index) => (
                    <div key={section.id}>
                      <div className="flex space-x-2 items-center mb-3">
                        <div className="flex space-x-2">
                          <div>
                            <img
                              src={section.icon?.src || `/images/esg-commitments/${index === 0 ? 'environmental' : 'responsibility'}.png`}
                              alt={section.icon?.alt || section.heading}
                              className="w-24"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <h3 className="text-xl font-black text-gray-800">
                            {section.heading}
                          </h3>
                          <p className="text-sm text-gray-700 mb-2">
                            {index === 0 
                              ? "We are actively rethinking our footprint by prioritizing climate-positive action."
                              : "Sustainability is about people, too. We invest in inclusive progress and resilient communities."
                            }
                          </p>
                        </div>
                      </div>
                      <ul className="ml-12 text-gray-600 space-y-1">
                        {section.points?.map((point, pointIndex) => (
                          <li key={pointIndex}>• {point}</li>
                        ))}
                      </ul>
                    </div>
                  )) || (
                    <>
                      {/* Fallback content for first two sections */}
                      <div>
                        <div className="flex space-x-2 items-center mb-3">
                          <div className="flex space-x-2">
                            <div>
                              <img
                                src="/images/esg-commitments/environmental.png"
                                alt="Environmental Stewardship"
                                className="w-24"
                              />
                            </div>
                          </div>
                          <div className="flex flex-col space-y-1">
                            <h3 className="text-xl font-black text-gray-800">
                              Environmental Stewardship
                            </h3>
                            <p className="text-sm text-gray-700 mb-2">
                              We are actively rethinking our footprint by
                              prioritizing climate-positive action.
                            </p>
                          </div>
                        </div>
                        <ul className="ml-12 text-gray-600 space-y-1">
                          <li>• Carbon-neutral operations by 2030</li>
                          <li>• 100% transition to renewable energy across all facilities</li>
                          <li>• Use of biodegradable and recyclable materials</li>
                          <li>• Sustainable procurement and green supply chain initiatives</li>
                          <li>• Deforestation and carbon offset programs</li>
                        </ul>
                      </div>
                      <div>
                        <div className="flex space-x-2 items-center mb-3">
                          <div className="flex space-x-2">
                            <div>
                              <img
                                src="/images/esg-commitments/responsibility.png"
                                alt="Social Responsibility"
                                className="w-24"
                              />
                            </div>
                          </div>
                          <div className="flex flex-col space-y-1">
                            <h3 className="text-xl font-black text-gray-800">
                              Social Responsibility
                            </h3>
                            <p className="text-sm text-gray-700 mb-2">
                              Sustainability is about people, too. We invest in
                              inclusive progress and resilient communities.
                            </p>
                          </div>
                        </div>
                        <ul className="ml-12 text-gray-600 space-y-1">
                          <li>• Training programs in green skills and clean-tech employment</li>
                          <li>• Local sourcing and support for underserved regions</li>
                          <li>• Ethical labor, diversity, and fair-wage policies</li>
                          <li>• Collaboration with indigenous and rural communities for eco-preservation</li>
                        </ul>
                      </div>
                    </>
                  )}
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  {sustainabilityData?.sections?.[2] ? (
                    <div>
                      <div className="flex space-x-2 items-center mb-3">
                        <div className="flex space-x-2">
                          <div>
                            <img
                              src={sustainabilityData.sections[2].icon?.src || "/images/esg-commitments/ethical.png"}
                              alt={sustainabilityData.sections[2].icon?.alt || "Ethical Governance"}
                              className="w-20"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <h3 className="text-xl font-black text-gray-800">
                            {sustainabilityData.sections[2].heading}
                          </h3>
                          <p className="text-sm text-gray-700 mb-2">
                            Good governance is the foundation of sustainable growth.
                          </p>
                        </div>
                      </div>
                      <ul className="ml-12 text-sm text-gray-600 space-y-1">
                        {sustainabilityData.sections[2].points?.map((point, pointIndex) => (
                          <li key={pointIndex}>• {point}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div>
                      <div className="flex space-x-2 items-center mb-3">
                        <div className="flex space-x-2">
                          <div>
                            <img
                              src="/images/esg-commitments/ethical.png"
                              alt="Ethical Governance"
                              className="w-20"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <h3 className="text-xl font-black text-gray-800">
                            Ethical Governance
                          </h3>
                          <p className="text-sm text-gray-700 mb-2">
                            Good governance is the foundation of sustainable growth.
                          </p>
                        </div>
                      </div>
                      <ul className="ml-12 text-sm text-gray-600 space-y-1">
                        <li>• ESG-aligned decision-making and board oversight</li>
                        <li>• Transparent sustainability reporting and KPIs</li>
                        <li>• Responsible investment screening (no fossil fuels, conflict materials, etc.)</li>
                        <li>• Climate risk assessment and mitigation planning</li>
                      </ul>
                    </div>
                  )}

                  <div className="w-[80%] mx-auto">
                    <p className="text-2xl font-semibold italic text-gray-700">
                      <span>"</span>
                      <span className="text-[#23B14D]">
                        {sustainabilityData?.quote?.text || "We lead with purpose—to build a thriving, low-carbon future through sustainable innovation and ESG integrity."}
                      </span>
                      <span>"</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Chatbot />
      </div>
    </React.Fragment>
  );
};

export default EsgCommitments;
