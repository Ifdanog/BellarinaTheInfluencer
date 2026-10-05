import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import Gallery from "./pages/gallery";

const NAV_LINKS = [
  { hash: "#about", label: "About" },
  { hash: "#gallery", label: "Gallery" },
  { hash: "#stats", label: "Stats" },
  { hash: "#services", label: "Services" },
  { hash: "#contact", label: "Book Me" },
];

function App() {
  return (
    <BrowserRouter>
      <nav className="w-4/5 mx-auto rounded-[100px] shadow-md fixed top-5 left-0 right-0 z-50 bg-white/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
          <Link to="/">
            <img src="/BTIC-2.png" className="h-20" alt="Logo" />
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            {NAV_LINKS.map(({ hash, label }) => (
              <Link key={hash} to={{ pathname: "/", hash }} className="hover:text-gold transition-colors">{label}</Link>
            ))}
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;