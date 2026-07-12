"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { identity } from "@/data/portfolio";
import { AboutSection, ContactSection, ExperienceSection, SkillsSection } from "./ArchiveSections";
import { ProjectSection } from "./ProjectSection";
import { SpaceScene } from "./scene/SpaceScene";

const nav = ["profile", "projects", "trajectory", "systems", "contact"];

export function PortfolioExperience() {
  const [active, setActive] = useState("profile");
  const shell = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (current?.target.id) setActive(current.target.id);
      },
      { threshold: [0.25, 0.5], rootMargin: "-15% 0px -55%" },
    );
    nav.forEach((id) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const syncWithHash = () => {
      const next = window.location.hash.replace("#", "");
      if (nav.includes(next)) setActive(next);
    };
    syncWithHash();
    window.addEventListener("hashchange", syncWithHash);
    return () => window.removeEventListener("hashchange", syncWithHash);
  }, []);

  useEffect(() => {
    const updateSpatialField = (event: PointerEvent) => {
      if (!shell.current) return;
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      shell.current.style.setProperty("--pointer-x", x.toFixed(3));
      shell.current.style.setProperty("--pointer-y", y.toFixed(3));
    };

    window.addEventListener("pointermove", updateSpatialField, { passive: true });
    return () => window.removeEventListener("pointermove", updateSpatialField);
  }, []);

  return (
    <main ref={shell} className={`mission-shell mission-shell--${active}`}>
      <SpaceScene activeSection={active} />
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <header className="topbar">
        <a className="brand" href="#profile"><span>ZK</span><strong>ZAKARIA KHAN</strong></a>
        <nav aria-label="Portfolio navigation">
          {nav.map((item) => (
            <a
              key={item}
              className={active === item ? "active" : ""}
              href={`#${item}`}
              aria-current={active === item ? "page" : undefined}
              onClick={() => setActive(item)}
            >
              {item}
            </a>
          ))}
        </nav>
      </header>

      <section id="profile" className="hero section-shell">
        <motion.div className="hero-content" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
          <p className="kicker">SOFTWARE ENGINEER / AI SYSTEMS</p>
          <h1><span>ZAKARIA</span><strong>KHAN</strong></h1>
          <p className="hero-statement">{identity.statement}</p>
          <div className="hero-actions">
            <a className="primary-action" href="#projects">VIEW WORK</a>
            <a href={identity.linkedin} target="_blank" rel="noreferrer">LINKEDIN</a>
          </div>
        </motion.div>
      </section>

      <AboutSection />
      <ProjectSection />
      <ExperienceSection />
      <SkillsSection />
      <ContactSection />
    </main>
  );
}
