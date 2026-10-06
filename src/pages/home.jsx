import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import Hero from '../components/hero';
import Footer from '../components/footer';
import GalleryItem from '../components/galleryItem';
import VideoCard from '../components/videoCard';
import Lightbox from '../components/lightbox';
import { imageModules, videos } from '../media';
import statsImage from '../assets/images/Bella 5.jpg';
import { EMAIL, PHONE_DISPLAY, WHATSAPP_URL } from '../components/social';
// import { Instagram, Youtube, Twitter, TikTok, Mail, Phone } from 'lucide-react';

// The photos shown in the home gallery, in this order
const HOME_GALLERY = ["Bella 4.jpg", "Bella 5.jpg", "Bella 7.jpg", "Isabella.png"];

const homeGallery = HOME_GALLERY.map((name) => imageModules[`/src/assets/images/${name}`]).filter(Boolean);

// The first few videos tease the Content Creation page
const HOME_VIDEOS = 3;
console.log(videos);

// No backend, so the form opens the visitor's email app with the inquiry filled in
function sendInquiry(e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.currentTarget));
  const body = [
    `Name / Brand: ${data.name}`,
    `Email: ${data.email}`,
    `Phone / WhatsApp: ${data.phone}`,
    `Preferred dates: ${data.dates}`,
    "",
    data.message,
  ].join("\n");
  window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(`Booking inquiry from ${data.name}`)}&body=${encodeURIComponent(body)}`;
}

function Home() {
  const navigate = useNavigate();
  const { hash } = useLocation();
  // Which photo / video is open full screen (null = none)
  const [photoOpen, setPhotoOpen] = useState(null);
  const [videoOpen, setVideoOpen] = useState(null);

  // Nav links point at "/#section"; scroll there once the page has rendered
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
  }, [hash]);

  return (
    <>
      {/* HERO */}
      <Hero />

      {/* GALLERY */}
      <section id="gallery" className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl heading-font font-bold text-center text-brown mb-16">Gallery</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {homeGallery.map((img, index) => (
              <GalleryItem key={img} src={img} index={index} onOpen={() => setPhotoOpen(index)} />
            ))}
          </div>
          <button onClick={() => navigate("/gallery")} className="w-full mt-6 py-7 bg-gold hover:bg-white text-brown font-semibold text-lg tracking-wider rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
            See More
          </button>
        </div>
      </section>

      {/* EXPERIENCE, STATS, REEL, etc. */}
      {/* (Continuing with the same quality... I'll show a few more key sections) */}

            {/* MEASUREMENTS & STATS - Modern Fashion Comp Card Style */}
      <section id="stats" className="py-28 bg-white relative">
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-5xl md:text-6xl heading-font font-bold text-center text-brown mb-12 md:mb-20">
      Measurements
    </h2>

    <div className="max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">

        {/* LEFT - Sticky Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative md:sticky md:top-28 self-start max-w-sm md:max-w-none mx-auto w-full"
        >
          <div className="aspect-[4/5] bg-gradient-to-br from-brown to-black rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={statsImage}
              alt="Amaobi Isabella"
              className="w-full h-full object-cover transition-transform duration-700"
            />
          </div>

          <div className="absolute bottom-4 right-4 md:-bottom-6 md:-right-6 bg-cream px-5 py-4 md:px-8 md:py-6 rounded-2xl shadow-xl border border-beige">
            <p className="text-brown text-sm tracking-widest">
              PROFESSIONAL
            </p>
            <p className="text-3xl md:text-4xl font-bold text-gold">
              STATS
            </p>
          </div>
        </motion.div>

        {/* RIGHT - Measurements */}
        <div className="grid grid-cols-2 gap-x-5 gap-y-6 md:block md:space-y-10">
          {[
            { label: "Height", value: "5'10\" • 178 cm" },
            { label: "Bust • Waist • Hips", value: "32 • 27 • 36 in" },
            { label: "Dress Size", value: "US 4 / UK 8" },
            { label: "Shoe Size", value: "EU 42 / US 10.5" },
            { label: "Hair Color", value: "Dark brown" },
            { label: "Eye Color", value: "Hazel Brown" },
            { label: "Location", value: "Lagos, Nigeria" },
            { label: "Passport & Travel", value: "Valid • Worldwide" },

            // Duplicate a few items to demonstrate scrolling
            { label: "Runway", value: "Professional" },
            { label: "Editorial", value: "Available" },
            { label: "Commercial", value: "Worldwide" },
            { label: "Campaigns", value: "Luxury Brands" },
            { label: "Experience", value: "3+ Years" },
            { label: "Languages", value: "English, Igbo" },
            { label: "Availability", value: "International" },
            { label: "Agency", value: "Independent" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(i, 4) * 0.08 }}
              className="flex justify-between items-end border-b border-beige pb-4 md:pb-6 group min-w-0"
            >
              <div>
                <p className="text-brown/60 text-xs md:text-sm font-medium tracking-widest">
                  {stat.label}
                </p>

                <p className="text-lg md:text-3xl font-semibold text-brown mt-1 group-hover:text-gold transition-colors">
                  {stat.value}
                </p>
              </div>

              <div className="hidden md:block w-12 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent" />
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  </div>
</section>

      {/* CONTENT CREATION - videos only */}
      <section id="content" className="py-28 bg-ink">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl heading-font font-bold text-pearl">Content Creation</h2>
            <p className="mt-4 text-lg text-mist max-w-md mx-auto">
              Lifestyle, fashion and brand content: reels, TikToks and campaigns.
            </p>
          </div>

          {videos.length === 0 ? (
            <p className="text-center text-mist">New videos coming soon.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {videos.slice(0, HOME_VIDEOS).map((src, index) => (
                <VideoCard key={src} src={src} onOpen={() => setVideoOpen(index)} />
              ))}
            </div>
          )}

          <button onClick={() => navigate("/content-creation")} className="w-full max-w-5xl mx-auto block mt-10 py-7 bg-gold hover:bg-white text-brown font-semibold text-lg tracking-wider rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
            See More
          </button>
        </div>
      </section>

      {/* SERVICES - Modern Luxe Cards */}
      <section id="services" className="py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl heading-font font-bold text-brown">What I Offer</h2>
            <p className="mt-4 text-lg text-brown/70 max-w-md mx-auto">
              Versatile talent for high-end projects and creative collaborations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Fashion & Editorial",
                desc: "High-fashion shoots, magazine editorials, and campaign imagery.",
                icon: "📸"
              },
              {
                title: "Runway & Shows",
                desc: "Professional catwalk experience for fashion weeks and presentations.",
                icon: "👠"
              },
              {
                title: "Commercial Campaigns",
                desc: "TV commercials, digital ads, and brand storytelling.",
                icon: "🎥"
              },
              {
                title: "Brand Partnerships",
                desc: "Long-term ambassadorships and influencer collaborations.",
                icon: "🤝"
              },
              {
                title: "Content Creation",
                desc: "UGC, Reels, TikToks, and full social media campaigns.",
                icon: "✨"
              },
              {
                title: "Events & Appearances",
                desc: "Red carpet, hosting, product launches, and private events.",
                icon: "🌟"
              },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -12 }}
                className="group bg-white p-10 rounded-3xl hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-gold/20"
              >
                <div className="text-5xl mb-8 transition-transform group-hover:scale-110 inline-block">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-semibold text-brown mb-4 heading-font">
                  {service.title}
                </h3>
                <p className="text-brown/70 leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
            {/* CONTACT - Modern Split Layout */}
      <section id="contact" className="py-28 bg-black text-cream relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#d4af37_0.8px,transparent_1px)] bg-[length:40px_40px] opacity-5"></div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column - Information */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="min-w-0"
            >
              <h2 className="text-6xl md:text-7xl heading-font font-bold leading-tight text-gold">
                Let's Create<br />Something<br />Beautiful
              </h2>
              
              <p className="mt-8 text-xl text-cream/80 max-w-md">
                Open to international campaigns, editorial work, brand partnerships, and creative collaborations.
              </p>

              <div className="mt-16 space-y-10">
                <div>
                  <p className="uppercase tracking-[3px] text-gold/70 text-sm mb-2">Email</p>
                  <a href={`mailto:${EMAIL}`}
                     className="text-xl sm:text-2xl break-all hover:text-gold transition-colors">
                    {EMAIL}
                  </a>
                </div>

                <div>
                  <p className="uppercase tracking-[3px] text-gold/70 text-sm mb-2">WhatsApp / Phone</p>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                     className="text-2xl hover:text-gold transition-colors">
                    {PHONE_DISPLAY}
                  </a>
                </div>

                <div>
                  <p className="uppercase tracking-[3px] text-gold/70 text-sm mb-2">Based In</p>
                  <p className="text-2xl">Lagos, Nigeria</p>
                  <p className="text-cream/60 mt-1">Available Worldwide</p>
                </div>
              </div>

              <div className="flex gap-6 mt-16">
                {/* <a href="#" className="text-4xl hover:text-gold transition-colors"><Instagram /></a>
                <a href="#" className="text-4xl hover:text-gold transition-colors"><Youtube /></a>
                <a href="#" className="text-4xl hover:text-gold transition-colors"><Twitter /></a> */}
              </div>
            </motion.div>

            {/* Right Column - Booking Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="min-w-0 bg-cream/10 backdrop-blur-xl border border-white/10 p-6 sm:p-10 md:p-14 rounded-3xl"
            >
              <h3 className="text-3xl heading-font font-semibold mb-8 text-white">Booking Inquiry</h3>
              
              <form className="space-y-8" onSubmit={sendInquiry}>
                <div>
                  <input 
                    type="text" 
                    name="name" required
                    placeholder="Brand / Agency / Name" 
                    className="w-full bg-transparent border-b border-white/30 pb-4 text-lg placeholder:text-cream/50 focus:border-gold outline-none transition-colors"
                  />
                </div>

                <div>
                  <input 
                    type="email" 
                    name="email" required
                    placeholder="Email Address" 
                    className="w-full bg-transparent border-b border-white/30 pb-4 text-lg placeholder:text-cream/50 focus:border-gold outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <input 
                      type="tel" 
                      name="phone"
                    placeholder="Phone / WhatsApp" 
                      className="w-full bg-transparent border-b border-white/30 pb-4 text-lg placeholder:text-cream/50 focus:border-gold outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <input 
                      type="text" 
                      name="dates"
                    placeholder="Preferred Dates" 
                      className="w-full bg-transparent border-b border-white/30 pb-4 text-lg placeholder:text-cream/50 focus:border-gold outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <textarea 
                    name="message"
                    required
                    placeholder="Tell me about your project — campaign type, vision, budget range..." 
                    rows={6}
                    className="w-full bg-transparent border-b border-white/30 pb-4 text-lg placeholder:text-cream/50 focus:border-gold outline-none resize-none transition-colors"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full mt-6 py-7 bg-gold hover:bg-white text-brown font-semibold text-lg tracking-wider rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  SEND INQUIRY
                </button>
              </form>

              <p className="text-center text-xs text-cream/50 mt-8">
                I usually reply within 24–48 hours
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />

      <Lightbox items={homeGallery} index={photoOpen} onChange={setPhotoOpen} onClose={() => setPhotoOpen(null)} />
      <Lightbox items={videos} index={videoOpen} onChange={setVideoOpen} onClose={() => setVideoOpen(null)} />
    </>
  );
}

export default Home;