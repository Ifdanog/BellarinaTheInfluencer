import { altFor, thumbFor } from "../media";

export default function GalleryItemer({ src, onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View full screen: ${altFor(src)}`}
      className="block w-full rounded-3xl overflow-hidden aspect-[4/5] bg-black cursor-zoom-in"
    >
      <img
        src={thumbFor(src)}
        alt={altFor(src)}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
      />
    </button>
  );
}
