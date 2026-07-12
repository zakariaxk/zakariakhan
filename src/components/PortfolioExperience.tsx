"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { identity } from "@/data/portfolio";
import { SpaceScene } from "./scene/SpaceScene";
import { ProjectSection } from "./ProjectSection";

const sections = ["hero", "about", "projects", "experience", "skills", "contact"];

export function PortfolioExperience() {
  const [entered, setEntered] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const audioContext = useRef<AudioContext | null>(null);
  const audioNodes = useRef<{ oscillator: OscillatorNode; gain: GainNode } | null>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 70, damping: 24, restDelta: 0.001 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: "-18% 0px -45%" },
    );

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [entered]);

  useEffect(() => {
    return () => {
      audioNodes.current?.oscillator.stop();
      void audioContext.current?.close();
    };
  }, []);

  const toggleSound = () => {
    if (!soundEnabled) {
      const AudioContextClass = window.AudioContext;
      const context = audioContext.current ?? new AudioContextClass();
      audioContext.current = context;
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = 54;
      gain.gain.value = 0.018;
      oscillator.connect(gain).connect(context.destination);
      oscillator.start();
      audioNodes.current = { oscillator, gain };
      void context.resume();
      setSoundEnabled(true);
    } else {
      const nodes = audioNodes.current;
      if (nodes && audioContext.current) {
        nodes.gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.current.currentTime + 0.45);
        window.setTimeout(() => {
          nodes.oscillator.stop();
          audioNodes.current = null;
        }, 500);
      }
      setSoundEnabled(false);
    }
  };

  const navItems = useMemo(
    () => sections.map((id, index) => ({ id, index: String(index + 1).padStart(2, "0") })),
    [],
  );

  return (
    <main className={`archive ${entered ? "archive--entered" : ""}`}>
      <SpaceScene entered={entered} activeSection={activeSection} selectedProject={selectedProject} />

      <AnimatePresence>
        {!entered && (
          <motion.section
            className="arrival"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.025, filter: "blur(8px)" }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="arrival__coordinates" aria-hidden="true">
              <span>RA 17H 45M 40.04S</span>
              <span>DEC −29° 00′ 28.1″</span>
            </div>
            <div className="arrival__content">
              <p className="eyebrow">A signal persists beyond the known map.</p>
              <button className="entry-trigger" onClick={() => setEntered(true)}>
                <span>Enter archive</span>
                <span className="entry-trigger__mark" aria-hidden="true">↗</span>
              </button>
            </div>
            <div className="arrival__status">
              <span className="status-pulse" />
              LISTENING / 00.0012 Hz
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {entered && (
          <motion.div
            className="interface"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.3, delay: 0.35 }}
          >
            <header className="hud">
              <a className="hud__identity" href="#hero" aria-label="Return to hero">
                <span className="hud__sigil">ZK</span>
                <span>
                  <strong>SIGNAL ARCHIVE</strong>
                  <small>OPERATOR / {identity.name.toUpperCase()}</small>
                </span>
              </a>

              <nav className="hud__nav" aria-label="Portfolio sections">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={activeSection === item.id ? "is-active" : ""}
                    aria-label={`Go to ${item.id}`}
                  >
                    <span>{item.index}</span>
                    <i />
                    <em>{item.id}</em>
                  </a>
                ))}
              </nav>

              <button className="sound-toggle" onClick={toggleSound} aria-pressed={soundEnabled}>
                <span className={`sound-bars ${soundEnabled ? "is-active" : ""}`} aria-hidden="true">
                  <i /><i /><i />
                </span>
                {soundEnabled ? "Sound on" : "Sound off"}
              </button>
            </header>

            <motion.div className="progress-rail" aria-hidden="true">
              <motion.span style={{ scaleY: progress }} />
            </motion.div>

            <section id="hero" className="section hero-section">
              <div className="hero-copy">
                <p className="eyebrow">{identity.designation}</p>
                <h1>
                  <span>{identity.name.split(" ")[0]}</span>
                  <span>{identity.name.split(" ").slice(1).join(" ")}</span>
                </h1>
                <p className="hero-copy__statement">{identity.statement}</p>
              </div>
              <div className="hero-readout" aria-hidden="true">
                <span>OBJECT / SGR A*</span>
                <strong>GRAVITATIONAL ANOMALY</strong>
                <span>DISTANCE 26,000 LY</span>
              </div>
              <a className="scroll-cue" href="#about">
                <span>Begin descent</span>
                <i />
              </a>
            </section>

            <div id="about" className="section section-placeholder" aria-label="About section anchor" />
            <ProjectSection selectedId={selectedProject} onSelect={setSelectedProject} />
            <div id="experience" className="section section-placeholder" aria-label="Experience section anchor" />
            <div id="skills" className="section section-placeholder" aria-label="Skills section anchor" />
            <div id="contact" className="section section-placeholder" aria-label="Contact section anchor" />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="noise" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
    </main>
  );
}
