// src/components/Sections.jsx
// ─── All main content sections ──────────────────────────────────────────────
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  MapPin,
  Play,
  X,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import { C, fadeUp, scaleIn, stagger, toEmbedUrl } from "../tokens";
import { SectionTitle, TribalStrip, WovenBg, useReveal } from "./SharedUI";
import {
  LANG_DATA,
  TRANG_PHUC,
  LE_HOI,
  NGHE_THU_CONG,
  GALLERY,
} from "../data/mockData";

// ─── 1. Làng & Nhà Gươl ──────────────────────────────────────────────────────
export function LangSection() {
  const [ref, inView] = useReveal(0.08);
  return (
    <section
      id="lang"
      style={{
        padding: "100px 0",
        background: `linear-gradient(160deg,${C.black} 0%,#1e0d06 50%,${C.black} 100%)`,
        position: "relative",
      }}
    >
      <WovenBg opacity={0.6} />
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <SectionTitle
          label="Không gian sống"
          title={LANG_DATA.title}
          subtitle={LANG_DATA.desc}
          light
        />

        <motion.div
          ref={ref}
          variants={stagger(0.13)}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: 22,
          }}
        >
          {LANG_DATA.items.map((item) => (
            <motion.div
              key={item.id}
              variants={scaleIn}
              whileHover={{
                y: -8,
                boxShadow: `0 24px 60px rgba(0,0,0,.5),0 0 0 1px ${item.color}30`,
              }}
              style={{
                borderRadius: 16,
                overflow: "hidden",
                cursor: "pointer",
                background: `linear-gradient(160deg,rgba(139,58,30,.12),rgba(26,14,8,.82))`,
                border: `1px solid ${item.color}28`,
                transition: "box-shadow .3s ease",
              }}
            >
              {/* Image */}
              <div
                style={{
                  position: "relative",
                  height: 200,
                  overflow: "hidden",
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform .5s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.transform = "scale(1.07)")
                  }
                  onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                  onError={(e) => {
                    e.target.src = `https://placehold.co/400x200/3d1a08/c9821a?text=${encodeURIComponent(item.name)}`;
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top,rgba(26,14,8,.9),transparent 52%)",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: 12,
                    left: 12,
                    fontSize: 10,
                    padding: "3px 10px",
                    borderRadius: 20,
                    background: `${item.color}28`,
                    border: `1px solid ${item.color}50`,
                    color: C.goldPale,
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                    fontFamily: "'Crimson Pro',serif",
                  }}
                >
                  {item.tag}
                </span>
              </div>

              {/* Text */}
              <div style={{ padding: "18px 20px 22px" }}>
                <div
                  style={{
                    fontSize: 11,
                    color: C.gold,
                    letterSpacing: ".15em",
                    textTransform: "uppercase",
                    marginBottom: 5,
                    fontFamily: "'Crimson Pro',serif",
                  }}
                >
                  {item.subtitle}
                </div>
                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: C.goldPale,
                    fontFamily: "'Playfair Display',serif",
                    marginBottom: 10,
                    lineHeight: 1.2,
                  }}
                >
                  {item.name}
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    color: `${C.goldPale}68`,
                    lineHeight: 1.72,
                    fontFamily: "'Crimson Pro',serif",
                    fontStyle: "italic",
                  }}
                >
                  {item.desc}
                </p>
                <div
                  style={{
                    marginTop: 14,
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    color: C.gold,
                    fontSize: 12,
                    fontFamily: "'Crimson Pro',serif",
                  }}
                >
                  Tìm hiểu thêm <ChevronRight size={12} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── 2. Trang phục ────────────────────────────────────────────────────────────
