import { useRef, useState } from "react";
import {
    Play,
    Pause,
    Volume2,
    VolumeX
} from "lucide-react";

export default function VideoPlayer({ src }) {
    const videoRef = useRef();

    const [playing, setPlaying] = useState(true);
    const [muted, setMuted] = useState(true);
    const [progress, setProgress] = useState(0);

    const togglePlay = () => {
        const video = videoRef.current;

        if (video.paused) {
            video.play();
            setPlaying(true);
        } else {
            video.pause();
            setPlaying(false);
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
                autoPlay
                muted
                loop
                playsInline
                onTimeUpdate={updateProgress}
                className="w-full h-full object-cover"
            />

            <div
                className="
                    absolute
                    inset-x-0
                    bottom-0
                    p-4
                    opacity-0
                    group-hover:opacity-100
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

                    <button type="button" onClick={toggleMute} aria-label={muted ? "Unmute video" : "Mute video"} className="cursor-pointer">
                        {muted ? <VolumeX color="white" /> : <Volume2 color="white" />}
                    </button>

                </div>

            </div>

        </div>
    );
}