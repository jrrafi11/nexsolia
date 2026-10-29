"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

interface CatCard {
  cls: string;
  title: { en: string; bn: string };
  desc: { en: string; bn: string };
  priceB: { en: string; bn: string };
  priceSmall: { en: string; bn: string };
  href: string;
  img: string;
  icon: ReactNode;
}

const CATEGORIES: CatCard[] = [
  {
    cls: "c11-locks",
    title: {
      en: "3D Face & Door Locks",
      bn: "৩ডি ফেস ও ডোর লক",
    },
    desc: {
      en: "Face ID, fingerprint, PIN, RFID & mobile OTP locks for wooden & glass doors",
      bn: "কাঠের ও গ্লাস ডোরের জন্য ফেস আইডি, ফিঙ্গারপ্রিন্ট, পিন, কার্ড ও মোবাইল ওটিপি লক",
    },
    priceB: { en: "৳15,000", bn: "৳১৫,০০০" },
    priceSmall: { en: "Starting", bn: "থেকে শুরু" },
    href: "/product-category/smart-locks",
    img: "/media/aura/cat-locks.jpg",
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
        <path d="M8 10.5V8a4 4 0 018 0v2.5" />
        <circle cx="12" cy="15.5" r="1.3" />
      </svg>
    ),
  },
  {
    cls: "c11-lighting",
    title: {
      en: "Touch Switches & Lighting",
      bn: "টাচ সুইচ ও লাইটিং",
    },
    desc: {
      en: "Retrofit tempered glass switches for BD 3x3/3x6 boxes & Dubai profile lights",
      bn: "দেয়াল না কেটে ৩x৩ ও ৩x৬ বোর্ডে গ্লাস টাচ সুইচ ও দুবাই-স্টাইল প্রোফাইল লাইটিং",
    },
    priceB: { en: "৳3,500", bn: "৳৩,৫০০" },
    priceSmall: { en: "Per Board", bn: "প্রতি বোর্ড" },
    href: "/product-category/lighting-power-automation",
    img: "/media/aura/cat-lighting.jpg",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M9 17.5h6M10 21h4" />
        <path d="M12 3a6 6 0 00-3.6 10.8c.7.6 1.1 1.4 1.1 2.2v.5h5V16c0-.8.4-1.6 1.1-2.2A6 6 0 0012 3z" />
      </svg>
    ),
  },
  {
    cls: "c11-security",
    title: {
      en: "Gas Guard & Sensors",
      bn: "গ্যাস গার্ড ও সেন্সর",
    },
    desc: {
      en: "Titas/LPG gas leak auto shutoff valve, mmWave radar & AI security cameras",
      bn: "তিতাস/এলপিজি গ্যাস লিক অটো ভালভ শাটঅফ, প্রেজেন্স রাডার ও এআই ক্যামেরা",
    },
    priceB: { en: "৳2,750", bn: "৳২,৭৫০" },
    priceSmall: { en: "Starting", bn: "থেকে শুরু" },
    href: "/product-category/security-monitoring",
    img: "/media/aura/cat-security.jpg",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 3l7.5 3v5.5c0 4.6-3.1 8.2-7.5 9.5-4.4-1.3-7.5-4.9-7.5-9.5V6L12 3z" />
        <path d="M8.8 12l2.3 2.3 4.2-4.4" />
      </svg>
    ),
  },
  {
    cls: "c11-curtains",
    title: {
      en: "Smart Curtains & Blinds",
      bn: "স্মার্ট পর্দা ও ব্লাইন্ডস",
    },
    desc: {
      en: "Whisper-quiet (<32 dB) motorized roller blinds & concealed pelmet tracks",
      bn: "নিঃশব্দ (<৩২ ডিবি) মোটরাইজড রোলার ব্লাইন্ড এবং কনসিল্ড পেলমেট কার্টেন ট্র্যাক",
    },
    priceB: { en: "৳12,500", bn: "৳১২,৫০০" },
    priceSmall: { en: "Per Window", bn: "প্রতি জানালা" },
    href: "/product-category/smart-curtain",
    img: "/media/aura/cat-curtains.jpg",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M4 4h16M5 4v16M19 4v16M5 7.5h14M5 11h14M5 14.5h14M5 18h14" />
      </svg>
    ),
  },
  {
    cls: "c11-control",
    title: {
      en: "Offline Hubs & Voice",
      bn: "অফলাইন হাব ও ভয়েস",
    },
    desc: {
      en: "Local Zigbee/Matter hubs, IPS Load Guard & Alexa / Google Home control",
      bn: "ইন্টারনেট ছাড়াই সচল লোকাল হাব, আইপিএস লোড গার্ড ও ভয়েস অ্যাসিস্ট্যান্ট",
    },
    priceB: { en: "100%", bn: "১০০%" },
    priceSmall: { en: "Offline Hub", bn: "অফলাইন হাব" },
    href: "/product-category/control-voice-systems",
    img: "/media/aura/cat-control.jpg",
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="9" y="3" width="6" height="11" rx="3" />
        <path d="M5.5 11.5a6.5 6.5 0 0013 0M12 18v3M9 21h6" />
      </svg>
    ),
  },
  {
    cls: "c11-wifi",
    title: {
      en: "PDLC Privacy Glass",
      bn: "পিডিএলসি প্রাইভেসি গ্লাস",
    },
    desc: {
      en: "Switch office partitions & villa glass from clear to frosted in 0.1 seconds",
      bn: "অফিস কেবিন ও ভিলার গ্লাস ০.১ সেকেন্ডে স্বচ্ছ থেকে ঘোলা প্রাইভেসি গ্লাসে রূপান্তর",
    },
    priceB: { en: "৳1,290", bn: "৳১,২৯০" },
    priceSmall: { en: "Per sq.ft", bn: "প্রতি বর্গফুট" },
    href: "/product-category/wifi-network-solutions",
    img: "/media/aura/cat-wifi.jpg",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M2.5 9a14 14 0 0119 0M5.5 12.5a9.5 9.5 0 0113 0M8.6 16a5 5 0 016.8 0" />
        <circle cx="12" cy="19.4" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    cls: "c11-audio",
    title: {
      en: "Audio & Home Cinema",
      bn: "অডিও ও হোম সিনেমা",
    },
    desc: {
      en: "In-ceiling speakers, wall amplifiers & 1-tap Movie Night theater scenes",
      bn: "কনসিল্ড সিলিং স্পিকার, ওয়াল অ্যামপ্লিফায়ার ও ওয়ান-ট্যাপ মুভি নাইট সিন",
    },
    priceB: { en: "৳5,000", bn: "৳৫,০০০" },
    priceSmall: { en: "Per Zone", bn: "প্রতি জোন" },
    href: "/product-category/audio-systems",
    img: "/media/aura/cat-audio.jpg",
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <path d="M10 8.5l5.5 3.5-5.5 3.5z" />
      </svg>
    ),
  },
  {
    cls: "c11-gates",
    title: {
      en: "Gates & Water Pump IoT",
      bn: "গেট ও পানির পাম্প অটোমেশন",
    },
    desc: {
      en: "Motorized villa gates & ultrasonic rooftop water tank pump automation",
      bn: "অটোমেটিক গেট মোটর এবং ছাদের পানির ট্যাংক ও পাম্প অটো কন্ট্রোলার",
    },
    priceB: { en: "৳8,500", bn: "৳৮,৫০০" },
    priceSmall: { en: "Starting", bn: "থেকে শুরু" },
    href: "/product-category/gate-automation-systems",
    img: "/media/aura/cat-gate.jpg",
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="3.5" y="4.5" width="17" height="15" rx="1.5" />
        <path d="M7.5 4.5v15M11 4.5v15M14.5 4.5v15M18 4.5v15" />
      </svg>
    ),
  },
  {
    cls: "c11-packages",
    title: {
      en: "Home & Office Packages",
      bn: "স্মার্ট হোম ও অফিস প্যাকেজ",
    },
    desc: {
      en: "Custom-designed packages for flats, villas, smart offices & commercial spaces",
      bn: "ফ্ল্যাট, ডুপ্লেক্স ভিলা, স্মার্ট অফিস ও কমার্শিয়াল স্পেসের জন্য কাস্টম প্যাকেজ",
    },
    priceB: { en: "৳25,000", bn: "৳২৫,০০০" },
    priceSmall: { en: "Starter Pack", bn: "স্টার্টার প্যাক" },
    href: "/product-category/smart-home-packages",
    img: "/media/aura/cat-packages.webp",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 2.8l8 4.4v9.6l-8 4.4-8-4.4V7.2l8-4.4z" />
        <path d="M4 7.2l8 4.4 8-4.4M12 11.6v9.6" />
      </svg>
    ),
  },
  {
    cls: "c11-knx",
    title: {
      en: "BMS, VRF, KNX & Custom IoT",
      bn: "BMS, VRF, KNX ও কাস্টম IoT",
    },
    desc: {
      en: "Building Management Systems (BMS), VRF HVAC, wired KNX & custom factory IoT",
      bn: "বিল্ডিং ম্যানেজমেন্ট সিস্টেম (BMS), VRF এসি, ওয়্যার্ড KNX ও কাস্টম ফ্যাক্টরি IoT",
    },
    priceB: { en: "Custom", bn: "কাস্টম" },
    priceSmall: { en: "Engineered", bn: "ডিজাইন" },
    href: "/product-category/knx-systems",
    img: "/media/aura/cat-knx.jpg",
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="5.5" r="2.4" />
        <circle cx="5.5" cy="17.5" r="2.4" />
        <circle cx="18.5" cy="17.5" r="2.4" />
        <path d="M10.8 7.6l-4.1 7.8M13.2 7.6l4.1 7.8M8 17.5h8" />
      </svg>
    ),
  },
];

