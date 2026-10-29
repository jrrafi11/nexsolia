"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const SECTORS_DATA = {
  en: {
    h2a: "Custom-Designed Solutions for",
    h2b: "Every Sector & Customer Need",
    sub: "We are a solution-based engineering company. Whether you need a Smart Home, a Smart Corporate Office, a full Building Management System (BMS), or a custom industrial automation setup, we design the exact system around your requirements.",
    cards: [
      {
        num: "01",
        title: "Smart Home Solutions (Flats & Villas)",
        desc: "Custom-designed 100% retrofit or wired KNX automation for apartments, duplexes & penthouses — lighting, curtains, gas safety, AC & 3D Face locks.",
      },
      {
        num: "02",
        title: "Smart Office & Boardroom Solutions",
        desc: "Switchable PDLC smart privacy glass, one-tap meeting room AV & lighting scenes, biometric HR attendance, and automated office energy saving.",
      },
      {
        num: "03",
        title: "Building Management Systems (BMS)",
        desc: "Centralized HVAC/VRF chiller control, multi-floor energy sub-metering, generator/IPS load management, water pump & common-area automation.",
      },
      {
        num: "04",
        title: "Commercial, Hotel & Hospital Solutions",
        desc: "Custom guest-room management systems (GRMS), nurse-call & environmental monitoring, showroom profile lighting, and centralized facility control.",
      },
      {
        num: "05",
        title: "Industrial & Custom IoT Engineering",
        desc: "Tailor-made LoRaWAN & RS485 Modbus telemetry for RMG factories, -25°C pharmaceutical cold storage, power monitoring & custom hardware/software R&D.",
      },
      {
        num: "06",
        title: "Developers, Architects & Consultants",
        desc: "End-to-end technical design, BOQ preparation, schematic drawings, and turnkey smart building execution from blueprint to handover.",
      },
    ],
  },
  bn: {
    h2a: "গ্রাহকের চাহিদা অনুযায়ী",
    h2b: "প্রতিটি খাতের জন্য কাস্টম স্মার্ট সলিউশন",
    sub: "আমরা একটি সলিউশন-ভিত্তিক কোম্পানি। আপনার প্রয়োজন স্মার্ট হোম, স্মার্ট অফিস, পূর্ণাঙ্গ বিল্ডিং ম্যানেজমেন্ট সিস্টেম (BMS) কিংবা কাস্টম ইন্ডাস্ট্রিয়াল অটোমেশন যাই হোক—আমরা আপনার চাহিদা অনুযায়ী সলিউশন ডিজাইন করি।",
    cards: [
      {
        num: "01",
        title: "স্মার্ট হোম সলিউশন (ফ্ল্যাট ও ভিলা)",
        desc: "অ্যাপার্টমেন্ট, ডুপ্লেক্স ও পেন্টহাউসের জন্য ১০০% রেট্রোফিট বা ওয়্যারড KNX সলিউশন—স্মার্ট সুইচ, পর্দা, গ্যাস সেফটি ও 3D ফেস লক।",
      },
      {
        num: "02",
        title: "স্মার্ট অফিস ও বোর্ডরুম সলিউশন",
        desc: "সুইচেবল PDLC প্রাইভেসি গ্লাস, মিটিং রুম অটোমেশন, বায়োমেট্রিক অ্যাক্সেস ও অ্যাটেনডেন্স এবং অফিসের এসি ও লাইট এনার্জি সেভিং সলিউশন।",
      },
      {
        num: "03",
        title: "বিল্ডিং ম্যানেজমেন্ট সিস্টেম (BMS)",
        desc: "সেন্ট্রাল VRF/HVAC কন্ট্রোল, মাল্টি-ফ্লোর এনার্জি সাব-মিটারিং, জেনারেটর/আইপিএস লোড ম্যানেজমেন্ট এবং পানির পাম্প ও ইউটিলিটি অটোমেশন।",
      },
      {
        num: "04",
        title: "কমার্শিয়াল ভবন, হোটেল ও হাসপাতাল",
        desc: "হোটেল রুম ম্যানেজমেন্ট (GRMS), হাসপাতালের পরিবেশ ও তাপমাত্রা মনিটরিং, শোরুম লাইটিং এবং সেন্ট্রাল কন্ট্রোল ড্যাশবোর্ড।",
      },
      {
        num: "05",
        title: "ইন্ডাস্ট্রিয়াল ও কাস্টম IoT সলিউশন",
        desc: "গার্মেন্টস ফ্যাক্টরি, -২৫°C ফার্মা কোল্ড স্টোরেজ, ফুয়েল মনিটরিং এবং গ্রাহকের যেকোনো বিশেষ চাহিদার জন্য কাস্টম হার্ডওয়্যার ও সফটওয়্যার ডিজাইন।",
      },
      {
        num: "06",
        title: "ডেভেলপার, আর্কিটেক্ট ও কনসালটেন্ট",
        desc: "প্রজেক্টের শুরু থেকে কাস্টম সিস্টেম ডিজাইন, BOQ প্রস্তুতকরণ, ওয়্যারিং ডায়াগ্রাম এবং টার্ন-কি বাস্তবায়নে পূর্ণ ইঞ্জিনিয়ারিং সহায়তা।",
      },
    ],
  },
};

