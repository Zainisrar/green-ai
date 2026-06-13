"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Navigation from "./Navigation/Navigation";
import { useNavigationState } from "@/hooks/useNavigationState";
import { useInteractiveZIndex } from "@/hooks/useInteractiveZIndex";
import { useNavigation } from "@/app/hooks/useNavigation";
import { useScreen } from "@/hooks/useScreen";

const D6TopNavigation = () => {
  const { isNavigationOpen, openNavigation, closeNavigation } = useNavigationState();
  const pathname = usePathname();
  const { navigationData, activeSection, setActiveSection, featuredChild } =
      useNavigation(isNavigationOpen, pathname);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const mobileNavProps = useInteractiveZIndex();
  const desktopNavProps = useInteractiveZIndex();
  const screen = useScreen();
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      setIsScrolled(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolled(false);
      }, 150);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
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
 
  return (
    <>
      {/* Navigation modal - always rendered but controlled by isOpen prop */}
      <Navigation
        navigationData={navigationData}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        featuredChild={featuredChild}
        currentPath={pathname}
        isOpen={isNavigationOpen} 
        onClose={closeNavigation} 
      />
      
      {/* Top navigation bar - only show when navigation is closed */}
      {!isNavigationOpen && (
     <div
          className={` absolute top-0 z-40 w-full`}
        >
          <img
            src="/greenRectangle.png"
            alt="green rectangle"
            className={`${screen.is1366x768 ? "w-40":""} ${screen.is1440x900 ? "w-56":""} ${screen.is1280x800 ? "w-44":""} ${screen.is1512x982 ? "w-48":""} ${screen.is1792x1120 ? "w-64":""}  ${screen.is1920x1080 ? "w-72":""}  absolute -z-[40]  left-0`}
          />
       
          <div className="flex relative  lg:flex-nowrap flex-wrap items-center md:justify-between md:w-full">
            <div className="md:block hidden  ml-4">
              <a href="/" className="">
                <img
                  src="/images/heroSection/logo.png"
                  alt="logo"
                  className="md:w-40 lg:w-64  pt-4"
                />
              </a>
            </div>
            <div className="w-full">
              <div className="flex justify-end md:hidden">
                <div {...mobileNavProps.getContainerProps()}>
                  <img
                    onClick={openNavigation}
                    src="/images/heroSection/lighting.svg"
                    className="w-10 h-10 cursor-pointer"
                    alt="lighting"
                  />
                </div>
              </div>
              <ul className="flex   space-x-10 justify-end  uppercase items-center">
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
      )}
    </>
  );
};

export default D6TopNavigation;