export default function CategoriesSection() {
  const { lang } = useLanguage();
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const go = (i: number) => {
    const g = gridRef.current;
    if (!g) return;
    const total = CATEGORIES.length;
    const nextIdx = ((i % total) + total) % total;
    setActiveIdx(nextIdx);
    const cards = g.querySelectorAll<HTMLElement>(".c11-card");
    const c = cards[nextIdx];
    if (!c) return;
    const gr = g.getBoundingClientRect();
    const cr = c.getBoundingClientRect();
    const delta = cr.left + cr.width / 2 - (gr.left + gr.width / 2);
    g.scrollBy({ left: delta, behavior: "smooth" });
  };

  useEffect(() => {
    const g = gridRef.current;
    if (!g) return;
    const onScroll = () => {
      const gr = g.getBoundingClientRect();
      const mid = gr.left + gr.width / 2;
      const cards = g.querySelectorAll<HTMLElement>(".c11-card");
      let best = 0;
      let bd = 1e9;
      cards.forEach((c, idx) => {
        const r = c.getBoundingClientRect();
        const d = Math.abs(r.left + r.width / 2 - mid);
        if (d < bd) {
          bd = d;
          best = idx;
        }
      });
      setActiveIdx(best);
    };
    g.addEventListener("scroll", onScroll, { passive: true });
    return () => g.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="aura-cat11"
      dir="ltr"
      lang={lang}
      aria-label="Discover All Categories of the Smart Home"
    >
      <div className="c11-shell">
        <header className="c11-head">
          <h2>
            {lang === "en" ? (
              <>
                Discover <em>All Categories</em> of Our Smart Solutions
              </>
            ) : (
              <>
                আমাদের <em>সকল কাস্টম স্মার্ট সলিউশন</em> ক্যাটাগরি দেখুন
              </>
            )}
          </h2>
          <p className="c11-lead">
            {lang === "en"
              ? "Tailored modules and custom-engineered systems for Smart Homes, Smart Offices, Building Management Systems (BMS), and Industrial IoT across Bangladesh"
              : "স্মার্ট হোম, স্মার্ট অফিস, বিল্ডিং ম্যানেজমেন্ট সিস্টেম (BMS) এবং কাস্টম প্রজেক্টের জন্য প্রয়োজন অনুযায়ী ডিজাইনকৃত সলিউশন"}
          </p>
        </header>

        <div className="c11-grid" ref={gridRef}>
          {CATEGORIES.map((cat) => (
            <article key={cat.cls} className={`c11-card ${cat.cls}`}>
              <Link
                className="c11-main"
                href={cat.href}
                aria-label={cat.title[lang]}
              />
              <div className="c11-photo" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cat.img}
                  alt={cat.title[lang]}
                  width={516}
                  height={420}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="c11-body">
                <div className="c11-top">
                  <h3>{cat.title[lang]}</h3>
                  <span className="c11-ico" aria-hidden="true">
                    {cat.icon}
                  </span>
                </div>
                <p>{cat.desc[lang]}</p>
                <div className="c11-foot">
                  <span className="c11-go" aria-hidden="true">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                  <span className="c11-lbl">
                    {lang === "en" ? "Browse" : "দেখুন"}
                  </span>
                  <span className="c11-cnt">
                    <b>{cat.priceB[lang]}</b>
                    <small>{cat.priceSmall[lang]}</small>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="c11-ctrl">
          <button
            className="c11-nav c11-prev"
            type="button"
            aria-label="Previous"
            onClick={() => go(activeIdx - 1)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
          <div className="c11-dots" role="tablist">
            {CATEGORIES.map((c, i) => (
              <button
                key={c.cls}
                type="button"
                aria-label={`${i + 1}`}
                className={i === activeIdx ? "on" : ""}
                onClick={() => go(i)}
              />
            ))}
          </div>
          <button
            className="c11-nav c11-next"
            type="button"
            aria-label="Next"
            onClick={() => go(activeIdx + 1)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
