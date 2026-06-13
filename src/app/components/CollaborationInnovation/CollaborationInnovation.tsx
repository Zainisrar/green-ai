"use client";
import React, { useState } from "react";
import OurPhilosophy from "./Dialog/OurPhilosophy";
import WhoWeCollaborateWith from "./Dialog/WhoWeCollaborateWith";
import InnovationSpotlight from "./Dialog/InnovationSpotlight";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";
import { useCollaborationInnovation } from "../../../hooks/useCollaborationInnovation";
import Link from "next/link";

const CollaborationInnovation = () => {
  const [isOurPhilosophyOpen, setIsOurPhilosophyOpen] = useState(false);
  const [isWhoWeCollaborateWithOpen, setIsWhoWeCollaborateWithOpen] =
    useState(false);
  const [isInnovationSpotlightOpen, setIsInnovationSpotlightOpen] =
    useState(false);

  const openOurPhilosophy = () => setIsOurPhilosophyOpen(true);
  const closeOurPhilosophy = () => setIsOurPhilosophyOpen(false);
  const openWhoWeCollaborateWith = () => setIsWhoWeCollaborateWithOpen(true);
  const closeWhoWeCollaborateWith = () => setIsWhoWeCollaborateWithOpen(false);
  const openInnovationSpotlight = () => setIsInnovationSpotlightOpen(true);
  const closeInnovationSpotlight = () => setIsInnovationSpotlightOpen(false);

  const { data, isLoading, error } = useCollaborationInnovation();
  const main = data?.mainPage;
  const philosophy = data?.ourPhilosophy;
  const celebrate = data?.whoWeCelebrateWith; // API typo preserved
  const spotlight = data?.innovationSpotlight;
  const quote0 = main?.quote?.[0];
  const quote1 = main?.quote?.[1];
  const quote2= main?.quote?.[2];

  return (
    <React.Fragment>
      <div className="  ">
        <div className="absolute top-1/2 -left-10 -z-10 lg:block hidden">
          <img
            src="/images/collaboration-innovation/mainImg.png"
            className="w-11/12 h-[75vh] "
            alt="bg"
          />
        </div>
        <TopNavigation />

        <div className="flex h-full overflow-x-hidden">
          {/* Left Side  */}
          <div className="w-1/7 flex items-center  justify-center">
            <div className="fixed top-1/4 left-4 lg:left-14">
              <img
                src="/images/collaboration-innovation/collaboration-innovation.png"
                alt="Collaboration & Innovation"
                className="w-4 lg:w-7"
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="pt-8 pl-5">
            {/* Main Title */}
            <div className="mb-4 lg:pl-0 pl-10">
              <h1 className=" text-2xl lg:text-3xl font-black text-gray-800 mb-4">
                {main?.title || (
                  <>
                    COLLABORATION &{" "}
                    <span className="text-[#23B14D]">INNOVATION</span>
                  </>
                )}
              </h1>
              <h2 className=" text-xl lg:text-2xl font-bold text-[#23B14D] italic mb-4">
                {main?.subHeadline || "Innovation Begins with Collaboration."}
              </h2>
              {main?.description ? (
                <p className="text-gray-600 text-base lg:text-lg ">
                  <span className="text-[#23B14D] font-semibold">
                    {main.description.highlighted}
                  </span>{" "}
                  {main.description.text
                    .replace(main.description.highlighted, "")
                    .trim()}
                </p>
              ) : (
                <>
                  <p className="text-gray-600 text-base lg:text-lg ">
                    At{" "}
                    <span className="text-[#23B14D] font-semibold">GREEN</span>,
                    we believe the future of energy isn't invented in isolation.
                  </p>
                  <p className="text-gray-600 text-base lg:text-lg ">
                    It's co-engineered with the bold — researchers,
                    technologists, funders, startups, and institutions who are
                    building tomorrow today.
                  </p>
                </>
              )}
            </div>
            {/* Left Quote Box */}
            <div className="lg:hidden my-12 lg:-ml-20 space-x-4">
              <div className="lg:w-1/3  w-full ml-4 ">
                <div className="flex relative space-x-2 items-center ">
                  <div className="absolute -left-8 top-6">
                    <img
                      src="/images/collaboration-innovation/shape.png"
                      alt="shape"
                      className="w-10"
                    />
                  </div>
                  <div>
                    {quote0 ? (
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                        "{quote0.text.split(quote0.highlighted)[0]}
                        <span className="text-[#23B14D]">
                          {quote0.highlighted}
                        </span>
                        {quote0.text.split(quote0.highlighted)[1]}"
                      </h3>
                    ) : (
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                        "OPEN CALL: Tech Startups for Tropicalized{" "}
                        <span className="text-[#23B14D]">BESS 2025</span>"
                      </h3>
                    )}
                  </div>
                  <div>
                    <img
                      src="/images/collaboration-innovation/shape2.png"
                      alt="shape"
                      className="w-8 absolute right-8 -top-2"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Content Cards */}
            <div className="grid lg:grid-cols-3  gap-y-8  lg:gap-x-10 mb-8 z-20 relative lg:ml-52">
              <div
              style={{
                transform:"skewX(-16deg)"
              }}
              className="pt-6 relative pl-6   border-2 border-[#dbecac]">
                <h3
                style={{
                  transform:"skewX(16deg)"
                }}
                className=" lg:text-lg font-bold text-gray-800 mb-4 ">
                  {philosophy?.title || "Our Philosophy"}
                </h3>
                <img
                  src="/images/collaboration-innovation/our-philosophy.png"
                  alt="Our Philosophy"
                  className="w-52 mx-auto "
                />
                <p
                 style={{
                   transform:"skewX(16deg)"
                 }}
                className="text-base text-gray-800   font-bold  mb-4">
                  {philosophy?.subHeadline || (
                    <>
                      We don't chase trends.
                      <br />
                      We co-create breakthroughs.
                    </>
                  )}
                </p>
                <button
                  onClick={openOurPhilosophy}
                  className=" cursor-pointer absolute right-0 bottom-0 flex justify-end w-full"
                >
                  <img
                    src="/images/collaboration-innovation/explore.png"
                    alt="explore"
                  />
                </button>
              </div>
              <div
              style={{
                transform:"skewX(-16deg)"
              }}
              className="pt-6 relative pl-6 border-2 border-[#dbecac]">
                <h3
                style={{
                   transform:"skewX(16deg)"
                }}
                className=" lg:text-lg font-bold text-gray-800 mb-4 ">
                  {celebrate?.title || "Who We Collaborate With"}
                </h3>
                <img
                  src="/images/collaboration-innovation/who-we-collaborate-with.png"
                  alt="Who We Collaborate With"
                  className="w-52 mx-auto "
                />
                <p
                 style={{
                   transform:"skewX(16deg)"
                 }}
                className="text-base text-gray-800  font-bold  mb-4">
                  Precision design.
                  <br />
                  Terrain-smart. Load-aware.
                </p>
                <button
                  onClick={openWhoWeCollaborateWith}
                  className=" cursor-pointer  flex justify-end w-full"
                >
                  <img
                    src="/images/collaboration-innovation/explore.png"
                    alt="explore"
                  />
                </button>
              </div>
              <div
              style={{
                transform:"skewX(-16deg)"
              }}
              className="pt-6 relative pl-6   border-2 border-[#dbecac]">
                <h3
                style={{
                  transform:"skewX(16deg)"
                }}
                className="text-lg lg:text-xl font-bold text-gray-800 mb-4">
                  {spotlight?.title || "Innovation Spotlight"}
                </h3>
                <img
                  src="/images/collaboration-innovation/innovation-spotlight.png"
                  alt="Innovation Spotlight"
                  className="w-52 mx-auto "
                />
                <p
                 style={{
                  transform:"skewX(16deg)"
                 }}
                className="text-base text-gray-800   font-bold  mb-4">
                  Executed in-house.
                  <br />
                  Built to endure.
                </p>
                <button
                  onClick={openInnovationSpotlight}
                  className=" cursor-pointer absolute right-0 bottom-0 flex justify-end w-full"
                >
                  <img
                    src="/images/collaboration-innovation/explore.png"
                    alt="explore"
                  />
                </button>
              </div>
            </div>

            {/* Left Quote Box */}
            <div className="lg:flex lg:-ml-20 space-x-4 mb-8">
              <div className="lg:block hidden lg:w-1/3 ">
                <div className="flex relative space-x-2 items-center ">
                  <div className="absolute -left-8 top-6">
                    <img
                      src="/images/collaboration-innovation/shape.png"
                      alt="shape"
                      className="w-10"
                    />
                  </div>
                  <div>
                    {quote1 ? (
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                        "{quote1.text.split(quote1.highlighted)[0]}
                        <span className="text-[#23B14D]">
                          {quote1.highlighted}
                        </span>
                        {quote1.text.split(quote1.highlighted)[1]}"
                      </h3>
                    ) : (
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                        "OPEN CALL: Tech Startups for Tropicalized{" "}
                        <span className="text-[#23B14D]">BESS 2025</span>"
                      </h3>
                    )}
                  </div>
                  <div>
                    <img
                      src="/images/collaboration-innovation/shape2.png"
                      alt="shape"
                      className="w-8 absolute right-16 -top-2"
                    />
                  </div>
                </div>
              </div>

              {/* Right Side Content */}
              <div className="  my-4">
                {/* Bottom Statement */}
                <div className="text-left">
                  <h3 className=" text-lg lg:text-xl font-bold text-gray-800 mb-2">
                    {quote1 ? (
                      <>
                        "{quote1.text.split(quote1.highlighted)[0]}
                        <span className="text-[#23B14D]">{quote1.highlighted}</span>
                        {quote1.text.split(quote1.highlighted)[1]}"
                      </>
                    ) : null}
                  </h3>
                  <h3 className="text-lg lg:text-xl font-bold text-gray-800">
                   {quote2?.text}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {main?.cta && main.cta.length > 0 ? (
          <div className="flex flex-col items-end gap-4 mb-40 lg:my-4">
            <Link
              href={main.cta[0].href}
              className=" flex justify-end relative  cursor-pointer"
            >
              <img
                src="/images/collaboration-innovation/submit.png"
                alt="Submit Proposal / Collaboration Inquiry"
              />
              <div className="absolute right-14 top-4   font-bold ">
                   {main.cta[0].text}
              </div>
            </Link>
            <Link
              href={main.cta[1].href}
              className="flex justify-end  relative  cursor-pointer"
            >
              <img
                src="/images/collaboration-innovation/green.png"
                alt="GREEN Innovation Partnership Framework"
              />
               <div className="absolute right-10 top-4 lg:text-base text-sm  font-bold ">
                   {main.cta[1].text}
              </div>
            </Link>
          </div>
        ) : (
          <>
            <div className=" flex justify-end  my-8 cursor-pointer">
              <img
                src="/images/collaboration-innovation/submit.png"
                alt="Submit Proposal / Collaboration Inquiry"
              />
            </div>
            <div className="flex justify-end mb-32  my-8 cursor-pointer">
              <img
                src="/images/collaboration-innovation/green.png"
                alt="GREEN Innovation Partnership Framework"
              />
            </div>
          </>
        )}
      </div>
      <Chatbot />
      <OurPhilosophy
        isOpen={isOurPhilosophyOpen}
        onClose={closeOurPhilosophy}
        data={philosophy}
      />
      <WhoWeCollaborateWith
        isOpen={isWhoWeCollaborateWithOpen}
        onClose={closeWhoWeCollaborateWith}
        data={celebrate}
      />
      <InnovationSpotlight
        isOpen={isInnovationSpotlightOpen}
        onClose={closeInnovationSpotlight}
        data={spotlight}
      />
    </React.Fragment>
  );
};

export default CollaborationInnovation;
