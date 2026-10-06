import { useState } from "react";
import VideoPlayer from "./videoPlayer";

// Cards take each video's own shape: phone videos stay portrait, and landscape
// ones (like a fashion film) span two columns instead of being cropped to a sliver
export default function VideoCard({ src, onOpen }) {
  const [landscape, setLandscape] = useState(false);

  return (
    <div
      className={`rounded-3xl overflow-hidden bg-black border border-white/10 ${
        landscape ? "aspect-video sm:col-span-2" : "aspect-[9/16]"
      }`}
    >
      <VideoPlayer
        src={src}
        onExpand={onOpen}
        onLoadedMetadata={(e) => setLandscape(e.target.videoWidth > e.target.videoHeight)}
      />
    </div>
  );
}
