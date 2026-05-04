import { useState, useEffect, useCallback, useRef } from "react";
import imgso1 from "../../../../public/assets/so1.png";
import imgso2 from "../../../../public/assets/so2.png";
import imgso3 from "../../../../public/assets/so3.png";
import imgso4 from "../../../../public/assets/so4.png"
import imgso5 from "../../../../public/assets/so5.png"
import imgso6 from "../../../../public/assets/so6.png"
import imgso7 from "../../../../public/assets/so7.png"
import imgso8 from "../../../../public/assets/so8.png"
import imgso9 from "../../../../public/assets/so9.png"
import imgso10 from "../../../../public/assets/so10.png"
import imgso11 from "../../../../public/assets/so11.png"
import imgso12 from "../../../../public/assets/so12.png"
import imgso13 from "../../../../public/assets/so13.png"
import imgso14 from "../../../../public/assets/so14.png"
import imgso15 from "../../../../public/assets/so15.png"
import imgso16 from "../../../../public/assets/so16.png"
import imgso17 from "../../../../public/assets/so17.png"
import imgso18 from "../../../../public/assets/so18.png"
import imgso19 from "../../../../public/assets/so19.png"
import imgso20 from "../../../../public/assets/so20.png"
import iumgTeam from "../../../../public/assets/imgteam.png"
// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const C = {
  forest:    "#1a3a1f",
  forestMid: "#2d5a34",
  forestLight:"#4a8a54",
  leaf:      "#6dbf72",
  leafLight: "#9fd9a3",
  bark:      "#5c3d1e",
  barkLight: "#8b5e3c",
  moss:      "#3d6b42",
  earth:     "#7a5c3a",
  clay:      "#c47c3a",
  gold:      "#d4a843",
  goldLight: "#f0c96b",
  cream:     "#f5eed8",
  creamSoft: "#ede0bc",
  sky:       "#c8dfc8",
  shadow:    "rgba(10,25,12,0.92)",
  ink:       "#0e1e0f",
  white:     "#ffffff",
  textMain:  "#e8f4e8",
  textSoft:  "rgba(220,245,220,0.78)",
  textMuted: "rgba(180,220,180,0.55)",
};

// ─── GOOGLE FONTS IMPORT ──────────────────────────────────────────────────────
const fontImport = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=Be+Vietnam+Pro:wght@300;400;500;600;700&display=swap');
`;

// ─── CƠ TU GEOMETRIC PATTERNS ─────────────────────────────────────────────────
function CoTuBorder({ vertical = false, color = C.gold, opacity = 0.6 }) {
  const diamonds = Array.from({ length: 40 });
  return (
    <div style={{
      display: "flex",
      flexDirection: vertical ? "column" : "row",
      alignItems: "center",
      gap: 0,
      overflow: "hidden",
    }}>
      {diamonds.map((_, i) => {
        const colors = [C.gold, C.leaf, C.clay, C.leafLight, C.gold, C.moss];
        const c = colors[i % colors.length];
        const s = [5,8,5,6,10,6,5,8,5][i % 9];
        return (
          <div key={i} style={{
            width: s, height: s,
            background: c,
            transform: "rotate(45deg)",
            flexShrink: 0,
            opacity: 0.7 + (i % 3) * 0.1,
            margin: vertical ? "2px 0" : "0 2px",
          }} />
        );
      })}
    </div>
  );
}

function CoTuTriangleStrip({ height = 14 }) {
  return (
    <svg width="100%" height={height} viewBox={`0 0 800 ${height}`} preserveAspectRatio="none"
      style={{ display: "block", flexShrink: 0 }}>
      {Array.from({ length: 50 }).map((_, i) => {
        const colors = [C.gold, C.leaf, C.clay, C.leafLight, C.moss, C.goldLight];
        const col = colors[i % colors.length];
        const x = i * 16;
        const down = i % 2 === 0;
        const pts = down
          ? `${x},0 ${x+16},0 ${x+8},${height}`
          : `${x},${height} ${x+16},${height} ${x+8},0`;
        return <polygon key={i} points={pts} fill={col} opacity="0.75" />;
      })}
    </svg>
  );
}

function CoTuDiamond({ size = 12, color = C.gold }) {
  return (
    <div style={{
      width: size, height: size,
      background: color,
      transform: "rotate(45deg)",
      flexShrink: 0,
      boxShadow: `0 0 ${size}px ${color}66`,
    }} />
  );
}

function DiamondRow({ gap = 8 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap }}>
      {[6,4,8,12,8,4,6].map((s, i) => (
        <CoTuDiamond key={i} size={s} color={[C.gold,C.leaf,C.goldLight,C.gold,C.clay,C.leaf,C.gold][i]} />
      ))}
    </div>
  );
}

function SectionDivider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "10px 0" }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${C.gold}88)` }} />
      <DiamondRow gap={5} />
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${C.gold}88)` }} />
    </div>
  );
}

function ImageSlider({ images }) {
  const [cur, setCur] = useState(0);
  const [hovered, setHovered] = useState(false);
  const timerRef = useRef(null);
 
  const total = images.length;
 
  const go = useCallback((idx) => {
    setCur((idx + total) % total);
  }, [total]);
 
  useEffect(() => {
    if (hovered) {
      clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => go(cur + 1), 5000);
    return () => clearInterval(timerRef.current);
  }, [cur, hovered, go]);
 
  const img = images[cur];
 
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
      {/* Slide area */}
      <div
        style={{
          width: "100%",
          height: 480,
          position: "relative",
          border: `1px solid ${C.gold}44`,
          borderRadius: 4,
          overflow: "hidden",
          cursor: "pointer",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Slides */}
        {images.map((image, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              opacity: i === cur ? 1 : 0,
              transition: "opacity 0.5s ease",
              backgroundImage: `url('${image.url}')`,
              backgroundSize: "cover",
              backgroundPosition: "center top",
              backgroundColor: "#1a3a1f",
            }}
          />
        ))}
 
        {/* Gradient overlay luôn hiện */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(10,25,12,0.6) 0%, transparent 40%)",
            pointerEvents: "none",
          }}
        />
 
        {/* Caption — hiện khi hover */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "36px 14px 14px",
            background: "linear-gradient(to top, rgba(5,15,7,0.95) 0%, rgba(5,15,7,0.5) 60%, transparent 100%)",
            transform: hovered ? "translateY(0)" : "translateY(100%)",
            transition: "transform 0.3s ease",
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 600, color: C.cream, marginBottom: 4 }}>
            {img.title}
          </div>
          <div style={{ fontSize: 11, color: "#b0c8b0", lineHeight: 1.45, marginBottom: 4 }}>
            {img.caption}
          </div>
          {img.source && (
            <div style={{ fontSize: 10, color: C.textMuted }}>
              {img.source}
            </div>
          )}
        </div>
 
        {/* Prev / Next arrows */}
        <button
          onClick={(e) => { e.stopPropagation(); go(cur - 1); }}
          style={arrowStyle("left")}
        >
          ‹
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); go(cur + 1); }}
          style={arrowStyle("right")}
        >
          ›
        </button>
 
        {/* Auto-progress bar */}
        {!hovered && (
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "rgba(255,255,255,0.1)" }}>
            <div
              key={cur}
              style={{
                height: "100%",
                background: C.goldLight,
                animation: "progress5s 5s linear forwards",
              }}
            />
          </div>
        )}
      </div>
 
      {/* Dots + counter */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
        <div style={{ display: "flex", gap: 5 }}>
          {images.map((_, i) => (
            <div
              key={i}
              onClick={() => go(i)}
              style={{
                width: i === cur ? 16 : 6,
                height: 6,
                borderRadius: 3,
                background: i === cur ? C.goldLight : `${C.goldLight}44`,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            />
          ))}
        </div>
        <span style={{ fontSize: 10, color: C.textMuted }}>
          {cur + 1} / {total}
        </span>
      </div>
 
      <style>{`@keyframes progress5s { from { width: 0% } to { width: 100% } }`}</style>
    </div>
  );
}
 
function arrowStyle(side) {
  return {
    position: "absolute",
    top: "50%",
    [side]: 8,
    transform: "translateY(-50%)",
    width: 28,
    height: 28,
    borderRadius: "50%",
    border: `1px solid ${C.gold}66`,
    background: "rgba(10,25,12,0.7)",
    color: C.goldLight,
    fontSize: 20,
    lineHeight: 1,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  };
}

// ─── PAGE SHELL ───────────────────────────────────────────────────────────────
function PageShell({ children, bgVariant = "a", style = {} }) {
  const bgs = {
    a: `linear-gradient(155deg, #0d2010 0%, #152918 25%, #1a3a1f 50%, #122015 75%, #0a1a0c 100%)`,
    b: `linear-gradient(145deg, #0a1a0c 0%, #172b1a 30%, #1e3d24 55%, #152918 80%, #0d2010 100%)`,
    c: `linear-gradient(165deg, #111d0e 0%, #1a3015 30%, #243d1a 55%, #1a3015 80%, #0e190b 100%)`,
  };
  return (
    <div style={{
      width: "100%", height: "100%",
      position: "relative", overflow: "hidden",
      background: bgs[bgVariant],
      fontFamily: "'Be Vietnam Pro','Lora',serif",
      ...style,
    }}>
      {/* Texture overlay */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.03,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Cpath d='M0 0h1v1H0zm2 2h1v1H2z' fill='%23a0d4a0'/%3E%3C/svg%3E")`,
      }} />
      {/* Radial light */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse at 30% 40%, rgba(74,138,84,0.15) 0%, transparent 55%),
                     radial-gradient(ellipse at 75% 70%, rgba(212,168,67,0.08) 0%, transparent 45%)`,
        pointerEvents: "none",
      }} />
      {/* Top & bottom border strips */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0 }}>
        <CoTuTriangleStrip height={12} />
      </div>
      <div style={{
        position: "absolute", top: 16, left: 14, right: 14,
        height: 2,
        background: `linear-gradient(to right, transparent, ${C.gold}99, ${C.leaf}88, ${C.gold}99, transparent)`,
      }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, transform: "scaleY(-1)" }}>
        <CoTuTriangleStrip height={12} />
      </div>
      <div style={{
        position: "absolute", bottom: 16, left: 14, right: 14,
        height: 2,
        background: `linear-gradient(to right, transparent, ${C.gold}99, ${C.leaf}88, ${C.gold}99, transparent)`,
      }} />
      {/* Corner ornaments */}
      {[
        { top: 22, left: 14 },
        { top: 22, right: 14 },
        { bottom: 22, left: 14 },
        { bottom: 22, right: 14 },
      ].map((pos, i) => (
        <div key={i} style={{ position: "absolute", ...pos }}>
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <rect x={i%2===0?0:14} y={i<2?0:14} width="22" height="2" fill={C.gold} opacity="0.7" />
            <rect x={i%2===0?0:34} y={i<2?0:14} width="2" height="22" fill={C.gold} opacity="0.7" />
            <rect x={i%2===0?4:18} y={i<2?4:18} width="12" height="12" fill="none" stroke={C.leaf} strokeWidth="1" opacity="0.5"
              transform={`rotate(45 ${i%2===0?10:24} ${i<2?10:24})`} />
            <circle cx={i%2===0?10:26} cy={i<2?10:26} r="3" fill={C.gold} opacity="0.5" />
          </svg>
        </div>
      ))}
      {/* Outer frame */}
      <div style={{ position: "absolute", inset: 22, border: `1px solid ${C.gold}33`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 26, border: `1px solid ${C.leaf}22`, pointerEvents: "none" }} />
      {children}
    </div>
  );
}

// ─── CONTENT CARD ─────────────────────────────────────────────────────────────
function ContentCard({ color, label, items, icon: IconChar }) {
  return (
    <div style={{
      background: `linear-gradient(135deg, rgba(10,25,12,0.6) 0%, ${color}10 100%)`,
      borderLeft: `3px solid ${color}cc`,
      borderTop: `1px solid ${color}44`,
      padding: "8px 14px",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: 40, height: 40,
        background: `radial-gradient(circle, ${color}18, transparent 70%)`,
        pointerEvents: "none",
      }} />
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <div style={{ width: 8, height: 8, background: color, transform: "rotate(45deg)", flexShrink: 0 }} />
        <span style={{
          fontSize: "clamp(7.5px,0.9vw,9px)",
          letterSpacing: "2.5px",
          textTransform: "uppercase",
          color,
          fontWeight: 600,
          fontFamily: "'Be Vietnam Pro',sans-serif",
        }}>{label}</span>
        <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${color}66, transparent)` }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
            <svg width="6" height="6" viewBox="0 0 6 6" style={{ flexShrink: 0, marginTop: 5 }}>
              <polygon points="3,0 6,3 3,6 0,3" fill={color} opacity="0.8" />
            </svg>
            <span style={{
              fontSize: "clamp(8.5px,1vw,10px)",
              color: C.textMain,
              lineHeight: 1.7,
              fontFamily: "'Be Vietnam Pro',sans-serif",
              fontWeight: 400,
            }}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── LEFT TITLE PANEL ─────────────────────────────────────────────────────────
function TitlePanel({ breadcrumb, title, titleEn, subtitle, children, lang }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", justifyContent: "center",
      height: "100%", gap: 0,
    }}>
      <div style={{
        fontSize: "clamp(7px,0.8vw,8.5px)",
        letterSpacing: "2.5px",
        textTransform: "uppercase",
        color: C.textMuted,
        marginBottom: 10,
        display: "flex", alignItems: "center", gap: 8,
        fontFamily: "'Be Vietnam Pro',sans-serif",
      }}>
        <div style={{ width: 20, height: 1, background: `${C.leaf}55` }} />
        {breadcrumb}
      </div>
      <div style={{
        fontSize: "clamp(16px,1.9vw,24px)",
        fontWeight: 700,
        color: C.cream,
        lineHeight: 1.15,
        fontFamily: "'Playfair Display',serif",
        textShadow: `0 0 30px ${C.leaf}66`,
      }}>
        {lang === "vi" ? title : (titleEn || title)}
      </div>
      {subtitle && (
        <div style={{
          fontSize: "clamp(9px,1vw,11px)",
          fontStyle: "italic",
          color: C.goldLight,
          letterSpacing: "1.5px",
          marginTop: 4,
          marginBottom: 10,
          fontFamily: "'Lora',serif",
        }}>{subtitle}</div>
      )}
      <SectionDivider />
      {children}
    </div>
  );
}

function VDivider() {
  return (
    <div style={{
      width: 1, flexShrink: 0, alignSelf: "stretch",
      background: `linear-gradient(to bottom, transparent, ${C.gold}55 20%, ${C.leaf}44 80%, transparent)`,
      margin: "0 4px",
    }} />
  );
}

// ─── PAGE FOOTER ──────────────────────────────────────────────────────────────
function PageFooter({ lang }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12 }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${C.leaf}44, transparent)` }} />
      <span style={{
        fontSize: 8,
        letterSpacing: "2.5px",
        textTransform: "uppercase",
        color: C.textMuted,
        fontFamily: "'Be Vietnam Pro',sans-serif",
      }}>✦ Đại Học Đà Nẵng · 2026 ✦</span>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, ${C.leaf}44, transparent)` }} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGES
// ═══════════════════════════════════════════════════════════════════════════════

function Page1Cover({ lang }) {
  return (
    <PageShell bgVariant="a">
      {/* Decorative large diamond bg */}
      <div style={{
        position: "absolute",
        right: "15%", top: "50%",
        transform: "translate(50%, -50%) rotate(45deg)",
        width: "35vw", height: "35vw",
        maxWidth: 280, maxHeight: 280,
        border: `1px solid ${C.gold}22`,
        opacity: 0.3,
      }} />
      <div style={{
        position: "absolute",
        right: "15%", top: "50%",
        transform: "translate(50%, -50%) rotate(45deg)",
        width: "28vw", height: "28vw",
        maxWidth: 220, maxHeight: 220,
        border: `1px solid ${C.leaf}33`,
        opacity: 0.4,
      }} />

      <div style={{
        position: "absolute",
        top: 36, bottom: 36, left: 40, right: 40,
        display: "flex", alignItems: "stretch",
      }}>
        {/* Left — Title */}
        <div style={{
          width: "52%", flexShrink: 0,
          display: "flex", flexDirection: "column",
          justifyContent: "center", paddingRight: 32,
        }}>
          <div style={{
            fontSize: "clamp(7px,0.8vw,8.5px)",
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: C.textMuted,
            marginBottom: 8,
            fontFamily: "'Be Vietnam Pro',sans-serif",
            lineHeight: 2,
          }}>
            Trường Đại Học Sư Phạm – Đại Học Đà Nẵng<br />
            Khoa Sử – Địa – Chính Trị
          </div>
          <SectionDivider />
          <div style={{
            fontSize: "clamp(8px,1vw,10px)",
            letterSpacing: "6px",
            color: C.leafLight,
            textTransform: "uppercase",
            margin: "10px 0 6px",
            fontFamily: "'Be Vietnam Pro',sans-serif",
          }}>
            ✦ &nbsp;{lang === "vi" ? "Sổ Tay" : "Field Guide"}&nbsp; ✦
          </div>
          <div style={{
            fontSize: "clamp(38px,4.8vw,58px)",
            fontWeight: 700,
            color: C.cream,
            lineHeight: 1.0,
            fontFamily: "'Playfair Display',serif",
            textShadow: `0 0 50px ${C.leaf}88, 0 4px 20px rgba(0,0,0,0.8)`,
          }}>
            {lang === "vi" ? "Văn Hoá" : "Culture"}
          </div>
          <div style={{
            fontSize: "clamp(32px,4.0vw,50px)",
            fontWeight: 700,
            color: C.leafLight,
            lineHeight: 1.05,
            fontFamily: "'Playfair Display',serif",
            textShadow: `0 0 40px ${C.leaf}`,
            marginTop: 2,
          }}>
            {lang === "vi" ? "Người Cơ Tu" : "The Cơ Tu"}
          </div>
          <div style={{
            fontSize: "clamp(9px,1vw,12px)",
            fontStyle: "italic",
            color: C.goldLight,
            letterSpacing: "4px",
            textTransform: "uppercase",
            margin: "10px 0 16px",
            fontFamily: "'Lora',serif",
          }}>
            {lang === "vi" ? "Tại Thành Phố Đà Nẵng" : "In Da Nang City"}
          </div>
          <SectionDivider />
          <div style={{
            marginTop: 12,
            fontSize: 9,
            letterSpacing: "3px",
            color: C.textMuted,
            fontFamily: "'Be Vietnam Pro',sans-serif",
          }}>✦ &nbsp;Đà Nẵng, 2026&nbsp; ✦</div>
        </div>

        <VDivider />

        {/* Right — Quote & ornament */}
        <div style={{
          flex: 1,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          paddingLeft: 28, gap: 16,
        }}>
          {/* Cơ Tu cross pattern */}
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            {/* Center diamond */}
            <rect x="30" y="30" width="20" height="20" fill={C.gold} opacity="0.8" transform="rotate(45 40 40)" />
            {/* Arms */}
            {[0,90,180,270].map(angle => (
              <g key={angle} transform={`rotate(${angle} 40 40)`}>
                <rect x="38" y="4" width="4" height="22" fill={C.leaf} opacity="0.6" />
                <polygon points="36,4 44,4 40,0" fill={C.gold} opacity="0.8" />
              </g>
            ))}
            {/* Corner diamonds */}
            {[[14,14],[66,14],[14,66],[66,66]].map(([x,y],i) => (
              <rect key={i} x={x-5} y={y-5} width="10" height="10" fill={C.clay} opacity="0.6" transform={`rotate(45 ${x} ${y})`} />
            ))}
          </svg>

          <div style={{
            width: "100%",
            background: `linear-gradient(135deg, rgba(10,25,12,0.7), ${C.forest}88)`,
            borderLeft: `3px solid ${C.gold}88`,
            borderRight: `3px solid ${C.gold}88`,
            padding: "18px 20px",
            position: "relative",
          }}>
            <div style={{
              position: "absolute", top: 4, left: 10,
              fontSize: 52,
              fontFamily: "'Playfair Display',serif",
              color: `${C.gold}22`,
              lineHeight: 0.7,
            }}>"</div>
            <p style={{
              fontStyle: "italic",
              fontSize: "clamp(10px,1.2vw,13px)",
              color: C.textMain,
              lineHeight: 1.9,
              textAlign: "center",
              margin: 0,
              position: "relative", zIndex: 1,
              fontFamily: "'Lora',serif",
            }}>
              {lang === "vi"
                ? "Giữa đại ngàn Trường Sơn, văn hóa Cơ Tu không chỉ là ký ức của núi rừng — mà là nhịp thở sống động của một dân tộc giữ hồn qua từng thế hệ."
                : "Amid the Trường Sơn highlands, Cơ Tu culture is not merely a memory of forests — it is the living breath of a people preserving their soul across generations."}
            </p>
          </div>
          <CoTuBorder color={C.gold} />
        </div>
      </div>
    </PageShell>
  );
}

// ─── GENERIC LEFT-RIGHT LAYOUT ───────────────────────────────────────────────
function GenericPage({ lang, breadcrumb, title, titleEn, subtitle, badge, sections, bgVariant = "b", imgUrl }) {
  return (
    <PageShell bgVariant={bgVariant}>
      <div style={{
        position: "absolute",
        top: 36, bottom: 36, left: 40, right: 40,
        display: "flex", alignItems: "stretch",
      }}>
        {/* Left title */}
        <div style={{
          width: "36%", flexShrink: 0,
          paddingRight: 20, paddingTop: 4, paddingBottom: 4,
        }}>
          <TitlePanel breadcrumb={breadcrumb} title={title} titleEn={titleEn} subtitle={subtitle} lang={lang}>
            {badge && (
              <div style={{
                marginTop: 14,
                background: `linear-gradient(135deg, rgba(10,25,12,0.7), ${C.leaf}12)`,
                borderLeft: `3px solid ${C.leaf}88`,
                padding: "8px 12px",
              }}>
                <div style={{ fontSize: 7, letterSpacing: "2px", textTransform: "uppercase", color: C.textMuted, marginBottom: 3, fontFamily: "'Be Vietnam Pro',sans-serif" }}>
                  Phân Loại
                </div>
                <div style={{ fontSize: 8.5, color: C.goldLight, lineHeight: 1.6, fontFamily: "'Be Vietnam Pro',sans-serif" }}>{badge}</div>
              </div>
            )}
            {imgUrl && (
              <div style={{
                marginTop: 16,
                width: "100%",
                height: 350,
                position: "relative",
                border: `1px solid ${C.gold}44`,
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: `0 4px 15px rgba(0,0,0,0.3)`,
              }}>
                <div style={{
                  position: "absolute", inset: 0,
                  backgroundImage: `url('${imgUrl}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, rgba(10,25,12,0.6), transparent 50%)`, pointerEvents: "none" }} />
              </div>
            )}
            <div style={{ marginTop: 14, display: "flex", gap: 6 }}>
              {[7,12,7].map((s,i) => (
                <CoTuDiamond key={i} size={s} color={i===1 ? C.gold : C.leaf} />
              ))}
            </div>
            <div style={{ marginTop: 12 }}><CoTuBorder /></div>
            <PageFooter lang={lang} />
          </TitlePanel>
        </div>

        <VDivider />

        {/* Right — content cards */}
        <div style={{
          flex: 1,
          display: "flex", flexDirection: "column",
          justifyContent: "center",
          paddingLeft: 22, paddingRight: 4,
          gap: 8, overflow: "hidden",
        }}>
          {sections.map((sec, i) => <ContentCard key={i} {...sec} />)}
        </div>
      </div>
    </PageShell>
  );
}

