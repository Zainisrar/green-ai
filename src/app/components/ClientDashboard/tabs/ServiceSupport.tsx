"use client";

import React, { useState } from "react";
import { UploadCloud, Plus, Minus, MapPin } from "lucide-react";
import { SectionTitle } from "../ui";

const SUB_TABS = ["Log a Service Call", "Request a Service", "Talk to Us"];

const StaticMap = () => (
  <div className="relative h-full min-h-[280px] lg:min-h-[420px] rounded-lg overflow-hidden border border-gray-200 bg-[#e8ead9]">
    {/* faux terrain */}
    <svg viewBox="0 0 300 400" className="absolute inset-0 w-full h-full">
      <rect width="300" height="400" fill="#e9ebd8" />
      <path d="M0 120 C60 140 120 90 300 160" stroke="#cfd3b4" strokeWidth="10" fill="none" opacity="0.6" />
      <path d="M40 0 C60 120 20 260 90 400" stroke="#b9d0a8" strokeWidth="6" fill="none" opacity="0.7" />
      <path d="M300 40 C200 120 220 240 140 400" stroke="#c7cbaa" strokeWidth="8" fill="none" opacity="0.6" />
      <path d="M0 300 C90 280 160 320 300 300" stroke="#e0c98f" strokeWidth="3" fill="none" />
      <circle cx="150" cy="200" r="3" fill="#7a7a7a" />
      <text x="70" y="215" fontSize="8" fill="#7a7a7a">Damayu</text>
      <text x="165" y="205" fontSize="8" fill="#7a7a7a">Pimaga</text>
      <text x="230" y="215" fontSize="8" fill="#7a7a7a">Orokana</text>
      <text x="120" y="70" fontSize="8" fill="#7a7a7a">Babu</text>
    </svg>
    <MapPin className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full h-7 w-7 text-blue-500 fill-blue-500" />
    <div className="absolute right-2 top-2 flex flex-col rounded border border-gray-300 bg-white">
      <button className="p-1 border-b border-gray-200"><Plus className="h-3 w-3" /></button>
      <button className="p-1"><Minus className="h-3 w-3" /></button>
    </div>
    <span className="absolute bottom-1 right-1 text-[7px] text-gray-500">
      Leaflet | © OpenStreetMap contributors
    </span>
  </div>
);

const Field: React.FC<{ label: string; required?: boolean; children: React.ReactNode }> = ({
  label,
  required,
  children,
}) => (
  <div>
    <label className="block text-[11px] text-gray-500 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);

const inputCls =
  "w-full border-b border-gray-300 bg-transparent py-1.5 text-sm text-gray-700 focus:border-[#4CAF50] focus:outline-none";

const ServiceSupport = () => {
  const [subTab, setSubTab] = useState(0);

  return (
    <div>
      <SectionTitle>Service and Support</SectionTitle>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* sub tabs */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-8">
            {SUB_TABS.map((t, i) => (
              <button
                key={t}
                onClick={() => setSubTab(i)}
                className={`rounded-md border px-4 py-2 text-sm ${
                  subTab === i
                    ? "border-[#4CAF50] text-gray-800 shadow-sm"
                    : "border-gray-200 text-gray-500"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <Field label="Title" required>
              <input className={inputCls} />
            </Field>
            <Field label="Site Location" required>
              <input className={inputCls} defaultValue="Pimaga Rural Hospital Solar Mini-Grid" />
            </Field>
            <Field label="Raised by" required>
              <input className={inputCls} defaultValue="janet.james@nexttechnosolutions.co.in" />
            </Field>
            <Field label="Service / Issue Type" required>
              <select className={inputCls}>
                <option>Service / Issue Type</option>
                <option>Technical Support</option>
                <option>Maintenance</option>
                <option>Billing</option>
              </select>
            </Field>
            <Field label="Choose the Priority" required>
              <select className={inputCls}>
                <option>Choose the Priority</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </Field>
            <div className="hidden md:block" />
            <div className="md:col-span-2">
              <Field label="Description" required>
                <textarea rows={4} className="w-full border border-gray-300 rounded-md p-2 text-sm focus:border-[#4CAF50] focus:outline-none" />
              </Field>
            </div>
            <div className="md:col-span-2">
              <label className="block text-[11px] text-gray-500 mb-2">
                Related Document <span className="text-red-500">*</span>
              </label>
              <div className="border border-dashed border-gray-300 rounded-md py-8 lg:py-10 px-4 flex flex-col lg:flex-row items-center justify-center gap-3 lg:gap-2 relative text-center">
                <UploadCloud className="h-8 w-8 text-[#4CAF50] lg:absolute lg:left-8" />
                <div className="lg:text-left">
                  <p className="text-sm text-[#4CAF50] font-medium">
                    Select a file or drag and drop here
                  </p>
                  <p className="text-[11px] text-gray-400">
                    JPG, PNG, PDF or TXT format ( file size no more than 10 MB )
                  </p>
                </div>
                <button
                  type="button"
                  className="rounded border border-[#4CAF50] px-4 py-1.5 text-sm text-[#4CAF50] lg:absolute lg:right-6"
                >
                  Select File
                </button>
              </div>
            </div>
            <div className="md:col-span-2 flex justify-end">
              <button
                type="button"
                className="rounded-md bg-gradient-to-r from-[#8BC34A] to-[#4CAF50] px-10 py-2.5 text-white font-semibold shadow"
                style={{ clipPath: "polygon(6% 0, 100% 0, 94% 100%, 0 100%)" }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        <div className="lg:col-span-1">
          <StaticMap />
        </div>
      </div>
    </div>
  );
};

export default ServiceSupport;
