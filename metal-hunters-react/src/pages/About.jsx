import { useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import Photo from "../components/Photo";

const TIMELINE = [
  { year: "2015", text: "First capsule hand-printed and sold at neighborhood jams. The name Metal Hunters is born." },
  { year: "2018", text: "First screen-printing studio opens, first collaborations with international crews." },
  { year: "2021", text: "Launch of the oversized hoodie line and first limited drop, sold out in 48 hours." },
  { year: "2024", text: "The Hall of Fame is born: the community becomes an active part of the brand's story." },
  { year: "2026", text: "Metal Hunters keeps growing, always true to the street that saw it born." },
];

const TEAM = [
  { photo: "assets/crew-01.jpg", label: "Founder", name: 'Marco "Kayo" R.', role: "Founder & Creative Direction", alt: "Anonymous silhouette of the founder in action" },
  { photo: "assets/crew-02.jpg", label: "Design", name: 'Elia "Nixe" B.', role: "Design & Print", alt: "Anonymous silhouette of the design team in action" },
  { photo: "assets/crew-03.jpg", label: "Community", name: 'Sara "Ruffa" C.', role: "Community & Hall of Fame", alt: "Anonymous silhouette of the community team in action" },
];

export default function About() {
  useEffect(() => { document.title = "About — Metal Hunters"; }, []);

  return (
    <>
      <Navbar />
      <PageHeader eyebrow="Who We Are" title="About Us">
        Metal Hunters wasn't born in a studio. It was born in a garage, among empty spray cans and photocopied sheets.
      </PageHeader>

      <section className="mh-section">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div style={{ aspectRatio: "4/3" }}>
                <Photo className="photocopy" src="assets/about-warehouse.jpg" alt="Metal Hunters piece hanging in the warehouse, behind the scenes of production" fallbackLabel="Behind The Scenes" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </div>
            <div className="col-lg-6">
              <p className="eyebrow mb-2">Our Story</p>
              <h2 className="mh-section-title mb-4">From a Garage<br />to the Street</h2>
              <p className="text-grey mb-3">Metal Hunters was born in 2015 from three writers tired of wearing brands that didn't understand the scene. The first capsule was hand-printed in a basement, sold out of a backpack at neighborhood jams.</p>
              <p className="text-grey">Ten years later, the spirit hasn't changed: every drop starts from a piece made on a real wall, photocopied, screened and turned into a print. No shortcuts, no compromises.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="brand-statement" style={{ backgroundImage: "url('assets/hero-train-bombing.jpg')" }}>
        <div className="halftone-bg" style={{ position: "absolute", inset: 0 }} />
        <div className="container position-relative text-center">
          <span className="quote-mark">&ldquo;</span>
          <blockquote>
            We respect the game, we honor the kings,<br />
            and we never forget the toys we once were.
          </blockquote>
          <p className="mt-4 text-ice text-uppercase" style={{ letterSpacing: ".3em", fontSize: ".85rem" }}>— Our Values</p>
        </div>
      </section>

      <section className="mh-section">
        <div className="container">
          <div className="text-center mb-5">
            <p className="eyebrow mb-2">The Journey</p>
            <h2 className="mh-section-title">Our Timeline</h2>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="timeline">
                {TIMELINE.map(t => (
                  <div className="timeline-item" key={t.year}>
                    <div className="year">{t.year}</div>
                    <p className="text-grey mb-0">{t.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mh-section bg-mh-black text-white">
        <div className="container">
          <div className="text-center mb-5">
            <p className="eyebrow mb-2">The Crew Behind the Brand</p>
            <h2 className="mh-section-title">The Team</h2>
          </div>
          <div className="row g-4">
            {TEAM.map(t => (
              <div className="col-md-4" key={t.name}>
                <div className="team-card">
                  <div className="team-photo">
                    <Photo src={t.photo} alt={t.alt} fallbackLabel={t.label} />
                  </div>
                  <div className="team-name">{t.name}</div>
                  <div className="team-role">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
