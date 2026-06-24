"use client";

import React from "react";
import { formFieldClass } from "@/app/components/shared/EngineeringFormModal";
import CountryCodeDropdown from "@/app/components/shared/CountryCodeDropdown";

interface PhoneInputProps {
  /** Current phone number value. */
  phone: string;
  /** Reuse the modal's existing handleInputChange (input uses name="phone"). */
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Currently selected dial code, e.g. "+675". */
  dialCode: string;
  /** Currently selected ISO country code, e.g. "pg". */
  countryCode: string;
  /** Called when the user picks a different country. */
  onCountryChange: (dialCode: string, countryCode: string) => void;
  name?: string;
  placeholder?: string;
  required?: boolean;
}

const PhoneInput = ({
  phone,
  onPhoneChange,
  dialCode,
  countryCode,
  onCountryChange,
  name = "phone",
  placeholder = "PHONE",
  required = true,
}: PhoneInputProps) => {
  return (
    <div className="flex min-w-0">
      <CountryCodeDropdown
        dialCode={dialCode}
        countryCode={countryCode}
        onSelect={onCountryChange}
        className="flex items-center gap-1 self-stretch rounded-l-lg border border-r-0 border-gray-300 bg-white px-2 py-2.5 text-sm text-gray-700 focus:border-green-500 focus:outline-none sm:px-3 sm:py-3 sm:text-base"
      />
      <input
        type="tel"
        name={name}
        placeholder={placeholder}
        value={phone}
        onChange={onPhoneChange}
        className={`${formFieldClass} rounded-l-none`}
        required={required}
        aria-label={`Phone number, dial code ${dialCode}`}
      />
    </div>
  );
};

export default PhoneInput;
