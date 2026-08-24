"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Headphones,
  History as HistoryIcon,
  Gauge,
  Leaf,
  Activity,
  LayoutDashboard,
  Receipt,
  LogOut,
  Zap,
} from "lucide-react";

import ServiceSupport from "./tabs/ServiceSupport";
import History from "./tabs/History";
import FinancialROI from "./tabs/FinancialROI";
import EnvironmentalSaving from "./tabs/EnvironmentalSaving";
import SiteMonitoring from "./tabs/SiteMonitoring";
import ProjectMonitoring from "./tabs/ProjectMonitoring";
import AccountsStatement from "./tabs/AccountsStatement";

type TabKey =
  | "service"
  | "history"
  | "roi"
  | "environment"
  | "site"
  | "project"
  | "accounts";

const TABS: { key: TabKey; label: string; icon: React.ElementType }[] = [
  { key: "service", label: "Service & Support", icon: Headphones },
  { key: "history", label: "History", icon: HistoryIcon },
  { key: "roi", label: "Financial ROI", icon: Gauge },
  { key: "environment", label: "Environmental Saving", icon: Leaf },
  { key: "site", label: "Site Monitoring", icon: Activity },
  { key: "project", label: "Project Monitoring", icon: LayoutDashboard },
  { key: "accounts", label: "Accounts and Statement", icon: Receipt },
];

const ClientDashboard = () => {
  const router = useRouter();
  const [active, setActive] = useState<TabKey>("service");

  const renderTab = () => {
    switch (active) {
      case "service":
        return <ServiceSupport />;
      case "history":
        return <History />;
      case "roi":
        return <FinancialROI />;
      case "environment":
        return <EnvironmentalSaving />;
      case "site":
        return <SiteMonitoring />;
      case "project":
        return <ProjectMonitoring />;
      case "accounts":
        return <AccountsStatement />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Top bar */}
      <header className="relative">
        <div className="h-2 w-full bg-[#4a4a4a]" />
        <div className="flex items-center justify-between px-4 lg:px-10 py-4">
          <a href="/home/renewable-energy-the-core" className="shrink-0">
            <span className="block text-3xl font-black leading-none text-[#4CAF50] tracking-tight italic">
              GREEN
            </span>
            <span className="block text-[10px] font-semibold text-[#4CAF50]">
              Future: Envisioned
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-6 lg:gap-9 uppercase text-sm text-gray-700">
            <a href="/explore/welcome-to-green">Explore</a>
            <a href="/energy">Energy</a>
            <a href="/engineering/products/lighting-up-and-lifting-up-living-standards">
              Elements
            </a>
            <a href="/expertise">Expertise</a>
            <a href="/empower/join-us">Enlist</a>
            <a href="/engage/reach-us">Engage</a>
          </nav>
          <Zap className="h-8 w-8 text-[#8BC34A] fill-[#8BC34A]" />
        </div>
      </header>

      {/* Greeting row */}
      <div className="flex items-start justify-between px-4 lg:px-10">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Dear Mr.John</h1>
          <p className="text-sm text-[#4CAF50] font-medium">
            Welcome to GREEN Value Engineering
          </p>
        </div>
        <div className="flex items-center gap-2 text-right">
          <span className="text-[10px] text-gray-400">Sites</span>
          <div className="w-16 h-10 overflow-hidden rounded border border-gray-200 relative">
            <img loading="lazy" decoding="async"
              src="/images/client-value-engineering/bg.jpg"
              alt="site"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
            <span className="absolute inset-0 flex items-center justify-center text-[6px] text-white bg-black/30 text-center px-1">
              Pimaga Rural Hospital Solar Mini-Grid
            </span>
          </div>
        </div>
      </div>

      {/* Body: side rail + sidebar + content */}
      <div className="flex flex-col lg:flex-row px-2 sm:px-4 lg:px-8 py-4 lg:py-6 gap-3 lg:gap-3">
        {/* Vertical CLIENT PARTNER label */}
        <div className="hidden xl:flex items-center justify-center w-10 shrink-0">
          <span
            className="text-4xl font-black tracking-widest text-gray-200 select-none"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            CLIENT PARTNER
          </span>
        </div>

        {/* Icon sidebar: horizontal scroll strip on mobile, vertical rail on desktop */}
        <aside className="shrink-0 w-full lg:w-28 bg-[#fafafa] border border-gray-100 rounded-lg p-2 lg:py-4 flex flex-row lg:flex-col items-stretch lg:items-center gap-1 overflow-x-auto lg:overflow-visible">
          {TABS.map((t) => {
            const Icon = t.icon;
            const isActive = active === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={`shrink-0 lg:w-full min-w-[74px] lg:min-w-0 flex flex-col items-center gap-1 px-2 lg:px-1 py-2.5 lg:py-3 rounded-md lg:rounded-none text-[10px] leading-tight text-center transition-colors border-b-2 lg:border-b-0 lg:border-l-2 ${
                  isActive
                    ? "border-[#4CAF50] text-[#4CAF50] bg-white"
                    : "border-transparent text-gray-500 hover:text-[#4CAF50]"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{t.label}</span>
              </button>
            );
          })}
          <button
            onClick={() => router.push("/client-value-engineering")}
            className="shrink-0 lg:w-full min-w-[74px] lg:min-w-0 flex flex-col items-center gap-1 px-2 lg:px-1 py-2.5 lg:py-3 rounded-md lg:rounded-none text-[10px] leading-tight text-center text-gray-500 hover:text-red-500 border-b-2 lg:border-b-0 lg:border-l-2 border-transparent lg:mt-2"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0 w-full">{renderTab()}</main>
      </div>
    </div>
  );
};

export default ClientDashboard;
