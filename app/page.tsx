import SceneCanvas from "@/components/SceneCanvas";
import SmoothScroll from "@/components/SmoothScroll";
import LoadingScreen from "@/components/LoadingScreen";
import Nav from "@/components/Nav";
import HUD from "@/components/HUD";
import SoundControls from "@/components/SoundControls";
import DayNightToggle from "@/components/DayNightToggle";
import WeaponWheel from "@/components/WeaponWheel";
import Crosshair from "@/components/Crosshair";
import BulletShots from "@/components/BulletShots";
import CheatCodes from "@/components/CheatCodes";
import CheatMenu from "@/components/CheatMenu";
import CheatEffects from "@/components/CheatEffects";
import GameBanner from "@/components/GameBanner";
import MissionModal from "@/components/MissionModal";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import HackGame from "@/components/HackGame";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <LoadingScreen />
      <SceneCanvas />
      <div className="screen-fx" />

      {/* game systems / HUD */}
      <HUD />
      <Nav />
      <SoundControls />
      <DayNightToggle />
      <WeaponWheel />
      <Crosshair />
      <BulletShots />
      <CheatCodes />
      <CheatMenu />
      <CheatEffects />
      <GameBanner />
      <MissionModal />

      <div className="content-layer">
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <HackGame />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
