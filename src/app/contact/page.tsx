"use client";

import { useState } from "react";
import FaqSection from "@/components/home/FaqSection";
import { useLanguage } from "@/context/LanguageContext";

const CONTACT_I18N = {
  en: {
    badge: "Free Home / Office Visit in Dhaka",
    h1a: "Let's Design Your",
    h1b: "Smart Home or Enterprise Space",
    desc: "Get in touch with our Dhaka engineering team for a free consultation, floor-plan review, or on-site survey across Gulshan, Banani, Baridhara, Dhanmondi, Uttara, Bashundhara, Chittagong, Sylhet & Gazipur.",
    directKicker: "Direct Bangladesh Channels",
    directTitle: "Talk to a NEXSOLIA Engineer Today",
    directDesc:
      "Message us on WhatsApp or call directly for instant BDT pricing, retrofit compatibility checks, or industrial IoT scoping.",
    waSub: "WhatsApp — Instant Reply (Dhaka Team)",
    telSub: "Direct Hotlines (Bangladesh)",
    emailSub: "Email",
    hqSub: "Service Coverage & Hours",
    hqTitle: "Gulshan • Banani • Baridhara • Dhanmondi • Uttara, Dhaka",
    hqHours: "Sat – Thu: 10:00 AM – 7:00 PM BST · Friday by Appointment",
    receivedTitle: "Consultation Request Received!",
    receivedDesc:
      "Thank you! One of our Dhaka smart automation engineers will contact you shortly via phone or WhatsApp with your customized BDT estimate.",
    receivedBtn: "Submit Another Request",
    formKicker: "Free Site Survey & Transparent BDT Quote",
    formTitle: "Request a Customized Smart Automation Quote",
    nameLbl: "Full Name *",
    namePh: "e.g., Tariqul Islam",
    phoneLbl: "Phone / WhatsApp Number (BD) *",
    phonePh: "e.g., +880 17XX-XXXXXX",
    propTypeLbl: "Property / Project Type",
    propTypes: [
      "Ready Apartment / 3BHK-4BHK Flat",
      "Duplex Villa / Penthouse",
      "Corporate Office / Boardroom (PDLC & VRF)",
      "Residential / Commercial Tower (Developer)",
      "RMG Factory / Cold Storage / Industrial IoT",
    ],
    propStageLbl: "Current Property Stage",
    propStages: [
      "Already Finished / Lived-In (100% Retrofit Wireless)",
      "Interior Design / False Ceiling Stage",
      "Under Construction / Civil Conduit Stage (KNX / Hybrid)",
    ],
    sysLbl: "Systems You Are Interested In",
    systems: [
      "Touch Panel Switches (From ৳3,500)",
      "Smart Roller / Slider Curtains (From ৳12,500)",
      "3D Face ID Smart Door Lock (From ৳15,000)",
      "Switchable PDLC Privacy Film (৳1,290/sq.ft)",
      "Titas/LPG Gas & Motion Sensors (From ৳2,750)",
      "Magnetic Profile & Cove Lighting (From ৳5,000)",
      "VRF / Split AC & IPS Load Guard (From ৳8,500)",
      "Custom Industrial IoT / Cold Storage Telemetry",
    ],
    locLbl: "Area in Dhaka / Bangladesh & Notes",
    locPh:
      "e.g., Gulshan-2 / Dhanmondi / Uttara / Banani, number of rooms or switchboards...",
    submitBtn: "Book My Free Consultation →",
  },
  bn: {
    badge: "ঢাকায় ফ্রি হোম ও অফিস ভিজিট",
    h1a: "চলুন সাজিয়ে তুলি আপনার",
    h1b: "স্মার্ট বাসা বা অফিস প্রজেক্ট",
    desc: "গুলশান, বনানী, বারিধারা, ধানমন্ডি, উত্তরা, বসুন্ধরা, চট্টগ্রাম, সিলেট বা গাজীপুরে আপনার ফ্ল্যাট, ভিলা, অফিস বা ফ্যাক্টরির জন্য ফ্রি সাইট ভিজিট ও পরামর্শ পেতে আমাদের ইঞ্জিনিয়ারদের সাথে যোগাযোগ করুন।",
    directKicker: "সরাসরি যোগাযোগ (বাংলাদেশ)",
    directTitle: "আজই আমাদের ইঞ্জিনিয়ারের সাথে কথা বলুন",
    directDesc:
      "হোয়াটসঅ্যাপে আপনার ফ্লোর প্ল্যান বা রুমের তথ্য পাঠান অথবা সরাসরি কল করে তাৎক্ষণিক বাজেট ও টেকনিক্যাল পরামর্শ নিন।",
    waSub: "হোয়াটসঅ্যাপ — দ্রুত উত্তর (ঢাকা টিম)",
    telSub: "হটলাইন নম্বর (বাংলাদেশ)",
    emailSub: "ইমেইল",
    hqSub: "সার্ভিস এরিয়া ও কর্মঘণ্টা",
    hqTitle: "গুলশান • বনানী • বারিধারা • ধানমন্ডি • উত্তরা, ঢাকা",
    hqHours: "শনি – বৃহস্পতি: সকাল ১০:০০ – সন্ধ্যা ৭:০০ · শুক্রবার অ্যাপয়েন্টমেন্ট ভিত্তিক",
    receivedTitle: "আপনার রিকোয়েস্ট সফলভাবে গৃহীত হয়েছে!",
    receivedDesc:
      "ধন্যবাদ! আমাদের ঢাকা স্মার্ট হোম ইঞ্জিনিয়ারিং টিম খুব শীঘ্রই ফোন বা হোয়াটসঅ্যাপে আপনার সাথে যোগাযোগ করবে।",
    receivedBtn: "নতুন রিকোয়েস্ট পাঠান",
    formKicker: "ফ্রি সাইট সার্ভে ও স্বচ্ছ বাজেট কোটেশন",
    formTitle: "কাস্টমাইজড স্মার্ট হোম কোটেশন নিন",
    nameLbl: "আপনার নাম *",
    namePh: "যেমন: তারিকুল ইসলাম",
    phoneLbl: "মোবাইল / হোয়াটসঅ্যাপ নম্বর *",
    phonePh: "যেমন: +880 17XX-XXXXXX",
    propTypeLbl: "প্রপার্টি বা প্রজেক্টের ধরন",
    propTypes: [
      "রেডি ফ্ল্যাট / অ্যাপার্টমেন্ট (৩-৪ বেডরুম)",
      "ডুপ্লেক্স ভিলা / পেন্টহাউস",
      "কর্পোরেট অফিস / বোর্ডরুম (PDLC ও VRF এসি)",
      "রিয়েল এস্টেট ডেভেলপার প্রজেক্ট",
      "গার্মেন্টস ফ্যাক্টরি / কোল্ড স্টোরেজ / ইন্ডাস্ট্রিয়াল IoT",
    ],
    propStageLbl: "প্রজেক্টের বর্তমান অবস্থা",
    propStages: [
      "রেডি বা বসবাসরত ফ্ল্যাট (১০০% রেট্রোফিট ওয়্যারলেস)",
      "ইন্টেরিয়র ডিজাইন / ফলস সিলিং পর্যায়",
      "নির্মাণাধীন ভবন (KNX / হাইব্রিড অটোমেশন)",
    ],
    sysLbl: "আপনি কোন কোন সিস্টেমে আগ্রহী?",
    systems: [
      "স্মার্ট টাচ প্যানেল সুইচ (৳৩,৫০০ থেকে)",
      "মোটরাইজড রোলার ও স্লাইডার পর্দা (৳১২,৫০০ থেকে)",
      "3D ফেস ও বায়োমেট্রিক ডোর লক (৳১৫,০০০ থেকে)",
      "সুইচেবল PDLC প্রাইভেসি গ্লাস ফিল্ম (৳১,২৯০/স্কয়ার ফিট)",
      "তিতাস/এলপিজি গ্যাস ও মোশন সেন্সর (৳২,৭৫০ থেকে)",
      "ম্যাগনেটিক প্রোফাইল ও কোভ লাইটিং (৳৫,০০০ থেকে)",
      "VRF / স্প্লিট এসি ও আইপিএস লোড গার্ড (৳৮,৫০০ থেকে)",
      "কাস্টম ইন্ডাস্ট্রিয়াল IoT ও ফ্যাক্টরি অটোমেশন",
    ],
    locLbl: "এলাকা (ঢাকা / বাংলাদেশ) ও বিস্তারিত নোট",
    locPh:
      "যেমন: গুলশান-২ / ধানমন্ডি / উত্তরা / বনানী, রুম বা সুইচবোর্ডের সংখ্যা...",
    submitBtn: "ফ্রি কনসালটেশন বুক করুন →",
  },
};

