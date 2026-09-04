import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import ProductCard from "../components/ProductCard";
import { PRODUCTS } from "../data/products";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "tshirt", label: "T-Shirt" },
  { key: "hoodie", label: "Hoodie" },
  { key: "accessori", label: "Accessories" },
];

export default function Shop() {
  useEffect(() => { document.title = "Shop — Metal Hunters"; }, []);
  const [filter, setFilter] = useState("all");

  const list = useMemo(
    () => (filter === "all" ? PRODUCTS : PRODUCTS.filter(p => p.category === filter)),
    [filter]
  );

  return (
    <>
      <Navbar />
      <PageHeader eyebrow="Full Catalog" title="Shop">
        T-shirts, hoodies and accessories built for those who live the street. Every piece is an excuse to go out at night.
      </PageHeader>

      <section className="mh-section">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-5">
            <div className="filter-bar">
              {FILTERS.map(f => (
                <button
                  key={f.key}
                  className={"filter-btn" + (filter === f.key ? " active" : "")}
                  onClick={() => setFilter(f.key)}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <select className="form-select" style={{ width: "auto" }} aria-label="Sort by" defaultValue="new">
              <option value="new">Sort by: New In</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
          <div className="row g-4">
            {list.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
