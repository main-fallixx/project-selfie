import { NavLink } from 'react-router-dom';
import { navItems } from '../data/siteData';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { cartCount } = useCart();

  return (
    <header className="site-header">
      <div className="container nav-shell">
        <NavLink to="/" className="brand">
          <img src="/assets/images/logo.jpg" alt="SelfiePetti logo" />
          <div>
            <span className="brand-name">SelfiePetti</span>
            <span className="brand-tag">Fun • Games • Memories</span>
          </div>
        </NavLink>

        <nav className="site-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-cta">
          <NavLink className="btn btn-ghost cart-link" to="/contact">
            Quote Cart
            <span className="cart-badge">{cartCount}</span>
          </NavLink>
          <NavLink className="btn btn-primary" to="/contact">Get Proposal</NavLink>
        </div>
      </div>
    </header>
  );
}
