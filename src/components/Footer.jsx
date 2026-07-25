import { NavLink } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-shell">
        <div className="footer-brand-block">
          <div className="footer-logo-row">
            <img src="/assets/images/logo.jpg" alt="Selfie Petti - Premium Photo Booth Rental & Event Entertainment Company in Tirunelveli, Tamil Nadu" />
            <div>
              <h3>Selfie Petti</h3>
              <p>Premium photo booth rental and event entertainment company based in Tirunelveli, offering mirror photo booths, AI photo booths, 360 video booths and high-energy game attractions for weddings, corporate events and celebrations across Tamil Nadu.</p>
            </div>
          </div>
          <div className="footer-action-row">
            <NavLink className="btn btn-primary" to="/contact">Get a Free Quote</NavLink>
            <NavLink className="btn btn-ghost footer-ghost" to="/products">Browse Photo Booths</NavLink>
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
            <h4>Popular Photo Booths & Experiences</h4>
            <ul>
              <li>Mirror Photo Booth</li>
              <li>AI Photo Booth</li>
              <li>360 Video Booth</li>
              <li>Bull Rider</li>
              <li>Dragon Egg Gel Blaster</li>
            </ul>
          </div>
          <div className="footer-card">
            <h4>Quick Contact</h4>
            <ul>
              <li><a href="tel:+919043717464">+91 90437 17464</a></li>
              <li><a href="mailto:hello@selfiepetti.com">hello@selfiepetti.com</a></li>
              <li>Serving Tirunelveli, Madurai, Thoothukudi, Kanyakumari, Nagercoil, Tenkasi, Sivakasi and Tamil Nadu</li>
              <li>WhatsApp quote support available</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">© 2026 Selfie Petti. Premium photo booth rental and event entertainment company in Tirunelveli, Tamil Nadu.</div>
    </footer>
  );
}