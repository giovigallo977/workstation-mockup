import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import Photo from "../components/Photo";
import { PRODUCTS } from "../data/products";
import { useHeroParallax, useRellax } from "../hooks/useParallax";

export default function Home() {
  useEffect(() => { document.title = "Metal Hunters — Raw Since 2015"; }, []);

  const heroRef = useRef(null);
  const introRef = useRef(null);
  const galleryRef = useRef(null);
  useHeroParallax(heroRef);
  useRellax(introRef);
  useRellax(galleryRef);

  const [reviewsExpanded, setReviewsExpanded] = useState(false);

  const featured = PRODUCTS.slice(0, 4);
  const more = PRODUCTS.slice(4, 8);

  const reviews = [
    { stars: "★★★★★", text: "Tessuto pesante come deve essere, la stampa halftone sulla Xerox Riot Tee regge lavaggio dopo lavaggio. Vestibilità perfetta.", name: "Kayo TFP", handle: "Writer, Milano" },
    { stars: "★★★★★", text: "La Yard Runner Hoodie è pesante il giusto per una notte in deposito. Cappuccio comodo, tasca capiente per la bomboletta.", name: "Nixe One", handle: "Bomber, Torino" },
    { stars: "★★★★☆", text: "Drop limitato arrivato in tre giorni. Il pacco stesso sembrava un pezzo d'arte. Consigliato a chi vive di cultura underground.", name: "Ruffa Crew", handle: "Photographer, Bologna" },
    { stars: "★★★★★", text: "All City Tee: taglio oversize, grafica pulita, niente logo esagerato. Esattamente lo stile che cercavo per rappresentare la crew.", name: "Dez Wons", handle: "Writer, Napoli" },
    { stars: "★★★★★", text: "Il Vandal Cap è diventato il mio pezzo fisso. Visiera curva perfetta, ricamo resistente anche sotto la pioggia.", name: "Mira Blek", handle: "Street Photographer, Roma" },
    { stars: "★★★★☆", text: "Ghost Train Hoodie oversize al punto giusto, ottima per l'inverno passato tra rooftop e binari abbandonati.", name: "Toka SBS", handle: "Writer, Firenze" },
  ];
  const visibleReviews = reviewsExpanded ? reviews : reviews.slice(0, 3);

  return (
    <>
      <Navbar hasHero />

      <header className="mh-hero">
        <img ref={heroRef} className="hero-bg" src="assets/hero-spray-silhouette.jpg" alt="Writer silhouette spraying a wall at night above the city skyline" />
        <div className="hero-overlay" />
        <div className="container hero-content text-center">
          <p className="hero-sub mb-3">Writing in Europe · Raw Since 2025</p>
          <h1 className="hero-title">Metal<br />Hunters</h1>
          <p className="fs-5 mb-4" style={{ maxWidth: 520, margin: "0 auto" }}>
            Born to feel the asphalt.<br />Chase walls. Catch trains.<br />Write your own story.
          </p>
          <a href="#featured" className="btn-mh-light">Shop New Drop</a>
        </div>
        <div className="scroll-cue">Scroll</div>
      </header>

      <section className="mh-section">
        <div className="container">
          <div className="row align-items-end mb-5">
            <div className="col-lg-7">
              <p className="eyebrow mb-2">The Collection</p>
              <h2 className="mh-section-title">From Writers, to Writers.</h2>
            </div>
            <div className="col-lg-5">
              <p className="text-grey mb-3">Born in the yards.<br />Lived in the streets.<br />Printed on cloth.</p>
              <p className="text-grey mb-3">Every piece is an experience<br />turned into a mark.</p>
              <p className="text-grey mb-0">The street isn't the backdrop.<br />It's the canvas.</p>
            </div>
          </div>
          <div className="row g-3" ref={introRef}>
            <div className="col-md-4">
              <div className="lookbook-frame" data-speed="-1">
                <Photo className="photocopy" src="assets/about-warehouse.jpg" alt="Metal Hunters piece hanging in the warehouse" fallbackLabel="Yard Runner" />
                <div className="frame-tag">Look 01 — Yard Runner</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="lookbook-frame" data-speed="1">
                <Photo className="photocopy" src="assets/hero-train-bombing.jpg" alt="Writer bombing a freight train" fallbackLabel="Freight Line" />
                <div className="frame-tag">Look 02 — Freight Line</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="lookbook-frame" data-speed="-1">
                <Photo className="photocopy" src="assets/lookbook-firescape.jpg" alt="Wall with graffiti and a fire escape" fallbackLabel="Fat Cap" />
                <div className="frame-tag">Look 03 — Fat Cap</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="featured" className="mh-section bg-mh-black text-white">
        <div className="container">
          <div className="d-flex justify-content-between align-items-end mb-5 flex-wrap gap-3">
            <div>
              <p className="eyebrow mb-2">Drop 004</p>
              <h2 className="mh-section-title">Featured Collection</h2>
            </div>
            <Link to="/shop" className="btn-mh-outline" style={{ borderColor: "var(--mh-white)", color: "var(--mh-white)" }}>View Full Shop</Link>
          </div>
          <div className="row g-4">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      <section className="brand-statement" style={{ backgroundImage: "url('assets/graphic-chainlink.jpg')" }}>
        <div className="halftone-bg" style={{ position: "absolute", inset: 0 }} />
        <div className="container position-relative text-center">
          <span className="quote-mark">&ldquo;</span>
          <blockquote>
            We don't ask.<br />
            We execute.<br />
            We live it.<br />
            We make it real.<br /><br />
            No permission.<br />
            No compromise.<br />
            Just love for the culture —<br />
            made to be shared.
          </blockquote>
          <p className="mt-4 text-ice text-uppercase" style={{ letterSpacing: ".3em", fontSize: ".85rem" }}>— Metal Hunters's Creed</p>
        </div>
      </section>

      <section className="mh-section">
        <div className="container-fluid px-lg-5">
          <div className="text-center mb-5">
            <p className="eyebrow mb-2">Photocopies From the Field</p>
            <h2 className="mh-section-title">Lookbook</h2>
          </div>
          <div className="row g-2" ref={galleryRef}>
            <div className="col-6 col-md-4">
              <div className="gallery-frame" data-speed="-2"><Photo src="assets/lookbook-flatlay.jpg" alt="Flat lay of Metal Hunters t-shirts" fallbackLabel="Merch Flat Lay" /></div>
            </div>
            <div className="col-6 col-md-4">
              <div className="gallery-frame" data-speed="2"><Photo src="assets/graphic-powerlines.jpg" alt="Power line poster graphic" fallbackLabel="Grid Poster" /></div>
            </div>
            <div className="col-6 col-md-4">
              <div className="gallery-frame" data-speed="-1"><Photo src="assets/product-europeloves-tee.jpg" alt="Europe Loves print on the back of the tee" fallbackLabel="Print Detail" /></div>
            </div>
            <div className="col-6 col-md-4">
              <div className="gallery-frame" data-speed="1.5"><Photo src="assets/about-process.jpg" alt="Hand-cutting a logo sticker" fallbackLabel="Sticker Cut" /></div>
            </div>
            <div className="col-6 col-md-4">
              <div className="gallery-frame" data-speed="-1.5"><Photo src="assets/crew-01.jpg" alt="Writer in action on a train" fallbackLabel="Crew In Action" /></div>
            </div>
            <div className="col-6 col-md-4">
              <div className="gallery-frame" data-speed="2"><Photo src="assets/crew-02.jpg" alt="Writer crouched with the spray-can bag" fallbackLabel="Crew Lookout" /></div>
            </div>
          </div>
        </div>
      </section>

      <section className="mh-section bg-mh-black text-white">
        <div className="container">
          <div className="text-center mb-5">
            <p className="eyebrow mb-2">More From the Warehouse</p>
            <h2 className="mh-section-title">Featured Products</h2>
          </div>
          <div className="row g-4">
            {more.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      <section className="mh-section">
        <div className="container">
          <div className="text-center mb-5">
            <p className="eyebrow mb-2">Voices From the Street</p>
            <h2 className="mh-section-title">Reviews</h2>
          </div>
          <div className="row g-4">
            {visibleReviews.map((r, i) => (
              <div className="col-md-6 col-lg-4" key={i}>
                <div className="review-card">
                  <div className="stars mb-2">{r.stars}</div>
                  <p>"{r.text}"</p>
                  <div className="review-name">{r.name}</div>
                  <div className="review-handle">{r.handle}</div>
                </div>
              </div>
            ))}
          </div>
          {!reviewsExpanded && (
            <div className="text-center mt-5">
              <button className="btn-mh-outline" onClick={() => setReviewsExpanded(true)}>Show All Reviews</button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
