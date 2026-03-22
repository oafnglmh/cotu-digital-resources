// ─── Cơ Tu colour palette ────────────────────────────────────────────────────
export const C = {
  earth:      "#8B3A1E",
  earthDeep:  "#5C1F08",
  gold:       "#C9821A",
  goldLight:  "#E8A832",
  goldPale:   "#F5D080",
  forest:     "#2D5A27",
  forestMid:  "#3D7A35",
  black:      "#1A0E08",
  cream:      "#FDF6E8",
  paper:      "#F7EED8",
  sand:       "#E8D4A8",
};

// ─── Framer Motion variants ──────────────────────────────────────────────────
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: .65, ease: [.22,1,.36,1] } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: .5 } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: .92 },
  show:   { opacity: 1, scale: 1,  transition: { duration: .5, ease: [.22,1,.36,1] } },
};

export const stagger = (delay = 0.1) => ({
  show: { transition: { staggerChildren: delay } },
});

// ─── YouTube URL → embed ─────────────────────────────────────────────────────
export function toEmbedUrl(url) {
  if (!url) return null;
  if (url.includes("/embed/")) return url;
  const m = url.match(/[?&]v=([\w-]+)/);
  if (m) return `https://www.youtube.com/embed/${m[1]}?rel=0&modestbranding=1`;
  const s = url.match(/youtu\.be\/([\w-]+)/);
  if (s) return `https://www.youtube.com/embed/${s[1]}?rel=0`;
  const v = url.match(/vimeo\.com\/(\d+)/);
  if (v) return `https://player.vimeo.com/video/${v[1]}`;
  return url;
}