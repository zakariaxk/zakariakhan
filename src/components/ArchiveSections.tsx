"use client";

import { motion } from "framer-motion";
import { channels, experience, identity, skillGroups } from "@/data/portfolio";

const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.22 },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

export function AboutSection() {
  return (
    <section id="about" className="section about-section">
      <motion.div className="about-frame" {...reveal}>
        <div className="about-frame__rail" aria-hidden="true">
          <span>OPERATOR PROFILE</span>
          <i />
          <span>ARCHIVE 02</span>
        </div>
        <div className="about-frame__title">
          <p className="eyebrow">02 / SIGNAL REGISTRY</p>
          <h2>Built to<br /><em>search.</em></h2>
        </div>
        <div className="about-frame__body">
          <span className="about-frame__index">ZK—1999 / ACTIVE</span>
          <p>{identity.bio}</p>
          <div className="about-frame__principles">
            <span><small>01</small> Seek the difficult question</span>
            <span><small>02</small> Make hidden systems legible</span>
            <span><small>03</small> Leave a stronger map behind</span>
          </div>
        </div>
        <div className="about-frame__telemetry" aria-hidden="true">
          <div><span>DISCIPLINE</span><strong>RIGOR / CURIOSITY</strong></div>
          <div><span>VECTOR</span><strong>UNKNOWN / FORWARD</strong></div>
          <div><span>STATUS</span><strong>STILL SEARCHING</strong></div>
        </div>
      </motion.div>
    </section>
  );
}

export function ExperienceSection() {
  return (
    <section id="experience" className="section experience-section">
      <motion.header className="section-heading trajectory-heading" {...reveal}>
        <p className="eyebrow">04 / TRAJECTORY LOG</p>
        <h2>Forward<br /><em>motion</em></h2>
        <p>Every system changes the direction of the next. A working path, still accumulating signal.</p>
      </motion.header>
      <div className="trajectory">
        <div className="trajectory__line" aria-hidden="true" />
        {experience.map((role, index) => (
          <motion.article
            key={`${role.period}-${role.title}`}
            className="waypoint"
            initial={{ opacity: 0, x: index % 2 === 0 ? -35 : 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.75, delay: index * 0.08 }}
          >
            <div className="waypoint__marker" aria-hidden="true"><i /></div>
            <div className="waypoint__period">{role.period}</div>
            <div className="waypoint__record">
              <span>WAYPOINT / {String(index + 1).padStart(2, "0")}</span>
              <h3>{role.title}</h3>
              <h4>{role.organization}</h4>
              <p>{role.impact}</p>
              <div>{role.tags.map((tag) => <small key={tag}>{tag}</small>)}</div>
            </div>
          </motion.article>
        ))}
      </div>
      <p className="placeholder-note">Experience records are structured placeholders and can be replaced in one data file.</p>
    </section>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="section skills-section">
      <motion.header className="section-heading systems-heading" {...reveal}>
        <div>
          <p className="eyebrow">05 / SYSTEMS MATRIX</p>
          <h2>Working<br /><em>instruments</em></h2>
        </div>
        <div className="systems-heading__readout">
          <span>6 SYSTEM GROUPS</span>
          <span>29 ACTIVE INSTRUMENTS</span>
          <span>CONTINUOUS CALIBRATION</span>
        </div>
      </motion.header>
      <div className="systems-matrix">
        {skillGroups.map((group, index) => (
          <motion.article
            key={group.name}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.65, delay: index * 0.06 }}
          >
            <header><span>{String(index + 1).padStart(2, "0")}</span><h3>{group.name}</h3><i /></header>
            <ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="section contact-section">
      <motion.div className="transmission" {...reveal}>
        <div className="transmission__signal" aria-hidden="true">
          <i /><i /><i /><i /><i />
        </div>
        <p className="eyebrow">06 / OPEN CHANNEL</p>
        <h2>Send a<br /><em>signal.</em></h2>
        <p className="transmission__copy">
          Difficult problem, uncertain direction, or an idea worth mapping? The channel is open.
        </p>
        <div className="channels">
          {channels.map((channel, index) => (
            <a key={channel.label} href={channel.href} target={channel.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
              <span>{String(index + 1).padStart(2, "0")} / {channel.label}</span>
              <strong>{channel.value}</strong>
              <i>↗</i>
            </a>
          ))}
        </div>
        <footer>
          <span>© {new Date().getFullYear()} {identity.name}</span>
          <span>BUILT AT THE EDGE OF THE MAP</span>
          <a href="#hero">RETURN TO ORIGIN ↑</a>
        </footer>
      </motion.div>
    </section>
  );
}
