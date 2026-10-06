import { useState } from "react";
import GalleryItemer from "../components/galleryItemer";
import Footer from "../components/footer";

const ITEMS_PER_PAGE = 20;

// Every photo and video in src/assets/images. .mov is left out: Chrome and
// Firefox can't play it.
const mediaModules = import.meta.glob(
  "/src/assets/images/*.{jpg,jpeg,png,webp,avif,gif,mp4}",
  {
    eager: true,
    import: "default",
  }
);

const media = Object.values(mediaModules);

export default function Gallery() {
  const [visible, setVisible] = useState(ITEMS_PER_PAGE);

  const displayedMedia = media.slice(0, visible);

  return (
    <>
    <section className="pt-36 md:pt-44 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-6xl heading-font font-bold text-center text-pearl mb-16">Gallery</h1>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {displayedMedia.map((src, index) => (
            <GalleryItemer
              key={src}
              src={src}
              index={index}
            />
          ))}
        </div>

        {visible < media.length && (
          <div className="flex justify-center mt-16">
            <button
              onClick={() => setVisible(v => v + ITEMS_PER_PAGE)}
              className="px-10 py-4 rounded-full border border-white/20 hover:bg-white hover:text-black transition cursor-pointer"
            >
              Show More ({media.length - visible} remaining)
            </button>
          </div>
        )}

      </div>
    </section>
    <Footer />
    </>
  );
}