import { notFound } from "next/navigation";
import { projects } from "../../projects";

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  return <main className={`case-study ${project.accent}`}>
    <nav className="case-nav"><a href="/">← Lagishetty Vigneshwar</a><a href="/vignesh-resume.pdf" target="_blank">Résumé ↗</a></nav>
    <header className="case-hero">
      <span className="eyebrow">{project.no} / {project.type}</span>
      <h1>{project.title}</h1><p>{project.description}</p>
      <div className="tags">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
    </header>
    <div className="case-visual" aria-label={`${project.title} interface concept`}>
      <div className="dashboard-main">
        <div className="mock-top"><span>PROJECT DASHBOARD</span><b>● LIVE</b></div>
        <h3>{project.title}</h3>
        <div className="mock-stats"><article><small>PROGRESS</small><strong>84%</strong></article><article><small>MODULES</small><strong>{project.features.length}</strong></article><article><small>STATUS</small><strong>ACTIVE</strong></article></div>
        <div className="mock-table">{project.features.map((feature,index)=><p key={feature}><span>0{index+1}</span><b>{feature}</b><i>READY</i></p>)}</div>
      </div>
      <div className="dashboard-chart"><span>WEEKLY ACTIVITY</span><div className="chart-bars"><i/><i/><i/><i/><i/><i/></div></div>
      <div className="dashboard-note"><span>TECH STACK</span><div>{project.stack.map(item=><b key={item}>{item}</b>)}</div><p>Designed for responsive, efficient and easy-to-use workflows.</p></div>
    </div>
    <p className="preview-note">Interactive product preview created for this portfolio. Project screenshots can be added when a live deployment is available.</p>
    <section className="case-facts" aria-label="Project summary">
      <div><span>YOUR ROLE</span><small>What I personally designed and developed</small><strong>{project.role}</strong></div>
      <div><span>TECHNOLOGIES</span><small>Languages, frameworks, APIs and databases used</small><strong>{project.stack.join(" · ")}</strong></div>
      <div><span>MEASURABLE OUTCOME</span><small>A quick, recruiter-friendly project measure</small><strong>{project.metric}</strong></div>
    </section>
    <section className="case-grid"><div><span className="eyebrow">PROBLEM</span><small className="case-explainer">The business or user difficulty this project addresses</small><h2>{project.challenge}</h2></div><div><span className="eyebrow">SOLUTION</span><small className="case-explainer">How the application solves that difficulty</small><p>{project.solution}</p><span className="eyebrow result-label">FEATURES</span><small className="case-explainer">The most important functions included in the project</small><ul>{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul><span className="eyebrow result-label">RESULT</span><small className="case-explainer">The practical value created by the application</small><p>{project.result}</p></div></section>
    <footer><a href="/#work">← All projects</a><a href="mailto:vigneshwargupta14@gmail.com">Discuss a project ↗</a></footer>
  </main>;
}