export function TrangPhucSection() {
  const [ref, inView] = useReveal(0.08);
  const TAG_COLOR = {
    "Nữ phục": C.earth,
    "Lễ phục": C.gold,
    "Nam phục": C.forest,
    "Phụ kiện": C.goldLight,
    "Cổ phục": C.earthDeep,
  };

  return (
    <section
      id="trang-phuc"
      style={{
        padding: "100px 0",
        background: `linear-gradient(135deg,#1a0e08 0%,${C.earthDeep} 28%,#1a0e08 58%,#0d0602 100%)`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <TribalStrip size={4} />
      {/* Diagonal pattern bg */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.07,
          backgroundImage: `repeating-linear-gradient(45deg,${C.earth} 0,${C.earth} 1px,transparent 0,transparent 50%)`,
          backgroundSize: "20px 20px",
        }}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "80px 24px 0",
          position: "relative",
          zIndex: 1,
        }}
      >
        <SectionTitle
          label="Thổ cẩm Cơ Tu"
          title={TRANG_PHUC.title}
          subtitle={TRANG_PHUC.desc}
          light
        />

        <motion.div
          ref={ref}
          variants={stagger(0.07)}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
            gap: 18,
          }}
        >
          {TRANG_PHUC.items.map((item, i) => (
            <motion.div
              key={item.id}
              variants={fadeUp}
              whileHover={{
                scale: 1.02,
                boxShadow: `0 14px 42px rgba(0,0,0,.42)`,
              }}
              style={{
                borderRadius: 12,
                padding: "20px 22px",
                background: `linear-gradient(135deg,rgba(139,58,30,.17),rgba(26,14,8,.72))`,
                border: `1px solid ${C.earth}28`,
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
              }}
            >
              {/* Watermark number */}
              <div
                style={{
                  position: "absolute",
                  top: -10,
                  right: -8,
                  fontSize: 78,
                  fontWeight: 700,
                  color: `${C.earth}10`,
                  fontFamily: "'Playfair Display',serif",
                  lineHeight: 1,
                  userSelect: "none",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              {/* Left accent bar */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 3,
                  background: `linear-gradient(180deg,${C.gold},${C.earth})`,
                }}
              />

              <div style={{ position: "relative", zIndex: 1 }}>
                <span
                  style={{
                    fontSize: 9,
                    padding: "2px 8px",
                    borderRadius: 20,
                    background: `${TAG_COLOR[item.tag] || C.earth}22`,
                    border: `1px solid ${TAG_COLOR[item.tag] || C.earth}42`,
                    color: TAG_COLOR[item.tag] || C.gold,
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                    fontFamily: "'Crimson Pro',serif",
                    display: "inline-block",
                    marginBottom: 10,
                  }}
                >
                  {item.tag}
                </span>
                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    color: C.goldPale,
                    fontFamily: "'Playfair Display',serif",
                    marginBottom: 8,
                    lineHeight: 1.25,
                  }}
                >
                  {item.name}
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    color: `${C.goldPale}62`,
                    lineHeight: 1.72,
                    fontFamily: "'Crimson Pro',serif",
                    fontStyle: "italic",
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div style={{ marginTop: 80 }}>
        <TribalStrip size={4} />
      </div>
    </section>
  );
}

