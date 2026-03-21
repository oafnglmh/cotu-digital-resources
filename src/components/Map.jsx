/**
 * Map.jsx — Bản đồ di sản · Phong cách Cơ Tu
 * Màu: đất đỏ #8B3A1E, vàng nghệ #C9821A, xanh rừng #2D5A27, nền tối
 */
import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import L from "leaflet";
import {
  Layers, Landmark, Star, Music, Map as MapIcon,
  Eye, EyeOff, Satellite, Navigation, ChevronDown,
  CheckCircle2, Circle, MapPin,
} from "lucide-react";
import { DISTRICTS } from "../data/districts";
import { HERITAGES } from "../data/heritages";
import HeritagePanel from "./HeritagePanel";

// ─── Cơ Tu palette ────────────────────────────────────────────────────────────
const C = {
  earth:     "#8B3A1E",
  earthDeep: "#5C1F08",
  gold:      "#C9821A",
  goldLight: "#E8A832",
  goldPale:  "#F5D080",
  forest:    "#2D5A27",
  black:     "#1A0E08",
};

// ─── Fix Leaflet icons ────────────────────────────────────────────────────────
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:       "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// ─── Tribal ornaments ─────────────────────────────────────────────────────────
const TribalStrip = ({ horizontal = true, size = 4 }) => (
  <div style={{
    flexShrink:0,
    ...(horizontal
      ? { height:size, width:"100%",
          background:`repeating-linear-gradient(90deg,${C.earth} 0,${C.earth} 8px,${C.gold} 8px,${C.gold} 16px,${C.forest} 16px,${C.forest} 24px,${C.gold} 24px,${C.gold} 32px)` }
      : { width:size, height:"100%",
          background:`repeating-linear-gradient(0deg,${C.earth} 0,${C.earth} 8px,${C.gold} 8px,${C.gold} 16px,${C.forest} 16px,${C.forest} 24px,${C.gold} 24px,${C.gold} 32px)` }),
  }}/>
);

const WovenBg = () => (
  <div style={{
    position:"absolute",inset:0,pointerEvents:"none",zIndex:0,
    backgroundImage:`repeating-linear-gradient(0deg,transparent,transparent 27px,rgba(139,58,30,0.05) 27px,rgba(139,58,30,0.05) 28px),repeating-linear-gradient(90deg,transparent,transparent 3px,rgba(201,130,26,0.025) 3px,rgba(201,130,26,0.025) 4px)`,
  }}/>
);

// ─── Tile layers ──────────────────────────────────────────────────────────────
const TILE_LAYERS = [
  { id:"google_map",   label:"Bản đồ Google",   sublabel:"Đường phố & nhãn",       Icon:MapIcon,   url:"https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", attribution:"© Google Maps" },
  { id:"satellite",    label:"Ảnh vệ tinh",      sublabel:"Google Satellite",        Icon:Satellite, url:"https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", attribution:"© Google" },
  { id:"no_label",     label:"Không nhãn",       sublabel:"CartoDB Dark",            Icon:EyeOff,    url:"https://cartodb-basemaps-a.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png", attribution:"© CartoDB" },
  { id:"admin_color",  label:"Hành chính màu",   sublabel:"CartoDB Light + GeoJSON", Icon:Layers,    url:"https://cartodb-basemaps-a.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png", attribution:"© CartoDB" },
];

// ─── Choropleth ───────────────────────────────────────────────────────────────
const DISTRICT_PALETTE = ["#e07b4a","#4a9ea8","#7b6fc4","#5a9e6f","#c4895a","#4a7bc4","#a84a7b","#6faa5a","#c4a84a","#4ac4b0","#a84a4a","#7bc44a","#4a6ec4","#c46f4a","#4ac48a","#c44a8a","#8a4ac4","#c4c44a"];

function getHeatColor(n) {
  if(n===0) return "#e8e0d5";
  if(n===1) return "#f5c97a";
  if(n<=3)  return "#e8923a";
  return "#c9470f";
}

