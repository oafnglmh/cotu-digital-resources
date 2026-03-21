import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";

// ─── Palette ──────────────────────────────────────────────────────────────────
const C = {
  earth:     "#8B3A1E",
  earthDeep: "#5C1F08",
  gold:      "#C9821A",
  goldLight: "#E8A832",
  goldPale:  "#F5D080",
  forest:    "#2D5A27",
  black:     "#1A0E08",
  cream:     "#FDF6E8",
  paper:     "#F7EED8",
  sand:      "#F0E2C4",
  shadow:    "rgba(26,14,8,0.55)",
};

// ─── Tribal ornaments ─────────────────────────────────────────────────────────
const Corner = ({ flip, flipY }) => (
  <svg viewBox="0 0 36 36" style={{
    width: 28, height: 28,
    transform: `${flip ? "scaleX(-1)" : ""} ${flipY ? "scaleY(-1)" : ""}`,
  }}>
    <path d="M2 34L2 2L34 2" fill="none" stroke={C.earth} strokeWidth="1.4"/>
    <circle cx="2" cy="2" r="2.8" fill={C.gold}/>
    <path d="M2 18Q9 9 18 2" fill="none" stroke={C.forest} strokeWidth="0.7" opacity="0.55"/>
    <path d="M9 2L2 9M15 2L2 15" stroke={C.gold} strokeWidth="0.6" opacity="0.45"/>
    <polygon points="7,7 13,4 10,10" fill={C.earth} opacity="0.45"/>
  </svg>
);

const BorderStrip = ({ horizontal = true }) => (
  <div style={{
    flexShrink: 0,
    ...(horizontal
      ? { height: 4, width: "100%",
          background: `repeating-linear-gradient(90deg,${C.earth} 0,${C.earth} 8px,${C.gold} 8px,${C.gold} 16px,${C.forest} 16px,${C.forest} 24px,${C.gold} 24px,${C.gold} 32px)` }
      : { width: 4, height: "100%",
          background: `repeating-linear-gradient(0deg,${C.earth} 0,${C.earth} 8px,${C.gold} 8px,${C.gold} 16px,${C.forest} 16px,${C.forest} 24px,${C.gold} 24px,${C.gold} 32px)` }),
  }}/>
);

// ─── SVG illustrations ────────────────────────────────────────────────────────
const IllustNhaGuol = () => (
  <svg viewBox="0 0 260 148" style={{width:"100%",height:"100%"}}>
    <defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#080503"/><stop offset="100%" stopColor="#3d1a08"/></linearGradient></defs>
    <rect fill="url(#g1)" width="260" height="148"/>
    {[12,42,75,200,235,252].map((x,i)=><circle key={i} cx={x} cy={7+i*2.5} r={0.7+i%2*0.4} fill={C.goldPale} opacity={0.4+i%3*0.2}/>)}
    <polygon points="0,148 50,60 100,148" fill="#140803"/>
    <polygon points="55,148 130,44 205,148" fill="#2d1208"/>
    <polygon points="155,148 220,66 260,148" fill="#140803" opacity=".9"/>
    <rect x="93" y="80" width="74" height="52" fill={C.earthDeep}/>
    <polygon points="76,80 130,38 184,80" fill={C.earth}/>
    <polygon points="88,80 130,46 172,80" fill={C.gold} opacity=".55"/>
    <line x1="130" y1="38" x2="130" y2="25" stroke={C.gold} strokeWidth="1.8"/>
    <circle cx="130" cy="22" r="4.5" fill={C.gold}/>
    <rect x="116" y="102" width="28" height="30" fill="#080402"/>
    <path d="M93 80Q130 68 167 80" fill="none" stroke={C.gold} strokeWidth=".9"/>
    {[0,1,2,3].map(i=><rect key={i} x={97+i*17} y={83} width={11} height={13} fill="#080402" opacity=".7"/>)}
  </svg>
);

const IllustThoCam = () => (
  <svg viewBox="0 0 260 148" style={{width:"100%",height:"100%"}}>
    <rect fill={C.black} width="260" height="148"/>
    {Array.from({length:7},(_,r)=>Array.from({length:13},(_,c)=>(
      <rect key={`${r}-${c}`} x={c*20} y={r*20} width={10} height={10}
        fill={(r+c)%3===0?C.earth:(r+c)%3===1?C.gold:C.forest} opacity=".72"/>
    )))}
    <polygon points="130,18 153,41 130,64 107,41" fill={C.goldPale} opacity=".9"/>
    <polygon points="130,25 147,41 130,57 113,41" fill={C.earth}/>
    <polygon points="130,32 143,41 130,50 117,41" fill={C.gold}/>
    <circle cx="130" cy="41" r="4.5" fill={C.goldPale}/>
    <path d="M50 75Q60 60 74 64Q65 73 69 83Q55 81 50 75Z" fill={C.gold}/>
    <circle cx="75" cy="62" r="3.2" fill={C.goldPale}/>
    <path d="M45 70Q33 64 28 70Q38 75 45 80" fill={C.earth}/>
    <path d="M210 75Q200 60 186 64Q195 73 191 83Q205 81 210 75Z" fill={C.gold}/>
    <circle cx="185" cy="62" r="3.2" fill={C.goldPale}/>
    <path d="M215 70Q227 64 232 70Q222 75 215 80" fill={C.earth}/>
    {Array.from({length:8},(_,i)=>(
      <g key={i}>
        <rect x={i*33} y={108} width={16} height={40} fill={i%2===0?C.earth:C.gold} opacity=".82"/>
        <polygon points={`${i*33},108 ${i*33+16},93 ${i*33+33},108`} fill={i%2===0?C.forest:C.goldPale} opacity=".78"/>
      </g>
    ))}
  </svg>
);

