"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ChevronDown, ChevronRight, Search, ShieldCheck, Mail, Phone, ExternalLink } from "lucide-react";
import { MEGA_MENU_CATEGORIES, NAV_LINKS } from "@/data/navigation";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}

export default function MobileDrawer({ isOpen, onClose, onOpenSearch }: MobileDrawerProps) {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleCategory = (id: string) => {
    setOpenCategory(openCategory === id ? null : id);
  };

  return (
    <div className="fixed inset-0 z-[9999999] lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="fixed top-0 bottom-0 right-0 w-[min(380px,88vw)] bg-[#030d1e] border-l border-blue-500/30 p-6 flex flex-col justify-between overflow-y-auto shadow-[0_0_80px_rgba(0,128,232,0.3)]">
        <div>
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-blue-900/40">
            <Link href="/" onClick={onClose} className="flex items-center gap-2.5">
              <Image
                src="/logo-icon.png"
                alt="Nexsolia"
                width={34}
                height={34}
                className="object-contain drop-shadow-[0_0_8px_rgba(0,160,240,0.6)]"
              />
              <span className="text-lg font-black tracking-wide text-white">
                NEX<span className="text-sky-400">SOLIA</span>
              </span>
            </Link>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-blue-900/40 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Search Button */}
          <button
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
            className="w-full mb-5 flex items-center justify-between px-4 py-2.5 rounded-xl bg-blue-950/50 border border-blue-800/40 text-slate-400 text-xs hover:border-blue-500/50 hover:text-white transition-all"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-sky-400" />
              <span>Quick Search...</span>
            </div>
            <kbd className="px-1.5 py-0.5 rounded bg-blue-900/40 border border-blue-700/40 text-[10px] text-sky-300 font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Navigation Links */}
          <div className="space-y-1">
            <Link
              href="/"
              onClick={onClose}
              className="block px-3 py-2.5 rounded-xl text-sm font-bold text-white hover:bg-blue-900/30 hover:text-sky-300 transition-colors"
            >
              Home
            </Link>

            {/* Accordion: Solutions */}
            <div className="border-t border-b border-blue-900/30 py-2 my-2">
              <div className="px-3 py-1 text-[11px] font-bold tracking-wider text-sky-400 uppercase">
                Solutions Architecture
              </div>
              <div className="space-y-1 mt-1">
                {MEGA_MENU_CATEGORIES.map((cat) => {
                  const isExpanded = openCategory === cat.id;
                  return (
                    <div key={cat.id} className="rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleCategory(cat.id)}
                        className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold text-slate-300 hover:text-white hover:bg-blue-900/20 transition-colors"
                      >
                        <span className="truncate pr-2">{cat.name}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 transition-transform ${
                            isExpanded ? "rotate-180 text-sky-400" : ""
                          }`}
                        />
                      </button>

                      {isExpanded && (
                        <div className="pl-4 pr-2 py-1 space-y-1 bg-blue-950/30 border-l-2 border-sky-400/60 ml-3 my-1">
                          {cat.items.map((sub, sIdx) => (
                            <Link
                              key={sIdx}
                              href={sub.href}
                              onClick={onClose}
                              className="block py-1.5 px-2 text-[11px] font-medium text-slate-300 hover:text-sky-300 transition-colors"
                            >
                              {sub.title}
                            </Link>
                          ))}
                          <Link
                            href="/solutions"
                            onClick={onClose}
                            className="block py-1.5 px-2 text-[11px] font-bold text-sky-400 hover:underline"
                          >
                            View All {cat.name} →
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <Link
              href="/#sectors"
              onClick={onClose}
              className="block px-3 py-2.5 rounded-xl text-sm font-bold text-white hover:bg-blue-900/30 hover:text-sky-300 transition-colors"
            >
              Target Sectors
            </Link>

            <Link
              href="/projects"
              onClick={onClose}
              className="block px-3 py-2.5 rounded-xl text-sm font-bold text-white hover:bg-blue-900/30 hover:text-sky-300 transition-colors"
            >
              Case Studies & Portfolio
            </Link>

            <Link
              href="/compare"
              onClick={onClose}
              className="block px-3 py-2.5 rounded-xl text-sm font-bold text-white hover:bg-blue-900/30 hover:text-sky-300 transition-colors"
            >
              System Architecture Selector
            </Link>

            <Link
              href="/about"
              onClick={onClose}
              className="block px-3 py-2.5 rounded-xl text-sm font-bold text-white hover:bg-blue-900/30 hover:text-sky-300 transition-colors"
            >
              About Nexsolia
            </Link>

            <Link
              href="/contact"
              onClick={onClose}
              className="block px-3 py-2.5 rounded-xl text-sm font-bold text-white hover:bg-blue-900/30 hover:text-sky-300 transition-colors"
            >
              Contact & RFP
            </Link>
          </div>
        </div>

        {/* Bottom CTA Box */}
        <div className="pt-6 border-t border-blue-900/40 space-y-3">
          <Link
            href="/contact"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 text-white font-extrabold text-xs tracking-wide shadow-[0_0_20px_rgba(0,144,232,0.4)]"
          >
            <span>Schedule Architecture Review</span>
            <ChevronRight className="w-4 h-4" />
          </Link>

          <div className="text-center text-[11px] text-slate-400">
            <span>Enterprise SLA: 99.99% · SOC 2 Type II</span>
          </div>
        </div>
      </div>
    </div>
  );
}
