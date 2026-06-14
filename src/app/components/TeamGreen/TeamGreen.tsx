"use client";
import React from "react";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";
import WhoWeAre from "./Modals/WhoWeAre";
import OurLeadershipPhilosophy from "./Modals/OurLeadershipPhilosophy";
import MeettheTeam from "./Modals/MeettheTeam";
import OurCultureinAction from "./Modals/OurCultureinAction";
import { useTeamGreen } from "../../../hooks/useTeamGreen";
import { useInteractiveZIndex } from "../../../hooks/useInteractiveZIndex";

const TeamGreen = () => {
  const [isWhoWeAreOpen, setIsWhoWeAreOpen] = React.useState(false);
  const [isOurLeadershipPhilosophyOpen, setIsOurLeadershipPhilosophyOpen] = React.useState(false);
  const [isMeettheTeamOpen, setIsMeettheTeamOpen] = React.useState(false);
  const [isOurCultureinActionOpen, setIsOurCultureinActionOpen] = React.useState(false);

  // Fetch team green data
  const { data: teamGreenData } = useTeamGreen();

  // Interactive z-index hooks for buttons
  const whoWeAreButtonProps = useInteractiveZIndex();
  const leadershipButtonProps = useInteractiveZIndex();
  const meetTeamButtonProps = useInteractiveZIndex();
  const cultureButtonProps = useInteractiveZIndex();
  const workWithUsProps = useInteractiveZIndex();
  const cultureBriefProps = useInteractiveZIndex();

  // Helper function to render highlighted text
  const renderHighlightedText = (text: string, highlighted: string) => {
    if (!highlighted || !text.includes(highlighted)) {
      return text;
    }
    
    const parts = text.split(highlighted);
    return (
      <>
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            {part}
            {index < parts.length - 1 && (
              <span className="text-[#23B14D]">{highlighted}</span>
            )}
          </React.Fragment>
        ))}
      </>
    );
  };

  const data = teamGreenData?.data;
  
  if (!data) {
    return null;
  }

  return (
    <React.Fragment>
      <div className="">
        <div className="absolute top-0 left-0 -z-10">
          <img src="/images/team-green/mainImg.png" className=" lg:block hidden lg:w-10/12 lg:h-[145vh]" alt="img" />
        </div>
        <TopNavigation />
        <div className="flex h-full">
          {/* Left Side - GLOBAL SNAPSHOT Text */}
          <div className="w-1/6 flex items-center justify-center">
            <div className="fixed top-1/2 lg:top-1/4 left-4 lg:left-14">
              <img
                src="/images/team-green/team-green.png"
                alt="team-green"
                className="w-6 lg:w-14"
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="w-full px-8 pt-8">
            {/* Main Title */}
            <div className="mb-8">
              <h1 className=" text-2xl lg:text-3xl font-black text-gray-800 mb-4">
                {renderHighlightedText(data?.mainPage.title || "TEAM GREEN", "GREEN")}
              </h1>
              <h2 className=" text-xl lg:text-2xl font-bold text-[#23B14D] italic mb-4">
                {data?.mainPage.subHeadline || "Built by Engineers. Driven by Mission. Grounded in Community."}
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                {data?.mainPage.description ? 
                  renderHighlightedText(
                    data.mainPage.description.text.replace(/\n/g, ' '), 
                    data.mainPage.description.highlighted
                  ) : 
                  <>
                    <span className="text-[#23B14D] font-semibold">GREEN</span> is
                    powered by a team that spans disciplines, geographies, and
                    generations — but is united by one belief:
                    <br />
                    Clean energy should be reliable, inclusive, and transformative.
                  </>
                }
              </p>
            </div>
    <div className="lg:hidden my-12 ">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-800">
                {data?.mainPage.quote2 ? 
                  renderHighlightedText(data.mainPage.quote2.text, data.mainPage.quote2.highlighted) :
                  <>"Team <span className="text-[#23B14D]">GREEN</span> doesn't clock in. We show up — because lives depend on it."</>
                }
              </h3>
            </div>
            <div className="space-y-12  flex flex-col  items-end">
              {data?.mainPage.keys.map((key, index) => {
                const buttonProps = [whoWeAreButtonProps, leadershipButtonProps, meetTeamButtonProps, cultureButtonProps][index];
                const onClick = [
                  () => setIsWhoWeAreOpen(true),
                  () => setIsOurLeadershipPhilosophyOpen(true),
                  () => setIsMeettheTeamOpen(true),
                  () => setIsOurCultureinActionOpen(true)
                ][index];

                return (
                  <div key={index} className="lg:flex lg:flex-row flex-col    lg:space-x-8 border-b  border-green-600 pb-4 lg:items-center lg:w-9/12 lg:justify-between">
                    <div className="flex space-x-6 lg:space-x-10 lg:flex-1">
                      <div className="lg:w-52 lg:shrink-0">
                        <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-1">
                          {key.title}
                        </h3>
                      </div>
                      <div className="flex-1">
                        <p className="text-base text-gray-800 font-semibold mb-2 italic">
                          {key.description.replace(/\n/g, ' ')}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex justify-end">
                      <div {...buttonProps.getContainerProps()}>
                        <button 
                          onClick={onClick}
                          className="cursor-pointer"
                        >
                          <img
                            src="/images/team-green/exploreBtn.png"
                            alt="explore"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="my-20 mb-32 lg:mb-0  lg:my-0 lg:flex justify-between">
              <div className=" hidden lg:flex relative space-x-4 items-center">
                <div className="absolute lg:block hidden -left-14 top-14">
                  <img src="/images/handbook/shape.png" className="w-14" alt="shape" />
                </div>
                <div>
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4">

                    “A Day with Team
                    {` `} <span className="text-[#23B14D]">GREEN.</span>
                  </h3>
                </div>
                <div className="-ml-16 lg:block hidden absolute -right-10  top-14 -mt-2">
                  <img
                    src="/images/handbook/shape2.png"
                    className="w-14"
                    alt="shape"
                  />
                </div>
              </div>
              <div>
                {data?.mainPage.cta.map((cta, index) => {
                  const ctaProps = index === 0 ? workWithUsProps : cultureBriefProps;
                  return (
                    <div key={index} className="flex justify-end my-8">
                      <div {...ctaProps.getContainerProps()}>
                        <a 
                          href={cta.href || '#'} 
                          className="cursor-pointer block"
                        >
                          <img
                            src={index === 0 ? "/images/team-green/work-with-us.png" : "/images/team-green/green.png"}
                            alt={cta.text}
                          />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Bottom Quote */}
            <div className="lg:block hidden lg:my-0 my-12 mb-20">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-800">
                {data?.mainPage.quote2 ? 
                  renderHighlightedText(data.mainPage.quote2.text, data.mainPage.quote2.highlighted) :
                  <>"Team <span className="text-[#23B14D]">GREEN</span> doesn't clock in. We show up — because lives depend on it."</>
                }
              </h3>
            </div>
          </div>
        </div>

        <Chatbot />
      </div>
      <WhoWeAre
        isOpen={isWhoWeAreOpen}
        onClose={() => setIsWhoWeAreOpen(false)}
        data={data?.whoWeAreModal}
      />
      <OurLeadershipPhilosophy
        isOpen={isOurLeadershipPhilosophyOpen}
        onClose={() => {
          setIsOurLeadershipPhilosophyOpen(false);
        }}
        data={data?.ourLeadershipPhilosophy}
      />
      <MeettheTeam
        isOpen={isMeettheTeamOpen}
        onClose={() => {
          setIsMeettheTeamOpen(false);
        }}
        data={data?.meetTeam}
        />
        <OurCultureinAction
        isOpen={
          isOurCultureinActionOpen
        }
        onClose={() => {
          setIsOurCultureinActionOpen(false);
        }}
        data={data?.ourCultureActionModal}
        />
    </React.Fragment>
  );
};

export default TeamGreen;
