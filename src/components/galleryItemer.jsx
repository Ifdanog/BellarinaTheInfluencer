import { thumbFor } from "../media";

export default function GalleryItemer({ src, index, onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View photo ${index + 1} full screen`}
      className="block w-full rounded-3xl overflow-hidden aspect-[4/5] bg-black cursor-zoom-in"
    >
      <img
        src={thumbFor(src)}
        alt={`Isabella Amaobi, Bellarina TheInfluencer, photo ${index + 1}`}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
      />
    </button>
  );
}
