"use client";

import { useState } from "react";
import Link from "next/link";
import ProjectsSection from "@/components/home/ProjectsSection";
import SectorsSection from "@/components/home/SectorsSection";
import FinalCtaSection from "@/components/home/FinalCtaSection";
import { useLanguage } from "@/context/LanguageContext";

interface ProjectCase {
  num: string;
  title: string;
  location: string;
  sector: "Residential" | "Commercial" | "Industrial";
  sectorLabel: string;
  system: string;
  scope: string[];
  summary: string;
  img: string;
}

const PROJECTS_PAGE_I18N: Record<
  "en" | "bn",
  {
    badge: string;
    h1a: string;
    h1b: string;
    desc: string;
    kicker: string;
    h2: string;
    btnText: string;
    filters: { id: string; label: string }[];
    cases: ProjectCase[];
  }
> = {
  en: {
    badge: "NEXSOLIA Bangladesh Portfolio",
    h1a: "Smart Home & Enterprise Projects",
    h1b: "Delivered Across Bangladesh",
    desc: "Explore real duplex villas, 3BHK retrofit apartments, corporate boardrooms with PDLC privacy glass, and industrial IoT deployments engineered and supported by our Dhaka team.",
    kicker: "Bangladesh Case Studies",
    h2: "Explore Delivered Installations by Sector",
    btnText: "Request Similar System for Your Space →",
    filters: [
      { id: "All", label: "All Projects" },
      { id: "Residential", label: "Residential (Dhaka)" },
      { id: "Commercial", label: "Corporate & VRF" },
      { id: "Industrial", label: "RMG & Industrial IoT" },
    ],
    cases: [
      {
        num: "01",
        title: "Gulshan-2 Duplex Residence",
        location: "Road 71, Gulshan-2, Dhaka",
        sector: "Residential",
        sectorLabel: "Residential",
        system: "Zigbee 3.0 Local Hub + IPS Smart Load Guard",
        scope: [
          "38 Tempered Glass Touch Switch Circuits",
          "10 Whisper-Quiet Roller & Slider Curtain Tracks",
          "3D Face Recognition Main Door Lock",
          "Automatic IPS Load-Shedding AC Cutoff",
        ],
        summary:
          "Full duplex automation installed cleanly with zero wall cutting, featuring Azan/morning curtain schedules, Titas gas safety shutoff, and automatic IPS battery protection.",
        img: "/media/aura/proj-1.webp",
      },
      {
        num: "02",
        title: "Banani Corporate HQ & PDLC Boardroom",
        location: "Kemal Ataturk Ave, Banani, Dhaka",
        sector: "Commercial",
        sectorLabel: "Commercial",
        system: "Switchable PDLC Glass + Daikin VRF AC Control",
        scope: [
          "420 sq.ft Switchable PDLC Smart Privacy Film",
          "Central VRF HVAC Occupancy Scheduling",
          "1-Tap 'Presentation Mode' Lighting & Blinds",
          "Biometric & RFID Employee Access Control",
        ],
        summary:
          "Glass meeting rooms transform from crystal clear to private frosted in 0.1 seconds, paired with automated VRF AC scheduling that reduced monthly DESCO bills by 28%.",
        img: "/media/aura/proj-2.webp",
      },
      {
        num: "03",
        title: "Baridhara Diplomatic Smart Residence",
        location: "Baridhara DOHS, Dhaka",
        sector: "Residential",
        sectorLabel: "Residential",
        system: "Hybrid KNX + Dubai-Style Magnetic Profile Lighting",
        scope: [
          "Tunable 2700K–6500K Magnetic Track Lighting",
          "Concealed Pelmet Drapery Motors (50 kg)",
          "Multi-Zone Ceiling Audio & Video Intercom",
          "Kitchen Titas Gas & Bathroom Leak Protection",
        ],
        summary:
          "Coordinated closely with the interior architect to deliver seamless false-ceiling magnetic lighting, silent drapery, and 100% offline local execution.",
        img: "/media/aura/proj-3.webp",
      },
      {
        num: "04",
        title: "Dhanmondi 3BHK Lived-In Flat Upgrade",
        location: "Road 8A, Dhanmondi, Dhaka",
        sector: "Residential",
        sectorLabel: "Residential",
        system: "100% Retrofit Wireless Smart Home (1-Day Setup)",
        scope: [
          "14 Existing 3x3 & 3x6 Switchboards Upgraded",
          "Elderly-Friendly Bedside 'Goodnight' Button",
          "4 Inverter Split ACs Automated + IPS Guard",
          "3D Face ID + Fingerprint Apartment Door Lock",
        ],
        summary:
          "Completed in a single day inside an occupied family flat with zero dust or rewiring, giving grandparents effortless one-touch bedside control.",
        img: "/media/aura/proj-4.jpg",
      },
      {
        num: "05",
        title: "Tejgaon Commercial Tower & Model Flat",
        location: "Tejgaon Commercial Area, Dhaka",
        sector: "Commercial",
        sectorLabel: "Commercial",
        system: "Developer Showcase + Central BMS Sub-Metering",
        scope: [
          "Singapore-Standard Smart Model Apartment",
          "PDLC Executive Partition Glass + Smart Locks",
          "Ultrasonic Rooftop & Underground Water Pump Auto",
          "Generator Fuel & 3-Phase Voltage Telemetry",
        ],
        summary:
          "Engineered for a leading Dhaka real estate developer to showcase turnkey smart living to buyers while automating building utilities.",
        img: "/media/aura/proj-5.jpg",
      },
      {
        num: "06",
        title: "Gazipur RMG Plant & Cold Chain IoT",
        location: "Gazipur Industrial Zone, Dhaka Division",
        sector: "Industrial",
        sectorLabel: "Industrial",
        system: "LoRaWAN + RS485 Modbus Industrial IoT",
        scope: [
          "120-Machine Sewing Line Power & Uptime Tracking",
          "-25°C Warehouse Temperature & Humidity Probes",
          "Diesel Generator Fuel Level & Theft Alerts",
          "Instant WhatsApp/SMS Threshold Escalation",
        ],
        summary:
          "Custom industrial IoT sensors transmitting over long-range LoRaWAN to monitor production floor power factor, chiller compliance, and generator fuel.",
        img: "/media/aura/proj-6.jpg",
      },
    ],
  },
  bn: {
    badge: "NEXSOLIA বাংলাদেশ পোর্টফোলিও",
    h1a: "ঢাকা ও সারা দেশে বাস্তবায়িত",
    h1b: "স্মার্ট হোম ও এন্টারপ্রাইজ প্রজেক্ট",
    desc: "গুলশান, বনানী, বারিধারা, ধানমন্ডি, উত্তরা ও গাজীপুরে আমাদের ঢাকা ইঞ্জিনিয়ারিং টিমের সম্পন্ন করা ডুপ্লেক্স ভিলা, ৩-বেডরুম রেট্রোফিট ফ্ল্যাট, কর্পোরেট বোর্ডরুম এবং ইন্ডাস্ট্রিয়াল IoT প্রজেক্টসমূহ দেখুন।",
    kicker: "কেস স্টাডি (বাংলাদেশ)",
    h2: "খাত অনুযায়ী আমাদের সম্পন্ন প্রজেক্টসমূহ",
    btnText: "আপনার বাসা বা অফিসের জন্য অনুরূপ সিস্টেম চান →",
    filters: [
      { id: "All", label: "সব প্রজেক্ট" },
      { id: "Residential", label: "রেসিডেনশিয়াল (ঢাকা)" },
      { id: "Commercial", label: "কর্পোরেট ও VRF" },
      { id: "Industrial", label: "গার্মেন্টস ও ইন্ডাস্ট্রিয়াল IoT" },
    ],
    cases: [
      {
        num: "01",
        title: "গুলশান-২ ডুপ্লেক্স রেসিডেন্স",
        location: "রোড ৭১, গুলশান-২, ঢাকা",
        sector: "Residential",
        sectorLabel: "রেসিডেনশিয়াল",
        system: "Zigbee 3.0 লোকাল হাব + আইপিএস স্মার্ট লোড গার্ড",
        scope: [
          "৩৮টি টেম্পারড গ্লাস টাচ সুইচ সার্কিট",
          "১০টি আল্ট্রা-সাইলেন্ট রোলার ও স্লাইডার কার্টেন ট্র্যাক",
          "3D ফেস রিকগনিশন মেইন ডোর লক",
          "লোডশেডিংয়ে অটোমেটিক আইপিএস এসি কাট-অফ",
        ],
        summary:
          "দেয়াল না কেটে সম্পূর্ণ ডুপ্লেক্স অটোমেশন—যাতে রয়েছে ফজর/সকালের পর্দার শিডিউল, তিতাস গ্যাস সেফটি ভালভ এবং আইপিএস ব্যাটারি সুরক্ষা।",
        img: "/media/aura/proj-1.webp",
      },
      {
        num: "02",
        title: "বনানী কর্পোরেট হেডকোয়ার্টার ও PDLC বোর্ডরুম",
        location: "কামাল আতাতুর্ক অ্যাভিনিউ, বনানী, ঢাকা",
        sector: "Commercial",
        sectorLabel: "কর্পোরেট",
        system: "সুইচেবল PDLC গ্লাস + Daikin VRF এসি কন্ট্রোল",
        scope: [
          "৪২০ স্কয়ার ফিট সুইচেবল PDLC স্মার্ট প্রাইভেসি ফিল্ম",
          "সেন্ট্রাল VRF এসি অকুপেন্সি শিডিউলিং",
          "১-ট্যাপ 'প্রেজেন্টেশন মোড' লাইটিং ও ব্লাইন্ডস",
          "বায়োমেট্রিক ও RFID অ্যাক্সেস কন্ট্রোল",
        ],
        summary:
          "মাত্র ০.১ সেকেন্ডে বোর্ডরুমের গ্লাস স্বচ্ছ থেকে প্রাইভেট ফ্রস্টেড হয়ে যায় এবং স্মার্ট VRF এসি কন্ট্রোলের মাধ্যমে মাসিক DESCO বিদ্যুৎ বিল ২৮% সাশ্রয় হয়েছে।",
        img: "/media/aura/proj-2.webp",
      },
      {
        num: "03",
        title: "বারিধারা ডিপ্লোম্যাটিক স্মার্ট রেসিডেন্স",
        location: "বারিধারা ডিওএইচএস, ঢাকা",
        sector: "Residential",
        sectorLabel: "রেসিডেনশিয়াল",
        system: "হাইব্রিড KNX + দুবাই-স্টাইল ম্যাগনেটিক প্রোফাইল লাইটিং",
        scope: [
          "২৭০০K–৬৫০০K টিউনেবল ম্যাগনেটিক ট্র্যাক লাইটিং",
          "কনসিল্ড পেলমেট কার্টেন মোটর (৫০ কেজি সক্ষমতা)",
          "মাল্টি-জোন সিলিং অডিও ও ভিডিও ইন্টারকম",
          "রান্নাঘরের তিতাস গ্যাস ও ওয়াটার লিক প্রোটেকশন",
        ],
        summary:
          "ইন্টেরিয়র আর্কিটেক্টের সাথে সমন্বয় করে ফলস সিলিং ম্যাগনেটিক প্রোফাইল লাইটিং, সাইলেন্ট পর্দা এবং ১০০% অফলাইন লোকাল অটোমেশন বাস্তবায়ন।",
        img: "/media/aura/proj-3.webp",
      },
      {
        num: "04",
        title: "ধানমন্ডি ৩-বেডরুম রেডি ফ্ল্যাট আপগ্রেড",
        location: "রোড ৮এ, ধানমন্ডি, ঢাকা",
        sector: "Residential",
        sectorLabel: "রেসিডেনশিয়াল",
        system: "১০০% রেট্রোফিট ওয়্যারলেস স্মার্ট হোম (১ দিনে সেটআপ)",
        scope: [
          "১৪টি বর্তমান ৩x৩ ও ৩x৬ সুইচবোর্ড স্মার্ট আপগ্রেড",
          "বয়স্কদের জন্য বিছানার পাশে ১-ট্যাপ 'গুডনাইট' বাটন",
          "৪টি ইনভার্টার স্প্লিট এসি অটোমেশন + আইপিএস গার্ড",
          "3D ফেস আইডি + ফিঙ্গারপ্রিন্ট মেইন ডোর লক",
        ],
        summary:
          "বসবাসরত ফ্ল্যাটে কোনো ধুলোবালি বা দেয়াল কাটা ছাড়াই মাত্র ১ দিনে সম্পন্ন সেটআপ—যা বাসার বয়স্ক বাবা-মাকেও দিয়েছে ওয়ান-টাচ সুবিধা।",
        img: "/media/aura/proj-4.jpg",
      },
      {
        num: "05",
        title: "তেজগাঁও কমার্শিয়াল টাওয়ার ও মডেল ফ্ল্যাট",
        location: "তেজগাঁও বাণিজ্যিক এলাকা, ঢাকা",
        sector: "Commercial",
        sectorLabel: "কর্পোরেট ও ডেভেলপার",
        system: "ডেভেলপার শোকেস + সেন্ট্রাল ইউটিলিটি মনিটরিং",
        scope: [
          "সিঙ্গাপুর-স্ট্যান্ডার্ড স্মার্ট মডেল অ্যাপার্টমেন্ট",
          "PDLC এক্সিকিউটিভ পার্টিশন গ্লাস ও স্মার্ট লক",
          "আল্ট্রাসনিক ছাদের পানির ট্যাংক ও পাম্প অটোমেশন",
          "জেনারেটর ফুয়েল ও ৩-ফেজ ভোল্টেজ টেলিমেট্রি",
        ],
        summary:
          "ঢাকার শীর্ষস্থানীয় রিয়েল এস্টেট ডেভেলপারের জন্য নির্মিত মডেল ফ্ল্যাট ও সেন্ট্রাল ইউটিলিটি অটোমেশন সিস্টেম।",
        img: "/media/aura/proj-5.jpg",
      },
      {
        num: "06",
        title: "গাজীপুর গার্মেন্টস ফ্যাক্টরি ও কোল্ড স্টোরেজ IoT",
        location: "গাজীপুর ইন্ডাস্ট্রিয়াল জোন, ঢাকা",
        sector: "Industrial",
        sectorLabel: "ইন্ডাস্ট্রিয়াল IoT",
        system: "LoRaWAN + RS485 Modbus ইন্ডাস্ট্রিয়াল IoT",
        scope: [
          "১২০টি সুইং মেশিন লাইনের পাওয়ার ও আপটাইম ট্র্যাকিং",
          "-২৫°C কোল্ড স্টোরেজ তাপমাত্রা ও আর্দ্রতা সেন্সর",
          "ডিজেল জেনারেটর ফুয়েল লেভেল ও চুরি প্রতিরোধ অ্যালার্ট",
          "তাৎক্ষণিক হোয়াটসঅ্যাপ ও SMS নোটিফিকেশন",
        ],
        summary:
          "লং-রেঞ্জ LoRaWAN নেটওয়ার্কের মাধ্যমে ফ্যাক্টরির প্রোডাকশন ফ্লোর, চিলার রুম এবং জেনারেটরের রিয়েল-টাইম ক্লাউড ও লোকাল মনিটরিং।",
        img: "/media/aura/proj-6.jpg",
      },
    ],
  },
};

