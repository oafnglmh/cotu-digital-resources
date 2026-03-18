import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { DISTRICTS } from "../data/districts";
import { HERITAGES } from "../data/heritages";
import HeritagePanel from "./HeritagePanel";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const TYPE_ICON = { unesco: "⭐", vat_the: "🏛", phi_vat_the: "🎭" };
const TYPE_COLOR = { unesco: "#c9a84c", vat_the: "#c2784a", phi_vat_the: "#4a9ea8" };

function makeMarkerIcon(type) {
  const color = TYPE_COLOR[type] || "#c9a84c";
  const icon  = TYPE_ICON[type] || "🏛";
  return L.divIcon({
    className: "",
    html: `
      <div style="
        width:36px;height:36px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);
        background:${color}cc;border:2px solid ${color};
        display:flex;align-items:center;justify-content:center;
        box-shadow:0 3px 10px rgba(0,0,0,0.5);cursor:pointer;
      ">
        <span style="transform:rotate(45deg);font-size:16px">${icon}</span>
      </div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -38],
  });
}

export default function Map() {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedHeritage, setSelectedHeritage] = useState(null);
  const [filter, setFilter] = useState("all");

  const district = DISTRICTS.find(d => d.id === selectedDistrict);

  // Di sản thuộc huyện đang chọn (hoặc tất cả)
  const visibleHeritages = HERITAGES.filter(h => {
    const districtMatch = selectedDistrict ? h.districtId === selectedDistrict : true;
    const typeMatch = filter === "all" || h.type === filter;
    return districtMatch && typeMatch;
  });

  return (
    <div className="relative w-full h-screen bg-stone-950 font-serif">

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-[999] flex items-center gap-3 px-5 py-3 bg-stone-950/95 border-b border-yellow-900/25">
        <span className="text-2xl">🏛</span>
        <div>
          <div className="text-base font-bold text-yellow-200 tracking-wide">Bản đồ Di sản Văn hoá Quảng Nam</div>
          <div className="text-[10px] text-stone-600 tracking-widest uppercase">Số hoá · Bảo tồn · Lan toả</div>
        </div>

        {/* Filter */}
        <div className="ml-auto flex gap-1.5">
          {[
            { val: "all", label: "Tất cả" },
            { val: "unesco", label: "⭐ UNESCO" },
            { val: "vat_the", label: "🏛 Vật thể" },
            { val: "phi_vat_the", label: "🎭 Phi vật thể" },
          ].map(f => (
            <button key={f.val} onClick={() => setFilter(f.val)}
              className={`px-3 py-1 rounded-full text-xs border transition ${
                filter === f.val
                  ? "bg-yellow-600/25 border-yellow-500/50 text-yellow-300"
                  : "border-stone-700 text-stone-500 hover:text-stone-300"
              }`}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Left sidebar — danh sách huyện */}
      <div className="absolute left-0 top-[56px] bottom-0 z-[999] w-52 bg-stone-950/95 border-r border-yellow-900/25 flex flex-col overflow-hidden">
        <div className="px-4 py-3 border-b border-yellow-900/20">
          <div className="text-[10px] tracking-widest text-stone-600 uppercase mb-1">Chọn huyện</div>
          <div className="text-xs text-stone-500">{selectedDistrict ? district?.name : "Đang xem toàn tỉnh"}</div>
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          <button
            onClick={() => { setSelectedDistrict(null); setSelectedHeritage(null); }}
            className={`w-full text-left px-4 py-2.5 text-sm transition ${
              !selectedDistrict ? "bg-yellow-600/15 text-yellow-300 border-r-2 border-yellow-500" : "text-stone-400 hover:bg-white/5"
            }`}
          >🗺 Toàn tỉnh</button>

          {DISTRICTS.map(d => {
            const count = HERITAGES.filter(h => h.districtId === d.id).length;
            return (
              <button key={d.id}
                onClick={() => { setSelectedDistrict(d.id); setSelectedHeritage(null); }}
                className={`w-full text-left px-4 py-2.5 text-sm transition flex items-center justify-between ${
                  selectedDistrict === d.id
                    ? "bg-yellow-600/15 text-yellow-300 border-r-2 border-yellow-500"
                    : "text-stone-400 hover:bg-white/5 hover:text-stone-200"
                }`}>
                <span>{d.name}</span>
                {count > 0 && (
                  <span className="text-[10px] bg-yellow-700/30 text-yellow-500 px-1.5 py-0.5 rounded-full">{count}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Danh sách xã khi chọn huyện */}
        {district && (
          <div className="border-t border-yellow-900/20 flex-1 overflow-y-auto">
            <div className="px-4 py-2 text-[10px] tracking-widest text-stone-600 uppercase">Xã / Phường</div>
            {district.communes.map((c, i) => (
              <div key={i} className="px-4 py-2 text-xs text-stone-500 border-b border-stone-900/50 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-stone-700 flex-shrink-0"/>
                {c.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Map */}
      <div className="absolute left-52 top-[56px] right-0 bottom-0">
        <MapContainer
          center={[15.7802, 108.1998]}
          zoom={10}
          style={{ height: "100%", width: "100%" }}
          minZoom={10}
          maxZoom={10}
          zoomControl={false}
          scrollWheelZoom={false}
          doubleClickZoom={false}
          touchZoom={false}
          boxZoom={false}
          keyboard={false}
          dragging={false}
          maxBounds={[[14.9, 107.2], [16.4, 109.0]]}
          maxBoundsViscosity={1.0}
        >
          <TileLayer
            url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
            attribution="© Google Maps"
          />

          {visibleHeritages.map(h => (
            <Marker
              key={h.id}
              position={[h.lat, h.lng]}
              icon={makeMarkerIcon(h.type)}
              eventHandlers={{ click: () => setSelectedHeritage(h) }}
            >
              <Popup>
                <div className="min-w-[180px]">
                  <div className="font-bold text-sm mb-1">{h.name}</div>
                  <div className="text-xs text-gray-500 mb-2">📍 {h.address}</div>
                  <button
                    onClick={() => setSelectedHeritage(h)}
                    className="w-full bg-yellow-600/20 border border-yellow-600/40 text-yellow-700 text-xs py-1.5 rounded cursor-pointer hover:bg-yellow-600/30 transition"
                  >Xem chi tiết →</button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Detail panel */}
      <HeritagePanel
        heritage={selectedHeritage}
        onClose={() => setSelectedHeritage(null)}
      />
    </div>
  );
}