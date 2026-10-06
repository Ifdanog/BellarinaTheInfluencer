import { useState } from "react";
import VideoCard from "../components/videoCard";
import Footer from "../components/footer";
import Lightbox from "../components/lightbox";
import { videos } from "../media";

const ITEMS_PER_PAGE = 12;

export default function ContentCreation() {
  const [visible, setVisible] = useState(ITEMS_PER_PAGE);
  const [open, setOpen] = useState(null);

  return (
    <>
      <section className="pt-36 md:pt-44 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl heading-font font-bold text-center text-pearl mb-4">Content Creation</h1>
          <p className="text-center text-mist max-w-md mx-auto mb-16">
            Lifestyle, fashion and brand content: reels, TikToks and campaigns.
          </p>

          {videos.length === 0 ? (
            <p className="text-center text-mist">New videos coming soon.</p>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {videos.slice(0, visible).map((src, index) => (
                <VideoCard key={src} src={src} onOpen={() => setOpen(index)} />
              ))}
            </div>
          )}

          {visible < videos.length && (
            <div className="flex justify-center mt-16">
              <button
                onClick={() => setVisible((v) => v + ITEMS_PER_PAGE)}
                className="px-10 py-4 rounded-full border border-white/20 hover:bg-white hover:text-black transition cursor-pointer"
              >
                Show More ({videos.length - visible} remaining)
              </button>
            </div>
          )}
        </div>
      </section>
      <Footer />
      <Lightbox items={videos} index={open} onChange={setOpen} onClose={() => setOpen(null)} />
    </>
  );
}
