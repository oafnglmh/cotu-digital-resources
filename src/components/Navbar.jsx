// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Flame } from "lucide-react";
import { C } from "../tokens";
import { TribalStrip } from "./SharedUI";
import { NAV_ITEMS } from "../data/mockData";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled,  setScrolled] = useState(false);
  const [active,    setActive]   = useState("");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (href) => {
    document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
    setActive(href);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: .6, ease: [.22,1,.36,1] }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 99999,
          transition: "all .3s ease",
          background: scrolled
            ? "rgba(26,14,8,0.97)"
            : "linear-gradient(180deg,rgba(26,14,8,0.88),transparent)",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled ? `1px solid ${C.earth}44` : "none",
        }}
      >
        {scrolled && <TribalStrip size={3} animated />}

        <div style={{
          maxWidth:1280, margin:"0 auto", padding:"0 24px",
          display:"flex", alignItems:"center", height:64, gap:16,
        }}>

          {/* ── Logo ── */}
          <motion.div whileHover={{ scale:1.03 }}
            onClick={() => window.scrollTo({ top:0, behavior:"smooth" })}
            style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer", flexShrink:0 }}
          >
            <div style={{
              width:38, height:38, borderRadius:10, flexShrink:0,
              background:`linear-gradient(135deg,${C.earth},${C.earthDeep})`,
              border:`1.5px solid ${C.gold}55`,
              display:"flex", alignItems:"center", justifyContent:"center",
              boxShadow:`0 2px 10px rgba(139,58,30,.4)`,
            }}>
              {/* Tribal hexagon logo */}
              <svg viewBox="0 0 24 24" style={{ width:18, height:18 }}>
                <polygon points="12,2 20,8 20,16 12,22 4,16 4,8"
                  fill="none" stroke={C.gold} strokeWidth="1.5"/>
                <polygon points="12,5 17,9 17,15 12,19 7,15 7,9"
                  fill={C.gold} opacity=".2"/>
                <circle cx="12" cy="12" r="2.5" fill={C.gold}/>
              </svg>
            </div>
            <div>
              <div style={{
                fontSize:13, fontWeight:700, color:C.goldPale,
                fontFamily:"'Playfair Display',serif", lineHeight:1.1,
              }}>Cơ Tu Heritage</div>
              <div style={{
                fontSize:8, color:`${C.gold}70`,
                letterSpacing:".12em", textTransform:"uppercase",
              }}>Di Sản · Văn Hóa</div>
            </div>
          </motion.div>

          {/* ── Desktop nav ── */}
          <nav style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:2 }}
            className="desktop-nav">
            {NAV_ITEMS.map(item => (
              <motion.button key={item.id} whileHover={{ y:-1 }} whileTap={{ scale:.97 }}
                onClick={() => scrollTo(item.href)}
                style={{
                  padding:"7px 13px", borderRadius:8, border:"none", cursor:"pointer",
                  background: active===item.href ? "rgba(201,130,26,.18)" : "transparent",
                  color: active===item.href ? C.goldPale : `${C.goldPale}65`,
                  fontSize:13, fontFamily:"'Crimson Pro',serif", fontWeight:600,
                  letterSpacing:".02em", transition:"all .18s",
                }}
                onMouseEnter={e => { e.currentTarget.style.color=C.goldPale; e.currentTarget.style.background="rgba(139,58,30,.18)"; }}
                onMouseLeave={e => { e.currentTarget.style.color=active===item.href?C.goldPale:`${C.goldPale}65`; e.currentTarget.style.background=active===item.href?"rgba(201,130,26,.18)":"transparent"; }}
              >{item.label}</motion.button>
            ))}
          </nav>

          {/* ── CTA ── */}
          <motion.button whileHover={{ scale:1.04 }} whileTap={{ scale:.97 }}
            onClick={() => scrollTo("#le-hoi")}
            style={{
              display:"flex", alignItems:"center", gap:7,
              padding:"8px 18px", borderRadius:10, flexShrink:0,
              background:`linear-gradient(135deg,${C.earth},${C.earthDeep})`,
              border:`1px solid ${C.gold}40`, color:C.goldPale,
              fontSize:12, fontFamily:"'Crimson Pro',serif", fontWeight:700,
              boxShadow:`0 2px 10px rgba(139,58,30,.35)`, letterSpacing:".04em",
            }}>
            <Flame size={13}/> Khám Phá
          </motion.button>

          {/* ── Mobile hamburger ── */}
          <button onClick={() => setMenuOpen(o => !o)}
            className="mobile-btn"
            style={{ background:"none", border:"none", color:C.goldPale, padding:4, flexShrink:0 }}>
            {menuOpen ? <X size={22}/> : <Menu size={22}/>}
          </button>
        </div>
      </motion.header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity:0, x:"100%" }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:"100%" }}
            transition={{ duration:.3, ease:[.22,1,.36,1] }}
            style={{
              position:"fixed", top:0, right:0, bottom:0, width:280,
              zIndex:99998, background:"rgba(26,14,8,0.98)",
              borderLeft:`2px solid ${C.earth}44`,
              display:"flex", flexDirection:"column",
              padding:"80px 20px 30px", backdropFilter:"blur(16px)",
            }}
          >
            <TribalStrip size={4}/>
            <div style={{ marginTop:20, display:"flex", flexDirection:"column", gap:4 }}>
              {NAV_ITEMS.map(item => (
                <motion.button key={item.id} whileHover={{ x:5 }}
                  onClick={() => scrollTo(item.href)}
                  style={{
                    padding:"13px 16px", borderRadius:8, border:"none", cursor:"pointer",
                    background:"transparent", color:`${C.goldPale}75`,
                    fontSize:16, fontFamily:"'Crimson Pro',serif", fontWeight:600, textAlign:"left",
                  }}
                >{item.label}</motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .desktop-nav { display: flex !important; }
        .mobile-btn  { display: none !important; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-btn  { display: flex !important; }
        }
      `}</style>
    </>
  );
}