"use client";
import React, { useEffect } from "react";
import Navigation from "./Navigation/Navigation";
import TopNavigation from "./TopNavigation/TopNavigation";
import Chatbot from "./Chatbot";

type NavigationProps = {
  items: {
    name: string;
    link: string;
  }[];
};
type Keypoint = {
  icon: string;
  text: React.ReactNode;
};
interface Props {
  backgroundImg: string;
  navigation: NavigationProps;
  title: string;
  subheadline: string;
  description: string;
  name1: string;
  name2: string;
  bgImg?: string;
  cardTitle: string;
  keypoints: Keypoint[];
}
const Insight1: React.FC<Props> = ({
  navigation,
  backgroundImg,
  name1,
  name2,
  cardTitle,
  title,
  subheadline,
  description,
  bgImg,
  keypoints,
}) => {
  const [isMobile, setIsMobile] = React.useState(false);
  const [navOpen, setNavOpen] = React.useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Example breakpoint for mobile
    };
    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <React.Fragment>
      <TopNavigation/>
      <div
        className={`   `}
      >
         <div className="absolute top-0 lg:block hidden left-0 -z-10">
        <img
          src={bgImg}
          className="h-screen "
          alt="lgImg"
        />
      </div>
        <div className="grid lg:grid-cols-2 relative z-20 px-4 ">
          <div className="  lg:ml-72  md:ml-52 lg:mt-20 " >
            <div className=" uppercase lg:text-6xl text-center md:text-left lg:mt-0 mt-28  text-4xl  font-black lg:ml-10 pb-2">
              {name1} {` `}
              <span className="lg:hidden inline text-green-600">{name2}</span>
            </div>
            <div className=" uppercase lg:text-6xl hidden lg:block font-black tracking-wide text-green-600">
              {name2}
            </div>
            <div className=" my-8 md:hidden lg:block 2xl:ml-6  lg:my-32">
              <div
              style={{
                transform: 'skewX(-22deg)',
              }}
              className="transform   w-[300px]   lg:w-[360px] 2xl:w-[420px] p-6 bg-white/20 shadow-sm  text-2xl lg:text-3xl 2xl:text-4xl">
                <span className="text-green-600">"</span>
                <span className="ml-2">
                  {cardTitle.split(':').map((part, index, array) => (
                  <React.Fragment key={index}>
                    {part.trim()}
                    {index < array.length - 1 && (
                    <>
                      :<br />
                    </>
                    )}
                  </React.Fragment>
                  ))}
                </span>
                <span className="text-green-600 ">"</span>
              </div>
            </div>
          </div>
          <div className="mt-8 md:mt-10  lg:mt-12">
            <div className="uppercase text-3xl lg:text-4xl 2xl:text-[42px] font-bold">
              {title}
            </div>
            <div className=" uppercase text-2xl lg:text-2xl 2xl:text-4xl font-bold italic my-6 text-[#23B14D]">
              {subheadline}
            </div>
            <p className="  text-lg lg:text-xl 2xl:text-[25px]">
              {description}
            </p>
            <div className="mt-8 lg:mt-4  mb-10 lg:mb-0 grid lg:grid-cols-2 lg:gap-y-8 gap-10">
              {keypoints.map((point, index) => (
                <div
                  key={index}
                  className=" flex  items-center lg:justify-center lg:text-center lg:flex-col space-x-4 lg:space-x-0 lg:space-y-2 md:space-y-4"
                >
                  <img
                    src={point.icon}
                    alt={`icon${index + 1}`}
                    className="w-14 lg:w-14 2xl:w-24"
                  />
                  <div className="2xl:text-lg">{point.text}</div>
                </div>
              ))}
            </div>
              <div className=" my-8  md:block hidden lg:hidden ">
              <div
              style={{
                transform: 'skewX(-22deg)',
              }}
              className="transform  w-[300px]   lg:w-[360px] 2xl:w-[420px] p-6 bg-white/20 shadow-sm  text-2xl lg:text-3xl 2xl:text-4xl">
                <span className="text-green-600">"</span>
                <span className="ml-2">
                  {cardTitle.split(':').map((part, index, array) => (
                  <React.Fragment key={index}>
                    {part.trim()}
                    {index < array.length - 1 && (
                    <>
                      :<br />
                    </>
                    )}
                  </React.Fragment>
                  ))}
                </span>
                <span className="text-green-600 ">"</span>
              </div>
            </div>
          </div>
        </div>
        <Chatbot/>
      </div>
   
    </React.Fragment>
  );
};

export default Insight1;
