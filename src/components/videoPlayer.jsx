import { useEffect, useRef, useState } from "react";
import {
    Play,
    Pause,
    Volume2,
    VolumeX,
    Maximize2
} from "lucide-react";

export default function VideoPlayer({ src, onLoadedMetadata, onExpand }) {
    const videoRef = useRef();

    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(true);
    const [progress, setProgress] = useState(0);
    // Set when the visitor presses pause, so scrolling doesn't restart the video
    const pausedByUser = useRef(false);

    // Play while on screen, pause when scrolled away. The autoPlay attribute isn't
    // reliable here: React never writes `muted` into the HTML, and browsers (iPhone
    // Safari especially) won't autoplay a video they don't see as muted.
    useEffect(() => {
        const video = videoRef.current;
        video.muted = true;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !pausedByUser.current) {
                    video.play().catch(() => {});
                } else if (!entry.isIntersecting) {
                    video.pause();
                }
            },
            { threshold: 0.4 }
        );
        observer.observe(video);
        return () => observer.disconnect();
    }, []);

    const togglePlay = () => {
        const video = videoRef.current;

        if (video.paused) {
            pausedByUser.current = false;
            video.play().catch(() => {});
        } else {
            pausedByUser.current = true;
            video.pause();
        }
    };

    const toggleMute = () => {
        videoRef.current.muted = !muted;
        setMuted(!muted);
    };

    const updateProgress = () => {
        const video = videoRef.current;

        setProgress(
            (video.currentTime / video.duration) * 100
        );
    };

    return (
        <div className="group relative h-full">

            <video
                ref={videoRef}
                src={src}
                muted
                loop
                playsInline
                preload="metadata"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onTimeUpdate={updateProgress}
                onLoadedMetadata={onLoadedMetadata}
                onClick={onExpand}
                className={`w-full h-full object-cover ${onExpand ? "cursor-zoom-in" : ""}`}
            />

            <div
                className="
                    absolute
                    inset-x-0
                    bottom-0
                    p-4
                    opacity-100
                    md:opacity-0
                    md:group-hover:opacity-100
                    transition
                    bg-gradient-to-t
                    from-black/80
                    to-transparent
                "
            >

                <input
                    type="range"
                    value={progress}
                    max={100}
                    readOnly
                    className="w-full h-1 bg-white/20 rounded-full accent-gold"
                />

                <div className="flex justify-between items-center mt-2">

                    <button type="button" onClick={togglePlay} aria-label={playing ? "Pause video" : "Play video"} className="cursor-pointer">
                        {playing ? <Pause color="white" /> : <Play color="white" />}
                    </button>

                    <div className="flex items-center gap-4">
                        <button type="button" onClick={toggleMute} aria-label={muted ? "Unmute video" : "Mute video"} className="cursor-pointer">
                            {muted ? <VolumeX color="white" /> : <Volume2 color="white" />}
                        </button>

                        {onExpand && (
                            <button type="button" onClick={onExpand} aria-label="Watch full screen" className="cursor-pointer">
                                <Maximize2 color="white" />
                            </button>
                        )}
                    </div>

                </div>

            </div>

        </div>
    );
}