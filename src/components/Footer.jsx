import { NavLink } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-shell">
        <div className="footer-brand-block">
          <div className="footer-logo-row">
            <img src="/assets/images/logo.jpg" alt="SelfiePetti logo" />
            <div>
              <h3>SelfiePetti</h3>
              <p>Premium event entertainment, photobooths, robot booth experiences and high-energy game attractions across Tamil Nadu.</p>
            </div>
          </div>
          <div className="footer-action-row">
            <NavLink className="btn btn-primary" to="/contact">Start a quote</NavLink>
            <NavLink className="btn btn-ghost footer-ghost" to="/products">Browse products</NavLink>
          </div>
        </div>

        <div className="footer-grid">
          <div className="footer-card">
            <h4>Explore</h4>
            <ul>
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/services">Services</NavLink></li>
              <li><NavLink to="/products">Rent a Device</NavLink></li>
              <li><NavLink to="/gallery">Gallery</NavLink></li>
              <li><NavLink to="/blog">Blog</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>
          </div>
          <div className="footer-card">
            <h4>Popular experiences</h4>
            <ul>
              <li>Mirror Selfie Booth</li>
              <li>Robot Booth</li>
              <li>360 Video Booth</li>
              <li>Bull Rider</li>
              <li>Dragon Egg Gel Blaster</li>
            </ul>
          </div>
          <div className="footer-card">
            <h4>Quick contact</h4>
            <ul>
              <li><a href="tel:+919043717464">+91 90437 17464</a></li>
              <li><a href="mailto:hello@selfiepetti.com">hello@selfiepetti.com</a></li>
              <li>Tamil Nadu service coverage</li>
              <li>WhatsApp quote support through robot pet</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">© 2026 SelfiePetti. Premium responsive React website with product-led quote cart and hidden local admin dashboard.</div>
    </footer>
  );
}
