"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { useLanguage } from "@/context/LanguageContext";

const FLOW_I18N = {
  en: {
    kicker: "How We Design Your Custom Solution",
    whiteTitle: "Tailored Engineering,",
    accentTitle: "3-Year Peace of Mind",
    sub: "Whether you need a Smart Home, a Smart Corporate Office, a Building Management System (BMS), or a custom industrial automation setup, our Dhaka engineering team designs and delivers your solution step by step.",
    steps: [
      {
        no: "01",
        title: "Need Analysis",
        desc: "Understanding your home, office, BMS or custom project goals",
      },
      {
        no: "02",
        title: "On-Site Survey",
        desc: "Inspecting wiring, HVAC/VRF, switchboards, IPS & network",
      },
      {
        no: "03",
        title: "Custom Solution Design",
        desc: "Engineering tailored hardware, BMS logic & system architecture",
      },
      {
        no: "04",
        title: "Transparent BOQ",
        desc: "Clear item-by-item BDT quotation with ৳0 monthly fees",
      },
      {
        no: "05",
        title: "Turnkey Installation",
        desc: "Clean retrofit or KNX/BMS deployment by certified engineers",
      },
      {
        no: "06",
        title: "Custom Automation",
        desc: "Programming scenes, energy schedules, BMS dashboards & alerts",
      },
      {
        no: "07",
        title: "3-Year Warranty",
        desc: "Team/family training & direct Dhaka engineering SLA support",
      },
    ],
    footBold: "Designed around your needs",
    footRest:
      "— backed by our 3-Year Replacement Warranty and local Dhaka engineering team.",
  },
  bn: {
    kicker: "আমাদের কাস্টম সলিউশন ডিজাইন প্রক্রিয়া",
    whiteTitle: "কাস্টম ইঞ্জিনিয়ারিং,",
    accentTitle: "৩ বছরের নিশ্চিন্ত ওয়ারেন্টি",
    sub: "আপনার প্রয়োজন স্মার্ট হোম, স্মার্ট অফিস, বিল্ডিং ম্যানেজমেন্ট সিস্টেম (BMS) কিংবা কাস্টম ইন্ডাস্ট্রিয়াল সলিউশন যাই হোক—আমাদের ঢাকা ইঞ্জিনিয়ারিং টিম প্রতিটি ধাপ নিখুঁতভাবে সম্পন্ন করে।",
    steps: [
      {
        no: "01",
        title: "চাহিদা যাচাই",
        desc: "আপনার বাসা, অফিস, BMS বা কাস্টম প্রজেক্টের প্রয়োজন আলোচনা",
      },
      {
        no: "02",
        title: "সাইট সার্ভে",
        desc: "ওয়্যারিং, সুইচবোর্ড, VRF এসি, আইপিএস ও নেটওয়ার্ক পরিদর্শন",
      },
      {
        no: "03",
        title: "কাস্টম সলিউশন ডিজাইন",
        desc: "আপনার প্রয়োজন অনুযায়ী হার্ডওয়্যার, BMS ও অটোমেশন ডিজাইন",
      },
      {
        no: "04",
        title: "স্বচ্ছ BOQ ও কোটেশন",
        desc: "৳০ মাসিক চার্জসহ প্রতিটি মডিউলের স্পষ্ট টাকার হিসাব",
      },
      {
        no: "05",
        title: "টার্ন-কি ইনস্টলেশন",
        desc: "দক্ষ ইঞ্জিনিয়ার দ্বারা রেট্রোফিট অথবা KNX/BMS সেটআপ",
      },
      {
        no: "06",
        title: "কাস্টম প্রোগ্রামিং",
        desc: "সিন, এনার্জি শিডিউল, BMS ড্যাশবোর্ড ও আইপিএস লজিক কনফিগারেশন",
      },
      {
        no: "07",
        title: "৩ বছরের ওয়ারেন্টি",
        desc: "ব্যবহার প্রশিক্ষণ ও ঢাকা ইঞ্জিনিয়ারিং টিমের সরাসরি সাপোর্ট",
      },
    ],
    footBold: "আপনার চাহিদা অনুযায়ী ডিজাইনকৃত",
    footRest:
      "— প্রথম পরামর্শ থেকে শুরু করে ৩ বছরের রিপ্লেসমেন্ট ওয়ারেন্টি এবং দীর্ঘমেয়াদী সাপোর্টে আমরা পাশে আছি।",
  },
};

