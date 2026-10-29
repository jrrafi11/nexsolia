"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const COMPARE_I18N = {
  en: {
    label: "Solution Architecture Comparison",
    h2: "Which Architecture Fits Your Home, Office or Building?",
    sub: "Because we design custom solutions around your exact needs, we engineer both 100% Retrofit Wireless Systems (for ready homes & offices) and Wired KNX / BMS Bus Systems (for commercial towers, villas & industrial facilities).",
    tabKnx: "Wired KNX & BMS",
    tabSmart: "Retrofit Wireless",
    colKnxTitle: "Wired KNX, BMS & VRF Bus",
    colKnxSub: "Dedicated bus backbone for buildings, towers & new villas",
    colSmartTitle: "100% Retrofit Wireless",
    colSmartSub: "Fits existing BD 3x3 & 3x6 switchboards in ready homes & offices",
    rows: [
      {
        num: "01",
        criterion: "Starting Cost (BDT)",
        knxTitle: "Custom Project Investment",
        knxDesc:
          "Designed for new duplex villas, commercial towers, and factories requiring dedicated bus cabling and panel boards.",
        smartTitle: "Starts from ৳3,500 / Switchboard",
        smartDesc:
          "Start with 1 room or a single switchboard (PDLC film from ৳1,290/sq.ft, sensors from ৳2,750) with ৳0 monthly fee.",
      },
      {
        num: "02",
        criterion: "Load-Shedding & Offline Stability",
        knxTitle: "Industrial-Grade Bus Reliability",
        knxDesc:
          "Hardwired KNX/RS485 bus lines engineered for continuous 24/7 operation across multi-floor buildings and VRF chillers.",
        smartTitle: "Offline Local Hub + IPS Load Guard",
        smartDesc:
          "Runs locally without internet and automatically turns off heavy ACs & geysers when your building switches to IPS/backup.",
      },
      {
        num: "03",
        criterion: "Installation & Wall Work",
        knxTitle: "During Civil / Conduit Stage",
        knxDesc:
          "Requires laying dedicated green KNX bus cables alongside electrical conduits before plastering and false ceiling work.",
        smartTitle: "Zero Wall Cutting (1–2 Days)",
        smartDesc:
          "Swaps directly into your existing Bangladeshi switchboards with zero dust, zero rewiring, and can move with you if you rent.",
      },
      {
        num: "04",
        criterion: "Best Suited For",
        knxTitle: "New Villas, Towers & RMG Plants",
        knxDesc:
          "Ideal for under-construction residences, corporate HQs, central VRF HVAC buildings, and industrial IoT telemetry.",
        smartTitle: "Ready Flats, Lived-In Homes & Offices",
        smartDesc:
          "Perfect for 3BHK/4BHK apartments in Gulshan, Banani, Dhanmondi, Uttara & rented spaces needing instant upgrades.",
      },
      {
        num: "05",
        criterion: "Future Expansion",
        knxTitle: "Multi-Building Scalability",
        knxDesc:
          "Expandable across hundreds of zones, BMS dashboards, DALI profile lighting, and central energy sub-metering.",
        smartTitle: "Add Room-by-Room Anytime",
        smartDesc:
          "Start with your living room or master bedroom today and add curtains, locks, or gas sensors whenever you wish.",
      },
    ],
    ctaTitle: "Not sure which system fits your flat, villa, or office?",
    ctaSub:
      "Message our Dhaka engineering team for a free on-site assessment and exact BDT quotation.",
    ctaBtn: "Book Free Site Visit",
  },
  bn: {
    label: "সলিউশন আর্কিটেকচার তুলনা",
    h2: "আপনার বাসা, অফিস বা ভবনের জন্য কোন আর্কিটেকচারটি সেরা?",
    sub: "যেহেতু আমরা গ্রাহকের চাহিদা অনুযায়ী কাস্টম সলিউশন ডিজাইন করি, তাই রেডি বাসা ও অফিসের জন্য ১০০% রেট্রোফিট ওয়্যারলেস সিস্টেম এবং বড় ভবন, BMS ও ফ্যাক্টরির জন্য ওয়্যারড KNX / VRF বাস—উভয় সলিউশনই আমরা বাস্তবায়ন করি।",
    tabKnx: "ওয়্যারড KNX ও BMS",
    tabSmart: "রেট্রোফিট ওয়্যারলেস",
    colKnxTitle: "ওয়্যারড KNX, BMS ও VRF বাস",
    colKnxSub: "নতুন ভবন, কমার্শিয়াল টাওয়ার ও BMS-এর জন্য ডেডিকেটেড ক্যাবল সিস্টেম",
    colSmartTitle: "১০০% রেট্রোফিট ওয়্যারলেস",
    colSmartSub: "রেডি ফ্ল্যাট ও অফিসে দেয়াল না কেটে বর্তমান ৩x৩ ও ৩x৬ বোর্ডে সেটআপ",
    rows: [
      {
        num: "01",
        criterion: "শুরুর খরচ (টাকা)",
        knxTitle: "প্রজেক্ট ভিত্তিক দীর্ঘমেয়াদী বিনিয়োগ",
        knxDesc:
          "নতুন ডুপ্লেক্স ভিলা, কমার্শিয়াল টাওয়ার ও ফ্যাক্টরির সম্পূর্ণ ইন্টিগ্রেটেড কন্ট্রোল ইনফ্রাস্ট্রাকচারের জন্য উপযুক্ত।",
        smartTitle: "মাত্র ৳৩,৫০০ / সুইচবোর্ড থেকে শুরু",
        smartDesc:
          "মাত্র ১টি রুম বা সুইচবোর্ড দিয়েই শুরু করুন (PDLC ফিল্ম ৳১,২৯০/স্কয়ার ফিট, সেন্সর ৳২,৭৫০ থেকে) এবং মাসিক চার্জ ৳০।",
      },
      {
        num: "02",
        criterion: "লোডশেডিং ও অফলাইন নির্ভরযোগ্যতা",
        knxTitle: "ইন্ডাস্ট্রিয়াল-গ্রেড বাস স্ট্যাবিলিটি",
        knxDesc:
          "বড় ভবন, হোটেল এবং VRF চিলার সিস্টেমে ২৪/৭ নিরবচ্ছিন্ন অপারেশনের জন্য হার্ডওয়্যার্ড বাস নেটওয়ার্ক।",
        smartTitle: "অফলাইন লোকাল হাব + আইপিএস লোড গার্ড",
        smartDesc:
          "ইন্টারনেট ছাড়াও লোকাল হাবে সচল থাকে এবং লোডশেডিংয়ে আইপিএস চালু হলে স্বয়ংক্রিয়ভাবে এসি ও গিজার বন্ধ করে ব্যাটারি বাঁচায়।",
      },
      {
        num: "03",
        criterion: "ইনস্টলেশন ও দেয়ালের কাজ",
        knxTitle: "কনস্ট্রাকশন বা কন্ডুইট পর্যায়ে পরিকল্পনা",
        knxDesc:
          "প্লাস্টার ও ফলস সিলিংয়ের আগেই ইলেকট্রিক্যাল পাইপের সাথে ডেডিকেটেড KNX বাস ক্যাবল বসানোর প্রয়োজন হয়।",
        smartTitle: "দেয়াল কাটা ছাড়াই (১–২ দিনে সেটআপ)",
        smartDesc:
          "আপনার বর্তমান সুইচবোর্ডেই সরাসরি বসে যায়—কোনো ধুলোবালি বা নতুন তার টানার ঝামেলা নেই, বাসা বদলালে খুলে নেওয়া যায়।",
      },
      {
        num: "04",
        criterion: "কাদের জন্য সবচেয়ে উপযোগী",
        knxTitle: "নতুন ভিলা, কমার্শিয়াল টাওয়ার ও ফ্যাক্টরি",
        knxDesc:
          "নির্মাণাধীন ডুপ্লেক্স, কর্পোরেট হেডকোয়ার্টার, সেন্ট্রাল VRF এসি ভবন এবং ইন্ডাস্ট্রিয়াল IoT প্রজেক্টের জন্য সেরা।",
        smartTitle: "রেডি ফ্ল্যাট, বসবাসরত বাসা ও অফিস",
        smartDesc:
          "গুলশান, বনানী, ধানমন্ডি, উত্তরার রেডি অ্যাপার্টমেন্ট কিংবা ভাড়া বাসাকে ঝামেলা ছাড়াই স্মার্ট করার জন্য আদর্শ।",
      },
      {
        num: "05",
        criterion: "ভবিষ্যৎ সম্প্রসারণ",
        knxTitle: "মাল্টি-বিল্ডিং স্কেলেবিলিটি",
        knxDesc:
          "শত শত জোন, BMS ড্যাশবোর্ড, DALI প্রোফাইল লাইটিং ও সাব-মিটারিং একসাথে যুক্ত করার সুবিধা।",
        smartTitle: "যেকোনো সময় রুম-বাই-রুম সম্প্রসারণ",
        smartDesc:
          "আজ ড্রয়িং রুম বা মাস্টার বেডরুম দিয়ে শুরু করে পরে সুবিধামতো স্মার্ট পর্দা, ডোর লক বা গ্যাস সেন্সর যোগ করতে পারবেন।",
      },
    ],
    ctaTitle: "আপনার ফ্ল্যাট, ভিলা বা অফিসের জন্য কোনটি সঠিক বুঝতে পারছেন না?",
    ctaSub:
      "ফ্রি সাইট ভিজিট এবং সঠিক বাজেট এস্টিমেটের জন্য আমাদের ঢাকা ইঞ্জিনিয়ারিং টিমের সাথে কথা বলুন।",
    ctaBtn: "ফ্রি কনসালটেশন বুক করুন",
  },
};

