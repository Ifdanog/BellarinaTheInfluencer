import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight, Maximize, Minimize } from "lucide-react";

const isVideo = (src) => /\.(mp4|webm)(\?|$)/i.test(src);

/**
 * Full-screen viewer for photos and videos.
 * `index` is the open item, or null when closed. Arrow keys / swipe move
 * between items, Esc or the backdrop closes it.
 */
export default function Lightbox({ items, index, onChange, onClose }) {
  const rootRef = useRef(null);
  const touchX = useRef(null);
  const [fullscreen, setFullscreen] = useState(false);
  const open = index !== null && index >= 0 && index < items.length;
  const count = items.length;

  const prev = () => onChange((index - 1 + count) % count);
  const next = () => onChange((index + 1) % count);

  const close = () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    onClose();
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    // Stop the page behind from scrolling while the viewer is open
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  });

  useEffect(() => {
    const onChangeFs = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChangeFs);
    return () => document.removeEventListener("fullscreenchange", onChangeFs);
  }, []);

  if (!open) return null;

  const src = items[index];
  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else rootRef.current?.requestFullscreen?.().catch(() => {});
  };

  const iconBtn =
    "p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer";

  return createPortal(
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label="Media viewer"
      className="fixed inset-0 z-[100] bg-black flex flex-col"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null || count < 2) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) (dx > 0 ? prev : next)();
        touchX.current = null;
      }}
    >
      <div
        className="flex items-center justify-between px-4 py-3 text-pearl"
        style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top))" }}
      >
        <span className="font-mono text-xs tracking-[0.3em]">
          {index + 1} / {count}
        </span>
        <div className="flex gap-2">
          {document.fullscreenEnabled && (
            <button type="button" onClick={toggleFullscreen} className={iconBtn} aria-label={fullscreen ? "Exit full screen" : "Full screen"}>
              {fullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
          )}
          <button type="button" onClick={close} className={iconBtn} aria-label="Close">
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Clicking the dark area around the photo or video closes the viewer */}
      <div
        className="relative flex-1 min-h-0 flex items-center justify-center px-4 pb-6"
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        {isVideo(src) ? (
          <video
            key={src}
            src={src}
            controls
            autoPlay
            playsInline
            className="max-w-full max-h-full rounded-xl"
          />
        ) : (
          <img
            key={src}
            src={src}
            alt={`Photo ${index + 1} of ${count}`}
            className="max-w-full max-h-full object-contain rounded-xl select-none"
          />
        )}

        {count > 1 && (
          <>
            <button type="button" onClick={prev} className={`${iconBtn} absolute left-3 md:left-6 top-1/2 -translate-y-1/2`} aria-label="Previous">
              <ChevronLeft size={24} />
            </button>
            <button type="button" onClick={next} className={`${iconBtn} absolute right-3 md:right-6 top-1/2 -translate-y-1/2`} aria-label="Next">
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
