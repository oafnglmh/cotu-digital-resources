/**
 * HeritagePanel.jsx — Di sản detail panel · Phong cách Cơ Tu
 * Màu: đất đỏ #8B3A1E, vàng nghệ #C9821A, xanh rừng #2D5A27
 */
import { useState } from "react";
import {
  X, MapPin, Calendar, Building2, Music2, Star,
  Play, Hash, Landmark, Feather,
} from "lucide-react";

// ─── Cơ Tu palette ─────────────────────────────────────────────────────────
const C = {
  earth:     "#8B3A1E",
  earthDeep: "#5C1F08",
  gold:      "#C9821A",
  goldLight: "#E8A832",
  goldPale:  "#F5D080",
  forest:    "#2D5A27",
  cream:     "#FDF6E8",
  paper:     "#F7EED8",
};

// ─── Type config ─────────────────────────────────────────────────────────────
const TYPE_CONFIG = {
  unesco:      { label: "UNESCO",      Icon: Star,      earthTone: C.goldLight,  bg: "rgba(201,130,26,0.12)", border: "rgba(201,130,26,0.35)" },
  vat_the:     { label: "Vật thể",     Icon: Landmark,  earthTone: C.earth,      bg: "rgba(139,58,30,0.12)",  border: "rgba(139,58,30,0.35)"  },
  phi_vat_the: { label: "Phi vật thể", Icon: Music2,    earthTone: C.forest,     bg: "rgba(45,90,39,0.12)",   border: "rgba(45,90,39,0.35)"   },
};

// ─── Tribal border strip ──────────────────────────────────────────────────────
const TribalStrip = ({ height = 4 }) => (
  <div style={{
    height, width: "100%", flexShrink: 0,
    background: `repeating-linear-gradient(90deg,${C.earth} 0,${C.earth} 8px,${C.gold} 8px,${C.gold} 16px,${C.forest} 16px,${C.forest} 24px,${C.gold} 24px,${C.gold} 32px)`,
  }}/>
);

// ─── Diamond tribal ornament ──────────────────────────────────────────────────
const DiamondDivider = () => (
  <svg viewBox="0 0 200 16" style={{width:"100%",height:16}}>
    <line x1="0" y1="8" x2="78" y2="8" stroke={C.earth} strokeWidth="0.8" opacity="0.5"/>
    <polygon points="100,2 112,8 100,14 88,8" fill={C.gold} opacity="0.7"/>
    <line x1="122" y1="8" x2="200" y2="8" stroke={C.earth} strokeWidth="0.8" opacity="0.5"/>
  </svg>
);

// ─── Woven texture overlay ────────────────────────────────────────────────────
const WovenOverlay = () => (
  <div style={{
    position:"absolute", inset:0, pointerEvents:"none",
    backgroundImage:`repeating-linear-gradient(0deg,transparent,transparent 27px,rgba(139,58,30,0.04) 27px,rgba(139,58,30,0.04) 28px),repeating-linear-gradient(90deg,transparent,transparent 3px,rgba(201,130,26,0.02) 3px,rgba(201,130,26,0.02) 4px)`,
  }}/>
);

