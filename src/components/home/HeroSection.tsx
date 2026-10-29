"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function HeroSection() {
  const { lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const isMobile = window.matchMedia("(max-width:760px)").matches;
    video.src = isMobile
      ? "/media/aura/hero-mobile.mp4"
      : "/media/aura/hero-desktop.mp4";
    video.load();

    const onCanPlay = () => {
      section.classList.add("video-ready");
      video.play().catch(() => {});
    };

    video.addEventListener("canplay", onCanPlay, { once: true });
    video.play().catch(() => {});

    return () => {
      video.removeEventListener("canplay", onCanPlay);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="aura-hero-only"
      className="video-ready"
      aria-label="Nexsolia Smart Home Bangladesh"
      dir="ltr"
      lang={lang}
    >
      <div className="hero-video" aria-hidden="true">
        <video
          ref={videoRef}
          id="aura-hero-video"
          src="/media/aura/hero-desktop.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      </div>

      <div className="hero-overlay" aria-hidden="true" />
      <div className="hero-center-shade" aria-hidden="true" />

      <div className="hero-content">
        <div className="hero-kicker">
          {lang === "en"
            ? "NEXSOLIA — CUSTOM SMART HOME, SMART OFFICE, BMS & IOT SOLUTIONS"
            : "নেক্সসোলিয়া — কাস্টম স্মার্ট হোম, স্মার্ট অফিস, BMS ও অটোমেশন সলিউশন"}
        </div>

        <h1>
          {lang === "en"
            ? "Custom Smart Solutions"
            : "আপনার চাহিদা অনুযায়ী"}
          <span>
            {lang === "en"
              ? "Designed Around Your Needs"
              : "কাস্টম স্মার্ট অটোমেশন সলিউশন"}
          </span>
        </h1>

        <p className="hero-description">
          {lang === "en"
            ? "We are a solution-based engineering company designing tailored Smart Home, Smart Office, Building Management Systems (BMS), VRF/HVAC control, PDLC privacy glass, and custom IoT automation as per your exact project needs across Bangladesh."
            : "আমরা একটি সলিউশন-ভিত্তিক অটোমেশন কোম্পানি—আপনার প্রয়োজন অনুযায়ী স্মার্ট হোম সলিউশন, স্মার্ট অফিস অটোমেশন, বিল্ডিং ম্যানেজমেন্ট সিস্টেম (BMS), VRF এসি কন্ট্রোল ও কাস্টম স্মার্ট সলিউশন ডিজাইন এবং বাস্তবায়ন করি।"}
        </p>

        <Link className="hero-cta" href="/contact">
          <span>
            {lang === "en"
              ? "Design Your Custom Solution"
              : "আপনার কাস্টম সলিউশন ডিজাইন করুন"}
          </span>
          <span className="arrow" aria-hidden="true">
            &rarr;
          </span>
        </Link>
      </div>
    </section>
  );
}
