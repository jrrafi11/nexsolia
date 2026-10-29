"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

interface ProjectSlide {
  num: string;
  title: string;
  loc: string;
  img: string;
  href: string;
}

const PROJECTS_I18N: Record<
  "en" | "bn",
  {
    h2: string;
    sub: string;
    note: string;
    viewDetails: string;
    allProjects: string;
    projectWord: string;
    ofWord: string;
    slides: ProjectSlide[];
  }
> = {
  en: {
    h2: "Custom Solutions Delivered Across Bangladesh",
    sub: "Smart Home, Smart Office, BMS & Custom IoT deployments in Dhaka & beyond.",
    note: "A selection of our custom-engineered Smart Homes, Smart Corporate Offices, Building Management Systems (BMS), and Industrial IoT deployments across Gulshan, Banani, Baridhara, Tejgaon, Dhanmondi & Gazipur.",
    viewDetails: "View Details",
    allProjects: "All Projects",
    projectWord: "Project",
    ofWord: "of",
    slides: [
      {
        num: "01",
        title: "Gulshan-2 Custom Smart Duplex",
        loc: "Gulshan-2, Dhaka, Bangladesh",
        img: "/media/aura/proj-1.webp",
        href: "/projects",
      },
      {
        num: "02",
        title: "Banani Smart Office & PDLC Suite",
        loc: "Banani, Dhaka, Bangladesh",
        img: "/media/aura/proj-2.webp",
        href: "/projects",
      },
      {
        num: "03",
        title: "Tejgaon Commercial Tower BMS & VRF",
        loc: "Tejgaon Commercial Area, Dhaka",
        img: "/media/aura/proj-3.webp",
        href: "/projects",
      },
      {
        num: "04",
        title: "Dhanmondi 3BHK Retrofit Smart Home",
        loc: "Dhanmondi, Dhaka, Bangladesh",
        img: "/media/aura/proj-1.webp",
        href: "/projects",
      },
      {
        num: "05",
        title: "Baridhara Executive Boardroom & Access",
        loc: "Baridhara DOHS, Dhaka, Bangladesh",
        img: "/media/aura/proj-2.webp",
        href: "/projects",
      },
      {
        num: "06",
        title: "Gazipur Industrial IoT & Power Telemetry",
        loc: "Gazipur Industrial Zone, Bangladesh",
        img: "/media/aura/proj-3.webp",
        href: "/projects",
      },
    ],
  },
  bn: {
    h2: "বাংলাদেশে আমাদের বাস্তবায়িত কাস্টম সলিউশনসমূহ",
    sub: "স্মার্ট হোম, স্মার্ট অফিস, BMS ও কাস্টম অটোমেশন প্রজেক্ট।",
    note: "গুলশান, বনানী, বারিধারা, তেজগাঁও, ধানমন্ডি ও গাজীপুরে আমাদের সম্পন্ন স্মার্ট হোম, স্মার্ট কর্পোরেট অফিস, বিল্ডিং ম্যানেজমেন্ট সিস্টেম (BMS) এবং কাস্টম IoT প্রজেক্টের নির্বাচিত অংশ।",
    viewDetails: "বিস্তারিত দেখুন",
    allProjects: "সব প্রজেক্ট",
    projectWord: "প্রজেক্ট",
    ofWord: "/",
    slides: [
      {
        num: "01",
        title: "গুলশান-২ কাস্টম স্মার্ট ডুপ্লেক্স",
        loc: "গুলশান-২, ঢাকা, বাংলাদেশ",
        img: "/media/aura/proj-1.webp",
        href: "/projects",
      },
      {
        num: "02",
        title: "বনানী স্মার্ট অফিস ও PDLC প্রাইভেসি স্যুইট",
        loc: "বনানী, ঢাকা, বাংলাদেশ",
        img: "/media/aura/proj-2.webp",
        href: "/projects",
      },
      {
        num: "03",
        title: "তেজগাঁও কমার্শিয়াল টাওয়ার BMS ও VRF",
        loc: "তেজগাঁও বাণিজ্যিক এলাকা, ঢাকা",
        img: "/media/aura/proj-3.webp",
        href: "/projects",
      },
      {
        num: "04",
        title: "ধানমন্ডি ৩-বেডরুম রেট্রোফিট স্মার্ট হোম",
        loc: "ধানমন্ডি, ঢাকা, বাংলাদেশ",
        img: "/media/aura/proj-1.webp",
        href: "/projects",
      },
      {
        num: "05",
        title: "বারিধারা এক্সিকিউটিভ বোর্ডরুম ও অ্যাক্সেস",
        loc: "বারিধারা ডিওএইচএস, ঢাকা",
        img: "/media/aura/proj-2.webp",
        href: "/projects",
      },
      {
        num: "06",
        title: "গাজীপুর ইন্ডাস্ট্রিয়াল IoT ও পাওয়ার টেলিম্যাট্রি",
        loc: "গাজীপুর শিল্পাঞ্চল, বাংলাদেশ",
        img: "/media/aura/proj-3.webp",
        href: "/projects",
      },
    ],
  },
};

