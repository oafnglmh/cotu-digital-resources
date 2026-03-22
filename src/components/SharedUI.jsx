// src/components/SharedUI.jsx
// ─── Shared tribal ornaments & reusable UI ──────────────────────────────────
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { C, fadeUp, stagger } from "../tokens";

// ── Hook: scroll-reveal ──────────────────────────────────────────────────────
export function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  return [ref, inView];
}

// ── Tribal border strip ──────────────────────────────────────────────────────
export function TribalStrip({ size = 4, animated = false }) {
  return (
    <div style={{
      height: size, width: "100%", flexShrink: 0,
      background: `repeating-linear-gradient(90deg,
        ${C.earth} 0,${C.earth} 8px,
        ${C.gold}  8px,${C.gold}  16px,
        ${C.forest} 16px,${C.forest} 24px,
        ${C.gold}  24px,${C.gold}  32px)`,
      ...(animated ? { animation: "slideStrip 4s linear infinite" } : {}),
    }} />
  );
}

// ── Diamond row ornament ─────────────────────────────────────────────────────
export function DiamondRow({ count = 7, size = 10 }) {
  return (
    <div style={{ display:"flex", gap:8, alignItems:"center", justifyContent:"center" }}>
      {Array.from({ length: count }, (_, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: .75, scale: 1 }}
          transition={{ delay: i * .04, duration: .35 }}
          style={{
            width: size, height: size,
            background: i%3===0 ? C.earth : i%3===1 ? C.gold : C.forest,
            transform: "rotate(45deg)",
          }}
        />
      ))}
    </div>
  );
}

// ── Section title block ──────────────────────────────────────────────────────
export function SectionTitle({ label, title, subtitle, light = false }) {
  const [ref, inView] = useReveal();
  return (
    <motion.div ref={ref}
      variants={stagger()}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      style={{ textAlign:"center", marginBottom:56 }}
    >
      {/* Label */}
      <motion.div variants={fadeUp} style={{
        fontSize:10, letterSpacing:".3em", textTransform:"uppercase",
        color: light ? C.goldLight : C.gold,
        fontFamily:"'Crimson Pro',serif", marginBottom:10,
        display:"flex", alignItems:"center", justifyContent:"center", gap:10,
      }}>
        <div style={{ height:1, width:32, background:`linear-gradient(90deg,transparent,${light?C.goldLight:C.gold})` }}/>
        {label}
        <div style={{ height:1, width:32, background:`linear-gradient(90deg,${light?C.goldLight:C.gold},transparent)` }}/>
      </motion.div>

      {/* Title */}
      <motion.h2 variants={fadeUp} style={{
        fontSize:"clamp(28px,4vw,44px)", fontWeight:700, lineHeight:1.18,
        fontFamily:"'Playfair Display',serif",
        color: light ? C.goldPale : C.earthDeep,
        marginBottom:10,
      }}>{title}</motion.h2>

      {/* Subtitle */}
      {subtitle && (
        <motion.p variants={fadeUp} style={{
          fontSize:16, fontFamily:"'Crimson Pro',serif", fontStyle:"italic",
          color: light ? `${C.goldPale}80` : `${C.earthDeep}90`,
          maxWidth:560, margin:"0 auto",
        }}>{subtitle}</motion.p>
      )}

      <motion.div variants={fadeUp} style={{ marginTop:14 }}>
        <DiamondRow />
      </motion.div>
    </motion.div>
  );
}

// ── Woven texture overlay ─────────────────────────────────────────────────────
export function WovenBg({ opacity = 1 }) {
  return (
    <div style={{
      position:"absolute", inset:0, pointerEvents:"none", zIndex:0, opacity,
      backgroundImage:`
        repeating-linear-gradient(0deg,transparent,transparent 27px,rgba(139,58,30,0.05) 27px,rgba(139,58,30,0.05) 28px),
        repeating-linear-gradient(90deg,transparent,transparent 3px,rgba(201,130,26,0.025) 3px,rgba(201,130,26,0.025) 4px)
      `,
    }}/>
  );
}

// ── Floating particles ────────────────────────────────────────────────────────
export function Particles({ count = 28 }) {
  const pts = Array.from({ length: count }, (_, i) => ({
    id: i,
    x:   Math.random() * 100,
    y:   Math.random() * 100,
    sz:  Math.random() * 3 + .5,
    dur: Math.random() * 8 + 5,
    del: Math.random() * 5,
    t:   i % 3,
  }));
  return (
    <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none" }}>
      {pts.map(p => (
        <motion.div key={p.id}
          style={{
            position:"absolute",
            left:`${p.x}%`, top:`${p.y}%`,
            width:p.sz, height:p.sz,
            background: p.t===0 ? C.gold : p.t===1 ? C.earth : C.forest,
            borderRadius: p.t===1 ? "50%" : "2px",
            transform: p.t===1 ? "none" : "rotate(45deg)",
            opacity: .35,
          }}
          animate={{ y:[0,-28,0], opacity:[.15,.55,.15], scale:[1,1.3,1] }}
          transition={{ duration:p.dur, delay:p.del, repeat:Infinity, ease:"easeInOut" }}
        />
      ))}
    </div>
  );
}

// ── Global CSS (inject once at app root) ─────────────────────────────────────
export const GlobalCSS = () => (
  <style>{`
    @keyframes slideStrip {
      from { background-position: 0 0; }
      to   { background-position: 96px 0; }
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      background: ${C.black};
      color: ${C.goldPale};
      font-family: 'Crimson Pro', Georgia, serif;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }
    img { max-width: 100%; display: block; }
    button { cursor: pointer; }
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: #0d0602; }
    ::-webkit-scrollbar-thumb { background: ${C.earth}; border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: ${C.gold}; }
    ::selection { background: rgba(201,130,26,.3); color: ${C.goldPale}; }

    @media (max-width: 768px) {
      .two-col  { grid-template-columns: 1fr !important; }
      .three-col { grid-template-columns: repeat(2,1fr) !important; }
    }
    @media (max-width: 480px) {
      .three-col { grid-template-columns: 1fr !important; }
    }
  `}</style>
);