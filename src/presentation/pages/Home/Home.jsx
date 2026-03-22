import { GlobalCSS } from "../../../components/SharedUI";
import Navbar from "../../../components/Navbar";
import HeroSection from "../../../components/HeroSection";
import {
  LangSection,
  TrangPhucSection,
  LeHoiSection,
  NgheSection,
  GallerySection,
  ContactSection,
  Footer,
  Model3DSection,
} from "../../../components/Sections";

export default function Home() {
  return (
    <>
      {/* ── Global styles (scrollbar, fonts, resets) ── */}
      <GlobalCSS/>

      {/* ── Layout ── */}
      <Navbar/>
      <HeroSection/>
      <LangSection/>
      <TrangPhucSection/>
      <LeHoiSection/>
      <NgheSection/>
      <Model3DSection/>
      <GallerySection/>
      <ContactSection/>
      <Footer/>
    </>
  );
}