"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [phaseText, setPhaseText] = useState(
    "Initializing Nexsolia Local Smart Hub..."
  );
  const [isDone, setIsDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("nexsolia_preloaded");
    if (hasLoaded) {
      setIsDone(true);
      return;
    }

    const phases = [
      { at: 25, text: "Connecting Retrofit Switches, Curtains & Lighting..." },
      { at: 55, text: "Syncing IPS Load Guard & VRF Climate Controls..." },
      { at: 85, text: "Arming 3D Biometric Locks & Gas Safety Sensors..." },
      { at: 100, text: "Welcome to Nexsolia — Smart Spaces for Bangladesh." },
    ];

    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 12) + 8;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setProgress(100);
        setPhaseText("Welcome to Nexsolia — Smart Spaces for Bangladesh.");

        setTimeout(() => {
          const tl = gsap.timeline({
            onComplete: () => {
              setIsDone(true);
              sessionStorage.setItem("nexsolia_preloaded", "true");
            },
          });

          tl.to(contentRef.current, {
            opacity: 0,
            y: -16,
            duration: 0.3,
            ease: "power2.in",
          }).to(containerRef.current, {
            yPercent: -100,
            duration: 0.6,
            ease: "power4.inOut",
          });
        }, 180);
      } else {
        setProgress(current);
        const match = phases.find((p) => current <= p.at);
        if (match) setPhaseText(match.text);
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999999] flex flex-col items-center justify-center bg-[#071D3A] text-white"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(8,119,232,0.22),transparent_70%)]" />

      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center"
      >
        <div className="relative mb-6">
          <Image
            src="/nexsolia-logo-dark.png"
            alt="Nexsolia — Nexus Solution for Intelligent Automation"
            width={220}
            height={64}
            className="object-contain"
            priority
          />
        </div>

        <div className="w-60 h-1.5 bg-white/10 rounded-full overflow-hidden border border-white/10 mb-3">
          <div
            className="h-full bg-gradient-to-r from-[#0877E8] to-[#02A5F2] transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between w-60 text-xs">
          <span className="text-white/60 truncate pr-2">{phaseText}</span>
          <span className="font-bold text-[#02A5F2]">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
