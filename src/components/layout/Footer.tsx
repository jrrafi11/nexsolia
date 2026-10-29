"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const FOOTER_I18N = {
  en: {
    slogan: "Nexus Solution for Intelligent Automation",
    about:
      "A custom solution-based automation company in Bangladesh. We design tailored Smart Home Solutions, Smart Office Automation, Building Management Systems (BMS), VRF/KNX control & custom Industrial IoT as per customer needs.",
    ratingLabel: "Bangladesh Client Rating",
    quickTitle: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "Shop All Products", href: "/shop" },
      { label: "Custom Solutions & Pricing", href: "/solutions" },
      { label: "Bangladesh Portfolio", href: "/projects" },
      { label: "Wireless vs KNX / BMS", href: "/compare" },
      { label: "About Nexsolia", href: "/about" },
      { label: "Request Custom Solution", href: "/contact" },
      { label: "Admin Panel", href: "/admin" },
    ],
    policyTitle: "Solutions & Assurances",
    policies: [
      "Custom Smart Home & Villa Solutions",
      "Smart Office & PDLC Privacy Glass",
      "Building Management Systems (BMS)",
      "Central VRF / HVAC & Energy Control",
      "Custom Industrial IoT & Telemetry",
      "3-Year Replacement Warranty Policy",
      "Zero Wall-Cutting Retrofit Guarantee",
      "Dhaka & Nationwide Engineering SLA",
    ],
    contactTitle: "Contact Us (Bangladesh)",
    waTag: "WhatsApp (Dhaka Team)",
    addressLine1: "Gulshan • Banani • Baridhara • Dhanmondi • Uttara",
    addressLine2: "Dhaka, Bangladesh (Nationwide Service in Chattogram & Sylhet)",
    payLabel: "Accepted in Bangladesh",
    openNow: "Open Now (BDT Time)",
    closedNow: "Closed Now",
    hoursTitle: "Working Hours (BST)",
    hoursVal: "Saturday – Thursday · 10:00 AM – 7:00 PM",
  },
  bn: {
    slogan: "Nexus Solution for Intelligent Automation",
    about:
      "বাংলাদেশের একটি কাস্টম সলিউশন-ভিত্তিক অটোমেশন কোম্পানি। গ্রাহকের চাহিদা অনুযায়ী আমরা স্মার্ট হোম সলিউশন, স্মার্ট অফিস অটোমেশন, বিল্ডিং ম্যানেজমেন্ট সিস্টেম (BMS), VRF/KNX কন্ট্রোল এবং কাস্টম IoT সলিউশন ডিজাইন ও বাস্তবায়ন করি।",
    ratingLabel: "গ্রাহক সন্তুষ্টি রেটিং",
    quickTitle: "দ্রুত লিংক",
    links: [
      { label: "হোম", href: "/" },
      { label: "সকল প্রোডাক্ট শপ", href: "/shop" },
      { label: "কাস্টম সলিউশন ও মূল্যতালিকা", href: "/solutions" },
      { label: "আমাদের প্রজেক্টসমূহ", href: "/projects" },
      { label: "ওয়্যারলেস বনাম KNX / BMS", href: "/compare" },
      { label: "আমাদের সম্পর্কে", href: "/about" },
      { label: "কাস্টম সলিউশন বুক করুন", href: "/contact" },
      { label: "অ্যাডমিন প্যানেল", href: "/admin" },
    ],
    policyTitle: "আমাদের সলিউশন ও নিশ্চয়তা",
    policies: [
      "কাস্টম স্মার্ট হোম ও ভিলা সলিউশন",
      "স্মার্ট অফিস ও PDLC প্রাইভেসি গ্লাস",
      "বিল্ডিং ম্যানেজমেন্ট সিস্টেম (BMS)",
      "সেন্ট্রাল VRF / HVAC ও এনার্জি কন্ট্রোল",
      "কাস্টম ইন্ডাস্ট্রিয়াল IoT ও টেলিম্যাট্রি",
      "৩ বছরের রিপ্লেসমেন্ট ওয়ারেন্টি নীতিমালা",
      "দেয়াল না কেটে রেট্রোফিট ইনস্টলেশন গ্যারান্টি",
      "ঢাকা ও সারা দেশে ইঞ্জিনিয়ারিং সাপোর্ট",
    ],
    contactTitle: "যোগাযোগ (বাংলাদেশ)",
    waTag: "হোয়াটসঅ্যাপ (ঢাকা টিম)",
    addressLine1: "গুলশান • বনানী • বারিধারা • ধানমন্ডি • উত্তরা",
    addressLine2: "ঢাকা, বাংলাদেশ (চট্টগ্রাম, সিলেট ও গাজীপুরে সার্ভিস সুবিধা)",
    payLabel: "পেমেন্ট মাধ্যম",
    openNow: "এখন খোলা আছে",
    closedNow: "এখন বন্ধ",
    hoursTitle: "কর্মঘণ্টা (বাংলাদেশ সময়)",
    hoursVal: "শনিবার – বৃহস্পতিবার · সকাল ১০:০০ – সন্ধ্যা ৭:০০",
  },
};

