import { useState } from "react";
import { NavLink } from "react-router-dom";

import { navItems } from "../data/siteData";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container nav-shell">

        <NavLink to="/" className="brand">
          <img src="/assets/images/Logo.png" alt="Selfie Petti - Premium Photo Booth Rental & Event Entertainment in Tirunelveli, Tamil Nadu" />
        </NavLink>

        <nav className={`site-nav ${menuOpen ? "open" : ""}`}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}

          <div className="mobile-buttons">

            <NavLink
              className="btn btn-ghost cart-link"
              to="/contact"
              onClick={() => setMenuOpen(false)}
            >
              Quote Cart
              <span className="cart-badge">{cartCount}</span>
            </NavLink>

            <NavLink
              className="btn btn-primary"
              to="/contact"
              onClick={() => setMenuOpen(false)}
            >
              Get Free Quote
            </NavLink>

          </div>

        </nav>

        <div className="nav-cta">

          <NavLink className="btn btn-ghost cart-link" to="/contact">
            Quote Cart
            <span className="cart-badge">{cartCount}</span>
          </NavLink>

          <NavLink className="btn btn-primary" to="/contact">
            Get Free Quote
          </NavLink>

        </div>

 <button
  className={`menu-toggle ${menuOpen ? "active" : ""}`}
  onClick={() => setMenuOpen(!menuOpen)}
>
  <span></span>
  <span></span>
</button>
      </div>
    </header>
  );
}