const IllustMyson = () => (
  <svg viewBox="0 0 260 148" style={{width:"100%",height:"100%"}}>
    <defs><linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#081020"/><stop offset="60%" stopColor="#2d1208"/><stop offset="100%" stopColor={C.black}/></linearGradient></defs>
    <rect fill="url(#g2)" width="260" height="148"/>
    <circle cx="215" cy="26" r="18" fill={C.goldPale} opacity=".1"/>
    <circle cx="221" cy="22" r="13" fill="#081020"/>
    <rect x="20" y="58" width="35" height="90" fill="#2d1208"/>
    <polygon points="11,58 37,26 64,58" fill={C.earthDeep}/>
    <polygon points="20,58 37,34 55,58" fill={C.earth} opacity=".68"/>
    <rect x="30" y="40" width="14" height="18" fill="#060402" opacity=".68"/>
    <path d="M20 58Q37 47 55 58" fill="none" stroke={C.gold} strokeWidth="1.1"/>
    <rect x="103" y="41" width="55" height="107" fill="#2d1208"/>
    <polygon points="89,41 130,5 171,41" fill={C.earthDeep}/>
    <polygon points="103,41 130,12 157,41" fill={C.earth} opacity=".72"/>
    <rect x="118" y="21" width="26" height="20" fill="#060402" opacity=".62"/>
    <path d="M103 41Q130 27 157 41" fill="none" stroke={C.gold} strokeWidth="1.3"/>
    <rect x="205" y="68" width="29" height="80" fill="#140803"/>
    <polygon points="198,68 219,47 241,68" fill="#2d1208"/>
    <path d="M198 68Q219 55 241 68" fill="none" stroke={C.gold} strokeWidth=".75"/>
    {Array.from({length:10},(_,i)=>(
      <ellipse key={i} cx={i*26+8} cy={148} rx={8+i%3*4} ry={12+i%4*4} fill="#0e1e07" opacity={0.48+i%3*.18}/>
    ))}
  </svg>
);

const ILLUSTRATIONS = { nhaGuol:<IllustNhaGuol/>, thoCam:<IllustThoCam/>, mySon:<IllustMyson/> };

// ─── Page data ────────────────────────────────────────────────────────────────
const PAGES = [
  { id:0, type:"chapter-intro", chapterNum:"I",  chapterTitle:"Người Cơ Tu\n& Trường Sơn", body:"Người Cơ Tu sinh sống trên dãy Trường Sơn hùng vĩ từ hàng nghìn năm qua, trải dài từ Tây Giang, Đông Giang đến Nam Giang — Quảng Nam.", pageNum:1 },
  { id:1, type:"text-image",    heading:"Nhà Gươl\nTrái Tim Cộng Đồng", body:"Nhà Gươl là linh hồn làng Cơ Tu — mái nhọn vút cao, hoa văn chạm khắc tinh tế, nơi hội họp và truyền dạy văn hoá.", illustration:"nhaGuol", pageNum:2 },
  { id:2, type:"text-image",    heading:"Thổ Cẩm\nTâm Hồn Dệt Nên",    body:"Mỗi tấm thổ cẩm là bản trường ca dệt bằng tay — hoa văn hình học, chim phượng, núi rừng — ký ức trao truyền qua bàn tay người mẹ.", illustration:"thoCam", pageNum:3 },
  { id:3, type:"quote",         chapterNum:"II", chapterTitle:"Thổ Cẩm &\nBản Sắc", quote:"\"Mỗi sợi chỉ là một hơi thở, mỗi hoa văn là một ký ức được trao truyền qua bàn tay người mẹ Cơ Tu.\"", tag:"Di sản Phi vật thể Quốc gia", pageNum:4 },
  { id:4, type:"chapter-intro", chapterNum:"III",chapterTitle:"Thánh Địa Mỹ Sơn\nDi Sản UNESCO", body:"Quần thể đền tháp Chăm Pa hơn 1.000 năm tuổi, được UNESCO công nhận năm 1999, ẩn mình giữa thung lũng xanh Duy Xuyên.", pageNum:5 },
  { id:5, type:"text-image",    heading:"Tháp Chăm\ngiữa Núi Rừng",     body:"Từ thế kỷ 4 đến 14, người Chăm Pa dựng hơn 70 công trình kiến trúc tôn giáo tại Mỹ Sơn — trung tâm linh thiêng nhất vương quốc.", illustration:"mySon", pageNum:6 },
  { id:6, type:"text-only",     heading:"Phố Cổ Hội An\nThương Cảng Ngàn Năm", body:"Hội An — cảng thương mại quốc tế phồn thịnh thế kỷ 15–19. Nơi giao thoa Việt–Hoa–Nhật–Phương Tây, bảo tồn hơn 1.000 công trình. UNESCO 1999.", tag:"2 Di sản UNESCO · 370+ Di tích", pageNum:7 },
  { id:7, type:"closing",       heading:"Bảo Tồn &\nLan Toả Di Sản",    body:"Di sản không chỉ là công trình hay hiện vật — đó là hơi thở cộng đồng, ký ức sống động của dân tộc. Bảo tồn hôm nay là trao tặng tương lai căn tính trọn vẹn.", tag:"Số hoá · Bảo tồn · Lan toả", pageNum:8 },
];

