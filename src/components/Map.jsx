import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import {
  X, MapPin, Layers, Landmark, Music2, Star,
  Satellite, Map as MapIcon, EyeOff, ChevronDown,
  CheckCircle2, Circle, Hash, Feather, Home, ChevronRight
} from "lucide-react";

// ─── Fix Leaflet default icons ────────────────────────────────────────────────
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:       "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// ─── Cơ Tu colour palette ─────────────────────────────────────────────────────
const C = {
  earth:     "#8B3A1E",
  earthDeep: "#5C1F08",
  gold:      "#C9821A",
  goldLight: "#E8A832",
  goldPale:  "#F5D080",
  forest:    "#2D5A27",
  black:     "#0F170A", // Dark green-black instead of brown-black
  bamboo:    "#A3C586",
  bambooDark:"#33691E",
};

// ─── DATA: 7 di sản từ file docx ──────────────────────────────────────────────
const DISTRICTS = [
  {
    id: "tay_giang",
    name: "Tây Giang",
    center: [15.888, 107.491],
  },
  {
    id: "dong_giang",
    name: "Đông Giang",
    center: [15.92, 107.78],
  },
];

const HERITAGES = [
  {
    id: 1,
    name: "Lễ mừng lúa mới",
    districtId: "tay_giang",
    type: "phi_vat_the",
    category: "Nghi lễ truyền thống",
    address: "Làng truyền thống Cơ Tu, xã Tây Giang, TP. Đà Nẵng (sau sáp nhập)",
    addressOld: "Làng truyền thống Cơ Tu Tây Giang, xã A Tiêng, huyện Tây Giang, tỉnh Quảng Nam (trước sáp nhập)",
    lat: 15.88770,
    lng: 107.49127,
    desc: "Lễ mừng lúa mới là khoảnh khắc thiêng liêng sau mùa gặt, thể hiện lòng tri ân trời đất, tổ tiên và ước vọng no đủ. Đây cũng là sợi dây gắn kết cộng đồng, gìn giữ bản sắc văn hóa qua bao thế hệ.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Co_Tu_people.jpg/1280px-Co_Tu_people.jpg",
    tags: ["Nghi lễ", "Lúa mới", "Cộng đồng", "Cơ Tu"],
  },
  {
    id: 2,
    name: "Lễ kết nghĩa",
    districtId: "dong_giang",
    type: "phi_vat_the",
    category: "Nghi lễ truyền thống",
    address: "Nhà cộng đồng thôn A Xờ, xã Bến Hiên, TP. Đà Nẵng (sau sáp nhập)",
    addressOld: "Nhà cộng đồng thôn A Xờ, xã Mà Cooih, huyện Đông Giang, tỉnh Quảng Nam (trước sáp nhập)",
    lat: 15.83962,
    lng: 107.67916,
    desc: "Lễ kết nghĩa của người Cơ Tu là lời thề thiêng liêng kết nối con người bằng tình thân và danh dự, thể hiện tinh thần gắn bó, thủy chung và sức mạnh cộng đồng.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Co_Tu_people.jpg/1280px-Co_Tu_people.jpg",
    tags: ["Nghi lễ", "Kết nghĩa", "Danh dự", "Cơ Tu"],
  },
  {
    id: 3,
    name: "Múa tung tung da dá",
    districtId: "dong_giang",
    type: "phi_vat_the",
    category: "Nghệ thuật trình diễn dân gian",
    address: "Cổng trời Đông Giang, xã Bến Hiên, TP. Đà Nẵng (sau sáp nhập)",
    addressOld: "Cổng trời Đông Giang, xã Mà Cooih, huyện Đông Giang, tỉnh Quảng Nam (trước sáp nhập)",
    lat: 15.84030,
    lng: 107.68133,
    desc: "Múa tung tung da dá là điệu múa thiêng của người Cơ Tu, hòa trong nhịp trống và bước chân mạnh mẽ, thể hiện sức sống, khát vọng và sự gắn kết cộng đồng.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Co_Tu_people.jpg/1280px-Co_Tu_people.jpg",
    tags: ["Múa", "Nghệ thuật", "Dân gian", "Cơ Tu"],
  },
  {
    id: 4,
    name: "Hát lý – Nói lý",
    districtId: "dong_giang",
    type: "phi_vat_the",
    category: "Nghệ thuật trình diễn dân gian",
    address: "Xã Sông Vàng, TP. Đà Nẵng (sau sáp nhập)",
    addressOld: "Xã Ba, huyện Đông Giang, tỉnh Quảng Nam (trước sáp nhập)",
    lat: 15.95767,
    lng: 107.92538,
    desc: "Hát lý – nói lý là hình thức diễn xướng dân gian giàu tính đối đáp, thể hiện trí tuệ, tình cảm và kinh nghiệm sống, góp phần gìn giữ bản sắc văn hóa cộng đồng.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Co_Tu_people.jpg/1280px-Co_Tu_people.jpg",
    tags: ["Hát lý", "Nói lý", "Dân gian", "Cơ Tu"],
  },
  {
    id: 5,
    name: "Nghề dệt thổ cẩm",
    districtId: "dong_giang",
    type: "phi_vat_the",
    category: "Nghề thủ công truyền thống",
    address: "Làng dệt thổ cẩm Đhrồng, xã Đông Giang, TP. Đà Nẵng (sau sáp nhập)",
    addressOld: "Làng dệt thổ cẩm Đhrồng, Thị trấn Prao, huyện Đông Giang, tỉnh Quảng Nam (trước sáp nhập)",
    lat: 15.92064,
    lng: 107.65236,
    desc: "Dệt thổ cẩm là nghề thủ công truyền thống, kết tinh sự khéo léo và sáng tạo của người phụ nữ, gửi gắm hoa văn, màu sắc và bản sắc văn hóa của cộng đồng qua từng sợi vải.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Co_Tu_people.jpg/1280px-Co_Tu_people.jpg",
    tags: ["Dệt", "Thổ cẩm", "Thủ công", "Cơ Tu"],
  },
  {
    id: 6,
    name: "Nghề đan lát truyền thống",
    districtId: "dong_giang",
    type: "phi_vat_the",
    category: "Nghề thủ công truyền thống",
    address: "Làng du lịch cộng đồng Bhohoong, xã Sông Kôn, TP. Đà Nẵng (sau sáp nhập)",
    addressOld: "Làng du lịch cộng đồng Bhohoong, xã Sông Kôn, huyện Đông Giang, tỉnh Quảng Nam (trước sáp nhập)",
    lat: 15.96620,
    lng: 107.78063,
    desc: "Đan lát là nghề thủ công truyền thống, thể hiện sự khéo léo và sáng tạo, gắn liền với đời sống sinh hoạt và văn hóa của cộng đồng.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Co_Tu_people.jpg/1280px-Co_Tu_people.jpg",
    tags: ["Đan lát", "Thủ công", "Truyền thống", "Cơ Tu"],
  },
  {
    id: 7,
    name: "Nhà Gươl",
    districtId: "dong_giang",
    type: "vat_the",
    category: "Kiến trúc truyền thống",
    address: "Thôn Adinh 2, xã Đông Giang, TP. Đà Nẵng (sau sáp nhập)",
    addressOld: "Thôn Adinh 2, thị trấn Prao, huyện Đông Giang, tỉnh Quảng Nam (trước sáp nhập)",
    lat: 15.92719,
    lng: 107.61936,
    desc: "Nhà Gươl là trung tâm sinh hoạt cộng đồng của người Cơ Tu, nơi diễn ra các nghi lễ, hội họp và lưu giữ giá trị văn hóa, thể hiện tinh thần đoàn kết và bản sắc truyền thống.",
    image: "https://statics.vinpearl.com/nha-guol-cua-nguoi-co-tu-1_1626227529.jpg",
    tags: ["Nhà Gươl", "Kiến trúc", "Cộng đồng", "Cơ Tu"],
  },
];