// ─── PAGE 2: INTRO ────────────────────────────────────────────────────────────
function Page2Intro({ lang }) {
const content = lang === "vi"
  ? "Văn hóa của người Cơ Tu tại Đà Nẵng là một bộ phận đặc sắc trong bức tranh văn hóa miền Trung, được hình thành và phát triển trên nền tảng gắn bó lâu đời với không gian núi rừng Trường Sơn, thể hiện qua nhiều yếu tố độc đáo như kiến trúc nhà cộng đồng, trang phục truyền thống, lễ hội và các phong tục tập quán; được thực hiện trong khuôn khổ đề tài \"Xây dựng nguồn tài nguyên số cho văn hóa người Cơ Tu tại thành phố Đà Nẵng,\" cuốn sổ tay này không hướng đến việc trình bày toàn diện mà tập trung lựa chọn giới thiệu một số di tích và giá trị văn hóa tiêu biểu, mang tính đại diện mà nhóm nghiên cứu đã khảo sát và tổng hợp, với cách trình bày ngắn gọn, rõ ràng và gần gũi, phù hợp với nhiều đối tượng bạn đọc, qua đó góp phần lan tỏa nhận thức, nuôi dưỡng niềm tự hào và thúc đẩy việc bảo tồn, phát huy các giá trị văn hóa truyền thống trong bối cảnh hiện đại."
  : "The culture of the Cơ Tu people in Da Nang is a distinctive part of Central Vietnam’s cultural landscape, formed and developed through a long-standing connection with the Trường Sơn mountainous region. It is expressed through unique elements such as communal architecture, traditional costumes, festivals, and customs. Conducted within the framework of the project \"Building Digital Resources for Cơ Tu Culture in Da Nang City,\" this handbook does not aim to be comprehensive but instead focuses on presenting selected representative cultural sites and values surveyed and compiled by the research team. The content is designed to be concise, clear, and accessible to a wide range of readers, contributing to raising awareness, fostering pride, and promoting the preservation and development of traditional cultural values in a modern context.";

  return (
    <PageShell bgVariant="a">
      <div style={{
        position: "absolute",
        top: 36, bottom: 36, left: 40, right: 40,
        display: "flex", alignItems: "stretch",
      }}>
        <div style={{ width: "42%", flexShrink: 0, paddingRight: 24, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontSize: 8, letterSpacing: "3px", textTransform: "uppercase", color: C.textMuted, marginBottom: 10, fontFamily: "'Be Vietnam Pro',sans-serif", display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 18, height: 1, background: `${C.leaf}55` }} />
            {lang === "vi" ? "Trang Giới Thiệu" : "Introduction"}
          </div>
          <div style={{ fontSize: "clamp(28px,3.5vw,42px)", fontWeight: 700, color: C.cream, lineHeight: 1.05, fontFamily: "'Playfair Display',serif", textShadow: `0 0 35px ${C.leaf}66` }}>
            {lang === "vi" ? "Giới Thiệu" : "Introduction"}
          </div>
          <div style={{ fontSize: 11, fontStyle: "italic", color: C.goldLight, letterSpacing: "2px", marginBottom: 14, marginTop: 4, fontFamily: "'Lora',serif" }}>
            {lang === "vi" ? "Introduction" : "Giới Thiệu"}
          </div>
          <SectionDivider />
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { label: lang === "vi" ? "Kiến trúc cộng đồng" : "Community Architecture", desc: lang === "vi" ? "Nhà Gươl – linh hồn của làng Cơ Tu" : "The Gươl house — soul of the Cơ Tu village", color: C.leaf },
              { label: lang === "vi" ? "Trang phục & Dệt thổ cẩm" : "Costume & Weaving", desc: lang === "vi" ? "Hoa văn đặc trưng, kỹ thuật truyền đời" : "Distinctive patterns, time-honored craft", color: C.gold },
              { label: lang === "vi" ? "Lễ hội & Phong tục" : "Festivals & Customs", desc: lang === "vi" ? "Bảo tồn bản sắc qua từng nghi lễ" : "Preserving identity through ritual", color: C.clay },
            ].map((h, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 12,
                background: `linear-gradient(135deg, rgba(10,25,12,0.6), ${h.color}10)`,
                borderLeft: `3px solid ${h.color}cc`,
                padding: "8px 14px",
              }}>
                <CoTuDiamond size={10} color={h.color} />
                <div>
                  <div style={{ fontSize: 9.5, fontWeight: 600, color: C.textMain, fontFamily: "'Be Vietnam Pro',sans-serif" }}>{h.label}</div>
                  <div style={{ fontSize: 9, color: C.textMuted, marginTop: 2, fontStyle: "italic", fontFamily: "'Lora',serif" }}>{h.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16 }}><CoTuBorder /></div>
        </div>

        <VDivider />

        <div style={{ flex: 1, paddingLeft: 26, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <DiamondRow gap={6} />
            <div style={{ fontSize: 10, letterSpacing: "3px", textTransform: "uppercase", color: C.goldLight, opacity: 0.85, fontFamily: "'Be Vietnam Pro',sans-serif" }}>
              {lang === "vi" ? "Về Cuốn Sổ Tay" : "About This Book"}
            </div>
          </div>
          <div style={{
            background: `linear-gradient(135deg, rgba(10,25,12,0.7), ${C.leaf}08)`,
            borderTop: `2px solid ${C.gold}77`,
            borderBottom: `1px solid ${C.gold}33`,
            padding: "20px 22px",
            position: "relative",
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: 60, height: 2, background: `linear-gradient(to right, ${C.gold}, transparent)` }} />
            <p style={{
              fontSize: "clamp(10.5px,1.2vw,13px)",
              color: C.textMain,
              lineHeight: 1.95,
              margin: 0,
              textAlign: "justify",
              fontFamily: "'Be Vietnam Pro',sans-serif",
              fontWeight: 400,
            }}>{content}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 16 }}>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${C.leaf}44, transparent)` }} />
            <span style={{ fontSize: 8, letterSpacing: "2.5px", textTransform: "uppercase", color: C.textMuted, fontFamily: "'Be Vietnam Pro',sans-serif" }}>✦ Đại Học Đà Nẵng · 2026 ✦</span>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, ${C.leaf}44, transparent)` }} />
          </div>
        </div>
      </div>
    </PageShell>
  );
}

// ─── PAGE 3: TOC ──────────────────────────────────────────────────────────────
function Page3Toc({ lang }) {
  const vatThe = [
    { label: lang === "vi" ? "Làng, nhà ở" : "Village & Dwellings", pg: "04" },
    { label: lang === "vi" ? "Trang phục" : "Clothing", pg: "07" },
    { label: lang === "vi" ? "Ẩm thực" : "Cuisine", pg: "11" },
    { label: lang === "vi" ? "Phương tiện đi lại" : "Transportation", pg: "17" },
    { label: lang === "vi" ? "Công cụ lao động" : "Labor Tools", pg: "18" },
  ];
  const phiVatThe = [
    { label: lang === "vi" ? "Lễ hội và nghi lễ" : "Festivals & Rituals", pg: "23" },
    { label: lang === "vi" ? "Nghệ thuật trình diễn" : "Performing Arts", pg: "41" },
    { label: lang === "vi" ? "Nghề thủ công" : "Traditional Crafts", pg: "32" },
    { label: lang === "vi" ? "Phong tục tập quán" : "Customs & Practices", pg: "25" },
    { label: lang === "vi" ? "Tri thức bản địa" : "Indigenous Knowledge", pg: "26" },
    { label: lang === "vi" ? "Văn học dân gian" : "Folk Literature", pg: "29" },
  ];

  const TocRow = ({ label, pg, color }) => (
    <div style={{
      display: "flex", alignItems: "center",
      borderLeft: `2px solid ${color}99`,
      background: `linear-gradient(135deg, rgba(10,25,12,0.5), ${color}09)`,
      padding: "5px 12px", marginBottom: 4,
      gap: 10,
    }}>
      <CoTuDiamond size={6} color={color} />
      <span style={{ flex: 1, fontSize: "clamp(9.5px,1.1vw,11.5px)", color: C.textMain, fontFamily: "'Be Vietnam Pro',sans-serif" }}>{label}</span>
      <div style={{ width: 36, borderBottom: `1px dotted ${C.gold}33` }} />
      <span style={{ fontSize: 9.5, color: C.goldLight, fontFamily: "'Playfair Display',serif", minWidth: 18, textAlign: "right" }}>{pg}</span>
    </div>
  );

  return (
    <PageShell bgVariant="b">
      <div style={{ position: "absolute", top: 36, bottom: 36, left: 40, right: 40, display: "flex", alignItems: "stretch" }}>
        <div style={{ width: "38%", flexShrink: 0, paddingRight: 20, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontSize: 8, letterSpacing: "3px", textTransform: "uppercase", color: C.textMuted, marginBottom: 10, fontFamily: "'Be Vietnam Pro',sans-serif", display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 18, height: 1, background: `${C.leaf}55` }} />
            {lang === "vi" ? "Nội Dung" : "Contents"}
          </div>
          <div style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 700, color: C.cream, lineHeight: 1.05, fontFamily: "'Playfair Display',serif" }}>
            {lang === "vi" ? "Mục Lục" : "Contents"}
          </div>
          <div style={{ fontSize: 12, fontStyle: "italic", color: C.goldLight, letterSpacing: "2px", marginBottom: 16, marginTop: 4, fontFamily: "'Lora',serif" }}>
            {lang === "vi" ? "Table of Contents" : "Mục Lục"}
          </div>
          <SectionDivider />
          <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
            {[
              { n: "05", label: lang === "vi" ? "Vật thể" : "Tangible", color: C.leaf },
              { n: "06", label: lang === "vi" ? "Phi vật thể" : "Intangible", color: C.gold },
            ].map((item, i) => (
              <div key={i} style={{
                textAlign: "center",
                background: `linear-gradient(135deg, rgba(10,25,12,0.7), ${item.color}15)`,
                padding: "10px 20px",
                borderTop: `2px solid ${item.color}cc`,
                boxShadow: `0 0 24px ${item.color}22`,
              }}>
                <div style={{ fontSize: "clamp(22px,2.8vw,32px)", fontWeight: 700, color: item.color, textShadow: `0 0 18px ${item.color}88`, fontFamily: "'Playfair Display',serif" }}>{item.n}</div>
                <div style={{ fontSize: 8, letterSpacing: "1.5px", color: C.textMuted, textTransform: "uppercase", marginTop: 3, fontFamily: "'Be Vietnam Pro',sans-serif" }}>{item.label}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20 }}><CoTuBorder /></div>
        </div>

        <VDivider />

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", paddingLeft: 24, paddingRight: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <CoTuDiamond size={10} color={C.leaf} />
            <span style={{ fontSize: "clamp(7.5px,0.88vw,9px)", letterSpacing: "3px", textTransform: "uppercase", color: C.leaf, fontFamily: "'Be Vietnam Pro',sans-serif", fontWeight: 600 }}>
              {lang === "vi" ? "Di Sản Vật Thể" : "Tangible Heritage"}
            </span>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${C.leaf}55, transparent)` }} />
          </div>
          {vatThe.map((item, i) => <TocRow key={i} label={item.label} pg={item.pg} color={C.leaf} />)}
          <div style={{ height: 10 }} />
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <CoTuDiamond size={10} color={C.gold} />
            <span style={{ fontSize: "clamp(7.5px,0.88vw,9px)", letterSpacing: "3px", textTransform: "uppercase", color: C.gold, fontFamily: "'Be Vietnam Pro',sans-serif", fontWeight: 600 }}>
              {lang === "vi" ? "Di Sản Phi Vật Thể" : "Intangible Heritage"}
            </span>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${C.gold}55, transparent)` }} />
          </div>
          {phiVatThe.map((item, i) => <TocRow key={i} label={item.label} pg={item.pg} color={C.gold} />)}
          <PageFooter lang={lang} />
        </div>
      </div>
    </PageShell>
  );
}

// ─── HELPER TO MAKE CONTENT PAGES ─────────────────────────────────────────────
function makePage(breadcrumb, title, titleEn, subtitle, getSections, imgUrl) {
  return function({ lang }) {
    const sections = getSections(lang);
    return (
      <GenericPage
        lang={lang}
        breadcrumb={breadcrumb}
        title={title} titleEn={titleEn}
        subtitle={lang === "vi" ? subtitle.vi : subtitle.en}
        sections={sections}
        imgUrl={imgUrl}
      />
    );
  };
}

// ─── ALL CONTENT PAGES ────────────────────────────────────────────────────────

const Page4Lang = makePage(
  "Di Sản Vật Thể › Làng, Nhà Ở",
  "Làng Truyền Thống Của Người Cơ Tu", 
  "Traditional Cơ Tu Village",
  { 
    vi: "Đơn vị cộng đồng và không gian sống Cơ Tu", 
    en: "Community unit and living space of the Cơ Tu" 
  },
  (lang) => [
    { 
      label: lang === "vi" ? "Làng" : "The Village", 
      color: C.leaf, 
      items: lang === "vi" 
        ? [
            "Làng (cơrnoon) là đơn vị cơ bản trong hệ thống cộng đồng Cơ Tu.",
            "Là nơi cư trú lâu dài của các gia đình, đồng thời là trung tâm sinh hoạt kinh tế – xã hội – văn hóa."
          ] 
        : [
            "The village (cơrnoon) is the basic unit of the Cơ Tu community system.",
            "It is the long-term residence of families and the center of economic, social, and cultural activities."
          ] 
    },

    { 
      label: lang === "vi" ? "Cấu Trúc Không Gian" : "Spatial Structure", 
      color: C.gold, 
      items: lang === "vi" 
        ? [
            "Ranh giới làng xác định bởi các yếu tố tự nhiên: sông, suối, núi, quả đồi, khu rừng hoặc các mốc quen thuộc.",
            "Lãnh thổ làng bao gồm: nguồn nước sinh hoạt chung, khu rừng thiêng, vùng đất sản xuất nương rẫy, khu vực săn bắt, nghĩa địa chung.",
            "Bố trí làng theo kiểu vòng cung bao quanh trung tâm.",
            "Hàng rào bao vệ xung quanh, cổng làng hướng về phía mặt trời mọc theo quan niệm truyền thống.",
            "Các bộ phận quan trọng trong làng: máng nước, kho thóc, nghĩa địa."
          ] 
        : [
            "Village boundaries are defined by natural features such as rivers, streams, mountains, hills, forests, or familiar landmarks.",
            "The village territory includes: shared water sources, sacred forests, farming land, hunting areas, and a communal cemetery.",
            "The village is arranged in an arc surrounding the center.",
            "A protective fence surrounds the village, with the gate facing east toward the sunrise according to tradition.",
            "Important components include water troughs, granaries, and the cemetery."
          ] 
    },

    { 
      label: lang === "vi" ? "Quan Hệ Xã Hội" : "Social Relations", 
      color: C.clay, 
      items: lang === "vi" 
        ? [
            "Gia đình trong làng gắn kết nhờ quan hệ họ hàng, hôn nhân gần gũi.",
            "Mọi thành viên tham gia các hoạt động chung: lao động sản xuất, lễ hội, nghi lễ tín ngưỡng.",
            "Già làng duy trì luật tục và phong tục tập quán, giữ trật tự cộng đồng."
          ] 
        : [
            "Families are closely connected through kinship and marriage.",
            "All members participate in communal activities such as production, festivals, and rituals.",
            "Village elders uphold customary laws and traditions, maintaining community order."
          ] 
    },
  ],
  imgso1
);  

const Page5NhaGuol = makePage(
  "Di Sản Vật Thể › Làng, Nhà Ở",
  "Nhà Gươl", 
  "The Gươl Community House",
  { 
    vi: "Ngôi nhà cộng đồng linh thiêng", 
    en: "The sacred communal house" 
  },
  (lang) => [
    { 
      label: lang === "vi" ? "Không Gian · Kiến Trúc" : "Space · Architecture", 
      color: C.leaf, 
      items: lang === "vi" 
        ? [
            "Nhà Gươl là kiểu nhà sàn gỗ có quy mô lớn, mái cao và dốc, thường lợp bằng lá rừng dày, tạo hình khối bề thế nổi bật giữa khu cư trú.",
            "Vật liệu xây dựng chủ yếu gồm: gỗ, tre, nứa và các loại lá rừng.",
            "Kết cấu đặc trưng với cột bố ở trung tâm, xung quanh là các cột phụ liên kết bằng xà, kèo tạo thành bộ khung vững chắc.",
            "Khu vực trung tâm trang trọng, nơi cất giữ vật dụng quý và gắn với tín ngưỡng tổ tiên.",
            "Các khu vực xung quanh phục vụ sinh hoạt chung và gặp gỡ cộng đồng."
          ] 
        : [
            "The Gươl is a large wooden stilt house with a high, steep roof, typically thatched with thick forest leaves, forming a prominent structure within the village.",
            "Main materials include wood, bamboo, rattan, and forest leaves.",
            "Its structure features a central pillar surrounded by secondary pillars connected by beams and rafters, forming a solid framework.",
            "The central area is sacred, used to store valuable items and associated with ancestral beliefs.",
            "Surrounding spaces are used for communal activities and gatherings."
          ] 
    },

    { 
      label: lang === "vi" ? "Trang Trí · Điêu Khắc" : "Decoration · Carving", 
      color: C.gold, 
      items: lang === "vi" 
        ? [
            "Cột, vách, đầu hồi được chạm khắc với các họa tiết như: muông thú, cây cỏ, mặt trời, mặt trăng, và các cảnh sinh hoạt (săn bắt, múa cồng chiêng, lao động).",
            "Đường nét giản lược nhưng phản ánh rõ thẩm mỹ gắn với thiên nhiên và đời sống cộng đồng."
          ] 
        : [
            "Pillars, walls, and gables are carved with motifs such as animals, plants, the sun, the moon, and daily life scenes (hunting, gong dancing, labor).",
            "The simplified lines reflect an aesthetic closely connected to nature and communal life."
          ] 
    },

    { 
      label: lang === "vi" ? "Ý Nghĩa Văn Hóa" : "Cultural Meaning", 
      color: C.clay, 
      items: lang === "vi" 
        ? [
            "Cột bố tượng trưng cho chế độ phụ hệ, đồng thời thể hiện sức mạnh và sự bền vững của cộng đồng.",
            "Các họa tiết chạm khắc không chỉ tăng giá trị nghệ thuật mà còn lưu giữ ký ức tập thể và tri thức văn hóa dân gian qua nhiều thế hệ.",
            "Nhà Gươl là không gian linh thiêng, trung tâm sinh hoạt cộng đồng, góp phần gắn kết xã hội và duy trì tín ngưỡng truyền thống."
          ] 
        : [
            "The central pillar symbolizes the patrilineal system, representing strength and stability of the community.",
            "Carved motifs not only enhance artistic value but also preserve collective memory and traditional cultural knowledge across generations.",
            "The Gươl serves as a sacred space and the center of communal life, strengthening social bonds and maintaining traditional beliefs."
          ] 
    },
  ],
  imgso2
);

const Page6NhaSan = makePage(
  "Di Sản Vật Thể › Nhà Ở",
  "Nhà Sàn", 
  "The Stilt House",
  { 
    vi: "Không gian sống của gia đình Cơ Tu", 
    en: "Living space of the Cơ Tu family" 
  },
  (lang) => [
    { 
      label: lang === "vi" ? "Không Gian · Kiến Trúc" : "Space · Architecture", 
      color: C.leaf, 
      items: lang === "vi" 
        ? [
            "Nhà sàn được xây dựng trên đất bằng phẳng hoặc sườn đồi thoai thoải, sàn nhà cao hơn mặt đất trên 2m.",
            "Bộ khung gồm cột gỗ, xà ngang, kèo, đòn tay, liên kết bằng mộng gỗ và dây mây.",
            "Sàn nhà làm bằng tre hoặc nứa đập dập, gác trên hệ thống thanh ngang và dọc, đảm bảo thông thoáng và chịu lực tốt.",
            "Khoảng không gian dưới sàn được sử dụng để chứa nông cụ, củi và các vật dụng sinh hoạt.",
            "Cửa nhà gồm cửa chính phía trước và hai cửa phụ ở hai đầu hồi, làm bằng phên tre đan, linh hoạt và thông thoáng."
          ] 
        : [
            "The stilt house is built on flat land or gentle hillsides, with the floor raised over 2 meters above the ground.",
            "The frame consists of wooden pillars, crossbeams, rafters, and purlins, connected using wooden joints and rattan ties.",
            "The floor is made of flattened bamboo or reeds, supported by a system of horizontal and vertical beams, ensuring ventilation and durability.",
            "The space beneath the house is used to store farming tools, firewood, and daily utensils.",
            "The house has a main front door and two side doors at the gable ends, made of woven bamboo panels, providing flexibility and ventilation."
          ] 
    },

    { 
      label: lang === "vi" ? "Không Gian Sinh Hoạt" : "Living Space", 
      color: C.gold, 
      items: lang === "vi" 
        ? [
            "Khu vực trung tâm trang trọng, kéo dài từ cột chính đến vách sau, là nơi cất giữ các vật dụng quý như gùi, lúa giống và của cải.",
            "Bếp lửa đặt ở trung tâm, phục vụ nấu nướng, sinh hoạt gia đình, đồng thời là nơi truyền dạy kinh nghiệm sống và văn hóa truyền thống.",
            "Các khu vực phụ xung quanh phục vụ sinh hoạt thường nhật, gặp gỡ, tiếp khách và gắn kết gia đình."
          ] 
        : [
            "The central area, extending from the main pillar to the rear wall, is a respected space used to store valuable items such as baskets, seed rice, and belongings.",
            "The hearth is placed at the center, serving cooking and family activities, as well as passing down life experiences and traditional culture.",
            "Surrounding spaces support daily activities, social interactions, and family bonding."
          ] 
    },

    { 
      label: lang === "vi" ? "Ý Nghĩa Văn Hóa" : "Cultural Meaning", 
      color: C.clay, 
      items: lang === "vi" 
        ? [
            "Phản ánh sự thích nghi với môi trường núi rừng, khí hậu nóng ẩm và nhiều mưa gió.",
            "Thể hiện mối quan hệ gắn bó chặt chẽ giữa đời sống gia đình và cộng đồng."
          ] 
        : [
            "Reflects adaptation to the mountainous forest environment and the hot, humid, and rainy climate.",
            "Demonstrates the close connection between family life and the wider community."
          ] 
    },
  ],
  imgso3
);
// Trang phục pages
function makeTrangPhuc(title, titleEn, subtitle, getSec, imgUrl) {
  return function({ lang }) {
    const sections = getSec(lang);
    return (
      <PageShell bgVariant="c">
        <div style={{ position: "absolute", top: 36, bottom: 36, left: 40, right: 40, display: "flex", alignItems: "stretch" }}>
          <div style={{ flex: 1, paddingRight: 20, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontSize: 7.5, letterSpacing: "2.5px", textTransform: "uppercase", color: C.textMuted, marginBottom: 8, fontFamily: "'Be Vietnam Pro',sans-serif" }}>
              {lang === "vi" ? "Di Sản Vật Thể › Trang Phục" : "Tangible Heritage › Clothing"}
            </div>
            <div style={{ fontSize: "clamp(18px,2.2vw,28px)", fontWeight: 700, color: C.cream, lineHeight: 1.15, fontFamily: "'Playfair Display',serif", textShadow: `0 0 25px ${C.leaf}66` }}>
              {lang === "vi" ? title : titleEn}
            </div>
            <div style={{ fontSize: "clamp(9px,1vw,11px)", fontStyle: "italic", color: C.goldLight, marginBottom: 10, marginTop: 4, fontFamily: "'Lora',serif" }}>
              {subtitle}
            </div>
            <SectionDivider />
            <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 10 }}>
              {sections.map((sec, i) => <ContentCard key={i} {...sec} />)}
            </div>
            <PageFooter lang={lang} />
          </div>
          <VDivider />
          <div style={{
            width: "36%", flexShrink: 0,
            paddingLeft: 18, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 14,
          }}>
            {imgUrl ? (
              <div style={{
                width: "100%", height: 520, position: "relative",
                border: `1px solid ${C.gold}44`, borderRadius: 2, overflow: "hidden",
                boxShadow: `0 4px 15px rgba(0,0,0,0.3)`,
              }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${imgUrl}')`, backgroundSize: "cover", backgroundPosition: "center top" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, rgba(10,25,12,0.4), transparent 30%)`, pointerEvents: "none" }} />
              </div>
            ) : (
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                <rect x="10" y="10" width="100" height="100" stroke={C.gold} strokeWidth="1.5" fill="none" opacity="0.5" />
                <line x1="10" y1="10" x2="110" y2="110" stroke={C.leaf} strokeWidth="0.8" opacity="0.5" />
                <line x1="110" y1="10" x2="10" y2="110" stroke={C.leaf} strokeWidth="0.8" opacity="0.5" />
                <polygon points="60,20 100,60 60,100 20,60" stroke={C.gold} strokeWidth="1.5" fill={`${C.gold}12`} opacity="0.8" />
                <polygon points="60,38 76,60 60,82 44,60" fill={C.clay} opacity="0.7" />
                <circle cx="60" cy="60" r="8" fill={C.gold} opacity="0.8" />
                <circle cx="60" cy="60" r="4" fill={C.cream} opacity="0.9" />
                {[[10,10],[110,10],[10,110],[110,110]].map(([x,y],i) => (
                  <polygon key={i} points={`${x},${y-7} ${x+7},${y} ${x},${y+7} ${x-7},${y}`} fill={C.leaf} opacity="0.7" />
                ))}
              </svg>
            )}
            <CoTuBorder color={C.clay} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 7.5, letterSpacing: "3px", textTransform: "uppercase", color: C.textMuted, fontFamily: "'Be Vietnam Pro',sans-serif" }}>
                {lang === "vi" ? "Trang Phục Truyền Thống" : "Traditional Clothing"}
              </div>
              <div style={{ fontSize: 7.5, letterSpacing: "2px", textTransform: "uppercase", color: C.textMuted, marginTop: 3, fontFamily: "'Be Vietnam Pro',sans-serif" }}>
                {lang === "vi" ? "Người Cơ Tu" : "Cơ Tu People"}
              </div>
            </div>
            <CoTuBorder color={C.clay} />
          </div>
        </div>
      </PageShell>
    );
  };
}

