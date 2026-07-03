"use client";

import React, { useState } from "react";
import { Paperclip } from "lucide-react";
import { Card, SectionTitle, ChartMenu } from "../ui";
import { GaugeMeter, SimpleBarChart } from "../charts/Charts";

const History = () => {
  const [subTab, setSubTab] = useState(0);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <SectionTitle>Service and Support</SectionTitle>
        <div className="flex items-center gap-1 text-xs text-gray-500 border border-gray-200 rounded px-2 py-1">
          Filter : <select className="bg-transparent focus:outline-none"><option>All</option></select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex gap-3 mb-6">
            {["Your Service Calls", "Service Request"].map((t, i) => (
              <button
                key={t}
                onClick={() => setSubTab(i)}
                className={`rounded-md border px-4 py-2 text-sm ${
                  subTab === i ? "border-[#4CAF50] text-gray-800 shadow-sm" : "border-gray-200 text-gray-500"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <Card>
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-sm font-semibold text-gray-800">
                Pimaga Power Terminal Block Cable Burnout (GL_SRVC#_000102)
              </h3>
              <span className="text-[10px] text-orange-500 border border-orange-300 rounded-full px-2 py-0.5">
                Closed
              </span>
            </div>
            <p className="text-xs text-[#4CAF50] mb-4">• 08-Sep-2023 at 04:53 PM</p>

            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-xs">
              <Meta label="Site Location" value="Pimaga" />
              <Meta label="Raised by" value="Mr.Wilson Mondo" />
              <Meta label="Service / Issue Type" value="Technical Support" />
              <Meta label="Priority" value="High" valueClass="text-orange-500" />
              <div className="col-span-2">
                <p className="text-gray-400 mb-1">Related Document</p>
                <span className="flex items-center gap-1 text-[#4CAF50]">
                  <Paperclip className="h-3 w-3" /> Attachment
                </span>
              </div>
              <div className="col-span-2 md:col-span-6">
                <p className="text-gray-400 mb-1">Description</p>
                <p className="text-gray-600">
                  Power Terminal block in the GDB from cable output to Load, Blue Phase
                  experience burnt and ongoing sparks.
                </p>
              </div>
            </div>
          </Card>

          <div className="flex items-center justify-end gap-2 mt-4 text-xs text-gray-500">
            <span>1-1 of 1</span>
            <button className="border border-gray-200 rounded px-3 py-1">Prev</button>
            <button className="border border-gray-200 rounded px-3 py-1">Next</button>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-700">CSAT</h3>
              <select className="text-xs text-gray-500 bg-transparent focus:outline-none">
                <option>All</option>
              </select>
            </div>
            <div className="flex justify-center">
              <GaugeMeter value={100} label="100" />
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-700">Service Logs</h3>
              <ChartMenu />
            </div>
            <SimpleBarChart
              categories={["Open", "Answered", "Resolved", "Verified", "Closed", "Reopen"]}
              values={[0, 0, 0, 0, 1, 0]}
              highlightIndex={4}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

const Meta: React.FC<{ label: string; value: string; valueClass?: string }> = ({
  label,
  value,
  valueClass = "text-gray-700",
}) => (
  <div>
    <p className="text-gray-400 mb-1">{label}</p>
    <p className={valueClass}>{value}</p>
  </div>
);

export default History;
