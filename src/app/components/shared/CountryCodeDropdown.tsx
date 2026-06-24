"use client";

import React, { useEffect, useRef, useState } from "react";
import { COUNTRIES } from "@/app/lib/countries";

interface CountryCodeDropdownProps {
  /** Currently selected dial code, e.g. "+675" (shown in the collapsed field). */
  dialCode: string;
  /** Currently selected ISO country code, e.g. "pg". */
  countryCode: string;
  /** Called when the user picks a country. */
  onSelect: (dialCode: string, countryCode: string) => void;
  /** Classes applied to the trigger button (lets callers match their field style). */
  className?: string;
}

/**
 * Custom country-code picker: the collapsed trigger shows ONLY the dial code,
 * while the open list shows the dial code together with the country name.
 */
const CountryCodeDropdown = ({
  dialCode,
  countryCode,
  onSelect,
  className = "",
}: CountryCodeDropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Select country code"
        aria-expanded={open}
        className={className}
      >
        <span>{dialCode}</span>
        <svg
          className="h-3 w-3 text-gray-500"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <ul className="scrollbar-hide absolute left-0 top-full z-[60] mt-1 max-h-60 w-64 overflow-y-auto rounded-lg border border-gray-300 bg-white py-1 text-left shadow-lg">
          {COUNTRIES.map((c) => (
            <li key={c.code}>
              <button
                type="button"
                onClick={() => {
                  onSelect(c.dial_code, c.code);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-green-50 ${
                  c.code === countryCode ? "bg-green-100 text-green-700" : "text-gray-700"
                }`}
              >
                <span className="w-12 shrink-0 text-gray-500">{c.dial_code}</span>
                <span className="truncate">{c.name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CountryCodeDropdown;