const Page7AoCocTay = makeTrangPhuc(
  "Áo Cộc Tay (A Doóh)", "Short-Sleeved Shirt (A Doóh)",
  "Trang phục truyền thống nam & nữ Cơ Tu",
  (lang) => lang === "vi" ? [
    { label: "Mô Tả", color: C.leaf, items: ["Dệt từ sợi bông, thân áo rộng ~50cm, dài ~100cm.", "Cổ khoét dài ~25cm, hai bên sườn khâu lại, tạo dáng cộc tay cổ chữ V.", "Hoa văn ở vai, ngực, gấu áo — màu đỏ, trắng hoặc vàng trên nền vải chàm đen."] },
    { label: "Đối Tượng Sử Dụng", color: C.gold, items: ["Đàn ông mặc trong lễ hội hoặc thời tiết lạnh, hoa văn thường đơn giản.", "Phụ nữ mặc phổ biến hơn, trang trí nhiều dải hoa văn ở vai, ngực và gấu."] },
  ] : [
    { label: "Description", color: C.leaf, items: ["Woven from cotton thread, shirt body ~50cm wide, ~100cm long.", "V-neck opening ~25cm, sewn at sides, short-sleeved silhouette.", "Patterns at shoulder, chest, hem — red, white or yellow on indigo-black ground."] },
    { label: "Who Wears It", color: C.gold, items: ["Men wear it for festivals or cold weather, usually simpler patterns.", "Women wear it more commonly, with elaborate patterned bands."] },
  ],
  imgso4
);

const Page8VayNgan = makeTrangPhuc(
  "Váy Ngắn (Doóh)", 
  "Short Skirt (Doóh)",
  "Trang phục thường nhật của phụ nữ Cơ Tu",
  (lang) => lang === "vi" ? [
    { 
      label: "Mô Tả", 
      color: C.leaf, 
      items: [
        "Váy được dệt từ vải thổ cẩm, có chiều dài khoảng 80cm và chiều rộng từ 70–80cm.",
        "Tấm vải được khâu lại tạo thành dạng hình ống.",
        "Khi mặc, váy được quấn quanh hông và cố định bằng dây buộc hoặc thắt lưng."
      ] 
    },
    { 
      label: "Đối Tượng Sử Dụng", 
      color: C.gold, 
      items: [
        "Đây là trang phục quen thuộc của phụ nữ Cơ Tu.",
        "Trong sinh hoạt hằng ngày, váy thường có độ dài đến đầu gối, thuận tiện cho lao động và sinh hoạt.",
        "Trong các dịp lễ hội, váy có thể dài hơn và được trang trí với nhiều hoa văn cầu kỳ."
      ] 
    },
  ] : [
    { 
      label: "Description", 
      color: C.leaf, 
      items: [
        "The skirt is woven from brocade fabric, measuring approximately 80 cm in length and 70–80 cm in width.",
        "The fabric is sewn into a tubular shape.",
        "When worn, it is wrapped around the hips and secured with a cord or waistband."
      ] 
    },
    { 
      label: "Users", 
      color: C.gold, 
      items: [
        "This is a common garment worn by Cơ Tu women.",
        "In daily life, the skirt is usually knee-length, making it practical for work and daily activities.",
        "During festivals, the skirt may be longer and decorated with more intricate patterns."
      ] 
    },
  ],
  imgso5
);

const Page9VayDai = makeTrangPhuc(
  "Váy Dài (Chrờ Dhu)", 
  "Long Skirt (Chrờ Dhu)",
  "Trang phục lễ hội của phụ nữ Cơ Tu",
  (lang) => lang === "vi" ? [
    { 
      label: "Mô Tả", 
      color: C.leaf, 
      items: [
        "Váy được dệt từ vải thổ cẩm, có chiều dài khoảng 6m, được khâu lại thành hai lớp, mỗi lớp dài khoảng 3m.",
        "Hoa văn trang trí được cách điệu, tương tự hoa văn trên khố của nam giới nhưng tập trung thành mảng lớn ở phần dưới thân váy.",
        "Các họa tiết thường đứng riêng lẻ theo các vạch sọc, gồm các dạng như hoa văn abloom, lá trầu.",
        "Màu sắc tương đối đơn giản, hoa văn được thể hiện theo xu hướng hình học hóa."
      ] 
    },
    { 
      label: "Đối Tượng Sử Dụng", 
      color: C.gold, 
      items: [
        "Đây là trang phục dành cho các dịp lễ hội hoặc sự kiện đặc biệt của phụ nữ Cơ Tu.",
        "Thường được mặc trong các nghi lễ quan trọng, cưới hỏi hoặc các hoạt động sinh hoạt cộng đồng."
      ] 
    },
  ] : [
    { 
      label: "Description", 
      color: C.leaf, 
      items: [
        "The skirt is woven from brocade fabric, approximately 6 meters in length, and sewn into two layers, each about 3 meters long.",
        "Decorative patterns are stylized, similar to those on men's loincloths, but arranged into large panels at the lower part of the skirt.",
        "Motifs are typically arranged individually in striped bands, including patterns such as abloom and betel leaf designs.",
        "Colors are relatively simple, with motifs expressed in a geometric style."
      ] 
    },
    { 
      label: "Users", 
      color: C.gold, 
      items: [
        "This garment is worn by Cơ Tu women during festivals or special occasions.",
        "It is commonly used in important ceremonies, weddings, and community gatherings."
      ] 
    },
  ],
  imgso6
);

const Page10Kho = makeTrangPhuc(
  "Khố (G'hul)", 
  "Loincloth (G'hul)",
  "Trang phục truyền thống của nam giới Cơ Tu",
  (lang) => lang === "vi" ? [
    { 
      label: "Mô Tả", 
      color: C.leaf, 
      items: [
        "Khố là dải vải dài từ 1,5–2m, rộng khoảng 35–40cm; khi mặc có độ dài đến đầu gối.",
        "Trang phục thường có màu chàm đen, hoa văn đơn giản, được trang trí bằng chỉ màu hoặc hạt cườm."
      ] 
    },
    { 
      label: "Đối Tượng Sử Dụng", 
      color: C.gold, 
      items: [
        "Đây là trang phục truyền thống của nam giới Cơ Tu.",
        "Trong đời sống thường ngày, nam giới mặc khố ngắn để thuận tiện cho việc đi rừng và làm rẫy.",
        "Trong các dịp lễ hội hoặc nghi lễ cộng đồng, khố dài với nhiều hoa văn trang trí được sử dụng."
      ] 
    },
  ] : [
    { 
      label: "Description", 
      color: C.leaf, 
      items: [
        "The loincloth is a strip of fabric measuring 1.5–2 meters in length and 35–40 cm in width; when worn, it reaches knee length.",
        "It is typically dark indigo in color, featuring simple patterns and decorated with colored threads or beads."
      ] 
    },
    { 
      label: "Users", 
      color: C.gold, 
      items: [
        "This is the traditional garment of Cơ Tu men.",
        "In daily life, men wear shorter loincloths for convenience in forest activities and farming.",
        "During festivals or community rituals, longer loincloths with more elaborate decorative patterns are used."
      ] 
    },
  ],
  imgso7
);

// Ẩm thực pages
function makeAmThuc(title, titleEn, subtitle, getSec, imgUrl) {
  return function({ lang }) {
    const sections = getSec(lang);
    return (
      <PageShell bgVariant="a">
        <div style={{ position: "absolute", top: 36, bottom: 36, left: 40, right: 40, display: "flex", alignItems: "stretch" }}>
          <div style={{ flex: 1, paddingRight: 20, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontSize: 7.5, letterSpacing: "2.5px", textTransform: "uppercase", color: C.textMuted, marginBottom: 8, fontFamily: "'Be Vietnam Pro',sans-serif" }}>
              {lang === "vi" ? "Di Sản Vật Thể › Ẩm Thực" : "Tangible Heritage › Cuisine"}
            </div>
            <div style={{ fontSize: "clamp(18px,2.2vw,28px)", fontWeight: 700, color: C.cream, lineHeight: 1.15, fontFamily: "'Playfair Display',serif", textShadow: `0 0 25px ${C.leaf}66` }}>
              {lang === "vi" ? title : titleEn}
            </div>
            <div style={{ fontSize: "clamp(9px,1vw,11px)", fontStyle: "italic", color: C.goldLight, marginBottom: 10, marginTop: 4, fontFamily: "'Lora',serif" }}>
              {subtitle}
            </div>
            <SectionDivider />
            <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 10 }}>
              {sections.map((sec, i) => <ContentCard key={i} {...sec} />)}
            </div>
            <PageFooter lang={lang} />
          </div>
          <VDivider />
          <div style={{
            width: "36%", flexShrink: 0,
            paddingLeft: 18, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 14,
          }}>
            {imgUrl ? (
              <div style={{
                width: "100%", height: 520, position: "relative",
                border: `1px solid ${C.gold}44`, borderRadius: 2, overflow: "hidden",
                boxShadow: `0 4px 15px rgba(0,0,0,0.3)`,
              }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${imgUrl}')`, backgroundSize: "cover", backgroundPosition: "center top" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, rgba(10,25,12,0.4), transparent 30%)`, pointerEvents: "none" }} />
              </div>
            ) : (
              <div style={{ display: "flex", gap: 10 }}>
                <CoTuDiamond size={12} color={C.gold} />
                <CoTuDiamond size={16} color={C.leaf} />
                <CoTuDiamond size={12} color={C.gold} />
              </div>
            )}
            <CoTuBorder color={C.clay} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 7.5, letterSpacing: "3px", textTransform: "uppercase", color: C.textMuted, fontFamily: "'Be Vietnam Pro',sans-serif" }}>
                {lang === "vi" ? "Ẩm Thực Truyền Thống" : "Traditional Cuisine"}
              </div>
              <div style={{ fontSize: 7.5, letterSpacing: "2px", textTransform: "uppercase", color: C.textMuted, marginTop: 3, fontFamily: "'Be Vietnam Pro',sans-serif" }}>
                {lang === "vi" ? "Người Cơ Tu" : "Cơ Tu People"}
              </div>
            </div>
            <CoTuBorder color={C.clay} />
          </div>
        </div>
      </PageShell>
    );
  };
}

const Page11ComLam = makeAmThuc(
  "Cơm Lam (Avị Hâr)", 
  "Bamboo Tube Rice (Avị Hâr)", 
  "Món ăn đặc trưng từ ống tre",
  (lang) => lang === "vi" ? [
    { 
      label: "Nguyên Liệu", 
      color: C.leaf, 
      items: [
        "Gạo nếp rẫy của người Cơ Tu.",
        "Nước suối.",
        "Ống tre hoặc ống nứa non."
      ] 
    },
    { 
      label: "Cách Chế Biến", 
      color: C.gold, 
      items: [
        "Gạo nếp được vo sạch, ngâm trong nước suối vài giờ để hạt gạo mềm và nở đều.",
        "Cho gạo vào ống tre non, thêm lượng nước vừa đủ, bịt kín miệng bằng lá rừng hoặc lá chuối.",
        "Đặt ống cơm nghiêng trên bếp than hoặc vùi trong than hồng, xoay đều để cơm chín từ từ.",
        "Khi chín, bóc lớp vỏ tre bên ngoài để lộ phần cơm dẻo, thơm mùi đặc trưng của tre nứa."
      ] 
    },
    { 
      label: "Trường Hợp Sử Dụng", 
      color: C.clay, 
      items: [
        "Sử dụng phổ biến trong bữa ăn hằng ngày.",
        "Thuận tiện khi đi rẫy, đi rừng.",
        "Xuất hiện trong lễ hội, tiếp khách và sinh hoạt cộng đồng như món ăn mang tính đại diện."
      ] 
    },
  ] : [
    { label: "Ingredients", color: C.leaf, items: [
      "Upland glutinous rice.",
      "Stream water.",
      "Young bamboo tubes."
    ]},
    { label: "Preparation", color: C.gold, items: [
      "Rinse and soak the rice in stream water for several hours until softened.",
      "Fill bamboo tubes with rice and water, seal with forest or banana leaves.",
      "Place over charcoal or bury in embers, rotating evenly for slow cooking.",
      "Peel the outer bamboo layer to reveal fragrant sticky rice infused with bamboo aroma."
    ]},
    { label: "Usage", color: C.clay, items: [
      "Common in daily meals.",
      "Convenient for forest and farming trips.",
      "Served in festivals and community gatherings as a representative dish."
    ]},
  ],
  imgso8
);

const Page12BanhSungTrau = makeAmThuc(
  "Bánh Sừng Trâu (Avị Cuốt)", 
  "Buffalo Horn Cake (Avị Cuốt)", 
  "Bánh truyền thống trong lễ hội Cơ Tu",
  (lang) => lang === "vi" ? [
    { label: "Nguyên Liệu", color: C.leaf, items: [
      "Gạo nếp rẫy giã nhuyễn.",
      "Lá đót hoặc lá dong rừng để gói."
    ]},
    { label: "Cách Chế Biến", color: C.gold, items: [
      "Gạo nếp ngâm mềm, đồ chín thành xôi rồi giã trong cối gỗ cho đến khi kết dính.",
      "Nặn thành thanh dài, gói trong lá đót hoặc lá dong, buộc chặt.",
      "Luộc trong nước sôi trong thời gian dài để bánh chín đều.",
      "Khi chín, bánh dẻo, thơm và thường được cắt thành từng khoanh nhỏ."
    ]},
    { label: "Trường Hợp Sử Dụng", color: C.clay, items: [
      "Lễ hội truyền thống, lễ mừng lúa mới, lễ cưới.",
      "Nghi lễ cộng đồng, mang ý nghĩa tinh thần và sự đoàn kết."
    ]},
  ] : [
    { label: "Ingredients", color: C.leaf, items: [
      "Ground upland glutinous rice.",
      "Forest leaves (đót or dong leaves)."
    ]},
    { label: "Preparation", color: C.gold, items: [
      "Steam soaked rice, then pound until sticky.",
      "Shape into long pieces, wrap in leaves and tie tightly.",
      "Boil for a long time until fully cooked.",
      "Slice into small pieces when serving."
    ]},
    { label: "Usage", color: C.clay, items: [
      "Festivals, new rice celebrations, weddings.",
      "Community rituals symbolizing unity."
    ]},
  ],
  imgso9
);

const Page13ThitGacBep = makeAmThuc(
  "Thịt Gác Bếp (Pa'riêng)", 
  "Smoked Fireside Meat (Pa'riêng)", 
  "Món truyền thống đầu năm mới của người Cơ Tu",
  (lang) => lang === "vi" ? [
    { label: "Nguyên Liệu", color: C.leaf, items: [
      "Các loại thịt: trâu, bò, heo, gà hoặc thịt thú rừng.",
      "Muối, sả, ớt rừng, tiêu rừng và một số lá gia vị."
    ]},
    { label: "Cách Chế Biến", color: C.gold, items: [
      "Thịt được làm sạch, chặt miếng vừa ăn, ướp với muối hột giã nhỏ, ớt rừng và lá gia vị.",
      "Xiên vào que tre hoặc kẹp bằng thanh tre, nướng trực tiếp trên bếp than.",
      "Trong quá trình nướng, trở đều tay để thịt chín đều và không bị cháy.",
      "Khi chín, lớp ngoài vàng sẫm, bên trong vẫn giữ được độ ngọt tự nhiên và hương thơm đặc trưng."
    ]},
    { label: "Trường Hợp Sử Dụng", color: C.clay, items: [
      "Thường chế biến vào dịp cuối năm, đặc biệt đầu năm mới là mùa pa'riêng.",
      "Dùng trong lễ hội, Tết, mâm đãi khách và làm quà biếu trong các dịp quan trọng."
    ]},
  ] : [
    { label: "Ingredients", color: C.leaf, items: [
      "Buffalo, beef, pork, chicken, or game meat.",
      "Salt, lemongrass, forest chilies, forest pepper, aromatic leaves."
    ]},
    { label: "Preparation", color: C.gold, items: [
      "Clean and cut meat into pieces, marinate with salt, chili, and aromatic leaves.",
      "Skewer on bamboo sticks or clamp with bamboo strips, grill over charcoal.",
      "Turn regularly to ensure even cooking and prevent burning.",
      "The exterior becomes dark golden while the inside remains naturally sweet and flavorful."
    ]},
    { label: "Usage", color: C.clay, items: [
      "Prepared at the end of the year, especially for the New Year season.",
      "Used in festivals, Tết, feasts, and as gifts on important occasions."
    ]},
  ],
  imgso10
);

const Page14CanhThut = makeAmThuc(
  "Canh Thụt (Zirá)", 
  "Pounded Bamboo Soup (Zirá)", 
  "Món canh đặc sắc nấu trong ống nứa",
  (lang) => lang === "vi" ? [
    { label: "Nguyên Liệu", color: C.leaf, items: [
      "Rau măng, dọc mùng.",
      "Thịt rừng hoặc cá suối.",
      "Mối, dế bầu hoặc dế dủi."
    ]},
    { label: "Cách Chế Biến", color: C.gold, items: [
      "Cho tất cả nguyên liệu vào ống nứa tươi, đặt lên bếp đun chín.",
      "Khi gần chín, dùng gai mây thụt nhẹ nhàng cho đến khi các nguyên liệu nhừ và quyện lại.",
      "Thêm muối, ớt, tiếp tục thụt đều, có thể thêm rau thơm rồi nhắc ra."
    ]},
    { label: "Trường Hợp Sử Dụng", color: C.clay, items: [
      "Bữa ăn gia đình.",
      "Lễ nhỏ hoặc sinh hoạt cộng đồng."
    ]},
  ] : [
    { label: "Ingredients", color: C.leaf, items: [
      "Bamboo shoots, taro stem.",
      "Forest meat or stream fish.",
      "Termites, field crickets, or mole crickets."
    ]},
    { label: "Preparation", color: C.gold, items: [
      "Place all ingredients into a fresh bamboo tube and cook over fire.",
      "Pound gently with a rattan stick until soft and blended into a thick mixture.",
      "Add salt and chili, pound evenly, optionally add herbs, then remove from heat."
    ]},
    { label: "Usage", color: C.clay, items: [
      "Family meals.",
      "Small ceremonies and community gatherings."
    ]},
  ],
  imgso11
);

const Page15CaNien = makeAmThuc(
  "Cá Niên Nướng", 
  "Grilled Stream Fish (Cá Niên)", 
  "Đặc sản suối rừng của người Cơ Tu",
  (lang) => lang === "vi" ? [
    { label: "Nguyên Liệu", color: C.leaf, items: [
      "Cá niên đánh bắt tại các suối.",
      "Muối, ớt rừng."
    ]},
    { label: "Cách Chế Biến", color: C.gold, items: [
      "Cá được làm sạch, bỏ ruột và rửa bằng nước suối.",
      "Ướp nhẹ với muối và ớt rừng.",
      "Xiên qua thân bằng que tre hoặc kẹp giữa hai thanh tre, nướng trên than hồng.",
      "Khi chín, cá có lớp da vàng thơm; khi ăn xé nhỏ, chấm muối ớt hoặc ăn kèm cơm lam."
    ]},
    { label: "Trường Hợp Sử Dụng", color: C.clay, items: [
      "Bữa ăn gia đình.",
      "Trong các chuyến đi rừng, đi suối."
    ]},
  ] : [
    { label: "Ingredients", color: C.leaf, items: [
      "Stream fish (cá niên).",
      "Salt, forest chili."
    ]},
    { label: "Preparation", color: C.gold, items: [
      "Clean the fish, remove entrails, rinse with stream water.",
      "Lightly marinate with salt and chili.",
      "Skewer with bamboo or clamp between bamboo sticks, grill over charcoal.",
      "Serve torn into pieces, dipped in chili salt or eaten with bamboo rice."
    ]},
    { label: "Usage", color: C.clay, items: [
      "Family meals.",
      "Forest and stream trips."
    ]},
  ],
  imgso12
);

const Page16ThitLam = makeAmThuc(
  "Thịt Lam (Pơr'hor Aọc)", 
  "Bamboo-Steamed Meat (Pơr'hor Aọc)", 
  "Món nướng ống nứa thơm hương rừng",
  (lang) => lang === "vi" ? [
    { label: "Nguyên Liệu", color: C.leaf, items: [
      "Thịt heo, chim hoặc gà.",
      "Rau môn thục, muối, ớt, tiêu."
    ]},
    { label: "Cách Chế Biến", color: C.gold, items: [
      "Thịt làm sạch, thái miếng vuông nhỏ, ướp với muối, ớt giã và lá rừng thơm.",
      "Ướp trong một khoảng thời gian để gia vị thấm đều.",
      "Cho vào ống nứa non, bịt kín bằng lá rừng.",
      "Đặt trên than hoặc vùi trong tro nóng, xoay đều để thịt chín từ từ.",
      "Thịt giữ được độ mềm và hấp thu hương thơm đặc trưng của tre nứa."
    ]},
    { label: "Trường Hợp Sử Dụng", color: C.clay, items: [
      "Bữa ăn hằng ngày.",
      "Trong các chuyến đi rừng, đi rẫy.",
      "Các buổi tụ họp cộng đồng quy mô nhỏ."
    ]},
  ] : [
    { label: "Ingredients", color: C.leaf, items: [
      "Pork, chicken, or wild birds.",
      "Taro stem, salt, chili, pepper."
    ]},
    { label: "Preparation", color: C.gold, items: [
      "Cut meat into cubes, marinate with salt, chili, and aromatic leaves.",
      "Let it rest to absorb seasoning.",
      "Place into bamboo tubes and seal with leaves.",
      "Cook over charcoal or in hot ash, rotating evenly.",
      "The meat remains tender and absorbs the natural bamboo aroma."
    ]},
    { label: "Usage", color: C.clay, items: [
      "Daily meals.",
      "Forest or farming trips.",
      "Small community gatherings."
    ]},
  ],
  imgso13
);

