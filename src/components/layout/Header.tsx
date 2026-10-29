"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

interface MegaCategory {
  title: { en: string; bn: string };
  count: number;
  href: string;
  sublabel: { en: string; bn: string };
  icon: React.ReactNode;
  subcategories: { name: { en: string; bn: string }; href: string }[];
}

const MEGA_CATEGORIES: MegaCategory[] = [
  {
    title: {
      en: "Smart Locks & Access Control",
      bn: "স্মার্ট ডোর লক ও অ্যাক্সেস কন্ট্রোল",
    },
    count: 8,
    href: "/product-category/smart-locks",
    sublabel: {
      en: "8 categories • From ৳15,000",
      bn: "৮টি ক্যাটাগরি • ৳১৫,০০০ থেকে শুরু",
    },
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="12" cy="16" r="1" />
        <rect x="3" y="10" width="18" height="12" rx="2" />
        <path d="M7 10V7a5 5 0 0 1 10 0v3" />
      </svg>
    ),
    subcategories: [
      {
        name: {
          en: "Main Door Locks",
          bn: "মেইন ডোর লক",
        },
        href: "/product-category/main-door-locks",
      },
      {
        name: {
          en: "Interior Door Locks",
          bn: "ইনটেরিয়র রুম লক",
        },
        href: "/product-category/interior-room-locks",
      },
      {
        name: {
          en: "Glass Door Locks",
          bn: "গ্লাস ডোর লক",
        },
        href: "/product-category/glass-door-locks",
      },
      {
        name: {
          en: "Outdoor Gate Locks",
          bn: "আউটডোর গেট লক",
        },
        href: "/product-category/smart-lock-for-metal",
      },
      {
        name: {
          en: "Aluminum Door Locks",
          bn: "অ্যালুমিনিয়াম ডোর লক",
        },
        href: "/product-category/aluminum-door-locks",
      },
      {
        name: {
          en: "Smart Hotel Systems",
          bn: "স্মার্ট হোটেল সিস্টেম",
        },
        href: "/product-category/smart-lock-for-hotel",
      },
      {
        name: {
          en: "Intercom & Access Control",
          bn: "ইন্টারকম ও অ্যাক্সেস কন্ট্রোল",
        },
        href: "/product-category/access-control",
      },
      {
        name: {
          en: "Lock Accessories & Spare Parts",
          bn: "লক এক্সেসরিজ ও স্পেয়ার পার্টস",
        },
        href: "/product-category/lock-accessories-spare-parts",
      },
    ],
  },
  {
    title: {
      en: "Lighting & Power Systems",
      bn: "টাচ সুইচ ও প্রোফাইল লাইটিং",
    },
    count: 7,
    href: "/product-category/lighting-power-automation",
    sublabel: {
      en: "7 categories • From ৳3,500",
      bn: "৭টি ক্যাটাগরি • ৳৩,৫০০ থেকে শুরু",
    },
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
        <path d="M9 18h6" />
        <path d="M10 22h4" />
      </svg>
    ),
    subcategories: [
      {
        name: {
          en: "Smart Light Switches",
          bn: "স্মার্ট লাইট সুইচ",
        },
        href: "/product-category/smart-switches",
      },
      {
        name: {
          en: "Smart Lighting",
          bn: "স্মার্ট লাইটিং",
        },
        href: "/product-category/smart-lighting",
      },
      {
        name: {
          en: "Dimmers",
          bn: "স্মার্ট ডিমার",
        },
        href: "/product-category/smart-dimmer",
      },
      {
        name: {
          en: "Control Modules",
          bn: "হিডেন কন্ট্রোল ইউনিট (মিনি মডিউল)",
        },
        href: "/product-category/hidden-control-units-mini-module",
      },
      {
        name: {
          en: "Smart Plugs",
          bn: "স্মার্ট সকেট ও প্লাগ",
        },
        href: "/product-category/smart-socket",
      },
      {
        name: {
          en: "High Load Switches",
          bn: "হাই লোড ও গিজার সুইচ",
        },
        href: "/product-category/water-heater-high-load-switches",
      },
      {
        name: {
          en: "Lighting & Power Accessories",
          bn: "লাইটিং ও পাওয়ার এক্সেসরিজ",
        },
        href: "/product-category/lighting-power-accessories",
      },
    ],
  },
  {
    title: {
      en: "Security & Surveillance",
      bn: "গ্যাস সেফটি, সেন্সর ও সিকিউরিটি ক্যামেরা",
    },
    count: 7,
    href: "/product-category/security-monitoring",
    sublabel: {
      en: "7 categories • From ৳2,750",
      bn: "৭টি ক্যাটাগরি • ৳২,৭৫০ থেকে শুরু",
    },
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M16.75 12h3.632a1 1 0 0 1 .894 1.447l-2.034 4.069a1 1 0 0 1-1.708.134l-2.124-2.97" />
        <path d="M17.106 9.053a1 1 0 0 1 .447 1.341l-3.106 6.211a1 1 0 0 1-1.342.447L3.61 12.3a2.92 2.92 0 0 1-1.3-3.91L3.69 5.6a2.92 2.92 0 0 1 3.92-1.3z" />
        <path d="M2 19h3.76a2 2 0 0 0 1.8-1.1L9 15" />
        <path d="M2 21v-4" />
        <path d="M7 9h.01" />
      </svg>
    ),
    subcategories: [
      {
        name: {
          en: "Indoor Cameras",
          bn: "ইনডোর ক্যামেরা",
        },
        href: "/product-category/indoor-cameras",
      },
      {
        name: {
          en: "Outdoor Cameras",
          bn: "আউটডোর ক্যামেরা",
        },
        href: "/product-category/outdoor-cameras",
      },
      {
        name: {
          en: "Sensors",
          bn: "স্মার্ট সেন্সর",
        },
        href: "/product-category/smart-sensors",
      },
      {
        name: {
          en: "Alarm Systems",
          bn: "স্মার্ট অ্যালার্ম সিস্টেম",
        },
        href: "/product-category/smart-alarm-systems",
      },
      {
        name: {
          en: "Smart Doorbell",
          bn: "ভিডিও ডোরবেল ও ইন্টারকম",
        },
        href: "/product-category/video-doorbell-intercom",
      },
      {
        name: {
          en: "Recorders & Storage",
          bn: "রেকর্ডার্স ও স্টোরেজ",
        },
        href: "/product-category/recording-systems",
      },
      {
        name: {
          en: "Security & CCTV Accessories",
          bn: "সিসিটিভি ও সিকিউরিটি এক্সেসরিজ",
        },
        href: "/product-category/camera-accessories",
      },
    ],
  },
  {
    title: {
      en: "Smart Curtain & Shutter Systems",
      bn: "স্মার্ট রোলার ও স্লাইডার কার্টেন",
    },
    count: 4,
    href: "/product-category/smart-curtain",
    sublabel: {
      en: "4 categories • From ৳12,500",
      bn: "৪টি ক্যাটাগরি • ৳১২,৫০০ থেকে শুরু",
    },
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M3 3h18" />
        <path d="M20 7H8" />
        <path d="M20 11H8" />
        <path d="M10 19h10" />
        <path d="M8 15h12" />
        <path d="M4 3v14" />
        <circle cx="4" cy="19" r="2" />
      </svg>
    ),
    subcategories: [
      {
        name: {
          en: "Curtain Motors",
          bn: "কার্টেন মোটর",
        },
        href: "/product-category/curtain-motors",
      },
      {
        name: {
          en: "Roller Blind Motors",
          bn: "রোলার ব্লাইন্ড মোটর",
        },
        href: "/product-category/roller-blind-motors",
      },
      {
        name: {
          en: "Curtain & Shutter Controls",
          bn: "কার্টেন ও শাটার কন্ট্রোলার",
        },
        href: "/product-category/curtain-shutter-controllers",
      },
      {
        name: {
          en: "Curtain & Shutter Accessories",
          bn: "কার্টেন ও শাটার এক্সেসরিজ",
        },
        href: "/product-category/curtain-shutter-accessories",
      },
    ],
  },
  {
    title: {
      en: "Control & Voice Assistants",
      bn: "লোকাল হাব, কন্ট্রোল প্যানেল ও ভয়েস",
    },
    count: 6,
    href: "/product-category/control-voice-systems",
    sublabel: {
      en: "6 categories • Works 100% Offline",
      bn: "৬টি ক্যাটাগরি • ইন্টারনেট ছাড়াই সচল",
    },
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 19v3" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <rect x="9" y="2" width="6" height="13" rx="3" />
      </svg>
    ),
    subcategories: [
      {
        name: {
          en: "Hub & Gateway",
          bn: "গেটওয়ে ও সেন্ট্রাল হাব",
        },
        href: "/product-category/gateways",
      },
      {
        name: {
          en: "Central Control Panels",
          bn: "সেন্ট্রাল কন্ট্রোল প্যানেল",
        },
        href: "/product-category/central-control-panels",
      },
      {
        name: {
          en: "Voice Assistants",
          bn: "ভয়েস অ্যাসিস্ট্যান্ট ইন্টিগ্রেশন",
        },
        href: "/product-category/voice-assistants-integration",
      },
      {
        name: {
          en: "IR & RF Control",
          bn: "আইআর ও আরএফ রিমোট কন্ট্রোল",
        },
        href: "/product-category/remote-controls",
      },
      {
        name: {
          en: "Control & Voice Accessories",
          bn: "কন্ট্রোল ও ভয়েস এক্সেসরিজ",
        },
        href: "/product-category/remotes-controllers",
      },
      {
        name: {
          en: "Miscellaneous Smart Devices",
          bn: "অন্যান্য স্মার্ট ডিভাইস",
        },
        href: "/product-category/misc-smart-devices",
      },
    ],
  },
  {
    title: {
      en: "Network Systems",
      bn: "নেটওয়ার্ক ও পিডিএলসি সিস্টেম",
    },
    count: 5,
    href: "/product-category/wifi-network-solutions",
    sublabel: {
      en: "5 categories • Fast & Enterprise",
      bn: "৫টি ক্যাটাগরি • এন্টারপ্রাইজ নেটওয়ার্কিং",
    },
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 20h.01" />
        <path d="M2 8.82a15 15 0 0 1 20 0" />
        <path d="M5 12.859a10 10 0 0 1 14 0" />
        <path d="M8.5 16.429a5 5 0 0 1 7 0" />
      </svg>
    ),
    subcategories: [
      {
        name: {
          en: "Access Points",
          bn: "অ্যাক্সেস পয়েন্ট",
        },
        href: "/product-category/access-points",
      },
      {
        name: {
          en: "Network Switches",
          bn: "নেটওয়ার্ক সুইচ",
        },
        href: "/product-category/network-switches",
      },
      {
        name: {
          en: "Racks & Cables",
          bn: "রাক ও ক্যাবলিং",
        },
        href: "/product-category/network-racks-cables",
      },
      {
        name: {
          en: "PBX",
          bn: "পিবিএক্স ও টেলিফোনি",
        },
        href: "/product-category/pbx-telephones",
      },
      {
        name: {
          en: "Network Accessories",
          bn: "নেটওয়ার্ক এক্সেসরিজ",
        },
        href: "/product-category/network-accessories",
      },
    ],
  },
  {
    title: {
      en: "Audio Systems",
      bn: "মাল্টি-রুম অডিও ও হোম সিনেমা",
    },
    count: 3,
    href: "/product-category/audio-systems",
    sublabel: {
      en: "3 categories • Ceiling & Cinema",
      bn: "৩টি ক্যাটাগরি • সিলিং ও হোম থিয়েটার",
    },
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect width="16" height="20" x="4" y="2" rx="2" />
        <path d="M12 6h.01" />
        <circle cx="12" cy="14" r="4" />
        <path d="M12 14h.01" />
      </svg>
    ),
    subcategories: [
      {
        name: {
          en: "Speakers",
          bn: "সিলিং ও ওয়াল স্পিকার",
        },
        href: "/product-category/speakers",
      },
      {
        name: {
          en: "Amplifiers",
          bn: "মাল্টি-জোন অ্যামপ্লিফায়ার",
        },
        href: "/product-category/amplifiers",
      },
      {
        name: {
          en: "Audio System Accessories",
          bn: "অডিও সিস্টেম এক্সেসরিজ",
        },
        href: "/product-category/audio-accessories",
      },
    ],
  },
  {
    title: {
      en: "Automatic Gate Systems",
      bn: "অটোমেটিক গেট ও পানির পাম্প অটোমেশন",
    },
    count: 3,
    href: "/product-category/gate-automation-systems",
    sublabel: {
      en: "3 categories • Villa & Building",
      bn: "৩টি ক্যাটাগরি • ভিলা ও অ্যাপার্টমেন্ট বিল্ডিং",
    },
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M4 3 2 5v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z" />
        <path d="M6 8h4" />
        <path d="M6 18h4" />
        <path d="m12 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z" />
        <path d="M14 8h4" />
        <path d="M14 18h4" />
        <path d="m20 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z" />
      </svg>
    ),
    subcategories: [
      {
        name: {
          en: "Sliding Gate Motors",
          bn: "স্লাইডিং গেট মোটর",
        },
        href: "/product-category/sliding-gate-motors",
      },
      {
        name: {
          en: "Swing Gate Motors",
          bn: "সুইং গেট মোটর",
        },
        href: "/product-category/swing-gate-motors",
      },
      {
        name: {
          en: "Automatic Gate Accessories",
          bn: "গেট অটোমেশন এক্সেসরিজ",
        },
        href: "/product-category/gate-accessories",
      },
    ],
  },
  {
    title: {
      en: "Packages",
      bn: "স্মার্ট হোম, অফিস ও BMS প্যাকেজ",
    },
    count: 3,
    href: "/product-category/smart-home-packages",
    sublabel: {
      en: "3 categories • Complete Bundles",
      bn: "৩টি ক্যাটাগরি • সম্পূর্ণ প্যাকেজ",
    },
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" />
        <path d="M12 22V12" />
        <polyline points="3.29 7 12 12 20.71 7" />
        <path d="m7.5 4.27 9 5.15" />
      </svg>
    ),
    subcategories: [
      {
        name: {
          en: "Ready Smart Home Packages",
          bn: "রেডি স্মার্ট হোম প্যাকেজ",
        },
        href: "/product-category/ready-smart-home-packages",
      },
      {
        name: {
          en: "Integrated Security Package",
          bn: "ইন্টিগ্রেটেড সিকিউরিটি প্যাকেজ",
        },
        href: "/product-category/integrated-security-package",
      },
      {
        name: {
          en: "Customized Packages Upon Request",
          bn: "কাস্টমাইজড প্যাকেজ (অন রিকোয়েস্ট)",
        },
        href: "/product-category/customized-packages-upon-request",
      },
    ],
  },
  {
    title: {
      en: "Wired Smart Home Solutions — KNX",
      bn: "BMS, VRF, KNX ও কাস্টম স্মার্ট সলিউশন",
    },
    count: 9,
    href: "/product-category/knx-systems",
    sublabel: {
      en: "9 categories • Custom Engineered",
      bn: "৯টি ক্যাটাগরি • কাস্টম ইঞ্জিনিয়ারিং",
    },
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 20v2" />
        <path d="M12 2v2" />
        <path d="M17 20v2" />
        <path d="M17 2v2" />
        <path d="M2 12h2" />
        <path d="M2 17h2" />
        <path d="M2 7h2" />
        <path d="M20 12h2" />
        <path d="M20 17h2" />
        <path d="M20 7h2" />
        <path d="M7 20v2" />
        <path d="M7 2v2" />
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="8" y="8" width="8" height="8" rx="1" />
      </svg>
    ),
    subcategories: [
      {
        name: {
          en: "Actuators",
          bn: "অ্যাকচুয়েটর",
        },
        href: "/product-category/knx-actuators",
      },
      {
        name: {
          en: "Dimming Actuators",
          bn: "ডিমিং অ্যাকচুয়েটর",
        },
        href: "/product-category/knx-dimmers",
      },
      {
        name: {
          en: "Shutter & Blind Actuators",
          bn: "শাটার ও ব্লাইন্ড অ্যাকচুয়েটর",
        },
        href: "/product-category/knx-curtain-shutter-actuators",
      },
      {
        name: {
          en: "Switches & Control Panels",
          bn: "সুইচ ও কন্ট্রোল প্যানেল",
        },
        href: "/product-category/knx-touch-panels-push-buttons",
      },
      {
        name: {
          en: "KNX Power Supplies",
          bn: "কেএনএক্স পাওয়ার সাপ্লাই",
        },
        href: "/product-category/knx-system-devices",
      },
      {
        name: {
          en: "Interfaces & Gateways",
          bn: "ইন্টারফেস ও গেটওয়ে",
        },
        href: "/product-category/knx-interfaces-binary-inputs",
      },
      {
        name: {
          en: "KNX Sensors",
          bn: "কেএনএক্স সেন্সর",
        },
        href: "/product-category/knx-sensors",
      },
      {
        name: {
          en: "HVAC Controllers",
          bn: "এইচভিএসি / এসি কন্ট্রোলার",
        },
        href: "/product-category/knx-hvac-control",
      },
      {
        name: {
          en: "KNX Accessories",
          bn: "কেএনএক্স এক্সেসরিজ",
        },
        href: "/product-category/knx-add-ons",
      },
    ],
  },
];

