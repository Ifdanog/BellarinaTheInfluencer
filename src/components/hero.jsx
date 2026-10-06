import { useState, useEffect, useRef } from "react";
import { SocialIconBtn, RevealBlock, SectionLabel } from "./UI";
import { SOCIAL } from "./social";
import aboutImage from "../assets/images/IMG_4719.jpg";

/* ── Certificate accordion item ── */
const CertCard = ({
  title,
  year,
  description,
  imgSrc,
  defaultOpen = false,
}) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-white/[0.07] rounded-card overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="
          w-full flex items-center justify-between
          px-5 py-4 text-left
          bg-slate/80 hover:bg-ghost/80
          transition-colors duration-300
        "
      >
        <div>
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-gold mb-0.5">
            {year}
          </p>
          <p className="font-body text-pearl font-semibold text-base">
            {title}
          </p>
        </div>
        <span
          className={`
            text-gold text-lg transition-transform duration-400 ease-cinematic
            ${open ? "rotate-45" : "rotate-0"}
          `}
        >
          +
        </span>
      </button>

      <div
        className={`
          overflow-hidden transition-all duration-500 ease-cinematic
          ${open ? " opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="px-5 py-4 bg-ash/50 border-t border-white/[0.05]">
          <p className="font-body text-mist text-base leading-relaxed mb-4">
            {description}
          </p>
          <div className="rounded-card overflow-hidden border border-white/[0.07]">
            <img
              src={imgSrc}
              alt={title}
              className="w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Hero ── */
const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const heroBgRef = useRef(null);

  /* entrance animation trigger */
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(timer);
  }, []);

  /* subtle parallax on hero bg */
  useEffect(() => {
    const onScroll = () => {
      if (!heroBgRef.current) return;
      const y = window.scrollY;
      heroBgRef.current.style.transform = `translateY(${y * 0.3}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const enterStyle = (delay) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(32px)",
    transition: `opacity 0.9s cubic-bezier(0.23,1,0.32,1) ${delay}ms,
                 transform 0.9s cubic-bezier(0.23,1,0.32,1) ${delay}ms`,
  });

  return (
    <div id="about">
      {/* ── CINEMATIC HERO VIEWPORT ── */}
      <div className="relative h-screen min-h-[640px] overflow-hidden flex items-end">
        {/* Parallax background */}
        <div
          ref={heroBgRef}
          className="absolute inset-0 will-change-transform"
          style={{
            backgroundImage: "url('/hero.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center 10%",
          }}
        />

        {/* Layered gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/50 via-transparent to-transparent" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 70% 30%, rgba(201,168,76,0.06), transparent)",
          }}
        />

        {/* Filmstrip edge decoration */}
        <div className="absolute top-0 right-10 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
        <div className="absolute top-0 left-0 bottom-0 flex flex-col justify-center gap-4 pl-3 opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="w-4 h-3 border border-gold/40 rounded-[1px]"
            />
          ))}
        </div>

        {/* Hero content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-8 pb-16 md:pb-20">
          {/* Eyebrow */}
          <div style={enterStyle(100)}>
            <p className="font-mono text-[10px] tracking-[0.45em] uppercase text-gold mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-gold inline-block" />
              Model · Actress · Content Creator
            </p>
          </div>

          {/* Name */}
          <div style={enterStyle(250)}>
            <h1 className="heading-font text-display-hero text-gradient leading-[0.88] mb-3">
               Isabella Chidera
              <br />
              Amaobi
            </h1>
          </div>

          {/* Tagline */}
          <div style={enterStyle(450)}>
            <p className="font-body italic text-mist text-xl mb-8">
              That Influencer With Integrity
            </p>
          </div>

          {/* Social icons */}
          <div style={enterStyle(600)} className="flex gap-3 mb-12">
            {SOCIAL.map((s) => (
              <SocialIconBtn key={s.label} {...s} />
            ))}
          </div>

          {/* Scroll indicator */}
          <div style={enterStyle(800)} className="flex items-center gap-4">
            <div className="flex flex-col items-center gap-2">
              <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent animate-scroll" />
            </div>
            <p className="font-mono text-[9px] tracking-[0.35em] uppercase text-gold/60">
              Scroll
            </p>
          </div>
        </div>
      </div>

      {/* ── BIO SECTION ── */}
      <div
        className="max-w-4xl mx-auto px-6 md:px-8 py-20"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,76,0.04), transparent)",
        }}
      >
        <RevealBlock>
          <SectionLabel>Biography</SectionLabel>
        </RevealBlock>

        <RevealBlock delay={80}>
          <h2 className="font-display text-display-md text-gradient mb-8">
            About Bellarina TheInfluencer
          </h2>
        </RevealBlock>

        {/* Main hero image */}
        <RevealBlock delay={120}>
          <div className="relative mb-10 rounded-card-lg overflow-hidden border border-white/[0.06] shadow-card">
            <img
              src={aboutImage}
              alt="Bellarina TheInfluencer"
              className="w-full max-h-[500px] object-cover object-[50%_50%]"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
          </div>
        </RevealBlock>

        {/* Bio paragraphs */}
        <div className="space-y-5">
          {[
            `Bellarina TheInfluencer (BTI) is the brand of Isabella Chidera Amaobi — a runway and commercial model, actress and lifestyle content creator. Her work moves between the catwalk, the camera and the feed, blending high-fashion modelling, acting and influencer partnerships into one bold, unmistakable presence.`,
            `Fierce, magnetic and confident, Bellarina shows up boldly in fashion and lifestyle while staying rooted in God. Faith, love, peace and harmony sit at the heart of everything she creates, and her content speaks to anyone, of any age, who is drawn to confidence, style and fearless self-expression.`,
            `Her mission is to build a lifestyle brand people aspire to be part of, grounded in confidence, style and authenticity. Her vision is to grow BTI into an iconic name across modelling, acting and the influencer space — setting trends rather than following them.`,
          ].map((para, i) => (
            <RevealBlock key={i} delay={i * 70}>
              <p className="font-body text-mist text-lg leading-[1.85]">
                {para}
              </p>
            </RevealBlock>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;