// Tools pages
function makeTool(title, titleEn, sub, isTransport, getSec, imgUrl) {
  return function({ lang }) {
    const sections = getSec(lang);
    return (
      <PageShell bgVariant="b">
        <div style={{ position: "absolute", top: 36, bottom: 36, left: 40, right: 40, display: "flex", alignItems: "stretch" }}>
          <div style={{ flex: 1, paddingRight: 20, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontSize: 7.5, letterSpacing: "2.5px", textTransform: "uppercase", color: C.textMuted, marginBottom: 8, fontFamily: "'Be Vietnam Pro',sans-serif" }}>
              {isTransport ? (lang === "vi" ? "Di Sản Vật Thể › Phương Tiện Đi Lại" : "Tangible Heritage › Transportation") : (lang === "vi" ? "Di Sản Vật Thể › Công Cụ Lao Động" : "Tangible Heritage › Labor Tools")}
            </div>
            <div style={{ fontSize: "clamp(18px,2.2vw,28px)", fontWeight: 700, color: C.cream, lineHeight: 1.15, fontFamily: "'Playfair Display',serif", textShadow: `0 0 25px ${C.leaf}66` }}>
              {lang === "vi" ? title : titleEn}
            </div>
            <div style={{ fontSize: "clamp(9px,1vw,11px)", fontStyle: "italic", color: C.goldLight, marginBottom: 10, marginTop: 4, fontFamily: "'Lora',serif" }}>
              {sub}
            </div>
            <SectionDivider />
            <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 10 }}>
              {sections.map((sec, i) => <ContentCard key={i} {...sec} />)}
            </div>
            <PageFooter lang={lang} />
          </div>
          <VDivider />
          <div style={{
            width: "36%", flexShrink: 0,
            paddingLeft: 18, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 14,
          }}>
            {imgUrl ? (
              <div style={{
                width: "100%", height: 520, position: "relative",
                border: `1px solid ${C.gold}44`, borderRadius: 2, overflow: "hidden",
                boxShadow: `0 4px 15px rgba(0,0,0,0.3)`,
              }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${imgUrl}')`, backgroundSize: "cover", backgroundPosition: "center top" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, rgba(10,25,12,0.4), transparent 30%)`, pointerEvents: "none" }} />
              </div>
            ) : (
              <div style={{ display: "flex", gap: 10 }}>
                <CoTuDiamond size={12} color={C.gold} />
                <CoTuDiamond size={16} color={C.leaf} />
                <CoTuDiamond size={12} color={C.gold} />
              </div>
            )}
            <CoTuBorder color={C.clay} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 7.5, letterSpacing: "3px", textTransform: "uppercase", color: C.textMuted, fontFamily: "'Be Vietnam Pro',sans-serif" }}>
                {isTransport ? (lang === "vi" ? "Phương Tiện" : "Transportation") : (lang === "vi" ? "Công Cụ" : "Labor Tools")}
              </div>
              <div style={{ fontSize: 7.5, letterSpacing: "2px", textTransform: "uppercase", color: C.textMuted, marginTop: 3, fontFamily: "'Be Vietnam Pro',sans-serif" }}>
                {lang === "vi" ? "Người Cơ Tu" : "Cơ Tu People"}
              </div>
            </div>
            <CoTuBorder color={C.clay} />
          </div>
        </div>
      </PageShell>
    );
  };
}

const Page17ThuyenDocMoc = makeTool(
  "Thuyền Độc Mộc", 
  "Dugout Canoe", 
  "Phương tiện thủy thủ công trên sông suối Trường Sơn",
  true,
  (lang) => lang === "vi" ? [
    { label: "Mô Tả", color: C.leaf, items: [
      "Phương tiện thủ công được chế tác từ thân cây gỗ lớn khoét rỗng, tạo hình thon dài.",
      "Kích thước vừa phải, đủ chỗ cho 1–2 người, phù hợp với sông và suối sâu."
    ]},
    { label: "Công Dụng", color: C.gold, items: [
      "Di chuyển trên các dòng nước để đánh bắt cá, vận chuyển lâm sản và nông sản.",
      "Phục vụ giao thương, trao đổi sản phẩm và kết nối các cộng đồng cư dân."
    ]},
    { label: "Ý Nghĩa", color: C.clay, items: [
      "Minh chứng cho lối sống gắn với môi trường sông nước miền núi và tri thức chế tác truyền thống.",
      "Góp phần duy trì tương tác kinh tế – văn hóa giữa các cộng đồng dọc hệ thống sông suối."
    ]},
  ] : [
    { label: "Description", color: C.leaf, items: [
      "A handmade boat carved from a hollowed tree trunk, shaped into a long, narrow form.",
      "Sized for 1–2 people, suitable for rivers and deeper streams."
    ]},
    { label: "Uses", color: C.gold, items: [
      "Used for fishing, transporting forest and agricultural products.",
      "Facilitates trade and connection between communities."
    ]},
    { label: "Significance", color: C.clay, items: [
      "Represents a lifestyle closely tied to mountain water environments and traditional craftsmanship.",
      "Maintains economic and cultural interaction among riverine communities."
    ]},
  ],
  imgso14
);

const Page18Riu = makeTool(
  "Rìu (Achải)", 
  "Axe (Achải)", 
  "Công cụ khai phá rừng và chuẩn bị đất canh tác",
  false,
  (lang) => lang === "vi" ? [
    { label: "Mô Tả", color: C.leaf, items: [
      "Công cụ lao động chủ yếu trong khai phá rừng và chuẩn bị đất.",
      "Lưỡi rìu rèn bằng sắt, dày và nặng, phù hợp chặt cây lớn và chẻ gỗ.",
      "Cán làm từ gỗ rừng bản địa, kết cấu chắc chắn, tạo lực chặt mạnh."
    ]},
    { label: "Công Dụng", color: C.gold, items: [
      "Chặt cây, dọn thực bì, chuẩn bị mặt bằng khi mở rẫy.",
      "Khai thác gỗ để dựng nhà, làm cột, đóng vách hoặc chế tác công cụ."
    ]},
    { label: "Ý Nghĩa", color: C.clay, items: [
      "Biểu tượng của sức lao động cơ bản trong nông nghiệp nương rẫy.",
      "Thể hiện kỹ năng rèn sắt kết hợp với tri thức sinh thái bản địa."
    ]},
  ] : [
    { label: "Description", color: C.leaf, items: [
      "Primary tool for forest clearing and land preparation.",
      "Heavy iron-forged blade suitable for cutting large trees.",
      "Handle made from local wood, sturdy and powerful."
    ]},
    { label: "Uses", color: C.gold, items: [
      "Clear vegetation and prepare land for cultivation.",
      "Harvest timber for building and crafting tools."
    ]},
    { label: "Significance", color: C.clay, items: [
      "Symbol of essential labor in swidden agriculture.",
      "Reflects ironworking skills and indigenous ecological knowledge."
    ]},
  ],
  imgso15
);

const Page19Gui = makeTool(
  "Gùi (A Đhơ / A R'đh)", 
  "Backpack Basket (A Đhơ)", 
  "Dụng cụ đan lát vận chuyển truyền thống",
  false,
  (lang) => lang === "vi" ? [
    { label: "Mô Tả", color: C.leaf, items: [
      "Dụng cụ đan thủ công từ mây, tre với miệng rộng, thân thuôn dài và đáy chắc.",
      "Dây đeo qua trán hoặc vai giúp giữ thăng bằng khi di chuyển địa hình gồ ghề."
    ]},
    { label: "Công Dụng", color: C.gold, items: [
      "Mang lương thực, rau rừng, củi và sản phẩm thu hái, săn bắt.",
      "Vận chuyển hàng hóa trên các tuyến đường mòn dài."
    ]},
    { label: "Ý Nghĩa", color: C.clay, items: [
      "Biểu tượng của nghề đan lát truyền thống và tay nghề cao.",
      "Gắn liền với đời sống lao động nương rẫy và sinh hoạt hằng ngày."
    ]},
  ] : [
    { label: "Description", color: C.leaf, items: [
      "Handwoven basket from rattan and bamboo with wide opening and sturdy base.",
      "Straps worn on forehead or shoulders for balance."
    ]},
    { label: "Uses", color: C.gold, items: [
      "Carry food, forest goods, firewood, and harvest products.",
      "Transport goods along mountain trails."
    ]},
    { label: "Significance", color: C.clay, items: [
      "Symbol of traditional weaving craftsmanship.",
      "Closely tied to daily labor and subsistence activities."
    ]},
  ],
  imgso16
);

const Page20GayChocLo = makeTool(
  "Gậy Chọc Lỗ (Apắt)", 
  "Dibble Stick (Apắt)", 
  "Công cụ gieo hạt trong nông nghiệp nương rẫy",
  false,
  (lang) => lang === "vi" ? [
    { label: "Mô Tả", color: C.leaf, items: [
      "Thanh gỗ chắc, thon dài, đầu vót nhọn để tạo lỗ gieo hạt.",
      "Thiết kế phù hợp thao tác đứng, giảm mệt mỏi khi làm việc diện rộng."
    ]},
    { label: "Công Dụng", color: C.gold, items: [
      "Tạo lỗ gieo hạt lúa rẫy, ngô, kê, đậu.",
      "Giữ nguyên cấu trúc đất, hạn chế xáo trộn lớp đất hữu cơ."
    ]},
    { label: "Ý Nghĩa", color: C.clay, items: [
      "Thể hiện tri thức canh tác bản địa hiệu quả.",
      "Phản ánh nhận thức sâu sắc về hệ sinh thái và sản xuất bền vững."
    ]},
  ] : [
    { label: "Description", color: C.leaf, items: [
      "A pointed wooden stick used to make planting holes.",
      "Designed for standing use to reduce fatigue."
    ]},
    { label: "Uses", color: C.gold, items: [
      "Create holes for planting crops.",
      "Preserve soil structure and nutrients."
    ]},
    { label: "Significance", color: C.clay, items: [
      "Represents efficient indigenous farming knowledge.",
      "Reflects sustainable ecological understanding."
    ]},
  ],
  imgso17
);

const Page21ChayGiaGao = makeTool(
  "Chày Giã Gạo (A Rơl)", 
  "Rice Mortar & Pestle (A Rơl)", 
  "Không gian xã hội hóa lao động của phụ nữ Cơ Tu",
  false,
  (lang) => lang === "vi" ? [
    { label: "Mô Tả", color: C.leaf, items: [
      "Bộ cối và chày làm từ khối gỗ lớn, lòng sâu, được gia công hoàn toàn thủ công.",
      "Thiết kế chắc chắn, vừa tay, phù hợp với thao tác giã lúa sau khi phơi khô."
    ]},
    { label: "Công Dụng", color: C.gold, items: [
      "Giã lúa rẫy để bóc vỏ, tách hạt và thu được gạo phục vụ sinh hoạt hằng ngày.",
      "Là khâu thiết yếu trong quá trình chế biến nông sản sau mỗi vụ mùa."
    ]},
    { label: "Ý Nghĩa", color: C.clay, items: [
      "Không gian để phụ nữ gặp gỡ, trò chuyện và chia sẻ kinh nghiệm sống.",
      "Thể hiện sự giao thoa giữa lao động sản xuất và đời sống văn hóa cộng đồng.",
      "Góp phần duy trì truyền thống gia đình và kỹ năng thủ công qua nhiều thế hệ."
    ]},
  ] : [
    { label: "Description", color: C.leaf, items: [
      "A mortar and pestle set carved from a large wooden block with a deep hollow.",
      "Sturdy and ergonomic design suitable for pounding dried rice."
    ]},
    { label: "Uses", color: C.gold, items: [
      "Used to hull upland rice, separate grains, and produce rice for daily consumption.",
      "An essential step in post-harvest processing."
    ]},
    { label: "Significance", color: C.clay, items: [
      "A social space where women gather, interact, and share experiences.",
      "Represents the intersection of labor and cultural life.",
      "Helps preserve traditional knowledge and family practices across generations."
    ]},
  ],
  imgso18
);
const Page22CongCuSan = makeTool(
  "Công Cụ Săn Bắt (A Păng)", 
  "Hunting Tools (A Păng)", 
  "Hệ thống dụng cụ khai thác tài nguyên rừng – suối",
  false,
  (lang) => lang === "vi" ? [
    { label: "Mô Tả", color: C.leaf, items: [
      "Hệ thống bẫy thú đặt dọc lối mòn, làm từ tre, gỗ và dây mây.",
      "Bao gồm lưới, đó, chài dùng để đánh bắt cá suối.",
      "Sử dụng vật liệu bản địa, linh hoạt và dễ bố trí trong môi trường rừng – suối.",
      "Kỹ thuật đặc trưng: dùng lá cây rừng có độc nhẹ thả xuống suối để làm tê cá."
    ]},
    { label: "Công Dụng", color: C.gold, items: [
      "Bắt thú nhỏ như cheo cheo, sóc, chim để bổ sung nguồn thực phẩm.",
      "Đánh bắt cá suối phục vụ nhu cầu ăn uống hằng ngày.",
      "Khai thác các sản phẩm lâm sinh phục vụ sinh kế."
    ]},
    { label: "Ý Nghĩa", color: C.clay, items: [
      "Phản ánh hiểu biết sâu sắc về hệ sinh thái rừng và suối.",
      "Thể hiện kinh nghiệm quan sát thiên nhiên lâu đời và tri thức bản địa.",
      "Biểu tượng cho hệ thống sinh kế đa dạng và linh hoạt của cộng đồng miền núi."
    ]},
  ] : [
    { label: "Description", color: C.leaf, items: [
      "A system of animal traps placed along forest trails, made from bamboo, wood, and rattan.",
      "Includes nets and fish traps for catching stream fish.",
      "Constructed from local materials, adaptable to forest and river environments.",
      "Characteristic method: using mildly toxic forest leaves to stun fish."
    ]},
    { label: "Uses", color: C.gold, items: [
      "Capture small animals such as deer, squirrels, and birds for food.",
      "Catch fish from streams for daily consumption.",
      "Collect forest resources to support livelihoods."
    ]},
    { label: "Significance", color: C.clay, items: [
      "Reflects deep ecological knowledge of forest and stream environments.",
      "Demonstrates long-standing observation-based indigenous experience.",
      "Symbolizes a diverse and adaptable livelihood system of mountain communities."
    ]},
  ],
  imgso19
);

function makeLeHoi(title, titleEn, sub, getMeta, getSec, images) {
  return function LeHoiPage({ lang }) {
    const sections = getSec(lang);
    const meta = getMeta(lang);
 
    // Chia sections thành các trang — mỗi trang tối đa 3 sections
    const SECTIONS_PER_PAGE = 3;
    const pages = [];
    for (let i = 0; i < sections.length; i += SECTIONS_PER_PAGE) {
      pages.push(sections.slice(i, i + SECTIONS_PER_PAGE));
    }
    const totalPages = pages.length;
 
    const [pageIdx, setPageIdx] = useState(0);
 
    return (
      <div
        style={{
          position: "absolute",
          top: 36,
          bottom: 36,
          left: 40,
          right: 40,
          display: "flex",
          alignItems: "stretch",
        }}
      >
        {/* ── LEFT: nội dung ── */}
        <div
          style={{
            flex: 1,
            paddingRight: 20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* Breadcrumb */}
          <div
            style={{
              fontSize: 7.5,
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              color: C.textMuted,
              marginBottom: 8,
              fontFamily: "'Be Vietnam Pro', sans-serif",
            }}
          >
            {lang === "vi"
              ? "Di Sản Phi Vật Thể › Lễ Hội & Nghi Lễ"
              : "Intangible Heritage › Festivals & Rituals"}
          </div>
 
          {/* Title */}
          <div
            style={{
              fontSize: "clamp(16px, 2vw, 22px)",
              fontWeight: 700,
              color: C.cream,
              lineHeight: 1.15,
              fontFamily: "'Playfair Display', serif",
            }}
          >
            {lang === "vi" ? title : titleEn}
          </div>
 
          {/* Sub */}
          <div
            style={{
              fontSize: "clamp(9px, 1vw, 11px)",
              fontStyle: "italic",
              color: C.goldLight,
              marginBottom: 6,
              marginTop: 4,
              fontFamily: "'Lora', serif",
            }}
          >
            {sub}
          </div>
 
          {/* Meta */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 8 }}>
            {meta.map((m, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <CoTuDiamond size={5} color={C.goldLight} />
                <span
                  style={{
                    fontSize: "clamp(8px, 0.9vw, 9.5px)",
                    color: C.textMuted,
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                  }}
                >
                  {m}
                </span>
              </div>
            ))}
          </div>
 
          <SectionDivider />
 
          {/* Content page hiện tại */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8, flex: 1 }}>
            {pages[pageIdx].map((sec, i) => (
              <ContentCard key={i} {...sec} />
            ))}
          </div>
 
          {/* Content pagination — chỉ hiện khi > 1 trang */}
          {totalPages > 1 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 10,
                paddingTop: 8,
                borderTop: `1px solid ${C.gold}33`,
              }}
            >
              {/* Dots indicator */}
              <div style={{ display: "flex", gap: 5 }}>
                {pages.map((_, i) => (
                  <div
                    key={i}
                    onClick={() => setPageIdx(i)}
                    style={{
                      width: i === pageIdx ? 14 : 5,
                      height: 5,
                      borderRadius: 3,
                      background: i === pageIdx ? C.goldLight : `${C.goldLight}44`,
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  />
                ))}
              </div>
 
              {/* Page counter */}
              <span
                style={{
                  fontSize: 9,
                  color: C.textMuted,
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  letterSpacing: "1px",
                }}
              >
                {pageIdx + 1} / {totalPages}
              </span>
 
              {/* Prev / Next buttons */}
              <div style={{ display: "flex", gap: 6 }}>
                <button
                  disabled={pageIdx === 0}
                  onClick={() => setPageIdx((p) => Math.max(0, p - 1))}
                  style={contentNavBtn(pageIdx === 0)}
                >
                  {lang === "vi" ? "← Trước" : "← Prev"}
                </button>
                <button
                  disabled={pageIdx === totalPages - 1}
                  onClick={() => setPageIdx((p) => Math.min(totalPages - 1, p + 1))}
                  style={contentNavBtn(pageIdx === totalPages - 1)}
                >
                  {lang === "vi" ? "Tiếp →" : "Next →"}
                </button>
              </div>
            </div>
          )}
        </div>
 
        {/* ── VERTICAL DIVIDER ── */}
        <div
          style={{
            width: 1,
            background: `linear-gradient(to bottom, transparent, ${C.gold}44, transparent)`,
            flexShrink: 0,
          }}
        />
 
        {/* ── RIGHT: image slider ── */}
        <div
          style={{
            width: "34%",
            flexShrink: 0,
            paddingLeft: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <ImageSlider images={images} />
 
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: 7.5,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: C.textMuted,
                fontFamily: "'Be Vietnam Pro', sans-serif",
              }}
            >
              Di Sản Phi Vật Thể
            </div>
            <div
              style={{
                fontSize: 7.5,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: C.textMuted,
                marginTop: 3,
                fontFamily: "'Be Vietnam Pro', sans-serif",
              }}
            >
              Lễ Hội Truyền Thống
            </div>
          </div>
        </div>
      </div>
    );
  };
}
 
function contentNavBtn(disabled) {
  return {
    padding: "4px 10px",
    fontSize: 9,
    fontFamily: "'Be Vietnam Pro', sans-serif",
    letterSpacing: "1px",
    border: `1px solid ${disabled ? C.gold + "22" : C.gold + "66"}`,
    borderRadius: 2,
    background: "transparent",
    color: disabled ? C.textMuted + "55" : C.goldLight,
    cursor: disabled ? "default" : "pointer",
    opacity: disabled ? 0.4 : 1,
    transition: "all 0.2s",
  };
}
 
// ─────────────────────────────────────────────
// Images data — mỗi item: { url, title, caption, source }
// Thay url bằng ảnh thật từ project
// ─────────────────────────────────────────────
const IMAGES_LUA_MOI = [
  {
    url: "https://cly.1cdn.vn/2023/11/30/z4911100426880_620eabbd17c3331a7b259c2b124c0a3c.jpg",
    title: "Cúng thần lúa tại rẫy",
    caption: "Già làng thực hiện nghi lễ cúng thần lúa ngay tại nương rẫy, xin phép thu hoạch trước khi mang lúa về làng.",
  },
  {
    url: "https://media.vov.vn/uploaded/gyj8ypvaewcwkozvalyua/2017_06_08/hinh_6_yijr.jpg",
    title: "Cây nêu – trục vũ trụ (x'nur)",
    caption: "Cây nêu được trang trí họa tiết mặt trời, núi, lúa, thú — đóng vai trò trục vũ trụ kết nối trời đất trong lễ hội.",
  },
  {
    url: "https://cdn2.tuoitre.vn/thumb_w/1200/tto/i/s626/2017/02/09/0cd8a971.jpg",
    title: "Nghi thức đâm trâu – trung tâm lễ hội",
    caption: "Trâu buộc vào cây nêu giữa sân lễ. Già làng khai nhát đầu tiên trong tiếng cồng chiêng và điệu múa xoay quanh cây nêu.",
  },
  {
    url: "https://cdn-i2.congthuong.vn/stores/news_dataimages/2023/042023/27/11/dsc0978320230427114748.jpg?rt=20230427132221",
    title: "Múa tung tung da dá",
    caption: "Điệu múa tung tung da dá — nam nữ phối hợp nhịp nhàng trong tiếng cồng chiêng rộn ràng, thể hiện sự gắn kết cộng đồng.",
  },
];
 
const IMAGES_NHA_GUOL = [
  {
    url: "https://imagevietnam.vnanet.vn//MediaUpload/Org/2024/11/29/1829-19-36-58.jpg",
    title: "Nhà Gươl – trung tâm tinh thần của làng",
    caption: "Nhà Gươl là trung tâm văn hóa và linh hồn làng Cơ Tu. Nơi diễn ra mọi nghi lễ quan trọng và quyết định cộng đồng.",
  },
  {
    url: "https://vanhoatinnguong.vn/Uploads/images/cung%20lap%20lang%20nguoi%20co%20tu%202.jpg",
    title: "Nghi lễ chọn đất & xin phép thần linh",
    caption: "Già làng chủ trì nghi lễ xin phép thần linh trước khi khởi công. Đây là bước không thể thiếu trong văn hóa vạn vật hữu linh Cơ Tu.",
  },
  {
    url: "https://images.baoangiang.com.vn/image/fckeditor/upload/2024/20240107/images/67db1921766d9f33c67c.jpg",
    title: "Dựng cột cái – trục linh thiêng",
    caption: "Nghi thức dựng cột cái — trục linh thiêng của ngôi nhà — phải thực hiện đúng thời điểm tốt với nghi lễ cúng trang trọng đầy đủ.",
  },
  {
    url: "https://images.vietnamtourism.gov.vn/vn/images/2014/AnhInternet/quangnam-tranhdieukhac2.jpg",
    title: "Hoa văn chạm khắc Cơ Tu",
    caption: "Nghệ nhân chạm khắc hoa văn truyền thống lên các cấu kiện nhà Gươl — lưu giữ ký ức văn hóa và thế giới quan của tộc người.",
  },
];
 
const IMAGES_KET_NGHIA = [
  {
    url: "https://danang.gov.vn/documents/37638/3163967/85414eef6999e7c7be88.jpg/970d9fdd-3900-f5a4-ce6b-34212029d051?t=1769910044253h",
    title: "Cúng thần linh Pơr'ngoóch",
    caption: "Nghi lễ cúng Giàng và tổ tiên khai mở lễ kết nghĩa — xin chứng giám cho mối quan hệ anh em giữa hai làng.",
  },
  {
    url: "https://images.baodantoc.vn/uploads/2022/11/13/1653382972213/1.jpg",
    title: "Múa tung tung da dá – giao lưu hai làng",
    caption: "Điệu múa tung tung da dá trong tiếng cồng chiêng tạo không khí vui tươi, gắn kết hai cộng đồng trong ngày kết nghĩa.",
  },
];
 

