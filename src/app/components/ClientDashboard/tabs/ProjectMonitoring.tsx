"use client";

import React from "react";
import { TrendingUp, CalendarDays, ShieldCheck } from "lucide-react";
import { Card, Legend } from "../ui";
import { ProgressGauge, DonutChart, GroupedBarChart } from "../charts/Charts";

const phases = [
  { title: "Engineering", completed: 21, months: [30, 70, 40, 20] },
  { title: "Procurement", completed: 83, months: [65, 60, 30, 15] },
  { title: "Construction", completed: 28, months: [20, 35, 30, 25] },
];

const ProjectMonitoring = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Project Monitoring</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-700">Current Progress Data</h3>
              <TrendingUp className="h-4 w-4 text-[#4CAF50]" />
            </div>
            <ul className="text-xs text-gray-600 space-y-2">
              <li>Actual Start Date : 04-Jan-2023</li>
              <li>Baseline End Date : 08-Jun-2023</li>
              <li>Commisioned Date : undefined</li>
            </ul>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Overall Progress</h3>
            <div className="flex justify-center">
              <ProgressGauge value={100} />
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-700">Safety Statistics</h3>
              <ShieldCheck className="h-4 w-4 text-[#4CAF50]" />
            </div>
            <ul className="text-xs text-gray-600 space-y-2">
              <li className="flex justify-between"><span>Total M-hrs</span><span>17,360</span></li>
              <li className="flex justify-between"><span>Lost Time Injury</span><span>0</span></li>
              <li className="flex justify-between"><span>M-hrs/Lost Time Injury</span><span>17,360</span></li>
            </ul>
            <div className="mt-4 border-t border-gray-100 pt-3">
              <p className="text-sm font-semibold text-gray-700 mb-2">Man-Hours (M-hrs)</p>
              <div className="flex justify-between text-xs">
                <div>
                  <p className="text-gray-400">Planned</p>
                  <p className="text-base font-bold text-gray-800">18,600</p>
                </div>
                <div>
                  <p className="text-gray-400">Actual</p>
                  <p className="text-base font-bold text-gray-800">17,360</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-700">Project Calendar</h3>
              <CalendarDays className="h-4 w-4 text-[#4CAF50]" />
            </div>
            <div className="grid grid-cols-3 text-center">
              <CalItem label="Total Days of The Project" value="155" />
              <CalItem label="Elapsed Days" value="0" />
              <CalItem label="Remaining Days" value="0" />
            </div>
          </Card>

          {/* Phase bar charts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {phases.map((p) => (
              <Card key={p.title}>
                <p className="text-xs font-semibold text-gray-700 mb-1">
                  {p.title} - 100 % completed
                </p>
                <Legend
                  items={[
                    { color: "#4CAF50", label: "Planned Status" },
                    { color: "#F5A623", label: "Actual Status" },
                  ]}
                />
                <div className="mt-2">
                  <GroupedBarChart
                    categories={["Jan 23", "Feb 23", "Mar 23", "Apr 23"]}
                    planned={p.months}
                    actual={p.months.map((m) => Math.max(0, m - 5))}
                    height={150}
                  />
                </div>
              </Card>
            ))}
          </div>

          {/* Phase donuts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {phases.map((p) => (
              <Card key={p.title}>
                <p className="text-xs font-semibold text-gray-700 mb-2">{p.title}</p>
                <div className="flex justify-center">
                  <DonutChart value={100} centerLabel="100.0%" />
                </div>
                <div className="mt-2 text-[10px] text-gray-500 space-y-1">
                  <p className="flex items-center gap-1">
                    <span className="inline-block h-2 w-2 rounded-full bg-[#F5A623]" /> Remaining Task 0
                  </p>
                  <p className="flex items-center gap-1">
                    <span className="inline-block h-2 w-2 rounded-full bg-[#4CAF50]" /> Completed Task {p.completed}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CalItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-400 mb-2">{label}</p>
    <p className="text-3xl font-extrabold text-gray-800">{value}</p>
  </div>
);

export default ProjectMonitoring;
