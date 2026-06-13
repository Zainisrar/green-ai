"use client"
import React, {
    useEffect,
    useState
} from 'react'

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
const Technology = ({
    isOpen,
    onClose,
    data
}: Props) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        <h2 className="text-3xl font-black text-gray-800 mb-4">
          {data?.title || "Technology Stack Overview"}
        </h2>
        <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
      </div>

      {/* Main Content */}
      <div className="lg:flex items-start space-x-12">
        {/* Left Side - Image */}
        <div className="flex-shrink-0">
          <div className="relative">
            <img 
              src={data?.image?.src || "/images/grid-intel/technology.png"}
              alt={data?.image?.alt || "GRID-INTEL Technology Stack"}
              className="w-[520px] pt-10"
            />
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="flex-1">
          <div className="mb-8">
            <p className="text-gray-700 text-lg font-medium mb-6">
              {data?.description || (
                <>
                  <span className="text-[#4CAF50] font-bold">GRID-INTEL™</span> Includes:
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
    <React.Fragment>
      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-black/20 z-[99999999999999999999999999] flex items-center justify-center">
        {/* Modal Container */}
        {
          isMobile ?
          (<div className="relative w-full lg:max-w-6xl mx-4">
          {/* Skewed Modal Background */}
           <div 
            className="bg-gray-100 h-[80vh] overflow-y-auto p-5 relative shadow-2xl"
          >
            {/* Close Button */}
          <div className='flex justify-end w-full'>
            <button 
              onClick={onClose}
              style={{
                transform:"skewX(12deg)"
              }}
              className="cursor-pointer text-gray-600 hover:text-gray-800 text-2xl z-10 transform "
            >
              <img src="/images/join-us/xicon.png" alt="Close Icon" />
            </button>
          </div>

            {/* Modal Content */}
            <div className="transform mx-auto">
              {renderContent()}
            </div>
          </div>
        </div>):
          (<div className="relative w-full lg:max-w-6xl mx-4">
          {/* Skewed Modal Background */}
           <div 
            className="bg-gray-100 transform py-14 border-2 border-[#4CAF50] px-16 relative shadow-2xl"
            style={{ clipPath: 'polygon(0 0, 95% 0, 100% 100%, 5% 100%)',
              transform:"skewX(-12deg)"
             }}
          >
            {/* Close Button */}
          <div className='flex justify-end w-full'>
            <button 
              onClick={onClose}
              style={{
                transform:"skewX(12deg)"
              }}
              className="cursor-pointer text-gray-600 hover:text-gray-800 text-2xl z-10 transform "
            >
              <img src="/images/join-us/xicon.png" alt="Close Icon" />
            </button>
          </div>

            {/* Modal Content */}
            <div
             style={{
              transform:"skewX(6deg)"
             }}
            className="transform  max-w-5xl mx-auto">
              {renderContent()}
            </div>
          </div>
        </div>)
        }
      </div>
    </React.Fragment>
  )
}

export default Technology