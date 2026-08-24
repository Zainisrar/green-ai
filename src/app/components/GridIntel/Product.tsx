"use client";
import React from "react";
import GridIntelInfoModal from "./GridIntelInfoModal";
import SafeImage from "../shared/SafeImage";

interface ProductIntegrationItem {
  icon: string;
  title: string;
  description: string;
}

interface ProductIntegrationData {
  image: {
    alt: string;
    src: string;
  };
  items: ProductIntegrationItem[];
  title: string;
  tagline: string;
  subtitle: string;
  description: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: ProductIntegrationData;
}
const Product = ({ isOpen, onClose, data }: Props) => {
  if (!isOpen) return null;

  const renderIntegrationItems = () => {
    if (data?.items) {
      return data.items.map((item, index) => (
        <div key={index} className="flex items-start space-x-3">
          <img loading="lazy" decoding="async"
            src="/images/grid-intel/lighting.png"
            className="w-14 -mt-4"
            alt="lighting"
          />
          <div>
            <p className="text-gray-800 font-medium italic">{item.title}</p>
            <p className="text-gray-600 text-sm mt-1">{item.description}</p>
          </div>
        </div>
      ));
    }

    // Fallback static content
    return (
      <>
        <div className="flex items-start space-x-3">
          <img loading="lazy" decoding="async"
            src="/images/grid-intel/lighting.png"
            className="w-14 -mt-4"
            alt="lighting"
          />
          <p className="text-gray-800 font-medium italic">
            GREEN SunShine Systems
          </p>
        </div>

        <div className="flex items-start space-x-3">
          <img loading="lazy" decoding="async"
            src="/images/grid-intel/lighting.png"
            className="w-14 -mt-4"
            alt="lighting"
          />
          <p className="text-gray-800 font-medium italic">
            GREEN Em'Pawa Hybrid Energy Platforms
          </p>
        </div>

        <div className="flex items-start space-x-3">
          <img loading="lazy" decoding="async"
            src="/images/grid-intel/lighting.png"
            className="w-14 -mt-4"
            alt="lighting"
          />
          <p className="text-gray-800 font-medium italic">
            Custom-Engineered Microgrids And EPCM Solutions
          </p>
        </div>
      </>
    );
  };
  const renderContent = () => (
    <>
      <div className="mb-8">
        <h2 className="mb-4 text-3xl font-black leading-tight text-gray-800 lg:text-4xl">
          {data?.title || "Product Integration"}
        </h2>
        <div className="flex items-center">
          <span className="mr-2 hidden text-2xl font-bold text-black md:inline">-</span>
          <h3 className="text-xl font-semibold text-[#4CAF50]">
            {data?.subtitle || "GRID-INTEL™ is fully integrated with."}
          </h3>
        </div>
        <div className="mt-4 h-0.5 w-full bg-gray-300"></div>
      </div>

      <div className="flex flex-col items-start gap-8 lg:flex-row lg:space-x-12">
        <div className="flex-1">
          <div className="space-y-4">{renderIntegrationItems()}</div>
        </div>
        <div className="shrink-0">
          <SafeImage
            src={data?.image?.src}
            fallbackSrc="/images/grid-intel/product-integration.png"
            alt={data?.image?.alt || "Product Integration Interface"}
            className="w-full max-w-[240px] pt-4 sm:max-w-[280px] lg:max-w-[320px] lg:pt-6"
          />
        </div>
      </div>
    </>
  );

  return (
    <GridIntelInfoModal
      isOpen={isOpen}
      onClose={onClose}
      footer={
        <div className="mt-8 border-t border-gray-200 pt-6 text-center">
          <p className="text-lg font-bold italic text-gray-800">
            {data?.tagline ||
              "GRID-INTEL™ turns distributed power systems into orchestrated, intelligent infrastructure."}
          </p>
        </div>
      }
    >
      {renderContent()}
    </GridIntelInfoModal>
  );
};

export default Product;