// ─── 3. Lễ hội ───────────────────────────────────────────────────────────────
export function LeHoiSection() {
  const [active, setActive] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [ref, inView] = useReveal(0.06);
  const item = LE_HOI.items[active];

  return (
    <section
      id="le-hoi"
      style={{ padding: "100px 0", background: C.black, position: "relative" }}
    >
      <WovenBg opacity={0.5} />
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <SectionTitle
          label="Văn hóa tín ngưỡng"
          title={LE_HOI.title}
          subtitle={LE_HOI.subtitle}
          light
        />

        {/* Tab selector */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "center",
            marginBottom: 44,
            flexWrap: "wrap",
          }}
        >
          {LE_HOI.items.map((h, i) => (
            <motion.button
              key={h.id}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setActive(i);
                setShowVideo(false);
              }}
              style={{
                padding: "10px 22px",
                borderRadius: 10,
                cursor: "pointer",
                fontFamily: "'Crimson Pro',serif",
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: ".03em",
                transition: "all .22s",
                background:
                  active === i
                    ? `linear-gradient(135deg,${h.color},${C.earthDeep})`
                    : "rgba(139,58,30,.1)",
                border: `1.5px solid ${active === i ? h.color : C.earth + "28"}`,
                color: active === i ? C.goldPale : `${C.goldPale}55`,
                boxShadow: active === i ? `0 4px 20px ${h.color}40` : "none",
              }}
            >
              {h.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Detail panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 0,
              background: `linear-gradient(135deg,rgba(139,58,30,.1),rgba(26,14,8,.72))`,
              border: `1px solid ${item.color}30`,
              borderRadius: 20,
              overflow: "hidden",
            }}
            className="two-col"
          >
            {/* LEFT: image / video */}
            <div
              style={{
                position: "relative",
                minHeight: 380,
                overflow: "hidden",
              }}
            >
              {showVideo && item.video ? (
                <iframe
                  src={toEmbedUrl(item.video)}
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                    minHeight: 380,
                  }}
                  allowFullScreen
                  allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture;web-share"
                />
              ) : (
                <>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      e.target.src = `https://placehold.co/600x400/3d1a08/c9821a?text=${encodeURIComponent(item.name)}`;
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top,rgba(26,14,8,.78),transparent 55%)",
                    }}
                  />
                  {/* Tag */}
                  <span
                    style={{
                      position: "absolute",
                      top: 16,
                      left: 16,
                      fontSize: 10,
                      padding: "3px 12px",
                      borderRadius: 20,
                      background: `${item.color}32`,
                      border: `1px solid ${item.color}55`,
                      color: C.goldPale,
                      letterSpacing: ".12em",
                      textTransform: "uppercase",
                      fontFamily: "'Crimson Pro',serif",
                    }}
                  >
                    {item.tag}
                  </span>
                  {/* Video button */}
                  {item.video && (
                    <motion.button
                      whileHover={{ scale: 1.07 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowVideo(true)}
                      style={{
                        position: "absolute",
                        bottom: 18,
                        left: 16,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "9px 18px",
                        borderRadius: 25,
                        background: "rgba(0,0,0,.75)",
                        border: `1px solid ${C.gold}50`,
                        color: C.goldPale,
                        fontSize: 12,
                        fontFamily: "'Crimson Pro',serif",
                        cursor: "pointer",
                        backdropFilter: "blur(6px)",
                      }}
                    >
                      <Play size={13} fill={C.goldPale} /> Xem Video Lễ Hội
                    </motion.button>
                  )}
                </>
              )}
            </div>

            {/* RIGHT: text */}
            <div
              style={{
                padding: "34px 30px 34px 28px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {/* Meta */}
              <div
                style={{
                  display: "flex",
                  gap: 18,
                  marginBottom: 16,
                  flexWrap: "wrap",
                }}
              >
                {[
                  { Icon: Clock, val: item.time },
                  { Icon: MapPin, val: item.location },
                ].map(({ Icon, val }, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 12,
                      color: `${C.goldPale}60`,
                      fontFamily: "'Crimson Pro',serif",
                    }}
                  >
                    <Icon size={13} style={{ color: C.gold }} />
                    {val}
                  </div>
                ))}
              </div>

              <h3
                style={{
                  fontSize: "clamp(22px,2.8vw,30px)",
                  fontWeight: 700,
                  color: C.goldPale,
                  fontFamily: "'Playfair Display',serif",
                  lineHeight: 1.2,
                  marginBottom: 12,
                }}
              >
                {item.name}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: `${C.goldPale}72`,
                  lineHeight: 1.75,
                  fontFamily: "'Crimson Pro',serif",
                  fontStyle: "italic",
                  marginBottom: 20,
                }}
              >
                {item.desc}
              </p>

              <div
                style={{
                  fontSize: 10,
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                  color: C.gold,
                  fontFamily: "'Crimson Pro',serif",
                  marginBottom: 10,
                }}
              >
                Ý nghĩa
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {item.meanings.map((m, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "flex-start",
                      fontSize: 13,
                      color: `${C.goldPale}68`,
                      fontFamily: "'Crimson Pro',serif",
                      lineHeight: 1.58,
                    }}
                  >
                    <div
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: 1,
                        background: C.gold,
                        transform: "rotate(45deg)",
                        flexShrink: 0,
                        marginTop: 5,
                      }}
                    />
                    {m}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── 4. Nghề thủ công ────────────────────────────────────────────────────────
