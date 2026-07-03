"use client";

import React from "react";

export const Card: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className = "",
  children,
}) => (
  <div className={`rounded-xl border border-gray-100 bg-white shadow-sm p-4 ${className}`}>
    {children}
  </div>
);

export const StatCard: React.FC<{
  label: string;
  value: string;
  sub?: string;
}> = ({ label, value, sub }) => (
  <div className="rounded-xl border border-gray-100 bg-white shadow-sm px-4 py-4 flex-1 min-w-[140px]">
    <div className="flex items-start justify-between">
      <span className="text-xs text-gray-500">{label}</span>
      {sub && <span className="text-[10px] text-gray-400">{sub}</span>}
    </div>
    <div className="mt-3 text-xl lg:text-2xl font-extrabold text-gray-900">{value}</div>
  </div>
);

export const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-lg font-semibold text-gray-800 mb-4">{children}</h2>
);

export const ChartMenu: React.FC = () => (
  <div className="flex flex-col gap-[3px] cursor-pointer">
    <span className="block h-[2px] w-4 bg-gray-400" />
    <span className="block h-[2px] w-4 bg-gray-400" />
    <span className="block h-[2px] w-4 bg-gray-400" />
  </div>
);

export const Legend: React.FC<{ items: { color: string; label: string }[] }> = ({ items }) => (
  <div className="flex items-center gap-4 text-xs text-gray-500">
    {items.map((it) => (
      <span key={it.label} className="flex items-center gap-1">
        <span className="inline-block h-2 w-2 rounded-full" style={{ background: it.color }} />
        {it.label}
      </span>
    ))}
  </div>
);
