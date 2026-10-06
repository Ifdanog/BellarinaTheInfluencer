import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Home from "./pages/home";
import Gallery from "./pages/gallery";
import ContentCreation from "./pages/contentCreation";

const NAV_LINKS = [
  { hash: "#about", label: "About" },
  { hash: "#gallery", label: "Gallery" },
  { hash: "#stats", label: "Stats" },
  { hash: "#content", label: "Content" },
  { hash: "#services", label: "Services" },
  { hash: "#contact", label: "Book Me" },
];

// React Router keeps the old scroll position between pages; start each page at the top
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    // "instant" overrides the CSS smooth scrolling, which can be cut short mid-page
    if (!hash) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);
  return null;
}

function Nav() {
  const [open, setOpen] = useState(false);
  const { pathname, hash: currentHash } = useLocation();

  // A link to the hash we're already on doesn't change the URL, so scroll by hand
  const goTo = (hash) => {
    setOpen(false);
    if (pathname === "/" && hash === currentHash) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="w-[calc(100%-2rem)] md:w-4/5 mx-auto rounded-[2rem] md:rounded-[100px] shadow-md fixed top-5 left-0 right-0 z-50 bg-ink/70 backdrop-blur-md border border-white/10 text-pearl">
      <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
        <Link to="/" onClick={() => { setOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          <img src="/BTIC-2.png" className="h-14 md:h-20" alt="Bellarina The Influencer" />
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {NAV_LINKS.map(({ hash, label }) => (
            <Link key={hash} to={{ pathname: "/", hash }} onClick={() => goTo(hash)} className="hover:text-gold transition-colors">{label}</Link>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="md:hidden p-2 text-pearl hover:text-gold transition-colors"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden flex flex-col px-6 pb-5 pt-1 gap-1 text-base font-medium">
          {NAV_LINKS.map(({ hash, label }) => (
            <Link key={hash} to={{ pathname: "/", hash }} onClick={() => goTo(hash)} className="py-2 hover:text-gold transition-colors">{label}</Link>
          ))}
        </div>
      )}
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/content-creation" element={<ContentCreation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