export function NgheSection() {
  const [ref, inView] = useReveal();
  return (
    <section
      id="nghe"
      style={{
        padding: "100px 0",
        background: `linear-gradient(135deg,${C.earthDeep} 0%,#1a0e08 48%,${C.forest}20 100%)`,
        position: "relative",
      }}
    >
      <TribalStrip size={4} />
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "80px 24px 0",
          position: "relative",
          zIndex: 1,
        }}
      >
        <SectionTitle
          label="Kỹ nghệ cổ truyền"
          title="Nghề Thủ Công Truyền Thống"
          subtitle="Đôi tay khéo léo dệt nên văn hóa"
          light
        />

        <motion.div
          ref={ref}
          variants={stagger(0.1)}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
            gap: 20,
          }}
        >
          {NGHE_THU_CONG.items.map((item) => (
            <motion.div
              key={item.id}
              variants={scaleIn}
              whileHover={{
                y: -6,
                boxShadow: `0 20px 50px rgba(0,0,0,.4),0 0 0 1px ${C.gold}1a`,
              }}
              style={{
                borderRadius: 14,
                padding: "28px 22px",
                textAlign: "center",
                cursor: "pointer",
                background: "rgba(255,255,255,.028)",
                border: `1px solid ${C.earth}22`,
                transition: "box-shadow .3s ease",
              }}
            >
              <div style={{ fontSize: 42, marginBottom: 14 }}>{item.icon}</div>
              <span
                style={{
                  fontSize: 9,
                  padding: "2px 8px",
                  borderRadius: 20,
                  background: "rgba(201,130,26,.16)",
                  border: `1px solid ${C.gold}30`,
                  color: C.gold,
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                  fontFamily: "'Crimson Pro',serif",
                  display: "inline-block",
                  marginBottom: 10,
                }}
              >
                {item.heritage}
              </span>
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: C.goldPale,
                  fontFamily: "'Playfair Display',serif",
                  marginBottom: 10,
                  lineHeight: 1.25,
                }}
              >
                {item.name}
              </h3>
              <p
                style={{
                  fontSize: 13,
                  color: `${C.goldPale}58`,
                  lineHeight: 1.68,
                  fontFamily: "'Crimson Pro',serif",
                  fontStyle: "italic",
                }}
              >
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div style={{ marginTop: 80 }}>
        <TribalStrip size={4} />
      </div>
    </section>
  );
}