// ─── Tile layers ──────────────────────────────────────────────────────────────
const TILE_LAYERS = [
  { id: "google_map",  label: "Bản đồ Google",  sublabel: "Đường phố & nhãn",  Icon: MapIcon,    url: "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", attribution: "© Google Maps" },
  { id: "satellite",   label: "Ảnh vệ tinh",    sublabel: "Google Satellite",   Icon: Satellite,  url: "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", attribution: "© Google" },
  { id: "no_label",    label: "Không nhãn",     sublabel: "CartoDB Dark",       Icon: EyeOff,     url: "https://cartodb-basemaps-a.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png", attribution: "© CartoDB" },
];

// ─── Type config ──────────────────────────────────────────────────────────────
const TYPE_CONFIG = {
  vat_the:     { label: "Vật thể",     Icon: Landmark,  color: C.gold,      bg: `${C.gold}2e`,     border: `${C.gold}66`  },
  phi_vat_the: { label: "Phi vật thể", Icon: Music2,    color: C.bamboo,    bg: `${C.bamboo}2e`,   border: `${C.bamboo}66` },
  unesco:      { label: "UNESCO",      Icon: Star,      color: C.goldLight, bg: `${C.goldLight}2e`,border: `${C.goldLight}66` },
};

function makeMarkerIcon(isSelected) {
  const size = isSelected ? 46 : 38;
  const color = C.bamboo;
  const darkColor = C.bambooDark;
  
  return L.divIcon({
    className: "custom-pin-icon",
    html: `<div style="
      display:flex; align-items:center; justify-content:center;
      width:${size}px; height:${size}px; 
      filter: drop-shadow(0px 4px 8px rgba(0,0,0,0.6));
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      ${isSelected ? 'transform: translateY(-8px) scale(1.1);' : 'transform: translateY(0) scale(1);'}
    ">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="${color}" stroke="${darkColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
        <circle cx="12" cy="10" r="3" fill="${darkColor}"/>
      </svg>
    </div>`,
    iconSize: [size, size],
    iconAnchor: [size/2, size],
    popupAnchor: [0, -size + 8],
  });
}

