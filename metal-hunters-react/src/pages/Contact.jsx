import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";

export default function Contact() {
  useEffect(() => { document.title = "Contact — Metal Hunters"; }, []);
  const [sent, setSent] = useState(false);
  const formRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
    formRef.current?.reset();
  }

  return (
    <>
      <Navbar />
      <PageHeader eyebrow="Let's Talk" title="Contact">
        Questions about an order, a collaboration, or a crew to flag for the Hall of Fame? Write to us.
      </PageHeader>

      <section className="mh-section">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-5">
              <h2 className="mh-section-title mb-4" style={{ fontSize: "1.8rem" }}>Contact Info</h2>

              <div className="contact-info-item">
                <div className="icon-box">
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor"><path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm.05.921 7.5 4.375a.5.5 0 0 0 .5 0L15.95 4.92A1 1 0 0 0 15 4H1a1 1 0 0 0-.95.921Z" /></svg>
                </div>
                <div>
                  <div className="fw-bold text-uppercase small" style={{ letterSpacing: ".1em" }}>Email</div>
                  <div className="text-grey">info@metalhunters.com</div>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="icon-box">
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor"><path d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" /></svg>
                </div>
                <div>
                  <div className="fw-bold text-uppercase small" style={{ letterSpacing: ".1em" }}>Phone</div>
                  <div className="text-grey">+39 02 1234 5678</div>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="icon-box">
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor"><path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" /></svg>
                </div>
                <div>
                  <div className="fw-bold text-uppercase small" style={{ letterSpacing: ".1em" }}>Location</div>
                  <div className="text-grey">15 Tag Street, 20100 Milan, IT</div>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="icon-box">
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor"><path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9z" /><path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07A7.001 7.001 0 0 0 8 16a7 7 0 0 0 5.29-11.584l.35-.35a.5.5 0 0 0-.708-.707l-.35.35A6.95 6.95 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1zM8 3a6 6 0 1 1-.001 12A6 6 0 0 1 8 3" /></svg>
                </div>
                <div>
                  <div className="fw-bold text-uppercase small" style={{ letterSpacing: ".1em" }}>Hours</div>
                  <div className="text-grey">Mon–Fri 9:00–18:00</div>
                </div>
              </div>

              <div className="mt-4">
                <a href="#" className="mh-social" aria-label="Instagram" style={{ borderColor: "var(--mh-black)", color: "var(--mh-black)" }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.033 1.024-.043 2.514-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" /></svg>
                </a>
                <a href="#" className="mh-social" aria-label="TikTok" style={{ borderColor: "var(--mh-black)", color: "var(--mh-black)" }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.658 0-3.007-.674-4-1.578V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" /></svg>
                </a>
              </div>
            </div>

            <div className="col-lg-7">
              <h2 className="mh-section-title mb-4" style={{ fontSize: "1.8rem" }}>Write to Us</h2>
              <form ref={formRef} onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="contactName">Name</label>
                    <input type="text" className="form-control" id="contactName" required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="contactEmail">Email</label>
                    <input type="email" className="form-control" id="contactEmail" required />
                  </div>
                  <div className="col-12">
                    <label className="form-label" htmlFor="contactSubject">Subject</label>
                    <input type="text" className="form-control" id="contactSubject" placeholder="E.g. Limited drop info" />
                  </div>
                  <div className="col-12">
                    <label className="form-label" htmlFor="contactMessage">Message</label>
                    <textarea className="form-control" id="contactMessage" rows="5" required></textarea>
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn-mh">Send</button>
                  </div>
                </div>
                {sent && (
                  <div className="alert alert-dark mt-4" role="alert">
                    Message sent. We'll get back to you shortly.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="mh-section pt-0">
        <div className="container">
          <div className="map-frame" style={{ aspectRatio: "21/9" }}>
            <iframe
              src="https://www.google.com/maps?q=Via+Tortona,+Milano,+Italy&output=embed"
              style={{ border: 0, width: "100%", height: "100%" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Map of Metal Hunters HQ, Milan"
            />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
