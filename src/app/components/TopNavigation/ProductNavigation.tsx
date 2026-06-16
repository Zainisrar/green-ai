"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Navigation from "../Navigation/Navigation";
import { useNavigation } from "@/app/hooks/useNavigation";
import { useNavigationState } from "@/hooks/useNavigationState";

const ProductNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const [isMobile, setIsMobile] = React.useState(false);

  const { navigationData, activeSection, setActiveSection, featuredChild } =
    useNavigation(isOpen);

  const productNavItems = [
    { link: "/explore/welcome-to-green", name: "Explore" },
    { link: "/energy", name: "Energy" },
    { link: "/engineering/products/lighting-up-and-lifting-up-living-standards", name: "Elements" },
    { link: "/expertise", name: "Expertise" },
    { link: "/empower/join-us", name: "Enlist" },
    { link: "/engage/reach-us", name: "Engage" },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Example breakpoint for mobile
    };
    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50); // Add background after scrolling 50px
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isOpen && navigationData) {
    return (
      <Navigation
        navigationData={navigationData}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        featuredChild={featuredChild}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    );
  } else
    return (
      <div className="lg:pb-20 py-10   lg:p-0 relative z-50">
        {/* desktop top navigation */}
        <div
          className={`flex  lg:fixed  w-full md:flex-nowrap flex-wrap md:space-x-8 lg:space-x-20 items-center transition-all duration-300 z-50 ${
            isScrolled && !isMobile ? "bg-white " : "bg-transparent"
          }`}
        >
          <img
            src="/images/nav/productGreen.png"
            alt="green rectangle"
            className="hidden md:block top-0 w-72 absolute -z-[10]  left-0"
          />
          {isMobile && (
            <div className="w-full">
              <img
                src="/images/insight1/greenShape.png"
                alt="green rectangle"
                className="h-[420px]  absolute top-0 -z-[10]  left-0"
              />
              <div className="flex justify-between items-center pt-4 px-4">
                <a href="/">
                  <img
                    src="/images/heroSection/logo.png"
                    alt="logo"
                    className="w-32"
                  />
                </a>
                <img
                  onClick={() => {
                    setIsOpen(true);
                  }}
                  src="/images/heroSection/lighting.svg"
                  className="w-10 h-10 cursor-pointer"
                  alt="lighting"
                />
              </div>
            </div>
          )}
          <div className="flex relative z-[9999] lg:flex-nowrap flex-wrap items-center md:justify-between md:w-full">

            <div className="w-full">
              <ul className="hidden md:flex px-20 lg:px-0   md:flex-nowrap flex-wrap justify-end md:space-x-4    lg:space-x-10  uppercase items-center">
                {productNavItems.map((item) => (
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
                <li
                  onClick={() => {
                    setIsOpen(true);
                  }}
                  className="-ml-4 mt-4 md:block cursor-pointer hidden"
                >
                  <img
                    src="/images/heroSection/lighting.svg"
                    className="md:w-12 lg:w-auto"
                    alt="lighting"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
};

export default ProductNavigation;
