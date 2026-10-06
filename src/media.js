// Photos live in src/assets/images (the Gallery), videos in src/assets/videos (Content Creation).
// .mov is left out: iPhone .MOV files are usually HEVC, which Chrome and Firefox
// can't play, so convert them to H.264 .mp4 first. Extensions are case-sensitive here.

// Keyed by path, e.g. "/src/assets/images/Bella 4.jpg"
export const imageModules = import.meta.glob(
  "/src/assets/images/*.{jpg,jpeg,png,webp,avif,gif,JPG,JPEG,PNG,WEBP}",
  { eager: true, import: "default" }
);

export const images = Object.values(imageModules);

export const videos = Object.values(
  import.meta.glob("/src/assets/videos/*.{mp4,MP4,webm,WEBM}", { eager: true, import: "default" })
);
