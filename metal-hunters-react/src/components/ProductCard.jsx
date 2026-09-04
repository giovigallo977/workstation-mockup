import { Link } from "react-router-dom";
import GarmentSVG from "./GarmentSVG";
import Photo from "./Photo";
import { categoryLabel } from "../data/products";

export default function ProductCard({ product }) {
  const badgeBg = product.badge === "Limited" ? "var(--mh-ice)" : "var(--mh-white)";
  return (
    <div className="col-6 col-md-4 col-lg-3">
      <Link className="product-card-link" to={`/product/${product.id}`}>
        <div className="product-card">
          {product.badge && (
            <span className="card-badge" style={{ background: badgeBg, color: "var(--mh-black)" }}>{product.badge}</span>
          )}
          <div className="card-media">
            {product.photo ? (
              <Photo src={product.photo} alt={product.name} fallbackLabel={product.name} />
            ) : (
              <GarmentSVG product={product} />
            )}
          </div>
          <div className="card-body">
            <div className="product-cat">{categoryLabel(product.category)}</div>
            <div className="product-name">{product.name}</div>
            <div className="product-price">€ {product.price.toFixed(2)}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}
