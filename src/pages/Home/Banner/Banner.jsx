import { useState, useEffect, useCallback } from "react";
import { FaStethoscope, FaChevronLeft, FaChevronRight } from "react-icons/fa6";

// -----------------------------------------------------------------------
// 5 slides — swap image/copy/cta per slide, structure stays identical.
// -----------------------------------------------------------------------
const SLIDES = [
  
  {
    image:
      "https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?auto=format&fit=crop&w=600&q=80",
    titleLine1: "Diagnostic Care",
    titleLine2: "Built On",
    highlight: "Precision.",
    copy: "Every scan and report is reviewed by specialists who treat accuracy as the baseline, not the finish line, so you get answers you can trust.",
    ctaPrimary: "Book a Test",
    ctaSecondary: "View Services",
  },
  {
    image:
      "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=600&q=80",
    titleLine1: "Lab Results",
    titleLine2: "Delivered",
    highlight: "Same Day.",
    copy: "Modern equipment and a streamlined process mean fewer repeat visits, faster turnaround, and less time spent waiting to know what's next.",
    ctaPrimary: "Get Tested",
    ctaSecondary: "Our Equipment",
  },
  {
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80",
    titleLine1: "Consultations",
    titleLine2: "That Actually",
    highlight: "Listen.",
    copy: "Before anything is diagnosed, our doctors take the time to understand what you're feeling, not just what a chart says.",
    ctaPrimary: "Talk to a Doctor",
    ctaSecondary: "Meet the Team",
  },
  {
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80",
    titleLine1: "Trusted By",
    titleLine2: "Thousands Of",
    highlight: "Patients.",
    copy: "Years of consistent, careful diagnostic work have made us a name families return to, appointment after appointment.",
    ctaPrimary: "Book Now",
    ctaSecondary: "Read Reviews",
  },
];

const overlayDoctors = [
  { id: 1, name: "Dr. John", img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=120&q=80" },
  { id: 2, name: "Dr. Sarah", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=120&q=80" }
];

const AUTOPLAY_MS = 6000;

export default function Banner() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((index) => {
    setActive(((index % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);
  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setActive((a) => (a + 1) % SLIDES.length), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused]);

  const slide = SLIDES[active];

  return (
    <section
      className="relative w-full min-h-[90vh] bg-gradient-to-r from-[#f4f8fc] via-white to-[#eef5fc] overflow-hidden flex items-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* 1. DECORATIVE ABSTRACT SHAPES */}
      <div className="absolute top-12 left-12 w-12 h-12 opacity-20 pointer-events-none">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#3ca4f4] stroke-[8]">
          <polygon points="50,15 90,85 10,85" stroke="currentColor" />
        </svg>
      </div>
      <div className="absolute bottom-16 left-[20%] w-8 h-8 rounded-full border-4 border-blue-900/10 pointer-events-none" />

      {/* 2. MAIN LAYOUT CONTAINER */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* LEFT CONTENT COLUMN */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left min-h-[380px] sm:min-h-[340px] lg:min-h-[420px]">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1a202c] leading-[1.15] tracking-tight transition-opacity duration-500" key={"title-" + active}>
              {slide.titleLine1} <br className="hidden sm:inline" />
              {slide.titleLine2}{" "}
              <span className="text-[#3ca4f4] relative inline-block underline decoration-4 decoration-[#3ca4f4]/30 underline-offset-8">
                {slide.highlight}
              </span>
            </h1>

            <p
              key={"copy-" + active}
              className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto lg:mx-0 leading-relaxed transition-opacity duration-500"
            >
              {slide.copy}
            </p>

            <div className="flex items-center justify-center lg:justify-start space-x-4 border-l-4 border-[#3ca4f4] pl-4 py-1.5 my-6">
              <div className="text-left">
                <p className="text-base font-extrabold text-[#0a2240]">Receive Medical Service.</p>
                <p className="text-xs sm:text-sm text-gray-500 font-semibold">Call Us at: (+2) 56 54 1453</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-[#3ca4f4] hover:bg-[#2b93e3] text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                <span className="text-sm tracking-wide">{slide.ctaPrimary}</span>
                <span className="text-xs select-none">≫</span>
              </button>

              <button className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-[#0a2240] hover:bg-[#112a52] text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                <span className="text-sm tracking-wide">{slide.ctaSecondary}</span>
                <span className="text-xs select-none">≫</span>
              </button>
            </div>

            <div className="hidden sm:flex items-center space-x-4 pt-8 opacity-90 justify-center lg:justify-start">
              <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center text-[#3ca4f4] border border-blue-50">
                <FaStethoscope className="w-8 h-8" />
              </div>
              <span className="text-xs font-bold text-gray-400 tracking-wider uppercase">Professional Diagnostic Standards</span>
            </div>

            {/* dot indicators + progress fill */}
            <div className="flex items-center justify-center lg:justify-start gap-2 pt-6">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className="relative h-1.5 w-8 overflow-hidden rounded-full bg-[#0a2240]/10"
                >
                  {i === active && (
                    <span
                      key={active + "-" + paused}
                      className="absolute inset-y-0 left-0 bg-[#3ca4f4]"
                      style={{
                        animation: paused ? "none" : `fillBar ${AUTOPLAY_MS}ms linear forwards`,
                        width: paused ? "100%" : undefined,
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT GRAPHICS COLUMN */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="relative w-full max-w-[480px] aspect-[4/3] sm:aspect-square rounded-[2rem] overflow-hidden border-8 border-white shadow-2xl">
              {SLIDES.map((s, i) => (
                <img
                  key={i}
                  src={s.image}
                  alt="Medical Personnel"
                  aria-hidden={i !== active}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${
                    i === active ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
              {/* signature diagnostic-scan sweep, matches CtaBanner */}
              <span
                key={"scan-" + active}
                className="absolute inset-x-0 h-[3px] bg-[#3ca4f4] shadow-[0_0_12px_2px_rgba(60,164,244,0.8)] z-10"
                style={{ animation: "scanSweep 2.8s ease-in-out infinite" }}
              />
            </div>

            {/* Prev/Next controls, positioned over the image, hidden on phones */}
            <button
              onClick={prev}
              aria-label="Previous slide"
              className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 items-center justify-center rounded-full bg-white/90 p-2.5 text-[#0a2240] shadow-md backdrop-blur-sm transition hover:bg-white"
            >
              <FaChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={next}
              aria-label="Next slide"
              className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 items-center justify-center rounded-full bg-white/90 p-2.5 text-[#0a2240] shadow-md backdrop-blur-sm transition hover:bg-white"
            >
              <FaChevronRight className="w-3.5 h-3.5" />
            </button>

            {/* Doctor fast-link stack, unchanged across slides */}
            <div className="absolute right-4 sm:right-6 bottom-8 bg-white/95 backdrop-blur-sm py-4 px-3 rounded-2xl shadow-xl flex flex-col space-y-3 border border-gray-100 z-20">
              {overlayDoctors.map((doc) => (
                <div
                  key={doc.id}
                  className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#3ca4f4] hover:scale-110 transition-transform duration-200 cursor-pointer"
                  title={doc.name}
                >
                  <img src={doc.img} alt={doc.name} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes scanSweep {
          0%   { top: 0%; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes fillBar {
          from { width: 0%; }
          to   { width: 100%; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; }
        }
      `}</style>
    </section>
  );
}