import { useState, useEffect, useRef, useCallback } from "react";
import { FaAngleDoubleRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

// -----------------------------------------------------------------------
// Slide content — swap images/copy freely, structure stays the same.
// -----------------------------------------------------------------------
const SLIDES = [
  {
    image:
      "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=1600&q=80",
    eyebrow: "Accurate. Fast. Trusted.",
    title: "Meet The Team Behind Every Result.",
    copy: "Every sample, scan, and report is handled by specialists who treat precision as the minimum standard, not the goal.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1600&q=80",
    eyebrow: "Modern diagnostic technology",
    title: "Lab-Grade Precision, Same-Day Reports.",
    copy: "Advanced imaging and pathology equipment mean fewer repeat visits and answers you can actually act on.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?auto=format&fit=crop&w=1600&q=80",
    eyebrow: "Care that listens first",
    title: "Consultations Built Around You.",
    copy: "No minor aspects — a quality diagnosis starts with time spent understanding what you're actually feeling.",
  },
];

const AUTOPLAY_MS = 5500;

export default function CtaBanner() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const goTo = useCallback((index) => {
    setActive(((index % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setActive((a) => (a + 1) % SLIDES.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timerRef.current);
  }, [paused]);

  return (
    <div
      className="relative w-full overflow-hidden bg-[#0a2240] text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ambient corner glow — kept from original design language */}
      <div className="pointer-events-none absolute right-0 bottom-0 h-48 w-48 translate-x-20 translate-y-20 rounded-full bg-blue-500/10" />

      {/* ---------------------------------------------------------------
          SLIDES
      ---------------------------------------------------------------- */}
      <div className="relative min-h-[400px] sm:min-h-[560px] lg:min-h-[340px]">
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            aria-hidden={i !== active}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              i === active ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <div className="mx-auto grid h-full max-w-7xl grid-cols-1 items-center gap-6 px-4 py-8 sm:gap-8 sm:px-6 sm:py-10 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:py-0">
              {/* LEFT: image with signature diagnostic-scan sweep */}
              <div className="relative hidden h-40 self-stretch overflow-hidden rounded-sm sm:block lg:col-span-4 lg:h-56">
                <img
                  src={slide.image}
                  alt=""
                  className="h-full w-full object-cover object-center"
                />
                {/* signature element: an animated scan-line, like a diagnostic sweep,
                    only active on the current slide */}
                {i === active && (
                  <span
                    className="absolute inset-x-0 h-[3px] bg-[#3ca4f4] shadow-[0_0_12px_2px_rgba(60,164,244,0.8)]"
                    style={{ animation: "scanSweep 2.6s ease-in-out infinite" }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a2240]/40 via-transparent to-transparent" />
                <div
                  className="absolute right-0 top-1/2 z-10 hidden h-12 w-6 -translate-y-1/2 translate-x-full bg-[#3ca4f4] lg:block"
                  style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }}
                />
              </div>

              {/* MIDDLE: copy */}
              <div className="space-y-2 text-center sm:text-left lg:col-span-5 lg:pl-8">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3ca4f4]">
                  {slide.eyebrow}
                </p>
                <h2 className="text-xl font-black leading-snug tracking-tight sm:text-2xl lg:text-[26px]">
                  {slide.title}
                </h2>
                <p className="text-sm font-normal text-gray-300 opacity-90 sm:text-base">
                  {slide.copy}
                </p>
              </div>

              {/* RIGHT: CTA button */}
              <div className="flex justify-center sm:justify-start lg:col-span-3 lg:justify-end">
                <button className="group flex items-center justify-center space-x-2 whitespace-nowrap rounded-full bg-white px-8 py-3.5 font-extrabold text-[#0a2240] shadow-md transition-all duration-300 hover:bg-[#3ca4f4] hover:text-white hover:shadow-xl">
                  <Link to={'tests'} className="text-[15px] tracking-wide">Booking Now</Link>
                  <FaAngleDoubleRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ---------------------------------------------------------------
          CONTROLS
      ---------------------------------------------------------------- */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-2 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white/10 p-2 text-white/80 backdrop-blur-sm transition hover:bg-white/20 hover:text-white sm:block"
      >
        <FaChevronLeft className="h-3.5 w-3.5" />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-2 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white/10 p-2 text-white/80 backdrop-blur-sm transition hover:bg-white/20 hover:text-white sm:block"
      >
        <FaChevronRight className="h-3.5 w-3.5" />
      </button>

      {/* dot indicators, doubling as an autoplay progress bar on the active dot */}
      <div className="relative z-20 flex justify-center gap-2 pb-4">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="relative h-1.5 w-8 overflow-hidden rounded-full bg-white/20"
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
    </div>
  );
}