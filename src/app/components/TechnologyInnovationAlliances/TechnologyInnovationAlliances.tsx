"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
// import OurProcurementEthos from "./Dialog/OurProcurementEthos";
// import CodeOfConduct from "./Dialog/CodeofConduct";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";
import { useTechnologyInnovationAlliances } from "@/app/hooks/useTechnologyInnovationAlliances";
import WhyWePartner from "./Modals/WhyWePartner";
import CurrentTechnologyCollaborators from "./Modals/CurrentTechnologyCollaborators";
import ResearchCoDevelopment from "./Modals/ResearchCoDevelopment";
import InnovativePartner from "./Modals/InnovativePartner";
import { useInteractiveZIndex } from "../../../hooks/useInteractiveZIndex";

const TechnologyInnovationAlliances = () => {
  const [isOurProcurementEthosOpen, setIsOurProcurementEthosOpen] =
    useState(false);
  const [isCurrentTechnologyCollaboratorsOpen, setIsCurrentTechnologyCollaboratorsOpen] = useState(false);
  const [isResearchCoDevelopmentOpen, setIsResearchCoDevelopmentOpen] = useState(false);
  const [isBecomeInnovationPartnerOpen, setIsBecomeInnovationPartnerOpen] = useState(false);
  
  // Interactive z-index hooks
  const procurementEthosProps = useInteractiveZIndex();
  const technologyCollaboratorsProps = useInteractiveZIndex();
  const researchDevelopmentProps = useInteractiveZIndex();
  const innovationPartnerProps = useInteractiveZIndex();
  const loginLink1Props = useInteractiveZIndex();
  const loginLink2Props = useInteractiveZIndex();
  const { data,  error } = useTechnologyInnovationAlliances();

 
  if (error) {
    return <div className="min-h-[50vh] flex items-center justify-center text-red-600">{error}</div>;
  }
  if (!data) return null;

  const { mainPage, modals } = data;
  const modal0 = modals[0];
  const modal1 = modals[1];
  const modal2 = modals[2];
  const modal3 = modals[3];

  return (
    <React.Fragment>
      <div className="  ">
        <TopNavigation />

        <div className="flex h-full relative">
          {/* Left Side - GLOBAL SNAPSHOT Text */}
          <div className="w-1/6 flex items-center justify-center">
            <div className="fixed top-1/3 lg:top-[20%] left-4 lg:left-14">
              <img
                src="/images/technology-innovation-alliances/technology-innovation-alliances.png"
                alt="Supplier Code of Conduct"
                className="w-12 lg:w-20"
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className=" px-8 pt-8 ">
            {/* Main Title */}
            <div className="mb-8">
              <h1 className="lg:text-3xl text-2xl font-black text-gray-800 mb-4">
                {mainPage.title.toUpperCase()}
              </h1>
              <h2 className="text-xl lg:text-2xl font-bold text-[#23B14D] italic mb-4">
                {mainPage.subHeadline}
              </h2>
              <p className="text-gray-600 text-lg mb-8 whitespace-pre-line">
                {mainPage.description.text}
              </p>
            </div>

   <div className=" lg:hidden   ">
              {/* Bottom Quote */}
              <div className=" my-10 lg:pl-10 lg:w-3/12">
                <h3 className="lg:text-lg  font-bold text-gray-800 mb-4 whitespace-pre-line">
                  {mainPage.quote[0]?.text.split(mainPage.quote[0]?.highlighted).map((seg, idx) => (
                    <React.Fragment key={idx}>
                      {idx === 0 && seg}
                      {idx === 0 && mainPage.quote[0]?.highlighted && (
                        <span className="text-[#23B14D]">{mainPage.quote[0].highlighted}</span>
                      )}
                      {idx === 1 && seg}
                    </React.Fragment>
                  ))}
                 
                </h3>
              </div>
            </div>
            {/* Content Grid */}
            <div className="grid  lg:grid-cols-2  gap-8 mb-8">
              <div className="flex space-x-4">
                <img
                  src={modal0?.img?.src || "/images/technology-innovation-alliances/whywepartner.png"}
                  alt={modal0?.img?.alt || "Why We Partner"}
                  className="lg:w-62 h-20 lg:h-32"
                />
                <div className="flex-1">
                  <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-2">
                    {modal0?.title.trim() || "Why We Partner"}
                  </h3>
                  <p className="text-sm">
                    {modal0?.subHeadline}
                  </p>
                  <div {...procurementEthosProps.getContainerProps()}>
                    <div
                      onClick={() => setIsOurProcurementEthosOpen(true)}
                      className="cursor-pointer flex justify-end mt-4"
                    >
                      <img
                        src="/images/client-partnerships/explore.png"
                        alt="explore"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex space-x-4">
                <img
                  src={modal1?.img?.src || "/images/technology-innovation-alliances/currenttechnologycollaborators.png"}
                  alt={modal1?.img?.alt || "Current Technology Collaborators"}
                  className="lg:w-62 h-20 lg:h-32"
                />
                <div className="flex-1">
                  <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-2">
                    {modal1?.title.trim() || "Current Technology Collaborators"}
                  </h3>
                  <p className="text-sm">
                    {modal1?.subHeadline}
                  </p>
                  <div {...technologyCollaboratorsProps.getContainerProps()}>
                    <div
                      onClick={() => setIsCurrentTechnologyCollaboratorsOpen(true)}
                      className="cursor-pointer flex justify-end mt-4"
                    >
                      <img
                        src="/images/client-partnerships/explore.png"
                        alt="explore"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex space-x-4">
                <img
                  src={modal2?.img?.src || "/images/technology-innovation-alliances/researchdevelopment.png"}
                  alt={modal2?.img?.alt || "Research & Co-Development"}
                  className="lg:w-62 h-20 lg:h-32"
                />
                <div className="flex-1">
                  <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-2">
                    {modal2?.title.trim() || "Research & Co-Development"}
                  </h3>
                  <p className="text-sm">
                    {modal2?.subHeadline}
                  </p>
                  <div {...researchDevelopmentProps.getContainerProps()}>
                    <div
                      onClick={() => setIsResearchCoDevelopmentOpen(true)}
                      className="cursor-pointer flex justify-end mt-4"
                    >
                      <img
                        src="/images/client-partnerships/explore.png"
                        alt="explore"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex space-x-4">
                <img
                  src={modal3?.img?.src || "/images/technology-innovation-alliances/innovationpartner.png"}
                  alt={modal3?.img?.alt || "Become an Innovation Partner"}
                  className="lg:w-62 h-20 lg:h-32"
                />
                <div className="flex-1">
                  <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-2">
                    {modal3?.title.trim() || "Become an Innovation Partner"}
                  </h3>
                  <p className="text-sm">
                    {modal3?.subHeadline}
                  </p>
                  <div {...innovationPartnerProps.getContainerProps()}>
                    <div
                      onClick={() => setIsBecomeInnovationPartnerOpen(true)}
                      className="cursor-pointer flex justify-end mt-4"
                    >
                      <img
                        src="/images/client-partnerships/explore.png"
                        alt="explore"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute lg:block hidden top-0 right-0 -z-10">
              <img
                src="/images/technology-innovation-alliances/mainImg.png"
                className="h-[60vh]"
                alt=""
              />
            </div>
            <div className=" lg:flex hidden  justify-end ">
              {/* Bottom Quote */}
              <div className=" mt-10 lg:pl-10 lg:w-3/12">
                <h3 className="lg:text-lg  font-bold text-gray-800 mb-4 whitespace-pre-line">
                  {mainPage.quote[0]?.text.split(mainPage.quote[0]?.highlighted).map((seg, idx) => (
                    <React.Fragment key={idx}>
                      {idx === 0 && seg}
                      {idx === 0 && mainPage.quote[0]?.highlighted && (
                        <span className="text-[#23B14D]">{mainPage.quote[0].highlighted}</span>
                      )}
                      {idx === 1 && seg}
                    </React.Fragment>
                  ))}
                 
                </h3>
              </div>
            </div>
            <div className="lg:flex  justify-between  mb-20">
              <div className="lg:flex mt-14 space-x-4 ">
                <div className="">
                  <div className="flex relative space-x-4 items-center">
                    <div className="absolute -left-10 -top-2">
                      <img
                        src="/images/handbook/shape.png"
                        className="w-14"
                        alt="shape"
                      />
                    </div>
                    <div>
                      <h3 className=" lg:text-xl font-bold text-gray-800 mb-4 whitespace-pre-line">
                        {mainPage.quote[1]?.text.split(mainPage.quote[1]?.highlighted).map((seg, idx) => (
                          <React.Fragment key={idx}>
                            {idx === 0 && seg}
                            {idx === 0 && mainPage.quote[1]?.highlighted && (
                              <span className="text-[#23B14D]">{mainPage.quote[1].highlighted}</span>
                            )}
                            {idx === 1 && seg}
                          </React.Fragment>
                        ))}
                      </h3>
                    </div>
                    <div className="- absolute -right-4 -top-4">
                      <img
                        src="/images/handbook/shape2.png"
                        className="w-14"
                        alt="shape"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-32 lg:mb-0">
                <div className="flex justify-end  ">
                  <div {...loginLink1Props.getContainerProps()}>
                    <Link
                      href={mainPage.cta?.[1]?.href || "/supply-partners/login"}
                      className=" cursor-pointer"
                    >
                      <img
                        src="/images/technology-innovation-alliances/green.png"
                        alt={mainPage.cta?.[1]?.text || "GREEN Innovation Partnership Framework (PDF)"}
                      />
                    </Link>
                  </div>
                </div>
                <div className="flex justify-end my-8">
                  <div {...loginLink2Props.getContainerProps()}>
                    <Link
                      href={mainPage.cta?.[0]?.href || "/supply-partners/login"}
                      className=" cursor-pointer"
                    >
                      <img
                        src="/images/technology-innovation-alliances/become-technology-partner.png"
                        alt={mainPage.cta?.[0]?.text || "Become a Technology Partner"}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Left Quote Box */}
          </div>
        </div>
      </div>
      <Chatbot />
      <WhyWePartner
        isOpen={isOurProcurementEthosOpen}
        onClose={() => setIsOurProcurementEthosOpen(false)}
        title={modal0?.title || ""}
        subHeadline={modal0?.subHeadline || ""}
        description={modal0?.description || ""}
        img={modal0?.img || { alt: "", src: "" }}
        keys={modal0?.keys || []}
        quote={modal0?.quote || { text: "", highlighted: "" }}
      />
      <CurrentTechnologyCollaborators
        isOpen={isCurrentTechnologyCollaboratorsOpen}
        onClose={() => setIsCurrentTechnologyCollaboratorsOpen(false)}
        title={modal1?.title || ""}
        subHeadline={modal1?.subHeadline || ""}
        description={modal1?.description || ""}
        img={modal1?.img || { alt: "", src: "" }}
        keys={modal1?.keys || []}
        quote={modal1?.quote || { text: "", highlighted: "" }}
      />
      <ResearchCoDevelopment
        isOpen={isResearchCoDevelopmentOpen}
        onClose={() => setIsResearchCoDevelopmentOpen(false)}
        title={modal2?.title || ""}
        subHeadline={modal2?.subHeadline || ""}
        description={modal2?.description || ""}
        img={modal2?.img || { alt: "", src: "" }}
        keys={modal2?.keys || []}
        quote={modal2?.quote || { text: "", highlighted: "" }}
      />
      <InnovativePartner
        isOpen={isBecomeInnovationPartnerOpen}
        onClose={() => setIsBecomeInnovationPartnerOpen(false)}
        title={modal3?.title || ""}
        subHeadline={modal3?.subHeadline || ""}
        description={modal3?.description || ""}
        img={modal3?.img || { alt: "", src: "" }}
        keys={modal3?.keys || []}
        quote={modal3?.quote || { text: "", highlighted: "" }}
      />
    </React.Fragment>
  );
};

export default TechnologyInnovationAlliances;