// ─── 5. Gallery ───────────────────────────────────────────────────────────────
export function GallerySection() {
  const [selected, setSelected] = useState(null);
  const [ref, inView] = useReveal(0.05);

  return (
    <section id="gallery" style={{ padding: "100px 0", background: C.black }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <SectionTitle
          label="Ký ức hình ảnh"
          title="Hình Ảnh Di Sản"
          subtitle="Mỗi bức ảnh là một câu chuyện về con người và văn hóa Cơ Tu"
          light
        />

        <motion.div
          ref={ref}
          variants={stagger(0.06)}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 14,
          }}
          className="three-col"
        >
          {GALLERY.map((img, i) => (
            <motion.div
              key={img.id}
              variants={fadeUp}
              whileHover={{ scale: 1.025, zIndex: 2 }}
              onClick={() => setSelected(img)}
              style={{
                position: "relative",
                borderRadius: 12,
                overflow: "hidden",
                cursor: "pointer",
                aspectRatio: i === 0 || i === 3 ? "16/10" : "4/3",
                border: `1px solid ${C.earth}22`,
              }}
            >
              <img
                src={img.src}
                alt={img.caption}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform .5s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.07)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
                onError={(e) => {
                  e.target.src = `https://placehold.co/400x300/3d1a08/c9821a?text=${encodeURIComponent(img.caption)}`;
                }}
              />
              {/* Tag badge */}
              <span
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  fontSize: 9,
                  padding: "2px 8px",
                  borderRadius: 20,
                  background: "rgba(26,14,8,.75)",
                  border: `1px solid ${C.gold}30`,
                  color: C.gold,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  fontFamily: "'Crimson Pro',serif",
                }}
              >
                {img.tag}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99999,
              background: "rgba(0,0,0,.92)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 24,
            }}
          >
            <motion.div
              initial={{ scale: 0.88 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.88 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                borderRadius: 14,
                overflow: "hidden",
                maxWidth: 820,
                width: "100%",
                border: `1px solid ${C.earth}44`,
              }}
            >
              <img
                src={selected.src}
                alt={selected.caption}
                style={{
                  width: "100%",
                  display: "block",
                  maxHeight: "70vh",
                  objectFit: "cover",
                }}
              />
              <div
                style={{
                  padding: "14px 18px",
                  background: "rgba(26,14,8,.97)",
                }}
              >
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: C.goldPale,
                    fontFamily: "'Playfair Display',serif",
                  }}
                >
                  {selected.caption}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: C.gold,
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                    marginTop: 3,
                  }}
                >
                  {selected.tag}
                </div>
              </div>
            </motion.div>
            <button
              onClick={() => setSelected(null)}
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                background: "rgba(139,58,30,.4)",
                border: `1px solid ${C.earth}`,
                borderRadius: "50%",
                width: 36,
                height: 36,
                color: C.goldPale,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <X size={15} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── 6. Contact / Giao lưu ───────────────────────────────────────────────────