// ─── Paper texture style ──────────────────────────────────────────────────────
const paperStyle = {
  background: `linear-gradient(135deg, ${C.cream} 0%, ${C.paper} 45%, ${C.sand} 100%)`,
};

// ─── Page content renderer ────────────────────────────────────────────────────
function PageBody({ page }) {
  if (!page) return <div style={paperStyle} className="w-full h-full"/>;
  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden" style={paperStyle}>
      {/* Woven texture */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage:`repeating-linear-gradient(0deg,transparent,transparent 27px,rgba(139,58,30,.05) 27px,rgba(139,58,30,.05) 28px),repeating-linear-gradient(90deg,transparent,transparent 3px,rgba(201,130,26,.025) 3px,rgba(201,130,26,.025) 4px)`
      }}/>
      <BorderStrip/>
      {/* Corners */}
      <div className="absolute top-1.5 left-1.5 z-10"><Corner/></div>
      <div className="absolute top-1.5 right-1.5 z-10"><Corner flip/></div>
      <div className="absolute bottom-1.5 left-1.5 z-10"><Corner flipY/></div>
      <div className="absolute bottom-1.5 right-1.5 z-10"><Corner flip flipY/></div>

      <div className="relative z-10 flex-1 flex flex-col px-7 py-5 gap-2.5 overflow-hidden">
        <div className="text-center text-xs tracking-widest italic" style={{color:C.earth,fontFamily:"'Crimson Pro',serif"}}>— {page.pageNum} —</div>

        {page.type==="chapter-intro"&&<>
          <div className="flex flex-col items-center gap-1.5 mt-1">
            <div className="text-xs tracking-[.22em] uppercase" style={{color:C.gold,fontFamily:"'Crimson Pro',serif"}}>Chương {page.chapterNum}</div>
            <div className="w-14 h-px" style={{background:`linear-gradient(90deg,transparent,${C.gold},transparent)`}}/>
            <h2 className="text-center font-bold leading-tight whitespace-pre-line text-xl" style={{color:C.earthDeep,fontFamily:"'Playfair Display',serif"}}>{page.chapterTitle}</h2>
            <div className="w-20 h-px" style={{background:`linear-gradient(90deg,transparent,${C.earth},${C.gold},${C.earth},transparent)`}}/>
          </div>
          <p className="text-sm leading-relaxed text-center italic mt-1" style={{color:"#5a2810",fontFamily:"'Crimson Pro',serif"}}>{page.body}</p>
          <div className="flex justify-center mt-auto">
            <svg viewBox="0 0 80 50" style={{width:72,height:44}}>
              <polygon points="40,5 70,25 40,45 10,25" fill="none" stroke={C.earth} strokeWidth=".9"/>
              <polygon points="40,12 62,25 40,38 18,25" fill="none" stroke={C.gold} strokeWidth=".7"/>
              <circle cx="40" cy="25" r="4.5" fill={C.gold} opacity=".55"/>
            </svg>
          </div>
        </>}

        {page.type==="text-image"&&<>
          <h2 className="font-bold leading-tight whitespace-pre-line text-lg text-center" style={{color:C.earthDeep,fontFamily:"'Playfair Display',serif"}}>{page.heading}</h2>
          <div className="w-full h-px" style={{background:`linear-gradient(90deg,transparent,${C.gold},${C.earth},${C.gold},transparent)`}}/>
          {page.illustration&&(
            <div className="w-full rounded overflow-hidden flex-shrink-0" style={{height:118,border:`1px solid ${C.earth}40`}}>
              {ILLUSTRATIONS[page.illustration]}
            </div>
          )}
          <p className="text-sm leading-relaxed italic" style={{color:"#5a2810",fontFamily:"'Crimson Pro',serif"}}>{page.body}</p>
        </>}

        {page.type==="quote"&&<>
          <div className="flex flex-col items-center gap-1.5">
            <div className="text-xs tracking-[.22em] uppercase" style={{color:C.gold,fontFamily:"'Crimson Pro',serif"}}>Chương {page.chapterNum}</div>
            <h2 className="text-center font-bold leading-tight whitespace-pre-line text-lg" style={{color:C.earthDeep,fontFamily:"'Playfair Display',serif"}}>{page.chapterTitle}</h2>
            <div className="w-16 h-px" style={{background:`linear-gradient(90deg,transparent,${C.gold},transparent)`}}/>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center gap-3 px-1">
            <div style={{fontSize:36,color:C.gold,fontFamily:"Georgia,serif",lineHeight:.7}}>"</div>
            <p className="text-center text-sm leading-relaxed italic" style={{color:C.earthDeep,fontFamily:"'Crimson Pro',serif"}}>{page.quote}</p>
            <div className="self-end" style={{fontSize:36,color:C.gold,fontFamily:"Georgia,serif",lineHeight:.7}}>"</div>
          </div>
          {page.tag&&<div className="flex justify-center"><span className="text-xs px-3 py-1 rounded-full" style={{background:`${C.earth}18`,border:`1px solid ${C.earth}33`,color:C.earth,fontFamily:"'Crimson Pro',serif"}}>✦ {page.tag}</span></div>}
        </>}

        {page.type==="text-only"&&<>
          <h2 className="font-bold leading-tight whitespace-pre-line text-lg" style={{color:C.earthDeep,fontFamily:"'Playfair Display',serif"}}>{page.heading}</h2>
          <div className="w-full h-px" style={{background:`linear-gradient(90deg,${C.gold},${C.earth},transparent)`}}/>
          <p className="text-sm leading-relaxed italic flex-1" style={{color:"#5a2810",fontFamily:"'Crimson Pro',serif"}}>{page.body}</p>
          {page.tag&&<span className="text-xs px-3 py-1 rounded-full self-start" style={{background:`${C.earth}14`,border:`1px solid ${C.earth}2e`,color:C.earth,fontFamily:"'Crimson Pro',serif"}}>✦ {page.tag}</span>}
        </>}

        {page.type==="closing"&&<>
          <div className="flex justify-center">
            <svg viewBox="0 0 60 28" style={{width:56,height:24}}>
              {[0,1,2].map(i=><polygon key={i} points={`${30-i*7},4 30,${23-i*2} ${30+i*7},4`} fill={i===0?C.gold:i===1?C.earth:C.forest} opacity={.68-i*.08}/>)}
            </svg>
          </div>
          <h2 className="font-bold leading-tight whitespace-pre-line text-lg text-center" style={{color:C.earthDeep,fontFamily:"'Playfair Display',serif"}}>{page.heading}</h2>
          <div className="w-full h-px" style={{background:`linear-gradient(90deg,transparent,${C.earth},${C.gold},${C.earth},transparent)`}}/>
          <p className="text-sm leading-relaxed italic text-center flex-1" style={{color:"#5a2810",fontFamily:"'Crimson Pro',serif"}}>{page.body}</p>
          {page.tag&&<div className="flex justify-center"><span className="text-xs px-3 py-1 rounded-full" style={{background:`${C.earth}18`,border:`1px solid ${C.earth}33`,color:C.earth,fontFamily:"'Crimson Pro',serif"}}>✦ {page.tag}</span></div>}
          <div className="flex justify-center">
            <svg viewBox="0 0 100 18" style={{width:88,height:16}}>
              <line x1="0" y1="9" x2="33" y2="9" stroke={C.earth} strokeWidth=".7"/>
              <polygon points="50,1 57,9 50,17 43,9" fill={C.gold} opacity=".78"/>
              <line x1="67" y1="9" x2="100" y2="9" stroke={C.earth} strokeWidth=".7"/>
            </svg>
          </div>
        </>}
      </div>
      <BorderStrip/>
    </div>
  );
}

