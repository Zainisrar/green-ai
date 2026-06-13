"use client"
import React,{
    useEffect,
    useState
} from 'react'

interface Props {
    isOpen: boolean;
    onClose: () => void;
}
const ExistingUsers = ({
    isOpen,
    onClose
}: Props) => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');

  if (!isOpen) return null;
  return (
    <React.Fragment>
      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
        {/* Modal Container */}
        <div className={`relative w-full max-w-3xl mx-4`}>
          {/* Skewed Modal Background */}
          <div 
            className="bg-gray-100 transform py-14 border-2 border-[#4CAF50] px-16 relative shadow-2xl"
            style={{ clipPath: 'polygon(0 0, 95% 0, 100% 100%, 5% 100%)',
              transform:"skewX(-12deg)"
             }}
          >
            {/* Close Button */}
            <div className="flex  space-x-5 justify-end w-full">
            <button 
            style={{
              transform:"skewX(12deg)"
            }}
              className="  cursor-pointer text-gray-600 hover:text-gray-800 text-2xl z-10 transform "
            >
              <img src="/images/join-us/solar_maximize.png" alt="Close Icon" />
            </button>
            <button 
            style={{
              transform:"skewX(12deg)"
            }}
              onClick={onClose}
              className="  cursor-pointer text-gray-600 hover:text-gray-800 text-2xl z-10 transform "
            >
              <img src="/images/join-us/xicon.png" alt="Close Icon" />
            </button>

            </div>

            {/* Modal Content */}
            <div
             style={{
              transform:"skewX(12deg)"
             }}
            className="transform  max-w-md mx-auto">
              {/* Title */}
              <div className="mb-6">
                <h2 className="text-3xl font-black my-4 text-gray-800 mb-2">
                  EXISTING <span className="text-[#4CAF50]">USERS</span>
                </h2>
                <p className="text-gray-600 text-sm">
                  Enter your credentials to access your GREEN Careers Dashboard.
                </p>
              </div>

              {/* Form */}
              <form className="space-y-6">
                {/* First Name Input */}
                <div
                style={{
                  transform:"skewX(-16deg)"
                }}
                className='  '>
                  <input
                    type="text"
                    placeholder="FIRST NAME"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-[#8BC34A] rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#4CAF50] transition-colors"
                  />
                </div>

                {/* Email Input */}
                <div
                 style={{
                  transform:"skewX(-16deg)"
                 }}
                className='   -ml-4'>
                  <input
                    type="email"
                    placeholder="E-MAIL ID"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#4CAF50] transition-colors"
                  />
                </div>

                {/* Login Button */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    
                  >

                    <img src="/images/join-us/login.png" alt="Login" />
                  </button>
                </div>

                {/* Forgot Password Link */}
                <div className="text-center text-sm">
                  <span className="text-gray-600">Forgot Password? </span>
                  <button 
                    type="button"
                    className="text-[#4CAF50] cursor-pointer font-semibold hover:underline"
                  >
                    Reset Here
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ExistingUsers