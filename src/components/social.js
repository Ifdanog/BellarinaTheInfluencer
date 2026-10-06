import { FaTiktok, FaFacebookF, FaPhoneAlt, FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { AiOutlineMail } from "react-icons/ai";

export const EMAIL = "bellaamaobi89@gmail.com";
export const PHONE = "+2348128928550";
export const PHONE_DISPLAY = "+234 812 892 8550";
export const WHATSAPP_URL = "https://wa.me/2348128928550";

// Shown in the hero and the footer
export const SOCIAL = [
  { href: "https://www.tiktok.com/@amaobofihdb", icon: FaTiktok, label: "TikTok" },
  { href: "https://www.instagram.com/bell_arina1", icon: FaInstagram, label: "Instagram" },
  { href: "https://youtube.com/@isabellaamaobi-m2k", icon: FaYoutube, label: "YouTube" },
  { href: "https://www.facebook.com/share/1DQuxr2EAJ/", icon: FaFacebookF, label: "Facebook" },
  { href: `mailto:${EMAIL}`, icon: AiOutlineMail, label: "Email" },
  { href: `tel:${PHONE}`, icon: FaPhoneAlt, label: "Phone" },
];