export function ContactSection() {
  const [ref, inView] = useReveal();
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", msg: "" });
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 10,
    background: "rgba(139,58,30,.1)",
    border: `1px solid ${C.earth}32`,
    color: C.goldPale,
    fontSize: 14,
    fontFamily: "'Crimson Pro',serif",
    outline: "none",
    boxSizing: "border-box",
    transition: "border .2s",
  };

  return (
    <section
      id="contact"
      style={{
        padding: "100px 0",
        background: `linear-gradient(160deg,#1a0e08,${C.earthDeep}25,#0d0602)`,
        position: "relative",
      }}
    >
      <TribalStrip size={4} />
      <div
        style={{
          maxWidth: 680,
          margin: "0 auto",
          padding: "80px 24px 0",
          position: "relative",
          zIndex: 1,
        }}
      >
        <SectionTitle
          label="Kết nối & Giao lưu"
          title="Thắc Mắc & Trao Đổi"
          subtitle="Gửi câu hỏi hoặc chia sẻ cảm nhận về văn hóa Cơ Tu"
          light
        />

        <motion.form
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.6 }}
          onSubmit={submit}
          style={{
            borderRadius: 18,
            padding: "36px",
            background: "rgba(255,255,255,.028)",
            border: `1px solid ${C.earth}32`,
            backdropFilter: "blur(8px)",
          }}
        >
          {[
            {
              key: "name",
              label: "Họ và tên",
              placeholder: "Nguyễn Văn A",
              type: "text",
            },
            {
              key: "email",
              label: "Email",
              placeholder: "email@example.com",
              type: "email",
            },
          ].map((f) => (
            <div key={f.key} style={{ marginBottom: 18 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 11,
                  letterSpacing: ".15em",
                  textTransform: "uppercase",
                  color: C.gold,
                  marginBottom: 6,
                  fontFamily: "'Crimson Pro',serif",
                }}
              >
                {f.label}
              </label>
              <input
                type={f.type}
                placeholder={f.placeholder}
                value={form[f.key]}
                required
                onChange={(e) =>
                  setForm((p) => ({ ...p, [f.key]: e.target.value }))
                }
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = C.gold)}
                onBlur={(e) => (e.target.style.borderColor = `${C.earth}32`)}
              />
            </div>
          ))}

          <div style={{ marginBottom: 22 }}>
            <label
              style={{
                display: "block",
                fontSize: 11,
                letterSpacing: ".15em",
                textTransform: "uppercase",
                color: C.gold,
                marginBottom: 6,
                fontFamily: "'Crimson Pro',serif",
              }}
            >
              Nội dung
            </label>
            <textarea
              placeholder="Thắc mắc hoặc chia sẻ của bạn..."
              rows={4}
              value={form.msg}
              required
              onChange={(e) => setForm((p) => ({ ...p, msg: e.target.value }))}
              style={{ ...inputStyle, resize: "vertical" }}
              onFocus={(e) => (e.target.style.borderColor = C.gold)}
              onBlur={(e) => (e.target.style.borderColor = `${C.earth}32`)}
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{
              scale: 1.02,
              boxShadow: `0 6px 26px rgba(139,58,30,.5)`,
            }}
            whileTap={{ scale: 0.97 }}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: 12,
              background: sent
                ? `linear-gradient(135deg,${C.forest},#1e4a19)`
                : `linear-gradient(135deg,${C.earth},${C.earthDeep})`,
              border: `1px solid ${sent ? C.forest : C.gold}38`,
              color: C.goldPale,
              fontSize: 15,
              fontFamily: "'Crimson Pro',serif",
              fontWeight: 700,
              letterSpacing: ".04em",
              transition: "background .3s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            {sent ? (
              "✓ Đã gửi thành công!"
            ) : (
              <>
                <MessageCircle size={15} /> Gửi tin nhắn
              </>
            )}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}

// ─── 7. Footer ────────────────────────────────────────────────────────────────
export function Footer() {
  return (
    <footer
      style={{
        background: `linear-gradient(160deg,#0d0602,#1a0e08)`,
        borderTop: `1px solid ${C.earth}28`,
      }}
    >
      <TribalStrip size={4} />
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "52px 24px 36px",
          textAlign: "center",
        }}
      >
        {/* Logo text */}
        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: C.goldPale,
            fontFamily: "'Playfair Display',serif",
            marginBottom: 6,
          }}
        >
          Cơ Tu Heritage
        </div>
        <div
          style={{
            fontSize: 11,
            color: `${C.goldPale}40`,
            letterSpacing: ".18em",
            textTransform: "uppercase",
            marginBottom: 26,
          }}
        >
          Di Sản Văn Hóa · Tây Giang · Quảng Nam
        </div>

        {/* Diamond row */}
        <div
          style={{
            display: "flex",
            gap: 8,
            justifyContent: "center",
            marginBottom: 26,
          }}
        >
          {Array.from({ length: 9 }, (_, i) => (
            <div
              key={i}
              style={{
                width: 9,
                height: 9,
                background:
                  i % 3 === 0 ? C.earth : i % 3 === 1 ? C.gold : C.forest,
                transform: "rotate(45deg)",
                opacity: 0.6,
              }}
            />
          ))}
        </div>

        {/* Links */}
        <div
          style={{
            display: "flex",
            gap: 20,
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: 24,
          }}
        >
          {[
            "Làng & Nhà Gươl",
            "Trang Phục",
            "Lễ Hội",
            "Nghề Thủ Công",
            "Hình Ảnh",
          ].map((label) => (
            <span
              key={label}
              style={{
                fontSize: 12,
                color: `${C.goldPale}38`,
                cursor: "pointer",
                fontFamily: "'Crimson Pro',serif",
                transition: "color .18s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.gold)}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = `${C.goldPale}38`)
              }
            >
              {label}
            </span>
          ))}
        </div>

        <div
          style={{
            fontSize: 12,
            color: `${C.goldPale}28`,
            fontFamily: "'Crimson Pro',serif",
          }}
        >
          © 2025 Cơ Tu Heritage · Bảo tồn và phát huy di sản văn hóa người Cơ Tu
        </div>
      </div>
    </footer>
  );
}

