import { useState } from "react";
import { Map, BookOpen, Globe, ChevronDown, Landmark } from "lucide-react";
import "./css/Header.css";
import { Link } from "react-router-dom";

// ─── i18n ─────────────────────────────────────────────────────────────────────
const I18N = {
  vi: {
    appName:    "Di sản Quảng Nam",
    tagline:    "Số hoá · Bảo tồn · Lan toả",
    tab_map:    "Bản đồ",
    tab_book:   "Sách",
    lang_label: "Ngôn ngữ",
    lang_vi:    "Tiếng Việt",
    lang_en:    "English",
  },
  en: {
    appName:    "Quảng Nam Heritage",
    tagline:    "Digitise · Preserve · Inspire",
    tab_map:    "Map",
    tab_book:   "Book",
    lang_label: "Language",
    lang_vi:    "Tiếng Việt",
    lang_en:    "English",
  },
};

// ─── Language Switcher ────────────────────────────────────────────────────────
function LangSwitcher({ lang, setLang, t }) {
  const [open, setOpen] = useState(false);

  const options = [
    { code: "vi", label: t.lang_vi, flag: "🇻🇳" },
    { code: "en", label: t.lang_en, flag: "🇬🇧" },
  ];
  const current = options.find(o => o.code === lang);

  return (
    <div style={{ position: "relative" }}>
      {/* Trigger */}
      <button
        onClick={() => setOpen(o => !o)}
        className={`cotu-lang-btn ${open ? "open" : ""}`}
      >
        <Globe size={13} className="globe-icon" />
        <span>{current?.flag}</span>
        <span className="lang-text">{current?.label}</span>
        <ChevronDown size={11} className="chevron" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="cotu-lang-dropdown">
          <div className="cotu-lang-dropdown-header">
            <Globe size={9} />
            {t.lang_label}
          </div>
          {options.map(o => {
            const isActive = lang === o.code;
            return (
              <button
                key={o.code}
                onClick={() => { setLang(o.code); setOpen(false); }}
                className={`cotu-lang-option ${isActive ? "active" : ""}`}
              >
                <span className="flag">{o.flag}</span>
                <span className="lang-name">{o.label}</span>
                {isActive && <span className="cotu-active-dot" />}
              </button>
            );
          })}
        </div>
      )}

      {/* Backdrop */}
      {open && (
        <div
          className="cotu-backdrop"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
}

// ─── Tab button ───────────────────────────────────────────────────────────────
function TabBtn({ icon: Icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`cotu-tab ${active ? "active" : ""}`}
    >
      <Icon size={15} className="cotu-tab-icon" />
      <span>{label}</span>
    </button>
  );
}

export default function Header({
  activeTab:    activeTabProp,
  onTabChange:  onTabChangeProp,
  lang:         langProp,
  onLangChange: onLangChangeProp,
  children,
}) {
  const [_tab,  _setTab]  = useState("map");
  const [_lang, _setLang] = useState("vi");

  const activeTab    = activeTabProp    ?? _tab;
  const setActiveTab = onTabChangeProp  ?? _setTab;
  const lang         = langProp         ?? _lang;
  const setLang      = onLangChangeProp ?? _setLang;

  const t = I18N[lang] || I18N.vi;

  return (
    <header className="cotu-header">
      <div className="cotu-header-inner">

        {/* ── Brand ── */}
        <div className="cotu-brand">
          <div className="cotu-logo-box">
            <Landmark size={18} className="cotu-logo-icon" />
          </div>
          <div>
            <div className="cotu-app-name">{t.appName}</div>
            <div className="cotu-tagline">{t.tagline}</div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="cotu-divider" />

        {/* ── Tabs ── */}
        <nav className="cotu-nav">
          <Link to="/" style={{ textDecoration: "none" }}>
            <TabBtn
              icon={Globe}
              label={t.tab_map}
              active={activeTab === "map"}
              onClick={() => setActiveTab("map")}
            />
          </Link>
          <Link to="/book" style={{ textDecoration: "none" }}>
            <TabBtn
              icon={BookOpen}
              label={t.tab_book}
              active={activeTab === "book"}
              onClick={() => setActiveTab("book")}
            />
          </Link>
        </nav>

        {/* ── Optional children slot ── */}
        {children ? (
          <>
            <div className="cotu-slot-divider" />
            <div className="cotu-slot">{children}</div>
          </>
        ) : (
          <div className="cotu-spacer" />
        )}

        {/* ── Language switcher ── */}
        <LangSwitcher lang={lang} setLang={setLang} t={t} />

      </div>
    </header>
  );
}