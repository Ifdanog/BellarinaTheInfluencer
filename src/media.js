// Photos live in src/assets/images (the Gallery), videos in src/assets/videos (Content Creation).
// .mov is left out: iPhone .MOV files are usually HEVC, which Chrome and Firefox
// can't play, so convert them to H.264 .mp4 first. Extensions are case-sensitive here.

// Keyed by path, e.g. "/src/assets/images/Bella 4.jpg"
export const imageModules = import.meta.glob(
  "/src/assets/images/*.{jpg,jpeg,png,webp,avif,gif,JPG,JPEG,PNG,WEBP}",
  { eager: true, import: "default" }
);

export const images = Object.values(imageModules);

// Small WebP versions made by `npm run images`. Tiles use these; the full-screen
// viewer uses the full photo. A photo with no thumbnail yet just shows in full.
const thumbModules = import.meta.glob("/src/assets/images/thumbs/*.webp", {
  eager: true,
  import: "default",
});

const thumbs = new Map(
  Object.entries(imageModules).map(([path, src]) => {
    const name = path.split("/").pop();
    return [src, thumbModules[`/src/assets/images/thumbs/${name}.webp`]];
  })
);

export const thumbFor = (src) => thumbs.get(src) ?? src;

// What each photo shows, for search engines and screen readers.
// New photos get the plain fallback until they're described here.
const DESCRIPTIONS = {
  "Bella (1).JPG": "Isabella Amaobi seated on a brown velvet sofa in a black floor-length gown with long cape sleeves and red heels",
  "Bella (2).JPG": "Isabella Amaobi in a black gown and diamond necklace on a brown sofa, one hand resting on her chest",
  "Bella (3).JPG": "Isabella Amaobi in a black gown with long cape sleeves, posed on a white sculpted bench",
  "Bella (4).JPG": "Isabella Amaobi standing on a white staircase in a black floor-length gown with long cape sleeves and red heels",
  "Bella (5).JPG": "Isabella Amaobi in a black gown looking over her shoulder, her shadow cast on a burnt orange wall",
  "Bella (6).JPG": "Close-up of Isabella Amaobi smiling with burgundy curls and a diamond necklace, reaching towards the camera",
  "Bella (7).JPG": "Isabella Amaobi in a black gown with burgundy curls, applying lip gloss",
  "Bella 13.jpg": "Isabella Amaobi leaning forward with hands clasped in a black crop top and light blue flared jeans",
  "Bella 15.jpg": "Isabella Amaobi seated side-on in a black crop top and jeans, smiling over her shoulder",
  "Bella 16.jpg": "Isabella Amaobi seated and laughing, looking down, in a black crop top and jeans",
  "Bella 17.jpg": "Isabella Amaobi seated and smiling with her hands on her knees, in a black crop top and jeans",
  "Bella 18.jpg": "Isabella Amaobi seated and smiling with her hands on her thighs, in a black crop top and jeans",
  "Bella 3.jpg": "Three-quarter profile of Isabella Amaobi in a black crop top and jeans, looking at the camera",
  "Bella 4.jpg": "Full-length side profile of Isabella Amaobi in a black crop top, light blue flared jeans and heels",
  "Bella 5.jpg": "Full-length portrait of Isabella Amaobi facing the camera with one hand on her hip, in a black crop top and flared jeans",
  "Bella 6.jpg": "Full-length portrait of Isabella Amaobi facing the camera in a black crop top and flared jeans",
  "Bella 7.jpg": "Headshot of Isabella Amaobi smiling, with braided hair and a black top",
  "Bella1.jpg": "Full-length portrait of Isabella Amaobi with her arms crossed, in a black crop top and flared jeans",
  "IMG_0942.jpg": "Isabella Amaobi outdoors with a golden orange afro, in a studded corset top and black flared trousers",
  "Isabella.png": "Portrait of Isabella Amaobi with her chin on her hand, styled braids, a black top, beaded necklaces and gold bangles",
  "YUN_0956.JPG": "Editorial collage of Isabella Amaobi in a long black coat, white shirt and black tie",
  "YUN_0963.JPG": "Isabella Amaobi in a black blazer and white shirt beside a busy road, hand raised to her chin",
  "YUN_0975.JPG": "Black and white photo of Isabella Amaobi seated at the roadside in a dark coat and white knee-high boots",
};

const descriptions = new Map(
  Object.entries(imageModules).map(([path, src]) => [src, DESCRIPTIONS[path.split("/").pop()]])
);

export const altFor = (src) => descriptions.get(src) ?? "Isabella Amaobi, Bellarina TheInfluencer";

export const videos = Object.values(
  import.meta.glob("/src/assets/videos/*.{mp4,MP4,webm,WEBM}", { eager: true, import: "default" })
);