export default function ContactPage() {
  const { lang } = useLanguage();
  const t = CONTACT_I18N[lang];

  const [selectedSystems, setSelectedSystems] = useState<string[]>([
    t.systems[0],
    t.systems[1],
  ]);
  const [submitted, setSubmitted] = useState(false);

  const toggleSystem = (sys: string) => {
    setSelectedSystems((prev) =>
      prev.includes(sys) ? prev.filter((s) => s !== sys) : [...prev, sys]
    );
  };

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

      {/* Contact & Consultation Form */}
      <section className="py-16 px-5 max-w-[1240px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Direct Contact Channels */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#071D3A] text-white rounded-3xl p-7 shadow-xl">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#02A5F2]">
                {t.directKicker}
              </span>
              <h2 className="text-2xl font-black mt-1 mb-2">{t.directTitle}</h2>
              <p className="text-sm text-white/70 leading-relaxed mb-6">
                {t.directDesc}
              </p>

              <div className="space-y-3.5">
                <a
                  href="https://wa.me/8801711000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 hover:bg-[#0877E8] transition"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#0877E8] flex items-center justify-center font-black text-white shrink-0">
                    WA
                  </div>
                  <div>
                    <div className="text-xs text-white/70 font-semibold">
                      {t.waSub}
                    </div>
                    <div className="text-base font-extrabold">
                      +880 1711-000000
                    </div>
                  </div>
                </a>

                <a
                  href="tel:+8801711000000"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 hover:bg-white/15 transition"
                >
                  <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center font-black text-[#02A5F2] shrink-0">
                    TEL
                  </div>
                  <div>
                    <div className="text-xs text-white/70 font-semibold">
                      {t.telSub}
                    </div>
                    <div className="text-base font-extrabold">
                      +880 1711-000000 / +880 1811-000000
                    </div>
                  </div>
                </a>

                <a
                  href="mailto:hello@nexsolia.com"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 hover:bg-white/15 transition"
                >
                  <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center font-black text-[#02A5F2] shrink-0">
                    @
                  </div>
                  <div>
                    <div className="text-xs text-white/70 font-semibold">
                      {t.emailSub}
                    </div>
                    <div className="text-base font-extrabold">
                      hello@nexsolia.com
                    </div>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/10">
                  <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center font-black text-[#02A5F2] shrink-0">
                    BD
                  </div>
                  <div>
                    <div className="text-xs text-white/70 font-semibold">
                      {t.hqSub}
                    </div>
                    <div className="text-sm font-extrabold">{t.hqTitle}</div>
                    <div className="text-xs text-white/60 mt-0.5">
                      {t.hqHours}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Consultation Request Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#dbe7f4] p-7 md:p-10 shadow-[0_16px_44px_rgba(7,29,58,0.06)]">
            {submitted ? (
              <div className="py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-[#0877E8]/15 text-[#0877E8] flex items-center justify-center text-3xl font-black mx-auto mb-4">
                  ✓
                </div>
                <h3 className="text-2xl font-black text-[#071D3A]">
                  {t.receivedTitle}
                </h3>
                <p className="text-sm text-[#5B6B7D] max-w-md mx-auto mt-2">
                  {t.receivedDesc}
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-3 rounded-xl bg-[#071D3A] text-white text-xs font-extrabold cursor-pointer"
                >
                  {t.receivedBtn}
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-5"
              >
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#0877E8]">
                    {t.formKicker}
                  </span>
                  <h2 className="text-2xl font-black text-[#071D3A] mt-1">
                    {t.formTitle}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold text-[#071D3A] mb-1.5">
                      {t.nameLbl}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t.namePh}
                      className="w-full px-4 py-3 rounded-xl bg-[#F4F8FC] border border-[#d6e4f2] text-sm text-[#071D3A] focus:outline-none focus:border-[#0877E8]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-[#071D3A] mb-1.5">
                      {t.phoneLbl}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder={t.phonePh}
                      className="w-full px-4 py-3 rounded-xl bg-[#F4F8FC] border border-[#d6e4f2] text-sm text-[#071D3A] focus:outline-none focus:border-[#0877E8]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold text-[#071D3A] mb-1.5">
                      {t.propTypeLbl}
                    </label>
                    <select className="w-full px-4 py-3 rounded-xl bg-[#F4F8FC] border border-[#d6e4f2] text-sm text-[#071D3A] focus:outline-none focus:border-[#0877E8]">
                      {t.propTypes.map((opt) => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-[#071D3A] mb-1.5">
                      {t.propStageLbl}
                    </label>
                    <select className="w-full px-4 py-3 rounded-xl bg-[#F4F8FC] border border-[#d6e4f2] text-sm text-[#071D3A] focus:outline-none focus:border-[#0877E8]">
                      {t.propStages.map((opt) => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-[#071D3A] mb-2">
                    {t.sysLbl}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {t.systems.map((sys) => {
                      const active = selectedSystems.includes(sys);
                      return (
                        <button
                          key={sys}
                          type="button"
                          onClick={() => toggleSystem(sys)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                            active
                              ? "bg-[#0877E8] text-white border-[#0877E8]"
                              : "bg-[#F4F8FC] text-[#3b4252] border-[#d6e4f2] hover:border-[#0877E8]"
                          }`}
                        >
                          {sys}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-[#071D3A] mb-1.5">
                    {t.locLbl}
                  </label>
                  <textarea
                    rows={3}
                    placeholder={t.locPh}
                    className="w-full px-4 py-3 rounded-xl bg-[#F4F8FC] border border-[#d6e4f2] text-sm text-[#071D3A] focus:outline-none focus:border-[#0877E8]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#0067E0] to-[#02A5F2] text-white text-sm font-extrabold shadow-[0_12px_30px_rgba(8,119,232,0.3)] hover:-translate-y-0.5 transition cursor-pointer"
                >
                  {t.submitBtn}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection />
    </div>
  );
}
