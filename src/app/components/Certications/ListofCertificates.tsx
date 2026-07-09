"use client"
import React,
{
    useEffect,
    useState
}
from 'react'

interface Props {
    isOpen: boolean;
    onClose: () => void;
}
const ListofCertificates = ({
    isOpen,
    onClose
}: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Certificate images array - you can replace with actual certificate image paths
  const certificates = [
    "/images/certifications-accredication/cert1.png",
    "/images/certifications-accredication/cert2.png",
    "/images/certifications-accredication/cert3.png",
    "/images/certifications-accredication/cert4.png",
  ];

  if (!isOpen) return null;

  const nextCertificate = () => {
    setCurrentIndex((prev) => (prev + 1) % certificates.length);
  };

  const prevCertificate = () => {
    setCurrentIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
  };

  const getVisibleCertificates = () => {
    const visible = [];
    
    if (isMobile) {
      // For mobile, just show the current certificate
      visible.push({ src: certificates[currentIndex], isFocused: true });
    } else {
      // For desktop, show 3 certificates with center focus
      for (let i = 0; i < 3; i++) {
        const index = (currentIndex - 1 + i + certificates.length) % certificates.length;
        visible.push({ src: certificates[index], isFocused: i === 1 });
      }
    }
    return visible;
  };

  return (
    <React.Fragment>
      {/* Modal Overlay */}
      <div className="fixed inset-0  bg-black/20 z-[9999] flex items-center justify-center">
        {/* Modal Container */}
        <div className="relative w-full  mx-4 h-full flex items-center justify-center">
          
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-24 right-6 z-10 cursor-pointer"
          >
            <img src="/images/certifications-accredication/close-icon.png" alt="Close" className="w-8 h-8" />
          </button>

          {/* Left Arrow */}
          <button 
            onClick={prevCertificate}
            className="absolute left-2 lg:left-6 z-10 cursor-pointer"
          >
            <img src="/images/certifications-accredication/left-arrow.png" alt="Previous" className="w-8 h-8 lg:w-12 lg:h-12" />
          </button>

          {/* Certificate Display Area */}
          <div className="flex items-center justify-center w-full h-full px-4 lg:px-20">
            {/* Certificates Display - Responsive */}
            <div className={`flex items-center justify-center w-full ${isMobile ? '' : 'gap-4'}`}>
              {getVisibleCertificates().map((certInfo, index) => (
                <div 
                  key={index} 
                  className={`transition-all duration-300 ${
                    isMobile 
                      ? 'w-full max-w-lg mx-auto' 
                      : certInfo.isFocused 
                        ? 'flex-1 max-w-4xl scale-105 z-10' 
                        : 'flex-1 max-w-xl scale-90'
                  }`}
                >
                  <img 
                    src={certInfo.src} 
                    alt={`Certificate ${index + 1}`}
                    className={`w-full h-auto object-contain rounded-lg shadow-lg ${
                      isMobile ? 'max-h-[70vh]' : 'max-h-[85vh]'
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button 
            onClick={nextCertificate}
            className="absolute right-6 z-10 cursor-pointer"
          >
            <img src="/images/certifications-accredication/right-arrow.png" alt="Next" className="w-12 h-12" />
          </button>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ListofCertificates