"use client";
import React from "react";
import { useScreen } from "@/hooks/useScreen";
import D6Chatbot from "./D6Chatbot";
import { useNavigation } from "@/app/hooks/useNavigation";
import { useNavigationState } from "@/hooks/useNavigationState";
import Navigation from "./Navigation/Navigation";
import Link from "next/link";
import D6TopNavigation from "./d6TopNav";
import { useHomeBySlug } from "@/hooks/useHomeBySlug";
import { notFound } from "next/navigation";
import NotFound from "../not-found";

interface D6TemplateProps {
  slug: string;
}

const D6Template = ({ slug }: D6TemplateProps) => {
  const screen = useScreen();
  const { isNavigationOpen, openNavigation, closeNavigation } =
    useNavigationState();

  const { navigationData, activeSection, setActiveSection, featuredChild } =
    useNavigation(isNavigationOpen);

  // Fetch home data by slug
  const { data: homeData, isLoading } = useHomeBySlug(slug);

  // Console log the data
  React.useEffect(() => {
    if (homeData) {
      console.log("Home Data:", homeData);
    }
  }, [homeData]);

  // Handle 404 - if data is null after loading
  React.useEffect(() => {
    if (!isLoading && homeData === null) {
      notFound();
    }
  }, [homeData, isLoading]);

  const desktop = [
    {
      size: screen.is1366x768,
      greenClasses: {
        g: "relative left-6 z-50  top-8/12",
        gText: "absolute left-6 z-50  top-[40%]",
        r: "relative left-40 z-50  top-8/12",
        rText: `absolute left-72 z-50 ${
          homeData?.text2.description ? "top-[32%]" : "top-[40%]"
        } `,
        e1: "relative left-90 z-50  top-8/12",
        e1Text: `absolute left-150 z-50   ${
          homeData?.text3.description ? "top-[34%]" : "top-[40%]"
        }`,
        e2: "relative left-130 z-50  top-8/12",
        e2Text: `absolute left-220 z-50  ${
          homeData?.text4.description ? "top-[26%]" : "top-[40%]"
        }`,
        n: "relative left-180 z-50  top-8/12",
        nText: `absolute  z-50  ${
          homeData?.text5.description
            ? "top-[24%] left-282"
            : "left-290 top-[40%]"
        }`,
      },
      images: [
        {
          src: "/images/d6/D6-Page-1/1.png",
          alt: "1",
          position: "absolute -left-60",
        },
        {
          src: "/images/d6/D6-Page-1/2.png",
          alt: "2",
          position: "absolute right-0 top-0",
        },
        {
          src: "/images/d6/D6-Page-1/3.png",
          alt: "3",
          position: "absolute -left-10 -z-20",
        },
        {
          src: "/images/d6/D6-Page-1/4.png",
          alt: "4",
          position: "absolute right-0 top-0",
        },
        {
          src: "/images/d6/D6-Page-1/5.png",
          alt: "5",
          position: "absolute left-90 -z-20",
        },
        {
          src: "/images/d6/D6-Page-1/6.png",
          alt: "6",
          position: "absolute right-0 top-0",
        },
        {
          src: "/images/d6/D6-Page-1/7.png",
          alt: "7",
          position: "absolute left-160 -z-30",
        },
        {
          src: "/images/d6/D6-Page-1/8.png",
          alt: "8",
          position: "absolute right-0 top-0",
        },
        {
          src: "/images/d6/D6-Page-1/9.png",
          alt: "9",
          position: "absolute left-240 -z-40",
        },
      ],
    },
    {
      size: screen.is1440x900,
      greenClasses: {
        g: "relative left-16 z-50  top-8/12",
        gText: "absolute left-16 z-50  top-[40%]",

        r: "relative left-58 z-50  top-8/12",
        rText: `absolute left-96 z-50 ${
          homeData?.text2.description ? "top-[32%]" : "top-[40%]"
        } `,
        e1: "relative left-110 z-50  top-8/12",
        e1Text: `absolute left-170 z-50   ${
          homeData?.text3.description ? "top-[34%]" : "top-[40%]"
        }`,
        e2: "relative left-150 z-50  top-8/12",
        e2Text: `absolute left-245 z-50  ${
          homeData?.text4.description ? "top-[26%]" : "top-[40%]"
        }`,
        n: "relative left-190 z-50  top-8/12",
        nText: `absolute left-315 z-50  ${
          homeData?.text5.description ? "top-[32%]" : "top-[40%]"
        }`,
      },
      images: [
        {
          src: "/images/d6/D6-Page-1/1.png",
          alt: "1",
          position: "absolute -left-60",
        },
        {
          src: "/images/d6/D6-Page-1/2.png",
          alt: "2",
          position: "absolute right-0 top-0 ",
        },
        {
          src: "/images/d6/D6-Page-1/3.png",
          alt: "3",
          position: "absolute -left-10 -z-20",
        },
        {
          src: "/images/d6/D6-Page-1/4.png",
          alt: "4",
          position: "absolute right-0  z-40 top-0",
        },
        {
          src: "/images/d6/D6-Page-1/5.png",
          alt: "5",
          position: "absolute left-95 -z-10",
        },
        {
          src: "/images/d6/D6-Page-1/6.png",
          alt: "6",
          position: "absolute right-0 top-0",
        },
        {
          src: "/images/d6/D6-Page-1/7.png",
          alt: "7",
          position: "absolute left-160 -z-30",
        },
        {
          src: "/images/d6/D6-Page-1/8.png",
          alt: "8",
          position: "absolute right-0 top-0",
        },
        {
          src: "/images/d6/D6-Page-1/9.png",
          alt: "9",
          position: "absolute left-200 -z-40",
        },
      ],
    },

    {
      size: screen.is1280x800,
      greenClasses: {
        g: "relative left-8 z-50  top-8/12",
        gText: "absolute left-12 z-50  top-[40%]",
        r: "relative left-52 z-50  top-8/12",
        rText: `absolute left-74 z-50 ${
          homeData?.text2.description ? "top-[32%]" : "top-[40%]"
        } `,
        e1: "relative left-80 z-50  top-8/12",
        e1Text: `absolute left-140 z-50   ${
          homeData?.text3.description ? "top-[34%]" : "top-[40%]"
        }`,
        e2: "relative left-120 z-50  top-8/12",
        e2Text: `absolute left-215 z-50  ${
          homeData?.text4.description ? "top-[26%]" : "top-[40%]"
        }`,
        n: "relative left-160 z-50  top-8/12",
        nText: `absolute left-280 z-50  ${
          homeData?.text5.description ? "top-[32%]" : "top-[40%]"
        }`,
      },
      images: [
        {
          src: "/images/d6/D6-Page-1/1.png",
          alt: "1",
          position: "absolute -left-60",
        },
        {
          src: "/images/d6/D6-Page-1/2.png",
          alt: "2",
          position: "absolute right-0 top-0 ",
        },
        {
          src: "/images/d6/D6-Page-1/3.png",
          alt: "3",
          position: "absolute -left-10 -z-20",
        },
        {
          src: "/images/d6/D6-Page-1/4.png",
          alt: "4",
          position: "absolute right-0  z-40 top-0",
        },
        {
          src: "/images/d6/D6-Page-1/5.png",
          alt: "5",
          position: "absolute left-80 -z-10",
        },
        {
          src: "/images/d6/D6-Page-1/6.png",
          alt: "6",
          position: "absolute right-0 top-0",
        },
        {
          src: "/images/d6/D6-Page-1/7.png",
          alt: "7",
          position: "absolute left-140 -z-30",
        },
        {
          src: "/images/d6/D6-Page-1/8.png",
          alt: "8",
          position: "absolute right-0 top-0",
        },
        {
          src: "/images/d6/D6-Page-1/9.png",
          alt: "9",
          position: "absolute left-210 -z-40",
        },
      ],
    },

    {
      size: screen.is1512x982,
      greenClasses: {
        g: "relative left-8 z-50  top-8/12",
        gText: "absolute left-12 z-50  top-[40%]",

        r: "relative left-52 z-50  top-8/12",
        rText: `absolute left-92 z-50 ${
          homeData?.text2.description ? "top-[32%]" : "top-[40%]"
        } `,
        e1: "relative left-110 z-50  top-8/12",
        e1Text: `absolute left-170 z-50   ${
          homeData?.text3.description ? "top-[34%]" : "top-[40%]"
        }`,
        e2: "relative left-160 z-50  top-8/12",
        e2Text: `absolute left-255 z-50  ${
          homeData?.text4.description ? "top-[26%]" : "top-[40%]"
        }`,
        n: "relative left-200 z-50  top-8/12",
        nText: `absolute left-330 z-50  ${
          homeData?.text5.description ? "top-[32%]" : "top-[40%]"
        }`,
      },
      images: [
        {
          src: "/images/d6/D6-Page-1/1.png",
          alt: "1",
          position: "absolute -left-80",
        },
        {
          src: "/images/d6/D6-Page-1/2.png",
          alt: "2",
          position: "absolute right-0 top-0 ",
        },
        {
          src: "/images/d6/D6-Page-1/3.png",
          alt: "3",
          position: "absolute -left-10 -z-20",
        },
        {
          src: "/images/d6/D6-Page-1/4.png",
          alt: "4",
          position: "absolute right-0  z-40 top-0",
        },
        {
          src: "/images/d6/D6-Page-1/5.png",
          alt: "5",
          position: "absolute left-90 -z-10",
        },
        {
          src: "/images/d6/D6-Page-1/6.png",
          alt: "6",
          position: "absolute right-0 top-0",
        },
        {
          src: "/images/d6/D6-Page-1/7.png",
          alt: "7",
          position: "absolute left-160 -z-30",
        },
        {
          src: "/images/d6/D6-Page-1/8.png",
          alt: "8",
          position: "absolute -right-0 top-0",
        },
        {
          src: "/images/d6/D6-Page-1/9.png",
          alt: "9",
          position: "absolute left-220 -z-40",
        },
      ],
    },

    {
      size: screen.is1792x1120,
      greenClasses: {
        g: "relative left-18 z-50  top-8/12",
        gText: "absolute left-12 z-50  top-[40%]",
        r: "relative left-82 z-50  top-8/12",
        rText: `absolute left-112 z-50 ${
          homeData?.text2.description ? "top-[32%]" : "top-[40%]"
        } `,
        e1: "relative left-150 z-50  top-8/12",
        e1Text: `absolute left-210 z-50   ${
          homeData?.text3.description ? "top-[34%]" : "top-[40%]"
        }`,
        e2: "relative left-220 z-50  top-8/12",
        e2Text: `absolute left-315 z-50  ${
          homeData?.text4.description ? "top-[26%]" : "top-[40%]"
        }`,
        n: "relative left-280 z-50  top-8/12",
        nText: `absolute left-390 z-50  ${
          homeData?.text5.description ? "top-[32%]" : "top-[40%]"
        }`,
      },
      images: [
        {
          src: "/images/d6/D6-Page-1/1.png",
          alt: "1",
          position: "absolute -left-80",
        },
        {
          src: "/images/d6/D6-Page-1/2.png",
          alt: "2",
          position: "absolute right-0 top-0 ",
        },
        {
          src: "/images/d6/D6-Page-1/3.png",
          alt: "3",
          position: "absolute -left-0 -z-20",
        },
        {
          src: "/images/d6/D6-Page-1/4.png",
          alt: "4",
          position: "absolute right-0  z-40 top-0",
        },
        {
          src: "/images/d6/D6-Page-1/5.png",
          alt: "5",
          position: "absolute left-120 -z-10",
        },
        {
          src: "/images/d6/D6-Page-1/6.png",
          alt: "6",
          position: "absolute right-0 top-0",
        },
        {
          src: "/images/d6/D6-Page-1/7.png",
          alt: "7",
          position: "absolute left-200 -z-30",
        },
        {
          src: "/images/d6/D6-Page-1/8.png",
          alt: "8",
          position: "absolute -right-0 top-0",
        },
        {
          src: "/images/d6/D6-Page-1/9.png",
          alt: "9",
          position: "absolute left-260 -z-40",
        },
      ],
    },
    {
      size: screen.is1920x1080,
      greenClasses: {
        g: "relative left-0 z-50  top-8/12",
        gText: "absolute left-12 z-50  top-[40%]",
        r: "relative left-42 z-50  top-8/12",
        rText: `absolute left-80 z-50 ${
          homeData?.text2.description ? "top-[32%]" : "top-[40%]"
        } `,
        e1: "relative left-100 z-50  top-8/12",
        e1Text: `absolute left-200 z-50   ${
          homeData?.text3.description ? "top-[34%]" : "top-[40%]"
        }`,
        e2: "relative left-150 z-50  top-8/12",
        e2Text: `absolute left-280 z-50  ${
          homeData?.text4.description ? "top-[26%]" : "top-[40%]"
        }`,
        n: "relative left-200 z-50  top-8/12",
        nText: `absolute left-360 z-50  ${
          homeData?.text5.description ? "top-[32%]" : "top-[40%]"
        }`,
      },
      images: [
        {
          src: "/images/d6/D6-Page-1/1.png",
          alt: "1",
          position: "absolute -left-80",
        },
        {
          src: "/images/d6/D6-Page-1/2.png",
          alt: "2",
          position: "absolute right-0 top-0 ",
        },
        {
          src: "/images/d6/D6-Page-1/3.png",
          alt: "3",
          position: "absolute -left-0 -z-20",
        },
        {
          src: "/images/d6/D6-Page-1/4.png",
          alt: "4",
          position: "absolute right-0  z-40 top-0",
        },
        {
          src: "/images/d6/D6-Page-1/5.png",
          alt: "5",
          position: "absolute left-120 -z-10",
        },
        {
          src: "/images/d6/D6-Page-1/6.png",
          alt: "6",
          position: "absolute right-0 top-0",
        },
        {
          src: "/images/d6/D6-Page-1/7.png",
          alt: "7",
          position: "absolute left-200 -z-30",
        },
        {
          src: "/images/d6/D6-Page-1/8.png",
          alt: "8",
          position: "absolute -right-0 top-0",
        },
        {
          src: "/images/d6/D6-Page-1/9.png",
          alt: "9",
          position: "absolute left-260 -z-40",
        },
      ],
    },
  ];

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1030);
    };
    window.addEventListener("resize", checkMobile);
    checkMobile();
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  React.useEffect(() => {
  console.log("Laptop Screen Size:", window.screen.width, "x", window.screen.height);
  console.log("Device Pixel Ratio:", window.devicePixelRatio);
}, []);

  // Show desktop version for all non-mobile screens
  if (!isMobile) {
    // Get current screen width
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
    
    // Define width breakpoints for each config (sorted ascending)
    const breakpoints = [
      { minWidth: 0, maxWidth: 1366, config: desktop[0] },      // 1280x800 for screens < 1366
      { minWidth: 1366, maxWidth: 1440, config: desktop[1] },   // 1366x768 for 1366-1439
      { minWidth: 1440, maxWidth: 1512, config: desktop[2] },   // 1440x900 for 1440-1511
      { minWidth: 1512, maxWidth: 1792, config: desktop[3] },   // 1512x982 for 1512-1791
      { minWidth: 1792, maxWidth: 1920, config: desktop[4] },   // 1792x1120 for 1792-1919
      { minWidth: 1920, maxWidth: Infinity, config: desktop[5] }, // 1920x1080 for 1920+
    ];
    
    // Find the matching config based on screen width range
    const desktopConfig = breakpoints.find(
      bp => screenWidth >= bp.minWidth && screenWidth < bp.maxWidth
    )?.config || desktop[desktop.length - 1];
    
    return (
      <React.Fragment>
        <D6TopNavigation />
        <div className="relative flex overflow-hidden h-screen w-full">
          <div
            className={`${
              desktopConfig.greenClasses.gText
            } text-white text-2xl font-bold`}
          >
            {homeData?.text1.headline.split(" ").map((word, index) => (
              <div key={index}>{word}</div>
            ))}
          </div>
          <div className={desktopConfig.greenClasses.g}>
            <div>
              <img src="/images/d6/lgG.png" className="w-36" alt="" />
            </div>
          </div>
          <div
            className={`${
              desktopConfig.greenClasses.rText
            } text-white text-2xl font-bold`}
          >
            {(() => {
              const words = homeData?.text2?.headline?.split(" ") || [];

              // If id === 1 → group 2 words together, else 1 word per line
              const groupSize = homeData?.id === 1 ? 2 : 1;
              const groupedWords = [];

              for (let i = 0; i < words.length; i += groupSize) {
                groupedWords.push(words.slice(i, i + groupSize).join(" "));
              }

              return groupedWords.map((group, index) => (
                <div key={index}>{group}</div>
              ));
            })()}
            <div className="w-52 text-sm">{homeData?.text2.description}</div>
          </div>

          <div className={desktopConfig.greenClasses.r}>
            <div>
              <img src="/images/d6/lgR.png" className="w-36 " alt="" />
            </div>
          </div>
          <div
            className={`${
              desktopConfig.greenClasses.e1Text
            } text-white text-2xl font-bold`}
          >
            {(() => {
              const words = homeData?.text3?.headline?.split(" ") || [];

              const groupSize = homeData?.id === 2 ? 2 : 1;
              const groupedWords = [];

              for (let i = 0; i < words.length; i += groupSize) {
                groupedWords.push(words.slice(i, i + groupSize).join(" "));
              }

              return groupedWords.map((group, index) => (
                <div key={index}>{group}</div>
              ));
            })()}

            <div className="w-52 text-sm">{homeData?.text3.description}</div>
          </div>
          <div className={desktopConfig.greenClasses.e1}>
            <div>
              <img src="/images/d6/lgE.png" className="w-36 " alt="" />
            </div>
          </div>
          <div
            className={`${
              desktopConfig.greenClasses.e2Text
            } text-white text-xl font-bold`}
          >
            {(() => {
              const words = homeData?.text4?.headline?.split(" ") || [];

              const groupSize = homeData?.id === 3 ? 2 : 1;
              const groupedWords = [];

              for (let i = 0; i < words.length; i += groupSize) {
                groupedWords.push(words.slice(i, i + groupSize).join(" "));
              }

              return groupedWords.map((group, index) => (
                <div key={index}>{group}</div>
              ));
            })()}

            <div className="w-52 text-xs mt-2">
              {homeData?.text4.description}
            </div>
          </div>
          <div className={desktopConfig.greenClasses.e2}>
            <div>
              <img src="/images/d6/lgE.png" className="w-36 " alt="" />
            </div>
          </div>
          <div className={desktopConfig.greenClasses.n}>
            <div>
              <img src="/images/d6/lgN.png" className="w-36 " alt="" />
            </div>
          </div>
          <div
            className={`${
              desktopConfig.greenClasses.nText
            } text-white text-2xl font-bold`}
          >
            {(() => {
              const words = homeData?.text5?.headline?.split(" ") || [];

              const groupSize = homeData?.id === 4 ? 3 : 1;
              const groupedWords: string[] = [];

              for (let i = 0; i < words.length; i += groupSize) {
                groupedWords.push(words.slice(i, i + groupSize).join(" "));
              }

              return groupedWords.map((group, index) => (
                <div key={index}>{group}</div>
              ));
            })()}

            <div className="w-52 text-xs">{homeData?.text5.description}</div>
          </div>
          <div className={desktopConfig.images[0].position}>
            <img
              src="/images/d6/D6-Page-1/1.png"
              alt="1"
              className="h-screen w-auto object-cover"
            />
            <div className={desktopConfig.images[1].position}>
              <img
                src="/images/d6/D6-Page-1/2.png"
                alt="2"
                className="h-screen w-auto object-cover"
              />
            </div>
          </div>
          <div className={desktopConfig.images[2].position}>
            <img
              src="/images/d6/D6-Page-1/3.png"
              alt="3"
              className="h-screen w-auto object-cover"
            />
            <div className={desktopConfig.images[3].position}>
              <img
                src="/images/d6/D6-Page-1/4.png"
                alt="4"
                className="h-screen w-auto object-cover"
              />
            </div>
          </div>
          <div className={desktopConfig.images[4].position}>
            <img
              src="/images/d6/D6-Page-1/5.png"
              alt="5"
              className="h-screen w-auto object-cover"
            />
            <div className={desktopConfig.images[5].position}>
              <img
                src="/images/d6/D6-Page-1/6.png"
                alt="6"
                className="h-screen w-auto object-cover"
              />
            </div>
          </div>
          <div className={desktopConfig.images[6].position}>
            <img
              src="/images/d6/D6-Page-1/7.png"
              className="h-screen w-auto object-cover"
              alt="7"
            />
            <div className={desktopConfig.images[7].position}>
              <img
                src="/images/d6/D6-Page-1/8.png"
                alt="8"
                className="h-screen w-auto object-cover"
              />
            </div>
          </div>
          <div className={desktopConfig.images[8].position}>
            <img
              src="/images/d6/D6-Page-1/9.png"
              style={{ transform: "skewX(-20deg)" }}
              className="h-screen object-cover"
              alt="9"
            />
          </div>
        </div>
        <D6Chatbot />
      </React.Fragment>
    );
  }
  if (isMobile) {
    return (
      <React.Fragment>
        <div>
          <div className="">
            <div className="mt-2 flex justify-between px-4">
              <div>
                <img src="/images/d6/logo.png" alt="" />
              </div>
              <div className="flex items-center space-x-4">
                <div>
                  <img src="/images/d6/arr.png" alt="" />
                </div>
                <Link href={"/explore"}>Explore</Link>
                <div>
                  <img src="/images/d6/break.png" alt="" />
                </div>
                <Link href={"/energy"}>Energy</Link>
                <div>
                  <img src="/images/d6/arr2.png" alt="" />
                </div>
              </div>
            </div>
            <div className="mt-4 ">
              <div>
                <img src="/images/d6/greenFuture.png" alt="" />
              </div>
            </div>
            <div onClick={openNavigation} className="mt-4 ml-4 cursor-pointer">
              <img src="/images/d6/moreDetails.png" alt="" className="w-24" />
            </div>
            <div className="flex ml-4">
              <div className="mt-28  ">
                <img src="/images/d6/r.png" alt="" />
              </div>
              <div className="mt-10 ml-10">
                <img src="/images/d6/aboutGreen.png" alt="" />
              </div>
            </div>
            <div className="flex ml-4">
              <div className="mt-24  ">
                <img src="/images/d6/e.png" alt="" />
              </div>
              <div className="mt-0 ml-10">
                <img src="/images/d6/productSolutions.png" alt="" />
              </div>
            </div>
            <div className="flex ml-4">
              <div className="mt-24  ">
                <img src="/images/d6/e.png" alt="" />
              </div>
              <div className="mt-0 ml-10">
                <img src="/images/d6/energyServices.png" alt="" />
              </div>
            </div>

            <div className="flex ml-4">
              <div className="mt-20  ">
                <img src="/images/d6/n.png" alt="" />
              </div>
              <div className="mt-0 ml-10">
                <img src="/images/d6/projectSolutions.png" alt="" />
              </div>
            </div>
          </div>
          <div className="absolute w-screen h-screen -z-10 top-0">
            <img
              src="/images/d6/mobileBg.png"
              alt=""
              className="w-screen h-[110vh]"
            />
          </div>
          <div className="">
            <D6Chatbot />
          </div>
        </div>
      </React.Fragment>
    );
  }
    if (isNavigationOpen && navigationData) {
    return (
      <Navigation
        navigationData={navigationData}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        featuredChild={featuredChild}
        isOpen={isNavigationOpen}
        onClose={closeNavigation}
      />
    );
  }
};

export default D6Template;
