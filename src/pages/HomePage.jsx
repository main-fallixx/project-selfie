import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  heroStats,
  services,
  showcaseTabs,
  reviews,
  trustedLogos,
} from "../data/siteData";

import TrustedLogos from "../components/TrustedLogos";
// ...inside the JSX, e.g. right after the stats-band section:
import GoogleReviews from "../components/GoogleReviews";
import { googleReviews } from "../data/siteData";
function HeroRectangle({ className }) {
  return <span className={`hero-rectangle ${className}`} aria-hidden="true" />;
}

export default function HomePage() {
  const [activeVideo, setActiveVideo] = useState(showcaseTabs[0].video);

  return (
    <>
<section className="hero-home section">
        <div className="container">
          <div className="hero-box">
            <div className="hero-clip">
              <div className="hero-lines" />
              <HeroRectangle className="rect-one float-right" />
              <HeroRectangle className="rect-two float-left" />
              <HeroRectangle className="rect-three float-right slow" />
              <HeroRectangle className="rect-four float-left slow" />
              <HeroRectangle className="rect-five float-right" />
            </div>
            <div className="hero-content">
              <p className="hero-overline">SELFIE PETTI — PREMIUM PHOTO BOOTH & EVENT ENTERTAINMENT</p>
              <h1>Fun • Games •<br />Memories</h1>
              <p className="hero-copy">Selfie Petti is a premium photo booth rental and event entertainment company based in Tirunelveli, Tamil Nadu, serving weddings, corporate events, birthdays and brand activations across Madurai, Thoothukudi, Kanyakumari, Nagercoil, Tenkasi, Sivakasi and South India. From mirror photo booths and 360 video booths to AI photo booths, arcade and carnival games, we bring interactive, memorable experiences to every celebration.</p>
            </div>
            <div className="hero-dock">
              <NavLink className="dock-btn dock-dark" to="/products">Rent a Photo Booth</NavLink>
              <NavLink className="dock-btn dock-pink" to="/contact">Get a Free Proposal</NavLink>
              <a className="dock-btn dock-green" href="https://wa.me/919043717464" target="_blank" rel="noreferrer">Chat on WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
      <section className="section stats-band">
        <div className="container card-grid four-up">
          {heroStats.map((item) => (
            <article key={item.title} className="glass-card hover-rise">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container section-head-wrap">
          <div>
            <span className="eyebrow">Our Photo Booth & Event Entertainment Services</span>
            <h2>Premium photo booth rentals and interactive event entertainment for every celebration in Tamil Nadu.</h2>
          </div>
          <NavLink
  to="/products"
  style={{
    display: "inline-flex",
    alignItems: "center",
    whiteSpace: "nowrap",
    padding: "10px 20px",
    borderRadius: "8px",
    background: "#222",
    color: "#fff",
    textDecoration: "none",
    transition: "all 0.3s ease",
  }}
  onMouseEnter={(e) => {
    e.target.style.background =
      "linear-gradient(90deg, #ec4899, #3b82f6)";
    e.target.style.transform = "scale(1.05)";
    e.target.style.boxShadow = "0 8px 20px rgba(59,130,246,0.4)";
  }}
  onMouseLeave={(e) => {
    e.target.style.background = "#222";
    e.target.style.transform = "scale(1)";
    e.target.style.boxShadow = "none";
  }}
>
  View All Photo Booths & Games
</NavLink>
        </div>
        <div className="container card-grid three-up">
          {services.slice(0, 6).map((service) => (
            <article key={service.title} className="service-card hover-rise glow-card">
              <div className="media-shell">
                <video autoPlay muted loop playsInline preload="metadata">
                  <source src={service.video} type="video/mp4" />
                </video>
              </div>
              <span className="service-tag">{service.tag}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul>
                {service.features.map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container split-grid">
          <div className="glow-panel hover-rise">
            <span className="eyebrow">Watch It In Action</span>
            <h2>See our mirror photo booth, AI photo booth and 360 video booth in real events.</h2>
            <p>Switch between our photo booth, robot booth, arcade and action-led moments to see why Selfie Petti is a trusted photo booth company for weddings, corporate events and brand activations. This section adjusts automatically across desktop, tablet and mobile.</p>
            <div className="video-shell large">
              <video key={activeVideo} autoPlay muted loop controls playsInline preload="metadata">
                <source src={activeVideo} type="video/mp4" />
              </video>
            </div>
            <div className="tab-row">
              {showcaseTabs.map((tab) => (
                <button
                  key={tab.label}
                  type="button"
                  className={`tab-pill ${activeVideo === tab.video ? 'active' : ''}`}
                  onClick={() => setActiveVideo(tab.video)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <div className="why-card hover-rise">
            <span className="eyebrow">Why Choose Selfie Petti</span>
            <h2>Premium photo booth experiences, delivered with less effort on your part.</h2>
            <div className="reason-stack">
              <div><strong>Complete event support</strong><p>From setup to guest guidance, our team manages every photo booth and event entertainment experience from start to finish, so your event runs smoothly.</p></div>
              <div><strong>Product-led booking flow</strong><p>Browse our photo booths and event games, add your favourites to a quote cart, and continue directly to a simple enquiry form — no back-and-forth needed.</p></div>
              <div><strong>Responsive by default</strong><p>Our website and booking experience adapt automatically across mobile, tablet and desktop, so planning your event is easy from anywhere.</p></div>
            </div>
            <NavLink className="btn btn-primary" to="/contact">Plan Your Event</NavLink>
          </div>
        </div>
      </section>
<TrustedLogos logos={trustedLogos} />

  <GoogleReviews reviews={googleReviews} />

      <section className="section">
        <div className="container cta-panel hover-rise">
          <span className="eyebrow">Let's Create Something Memorable</span>
          <h2>Book Tamil Nadu's premium photo booth and event entertainment company today.</h2>
          <p>Browse our photo booths and event games, build your quote cart, and send us your event details — a faster, cleaner and more professional way to book event entertainment in Tirunelveli, Madurai and across South India.</p>
          <div className="button-row">
            <NavLink className="btn btn-primary" to="/products">Rent a Photo Booth</NavLink>
            <NavLink className="btn btn-ghost" to="/contact">Get a Free Proposal</NavLink>
          </div>
        </div>
      </section>
    </>
  );
}