function HeaderInner() {
  const pathname = usePathname();
  const { lang, setLang, toggleLang } = useLanguage();
  const [megaOpen, setMegaOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tabTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setMegaOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setMegaOpen(false);
    }, 220);
  };

  const handleTabHover = (index: number) => {
    if (tabTimeout.current) clearTimeout(tabTimeout.current);
    tabTimeout.current = setTimeout(() => {
      setActiveTab(index);
    }, 70);
  };

  useEffect(() => {
    setMegaOpen(false);
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("aura-float");
    root.classList.remove("aura-prefloat");

    const TOP_ZONE = 90;
    const DELTA = 6;
    let lastY = window.pageYOffset || 0;
    let ticking = false;

    const update = () => {
      const y = window.pageYOffset || document.documentElement.scrollTop || 0;
      if (y <= TOP_ZONE) {
        root.classList.remove("aura-hidehdr");
      } else if (Math.abs(y - lastY) > DELTA) {
        root.classList.toggle("aura-hidehdr", y > lastY);
      }
      lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const isInnerPage = pathname !== "/";

  return (
    <>
      <header
        className={`whb-header whb-header_611776 whb-sticky-shadow whb-scroll-stick whb-sticky-real whb-hide-on-scroll ${
          isInnerPage ? "is-inner-page" : ""
        }`}
      >
        <div className="whb-main-header">
          <div className="whb-row whb-general-header whb-sticky-row whb-without-bg whb-border-fullwidth whb-color-dark whb-flex-flex-middle">
            <div className="container">
              <div className="whb-flex-row whb-general-header-inner">
                {/* LEFT COLUMN — DESKTOP UPLOADED NEXSOLIA LOGO */}
                <div className="whb-column whb-col-left whb-column8 whb-visible-lg">
                  <div
                    className="whb-space-element"
                    style={{ width: "10px" }}
                  />
                  <div className="site-logo">
                    <Link
                      href="/"
                      className="wd-logo wd-main-logo"
                      aria-label="Nexsolia — Nexus Solution for Intelligent Automation"
                    >
                      <Image
                        src="/nexsolia-logo-dark.png"
                        alt="Nexsolia — Nexus Solution for Intelligent Automation"
                        width={158}
                        height={46}
                        priority
                        style={{
                          height: 42,
                          width: "auto",
                          objectFit: "contain",
                          display: "block",
                        }}
                      />
                    </Link>
                  </div>
                </div>

                {/* CENTER COLUMN — DESKTOP NAVIGATION + MEGA MENU */}
                <div className="whb-column whb-col-center whb-column9 whb-visible-lg">
                  <div className="wd-header-text reset-last-child">
                    <div className="aura-header-en" dir="ltr" lang={lang}>
                      <div className="aura-hdr">
                        <div className="aura-hdr-in">
                          <nav className="aura-nav" aria-label="Main menu">
                            <Link href="/" className="aura-nav-link">
                              {lang === "en" ? "Home" : "হোম"}
                            </Link>

                            {/* Solutions / Shop Mega Menu Trigger */}
                            <div
                              className={`aura-nav-item aura-has-mega ${
                                megaOpen ? "mega-open" : ""
                              }`}
                              onMouseEnter={handleMouseEnter}
                              onMouseLeave={handleMouseLeave}
                            >
                              <Link
                                href="/shop"
                                className="aura-nav-link on aura-shop-link"
                              >
                                {lang === "en" ? "Shop" : "শপ"}{" "}
                                <span className="caret">▾</span>
                              </Link>

                              {/* 2-Column 10-Category Dark Glass Mega Menu */}
                              <div className="aura-mega">
                                <div className="aura-mega-inner">
                                  <div className="aura-mega-layout">
                                    <ul className="aura-mega-tabs">
                                      {MEGA_CATEGORIES.map((cat, idx) => (
                                        <li key={cat.title.en}>
                                          <Link
                                            href={cat.href}
                                            className={`aura-mega-tab ${
                                              activeTab === idx
                                                ? "is-active"
                                                : ""
                                            }`}
                                            data-i={idx}
                                            onMouseEnter={() =>
                                              handleTabHover(idx)
                                            }
                                            onFocus={() => setActiveTab(idx)}
                                            onClick={() => setMegaOpen(false)}
                                          >
                                            <span className="aura-mega-icon">
                                              {cat.icon}
                                            </span>
                                            <span className="nm">
                                              {cat.title[lang]}
                                            </span>
                                            <span className="cnt">
                                              {cat.count}
                                            </span>
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>

                                    <div className="aura-mega-panels">
                                      {MEGA_CATEGORIES.map((cat, idx) => (
                                        <section
                                          key={cat.title.en}
                                          className={`aura-mega-panel ${
                                            activeTab === idx ? "is-active" : ""
                                          }`}
                                          data-i={idx}
                                        >
                                          <div className="aura-mega-panel-head">
                                            <div className="aura-mega-icon">
                                              {cat.icon}
                                            </div>
                                            <div className="aura-mega-panel-title">
                                              <h4>{cat.title[lang]}</h4>
                                              <small>
                                                {cat.sublabel[lang]}
                                              </small>
                                            </div>
                                            <Link
                                              href={cat.href}
                                              className="aura-mega-all"
                                              onClick={() => setMegaOpen(false)}
                                            >
                                              {lang === "en"
                                                ? "View all solutions →"
                                                : "সবগুলো দেখুন →"}
                                            </Link>
                                          </div>

                                          <ul className="aura-mega-list">
                                            {cat.subcategories.map((sub) => (
                                              <li key={sub.name.en}>
                                                <Link
                                                  href={sub.href}
                                                  onClick={() =>
                                                    setMegaOpen(false)
                                                  }
                                                >
                                                  {sub.name[lang]}
                                                </Link>
                                              </li>
                                            ))}
                                          </ul>
                                        </section>
                                      ))}

                                      <div className="aura-mega-strip">
                                        <div className="aura-mega-strip-txt">
                                          <strong>
                                            {lang === "en"
                                              ? "✦ Enterprise, VRF & Custom Industrial IoT"
                                              : "✦ এন্টারপ্রাইজ, ভিআরএফ এসি ও ইন্ডাস্ট্রিয়াল আইওটি"}
                                          </strong>
                                          <span>
                                            {lang === "en"
                                              ? "100% retrofit smart homes, PDLC privacy glass, Daikin/Mitsubishi VRF AC control, and custom factory IoT across Bangladesh — 3-Year Replacement Warranty."
                                              : "বাংলাদেশের অ্যাপার্টমেন্ট, কর্পোরেট অফিস ও ফ্যাক্টরির জন্য শতভাগ রেট্রোফিট স্মার্ট অটোমেশন — ৩ বছরের রিপ্লেসমেন্ট ওয়ারেন্টিসহ।"}
                                          </span>
                                        </div>
                                        <Link
                                          href="/contact"
                                          onClick={() => setMegaOpen(false)}
                                        >
                                          {lang === "en"
                                            ? "Book Free Visit →"
                                            : "ফ্রি ভিজিট বুক করুন →"}
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <Link
                              href="/projects"
                              className={`aura-nav-link ${
                                pathname.startsWith("/projects") ? "on" : ""
                              }`}
                            >
                              {lang === "en" ? "Projects" : "প্রজেক্টস"}
                            </Link>

                            <Link
                              href="/about"
                              className={`aura-nav-link ${
                                pathname.startsWith("/about") ? "on" : ""
                              }`}
                            >
                              {lang === "en" ? "About Us" : "আমাদের সম্পর্কে"}
                            </Link>

                            <Link
                              href="/contact"
                              className={`aura-nav-link ${
                                pathname.startsWith("/contact") ? "on" : ""
                              }`}
                            >
                              {lang === "en" ? "Contact Us" : "যোগাযোগ"}
                            </Link>

                            <Link
                              href="/solutions#knx"
                              className="aura-nav-link aura-nav-pro"
                            >
                              {lang === "en"
                                ? "✦ Professional Solutions"
                                : "✦ প্রফেশনাল সলিউশনস"}
                            </Link>
                          </nav>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN — DESKTOP TOOLS (Search, Wishlist, Cart + ৳0.00, Divider, Language Switcher EN/BN) */}
                <div className="whb-column whb-col-right whb-column10 whb-visible-lg">
                  <div
                    className="wd-header-search wd-tools-element"
                    title={lang === "en" ? "Search" : "অনুসন্ধান"}
                  >
                    <Link href="/solutions" aria-label="Search">
                      <span className="wd-tools-icon">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="m21 21-4.34-4.34" />
                          <circle cx="11" cy="11" r="8" />
                        </svg>
                      </span>
                    </Link>
                  </div>

                  <div
                    className="wd-header-wishlist wd-tools-element"
                    title={lang === "en" ? "Saved Solutions" : "পছন্দের তালিকা"}
                  >
                    <Link href="/solutions" aria-label="Wishlist products">
                      <span className="wd-tools-icon">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
                        </svg>
                        <span className="wd-tools-count">0</span>
                      </span>
                    </Link>
                  </div>

                  <div
                    className="wd-header-cart wd-tools-element"
                    title={lang === "en" ? "Quote Builder" : "বাজেট এস্টিমেট"}
                  >
                    <Link href="/contact" aria-label="Quote cart">
                      <span className="wd-tools-icon">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                          <path d="M3 6h18" />
                          <path d="M16 10a4 4 0 0 1-8 0" />
                        </svg>
                        <span className="wd-tools-count">0</span>
                      </span>
                      <span className="wd-tools-text">
                        <span className="wd-cart-subtotal">৳0.00</span>
                      </span>
                    </Link>
                  </div>

                  <div className="wd-header-divider" />

                  {/* LANGUAGE SWITCHER: English ⇄ বাংলা */}
                  <div className="wd-header-nav wd-header-secondary-nav">
                    <button
                      type="button"
                      onClick={toggleLang}
                      className="wpml-ls-link"
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                      aria-label="Switch language between English and Bangla"
                    >
                      {lang === "en" ? (
                        <svg
                          width="18"
                          height="12"
                          viewBox="0 0 60 30"
                          aria-hidden="true"
                          style={{ borderRadius: "2px", display: "block" }}
                        >
                          <clipPath id="ukFlagClip">
                            <path d="M0,0 v30 h60 v-30 z" />
                          </clipPath>
                          <g clipPath="url(#ukFlagClip)">
                            <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
                            <path
                              d="M0,0 L60,30 M60,0 L0,30"
                              stroke="#fff"
                              strokeWidth="6"
                            />
                            <path
                              d="M0,0 L60,30 M60,0 L0,30"
                              stroke="#C8102E"
                              strokeWidth="4"
                            />
                            <path
                              d="M30,0 v30 M0,15 h60"
                              stroke="#fff"
                              strokeWidth="10"
                            />
                            <path
                              d="M30,0 v30 M0,15 h60"
                              stroke="#C8102E"
                              strokeWidth="6"
                            />
                          </g>
                        </svg>
                      ) : (
                        <svg
                          width="18"
                          height="12"
                          viewBox="0 0 20 12"
                          aria-hidden="true"
                          style={{ borderRadius: "2px", display: "block" }}
                        >
                          <rect width="20" height="12" fill="#006a4e" />
                          <circle cx="9" cy="6" r="4" fill="#f42a41" />
                        </svg>
                      )}
                      <span className="nav-link-text">
                        {lang === "en" ? "English" : "বাংলা"}
                      </span>
                      <span style={{ fontSize: "10px", opacity: 0.8 }}>▾</span>
                    </button>

                    <div className="wd-lang-dropdown">
                      <button
                        type="button"
                        onClick={() => setLang("en")}
                        className={`wd-lang-option ${
                          lang === "en" ? "is-active" : ""
                        }`}
                      >
                        <svg
                          width="18"
                          height="12"
                          viewBox="0 0 60 30"
                          aria-hidden="true"
                          style={{ borderRadius: "2px", flexShrink: 0 }}
                        >
                          <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
                          <path
                            d="M0,0 L60,30 M60,0 L0,30"
                            stroke="#fff"
                            strokeWidth="6"
                          />
                          <path
                            d="M0,0 L60,30 M60,0 L0,30"
                            stroke="#C8102E"
                            strokeWidth="4"
                          />
                          <path
                            d="M30,0 v30 M0,15 h60"
                            stroke="#fff"
                            strokeWidth="10"
                          />
                          <path
                            d="M30,0 v30 M0,15 h60"
                            stroke="#C8102E"
                            strokeWidth="6"
                          />
                        </svg>
                        <span>English</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setLang("bn")}
                        className={`wd-lang-option ${
                          lang === "bn" ? "is-active" : ""
                        }`}
                      >
                        <svg
                          width="18"
                          height="12"
                          viewBox="0 0 20 12"
                          aria-hidden="true"
                          style={{ borderRadius: "2px", flexShrink: 0 }}
                        >
                          <rect width="20" height="12" fill="#006a4e" />
                          <circle cx="9" cy="6" r="4" fill="#f42a41" />
                        </svg>
                        <span>বাংলা (Bangla)</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* MOBILE COLUMNS (<= 1024px) */}
                <div className="whb-column whb-mobile-left whb-hidden-lg">
                  <div className="wd-tools-element wd-header-mobile-nav">
                    <button
                      type="button"
                      aria-label="Open mobile menu"
                      onClick={() => setDrawerOpen(true)}
                    >
                      <span className="wd-tools-icon">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M4 5h16" />
                          <path d="M4 12h16" />
                          <path d="M4 19h16" />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>

                <div className="whb-column whb-mobile-center whb-hidden-lg">
                  <div className="site-logo">
                    <Link
                      href="/"
                      className="wd-logo wd-main-logo"
                      aria-label="Nexsolia Home"
                    >
                      <Image
                        src="/nexsolia-logo-dark.png"
                        alt="Nexsolia"
                        width={126}
                        height={36}
                        style={{
                          height: 32,
                          width: "auto",
                          objectFit: "contain",
                          display: "block",
                        }}
                      />
                    </Link>
                  </div>
                </div>

                <div
                  className="whb-column whb-mobile-right whb-hidden-lg"
                  style={{ gap: "6px" }}
                >
                  <button
                    type="button"
                    onClick={toggleLang}
                    style={{
                      padding: "4px 8px",
                      borderRadius: "999px",
                      border: "1px solid rgba(255,255,255,0.22)",
                      background: "rgba(255,255,255,0.08)",
                      color: "#fff",
                      fontSize: "11px",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    {lang === "en" ? "বাংলা" : "EN"}
                  </button>
                  <div className="wd-header-cart wd-tools-element">
                    <Link href="/contact" aria-label="Shopping cart">
                      <span className="wd-tools-icon">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                          <path d="M3 6h18" />
                          <path d="M16 10a4 4 0 0 1-8 0" />
                        </svg>
                        <span className="wd-tools-count">0</span>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER & OVERLAY (Dark Glass Mode) */}
      <div className="aura-header-en" dir="ltr" lang={lang}>
        <div
          className={`aura-overlay ${drawerOpen ? "open" : ""}`}
          hidden={!drawerOpen}
          onClick={() => setDrawerOpen(false)}
        />
        <aside
          className={`aura-drawer ${drawerOpen ? "open" : ""}`}
          aria-label="Mobile menu"
          hidden={!drawerOpen}
        >
          <div className="aura-drawer-top">
            <Image
              src="/nexsolia-logo-dark.png"
              alt="Nexsolia"
              width={132}
              height={38}
              style={{ height: 34, width: "auto", objectFit: "contain" }}
            />
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <button
                type="button"
                onClick={toggleLang}
                style={{
                  padding: "5px 10px",
                  borderRadius: "8px",
                  border: "1px solid rgba(2,165,242,0.45)",
                  background: "rgba(2,165,242,0.16)",
                  color: "#fff",
                  fontSize: "12px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {lang === "en" ? "বাংলা" : "English"}
              </button>
              <button
                className="aura-drawer-close"
                type="button"
                aria-label="Close"
                onClick={() => setDrawerOpen(false)}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          </div>

          <Link href="/" onClick={() => setDrawerOpen(false)}>
            {lang === "en" ? "Home" : "হোম"}
          </Link>
          <Link href="/shop" onClick={() => setDrawerOpen(false)}>
            {lang === "en" ? "Shop" : "শপ"}
          </Link>
          <Link href="/solutions" onClick={() => setDrawerOpen(false)}>
            {lang === "en" ? "Solutions" : "সলিউশনস"}
          </Link>

          <div className="aura-drawer-sec">
            <strong>
              {lang === "en" ? "Smart Categories" : "স্মার্ট ক্যাটাগরি"}
            </strong>
            {MEGA_CATEGORIES.map((cat) => (
              <details key={cat.title.en} className="aura-acc">
                <summary>
                  <span className="aura-mega-icon">{cat.icon}</span>
                  <span className="nm">{cat.title[lang]}</span>
                  <span className="chev">▾</span>
                </summary>
                <div className="aura-acc-body">
                  <Link
                    className="all"
                    href={cat.href}
                    onClick={() => setDrawerOpen(false)}
                  >
                    {lang === "en" ? "All solutions" : "সবগুলো দেখুন"}
                  </Link>
                  {cat.subcategories.map((sub) => (
                    <Link
                      key={sub.name.en}
                      href={sub.href}
                      onClick={() => setDrawerOpen(false)}
                    >
                      {sub.name[lang]}
                    </Link>
                  ))}
                </div>
              </details>
            ))}
          </div>

          <div className="aura-drawer-sec">
            <Link href="/projects" onClick={() => setDrawerOpen(false)}>
              {lang === "en" ? "Projects" : "প্রজেক্টস"}
            </Link>
            <Link href="/about" onClick={() => setDrawerOpen(false)}>
              {lang === "en" ? "About Us" : "আমাদের সম্পর্কে"}
            </Link>
            <Link href="/contact" onClick={() => setDrawerOpen(false)}>
              {lang === "en" ? "Contact Us" : "যোগাযোগ"}
            </Link>
            <Link href="/solutions#knx" onClick={() => setDrawerOpen(false)}>
              {lang === "en"
                ? "✦ Professional Solutions"
                : "✦ প্রফেশনাল সলিউশনস"}
            </Link>
            <Link
              className="aura-drawer-cta"
              href="/contact"
              onClick={() => setDrawerOpen(false)}
            >
              {lang === "en"
                ? "Book Free Consultation"
                : "ফ্রি কনসালটেশন বুক করুন"}
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}

export default function Header() {
  return (
    <Suspense
      fallback={
        <div className="whb-header whb-header_611776 whb-sticky-shadow is-inner-page min-h-[86px] w-full bg-[#071D3A]/90 border-b border-slate-800/80" />
      }
    >
      <HeaderInner />
    </Suspense>
  );
}