// ─── Book cover ───────────────────────────────────────────────────────────────
function CoverFace({ back = false }) {
  if (back) return (
    <div className="w-full h-full" style={{
      background:`linear-gradient(135deg,${C.earthDeep},${C.black})`,
      transform:"rotateY(180deg)", backfaceVisibility:"hidden", position:"absolute", inset:0,
    }}>
      <div style={{position:"absolute",inset:0,backgroundImage:`repeating-linear-gradient(45deg,transparent,transparent 4px,rgba(201,130,26,.04) 4px,rgba(201,130,26,.04) 5px)`}}/>
    </div>
  );
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-8 overflow-hidden" style={{
      background:`linear-gradient(135deg,${C.earthDeep} 0%,${C.earth} 52%,${C.earthDeep} 100%)`,
      backfaceVisibility:"hidden", position:"absolute", inset:0,
    }}>
      <div style={{position:"absolute",inset:0,backgroundImage:`repeating-linear-gradient(45deg,transparent,transparent 4px,rgba(201,130,26,.06) 4px,rgba(201,130,26,.06) 5px)`,pointerEvents:"none"}}/>
      <BorderStrip/>
      <div className="relative z-10 flex flex-col items-center gap-3">
        <svg viewBox="0 0 110 74" style={{width:104,height:70}}>
          <polygon points="55,4 102,37 55,70 8,37" fill="none" stroke={C.gold} strokeWidth="1.4"/>
          <polygon points="55,12 88,37 55,62 22,37" fill="none" stroke={C.goldPale} strokeWidth=".72" opacity=".55"/>
          <circle cx="55" cy="37" r="9" fill={C.gold} opacity=".28"/>
          <circle cx="55" cy="37" r="4.5" fill={C.goldPale} opacity=".82"/>
          {[[55,4],[102,37],[55,70],[8,37]].map(([px,py],i)=><circle key={i} cx={px} cy={py} r="2.8" fill={C.gold} opacity=".88"/>)}
          <path d="M26 18Q32 12 39 15Q33 20 35 26Q25 24 26 18Z" fill={C.gold} opacity=".55"/>
          <path d="M84 18Q78 12 71 15Q77 20 75 26Q85 24 84 18Z" fill={C.gold} opacity=".55"/>
        </svg>
        <div className="text-xs tracking-[.28em] uppercase" style={{color:C.goldLight,fontFamily:"'Crimson Pro',serif"}}>Di Sản Văn Hoá</div>
        <div className="h-px w-18" style={{width:72,background:`linear-gradient(90deg,transparent,${C.gold},transparent)`}}/>
        <h1 className="text-3xl font-bold text-center leading-tight" style={{color:C.goldPale,fontFamily:"'Playfair Display',serif",textShadow:`0 2px 10px rgba(0,0,0,.5)`}}>Quảng Nam</h1>
        <h2 className="text-lg text-center italic font-normal" style={{color:C.gold,fontFamily:"'Playfair Display',serif"}}>Đất Di Sản</h2>
        <div className="h-px w-28" style={{background:`linear-gradient(90deg,transparent,${C.earth},${C.gold},${C.earth},transparent)`}}/>
        <p className="text-xs text-center tracking-widest uppercase" style={{color:`${C.goldPale}90`,fontFamily:"'Crimson Pro',serif"}}>Nhấp để mở sách</p>
        <div className="flex gap-2">
          {Array.from({length:7},(_,i)=>(
            <div key={i} style={{width:9,height:9,background:i%3===0?C.earth:i%3===1?C.gold:C.forest,opacity:.8,transform:"rotate(45deg)"}}/>
          ))}
        </div>
      </div>
      <div style={{position:"absolute",bottom:0,left:0,right:0}}><BorderStrip/></div>
      <div style={{position:"absolute",left:0,top:0,width:12,height:"100%",background:"linear-gradient(90deg,rgba(0,0,0,.38),transparent)"}}/>
    </div>
  );
}

