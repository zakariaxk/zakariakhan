"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects } from "@/data/portfolio";

export function ProjectSection() {
  const [selected, setSelected] = useState(0);
  const project = projects[selected];

  return (
    <section id="projects" className="section-shell projects">
      <header className="section-intro">
        <div><p className="kicker">SELECTED WORK / 03 SYSTEMS</p><h2>Systems with<br /><em>measurable gravity.</em></h2></div>
        <p>Each project is presented as an operational system with a mission, architecture, and verified performance signal.</p>
      </header>
      <div className="project-console">
        <div className="project-index" role="tablist" aria-label="Projects">
          {projects.map((item, index) => (
            <button key={item.id} role="tab" aria-selected={selected === index} onClick={() => setSelected(index)}>
              <span>{item.code}</span><strong>{item.name}</strong><i>{selected === index ? "ACTIVE" : "OPEN"}</i>
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.article key={project.id} className="project-panel" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35 }}>
            <header><span>{project.status}</span><b>{project.code}</b></header>
            <h3>{project.name}</h3>
            <p className="project-summary">{project.summary}</p>
            <div className="metrics">{project.metrics.map((metric) => <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</div>
            <ul>{project.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
            <div className="stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  );
}
