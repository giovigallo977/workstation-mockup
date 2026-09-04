import * as Dialog from "@radix-ui/react-dialog";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { miniGarment } from "./GarmentSVG";

export default function CartDrawer({ open, onOpenChange }) {
  const { cart, removeFromCart, total } = useCart();

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="cart-overlay" />
        <Dialog.Content className="cart-drawer" aria-describedby={undefined}>
          <div className="cart-drawer-header">
            <Dialog.Title asChild>
              <h5 className="text-uppercase" style={{ letterSpacing: ".1em", margin: 0 }}>Your Cart</h5>
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="btn-close btn-close-white" aria-label="Close" />
            </Dialog.Close>
          </div>
          <div className="cart-drawer-body">
            <div style={{ flex: 1 }}>
              {cart.length === 0 ? (
                <p className="text-grey text-center py-4">
                  Your cart is empty.<br />
                  Head to <Link to="/shop" onClick={() => onOpenChange(false)} style={{ textDecoration: "underline" }}>Shop</Link> and pick your next piece.
                </p>
              ) : (
                cart.map((item, idx) => (
                  <div className="cart-line" key={idx}>
                    <div className="cart-thumb">{miniGarment(item.immagine)}</div>
                    <div className="flex-grow-1">
                      <div className="cart-name">{item.nome}</div>
                      <div className="cart-meta">Size {item.size} &middot; {item.color} &middot; Qty {item.qty}</div>
                      <div className="cart-meta">€ {(item.prezzo * item.qty).toFixed(2)}</div>
                      <button type="button" className="cart-remove mt-1" onClick={() => removeFromCart(idx)}>Remove</button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="border-top pt-3 mt-2">
              <div className="d-flex justify-content-between mb-3">
                <span className="text-uppercase fw-bold">Total</span>
                <span className="fw-bold">€ {total.toFixed(2)}</span>
              </div>
              <Link to="/shop" onClick={() => onOpenChange(false)} className="btn-mh w-100 text-center d-block">Continue Shopping</Link>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