// ─── 3D Leaf (the actual flipping page unit) ──────────────────────────────────
function Leaf({ front, back, angle, origin = "left", zIndex = 1, isActive }) {
  // Dynamic shadow: darkest at 90° (edge-on), lightest at 0°/180°
  const absAngle = Math.abs(((angle % 360) + 360) % 360);
  const normalised = absAngle > 180 ? 360 - absAngle : absAngle; // 0–180
  const shadowOpacity = Math.sin((normalised / 180) * Math.PI) * 0.55;

  // Highlight: simulate specular reflection — bright near 0° and 180°
  const highlightOpacity = (1 - Math.sin((normalised / 180) * Math.PI)) * 0.18;

  // Curl: slight skewY at midpoint makes the page look curved
  const curlSkew = Math.sin((normalised / 180) * Math.PI) * 4; // max 4deg

  return (
    <div style={{
      position:"absolute", inset:0,
      transformStyle:"preserve-3d",
      transformOrigin: origin === "left" ? "left center" : "right center",
      transform: `rotateY(${angle}deg) skewY(${origin==="left" ? -curlSkew : curlSkew}deg)`,
      zIndex,
      willChange:"transform",
      transition: isActive ? "transform 0.72s cubic-bezier(0.45,0,0.18,1)" : "none",
    }}>
      {/* ── Front face ── */}
      <div style={{position:"absolute",inset:0,backfaceVisibility:"hidden"}}>
        {front}
        {/* Shadow overlay */}
        <div style={{
          position:"absolute",inset:0,pointerEvents:"none",
          background: origin==="left"
            ? `linear-gradient(90deg, rgba(0,0,0,${shadowOpacity}) 0%, transparent 60%)`
            : `linear-gradient(270deg, rgba(0,0,0,${shadowOpacity}) 0%, transparent 60%)`,
        }}/>
        {/* Highlight overlay */}
        <div style={{
          position:"absolute",inset:0,pointerEvents:"none",
          background:`linear-gradient(135deg, rgba(255,245,220,${highlightOpacity}) 0%, transparent 50%)`,
        }}/>
      </div>

      {/* ── Back face (mirror) ── */}
      <div style={{
        position:"absolute",inset:0,
        backfaceVisibility:"hidden",
        transform:"rotateY(180deg)",
      }}>
        {back}
        {/* Shadow on back */}
        <div style={{
          position:"absolute",inset:0,pointerEvents:"none",
          background: origin==="right"
            ? `linear-gradient(90deg, rgba(0,0,0,${shadowOpacity}) 0%, transparent 60%)`
            : `linear-gradient(270deg, rgba(0,0,0,${shadowOpacity}) 0%, transparent 60%)`,
        }}/>
      </div>
    </div>
  );
}

