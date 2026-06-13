"use client";
import React, { useEffect, useState } from "react";
import {
  NavigationItem,
  NavigationText,
} from "../../hooks/useNavigation";
import { useNavigationState } from "../../../hooks/useNavigationState";
import { useParams, usePathname } from "next/navigation";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  navigationData: NavigationItem[];
  activeSection: NavigationItem | null;
  setActiveSection: (section: NavigationItem) => void;
  featuredChild: {
    image?: { src: string; alt: string };
    text?: NavigationText;
  } | null;
  currentPath?: string;
}

const Navigation = ({ isOpen, onClose,
  navigationData,
  activeSection,
  setActiveSection,
  featuredChild
 }: Props) => {
 
  const [selectedParent, setSelectedParent] = useState<NavigationItem | null>(null);
  const { closeNavigation } = useNavigationState();

  const handleClose = () => {
    closeNavigation();
    onClose();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  // Don't render if not open or no data
  if (!isOpen || !navigationData) {
    return null;
  }

  const getHighlightedText = (text: NavigationText) => {
    const { description, highlighted } = text;

    if (!highlighted) {
      return <span className="text-gray-700 capitalize">{description}</span>;
    }

    const highlightWords = highlighted
      .split(/[\s,]+/)
      .map((word) => word.trim())
      .filter((word) => word.length > 0);

    if (highlightWords.length === 0) {
      return <span className="text-gray-700 capitalize">{description}</span>;
    }

    const escapedWords = highlightWords.map((word) =>
      word.replace(/[.*+?^${}()|[\]\\]/g, (match) => '\\' + match)
    );
    const regex = new RegExp(`\\b(${escapedWords.join("|")})\\b`, "gi");
    const parts = description.split(regex);

    return (
      <>
        {parts.map((part, index) => {
          if (!part) return null;
          const isHighlighted = highlightWords.some(
            (word) => part.toLowerCase() === word.toLowerCase()
          );
          return isHighlighted ? (
            <span
              key={index}
              className="text-green-600 font-semibold not-italic capitalize"
            >
              {part}
            </span>
          ) : (
            <span key={index} className="text-gray-700 capitalize">
              {part}
            </span>
          );
        })}
      </>
    );
  };

  const handleItemClick = (item: NavigationItem) => {
    if (item.children && item.children.length > 0) {
      setSelectedParent(item);
    }
  };
const currentPath = usePathname();
  const renderMainNavigationItems = (items: NavigationItem[]) => {
    return items.map((item) => {
      const hasChildren = item.children && item.children.length > 0;
      const isSelected = selectedParent?.id === item.id;
      const isCurrentPath = currentPath === item.slug;
      
      return (
        <li key={item.id}>
          {hasChildren ? (
            <div 
              onClick={() => handleItemClick(item)}
              className={`font-semibold flex justify-between items-center text-sm lg:text-lg capitalize cursor-pointer transition-colors ${
                isSelected ? 'text-green-600' : 'text-gray-800 hover:text-green-600'
              }`}
            >
              <span>{item.name}</span>
              <span className="ml-2">›</span>
            </div>
          ) : (
            <a
              href={item.slug}
              className={`font-semibold transition-colors block text-sm lg:text-lg hover:text-green-600 capitalize ${
                isCurrentPath ? 'text-green-600' : 'text-gray-800'
              }`}
            >
              {item.name}
            </a>
          )}
        </li>
      );
    });
  };

  const renderSubNavigationItems = () => {
    if (!selectedParent || !selectedParent.children) return null;

    return selectedParent.children.map((item) => {
      const isCurrentPath = currentPath === item.slug;
      
      return (
        <li key={item.id}>
          <a
            href={item.slug}
            className={`transition-colors block font-semibold text-sm lg:text-base hover:text-green-600 capitalize ${
              isCurrentPath ? 'text-green-600' : 'text-gray-800'
            }`}
          >
            {item.name}
          </a>
        </li>
      );
    });
  };

  return (
    <div className="fixed inset-0 z-[9999999999999999999] bg-black/50">
      <div className="absolute inset-0 bg-white lg:max-w-[60vw] lg:left-[40vw]">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute cursor-pointer top-4 right-4 md:top-6 md:right-6 text-3xl md:text-4xl text-gray-800 hover:text-black z-10 font-light"
          aria-label="Close navigation"
        >
          ✕
        </button>

        {/* Mobile Layout */}
        <div className="md:hidden h-full relative pb-32">
          <div className="flex-1 flex">
            {/* Left Column - Sub Navigation Items and Image */}
            <div className="flex-1 p-4 pt-16 overflow-y-auto">
              <div className="border-r-2 border-green-500 pr-4 mb-6">
                {selectedParent ? (
                  <ul className="space-y-3 text-base">
                    {renderSubNavigationItems()}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm italic">Select an item to view details</p>
                )}
              </div>

              {/* Mobile Image */}
              {featuredChild?.image && (
                <div className="mb-6">
                  <div className="w-full mx-auto">
                    <img
                      src={featuredChild.image.src}
                      alt={featuredChild.image.alt}
                      className="w-full h-full object-contain rounded"
                    />
                  </div>
                </div>
              )}

              {/* Mobile Quote */}
              <div className="">
                <blockquote className="text-sm italic text-gray-700 leading-relaxed text-center">
                  {featuredChild?.text ? (
                    <>"{getHighlightedText(featuredChild.text)}"</>
                  ) : (
                    <span className="text-gray-700">
                      "Explore our comprehensive solutions and services"
                    </span>
                  )}
                </blockquote>
              </div>
            </div>

            {/* Right Column - Main Navigation */}
            <div className="w-32 flex flex-col">
              <div className="flex-1 p-4 pt-16 overflow-y-auto">
                <nav className="space-y-6">
                  {[...navigationData].sort((a, b) => a.id - b.id).map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section)}
                      className={`block text-left text-sm cursor-pointer font-bold transition-colors w-full ${
                        activeSection?.id === section.id
                          ? "text-green-600"
                          : "text-gray-800 hover:text-green-600"
                      }`}
                    >
                      {section.name}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="absolute flex flex-col space-y-8 right-0 bottom-4">
            <button className="cursor-pointer hover:scale-105 transition-transform">
              <img
                src="/images/nav/enquiry.png"
                alt="enquiryBtn"
                className="h-10"
              />
            </button>
            <button className="cursor-pointer hover:scale-105 transition-transform">
              <img
                src="/images/nav/contact.png"
                alt="contactBtn"
                className="h-10"
              />
            </button>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="h-full hidden md:flex">
          {/* Left section - Sub-items and Image */}
          <div className="flex-1 p-16 relative overflow-y-auto">
            <div className="flex gap-6 mb-8">
              {/* Left side - Image */}
              <div className="w-80">
                {/* Image with green vertical line */}
                {featuredChild?.image && (
                  <div className="w-72 h-44 relative mb-12">
                    <img
                      src={featuredChild.image.src}
                      alt={featuredChild.image.alt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute -right-3 top-0 w-1 h-full bg-green-500"></div>
                  </div>
                )}

                {/* Sub-items below image */}
                {selectedParent && selectedParent.children && (
                  <div className="ml-0">
                    <ul className="space-y-4 text-base lg:text-lg">
                      {renderSubNavigationItems()}
                    </ul>
                  </div>
                )}
              </div>

              {/* Right side - Main menu items */}
              <div className="flex-1 pt-2">
                <ul className="space-y-5 text-lg">
                  {activeSection &&
                    renderMainNavigationItems(activeSection.children || [])}
                </ul>
              </div>
            </div>

            {/* Quote */}
            <div className="absolute bottom-2 left-16 right-16">
              <blockquote className="text-3xl italic text-gray-700 leading-relaxed">
                {featuredChild?.text ? (
                  <>"{getHighlightedText(featuredChild.text)}"</>
                ) : (
                  <span className="text-gray-700">
                    "Explore our comprehensive solutions and services"
                  </span>
                )}
              </blockquote>
            </div>
          </div>

          {/* Vertical divider */}
          <div className="relative">
            <div className="absolute top-16 bottom-32 w-px bg-gray-400"></div>
          </div>

          {/* Right section - Top-level navigation */}
          <div className="w-80 flex flex-col">
            <div className="flex-1 p-16 pb-8">
              <nav className="space-y-10 pt-8">
                {[...navigationData].sort((a, b) => a.id - b.id).map((section) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      setActiveSection(section);
                      setSelectedParent(null); // Reset selected parent when changing section
                    }}
                    className={`block text-left text-xl cursor-pointer font-bold transition-colors ${
                      activeSection?.id === section.id
                        ? "text-green-600"
                        : "text-gray-800 hover:text-green-600"
                    }`}
                  >
                    {section.name}
                  </button>
                ))}
              </nav>
            </div>

            {/* Desktop Action buttons */}
            <div className="px-16 pb-16 flex flex-col gap-4 items-end">
              <button className="hover:scale-105 transition-transform">
                <img
                  src="/images/nav/enquiry.png"
                  alt="enquiryBtn"
                  className="h-12 w-auto"
                />
              </button>
              <button className="hover:scale-105 transition-transform">
                <img
                  src="/images/nav/contact.png"
                  alt="contactBtn"
                  className="h-12 w-auto"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
