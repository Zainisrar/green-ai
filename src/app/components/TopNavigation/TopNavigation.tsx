"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Navigation from "../Navigation/Navigation";
import { useNavigationState } from "../../../hooks/useNavigationState";
import { useInteractiveZIndex } from "../../../hooks/useInteractiveZIndex";
import { useNavigation } from "@/app/hooks/useNavigation";

const TopNavigation = () => {
  const { isNavigationOpen, openNavigation, closeNavigation } = useNavigationState();
  const pathname = usePathname();
  const { navigationData, activeSection, setActiveSection, featuredChild } =
      useNavigation(isNavigationOpen, pathname);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const mobileNavProps = useInteractiveZIndex();
  const desktopNavProps = useInteractiveZIndex();
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial scroll position

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navnData = {
    navigation: {
      items: [
        { link: "/explore/welcome-to-green", name: "Explore" },
        { link: "/energy", name: "Energy" },
        { link: "/engineering/products/lighting-up-and-lifting-up-living-standards", name: "Elements" },
        { link: "/expertise", name: "Expertise" },
        { link: "/empower/join-us", name: "Enlist" },
        { link: "/engage/reach-us", name: "Engage" },
      ],
    },
  };
 
  if (isNavigationOpen && navigationData) {
    return <Navigation
      navigationData={navigationData}
      activeSection={activeSection}
      setActiveSection={setActiveSection}
      featuredChild={featuredChild}
      currentPath={pathname}
      isOpen={isNavigationOpen} 
      onClose={closeNavigation} 
    />;
  } else
    return (
      <div className="lg:pb-20 py-10  lg:p-0 relative ">
        {/* desktop top navigation */}
        <div
          className={`flex md:fixed top-0 left-0 w-full md:flex-nowrap flex-wrap md:space-x-8 lg:space-x-20 items-center transition-all duration-300 z-[9999] ${
            isScrolled && !isMobile ? "bg-white shadow-md" : "bg-transparent"
          }`}
        >
          <img
            src="/images/insight1/greenShape.png"
            alt="green rectangle"
            className="hidden md:block md:h-[600px] lg:h-[1200px] pointer-events-none absolute -z-[10] left-0"
          />
          {isMobile && (
            <div className="w-full">
              <img
                src="/images/insight1/greenShape.png"
                alt="green rectangle"
                className="h-[500px] pointer-events-none absolute top-0 -z-[10] left-0"
              />
              <div className="flex justify-between items-center pt-4 px-4">
                <a href="/">
                  <img
                    src="/images/heroSection/logo.png"
                    alt="logo"
                    className="w-40"
                  />
                </a>
                <div {...mobileNavProps.getContainerProps()}>
                  <img
                    onClick={openNavigation}
                    src="/images/heroSection/lighting.svg"
                    className="w-10 h-10 cursor-pointer"
                    alt="lighting"
                  />
                </div>
              </div>
            </div>
          )}
          <div className="flex relative  lg:flex-nowrap flex-wrap items-center md:justify-between md:w-full">
            <div className="md:block hidden  ml-4">
              <a href="/" className="">
                <img
                  src="/images/heroSection/logo.png"
                  alt="logo"
                  className="md:w-52 lg:w-80  pt-4"
                />
              </a>
            </div>
            <div className="w-full">
              <ul className="hidden md:flex px-20 lg:px-0   md:flex-nowrap flex-wrap justify-end md:space-x-4    lg:space-x-10  uppercase items-center">
                {navnData.navigation.items.map((item) => (
                  <li
                    key={item.name}
                    className="lg:text-base text-sm mt-4 ml-8 lg:ml-10"
                  >
                    <a
                      href={item.link}
                      className={
                        pathname === item.link ? "font-bold text-green-600" : ""
                      }
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
                <li className="mt-4 md:block hidden">
                  <div {...desktopNavProps.getContainerProps()}>
                    <img
                      onClick={openNavigation}
                      src="/images/heroSection/lighting.svg"
                      className="w-10 h-10 cursor-pointer"
                      alt="lighting"
                    />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
};

export default TopNavigation;