// ─── Cast shadow on the opposite page ─────────────────────────────────────────
function PageShadow({ angle, side }) {
  // How far through the flip we are (0=start, 1=end)
  const abs = Math.abs(angle);
  const progress = abs / 180;
  const opacity = Math.sin(progress * Math.PI) * 0.35;
  const width = Math.sin(progress * Math.PI) * 72; // px spread

  if (opacity < 0.01) return null;
  return (
    <div style={{
      position:"absolute", top:0, bottom:0, zIndex:30, pointerEvents:"none",
      ...(side==="right"
        ? { left:0, width, background:`linear-gradient(90deg,rgba(0,0,0,${opacity}),transparent)` }
        : { right:0, width, background:`linear-gradient(270deg,rgba(0,0,0,${opacity}),transparent)` }),
    }}/>
  );
}

// ─── Stacked page-thickness effect ───────────────────────────────────────────
function PageStack({ side, count = 5 }) {
  return (
    <>
      {Array.from({length:count},(_,i)=>(
        <div key={i} style={{
          position:"absolute",
          top: 1+i*0.7, bottom: 1+i*0.7,
          ...(side==="left" ? {left:-2-i*1.2,right:"50%+14px"} : {right:-2-i*1.2,left:"calc(50% + 14px)"}),
          background:`linear-gradient(180deg,${C.cream},${C.paper},${C.sand})`,
          borderRadius: side==="left" ? "2px 0 0 2px" : "0 2px 2px 0",
          boxShadow: side==="left"
            ? `-1px 0 3px rgba(0,0,0,${0.06+i*.03})`
            : `1px 0 3px rgba(0,0,0,${0.06+i*.03})`,
        }}/>
      ))}
    </>
  );
}

