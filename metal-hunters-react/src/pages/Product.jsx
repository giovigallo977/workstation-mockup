import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import GarmentSVG from "../components/GarmentSVG";
import Photo from "../components/Photo";
import MHSelect from "../components/MHSelect";
import { getProductById, categoryLabel, PRODUCTS, SIZES, COLORS } from "../data/products";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

const reviews = [
  { stars: "★★★★★", text: "Vestibilità oversize perfetta, la stampa non si è rovinata nemmeno dopo dieci lavaggi.", name: "Kayo TFP", handle: "Writer, Milano" },
  { stars: "★★★★★", text: "Tessuto pesante, taglio dritto come descritto. Confezione in stile fotocopia davvero curata.", name: "Nixe One", handle: "Bomber, Torino" },
  { stars: "★★★★☆", text: "Consegna rapida, il capo profuma di inchiostro fresco. Prenderò anche la taglia XL per l'inverno.", name: "Ruffa Crew", handle: "Photographer, Bologna" },
];

export default function Product() {
  const { id } = useParams();
  const product = getProductById(id) || PRODUCTS[0];
  const { addToCart } = useCart();
  const showToast = useToast();

  const [size, setSize] = useState(SIZES[1]);
  const [color, setColor] = useState(COLORS[0]);
  const [qty, setQty] = useState(1);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    document.title = `${product.name} — METAL HUNTERS`;
    setSlide(0);
    setSize(SIZES[1]);
    setColor(COLORS[0]);
    setQty(1);
  }, [product.id]);

  const slides = useMemo(() => {
    const items = [];
    if (product.photo) {
      items.push({ type: "photo", src: product.photo });
    }
    const fits = [product.fit, "black", "white"].filter((v, i, a) => a.indexOf(v) === i);
    fits.forEach(fit => items.push({ type: "svg", product: { ...product, fit } }));
    return items;
  }, [product]);

  const related = useMemo(() => {
    let list = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
    if (list.length < 4) {
      const extra = PRODUCTS.filter(p => p.id !== product.id && !list.includes(p)).slice(0, 4 - list.length);
      list = [...list, ...extra];
    }
    return list;
  }, [product]);

  function handleAddToCart() {
    const total = addToCart(product, qty, size, color);
    showToast(`<strong>${product.name}</strong> added to cart. Total items: <strong>${total}</strong>`);
  }

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "7rem" }}>
        <section className="mh-section pt-3">
          <div className="container">
            <nav aria-label="breadcrumb" className="mb-4">
              <ol className="breadcrumb small text-uppercase" style={{ letterSpacing: ".1em" }}>
                <li className="breadcrumb-item"><Link to="/" className="text-grey">Home</Link></li>
                <li className="breadcrumb-item"><Link to="/shop" className="text-grey">Shop</Link></li>
                <li className="breadcrumb-item active">{categoryLabel(product.category)}</li>
              </ol>
            </nav>

            <div className="row g-5">
              <div className="col-lg-6">
                <div className="product-gallery">
                  <div className="media-box">
                    {slides[slide]?.type === "photo"
                      ? <Photo src={slides[slide].src} alt={product.name} fallbackLabel={product.name} />
                      : <GarmentSVG product={slides[slide]?.product || product} />}
                  </div>
                  {slides.length > 1 && (
                    <>
                      <button className="gallery-nav gallery-prev" aria-label="Previous image" onClick={() => setSlide(s => (s - 1 + slides.length) % slides.length)}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" /></svg>
                      </button>
                      <button className="gallery-nav gallery-next" aria-label="Next image" onClick={() => setSlide(s => (s + 1) % slides.length)}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" /></svg>
                      </button>
                      <div className="gallery-dots">
                        {slides.map((_, i) => (
                          <button key={i} className={i === slide ? "active" : ""} aria-label={`Go to image ${i + 1}`} onClick={() => setSlide(i)} />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="col-lg-6">
                {product.badge && (
                  <span className="card-badge d-inline-block mb-3" style={{ position: "static", background: "var(--mh-ice)", color: "var(--mh-black)" }}>{product.badge}</span>
                )}
                <h1 className="fw-bold mb-2" style={{ fontSize: "2.2rem" }}>{product.name}</h1>
                <p className="price-tag mb-4">€ {product.price.toFixed(2)}</p>
                <p className="text-grey mb-4">{product.desc}</p>

                <div className="row g-3 mb-4">
                  <div className="col-6">
                    <label className="form-label">Size</label>
                    <MHSelect value={size} onValueChange={setSize} options={SIZES} ariaLabel="Size" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Color</label>
                    <MHSelect value={color} onValueChange={setColor} options={COLORS} ariaLabel="Color" />
                  </div>
                  <div className="col-6">
                    <label className="form-label" htmlFor="productQty">Quantity</label>
                    <input type="number" id="productQty" className="form-control" value={qty} min="1" max="10" onChange={(e) => setQty(Math.max(1, parseInt(e.target.value, 10) || 1))} />
                  </div>
                </div>

                <button type="button" className="btn-mh w-100 mb-3" onClick={handleAddToCart}>Add to Cart</button>

                <ul className="list-unstyled small text-grey mt-4">
                  <li className="mb-2">&#9656; Shipping in 2-4 business days</li>
                  <li className="mb-2">&#9656; Free returns within 30 days</li>
                  <li className="mb-2">&#9656; Screen print built to survive the wash</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mh-section bg-mh-black text-white">
          <div className="container">
            <h3 className="mb-5">Product Reviews</h3>
            <div className="row g-4">
              {reviews.map((r, i) => (
                <div className="col-md-4" key={i}>
                  <div className="review-card" style={{ background: "#141414", borderColor: "rgba(242,241,234,.15)", color: "var(--mh-white)" }}>
                    <div className="stars mb-2 text-ice">{r.stars}</div>
                    <p>"{r.text}"</p>
                    <div className="review-name">{r.name}</div>
                    <div className="review-handle">{r.handle}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mh-section">
          <div className="container">
            <h3 className="mb-5">You Might Also Like</h3>
            <div className="row g-4">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
