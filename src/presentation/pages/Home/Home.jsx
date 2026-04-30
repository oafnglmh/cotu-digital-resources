import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Play,
  MapPin,
  Clock,
  Users,
  Maximize2,
  ChevronRight,
  MessageCircle,
  Hash,
  Star,
  TreePine,
  Shirt,
  Music,
  Camera,
  Phone,
  Bot,
  Send,
  Sparkles,
  Loader2,
} from "lucide-react";
import {
  NAV_ITEMS,
  STATS,
  TRANG_PHUC_ITEMS,
  LE_HOI_ITEMS,
  LANG_ITEMS,
  GALLERY,
} from "../../../data/mockData";
import ReactDOM from "react-dom";
import bgImg from "../../../../public/assets/backgrfn.png";
import img1 from "../../../../public/assets/img01.png";
import img2 from "../../../../public/assets/img02.png";
import img3 from "../../../../public/assets/img03.png";
import img4 from "../../../../public/assets/img04.png";
import img5 from "../../../../public/assets/img05.png";
import img6 from "../../../../public/assets/img06.png";
import img7 from "../../../../public/assets/img07.png";

// ─── DESIGN TOKENS — Tone xanh rừng núi, sáng hơn ───────────────────────────
const C = {
  // Nền sáng — màu kem xanh nhẹ
  bg: "#F2F7F0",
  bgSub: "#E8F0E5",
  bgCard: "#FFFFFF",
  bgAccent: "#DFF0D8",
  bgDark: "#0D1F0A",
  bgDarkMid: "#162E10",

  // Màu chủ đạo — xanh rừng núi
  forest: "#2D6A2D",
  forestDeep: "#1A4A1A",
  forestMid: "#3D8A3D",
  forestLight: "#5AAD5A",

  // Vàng thổ cẩm — giữ bản sắc Cơ Tu
  gold: "#C9821A",
  goldLight: "#E8A832",
  goldPale: "#F5D080",

  // Đất nâu — điểm nhấn
  earth: "#6B4226",
  earthDeep: "#3E2010",
  earthLight: "#8B5A38",

  textDark: "#0D2010",
  textMid: "#2A5020",
  textLight: "#4A7040",
  textMuted: "#7A9070",

  border: "rgba(45,106,45,0.18)",
  borderMid: "rgba(45,106,45,0.32)",

  onDark: {
    text: "rgba(245,240,210,0.92)",
    textSub: "rgba(245,240,210,0.65)",
    textDim: "#fff",
    border: "rgba(245,240,210,0.18)",
    borderMid: "rgba(245,240,210,0.32)",
  },
};

// ─── Animation variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};
const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.93 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};
const stagger = (d = 0.1) => ({ show: { transition: { staggerChildren: d } } });

function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  return [ref, inView];
}

// ─── Shared decorative elements ───────────────────────────────────────────────
const TribalStrip = ({ size = 4 }) => (
  <div
    style={{
      height: size,
      width: "100%",
      flexShrink: 0,
      background: `repeating-linear-gradient(90deg,${C.forest} 0,${C.forest} 8px,${C.gold} 8px,${C.gold} 16px,${C.earth} 16px,${C.earth} 24px,${C.gold} 24px,${C.gold} 32px)`,
    }}
  />
);

const DiamondRow = ({ count = 7, size = 9, light = false }) => (
  <div
    style={{
      display: "flex",
      gap: 8,
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {Array.from({ length: count }, (_, i) => (
      <div
        key={i}
        style={{
          width: size,
          height: size,
          background: light
            ? i % 3 === 0
              ? C.goldPale
              : i % 3 === 1
                ? `${C.gold}80`
                : `${C.goldPale}50`
            : i % 3 === 0
              ? C.forest
              : i % 3 === 1
                ? C.gold
                : C.earth,
          transform: "rotate(45deg)",
          opacity: 0.65,
        }}
      />
    ))}
  </div>
);

const ThoCamBg = ({ opacity = 0.06 }) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      backgroundImage: `
      repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(45,106,45,${opacity}) 39px,rgba(45,106,45,${opacity}) 40px),
      repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(45,106,45,${opacity * 0.6}) 39px,rgba(45,106,45,${opacity * 0.6}) 40px)
    `,
    }}
  />
);

// ─── SectionTitle ─────────────────────────────────────────────────────────────
const SectionTitle = ({ label, title, subtitle, dark = false }) => {
  const [ref, inView] = useReveal();
  const accent = dark ? C.goldLight : C.forest;
  return (
    <motion.div
      ref={ref}
      variants={stagger()}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      style={{ textAlign: "center", marginBottom: 52 }}
    >
      <motion.div
        variants={fadeUp}
        style={{
          fontSize: 10,
          letterSpacing: ".3em",
          textTransform: "uppercase",
          color: accent,
          fontFamily: "'Crimson Pro',serif",
          marginBottom: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            height: 1,
            width: 32,
            background: `linear-gradient(90deg,transparent,${accent})`,
          }}
        />
        {label}
        <div
          style={{
            height: 1,
            width: 32,
            background: `linear-gradient(90deg,${accent},transparent)`,
          }}
        />
      </motion.div>

      <motion.h2
        variants={fadeUp}
        style={{
          fontSize: "clamp(26px,4vw,42px)",
          fontWeight: 700,
          lineHeight: 1.18,
          fontFamily: "'Playfair Display',serif",
          color: dark ? C.goldPale : C.textDark,
          marginBottom: 10,
        }}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={fadeUp}
          style={{
            fontSize: 15,
            fontFamily: "'Crimson Pro',serif",
            fontStyle: "italic",
            color: dark ? C.onDark.textSub : C.textLight,
            maxWidth: 540,
            margin: "0 auto",
          }}
        >
          {subtitle}
        </motion.p>
      )}

      <motion.div variants={fadeUp} style={{ marginTop: 14 }}>
        <DiamondRow light={dark} />
      </motion.div>
    </motion.div>
  );
};

// ─── CountUp hook ─────────────────────────────────────────────────────────────
const useCountUp = (end, duration = 1500) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);
  return count;
};

