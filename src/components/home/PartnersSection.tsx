"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

interface BrandItem {
  name: string;
  svgText: string;
}

const BRANDS: BrandItem[] = [
  { name: "Google Home", svgText: "GOOGLE" },
  { name: "Amazon Alexa", svgText: "ALEXA" },
  { name: "Apple HomeKit", svgText: "HOMEKIT" },
  { name: "SmartThings", svgText: "SMARTTHINGS" },
  { name: "Zigbee 3.0", svgText: "ZIGBEE" },
  { name: "Matter", svgText: "MATTER" },
  { name: "Tuya Local", svgText: "tuya" },
  { name: "Aqara", svgText: "Aqara" },
  { name: "Sonoff", svgText: "SONOFF" },
  { name: "KNX", svgText: "KNX" },
  { name: "Daikin VRF", svgText: "DAIKIN" },
  { name: "Schneider", svgText: "Schneider" },
  { name: "Hikvision", svgText: "HIKVISION" },
  { name: "Yale", svgText: "Yale" },
];

function makeBrandSvgDataUri(label: string) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='220' height='70'><text x='50%' y='56%' font-family='Poppins,Arial,sans-serif' font-size='24' font-weight='800' letter-spacing='1' fill='#071D3A' text-anchor='middle' dominant-baseline='middle'>${label}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export default function PartnersSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();

  useEffect(() => {
    const track = trackRef.current;
    const group = groupRef.current;
    const view = viewRef.current;
    if (!track || !group || !view) return;

    const updateMarquee = () => {
      const w = group.getBoundingClientRect().width;
      if (!w) return;
      const duration = w / 34;
      track.style.setProperty("--aura-shift", `${-w}px`);
      track.style.setProperty("--aura-duration", `${duration}s`);
      view.classList.add("is-ready");
    };

    updateMarquee();
    window.addEventListener("resize", updateMarquee, { passive: true });
    return () => window.removeEventListener("resize", updateMarquee);
  }, []);

  return (
    <section id="aura-brands-en" lang={lang} dir="ltr">
      <div className="aura-head">
        <div className="aura-title">
          <h2>
            <em>{lang === "bn" ? "গ্লোবাল" : "Global"}</em>{" "}
            {lang === "bn" ? "ইকোসিস্টেম ও ব্র্যান্ড" : "Ecosystems & Brands"}
          </h2>
          <span className="kicker">
            {lang === "bn" ? "যাদের সাথে আমরা কাজ করি" : "We Integrate With"}
          </span>
        </div>

        <Link className="more" href="/solutions">
          {lang === "bn" ? "সব দেখুন →" : "View All →"}
        </Link>
      </div>

      <div className="aura-marquee-wrap">
        <div ref={viewRef} className="aura-marquee is-ready" aria-label="Brands">
          <div ref={trackRef} className="aura-track">
            {[0, 1, 2].map((copyIdx) => (
              <div
                key={copyIdx}
                ref={copyIdx === 0 ? groupRef : undefined}
                className="aura-group"
                aria-hidden={copyIdx > 0 ? "true" : undefined}
              >
                {BRANDS.map((b) => (
                  <Link
                    key={`${copyIdx}-${b.name}`}
                    className="aura-brand"
                    href="/solutions"
                    aria-label={b.name}
                    tabIndex={copyIdx > 0 ? -1 : undefined}
                  >
                    <img
                      src={makeBrandSvgDataUri(b.svgText)}
                      alt={b.name}
                      width={104}
                      height={46}
                      loading="lazy"
                      decoding="async"
                    />
                    <span>{b.name}</span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
