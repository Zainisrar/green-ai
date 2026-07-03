"use client";

import React from "react";
import { Leaf, TreePine, Car, Factory, Fuel, Droplets } from "lucide-react";
import { Card, SectionTitle } from "../ui";
import { LineChart } from "../charts/Charts";

const factors = [
  { icon: TreePine, label: "Trees Planted (Equivalent)", value: "3,120" },
  { icon: Car, label: "Cars off the Road", value: "142" },
  { icon: Factory, label: "CO₂ Avoided (tonnes)", value: "918" },
  { icon: Fuel, label: "Coal Not Burned (tonnes)", value: "406" },
  { icon: Droplets, label: "Water Saved (kL)", value: "12,540" },
  { icon: Leaf, label: "SO₂ Reduced (kg)", value: "2,760" },
];

const EnvironmentalSaving = () => {
  return (
    <div>
      <SectionTitle>Environmental Saving</SectionTitle>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="min-h-[240px]">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Monthly Carbon Offset</h3>
          <LineChart
            points={[12, 28, 22, 40, 55, 48, 70, 82, 76, 90]}
            labels={["Jan", "Mar", "May", "Jul", "Sep", "Nov"]}
            color="#4CAF50"
            area
            showDots
          />
        </Card>

        <Card className="min-h-[240px]">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-700">
              Total Carbon Emission Saved <span className="text-[#4CAF50]">*</span>
            </h3>
            <select className="border border-gray-200 rounded px-2 py-1 text-xs text-gray-600">
              <option>2023</option>
            </select>
          </div>
          <p className="text-[10px] text-gray-400 mb-6">
            * SolarMan Data synchronization upto Nov 2023 (in tonnes)
          </p>
          <div className="flex flex-col items-center justify-center py-6">
            <span className="text-5xl font-extrabold text-[#4CAF50]">918</span>
            <span className="text-sm text-gray-500 mt-2">tonnes CO₂ saved</span>
          </div>
        </Card>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <Leaf className="h-4 w-4 text-[#4CAF50]" />
        <h3 className="text-sm font-semibold text-gray-700">
          Project Environment Factors <span className="text-gray-400 font-normal">(Per Annum)</span>
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {factors.map((f) => {
          const Icon = f.icon;
          return (
            <div
              key={f.label}
              className="rounded-lg border border-gray-100 shadow-sm px-5 py-5 flex items-center gap-4"
            >
              <div className="h-11 w-11 rounded-full bg-[#4CAF50]/10 flex items-center justify-center">
                <Icon className="h-5 w-5 text-[#4CAF50]" />
              </div>
              <div>
                <p className="text-lg font-bold text-gray-800">{f.value}</p>
                <p className="text-xs text-gray-500">{f.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EnvironmentalSaving;
