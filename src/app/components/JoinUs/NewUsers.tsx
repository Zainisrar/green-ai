"use client";
import React, { useEffect, useState } from "react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}
const NewUsers = ({
    isOpen,
    onClose
}: Props) => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resume, setResume] = useState<File | null>(null);
  const [isApplyingForVacancy, setIsApplyingForVacancy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
        const mobile = window.innerWidth < 768;
        setIsMobile(mobile);
      }
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isOpen) return null;

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const renderContent = () => (
    <>
      {/* Title */}
      <div className="mb-6 md:mb-8">
        <h2 className={`${isMobile ? 'text-xl' : 'text-3xl'} font-bold text-gray-800 mb-2`}>
          NEW TO <span className="text-[#4CAF50]">GREEN</span>? CREATE YOUR <span className="text-[#4CAF50]">PROFILE</span>
        </h2>
        <p className={`text-gray-600 ${isMobile ? 'text-xs' : 'text-sm'}`}>
          Join the growing talent network powering the Pacific's renewable energy transformation.
        </p>
      </div>

      {/* Form */}
      <form className="space-y-4 md:space-y-6">
        {/* First Row - First Name and Email */}
        <div className={`${isMobile ? 'space-y-4' : 'grid md:grid-cols-2 gap-6'}`}>
          <div>
            <input
              type="text"
              placeholder="FIRST NAME"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={`w-full ${isMobile ? 'px-3 py-2 text-sm' : 'px-4 py-3'} border-2 border-[#8BC34A] rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#4CAF50] transition-colors`}
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="E-MAIL ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full ${isMobile ? 'px-3 py-2 text-sm' : 'px-4 py-3'} border-2 border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#4CAF50] transition-colors`}
            />
          </div>
        </div>

        {/* Second Row - Phone and Password */}
        <div className={`${isMobile ? 'space-y-4' : 'grid md:grid-cols-2 gap-6'}`}>
          <div className="relative">
            <div className="flex">
              <div className={`flex items-center ${isMobile ? 'px-2 py-2' : 'px-3 py-3'} bg-white border-2 border-gray-300 rounded-l-lg border-r-0`}>
                <img src="/images/book-consulation/countryCode.png" alt="Country Flag" className={`${isMobile ? 'w-5 h-3' : 'w-6 h-4'} mr-2`} />
                <span className={`text-gray-600 ${isMobile ? 'text-xs' : 'text-sm'}`}>+675</span>
              </div>
              <input
                type="tel"
                placeholder="PHONE"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`flex-1 ${isMobile ? 'px-3 py-2 text-sm' : 'px-4 py-3'} border-2 border-gray-300 rounded-r-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#4CAF50] transition-colors`}
              />
            </div>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full ${isMobile ? 'px-3 py-2 text-sm' : 'px-4 py-3'} border-2 border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#4CAF50] transition-colors`}
            />
            <button 
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              <img src="/images/join-us/arrow.png" alt="Toggle Password Visibility" className={isMobile ? 'w-4 h-4' : ''} />
            </button>
          </div>
        </div>

        {/* Third Row - Confirm Password and Resume Upload */}
        <div className={`${isMobile ? 'space-y-4' : 'grid md:grid-cols-2 gap-6'}`}>
          <div>
            <input
              type="password"
              placeholder="CONFORM PASSWORD"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full ${isMobile ? 'px-3 py-2 text-sm' : 'px-4 py-3'} border-2 border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#4CAF50] transition-colors`}
            />
          </div>
          <div className="relative">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeUpload}
              className="hidden"
              id="resume-upload"
            />
            <label 
              htmlFor="resume-upload"
              className={`w-full ${isMobile ? 'px-3 py-2 text-sm' : 'px-4 py-3'} border-2 border-gray-300 rounded-lg bg-white text-gray-500 cursor-pointer flex items-center justify-between hover:border-[#4CAF50] transition-colors`}
            >
              <span className={isMobile ? 'text-xs' : ''}>{resume ? resume.name : 'RESUME UPLOAD'}</span>
              <span><img src="/images/join-us/upload.png" alt="Upload Icon" className={isMobile ? 'w-4 h-4' : ''} /></span>
            </label>
            <div className={`${isMobile ? 'text-xs' : 'text-xs'} text-gray-500 mt-1`}>
              (Formats: <span className="text-green-600">PDF/DOC</span>, Size: <span className="text-green-600">Below 2Mb</span>)
            </div>
          </div>
        </div>

        {/* Checkbox */}
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="applying-for-vacancy"
            checked={isApplyingForVacancy}
            onChange={(e) => setIsApplyingForVacancy(e.target.checked)}
            className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-[#4CAF50] border-2 border-gray-300 rounded focus:ring-[#4CAF50]`}
          />
          <label htmlFor="applying-for-vacancy" className={`text-gray-700 ${isMobile ? 'text-xs' : 'text-sm'}`}>
            I'm applying for a current vacancy
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
          >
            <img src="/images/join-us/send.png" alt="Send Icon" className={isMobile ? 'w-16 h-8' : ''} />
          </button>
        </div>
      </form>
    </>
  );

  return (
    <React.Fragment>
      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-black/30 z-[99999999999999999999999999] flex items-center justify-center p-4">
        {/* Modal Container */}
        <div className={`relative w-full ${isMobile ? 'max-w-sm' : 'max-w-5xl'} mx-4`}>
          {/* Mobile Layout */}
          {isMobile ? (
            <div className="bg-[#f1f3ed] p-4 border-2 border-[#4CAF50] relative shadow-2xl rounded-lg max-h-[90vh] overflow-y-auto">
              {/* Close Button */}
              <div className="flex space-x-3 justify-end w-full mb-4">
                <button 
                  className="cursor-pointer text-gray-600 hover:text-gray-800 text-xl"
                >
                  <img src="/images/join-us/solar_maximize.png" alt="Maximize Icon" className="w-5 h-5" />
                </button>
                <button 
                  onClick={onClose}
                  className="cursor-pointer text-gray-600 hover:text-gray-800 text-xl"
                >
                  <img src="/images/join-us/xicon.png" alt="Close Icon" className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="mx-auto">
                {renderContent()}
              </div>
            </div>
          ) : (
            /* Desktop Layout - Skewed Modal Background */
            <div 
             
              className="bg-[#f1f3ed] transform  py-14 border-2 border-[#4CAF50] px-16 relative shadow-2xl"
              style={{ clipPath: 'polygon(0 0, 95% 0, 100% 100%, 5% 100%)',
                transform:"skewX(-12deg)"
               }}
            >
              {/* Close Button */}
              <div className="flex space-x-5 justify-end w-full">
                <button 
                style={{
                  transform:"skewX(12deg)"
                }}
                  className="cursor-pointer text-gray-600 hover:text-gray-800 text-2xl z-10 transform "
                >
                  <img src="/images/join-us/solar_maximize.png" alt="Maximize Icon" />
                </button>
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
              className="transform  max-w-4xl mx-auto">
                {renderContent()}
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default NewUsers;
