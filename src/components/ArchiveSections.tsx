"use client";

import { motion } from "framer-motion";
import { experience, identity, skillGroups } from "@/data/portfolio";

const reveal = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { duration: 0.65 } };

export function AboutSection() {
  return (
    <section className="section-shell profile-brief">
      <motion.div className="brief-copy" {...reveal}>
        <h2>Curiosity with<br /><em>operational discipline.</em></h2>
        <p>{identity.bio}</p>
      </motion.div>
      <motion.div className="education-card" {...reveal}>
        <header><span>EDUCATION</span><i>UCF</i></header>
        <h3>University of Central Florida</h3>
        <p>B.S. in Computer Science</p>
        <dl>
          <div><dt>Completion</dt><dd>2027</dd></div>
          <div><dt>Academic signal</dt><dd>3.82 GPA</dd></div>
          <div><dt>Recognition</dt><dd>Florida Academic Scholarship, Dean&apos;s List 4x</dd></div>
        </dl>
      </motion.div>
    </section>
  );
}

export function ExperienceSection() {
  return (
    <section id="trajectory" className="section-shell trajectory">
      <header className="section-intro"><div><h2>Engineering<br /><em>trajectory.</em></h2></div><p>Enterprise AI, resilient services, healthcare operations, and customer trust.</p></header>
      <div className="timeline">
        {experience.map((role, index) => (
          <motion.article key={`${role.period}-${role.organization}`} {...reveal}>
            <div className="timeline-code">{String(index + 1).padStart(2, "0")}</div>
            <div className="timeline-period">{role.period}</div>
            <div className="timeline-content"><span>{role.location}</span><h3>{role.title}</h3><h4>{role.organization}</h4><p>{role.impact}</p><div>{role.tags.map((tag) => <small key={tag}>{tag}</small>)}</div></div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export function SkillsSection() {
  return (
    <section id="systems" className="section-shell systems">
      <header className="section-intro"><div><h2>Technical<br /><em>instrumentation.</em></h2></div><p>A practical stack for taking intelligent products from model and data layer through resilient delivery.</p></header>
      <div className="skill-grid">{skillGroups.map((group) => <motion.article key={group.name} {...reveal}><header><h3>{group.name}</h3></header><div>{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></motion.article>)}</div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="section-shell contact">
      <div className="contact-orbit" aria-hidden="true"><i /><i /><span>ZK</span></div>
      <h2>Let&apos;s build beyond<br /><em>the known map.</em></h2>
      <p>I am open to software engineering, AI systems, and ambitious product work where difficult technical problems create real human value.</p>
      <div className="contact-links">
        <a href={`mailto:${identity.email}`}><span>EMAIL</span><strong>{identity.email}</strong><i>↗</i></a>
        <a href={identity.linkedin} target="_blank" rel="noreferrer"><span>LINKEDIN</span><strong>zakaria-khan1</strong><i>↗</i></a>
        <a href={identity.github} target="_blank" rel="noreferrer"><span>GITHUB</span><strong>@zakariaxk</strong><i>↗</i></a>
      </div>
      <footer><span>© {new Date().getFullYear()} ZAKARIA KHAN</span><span>ORLANDO, FL</span><a href="#profile">BACK TO TOP</a></footer>
    </section>
  );
}
