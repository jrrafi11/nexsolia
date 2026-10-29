"use client";

import { useState } from "react";
import Link from "next/link";
import CompareSection from "@/components/home/CompareSection";
import FaqSection from "@/components/home/FaqSection";
import FinalCtaSection from "@/components/home/FinalCtaSection";
import { useLanguage } from "@/context/LanguageContext";

const COMPARE_PAGE_I18N = {
  en: {
    badge: "Bangladesh System Guide & Comparison",
    h1a: "100% Retrofit Wireless vs.",
    h1b: "Wired KNX & VRF Bus",
    desc: "Compare BDT starting costs, IPS load-shedding behavior, wall work, and future expansion to choose the right architecture for your Dhaka apartment, duplex villa, corporate office, or factory.",
    finderKicker: "Interactive System Finder (Bangladesh)",
    finderTitle: "Find the Right Architecture in 30 Seconds",
    finderDesc:
      "Select your property type and current stage in Bangladesh to get an instant engineering recommendation.",
    propLbl: "1. Property Type",
    props: [
      { id: "apartment", label: "Ready Flat / Apartment" },
      { id: "villa", label: "Duplex Villa / Penthouse" },
      { id: "hotel", label: "Tower / RMG / Factory" },
      { id: "office", label: "Corporate Office / HQ" },
    ],
    stageLbl: "2. Current Property Stage",
    stageConst: "Under Construction / Conduit",
    stageFin: "Ready / Lived-In (No Wall Cutting)",
    roomsLbl: "3. Number of Rooms / Zones",
    roomsUnit: "Rooms",
    recBadge: "Recommended NEXSOLIA Architecture",
    knxTitle: "Wired KNX + VRF / Industrial Bus System",
    smartTitle: "100% Retrofit Wireless Smart System (Zigbee / Matter)",
    knxDesc:
      "Since your building is at the civil/conduit stage, a dedicated KNX & RS485 bus backbone delivers multi-floor stability, central distribution board control, VRF chiller integration, and industrial-grade scalability.",
    smartDesc:
      "Our 100% Retrofit Wireless system fits directly inside your existing Bangladeshi 3x3 & 3x6 switchboards in 1–2 days with zero wall cutting — complete with offline local hub execution and IPS Smart Load Guard.",
    timeLbl: "Estimated Setup & Starting Cost",
    knxTime: "During Civil Piping • Custom Project Quote",
    smartTime: "1 – 2 Days • Starts from ৳3,500 / Switchboard",
    quoteBtn: "Request Free Dhaka Survey →",
  },
  bn: {
    badge: "সিস্টেম গাইড ও তুলনা (বাংলাদেশ)",
    h1a: "১০০% রেট্রোফিট ওয়্যারলেস বনাম",
    h1b: "ওয়্যারড KNX ও VRF বাস",
    desc: "শুরুর খরচ (টাকা), লোডশেডিং ও আইপিএস ব্যাকআপ, দেয়ালের কাজ এবং ভবিষ্যৎ সম্প্রসারণের তুলনা দেখে আপনার ফ্ল্যাট, ডুপ্লেক্স ভিলা, অফিস বা ফ্যাক্টরির জন্য সঠিক সিস্টেমটি বেছে নিন।",
    finderKicker: "ইন্টারঅ্যাক্টিভ সিস্টেম ফাইন্ডার",
    finderTitle: "৩০ সেকেন্ডে আপনার প্রজেক্টের সঠিক সিস্টেম খুঁজুন",
    finderDesc:
      "আপনার প্রপার্টির ধরন ও বর্তমান অবস্থা নির্বাচন করে তাৎক্ষণিক ইঞ্জিনিয়ারিং পরামর্শ নিন।",
    propLbl: "১. প্রপার্টির ধরন",
    props: [
      { id: "apartment", label: "রেডি ফ্ল্যাট / অ্যাপার্টমেন্ট" },
      { id: "villa", label: "ডুপ্লেক্স ভিলা / পেন্টহাউস" },
      { id: "hotel", label: "কমার্শিয়াল টাওয়ার / ফ্যাক্টরি" },
      { id: "office", label: "কর্পোরেট অফিস / বোর্ডরুম" },
    ],
    stageLbl: "২. প্রজেক্টের বর্তমান অবস্থা",
    stageConst: "নির্মাণাধীন / কন্ডুইট পর্যায়",
    stageFin: "রেডি বা বসবাসরত (দেয়াল কাটা ছাড়া)",
    roomsLbl: "৩. রুম বা জোনের সংখ্যা",
    roomsUnit: "টি রুম",
    recBadge: "প্রস্তাবিত NEXSOLIA আর্কিটেকচার",
    knxTitle: "ওয়্যারড KNX + VRF / ইন্ডাস্ট্রিয়াল বাস সিস্টেম",
    smartTitle: "১০০% রেট্রোফিট ওয়্যারলেস স্মার্ট সিস্টেম (Zigbee / Matter)",
    knxDesc:
      "যেহেতু আপনার ভবনটি নির্মাণাধীন পর্যায়ে রয়েছে, তাই ডেডিকেটেড KNX ও RS485 বাস সিস্টেম আপনাকে দেবে বহুতল ভবনের স্থায়িত্ব, সেন্ট্রাল প্যানেল কন্ট্রোল এবং VRF এসি ও ইন্ডাস্ট্রিয়াল ইন্টিগ্রেশন।",
    smartDesc:
      "আমাদের ১০০% রেট্রোফিট ওয়্যারলেস সিস্টেম দেয়াল না কেটে মাত্র ১–২ দিনে আপনার বর্তমান ৩x৩ ও ৩x৬ সুইচবোর্ডেই বসে যায়—সাথে থাকছে অফলাইন লোকাল হাব এবং আইপিএস স্মার্ট লোড গার্ড।",
    timeLbl: "সম্ভাব্য সময় ও শুরুর খরচ",
    knxTime: "কনস্ট্রাকশন পর্যায়ে • প্রজেক্ট ভিত্তিক কোটেশন",
    smartTime: "১ – ২ দিন • মাত্র ৳৩,৫০০ / সুইচবোর্ড থেকে শুরু",
    quoteBtn: "ফ্রি সাইট ভিজিট বুক করুন →",
  },
};

