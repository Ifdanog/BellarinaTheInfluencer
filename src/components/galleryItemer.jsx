import VideoPlayer from "./videoPlayer";

const isVideo = /\.(mp4|mov)$/i;

export default function GalleryItemer({ src, index }) {
  return (
    <div className="rounded-3xl overflow-hidden aspect-[4/5] bg-black">
      {isVideo.test(src) ? (
        <VideoPlayer src={src} />
      ) : (
        <img
          src={src}
          alt={`Bellarina gallery photo ${index + 1}`}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
}