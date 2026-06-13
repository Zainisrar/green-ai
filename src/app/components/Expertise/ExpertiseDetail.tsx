"use client";
import React, { useState } from "react";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";
import { useExpertiseBySlug } from "../../../hooks/useExpertiseBySlug";
import Link from "next/link";

interface ExpertiseDetailProps {
  slug: string;
}

const ExpertiseDetail = ({ slug }: ExpertiseDetailProps) => {
  const { data: expertise } = useExpertiseBySlug(slug);

  if (!expertise) {
    return null;
  }
  return (
    <React.Fragment>
      <div className="relative lg:mb-0 mb-40">
        <TopNavigation />

        {/* Background */}
        <div className="absolute inset-0 w-full overflow-hidden -z-10">
          <img
            src="/images/expertise/img.png"
            className="object-cover w-full h-full opacity-30"
            alt="mainBg"
          />
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1  lg:grid-cols-2 gap-8 pt-20 px-8">
          {/* Left Side - Images */}
          <div className="flex items-center justify-center">
            <div className="relative w-[400px] lg:block hidden">
              <StackedImages
                images={expertise.carousel.map((item) => item.img.src)}
              />
            </div>
            <div className="relative w-[400px] lg:hidden">
              <StackedMobileImages
                images={expertise.carousel.map((item) => item.img.src)}
              />
            </div>
          </div>

          {/* Right Side - Text Content */}
          <div className="flex flex-col justify-center">
            <div className="max-w-2xl">
              <div className="font-bold text-3xl lg:text-4xl">
                {expertise.title.split(" ")[0]} {` `}
                <span className="text-[#23B14D] font-bold">
                  {expertise.highlightedTitle}
                </span>
              </div>
              <div className="text-[#23B14D] font-medium text-xl lg:text-2xl mt-4">
                {expertise.subtitlePage}
              </div>
              <div className="mt-6 text-base lg:text-lg font-light">
                {expertise.descriptionPage}
              </div>

              {/* Features Grid */}
              <div className="mt-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {expertise.icons.map((icon, index) => (
                    <div key={index} className="flex space-x-4">
                      <div>
                        <img
                          src={icon.img.src}
                          alt={icon.img.alt}
                          className="w-28 lg:w-32"
                        />
                      </div>
                      <div className="flex flex-col space-y-2">
                        <div className="font-semibold text-base lg:text-lg">
                          {icon.title}
                        </div>
                        <div className="text-sm lg:text-base">
                          {icon.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Elements */}

        <div className="fixed top-1/3 lg:top-1/4 z-10 left-4 lg:left-10">
          <img
            src="/images/expertise/SOLUTIONS.png"
            className="w-7 lg:w-12"
            alt="solution"
          />
        </div>
        <div className="">
          <Link href={`#`} className="flex justify-end cursor-pointer">
            <img
              src="/images/expertise/letStartBtn.png"
              alt="letStart"
              className="w-32 lg:w-auto"
            />
          </Link>
          <Chatbot />
          {/* Categories Text Section */}
          <div className="hidden lg:flex my-20 mt-32 justify-center">
            <div className="flex relative w-full top-12 left-4 justify-end max-w-2xl">
              <div className="absolute left-0 -top-10">
                <img
                  src={expertise.image}
                  alt="expertise"
                  className="rounded-2xl w-32 h-32 object-cover"
                />
              </div>
              {expertise.keys.map((key, index) => (
                <div
                  key={index}
                  className={`absolute bg-gray-100 py-20 -top-20 shadow-2xl rounded-md`}
                  style={{ left: `${200 + index * 130}px` }}
                >
                  <div className="transform -rotate-90 font-bold text-gray-800 whitespace-nowrap">
                    {key.text.split(" ").map((word, wordIndex) => (
                      <React.Fragment key={wordIndex}>
                        {word}
                        {wordIndex === 0 && <br />}
                        {wordIndex > 0 &&
                          wordIndex < key.text.split(" ").length - 1 &&
                          " "}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ExpertiseDetail;

const StackedMobileImages = ({ images }: { images: string[] }) => {
  const [front, setFront] = useState(0);
  return (
    <div className=" lg:hidden relative left-32 -top-20 w-[200px] h-[300px] ">
      {images.map((src, i) => {
        const isFront = i === front;
        const isSecond = i === (front + 1) % images.length;
        const isThird = i === (front + 2) % images.length;
        let style = {};
        let className =
          "  absolute transition-transform duration-500 ease-in-out  ";
        if (isFront) {
          style = {
            width: 250,
            height: 350,
            opacity: 1,
            left: 0,
            zIndex: 40,
            transform: "skewX(-14deg)",
          };
        } else if (isSecond) {
          style = {
            width: 200,
            height: 300,
            opacity: 1,
            paddingTop: 20,
            left: -20,
            zIndex: 30,
            transform: "skewX(-14deg)",
          };
        } else if (isThird) {
          style = {
            width: 200,
            height: 300,
            opacity: 0.3,
            paddingTop: 32,
            left: -60,
            zIndex: 20,
            transform: "skewX(-14deg)",
          };
        } else {
          style = { display: "none" };
        }
        return (
          <img
            key={i}
            src={src}
            alt={`detail-${i}`}
            className={className}
            style={style}
          />
        );
      })}
    </div>
  );
};

const StackedImages = ({ images }: { images: string[] }) => {
  const [front, setFront] = useState(0);

  return (
    <React.Fragment>
      <div className="w-full h-full flex items-center justify-center relative">
        {images.map((src, i) => {
          const isFront = i === front;
          const isSecond = i === (front + 1) % images.length;
          const isThird = i === (front + 2) % images.length;
          let style = {};
          let className =
            "absolute  transition-transform duration-500 ease-in-out  ";
          if (isFront) {
            style = {
              width: 400,
              height: 650,
              opacity: 1,
              left: 0,
              zIndex: 40,
              transform: "skewX(-14deg)",
            };
          } else if (isSecond) {
            style = {
              width: 300,
              height: 600,
              opacity: 1,
              paddingTop: 20,
              left: -40,
              zIndex: 30,
              transform: "skewX(-14deg)",
            };
          } else if (isThird) {
            style = {
              width: 300,
              height: 550,
              opacity: 0.3,
              paddingTop: 32,
              left: -100,
              zIndex: 20,
            };
          } else {
            style = { display: "none" };
          }
          return (
            <img
              key={i}
              src={src}
              alt={`detail-${i}`}
              className={className}
              style={style}
            />
          );
        })}
        <div className=" absolute top-86 -left-10 z-50">
          <div className="flex space-x-4 items-center">
            {images.map((image, index) => (
              <div
                key={index}
                onClick={() => setFront(index)}
                className="cursor-pointer"
              >
                <img
                  style={{
                    transform: "skewX(-16deg)",
                  }}
                  className={`w-24  ${
                    front === index
                      ? "border-2 p-1 border-[#23B14D]"
                      : "opacity-50"
                  }`}
                  src={image}
                  alt={`thumbnail-${index}`}
                />
              </div>
            ))}
          </div>
        </div>
        <div className=" absolute flex space-x-10  -right-20 top-40 z-50">
          <button
            className=" cursor-pointer"
            onClick={() =>
              setFront((front - 1 + images.length) % images.length)
            }
            aria-label="Previous"
          >
            <img src="/images/expertise/leftarrow.svg" alt="left" />
          </button>
          <button
            className="cursor-pointer"
            onClick={() => setFront((front + 1) % images.length)}
            aria-label="Next"
          >
            <img src="/images/expertise/rightarrow.svg" alt="right" />
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};