export const Page23LeMungLuaMoi = makeLeHoi(
  "Lễ Mừng Lúa Mới (Cha Ha Roo Tamêê)",
  "New Rice Festival",
  "Nghi lễ nông nghiệp gắn với chu kỳ lúa rẫy",
  (lang) =>
    lang === "vi"
      ? [
          "Quảng Nam – Đông Giang, Tây Giang, Nam Giang",
          "Tháng 10 âm lịch – sau thu hoạch lúa rẫy",
          "Chuẩn bị 7–10 ngày, lễ chính kéo dài nhiều ngày",
        ]
      : [
          "Quảng Nam – Đông Giang, Tây Giang, Nam Giang",
          "10th lunar month – after upland rice harvest",
          "7–10 days preparation, main ceremony spans several days",
        ],
  (lang) =>
    lang === "vi"
      ? [
          {
            label: "Khái Quát Chung",
            color: C.leaf,
            items: [
              "Nghi lễ tiêu biểu phản ánh đời sống kinh tế, văn hóa và tín ngưỡng người Cơ Tu.",
              "Cây lúa là biểu tượng của sự sống, no đủ và ổn định của làng — không chỉ là lương thực.",
              "Ngay cả những năm mất mùa, nghi lễ vẫn duy trì — thể hiện nhu cầu tinh thần bền vững.",
              "Cúng thần lúa ngay tại rẫy, xin phép thu hoạch trước khi mang lúa về làng.",
            ],
          },
          {
            label: "Ý Nghĩa Văn Hoá – Tín Ngưỡng",
            color: C.gold,
            items: [
              "Thể hiện tín ngưỡng đa thần, trung tâm là Giàng (thần linh tối cao).",
              "Mọi yếu tố tự nhiên đều có linh hồn và quyền năng chi phối đời sống con người.",
              "Kết nối ba thế giới: Con người – Thiên nhiên – Thần linh.",
              "Hình tượng 'Giàng lúa' — người Cơ Tu nhân cách hóa cây lúa như thực thể sống có linh hồn.",
              "Lễ mừng lúa mới là cách tái lập sự cân bằng vũ trụ sau một chu kỳ sản xuất.",
            ],
          },
          {
            label: "Không Gian & Biểu Tượng",
            color: C.gold,
            items: [
              "Nhà Gươl – trung tâm quyền lực tinh thần và sinh hoạt chung của làng.",
              "Cây nêu (x'nur) – trục vũ trụ kết nối trời và đất trong không gian lễ hội.",
              "Cây đ'đoong làm không gian nghi lễ thêm sinh động và giàu ý nghĩa tâm linh.",
              "Đong Bh'nuôih – khu vực cúng tế riêng biệt, mang tính linh thiêng cao.",
              "Cây nêu trang trí họa tiết: mặt trời, núi, lúa, động vật — biểu tượng vũ trụ quan Cơ Tu.",
            ],
          },
          {
            label: "Công Tác Chuẩn Bị (7–10 ngày)",
            color: C.clay,
            items: [
              "Dựng cây nêu và trang trí các họa tiết biểu tượng về vũ trụ và đời sống.",
              "Sửa chữa, dọn dẹp nhà Gươl để thanh lọc không gian thiêng trước nghi lễ.",
              "Chuẩn bị lễ vật: trâu, heo, gà, rượu cần và lúa mới.",
              "Phân công nhiệm vụ theo giới tính, độ tuổi và vai trò xã hội — củng cố đoàn kết làng.",
            ],
          },
          {
            label: "Trình Tự Nghi Lễ",
            color: C.clay,
            items: [
              "Đêm trước: tụ họp tại Gươl, hát lý, kể chuyện, uống rượu cần.",
              "Nghi thức 'tế trâu' khai mạc — đánh dấu chuyển từ đời thường sang không gian linh thiêng.",
              "Già làng dâng lúa mới, máu trâu, rượu cần — khấn cầu mùa màng, sức khỏe, bình an.",
              "Đâm trâu: buộc trâu vào cây nêu, già làng khai nhát đầu, thanh niên tiếp tục theo lễ.",
              "Sau lễ: dâng áo, chiếu, gạo lên thân trâu — tăng tính linh thiêng của vật hiến sinh.",
            ],
          },
          {
            label: "Phần Hội – Không Gian Cộng Đồng",
            color: C.leaf,
            items: [
              "Múa tung tung da dá trong tiếng cồng chiêng rộn ràng — nghệ thuật truyền thống đặc sắc.",
              "Ẩm thực: cơm lam, thịt nướng, cá suối, rượu cần — bữa ăn cộng đồng sau lễ.",
              "Thịt trâu chia đều cho mọi gia đình — tinh thần bình đẳng và cộng đồng.",
              "Giao lưu, ca hát, kể chuyện — củng cố sợi dây gắn kết các thành viên trong làng.",
            ],
          },
        ]
      : [
          {
            label: "Overview",
            color: C.leaf,
            items: [
              "Signature ritual reflecting the economic, cultural and spiritual life of the Cơ Tu people.",
              "Rice is symbol of life, abundance and village stability — not merely a food source.",
              "Even in bad harvest years the ceremony continues, showing its enduring spiritual necessity.",
              "First offering is made to the rice deity at the field itself before harvest begins.",
            ],
          },
          {
            label: "Cultural & Spiritual Meaning",
            color: C.gold,
            items: [
              "Reflects polytheism centered on Giàng (the supreme spirit).",
              "All natural elements possess souls and power over human life.",
              "Connects three worlds: Humans – Nature – Spirits.",
              "The 'Giàng lúa' (rice spirit) is personified — rice treated as a living being with a soul.",
              "The ceremony re-establishes cosmic balance after each agricultural cycle.",
            ],
          },
          {
            label: "Space & Symbols",
            color: C.gold,
            items: [
              "Gươl house – spiritual power center and communal gathering space.",
              "Nêu tree (x'nur) – cosmic axis linking sky and earth during the festival.",
              "Đ'đoong tree enriches the ritual space with spiritual meaning.",
              "Đong Bh'nuôih – dedicated sacred offering area separate from main space.",
            ],
          },
          {
            label: "Preparation (7–10 days)",
            color: C.clay,
            items: [
              "Erecting and decorating the nêu tree with cosmic symbols: sun, mountains, rice, animals.",
              "Cleaning and purifying the Gươl house to sanctify the ritual space.",
              "Preparing offerings: buffalo, pig, chicken, rice wine and new rice.",
              "Community work assignments by gender, age and social role — reinforcing village unity.",
            ],
          },
          {
            label: "Ritual Sequence",
            color: C.clay,
            items: [
              "Eve: gather at Gươl, sing lý, tell stories, drink rice wine.",
              "Buffalo sacrifice opens the ceremony — marking the transition to sacred space.",
              "Elder offers new rice, buffalo blood, rice wine — praying for harvest and peace.",
              "Buffalo staked to the nêu tree; elder strikes first, youth continue per tradition.",
              "Post-rite: clothing, mats, rice placed on the buffalo body to enhance its sacred power.",
            ],
          },
          {
            label: "Celebration – Community Space",
            color: C.leaf,
            items: [
              "Tung tung da dá dance to resounding gong music — signature traditional art form.",
              "Traditional foods: bamboo rice, grilled meat, stream fish, rice wine.",
              "Buffalo meat distributed equally to all families — symbol of equality and community.",
              "Singing, storytelling and exchange — strengthening bonds among all village members.",
            ],
          },
        ],
  IMAGES_LUA_MOI
);
 

export const Page24LeDungNhaGuol = makeLeHoi(
  "Lễ Dựng Nhà Gươl",
  "Gươl House-Building Ceremony",
  "Nghi lễ cộng đồng kết hợp tín ngưỡng và xây dựng",
  (lang) =>
    lang === "vi"
      ? [
          "Quảng Nam – Đông Giang, Tây Giang, Nam Giang",
          "Không cố định – khi làng cần dựng mới hoặc sửa chữa",
          "Toàn thể dân làng tham gia, phân công theo giới và tuổi",
        ]
      : [
          "Quảng Nam – Đông Giang, Tây Giang, Nam Giang",
          "Variable – when village needs to build or repair",
          "Entire village participates, assigned by gender and age",
        ],
  (lang) =>
    lang === "vi"
      ? [
          {
            label: "Vai Trò & Ý Nghĩa Nhà Gươl",
            color: C.leaf,
            items: [
              "Trung tâm văn hóa và 'linh hồn' của làng người Cơ Tu.",
              "Nơi sinh hoạt cộng đồng và không gian diễn ra nghi lễ, quyết định chung.",
              "Kết nối tất cả thành viên và gia đình — 'trục trung tâm' của cộng đồng.",
              "Đặt ở vị trí trung tâm làng, xung quanh là nhà ở các hộ — cấu trúc biểu tượng.",
            ],
          },
          {
            label: "Ý Nghĩa Văn Hoá – Tín Ngưỡng",
            color: C.gold,
            items: [
              "Thể hiện thế giới quan vạn vật hữu linh: con người, thần linh, thiên nhiên gắn bó.",
              "Nhà Gươl là biểu tượng quyền lực và sự cố kết của toàn thể làng bản.",
              "Nghi thức hiến sinh (đặc biệt trâu) thể hiện lòng thành kính và sự thịnh vượng.",
              "Là không gian thiêng nơi con người giao tiếp trực tiếp với thế giới thần linh.",
            ],
          },
          {
            label: "Công Tác Chuẩn Bị",
            color: C.gold,
            items: [
              "Chọn đất cẩn trọng, kết hợp địa hình và tín ngưỡng — già làng xin phép thần linh.",
              "Thanh niên vào rừng lấy gỗ; nhóm khác chuẩn bị tre, nứa, mây.",
              "Nghệ nhân đảm nhận chạm khắc hoa văn truyền thống trên các cấu kiện nhà.",
              "Phân công rõ ràng theo vai trò xã hội — thể hiện tính tổ chức và tinh thần cộng đồng.",
            ],
          },
          {
            label: "Trình Tự Thi Công & Nghi Lễ",
            color: C.clay,
            items: [
              "Nghi lễ chọn đất — bước đầu tiên, đảm bảo sự chấp thuận của thần linh.",
              "Dựng cột cái — 'trục linh thiêng' — phải thực hiện đúng thời điểm tốt.",
              "Nghi lễ cúng trang trọng khi dựng cột cái với đầy đủ lễ vật.",
              "Lễ mừng hoàn công: già làng dâng rượu cần, gà, heo — thậm chí trâu.",
              "Kết thúc bằng sinh hoạt cộng đồng: ăn uống, giao lưu, củng cố gắn kết làng bản.",
            ],
          },
        ]
      : [
          {
            label: "Role of the Gươl",
            color: C.leaf,
            items: [
              "Cultural center and soul of the village — site of ritual and community decisions.",
              "Connects all members and families in the village.",
              "Positioned at the village center, surrounded by household dwellings — a symbolic layout.",
              "Sacred axis through which the community communicates with the spirit world.",
            ],
          },
          {
            label: "Cultural & Spiritual Meaning",
            color: C.gold,
            items: [
              "Reflects animist worldview: humans, spirits, and nature intimately connected.",
              "The Gươl symbolizes village power and communal cohesion.",
              "Sacrificial rites — especially buffalo sacrifice — express reverence and prosperity.",
            ],
          },
          {
            label: "Preparation",
            color: C.gold,
            items: [
              "Site chosen combining terrain and spiritual beliefs; elder leads permission ritual.",
              "Youth fetch timber from the forest; others prepare bamboo, rattan.",
              "Craftsmen carve traditional patterns onto structural elements.",
              "Clear task division by social role — demonstrating organization and community spirit.",
            ],
          },
          {
            label: "Construction & Ceremony Sequence",
            color: C.clay,
            items: [
              "Land-selection ritual is the first mandatory step before any construction.",
              "Raising the main post — sacred axis — requires auspicious timing.",
              "Solemn ceremony when the main post is raised, with full offering set.",
              "Completion ceremony: elder offers rice wine, chicken, pig (or buffalo) to spirits.",
              "Communal celebration follows: eating, exchanging, reinforcing village bonds.",
            ],
          },
        ],
  IMAGES_NHA_GUOL
);
 
export const Page25LeKetNghia = makeLeHoi(
  "Lễ Kết Nghĩa (Pơ Ngát / Pơr'ngoóch)",
  "Bond-Making Ceremony",
  "Nghi lễ thiết lập và củng cố quan hệ giữa các làng",
  (lang) =>
    lang === "vi"
      ? [
          "Quảng Nam – Đông Giang, Tây Giang, Nam Giang",
          "Mùa xuân – khoảng tháng Hai âm lịch",
          "Khu vực trung tâm làng, gắn với nhà Gươl",
        ]
      : [
          "Quảng Nam – Đông Giang, Tây Giang, Nam Giang",
          "Spring – around the 2nd lunar month",
          "Village center area, tied to the Gươl house",
        ],
  (lang) =>
    lang === "vi"
      ? [
          {
            label: "Khái Quát & Ý Nghĩa",
            color: C.leaf,
            items: [
              "Hàn gắn mâu thuẫn hoặc tăng cường gắn bó — hai làng xem nhau như anh em.",
              "Phản ánh đạo lý coi trọng tình nghĩa, hòa hợp và tinh thần cộng đồng Cơ Tu.",
              "Thể hiện niềm tin vào Giàng và tổ tiên — đấng chứng giám cho lời thề gắn bó.",
              "Duy trì trật tự xã hội và xây dựng quan hệ bền vững giữa các làng.",
            ],
          },
          {
            label: "Chuẩn Bị & Nghi Thức",
            color: C.gold,
            items: [
              "Hai làng phối hợp mời nhau và chuẩn bị lễ vật: heo, rượu cần, sản vật địa phương.",
              "Trước đây có nghi thức cắt máu hòa rượu để thề — nay đã giản lược nhưng ý nghĩa giữ nguyên.",
              "Cúng Giàng và tổ tiên để thông báo và xin chứng giám cho mối kết nghĩa.",
              "Cao niên uống rượu cần, hát lý và kể chuyện — truyền dạy giá trị văn hóa cho thế hệ trẻ.",
            ],
          },
          {
            label: "Không Gian & Biểu Tượng",
            color: C.gold,
            items: [
              "Lễ diễn ra tại trung tâm làng, gắn với nhà Gươl — không gian nghi lễ chung.",
              "Tượng gỗ Bhanooc và chiêng úp đặt tại ranh giới hai làng — biểu tượng kết nghĩa vĩnh cửu.",
              "Ranh giới trở thành vùng thiêng — khẳng định mối quan hệ anh em lâu dài.",
            ],
          },
          {
            label: "Phần Hội & Giao Lưu",
            color: C.clay,
            items: [
              "Múa tung tung da dá trong tiếng cồng chiêng rộn ràng — giao lưu hai cộng đồng.",
              "Dựng tượng gỗ Bhanooc và úp chiêng tại ranh giới — nghi thức kết thúc mang tính biểu tượng cao.",
              "Ăn uống, giao lưu chung giữa hai làng — mở rộng quan hệ và củng cố tình đoàn kết.",
              "Là cơ chế xã hội quan trọng duy trì hòa bình và hợp tác giữa các làng Cơ Tu.",
            ],
          },
        ]
      : [
          {
            label: "Overview",
            color: C.leaf,
            items: [
              "Ritual to resolve conflict or strengthen bonds — two villages treat each other as kin.",
              "Reflects values of kinship, harmony, and community spirit.",
              "Expresses belief in Giàng and ancestors as witnesses to the lasting oath.",
              "Maintains social order and builds durable inter-village relationships.",
            ],
          },
          {
            label: "Preparation & Rite",
            color: C.gold,
            items: [
              "Two villages jointly prepare offerings: pig, rice wine, and local produce.",
              "Formerly included a blood-wine oath — now simplified but meaning preserved.",
              "Offerings to Giàng and ancestors; elders drink rice wine, sing lý, tell stories.",
            ],
          },
          {
            label: "Symbols & Space",
            color: C.gold,
            items: [
              "Ceremony held at village center tied to the Gươl — shared ritual space.",
              "Bhanooc wooden statue and inverted gong placed at village boundary — eternal bond symbol.",
              "The boundary becomes sacred ground confirming the kinship relationship.",
            ],
          },
          {
            label: "Celebration & Exchange",
            color: C.clay,
            items: [
              "Tung tung da dá dance to resounding gong music — inter-village cultural exchange.",
              "Erecting Bhanooc statue and inverting a gong at the boundary closes the ceremony.",
              "Joint feast and social exchange between both villages — broadening community ties.",
              "Key social mechanism for maintaining peace and cooperation among Cơ Tu villages.",
            ],
          },
        ],
  IMAGES_KET_NGHIA
);

// Knowledge & Literature pages
const Page26TriThucCanhTac = makePage(
  "Di Sản Phi Vật Thể › Tri Thức Bản Địa",
  "Tri Thức Canh Tác Nương Rẫy", "Swidden Farming Knowledge",
  { 
    vi: "Hệ thống kinh nghiệm sản xuất nông nghiệp truyền thống của người Cơ Tu, gắn với môi trường núi rừng Trường Sơn", 
    en: "A traditional agricultural knowledge system of the Cơ Tu people, closely tied to the Trường Sơn mountain ecosystem" 
  },
  (lang) => lang === "vi" ? [
    { 
      label: "Giới Thiệu Chung", 
      color: C.leaf, 
      items: [
        "Tri thức canh tác nương rẫy của người Cơ Tu là hệ thống kinh nghiệm sản xuất nông nghiệp truyền thống được tích lũy qua nhiều thế hệ.",
        "Hình thành trong môi trường núi rừng Trường Sơn, tri thức này phản ánh sự thích nghi linh hoạt với điều kiện tự nhiên khắc nghiệt.",
        "Không chỉ là phương thức mưu sinh, đây còn thể hiện mối quan hệ hài hòa giữa con người và thiên nhiên."
      ] 
    },
    { 
      label: "Chu Kỳ Nông Lịch", 
      color: C.gold, 
      items: [
        "Tháng 3: phát rẫy, mở đầu mùa vụ sản xuất.",
        "Tháng 4–5: đốt rẫy, làm đất và tiến hành gieo trỉa.",
        "Tháng 5–7: chăm sóc cây trồng, kết hợp săn bắt và hái lượm.",
        "Tháng 8: chuẩn bị công cụ và điều kiện cho vụ thu hoạch.",
        "Tháng 10: thu hoạch lúa rẫy.",
        "Chu kỳ sản xuất gắn liền với các dấu hiệu tự nhiên như tiếng chim báo mùa, thể hiện khả năng quan sát tinh tế của người dân."
      ] 
    },
    { 
      label: "Phương Thức Canh Tác", 
      color: C.clay, 
      items: [
        "Áp dụng hình thức nương rẫy luân canh: sau vài vụ sẽ để đất nghỉ nhằm phục hồi độ phì nhiêu.",
        "Công cụ lao động đơn giản như gậy chọc lỗ, rìu, gùi — phù hợp với địa hình đồi núi.",
        "Cây trồng đa dạng: lúa rẫy là lương thực chính, kết hợp với ngô, sắn, rau màu và cây dược liệu.",
        "Kết hợp khai thác tự nhiên thông qua săn bắt, đánh cá, hái lượm — tạo nên đời sống tự cung tự cấp."
      ] 
    },
    { 
      label: "Ý Nghĩa", 
      color: C.leaf, 
      items: [
        "Giúp cộng đồng thích nghi với điều kiện tự nhiên khắc nghiệt và đảm bảo nguồn lương thực ổn định.",
        "Thể hiện tri thức sinh thái bản địa và cách sử dụng tài nguyên thiên nhiên một cách bền vững.",
        "Là di sản văn hóa phi vật thể quan trọng, góp phần gìn giữ bản sắc và truyền thống của người Cơ Tu."
      ] 
    },
  ] : [
    { 
      label: "Overview", 
      color: C.leaf, 
      items: [
        "Swidden farming knowledge of the Cơ Tu people is a traditional agricultural system accumulated over generations.",
        "Developed in the Trường Sơn mountainous environment, it reflects strong adaptability to natural conditions.",
        "It represents not only a livelihood but also a harmonious relationship between humans and nature."
      ] 
    },
    { 
      label: "Agricultural Calendar", 
      color: C.gold, 
      items: [
        "Month 3: clearing swidden fields.",
        "Months 4–5: burning, soil preparation, and sowing.",
        "Months 5–7: tending crops, combined with hunting and gathering.",
        "Month 8: preparing tools and harvest conditions.",
        "Month 10: harvesting upland rice.",
        "This cycle follows natural signs such as birds signaling seasonal changes."
      ] 
    },
    { 
      label: "Farming Methods", 
      color: C.clay, 
      items: [
        "Rotational swidden farming: land is left fallow after several seasons to restore fertility.",
        "Simple tools such as dibble sticks, axes, and baskets are used.",
        "Diverse crops: upland rice as staple, combined with maize, cassava, vegetables, and medicinal plants.",
        "Combined with hunting, fishing, and gathering for a self-sufficient lifestyle."
      ] 
    },
    { 
      label: "Significance", 
      color: C.leaf, 
      items: [
        "Helps communities adapt to harsh environments and ensure food security.",
        "Reflects indigenous ecological knowledge and sustainable resource use.",
        "An important intangible cultural heritage preserving Cơ Tu identity."
      ] 
    },
  ]
);

const Page27YHocDanGian = makePage(
  "Di Sản Phi Vật Thể › Tri Thức Bản Địa",
  "Tri Thức Bản Địa Về Y Học Dân Gian", "Indigenous Folk Medicine Knowledge",
  { 
    vi: "Hệ thống tri thức chữa bệnh từ cây rừng, gắn với đời sống và môi trường tự nhiên", 
    en: "A traditional healing system based on forest plants and ecological knowledge" 
  },
  (lang) => lang === "vi" ? [
    { 
      label: "Giới Thiệu Chung", 
      color: C.leaf, 
      items: [
        "Y học dân gian của người Cơ Tu là hệ thống tri thức bản địa được hình thành qua nhiều thế hệ.",
        "Dựa trên kinh nghiệm truyền miệng và việc sử dụng cây rừng để chữa bệnh.",
        "Gắn bó chặt chẽ với môi trường tự nhiên và đời sống văn hóa cộng đồng."
      ] 
    },
    { 
      label: "Mô Tả", 
      color: C.gold, 
      items: [
        "Sử dụng lá, rễ, thân cây làm thuốc với cách chế biến đơn giản như giã nát, vò hoặc đun nước uống.",
        "Nguồn dược liệu chủ yếu lấy từ rừng hoặc được trồng gần nhà, gần nương rẫy.",
        "Các bài thuốc dùng để chữa bệnh thông thường, bồi bổ sức khỏe và phòng bệnh.",
        "Đây là hình thức chăm sóc sức khỏe tự nhiên, phù hợp với điều kiện sống vùng núi."
      ] 
    },
    { 
      label: "Ý Nghĩa", 
      color: C.clay, 
      items: [
        "Giúp cộng đồng chủ động chăm sóc sức khỏe bằng nguồn nguyên liệu sẵn có, an toàn và tiết kiệm.",
        "Phản ánh hiểu biết sâu sắc về hệ sinh thái rừng và giá trị của tài nguyên thiên nhiên.",
        "Thể hiện mối quan hệ hài hòa giữa con người và môi trường.",
        "Là di sản văn hóa phi vật thể quan trọng cần được bảo tồn và phát huy."
      ] 
    },
  ] : [
    { 
      label: "Overview", 
      color: C.leaf, 
      items: [
        "Folk medicine of the Cơ Tu is an indigenous knowledge system developed over generations.",
        "Based on oral traditions and the use of forest plants for healing.",
        "Closely connected to nature and community life."
      ] 
    },
    { 
      label: "Description", 
      color: C.gold, 
      items: [
        "Uses leaves, roots, and stems prepared by pounding, kneading, or boiling.",
        "Medicinal resources are collected from forests or grown near homes and fields.",
        "Remedies treat illnesses, improve health, and prevent diseases.",
        "Represents a natural healthcare model suitable for mountainous areas."
      ] 
    },
    { 
      label: "Significance", 
      color: C.clay, 
      items: [
        "Enables communities to manage health using accessible and safe resources.",
        "Reflects deep ecological understanding of forest systems.",
        "Demonstrates harmony between humans and nature.",
        "An important intangible heritage that preserves cultural identity."
      ] 
    },
  ]
);

