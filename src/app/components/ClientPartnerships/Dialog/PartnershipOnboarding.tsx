"use client";

import React from "react";

interface PartnerLogo {
  src: string;
  alt: string;
}

interface PartnershipOnboardingData {
  title?: string;
  subHeadline?: string;
  partners?: PartnerLogo[];
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: PartnershipOnboardingData;
}
const PartnershipOnboarding = ({ isOpen, onClose, data }: Props) => {
  if (!isOpen) return null;

  const title = data?.title ?? "Partnership Onboarding";
  const subHeadline =
    data?.subHeadline ??
    "Let's Build What Your Nation or Enterprise Needs Next.";

  const defaultPartners = [
    {
      src: "/images/client-partnerships/department-of-petroleum-energy-of-papua-new-guinea.png",
      alt: "Department of Petroleum and Energy",
    },
    {
      src: "/images/client-partnerships/department-of-national-planning.png",
      alt: "Department of National Planning",
    },
    {
      src: "/images/client-partnerships/australian-aid.png",
      alt: "Australian Aid",
    },
    {
      src: "/images/client-partnerships/undp.png",
      alt: "United Nations Development Programme",
    },
    {
      src: "/images/client-partnerships/pasic-power.png",
      alt: "Pacific Power",
    },
    {
      src: "/images/client-partnerships/eu-green.png",
      alt: "EU Green",
    },
  ];

  const partners = data?.partners ?? defaultPartners;
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Example breakpoint for mobile
    };
    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <React.Fragment>
      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center">
        {/* Modal Container */}
        <div className="relative w-full lg:max-w-6xl mx-4">
          {/* Skewed Modal Background */}
          {
            isMobile?
            <div
            className="bg-white py-14 h-[80vh] overflow-y-auto border-2 border-[#4CAF50] px-4 relative shadow-2xl"
          >
            {/* Close Button */}
            <div className="flex justify-end w-full">
              <button
                onClick={onClose}
                className="cursor-pointer text-gray-600 hover:text-gray-800 text-2xl z-10 "
              >
                <img src="/images/join-us/xicon.png" alt="Close Icon" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="">
              {/* Title Section */}
              <div className="mb-8">
                <h2 className="text-3xl font-black text-gray-800 mb-4">
                  {title}
                </h2>
                <div className="flex items-center">
                  <span className="text-2xl text-black font-bold mr-2">-</span>
                  <h3 className="text-xl text-[#4CAF50] font-semibold">
                    {subHeadline}
                  </h3>
                </div>
                <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
              </div>

              {/* Partners Logo Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 items-center justify-items-center">
                {partners.map((partner, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <img
                      src={partner.src}
                      alt={partner.alt}
                      className="h-52 object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>:
          <div
            className="bg-white transform  py-14 border-2 border-[#4CAF50] px-16 relative shadow-2xl"
            style={{ clipPath: "polygon(0 0, 95% 0, 100% 100%, 5% 100%)",
              transform:"skewX(-12deg)"
             }}
          >
            {/* Close Button */}
            <div className="flex justify-end w-full">
              <button
                onClick={onClose}
                style={{
                  transform:"skewX(12deg)"
                }}
                className="cursor-pointer text-gray-600 hover:text-gray-800 text-2xl z-10 transform"
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
              {/* Title Section */}
              <div className="mb-8">
                <h2 className="text-3xl font-black text-gray-800 mb-4">
                  {title}
                </h2>
                <div className="flex items-center">
                  <span className="text-2xl text-black font-bold mr-2">-</span>
                  <h3 className="text-xl text-[#4CAF50] font-semibold">
                    {subHeadline}
                  </h3>
                </div>
                <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
              </div>

              {/* Partners Logo Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 items-center justify-items-center">
                {partners.map((partner, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <img
                      src={partner.src}
                      alt={partner.alt}
                      className="h-52 object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          }
        </div>
      </div>
    </React.Fragment>
  );
};

export default PartnershipOnboarding;
