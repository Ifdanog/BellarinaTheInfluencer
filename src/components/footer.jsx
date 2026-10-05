import { FaTiktok, FaFacebookF, FaPhoneAlt } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa6";
import { AiOutlineMail } from "react-icons/ai";
import { SocialIconBtn, RevealBlock } from "./UI";

const SOCIAL = [
  { href: "https://www.tiktok.com/@oba_bisi", icon: FaTiktok, label: "TikTok" },
  {
    href: "https://x.com/king_tijesu",
    icon: RiTwitterXLine,
    label: "X / Twitter",
  },
  {
    href: "https://facebook.com/obafemi.adebisi.73",
    icon: FaFacebookF,
    label: "Facebook",
  },
  {
    href: "https://instagram.com/oba_bisi",
    icon: FaInstagram,
    label: "Instagram",
  },
  {
    href: "mailto:obafemiadebisi19@gmail.com",
    icon: AiOutlineMail,
    label: "Email",
  },
  { href: "tel:+2349130696617", icon: FaPhoneAlt, label: "Phone" },
];

const Footer = () => (
  <footer
    className="relative overflow-hidden pt-24 pb-12"
    style={{
      background: '#000',
    }}
  >
    {/* Filmstrip top border */}
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

    {/* Vertical filmstrip accents */}
    <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-gold/20 via-transparent to-transparent" />
    <div className="absolute top-0 right-0 bottom-0 w-px bg-gradient-to-b from-gold/20 via-transparent to-transparent" />

    <div className="max-w-4xl mx-auto px-6 md:px-8">
      {/* Main footer content */}
      <RevealBlock>
        <div className="flex flex-col items-center text-center mb-14">
          {/* Name */}
          <h2
            className="
            heading-font text-display-lg
            bg-gradient-to-br from-pearl via-mist to-silver
            bg-clip-text text-transparent
            mb-2 leading-[0.9]
          "
          >
            Bellarina TheInfluencer
          </h2>

          {/* Role tagline */}
          <p className="font-display italic text-silver text-lg mb-8">
            Actor · Screenwriter · Filmmaker
          </p>

          {/* Gold divider */}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mb-8" />

          {/* Social icons */}
          <div className="flex gap-3 flex-wrap justify-center">
            {SOCIAL.map((s) => (
              <SocialIconBtn key={s.label} {...s} />
            ))}
          </div>
        </div>
      </RevealBlock>

      {/* Contact nudge */}
      <RevealBlock delay={80}>
        <div
          className="
          text-center mb-12 p-6
          border border-white/[0.06] rounded-card
          bg-gradient-to-br from-slate/50 to-ghost/50
          relative overflow-hidden
        "
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
          <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-gold mb-2">
            Get in Touch
          </p>
          <p className="font-body text-mist text-base mb-4">
            Available for acting roles, screenwriting collaborations, and
            dialogue directing.
          </p>
          <a
            href="mailto:obafemiadebisi19@gmail.com"
            className="
              inline-flex items-center gap-2
              font-mono text-[9px] tracking-[0.25em] uppercase
              text-gold border border-gold/25 rounded-full px-6 py-3
              hover:bg-gold/10 hover:border-gold/50
              transition-all duration-300 ease-cinematic
            "
          >
            ✉ obafemiadebisi19@gmail.com
          </a>
        </div>
      </RevealBlock>

      {/* Bottom bar */}
      <RevealBlock delay={120}>
        <div
          className="
          flex flex-col md:flex-row items-center justify-between
          gap-4 pt-6
          border-t border-white/[0.05]
        "
        >
          <p className="font-mono text-[9px] tracking-[0.2em] text-silver/40">
            © {new Date().getFullYear()} Bellarina TheInfluencer. All rights reserved.
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="
              flex items-center gap-2
              font-mono text-[9px] tracking-[0.25em] uppercase text-silver/40
              hover:text-gold
              transition-colors duration-300
              group
            "
          >
            Back to top
            <span
              className="
              w-6 h-6 flex items-center justify-center
              border border-white/[0.08] rounded-full
              group-hover:border-gold/30 group-hover:-translate-y-0.5
              transition-all duration-300
            "
            >
              ↑
            </span>
          </button>

          <a
            href="https://wa.me/2348126123194"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[9px] tracking-[0.2em] text-silver/30 hover:text-silver transition-colors duration-300"
          >
            Site by DevDan
          </a>
        </div>
      </RevealBlock>
    </div>
  </footer>
);

export default Footer;