// ─── Map Controller for Flying ────────────────────────────────────────────────
function MapController({ selectedHeritage }) {
  const map = useMap();
  useEffect(() => {
    if (selectedHeritage) {
      map.flyTo([selectedHeritage.lat, selectedHeritage.lng], 13, {
        duration: 1.2,
      });
    }
  }, [selectedHeritage, map]);
  return null;
}

// ─── UI Components ────────────────────────────────────────────────────────────
const TribalStrip = ({ horizontal = true, size = 4 }) => (
  <div style={{
    flexShrink: 0,
    ...(horizontal
      ? { height: size, width: "100%", background: `repeating-linear-gradient(90deg,${C.bambooDark} 0,${C.bambooDark} 8px,${C.bamboo} 8px,${C.bamboo} 16px,${C.goldLight} 16px,${C.goldLight} 24px,${C.bamboo} 24px,${C.bamboo} 32px)` }
      : { width: size, height: "100%", background: `repeating-linear-gradient(0deg,${C.bambooDark} 0,${C.bambooDark} 8px,${C.bamboo} 8px,${C.bamboo} 16px,${C.goldLight} 16px,${C.goldLight} 24px,${C.bamboo} 24px,${C.bamboo} 32px)` }),
  }} />
);

const DiamondDivider = () => (
  <svg viewBox="0 0 200 16" style={{ width: "100%", height: 16 }}>
    <line x1="0" y1="8" x2="78" y2="8" stroke={C.bamboo} strokeWidth="0.8" opacity="0.5" />
    <polygon points="100,2 112,8 100,14 88,8" fill={C.bamboo} opacity="0.7" />
    <line x1="122" y1="8" x2="200" y2="8" stroke={C.bamboo} strokeWidth="0.8" opacity="0.5" />
  </svg>
);

const WovenBg = () => (
  <div style={{
    position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
    backgroundImage: `repeating-linear-gradient(0deg,transparent,transparent 27px,${C.bamboo}14 27px,${C.bamboo}14 28px),repeating-linear-gradient(90deg,transparent,transparent 3px,${C.bamboo}0d 3px,${C.bamboo}0d 4px)`,
  }} />
);

