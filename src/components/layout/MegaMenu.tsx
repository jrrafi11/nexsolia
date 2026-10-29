"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Bot, 
  Network, 
  Cpu, 
  Radio, 
  ShieldCheck, 
  BarChart3, 
  ArrowRight, 
  Sparkles,
  ChevronRight
} from "lucide-react";
import { MEGA_MENU_CATEGORIES } from "@/data/navigation";

const iconMap: Record<string, React.ElementType> = {
  Bot,
  Network,
  Cpu,
  Radio,
  ShieldCheck,
  BarChart3,
};

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  const [activeTabId, setActiveTabId] = useState(MEGA_MENU_CATEGORIES[0].id);

  if (!isOpen) return null;

  const currentCategory =
    MEGA_MENU_CATEGORIES.find((c) => c.id === activeTabId) ||
    MEGA_MENU_CATEGORIES[0];
  const CurrentIcon = iconMap[currentCategory.icon] || Bot;

  return (
    <div
      className="absolute top-full left-1/2 -translate-x-1/2 w-[min(1200px,calc(100vw-32px))] pt-3 z-[999999] animate-fadeIn"
      onMouseLeave={onClose}
    >
      <div className="bg-[#030d1e]/98 backdrop-blur-2xl border border-blue-500/30 rounded-3xl shadow-[0_30px_90px_rgba(0,128,232,0.35)] overflow-hidden">
        <div className="grid grid-cols-[300px_minmax(0,1fr)] min-h-[520px]">
          {/* Left Tabs Column */}
          <div className="p-3 bg-blue-950/40 border-r border-blue-900/40 flex flex-col gap-1.5">
            <div className="px-3 py-2 text-[11px] font-bold tracking-wider text-sky-400 uppercase">
              Core Architectures
            </div>
            {MEGA_MENU_CATEGORIES.map((cat) => {
              const Icon = iconMap[cat.icon] || Bot;
              const isActive = cat.id === activeTabId;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTabId(cat.id)}
                  onMouseEnter={() => setActiveTabId(cat.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-left transition-all ${
                    isActive
                      ? "bg-blue-600/25 border border-blue-500/50 text-white shadow-[0_4px_20px_rgba(0,144,232,0.25)]"
                      : "hover:bg-blue-900/20 text-slate-300 hover:text-white border border-transparent"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isActive
                        ? "bg-gradient-to-br from-blue-500 to-sky-400 text-white shadow-[0_0_15px_rgba(0,160,240,0.6)]"
                        : "bg-blue-900/40 text-sky-400"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold leading-tight truncate">
                      {cat.name}
                    </div>
                  </div>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${
                      isActive
                        ? "bg-sky-400 text-black border-sky-300"
                        : "bg-blue-950/60 text-slate-400 border-blue-800/40"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Content Panel */}
          <div className="p-7 flex flex-col justify-between bg-gradient-to-br from-transparent to-blue-950/20">
            <div>
              {/* Category Header */}
              <div className="flex items-center justify-between pb-5 mb-5 border-b border-blue-900/40">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600/30 to-sky-500/20 border border-blue-400/40 flex items-center justify-center text-sky-400 shadow-[0_0_20px_rgba(0,160,240,0.3)]">
                    <CurrentIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-white">
                      {currentCategory.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                      {currentCategory.description}
                    </p>
                  </div>
                </div>

                <Link
                  href="/solutions"
                  onClick={onClose}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-sky-300 border border-blue-500/40 hover:bg-blue-600 hover:text-white transition-all shadow-[0_0_15px_rgba(0,128,232,0.2)]"
                >
                  <span>Explore All Solutions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Sub-Items Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {currentCategory.items.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={onClose}
                    className="group p-3 rounded-xl bg-blue-950/25 hover:bg-blue-900/40 border border-blue-900/30 hover:border-blue-500/50 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1.5 mb-1">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 group-hover:scale-125 transition-transform shadow-[0_0_6px_#38bdf8]" />
                          <span className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors">
                            {item.title}
                          </span>
                        </div>
                        {item.badge && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-500/20 text-sky-300 border border-blue-500/40 font-mono">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 group-hover:text-slate-300 transition-colors line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom Highlight Strip (Matches Reference Site Strip) */}
            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-blue-950 via-[#031535] to-[#041a42] border border-blue-500/30 flex items-center justify-between gap-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-sky-400 shrink-0">
                  <Sparkles className="w-5 h-5 text-sky-300" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <span>Enterprise Architecture Validation & Sandbox POC</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-400/20 text-sky-300 border border-sky-400/30 font-bold">
                      Zero Risk
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Test your high-load workflows and proprietary schemas inside a secured Nexsolia sandbox with dedicated solutions engineering.
                  </p>
                </div>
              </div>

              <Link
                href="/contact"
                onClick={onClose}
                className="whitespace-nowrap px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white text-xs font-extrabold transition-all shadow-[0_0_20px_rgba(0,144,232,0.4)] flex items-center gap-1.5 shrink-0"
              >
                <span>Request Sandbox</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
