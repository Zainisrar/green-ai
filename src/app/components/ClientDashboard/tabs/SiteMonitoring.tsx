"use client";

import React, { useState } from "react";
import { Sun, Zap, BatteryCharging, Home, Grid3x3 } from "lucide-react";
import { Card, SectionTitle, Legend } from "../ui";
import { LineChart } from "../charts/Charts";

const StatBox: React.FC<{ label: string; value: string; icon: React.ElementType }> = ({
  label,
  value,
  icon: Icon,
}) => (
  <div className="rounded-xl border border-gray-100 shadow-sm p-4">
    <div className="flex items-center justify-between">
      <span className="text-xs text-gray-500">{label}</span>
      <Icon className="h-4 w-4 text-[#4CAF50]" />
    </div>
    <p className="mt-3 text-lg font-bold text-gray-800">{value}</p>
  </div>
);

const FlowNode: React.FC<{ icon: React.ElementType; label?: string }> = ({ icon: Icon, label }) => (
  <div className="flex flex-col items-center">
    <div className="h-12 w-12 rounded-lg border border-[#4CAF50]/40 bg-[#4CAF50]/5 flex items-center justify-center">
      <Icon className="h-5 w-5 text-[#4CAF50]" />
    </div>
    {label && <span className="text-[9px] text-gray-500 mt-1">{label}</span>}
  </div>
);

const SiteMonitoring = () => {
  const [range, setRange] = useState("Days");

  return (
    <div>
      <SectionTitle>Site Monitoring</SectionTitle>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          <StatBox label="Total Capacity" value="120 kWp" icon={Sun} />
          <StatBox label="Total Production" value="642 kWh" icon={Zap} />
          <StatBox label="Grid Export" value="88 kWh" icon={Grid3x3} />
          <StatBox label="Total Consumption" value="554 kWh" icon={Home} />
        </div>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-700">
              Power Flow <span className="text-gray-400 font-normal">(hourly)</span>
            </h3>
            <span className="text-[10px] text-[#4CAF50] border border-[#4CAF50]/40 rounded px-2 py-0.5">
              Active
            </span>
          </div>
          <div className="flex flex-col items-center gap-2 py-2">
            <FlowNode icon={Sun} />
            <span className="text-[#8BC34A]">↓</span>
            <div className="flex items-center gap-3">
              <FlowNode icon={Grid3x3} />
              <span className="text-[#8BC34A]">→</span>
              <FlowNode icon={BatteryCharging} />
              <span className="text-[#8BC34A]">→</span>
              <FlowNode icon={Home} />
            </div>
            <span className="text-[#8BC34A]">↓</span>
            <FlowNode icon={Home} />
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-3">
          <div>
            <h3 className="text-sm font-semibold text-gray-700">
              Production and Consumption History <span className="text-[#4CAF50]">#</span>
            </h3>
            <div className="mt-2">
              <Legend
                items={[
                  { color: "#4CAF50", label: "Production" },
                  { color: "#F5A623", label: "Consumption" },
                ]}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex rounded-md border border-gray-200 overflow-hidden text-xs">
              {["Days", "Month", "Years"].map((r) => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className={`px-3 py-1.5 ${range === r ? "bg-[#4CAF50] text-white" : "text-gray-600"}`}
                >
                  {r}
                </button>
              ))}
            </div>
            <input
              type="date"
              defaultValue="2023-11-09"
              className="border border-gray-200 rounded px-2 py-1 text-xs text-gray-600"
            />
          </div>
        </div>

        <div className="relative">
          <LineChart
            points={[0, 5, 20, 45, 70, 85, 90, 78, 55, 30, 12, 4]}
            labels={["0h", "4h", "8h", "12h", "16h", "20h"]}
            color="#4CAF50"
            area
          />
          <div className="absolute inset-0 pointer-events-none">
            <LineChart
              points={[10, 12, 18, 25, 35, 40, 48, 52, 44, 30, 22, 15]}
              color="#F5A623"
            />
          </div>
        </div>
        <p className="text-[10px] text-gray-400 text-right mt-2">
          # SolarMan Data synchronization upto Nov 2023
        </p>
      </Card>
    </div>
  );
};

export default SiteMonitoring;
