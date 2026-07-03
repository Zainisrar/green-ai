"use client";

import React from "react";
import { Link2 } from "lucide-react";
import { StatCard, Card, ChartMenu, Legend } from "../ui";
import { LineChart } from "../charts/Charts";

const revenuePaid = [0, 0, 210000, 0, 0, 560000, 0, 0, 0, 40000, 0, 0];
const revenueMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const RevenueBars = () => {
  const width = 440;
  const height = 220;
  const pad = { top: 16, right: 10, bottom: 26, left: 46 };
  const chartW = width - pad.left - pad.right;
  const chartH = height - pad.top - pad.bottom;
  const max = 600000;
  const slot = chartW / revenueMonths.length;
  const barW = slot * 0.45;
  const outstanding = [0, 0, 0, 0, 0, 180000, 0, 0, 0, 90000, 0, 0];
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
      {[0, 1, 2, 3, 4, 5, 6].map((t) => {
        const y = pad.top + chartH - (t / 6) * chartH;
        return (
          <g key={t}>
            <line x1={pad.left} y1={y} x2={width - pad.right} y2={y} stroke="#EEE" />
            <text x={pad.left - 4} y={y + 3} textAnchor="end" fontSize="7" className="fill-gray-400">
              K {t * 100}.000
            </text>
          </g>
        );
      })}
      {revenueMonths.map((m, i) => {
        const x = pad.left + i * slot + slot / 2;
        const pH = (revenuePaid[i] / max) * chartH;
        const oH = (outstanding[i] / max) * chartH;
        return (
          <g key={m}>
            <rect x={x - barW / 2 - 3} y={pad.top + chartH - pH} width={barW / 2} height={pH} fill="#4CAF50" />
            <rect x={x + 1} y={pad.top + chartH - oH} width={barW / 2} height={oH} fill="#F5A623" />
            <text x={x} y={height - 8} textAnchor="middle" fontSize="7" className="fill-gray-500">
              {m}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

const AccountsStatement = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Accounts and Statement</h2>
        <select className="border border-gray-200 rounded px-3 py-1.5 text-sm text-gray-600">
          <option>PNG - K</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <StatCard label="Total Outstanding" value="K 258,216" />
        <StatCard label="Total Paid Amount" value="K 770,743" />
        <StatCard label="Total Invoice Paid" value="75%" />
        <StatCard label="Total Invoice Due" value="25%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700">Revenue Report</h3>
            <div className="flex items-center gap-3">
              <Legend
                items={[
                  { color: "#4CAF50", label: "Paid" },
                  { color: "#F5A623", label: "Outstanding" },
                ]}
              />
              <select className="border border-gray-200 rounded px-2 py-0.5 text-xs">
                <option>2023</option>
              </select>
              <ChartMenu />
            </div>
          </div>
          <RevenueBars />
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700">Past Due Report</h3>
            <ChartMenu />
          </div>
          <div className="relative">
            <LineChart
              points={[1075, 974]}
              labels={["GL-Inv#005/2023", "GL-Inv#001/2023"]}
              color="#E5405E"
              showDots
              thick={2}
            />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Pending Invoices</h3>
          <div className="overflow-x-auto">
          <table className="w-full min-w-[440px] text-xs">
            <thead>
              <tr className="text-gray-400 text-left">
                <th className="pb-2 font-normal">Inv. No</th>
                <th className="pb-2 font-normal">Amount</th>
                <th className="pb-2 font-normal">Due Date</th>
                <th className="pb-2 font-normal">Invoice Document Link</th>
                <th className="pb-2 font-normal">Support Document Link</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              <InvoiceRow no="GL-Inv#005/2023" amount="K 215,079" due="29/Jun/2023" />
              <InvoiceRow no="GL-Inv#0011/2023" amount="K 43,137" due="08/Oct/2023" />
            </tbody>
          </table>
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Transaction History</h3>
          <div className="overflow-x-auto">
          <table className="w-full min-w-[420px] text-xs">
            <thead>
              <tr className="text-gray-400 text-left">
                <th className="pb-2 font-normal">Inv. No</th>
                <th className="pb-2 font-normal">Date</th>
                <th className="pb-2 font-normal">Amount</th>
                <th className="pb-2 font-normal">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              <TxnRow no="GL-Inv#002/2023" date="22/Apr/2023" amount="K 206,785" status="paid" />
              <TxnRow no="GL-Inv#004/2023" date="09/Jun/2023" amount="K 563,958" status="paid" />
              <TxnRow no="GL-Inv#005/2023" date="14/Jun/2023" amount="K 215,079" status="overdue - 1075 Days" overdue />
              <TxnRow no="GL-Inv#0011/2023" date="22/Sep/2023" amount="K 43,137" status="overdue - 974 Days" overdue />
            </tbody>
          </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

const InvoiceRow: React.FC<{ no: string; amount: string; due: string }> = ({ no, amount, due }) => (
  <tr className="border-t border-gray-100">
    <td className="py-2">{no}</td>
    <td className="py-2">{amount}</td>
    <td className="py-2">{due}</td>
    <td className="py-2">
      <span className="flex items-center gap-1 text-[#4CAF50]"><Link2 className="h-3 w-3" />Invoice</span>
    </td>
    <td className="py-2">
      <span className="flex items-center gap-1 text-[#4CAF50]"><Link2 className="h-3 w-3" />Support</span>
    </td>
  </tr>
);

const TxnRow: React.FC<{
  no: string;
  date: string;
  amount: string;
  status: string;
  overdue?: boolean;
}> = ({ no, date, amount, status, overdue }) => (
  <tr className="border-t border-gray-100">
    <td className="py-2">{no}</td>
    <td className="py-2">{date}</td>
    <td className="py-2">{amount}</td>
    <td className="py-2">
      <span
        className={`rounded-full px-2 py-0.5 text-[10px] ${
          overdue ? "bg-red-50 text-red-500 border border-red-200" : "bg-green-50 text-[#4CAF50] border border-green-200"
        }`}
      >
        {status}
      </span>
    </td>
  </tr>
);

export default AccountsStatement;
