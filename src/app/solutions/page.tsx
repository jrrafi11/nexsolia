"use client";

import { useState } from "react";
import Link from "next/link";
import CategoriesSection from "@/components/home/CategoriesSection";
import CoreArchitectureSection from "@/components/home/CoreArchitectureSection";
import FinalCtaSection from "@/components/home/FinalCtaSection";
import { useLanguage } from "@/context/LanguageContext";

interface SmartProduct {
  id: string;
  cat: string;
  catLabel: string;
  name: string;
  brand: string;
  protocol: string;
  price: string;
  badge?: string;
  img: string;
}

const SOLUTIONS_I18N: Record<
  "en" | "bn",
  {
    heroBadge: string;
    h1a: string;
    h1b: string;
    heroDesc: string;
    catKicker: string;
    catTitle: string;
    orderBtn: string;
    filters: { id: string; label: string }[];
    products: SmartProduct[];
  }
> = {
  en: {
    heroBadge: "NEXSOLIA Custom Smart Solutions & Catalog",
    h1a: "Custom Smart Solutions,",
    h1b: "BMS & Turnkey Packages",
    heroDesc:
      "We design custom automation solutions around your exact needs — covering Smart Home Solutions, Smart Office & Boardroom Automation, Building Management Systems (BMS), VRF/KNX Control, PDLC Privacy Glass, and Custom Industrial IoT.",
    catKicker: "Transparent Bangladesh Pricing & Custom Engineering",
    catTitle: "Smart Modules, BMS & Custom Packages",
    orderBtn: "Order / Inquire →",
    filters: [
      { id: "all", label: "All Solutions" },
      { id: "lighting", label: "Touch Switches & Lighting" },
      { id: "curtains", label: "Smart Curtains" },
      { id: "locks", label: "3D Face & Access Control" },
      { id: "pdlc", label: "PDLC Office Privacy Glass" },
      { id: "security", label: "Safety & Presence Sensors" },
      { id: "packages", label: "Home & Office Packages" },
      { id: "knx", label: "BMS, VRF & Custom IoT" },
    ],
    products: [
      {
        id: "p1",
        cat: "lighting",
        catLabel: "Touch Switches",
        name: "Retrofit Tempered Glass Touch Switch (1/2/3/4 Gang & Fan Dimmer)",
        brand: "NEXSOLIA",
        protocol: "Zigbee / Wi-Fi • Fits BD 3x3 & 3x6 Boxes • 110V–265V Surge Safe",
        price: "From ৳3,500",
        badge: "Zero Wall Cutting",
        img: "/media/aura/cat-lighting.jpg",
      },
      {
        id: "p2",
        cat: "pdlc",
        catLabel: "PDLC Smart Glass",
        name: "Switchable PDLC Smart Privacy Film (Clear to Frosted in 0.1s)",
        brand: "NEXSOLIA Pro",
        protocol: "App, Remote & Voice • Blocks 99% UV & Solar Heat",
        price: "৳1,290 / sq.ft",
        badge: "Office & Villa Hit",
        img: "/media/aura/cat-audio.jpg",
      },
      {
        id: "p3",
        cat: "locks",
        catLabel: "Smart Door Locks",
        name: "3D Face Recognition + Biometric Smart Door Lock with Camera",
        brand: "NEXSOLIA",
        protocol: "Face ID + Fingerprint + PIN + RFID + Guest OTP + USB-C Backup",
        price: "From ৳15,000",
        badge: "Best Seller",
        img: "/media/aura/cat-locks.jpg",
      },
      {
        id: "p4",
        cat: "curtains",
        catLabel: "Motorized Curtains",
        name: "Whisper-Quiet (<32 dB) Smart Roller Curtain Motor",
        brand: "NEXSOLIA",
        protocol: "App, Voice & Sunlight Schedule • Runs on IPS Power",
        price: "From ৳12,500",
        badge: "Silent Motor",
        img: "/media/aura/cat-curtains.jpg",
      },
      {
        id: "p5",
        cat: "curtains",
        catLabel: "Motorized Curtains",
        name: "Concealed Pelmet Smart Slider Curtain Track (Up to 50 kg)",
        brand: "NEXSOLIA",
        protocol: "Touch-Motion Trigger • Center or Side Draw • Manual Override",
        price: "From ৳30,000",
        badge: "Luxury Drapery",
        img: "/media/aura/cat-curtains.jpg",
      },
      {
        id: "p6",
        cat: "security",
        catLabel: "Safety & Sensors",
        name: "Titas / LPG Gas Leak Detector + Automatic Solenoid Shutoff Valve",
        brand: "NEXSOLIA Safety",
        protocol: "85 dB Siren + Instant Mobile Alert + Auto Gas Cutoff",
        price: "From ৳2,750",
        badge: "Kitchen Essential",
        img: "/media/aura/cat-security.jpg",
      },
      {
        id: "p7",
        cat: "lighting",
        catLabel: "Profile Lighting",
        name: "Dubai-Style Magnetic Track & False Ceiling Cove Lighting",
        brand: "NEXSOLIA",
        protocol: "2700K–6500K Tunable White • Flicker-Free 1%–100% Dimming",
        price: "From ৳5,000 / zone",
        badge: "Architect Choice",
        img: "/media/aura/cat-lighting.jpg",
      },
      {
        id: "p8",
        cat: "security",
        catLabel: "Presence & Security",
        name: "mmWave Human Presence Radar + Door/Window & Water Leak Sensor",
        brand: "NEXSOLIA",
        protocol: "Detects Stationary Breathing • Zero False Triggers",
        price: "From ৳2,750",
        img: "/media/aura/cat-control.jpg",
      },
      {
        id: "p9",
        cat: "packages",
        catLabel: "Starter Package",
        name: "2-Room Family Starter Pack (Living + Master Bedroom)",
        brand: "NEXSOLIA",
        protocol: "Touch Switches + AC Control + Local Hub + IPS Load Guard",
        price: "৳25,000 – ৳45,000",
        badge: "Most Popular",
        img: "/media/aura/cat-packages.webp",
      },
      {
        id: "p10",
        cat: "packages",
        catLabel: "Full Flat Package",
        name: "Complete 3BHK Apartment Turnkey Smart Home Package",
        brand: "NEXSOLIA",
        protocol: "All Switches + Curtains + 3D Face Lock + Gas Guard + 3-Yr Warranty",
        price: "From ৳85,000",
        badge: "Turnkey 3BHK",
        img: "/media/aura/cat-packages.webp",
      },
      {
        id: "p11",
        cat: "knx",
        catLabel: "VRF & Energy",
        name: "Central VRF / Split AC Controller + IPS Smart Load Guard",
        brand: "NEXSOLIA Pro",
        protocol: "Daikin / Mitsubishi / LG / Gree • Cuts AC Bill up to 30%",
        price: "From ৳8,500",
        badge: "IPS Load Guard",
        img: "/media/aura/cat-wifi.jpg",
      },
      {
        id: "p12",
        cat: "knx",
        catLabel: "Industrial IoT",
        name: "RMG Factory, Cold Storage (-25°C) & Generator Fuel IoT Telemetry",
        brand: "NEXSOLIA Industrial",
        protocol: "LoRaWAN / RS485 Modbus / Ultrasonic Water Pump Auto",
        price: "Custom BDT Quote",
        badge: "Industrial IoT",
        img: "/media/aura/cat-knx.jpg",
      },
    ],
  },
  bn: {
    heroBadge: "NEXSOLIA কাস্টম স্মার্ট সলিউশন ও ক্যাটালগ",
    h1a: "কাস্টম স্মার্ট সলিউশন,",
    h1b: "BMS ও পূর্ণাঙ্গ প্যাকেজসমূহ",
    heroDesc:
      "গ্রাহকের চাহিদা অনুযায়ী আমরা কাস্টম অটোমেশন সলিউশন ডিজাইন করি — স্মার্ট হোম সলিউশন, স্মার্ট অফিস অটোমেশন, বিল্ডিং ম্যানেজমেন্ট সিস্টেম (BMS), VRF/KNX কন্ট্রোল, PDLC প্রাইভেসি গ্লাস এবং কাস্টম ইন্ডাস্ট্রিয়াল IoT।",
    catKicker: "স্বচ্ছ বাংলাদেশী মূল্যতালিকা ও কাস্টম ইঞ্জিনিয়ারিং",
    catTitle: "জনপ্রিয় স্মার্ট ডিভাইস, BMS ও কাস্টম প্যাকেজ",
    orderBtn: "অর্ডার / বিস্তারিত →",
    filters: [
      { id: "all", label: "সব সলিউশন" },
      { id: "lighting", label: "টাচ সুইচ ও লাইটিং" },
      { id: "curtains", label: "স্মার্ট পর্দা" },
      { id: "locks", label: "3D ফেস ও অ্যাক্সেস কন্ট্রোল" },
      { id: "pdlc", label: "PDLC প্রাইভেসি গ্লাস" },
      { id: "security", label: "গ্যাস ও প্রেজেন্স সেন্সর" },
      { id: "packages", label: "হোম ও অফিস প্যাকেজ" },
      { id: "knx", label: "BMS, VRF ও কাস্টম IoT" },
    ],
    products: [
      {
        id: "p1",
        cat: "lighting",
        catLabel: "স্মার্ট টাচ সুইচ",
        name: "রেট্রোফিট টেম্পারড গ্লাস টাচ সুইচ (১/২/৩/৪ গ্যাং ও ফ্যান ডিমার)",
        brand: "NEXSOLIA",
        protocol: "Zigbee / Wi-Fi • ৩x৩ ও ৩x৬ বোর্ডে ফিট • ১১০V–২৬৫V সার্জ প্রোটেক্টেড",
        price: "৳৩,৫০০ থেকে",
        badge: "দেয়াল কাটা ছাড়াই",
        img: "/media/aura/cat-lighting.jpg",
      },
      {
        id: "p2",
        cat: "pdlc",
        catLabel: "PDLC স্মার্ট গ্লাস",
        name: "সুইচেবল PDLC স্মার্ট প্রাইভেসি ফিল্ম (০.১ সেকেন্ডে স্বচ্ছ থেকে ঘোলা)",
        brand: "NEXSOLIA Pro",
        protocol: "অ্যাপ, রিমোট ও ভয়েস • ৯৯% ক্ষতিকর UV ও তাপ রোধ করে",
        price: "৳১,২৯০ / স্কয়ার ফিট",
        badge: "অফিস ও ভিলার পছন্দ",
        img: "/media/aura/cat-audio.jpg",
      },
      {
        id: "p3",
        cat: "locks",
        catLabel: "স্মার্ট ডোর লক",
        name: "3D ফেস রিকগনিশন + বায়োমেট্রিক স্মার্ট ডোর লক (ক্যামেরাসহ)",
        brand: "NEXSOLIA",
        protocol: "ফেস আইডি + ফিঙ্গারপ্রিন্ট + পিন + কার্ড + গেস্ট OTP + USB-C ব্যাকআপ",
        price: "৳১৫,০০০ থেকে",
        badge: "বেস্ট সেলার",
        img: "/media/aura/cat-locks.jpg",
      },
      {
        id: "p4",
        cat: "curtains",
        catLabel: "মোটরাইজড পর্দা",
        name: "আল্ট্রা-সাইলেন্ট (<৩২ dB) স্মার্ট রোলার কার্টেন মোটর",
        brand: "NEXSOLIA",
        protocol: "অ্যাপ, ভয়েস ও সূর্যোদয় শিডিউল • আইপিএস পাওয়ারে সচল",
        price: "৳১২,৫০০ থেকে",
        badge: "সাইলেন্ট মোটর",
        img: "/media/aura/cat-curtains.jpg",
      },
      {
        id: "p5",
        cat: "curtains",
        catLabel: "মোটরাইজড পর্দা",
        name: "কনসিল্ড পেলমেট স্মার্ট স্লাইডার কার্টেন ট্র্যাক (৫০ কেজি পর্যন্ত)",
        brand: "NEXSOLIA",
        protocol: "টাচ-মোশন ট্রিগার • সেন্টার ও সাইড ওপেনিং • ম্যানুয়াল মোড",
        price: "৳৩০,০০০ থেকে",
        badge: "লাক্সারি পর্দা",
        img: "/media/aura/cat-curtains.jpg",
      },
      {
        id: "p6",
        cat: "security",
        catLabel: "সেফটি ও সেন্সর",
        name: "তিতাস / এলপিজি গ্যাস লিক ডিটেক্টর + অটোমেটিক শাট-অফ ভালভ",
        brand: "NEXSOLIA Safety",
        protocol: "৮৫ dB অ্যালার্ম + মোবাইল অ্যালার্ট + অটো গ্যাস লাইন বন্ধ",
        price: "৳২,৭৫০ থেকে",
        badge: "রান্নাঘরের সুরক্ষা",
        img: "/media/aura/cat-security.jpg",
      },
      {
        id: "p7",
        cat: "lighting",
        catLabel: "প্রোফাইল লাইটিং",
        name: "দুবাই-স্টাইল ম্যাগনেটিক ট্র্যাক ও ফলস সিলিং কোভ লাইটিং",
        brand: "NEXSOLIA",
        protocol: "২৭০০K–৬৫০০K ওয়ার্ম ও কুল হোয়াইট • ১%–১০০% স্মুথ ডিমিং",
        price: "৳৫,০০০ / জোন থেকে",
        badge: "ইন্টেরিয়র পছন্দ",
        img: "/media/aura/cat-lighting.jpg",
      },
      {
        id: "p8",
        cat: "security",
        catLabel: "প্রেজেন্স ও সিকিউরিটি",
        name: "mmWave হিউম্যান প্রেজেন্স রাডার + ডোর/উইন্ডো ও ওয়াটার লিক সেন্সর",
        brand: "NEXSOLIA",
        protocol: "স্থির অবস্থাতেও উপস্থিতি শনাক্ত করে • জিরো ফলস অ্যালার্ম",
        price: "৳২,৭৫০ থেকে",
        img: "/media/aura/cat-control.jpg",
      },
      {
        id: "p9",
        cat: "packages",
        catLabel: "স্টার্টার প্যাকেজ",
        name: "২-রুম ফ্যামিলি স্টার্টার প্যাক (ড্রয়িং রুম + মাস্টার বেডরুম)",
        brand: "NEXSOLIA",
        protocol: "টাচ সুইচ + এসি কন্ট্রোল + লোকাল হাব + আইপিএস লোড গার্ড",
        price: "৳২৫,০০০ – ৳৪৫,০০০",
        badge: "সবচেয়ে জনপ্রিয়",
        img: "/media/aura/cat-packages.webp",
      },
      {
        id: "p10",
        cat: "packages",
        catLabel: "ফুল ফ্ল্যাট প্যাকেজ",
        name: "কমপ্লিট ৩-বেডরুম (3BHK) ফ্ল্যাট স্মার্ট হোম প্যাকেজ",
        brand: "NEXSOLIA",
        protocol: "সব সুইচ + পর্দা + 3D ফেস লক + গ্যাস গার্ড + ৩ বছরের ওয়ারেন্টি",
        price: "৳৮৫,০০০ থেকে",
        badge: "টার্নকি প্যাকেজ",
        img: "/media/aura/cat-packages.webp",
      },
      {
        id: "p11",
        cat: "knx",
        catLabel: "VRF ও এনার্জি",
        name: "সেন্ট্রাল VRF / স্প্লিট এসি কন্ট্রোলার + আইপিএস স্মার্ট লোড গার্ড",
        brand: "NEXSOLIA Pro",
        protocol: "Daikin / Mitsubishi / LG / Gree • ৩০% পর্যন্ত বিদ্যুৎ সাশ্রয়",
        price: "৳৮,৫০০ থেকে",
        badge: "আইপিএস লোড গার্ড",
        img: "/media/aura/cat-wifi.jpg",
      },
      {
        id: "p12",
        cat: "knx",
        catLabel: "ইন্ডাস্ট্রিয়াল IoT",
        name: "গার্মেন্টস ফ্যাক্টরি, কোল্ড স্টোরেজ (-২৫°C) ও জেনারেটর ফুয়েল IoT",
        brand: "NEXSOLIA Industrial",
        protocol: "LoRaWAN / RS485 Modbus / আল্ট্রাসনিক ওয়াটার পাম্প অটোমেশন",
        price: "কাস্টম কোটেশন",
        badge: "ইন্ডাস্ট্রিয়াল IoT",
        img: "/media/aura/cat-knx.jpg",
      },
    ],
  },
};

