"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface FaqItem {
  q: string;
  a: string;
}

const FAQS_I18N: Record<
  "en" | "bn",
  {
    kicker: string;
    h2a: string;
    h2b: string;
    items: FaqItem[];
  }
> = {
  en: {
    kicker: "FAQ — CUSTOM SMART SOLUTIONS",
    h2a: "Questions Clients in",
    h2b: "Bangladesh Ask Us",
    items: [
      {
        q: "Are you only a Smart Home company, or do you design custom solutions for offices, buildings & factories?",
        a: "We are a full solution-based engineering company! We design custom solutions as per customer requirements — including Smart Home Solutions (flats & duplexes), Smart Office Solutions (boardrooms, PDLC privacy glass, biometric access), Building Management Systems (BMS, central VRF/HVAC control, energy sub-metering), and custom industrial IoT.",
      },
      {
        q: "What happens during load-shedding or when a home or building switches to IPS / generator?",
        a: "Your wall switches still work manually like normal switches, and our local gateway runs on UPS/IPS without needing internet. Better yet, our IPS/Generator Smart Load Guard automatically sheds heavy ACs, chillers, and geysers the second grid power drops — saving backup capacity for essential loads.",
      },
      {
        q: "Can you automate an already-completed apartment or active corporate office without breaking walls?",
        a: "Yes — zero wall breaking and zero rewiring! Our 100% retrofit modules fit directly inside standard Bangladeshi 3x3 and 3x6 switchboards using your existing wiring. A flat or office floor takes just 1–2 days to install cleanly with zero dust or business disruption.",
      },
      {
        q: "Can you also build a wired KNX or full Building Management System (BMS) for a new building?",
        a: "Absolutely. For under-construction commercial towers, duplex villas, hospitals, and corporate HQs, our engineering team designs full wired KNX, BACnet, RS485 Modbus, and VRF HVAC Building Management Systems (BMS) from the architectural blueprint stage.",
      },
      {
        q: "How much does a custom solution cost in Bangladesh? Do we have to do everything at once?",
        a: "Every quotation is tailored to your scope and budget. You can start with a single boardroom or room (switches from ৳3,500, sensors from ৳2,750, PDLC privacy glass from ৳1,290/sq.ft, 3D Face locks from ৳15,000) or commission a full multi-floor BMS — always with ৳0 monthly subscription fees.",
      },
      {
        q: "What warranty and engineering support does NEXSOLIA provide in Bangladesh?",
        a: "Every NEXSOLIA deployment includes a 3-Year Replacement Warranty and direct support from our Dhaka engineering team, with dedicated SLAs available for corporate offices, commercial buildings, and industrial facilities.",
      },
    ],
  },
  bn: {
    kicker: "সচরাচর জিজ্ঞাসিত প্রশ্ন (FAQ)",
    h2a: "আমাদের কাস্টম সলিউশন নিয়ে",
    h2b: "সাধারণ কিছু প্রশ্ন",
    items: [
      {
        q: "আপনারা কি শুধু স্মার্ট হোম করেন, নাকি অফিস, বিল্ডিং ম্যানেজমেন্ট (BMS) ও কাস্টম সলিউশনও ডিজাইন করেন?",
        a: "আমরা একটি পূর্ণাঙ্গ সলিউশন-ভিত্তিক কোম্পানি! গ্রাহকের চাহিদা অনুযায়ী আমরা স্মার্ট হোম সলিউশন, স্মার্ট অফিস সলিউশন (বোর্ডরুম, PDLC প্রাইভেসি গ্লাস, অ্যাক্সেস কন্ট্রোল), বিল্ডিং ম্যানেজমেন্ট সিস্টেম (BMS, সেন্ট্রাল VRF এসি ও এনার্জি সাব-মিটারিং) এবং ফ্যাক্টরি/ইন্ডাস্ট্রিয়াল IoT সহ যেকোনো কাস্টম স্মার্ট সলিউশন ডিজাইন ও বাস্তবায়ন করি।",
      },
      {
        q: "লোডশেডিং হলে বা ভবন আইপিএস/জেনারেটরে গেলে সিস্টেম কীভাবে কাজ করে?",
        a: "দেয়ালের প্রতিটি সুইচ সাধারণ সুইচের মতোই কাজ করে এবং আমাদের লোকাল হাব ইন্টারনেট ছাড়াই সচল থাকে। পাশাপাশি আমাদের 'IPS/Generator Smart Load Guard' মেইন বিদ্যুৎ চলে গেলে স্বয়ংক্রিয়ভাবে ভারী এসি বা গিজার বন্ধ করে দেয়, ফলে আপনার আইপিএস বা জেনারেটরের ওপর অতিরিক্ত চাপ পড়ে না।",
      },
      {
        q: "রেডি ফ্ল্যাট বা চলমান অফিসে দেয়াল না কেটে কি স্মার্ট সলিউশন বসানো সম্ভব?",
        a: "অবশ্যই! কোনো দেয়াল ভাঙা বা নতুন তার টানার প্রয়োজন নেই। আমাদের ১০০% রেট্রোফিট মডিউলগুলো বাংলাদেশের স্ট্যান্ডার্ড ৩x৩ ও ৩x৬ সুইচবোর্ডে বর্তমান ওয়্যারিংয়েই বসে যায়। ফলে চলমান অফিস বা বাসায় ধুলোবালি ছাড়াই ১–২ দিনে সেটআপ সম্পন্ন হয়।",
      },
      {
        q: "নতুন কমার্শিয়াল ভবন বা ডুপ্লেক্স প্রজেক্টের জন্য আপনারা কি ওয়্যারড KNX ও BMS ডিজাইন করেন?",
        a: "হ্যাঁ। নির্মাণাধীন ভবন, কর্পোরেট টাওয়ার, হাসপাতাল ও ডুপ্লেক্স ভিলার জন্য আমরা আর্কিটেকচারাল ড্রয়িং পর্যায় থেকেই ওয়্যারড KNX, BACnet, Modbus এবং সেন্ট্রাল VRF এসি কন্ট্রোলসহ পূর্ণাঙ্গ বিল্ডিং ম্যানেজমেন্ট সিস্টেম (BMS) ডিজাইন ও বাস্তবায়ন করি।",
      },
      {
        q: "কাস্টম সলিউশনের খরচ কেমন? পুরো প্রজেক্ট কি একসাথেই করতে হয়?",
        a: "আপনার প্রয়োজন ও বাজেট অনুযায়ী সলিউশন কাস্টমাইজ করা যায়। মাত্র ১টি রুম বা বোর্ডরুম দিয়েও শুরু করতে পারেন (টাচ সুইচ ৳৩,৫০০, সেন্সর ৳২,৭৫০, PDLC গ্লাস ৳১,২৯০/স্কয়ার ফিট, 3D ফেস লক ৳১৫,০০০ থেকে) অথবা পুরো ভবনের BMS করতে পারেন—কোনো মাসিক চার্জ ছাড়াই (৳০/মাস)।",
      },
      {
        q: "NEXSOLIA কী ধরনের ওয়ারেন্টি ও ইঞ্জিনিয়ারিং সাপোর্ট দেয়?",
        a: "আমাদের প্রতিটি প্রোডাক্ট ও ইনস্টলেশনে রয়েছে ৩ বছরের রিপ্লেসমেন্ট ওয়ারেন্টি (3-Year Replacement Warranty) এবং আমাদের ঢাকা ইঞ্জিনিয়ারিং টিমের সরাসরি অন-সাইট ও রিমোট সাপোর্ট।",
      },
    ],
  },
};

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number>(0);
  const { lang } = useLanguage();
  const t = FAQS_I18N[lang];

  return (
    <section id="aura-faq-v3" lang={lang} dir="ltr">
      <div className="wrap">
        <div className="layout">
          {/* HEADING */}
          <header className="heading">
            <span className="kicker">{t.kicker}</span>
            <h2>
              {t.h2a} <em>{t.h2b}</em>
            </h2>
          </header>

          {/* FAQ LIST */}
          <div className="list">
            {t.items.map((item, idx) => {
              const isOpen = openIdx === idx;
              return (
                <details
                  key={item.q}
                  open={isOpen}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenIdx(isOpen ? -1 : idx);
                  }}
                >
                  <summary>
                    <h4>{item.q}</h4>
                    <span className="plus" />
                  </summary>
                  <div className="answer">
                    <p>{item.a}</p>
                  </div>
                </details>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
