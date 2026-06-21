"use client";
import React from "react";
import GridIntelInfoModal from "./GridIntelInfoModal";
import SafeImage from "../shared/SafeImage";

interface TechnologyFeature {
  icon: string;
  text: string;
}

interface TechnologyData {
  image: {
    alt: string;
    src: string;
  };
  title: string;
  description: string;
  features: TechnologyFeature[];
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    data?: TechnologyData;
}
const Technology = ({ isOpen, onClose, data }: Props) => {
  if (!isOpen) return null;

  const renderFeatures = () => {
    if (data?.features) {
      return data.features.map((feature, index) => (
        <div key={index} className="flex items-start space-x-3">
          <img 
            src="/images/grid-intel/lighting.png" 
            className='w-14 -mt-4' 
            alt="lighting" 
          />
          <p className="text-gray-800 font-medium italic">
            {feature.text}
          </p>
        </div>
      ));
    }
    
    // Fallback static content
    return (
      <>
        <div className="flex items-start space-x-3">
          <img src="/images/grid-intel/lighting.png" className='w-14 -mt-4' alt="lighting" />
          <p className="text-gray-800 font-medium italic">
            Embedded IoT controller with field-grade resilience
          </p>
        </div>
        
        <div className="flex items-start space-x-3">
          <img src="/images/grid-intel/lighting.png" className='w-14 -mt-4' alt="lighting" />
          <p className="text-gray-800 font-medium italic">
            Solar, battery, diesel, and grid synchronization logic
          </p>
        </div>
        
        <div className="flex items-start space-x-3">
          <img src="/images/grid-intel/lighting.png" className='w-14 -mt-4' alt="lighting" />
          <p className="text-gray-800 font-medium italic">
            Remote-access dashboard with real-time insights
          </p>
        </div>
        
        <div className="flex items-start space-x-3">
          <img src="/images/grid-intel/lighting.png" className='w-14 -mt-4' alt="lighting" />
          <p className="text-gray-800 font-medium italic">
            Predictive fault detection and alerts
          </p>
        </div>

        <div className="flex items-start space-x-3">
          <img src="/images/grid-intel/lighting.png" className='w-14 -mt-4' alt="lighting" />
          <p className="text-gray-800 font-medium italic">
            Offline-operable with local override
          </p>
        </div>

        <div className="flex items-start space-x-3">
          <img src="/images/grid-intel/lighting.png" className='w-14 -mt-4' alt="lighting" />
          <p className="text-gray-800 font-medium italic">
            Optional satellite uplink for disconnected zones
          </p>
        </div>
      </>
    );
  };

  const renderContent = () => (
    <>
      {/* Title Section */}
      <div className="mb-8">
        <h2 className="text-3xl lg:text-4xl font-black text-gray-800 mb-4 leading-tight">
          {data?.title || "Technology Stack Overview"}
        </h2>
        <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-start gap-8 lg:flex-row lg:space-x-12">
        <div className="shrink-0">
          <div className="relative">
            <SafeImage
              src={data?.image?.src}
              fallbackSrc="/images/grid-intel/technology.png"
              alt={data?.image?.alt || "GRID-INTEL Technology Stack"}
              className="w-full max-w-[240px] pt-4 sm:max-w-[280px] lg:max-w-[320px] lg:pt-6"
            />
          </div>
        </div>

        <div className="flex-1">
          <div className="mb-8">
            <p className="mb-6 text-lg font-medium text-gray-700">
              {data?.description ? (
                data.description
              ) : (
                <>
                  <span className="font-bold text-[#4CAF50]">GRID-INTEL™</span> Includes:
                </>
              )}
            </p>

            {/* Technology Features List */}
            <div className="space-y-4">
              {renderFeatures()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
  return (
    <GridIntelInfoModal isOpen={isOpen} onClose={onClose}>
      {renderContent()}
    </GridIntelInfoModal>
  );
};

export default Technology;