// ─── Header ───────────────────────────────────────────────────────────────────
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (href) => {
    document
      .getElementById(href.replace("#", ""))
      ?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 99999,
          background: scrolled ? "rgba(242,247,240,0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? `1px solid ${C.border}` : "none",
          transition: "all .3s ease",
          boxShadow: scrolled ? "0 2px 20px rgba(45,106,45,0.12)" : "none",
        }}
      >
        {scrolled && <TribalStrip size={3} />}
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            height: 64,
          }}
        >
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: `linear-gradient(135deg,${C.forest},${C.forestDeep})`,
                border: `1.5px solid ${C.gold}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 2px 10px rgba(45,106,45,.25)`,
              }}
            >
              <svg viewBox="0 0 24 24" style={{ width: 18, height: 18 }}>
                <polygon
                  points="12,2 20,8 20,16 12,22 4,16 4,8"
                  fill="none"
                  stroke={C.goldPale}
                  strokeWidth="1.5"
                />
                <polygon
                  points="12,6 17,10 17,15 12,19 7,15 7,10"
                  fill={C.goldPale}
                  opacity=".2"
                />
                <circle cx="12" cy="12" r="2.5" fill={C.goldPale} />
              </svg>
            </div>
            <div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  fontFamily: "'Playfair Display',serif",
                  lineHeight: 1.1,
                  color: scrolled ? C.textDark : "white",
                }}
              >
                Cotu Culture
              </div>
              <div
                style={{
                  fontSize: 8,
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                  color: scrolled ? C.forest : C.onDark.textDim,
                }}
              >
                Văn Hoá Cơ Tu
              </div>
            </div>
          </motion.div>

          {/* Desktop nav */}
          <nav
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            {NAV_ITEMS.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo(item.href)}
                style={{
                  padding: "7px 14px",
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                  background: "transparent",
                  color: scrolled ? C.textMid : "rgba(255,255,255,0.88)",
                  fontSize: 13,
                  fontFamily: "'Crimson Pro',serif",
                  fontWeight: 600,
                  letterSpacing: ".02em",
                  transition: "all .18s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = C.forest;
                  e.currentTarget.style.background = `rgba(45,106,45,.1)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = scrolled
                    ? C.textMid
                    : "rgba(255,255,255,0.88)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {item.label}
              </motion.button>
            ))}
          </nav>

          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="mobile-btn"
            style={{
              display: "none",
              marginLeft: 12,
              background: "none",
              border: "none",
              color: scrolled ? C.forest : "white",
              cursor: "pointer",
              padding: 4,
            }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: 280,
              zIndex: 99998,
              background: C.bg,
              borderLeft: `2px solid ${C.border}`,
              display: "flex",
              flexDirection: "column",
              padding: "80px 20px 30px",
              boxShadow: `-8px 0 40px rgba(45,106,45,.2)`,
            }}
          >
            <TribalStrip size={3} />
            <div
              style={{
                marginTop: 20,
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              {NAV_ITEMS.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ x: 4 }}
                  onClick={() => scrollTo(item.href)}
                  style={{
                    padding: "12px 16px",
                    borderRadius: 8,
                    border: "none",
                    cursor: "pointer",
                    background: "transparent",
                    color: C.textMid,
                    fontSize: 15,
                    fontFamily: "'Crimson Pro',serif",
                    fontWeight: 600,
                    textAlign: "left",
                  }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`@media(max-width:768px){nav{display:none!important}.mobile-btn{display:flex!important}}`}</style>
    </>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
// Stats cập nhật theo docx: 55.000+ người, 3 huyện, ~3600km², ~300 di sản
const HERO_STATS = [
  { value: 55000, label: "Dân Số" },
  { value: 3, label: "Huyện Cũ Quảng Nam" },
  { value: 3600, label: "km² Diện Tích" },
  { value: 300, label: "Tổng Di Sản" },
];

const StatCard = ({ value, label, delay }) => {
  const count = useCountUp(value);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ y: -6, scale: 1.03 }}
      style={{
        position: "relative",
        padding: "20px 28px",
        borderRadius: 18,
        textAlign: "center",
        minWidth: 120,
        background:
          "linear-gradient(145deg,rgba(0,0,0,0.6),rgba(10,25,10,0.45))",
        backdropFilter: "blur(1px)",
        border: `1px solid rgba(200,230,200,0.22)`,
        boxShadow: `0 10px 30px rgba(0,0,0,0.7),inset 0 0 20px rgba(100,200,100,0.05)`,
        transition: "all 0.3s ease",
        cursor: "default",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 18,
          background:
            "radial-gradient(circle at top,rgba(100,200,100,0.1),transparent 70%)",
          opacity: 0.6,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          fontSize: "clamp(22px,3vw,32px)",
          fontWeight: 700,
          color: C.goldPale,
          fontFamily: "'Playfair Display',serif",
          textShadow: `0 0 12px rgba(245,208,128,0.45)`,
        }}
      >
        {count.toLocaleString()}+
      </div>
      <div
        style={{
          width: 26,
          height: 2,
          background: `rgba(200,230,200,0.6)`,
          margin: "8px auto",
          borderRadius: 2,
        }}
      />
      <div
        style={{
          fontSize: 11,
          letterSpacing: ".08em",
          color: "rgba(220,240,220,0.75)",
        }}
      >
        {label}
      </div>
    </motion.div>
  );
};

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 150]);
  const opac = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section
      id="info"
      style={{
        position: "relative",
        height: "100vh",
        minHeight: 620,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <motion.div style={{ position: "absolute", inset: 0, y }}>
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundImage: `url(${bgImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.5) saturate() hue-rotate(10deg)",
          }}
        />
      </motion.div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(5,25,5,0.35) 0%, rgba(5,25,5,0.5) 60%, rgba(5,25,5,0.78) 100%)",
          zIndex: 1,
        }}
      />

      {/* Floating diamonds — xanh rừng */}
      {Array.from({ length: 20 }, (_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            left: `${5 + i * 4.5}%`,
            top: `${10 + Math.sin(i) * 35}%`,
            width: i % 3 === 0 ? 10 : 6,
            height: i % 3 === 0 ? 10 : 6,
            background:
              i % 3 === 0 ? C.gold : i % 3 === 1 ? `${C.forest}aa` : "#7DC87D",
            transform: "rotate(45deg)",
            opacity: 0.3,
            zIndex: 1,
          }}
          animate={{ y: [0, -20, 0], opacity: [0.15, 0.45, 0.15] }}
          transition={{
            duration: 4 + (i % 3),
            delay: i * 0.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 2,
        }}
      >
        <div
          style={{
            height: 10,
            background: `linear-gradient(to bottom,transparent,${C.bg})`,
          }}
        />
        <TribalStrip size={5} />
      </div>

      <motion.div
        style={{
          position: "relative",
          zIndex: 3,
          textAlign: "center",
          padding: "0 24px",
          maxWidth: 860,
          opacity: opac,
        }}
      >
        {/* Eyebrow label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          style={{
            fontSize: 11,
            letterSpacing: ".35em",
            textTransform: "uppercase",
            color: C.goldPale,
            fontFamily: "'Crimson Pro',serif",
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              height: 1,
              width: 40,
              background: `linear-gradient(90deg,transparent,${C.goldPale})`,
            }}
          />
          Di Sản Văn Hoá · Trường Sơn
          <div
            style={{
              height: 1,
              width: 40,
              background: `linear-gradient(90deg,${C.goldPale},transparent)`,
            }}
          />
        </motion.div>

        {/* Tiêu đề chính — theo docx */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: "clamp(30px,5.5vw,64px)",
            fontWeight: 700,
            lineHeight: 1.2,
            fontFamily: "'Playfair Display',serif",
            color: "white",
            marginBottom: 8,
            textShadow: `0 4px 30px rgba(45,150,45,.35)`,
          }}
        >
          Văn Hoá Người{" "}
          <span
            style={{
              background: `linear-gradient(135deg,${C.gold},${C.goldPale},${C.goldLight})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Cơ Tu
          </span>
          <br />
          Tại Thành Phố{" "}
          <span
            style={{
              background: `linear-gradient(135deg,${C.forestLight},#9FD49F)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Đà Nẵng
          </span>
        </motion.h1>

        {/* Subtitle — lời dẫn theo docx */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          style={{
            fontSize: "clamp(14px,2vw,18px)",
            color: "rgba(220,240,220,0.85)",
            fontFamily: "'Crimson Pro',serif",
            fontStyle: "italic",
            lineHeight: 1.75,
            marginBottom: 50,
          }}
        >
          Giữa đại ngàn Trường Sơn, văn hóa Cơ Tu không chỉ là ký ức của núi rừng,{" "}
          <br />
          mà còn là nhịp thở sống động của một dân tộc giữ hồn qua từng thế hệ.
        </motion.p>

        {/* Stats — theo docx */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 28,
            padding: "20px",
            width: "100%",
            borderRadius: 22,
            background: "rgba(5,20,5,0.5)",
            backdropFilter: "blur(10px)",
            border: `1px solid rgba(150,220,150,0.18)`,
          }}
        >
          {HERO_STATS.map((s, i) => (
            <StatCard key={i} value={s.value} label={s.label} delay={i * 0.15} />
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        style={{
          position: "absolute",
          bottom: 48,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
          cursor: "pointer",
        }}
        onClick={() =>
          document
            .getElementById("vat-the")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <ChevronDown size={24} style={{ color: "rgba(220,240,220,0.6)" }} />
      </motion.div>
    </section>
  );
}

// ─── ITEMS vật thể ────────────────────────────────────────────────────────────
const ITEMS = [
  { name: "Làng", type: "other", icon: "🏘️", desc: "Kiến trúc làng truyền thống" },
  { name: "Nhà Ở", type: "other", icon: "🏛️", desc: "Ngôi nhà linh hồn của làng" },
  { name: "Trang Phục", type: "trangphuc", icon: "👘", desc: "Thổ cẩm dệt tay tinh xảo" },
  { name: "Phương Tiện", type: "other", icon: "🛶", desc: "Công cụ đi lại núi rừng" },
  { name: "Ẩm Thực", type: "other", icon: "🍃", desc: "Hương vị đại ngàn Trường Sơn" },
  { name: "Công Cụ", type: "other", icon: "⚒️", desc: "Vật dụng truyền thống" },
];

const ITEMS_PHI = [
  { name: "Lễ hội", type: "festival", icon: "🥁", desc: "Nghi lễ cộng đồng" },
  { name: "Phong tục tập quán", type: "other", icon: "🤝", desc: "Nếp sống truyền thống" },
  { name: "Nghề thủ công", type: "other", icon: "🧵", desc: "Dệt, đan, chế tác" },
  { name: "Nghệ thuật dân gian", type: "other", icon: "💃", desc: "Hát múa dân gian" },
  { name: "Văn học dân gian", type: "other", icon: "📜", desc: "Truyện kể, sử thi" },
  { name: "Tri thức bản địa", type: "other", icon: "🌿", desc: "Hiểu biết về tự nhiên" },
];

// ─── INJECT GLOBAL CSS ONCE ───────────────────────────────────────────────────
const GLOBAL_CSS = `
  @keyframes cyberParticle {
    0%   { transform:translate(0,0); opacity:0; }
    50%  { opacity:1; }
    100% { transform:translate(calc(var(--px,0)*30px),calc(var(--py,0)*30px)); opacity:0; }
  }
  @keyframes cyberLineGrow {
    0%,100% { transform:scaleX(0); opacity:0; }
    50%     { transform:scaleX(1); opacity:1; }
  }
  @keyframes cyberScan {
    0%   { transform:translateY(-100%); }
    100% { transform:translateY(200%); }
  }
  .cc-inner { will-change:transform; }
  .cc-wrap:hover .cc-title  { opacity:1 !important; transform:translateY(-8px) !important; }
  .cc-wrap:hover .cc-prompt { opacity:0 !important; }
  .cc-wrap:hover .cc-glow   { opacity:1 !important; }
  .cc-wrap:hover .cc-particle { animation:cyberParticle 2s infinite !important; }
  .cc-wrap:hover .cc-glare  { opacity:1 !important; }
  .cc-wrap:hover .cc-corner {
    border-color:rgba(255,255,255,1) !important;
    box-shadow:0 0 12px rgba(255,255,255,0.6) !important;
  }
  .cc-wrap:active { transform:scale(0.96) !important; }
`;

function InjectStyles() {
  useEffect(() => {
    const id = "cotu-cyber-styles";
    if (!document.getElementById(id)) {
      const el = document.createElement("style");
      el.id = id;
      el.textContent = GLOBAL_CSS;
      document.head.appendChild(el);
    }
  }, []);
  return null;
}

// ─── LeHoi Modal ──────────────────────────────────────────────────────────────
function LeHoiModal({ initialIndex = 0, onClose }) {
  const [active, setActive] = useState(initialIndex);
  const [showVideo, setShowVideo] = useState(false);
  const item = LE_HOI_ITEMS[active];

  useEffect(() => { setShowVideo(false); }, [active]);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  function toEmbed(url) {
    if (!url) return null;
    if (url.includes("/embed/")) return url;
    const shortMatch = url.match(/youtu\.be\/([\w-]+)/);
    if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}?rel=0&modestbranding=1`;
    const m = url.match(/[?&]v=([\w-]+)/);
    if (m) return `https://www.youtube.com/embed/${m[1]}?rel=0&modestbranding=1`;
    return url;
  }

  const modal = (
    <motion.div
      key="lehoi-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2147483647,
        background: "rgba(5,20,5,0.97)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ height: 4, flexShrink: 0, background: `repeating-linear-gradient(90deg,${C.forest} 0,${C.forest} 8px,${C.gold} 8px,${C.gold} 16px,${C.earth} 16px,${C.earth} 24px,${C.gold} 24px,${C.gold} 32px)` }} />

      {/* STICKY HEADER */}
      <div style={{ position: "sticky", top: 0, zIndex: 10, background: "rgba(8,28,8,0.98)", borderBottom: `1px solid rgba(100,180,100,0.3)` }}>
        <div style={{ padding: "16px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: ".3em", textTransform: "uppercase", color: C.goldLight, fontFamily: "'Crimson Pro',serif", marginBottom: 3, display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 20, height: 1, background: `linear-gradient(90deg,transparent,${C.goldLight})` }} />
              Di Sản Phi Vật Thể
            </div>
            <div style={{ fontSize: 21, fontWeight: 700, color: "#F5D89A", fontFamily: "'Playfair Display',serif" }}>
              Lễ Hội & Nghi Lễ Truyền Thống
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.08, rotate: 90 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            style={{ width: 44, height: 44, borderRadius: "50%", background: `linear-gradient(135deg,${C.forest},${C.forestDeep})`, border: `1.5px solid ${C.gold}60`, color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 20px rgba(45,106,45,.55)`, flexShrink: 0 }}
          >
            <X size={17} />
          </motion.button>
        </div>

        {/* TABS */}
        <div style={{ padding: "0 28px 14px", display: "flex", gap: 8, flexWrap: "wrap" }}>
          {LE_HOI_ITEMS.map((h, i) => (
            <motion.button
              key={h.id || i}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActive(i)}
              style={{
                padding: "8px 18px", borderRadius: 10, cursor: "pointer",
                fontFamily: "'Crimson Pro',serif", fontSize: 13, fontWeight: 600, transition: "all .22s",
                background: active === i ? `linear-gradient(135deg,${h.color || C.forest},${C.forestDeep})` : "rgba(255,255,255,0.08)",
                border: `1.5px solid ${active === i ? h.color || C.forest : "rgba(100,180,100,0.25)"}`,
                color: active === i ? "white" : "#A8D4A8",
                boxShadow: active === i ? `0 4px 16px ${h.color || C.forest}40` : "none",
              }}
            >
              {h.name}
            </motion.button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ flex: 1, maxWidth: 1200, margin: "0 auto", width: "100%", padding: "32px 28px 60px" }}>
        <AnimatePresence mode="wait">
          <motion.article
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: 40, alignItems: "start" }}
            className="lh-modal-grid"
          >
            {/* LEFT — Hình ảnh / Video */}
            <div className="lh-modal-left" style={{ position: "sticky", top: 110, borderRadius: 16, overflow: "hidden", border: `1px solid rgba(100,180,100,0.2)`, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}>
              <div style={{ position: "relative", aspectRatio: "16/10", backgroundColor: "#0a120a" }}>
                {showVideo && item.video ? (
                  <iframe src={toEmbed(item.video)} style={{ width: "100%", height: "100%", border: "none" }} allowFullScreen allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture;web-share" title={item.name} />
                ) : (
                  <>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      onError={(e) => { e.target.src = `https://placehold.co/600x480/${(item.color || C.forest).replace("#", "")}/F2F7F0?text=${encodeURIComponent(item.name)}`; }}
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(5,25,5,.6) 0%,transparent 60%)" }} />
                    
                    <span style={{ position: "absolute", top: 16, left: 16, fontSize: 10, padding: "4px 14px", borderRadius: 20, background: `${item.color || C.forest}b3`, border: `1px solid ${item.color || C.forest}`, color: "white", letterSpacing: ".12em", textTransform: "uppercase", fontFamily: "'Crimson Pro',serif", backdropFilter: "blur(4px)" }}>
                      {item.tag}
                    </span>

                    {item.video && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowVideo(true)}
                        style={{ position: "absolute", inset: 0, margin: "auto", width: 64, height: 64, borderRadius: "50%", background: "rgba(5,25,5,.7)", border: `2px solid rgba(245,208,128,.6)`, color: "#F5D89A", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", backdropFilter: "blur(6px)", boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}
                        aria-label="Xem video"
                      >
                        <Play size={24} fill="#F5D89A" style={{ marginLeft: 4 }} />
                      </motion.button>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* RIGHT — Nội dung (Semantic HTML) */}
            <div style={{ padding: "8px 16px 24px 8px", display: "flex", flexDirection: "column", gap: 24 }}>
              <header>
                <h1 style={{ fontSize: "clamp(26px,3.5vw,42px)", fontWeight: 700, color: "#F5D89A", fontFamily: "'Playfair Display',serif", lineHeight: 1.15, marginBottom: 20 }}>
                  {item.name}
                </h1>
                
                {/* Meta info: Thời gian & Địa điểm */}
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ background: "rgba(245,208,128,0.1)", padding: 8, borderRadius: 8, color: C.goldLight, flexShrink: 0 }}>
                      <Clock size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: C.goldLight, fontFamily: "'Crimson Pro',serif", marginBottom: 4 }}>Thời gian tổ chức</div>
                      <div style={{ fontSize: 15.5, color: "#E8D5B0", fontFamily: "'Crimson Pro',serif", lineHeight: 1.6 }}>{item.thoiGian}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ background: "rgba(245,208,128,0.1)", padding: 8, borderRadius: 8, color: C.goldLight, flexShrink: 0 }}>
                      <MapPin size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: C.goldLight, fontFamily: "'Crimson Pro',serif", marginBottom: 4 }}>Địa điểm tổ chức</div>
                      <div style={{ fontSize: 15.5, color: "#E8D5B0", fontFamily: "'Crimson Pro',serif", lineHeight: 1.6 }}>{item.diaDiem}</div>
                    </div>
                  </div>
                </div>

                {item.quyTrinh && (
                  <div style={{ padding: "14px 18px", background: `linear-gradient(135deg, ${item.color || C.forest}15, transparent)`, border: `1px solid ${item.color || C.forest}30`, borderLeft: `4px solid ${item.color || C.forest}`, borderRadius: 10 }}>
                    <p style={{ fontSize: 16.5, color: "#E8D5B0", lineHeight: 1.7, fontFamily: "'Crimson Pro',serif", fontStyle: "italic", margin: 0 }}>
                      {item.quyTrinh}
                    </p>
                  </div>
                )}
              </header>

              <section>
                <h2 style={{ fontSize: 13, letterSpacing: ".2em", textTransform: "uppercase", color: C.goldLight, fontFamily: "'Crimson Pro',serif", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 24, height: 1, background: C.goldLight }} />
                  Hoạt động nổi bật
                </h2>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                  {(item.hoatDong || []).map((h, i) => (
                    <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: 16.5, color: "#E8D5B0", fontFamily: "'Crimson Pro',serif", lineHeight: 1.6 }}>
                      <div style={{ width: 6, height: 6, borderRadius: 1, background: C.goldLight, transform: "rotate(45deg)", flexShrink: 0, marginTop: 8, boxShadow: `0 0 8px ${C.goldLight}80` }} />
                      <span style={{ flex: 1 }}>{h}</span>
                    </motion.li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 style={{ fontSize: 13, letterSpacing: ".2em", textTransform: "uppercase", color: C.forest, fontFamily: "'Crimson Pro',serif", marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 24, height: 1, background: C.forest }} />
                  Ý nghĩa văn hoá
                </h2>
                <p style={{ fontSize: 16.5, color: "#C4D4B0", lineHeight: 1.8, fontFamily: "'Crimson Pro',serif", margin: 0, textAlign: "justify" }}>
                  {item.ynghia}
                </p>
              </section>

              <footer style={{ marginTop: 24, paddingTop: 24, borderTop: `1px dashed rgba(100,180,100,0.2)`, display: "flex", gap: 8, alignItems: "center", justifyContent: "center" }}>
                {Array.from({ length: 3 }, (_, i) => (
                  <div key={i} style={{ width: 6, height: 6, background: i === 1 ? "#F5D89A" : `${C.goldLight}60`, transform: "rotate(45deg)" }} />
                ))}
              </footer>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>

      <div style={{ position: "sticky", bottom: 0, flexShrink: 0, background: "linear-gradient(to top,rgba(5,20,5,0.97) 60%,transparent)", padding: "20px 28px", textAlign: "center" }} />
      <style>{`
        @media(max-width:768px){
          .lh-modal-grid{grid-template-columns:1fr !important; gap: 24px !important;}
          .lh-modal-left{position: relative !important; top: 0 !important;}
        }
      `}</style>
    </motion.div>
  );

  return ReactDOM.createPortal(<AnimatePresence>{modal}</AnimatePresence>, document.body);
}

// ─── CYBER CARD ───────────────────────────────────────────────────────────────
function CyberCard({ item, onClick }) {
  const wrapRef = useRef(null);
  const innerRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = wrapRef.current.getBoundingClientRect();
    const rotY = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 10;
    const rotX = -((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * 10;
    innerRef.current.style.transition = "80ms ease-out";
    innerRef.current.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    innerRef.current.style.filter = "brightness(1.13)";
  };

  const handleMouseLeave = () => {
    innerRef.current.style.transition = "500ms ease-in-out";
    innerRef.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
    innerRef.current.style.filter = "brightness(1)";
  };

  return (
    <div
      ref={wrapRef}
      className="cc-wrap"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ position: "relative", width: 200, height: 270, flexShrink: 0, cursor: "pointer", userSelect: "none", WebkitUserSelect: "none", transition: "transform 200ms" }}
    >
      <div
        ref={innerRef}
        className="cc-inner"
        style={{
          position: "absolute", inset: 0, display: "flex", flexDirection: "column",
          justifyContent: "center", alignItems: "center", borderRadius: 20,
          background: "linear-gradient(145deg, rgb(115, 175, 115) 0%, rgb(135, 195, 135) 50%, rgb(115, 175, 115) 100%)",
          border: "1.5px solid rgba(130,190,130,0.6)",
          overflow: "hidden",
          boxShadow: "0 0 30px rgba(115,175,115,0.4),inset 0 0 20px rgba(255,255,255,0.15)",
        }}
      >
        {/* Glare */}
        <div className="cc-glare" style={{ position: "absolute", inset: 0, opacity: 0, transition: "opacity 300ms", pointerEvents: "none", zIndex: 1, background: "linear-gradient(125deg,rgba(255,255,255,0) 0%,rgba(255,255,255,0.04) 45%,rgba(255,255,255,0.08) 50%,rgba(255,255,255,0.04) 55%,rgba(255,255,255,0) 100%)" }} />

        {/* Scan line */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1, background: "linear-gradient(to bottom,transparent,rgba(255,255,255,0.15),transparent)", animation: "cyberScan 3s linear infinite" }} />

        {/* Cyber lines */}
        {[{ top: "20%", origin: "left", delay: "0s" }, { top: "40%", origin: "right", delay: "1s" }, { top: "60%", origin: "left", delay: "2s" }, { top: "80%", origin: "right", delay: "1.5s" }].map((l, i) => (
          <div key={i} style={{ position: "absolute", top: l.top, left: 0, width: "100%", height: 1, background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)", transform: "scaleX(0)", transformOrigin: l.origin, animation: `cyberLineGrow 3s linear infinite ${l.delay}`, pointerEvents: "none", zIndex: 1 }} />
        ))}

        {/* Corners */}
        {[{ top: 10, left: 10, borderRight: "none", borderBottom: "none" }, { top: 10, right: 10, borderLeft: "none", borderBottom: "none" }, { bottom: 10, left: 10, borderRight: "none", borderTop: "none" }, { bottom: 10, right: 10, borderLeft: "none", borderTop: "none" }].map((s, i) => (
          <div key={i} className="cc-corner" style={{ position: "absolute", width: 14, height: 14, border: "1.5px solid rgba(255,255,255,0.6)", transition: "all 0.3s ease", pointerEvents: "none", zIndex: 2, ...s }} />
        ))}

        {/* Glow blobs */}
        {[{ top: -20, left: -20 }, { top: "50%", right: -30, transform: "translateY(-50%)" }, { bottom: -20, left: "30%" }].map((s, i) => (
          <div key={i} className="cc-glow" style={{ position: "absolute", width: 100, height: 100, borderRadius: "50%", background: `radial-gradient(circle,rgba(255,255,255,${i === 1 ? 0.6 : 0.4}) 0%,transparent 70%)`, filter: "blur(15px)", opacity: 0, transition: "opacity .3s", pointerEvents: "none", zIndex: 0, ...s }} />
        ))}

        {/* Particles */}
        {[{ px: 1, py: -1, top: "40%", left: "20%" }, { px: -1, py: -1, top: "60%", right: "20%" }, { px: 0.5, py: 1, top: "20%", left: "40%" }, { px: -0.5, py: 1, top: "80%", right: "40%" }, { px: 1, py: 0.5, top: "30%", left: "60%" }, { px: -1, py: 0.5, top: "70%", right: "60%" }].map((p, i) => (
          <div key={i} className="cc-particle" style={{ position: "absolute", width: 3, height: 3, background: "#FFF", borderRadius: "50%", opacity: 0, top: p.top, left: p.left || undefined, right: p.right || undefined, "--px": p.px, "--py": p.py, zIndex: 2, pointerEvents: "none" }} />
        ))}

        {/* CONTENT */}
        <div style={{ position: "relative", zIndex: 5, textAlign: "center", padding: "0 16px", width: "100%" }}>
          <div className="cc-title" style={{ opacity: 0, transform: "translateY(0px)", transition: "opacity 280ms ease,transform 280ms ease", position: "absolute", top: -62, left: 0, right: 0, pointerEvents: "none" }}>
            <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: ".12em", fontFamily: "'Playfair Display',serif", background: `linear-gradient(45deg, #1A401A, #2D6A2D)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", filter: "drop-shadow(0 0 10px rgba(255,255,255,0.5))" }}>
              {item.name.toUpperCase()}
            </div>
          </div>

          <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: ".06em", color: "#1A401A", fontFamily: "'Playfair Display',serif", marginBottom: 4 }}>
            {item.name}
          </div>

          <div style={{ width: 28, height: 1, margin: "6px auto", background: `linear-gradient(90deg,transparent,#1A401A,transparent)` }} />

          <div className="cc-prompt" style={{ fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: "#2D6A2D", fontFamily: "'Crimson Pro',serif", transition: "opacity 280ms" }}>
            {item.type === "trangphuc" || item.type === "festival" ? "NHẤN ĐỂ XEM" : "KHÁM PHÁ"}
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 18, left: 0, right: 0, textAlign: "center", zIndex: 5, pointerEvents: "none" }}>
          <div style={{ fontSize: 9, letterSpacing: ".12em", textTransform: "uppercase", color: "#1A401A", fontFamily: "'Crimson Pro',serif" }}>
            {item.desc}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── TRANG PHUC MODAL ─────────────────────────────────────────────────────────
// Nội dung đầy đủ 7 loại trang phục theo docx
const TRANG_PHUC_DATA = [
  {
    id: "aodooh",
    name: "Áo Doóh",
    tag: "Trang Phục Phụ Nữ",
    color: C.forestMid,
    mota: "Áo dệt từ sợi bông, thân áo là một tấm vải rộng khoảng 50 cm và dài khoảng 100 cm, được gấp đôi để tạo thành thân trước và thân sau. Phần cổ được khoét thành một đường dài khoảng 25 cm, hai bên sườn khâu lại tạo thành dáng áo cộc tay với cổ chữ V. Hoa văn trang trí thường xuất hiện ở vai, ngực và gấu áo với các màu đỏ, trắng hoặc vàng trên nền vải chàm đen.",
    ynghia: "Phụ nữ mặc phổ biến, dùng trong sinh hoạt hằng ngày và các lễ hội cộng đồng.",
    img: img1,
  },
  {
    id: "khof",
    name: "Khố (G'hul)",
    tag: "Trang Phục Nam Giới",
    color: C.earth,
    mota: "Đàn ông Cơ Tu ngày thường mặc khố chiều dài khoảng 1,5–2 m, rộng khoảng 25 cm, khi mặc ngắn đến đầu gối. Loại khố này có màu chàm đen, hoa văn đơn giản, rất thuận tiện cho việc đi rừng, làm rẫy và săn bắt thú. Khi tham gia lễ hội thì mặc khố rất dài từ 3–8 m, rộng khoảng 45 cm, khi mặc hai mảnh khối trước sau dài đến tận mắt cá chân.",
    ynghia: "Trước đây dùng trong đời sống hằng ngày, mặc khố ngắn để tiện đi rừng và làm rẫy. Hiện nay chủ yếu dùng để tham gia lễ hội và các nghi lễ cộng đồng.",
    img: img2,
  },
  {
    id: "vaydai",
    name: "Váy Dài (Chơđhoong)",
    tag: "Trang Phục Lễ Hội",
    color: C.forestMid,
    mota: "Váy dệt từ vải thổ cẩm, có chiều dài khoảng 6 m, được khâu lại thành hai lớp, mỗi lớp dài khoảng 3 m. Hộ sử dụng sợi dây lưng quấn trên ngực để làm chặt váy, toát lên vẻ nữ tính. Hoa văn trang trí cách điệu, tương tự hoa văn khố của nam giới nhưng tập trung thành một mảng lớn ở phần dưới thân váy. Các họa tiết trên thân váy thường đứng riêng lẻ bằng các vạch sọc như: hoa văn abloom, lá trầu.",
    ynghia: "Đây là trang phục lễ hội hoặc dịp đặc biệt của phụ nữ Cơ Tu. Phụ nữ mặc trong các nghi lễ quan trọng, cưới hỏi hoặc các sinh hoạt cộng đồng.",
    img: img3,
  },
  {
    id: "vayngan",
    name: "Váy Ngắn (Doóh)",
    tag: "Trang Phục Hằng Ngày",
    color: C.gold,
    mota: "Váy dệt từ vải thổ cẩm, chiều dài từ 80 cm và chiều rộng khoảng 70–80 cm. Có màu chàm đen, đính nhiều hoa văn bằng chì, ít sặc sỡ. Tấm vải được khâu lại tạo thành dạng hình ống. Khi mặc, váy được quấn quanh hông và cố định bằng dây buộc hoặc thắt lưng.",
    ynghia: "Trong sinh hoạt hằng ngày, phụ nữ thường mặc váy ngắn đến đầu gối để thuận tiện cho việc lao động và sinh hoạt. Trong các dịp lễ hội, váy có thể dài hơn và được trang trí nhiều hoa văn cầu kỳ.",
    img: img4,
  },
  {
    id: "thatlung",
    name: "Thắt Lưng (Cơteng Papah)",
    tag: "Phụ Kiện Trang Phục",
    color: C.forest,
    mota: "Thắt lưng dệt từ sợi bông, chiều dài khoảng 2 m, rộng khoảng 5 cm. Dây được dệt khá công phu, có màu trắng sữa hoặc xám. Có nhiều hoa văn hình học cách điệu, hoa văn mã nãi màu đen nhạt, hai đầu dây thường có các sợi tua dài nhiều màu khoảng 30 cm. Khi thắt, cơteng quấn hai vòng qua trước bụng ra sau lưng.",
    ynghia: "Có giá trị thẩm mỹ cao trong trang phục, tạo sự nổi bật và hoàn thiện bộ trang phục truyền thống.",
    img: img5,
  },
  {
    id: "vocay",
    name: "Trang Phục Vỏ Cây",
    tag: "Trang Phục Cổ Xưa",
    color: C.earthLight,
    mota: "Trang phục làm từ vỏ các loại cây rừng như Tro ra đang, Tà coóng hoặc mít rừng. Vỏ cây được bóc ra, nướng cho mềm rồi đập mỏng trước khi khâu lại thành áo hoặc khố. Loại trang phục này từng được nam giới Cơ Tu sử dụng trong giai đoạn trước khi nghề dệt vải phát triển rộng rãi.",
    ynghia: "Trang phục dùng để khoác vào người giúp chống giá rét và thích nghi với một số hoạt động như đi khai thác sông mây, phát rẫy, cắt lá lợp nhà và đặc biệt trong khi đi săn bắt ở rừng sâu.",
    img: img6,
  },
  {
    id: "khantrum",
    name: "Khăn Trùm Đầu Pr'nơng",
    tag: "Phụ Kiện Đội Đầu",
    color: C.forestLight,
    mota: "Là một tấm khăn dài với hai kiểu vấn khác nhau. Kiểu thứ nhất: chiếc khăn được vấn quanh đầu cho đến hết chiều dài của nó, điểm kết thúc nằm ở một bên đầu. Kiểu thứ hai: chiếc khăn chỉ quấn một vòng, múi thắt nằm ở phía sau gáy, hai dải khăn buông về phía sau vừa trùm đầu vừa che lưng. Trong lễ hội, các già làng thường quấn loại khăn này.",
    ynghia: "Trong sinh hoạt thường ngày, khăn có chức năng che chắn, giữ ấm. Trong lễ hội, khăn góp phần hoàn thiện trang phục và tăng tính thẩm mỹ, thể hiện sự chỉnh tề của người mặc.",
    img: img7,
  },
];

function TrangPhucModal({ onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const TpContent = ({ item }) => (
    <div>
      <div style={{ display: "inline-block", fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", padding: "3px 14px", borderRadius: 20, background: `${item.color || C.forest}35`, border: `1px solid ${item.color || C.forest}80`, color: item.color || C.goldLight, fontFamily: "'Crimson Pro',serif", marginBottom: 14 }}>
        {item.tag}
      </div>
      <h2 style={{ fontSize: "clamp(20px,2.5vw,28px)", fontWeight: 700, fontFamily: "'Playfair Display',serif", color: "#F5D89A", marginBottom: 12, lineHeight: 1.2 }}>
        {item.name}
      </h2>
      <p style={{ fontSize: 15, lineHeight: 1.85, color: "#E0D5B0", fontFamily: "'Crimson Pro',serif", marginBottom: 16 }}>
        {item.mota}
      </p>
      <div style={{ borderLeft: `3px solid ${C.goldLight}`, paddingLeft: 16 }}>
        <p style={{ fontSize: 13.5, lineHeight: 1.75, fontStyle: "italic", color: "#B8D4A8", fontFamily: "'Crimson Pro',serif" }}>
          {item.ynghia}
        </p>
      </div>
    </div>
  );

  const TpImage = ({ item }) => (
    <div style={{ borderRadius: 18, overflow: "hidden", border: `1px solid rgba(100,180,100,0.35)`, boxShadow: "0 16px 50px rgba(0,0,0,0.4)" }}>
      <img
        src={item.img || `https://placehold.co/500x420/${(item.color || C.forest).replace("#", "")}/F2F7F0?text=${encodeURIComponent(item.name)}`}
        alt={item.name}
        style={{ width: "100%", display: "block", objectFit: "cover", maxHeight: 460 }}
        onError={(e) => { e.target.src = `https://placehold.co/500x420/${(item.color || C.forest).replace("#", "")}/F2F7F0?text=${encodeURIComponent(item.name)}`; }}
      />
    </div>
  );

  const modal = (
    <motion.div
      key="tp-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      style={{ position: "fixed", inset: 0, zIndex: 2147483647, background: "rgba(5,20,5,0.97)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", overflowY: "auto" }}
    >
      <div style={{ height: 4, flexShrink: 0, background: `repeating-linear-gradient(90deg,${C.forest} 0,${C.forest} 8px,${C.gold} 8px,${C.gold} 16px,${C.earth} 16px,${C.earth} 24px,${C.gold} 24px,${C.gold} 32px)` }} />

      {/* Sticky header */}
      <div style={{ position: "sticky", top: 0, zIndex: 10, background: "rgba(8,28,8,0.98)", padding: "18px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid rgba(100,180,100,0.25)` }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: ".3em", textTransform: "uppercase", color: C.goldLight, fontFamily: "'Crimson Pro',serif", marginBottom: 4, display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 24, height: 1, background: `linear-gradient(90deg,transparent,${C.goldLight})` }} />
            Di Sản Vật Thể
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#F5D89A", fontFamily: "'Playfair Display',serif" }}>Trang Phục Cơ Tu</div>
        </div>
        <motion.button
          whileHover={{ scale: 1.08, rotate: 90 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          style={{ width: 46, height: 46, borderRadius: "50%", background: `linear-gradient(135deg,${C.forest},${C.forestDeep})`, border: `1.5px solid ${C.gold}60`, color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 20px rgba(45,106,45,.55)` }}
        >
          <X size={18} />
        </motion.button>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 28px 80px" }}>
        {/* Diamond decoration */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "center", marginBottom: 52 }}>
          {Array.from({ length: 9 }, (_, i) => (
            <div key={i} style={{ width: i % 3 === 0 ? 10 : 7, height: i % 3 === 0 ? 10 : 7, background: i % 3 === 0 ? "#F5D89A" : i % 3 === 1 ? `${C.goldLight}90` : `#F5D89A70`, transform: "rotate(45deg)", opacity: 0.8 }} />
          ))}
        </div>

        {/* 7 loại trang phục — bố cục xen kẽ theo docx */}
        {TRANG_PHUC_DATA.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.08 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 52, marginBottom: 88, alignItems: "center" }}
            className="tp-row"
          >
            {i % 2 === 0 ? (
              <><TpContent item={item} /><TpImage item={item} /></>
            ) : (
              <><TpImage item={item} /><TpContent item={item} /></>
            )}
          </motion.div>
        ))}
      </div>

      <style>{`@media(max-width:640px){.tp-row{grid-template-columns:1fr!important;gap:24px!important;}}`}</style>
    </motion.div>
  );

  return ReactDOM.createPortal(<AnimatePresence>{modal}</AnimatePresence>, document.body);
}

// ─── Di Sản Vật Thể Section ───────────────────────────────────────────────────
function DiSanVatThe3D() {
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState("");

  const handleClick = (item) => {
    if (item.type === "trangphuc") {
      setModal("trangphuc");
    } else {
      setToast(`🚧 "${item.name}" đang phát triển...`);
      setTimeout(() => setToast(""), 2200);
    }
  };

  return (
    <section
      id="vat-the"
      style={{ padding: "100px 0", background: C.bgAccent, position: "relative" }}
    >
      <ThoCamBg opacity={0.074} />
      <InjectStyles />
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(45,106,45, 0.04) 39px, rgba(45,106,45, 0.04) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(45,106,45, 0.024) 39px, rgba(45,106,45, 0.024) 40px)` }} />

      <SectionTitle
        label="Bảo Tàng Số"
        title="Di Sản Vật Thể"
        subtitle="Những hiện vật tiêu biểu của văn hóa Cơ Tu — từ kiến trúc đến trang phục truyền thống"
      />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        style={{ display: "flex", gap: 28, flexWrap: "wrap", justifyContent: "center", position: "relative", zIndex: 1 }}
      >
        {ITEMS.map((item, i) => (
          <motion.div
            key={i}
            variants={{ hidden: { opacity: 0, y: 40, scale: 0.92 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } }}
          >
            <CyberCard item={item} onClick={() => handleClick(item)} />
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            style={{ position: "fixed", bottom: 32, left: "50%", transform: "translateX(-50%)", background: "rgba(5,25,5,0.93)", color: C.goldPale, padding: "11px 22px", borderRadius: 10, fontSize: 13, fontFamily: "'Crimson Pro',serif", border: `1px solid ${C.onDark.border}`, backdropFilter: "blur(8px)", zIndex: 9999, boxShadow: "0 8px 30px rgba(0,0,0,0.5)" }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {modal === "trangphuc" && <TrangPhucModal onClose={() => setModal(null)} />}
    </section>
  );
}

// ─── Lễ Hội Section ───────────────────────────────────────────────────────────
// Nội dung lễ hội mừng lúa mới đầy đủ theo docx
const LE_HOI_STATIC = [
  {
    id: "luamoi",
    name: "Lễ Mừng Lúa Mới",
    tag: "Lễ Hội Truyền Thống",
    color: C.forest,
    image: "https://placehold.co/600x480/2D6A2D/F2F7F0?text=Lễ+Mừng+Lúa+Mới",
    video: "https://youtu.be/aFB_53Zz-uY?si=UfDWfnaNoOxkNW2w",
    thoiGian: "Tháng 10 Âm Lịch",
    diaDiem: "Nhà Gươl & Sân Làng",
    quyTrinh: "Lễ mừng lúa mới thường được tổ chức vào khoảng tháng 10 âm lịch, khi vụ thu hoạch lúa rẫy đã hoàn tất. Nghi lễ diễn ra theo hai cấp độ: trước hết là cúng riêng tại từng gia đình, sau đó là lễ hội chung của toàn làng.",
    hoatDong: [
      "Lễ cúng Giàng và các thần linh tự nhiên",
      "Nghi thức dựng cây nêu trước nhà Gươl",
      "Đâm trâu hiến sinh cầu mùa màng bội thu",
      "Hát lý — thể loại hát dân gian đặc sắc của Cơ Tu",
      "Múa tung tung da dá — điệu múa thiêng liêng",
      "Đánh cồng chiêng và uống rượu cần",
    ],
    ynghia: "Lễ mừng lúa mới không chỉ là nghi lễ tạ ơn thần linh đã phù hộ cho mùa màng mà còn thể hiện khát vọng về cuộc sống no đủ, bình an của cộng đồng. Đây còn là dịp củng cố sự gắn kết xã hội, duy trì các giá trị văn hóa truyền thống và tái khẳng định mối quan hệ hài hòa giữa con người với tự nhiên và thế giới tâm linh.",
  },
];

function LeHoiSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState("");

  const handleClick = (item) => {
    if (item.type === "festival") {
      setModalOpen(true);
    } else {
      setToast(`🚧 "${item.name}" đang phát triển...`);
      setTimeout(() => setToast(""), 2200);
    }
  };

  return (
    <section
      id="phi-vat"
      style={{ padding: "100px 0", background: C.bg, position: "relative", overflow: "hidden" }}
    >
      <InjectStyles />
      <ThoCamBg opacity={0.04} />
      <TribalStrip size={4} />

      <div style={{ maxWidth: 1390, margin: "0 auto", padding: "80px 24px 0", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ fontSize: 10, letterSpacing: ".35em", textTransform: "uppercase", color: C.forest, fontFamily: "'Crimson Pro',serif", marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
            {/* <div style={{ height: 1, width: 36, background: `linear-gradient(90deg,transparent,${C.forest})` }} />
            Di Sản Phi Vật Thể
            <div style={{ height: 1, width: 36, background: `linear-gradient(90deg,${C.forest},transparent)` }} /> */}
          </div>
          <h2 style={{ fontSize: "clamp(26px,4vw,42px)", fontWeight: 700, fontFamily: "'Playfair Display',serif", color: C.textDark, lineHeight: 1.18, marginBottom: 10 }}>
            Di Sản Phi Vật Thể
          </h2>
          <p style={{ fontSize: 15, fontFamily: "'Crimson Pro',serif", fontStyle: "italic", color: C.textLight, maxWidth: 540, margin: "0 auto" }}>
            Nhịp thở của cộng đồng Cơ Tu — tín ngưỡng, âm nhạc và vũ điệu núi rừng
          </p>
          <div style={{ marginTop: 16, display: "flex", gap: 8, alignItems: "center", justifyContent: "center" }}>
            {Array.from({ length: 7 }, (_, i) => (
              <div key={i} style={{ width: i % 3 === 0 ? 9 : 6, height: i % 3 === 0 ? 9 : 6, background: i % 3 === 0 ? C.forest : i % 3 === 1 ? `${C.gold}80` : `${C.forest}50`, transform: "rotate(45deg)", opacity: 0.55 }} />
            ))}
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          style={{ display: "flex", gap: 28, flexWrap: "wrap", justifyContent: "center", marginBottom: 20 }}
        >
          {ITEMS_PHI.map((item, i) => (
            <motion.div
              key={i}
              variants={{ hidden: { opacity: 0, y: 40, scale: 0.92 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } }}
            >
              <CyberCard item={item} onClick={() => handleClick(item)} />
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          style={{ textAlign: "center", fontSize: 12, color: C.textLight, fontFamily: "'Crimson Pro',serif", fontStyle: "italic", letterSpacing: ".06em", marginTop: 16 }}
        >
          Nhấn vào thẻ để khám phá chi tiết lễ hội · Chọn tab để xem từng loại hình
        </motion.p>

        
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            style={{ position: "fixed", bottom: 32, left: "50%", transform: "translateX(-50%)", background: "rgba(242,247,240,0.97)", color: C.textDark, padding: "11px 22px", borderRadius: 10, fontSize: 13, fontFamily: "'Crimson Pro',serif", border: `1px solid ${C.border}`, backdropFilter: "blur(8px)", zIndex: 9999, boxShadow: "0 8px 30px rgba(45,106,45,0.15)" }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {modalOpen && (
        <LeHoiModal
          initialIndex={0}
          onClose={() => setModalOpen(false)}
        />
      )}

      <style>{`@media(max-width:768px){.lehoi-preview-grid{grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
}

// ─── Mô Hình 3D Section ───────────────────────────────────────────────────────
const MODELS_3D = [
  {
    id: 1,
    title: "Guol House Aka",
    subtitle: "Toàn cảnh Nhà Gươl",
    src: "https://sketchfab.com/models/d8239ce423eb493c8942d3ae427e2046/embed?autostart=1&internal=1&tracking=0&ui_ar=0&ui_infos=0&ui_snapshots=1&ui_stop=0&ui_theatre=1&ui_watermark=0",
    href: "https://sketchfab.com/3d-models/guol-house-aka-d8239ce423eb493c8942d3ae427e2046",
    desc: "Mô hình 3D toàn cảnh Nhà Gươl — công trình kiến trúc linh hồn làng Cơ Tu.",
  },
  {
    id: 2,
    title: "Guol House Column",
    subtitle: "Chi tiết cột Nhà Gươl",
    src: "https://sketchfab.com/models/038d4ef6cde24b05a0d097e21a0c3ed9/embed?autostart=1&internal=1&tracking=0&ui_infos=0&ui_snapshots=1&ui_stop=0&ui_theatre=1&ui_watermark=0",
    href: "https://sketchfab.com/3d-models/guol-house-column-038d4ef6cde24b05a0d097e21a0c3ed9",
    desc: "Chi tiết hoa văn chạm khắc trên cột Nhà Gươl.",
  },
];

function Model3DSection() {
  const [ref, inView] = useReveal(0.06);
  return (
    <section
      id="model3d"
      style={{ padding: "100px 0", background: C.bgSub, position: "relative" }}
    >
      <TribalStrip size={4} />
      <ThoCamBg opacity={0.04} />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px 0", position: "relative", zIndex: 1 }}>
        <SectionTitle
          label="Kiến trúc · 3D"
          title="Nhà Gươl — Mô Hình 3D"
          subtitle="Xoay, phóng to, quan sát kiến trúc linh hồn làng Cơ Tu từ mọi góc độ"
        />
        <motion.div
          ref={ref}
          variants={stagger(0.14)}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(480px,1fr))", gap: 24 }}
        >
          {MODELS_3D.map((model) => (
            <motion.div
              key={model.id}
              variants={scaleIn}
              whileHover={{ y: -4, boxShadow: `0 20px 50px rgba(45,106,45,.18)` }}
              style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${C.border}`, background: C.bgCard, transition: "box-shadow .3s" }}
            >
              <div style={{ padding: "10px 16px", background: `linear-gradient(90deg,${C.forest}15,${C.bgAccent})`, borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  {[C.forest, C.gold, C.earth].map((c, i) => (
                    <div key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: c, opacity: 0.8 }} />
                  ))}
                  <span style={{ fontSize: 12, color: C.textMid, fontFamily: "'Crimson Pro',serif", marginLeft: 4 }}>{model.subtitle}</span>
                </div>
                <span style={{ fontSize: 9, padding: "2px 9px", borderRadius: 20, background: `${C.forest}12`, border: `1px solid ${C.forest}25`, color: C.forest, letterSpacing: ".12em", textTransform: "uppercase", fontFamily: "'Crimson Pro',serif" }}>3D · Vật thể</span>
              </div>
              <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%" }}>
                <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                  dangerouslySetInnerHTML={{ __html: `<iframe src="${model.src}" title="${model.title}" frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;"></iframe>` }}
                />
              </div>
              <div style={{ padding: "12px 16px", borderTop: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.textDark, fontFamily: "'Playfair Display',serif", marginBottom: 3 }}>{model.title}</div>
                <p style={{ fontSize: 12, color: C.textLight, fontFamily: "'Crimson Pro',serif", fontStyle: "italic", lineHeight: 1.5, marginBottom: 8 }}>{model.desc}</p>
                <span style={{ fontSize: 11, color: C.textMuted, fontFamily: "'Crimson Pro',serif" }}>🖱 Kéo xoay · Scroll zoom</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Liên Hệ Section ──────────────────────────────────────────────────────────
function LienHeSection() {
  const [ref, inView] = useReveal();
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", msg: "" });
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 10,
    background: C.bgSub,
    border: `1px solid ${C.border}`,
    color: C.textDark,
    fontSize: 14,
    fontFamily: "'Crimson Pro',serif",
    outline: "none",
    boxSizing: "border-box",
    transition: "border .2s",
  };

  return (
    <section
      id="lien-he"
      style={{ padding: "100px 0", background: C.bgAccent, position: "relative" }}
    >
      <TribalStrip size={4} />
      <ThoCamBg opacity={0.05} />
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "80px 24px 0", position: "relative", zIndex: 1 }}>
        <SectionTitle
          label="Kết nối & Giao lưu"
          title="Thắc Mắc & Trao Đổi"
          subtitle="Gửi câu hỏi hoặc chia sẻ cảm nhận về văn hóa Cơ Tu"
        />
        <motion.form
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          onSubmit={submit}
          style={{ borderRadius: 18, padding: "36px", background: C.bgCard, border: `1px solid ${C.border}`, boxShadow: `0 8px 40px rgba(45,106,45,.1)` }}
        >
          {[
            { key: "name", label: "Họ và tên", placeholder: "Nguyễn Văn A", type: "text" },
            { key: "email", label: "Email", placeholder: "email@example.com", type: "email" },
          ].map((f) => (
            <div key={f.key} style={{ marginBottom: 18 }}>
              <label style={{ display: "block", fontSize: 11, letterSpacing: ".15em", textTransform: "uppercase", color: C.forest, marginBottom: 6, fontFamily: "'Crimson Pro',serif" }}>{f.label}</label>
              <input
                type={f.type}
                placeholder={f.placeholder}
                value={form[f.key]}
                required
                onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = C.forest)}
                onBlur={(e) => (e.target.style.borderColor = C.border)}
              />
            </div>
          ))}
          <div style={{ marginBottom: 22 }}>
            <label style={{ display: "block", fontSize: 11, letterSpacing: ".15em", textTransform: "uppercase", color: C.forest, marginBottom: 6, fontFamily: "'Crimson Pro',serif" }}>Nội dung</label>
            <textarea
              placeholder="Thắc mắc hoặc chia sẻ..."
              rows={4}
              value={form.msg}
              required
              onChange={(e) => setForm((p) => ({ ...p, msg: e.target.value }))}
              style={{ ...inputStyle, resize: "vertical" }}
              onFocus={(e) => (e.target.style.borderColor = C.forest)}
              onBlur={(e) => (e.target.style.borderColor = C.border)}
            />
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            style={{ width: "100%", padding: "14px", borderRadius: 12, background: sent ? `linear-gradient(135deg,${C.forestMid},${C.forest})` : `linear-gradient(135deg,${C.forest},${C.forestDeep})`, border: `1px solid ${sent ? C.forestMid : C.gold}40`, color: "white", fontSize: 15, fontFamily: "'Crimson Pro',serif", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background .3s" }}
          >
            {sent ? "✓ Đã gửi thành công!" : <><MessageCircle size={15} /> Gửi tin nhắn</>}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: C.forestDeep, borderTop: `3px solid ${C.gold}` }}>
      <TribalStrip size={4} />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 32px", textAlign: "center" }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: C.goldPale, fontFamily: "'Playfair Display',serif", marginBottom: 4 }}>Cotu Culture</div>
        <div style={{ fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: C.onDark.textDim, marginBottom: 22 }}>VĂN HOÁ NGƯỜI CƠ TU TẠI THÀNH PHỐ ĐÀ NẴNG</div>
        <DiamondRow count={9} size={8} light />
        <div style={{ marginTop: 22, display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap", marginBottom: 20 }}>
          {["Thông Tin", "Di Sản Vật Thể", "Di Sản Phi Vật Thể", "Liên Hệ"].map((l) => (
            <span key={l} style={{ fontSize: 12, color: C.onDark.textDim, cursor: "pointer", fontFamily: "'Crimson Pro',serif", transition: "color .18s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.gold)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.onDark.textDim)}
            >{l}</span>
          ))}
        </div>
        <div style={{ fontSize: 12, color: `${C.goldPale}25`, fontFamily: "'Crimson Pro',serif" }}>
          © 2025 Cotu Culture · Bảo tồn và phát huy di sản văn hóa người Cơ Tu
        </div>
      </div>
    </footer>
  );
}

// ─── AI Chat Widget ───────────────────────────────────────────────────────────
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY ?? "";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent";

const SYSTEM_PROMPT = `Bạn là trợ lý AI chuyên về văn hóa người Cơ Tu tại Đà Nẵng, Việt Nam. 
Bạn có kiến thức sâu rộng về:
- Lịch sử và nguồn gốc người Cơ Tu ở vùng núi Đà Nẵng, Quảng Nam (dân số 55.000+, 3 huyện cũ Quảng Nam, diện tích ~3600km², ~300 di sản)
- Trang phục truyền thống: Áo Doóh, Khố G'hul, Váy dài Chơđhoong, Váy ngắn Doóh, Thắt lưng Cơteng Papah, Trang phục vỏ cây, Khăn trùm đầu Pr'nơng
- Lễ hội: Lễ hội mừng lúa mới (tháng 10 âm lịch tại Nhà Gươl), lễ đâm trâu Za Koonh, lễ cưới hỏi
- Kiến trúc: Nhà Gươl (nhà làng cộng đồng), nhà sàn truyền thống
- Âm nhạc và nghệ thuật: cồng chiêng, tù và, trống, điệu múa tung tung da dá, hát lý
- Thổ cẩm Cơ Tu với hoa văn hình học đặc sắc
- Phong tục tập quán và tín ngưỡng
- Địa bàn cư trú: huyện Hòa Vang (Đà Nẵng), Tây Giang, Đông Giang, Nam Giang (Quảng Nam)

Hãy trả lời bằng tiếng Việt, thân thiện và chuyên nghiệp. Câu trả lời ngắn gọn, dễ hiểu, khoảng 2-4 câu trừ khi cần giải thích chi tiết.`;

function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Xin chào! 👋 Tôi là trợ lý AI về văn hóa Cơ Tu. Bạn muốn tìm hiểu điều gì về văn hóa của người Cơ Tu tại Đà Nẵng?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, messages]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    const userMsg = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const history = messages.filter((m) => m.role !== "system").map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));
      history.push({ role: "user", parts: [{ text: trimmed }] });

      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: history,
          generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
        }),
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);
      const data = await response.json();
      const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "Xin lỗi, tôi không thể trả lời lúc này. Vui lòng thử lại.";
      setMessages((prev) => [...prev, { role: "assistant", content: aiText }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "assistant", content: "⚠️ Xin lỗi, có lỗi kết nối xảy ra. Vui lòng kiểm tra API key và thử lại.", isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const suggestedQuestions = ["Nhà Gươl là gì?", "Hoa văn thổ cẩm Cơ Tu", "Lễ hội mừng lúa mới", "Trang phục truyền thống"];

  return (
    <>
      <motion.button
        onClick={() => setIsOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        style={{ position: "fixed", bottom: 28, right: 28, zIndex: 99990, width: 60, height: 60, borderRadius: "50%", border: "none", cursor: "pointer", background: `linear-gradient(135deg, ${C.forest}, ${C.forestDeep})`, boxShadow: `0 6px 28px rgba(45,106,45,0.55), 0 0 0 3px ${C.gold}50`, display: "flex", alignItems: "center", justifyContent: "center", color: C.goldPale }}
        aria-label="Mở chat AI văn hóa Cơ Tu"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X size={24} /></motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }} style={{ position: "relative" }}>
              <Bot size={26} />
              <motion.div animate={{ scale: [1, 1.6], opacity: [0.6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }} style={{ position: "absolute", inset: -8, borderRadius: "50%", border: `2px solid ${C.gold}`, pointerEvents: "none" }} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.92 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "fixed", bottom: 100, right: 28, zIndex: 99989, width: "min(420px, calc(100vw - 32px))", height: "min(600px, calc(100vh - 140px))", display: "flex", flexDirection: "column", borderRadius: 20, overflow: "hidden", boxShadow: "0 24px 80px rgba(0,0,0,0.22), 0 4px 16px rgba(45,106,45,0.25)", border: `1px solid ${C.border}` }}
          >
            {/* Header */}
            <div style={{ background: `linear-gradient(135deg, ${C.forestDeep}, ${C.forest})`, padding: "16px 20px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
              <div style={{ width: 42, height: 42, borderRadius: "50%", background: `rgba(245,208,128,0.15)`, border: `1.5px solid ${C.gold}60`, display: "flex", alignItems: "center", justifyContent: "center", color: C.goldPale, flexShrink: 0 }}>
                <Sparkles size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 15, color: C.goldPale, lineHeight: 1.2 }}>Trợ Lý Văn Hóa Cơ Tu</div>
                <div style={{ fontSize: 11, color: `${C.goldPale}80`, fontFamily: "'Crimson Pro', serif", display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80" }} />
                  Powered by LMH
                </div>
              </div>
              <div style={{ display: "flex", gap: 3 }}>
                {[C.gold, C.forest, C.earth, C.gold].map((col, i) => (
                  <div key={i} style={{ width: 6, height: 6, background: col, transform: "rotate(45deg)", opacity: 0.7 }} />
                ))}
              </div>
            </div>

            <div style={{ height: 3, flexShrink: 0, background: `repeating-linear-gradient(90deg,${C.forest} 0,${C.forest} 6px,${C.gold} 6px,${C.gold} 12px,${C.earth} 12px,${C.earth} 18px,${C.gold} 18px,${C.gold} 24px)` }} />

            {/* Messages */}
            <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: 12, background: C.bg, backgroundImage: `repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(45,106,45,0.03) 39px,rgba(45,106,45,0.03) 40px)` }}>
              {messages.map((msg, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start", gap: 8, alignItems: "flex-end" }}>
                  {msg.role === "assistant" && (
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: `linear-gradient(135deg, ${C.forest}, ${C.forestDeep})`, border: `1px solid ${C.gold}40`, display: "flex", alignItems: "center", justifyContent: "center", color: C.goldPale, flexShrink: 0 }}>
                      <Bot size={14} />
                    </div>
                  )}
                  <div style={{ maxWidth: "78%", padding: "10px 14px", borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", background: msg.role === "user" ? `linear-gradient(135deg, ${C.forest}, ${C.forestDeep})` : msg.isError ? `rgba(239,68,68,0.08)` : "white", color: msg.role === "user" ? C.goldPale : msg.isError ? "#dc2626" : C.textDark, fontSize: 13.5, fontFamily: "'Crimson Pro', serif", lineHeight: 1.6, boxShadow: msg.role === "user" ? `0 3px 12px rgba(45,106,45,0.3)` : `0 2px 8px rgba(0,0,0,0.07)`, border: msg.role === "user" ? "none" : `1px solid ${msg.isError ? "rgba(239,68,68,0.2)" : C.border}`, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: `linear-gradient(135deg, ${C.forest}, ${C.forestDeep})`, border: `1px solid ${C.gold}40`, display: "flex", alignItems: "center", justifyContent: "center", color: C.goldPale, flexShrink: 0 }}>
                    <Bot size={14} />
                  </div>
                  <div style={{ padding: "12px 16px", borderRadius: "16px 16px 16px 4px", background: "white", border: `1px solid ${C.border}`, boxShadow: "0 2px 8px rgba(0,0,0,0.07)", display: "flex", gap: 4, alignItems: "center" }}>
                    {[0, 1, 2].map((i) => (
                      <motion.div key={i} animate={{ y: [0, -5, 0] }} transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }} style={{ width: 7, height: 7, borderRadius: "50%", background: C.forest, opacity: 0.7 }} />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {messages.length === 1 && (
              <div style={{ padding: "8px 16px", background: C.bgSub, borderTop: `1px solid ${C.border}`, display: "flex", flexWrap: "wrap", gap: 6, flexShrink: 0 }}>
                {suggestedQuestions.map((q) => (
                  <button key={q} onClick={() => { setInput(q); setTimeout(() => inputRef.current?.focus(), 50); }}
                    style={{ padding: "5px 10px", borderRadius: 20, border: `1px solid ${C.borderMid}`, background: "white", color: C.forest, fontSize: 11.5, fontFamily: "'Crimson Pro', serif", cursor: "pointer", transition: "all .18s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = C.forest; e.currentTarget.style.color = C.goldPale; e.currentTarget.style.borderColor = C.forest; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "white"; e.currentTarget.style.color = C.forest; e.currentTarget.style.borderColor = C.borderMid; }}
                  >{q}</button>
                ))}
              </div>
            )}

            {/* Input */}
            <div style={{ padding: "12px 16px", background: "white", borderTop: `1px solid ${C.border}`, display: "flex", gap: 8, alignItems: "flex-end", flexShrink: 0 }}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Hỏi về văn hóa Cơ Tu..."
                rows={1}
                style={{ flex: 1, border: `1.5px solid ${C.border}`, borderRadius: 12, padding: "9px 13px", fontSize: 13.5, fontFamily: "'Crimson Pro', serif", color: C.textDark, background: C.bg, resize: "none", outline: "none", lineHeight: 1.5, maxHeight: 100, overflowY: "auto", transition: "border-color .18s" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = C.forest)}
                onBlur={(e) => (e.currentTarget.style.borderColor = C.border)}
              />
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.93 }}
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                style={{ width: 40, height: 40, borderRadius: "50%", border: "none", cursor: isLoading || !input.trim() ? "not-allowed" : "pointer", background: isLoading || !input.trim() ? `rgba(45,106,45,0.3)` : `linear-gradient(135deg, ${C.forest}, ${C.forestDeep})`, color: C.goldPale, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all .18s", boxShadow: isLoading || !input.trim() ? "none" : `0 3px 12px rgba(45,106,45,0.4)` }}
              >
                {isLoading ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}><Loader2 size={16} /></motion.div>
                ) : (
                  <Send size={16} />
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── App root ─────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        body{background:${C.bg};overflow-x:hidden;-webkit-font-smoothing:antialiased}
        html{scroll-behavior:smooth}
        img{max-width:100%;display:block}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-track{background:${C.bgSub}}
        ::-webkit-scrollbar-thumb{background:${C.forest};border-radius:3px}
        ::-webkit-scrollbar-thumb:hover{background:${C.gold}}
        ::selection{background:rgba(45,106,45,.25);color:${C.textDark}}
        @media(max-width:768px){
          .two-col{grid-template-columns:1fr!important}
          .three-col{grid-template-columns:repeat(2,1fr)!important}
        }
        @media(max-width:480px){
          .three-col{grid-template-columns:1fr!important}
        }
      `}</style>

      <Header />
      <Hero />
      <DiSanVatThe3D />
      <LeHoiSection />
      {/* <Model3DSection /> */}
      <LienHeSection />
      <Footer />
      <AIChatWidget />
    </div>
  );
}