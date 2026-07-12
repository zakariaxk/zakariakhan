"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { identity } from "@/data/portfolio";
import { AboutSection, ContactSection, ExperienceSection, SkillsSection } from "./ArchiveSections";
import { ProjectSection } from "./ProjectSection";
import { SpaceScene } from "./scene/SpaceScene";

const nav = ["profile", "projects", "trajectory", "systems", "contact"];

export function PortfolioExperience() {
  const [active, setActive] = useState("profile");
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

  return (
    <main className="mission-shell">
      <SpaceScene activeSection={active} />
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <header className="topbar">
        <a className="brand" href="#profile"><span>ZK</span><strong>ZAKARIA KHAN</strong></a>
        <nav aria-label="Portfolio navigation">
          {nav.map((item, index) => <a key={item} className={active === item ? "active" : ""} href={`#${item}`}><small>0{index + 1}</small>{item}</a>)}
        </nav>
        <a className="status-link" href={`mailto:${identity.email}`}><i /> OPEN TO OPPORTUNITIES</a>
      </header>

      <section id="profile" className="hero section-shell">
        <div className="hero-backdrop" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />
        <motion.div className="hero-content" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
          <p className="kicker">MISSION PROFILE / SOFTWARE ENGINEERING</p>
          <h1><span>ZAKARIA</span><strong>KHAN</strong></h1>
          <p className="hero-statement">{identity.statement}</p>
          <div className="hero-actions">
            <a className="primary-action" href="#projects">EXPLORE SYSTEMS <span>↘</span></a>
            <a href={identity.linkedin} target="_blank" rel="noreferrer">LINKEDIN ↗</a>
          </div>
        </motion.div>
        <aside className="hero-telemetry">
          <span>OPERATOR</span><strong>SOFTWARE ENGINEER</strong>
          <span>ORIGIN</span><strong>ORLANDO, FL</strong>
          <span>EDUCATION</span><strong>UCF / COMPUTER SCIENCE</strong>
          <span>GPA</span><strong>3.82 / 4.00</strong>
        </aside>
        <div className="hero-coordinate">ASTRONAUT 01 <i /> UNKNOWN SYSTEM ∞</div>
      </section>

      <AboutSection />
      <ProjectSection />
      <ExperienceSection />
      <SkillsSection />
      <ContactSection />
    </main>
  );
}
