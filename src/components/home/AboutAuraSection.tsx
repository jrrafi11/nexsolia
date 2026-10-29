"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const ABOUT_I18N = {
  en: {
    label: "About Nexsolia",
    h1Line1: "Custom-Engineered Solutions for",
    h1Strong: "Smart Homes, Offices, BMS & Beyond",
    desc: "Nexsolia is a solution-based automation company in Bangladesh. Rather than selling one-size-fits-all boxes, we study your requirements and custom-design Smart Home Solutions, Smart Office Automation, Building Management Systems (BMS), and bespoke commercial/industrial smart solutions.",
    tags: {
      security: "Safety & Sensors",
      light: "Smart Lighting",
      curtain: "Motorized Shading",
      climate: "BMS & HVAC Control",
      access: "Biometric Access",
    },
    steps: [
      {
        num: "01",
        title: "Smart Home & Villa Solutions",
        desc: "100% retrofit or wired KNX automation for flats, duplexes & penthouses",
      },
      {
        num: "02",
        title: "Smart Office & Corporate Solutions",
        desc: "PDLC switchable privacy glass, smart boardrooms, lighting & access control",
      },
      {
        num: "03",
        title: "Building Management Systems (BMS) & Custom IoT",
        desc: "Central VRF/HVAC control, energy sub-metering, IPS load guard & custom R&D",
      },
    ],
    note: "Every project is custom-designed around your floor plan, operational workflow, and BDT budget — backed by our 3-Year Replacement Warranty and Dhaka engineering team.",
    btn: "Discover How We Design Solutions",
  },
  bn: {
    label: "নেক্সসোলিয়া সম্পর্কে",
    h1Line1: "আপনার চাহিদা অনুযায়ী কাস্টম ডিজাইনকৃত",
    h1Strong: "স্মার্ট হোম, স্মার্ট অফিস, BMS ও অটোমেশন সলিউশন",
    desc: "নেক্সসোলিয়া বাংলাদেশের একটি পূর্ণাঙ্গ সলিউশন-ভিত্তিক অটোমেশন কোম্পানি। আমরা কেবল প্রোডাক্ট বিক্রি করি না—গ্রাহকের প্রয়োজন যাচাই করে কাস্টম স্মার্ট হোম সলিউশন, স্মার্ট অফিস সলিউশন, বিল্ডিং ম্যানেজমেন্ট সিস্টেম (BMS) এবং যেকোনো বিশেষায়িত স্মার্ট অটোমেশন ডিজাইন ও বাস্তবায়ন করি।",
    tags: {
      security: "সেফটি ও সেন্সর",
      light: "স্মার্ট লাইটিং",
      curtain: "মোটরাইজড শেডিং",
      climate: "BMS ও HVAC কন্ট্রোল",
      access: "বায়োমেট্রিক অ্যাক্সেস",
    },
    steps: [
      {
        num: "01",
        title: "স্মার্ট হোম ও ভিলা সলিউশন",
        desc: "ফ্ল্যাট, ডুপ্লেক্স ও পেন্টহাউসের জন্য ১০০% রেট্রোফিট অথবা ওয়্যারড KNX সলিউশন",
      },
      {
        num: "02",
        title: "স্মার্ট অফিস ও কর্পোরেট সলিউশন",
        desc: "PDLC প্রাইভেসি গ্লাস, স্মার্ট বোর্ডরুম, অটোমেটেড লাইটিং ও অ্যাক্সেস কন্ট্রোল",
      },
      {
        num: "03",
        title: "বিল্ডিং ম্যানেজমেন্ট সিস্টেম (BMS) ও কাস্টম সলিউশন",
        desc: "সেন্ট্রাল VRF/HVAC কন্ট্রোল, এনার্জি মনিটরিং, আইপিএস লোড গার্ড ও কাস্টম IoT",
      },
    ],
    note: "প্রতিটি সলিউশন আপনার প্রজেক্টের ফ্লোর প্ল্যান, চাহিদা এবং বাজেট অনুযায়ী কাস্টম ডিজাইন করা হয় — ৩ বছরের রিপ্লেসমেন্ট ওয়ারেন্টি ও ঢাকা ইঞ্জিনিয়ারিং টিমের সাপোর্টসহ।",
    btn: "নেক্সসোলিয়া সম্পর্কে আরও জানুন",
  },
};

