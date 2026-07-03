"use client";

import React from "react";
import { StatCard, Card, ChartMenu, Legend } from "../ui";
import { ComboChart, LineChart } from "../charts/Charts";

const years = Array.from({ length: 25 }, (_, i) => 2023 + i);
const roiLine = years.map((_, i) => 20 + i * 22);
const roiBars = years.map((_, i) => 200000 + i * 150000 * (0.4 + i * 0.03));

const FinancialROI = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Financial ROI</h2>
        <select className="border border-gray-200 rounded px-3 py-1.5 text-sm text-gray-600">
          <option>PNG - K</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <StatCard label="Invested Amount" value="K 770,743" />
        <StatCard label="Payback Period" value="4.4 years" />
        <StatCard label="ROI" value="563 %" sub="25 Years" />
        <StatCard label="Total Expected Saving" value="K 4,340,322" sub="25 Years" />
        <StatCard label="LCOE" value="K 0.39/kWh" sub="25 Years" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700">Payback Period</h3>
            <div className="flex items-center gap-3">
              <Legend
                items={[
                  { color: "#F5A623", label: "PayBack" },
                  { color: "#8BC34A", label: "Cummulative Sav" },
                ]}
              />
              <ChartMenu />
            </div>
          </div>
          <ComboChart
            categories={[0, 1, 2, 3, 4, 5]}
            bars={[-770743, -550000, -250000, 120000, 500000, 900000]}
            line={[-770000, -400000, 100000, 700000, 1300000, 2000000]}
          />
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700">Net Present Value</h3>
            <Legend items={[{ color: "#4CAF50", label: "NPV" }]} />
          </div>
          <LineChart
            points={[35, 30, 25, 21, 18, 15, 12, 10, 8]}
            labels={["0%", "25%", "50%", "75%", "100%", "125%", "150%"]}
            color="#4CAF50"
            thick={7}
          />
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-700">
            Return on Investment <span className="text-red-500">*</span> – 563%
          </h3>
          <span className="text-xs text-gray-400">25 Years</span>
        </div>
        <ComboChart
          categories={years}
          bars={roiBars}
          line={roiLine}
          barColor="#8BC34A"
          lineColor="#F5A623"
          height={260}
        />
        <p className="text-[10px] text-gray-400 text-right mt-2">
          * YoY per unit tariff escalation is assumed at 2%
        </p>
      </Card>
    </div>
  );
};

export default FinancialROI;