export default function CompareSection() {
  const [activeTab, setActiveTab] = useState<"knx" | "smart">("smart");
  const { lang } = useLanguage();
  const t = COMPARE_I18N[lang];

  return (
    <section
      className="aura-compare"
      dir="ltr"
      lang={lang}
      aria-label="Comparison between Wireless Smart Home and Wired KNX"
    >
      <div className="compare-shell">
        <header className="compare-head">
          <div className="compare-label">{t.label}</div>
          <h2>{t.h2}</h2>
          <p>{t.sub}</p>
        </header>

        <div className="mobile-tabs" role="tablist">
          <button
            type="button"
            data-tab="knx"
            className={activeTab === "knx" ? "active" : ""}
            onClick={() => setActiveTab("knx")}
          >
            {t.tabKnx}
          </button>
          <button
            type="button"
            data-tab="smart"
            className={activeTab === "smart" ? "active" : ""}
            onClick={() => setActiveTab("smart")}
          >
            {t.tabSmart}
          </button>
        </div>

        <div className="cols-head" aria-hidden="true">
          <div />
          <div className="pair">
            <div className="col-title knx">
              <svg viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="6" rx="1.5" />
                <rect x="3" y="14" width="18" height="6" rx="1.5" />
                <path d="M7 7h.01M7 17h.01M12 10v4" />
              </svg>
              <div>
                <strong>{t.colKnxTitle}</strong>
                <span>{t.colKnxSub}</span>
              </div>
            </div>
            <div className="col-title smart">
              <svg viewBox="0 0 24 24">
                <path d="M2 9a15 15 0 0 1 20 0" />
                <path d="M5 12.5a10 10 0 0 1 14 0" />
                <path d="M8.5 16a5 5 0 0 1 7 0" />
                <circle cx="12" cy="19.5" r=".8" />
              </svg>
              <div>
                <strong>{t.colSmartTitle}</strong>
                <span>{t.colSmartSub}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="compare-rows" data-active={activeTab}>
          {/* 01 */}
          <div className="compare-row">
            <div className="criterion">
              <span className="num">{t.rows[0].num}</span>
              <span className="dash" />
              <strong>{t.rows[0].criterion}</strong>
            </div>
            <div className="row-pair">
              <div className="card knx">
                <div className="icon">
                  <svg viewBox="0 0 24 24">
                    <ellipse cx="12" cy="6" rx="7" ry="3" />
                    <path d="M5 6v4c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
                    <path d="M5 10v4c0 1.7 3.1 3 7 3s7-1.3 7-3v-4" />
                    <path d="M5 14v4c0 1.7 3.1 3 7 3s7-1.3 7-3v-4" />
                  </svg>
                </div>
                <div className="copy">
                  <strong>{t.rows[0].knxTitle}</strong>
                  <span>{t.rows[0].knxDesc}</span>
                </div>
              </div>
              <div className="card smart">
                <div className="icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M2 9a15 15 0 0 1 20 0" />
                    <path d="M5 12.5a10 10 0 0 1 14 0" />
                    <path d="M8.5 16a5 5 0 0 1 7 0" />
                    <circle cx="12" cy="19.5" r=".8" />
                  </svg>
                </div>
                <div className="copy">
                  <strong>{t.rows[0].smartTitle}</strong>
                  <span>{t.rows[0].smartDesc}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 02 */}
          <div className="compare-row">
            <div className="criterion">
              <span className="num">{t.rows[1].num}</span>
              <span className="dash" />
              <strong>{t.rows[1].criterion}</strong>
            </div>
            <div className="row-pair">
              <div className="card knx">
                <div className="icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
                  </svg>
                </div>
                <div className="copy">
                  <strong>{t.rows[1].knxTitle}</strong>
                  <span>{t.rows[1].knxDesc}</span>
                </div>
              </div>
              <div className="card smart">
                <div className="icon">
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
                  </svg>
                </div>
                <div className="copy">
                  <strong>{t.rows[1].smartTitle}</strong>
                  <span>{t.rows[1].smartDesc}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 03 */}
          <div className="compare-row">
            <div className="criterion">
              <span className="num">{t.rows[2].num}</span>
              <span className="dash" />
              <strong>{t.rows[2].criterion}</strong>
            </div>
            <div className="row-pair">
              <div className="card knx">
                <div className="icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M4 6h16M4 12h16M4 18h16" />
                    <circle cx="9" cy="6" r="2" fill="none" />
                    <circle cx="15" cy="12" r="2" fill="none" />
                    <circle cx="8" cy="18" r="2" fill="none" />
                  </svg>
                </div>
                <div className="copy">
                  <strong>{t.rows[2].knxTitle}</strong>
                  <span>{t.rows[2].knxDesc}</span>
                </div>
              </div>
              <div className="card smart">
                <div className="icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M13 2L4 14h7l-1 8 9-12h-7z" />
                  </svg>
                </div>
                <div className="copy">
                  <strong>{t.rows[2].smartTitle}</strong>
                  <span>{t.rows[2].smartDesc}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 04 */}
          <div className="compare-row">
            <div className="criterion">
              <span className="num">{t.rows[3].num}</span>
              <span className="dash" />
              <strong>{t.rows[3].criterion}</strong>
            </div>
            <div className="row-pair">
              <div className="card knx">
                <div className="icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M4 21V4h10v17" />
                    <path d="M14 9h6v12" />
                    <path d="M2 21h20" />
                    <path d="M7 8h1M10 8h1M7 12h1M10 12h1M7 16h1M10 16h1M17 13h0M17 17h0" />
                  </svg>
                </div>
                <div className="copy">
                  <strong>{t.rows[3].knxTitle}</strong>
                  <span>{t.rows[3].knxDesc}</span>
                </div>
              </div>
              <div className="card smart">
                <div className="icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M3 11l9-7 9 7" />
                    <path d="M5 9.5V20h14V9.5" />
                    <path d="M10 20v-5h4v5" />
                  </svg>
                </div>
                <div className="copy">
                  <strong>{t.rows[3].smartTitle}</strong>
                  <span>{t.rows[3].smartDesc}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 05 */}
          <div className="compare-row">
            <div className="criterion">
              <span className="num">{t.rows[4].num}</span>
              <span className="dash" />
              <strong>{t.rows[4].criterion}</strong>
            </div>
            <div className="row-pair">
              <div className="card knx">
                <div className="icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M5 20v-6M10 20V10M15 20V6M20 20V3" />
                  </svg>
                </div>
                <div className="copy">
                  <strong>{t.rows[4].knxTitle}</strong>
                  <span>{t.rows[4].knxDesc}</span>
                </div>
              </div>
              <div className="card smart">
                <div className="icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M14 4h6v6" />
                    <path d="M20 4l-7 7" />
                    <path d="M10 20H4v-6" />
                    <path d="M4 20l7-7" />
                  </svg>
                </div>
                <div className="copy">
                  <strong>{t.rows[4].smartTitle}</strong>
                  <span>{t.rows[4].smartDesc}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="compare-cta">
          <div className="cta-icon">
            <svg viewBox="0 0 24 24">
              <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
              <rect x="3" y="13" width="4" height="6" rx="1.5" />
              <rect x="17" y="13" width="4" height="6" rx="1.5" />
              <path d="M19 19c0 1.5-2 2.5-5 2.5" />
            </svg>
          </div>
          <div className="cta-copy">
            <strong>{t.ctaTitle}</strong>
            <span>{t.ctaSub}</span>
          </div>
          <div className="cta-divider" />
          <Link className="cta-button" href="/contact">
            {t.ctaBtn}
            <svg viewBox="0 0 24 24">
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