// ─── Marker icons (tribal-styled teardrop) ────────────────────────────────────
const TYPE_COLOR = { unesco:C.goldLight, vat_the:C.earth, phi_vat_the:C.forest };
const TYPE_SVG = {
  unesco:      `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  vat_the:     `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="22" y2="22"/><rect width="8" height="10" x="2" y="12"/><rect width="12" height="20" x="6" y="2"/><rect width="8" height="10" x="14" y="12"/></svg>`,
  phi_vat_the: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
};

function makeMarkerIcon(type) {
  const color = TYPE_COLOR[type] || C.gold;
  const svg   = TYPE_SVG[type]   || TYPE_SVG.vat_the;
  // Teardrop with tribal diamond pattern inside
  return L.divIcon({
    className:"",
    html:`<div style="width:38px;height:38px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:${color};border:2px solid ${color}cc;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 14px rgba(0,0,0,0.55),0 0 0 2px rgba(245,208,128,0.25);cursor:pointer;position:relative;overflow:hidden;">
      <div style="position:absolute;inset:0;background-image:repeating-linear-gradient(45deg,transparent,transparent 3px,rgba(255,255,255,0.06) 3px,rgba(255,255,255,0.06) 4px);"></div>
      <span style="transform:rotate(45deg);display:flex;position:relative;z-index:1;">${svg}</span>
    </div>`,
    iconSize:[38,38], iconAnchor:[19,38], popupAnchor:[0,-42],
  });
}

// ─── Dynamic tile layer ───────────────────────────────────────────────────────
function DynamicTileLayer({ tileId }) {
  const t = TILE_LAYERS.find(t=>t.id===tileId)||TILE_LAYERS[0];
  return <TileLayer key={t.id} url={t.url} attribution={t.attribution}/>;
}

// ─── Tile Switcher ────────────────────────────────────────────────────────────
function TileSwitcher({ activeTile, onSelect }) {
  const [open,setOpen] = useState(false);
  const ref = useRef(null);
  const tile = TILE_LAYERS.find(t=>t.id===activeTile);
  const ActiveIcon = tile?.Icon||Layers;

  useEffect(()=>{
    const fn=(e)=>{if(ref.current&&!ref.current.contains(e.target))setOpen(false);};
    document.addEventListener("mousedown",fn);
    return()=>document.removeEventListener("mousedown",fn);
  },[]);

  return (
    <div ref={ref} style={{position:"absolute",bottom:22,right:22,zIndex:800,pointerEvents:"all"}}>
      {open&&(
        <div style={{
          marginBottom:8,
          background:"rgba(26,14,8,0.97)",
          border:`1px solid ${C.earth}55`,
          borderRadius:14, overflow:"hidden", width:240,
          boxShadow:`0 8px 32px rgba(0,0,0,0.6)`,
          fontFamily:"'Crimson Pro',Georgia,serif",
        }}>
          {/* Header */}
          <div style={{padding:"8px 14px",borderBottom:`1px solid ${C.earth}30`,display:"flex",alignItems:"center",gap:7}}>
            <TribalStrip horizontal={false} size={3}/>
            <span style={{fontSize:9,letterSpacing:".2em",textTransform:"uppercase",color:`${C.goldPale}55`}}>Nền bản đồ</span>
          </div>
          {TILE_LAYERS.map(t=>{
            const Icon=t.Icon; const active=activeTile===t.id;
            return (
              <button key={t.id} onClick={()=>{onSelect(t.id);setOpen(false);}} style={{
                width:"100%",display:"flex",alignItems:"center",gap:10,
                padding:"10px 14px",cursor:"pointer",
                background:active?"rgba(139,58,30,0.2)":"transparent",
                borderBottom:`1px solid rgba(139,58,30,0.12)`,
                transition:"background .15s",fontFamily:"'Crimson Pro',serif",
              }}
                onMouseEnter={e=>{if(!active)e.currentTarget.style.background="rgba(139,58,30,0.1)";}}
                onMouseLeave={e=>{if(!active)e.currentTarget.style.background="transparent";}}
              >
                <div style={{
                  width:32,height:32,borderRadius:8,flexShrink:0,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  background:active?`rgba(201,130,26,0.2)`:"rgba(139,58,30,0.15)",
                  border:`1px solid ${active?C.gold+"55":C.earth+"30"}`,
                }}>
                  <Icon size={14} style={{color:active?C.gold:`${C.goldPale}50`}}/>
                </div>
                <div style={{textAlign:"left",flex:1}}>
                  <div style={{fontSize:12,fontWeight:600,color:active?C.goldPale:`${C.goldPale}70`}}>{t.label}</div>
                  <div style={{fontSize:10,color:`${C.goldPale}38`}}>{t.sublabel}</div>
                </div>
                {active
                  ? <CheckCircle2 size={13} style={{color:C.gold,flexShrink:0}}/>
                  : <Circle size={13} style={{color:`${C.goldPale}25`,flexShrink:0}}/>
                }
              </button>
            );
          })}
        </div>
      )}
      <button onClick={()=>setOpen(o=>!o)} style={{
        display:"flex",alignItems:"center",gap:8,
        padding:"9px 16px",borderRadius:12,
        background:open?"rgba(139,58,30,0.45)":"rgba(26,14,8,0.92)",
        border:`1.5px solid ${open?C.gold:C.earth+"55"}`,
        color:open?C.goldPale:`${C.goldPale}80`,
        cursor:"pointer",fontSize:12,
        boxShadow:`0 4px 16px rgba(0,0,0,0.45)`,
        fontFamily:"'Crimson Pro',Georgia,serif",
        transition:"all .18s",
      }}>
        <ActiveIcon size={13}/>
        <span style={{fontWeight:600}}>{tile?.label}</span>
        <ChevronDown size={11} style={{transform:open?"rotate(180deg)":"none",transition:"transform .2s"}}/>
      </button>
    </div>
  );
}

// ─── Choropleth Legend ────────────────────────────────────────────────────────
function Legend({ mode }) {
  if (mode==="none") return null;
  return (
    <div style={{
      position:"absolute",bottom:22,left:232,zIndex:800,
      background:"rgba(26,14,8,0.92)",
      border:`1px solid ${C.earth}44`,
      borderRadius:12, padding:"10px 14px",
      boxShadow:`0 4px 16px rgba(0,0,0,0.45)`,
      fontFamily:"'Crimson Pro',Georgia,serif",
    }}>
      <TribalStrip size={3}/>
      <div style={{padding:"6px 0 4px",fontSize:9,letterSpacing:".18em",textTransform:"uppercase",color:`${C.goldPale}45`}}>
        {mode==="palette"?"Màu hành chính":"Di sản / huyện"}
      </div>
      {mode==="heatmap"&&[
        {c:"#e8e0d5",b:"#c9b89a",l:"0"},
        {c:"#f5c97a",b:"#e0aa4a",l:"1"},
        {c:"#e8923a",b:"#c97020",l:"2–3"},
        {c:"#c9470f",b:"#a03a00",l:"4+"},
      ].map(({c,b,l})=>(
        <div key={l} style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}>
          <div style={{width:16,height:12,borderRadius:3,border:`1px solid ${b}`,background:c,flexShrink:0}}/>
          <span style={{fontSize:11,color:`${C.goldPale}70`}}>{l}</span>
        </div>
      ))}
      {mode==="palette"&&(
        <div style={{fontSize:10,color:`${C.goldPale}45`,marginTop:2}}>Mỗi huyện một màu</div>
      )}
    </div>
  );
}

// ─── Main Map ─────────────────────────────────────────────────────────────────
export default function Map() {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedHeritage, setSelectedHeritage] = useState(null);
  const [filter,           setFilter]           = useState("all");
  const [activeTile,       setActiveTile]        = useState("google_map");
  const [geoData,          setGeoData]           = useState(null);
  const [geoLoading,       setGeoLoading]        = useState(false);
  const [choroplethMode,   setChoroplethMode]    = useState("heatmap");

  const district = DISTRICTS.find(d=>d.id===selectedDistrict);
  const countByDistrict = Object.fromEntries(DISTRICTS.map(d=>[d.id,HERITAGES.filter(h=>h.districtId===d.id).length]));
  const paletteCache = useRef({});

  useEffect(()=>{
    if(choroplethMode==="none"||geoData||geoLoading) return;
    setGeoLoading(true);
    fetch("https://www.geoboundaries.org/api/current/gbOpen/VNM/ADM2/")
      .then(r=>r.json()).then(m=>fetch(m.simplifiedGeometryGeoJSON))
      .then(r=>r.json()).then(data=>{
        const filtered=data.features.filter(f=>{
          try{const b=L.geoJSON(f).getBounds(),c=b.getCenter();return c.lat>=14.8&&c.lat<=16.3&&c.lng>=107.0&&c.lng<=109.1;}catch{return false;}
        });
        setGeoData({type:"FeatureCollection",features:filtered});
        setGeoLoading(false);
      }).catch(()=>setGeoLoading(false));
  },[choroplethMode]);

  useEffect(()=>{
    if(activeTile==="admin_color"&&choroplethMode==="none") setChoroplethMode("palette");
  },[activeTile]);

  const matchDistrict=(sn="")=>{
    const s=sn.toLowerCase();
    return DISTRICTS.find(d=>{const n=d.name.toLowerCase().replace(/^(tp\.|thành phố|huyện|thị xã)\s*/i,"");return s.includes(n)||n.includes(s.replace(/^(huyện|thị xã|thành phố)\s*/i,""));});
  };

  const geoJsonStyle=(feature)=>{
    const sn=feature?.properties?.shapeName||"";
    const dist=matchDistrict(sn);
    const isSel=dist?.id===selectedDistrict;
    if(choroplethMode==="palette"){
      const key=sn.toLowerCase();
      if(paletteCache.current[key]===undefined) paletteCache.current[key]=Object.keys(paletteCache.current).length%DISTRICT_PALETTE.length;
      return{fillColor:DISTRICT_PALETTE[paletteCache.current[key]],fillOpacity:isSel?.78:.56,color:isSel?"#fff":"rgba(255,255,255,0.3)",weight:isSel?2.5:.8};
    }
    const count=dist?(countByDistrict[dist.id]||0):0;
    return{fillColor:getHeatColor(count),fillOpacity:isSel?.82:.5,color:isSel?C.gold:`${C.earth}55`,weight:isSel?2.5:1};
  };

  const onEachFeature=(feature,layer)=>{
    const dist=matchDistrict(feature?.properties?.shapeName);
    layer.on({
      click:()=>{if(dist){setSelectedDistrict(p=>p===dist.id?null:dist.id);setSelectedHeritage(null);}},
      mouseover:(e)=>e.target.setStyle({fillOpacity:.85,weight:2.5}),
      mouseout:(e)=>e.target.setStyle(geoJsonStyle(feature)),
    });
    if(feature?.properties?.shapeName) layer.bindTooltip(feature.properties.shapeName,{permanent:false,sticky:true,className:"cotu-tooltip"});
  };

  const FILTER_BTNS = [
    {val:"all",         label:"Tất cả",      Icon:Layers},
    {val:"unesco",      label:"UNESCO",       Icon:Star},
    {val:"vat_the",     label:"Vật thể",      Icon:Landmark},
    {val:"phi_vat_the", label:"Phi vật thể",  Icon:Music},
  ];
  const CHOROPLETH_BTNS = [
    {val:"none",    label:"Tắt",        Icon:EyeOff},
    {val:"heatmap", label:"Mật độ",     Icon:Eye},
    {val:"palette", label:"Hành chính", Icon:Layers},
  ];

  const visibleHeritages = HERITAGES.filter(h=>{
    const dm=selectedDistrict?h.districtId===selectedDistrict:true;
    const tm=filter==="all"||h.type===filter;
    return dm&&tm;
  });


  return (
    <div style={{
      position:"relative", width:"100%", height:"100%",
      background:C.black, fontFamily:"'Crimson Pro',Georgia,serif",
    }}>
      {/* ── Leaflet / tooltip CSS ── */}
      <style>{`
        .cotu-tooltip{background:rgba(26,14,8,0.95);border:1px solid rgba(201,130,26,0.35);color:#e8d4a0;font-size:11px;padding:4px 10px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.45);font-family:'Crimson Pro',serif;}
        .cotu-tooltip::before{display:none;}
        .leaflet-control-zoom{border:1px solid rgba(139,58,30,0.4)!important;border-radius:10px!important;overflow:hidden;}
        .leaflet-control-zoom a{background:rgba(26,14,8,0.92)!important;color:${C.gold}!important;border-bottom:1px solid rgba(139,58,30,0.3)!important;font-family:'Crimson Pro',serif!important;}
        .leaflet-control-zoom a:hover{background:rgba(139,58,30,0.35)!important;color:${C.goldPale}!important;}
        .leaflet-popup-content-wrapper{background:rgba(26,14,8,0.97);border:1px solid rgba(139,58,30,0.45);border-radius:10px;box-shadow:0 6px 24px rgba(0,0,0,0.6);color:${C.goldPale};font-family:'Crimson Pro',serif;}
        .leaflet-popup-tip{background:rgba(26,14,8,0.97);}
        .leaflet-popup-close-button{color:${C.gold}!important;}
      `}</style>

      {/* ── Map area ── */}
      <div style={{position:"absolute",top:0,bottom:0,left:0,right:0}}>
        <MapContainer
          center={[15.7802,108.1998]} zoom={10}
          style={{height:"100%",width:"100%"}}
          zoomControl={true} scrollWheelZoom={true}
          maxBounds={[[14.5,107.0],[16.5,109.5]]} maxBoundsViscosity={0.8}
        >
          <DynamicTileLayer tileId={activeTile}/>
          {choroplethMode!=="none"&&geoData&&(
            <GeoJSON
              key={`geo-${choroplethMode}-${selectedDistrict}`}
              data={geoData} style={geoJsonStyle} onEachFeature={onEachFeature}
            />
          )}
          {visibleHeritages.map(h=>(
            <Marker key={h.id} position={[h.lat,h.lng]}
              icon={makeMarkerIcon(h.type)}
              eventHandlers={{click:()=>setSelectedHeritage(h)}}
            >
              <Popup>
                <div style={{minWidth:175,fontFamily:"'Crimson Pro',serif"}}>
                  <div style={{fontWeight:700,fontSize:13,marginBottom:4,color:C.goldPale}}>{h.name}</div>
                  <div style={{fontSize:11,color:`${C.goldPale}60`,marginBottom:8,display:"flex",alignItems:"center",gap:4}}>
                    <MapPin size={9}/>{h.address}
                  </div>
                  <button onClick={()=>setSelectedHeritage(h)} style={{
                    width:"100%",padding:"5px 0",borderRadius:6,cursor:"pointer",
                    background:`rgba(139,58,30,0.25)`,border:`1px solid ${C.earth}55`,
                    color:C.gold,fontSize:11,fontFamily:"'Crimson Pro',serif",
                    transition:"all .15s",
                  }}
                    onMouseEnter={e=>{e.currentTarget.style.background="rgba(139,58,30,0.45)";}}
                    onMouseLeave={e=>{e.currentTarget.style.background="rgba(139,58,30,0.25)";}}
                  >Xem chi tiết →</button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        <TileSwitcher activeTile={activeTile} onSelect={setActiveTile}/>
        <Legend mode={choroplethMode}/>
      </div>

      {/* Heritage detail panel */}
      <HeritagePanel heritage={selectedHeritage} onClose={()=>setSelectedHeritage(null)}/>
    </div>
  );
}