// ─── Tile Switcher ────────────────────────────────────────────────────────────
function TileSwitcher({ activeTile, onSelect }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const tile = TILE_LAYERS.find(t => t.id === activeTile);
  const ActiveIcon = tile?.Icon || Layers;

  useEffect(() => {
    const fn = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  return (
    <div ref={ref} style={{ position: "absolute", bottom: 22, right: 22, zIndex: 800, pointerEvents: "all" }}>
      {open && (
        <div style={{
          marginBottom: 8, background: "rgba(15,23,10,0.97)",
          border: `1px solid ${C.bamboo}55`, borderRadius: 14, overflow: "hidden", width: 230,
          boxShadow: `0 8px 32px rgba(0,0,0,0.6)`, fontFamily: "'Crimson Pro',Georgia,serif",
        }}>
          <div style={{ padding: "8px 14px", borderBottom: `1px solid ${C.bamboo}30`, display: "flex", alignItems: "center", gap: 7 }}>
            <span style={{ fontSize: 9, letterSpacing: ".2em", textTransform: "uppercase", color: `${C.bamboo}88` }}>Nền bản đồ</span>
          </div>
          {TILE_LAYERS.map(t => {
            const Icon = t.Icon; const active = activeTile === t.id;
            return (
              <button key={t.id} onClick={() => { onSelect(t.id); setOpen(false); }} style={{
                width: "100%", display: "flex", alignItems: "center", gap: 10,
                padding: "10px 14px", cursor: "pointer",
                background: active ? `${C.bamboo}33` : "transparent",
                borderBottom: `1px solid ${C.bamboo}1f`,
                transition: "background .15s", fontFamily: "'Crimson Pro',serif",
              }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = `${C.bamboo}1a`; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
              >
                <div style={{
                  width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: active ? `${C.bamboo}33` : `${C.bamboo}14`,
                  border: `1px solid ${active ? C.bamboo + "88" : C.bamboo + "30"}`,
                }}>
                  <Icon size={13} style={{ color: active ? C.bamboo : `${C.bamboo}88` }} />
                </div>
                <div style={{ textAlign: "left", flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: active ? C.goldPale : `${C.goldPale}70` }}>{t.label}</div>
                  <div style={{ fontSize: 10, color: `${C.goldPale}55` }}>{t.sublabel}</div>
                </div>
                {active ? <CheckCircle2 size={13} style={{ color: C.bamboo }} /> : <Circle size={13} style={{ color: `${C.bamboo}40` }} />}
              </button>
            );
          })}
        </div>
      )}
      <button onClick={() => setOpen(o => !o)} style={{
        display: "flex", alignItems: "center", gap: 8, padding: "9px 16px", borderRadius: 12,
        background: open ? `${C.bamboo}73` : "rgba(15,23,10,0.92)",
        border: `1.5px solid ${open ? C.bamboo : C.bamboo + "55"}`,
        color: open ? C.goldPale : `${C.goldPale}80`, cursor: "pointer", fontSize: 12,
        boxShadow: `0 4px 16px rgba(0,0,0,0.45)`, fontFamily: "'Crimson Pro',Georgia,serif", transition: "all .18s",
      }}>
        <ActiveIcon size={13} />
        <span style={{ fontWeight: 600 }}>{tile?.label}</span>
        <ChevronDown size={11} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
      </button>
    </div>
  );
}

// ─── Heritage Detail Panel ────────────────────────────────────────────────────
function HeritagePanel({ heritage, onClose }) {
  if (!heritage) return null;
  const cfg = TYPE_CONFIG[heritage.type] || TYPE_CONFIG.phi_vat_the;
  const TypeIcon = cfg.Icon;

  return (
    <div style={{
      position: "absolute", top: 0, right: 0, height: "100%", width: 380,
      zIndex: 1000, display: "flex", flexDirection: "column",
      background: `linear-gradient(160deg,${C.bambooDark} 0%,#1a2416 40%,${C.black} 100%)`,
      borderLeft: `2px solid ${C.bamboo}55`,
      boxShadow: `-8px 0 40px rgba(0,0,0,0.55)`,
      fontFamily: "'Crimson Pro',Georgia,serif",
    }}>
      <WovenBg />
      <TribalStrip height={5} />

      {/* Close */}
      <button onClick={onClose} style={{
        position: "absolute", top: 12, right: 12, zIndex: 20,
        width: 30, height: 30, borderRadius: "50%",
        background: `${C.bamboo}40`, border: `1px solid ${C.bamboo}55`,
        color: C.goldPale, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all .18s",
      }}
        onMouseEnter={e => { e.currentTarget.style.background = `${C.bamboo}88`; e.currentTarget.style.borderColor = C.bamboo; }}
        onMouseLeave={e => { e.currentTarget.style.background = `${C.bamboo}40`; e.currentTarget.style.borderColor = `${C.bamboo}55`; }}
      >
        <X size={13} />
      </button>

      {/* Hero image */}
      <div style={{ position: "relative", width: "100%", height: 190, flexShrink: 0, overflow: "hidden" }}>
        <img src={heritage.image} alt="Bản đồ di sản Cơ Tu"
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: .82 }}
          onError={e => { e.target.src = `https://placehold.co/390x200/1a2416/a3c586?text=${encodeURIComponent("Bản đồ di sản Cơ Tu")}`; }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(15,23,10,0.95) 0%,transparent 55%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4,
          background: `repeating-linear-gradient(90deg,${C.bambooDark} 0,${C.bambooDark} 8px,${C.gold}80 8px,${C.gold}80 16px,${C.forest}80 16px,${C.forest}80 24px,${C.gold}80 24px,${C.gold}80 32px)`,
          opacity: .7,
        }} />
      </div>

      {/* Header */}
      <div style={{
        padding: "14px 18px 10px", flexShrink: 0,
        background: `linear-gradient(135deg,${C.bamboo}33,${C.bambooDark}1f)`,
        borderBottom: `1px solid ${C.bamboo}44`, position: "relative",
      }}>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 5, fontSize: 10,
          letterSpacing: ".18em", textTransform: "uppercase", padding: "3px 10px",
          borderRadius: 20, background: cfg.bg, border: `1px solid ${cfg.border}`,
          color: cfg.color, marginBottom: 8,
        }}>
          <TypeIcon size={9} />{cfg.label}
        </span>
        <h2 style={{
          fontSize: 19, fontWeight: 700, lineHeight: 1.28, color: C.goldPale,
          fontFamily: "'Playfair Display',serif", marginBottom: 5,
        }}>{heritage.name}</h2>
        <div style={{ display: "flex", alignItems: "center", gap: 5, color: `${C.bamboo}cc`, fontSize: 11 }}>
          <MapPin size={10} style={{ color: C.bamboo, flexShrink: 0 }} />
          <span style={{ color: `${C.goldPale}cc` }}>{heritage.address}</span>
        </div>
        <DiamondDivider />
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 18px 18px", display: "flex", flexDirection: "column", gap: 10 }}>

        {/* Category */}
        <div style={{
          display: "flex", gap: 10, padding: "10px 12px",
          background: `${C.bamboo}1a`, border: `1px solid ${C.bamboo}28`,
          borderRadius: 8, position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: `linear-gradient(180deg,${C.bamboo},${C.bambooDark})` }} />
          <Landmark size={13} style={{ color: C.bamboo, marginTop: 2, flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: 9, letterSpacing: ".2em", textTransform: "uppercase", color: `${C.goldPale}55`, marginBottom: 3 }}>Loại hình</div>
            <div style={{ fontSize: 13, color: C.goldPale }}>{heritage.category}</div>
          </div>
        </div>

        {/* Coordinates */}
        <div style={{
          display: "flex", gap: 10, padding: "10px 12px",
          background: `${C.bamboo}1a`, border: `1px solid ${C.bamboo}28`,
          borderRadius: 8, position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: `linear-gradient(180deg,${C.forest},${C.bamboo})` }} />
          <MapPin size={13} style={{ color: C.bamboo, marginTop: 2, flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: 9, letterSpacing: ".2em", textTransform: "uppercase", color: `${C.goldPale}55`, marginBottom: 3 }}>Tọa độ</div>
            <div style={{ fontSize: 12, color: C.goldPale, fontVariantNumeric: "tabular-nums" }}>
              {heritage.lat.toFixed(5)}° B, {heritage.lng.toFixed(5)}° Đ
            </div>
          </div>
        </div>

        {/* Địa điểm cũ */}
        <div style={{
          display: "flex", gap: 10, padding: "10px 12px",
          background: `${C.forest}14`, border: `1px solid ${C.forest}33`,
          borderRadius: 8, position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: `linear-gradient(180deg,${C.forest},${C.bambooDark})` }} />
          <Home size={13} style={{ color: `${C.forest}cc`, marginTop: 2, flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: 9, letterSpacing: ".2em", textTransform: "uppercase", color: `${C.goldPale}45`, marginBottom: 3 }}>Địa điểm (trước sáp nhập)</div>
            <div style={{ fontSize: 11, color: `${C.goldPale}70` }}>{heritage.addressOld}</div>
          </div>
        </div>

        {/* Description */}
        <div style={{
          padding: "12px 14px", background: "rgba(0,0,0,0.2)",
          border: `1px solid rgba(255,255,255,0.05)`, borderRadius: 8,
        }}>
          <div style={{ fontSize: 9, letterSpacing: ".2em", textTransform: "uppercase", color: `${C.goldPale}45`, marginBottom: 6, display: "flex", alignItems: "center", gap: 5 }}>
            <Feather size={9} style={{ color: C.bamboo }} />Mô tả
          </div>
          <p style={{ fontSize: 13, color: `${C.goldPale}88`, lineHeight: 1.75, fontStyle: "italic" }}>{heritage.desc}</p>
        </div>

        {/* Tags */}
        {heritage.tags?.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, paddingTop: 2 }}>
            {heritage.tags.map(t => (
              <span key={t} style={{
                fontSize: 10, padding: "3px 10px", borderRadius: 20,
                background: `${C.bamboo}2e`, border: `1px solid ${C.bamboo}38`,
                color: C.bamboo, display: "flex", alignItems: "center", gap: 4,
              }}>
                <Hash size={8} />{t}
              </span>
            ))}
          </div>
        )}

        {/* Bottom ornament */}
        <div style={{ display: "flex", justifyContent: "center", paddingTop: 6, opacity: .4 }}>
          <svg viewBox="0 0 120 20" style={{ width: 100, height: 16 }}>
            <line x1="0" y1="10" x2="46" y2="10" stroke={C.bambooDark} strokeWidth=".8" />
            <polygon points="60,2 68,10 60,18 52,10" fill={C.bamboo} opacity=".7" />
            <line x1="74" y1="10" x2="120" y2="10" stroke={C.bambooDark} strokeWidth=".8" />
          </svg>
        </div>
      </div>

      <TribalStrip height={4} />
    </div>
  );
}