export default function SolutionsPage() {
  const [filter, setFilter] = useState("all");
  const { lang } = useLanguage();
  const t = SOLUTIONS_I18N[lang];

  const filtered =
    filter === "all"
      ? t.products
      : t.products.filter((p) => p.cat === filter);

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
            {t.heroBadge}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight max-w-2xl">
            {t.h1a} <span className="text-[#0877E8]">{t.h1b}</span>
          </h1>
          <p className="mt-4 text-white/75 max-w-xl text-base leading-relaxed">
            {t.heroDesc}
          </p>
        </div>
      </section>

      {/* Featured Product Grid */}
      <section className="py-16 px-5 max-w-[1320px] mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#0877E8]">
              {t.catKicker}
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-[#071D3A] mt-1">
              {t.catTitle}
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {t.filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={`px-4 py-2 rounded-full text-xs font-extrabold transition cursor-pointer ${
                  filter === f.id
                    ? "bg-[#0877E8] text-white shadow-[0_8px_20px_rgba(8,119,232,0.28)]"
                    : "bg-white text-[#3b4252] border border-[#d6e4f2] hover:border-[#0877E8]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl border border-[#dbe7f4] overflow-hidden shadow-[0_4px_14px_rgba(7,29,58,0.05)] hover:shadow-[0_18px_38px_rgba(8,119,232,0.12)] hover:border-[#0877E8]/45 transition-all flex flex-col"
            >
              <div className="relative aspect-[4/3] bg-[#eaf2fa] overflow-hidden">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {item.badge && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-[#0877E8] text-white shadow">
                    {item.badge}
                  </span>
                )}
                <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#071D3A]/85 text-white backdrop-blur-sm">
                  {item.brand}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0877E8]">
                  {item.catLabel}
                </span>
                <h3 className="text-[15.5px] font-extrabold text-[#071D3A] mt-1 leading-snug">
                  {item.name}
                </h3>
                <p className="text-xs text-[#5B6B7D] mt-2">{item.protocol}</p>

                <div className="mt-auto pt-4 border-t border-[#e8f0f8] flex items-center justify-between">
                  <span className="text-sm font-black text-[#071D3A]">
                    {item.price}
                  </span>
                  <Link
                    href="/contact"
                    className="px-3.5 py-2 rounded-xl bg-[#071D3A] hover:bg-[#0877E8] text-white text-xs font-extrabold transition"
                  >
                    {t.orderBtn}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* All 10 Categories */}
      <CategoriesSection />

      {/* Interactive 6-Wedge System Dial */}
      <CoreArchitectureSection />

      {/* Final CTA */}
      <FinalCtaSection />
    </div>
  );
}
