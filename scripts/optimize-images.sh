#!/bin/bash
# Run with: npm run images  (macOS only: needs sips, plus cwebp from `brew install webp`)
#
# For every photo in src/assets/images:
#   - shrinks it to 2400px on the long side, for the full-screen viewer
#   - writes a small WebP to thumbs/, for the tiles on the page
# Originals are copied to the Desktop first. Photos already done are skipped,
# so it's safe to run again whenever new photos are added.
set -euo pipefail
cd "$(dirname "$0")/.."

DIR=src/assets/images
THUMBS=$DIR/thumbs
BACKUP="$HOME/Desktop/Bellarina-originals/images"
SRGB="/System/Library/ColorSync/Profiles/sRGB Profile.icc"
MAX=2400
THUMB=1200
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT

mkdir -p "$THUMBS" "$BACKUP"
shopt -s nullglob nocaseglob

prop() { sips -g "$1" "$2" | awk -v k="$1:" '$1 == k {print $2}'; }

for f in "$DIR"/*.jpg "$DIR"/*.jpeg "$DIR"/*.png; do
  name=$(basename "$f")
  ext=$(echo "${name##*.}" | tr '[:upper:]' '[:lower:]')
  w=$(prop pixelWidth "$f")
  h=$(prop pixelHeight "$f")
  long=$(( w > h ? w : h ))

  if [ "$long" -gt "$MAX" ]; then
    cp -n "$f" "$BACKUP/$name" || true
    if [ "$ext" = png ]; then opts=(-s format png); else opts=(-s format jpeg -s formatOptions 85); fi
    sips -m "$SRGB" -Z "$MAX" "${opts[@]}" "$f" --out "$TMP/full.$ext" >/dev/null
    mv "$TMP/full.$ext" "$f"
    echo "resized  $name"
  fi

  thumb="$THUMBS/$name.webp"
  if [ ! "$thumb" -nt "$f" ]; then
    # cwebp ignores EXIF rotation and colour profiles, so settle both first
    rotate=()
    case "$(prop orientation "$f")" in
      3) rotate=(-r 180) ;;
      6) rotate=(-r 90) ;;
      8) rotate=(-r 270) ;;
    esac
    sips -m "$SRGB" -Z "$THUMB" ${rotate[@]+"${rotate[@]}"} -s format png "$f" --out "$TMP/thumb.png" >/dev/null
    cwebp -quiet -q 80 -m 6 -sharp_yuv "$TMP/thumb.png" -o "$thumb"
    echo "thumb    $name"
  fi
done

# Drop thumbnails whose photo has been deleted
for t in "$THUMBS"/*.webp; do
  name=$(basename "$t" .webp)
  if [ ! -e "$DIR/$name" ]; then rm "$t"; echo "removed  thumbs/$name.webp"; fi
done
