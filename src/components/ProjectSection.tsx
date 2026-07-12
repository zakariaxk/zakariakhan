"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects } from "@/data/portfolio";

const artifactPositions = [
  { x: "14%", y: "30%", delay: "-2s" },
  { x: "82%", y: "24%", delay: "-7s" },
  { x: "76%", y: "73%", delay: "-11s" },
  { x: "18%", y: "76%", delay: "-4s" },
  { x: "49%", y: "12%", delay: "-9s" },
];

export function ProjectSection() {
  const [selected, setSelected] = useState(0);
  const field = useRef<HTMLDivElement>(null);
  const project = projects[selected];

  const moveField = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = field.current?.getBoundingClientRect();
    if (!bounds || !field.current) return;
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    field.current.style.setProperty("--field-x", `${x * 26}px`);
    field.current.style.setProperty("--field-y", `${y * 20}px`);
  };

  return (
    <section id="projects" className="section-shell projects">
      <header className="section-intro project-intro">
        <div><p className="kicker">SELECTED SYSTEMS</p><h2>Work shaped by<br /> <em>real constraints.</em></h2></div>
        <p>Select a world to inspect the engineering behind it.</p>
      </header>

      <div ref={field} className="artifact-field" onPointerMove={moveField} onPointerLeave={() => { field.current?.style.setProperty("--field-x", "0px"); field.current?.style.setProperty("--field-y", "0px"); }}>
        {projects.map((item, index) => (
          <button
            key={item.id}
            className={`artifact artifact--${index + 1} ${selected === index ? "is-active" : ""}`}
            style={{ left: artifactPositions[index].x, top: artifactPositions[index].y, animationDelay: artifactPositions[index].delay }}
            onClick={() => setSelected(index)}
            aria-pressed={selected === index}
            aria-label={`Inspect ${item.name}`}
          >
            <span className="artifact-body" aria-hidden="true"><i /></span>
            <span className="artifact-label"><small>{item.code}</small><strong>{item.name}</strong></span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.article key={project.id} className="project-dossier" initial={{ opacity: 0, y: 24, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -16, filter: "blur(6px)" }} transition={{ duration: 0.45 }}>
          <header><span>{project.status}</span><b>{project.code} / TECHNICAL DOSSIER</b></header>
          <div className="dossier-grid">
            <div className="dossier-lead"><h3>{project.name}</h3><p>{project.summary}</p><div className="metrics">{project.metrics.map((metric) => <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</div></div>
            <div className="dossier-details"><p className="dossier-label">SYSTEM IMPACT</p><ul>{project.details.map((detail) => <li key={detail}>{detail}</li>)}</ul></div>
          </div>
          <div className="architecture"><p className="dossier-label">ARCHITECTURE TRACE</p><div>{project.architecture.map((layer, index) => <span key={layer}><small>{String(index + 1).padStart(2, "0")}</small>{layer}{index < project.architecture.length - 1 && <i>→</i>}</span>)}</div></div>
          <div className="stack stack--exhaustive"><p className="dossier-label">COMPLETE TECHNICAL SURFACE / {project.stack.length} COMPONENTS</p><div>{project.stack.map((item) => <span key={item}>{item}</span>)}</div></div>
        </motion.article>
      </AnimatePresence>
    </section>
  );
}