// ─── Sidebar Heritage List ────────────────────────────────────────────────────
function Sidebar({ heritages, selected, onSelect, filter, setFilter }) {
  const FILTER_BTNS = [
    { val: "all",         label: "Tất cả",      Icon: Layers },
    { val: "vat_the",     label: "Vật thể",     Icon: Landmark },
    { val: "phi_vat_the", label: "Phi vật thể", Icon: Music2 },
  ];

  return (
    <div style={{
      position: "absolute", top: 0, left: 0, height: "100%", width: 220,
      zIndex: 900, display: "flex", flexDirection: "column",
      background: `linear-gradient(170deg,${C.bambooDark} 0%,#161e12 60%,${C.black} 100%)`,
      borderRight: `2px solid ${C.bamboo}55`,
      boxShadow: `4px 0 24px rgba(0,0,0,0.45)`,
      fontFamily: "'Crimson Pro',Georgia,serif",
    }}>
      <WovenBg />
      <TribalStrip />

      {/* Title */}
      <div style={{ padding: "14px 14px 10px", position: "relative", zIndex: 1, borderBottom: `1px solid ${C.bamboo}30` }}>
        <div style={{ fontSize: 9, letterSpacing: ".25em", textTransform: "uppercase", color: `${C.bamboo}cc`, marginBottom: 4 }}>Di sản văn hóa</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: C.goldPale, fontFamily: "'Playfair Display',serif", lineHeight: 1.3 }}>
          Người Cơ Tu
        </div>
        <div style={{ fontSize: 10, color: `${C.goldPale}50`, marginTop: 3 }}>Đông Giang · Tây Giang</div>
        <DiamondDivider />
      </div>

      {/* Filter buttons */}
      <div style={{ display: "flex", gap: 5, padding: "8px 10px", position: "relative", zIndex: 1 }}>
        {FILTER_BTNS.map(({ val, label, Icon }) => {
          const active = filter === val;
          return (
            <button key={val} onClick={() => setFilter(val)} style={{
              flex: 1, padding: "5px 0", borderRadius: 8, cursor: "pointer", fontSize: 9,
              letterSpacing: ".1em", textTransform: "uppercase",
              background: active ? `${C.bamboo}73` : `${C.bamboo}1a`,
              border: `1px solid ${active ? C.bamboo + "88" : C.bamboo + "30"}`,
              color: active ? C.goldPale : `${C.goldPale}80`,
              display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
              transition: "all .15s",
            }}>
              <Icon size={11} style={{ color: active ? C.bamboo : `${C.goldPale}40` }} />
              {label}
            </button>
          );
        })}
      </div>

      {/* Heritage list */}
      <div style={{ flex: 1, overflowY: "auto", padding: "4px 8px 10px", position: "relative", zIndex: 1 }}>
        {heritages.map(h => {
          const cfg = TYPE_CONFIG[h.type] || TYPE_CONFIG.phi_vat_the;
          const TypeIcon = cfg.Icon;
          const isSelected = selected?.id === h.id;
          return (
            <button key={h.id} onClick={() => onSelect(h)} style={{
              width: "100%", textAlign: "left", padding: "9px 10px", marginBottom: 4,
              borderRadius: 8, cursor: "pointer",
              background: isSelected ? `${C.bamboo}59` : `${C.bamboo}14`,
              border: `1px solid ${isSelected ? C.bamboo + "88" : C.bamboo + "25"}`,
              transition: "all .15s", position: "relative", overflow: "hidden",
            }}
              onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = `${C.bamboo}2e`; }}
              onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = `${C.bamboo}14`; }}
            >
              {isSelected && <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: `linear-gradient(180deg,${C.bamboo},${C.bambooDark})` }} />}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 7 }}>
                <div style={{
                  width: 24, height: 24, borderRadius: 6, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: cfg.bg, border: `1px solid ${cfg.border}`,
                  marginTop: 1,
                }}>
                  <TypeIcon size={11} style={{ color: cfg.color }} />
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: isSelected ? C.goldPale : `${C.goldPale}80`, lineHeight: 1.3, marginBottom: 3 }}>
                    {h.name}
                  </div>
                  <div style={{ fontSize: 9, color: cfg.color, letterSpacing: ".1em", textTransform: "uppercase" }}>
                    {cfg.label}
                  </div>
                </div>
              </div>
            </button>
          );
        })}

        {heritages.length === 0 && (
          <div style={{ textAlign: "center", padding: "20px 10px", color: `${C.goldPale}35`, fontSize: 12, fontStyle: "italic" }}>
            Không có di sản phù hợp
          </div>
        )}
      </div>

      {/* Count badge */}
      <div style={{
        padding: "8px 14px", borderTop: `1px solid ${C.bamboo}30`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "relative", zIndex: 1,
      }}>
        <span style={{ fontSize: 10, color: `${C.goldPale}40`, letterSpacing: ".15em", textTransform: "uppercase" }}>Tổng số</span>
        <span style={{
          fontSize: 14, fontWeight: 700, color: C.bamboo,
          background: `${C.bamboo}1f`, border: `1px solid ${C.bamboo}30`,
          padding: "2px 10px", borderRadius: 20,
        }}>{heritages.length}</span>
      </div>

      <TribalStrip />
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function BanDoHoaDiSanCoTu() {
  const [selectedHeritage, setSelectedHeritage] = useState(null);
  const [filter, setFilter]           = useState("all");
  const [activeTile, setActiveTile]   = useState("google_map");

  const visibleHeritages = HERITAGES.filter(h => filter === "all" || h.type === filter);

  return (
    <div style={{
      position: "relative", width: "100%", height: "100%",
      background: C.black, fontFamily: "'Crimson Pro',Georgia,serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,600;0,700;1,400&family=Playfair+Display:wght@700&display=swap');
        .cotu-tooltip{background:rgba(15,23,10,0.95);border:1px solid ${C.bamboo}55;color:#e8d4a0;font-size:11px;padding:4px 10px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.45);font-family:'Crimson Pro',serif;}
        .cotu-tooltip::before{display:none;}
        .leaflet-control-zoom{border:1px solid ${C.bamboo}55!important;border-radius:10px!important;overflow:hidden;}
        .leaflet-control-zoom a{background:rgba(15,23,10,0.92)!important;color:${C.bamboo}!important;border-bottom:1px solid ${C.bamboo}40!important;font-family:'Crimson Pro',serif!important;}
        .leaflet-control-zoom a:hover{background:${C.bamboo}30!important;color:#F5D080!important;}
        .leaflet-popup-content-wrapper{background:rgba(15,23,10,0.97);border:1px solid ${C.bamboo}55;border-radius:10px;box-shadow:0 6px 24px rgba(0,0,0,0.6);color:#F5D080;font-family:'Crimson Pro',serif;}
        .leaflet-popup-tip{background:rgba(15,23,10,0.97);}
        .leaflet-popup-close-button{color:${C.bamboo}!important;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-track{background:${C.bamboo}14;}
        ::-webkit-scrollbar-thumb{background:${C.bamboo}73;border-radius:4px;}
      `}</style>

      {/* Map */}
      <div style={{ position: "absolute", top: 0, bottom: 0, left: 220, right: selectedHeritage ? 380 : 0 }}>
        <MapContainer
          center={[15.88, 107.70]} zoom={10}
          style={{ height: "100%", width: "100%" }}
          zoomControl={true} scrollWheelZoom={true}
        >
          <TileLayer
            key={activeTile}
            url={TILE_LAYERS.find(t => t.id === activeTile)?.url || TILE_LAYERS[0].url}
            attribution={TILE_LAYERS.find(t => t.id === activeTile)?.attribution}
          />
          <MapController selectedHeritage={selectedHeritage} />
          {visibleHeritages.map(h => {
            const isSelected = selectedHeritage?.id === h.id;
            return (
              <Marker key={h.id} position={[h.lat, h.lng]}
                icon={makeMarkerIcon(isSelected)}
                eventHandlers={{ click: () => setSelectedHeritage(h) }}
              >
                <Popup>
                  <div style={{ minWidth: 165, fontFamily: "'Crimson Pro',serif" }}>
                    <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4, color: C.goldPale }}>{h.name}</div>
                    <div style={{ fontSize: 10, color: `${C.bamboo}cc`, marginBottom: 8, display: "flex", alignItems: "center", gap: 4 }}>
                      <MapPin size={9} color={C.bamboo} /> <span style={{ color: `${C.goldPale}aa` }}>{h.category}</span>
                    </div>
                    <button onClick={() => setSelectedHeritage(h)} style={{
                      width: "100%", padding: "5px 0", borderRadius: 6, cursor: "pointer",
                      background: `${C.bamboo}25`, border: `1px solid ${C.bamboo}55`,
                      color: C.bamboo, fontSize: 11, fontFamily: "'Crimson Pro',serif",
                      transition: "all .2s"
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = `${C.bamboo}40`}
                    onMouseLeave={e => e.currentTarget.style.background = `${C.bamboo}25`}
                    >
                      Xem chi tiết →
                    </button>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
        <TileSwitcher activeTile={activeTile} onSelect={setActiveTile} />
      </div>

      {/* Sidebar */}
      <Sidebar
        heritages={visibleHeritages}
        selected={selectedHeritage}
        onSelect={setSelectedHeritage}
        filter={filter}
        setFilter={setFilter}
      />

      {/* Detail panel */}
      <HeritagePanel heritage={selectedHeritage} onClose={() => setSelectedHeritage(null)} />
    </div>
  );
}