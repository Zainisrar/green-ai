"use client";
import React, { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  firstName: string;
  organization: string;
  email: string;
  areaOfConsultation: string;
  phone: string;
  preferredDateTime: string;
  whatsappNumber: string;
  notes: string;
  captcha: string;
}

const Booking = ({ isOpen, onClose }: Props) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    organization: "",
    email: "",
    areaOfConsultation: "",
    phone: "",
    preferredDateTime: "",
    whatsappNumber: "",
    notes: "",
    captcha: "",
  });

  const [useWhatsapp, setUseWhatsapp] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    // Close the modal after successful submission
    onClose();
  };

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <React.Fragment>
      {/* Modal Overlay */}
      <div className="fixed z-[9999999999999999999] inset-0 bg-black/20  flex items-center justify-center">
        {/* Modal Container */}
        <div className="relative w-full max-w-6xl mx-4">
          {/* Skewed Modal Background */}
          <div
            className="bg-[#eff5f1]  transform  border-lime-300 border py-14  px-16 relative shadow-2xl"
            style={{ clipPath: "polygon(0 0, 95% 0, 100% 100%, 5% 100%)",transform:"skewX(-16deg)" }}
          >
            {/* Close Button */}
            <div className="flex justify-end w-full">
              <button
                onClick={handleClose}
                style={
                  {
                    transform:"skewX(12deg)"
                  }
                }
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
              {/* Title Section */}
              <div className="mb-8">
                <h2 className="text-3xl font-black text-gray-800 mb-4">
                  BOOK A <span className="text-green-600">CONSULTATION</span>
                </h2>
              </div>

              {/* Consultation Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* First Row */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="FIRST NAME"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="organization"
                      placeholder="ORGANIZATION / AFFILIATION"
                      value={formData.organization}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:border-green-500"
                      required
                    />
                  </div>
                </div>

                {/* Second Row */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="E-MAIL ID"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <select
                      name="areaOfConsultation"
                      value={formData.areaOfConsultation}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:border-green-500"
                      required
                    >
                      <option value="">AREA OF CONSULTATION</option>
                      <option value="solar-energy">Solar Energy Solutions</option>
                      <option value="grid-integration">Grid Integration</option>
                      <option value="energy-storage">Energy Storage</option>
                      <option value="microgrid">Microgrid Solutions</option>
                      <option value="sustainability">Sustainability Consulting</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Third Row */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="relative">
                    <div className="flex">
                      <div className="flex items-center px-3 py-3 border border-r-0 border-gray-300 rounded-l-lg bg-white">
                        <img src="/images/book-consulation/countryCode.png" alt="PNG" className="w-6 h-4 mr-2" />
                        <span className="text-gray-700">+675</span>
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="PHONE"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:border-green-500"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <input
                      type="datetime-local"
                      name="preferredDateTime"
                      placeholder="PREFERRED DATE & TIME"
                      value={formData.preferredDateTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:border-green-500"
                      required
                    />
                  </div>
                </div>

                {/* WhatsApp Checkbox */}
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="whatsapp"
                    checked={useWhatsapp}
                    onChange={(e) => setUseWhatsapp(e.target.checked)}
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <label htmlFor="whatsapp" className="text-gray-700 text-sm">
                    Is this your WhatsApp number?
                  </label>
                </div>

                {/* Notes Section */}
                <div>
                  <textarea
                    name="notes"
                    placeholder="NOTES OR SPECIFIC QUESTIONS"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:border-green-500 resize-none"
                  />
                </div>

                {/* Captcha and Submit */}
                <div className="flex items-end justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gray-200 px-4 py-2 rounded border">
                      <span className="font-mono text-lg">1 2 4 5</span>
                    </div>
                    <input
                      type="text"
                      name="captcha"
                      placeholder="Enter captcha"
                      value={formData.captcha}
                      onChange={handleInputChange}
                      className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:border-green-500"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className=" cursor-pointer"
                  >
                   <img src="/images/book-consulation/formBtn.png" className="w-40" alt="submit" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Booking;
