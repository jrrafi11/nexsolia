"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const FINAL_CTA_I18N = {
  en: {
    kicker: "Custom Solution Engineering • Free Site Visit",
    h2a: "Tell Us Your Need —",
    h2b: "We'll Design the Smart Solution",
    desc: "Whether you need a Smart Home, a Smart Corporate Office, a Building Management System (BMS), or a custom industrial automation project, our Dhaka engineering team will inspect your site and design a tailored solution around your requirements.",
    btn: "Request Custom Solution Consultation",
    note: "Tailored to your needs • Smart Home, Office, BMS & Custom IoT • 3-Year Warranty",
  },
  bn: {
    kicker: "কাস্টম সলিউশন ইঞ্জিনিয়ারিং • ফ্রি সাইট ভিজিট",
    h2a: "আপনার চাহিদা বলুন —",
    h2b: "আমরা ডিজাইন করব সেরা স্মার্ট সলিউশন",
    desc: "আপনার প্রয়োজন স্মার্ট হোম, স্মার্ট অফিস, বিল্ডিং ম্যানেজমেন্ট সিস্টেম (BMS) কিংবা কাস্টম ইন্ডাস্ট্রিয়াল প্রজেক্ট যাই হোক—আমাদের ইঞ্জিনিয়ারিং টিম আপনার সাইট পরিদর্শন করে চাহিদা ও বাজেট অনুযায়ী কাস্টম সলিউশন ডিজাইন করে দেবে।",
    btn: "কাস্টম সলিউশন কনসালটেশন বুক করুন",
    note: "চাহিদা অনুযায়ী কাস্টম ডিজাইন • স্মার্ট হোম, অফিস, BMS ও IoT • ৩ বছরের ওয়ারেন্টি",
  },
};

export default function FinalCtaSection() {
  const { lang } = useLanguage();
  const t = FINAL_CTA_I18N[lang];

  return (
    <section
      id="aura-final-cta"
      className="is-visible"
      aria-label="Book a free consultation with Nexsolia"
    >
      <div className="cta-wrap">
        <div className="cta-inner">
          <div className="cta-content">
            <div className="cta-kicker">{t.kicker}</div>

            <h2>
              {t.h2a} <span>{t.h2b}</span>
            </h2>

            <p className="cta-description">{t.desc}</p>
          </div>

          <div className="cta-form-box">
            <Link className="cta-submit" href="/contact">
              <span className="button-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M20.52 3.48A11.87 11.87 0 0 0 12.04 0C5.5 0 .2 5.3.2 11.84c0 2.09.55 4.13 1.6 5.93L0 24l6.4-1.68a11.86 11.86 0 0 0 5.64 1.44h.01c6.54 0 11.85-5.3 11.85-11.84 0-3.16-1.23-6.14-3.38-8.44ZM12.05 21.3h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.58.94.96-3.5-.22-.36a9.4 9.4 0 0 1-1.45-5.03c0-5.2 4.24-9.44 9.45-9.44a9.36 9.36 0 0 1 6.68 2.77 9.36 9.36 0 0 1 2.76 6.68c0 5.2-4.24 9.45-9.45 9.45Zm5.18-7.08c-.28-.14-1.67-.82-1.93-.92-.26-.1-.45-.14-.64.14-.19.28-.74.92-.9 1.11-.17.19-.33.21-.61.07-.28-.14-1.19-.44-2.26-1.4-.84-.75-1.4-1.67-1.57-1.95-.16-.28-.02-.43.12-.57.13-.13.28-.33.42-.5.14-.16.19-.28.28-.47.09-.19.05-.35-.02-.5-.07-.14-.64-1.54-.87-2.1-.23-.56-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.35-.26.28-1 1-1 2.42 0 1.42 1.03 2.8 1.17 2.99.14.19 2.03 3.1 4.92 4.34.69.3 1.22.48 1.64.61.69.22 1.32.19 1.81.11.55-.08 1.67-.68 1.91-1.34.24-.66.24-1.22.17-1.34-.07-.12-.26-.19-.54-.33Z" />
                </svg>
              </span>

              <span className="button-text">{t.btn}</span>
            </Link>

            <p className="form-note">
              <svg viewBox="0 0 24 24">
                <path d="M12 3 5 6v5c0 4.6 2.9 8 7 10 4.1-2 7-5.4 7-10V6l-7-3Z" />
                <path d="m9.5 12 1.7 1.7 3.5-3.7" />
              </svg>
              {t.note}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