export default function ProjectsSection() {
  const { lang } = useLanguage();
  const t = PROJECTS_I18N[lang];
  const PROJECTS = t.slides;

  const [cur, setCur] = useState(0);
  const [paused, setPaused] = useState(false);
  const startXRef = useRef(0);
  const total = PROJECTS.length;

  const go = useCallback(
    (idx: number) => {
      setCur(((idx % total) + total) % total);
    },
    [total]
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      go(cur + 1);
    }, 6000);
    return () => clearInterval(id);
  }, [cur, paused, go]);

  const getDataPos = (i: number) => {
    let d = i - cur;
    if (d > total / 2) d -= total;
    if (d < -total / 2) d += total;
    if (d >= -2 && d <= 2) return String(d);
    return undefined;
  };

  return (
    <section
      className="aura-proj"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <span className="pj-arc a1" />
      <span className="pj-arc a2" />
      <span className="pj-arc a3" />

      <div className="pj-head">
        <div className="pj-title">
          <h2>
            <b>{t.h2}</b>
          </h2>
          <p>{t.sub}</p>
        </div>
        <div className="pj-note">
          <i />
          <p>{t.note}</p>
        </div>
      </div>

      <div
        className="pj-stage"
        onTouchStart={(e) => {
          startXRef.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - startXRef.current;
          if (Math.abs(dx) > 40) {
            if (dx > 0) go(cur - 1);
            else go(cur + 1);
          }
        }}
      >
        <div className="pj-track">
          {PROJECTS.map((proj, i) => {
            const pos = getDataPos(i);
            return (
              <Link
                key={proj.num}
                className="pj-slide"
                data-pos={pos}
                href={proj.href}
                onClick={(e) => {
                  if (i !== cur) {
                    e.preventDefault();
                    go(i);
                  }
                }}
              >
                <img
                  src={proj.img}
                  alt={proj.title}
                  loading="lazy"
                  decoding="async"
                  width={1448}
                  height={1086}
                />
                <span className="pj-no">{proj.num}</span>
                <span className="pj-body">
                  <span>
                    <h3>{proj.title}</h3>
                    <span className="pj-loc">
                      <svg viewBox="0 0 24 24">
                        <path d="M12 21s7-5.7 7-11a7 7 0 10-14 0c0 5.3 7 11 7 11z" />
                        <circle cx="12" cy="10" r="2.5" />
                      </svg>
                      {proj.loc}
                    </span>
                  </span>
                  <span className="pj-cta">
                    {t.viewDetails}{" "}
                    <em>
                      <svg viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </em>
                  </span>
                </span>
              </Link>
            );
          })}
        </div>

        <button
          className="pj-nav pj-prev"
          type="button"
          aria-label="Previous"
          onClick={() => go(cur - 1)}
        >
          <svg viewBox="0 0 24 24">
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>
        <button
          className="pj-nav pj-next"
          type="button"
          aria-label="Next"
          onClick={() => go(cur + 1)}
        >
          <svg viewBox="0 0 24 24">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      <div className="pj-foot">
        <Link className="pj-all" href="/projects">
          {t.allProjects}{" "}
          <svg viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
        <div className="pj-dots">
          {PROJECTS.map((p, i) => (
            <button
              key={p.num}
              type="button"
              aria-label={`Project ${i + 1}`}
              className={i === cur ? "is-on" : ""}
              onClick={() => go(i)}
            />
          ))}
        </div>
        <span className="pj-count">
          {t.projectWord} <b>{String(cur + 1).padStart(2, "0")}</b> {t.ofWord}{" "}
          {String(total).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}
