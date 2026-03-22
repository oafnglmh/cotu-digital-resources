// src/components/HeroSection.jsx
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play, ChevronDown } from "lucide-react";
import { C } from "../tokens";
import { TribalStrip, Particles, DiamondRow } from "./SharedUI";
import { STATS } from "../data/mockData";

export default function HeroSection() {
  const { scrollY } = useScroll();
  const y    = useTransform(scrollY, [0,600], [0,180]);
  const opac = useTransform(scrollY, [0,400], [1,0]);

  const scrollTo = (id) =>
    document.getElementById(id.replace("#",""))?.scrollIntoView({ behavior:"smooth" });

  return (
    <section style={{
      position:"relative", height:"100vh", minHeight:620,
      overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center",
    }}>
      {/* ── Parallax background ── */}
      <motion.div style={{ position:"absolute", inset:"-20%", y }}>
        <div style={{
          width:"100%", height:"100%",
          background:`
            radial-gradient(ellipse at 30% 42%,rgba(139,58,30,.55) 0%,transparent 52%),
            radial-gradient(ellipse at 72% 62%,rgba(45,90,39,.38) 0%,transparent 48%),
            linear-gradient(160deg,#0d0602 0%,#2a1208 42%,#1a0e08 100%)
          `,
        }}/>
      </motion.div>

      {/* ── Particles ── */}
      <Particles count={32}/>

      {/* ── Grid overlay ── */}
      <div style={{
        position:"absolute", inset:0, pointerEvents:"none",
        backgroundImage:`
          repeating-linear-gradient(0deg,transparent,transparent 44px,rgba(139,58,30,.04) 44px,rgba(139,58,30,.04) 45px),
          repeating-linear-gradient(90deg,transparent,transparent 44px,rgba(201,130,26,.025) 44px,rgba(201,130,26,.025) 45px)
        `,
      }}/>

      {/* ── Bottom fade ── */}
      <div style={{
        position:"absolute", bottom:0, left:0, right:0,
        height:120, background:"linear-gradient(to bottom,transparent,rgba(26,14,8,.7))",
        pointerEvents:"none",
      }}/>
      <div style={{ position:"absolute", bottom:0, left:0, right:0 }}>
        <TribalStrip size={5}/>
      </div>

      {/* ── Content ── */}
      <motion.div style={{
        position:"relative", zIndex:2,
        textAlign:"center", padding:"0 24px", maxWidth:820, opacity:opac,
      }}>
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:.2, duration:.7 }}
          style={{
            fontSize:11, letterSpacing:".32em", textTransform:"uppercase",
            color:C.gold, fontFamily:"'Crimson Pro',serif", marginBottom:18,
            display:"flex", alignItems:"center", justifyContent:"center", gap:12,
          }}
        >
          <div style={{ height:1, width:40, background:`linear-gradient(90deg,transparent,${C.gold})` }}/>
          Tây Giang · Đông Giang · Nam Giang · Quảng Nam
          <div style={{ height:1, width:40, background:`linear-gradient(90deg,${C.gold},transparent)` }}/>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity:0, y:32 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:.35, duration:.85, ease:[.22,1,.36,1] }}
          style={{
            fontSize:"clamp(42px,7.5vw,88px)", fontWeight:700, lineHeight:1.04,
            fontFamily:"'Playfair Display',serif", marginBottom:10,
            textShadow:`0 4px 44px rgba(201,130,26,.3)`,
          }}
        >
          <span style={{ color:C.goldPale }}>Văn Hóa</span>
          <span style={{
            display:"block",
            background:`linear-gradient(135deg,${C.gold},${C.goldPale},${C.goldLight})`,
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
          }}>Cơ Tu</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:.52, duration:.7 }}
          style={{
            fontSize:"clamp(15px,2vw,19px)", lineHeight:1.68, marginBottom:40,
            color:`${C.goldPale}78`, fontFamily:"'Crimson Pro',serif", fontStyle:"italic",
          }}
        >
          Ngàn năm thổ cẩm dệt nên hồn núi rừng Trường Sơn — nơi con người, thiên nhiên và thần linh sống hoà hợp trong nhịp điệu muôn đời.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:.66, duration:.6 }}
          style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap", marginBottom:52 }}
        >
          {[
            { label:"Khám Phá Ngay", icon:<ArrowRight size={14}/>, primary:true,  href:"#lang" },
            { label:"Xem Lễ Hội",   icon:<Play size={14}/>,        primary:false, href:"#le-hoi" },
          ].map((btn, i) => (
            <motion.button key={i}
              whileHover={{ scale:1.04, y:-2 }} whileTap={{ scale:.97 }}
              onClick={() => scrollTo(btn.href)}
              style={{
                display:"flex", alignItems:"center", gap:8,
                padding:"13px 28px", borderRadius:12, cursor:"pointer",
                fontSize:14, fontFamily:"'Crimson Pro',serif", fontWeight:700, letterSpacing:".04em",
                ...(btn.primary ? {
                  background:`linear-gradient(135deg,${C.earth},${C.earthDeep})`,
                  border:`1.5px solid ${C.gold}55`, color:C.goldPale,
                  boxShadow:`0 4px 26px rgba(139,58,30,.5)`,
                } : {
                  background:"rgba(255,255,255,.055)",
                  border:`1.5px solid rgba(245,208,128,.28)`, color:C.goldPale,
                  backdropFilter:"blur(8px)",
                }),
              }}
            >{btn.label} {btn.icon}</motion.button>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity:0 }} animate={{ opacity:1 }}
          transition={{ delay:.86, duration:.7 }}
          style={{ display:"flex", gap:"clamp(20px,4vw,40px)", justifyContent:"center", flexWrap:"wrap" }}
        >
          {STATS.map((s, i) => (
            <div key={i} style={{ textAlign:"center" }}>
              <div style={{
                fontSize:"clamp(22px,3vw,30px)", fontWeight:700, color:C.goldPale,
                fontFamily:"'Playfair Display',serif", lineHeight:1,
              }}>{s.value}</div>
              <div style={{ fontSize:11, color:`${C.goldPale}50`, marginTop:4, letterSpacing:".08em" }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Scroll cue ── */}
      <motion.div
        animate={{ y:[0,8,0] }} transition={{ duration:1.8, repeat:Infinity }}
        onClick={() => scrollTo("#lang")}
        style={{ position:"absolute", bottom:42, left:"50%", transform:"translateX(-50%)", zIndex:2, cursor:"pointer" }}
      >
        <ChevronDown size={24} style={{ color:`${C.goldPale}45` }}/>
      </motion.div>
    </section>
  );
}