export default function AboutAuraSection() {
  const { lang } = useLanguage();
  const t = ABOUT_I18N[lang];

  return (
    <section id="aura-section" dir="ltr" lang={lang}>
      <div className="container">
        {/* VISUAL */}
        <div className="visual">
          <div className="glow" />

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            decoding="async"
            className="house"
            src="/media/aura/smart-home-cutaway.png"
            alt="Nexsolia Smart Home Bangladesh"
            loading="lazy"
          />

          {/* SECURITY */}
          <Link
            className="tag security tag-left"
            href="/product-category/security-monitoring"
            aria-label="Security & Gas Safety Systems"
          >
            <div className="tag-box">{t.tags.security}</div>
            <div className="icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3l7 3v5c0 4.5-2.8 8.2-7 10-4.2-1.8-7-5.5-7-10V6l7-3z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
          </Link>

          {/* LIGHTING */}
          <Link
            className="tag light tag-left"
            href="/product-category/lighting-power-automation"
            aria-label="Touch Switches & Profile Lighting"
          >
            <div className="tag-box">{t.tags.light}</div>
            <div className="icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 18h6" />
                <path d="M9.5 21h5" />
                <path d="M8 14.5c-1.2-1-2-2.5-2-4.2C6 7.4 8.7 5 12 5s6 2.4 6 5.3c0 1.7-.8 3.2-2 4.2-.8.7-1.2 1.4-1.2 2.5H9.2c0-1.1-.4-1.8-1.2-2.5z" />
              </svg>
            </div>
          </Link>

          {/* CURTAINS */}
          <Link
            className="tag curtain tag-left"
            href="/product-category/smart-curtain"
            aria-label="Smart Roller & Slider Curtains"
          >
            <div className="tag-box">{t.tags.curtain}</div>
            <div className="icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 4h16v16H4z" />
                <path d="M4 4c2 1 3 3 3 6s-1 5-3 6" />
                <path d="M20 4c-2 1-3 3-3 6s1 5 3 6" />
                <path d="M12 4v16" />
              </svg>
            </div>
          </Link>

          {/* CLIMATE */}
          <Link
            className="tag climate tag-right"
            href="/product-category/lighting-power-automation"
            aria-label="VRF & Split AC Control with IPS Load Guard"
          >
            <div className="icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3v18" />
                <path d="M4.2 7.5l15.6 9" />
                <path d="M4.2 16.5l15.6-9" />
                <path d="M8 5.2l4 2.3 4-2.3" />
                <path d="M8 18.8l4-2.3 4 2.3" />
              </svg>
            </div>
            <div className="tag-box">{t.tags.climate}</div>
          </Link>

          {/* SMART ACCESS */}
          <Link
            className="tag access tag-left"
            href="/product-category/smart-locks"
            aria-label="3D Face & Biometric Smart Door Locks"
          >
            <div className="tag-box">{t.tags.access}</div>
            <div className="icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="5" y="10" width="14" height="10" rx="2" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                <circle cx="12" cy="15" r="1" />
                <path d="M12 16v2" />
              </svg>
            </div>
          </Link>
        </div>

        {/* CONTENT */}
        <div className="content">
          <div className="label">{t.label}</div>

          <h1>
            {t.h1Line1}
            <strong>{t.h1Strong}</strong>
          </h1>

          <div className="desc">{t.desc}</div>

          <div className="steps">
            {t.steps.map((s) => (
              <div key={s.num} className="step">
                <div className="num">{s.num}</div>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="note">{t.note}</div>

          <Link className="btn" href="/about">
            {t.btn}
          </Link>
        </div>
      </div>
    </section>
  );
}
