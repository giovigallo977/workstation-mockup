import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import CartDrawer from "./CartDrawer";

const NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/hall-of-fame", label: "Hall of Fame" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar({ hasHero = false }) {
  const [scrolled, setScrolled] = useState(!hasHero);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { count } = useCart();
  const showToast = useToast();
  const searchRef = useRef(null);

  useEffect(() => {
    if (!hasHero) { setScrolled(true); return; }
    function onScroll() { setScrolled(window.scrollY > 60); }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasHero]);

  function handleSearchSubmit(e) {
    e.preventDefault();
    showToast("Search is coming with the next drop. In the meantime, check out the Shop.");
    if (searchRef.current) searchRef.current.value = "";
  }

  const navClass = ["mh-navbar", scrolled ? "scrolled" : "", mobileOpen ? "menu-open" : ""].filter(Boolean).join(" ");

  return (
    <>
      <nav className={navClass}>
        <div className="container-fluid px-4 px-lg-5">
          <div className="navbar-inner">
            <Link className="navbar-brand" to="/">
              <img className="brand-mark" src="assets/logo-mark-white.png" alt="" width="56" height="30" />
              Metal Hunters
            </Link>

            <div className="navbar-desktop-extra">
              <ul className="nav-links list-unstyled d-flex" style={{ margin: 0 }}>
                {NAV_ITEMS.map(item => (
                  <li key={item.to}>
                    <NavLink to={item.to} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} end={item.to === "/"}>
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <form className="mh-search" role="search" onSubmit={handleSearchSubmit}>
                <input ref={searchRef} type="search" placeholder="Search the site..." aria-label="Search" />
                <button type="submit" aria-label="Search">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" /></svg>
                </button>
              </form>
            </div>

            <div className="navbar-actions">
              <button className="mh-icon-btn" type="button" aria-label="Open cart" onClick={() => setCartOpen(true)}>
                <svg width="22" height="22" viewBox="0 0 16 16" fill="currentColor"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 14.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0m9 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" /></svg>
                {count > 0 && <span className="badge rounded-pill cart-count">{count}</span>}
              </button>

              <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
                <Dialog.Trigger asChild>
                  <button className="navbar-toggler" type="button" aria-label="Open menu">
                    <svg width="22" height="22" viewBox="0 0 30 30"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M4 7h22M4 15h22M4 23h22" /></svg>
                  </button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="mobile-nav-overlay" />
                  <Dialog.Content className="mobile-nav-content" aria-describedby={undefined}>
                    <div className="mobile-nav-top">
                      <Dialog.Title asChild>
                        <span className="navbar-brand" style={{ fontSize: "1.4rem" }}>Metal Hunters</span>
                      </Dialog.Title>
                      <Dialog.Close asChild>
                        <button className="btn-close btn-close-white" aria-label="Close menu" />
                      </Dialog.Close>
                    </div>
                    <ul className="list-unstyled">
                      {NAV_ITEMS.map(item => (
                        <li key={item.to}>
                          <NavLink
                            to={item.to}
                            end={item.to === "/"}
                            className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                            onClick={() => setMobileOpen(false)}
                          >
                            {item.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                    <form className="mh-search mt-4" role="search" onSubmit={(e) => { handleSearchSubmit(e); setMobileOpen(false); }}>
                      <input type="search" placeholder="Search the site..." aria-label="Search" />
                      <button type="submit" aria-label="Search">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" /></svg>
                      </button>
                    </form>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            </div>
          </div>
        </div>
      </nav>

      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </>
  );
}
