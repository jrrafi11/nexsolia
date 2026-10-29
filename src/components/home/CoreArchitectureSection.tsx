"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

type HubKey = "light" | "curtain" | "security" | "ac" | "audio" | "hub";

export default function CoreArchitectureSection() {
  const { lang } = useLanguage();
  const [activeKey, setActiveKey] = useState<HubKey | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playClick = useCallback(() => {
    try {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AC) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AC();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") ctx.resume();

      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1750, t);
      osc.frequency.exponentialRampToValueAtTime(340, t + 0.024);
      g.gain.setValueAtTime(0.11, t);
      g.gain.exponentialRampToValueAtTime(0.0008, t + 0.026);
      osc.connect(g);
      g.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.028);
    } catch {
      // ignore audio errors
    }
  }, []);

  return (
    <section className="aura-sec" dir="ltr" lang={lang}>
      <div className="aura-head">
        <div className="aura-eyebrow">
          <span>
            {lang === "en"
              ? "Custom Solution Architecture"
              : "কাস্টম সলিউশন আর্কিটেকচার"}
          </span>
        </div>
        <h2>
          {lang === "en" ? (
            <>
              One Unified Platform for <b>Homes, Offices &amp; BMS</b>
            </>
          ) : (
            <>
              একটিমাত্র প্ল্যাটফর্মে{" "}
              <b>স্মার্ট হোম, স্মার্ট অফিস ও BMS কন্ট্রোল</b>
            </>
          )}
        </h2>
        <p>
          {lang === "en"
            ? "Custom-engineered automation designed around your requirements — connecting lighting, HVAC/VRF, shading, access control, BMS & custom IoT on one local system"
            : "আপনার চাহিদা অনুযায়ী কাস্টম ডিজাইনকৃত অটোমেশন — লাইটিং, VRF এসি, পর্দা, অ্যাক্সেস কন্ট্রোল, BMS ও কাস্টম IoT একীভূত করুন একটিমাত্র সিস্টেমে"}
        </p>
      </div>

      <div className="aura-grid">
        {/* LEFT COLUMN */}
        <div className="aura-col aura-left">
          <Link
            href="/product-category/lighting-power-automation"
            className={`aura-card ${activeKey === "light" ? "is-on" : ""}`}
            data-key="light"
            onMouseEnter={() => setActiveKey("light")}
            onMouseLeave={() => setActiveKey(null)}
            onClick={() => playClick()}
          >
            <span className="aura-ico">
              <svg viewBox="0 0 24 24">
                <path d="M9 18h6M10 21h4" />
                <path d="M12 3a6 6 0 00-3.5 10.9c.5.4.8 1 .8 1.6v.5h5.4v-.5c0-.6.3-1.2.8-1.6A6 6 0 0012 3z" />
              </svg>
            </span>
            <span className="aura-txt">
              <h3>
                {lang === "en"
                  ? "Touch Switches & Lighting"
                  : "টাচ সুইচ ও প্রোফাইল লাইটিং"}
              </h3>
              <p>
                {lang === "en"
                  ? "Fits BD 3x3 & 3x6 wall boxes (from ৳3,500) + Dubai-style profile lights"
                  : "দেয়াল না কেটে ৩x৩ ও ৩x৬ বোর্ডে সেটআপ (৳৩,৫০০ থেকে) ও প্রোফাইল লাইটিং"}
              </p>
            </span>
          </Link>

          <Link
            href="/product-category/smart-curtain"
            className={`aura-card ${activeKey === "curtain" ? "is-on" : ""}`}
            data-key="curtain"
            onMouseEnter={() => setActiveKey("curtain")}
            onMouseLeave={() => setActiveKey(null)}
            onClick={() => playClick()}
          >
            <span className="aura-ico">
              <svg viewBox="0 0 24 24">
                <path d="M3 4h18M6 4c0 6 2 10 2 16M18 4c0 6-2 10-2 16M10 4c0 5 .6 9 .6 14M14 4c0 5-.6 9-.6 14" />
              </svg>
            </span>
            <span className="aura-txt">
              <h3>
                {lang === "en"
                  ? "Smart Roller & Slider Curtains"
                  : "স্মার্ট রোলার ও স্লাইডার পর্দা"}
              </h3>
              <p>
                {lang === "en"
                  ? "Whisper-quiet <32 dB motors (from ৳12,500) that work on IPS power"
                  : "নিঃশব্দে (<৩২ ডিবি) স্বয়ংক্রিয়ভাবে পর্দা খোলে ও বন্ধ হয় (৳১২,৫০০ থেকে)"}
              </p>
            </span>
          </Link>

          <Link
            href="/product-category/security-monitoring"
            className={`aura-card ${activeKey === "security" ? "is-on" : ""}`}
            data-key="security"
            onMouseEnter={() => setActiveKey("security")}
            onMouseLeave={() => setActiveKey(null)}
            onClick={() => playClick()}
          >
            <span className="aura-ico">
              <svg viewBox="0 0 24 24">
                <rect x="4" y="10" width="16" height="11" rx="2" />
                <path d="M8 10V7a4 4 0 018 0v3M12 14.5v2.5" />
              </svg>
            </span>
            <span className="aura-txt">
              <h3>
                {lang === "en"
                  ? "3D Face Locks & Gas Guard"
                  : "৩ডি ফেস লক ও তিতাস গ্যাস সেফটি"}
              </h3>
              <p>
                {lang === "en"
                  ? "Biometric locks (from ৳15,000), Titas/LPG auto shutoff & AI cameras"
                  : "বায়োমেট্রিক ডোর লক (৳১৫,০০০ থেকে), অটো গ্যাস ভালভ ও সিকিউরিটি ক্যামেরা"}
              </p>
            </span>
          </Link>
        </div>

        {/* CENTER DISC */}
        <div className="aura-core">
          <div className="aura-disc">
            <div className="aura-ring" />

            <svg
              className="aura-segs"
              viewBox="0 0 200 200"
              aria-hidden="true"
              focusable="false"
            >
              <defs>
                <radialGradient id="auraSegOff" cx="50%" cy="50%" r="50%">
                  <stop offset="52%" stopColor="#ffffff" stopOpacity={0.012} />
                  <stop offset="88%" stopColor="#ffffff" stopOpacity={0.045} />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity={0.085} />
                </radialGradient>
                <radialGradient id="auraSegOn" cx="50%" cy="50%" r="50%">
                  <stop offset="52%" stopColor="#0067E0" stopOpacity={0.05} />
                  <stop offset="86%" stopColor="#0067E0" stopOpacity={0.16} />
                  <stop offset="100%" stopColor="#02A5F2" stopOpacity={0.28} />
                </radialGradient>
              </defs>
              <path
                className={activeKey === "ac" ? "is-on" : ""}
                data-key="ac"
                onMouseEnter={() => setActiveKey("ac")}
                onMouseLeave={() => setActiveKey(null)}
                onClick={() => {
                  setActiveKey("ac");
                  playClick();
                }}
                d="M102.51 4.03 A96.0 96.0 0 0 1 181.85 49.84 L144.34 72.83 A52.0 52.0 0 0 0 101.36 48.02 Z"
              />
              <path
                className={activeKey === "audio" ? "is-on" : ""}
                data-key="audio"
                onMouseEnter={() => setActiveKey("audio")}
                onMouseLeave={() => setActiveKey(null)}
                onClick={() => {
                  setActiveKey("audio");
                  playClick();
                }}
                d="M184.37 54.19 A96.0 96.0 0 0 1 184.37 145.81 L145.70 124.81 A52.0 52.0 0 0 0 145.70 75.19 Z"
              />
              <path
                className={activeKey === "hub" ? "is-on" : ""}
                data-key="hub"
                onMouseEnter={() => setActiveKey("hub")}
                onMouseLeave={() => setActiveKey(null)}
                onClick={() => {
                  setActiveKey("hub");
                  playClick();
                }}
                d="M181.85 150.16 A96.0 96.0 0 0 1 102.51 195.97 L101.36 151.98 A52.0 52.0 0 0 0 144.34 127.17 Z"
              />
              <path
                className={activeKey === "security" ? "is-on" : ""}
                data-key="security"
                onMouseEnter={() => setActiveKey("security")}
                onMouseLeave={() => setActiveKey(null)}
                onClick={() => {
                  setActiveKey("security");
                  playClick();
                }}
                d="M97.49 195.97 A96.0 96.0 0 0 1 18.15 150.16 L55.66 127.17 A52.0 52.0 0 0 0 98.64 151.98 Z"
              />
              <path
                className={activeKey === "curtain" ? "is-on" : ""}
                data-key="curtain"
                onMouseEnter={() => setActiveKey("curtain")}
                onMouseLeave={() => setActiveKey(null)}
                onClick={() => {
                  setActiveKey("curtain");
                  playClick();
                }}
                d="M15.63 145.81 A96.0 96.0 0 0 1 15.63 54.19 L54.30 75.19 A52.0 52.0 0 0 0 54.30 124.81 Z"
              />
              <path
                className={activeKey === "light" ? "is-on" : ""}
                data-key="light"
                onMouseEnter={() => setActiveKey("light")}
                onMouseLeave={() => setActiveKey(null)}
                onClick={() => {
                  setActiveKey("light");
                  playClick();
                }}
                d="M18.15 49.84 A96.0 96.0 0 0 1 97.49 4.03 L98.64 48.02 A52.0 52.0 0 0 0 55.66 72.83 Z"
              />
            </svg>

            <div
              className={`aura-node lt ${activeKey === "light" ? "is-on" : ""}`}
              data-key="light"
            >
              <span className="aura-nico">
                <svg viewBox="0 0 24 24">
                  <path d="M9 18h6M10 21h4" />
                  <path d="M12 3a6 6 0 00-3.5 10.9c.5.4.8 1 .8 1.6v.5h5.4v-.5c0-.6.3-1.2.8-1.6A6 6 0 0012 3z" />
                </svg>
              </span>
            </div>

            <div
              className={`aura-node rb ${activeKey === "hub" ? "is-on" : ""}`}
              data-key="hub"
            >
              <span className="aura-nico">
                <svg viewBox="0 0 24 24">
                  <path d="M3 11l9-7 9 7v9a1 1 0 01-1 1H4a1 1 0 01-1-1z" />
                  <path d="M9 16a4 4 0 016 0" />
                </svg>
              </span>
            </div>

            <div
              className={`aura-node rm ${activeKey === "audio" ? "is-on" : ""}`}
              data-key="audio"
            >
              <span className="aura-nico">
                <svg viewBox="0 0 24 24">
                  <path d="M9 18V6l10-2v12" />
                  <circle cx="6.5" cy="18" r="2.5" />
                  <circle cx="16.5" cy="16" r="2.5" />
                </svg>
              </span>
            </div>

            <div
              className={`aura-node rt ${activeKey === "ac" ? "is-on" : ""}`}
              data-key="ac"
            >
              <span className="aura-nico">
                <svg viewBox="0 0 24 24">
                  <rect x="2" y="5" width="20" height="8" rx="2" />
                  <path d="M6 17v2M10 17v2M14 17v2M18 17v2M5 9h14" />
                </svg>
              </span>
            </div>

            <div
              className={`aura-node lm ${
                activeKey === "curtain" ? "is-on" : ""
              }`}
              data-key="curtain"
            >
              <span className="aura-nico">
                <svg viewBox="0 0 24 24">
                  <path d="M3 4h18M6 4c0 6 2 10 2 16M18 4c0 6-2 10-2 16M10 4c0 5 .6 9 .6 14M14 4c0 5-.6 9-.6 14" />
                </svg>
              </span>
            </div>

            <div
              className={`aura-node lb ${
                activeKey === "security" ? "is-on" : ""
              }`}
              data-key="security"
            >
              <span className="aura-nico">
                <svg viewBox="0 0 24 24">
                  <rect x="4" y="10" width="16" height="11" rx="2" />
                  <path d="M8 10V7a4 4 0 018 0v3" />
                </svg>
              </span>
            </div>

            <div className="aura-inner">
              <span className="aura-mark" />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="aura-col aura-right">
          <Link
            href="/product-category/knx-systems"
            className={`aura-card ${activeKey === "ac" ? "is-on" : ""}`}
            data-key="ac"
            onMouseEnter={() => setActiveKey("ac")}
            onMouseLeave={() => setActiveKey(null)}
            onClick={() => playClick()}
          >
            <span className="aura-ico">
              <svg viewBox="0 0 24 24">
                <rect x="2" y="5" width="20" height="8" rx="2" />
                <path d="M6 17v2M10 17v2M14 17v2M18 17v2M5 9h14" />
              </svg>
            </span>
            <span className="aura-txt">
              <h3>
                {lang === "en"
                  ? "BMS, VRF / HVAC & Energy Guard"
                  : "BMS, ভিআরএফ এসি ও এনার্জি গার্ড"}
              </h3>
              <p>
                {lang === "en"
                  ? "Building Management System HVAC control, sub-metering & IPS load protection"
                  : "বিল্ডিং ম্যানেজমেন্ট সিস্টেম (BMS), ৩০% এসি বিল সাশ্রয় ও অটো আইপিএস সুরক্ষা"}
              </p>
            </span>
          </Link>

          <Link
            href="/product-category/audio-systems"
            className={`aura-card ${activeKey === "audio" ? "is-on" : ""}`}
            data-key="audio"
            onMouseEnter={() => setActiveKey("audio")}
            onMouseLeave={() => setActiveKey(null)}
            onClick={() => playClick()}
          >
            <span className="aura-ico">
              <svg viewBox="0 0 24 24">
                <path d="M4 9H8l5-4v14l-5-4H4z" />
                <path d="M16.5 8.5a5 5 0 010 7M19.5 6a8.5 8.5 0 010 12" />
              </svg>
            </span>
            <span className="aura-txt">
              <h3>
                {lang === "en"
                  ? "Smart Office PDLC & AV Systems"
                  : "স্মার্ট অফিস পিডিএলসি গ্লাস ও AV"}
              </h3>
              <p>
                {lang === "en"
                  ? "0.1s clear-to-frosted privacy glass, boardroom AV & multi-zone ceiling audio"
                  : "০.১ সেকেন্ডে স্বচ্ছ থেকে ঘোলা প্রাইভেসি গ্লাস, বোর্ডরুম AV ও মাল্টি-জোন অডিও"}
              </p>
            </span>
          </Link>

          <Link
            href="/product-category/control-voice-systems"
            className={`aura-card ${activeKey === "hub" ? "is-on" : ""}`}
            data-key="hub"
            onMouseEnter={() => setActiveKey("hub")}
            onMouseLeave={() => setActiveKey(null)}
            onClick={() => playClick()}
          >
            <span className="aura-ico">
              <svg viewBox="0 0 24 24">
                <path d="M3 11l9-7 9 7v9a1 1 0 01-1 1H4a1 1 0 01-1-1z" />
                <path d="M9 16a4 4 0 016 0M11.4 13.2a7 7 0 011.2 0" />
              </svg>
            </span>
            <span className="aura-txt">
              <h3>
                {lang === "en"
                  ? "Custom IoT & Central Gateways"
                  : "কাস্টম IoT ও সেন্ট্রাল গেটওয়ে"}
              </h3>
              <p>
                {lang === "en"
                  ? "Tailored Zigbee/KNX/Modbus/LoRaWAN gateways built for any custom use case"
                  : "বাসা, অফিস, বিল্ডিং ও ফ্যাক্টরির প্রয়োজন অনুযায়ী কাস্টম হার্ডওয়্যার ও সফটওয়্যার ইন্টিগ্রেশন"}
              </p>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
