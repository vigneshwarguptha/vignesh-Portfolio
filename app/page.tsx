"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import { projects } from "./projects";

const skills = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "React.js",
  "Responsive Design",
  "Python",
  "REST APIs",
  "Java",
  "SQL",
  "MySQL",
  "PostgreSQL",
  "GitHub",
  "Streamlit",
  "UI Design",
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [botSpeaking, setBotSpeaking] = useState(false);
  const [botCaption, setBotCaption] = useState("");
  const [resumeHref, setResumeHref] = useState("/vignesh-resume.pdf");
  const [resumeLabel, setResumeLabel] = useState("Resume");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        }),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    const savedResume = window.localStorage.getItem("vignesh-resume-data");
    const savedResumeName = window.localStorage.getItem("vignesh-resume-name");
    if (savedResume) setResumeHref(savedResume);
    if (savedResumeName) setResumeLabel(savedResumeName);
    return () => observer.disconnect();
  }, []);

  const handleResumeUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      alert("Please choose a PDF résumé.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        window.localStorage.setItem("vignesh-resume-data", reader.result);
        window.localStorage.setItem("vignesh-resume-name", file.name);
        setResumeHref(reader.result);
        setResumeLabel("Resume");
      }
    };
    reader.readAsDataURL(file);
  };

  const closeMenu = () => setMenuOpen(false);

  const speakPortfolio = () => {
    if (!("speechSynthesis" in window)) {
      alert("Voice narration is not supported in this browser.");
      return;
    }
    if (botSpeaking) {
      window.speechSynthesis.cancel();
      setBotSpeaking(false);
      setBotCaption("");
      return;
    }
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
    const sentences = [
      `${greeting}. Welcome to my portfolio.`,
      "I am Lagishetty Vigneshwar, a full-stack web developer based in Hyderabad.",
      "I build responsive products using React, Python and SQL.",
      "Let me explain each project with its problem, solution, role, technologies, features, result and measurable outcome.",
      ...projects.flatMap((project) => [
        `${project.title}. Problem: ${project.challenge}`,
        `Solution: ${project.solution}`,
        `My role was ${project.role}. Technologies used: ${project.stack.join(", ")}.`,
        `Key features include ${project.features.join(", ")}. Result: ${project.result} Measurable outcome: ${project.metric}.`,
      ]),
      "Click any project row to open its full case study and review the details while I explain it.",
      "I am available for full-stack opportunities.",
      "Explore my projects or select Hire Me to contact me. Thank you for visiting.",
    ];
    const voices = window.speechSynthesis.getVoices();
    const selectedVoice = voices.find((voice) => voice.lang === "en-IN") || voices.find((voice) => voice.lang.startsWith("en")) || null;
    let sentenceIndex = 0;
    const speakNext = () => {
      if (sentenceIndex >= sentences.length) {
        setBotSpeaking(false);
        setBotCaption("");
        return;
      }
      const sentence = sentences[sentenceIndex++];
      setBotCaption(sentence);
      const speech = new SpeechSynthesisUtterance(sentence);
      speech.lang = "en-IN";
      speech.rate = 0.92;
      speech.pitch = 1;
      speech.voice = selectedVoice;
      speech.onend = speakNext;
      speech.onerror = () => { setBotSpeaking(false); setBotCaption(""); };
      window.speechSynthesis.speak(speech);
    };
    window.speechSynthesis.cancel();
    setBotSpeaking(true);
    speakNext();
  };

  return (
    <main>
      <nav className="nav" aria-label="Primary navigation">
        <a className="brand" href="#top" onClick={closeMenu}>
            Lagishetty Vigneshwar<span>.</span>
        </a>
        <button
          className="menu-button"
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? "CLOSE" : "MENU"}
        </button>
        <div className={menuOpen ? "nav-links open" : "nav-links"} id="site-menu">
          <a href="#work" onClick={closeMenu}>Work</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
          <a className="nav-cta" href={resumeHref} target="_blank">{resumeLabel} ↗</a>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="hero-intro reveal">
          <div className="hero-copy">
            <div className="hero-kicker"><span /> AVAILABLE FOR OPPORTUNITIES</div>
            <h1>LAGISHETTY<br />VIGNESHWAR</h1>
            <p className="hero-role">FULL-STACK WEB DEVELOPER | REACT, PYTHON &amp; SQL</p>
            <p className="hero-summary">I build responsive web applications, useful business platforms and thoughtful AI experiences.</p>
            <div className="hero-location"><b>●</b> HYDERABAD, INDIA</div>
            <div className="hero-actions"><a href="#work">VIEW PROJECTS ↓</a><a href={resumeHref} download>DOWNLOAD {resumeLabel.toUpperCase()} ↗</a><a className="hire-button" href="mailto:vigneshwargupta14@gmail.com?subject=Full-Stack%20Developer%20Opportunity">HIRE ME ↗</a></div>
          </div>
          <div className="hero-showcase" aria-label="Web development interface preview">
            <div className="browser-card"><i/><i/><i/><strong>ERP MANAGEMENT</strong><div className="browser-lines"><span/><span/><span/></div><div className="browser-art"><b>84%</b><small>BUSINESS GROWTH</small></div></div>
            <div className="code-card"><small>02 / AI CUSTOMER SUPPORT</small><h3>VoiceBiz</h3><p>Voice agents · Leads</p><p>Follow-ups · Web APIs</p></div>
            <div className="mini-card"><strong>SATYAJAYA</strong><small>TEXTILES DASHBOARD</small><div/><span/><span/><span/></div>
            <button className={botSpeaking ? "ai-bot speaking" : "ai-bot"} onClick={speakPortfolio} aria-label={botSpeaking ? "Stop portfolio narration" : "Play portfolio narration"} title="Click to hear about Vigneshwar">
              <i/><span className="bot-face"><b/><b/><span/></span><small>{botSpeaking ? "SPEAKING…" : "CLICK TO TALK"}</small>
            </button>
            {botSpeaking && <div className="bot-caption" role="status" aria-live="polite"><span>VIGNESHWAR SAYS</span><p>{botCaption}</p><small>Click the robot to stop</small></div>}
          </div>
        </div>
      </section>

      <section className="quick-stats" aria-label="Portfolio highlights">
        <div><strong>{String(projects.length).padStart(2, "0")}</strong><span>Featured projects</span></div>
        <div><strong>14+</strong><span>Technologies &amp; tools</span></div>
        <div><strong>2027</strong><span>MCA graduation</span></div>
        <div className="available-stat"><strong>OPEN</strong><span>For opportunities</span></div>
      </section>

      <div className="ticker" aria-label="Core capabilities">
        <div className="ticker-track">
          FRONTEND DEVELOPMENT ✦ BACKEND INTEGRATION ✦ DATABASE SYSTEMS ✦ AI EXPERIENCES ✦ FRONTEND DEVELOPMENT ✦ BACKEND INTEGRATION ✦ DATABASE SYSTEMS ✦ AI EXPERIENCES ✦
        </div>
      </div>

      <section className="work section" id="work">
        <div className="section-heading reveal">
          <div><span className="eyebrow">01 / SELECTED WORK</span><h2>Projects that<br />solve <em>real</em> problems.</h2></div>
          <p>From business operations to AI-powered customer service — each project is designed around clarity, usability and measurable value.</p>
        </div>

        <div className="projects">
          {projects.map((project, index) => (
            <a className={`project-card reveal ${project.accent}`} href={`/projects/${project.slug}`} key={project.slug} aria-label={`View ${project.title} case study`}>
              <div className="project-no">{String(index + 1).padStart(2, "0")}</div>
              <div className="project-content">
                <span className="project-type">{project.type}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <strong className="project-outcome">{project.metric}</strong>
                <div className="tags">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
              </div>
              <div className="project-mark" aria-hidden="true">↗</div>
            </a>
          ))}
        </div>
      </section>

      <section className="about section" id="about">
        <div className="portrait reveal">
          <img src="/vignesh-profile.jpg" alt="Lagishetty Vigneshwar" />
          <small>FULL-STACK DEVELOPER<br />&amp; PROBLEM SOLVER</small>
        </div>
        <div className="about-copy reveal">
          <span className="eyebrow">02 / ABOUT ME</span>
          <h2>I turn ideas into<br /><em>useful interfaces.</em></h2>
          <p className="lead">Motivated by the space where design, logic and human needs meet.</p>
          <p>I build responsive web applications, interactive dashboards and database-driven systems. I&apos;m especially interested in full-stack products that make complex workflows feel simple.</p>
          <div className="education">
            <div><span>2027 · EXPECTED</span><strong>Master of Computer Applications</strong><small>Aurora&apos;s PG College, Hyderabad</small></div>
            <div><span>2021 — 2024</span><strong>B.Sc. MPCs · 7.5 CGPA</strong><small>Aurora&apos;s Degree &amp; PG College</small></div>
          </div>
        </div>
      </section>

      <section className="skills section">
        <div className="skills-head reveal">
          <span className="eyebrow">03 / TOOLKIT</span>
          <h2>What I work with.</h2>
        </div>
        <div className="skill-cloud reveal">
          {skills.map((skill, index) => <span className={index % 4 === 0 ? "hot" : ""} key={skill}>{skill}</span>)}
        </div>
        <div className="certs reveal">
          <span>Selected learning</span>
          <p>Deloitte Data Analytics · Tata GenAI Powered Data Analytics · Q-Spiders Java &amp; SQL</p>
        </div>
      </section>

      <section className="contact section" id="contact">
        <span className="eyebrow">04 / LET&apos;S CONNECT</span>
        <h2 className="reveal">HAVE AN IDEA?<br /><span>LET&apos;S BUILD IT.</span></h2>
        <a className="email reveal" href="mailto:vigneshwargupta14@gmail.com">
          vigneshwargupta14@gmail.com <b>↗</b>
        </a>
        <div className="contact-bottom">
          <div><span>EMAIL</span><a href="mailto:vigneshwargupta14@gmail.com">vigneshwargupta14@gmail.com</a></div>
          <div><span>BASED IN</span><p>Hyderabad, Telangana</p></div>
          <div><span>AVAILABILITY</span><p>Open to full-stack opportunities</p></div>
        </div>
        <div className="social-links reveal">
          <a href="mailto:vigneshwargupta14@gmail.com?subject=Portfolio%20enquiry">Start a conversation ↗</a>
          <a href={resumeHref} download>Download {resumeLabel} ↓</a>
          <label className="resume-upload">Upload new résumé<input type="file" accept="application/pdf" onChange={handleResumeUpload} /></label>
          <a href="https://github.com/" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
        </div>
      </section>

      <footer><p>© 2026 VIGNESHWAR LAGISHETTY</p><a href="#top">BACK TO TOP ↑</a></footer>
    </main>
  );
}