// ─── Main Book ─────────────────────────────────────────────────────────────────
export default function Book() {
  const totalSpreads = Math.ceil(PAGES.length / 2);
  const [spread, setSpread]     = useState(0);
  const [isOpen, setIsOpen]     = useState(false);
  const [flipping, setFlipping] = useState(false);
  const [flipDir,  setFlipDir]  = useState(null);
  const [leafAngle,setLeafAngle]= useState(0); // current animated angle

  const isMobile = typeof window!=="undefined" && window.innerWidth < 720;

  const leftPage  = PAGES[spread*2]   ?? null;
  const rightPage = PAGES[spread*2+1] ?? null;
  const nextLeft  = PAGES[(spread+1)*2]   ?? null;
  const nextRight = PAGES[(spread+1)*2+1] ?? null;
  const prevLeft  = spread>0 ? PAGES[(spread-1)*2]   : null;
  const prevRight = spread>0 ? PAGES[(spread-1)*2+1] : null;

  // ── Sound ──────────────────────────────────────────────────────────────────
  const playPageSound = useCallback(() => {
    try {
      const ac = new (window.AudioContext||window.webkitAudioContext)();
      const buf = ac.createBuffer(1, ac.sampleRate*0.38, ac.sampleRate);
      const d = buf.getChannelData(0);
      for (let i=0;i<d.length;i++){
        const t=i/ac.sampleRate;
        d[i]=(Math.random()*2-1)*Math.exp(-t*13)*0.3+Math.sin(t*650*Math.PI*2)*Math.exp(-t*22)*0.07;
      }
      const s=ac.createBufferSource(), g=ac.createGain();
      g.gain.value=0.38; s.buffer=buf; s.connect(g); g.connect(ac.destination); s.start();
    } catch(_){}
  },[]);

  // ── Flip engine ────────────────────────────────────────────────────────────
  const triggerFlip = useCallback((dir) => {
    if (flipping) return;
    const next = spread + (dir==="forward" ? 1 : -1);
    if (next<0||next>=totalSpreads) return;

    playPageSound();
    setFlipping(true);
    setFlipDir(dir);

    // Animate angle: forward 0→-180, backward 0→+180
    setLeafAngle(0);
    const target = dir==="forward" ? -180 : 180;

    // Drive angle via rAF for smooth intermediate values
    const start = performance.now();
    const duration = 720;
    const easeInOut = t => t<.5 ? 2*t*t : -1+(4-2*t)*t;

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed/duration, 1);
      const eased = easeInOut(progress);
      setLeafAngle(target * eased);
      if (progress<1) {
        requestAnimationFrame(tick);
      } else {
        setLeafAngle(target);
        setTimeout(()=>{
          setSpread(next);
          setFlipping(false);
          setFlipDir(null);
          setLeafAngle(0);
        }, 16);
      }
    };
    requestAnimationFrame(tick);
  }, [flipping, spread, totalSpreads, playPageSound]);

  // ── Cover open ────────────────────────────────────────────────────────────
  const [coverAngle, setCoverAngle] = useState(0);
  const coverFlipping = useRef(false);

  const handleOpen = useCallback(()=>{
    if (coverFlipping.current) return;
    coverFlipping.current = true;
    playPageSound();
    const start = performance.now();
    const dur = 860;
    const ease = t => t<.5 ? 2*t*t : -1+(4-2*t)*t;
    const tick = (now)=>{
      const p = Math.min((now-start)/dur,1);
      setCoverAngle(-170*ease(p));
      if(p<1) requestAnimationFrame(tick);
      else { setCoverAngle(-170); setIsOpen(true); coverFlipping.current=false; }
    };
    requestAnimationFrame(tick);
  },[playPageSound]);

  const handleClose = useCallback(()=>{
    if (spread!==0||flipping||coverFlipping.current) return;
    coverFlipping.current = true;
    playPageSound();
    setIsOpen(false);
    const start = performance.now();
    const dur = 780;
    const ease = t => t<.5 ? 2*t*t : -1+(4-2*t)*t;
    const tick = (now)=>{
      const p = Math.min((now-start)/dur,1);
      setCoverAngle(-170*(1-ease(p)));
      if(p<1) requestAnimationFrame(tick);
      else { setCoverAngle(0); coverFlipping.current=false; }
    };
    requestAnimationFrame(tick);
  },[spread,flipping,playPageSound]);

  // ── Sizes ─────────────────────────────────────────────────────────────────
  const W  = isMobile ? "min(98vw,420px)" : "min(90vw,820px)";
  const H  = isMobile ? "min(72vh,570px)" : "min(82vh,545px)";
  const halfW = isMobile ? "100%" : "50%";

  // Forward flip: right page lifts and turns left
  // Backward flip: left page (showing previous right) lifts and turns right
  const leafOrigin = flipDir==="forward" ? "left" : "right";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5 py-8"
      style={{background:`radial-gradient(ellipse at center,#2a1408 0%,${C.black} 68%)`}}>

      {/* Title */}
      <motion.div initial={{opacity:0,y:-18}} animate={{opacity:1,y:0}} transition={{duration:.7}} className="text-center">
        <div className="text-xs tracking-[.28em] uppercase mb-0.5" style={{color:C.gold,fontFamily:"'Crimson Pro',serif"}}>Bảo tàng Di sản</div>
        <h1 className="text-2xl font-bold" style={{color:C.goldPale,fontFamily:"'Playfair Display',serif",textShadow:`0 2px 14px rgba(201,130,26,.38)`}}>
          Di Sản Văn Hoá Quảng Nam
        </h1>
      </motion.div>

      {/* ── Book stage ── */}
      <motion.div
        initial={{opacity:0,scale:.84,y:28}}
        animate={{opacity:1,scale:1,y:0}}
        transition={{duration:.8,delay:.18,ease:[.22,1,.36,1]}}
        style={{width:W, height:H, perspective:"2400px", position:"relative"}}
      >
        {/* Drop shadow */}
        <div style={{
          position:"absolute", bottom:-8, left:"8%", right:"8%", height:24,
          background:"rgba(0,0,0,0.65)", borderRadius:"50%", filter:"blur(14px)",
        }}/>

        {/* ── Book body ── */}
        <div style={{
          position:"relative", width:"100%", height:"100%",
          transformStyle:"preserve-3d",
          boxShadow:`0 22px 65px rgba(0,0,0,.72), 0 4px 18px rgba(0,0,0,.48)`,
          borderRadius:6, overflow:"hidden",
        }}>

          {/* Page thickness stacks */}
          {!isMobile&&<>
            <PageStack side="left"  count={6}/>
            <PageStack side="right" count={6}/>
          </>}

          {/* ── SPINE ── */}
          <div style={{
            position:"absolute", zIndex:40,
            top:0, bottom:0,
            left:isMobile?"0":"calc(50% - 13px)",
            width:isMobile?7:26,
            background:`linear-gradient(180deg,${C.earthDeep},${C.earth} 30%,${C.gold} 50%,${C.earth} 70%,${C.earthDeep})`,
            boxShadow:"inset 0 0 7px rgba(0,0,0,.42), 0 0 10px rgba(0,0,0,.28)",
          }}/>

          {/* ── LEFT PAGE (static) ── */}
          {!isMobile&&(
            <div
              style={{position:"absolute",top:0,bottom:0,left:0,right:"50%",overflow:"hidden",cursor:spread===0?"pointer":"default"}}
              onClick={()=>spread===0?handleClose():undefined}
              title={spread===0?"Đóng sách":""}
            >
              <PageBody page={leftPage}/>
              {/* Cast shadow from flipping right leaf */}
              {flipping&&flipDir==="forward"&&<PageShadow angle={leafAngle} side="right"/>}
              {/* Hover corner hint when on first spread */}
              {spread===0&&(
                <div className="absolute top-3 left-3 opacity-0 hover:opacity-50 transition-opacity duration-200 pointer-events-none">
                  <svg viewBox="0 0 22 22" style={{width:20,height:20}}>
                    <polygon points="0,0 18,0 0,18" fill={C.earth} opacity=".7"/>
                  </svg>
                </div>
              )}
            </div>
          )}

          {/* ── RIGHT PAGE (static) ── */}
          <div style={{
            position:"absolute", top:0, bottom:0, right:0,
            left:isMobile?"0":"50%",
            overflow:"hidden",
          }}>
            <PageBody page={isMobile?leftPage:rightPage}/>
            {/* Cast shadow from flipping left leaf */}
            {flipping&&flipDir==="backward"&&<PageShadow angle={-leafAngle} side="left"/>}
          </div>

          {/* ── FLIPPING LEAF ── */}
          {flipping&&(()=>{
            // Forward: leaf starts over right page, origin=left, front=rightPage, back=nextLeft
            // Backward: leaf starts over left page (showing prevRight), origin=right, front=prevRight, back=leftPage
            const front = flipDir==="forward"
              ? <PageBody page={isMobile?leftPage:rightPage}/>
              : <PageBody page={prevRight??prevLeft}/>;
            const back  = flipDir==="forward"
              ? <PageBody page={nextLeft}/>
              : <PageBody page={leftPage}/>;

            return (
              <div style={{
                position:"absolute", top:0, bottom:0, zIndex:35,
                ...(flipDir==="forward"
                  ? {left:isMobile?"0":"50%", right:0}
                  : {left:0, right:isMobile?"0":"50%"}),
              }}>
                <Leaf
                  front={front} back={back}
                  angle={leafAngle}
                  origin={leafOrigin}
                  zIndex={35}
                  isActive={false}
                />
              </div>
            );
          })()}

          {/* ── BOOK COVER ── */}
          <div style={{
            position:"absolute", inset:0, zIndex:50,
            transformStyle:"preserve-3d",
            transformOrigin:"left center",
            transform:`rotateY(${coverAngle}deg)`,
            pointerEvents: isOpen?"none":"auto",
            cursor: isOpen?"default":"pointer",
          }} onClick={!isOpen?handleOpen:undefined}>
            <CoverFace/>
            <CoverFace back/>
            {/* Cover shadow */}
            <div style={{
              position:"absolute", inset:0, pointerEvents:"none",
              background:`linear-gradient(90deg,rgba(0,0,0,${Math.sin((-coverAngle/180)*Math.PI)*0.4}) 0%,transparent 55%)`,
            }}/>
          </div>

        </div>{/* book body */}
      </motion.div>{/* stage */}

      {/* ── Controls ── */}
      <motion.div initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:.45}} className="flex items-center gap-5">
        {[
          {
            label:"◀ Trang trước",
            disabled: spread===0||flipping||!isOpen,
            onClick:()=>triggerFlip("backward"),
          },
          null,
          {
            label: isOpen ? "Trang sau ▶" : "Mở sách ▶",
            disabled: isOpen&&(spread===totalSpreads-1||flipping),
            onClick:()=>isOpen?triggerFlip("forward"):handleOpen(),
          },
        ].map((btn,i)=> btn===null ? (
          <div key={i} className="text-sm tracking-widest" style={{color:C.gold,fontFamily:"'Playfair Display',serif",minWidth:76,textAlign:"center"}}>
            {isOpen ? `${spread+1} / ${totalSpreads}` : "Bìa sách"}
          </div>
        ) : (
          <button key={i}
            onClick={btn.onClick}
            disabled={btn.disabled}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{background:"rgba(139,58,30,.18)",border:`1.5px solid rgba(201,130,26,.4)`,color:C.goldPale,fontFamily:"'Crimson Pro',serif",letterSpacing:".04em"}}
            onMouseEnter={e=>{if(!e.currentTarget.disabled){e.currentTarget.style.background="rgba(139,58,30,.36)";e.currentTarget.style.transform="translateY(-1px)";}}}
            onMouseLeave={e=>{e.currentTarget.style.background="rgba(139,58,30,.18)";e.currentTarget.style.transform="";}}
          >{btn.label}</button>
        ))}
      </motion.div>

      {isOpen&&(
        <motion.p initial={{opacity:0}} animate={{opacity:.42}} className="text-xs tracking-widest text-center" style={{color:C.gold,fontFamily:"'Crimson Pro',serif"}}>
          Dùng nút hoặc nhấp trang trái (spread 1) để đóng sách
        </motion.p>
      )}
    </div>
  );
}