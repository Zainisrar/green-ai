"use client";
import React from "react";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";
import { useProjects } from "../../../hooks/useProjects";

const Project = () => {
  const [isProjectsOpen, setIsProjectsOpen] = React.useState(true);
  const [currentProjectIndex, setCurrentProjectIndex] = React.useState(0);
  const [isDesktop, setIsDesktop] = React.useState(false);
  React.useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const { data: apiProjects } = useProjects();

  // Transform API data to match component structure
  const projectsData = React.useMemo(() => {
    if (!apiProjects) return [];

    return apiProjects.map((project) => ({
      id: project.id,
      title: project.title,
      image: project.featuredImg,
      systems: parseInt(project.numberofsystems),
      days: parseInt(project.noofdays),
      totalGeneration: parseInt(project.totalgeneration.replace(" kWh", "")),
      batteryPercentage: parseInt(project.battery.replace(" %", "")),
      coalA: parseFloat(project.coalA),
      emissionReduction: parseFloat(project.emissionreduction),
      treesPlanted: parseInt(project.treesplanted),
      capacity: project.capacity,
      toDateProduction: project.todateproduct,
      consumption: project.consumption,
      dailyGeneration: project.totalenergydaily,
    }));
  }, [apiProjects]);

  if (!projectsData || projectsData.length === 0) {
    return null;
  }

  const currentProject = projectsData[currentProjectIndex];

  const toggleProjects = () => {
    setIsProjectsOpen(!isProjectsOpen);
  };

  const nextProject = () => {
    setCurrentProjectIndex((prev) => (prev + 1) % projectsData.length);
  };

  const prevProject = () => {
    setCurrentProjectIndex(
      (prev) => (prev - 1 + projectsData.length) % projectsData.length
    );
  };

  const getPrevProject = () => {
    const prevIndex =
      (currentProjectIndex - 1 + projectsData.length) % projectsData.length;
    return projectsData[prevIndex];
  };

  const getNextProject = () => {
    const nextIndex = (currentProjectIndex + 1) % projectsData.length;
    return projectsData[nextIndex];
  };



  return (
    <React.Fragment>
      <div className="">
        <TopNavigation />
        <div className="flex h-full ">
          {/* Left Side Project Card and Navigation */}
          <div className="lg:w-1/6  hidden lg:flex items-center justify-center relative">
            <div className="fixed top-1/4 left-10 z-40">
              <img
                src="/images/projects/projects.png"
                className="w-14"
                alt="Projects"
              />
            </div>

            {/* Left Project Card */}
            <div className=" hidden lg:block lg:fixed top-1/2  left-32 transform -translate-y-1/2 z-50">
              <div
                className="relative cursor-pointer group"
                onClick={prevProject}
              >
                <div
                  style={{
                    transform: "skewX(-20deg)",
                  }}
                  className="w-52 h-48  overflow-hidden shadow-2xl"
                >
                  <img
                    src={getPrevProject().image}
                    alt={getPrevProject().title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  style={{
                    transform: "skewX(-20deg)",
                  }}
                  className="w-44  absolute top-0 left-10 h-48  overflow-hidden shadow-2xl"
                >
                  <div className="absolute inset-0 bg-gray-300 p-4  flex items-center justify-center">
                    <div
                      style={{
                        transform: "skewX(20deg)",
                      }}
                      className="text-black text-center "
                    >
                      <div className="text-xl font-bold">
                        {(() => {
                          const title = getPrevProject().title || "";
                          const words = title.trim().split(/\s+/);

                          // If more than 6 words, don't render
                          if (words.length > 6) return null;

                          // Limit to 3 words per line, 2 lines max
                          const firstLine = words.slice(0, 3).join(" ");
                          const secondLine = words.slice(3, 6).join(" ");

                          return (
                            <div className="text-center leading-tight">
                              <div>{firstLine}</div>
                              {secondLine && <div>{secondLine}</div>}
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -left-8 top-1/2 transform -translate-y-1/2">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 18L9 12L15 6"
                      stroke="#22c55e"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div
            onClick={() => {
              prevProject();
            }}
            className="absolute z-50 lg:hidden left-0  cursor-pointer top-8/12 transform -translate-y-1/2"
          >
            <svg
              width="52"
              height="52"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="#22c55e"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className=" ">
            <div
              style={{
                transform: isDesktop ? "skewX(-4deg)" : "skewX(-20deg)",
              }}
              className=" absolute lg:top-0 mt-20 lg:left-1/8 z-10   "
            >
              <div>
                <img
                  src={currentProject.image}
                  alt="project"
                  className={`lg:w-[60%] w-[80%]  mx-auto  lg:px-0   lg:h-screen ${
                    isProjectsOpen ? "h-[120vh]" : " h-[60vh]"
                  } `}
                />
              </div>
            </div>
            <div className=" relative top-44  lg:top-auto  lg:ml-52  z-50">
              <div className="lg:my-10 ">
                <div className=" text-white w-[70%] ml-20 lg:w-[80%] mx-auto">
                  <div
                    style={{
                      transform: "skewX(-16deg)",
                    }}
                    className=" bg-white/60  p-3 text-center  text-black  text-xl lg:text-3xl font-black"
                  >
                    {(() => {
                      const words = String(currentProject.title ?? "")
                        .trim()
                        .split(/\s+/)
                        .filter(Boolean);
                      const lines: string[] = [];
                      for (let i = 0; i < words.length; i += 3) {
                        lines.push(words.slice(i, i + 3).join(" "));
                      }
                      return lines.map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          {i < lines.length - 1 && <br />}
                        </React.Fragment>
                      ));
                    })()}
                  </div>
                  <div
                    onClick={toggleProjects}
                    className="flex justify-center mt-8 z-40 absolute lg:top-20  left-52 top-14 lg:left-72 cursor-pointer"
                  >
                    {isProjectsOpen ? (
                      <img
                        src="/images/projects/openingTag.png"
                        alt="openTag"
                      />
                    ) : (
                      <img
                        src="/images/projects/closingTag.png"
                        alt="closeTag"
                      />
                    )}
                  </div>
                  {isProjectsOpen && (
                    <div
                      style={{
                        transform: isDesktop ? "skewX(-8deg)" : "skewX(-20deg)",
                      }}
                      className="flex  flex-col top-14 -left-8 p-8 lg:top-20    bg-black/60   lg:-left-42 lg:p-10  relative z-50  space-y-4"
                    >
                      <div
                        style={{
                          transform: isDesktop ? "skewX(4deg)" : "",
                        }}
                        className="flex  lg:space-x-10 "
                      >
                        <div className="flex text-center flex-col items-center space-y-2">
                          <div>No. of systems</div>
                          <div className="font-bold">
                            {currentProject.systems}
                          </div>
                        </div>
                        <div className="flex flex-col text-center items-center space-y-2">
                          <div>No. of days</div>
                          <div className="font-bold">{currentProject.days}</div>
                        </div>
                        <div className="flex text-center flex-col items-center space-y-2">
                          <div>Total Generation</div>
                          <div className="font-bold">
                            <span className="lg:text-2xl">
                              {currentProject.totalGeneration}
                            </span>
                            {` kWh`}
                          </div>
                        </div>
                        <div
                          style={{
                            transform: "skewX(-16deg)",
                          }}
                          className=" hidden lg:flex items-center space-x-4 h-8 border-white border "
                        >
                          <div className="bg-[#23B14D] lg:px-10  lg:p-4 relative">
                            <div className="absolute top-1 z-10 left-4">
                              <img
                                src="/images/projects/batteryPercentage.png"
                                className="w-5"
                                alt="battery icn"
                              />
                            </div>
                          </div>
                          <div className="p-4">
                            {currentProject.batteryPercentage}%
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          transform: isDesktop ? "skewX(8deg)" : "none",
                        }}
                        className="flex lg:flex-nowrap space-y-4 lg:space-y-0 flex-wrap space-x-4 justify-center lg:justify-start "
                      >
                        <div
                          style={{
                            transform: isDesktop ? "skewX(4deg)" : "none",
                          }}
                          className="flex text-center flex-col items-center space-y-2"
                        >
                          <div>
                            <img
                              src="/images/projects/coal.png"
                              alt="coal"
                              className=" object-cover "
                            />
                          </div>
                          <div className="text-xs">Coal A</div>
                          <div className="font-bold">
                            {currentProject.coalA}
                          </div>
                        </div>
                        <div>/</div>
                        <div
                          style={{
                            transform: "skewX(4deg)",
                          }}
                          className=" flex flex-col text-center items-center space-y-2"
                        >
                          <div>
                            <img
                              src="/images/projects/co2.png"
                              alt="coal"
                              className=" object-cover"
                            />
                          </div>
                          <div className="text-xs">
                            Emission <br /> reduction
                          </div>
                          <div className="font-bold">
                            {currentProject.emissionReduction}
                          </div>
                        </div>
                        <div>/</div>
                        <div className="flex flex-col text-center items-center space-y-2">
                          <div>
                            <img
                              src="/images/projects/tree.png"
                              alt="coal"
                              className=" object-cover"
                            />
                          </div>
                          <div className="text-xs">Trees Planted</div>
                          <div className="font-bold">
                            {currentProject.treesPlanted}
                          </div>
                        </div>
                        <div className="flex flex-col text-center items-center space-y-2">
                          <div>
                            <img
                              src="/images/projects/capacity.png"
                              alt="coal"
                              className=" object-cover"
                            />
                          </div>
                          <div className="text-xs">Capacity</div>
                          <div className="font-bold">
                            {currentProject.capacity}
                          </div>
                        </div>
                        <div className="flex flex-col text-center items-center space-y-2">
                          <div>
                            <img
                              src="/images/projects/totalProduction.png"
                              alt="coal"
                              className=" object-cover"
                            />
                          </div>
                          <div className="text-xs">To date Production</div>
                          <div className="font-bold">
                            {currentProject.toDateProduction}
                          </div>
                        </div>
                        <div className="flex flex-col text-center items-center space-y-2">
                          <div>
                            <img
                              src="/images/projects/consumption.png"
                              alt="coal"
                              className=" object-cover"
                            />
                          </div>
                          <div className="text-xs">Consumption</div>
                          <div className="font-bold">
                            {currentProject.consumption}
                          </div>
                        </div>
                      </div>
                      <div className="flex lg:flex-row flex-col space-y-10 lg:space-x-4">
                        <div className="flex flex-col items-center space-y-2 mt-4">
                          <div className="flex text-center space-x-4">
                            <div
                              style={{
                                transform: "skewX(-16deg)",
                              }}
                              className="border-2 border-gray-500  text-sm p-2 px-4 "
                            >
                              <div
                                style={{
                                  transform: "skewX(16deg)",
                                }}
                              >
                                Day
                              </div>
                            </div>
                            <div
                              style={{
                                transform: "skewX(-16deg)",
                              }}
                              className="border-2 border-gray-500 text-sm  p-2 px-4 "
                            >
                              <div
                                style={{
                                  transform: "skewX(16deg)",
                                }}
                              >
                                Week
                              </div>
                            </div>
                          </div>
                          <div className="flex  text-center space-x-4">
                            <div
                              style={{
                                transform: "skewX(-16deg)",
                              }}
                              className="border-2 border-gray-500  text-sm p-2 px-4 "
                            >
                              <div
                                style={{
                                  transform: "skewX(16deg)",
                                }}
                              >
                                Month
                              </div>
                            </div>
                            <div
                              style={{
                                transform: "skewX(-16deg)",
                              }}
                              className="border-2 border-gray-500 text-sm  p-2 px-4 "
                            >
                              <div
                                style={{
                                  transform: "skewX(16deg)",
                                }}
                              >
                                Year
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="relative">
                          <div>
                            <img src="/images/projects/graph.png" alt="graph" />
                          </div>
                          <div className="absolute text-xs right-0">Today</div>
                          <div className="absolute left-20 text-xs top-0">
                            Total Generation daily :{" "}
                            {currentProject.dailyGeneration}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            onClick={() => {
              nextProject();
            }}
            className="absolute z-50 lg:hidden right-0 cursor-pointer top-8/12 transform -translate-y-1/2"
          >
            <svg
              width="52"
              height="52"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="#22c55e"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Right Side Project Card and Navigation */}
          <div className="hidden lg:block lg:fixed top-1/2  right-32 transform -translate-y-1/2 z-50">
            <div
              className="relative cursor-pointer group"
              onClick={nextProject}
            >
              <div
                style={{
                  transform: "skewX(-20deg)",
                }}
                className="w-52 h-48  overflow-hidden shadow-2xl"
              >
                <img
                  src={getNextProject().image}
                  alt={getNextProject().title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                style={{
                  transform: "skewX(-20deg)",
                }}
                className="w-44  absolute top-0 left-10 h-48  overflow-hidden shadow-2xl"
              >
                <div className="absolute inset-0 bg-gray-300 p-4  flex items-center justify-center">
                  <div
                    style={{
                      transform: "skewX(20deg)",
                    }}
                    className="text-black text-center "
                  >
                    <div className="text-xl font-bold">
                      {(() => {
                        const title = getNextProject().title || "";
                        const words = title.trim().split(/\s+/);

                        // If more than 6 words, don't render
                        if (words.length > 6) return null;

                        // Limit to 3 words per line, 2 lines max
                        const firstLine = words.slice(0, 3).join(" ");
                        const secondLine = words.slice(3, 6).join(" ");

                        return (
                          <div className="text-center leading-tight">
                            <div>{firstLine}</div>
                            {secondLine && <div>{secondLine}</div>}
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-12 top-1/2 transform -translate-y-1/2">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="#22c55e"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block lg:fixed right-2 bottom-28 z-40 cursor-pointer">
          <img src="/images/projects/letStart.png" alt="Let's Start" />
        </div>
        <div className="lg:block hidden">
          <Chatbot />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Project;
