import VideoPlayer from "./videoPlayer";

const isVideo = /\.(mp4|mov)$/i;

export default function GalleryItemer({ src }) {
  return (
    <div className="rounded-3xl overflow-hidden aspect-[4/5] bg-black">
      {isVideo.test(src) ? (
        <VideoPlayer src={src} />
      ) : (
        <img
          src={src}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
}