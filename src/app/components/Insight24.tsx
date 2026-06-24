"use client";
import React, { useState, useEffect } from "react";
import Navigation from "./Navigation/Navigation";
import Link from "next/link";
import TopNavigation from "./TopNavigation/TopNavigation";
import Chatbot from "./Chatbot";

type NavigationProps = {
  items: {
    name: string;
    link: string;
  }[];
};
interface Props {
  backroundImg: string;
  navigation: NavigationProps;
  title: string;
  subheadline: string;
  italic?: boolean;
  description: React.ReactNode;
  name1: string;
  name2: string;
  cardTitle: string;
  keypoints1: { icon: string; text: React.ReactNode }[];
  keypoints2: { icon: string; text: React.ReactNode }[];
}
const Insight24: React.FC<Props> = ({
  navigation,
  title,
  subheadline,
  description,
  name1,
  name2,
  cardTitle,
  backroundImg,
  italic,
  keypoints1,
  keypoints2,
}) => {


  return (
    <React.Fragment>
      <TopNavigation/>
      <div
        className={`w-full overflow-x-hidden`}
      >
        <div className="absolute top-0 lg:block hidden right-0 -z-10">
        <img
          src={backroundImg}
          className="h-screen"
          alt="lgImg"
        />
      </div>
        <div className=" lg:ml-58 relative z-20 ml-10 md:ml-32 md:mt-10  mt-10 lg:mt-10">
          <div className=" text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl uppercase font-black">
            {name1} <span className=" text-[#23B14D]">{name2}</span>
          </div>
          <div className="md:hidden my-10 mt-4 ">
            <div
             style={{
              transform: 'skewX(-16deg)',
             }}
            className="transform w-[290px] px-1 py-2 bg-white/20 shadow-sm  text-2xl">
              <span className="text-green-600">"</span>
              <span className="ml-2">{cardTitle}</span>
              <span className="text-green-600 ">"</span>
            </div>
          </div>
          <div className="my-4 lg:my-8 2xl:my-10">
            <div className="text-2xl  lg:text-4xl 2xl:text-5xl  uppercase font-semibold">
              {title}
            </div>

            <div
              className={`text-2xl  lg:text-4xl 2xl:text-5xl mt-3  uppercase font-semibold text-[#23B14D] ${
                italic ? "italic" : ""
              }`}
            >
              {subheadline}
            </div>
            <div className="my-12 2xl:my-10">
              <div className="text-lg lg:text-[25px]">{description}</div>
            </div>
          </div>
       
          <div className="lg:-ml-10 mt-8 lg:mt-4 2xl:mt-24">
            <div className="grid my-8 lg:grid-cols-[2.2fr_1fr] gap-5 2xl:gap-10">
              <div>
                <div className="grid  lg:grid-cols-2 gap-4 lg:gap-5  2xl:gap-10">
                  {keypoints1.map((point, index) => (
                    <div
                      key={index}
                      className="flex  lg:justify-center 2xl:text-center space-x-2 lg:space-x-4"
                      style={{ minWidth: "0" }}
                    >
                      <div className="w-14 lg:w-20  2xl:w-24 flex-shrink-0">
                        <img
                          src={point.icon}
                          alt={`icon${index + 1}`}
                          className="w-full h-auto"
                        />
                      </div>
                      <div className="text-lg 2xl:text-2xl break-words">
                        {point.text}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="lg:-ml-32  my-8 lg:my-10 2xl:my-20 grid lg:grid-cols-2 gap-5 md:gap-10">
                  {keypoints2.map((point, index) => (
                    <div
                      key={index}
                      className="flex  lg:justify-center 2xl:text-center space-x-2 lg:space-x-4"
                      style={{ minWidth: "0" }}
                    >
                      <div className="w-14  lg:w-20  2xl:w-24 flex-shrink-0">
                        <img
                          src={point.icon}
                          alt={`icon${index + 1}`}
                          className="w-full h-auto"
                        />
                      </div>
                      <div className="text-lg 2xl:text-2xl break-words">
                        {point.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:block hidden">
                <div
                 style={{
                  transform: 'skewX(-22deg)',
                 }}
                className="transform w-full max-w-[360px] 2xl:max-w-[420px] p-6 bg-white/20 shadow-sm text-3xl 2xl:text-4xl">
                  <span className="text-green-600">"</span>
                  <span className="ml-2">{cardTitle}</span>
                  <span className="text-green-600 ">"</span>
                </div>
              </div>
            </div>
          </div>
        </div>
       <Chatbot/>
      
      </div>

     
    </React.Fragment>
  );
};

export default Insight24;