const MODELS_3D = [
  {
    id: 1,
    title: "Guol House Aka",
    subtitle: "Toàn cảnh Nhà Gươl",
    src: "https://sketchfab.com/models/d8239ce423eb493c8942d3ae427e2046/embed?autostart=1&internal=1&tracking=0&ui_ar=0&ui_infos=0&ui_snapshots=1&ui_stop=0&ui_theatre=1&ui_watermark=0",
    href: "https://sketchfab.com/3d-models/guol-house-aka-d8239ce423eb493c8942d3ae427e2046",
    desc: "Mô hình 3D toàn cảnh Nhà Gươl — công trình kiến trúc linh hồn của làng Cơ Tu.",
  },
  {
    id: 2,
    title: "Guol House Column",
    subtitle: "Chi tiết cột Nhà Gươl",
    src: "https://sketchfab.com/models/038d4ef6cde24b05a0d097e21a0c3ed9/embed?autostart=1&internal=1&tracking=0&ui_infos=0&ui_snapshots=1&ui_stop=0&ui_theatre=1&ui_watermark=0",
    href: "https://sketchfab.com/3d-models/guol-house-column-038d4ef6cde24b05a0d097e21a0c3ed9",
    desc: "Chi tiết hoa văn chạm khắc trên cột Nhà Gươl — nơi lưu giữ tín ngưỡng và nghệ thuật Cơ Tu.",
  },
];

