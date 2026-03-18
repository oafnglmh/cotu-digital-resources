import { useState } from "react";

const TYPE_CONFIG = {
  unesco:      { label: "UNESCO", bg: "bg-yellow-500/20", border: "border-yellow-500/50", text: "text-yellow-300" },
  vat_the:     { label: "Vật thể", bg: "bg-orange-500/20", border: "border-orange-500/50", text: "text-orange-300" },
  phi_vat_the: { label: "Phi vật thể", bg: "bg-teal-500/20", border: "border-teal-500/50", text: "text-teal-300" },
};

export default function HeritagePanel({ heritage, onClose }) {
  const [showVideo, setShowVideo] = useState(false);
  if (!heritage) return null;

  const cfg = TYPE_CONFIG[heritage.type] || TYPE_CONFIG.vat_the;

  return (
    <div className="absolute top-0 right-0 h-full w-[380px] bg-stone-950/95 border-l border-yellow-900/30 z-[1000] flex flex-col shadow-2xl">
      
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/5 border border-white/10 text-stone-400 hover:text-white hover:bg-white/10 transition flex items-center justify-center text-lg"
      >✕</button>

      {/* Image / Video */}
      <div className="relative w-full h-52 bg-stone-900 flex-shrink-0 overflow-hidden">
        {showVideo && heritage.video ? (
          <iframe src={heritage.video} className="w-full h-full" allowFullScreen />
        ) : (
          <>
            <img
              src={heritage.image} alt={heritage.name}
              className="w-full h-full object-cover opacity-90"
              onError={e => e.target.src = "https://placehold.co/380x208/1c1917/c9a84c?text=Di+sản"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 to-transparent" />
            {heritage.video && (
              <button
                onClick={() => setShowVideo(true)}
                className="absolute bottom-3 right-3 bg-black/70 border border-white/20 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 hover:bg-yellow-600/40 transition"
              >▶ Xem video</button>
            )}
          </>
        )}
      </div>

      {/* Header */}
      <div className="px-5 py-4 border-b border-yellow-900/20 bg-yellow-950/10 flex-shrink-0">
        <span className={`text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full border ${cfg.bg} ${cfg.border} ${cfg.text} mb-2 inline-block`}>
          {cfg.label}
        </span>
        <h2 className="text-xl font-bold text-yellow-200 font-serif leading-snug">{heritage.name}</h2>
        <p className="text-xs text-stone-500 mt-1 flex items-center gap-1">📍 {heritage.location || heritage.address}</p>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        {[
          ["📅", "Niên đại", heritage.year],
          ["🏛", "Loại hình", heritage.category],
          ["📍", "Địa chỉ", heritage.address],
        ].map(([icon, label, val]) => (
          <div key={label} className="flex gap-3 p-3 bg-yellow-950/10 border border-yellow-900/15 rounded-lg">
            <span className="text-sm mt-0.5">{icon}</span>
            <div>
              <div className="text-[9px] tracking-widest text-stone-600 uppercase mb-1">{label}</div>
              <div className="text-sm text-stone-300">{val}</div>
            </div>
          </div>
        ))}

        <div className="p-4 bg-black/20 border border-white/5 rounded-lg">
          <div className="text-[9px] tracking-widest text-stone-600 uppercase mb-2">Mô tả</div>
          <p className="text-sm text-stone-400 leading-relaxed italic">{heritage.desc}</p>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {heritage.tags?.map(t => (
            <span key={t} className="text-[10px] px-2.5 py-1 rounded-full bg-yellow-900/20 border border-yellow-800/30 text-yellow-700">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}