"use client";
import React from "react";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";
import { useProjects } from "../../../hooks/useProjects";
import LetsStart from "./Modals/LetsStart";

const Project = () => {
  const [isProjectsOpen, setIsProjectsOpen] = React.useState(true);
  const [currentProjectIndex, setCurrentProjectIndex] = React.useState(0);
  const [isDesktop, setIsDesktop] = React.useState(false);
  const [isStartOpen, setIsStartOpen] = React.useState(false);
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

            {/* Left (previous) preview */}
            <button
              type="button"
              onClick={prevProject}
              aria-label="Previous project"
              className="group fixed left-4 top-1/2 z-50 hidden -translate-y-1/2 cursor-pointer items-center gap-3 lg:flex xl:left-10"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/90 text-[#23B14D] shadow-lg transition group-hover:scale-110 group-hover:bg-white">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18L9 12L15 6" />
                </svg>
              </span>
              <div
                style={{ transform: "skewX(-10deg)" }}
                className="relative h-44 w-40 overflow-hidden shadow-2xl ring-1 ring-white/30 xl:w-48"
              >
                <img
                  src={getPrevProject().image}
                  alt={getPrevProject().title}
                  className="h-full w-full scale-110 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div
                  style={{ transform: "skewX(10deg)" }}
                  className="absolute inset-x-0 bottom-0 p-3"
                >
                  <span className="line-clamp-2 block text-center text-sm font-bold leading-tight text-white drop-shadow">
                    {getPrevProject().title}
                  </span>
                </div>
              </div>
            </button>
          </div>
          <button
            type="button"
            onClick={prevProject}
            aria-label="Previous project"
            className="fixed left-2 top-1/2 z-50 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#23B14D] shadow-lg lg:hidden"
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18L9 12L15 6" />
            </svg>
          </button>
          {/* Center Stage */}
          <div className="relative flex-1 flex flex-col items-center justify-center min-h-screen px-4 py-24 lg:py-12">
            {/* Background project image — kept behind the content */}
            <div className="absolute inset-y-6 inset-x-2 lg:inset-y-10 lg:inset-x-[12%] -z-10 flex">
              <div
                style={{ transform: isDesktop ? "skewX(-4deg)" : "skewX(-8deg)" }}
                className="relative w-full overflow-hidden shadow-2xl"
              >
                <img
                  src={currentProject.image}
                  alt={currentProject.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />
              </div>
            </div>

            {/* Foreground content */}
            <div className="relative z-10 flex w-full max-w-3xl flex-col items-center">
              {/* Title */}
              <div
                style={{ transform: "skewX(-12deg)" }}
                className="bg-white/25 px-6 lg:px-10 py-3 shadow-lg backdrop-blur-sm"
              >
                <div
                  style={{ transform: "skewX(12deg)" }}
                  className="text-center text-2xl font-black leading-tight text-white lg:text-4xl"
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
              </div>
              {/* Expand / collapse toggle */}
              <button
                type="button"
                onClick={toggleProjects}
                aria-label={
                  isProjectsOpen
                    ? "Collapse project details"
                    : "Expand project details"
                }
                className="my-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-lg transition hover:scale-110 hover:bg-white"
              >
                <svg
                  className={`h-6 w-6 transition-transform duration-300 ${
                    isProjectsOpen ? "" : "rotate-180"
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 15L12 9L6 15" />
                </svg>
              </button>
                  {isProjectsOpen && (
                    <div
                      style={{
                        transform: isDesktop ? "skewX(-8deg)" : "skewX(-10deg)",
                      }}
                      className="mt-2 w-full flex flex-col bg-black/60 p-6 lg:p-10 relative z-50 space-y-6 shadow-2xl text-white"
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
          <button
            type="button"
            onClick={nextProject}
            aria-label="Next project"
            className="fixed right-2 top-1/2 z-50 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#23B14D] shadow-lg lg:hidden"
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18L15 12L9 6" />
            </svg>
          </button>

          {/* Right (next) preview */}
          <button
            type="button"
            onClick={nextProject}
            aria-label="Next project"
            className="group fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 cursor-pointer items-center gap-3 lg:flex xl:right-10"
          >
            <div
              style={{ transform: "skewX(-10deg)" }}
              className="relative h-44 w-40 overflow-hidden shadow-2xl ring-1 ring-white/30 xl:w-48"
            >
              <img
                src={getNextProject().image}
                alt={getNextProject().title}
                className="h-full w-full scale-110 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div
                style={{ transform: "skewX(10deg)" }}
                className="absolute inset-x-0 bottom-0 p-3"
              >
                <span className="line-clamp-2 block text-center text-sm font-bold leading-tight text-white drop-shadow">
                  {getNextProject().title}
                </span>
              </div>
            </div>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/90 text-[#23B14D] shadow-lg transition group-hover:scale-110 group-hover:bg-white">
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18L15 12L9 6" />
              </svg>
            </span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsStartOpen(true)}
          className="hidden lg:block lg:fixed right-2 bottom-28 z-40 cursor-pointer"
        >
          <img src="/images/projects/letStart.png" alt="Let's Start" />
        </button>
        <div className="lg:block hidden">
          <Chatbot />
        </div>
      </div>
      <LetsStart isOpen={isStartOpen} onClose={() => setIsStartOpen(false)} />
    </React.Fragment>
  );
};

export default Project;
