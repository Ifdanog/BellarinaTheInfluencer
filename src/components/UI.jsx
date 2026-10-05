import React from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

/* ── SECTION LABEL (eyebrow + gold rule) ── */
export const SectionLabel = ({ children, className = "" }) => (
  <div className={`flex items-center gap-3 mb-4 ${className}`}>
    <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-gold">
      {children}
    </span>
    <div className="flex-1 h-px bg-gradient-to-r from-gold/40 to-transparent" />
  </div>
);

/* ── DISPLAY HEADING ── */
export const DisplayHeading = ({ children, className = "" }) => (
  <h2
    className={`
      font-display text-display-lg
      bg-gradient-to-br from-pearl via-mist to-silver
      bg-clip-text text-transparent
      mb-6 ${className}
    `}
  >
    {children}
  </h2>
);

/* ── REVEAL BLOCK — wraps children with scroll-triggered fade-up ── */
export const RevealBlock = ({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}) => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <Tag
      ref={ref}
      className={`w-full transition-all duration-700 ease-cinematic ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(28px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
};

/* ── STAGGER REVEAL — wraps multiple children with staggered delays ── */
export const StaggerReveal = ({
  children,
  baseDelay = 0,
  step = 100,
  className = "",
}) => (
  <div className={className}>
    {React.Children.map(children, (child, i) =>
      child ? (
        <RevealBlock delay={baseDelay + i * step}>{child}</RevealBlock>
      ) : null
    )}
  </div>
);

/* ── GOLD DIVIDER LINE ── */
export const GoldDivider = ({ className = "" }) => (
  <div
    className={`w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent my-16 ${className}`}
  />
);

/* ── BADGE ── */
export const Badge = ({ children, variant = "gold", className = "" }) => {
  const variants = {
    gold: "text-gold border-gold/30 bg-gold/[0.08]",
    mist: "text-mist border-mist/20 bg-mist/[0.05]",
    teal: "text-teal-300 border-teal-400/20 bg-teal-400/[0.05]",
  };
  return (
    <span
      className={`
        inline-block font-mono text-[9px] tracking-[0.2em] uppercase
        border rounded-full px-3 py-1
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

/* ── SOCIAL ICON BUTTON ── */
export const SocialIconBtn = ({ href, icon: Icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="
      group w-11 h-11 flex items-center justify-center
      bg-ghost border border-white/[0.07] rounded-card
      text-silver hover:text-gold
      hover:bg-gold/10 hover:border-gold/30
      hover:-translate-y-1
      transition-all duration-300 ease-cinematic
    "
  >
    <Icon className="w-4.5 h-4.5 group-hover:scale-110 transition-transform duration-300" />
  </a>
);