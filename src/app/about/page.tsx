"use client";

import AboutAuraSection from "@/components/home/AboutAuraSection";
import FlowSection from "@/components/home/FlowSection";
import PartnersSection from "@/components/home/PartnersSection";
import SectorsSection from "@/components/home/SectorsSection";
import FinalCtaSection from "@/components/home/FinalCtaSection";
import { useLanguage } from "@/context/LanguageContext";

const ABOUT_PAGE_I18N = {
  en: {
    badge: "About NEXSOLIA — Custom Smart Solutions",
    h1a: "A Solution-Based Company",
    h1b: "Designing Around Your Needs",
    desc: "NEXSOLIA (Nexus Solution for Intelligent Automation) is a full-spectrum custom automation engineering company in Bangladesh. We design tailored solutions per customer requirements — including Smart Home Solutions, Smart Office Automation, Building Management Systems (BMS), central VRF/KNX control, and custom industrial IoT.",
    stats: [
      { val: "Custom", label: "Engineered Per Client Need" },
      { val: "৳0 / mo", label: "Zero Monthly Subscriptions" },
      { val: "3 Years", label: "Replacement Warranty" },
      { val: "100%", label: "Retrofit, KNX & BMS Ready" },
    ],
  },
  bn: {
    badge: "NEXSOLIA সম্পর্কে — কাস্টম স্মার্ট সলিউশন",
    h1a: "চাহিদা অনুযায়ী ডিজাইনকৃত",
    h1b: "পূর্ণাঙ্গ সলিউশন-ভিত্তিক কোম্পানি",
    desc: "NEXSOLIA (Nexus Solution for Intelligent Automation) বাংলাদেশের একটি পূর্ণাঙ্গ সলিউশন-ভিত্তিক অটোমেশন কোম্পানি। আমরা গ্রাহকের প্রয়োজন অনুযায়ী স্মার্ট হোম সলিউশন, স্মার্ট অফিস অটোমেশন, বিল্ডিং ম্যানেজমেন্ট সিস্টেম (BMS), সেন্ট্রাল VRF/KNX কন্ট্রোল এবং কাস্টম ইন্ডাস্ট্রিয়াল IoT ডিজাইন ও বাস্তবায়ন করি।",
    stats: [
      { val: "কাস্টম", label: "চাহিদা অনুযায়ী ডিজাইন" },
      { val: "৳০ / মাস", label: "কোনো মাসিক সাবস্ক্রিপশন নেই" },
      { val: "৩ বছর", label: "রিপ্লেসমেন্ট ওয়ারেন্টি" },
      { val: "১০০%", label: "রেট্রোফিট, KNX ও BMS প্রস্তুত" },
    ],
  },
};

export default function AboutPage() {
  const { lang } = useLanguage();
  const t = ABOUT_PAGE_I18N[lang];

  return (
    <div className="w-full bg-[#F4F8FC]">
      {/* Dark Page Hero */}
      <section className="relative bg-[#071D3A] text-white py-20 px-6 overflow-hidden">
        <div
          className="absolute inset-0 opacity-25 bg-cover bg-center"
          style={{
            backgroundImage: "url('/media/aura/aura-hero-optimized.webp')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071D3A] via-[#071D3A]/90 to-[#071D3A]/70" />
        <div className="relative z-10 max-w-[1280px] mx-auto">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#0877E8]/15 text-[#02A5F2] border border-[#0877E8]/30 mb-4">
            {t.badge}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight max-w-2xl">
            {t.h1a} <span className="text-[#0877E8]">{t.h1b}</span>
          </h1>
          <p className="mt-4 text-white/75 max-w-xl text-base leading-relaxed">
            {t.desc}
          </p>
        </div>
      </section>

      {/* Main About Section with 3D Cutaway (#aura-section) */}
      <AboutAuraSection />

      {/* Key Stats Strip */}
      <section className="py-12 px-5 bg-white border-y border-[#dbe7f4]">
        <div className="max-w-[1180px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {t.stats.map((st) => (
            <div
              key={st.label}
              className="p-5 rounded-2xl bg-[#F4F8FC] border border-[#dbe7f4]"
            >
              <div className="text-3xl md:text-4xl font-black text-[#0877E8]">
                {st.val}
              </div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-[#071D3A] mt-1">
                {st.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7-Step Engineering Workflow */}
      <FlowSection />

      {/* Sectors */}
      <SectorsSection />

      {/* Global Brands Marquee */}
      <PartnersSection />

      {/* Final CTA */}
      <FinalCtaSection />
    </div>
  );
}