export default function FlowSection() {
  const secRef = useRef<HTMLElement>(null);
  const [isIn, setIsIn] = useState(false);
  const { lang } = useLanguage();
  const t = FLOW_I18N[lang];

  useEffect(() => {
    const el = secRef.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setIsIn(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setIsIn(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={secRef} className={`aura-flow ${isIn ? "is-in" : ""}`}>
      <span className="fw-dots" />

      <div className="fw-head">
        <div className="fw-kicker">
          <i />
          <span>{t.kicker}</span>
          <i />
        </div>
        <h2>
          <span className="white-title">{t.whiteTitle}</span>{" "}
          <b className="orange-title">{t.accentTitle}</b>
        </h2>
        <p className="fw-sub">{t.sub}</p>
      </div>

      <div className="fw-steps">
        <div className="fw-step" style={{ "--i": 0 } as CSSProperties}>
          <div className="fw-ico">
            <svg viewBox="0 0 24 24">
              <path d="M3 11.5a6.5 6.5 0 016.5-6.5h2A6.5 6.5 0 0118 11.5 6.5 6.5 0 0111.5 18H8l-3.4 2.6.5-3.3A6.5 6.5 0 013 11.5z" />
              <path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" />
            </svg>
          </div>
          <div className="fw-card">
            <span className="fw-no">{t.steps[0].no}</span>
            <h3>{t.steps[0].title}</h3>
            <p>{t.steps[0].desc}</p>
          </div>
        </div>

        <div className="fw-step" style={{ "--i": 1 } as CSSProperties}>
          <div className="fw-ico">
            <svg viewBox="0 0 24 24">
              <path d="M15 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z" />
              <path d="M8 9h5M8 13h4" />
              <path d="M17.5 14.5l2.5 2.5-3.5 3.5H14v-2.5z" />
            </svg>
          </div>
          <div className="fw-card">
            <span className="fw-no">{t.steps[1].no}</span>
            <h3>{t.steps[1].title}</h3>
            <p>{t.steps[1].desc}</p>
          </div>
        </div>

        <div className="fw-step" style={{ "--i": 2 } as CSSProperties}>
          <div className="fw-ico">
            <svg viewBox="0 0 24 24">
              <rect x="2.5" y="4" width="19" height="13" rx="2" />
              <path d="M9 21h6M12 17v4" />
              <circle cx="12" cy="10.5" r="2.4" />
              <path d="M12 6.6v1.2M12 13.2v1.2M8.6 10.5h1.2M14.2 10.5h1.2" />
            </svg>
          </div>
          <div className="fw-card">
            <span className="fw-no">{t.steps[2].no}</span>
            <h3>{t.steps[2].title}</h3>
            <p>{t.steps[2].desc}</p>
          </div>
        </div>

        <div className="fw-step" style={{ "--i": 3 } as CSSProperties}>
          <div className="fw-ico">
            <svg viewBox="0 0 24 24">
              <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z" />
              <path d="M8 8h3M8 11.5h3" />
              <circle cx="14" cy="15" r="2.6" />
              <path d="M14 11.6v1M14 18.4v1M10.6 15h1M16.4 15h1" />
            </svg>
          </div>
          <div className="fw-card">
            <span className="fw-no">{t.steps[3].no}</span>
            <h3>{t.steps[3].title}</h3>
            <p>{t.steps[3].desc}</p>
          </div>
        </div>

        <div className="fw-step" style={{ "--i": 4 } as CSSProperties}>
          <div className="fw-ico">
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="3.3" />
              <path d="M19.5 14.1a1.7 1.7 0 00.34 1.87l.06.06a2.06 2.06 0 11-2.92 2.92l-.06-.06a1.7 1.7 0 00-2.88 1.2v.18a2.06 2.06 0 11-4.12 0v-.09a1.7 1.7 0 00-3-1.2l-.06.06a2.06 2.06 0 11-2.92-2.92l.06-.06a1.7 1.7 0 00-1.2-2.88H2.6a2.06 2.06 0 110-4.12h.09a1.7 1.7 0 001.2-3l-.06-.06A2.06 2.06 0 116.75 3.1l.06.06a1.7 1.7 0 001.87.34h.08A1.7 1.7 0 009.8 1.96v-.18a2.06 2.06 0 114.12 0v.09a1.7 1.7 0 002.88 1.2l.06-.06a2.06 2.06 0 112.92 2.92l-.06.06a1.7 1.7 0 00-.34 1.87v.08a1.7 1.7 0 001.56 1.02h.18a2.06 2.06 0 110 4.12h-.09a1.7 1.7 0 00-1.53 1.02z" />
            </svg>
          </div>
          <div className="fw-card">
            <span className="fw-no">{t.steps[4].no}</span>
            <h3>{t.steps[4].title}</h3>
            <p>{t.steps[4].desc}</p>
          </div>
        </div>

        <div className="fw-step" style={{ "--i": 5 } as CSSProperties}>
          <div className="fw-ico">
            <svg viewBox="0 0 24 24">
              <path d="M15 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z" />
              <path d="M8 9h4M8 12.5h3" />
              <path d="M11.4 17.2l1.7 1.7 3.4-3.4" />
            </svg>
          </div>
          <div className="fw-card">
            <span className="fw-no">{t.steps[5].no}</span>
            <h3>{t.steps[5].title}</h3>
            <p>{t.steps[5].desc}</p>
          </div>
        </div>

        <div className="fw-step" style={{ "--i": 6 } as CSSProperties}>
          <div className="fw-ico">
            <svg viewBox="0 0 24 24">
              <path d="M12 3l8 3v6c0 4.4-3.1 8.2-8 9-4.9-.8-8-4.6-8-9V6z" />
              <path d="M9 12.2l2 2 4.2-4.2" />
            </svg>
          </div>
          <div className="fw-card">
            <span className="fw-no">{t.steps[6].no}</span>
            <h3>{t.steps[6].title}</h3>
            <p>{t.steps[6].desc}</p>
          </div>
        </div>
      </div>

      <div className="fw-foot">
        <i />
        <p>
          <b>{t.footBold}</b> {t.footRest}
        </p>
      </div>
    </section>
  );
}