const Page28NgonNgu = makePage(
  "Di Sản Phi Vật Thể › Văn Học Dân Gian",
  "Ngôn Ngữ Cơ Tu", "The Cơ Tu Language",
  { 
    vi: "Ngôn ngữ thuộc ngữ hệ Nam Á – nhóm Katuic, dòng Môn–Khmer, gắn liền với đời sống và văn hóa cộng đồng", 
    en: "An Austroasiatic language of the Katuic group, Mon-Khmer branch, deeply embedded in community life and culture" 
  },
  (lang) => lang === "vi" ? [
    { 
      label: "Giới Thiệu Chung", 
      color: C.leaf, 
      items: [
        "Tiếng Cơ Tu là ngôn ngữ thuộc nhóm Katuic, dòng Môn – Khmer trong ngữ hệ Nam Á, có lịch sử lâu đời tại khu vực miền Trung Việt Nam.",
        "Đây là phương tiện giao tiếp chính của cộng đồng, đồng thời là công cụ lưu giữ tri thức, kinh nghiệm sản xuất và giá trị văn hóa truyền thống.",
        "Trong đời sống hiện nay, tiếng Cơ Tu tồn tại song song với tiếng Việt: tiếng mẹ đẻ được dùng trong sinh hoạt, văn hóa và nghi lễ; tiếng Việt được sử dụng trong giáo dục, hành chính và giao tiếp rộng hơn.",
        "Xu hướng song ngữ ngày càng rõ rệt, đặc biệt ở thế hệ trẻ."
      ] 
    },
    { 
      label: "Đặc Điểm Ngôn Ngữ", 
      color: C.gold, 
      items: [
        "Tiếng Cơ Tu có cấu trúc cận âm tiết, hệ thống âm phong phú và nhiều âm vị đặc trưng, khác biệt rõ rệt so với tiếng Việt.",
        "Ngôn ngữ tồn tại dưới nhiều phương ngữ theo từng khu vực cư trú, nhưng vẫn đảm bảo khả năng giao tiếp và hiểu lẫn nhau trong cộng đồng.",
        "Ngữ âm và từ vựng phản ánh rõ môi trường sống gắn với núi rừng, thiên nhiên và đời sống lao động.",
        "Chữ viết Cơ Tu hiện tồn tại hai hệ thống chính: một dựa trên thực tiễn sử dụng trong cộng đồng, đơn giản và dễ tiếp cận; một theo hướng nghiên cứu khoa học, mang tính chuẩn hóa cao.",
        "Tuy nhiên, việc thống nhất và phổ cập chữ viết vẫn còn gặp nhiều khó khăn trong thực tế."
      ] 
    },
    { 
      label: "Ý Nghĩa & Thách Thức", 
      color: C.clay, 
      items: [
        "Ngôn ngữ Cơ Tu là kho tàng lưu giữ tri thức bản địa, phản ánh cách hiểu về tự nhiên, kinh nghiệm sản xuất và đời sống văn hóa.",
        "Đây là phương tiện truyền tải các giá trị văn hóa phi vật thể như truyện kể, dân ca, nghi lễ và phong tục tập quán.",
        "Xu hướng sử dụng tiếng Việt ngày càng phổ biến khiến tiếng mẹ đẻ có nguy cơ bị thu hẹp, đặc biệt ở thế hệ trẻ.",
        "Việc bảo tồn và phát triển ngôn ngữ không chỉ có ý nghĩa về mặt ngôn ngữ học mà còn góp phần quan trọng trong việc gìn giữ bản sắc văn hóa dân tộc.",
        "Cần có các giải pháp như giáo dục song ngữ, chuẩn hóa chữ viết và truyền dạy trong cộng đồng để duy trì và phát huy giá trị của ngôn ngữ."
      ] 
    },
  ] : [
    { 
      label: "Overview", 
      color: C.leaf, 
      items: [
        "The Cơ Tu language belongs to the Katuic group, Mon-Khmer branch of the Austroasiatic family, with a long history in Central Vietnam.",
        "It serves as the main means of communication and a repository of indigenous knowledge, cultural values, and traditional practices.",
        "Today, Cơ Tu coexists with Vietnamese: the native language is used in daily life, culture, and rituals, while Vietnamese is used in education and administration.",
        "A growing bilingual trend is especially evident among younger generations."
      ] 
    },
    { 
      label: "Linguistic Features", 
      color: C.gold, 
      items: [
        "Cơ Tu has a near-monosyllabic structure with a rich phonological system, clearly distinct from Vietnamese.",
        "It exists in multiple dialects across regions, yet maintains mutual intelligibility within the community.",
        "Its phonology and vocabulary strongly reflect a lifestyle connected to forests and nature.",
        "Two main writing systems exist: one community-based and practical, the other more scientific and standardized.",
        "However, unifying and widely adopting a standard writing system remains challenging."
      ] 
    },
    { 
      label: "Significance & Challenges", 
      color: C.clay, 
      items: [
        "The language is a vital repository of indigenous knowledge, reflecting understanding of nature, production, and cultural life.",
        "It carries intangible cultural heritage such as oral literature, songs, rituals, and customs.",
        "The increasing dominance of Vietnamese poses a risk of language decline among younger generations.",
        "Preserving the language is essential not only linguistically but also for maintaining cultural identity.",
        "Efforts such as bilingual education, script standardization, and community transmission are crucial for its sustainability."
      ] 
    },
  ],
  imgso20
);

// Folk literature pages
function makeVanHoc(title, titleEn, sub, badge, getSec) {
  return function({ lang }) {
    const sections = getSec(lang);
    return (
      <GenericPage
        lang={lang}
        breadcrumb={lang === "vi" ? "Di Sản Phi Vật Thể › Văn Học Dân Gian" : "Intangible Heritage › Folk Literature"}
        title={title} titleEn={titleEn}
        subtitle={lang === "vi" ? sub.vi : sub.en}
        badge={badge}
        sections={sections}
        bgVariant="c"
      />
    );
  };
}

const Page29SuTichDongHo = makeVanHoc(
  "Sự Tích Các Dòng Họ", "Legend of the Clans",
  { 
    vi: "Alăng – Arất: truyền thuyết về đại hồng thủy và nguồn gốc cộng đồng", 
    en: "Alăng – Arất: legend of the great flood and community origins" 
  },
  "Văn Học Dân Gian – Truyền Thuyết",
  (lang) => lang === "vi" ? [
    { 
      label: "Giới Thiệu Chung", 
      color: C.leaf, 
      items: [
        "Truyền thuyết kể về nguồn gốc hình thành các dòng họ trong cộng đồng người Cơ Tu.",
        "Câu chuyện gắn liền với ký ức tập thể về một trận đại hồng thủy trong quá khứ.",
        "Thông qua đó, người Cơ Tu lý giải sự khởi đầu của con người và cộng đồng sau biến cố thiên nhiên."
      ] 
    },
    { 
      label: "Cốt Truyện", 
      color: C.gold, 
      items: [
        "Ba con vật Rùa, Diều hâu và Tắc kè bàn bạc cách cứu loài người khỏi nạn đại hồng thủy.",
        "Trong quá trình thực hiện, Diều hâu và Rùa không may gặp nạn và không thể tiếp tục.",
        "Tắc kè một mình kiên trì, cứu được một số ít người còn sống sót.",
        "Khi con người hồi phục, thay vì biết ơn, họ lại trách móc và giết chết Tắc kè — ân nhân của mình.",
        "Những người sống sót sau đó hình thành dòng họ Hơ Lăng (Alăng), về sau tách ra thành họ Arất."
      ] 
    },
    { 
      label: "Ý Nghĩa", 
      color: C.clay, 
      items: [
        "Giải thích nguồn gốc hình thành các dòng họ trong xã hội người Cơ Tu.",
        "Phản ánh nhận thức về thiên tai và quá trình tái thiết cuộc sống của con người.",
        "Thể hiện quan niệm đạo đức về lòng biết ơn và hậu quả của sự vô ơn.",
        "Là một phần quan trọng trong kho tàng văn học dân gian, góp phần gìn giữ bản sắc văn hóa dân tộc."
      ] 
    },
  ] : [
    { 
      label: "Overview", 
      color: C.leaf, 
      items: [
        "This legend explains the origin of clans within the Cơ Tu community.",
        "It is associated with a collective memory of a great flood in the past.",
        "The story reflects how people understand the beginning of human life after natural disasters."
      ] 
    },
    { 
      label: "Story", 
      color: C.gold, 
      items: [
        "Three animals — Turtle, Kite, and Gecko — plan to save humanity from a great flood.",
        "During the effort, the Kite and Turtle perish and cannot continue.",
        "The Gecko perseveres alone and rescues a small number of survivors.",
        "After recovering, humans ungratefully blame and kill the Gecko — their savior.",
        "The survivors form the Hơ Lăng (Alăng) clan, later splitting into the Arất clan."
      ] 
    },
    { 
      label: "Meaning", 
      color: C.clay, 
      items: [
        "Explains the origins of clans in Cơ Tu society.",
        "Reflects perceptions of natural disasters and human recovery.",
        "Highlights moral lessons about gratitude and the consequences of ingratitude.",
        "An important part of folk literature preserving cultural identity."
      ] 
    },
  ]
);

const Page30MoCoiGiuTrau = makeVanHoc(
  "Người Mồ Côi Giữ Trâu Làng", "The Orphan Who Watched the Village Buffaloes",
  { 
    vi: "Cổ tích — trí tuệ và lòng nhân ái trước sức mạnh thiên nhiên", 
    en: "Folktale — intelligence and compassion against the forces of nature" 
  },
  "Văn Học Dân Gian – Cổ Tích",
  (lang) => lang === "vi" ? [
    { 
      label: "Giới Thiệu Chung", 
      color: C.leaf, 
      items: [
        "Câu chuyện kể về một chàng trai mồ côi nghèo khó trong cộng đồng người Cơ Tu.",
        "Dù hoàn cảnh khó khăn, anh vẫn nổi bật bởi trí thông minh, lòng dũng cảm và sự bình tĩnh.",
        "Câu chuyện phản ánh cuộc sống lao động gắn với thiên nhiên và những thử thách từ môi trường hoang dã."
      ] 
    },
    { 
      label: "Cốt Truyện", 
      color: C.gold, 
      items: [
        "Chàng trai làm thuê giữ trâu cho làng để sinh sống.",
        "Một con cọp dữ thường xuyên vào làng bắt trâu, gây hoang mang cho dân.",
        "Chàng đã nghĩ ra cách bẫy cọp bằng dây buộc khéo léo, khiến con vật không thể thoát.",
        "Sau khi khống chế được cọp, anh không giết mà buộc nó phải thề không quay lại phá làng.",
        "Từ đó, cọp chỉ sống trong rừng sâu, không còn gây hại cho con người."
      ] 
    },
    { 
      label: "Ý Nghĩa", 
      color: C.clay, 
      items: [
        "Đề cao trí thông minh, sự bình tĩnh và lòng dũng cảm của con người.",
        "Thể hiện tư tưởng nhân văn: không tiêu diệt mà hướng tới sự chung sống hài hòa với thiên nhiên.",
        "Phản ánh kinh nghiệm ứng xử khôn khéo trong đời sống cộng đồng.",
        "Là bài học giáo dục về cách giải quyết xung đột một cách nhân văn và hiệu quả."
      ] 
    },
  ] : [
    { 
      label: "Overview", 
      color: C.leaf, 
      items: [
        "This folktale tells the story of a poor orphan boy in the Cơ Tu community.",
        "Despite hardship, he is intelligent, brave, and calm.",
        "It reflects a life closely tied to nature and its challenges."
      ] 
    },
    { 
      label: "Story", 
      color: C.gold, 
      items: [
        "The boy works as a buffalo keeper for the village.",
        "A fierce tiger repeatedly attacks and takes buffaloes.",
        "He devises a clever rope trap to capture the tiger.",
        "Instead of killing it, he forces the tiger to swear never to return.",
        "From then on, the tiger lives in the forest and no longer harms the village."
      ] 
    },
    { 
      label: "Meaning", 
      color: C.clay, 
      items: [
        "Highlights intelligence, composure, and courage.",
        "Promotes humanistic values: coexistence instead of destruction.",
        "Reflects wise behavior in community life.",
        "Teaches humane and effective conflict resolution."
      ] 
    },
  ]
);
const Page31MoCoiCuoiVo = makeVanHoc(
  "Người Mồ Côi Cưới Vợ", "The Orphan Who Won a Wife",
  { 
    vi: "Cổ tích — trí tuệ, kiên trì và chiến thắng thử thách", 
    en: "Folktale — intelligence, perseverance, and triumph over trials" 
  },
  "Văn Học Dân Gian – Cổ Tích",
  (lang) => lang === "vi" ? [
    { 
      label: "Giới Thiệu Chung", 
      color: C.leaf, 
      items: [
        "Câu chuyện kể về một chàng trai mồ côi nghèo nhưng thông minh và kiên trì.",
        "Anh phải đối mặt với những thử thách khó khăn để đạt được hạnh phúc.",
        "Câu chuyện phản ánh ước mơ về công bằng và sự vươn lên của người lao động bình dân."
      ] 
    },
    { 
      label: "Cốt Truyện", 
      color: C.gold, 
      items: [
        "Một ông già giàu có đưa ra thử thách: phải đãi tiệc và thắng cuộc thi cõng cô gái lên dốc mới được cưới vợ.",
        "Trong bữa tiệc, chàng trai khôn khéo giữ sức, trong khi ông già ăn uống no say.",
        "Khi thi, ông nhanh chóng kiệt sức còn chàng trai vẫn đủ sức vượt qua thử thách.",
        "Ở một dị bản, cô gái giúp chàng bằng cách cho nước uống, tiếp thêm sức lực.",
        "Cuối cùng, chàng trai chiến thắng và cưới được cô gái, sống hạnh phúc."
      ] 
    },
    { 
      label: "Ý Nghĩa", 
      color: C.clay, 
      items: [
        "Đề cao trí thông minh, sự kiên trì và bản lĩnh vượt khó.",
        "Thể hiện giá trị của tình yêu chân thành và sự đồng lòng.",
        "Phản ánh niềm tin vào công bằng và kết quả xứng đáng cho người nỗ lực.",
        "Là bài học về cách ứng xử khôn khéo trong cuộc sống."
      ] 
    },
  ] : [
    { 
      label: "Overview", 
      color: C.leaf, 
      items: [
        "This story follows a poor but intelligent and persistent orphan.",
        "He overcomes challenges to achieve happiness.",
        "It reflects the aspiration for fairness and success among common people."
      ] 
    },
    { 
      label: "Story", 
      color: C.gold, 
      items: [
        "A wealthy old man challenges him to host a feast and win a carrying contest up a hill.",
        "The young man conserves energy while the old man overeats.",
        "During the contest, the old man exhausts quickly while the young man succeeds.",
        "In another version, the girl secretly helps him with a drink.",
        "He wins and marries the girl, living happily."
      ] 
    },
    { 
      label: "Meaning", 
      color: C.clay, 
      items: [
        "Highlights intelligence, perseverance, and resilience.",
        "Emphasizes sincere love and cooperation.",
        "Reflects belief in justice and deserved success.",
        "Teaches wise conduct in life."
      ] 
    },
  ]
);
// Crafts pages
const Page32NgheThuCongIntro = makePage(
  "Di Sản Phi Vật Thể › Nghề Thủ Công",
  "Nghề Thủ Công Truyền Thống", "Traditional Handicrafts",
  { 
    vi: "Một phần quan trọng trong đời sống kinh tế – văn hóa của người Cơ Tu", 
    en: "An essential part of the Cơ Tu economic and cultural life" 
  },
  (lang) => lang === "vi" ? [
    { 
      label: "Giới Thiệu Chung", 
      color: C.leaf, 
      items: [
        "Nghề thủ công truyền thống của người Cơ Tu là kết tinh của sự khéo léo, sáng tạo và tri thức dân gian tích lũy qua nhiều thế hệ.",
        "Các sản phẩm thủ công phục vụ nhu cầu sinh hoạt hằng ngày, đồng thời gắn liền với phong tục, tập quán và các hoạt động lễ hội cộng đồng.",
        "Việc sử dụng nguyên liệu tự nhiên từ rừng Trường Sơn cùng kỹ thuật chế tác đặc trưng tạo nên giá trị văn hóa riêng biệt.",
        "Trong bối cảnh hiện đại, nghề thủ công không chỉ góp phần bảo tồn bản sắc mà còn tạo sinh kế cho cộng đồng."
      ] 
    },
  ] : [
    { 
      label: "Overview", 
      color: C.leaf, 
      items: [
        "Traditional handicrafts of the Cơ Tu reflect skill, creativity, and accumulated indigenous knowledge.",
        "Products serve daily needs and are closely tied to customs, traditions, and festivals.",
        "Natural materials from the Trường Sơn forests and unique techniques create distinct cultural value.",
        "Today, handicrafts both preserve identity and provide sustainable livelihoods."
      ] 
    },
  ],
  "https://images.baodantoc.vn/uploads/2020/Th%C3%A1ng%208/Ng%C3%A0y%203/2-2.jpg"
);

const Page33DetThoCam = makePage(
  "Di Sản Phi Vật Thể › Nghề Thủ Công",
  "Dệt Thổ Cẩm", "Brocade Weaving",
  { vi: "Nghề dệt truyền thống đặc trưng của phụ nữ Cơ Tu", en: "Traditional weaving craft of Cơ Tu women" },
  (lang) => lang === "vi" ? [
    { label: "Nguyên Liệu & Công Cụ", color: C.leaf, items: [
      "Bông vải (kpay) tự trồng; thuốc nhuộm từ chàm, củ nâu, hạt bắp, vỏ ốc…",
      "Hạt cườm phát triển từ hạt rừng → hạt chì → hạt nhựa hiện nay.",
      "Công cụ đa dạng; tiêu biểu là khung dệt dây lưng (grang tr’naanh) bằng tre, gỗ."
    ]},
    { label: "Kỹ Thuật Chế Tác", color: C.gold, items: [
      "Quy trình gồm: xử lý bông → kéo sợi → se sợi → nhuộm → dệt.",
      "Người dệt dùng cơ thể điều chỉnh lực căng sợi — tạo sự linh hoạt giữa người và khung dệt.",
      "Hoa văn phong phú: chỉ màu, gợn sóng, chèn hạt cườm (arắc)."
    ]},
    { label: "Giá Trị & Chức Năng", color: C.clay, items: [
      "Thể hiện giới tính, tuổi tác, vị thế xã hội.",
      "Hoa văn mang ý nghĩa biểu tượng gắn với tự nhiên và tín ngưỡng.",
      "Dùng trong nghi lễ, trang trí, dâng cúng — mang tính thiêng.",
      "Hiện nay vừa tạo sinh kế vừa bảo tồn văn hóa."
    ]},
  ] : [
    { label: "Materials & Tools", color: C.leaf, items: [
      "Home-grown cotton; natural dyes from indigo, tubers, seeds, shells.",
      "Beads evolved from seeds → lead → plastic.",
      "Backstrap loom (grang tr’naanh) is the signature tool."
    ]},
    { label: "Technique", color: C.gold, items: [
      "Process: cotton prep → spinning → twisting → dyeing → weaving.",
      "Body tension controls thread — unique human-tool interaction.",
      "Rich patterns: colored threads, ripple motifs, bead inlay."
    ]},
    { label: "Value", color: C.clay, items: [
      "Indicates gender, age, and status.",
      "Patterns linked to beliefs and nature.",
      "Sacred use in rituals.",
      "Now supports livelihoods and cultural preservation."
    ]},
  ],
  "https://images.baodantoc.vn/uploads/2024/Thang-10/Ngay-2/Anh/untitled%20folder/2.jpg"
);

const Page34NgheĐanLat = makePage(
  "Di Sản Phi Vật Thể › Nghề Thủ Công",
  "Nghề Đan Lát", "Basket Weaving Craft",
  { vi: "Nghề thủ công từ tre, mây gắn với đời sống nương rẫy", en: "Craft using bamboo and rattan for daily life" },
  (lang) => lang === "vi" ? [
    { label: "Nguyên Liệu & Công Cụ", color: C.leaf, items: [
      "Mây, tre, nứa, lồ ô, dây leo, lá dứa, sợi guột.",
      "Xử lý: chẻ nan, vót, ngâm, phơi hoặc hun khói để tăng độ bền."
    ]},
    { label: "Kỹ Thuật Chế Tác", color: C.gold, items: [
      "Quy trình: chẻ → vót → làm đều → đan tạo hình.",
      "Kỹ thuật: nong mốt, nong đôi, đan xiên.",
      "Sản phẩm phức tạp như gùi “Ta leech” đòi hỏi tay nghề cao."
    ]},
    { label: "Giá Trị & Chức Năng", color: C.clay, items: [
      "Gùi là sản phẩm tiêu biểu — gắn với lao động và vai trò xã hội.",
      "Nia, nong, rổ, rá phục vụ sinh hoạt và sản xuất.",
      "Một số sản phẩm dùng trong nghi lễ, cưới hỏi."
    ]},
  ] : [
    { label: "Materials", color: C.leaf, items: [
      "Rattan, bamboo, vines, natural fibers.",
      "Processed by splitting, shaving, soaking, drying or smoking."
    ]},
    { label: "Technique", color: C.gold, items: [
      "Process: split → shave → weave.",
      "Techniques: single, double, diagonal weaving.",
      "Complex items require high skill."
    ]},
    { label: "Value", color: C.clay, items: [
      "Baskets reflect daily life and social roles.",
      "Used in farming and household tasks.",
      "Also used in rituals and ceremonies."
    ]},
  ],
  "https://imagevietnam.vnanet.vn/upload/Thumnail/2020/12/18/18122020100534441CV02_resize.JPG"
);

const Page35DieuKhacIntro = makePage(
  "Di Sản Phi Vật Thể › Điêu Khắc",
  "Điêu Khắc Dân Gian", "Folk Carving",
  { 
    vi: "Nghệ thuật tạo hình phản ánh đời sống và thế giới quan người Cơ Tu", 
    en: "Plastic art reflecting the worldview and daily life of the Cơ Tu" 
  },
  (lang) => lang === "vi" ? [
    { label: "Giới Thiệu Chung", color: C.leaf, items: [
      "Điêu khắc dân gian Cơ Tu là loại hình nghệ thuật tạo hình mang đậm dấu ấn văn hóa và tín ngưỡng.",
      "Nghệ nhân sử dụng công cụ đơn giản như rìu, rựa, đục để tạo tượng gỗ và phù điêu.",
      "Tác phẩm gắn với các không gian quen thuộc: nhà Gươl, cột lễ, nhà ở và khu nhà mồ.",
      "Phản ánh đời sống thực tế, sinh hoạt cộng đồng và mối quan hệ với tự nhiên."
    ]},
    { label: "Đặc Điểm Nghệ Thuật", color: C.gold, items: [
      "Mang tính biểu trưng, không thiên về tả thực chi tiết.",
      "Hình tượng đa dạng: con người, động vật, cảnh sinh hoạt.",
      "Không bị bó buộc khuôn mẫu, thể hiện sự sáng tạo linh hoạt."
    ]},
    { label: "Ý Nghĩa", color: C.clay, items: [
      "Thể hiện quan niệm về con người, vũ trụ và đời sống tâm linh.",
      "Lưu giữ ký ức cộng đồng và truyền tải giá trị văn hóa.",
      "Góp phần củng cố bản sắc văn hóa Cơ Tu."
    ]},
  ] : [
    { label: "Overview", color: C.leaf, items: [
      "Cơ Tu folk carving is a visual art form expressing culture and beliefs.",
      "Artisans use simple tools to create wooden sculptures and reliefs.",
      "Works are found in communal and spiritual spaces.",
      "Reflects daily life and human–nature relationships."
    ]},
    { label: "Artistic Features", color: C.gold, items: [
      "Symbolic rather than realistic.",
      "Diverse subjects: humans, animals, daily scenes.",
      "Flexible and creative without rigid rules."
    ]},
    { label: "Significance", color: C.clay, items: [
      "Expresses worldview and spirituality.",
      "Preserves community memory.",
      "Reinforces cultural identity."
    ]},
  ],
  "https://bqn.1cdn.vn/2025/10/01/99a879819fc2159c4cd3-1-.jpg"
);

