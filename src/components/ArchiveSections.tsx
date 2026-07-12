"use client";

import { motion } from "framer-motion";
import { experience, identity, skillGroups } from "@/data/portfolio";

const reveal = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { duration: 0.65 } };

export function AboutSection() {
  return (
    <section className="section-shell profile-brief">
      <motion.div className="brief-copy" {...reveal}>
        <p className="kicker">OPERATOR BRIEF / 01</p>
        <h2>Curiosity with<br /><em>operational discipline.</em></h2>
        <p>{identity.bio}</p>
      </motion.div>
      <motion.div className="education-card" {...reveal}>
        <header><span>EDUCATION RECORD</span><i>VERIFIED</i></header>
        <h3>University of Central Florida</h3>
        <p>Bachelor of Science in Computer Science</p>
        <dl>
          <div><dt>Completion</dt><dd>Graduation timeline in progress</dd></div>
          <div><dt>Academic signal</dt><dd>3.82 GPA</dd></div>
          <div><dt>Recognition</dt><dd>Dean&apos;s List 4 times</dd></div>
          <div><dt>Scholarship</dt><dd>Florida Academic Scholarship</dd></div>
        </dl>
      </motion.div>
    </section>
  );
}

export function ExperienceSection() {
  return (
    <section id="trajectory" className="section-shell trajectory">
      <header className="section-intro"><div><p className="kicker">EXPERIENCE / 05 WAYPOINTS</p><h2>Engineering<br /><em>trajectory.</em></h2></div><p>Enterprise AI, resilient services, healthcare operations, and customer trust. Every waypoint sharpened a different part of the system.</p></header>
      <div className="timeline">
        {experience.map((role, index) => (
          <motion.article key={`${role.period}-${role.organization}`} {...reveal}>
            <div className="timeline-code">0{index + 1}<i /></div>
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
      <header className="section-intro"><div><p className="kicker">CAPABILITY MATRIX / 05 LAYERS</p><h2>Technical<br /><em>instrumentation.</em></h2></div><p>A practical stack for taking intelligent products from model and data layer through resilient delivery.</p></header>
      <div className="skill-grid">{skillGroups.map((group, index) => <motion.article key={group.name} {...reveal}><header><span>0{index + 1}</span><h3>{group.name}</h3><i /></header><div>{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></motion.article>)}</div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="section-shell contact">
      <div className="contact-orbit" aria-hidden="true"><i /><i /><span>ZK</span></div>
      <p className="kicker">OPEN CHANNEL / RESPONSE EXPECTED</p>
      <h2>Let&apos;s build beyond<br /><em>the known map.</em></h2>
      <p>I am open to software engineering, AI systems, and ambitious product work where difficult technical problems create real human value.</p>
      <div className="contact-links">
        <a href={`mailto:${identity.email}`}><span>EMAIL</span><strong>{identity.email}</strong><i>↗</i></a>
        <a href={identity.linkedin} target="_blank" rel="noreferrer"><span>LINKEDIN</span><strong>zakaria-khan1</strong><i>↗</i></a>
        <a href={identity.github} target="_blank" rel="noreferrer"><span>GITHUB</span><strong>@zakariaxk</strong><i>↗</i></a>
      </div>
      <footer><span>© {new Date().getFullYear()} ZAKARIA KHAN</span><span>ENGINEERED IN ORLANDO, FL</span><a href="#profile">RETURN TO ORBIT ↑</a></footer>
    </section>
  );
}