export default function ProjectsPage() {
  const [sectorFilter, setSectorFilter] = useState<string>("All");
  const { lang } = useLanguage();
  const t = PROJECTS_PAGE_I18N[lang];

  const visibleCases =
    sectorFilter === "All"
      ? t.cases
      : t.cases.filter((c) => c.sector === sectorFilter);

  return (
    <div className="w-full bg-white">
      {/* Dark Page Hero */}
      <section className="relative bg-[#071D3A] text-white py-20 px-6 overflow-hidden">
        <div
          className="absolute inset-0 opacity-25 bg-cover bg-center"
          style={{ backgroundImage: "url('/media/aura/proj-1.webp')" }}
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

      {/* Interactive 3D Coverflow Slider */}
      <ProjectsSection />

      {/* Detailed Project Grid */}
      <section className="py-16 px-5 bg-[#F4F8FC]">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#0877E8]">
                {t.kicker}
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-[#071D3A] mt-1">
                {t.h2}
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {t.filters.map((sec) => (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => setSectorFilter(sec.id)}
                  className={`px-4 py-2 rounded-full text-xs font-extrabold transition cursor-pointer ${
                    sectorFilter === sec.id
                      ? "bg-[#0877E8] text-white shadow-[0_8px_20px_rgba(8,119,232,0.28)]"
                      : "bg-white text-[#3b4252] border border-[#d6e4f2] hover:border-[#0877E8]"
                  }`}
                >
                  {sec.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleCases.map((c) => (
              <div
                key={c.num}
                className="bg-white rounded-2xl border border-[#dbe7f4] overflow-hidden shadow-[0_6px_22px_rgba(7,29,58,0.06)] hover:shadow-[0_18px_40px_rgba(8,119,232,0.12)] transition-all flex flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#071D3A]">
                  <img
                    src={c.img}
                    alt={c.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-[#0877E8] text-white">
                      {c.num}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-black/65 text-white backdrop-blur-sm">
                      {c.sectorLabel}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <span className="text-xs font-extrabold text-[#0877E8]">
                    {c.system}
                  </span>
                  <h3 className="text-lg font-black text-[#071D3A] mt-1">
                    {c.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#6E8299] mb-3">
                    {c.location}
                  </p>
                  <p className="text-sm text-[#4A5E75] leading-relaxed mb-4">
                    {c.summary}
                  </p>

                  <ul className="space-y-1.5 mb-6 mt-auto">
                    {c.scope.map((s) => (
                      <li
                        key={s}
                        className="text-xs font-bold text-[#071D3A] flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0877E8]" />
                        {s}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className="w-full py-3 rounded-xl bg-[#071D3A] hover:bg-[#0877E8] text-white text-xs font-extrabold text-center transition"
                  >
                    {t.btnText}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors */}
      <SectorsSection />

      {/* Final CTA */}
      <FinalCtaSection />
    </div>
  );
}