const Page36DieuKhacGuol = makePage(
  "Di Sản Phi Vật Thể › Điêu Khắc",
  "Điêu Khắc Nhà Gươl", "Gươl House Carvings",
  { vi: "Nghệ thuật chạm khắc trong kiến trúc cộng đồng linh thiêng", en: "Carving in sacred communal architecture" },
  (lang) => lang === "vi" ? [
    { label: "Nguyên Liệu & Công Cụ", color: C.leaf, items: [
      "Gỗ rừng tự nhiên được chọn kỹ, đảm bảo độ bền và dễ tạo hình.",
      "Công cụ: rìu, rựa, dao, đục — hoàn toàn thủ công.",
      "Việc chọn gỗ gắn với quan niệm tâm linh."
    ]},
    { label: "Kỹ Thuật & Tạo Hình", color: C.gold, items: [
      "Chạm nổi trực tiếp trên cột, xà, mái, vách.",
      "Không dùng bản vẽ — dựa vào trí nhớ và kinh nghiệm.",
      "Mô-típ: chim Tring, gà trống, trâu, rắn, cảnh sinh hoạt.",
      "Bố cục hài hòa giữa kiến trúc và điêu khắc."
    ]},
    { label: "Giá Trị", color: C.clay, items: [
      "Vừa trang trí vừa phản ánh đời sống và tín ngưỡng.",
      "Nhà Gươl như một “bảo tàng sống” của cộng đồng.",
      "Góp phần bảo tồn và truyền dạy văn hóa."
    ]},
  ] : [
    { label: "Materials", color: C.leaf, items: [
      "Carefully selected natural timber.",
      "Tools: axe, knife, chisel.",
      "Wood choice linked to spiritual beliefs."
    ]},
    { label: "Technique", color: C.gold, items: [
      "Direct carving on structural elements.",
      "No drawings — based on memory.",
      "Motifs: birds, animals, daily life.",
      "Integrated with architecture."
    ]},
    { label: "Value", color: C.clay, items: [
      "Decorative and symbolic.",
      "A 'living museum'.",
      "Preserves cultural identity."
    ]},
  ],
  "https://images.vietnamtourism.gov.vn/vn//images/2014/AnhInternet/quangnam-tranhdieukhac2.jpg"
);

const Page37DieuKhacCotTe = makePage(
  "Di Sản Phi Vật Thể › Điêu Khắc",
  "Điêu Khắc Trên Cột Tế (X'nur)", "Ritual Post Carving",
  { vi: "Biểu tượng kết nối con người và thần linh", en: "Symbol connecting humans and spirits" },
  (lang) => lang === "vi" ? [
    { label: "Nguyên Liệu", color: C.leaf, items: [
      "Gỗ lớn nguyên khối, chắc chắn.",
      "Kết hợp tre, sợi tự nhiên trang trí phần đỉnh."
    ]},
    { label: "Kỹ Thuật & Tạo Hình", color: C.gold, items: [
      "Bố cục đối xứng, màu đỏ–đen chủ đạo.",
      "Họa tiết biểu trưng: mặt trời, mặt trăng, chim, trâu.",
      "Chi tiết đơn giản nhưng giàu ý nghĩa.",
      "Phần 'giương' tạo điểm nhấn nghi lễ."
    ]},
    { label: "Giá Trị Văn Hóa", color: C.clay, items: [
      "Trung tâm nghi lễ cộng đồng.",
      "Thể hiện quan niệm vũ trụ và tự nhiên.",
      "Biểu tượng văn hóa đặc trưng của người Cơ Tu."
    ]},
  ] : [
    { label: "Materials", color: C.leaf, items: [
      "Solid timber and natural fibers."
    ]},
    { label: "Technique", color: C.gold, items: [
      "Symmetrical layout, red-black colors.",
      "Symbolic motifs: sun, moon, animals.",
      "Simplified but meaningful."
    ]},
    { label: "Value", color: C.clay, items: [
      "Center of rituals.",
      "Represents cosmology.",
      "Cultural symbol."
    ]},
  ],
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1tRDnAXvg9szeSTU3DnUekj-OdYl15M2ilw&s"
);

const Page38DieuKhacNhaMo = makePage(
  "Di Sản Phi Vật Thể › Điêu Khắc",
  "Điêu Khắc Nhà Mồ", "Tomb House Carving",
  { vi: "Nghệ thuật tâm linh trong không gian tang ma", en: "Spiritual funerary art" },
  (lang) => lang === "vi" ? [
    { label: "Nguyên Liệu", color: C.leaf, items: [
      "Gỗ nguyên khối, tre, lá và sợi tự nhiên.",
      "Công cụ thủ công: rìu, dao, đục."
    ]},
    { label: "Kỹ Thuật & Tạo Hình", color: C.gold, items: [
      "Chạm khắc trực tiếp, mang tính tự do và biểu cảm.",
      "Kết hợp tượng tròn và phù điêu.",
      "Hình tượng: đầu trâu, chim, con người.",
      "Chi tiết ước lệ, không theo tỷ lệ chuẩn."
    ]},
    { label: "Giá Trị", color: C.clay, items: [
      "Phản ánh quan niệm về cái chết và thế giới linh hồn.",
      "Nhà mồ là nơi cư trú của người đã khuất.",
      "Tượng gỗ đóng vai trò bạn đồng hành."
    ]},
  ] : [
    { label: "Materials", color: C.leaf, items: [
      "Wood, bamboo, natural fibers."
    ]},
    { label: "Technique", color: C.gold, items: [
      "Expressive and free carving.",
      "Combination of sculpture and relief.",
      "Symbolic figures."
    ]},
    { label: "Value", color: C.clay, items: [
      "Represents beliefs about death.",
      "Tomb as spiritual home.",
      "Statues as companions."
    ]},
  ],
  "https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2021/12/4/981109/Nhamo3.jpg"
);

const Page39VuKhiCongCu = makePage(
  "Di Sản Phi Vật Thể › Nghề Thủ Công",
  "Làm Vũ Khí & Công Cụ", "Tools & Weapons Craft",
  { vi: "Nghề rèn truyền thống của người Cơ Tu", en: "Traditional smithing craft" },
  (lang) => lang === "vi" ? [
    { label: "Giới Thiệu", color: C.leaf, items: [
      "Nghề rèn có lịch sử lâu đời, gắn với sản xuất và sinh hoạt.",
      "Tạo ra dao, rựa, rìu, cuốc phục vụ nương rẫy và săn bắt."
    ]},
    { label: "Kỹ Thuật", color: C.gold, items: [
      "Quy trình: chọn kim loại → nung → tạo hình → tôi luyện.",
      "Đòi hỏi kỹ năng cao và kinh nghiệm lâu năm."
    ]},
    { label: "Ý Nghĩa", color: C.clay, items: [
      "Phản ánh trình độ kỹ thuật và tri thức dân gian.",
      "Được truyền dạy qua gia đình và cộng đồng.",
      "Góp phần bảo tồn bản sắc văn hóa."
    ]},
  ] : [
    { label: "Overview", color: C.leaf, items: [
      "Long-standing craft tied to daily life.",
      "Produces tools for farming and hunting."
    ]},
    { label: "Technique", color: C.gold, items: [
      "Heating, shaping, tempering metal.",
      "Requires high skill."
    ]},
    { label: "Value", color: C.clay, items: [
      "Reflects technical knowledge.",
      "Passed through generations.",
      "Preserves identity."
    ]},
  ],
  "https://dotchuoinon.com/wp-content/uploads/2014/03/b5a3f012132e8b9f11ff48aec62801c1.jpg"
);

const Page40TrangSuc = makePage(
  "Di Sản Phi Vật Thể › Nghề Thủ Công",
  "Trang Sức Truyền Thống", "Traditional Jewelry",
  { vi: "Vật phẩm thể hiện thẩm mỹ và địa vị xã hội", en: "Adornment reflecting aesthetics and status" },
  (lang) => lang === "vi" ? [
    { label: "Nguyên Liệu", color: C.leaf, items: [
      "Hạt cườm, đá, vỏ ốc, răng và nanh động vật.",
      "Phổ biến: chuỗi hạt và vòng nanh heo rừng."
    ]},
    { label: "Kỹ Thuật", color: C.gold, items: [
      "Chọn vật liệu → tạo hình → kết chuỗi.",
      "Đòi hỏi sự tỉ mỉ và khéo léo."
    ]},
    { label: "Giá Trị", color: C.clay, items: [
      "Không chỉ làm đẹp mà còn thể hiện địa vị và sức mạnh.",
      "Dùng trong lễ hội, nghi lễ và sinh hoạt.",
      "Biểu đạt bản sắc văn hóa Cơ Tu."
    ]},
  ] : [
    { label: "Materials", color: C.leaf, items: [
      "Beads, stones, shells, animal teeth."
    ]},
    { label: "Technique", color: C.gold, items: [
      "Select → shape → string.",
      "Requires precision."
    ]},
    { label: "Value", color: C.clay, items: [
      "Shows status and identity.",
      "Used in rituals and festivals.",
      "Represents culture."
    ]},
  ],
  "https://admin.vov.gov.vn/UploadFolder/KhoTin/Images/UploadFolder/VOV4/Images/TV/2021/2021_12/3%20NewFolder/00000co_tu_2212202112_thumb.png"
);

// Performing arts pages
const Page41MuaTungTung = makePage(
  "Di Sản Phi Vật Thể › Nghệ Thuật Trình Diễn",
  "Múa Tung Tung Da Dá",
  "Tung Tung Da Dá Dance",
  {
    vi: "Điệu múa nghi lễ linh thiêng — biểu tượng âm dương hài hòa",
    en: "Sacred ritual dance — symbol of yin-yang harmony"
  },
  (lang) =>
    lang === "vi"
      ? [
          {
            label: "Khái Quát",
            color: C.leaf,
            items: [
              "Loại hình nghệ thuật dân gian tổng hợp tiêu biểu của người Cơ Tu.",
              "Xuất hiện trong các nghi lễ quan trọng như mừng lúa mới, dựng Gươl, cưới hỏi, lễ đâm trâu.",
              "Không chỉ là điệu múa mà còn mang ý nghĩa nghi lễ thiêng liêng."
            ]
          },
          {
            label: "Ý Nghĩa Văn Hóa",
            color: C.gold,
            items: [
              "Thể hiện mối liên hệ giữa con người với thần linh, tổ tiên và thế giới siêu nhiên.",
              "Mang ý nghĩa dâng trời, cầu mong mùa màng bội thu.",
              "Góp phần gắn kết cộng đồng và duy trì đời sống tinh thần."
            ]
          },
          {
            label: "Cấu Trúc & Biểu Diễn",
            color: C.clay,
            items: [
              "Tung tung (nam): động tác mạnh mẽ, mô phỏng săn bắn và bảo vệ cộng đồng.",
              "Da dá (nữ): động tác mềm mại, tượng trưng cho sinh sôi và dâng hiến.",
              "Múa theo vòng tròn trước nhà Gươl — biểu trưng vòng đời và vũ trụ.",
              "Kết hợp cồng chiêng, trống và trang phục truyền thống."
            ]
          },
          {
            label: "Bảo Tồn",
            color: C.leaf,
            items: [
              "Hiện được sân khấu hóa phục vụ du lịch.",
              "Vẫn giữ vai trò trong đời sống cộng đồng và nghi lễ truyền thống.",
              "Cần bảo tồn để duy trì bản sắc văn hóa Cơ Tu."
            ]
          }
        ]
      : [
          {
            label: "Overview",
            color: C.leaf,
            items: [
              "A representative folk performing art of the Cơ Tu people.",
              "Appears in major rituals such as new rice festival, Gươl building, weddings, buffalo sacrifice.",
              "Both a dance and a sacred ritual practice."
            ]
          },
          {
            label: "Cultural Meaning",
            color: C.gold,
            items: [
              "Expresses connection between humans and spirits, ancestors, and supernatural forces.",
              "Symbolizes offering to heaven and praying for good harvest.",
              "Strengthens community bonds."
            ]
          },
          {
            label: "Structure & Performance",
            color: C.clay,
            items: [
              "Tung tung (male): strong movements — hunting and protection.",
              "Da dá (female): soft movements — fertility and offering.",
              "Circular dance before the Gươl — symbol of life cycle.",
              "Performed with gongs, drums, and traditional costumes."
            ]
          },
          {
            label: "Preservation",
            color: C.leaf,
            items: [
              "Now staged for tourism.",
              "Still preserved in rituals and community life.",
              "Needs safeguarding for cultural continuity."
            ]
          }
        ],
  "https://cdn-i2.congthuong.vn/stores/news_dataimages/2023/042023/27/11/dsc0978820230427114754.jpg"
);


const Page42NoiLyHatLy = makePage(
  "Di Sản Phi Vật Thể › Nghệ Thuật Trình Diễn",
  "Nói Lý – Hát Lý",
  "Nói Lý – Hát Lý",
  {
    vi: "Di sản văn hóa phi vật thể quốc gia (2015)",
    en: "National intangible cultural heritage (2015)"
  },
  (lang) =>
    lang === "vi"
      ? [
          {
            label: "Khái Quát",
            color: C.leaf,
            items: [
              "Hình thức diễn xướng dân gian kết hợp giữa lời nói và lời hát.",
              "Vừa là nghệ thuật vừa là phương thức giao tiếp tinh tế.",
              "Được công nhận là di sản văn hóa phi vật thể quốc gia năm 2015."
            ]
          },
          {
            label: "Ý Nghĩa",
            color: C.gold,
            items: [
              "Dùng để bày tỏ tình cảm, thuyết phục và giải quyết mâu thuẫn.",
              "Duy trì đạo lý, trật tự xã hội.",
              "Góp phần gắn kết cộng đồng."
            ]
          },
          {
            label: "Đặc Điểm",
            color: C.clay,
            items: [
              "Tính ứng khẩu cao, đối đáp linh hoạt.",
              "Ngôn ngữ giàu hình ảnh, ẩn dụ từ đời sống núi rừng.",
              "Các làn điệu: Kahlơi, Cha chấp, Kalâu–Kalênh, Nơơi.",
              "Người tham gia thường có kinh nghiệm và vốn hiểu biết sâu."
            ]
          },
          {
            label: "Cách Thức & Vai Trò",
            color: C.leaf,
            items: [
              "Bắt đầu bằng nói lý, sau đó chuyển sang hát lý.",
              "Diễn ra trong lễ cưới, lễ hội và sinh hoạt cộng đồng.",
              "Là phương tiện truyền đạt tri thức và giá trị văn hóa."
            ]
          }
        ]
      : [
          {
            label: "Overview",
            color: C.leaf,
            items: [
              "A folk performance combining speech and song.",
              "Both an art form and a refined communication method.",
              "Recognized as national intangible heritage in 2015."
            ]
          },
          {
            label: "Meaning",
            color: C.gold,
            items: [
              "Used to express feelings, persuade, and resolve conflicts.",
              "Maintains social ethics and order.",
              "Strengthens community ties."
            ]
          },
          {
            label: "Features",
            color: C.clay,
            items: [
              "Highly improvisational and responsive.",
              "Rich in imagery and metaphor.",
              "Includes styles: Kahlơi, Cha chấp, Kalâu–Kalênh, Nơơi.",
              "Performed by experienced individuals."
            ]
          },
          {
            label: "Form & Role",
            color: C.leaf,
            items: [
              "Starts with speaking, then transitions to singing.",
              "Performed in ceremonies and daily life.",
              "Transmits knowledge and cultural values."
            ]
          }
        ],
  "https://images.baodantoc.vn/uploads/2021/Th%C3%A1ng%201/Ng%C3%A0y%209/hat-ly-090121.jpg"
);
const Page45DanToBrehAlui = makePage(
  "Di Sản Phi Vật Thể › Nhạc Cụ",
  "Đàn Tơ Bhréh Alui",
  "Tơ Bhréh Alui Instrument",
  {
    vi: "Đàn 'Bầu' Cơ Tu — Gắn với hát lý và giao duyên",
    en: "Cơ Tu 'Bầu Lute' — Tied to lý singing and courtship"
  },
  (lang) =>
    lang === "vi"
      ? [
          {
            label: "Khái Quát",
            color: C.leaf,
            items: [
              "Nhạc cụ dây truyền thống của người Cơ Tu (Quảng Nam), có hình thức gần giống đàn bầu Việt.",
              "Khá phổ biến trong đời sống — xuất hiện trong lễ hội và sinh hoạt hằng ngày.",
              "Đặc biệt gắn liền với hát lý và các hình thức giao duyên."
            ]
          },
          {
            label: "Cấu Tạo & Diễn Tấu",
            color: C.gold,
            items: [
              "Cần tre dài khoảng 1–1,2m; thùng đàn làm từ quả bầu khô để cộng hưởng âm.",
              "Đàn có hai dây: một dây chính và một dây đệm trầm.",
              "Người chơi áp đàn vào bụng, một tay gảy, một tay bấm để thay đổi cao độ.",
              "Có thể kết hợp hai dây để tạo hòa âm hoặc lật đàn để tạo âm thanh ngắt quãng.",
              "Kỹ thuật diễn tấu khá phức tạp, đòi hỏi sự khéo léo."
            ]
          },
          {
            label: "Ý Nghĩa & Bảo Tồn",
            color: C.clay,
            items: [
              "Giữ vai trò quan trọng trong dàn nhạc truyền thống, tạo không gian âm thanh và biểu đạt cảm xúc.",
              "Góp phần hỗ trợ hát lý và giao duyên trong cộng đồng.",
              "Hiện có nguy cơ mai một do ít người trẻ kế thừa.",
              "Cần được bảo tồn và truyền dạy để giữ gìn bản sắc văn hóa Cơ Tu."
            ]
          }
        ]
      : [
          {
            label: "Overview",
            color: C.leaf,
            items: [
              "Traditional string instrument of the Cơ Tu people (Quảng Nam), resembling the Vietnamese monochord.",
              "Common in daily life — appears in festivals and community activities.",
              "Closely associated with lý singing and courtship traditions."
            ]
          },
          {
            label: "Structure & Playing",
            color: C.gold,
            items: [
              "Bamboo neck 1–1.2m; resonator made from dried gourd.",
              "Two strings: one main string and one bass string.",
              "Player presses instrument against the body, plucks with one hand and adjusts pitch with the other.",
              "Can combine strings for harmony or flip the instrument for staccato effects.",
              "Requires relatively complex playing techniques."
            ]
          },
          {
            label: "Significance & Preservation",
            color: C.clay,
            items: [
              "Plays an important role in traditional ensembles, shaping sound space and emotional expression.",
              "Supports lý singing and courtship communication.",
              "Currently at risk of disappearance due to lack of young practitioners.",
              "Needs preservation and transmission to maintain cultural identity."
            ]
          }
        ],
  "https://cdnphoto.dantri.com.vn/n6KwPLePnlC9bjg1Sx93AT1TSDs=/thumb_w/1020/2022/11/07/2-1667822898058.jpg?watermark=true"
);


const Page44DanTomRech = makePage(
  "Di Sản Phi Vật Thể › Nhạc Cụ",
  "Đàn Tơm Rech",
  "Tơm Rech Instrument",
  {
    vi: "Nhạc cụ dây giữ nhịp trong dàn nhạc truyền thống",
    en: "String instrument keeping rhythm in traditional ensemble"
  },
  (lang) =>
    lang === "vi"
      ? [
          {
            label: "Khái Quát",
            color: C.leaf,
            items: [
              "Nhạc cụ dây thuộc hệ thống gần 20 loại nhạc cụ truyền thống của người Cơ Tu.",
              "Không phổ biến như cồng chiêng hay đàn Abel nhưng vẫn giữ vai trò quan trọng."
            ]
          },
          {
            label: "Đặc Điểm & Vai Trò",
            color: C.gold,
            items: [
              "Cấu tạo đơn giản, sử dụng trong sinh hoạt cộng đồng và biểu diễn văn nghệ.",
              "Âm thanh không nổi bật — chủ yếu giữ nhịp và tạo nền.",
              "Có thể thay thế trống hoặc hỗ trợ cồng chiêng.",
              "Góp phần ổn định tiết tấu và tạo sự hài hòa cho dàn nhạc."
            ]
          },
          {
            label: "Ý Nghĩa & Bảo Tồn",
            color: C.clay,
            items: [
              "Thể hiện tính cộng đồng trong âm nhạc Cơ Tu.",
              "Mỗi nhạc cụ đều góp phần vào tổng thể hòa âm.",
              "Hiện có nguy cơ mai một.",
              "Cần bảo tồn và truyền dạy cho thế hệ trẻ."
            ]
          }
        ]
      : [
          {
            label: "Overview",
            color: C.leaf,
            items: [
              "String instrument within the Cơ Tu system of nearly 20 traditional instruments.",
              "Less common but still plays an important role in community music."
            ]
          },
          {
            label: "Features & Role",
            color: C.gold,
            items: [
              "Simple structure; used in community activities and performances.",
              "Sound is not prominent — mainly keeps rhythm and provides background.",
              "Can replace drums or support gong ensembles.",
              "Helps stabilize tempo and overall harmony."
            ]
          },
          {
            label: "Significance & Preservation",
            color: C.clay,
            items: [
              "Reflects the communal nature of Cơ Tu music.",
              "Each instrument contributes to the whole ensemble.",
              "Currently at risk of disappearance.",
              "Needs preservation and cultural transmission."
            ]
          }
        ],
  "https://icdn.dantri.com.vn/is9eep68pOz3YVjKaY9/Image/2014/01/a3-b0831.jpg"
);


const Page43DanAbel = makePage(
  "Di Sản Phi Vật Thể › Nhạc Cụ",
  "Đàn Abel",
  "Abel Instrument",
  {
    vi: "Nhạc cụ giao tiếp độc đáo trong giao duyên",
    en: "Unique communication instrument in courtship"
  },
  (lang) =>
    lang === "vi"
      ? [
          {
            label: "Khái Quát",
            color: C.leaf,
            items: [
              "Nhạc cụ truyền thống độc đáo của người Cơ Tu (Quảng Nam).",
              "Gắn liền với đời sống tinh thần và sinh hoạt cộng đồng.",
              "Được sử dụng như phương tiện giao tiếp trong giao duyên nam nữ."
            ]
          },
          {
            label: "Cấu Tạo & Diễn Tấu",
            color: C.gold,
            items: [
              "Ống tre dài 30–40cm, dây bằng sợi thực vật.",
              "Sử dụng sáp ong để điều chỉnh cao độ.",
              "Bộ phận 'khêl' nối với miếng vẩy — người chơi ngậm vào miệng.",
              "Kết hợp kéo dây, hơi thở và khoang miệng để tạo âm thanh.",
              "Âm thanh có thể mô phỏng tiếng nói và âm thanh thiên nhiên.",
              "Có thể chơi cá nhân hoặc phối hợp hai người."
            ]
          },
          {
            label: "Ý Nghĩa & Bảo Tồn",
            color: C.clay,
            items: [
              "Được xem là 'phương tiện giao tiếp bằng âm thanh'.",
              "Giúp bày tỏ tình cảm và tâm tư một cách tinh tế.",
              "Phản ánh quan niệm âm nhạc là một phần của giao tiếp xã hội.",
              "Hiện có nguy cơ mai một, cần được bảo tồn."
            ]
          }
        ]
      : [
          {
            label: "Overview",
            color: C.leaf,
            items: [
              "Unique traditional instrument of the Cơ Tu people.",
              "Closely tied to spiritual and community life.",
              "Used as a communication tool in courtship."
            ]
          },
          {
            label: "Structure & Playing",
            color: C.gold,
            items: [
              "Bamboo tube (30–40cm), plant-fiber string.",
              "Beeswax used for pitch adjustment.",
              "Special 'khel' part placed in the mouth.",
              "Combines string pulling, breath, and mouth cavity control.",
              "Can mimic speech and natural sounds.",
              "Playable solo or in pairs."
            ]
          },
          {
            label: "Significance & Preservation",
            color: C.clay,
            items: [
              "Considered a 'sound-based communication tool'.",
              "Expresses emotions and feelings subtly.",
              "Reflects music as social communication.",
              "Currently at risk — needs preservation."
            ]
          }
        ],
  "https://nhaccuphongvan.vn/wp-content/uploads/2015/06/Abel1.jpg"
);