export default function ComparePage() {
  const [propertyType, setPropertyType] = useState<
    "apartment" | "villa" | "hotel" | "office"
  >("apartment");
  const [stage, setStage] = useState<"construction" | "finished">("finished");
  const [rooms, setRooms] = useState(4);
  const { lang } = useLanguage();
  const t = COMPARE_PAGE_I18N[lang];

  const isKnxRecommended =
    stage === "construction" &&
    (propertyType === "villa" || propertyType === "hotel");

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

      {/* Main Comparison Matrix (.aura-compare) */}
      <CompareSection />

      {/* Interactive System Recommender */}
      <section className="py-16 px-5 bg-[#F4F8FC] border-t border-[#dbe7f4]">
        <div className="max-w-[1060px] mx-auto bg-white rounded-3xl border border-[#dbe7f4] p-7 md:p-10 shadow-[0_18px_48px_rgba(7,29,58,0.06)]">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#0877E8]">
              {t.finderKicker}
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-[#071D3A] mt-1">
              {t.finderTitle}
            </h2>
            <p className="text-sm text-[#5B6B7D] mt-2">{t.finderDesc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-[#071D3A] mb-2.5">
                  {t.propLbl}
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {t.props.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setPropertyType(
                          item.id as "apartment" | "villa" | "hotel" | "office"
                        )
                      }
                      className={`py-3 px-4 rounded-xl text-xs font-extrabold border text-left transition cursor-pointer ${
                        propertyType === item.id
                          ? "bg-[#071D3A] text-white border-[#071D3A]"
                          : "bg-[#F4F8FC] text-[#3b4252] border-[#d6e4f2] hover:border-[#0877E8]"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-[#071D3A] mb-2.5">
                  {t.stageLbl}
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setStage("construction")}
                    className={`py-3 px-4 rounded-xl text-xs font-extrabold border text-left transition cursor-pointer ${
                      stage === "construction"
                        ? "bg-[#0877E8] text-white border-[#0877E8]"
                        : "bg-[#F4F8FC] text-[#3b4252] border-[#d6e4f2]"
                    }`}
                  >
                    {t.stageConst}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStage("finished")}
                    className={`py-3 px-4 rounded-xl text-xs font-extrabold border text-left transition cursor-pointer ${
                      stage === "finished"
                        ? "bg-[#0877E8] text-white border-[#0877E8]"
                        : "bg-[#F4F8FC] text-[#3b4252] border-[#d6e4f2]"
                    }`}
                  >
                    {t.stageFin}
                  </button>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-extrabold text-[#071D3A] mb-2">
                  <span>{t.roomsLbl}</span>
                  <span className="text-[#0877E8]">
                    {rooms} {t.roomsUnit}
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={20}
                  value={rooms}
                  onChange={(e) => setRooms(Number(e.target.value))}
                  className="w-full accent-[#0877E8]"
                />
              </div>
            </div>

            <div className="bg-[#071D3A] text-white rounded-2xl p-7 border border-[#0877E8]/30 shadow-xl">
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-extrabold bg-[#0877E8]/20 text-[#02A5F2] mb-3">
                {t.recBadge}
              </span>
              <h3 className="text-2xl font-black text-white">
                {isKnxRecommended ? t.knxTitle : t.smartTitle}
              </h3>
              <p className="text-sm text-white/75 mt-2 leading-relaxed">
                {isKnxRecommended ? t.knxDesc : t.smartDesc}
              </p>

              <div className="mt-5 pt-5 border-t border-white/10 flex flex-wrap gap-4 items-center justify-between">
                <div>
                  <span className="block text-[11px] text-white/55 uppercase font-bold">
                    {t.timeLbl}
                  </span>
                  <strong className="text-base font-extrabold text-[#02A5F2]">
                    {isKnxRecommended ? t.knxTime : t.smartTime}
                  </strong>
                </div>
                <Link
                  href="/contact"
                  className="px-5 py-3 rounded-xl bg-[#0877E8] hover:bg-[#075DB8] text-white text-xs font-extrabold transition"
                >
                  {t.quoteBtn}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection />

      {/* Final CTA */}
      <FinalCtaSection />
    </div>
  );
}
