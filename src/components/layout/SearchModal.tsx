"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, X, Bot, Network, Cpu, Radio, ShieldCheck, BarChart3, ArrowRight } from "lucide-react";
import { MEGA_MENU_CATEGORIES } from "@/data/navigation";
import { SECTORS_DATA } from "@/data/sectors";
import { PROJECTS_DATA } from "@/data/projects";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter solutions
  const allSubItems = MEGA_MENU_CATEGORIES.flatMap((c) =>
    c.items.map((i) => ({ ...i, categoryName: c.name, type: "Solution" }))
  );

  const filteredSolutions = query
    ? allSubItems.filter(
        (i) =>
          i.title.toLowerCase().includes(query.toLowerCase()) ||
          i.description.toLowerCase().includes(query.toLowerCase())
      )
    : allSubItems.slice(0, 4);

  const filteredSectors = query
    ? SECTORS_DATA.filter(
        (s) =>
          s.name.toLowerCase().includes(query.toLowerCase()) ||
          s.description.toLowerCase().includes(query.toLowerCase())
      )
    : SECTORS_DATA.slice(0, 3);

  const filteredProjects = query
    ? PROJECTS_DATA.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.summary.toLowerCase().includes(query.toLowerCase()) ||
          p.client.toLowerCase().includes(query.toLowerCase())
      )
    : PROJECTS_DATA.slice(0, 2);

  return (
    <div className="fixed inset-0 z-[999999] flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-[#030d1e] border border-blue-500/30 rounded-2xl shadow-[0_25px_70px_rgba(0,128,232,0.25)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-blue-900/40 bg-blue-950/30">
          <Search className="w-5 h-5 text-sky-400 shrink-0" />
          <input
            type="text"
            placeholder="Search AI agents, workflow mesh, RPA, edge telemetry, or case studies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-white placeholder-slate-400 text-sm focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-5 text-left">
          {/* Solutions Section */}
          {filteredSolutions.length > 0 && (
            <div>
              <span className="text-[11px] font-bold tracking-wider text-sky-400 uppercase block mb-2 px-2">
                Intelligent Solutions & Capabilities
              </span>
              <div className="space-y-1">
                {filteredSolutions.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-600/15 border border-transparent hover:border-blue-500/30 transition-all group"
                  >
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-sky-300 transition-colors flex items-center gap-2">
                        {item.title}
                        {item.badge && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-500/20 text-sky-300 border border-blue-500/30">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1">{item.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-sky-400 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Sectors Section */}
          {filteredSectors.length > 0 && (
            <div>
              <span className="text-[11px] font-bold tracking-wider text-sky-400 uppercase block mb-2 px-2">
                Industry Sectors
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredSectors.map((sector) => (
                  <Link
                    key={sector.id}
                    href={`/#sectors`}
                    onClick={onClose}
                    className="p-3 rounded-xl bg-blue-950/20 hover:bg-blue-900/30 border border-blue-900/30 hover:border-blue-500/40 transition-all"
                  >
                    <div className="text-xs font-bold text-white mb-1">{sector.name}</div>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{sector.tagline}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Case Studies Section */}
          {filteredProjects.length > 0 && (
            <div>
              <span className="text-[11px] font-bold tracking-wider text-sky-400 uppercase block mb-2 px-2">
                Case Studies & Impact Metrics
              </span>
              <div className="space-y-1">
                {filteredProjects.map((project) => (
                  <Link
                    key={project.id}
                    href="/projects"
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-600/15 border border-transparent hover:border-blue-500/30 transition-all group"
                  >
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-sky-300">
                        {project.title}
                      </div>
                      <div className="text-xs text-slate-400">
                        {project.client} · <span className="text-sky-400 font-semibold">{project.impactMetrics[0].value}</span> {project.impactMetrics[0].label}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-sky-400 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {filteredSolutions.length === 0 && filteredSectors.length === 0 && filteredProjects.length === 0 && (
            <div className="py-12 text-center text-slate-400">
              <p className="text-sm">No results found for &quot;{query}&quot;</p>
              <p className="text-xs text-slate-500 mt-1">Try searching for &quot;agents&quot;, &quot;mesh&quot;, &quot;finance&quot;, or &quot;edge&quot;.</p>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between px-5 py-2.5 bg-blue-950/50 border-t border-blue-900/40 text-[11px] text-slate-400">
          <span>Navigate with <kbd className="px-1.5 py-0.5 rounded bg-blue-900/50 border border-blue-700/40 text-sky-300 font-mono">↑</kbd> <kbd className="px-1.5 py-0.5 rounded bg-blue-900/50 border border-blue-700/40 text-sky-300 font-mono">↓</kbd></span>
          <span>Close with <kbd className="px-1.5 py-0.5 rounded bg-blue-900/50 border border-blue-700/40 text-sky-300 font-mono">ESC</kbd></span>
        </div>
      </div>
    </div>
  );
}
