"use client";
import React, { useState, useEffect } from "react";
import { useInteractiveZIndex } from "../../../../hooks/useInteractiveZIndex";

interface TeamMember {
  img: string;
  name: string;
  position: string;
}

interface FallbackTeamMember {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  department: string;
  image: string;
}

interface MeetTeamData {
  quote: {
    text: string;
    text1: string;
    text2: string;
    highlighted: string;
    highlightedText: string;
  };
  title: string;
  jobTitle: any[];
  description: string;
  designations: Array<{
    name: string;
    members: TeamMember[];
  }>;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: MeetTeamData;
}

const MeettheTeam = ({ isOpen, onClose, data }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("0");
  const [isMobile, setIsMobile] = useState(false);
  const closeButtonProps = useInteractiveZIndex();

  // Mobile detection - initialize immediately
  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
        const mobile = window.innerWidth < 768;
        setIsMobile(mobile);
      }
    };
    
    // Check immediately
    checkMobile();
    
    // Add resize listener
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Also check on every render as backup
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setIsMobile(true);
    }
  });

  // Update selected category when data changes
  useEffect(() => {
    if (data?.designations && data.designations.length > 0) {
      setSelectedCategory("0"); // First API category
    } else {
      setSelectedCategory("cto"); // First fallback category that matches your screenshot
    }
  }, [data]);

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
              <span className="text-green-600">{highlighted}</span>
            )}
          </React.Fragment>
        ))}
      </>
    );
  };

  if (!isOpen) return null;

  // Team data - max 6 members per category (fallback data)
  const teamData: Record<string, FallbackTeamMember[]> = {
    ceo: [
      {
        id: 1,
        firstName: "John",
        lastName: "Smith",
        role: "Chief Executive Officer",
        department: "Executive",
        image: "/images/our-team/bernard-george.png",
      },
    ],
    cto: [
      {
        id: 1,
        firstName: "Senthilkumar",
        lastName: "Chockalingam",
        role: "Senior Business and Engineering Manager",
        department: "Technology",
        image: "/images/our-team/bernard-george.png",
      },
    ],
    hcm: [
      {
        id: 1,
        firstName: "Patricia",
        lastName: "Clark",
        role: "Human Capital Manager",
        department: "HR",
        image: "/images/our-team/bernard-george.png",
      },
    ],
    engineers: [
      {
        id: 1,
        firstName: "Carlos",
        lastName: "Rodriguez",
        role: "Software Engineer",
        department: "Development",
        image: "/images/our-team/bernard-george.png",
      },
    ],
    regionalLeads: [
      {
        id: 1,
        firstName: "Mark",
        lastName: "Peterson",
        role: "Regional Manager",
        department: "Asia Pacific",
        image: "/images/our-team/bernard-george.png",
      },
    ],
  };

  // Use API data if available, otherwise use fallback categories
  const categories = data?.designations && data.designations.length > 0 
    ? data.designations.map((designation, index) => ({
        key: index.toString(),
        title: designation.name,
        color: selectedCategory === index.toString() ? "text-green-600" : "text-gray-800"
      }))
    : [
        { key: "ceo", title: "CEO", color: selectedCategory === "ceo" ? "text-green-600" : "text-gray-800" },
        { key: "cto", title: "CTO", color: selectedCategory === "cto" ? "text-green-600" : "text-gray-800" },
        { key: "hcm", title: "HCM", color: selectedCategory === "hcm" ? "text-green-600" : "text-gray-800" },
        { key: "engineers", title: "Engineers", color: selectedCategory === "engineers" ? "text-green-600" : "text-gray-800" },
        { key: "regionalLeads", title: "Regional Leads", color: selectedCategory === "regionalLeads" ? "text-green-600" : "text-gray-800" },
      ];

  const getCurrentMembers = (): (TeamMember | FallbackTeamMember)[] => {
    if (data?.designations && data.designations.length > 0) {
      const categoryIndex = parseInt(selectedCategory);
      return data.designations[categoryIndex]?.members || [];
    }
    return teamData[selectedCategory] || [];
  };

  const renderContent = () => (
    <>
      {/* Title Section */}
      <div className="mb-8">
        <h2 className="text-2xl lg:text-3xl font-black text-gray-800 mb-4">
          {data?.title || "Meet Our Team"}
        </h2>
        <div className="lg:flex items-center">
          {!isMobile && (
            <span className="text-2xl text-black font-bold mr-2">-</span>
          )}
          <h3 className="text-xl text-[#4CAF50] font-semibold">
            {data?.quote ? renderHighlightedText(data.quote.text, data.quote.highlightedText || data.quote.highlighted) : 
             "I'm here because solar isn't just a job — it's my way to shape the future of PNG."}
          </h3>
        </div>
        <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
      </div>

      {/* Main Content with Vertical Navigation */}
      <div className={`${isMobile ? 'flex flex-col space-y-6' : 'flex'}`}>
        {/* Vertical Category Navigation */}
        <div className={`${isMobile ? 'w-full' : 'w-40'} flex-shrink-0`}>
          <div className={`${isMobile ? 'flex flex-wrap gap-2 justify-center' : 'space-y-4'}`}>
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`${isMobile ? 'px-3 py-2 text-sm rounded-full' : 'w-full text-left px-4 py-3 text-xl'} font-bold transition-all ${
                  selectedCategory === category.key
                    ? "text-green-600"
                    : "text-gray-800 "
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>

        {/* Team Members Grid */}
        <div className="flex-1">
          <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-3 gap-x-6'}`}>
            {getCurrentMembers().slice(0, 6).map((member, index) => {
              // Check if it's API data (TeamMember) or fallback data (FallbackTeamMember)
              const isApiData = 'img' in member;
              const memberImage = isApiData ? (member as TeamMember).img : (member as FallbackTeamMember).image;
              const memberName = isApiData ? (member as TeamMember).name : `${(member as FallbackTeamMember).firstName} ${(member as FallbackTeamMember).lastName}`;
              const memberPosition = isApiData ? (member as TeamMember).position : (member as FallbackTeamMember).role;
              const memberKey = isApiData ? index : (member as FallbackTeamMember).id;

              return (
                <div key={memberKey} className={`text-center `}>
                  <div className="relative">
                    <div className="">
                      <div className="">
                        <div className={` w-[200px] relative mx-auto lg:mx-0`}>
                          <img
                            src={memberImage}
                            alt={memberName}
                            className={`object-cover lg:z-0 z-30 lg:static relative `}
                            style={{
                              maskImage: "url('/images/our-team/maskImg.png')",
                              maskRepeat: "no-repeat",
                              maskSize: "100% 100%",
                              maskPosition: "center",
                              WebkitMaskImage: "url('/images/our-team/maskImg.png')",
                              WebkitMaskRepeat: "no-repeat",
                              WebkitMaskSize: "100% 100%",
                              WebkitMaskPosition: "center",
                            } }
                          />
                         
                          <img
                            src="/images/our-team/maskImg.png"
                            alt=""
                            className="absolute top-10 -left-4 w-[200px] z-20 lg:-z-10"
                          />
                        </div>
                        <div className={`${isMobile ? '' : ' -ml-20'}  text-center`}>
                          <h3 className={`${isMobile ? 'text-sm' : 'text-base'} font-bold text-gray-800`}>
                            {memberName}
                          </h3>
                          <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-600 font-semibold`}>
                            {memberPosition}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quote Section */}
      <div className="pt-8 border-t border-gray-300 mt-8">
        <blockquote className={`${isMobile ? 'text-sm' : 'text-base'} capitalize font-bold text-center text-gray-800 italic leading-relaxed`}>
          {data?.quote ? renderHighlightedText(data.quote.text, data.quote.highlightedText || data.quote.highlighted) : 
           <>"I'm here because solar isn't just a job — it's my way to shape the future of{`  `}<span className="text-green-600">PNG</span>." – Field Technician, Morobe Province</>
          }
        </blockquote>
      </div>
    </>
  );

  return (
    <React.Fragment>
      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-black/20 z-[99999999999999999999999999] flex items-center justify-center">
        {/* Modal Container */}
        <div className="relative w-full lg:max-w-6xl mx-4">
          {/* Mobile Layout */}
          {isMobile ? (
            <div className="bg-gray-100 h-[80vh] p-3 overflow-y-auto py-14 border-2 border-[#4CAF50] relative shadow-2xl">
              {/* Close Button */}
              <div className="flex justify-end w-full">
                <div {...closeButtonProps.getContainerProps()}>
                  <button
                    onClick={onClose}
                    className="cursor-pointer text-gray-600 hover:text-gray-800 text-2xl z-10"
                  >
                    <img src="/images/join-us/xicon.png" alt="Close Icon" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="mx-auto">{renderContent()}</div>
            </div>
          ) : (
            /* Desktop Layout */
            <div
              className="bg-gray-100 transform  py-4 border-2 border-[#4CAF50] px-16 relative shadow-2xl"
              style={{ clipPath: "polygon(0 0, 95% 0, 100% 100%, 5% 100%)",
                transform:"skewX(-12deg)"
               }}
            >
              {/* Close Button */}
              <div className="flex justify-end w-full">
                <div {...closeButtonProps.getContainerProps()}>
                  <button
                    onClick={onClose}
                    style={{
                      transform:"skewX(12deg)"
                    }}
                    className="cursor-pointer text-gray-600 hover:text-gray-800 text-2xl z-10 transform "
                  >
                    <img src="/images/join-us/xicon.png" alt="Close Icon" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div
              style={{
                transform:"skewX(12deg)"
              }}
              className="transform  max-w-5xl mx-auto">
                {renderContent()}
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default MeettheTeam;