export default function SectorsSection() {
  const { lang } = useLanguage();
  const t = SECTORS_DATA[lang];

  return (
    <section className="aura-sectors">
      <span className="sc-arc a1" />
      <span className="sc-arc a2" />
      <span className="sc-arc a3" />

      <div className="sc-head">
        <h2>
          {t.h2a} <b>{t.h2b}</b>
        </h2>
        <p className="sc-sub">{t.sub}</p>
      </div>

      <div className="sc-grid">
        <Link href="/projects" className="sc-card">
          <span className="sc-num">{t.cards[0].num}</span>
          <span className="sc-ico">
            <svg viewBox="0 0 24 24">
              <path d="M3 11l9-7 9 7" />
              <path d="M5 10v10h14V10" />
              <path d="M10 20v-6h4v6" />
            </svg>
          </span>
          <span className="sc-txt">
            <h3>{t.cards[0].title}</h3>
            <p>{t.cards[0].desc}</p>
          </span>
          <span className="sc-go">
            <svg viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </Link>

        <Link href="/projects" className="sc-card">
          <span className="sc-num">{t.cards[1].num}</span>
          <span className="sc-ico">
            <svg viewBox="0 0 24 24">
              <rect x="4" y="3" width="16" height="18" rx="2" />
              <path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2M10 21v-3h4v3" />
            </svg>
          </span>
          <span className="sc-txt">
            <h3>{t.cards[1].title}</h3>
            <p>{t.cards[1].desc}</p>
          </span>
          <span className="sc-go">
            <svg viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </Link>

        <Link href="/projects" className="sc-card">
          <span className="sc-num">{t.cards[2].num}</span>
          <span className="sc-ico">
            <svg viewBox="0 0 24 24">
              <path d="M4 18h16M6.5 18v-2.5a5.5 5.5 0 0111 0V18" />
              <path d="M12 10V8" />
              <circle cx="12" cy="6.8" r="1.2" />
            </svg>
          </span>
          <span className="sc-txt">
            <h3>{t.cards[2].title}</h3>
            <p>{t.cards[2].desc}</p>
          </span>
          <span className="sc-go">
            <svg viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </Link>

        <Link href="/projects" className="sc-card">
          <span className="sc-num">{t.cards[3].num}</span>
          <span className="sc-ico">
            <svg viewBox="0 0 24 24">
              <path d="M3 21h18M6 21V9h6v12M12 21V4h6v17" />
              <path d="M8.5 12h1M8.5 15.5h1M14.5 8h1M14.5 12h1M14.5 16h1" />
            </svg>
          </span>
          <span className="sc-txt">
            <h3>{t.cards[3].title}</h3>
            <p>{t.cards[3].desc}</p>
          </span>
          <span className="sc-go">
            <svg viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </Link>

        <Link href="/projects" className="sc-card">
          <span className="sc-num">{t.cards[4].num}</span>
          <span className="sc-ico">
            <svg viewBox="0 0 24 24">
              <path d="M3 21h18" />
              <path d="M4 21V11l5-3v13M11 21V6l5-3v18M18 21v-7l3 2v5" />
            </svg>
          </span>
          <span className="sc-txt">
            <h3>{t.cards[4].title}</h3>
            <p>{t.cards[4].desc}</p>
          </span>
          <span className="sc-go">
            <svg viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </Link>

        <Link href="/projects" className="sc-card">
          <span className="sc-num">{t.cards[5].num}</span>
          <span className="sc-ico">
            <svg viewBox="0 0 24 24">
              <path d="M12 3v11" />
              <circle cx="12" cy="3.6" r="1.4" />
              <path d="M12 13.5L6 21M12 13.5l6 7.5" />
              <path d="M8.6 17h6.8" />
            </svg>
          </span>
          <span className="sc-txt">
            <h3>{t.cards[5].title}</h3>
            <p>{t.cards[5].desc}</p>
          </span>
          <span className="sc-go">
            <svg viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </Link>
      </div>
    </section>
  );
}