export default function HeritagePanel({ heritage, onClose }) {
  const [showVideo, setShowVideo] = useState(false);
  if (!heritage) return null;

  const cfg = TYPE_CONFIG[heritage.type] || TYPE_CONFIG.vat_the;
  const TypeIcon = cfg.Icon;

  const META_ROWS = [
    { Icon: Calendar,  label: "Niên đại",  val: heritage.year },
    { Icon: Building2, label: "Loại hình", val: heritage.category },
    { Icon: MapPin,    label: "Địa chỉ",   val: heritage.address },
  ];

  return (
    <div style={{
      position:"absolute", top:0, right:0, height:"100%", width:390,
      zIndex:1000, display:"flex", flexDirection:"column",
      background:`linear-gradient(160deg,${C.earthDeep} 0%,#2a1208 40%,#1a0e08 100%)`,
      borderLeft:`2px solid ${C.earth}55`,
      boxShadow:`-8px 0 40px rgba(0,0,0,0.55)`,
      fontFamily:"'Crimson Pro',Georgia,serif",
    }}>
      <WovenOverlay/>

      {/* ── Top tribal strip ── */}
      <TribalStrip height={5}/>

      {/* ── Close button ── */}
      <button onClick={onClose} style={{
        position:"absolute", top:12, right:12, zIndex:20,
        width:30, height:30, borderRadius:"50%",
        background:"rgba(139,58,30,0.25)", border:`1px solid ${C.earth}55`,
        color:C.goldPale, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
        transition:"all .18s ease",
      }}
        onMouseEnter={e=>{e.currentTarget.style.background=`rgba(139,58,30,0.55)`;e.currentTarget.style.borderColor=C.gold;}}
        onMouseLeave={e=>{e.currentTarget.style.background="rgba(139,58,30,0.25)";e.currentTarget.style.borderColor=`${C.earth}55`;}}
      >
        <X size={13}/>
      </button>

      {/* ── Image / Video hero ── */}
      <div style={{position:"relative",width:"100%",height:200,flexShrink:0,overflow:"hidden"}}>
        {showVideo && heritage.video ? (
          <iframe src={heritage.video} style={{width:"100%",height:"100%"}} allowFullScreen/>
        ) : (<>
          <img src={heritage.image} alt={heritage.name}
            style={{width:"100%",height:"100%",objectFit:"cover",opacity:.82}}
            onError={e=>{e.target.src=`https://placehold.co/390x200/3d1a08/c9821a?text=${encodeURIComponent(heritage.name)}`;}}
          />
          {/* Gradient overlays */}
          <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(26,14,8,0.88) 0%,transparent 55%)"}}/>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,rgba(26,14,8,0.35) 0%,transparent 35%)"}}/>
          {/* Tribal pattern overlay at bottom */}
          <div style={{position:"absolute",bottom:0,left:0,right:0,height:5,
            background:`repeating-linear-gradient(90deg,${C.earthDeep} 0,${C.earthDeep} 8px,${C.gold}80 8px,${C.gold}80 16px,${C.forest}80 16px,${C.forest}80 24px,${C.gold}80 24px,${C.gold}80 32px)`,
            opacity:.6,
          }}/>
          {heritage.video && (
            <button onClick={()=>setShowVideo(true)} style={{
              position:"absolute", bottom:14, right:12,
              background:"rgba(0,0,0,0.7)", border:`1px solid ${C.gold}55`,
              color:C.goldPale, fontSize:11, padding:"5px 12px", borderRadius:20,
              display:"flex", alignItems:"center", gap:6, cursor:"pointer",
              fontFamily:"'Crimson Pro',serif", transition:"all .18s",
            }}
              onMouseEnter={e=>{e.currentTarget.style.background=`rgba(139,58,30,0.7)`;}}
              onMouseLeave={e=>{e.currentTarget.style.background="rgba(0,0,0,0.7)";}}
            >
              <Play size={10} fill={C.goldPale}/> Xem video
            </button>
          )}
        </>)}
      </div>

      {/* ── Header ── */}
      <div style={{
        padding:"14px 18px 12px",flexShrink:0,
        background:`linear-gradient(135deg,rgba(139,58,30,0.25),rgba(92,31,8,0.15))`,
        borderBottom:`1px solid ${C.earth}44`,
        position:"relative",
      }}>
        {/* Type badge */}
        <span style={{
          display:"inline-flex", alignItems:"center", gap:5,
          fontSize:10, letterSpacing:".18em", textTransform:"uppercase",
          padding:"3px 10px", borderRadius:20,
          background:cfg.bg, border:`1px solid ${cfg.border}`, color:cfg.earthTone,
          marginBottom:8, fontFamily:"'Crimson Pro',serif",
        }}>
          <TypeIcon size={9}/>{cfg.label}
        </span>

        <h2 style={{
          fontSize:19, fontWeight:700, lineHeight:1.28,
          color:C.goldPale, fontFamily:"'Playfair Display',serif",
          marginBottom:5,
        }}>{heritage.name}</h2>

        <div style={{display:"flex",alignItems:"center",gap:5,color:`${C.gold}90`,fontSize:12}}>
          <MapPin size={11} style={{color:`${C.gold}70`,flexShrink:0}}/>
          <span>{heritage.location||heritage.address}</span>
        </div>

        <DiamondDivider/>
      </div>

      {/* ── Body ── */}
      <div style={{flex:1,overflowY:"auto",padding:"14px 18px 18px",display:"flex",flexDirection:"column",gap:10}}>

        {/* Meta rows */}
        {META_ROWS.map(({Icon,label,val})=>(
          <div key={label} style={{
            display:"flex", gap:10, padding:"10px 12px",
            background:"rgba(139,58,30,0.1)", border:`1px solid ${C.earth}28`,
            borderRadius:8, position:"relative", overflow:"hidden",
          }}>
            {/* Left accent */}
            <div style={{position:"absolute",left:0,top:0,bottom:0,width:3,background:`linear-gradient(180deg,${C.gold},${C.earth})`}}/>
            <Icon size={13} style={{color:C.gold,marginTop:2,flexShrink:0}}/>
            <div>
              <div style={{fontSize:9,letterSpacing:".2em",textTransform:"uppercase",color:`${C.goldPale}55`,marginBottom:3}}>{label}</div>
              <div style={{fontSize:13,color:C.goldPale}}>{val}</div>
            </div>
          </div>
        ))}

        {/* Description */}
        <div style={{
          padding:"12px 14px",
          background:"rgba(0,0,0,0.2)", border:`1px solid rgba(255,255,255,0.05)`,
          borderRadius:8,
        }}>
          <div style={{fontSize:9,letterSpacing:".2em",textTransform:"uppercase",color:`${C.goldPale}45`,marginBottom:6,display:"flex",alignItems:"center",gap:5}}>
            <Feather size={9} style={{color:C.gold}}/>Mô tả
          </div>
          <p style={{fontSize:13,color:`${C.goldPale}88`,lineHeight:1.75,fontStyle:"italic"}}>{heritage.desc}</p>
        </div>

        {/* Tags */}
        {heritage.tags?.length>0&&(
          <div style={{display:"flex",flexWrap:"wrap",gap:6,paddingTop:2}}>
            {heritage.tags.map(t=>(
              <span key={t} style={{
                fontSize:10, padding:"3px 10px", borderRadius:20,
                background:`rgba(139,58,30,0.18)`, border:`1px solid ${C.earth}38`,
                color:C.gold, display:"flex", alignItems:"center", gap:4,
                fontFamily:"'Crimson Pro',serif",
              }}>
                <Hash size={8}/>{t}
              </span>
            ))}
          </div>
        )}

        {/* Bottom ornament */}
        <div style={{display:"flex",justifyContent:"center",paddingTop:6,opacity:.45}}>
          <svg viewBox="0 0 120 20" style={{width:100,height:16}}>
            <line x1="0" y1="10" x2="46" y2="10" stroke={C.earth} strokeWidth=".8"/>
            <polygon points="60,2 68,10 60,18 52,10" fill={C.gold} opacity=".7"/>
            <line x1="74" y1="10" x2="120" y2="10" stroke={C.earth} strokeWidth=".8"/>
          </svg>
        </div>
      </div>

      {/* ── Bottom tribal strip ── */}
      <TribalStrip height={4}/>
    </div>
  );
}