// ─── CLOSING PAGE ─────────────────────────────────────────────────────────────
function Page46LoiKet({ lang }) {
  const paragraphs = lang === "vi" ? [
    { color: C.leaf, text: "Di sản văn hoá của người Cơ Tu tại thành phố Đà Nẵng không chỉ phản ánh một quá khứ giàu truyền thống mà còn là biểu hiện sinh động của bản sắc, tri thức và đời sống cộng đồng trong hiện tại." },
    { color: C.gold, text: "Trong bối cảnh chuyển đổi số, xây dựng nguồn tài nguyên số là hướng đi quan trọng nhằm bảo tồn và lan toả những giá trị văn hoá đặc sắc — mở ra cơ hội ứng dụng trong giáo dục, giao lưu văn hoá và du lịch bền vững." },
    { color: C.clay, text: "Hy vọng cuốn sổ tay nhỏ này sẽ là cầu nối đưa người đọc đến gần hơn với chiều sâu văn hoá Cơ Tu — khơi dậy ý thức trân trọng, gìn giữ di sản và là minh chứng cho sự kết hợp hài hoà giữa truyền thống và công nghệ." },
  ] : [
    { color: C.leaf, text: "The cultural heritage of the Cơ Tu people in Da Nang not only reflects a past rich in tradition but also embodies the living identity, knowledge, and community life of the present." },
    { color: C.gold, text: "In the context of digital transformation, building digital resources is an important path to preserve and spread these exceptional cultural values — opening opportunities in education, cultural exchange, and sustainable tourism." },
    { color: C.clay, text: "It is our hope that this small handbook will serve as a bridge bringing readers closer to the depth of Cơ Tu culture — awakening awareness, cherishing heritage, and demonstrating the harmonious union of tradition and technology." },
  ];

  return (
    <PageShell bgVariant="a">
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse at 30% 60%, ${C.leaf}22 0%, transparent 50%), radial-gradient(ellipse at 72% 25%, ${C.gold}12 0%, transparent 44%)`,
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        top: 36, bottom: 36, left: 40, right: 40,
        display: "flex", alignItems: "stretch",
      }}>
        {/* Left */}
        <div style={{
          width: "44%", flexShrink: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          textAlign: "center", paddingRight: 28,
        }}>
          {/* Center diamond decoration */}
          <svg width="70" height="70" viewBox="0 0 70 70" fill="none" style={{ marginBottom: 12 }}>
            <polygon points="35,5 65,35 35,65 5,35" stroke={C.gold} strokeWidth="1.5" fill={`${C.gold}12`} />
            <polygon points="35,15 55,35 35,55 15,35" stroke={C.leaf} strokeWidth="1" fill={`${C.leaf}10`} />
            <circle cx="35" cy="35" r="10" fill={C.gold} opacity="0.8" />
            <circle cx="35" cy="35" r="5" fill={C.cream} opacity="0.9" />
          </svg>
          <div style={{ fontSize: 8.5, letterSpacing: "4px", textTransform: "uppercase", color: C.textMuted, marginBottom: 10, fontFamily: "'Be Vietnam Pro',sans-serif" }}>
            ✦ {lang === "vi" ? "Lời Kết" : "Closing Words"} ✦
          </div>
          <div style={{ fontSize: "clamp(26px,3.2vw,38px)", fontWeight: 700, color: C.cream, lineHeight: 1.05, fontFamily: "'Playfair Display',serif", textShadow: `0 0 30px ${C.leaf}66` }}>
            {lang === "vi" ? "Xin Cảm Ơn" : "Thank You"}
          </div>
          <div style={{ fontSize: "clamp(14px,1.7vw,20px)", fontWeight: 600, color: C.leafLight, lineHeight: 1.1, marginBottom: 14, fontFamily: "'Playfair Display',serif" }}>
            {lang === "vi" ? "& Hẹn Gặp Lại" : "& Until Next Time"}
          </div>
          <SectionDivider />
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 9, width: "100%" }}>
            {[
              { text: "Đại Học Sư Phạm – Đại Học Đà Nẵng", color: C.leaf },
              { text: "Khoa Sử – Địa – Chính Trị", color: C.gold },
              { text: "Văn Hoá Cơ Tu · Đà Nẵng · 2026", color: C.clay },
            ].map((p, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 10,
                background: `linear-gradient(135deg, rgba(10,25,12,0.6), ${p.color}0a)`,
                borderLeft: `3px solid ${p.color}cc`,
                padding: "7px 12px",
              }}>
                <CoTuDiamond size={8} color={p.color} />
                <span style={{ fontSize: "clamp(8px,0.93vw,9.5px)", color: C.textMain, fontFamily: "'Be Vietnam Pro',sans-serif" }}>{p.text}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, width: "100%" }}><CoTuBorder /></div>
        </div>

        <VDivider />

        {/* Right */}
        <div style={{
          flex: 1,
          display: "flex", flexDirection: "column", justifyContent: "center",
          paddingLeft: 26, paddingRight: 6, gap: 12,
          position: "relative",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <DiamondRow gap={5} />
            <div style={{ fontSize: 9.5, letterSpacing: "3px", textTransform: "uppercase", color: C.goldLight, opacity: 0.85, fontFamily: "'Be Vietnam Pro',sans-serif" }}>
              {lang === "vi" ? "Lời Nhắn Gửi" : "Closing Message"}
            </div>
          </div>
          {paragraphs.map((p, i) => (
            <div key={i} style={{
              background: `linear-gradient(135deg, rgba(10,25,12,0.6), ${p.color}0a)`,
              borderLeft: `3px solid ${p.color}88`,
              padding: "10px 14px",
              display: "flex", gap: 10, alignItems: "flex-start",
            }}>
              <CoTuDiamond size={8} color={p.color} />
              <p style={{
                fontSize: "clamp(9px,1vw,11px)",
                color: C.textMain,
                lineHeight: 1.85,
                margin: 0,
                fontStyle: "italic",
                fontFamily: "'Lora',serif",
              }}>{p.text}</p>
            </div>
          ))}
          
          <div style={{
            position: "absolute",
            bottom: -10,
            right: 10,
            width: "90%", 
            borderRadius: 4,
            overflow: "hidden",
          }}>
            <img src={iumgTeam} alt="Team" style={{ width: "100%", height: "auto", display: "block", filter: "brightness(0.9) contrast(1.1)" }} />
          </div>
        </div>
      </div>
    </PageShell>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE REGISTRY
// ═══════════════════════════════════════════════════════════════════════════════
const PAGES = [
  { id: 1,  label: { vi: "Trang Bìa", en: "Cover" },                  component: Page1Cover },
  { id: 2,  label: { vi: "Giới Thiệu", en: "Introduction" },           component: Page2Intro },
  { id: 3,  label: { vi: "Mục Lục", en: "Contents" },                  component: Page3Toc },
  { id: 4,  label: { vi: "Làng Truyền Thống", en: "Traditional Village" }, component: Page4Lang },
  { id: 5,  label: { vi: "Nhà Gươl", en: "Gươl House" },               component: Page5NhaGuol },
  { id: 6,  label: { vi: "Nhà Sàn", en: "Stilt House" },               component: Page6NhaSan },
  { id: 7,  label: { vi: "Áo Cộc Tay", en: "Short-Sleeved Shirt" },    component: Page7AoCocTay },
  { id: 8,  label: { vi: "Váy Ngắn", en: "Short Skirt" },              component: Page8VayNgan },
  { id: 9,  label: { vi: "Váy Dài", en: "Long Skirt" },                component: Page9VayDai },
  { id: 10, label: { vi: "Khố", en: "Loincloth" },                     component: Page10Kho },
  { id: 11, label: { vi: "Cơm Lam", en: "Bamboo Rice" },               component: Page11ComLam },
  { id: 12, label: { vi: "Bánh Sừng Trâu", en: "Buffalo Horn Cake" },  component: Page12BanhSungTrau },
  { id: 13, label: { vi: "Thịt Gác Bếp", en: "Smoked Meat" },         component: Page13ThitGacBep },
  { id: 14, label: { vi: "Canh Thụt", en: "Pounded Soup" },            component: Page14CanhThut },
  { id: 15, label: { vi: "Cá Niên Nướng", en: "Grilled Fish" },        component: Page15CaNien },
  { id: 16, label: { vi: "Thịt Lam", en: "Bamboo Meat" },              component: Page16ThitLam },
  { id: 17, label: { vi: "Thuyền Độc Mộc", en: "Dugout Canoe" },       component: Page17ThuyenDocMoc },
  { id: 18, label: { vi: "Rìu", en: "Axe" },                           component: Page18Riu },
  { id: 19, label: { vi: "Gùi", en: "Basket" },                        component: Page19Gui },
  { id: 20, label: { vi: "Gậy Chọc Lỗ", en: "Dibble Stick" },         component: Page20GayChocLo },
  { id: 21, label: { vi: "Chày Giã Gạo", en: "Rice Pestle" },         component: Page21ChayGiaGao },
  { id: 22, label: { vi: "Công Cụ Săn Bắt", en: "Hunting Tools" },     component: Page22CongCuSan },
  { id: 23, label: { vi: "Lễ Mừng Lúa Mới", en: "New Rice Festival" }, component: Page23LeMungLuaMoi },
  { id: 24, label: { vi: "Lễ Dựng Nhà Gươl", en: "Gươl Ceremony" },   component: Page24LeDungNhaGuol },
  { id: 25, label: { vi: "Lễ Kết Nghĩa", en: "Bond Ceremony" },        component: Page25LeKetNghia },
  { id: 26, label: { vi: "Tri Thức Canh Tác", en: "Farming Knowledge" }, component: Page26TriThucCanhTac },
  { id: 27, label: { vi: "Y Học Dân Gian", en: "Folk Medicine" },      component: Page27YHocDanGian },
  { id: 28, label: { vi: "Ngôn Ngữ Cơ Tu", en: "Cơ Tu Language" },     component: Page28NgonNgu },
  { id: 29, label: { vi: "Sự Tích Dòng Họ", en: "Clan Legend" },       component: Page29SuTichDongHo },
  { id: 30, label: { vi: "Mồ Côi Giữ Trâu", en: "Orphan & Buffaloes" }, component: Page30MoCoiGiuTrau },
  { id: 31, label: { vi: "Mồ Côi Cưới Vợ", en: "Orphan & Wife" },      component: Page31MoCoiCuoiVo },
  { id: 32, label: { vi: "Nghề Thủ Công", en: "Handicrafts" },         component: Page32NgheThuCongIntro },
  { id: 33, label: { vi: "Dệt Thổ Cẩm", en: "Brocade Weaving" },       component: Page33DetThoCam },
  { id: 34, label: { vi: "Đan Lát", en: "Basket Weaving" },            component: Page34NgheĐanLat },
  { id: 35, label: { vi: "Điêu Khắc", en: "Folk Carving" },            component: Page35DieuKhacIntro },
  { id: 36, label: { vi: "Điêu Khắc Nhà Gươl", en: "Gươl Carvings" }, component: Page36DieuKhacGuol },
  { id: 37, label: { vi: "Điêu Khắc Cột Tế", en: "Ritual Post" },      component: Page37DieuKhacCotTe },
  { id: 38, label: { vi: "Điêu Khắc Nhà Mồ", en: "Tomb Carvings" },    component: Page38DieuKhacNhaMo },
  { id: 39, label: { vi: "Vũ Khí & Công Cụ", en: "Weapons & Tools" },  component: Page39VuKhiCongCu },
  { id: 40, label: { vi: "Trang Sức", en: "Jewelry" },                 component: Page40TrangSuc },
  { id: 41, label: { vi: "Múa Tung Tung", en: "Tung Tung Dance" },     component: Page41MuaTungTung },
  { id: 42, label: { vi: "Nói Lý – Hát Lý", en: "Nói Lý – Hát Lý" },  component: Page42NoiLyHatLy },
  { id: 43, label: { vi: "Đàn Abel", en: "Abel Instrument" },          component: Page43DanAbel },
  { id: 44, label: { vi: "Đàn Tơm Rech", en: "Tơm Rech" },             component: Page44DanTomRech },
  { id: 45, label: { vi: "Đàn Tơ Bhréh Alui", en: "Tơ Bhréh Alui" },  component: Page45DanToBrehAlui },
  { id: 46, label: { vi: "Lời Kết", en: "Closing" },                   component: Page46LoiKet },
];

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════════════════
export default function SotayCoTu() {
  const [current, setCurrent] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [flipDir, setFlipDir] = useState("next");
  const [lang, setLang] = useState("vi");
  const [dragStart, setDragStart] = useState(null);

  const goTo = useCallback((index) => {
    if (flipping || index === current || index < 0 || index >= PAGES.length) return;
    setFlipDir(index > current ? "next" : "prev");
    setFlipping(true);
    setTimeout(() => { setCurrent(index); setFlipping(false); }, 480);
  }, [flipping, current]);

  useEffect(() => {
    const fn = (e) => {
      if (e.key === "ArrowRight") goTo(current + 1);
      if (e.key === "ArrowLeft") goTo(current - 1);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [current, goTo]);

  const handlePointerDown = (e) => setDragStart(e.clientX ?? e.touches?.[0]?.clientX);
  const handlePointerUp = (e) => {
    if (dragStart === null) return;
    const end = e.clientX ?? e.changedTouches?.[0]?.clientX;
    const diff = dragStart - end;
    if (Math.abs(diff) > 50) diff > 0 ? goTo(current + 1) : goTo(current - 1);
    setDragStart(null);
  };

  const PageComp = PAGES[current].component;
  const label = PAGES[current].label[lang];

  return (
    <div style={{
      width: "100vw", height: "100vh",
      background: `linear-gradient(160deg, #050e06 0%, #081508 35%, #0b1c0b 65%, #061008 100%)`,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      overflow: "hidden",
      fontFamily: "'Be Vietnam Pro', sans-serif",
      position: "relative",
    }}>
      <style>{`
        ${fontImport}
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        
        @keyframes flipNext {
          0%   { opacity:1; transform: perspective(1600px) rotateY(0deg) scale(1); filter:brightness(1) }
          30%  { opacity:.65; transform: perspective(1600px) rotateY(-20deg) scale(0.95) translateZ(-30px); filter:brightness(0.6) }
          60%  { opacity:.5; transform: perspective(1600px) rotateY(-6deg) scale(0.97) translateZ(-12px); filter:brightness(0.55) }
          80%  { opacity:.75; transform: perspective(1600px) rotateY(3deg) scale(0.985); filter:brightness(0.8) }
          100% { opacity:1; transform: perspective(1600px) rotateY(0deg) scale(1); filter:brightness(1) }
        }
        @keyframes flipPrev {
          0%   { opacity:1; transform: perspective(1600px) rotateY(0deg) scale(1); filter:brightness(1) }
          30%  { opacity:.65; transform: perspective(1600px) rotateY(20deg) scale(0.95) translateZ(-30px); filter:brightness(0.6) }
          60%  { opacity:.5; transform: perspective(1600px) rotateY(6deg) scale(0.97) translateZ(-12px); filter:brightness(0.55) }
          80%  { opacity:.75; transform: perspective(1600px) rotateY(-3deg) scale(0.985); filter:brightness(0.8) }
          100% { opacity:1; transform: perspective(1600px) rotateY(0deg) scale(1); filter:brightness(1) }
        }
        @keyframes shimmer {
          0%,100% { opacity: 0.3 }
          50% { opacity: 0.7 }
        }
        .flip-next { animation: flipNext 0.5s cubic-bezier(0.4,0,0.2,1) }
        .flip-prev { animation: flipPrev 0.5s cubic-bezier(0.4,0,0.2,1) }
        .nav-btn { transition: all 0.2s; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; outline:none; }
        .nav-btn:hover:not(:disabled) { transform: scale(1.12) !important; }
        .nav-btn:active:not(:disabled) { transform: scale(0.9) !important; }
        .nav-btn:disabled { cursor:default; opacity:0.2; }
        .dot { transition: all 0.25s; cursor:pointer; border:none; padding:0; }
        .dot:hover { transform: scale(1.5); }
        .lang-btn { transition: all 0.2s; cursor:pointer; border:none; outline:none; }
        .lang-btn:hover { opacity:1 !important; }
      `}</style>

      {/* Ambient forest particles */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            width: i % 3 === 0 ? 3 : 2,
            height: i % 3 === 0 ? 3 : 2,
            background: i % 2 === 0 ? C.leaf : C.gold,
            borderRadius: "50%",
            left: `${4 + i * 5.2}%`,
            top: `${8 + (i % 7) * 13}%`,
            opacity: 0.12,
            animation: `shimmer ${2 + (i % 4)}s ease-in-out infinite`,
            animationDelay: `${(i * 0.4) % 3}s`,
          }} />
        ))}
      </div>

      {/* Top bar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        width: "100%", maxWidth: "calc(100vw - 40px)",
        paddingBottom: 10, flexShrink: 0,
      }}>
        <div style={{
          fontSize: "clamp(8px,0.9vw,10px)",
          letterSpacing: "2.5px",
          textTransform: "uppercase",
          color: C.textMuted,
          fontFamily: "'Be Vietnam Pro',sans-serif",
        }}>
          {label} &nbsp;·&nbsp; {current + 1} / {PAGES.length}
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {["vi", "en"].map(l => (
            <button key={l} className="lang-btn" onClick={() => setLang(l)} style={{
              padding: "4px 14px",
              fontSize: 9,
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              fontFamily: "'Be Vietnam Pro',sans-serif",
              background: lang === l ? `${C.forestLight}55` : "transparent",
              border: `1px solid ${lang === l ? C.leaf : C.leaf + "44"}`,
              color: lang === l ? C.leafLight : C.textMuted,
              opacity: lang === l ? 1 : 0.55,
            }}>
              {l === "vi" ? "Việt" : "ENG"}
            </button>
          ))}
        </div>
      </div>

      {/* Book + Nav row */}
      <div style={{
        display: "flex", alignItems: "center", gap: "clamp(8px,1.2vw,18px)",
        width: "100%", maxWidth: "calc(100vw - 40px)",
        flex: 1, minHeight: 0,
      }}>
        {/* Prev button */}
        <button
          className="nav-btn"
          disabled={current === 0}
          onClick={() => goTo(current - 1)}
          style={{
            flexShrink: 0, width: 40, height: 40, borderRadius: "50%",
            background: current === 0 ? "transparent" : `${C.forestLight}30`,
            border: `1px solid ${current === 0 ? C.leaf + "22" : C.leaf + "77"}`,
            color: current === 0 ? `${C.leafLight}22` : C.leafLight,
          }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
            <polygon points="12,3 6,9 12,15" />
          </svg>
        </button>

        {/* Book */}
        <div style={{
          flex: 1, minWidth: 0,
          position: "relative",
          height: "100%",
          display: "flex", alignItems: "center",
        }}>
          {/* Glow */}
          <div style={{
            position: "absolute", inset: -6,
            background: `linear-gradient(135deg, ${C.leaf}15, ${C.gold}0a, ${C.leaf}10)`,
            filter: "blur(12px)", zIndex: 0, borderRadius: 4,
          }} />
          {/* Book shadow */}
          <div style={{
            position: "absolute",
            bottom: -12, left: "5%", right: "5%", height: 20,
            background: "rgba(0,0,0,0.5)",
            filter: "blur(16px)",
            zIndex: 0,
          }} />
          {/* Pages */}
          <div
            className={flipping ? (flipDir === "next" ? "flip-next" : "flip-prev") : ""}
            style={{
              width: "100%",
              aspectRatio: "297/210",
              maxHeight: "100%",
              position: "relative", zIndex: 1,
              boxShadow: `
                2px 4px 8px rgba(0,0,0,0.7),
                8px 12px 30px rgba(0,0,0,0.6),
                20px 25px 60px rgba(0,0,0,0.5),
                inset 0 0 0 1px ${C.gold}22
              `,
              cursor: "grab",
              userSelect: "none",
              overflow: "hidden",
            }}
            onMouseDown={handlePointerDown}
            onMouseUp={handlePointerUp}
            onMouseLeave={(e) => { if (dragStart !== null) handlePointerUp(e); }}
            onTouchStart={handlePointerDown}
            onTouchEnd={handlePointerUp}
          >
            <PageComp lang={lang} />
            {/* Page number overlay */}
            <div style={{
              position: "absolute", bottom: 16, right: 18, zIndex: 20,
              background: "rgba(8,20,8,0.7)",
              color: C.textMuted,
              fontSize: 8,
              letterSpacing: "2px",
              padding: "2px 8px",
              border: `1px solid ${C.leaf}22`,
              fontFamily: "'Be Vietnam Pro',sans-serif",
            }}>
              {current + 1}
            </div>
            {/* Spine shadow */}
            <div style={{
              position: "absolute", left: 0, top: 0, bottom: 0, width: 8,
              background: `linear-gradient(to right, ${C.leaf}28, transparent)`,
              pointerEvents: "none", zIndex: 10,
            }} />
            {/* Right edge shadow */}
            <div style={{
              position: "absolute", right: 0, top: 0, bottom: 0, width: 12,
              background: `linear-gradient(to left, rgba(0,0,0,0.3), transparent)`,
              pointerEvents: "none", zIndex: 10,
            }} />
            {/* Top sheen */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 3,
              background: `linear-gradient(to bottom, rgba(255,255,255,0.06), transparent)`,
              pointerEvents: "none", zIndex: 10,
            }} />
          </div>
        </div>

        {/* Next button */}
        <button
          className="nav-btn"
          disabled={current === PAGES.length - 1}
          onClick={() => goTo(current + 1)}
          style={{
            flexShrink: 0, width: 40, height: 40, borderRadius: "50%",
            background: current === PAGES.length - 1 ? "transparent" : `${C.forestLight}30`,
            border: `1px solid ${current === PAGES.length - 1 ? C.leaf + "22" : C.leaf + "77"}`,
            color: current === PAGES.length - 1 ? `${C.leafLight}22` : C.leafLight,
          }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
            <polygon points="6,3 12,9 6,15" />
          </svg>
        </button>
      </div>

      {/* Dot nav */}
      <div style={{
        display: "flex", gap: 4, paddingTop: 10,
        alignItems: "center", flexWrap: "wrap", justifyContent: "center",
        maxWidth: "calc(100vw - 40px)",
        flexShrink: 0,
      }}>
        {PAGES.map((_, i) => (
          <button key={i} className="dot" onClick={() => goTo(i)} style={{
            width: i === current ? 20 : 5,
            height: 5,
            borderRadius: 3,
            background: i === current ? C.leaf : `${C.leafLight}25`,
            boxShadow: i === current ? `0 0 10px ${C.leaf}88` : "none",
            transition: "all 0.3s ease",
          }} />
        ))}
      </div>

      {/* Key hint */}
      <div style={{
        paddingTop: 7,
        fontSize: 8,
        color: C.textMuted,
        letterSpacing: "2px",
        textAlign: "center",
        fontFamily: "'Be Vietnam Pro',sans-serif",
        flexShrink: 0,
      }}>
        ← → lật trang &nbsp;·&nbsp; kéo để chuyển
      </div>
    </div>
  );
}