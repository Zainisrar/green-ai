"use client";

import type React from "react";
import CountryCodeDropdown from "@/app/components/shared/CountryCodeDropdown";
import { formFieldClass } from "@/app/components/shared/EngineeringFormModal";

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
  className?: string;
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
  className = "",
}: PhoneInputProps) => {
  return (
    <div
      className={`${formFieldClass} flex min-w-0 items-center p-0 ${className}`}
    >
      <input
        type="tel"
        name={name}
        placeholder={placeholder}
        value={phone}
        onChange={onPhoneChange}
        className="h-full min-w-0 flex-1 border-0 bg-transparent p-0 text-sm text-gray-700 placeholder-gray-500 focus:outline-none sm:text-base"
        required={required}
        aria-label={`Phone number, dial code ${dialCode}`}
      />
      <CountryCodeDropdown
        dialCode={dialCode}
        countryCode={countryCode}
        onSelect={onCountryChange}
        className="flex h-full shrink-0 items-center gap-2 border-0 bg-transparent px-5 text-sm text-gray-700 focus:outline-none sm:text-base"
      />
    </div>
  );
};

export default PhoneInput;