export default function Footer() {
  const [isOpenNow, setIsOpenNow] = useState(true);
  const { lang } = useLanguage();
  const t = FOOTER_I18N[lang];

  useEffect(() => {
    const checkStatus = () => {
      try {
        const now = new Date();
        const fmt = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Dhaka",
          weekday: "short",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
        const parts: Record<string, string> = {};
        fmt.formatToParts(now).forEach((p) => {
          parts[p.type] = p.value;
        });
        const day = parts.weekday;
        const mins =
          parseInt(parts.hour, 10) * 60 + parseInt(parts.minute, 10);
        const isWorkDay = day !== "Fri";
        const isWorkHour = mins >= 10 * 60 && mins < 19 * 60;
        setIsOpenNow(isWorkDay && isWorkHour);
      } catch {
        setIsOpenNow(true);
      }
    };
    checkStatus();
    const id = setInterval(checkStatus, 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="af" dir="ltr" lang={lang}>
      <div className="af-card">
        <div className="af-grid">
          {/* BRAND */}
          <div className="af-brand">
            <Link
              className="af-logo"
              href="/"
              aria-label="Nexsolia Smart Home Bangladesh — Home"
            >
              <Image
                src="/nexsolia-logo-dark.png"
                alt="Nexsolia — Nexus Solution for Intelligent Automation"
                width={230}
                height={67}
                className="object-contain h-[52px] w-auto"
              />
            </Link>

            <p className="af-slogan">{t.slogan}</p>

            <p className="af-about">{t.about}</p>

            <div className="af-social">
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M23 12s0-3.9-.5-5.8a3 3 0 0 0-2.1-2.1C18.5 3.5 12 3.5 12 3.5s-6.5 0-8.4.6A3 3 0 0 0 1.5 6.2C1 8.1 1 12 1 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 8.4.6 8.4.6s6.5 0 8.4-.6a3 3 0 0 0 2.1-2.1C23 15.9 23 12 23 12ZM9.9 15.5v-7l6.1 3.5-6.1 3.5Z" />
                </svg>
              </a>

              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M14 9V7.2c0-.8.2-1.2 1.4-1.2H17V3h-2.6C11.2 3 10 4.6 10 7v2H8v3h2v9h4v-9h2.7l.3-3h-3Z" />
                </svg>
              </a>

              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.9}
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.2"
                    cy="6.8"
                    r="1.1"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </a>

              <a
                href="https://wa.me/8801711000000"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.6 0-3.2-.4-4.5-1.3l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.4-3c-.1-.2 0-.4.1-.5l.5-.6c.1-.2.1-.3 0-.5l-.7-1.7c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.4-.3.3-.9.9-.9 2.1s.9 2.5 1.1 2.6c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.2.7 3 .6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.5-.2Z" />
                </svg>
              </a>

              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002ZM7 8.48H3V21h4V8.48Zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68Z" />
                </svg>
              </a>
            </div>

            <div className="af-rate">
              <span className="af-rate-label">{t.ratingLabel}</span>

              <span className="af-stars" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <svg key={i} viewBox="0 0 24 24" fill="currentColor">
                    <path d="m12 2 3 6.6 7 .8-5.2 4.8 1.4 7L12 17.8 5.8 21.2l1.4-7L2 9.4l7-.8L12 2Z" />
                  </svg>
                ))}
              </span>

              <span className="af-rate-num">4.9</span>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="af-c-quick">
            <h3 className="af-title">{t.quickTitle}</h3>
            <nav aria-label="Quick Links">
              <ul className="af-links">
                {t.links.map((item) => (
                  <li key={item.href + item.label}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* POLICIES */}
          <div className="af-c-policy">
            <h3 className="af-title">{t.policyTitle}</h3>
            <nav aria-label="Policies">
              <ul className="af-links">
                {t.policies.map((p) => (
                  <li key={p}>
                    <Link href="/about">{p}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* CONTACT */}
          <div className="af-c-contact">
            <h3 className="af-title">{t.contactTitle}</h3>

            {/* WHATSAPP */}
            <div className="af-ci">
              <div className="af-ci-ico is-wa">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.6 0-3.2-.4-4.5-1.3l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.4-3c-.1-.2 0-.4.1-.5l.5-.6c.1-.2.1-.3 0-.5l-.7-1.7c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.4-.3.3-.9.9-.9 2.1s.9 2.5 1.1 2.6c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.2.7 3 .6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.5-.2Z" />
                </svg>
              </div>
              <div className="af-ci-body">
                <a
                  className="af-tel"
                  href="https://wa.me/8801711000000"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +880 1711-000000
                </a>
                <span className="af-wa-tag">{t.waTag}</span>
              </div>
            </div>

            {/* PHONE */}
            <div className="af-ci">
              <div className="af-ci-ico">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.9}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.9 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.9 2Z" />
                </svg>
              </div>
              <div className="af-ci-body">
                <a className="af-tel is-alt" href="tel:+8801711000000">
                  +880 1711-000000
                </a>
                <a className="af-tel is-alt" href="tel:+8801811000000">
                  +880 1811-000000
                </a>
              </div>
            </div>

            {/* EMAIL */}
            <div className="af-ci">
              <div className="af-ci-ico">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.9}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 6-10 7L2 6" />
                </svg>
              </div>
              <div className="af-ci-body">
                <a className="af-mail" href="mailto:hello@nexsolia.com">
                  hello@nexsolia.com
                </a>
              </div>
            </div>

            {/* ADDRESS */}
            <div className="af-ci">
              <div className="af-ci-ico">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.9}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="af-ci-body">
                <address>
                  <a
                    className="af-addr"
                    href="https://maps.google.com/?q=Dhaka,Bangladesh"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t.addressLine1}
                    <br />
                    {t.addressLine2}
                  </a>
                </address>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="af-bar">
        <div className="af-copy" translate="no">
          © <span id="af-year">2026</span>{" "}
          <b>NEXSOLIA — Nexus Solution for Intelligent Automation</b> —{" "}
          {lang === "bn" ? "সর্বস্বত্ব সংরক্ষিত" : "All rights reserved"}
        </div>

        {/* PAYMENT */}
        <div className="af-pay">
          <span className="af-pay-lbl">
            <span className="af-pay-ico">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.9}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 8H5a2 2 0 0 1 0-4h13v4" />
                <path d="M3 6v12a2 2 0 0 0 2 2h15V8H5" />
                <circle
                  cx="16.5"
                  cy="14"
                  r="1.2"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </span>
            {t.payLabel}
          </span>

          <span className="af-badges">
            <span className="af-badge">bKash</span>
            <span className="af-badge">Nagad</span>
            <span className="af-badge is-visa">VISA</span>
            <span className="af-badge is-mc" aria-label="Mastercard">
              <span className="af-mc">
                <i />
                <i />
              </span>
            </span>
            <span className="af-badge">Bank / EMI</span>
          </span>
        </div>

        {/* STATUS */}
        <div className={`af-status ${isOpenNow ? "is-open" : "is-closed"}`}>
          <span className="af-dot" id="af-dot" />
          <span id="af-state">{isOpenNow ? t.openNow : t.closedNow}</span>
        </div>

        {/* HOURS */}
        <div className="af-hours">
          <span className="af-hours-ico">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.9}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3.5 2" />
            </svg>
          </span>
          <span className="af-hours-txt">
            <strong>{t.hoursTitle}</strong>
            <span>{t.hoursVal}</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