export function Model3DSection() {
  const [ref, inView] = useReveal(0.06);
  const [loaded, setLoaded] = useState({ 1: false, 2: false });

  const markLoaded = (id) => setLoaded((prev) => ({ ...prev, [id]: true }));

  return (
    <section
      id="model3d"
      style={{
        padding: "100px 0",
        background: `linear-gradient(160deg, #1e0d06 0%, ${C.earthDeep}22 50%, #1a0e08 100%)`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <WovenBg opacity={0.45} />

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <SectionTitle
          label="Kiến trúc dân gian · 3D"
          title="Nhà Gươl — Mô Hình 3D"
          subtitle="Xoay, phóng to, quan sát kiến trúc linh hồn làng Cơ Tu từ mọi góc độ"
          light
        />

        {/* 2-column grid — stack về 1 col trên mobile */}
        <motion.div
          ref={ref}
          variants={stagger(0.14)}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(480px, 1fr))",
            gap: 24,
          }}
        >
          {MODELS_3D.map((model) => (
            <motion.div
              key={model.id}
              variants={scaleIn}
              whileHover={{
                y: -4,
                boxShadow: `0 24px 60px rgba(0,0,0,.55), 0 0 0 1px ${C.gold}18`,
              }}
              style={{
                borderRadius: 18,
                overflow: "hidden",
                border: `1.5px solid ${C.earth}40`,
                background: `linear-gradient(160deg, rgba(139,58,30,.1), rgba(26,14,8,.88))`,
                transition: "box-shadow .3s ease",
              }}
            >
              {/* ── Top label bar ── */}
              <div
                style={{
                  padding: "11px 18px",
                  background: `linear-gradient(90deg, rgba(139,58,30,.42), rgba(26,14,8,.92))`,
                  borderBottom: `1px solid ${C.earth}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {/* Traffic-light dots + label */}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {[C.earth, C.gold, C.forest].map((c, i) => (
                    <div
                      key={i}
                      style={{
                        width: 9,
                        height: 9,
                        borderRadius: "50%",
                        background: c,
                        opacity: 0.88,
                      }}
                    />
                  ))}
                  <span
                    style={{
                      fontSize: 12,
                      color: `${C.goldPale}75`,
                      fontFamily: "'Crimson Pro', serif",
                      letterSpacing: ".05em",
                      marginLeft: 4,
                    }}
                  >
                    {model.subtitle}
                  </span>
                </div>

                {/* Badge */}
                <span
                  style={{
                    fontSize: 9,
                    padding: "2px 9px",
                    borderRadius: 20,
                    background: "rgba(201,130,26,.18)",
                    border: `1px solid ${C.gold}32`,
                    color: C.gold,
                    letterSpacing: ".15em",
                    textTransform: "uppercase",
                    fontFamily: "'Crimson Pro', serif",
                  }}
                >
                  3D · Vật thể
                </span>
              </div>

              {/* ── Iframe 16:9 ── */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  paddingBottom: "56.25%",
                }}
              >
                Loading spinner
                {!loaded[model.id] && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      zIndex: 2,
                      background: `linear-gradient(135deg, #1a0e08, ${C.earthDeep}28)`,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 14,
                    }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1.4,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        border: `3px solid ${C.earth}35`,
                        borderTopColor: C.gold,
                      }}
                    />
                    <span
                      style={{
                        fontSize: 12,
                        color: `${C.goldPale}45`,
                        fontFamily: "'Crimson Pro', serif",
                        fontStyle: "italic",
                      }}
                    >
                      Đang tải mô hình 3D...
                    </span>
                  </div>
                )}
                <SketchfabFrame
                  src={model.src}
                  title={model.title}
                  onLoad={() => markLoaded(model.id)}
                />
              </div>

              {/* ── Bottom info bar ── */}
              <div
                style={{
                  padding: "13px 18px",
                  background: "rgba(26,14,8,.96)",
                  borderTop: `1px solid ${C.earth}25`,
                }}
              >
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: C.goldPale,
                    fontFamily: "'Playfair Display', serif",
                    marginBottom: 4,
                  }}
                >
                  {model.title}
                </div>

                <p
                  style={{
                    fontSize: 12,
                    color: `${C.goldPale}52`,
                    fontFamily: "'Crimson Pro', serif",
                    fontStyle: "italic",
                    lineHeight: 1.58,
                    marginBottom: 10,
                  }}
                >
                  {model.desc}
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 6,
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      color: `${C.goldPale}32`,
                      fontFamily: "'Crimson Pro', serif",
                    }}
                  >
                    🖱 Kéo để xoay · Scroll để zoom
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div style={{ marginTop: 80 }}>
        <TribalStrip size={4} />
      </div>

      {/* Responsive: 1 col on mobile */}
      <style>{`
        @media (max-width: 640px) {
          #model3d div[style*="repeat(auto-fit"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
function SketchfabFrame({ src, title, onLoad }) {
  const iframeRef = useRef(null);

  useEffect(() => {
    const el = iframeRef.current;
    if (!el) return;
    el.setAttribute("frameborder", "0");
    el.setAttribute("allowfullscreen", "true");
    el.setAttribute("mozallowfullscreen", "true");
    el.setAttribute("webkitallowfullscreen", "true");
    el.setAttribute("allow", "autoplay; fullscreen; xr-spatial-tracking");
    el.setAttribute("xr-spatial-tracking", "");
    el.setAttribute("execution-while-out-of-viewport", "");
    el.setAttribute("execution-while-not-rendered", "");
    el.setAttribute("web-share", "");
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src={src}
      title={title}
      onLoad={onLoad}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        border: "none",
      }}
    />
  );
}
