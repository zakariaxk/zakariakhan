"use client";

import { AnimatePresence, motion } from "framer-motion";
import { projects } from "@/data/portfolio";

type Props = {
  selectedId: string | null;
  onSelect: (id: string | null) => void;
};

const screenPositions = [
  { left: "19%", top: "31%" },
  { left: "72%", top: "26%" },
  { left: "49%", top: "61%" },
  { left: "12%", top: "70%" },
  { left: "82%", top: "67%" },
  { left: "47%", top: "14%" },
];

export function ProjectSection({ selectedId, onSelect }: Props) {
  const selected = projects.find((project) => project.id === selectedId) ?? null;

  return (
    <section id="projects" className={`section projects-section ${selected ? "has-selection" : ""}`}>
      <header className="section-heading projects-heading">
        <div>
          <p className="eyebrow">03 / SIGNAL CONSTELLATION</p>
          <h2>Mapped<br /><em>systems</em></h2>
        </div>
        <p>
          Six working signals recovered from the archive. Select a node to isolate its structure and read the record.
        </p>
      </header>

      <div className="constellation" aria-label="Interactive project constellation">
        <svg viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true">
          <path d="M190 186 Q340 74 470 84 T720 156" />
          <path d="M190 186 Q305 305 490 366 T820 402" />
          <path d="M120 420 Q290 460 490 366" />
          <path d="M470 84 Q530 250 490 366" />
          <path d="M720 156 Q760 275 820 402" />
        </svg>
        {projects.map((project, index) => (
          <button
            key={project.id}
            className={`project-node ${project.featured ? "project-node--featured" : ""} ${selectedId === project.id ? "is-selected" : ""}`}
            style={screenPositions[index]}
            onClick={() => onSelect(project.id)}
            aria-label={`Open ${project.name} project record`}
          >
            <span className="project-node__orbit" aria-hidden="true" />
            <span className="project-node__core" aria-hidden="true" />
            <span className="project-node__label">
              <small>{String(index + 1).padStart(2, "0")} / {project.featured ? "PRIMARY" : "SECONDARY"}</small>
              <strong>{project.name}</strong>
              <em>{project.stack.slice(0, 2).join(" · ")}</em>
            </span>
          </button>
        ))}
        <div className="constellation__legend" aria-hidden="true">
          <span><i className="primary" /> Primary signal</span>
          <span><i /> Secondary signal</span>
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.aside
            className="capsule"
            initial={{ opacity: 0, x: "12%", filter: "blur(8px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: "8%", filter: "blur(5px)" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            aria-live="polite"
          >
            <button className="capsule__close" onClick={() => onSelect(null)} aria-label="Close project record">×</button>
            <div className="capsule__index">DATA CAPSULE / {selected.signal}</div>
            <h3>{selected.name}</h3>
            <p className="capsule__summary">{selected.summary}</p>
            <dl>
              <div><dt>Role</dt><dd>{selected.role}</dd></div>
              <div><dt>Key challenge</dt><dd>{selected.challenge}</dd></div>
              <div><dt>Outcome</dt><dd>{selected.outcome}</dd></div>
            </dl>
            <div className="capsule__stack">
              {selected.stack.map((item) => <span key={item}>{item}</span>)}
            </div>
            <div className="capsule__actions">
              {selected.github && <a href={selected.github} target="_blank" rel="noreferrer">GitHub <span>↗</span></a>}
              {selected.live && <a href={selected.live} target="_blank" rel="noreferrer">Live signal <span>↗</span></a>}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </section>
  );
}
