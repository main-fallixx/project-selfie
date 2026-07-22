import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { heroStats, services, showcaseTabs, reviews } from '../data/siteData';

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
            <div className="hero-lines" />
            <HeroRectangle className="rect-one float-right" />
            <HeroRectangle className="rect-two float-left" />
            <HeroRectangle className="rect-three float-right slow" />
            <HeroRectangle className="rect-four float-left slow" />
            <HeroRectangle className="rect-five float-right" />
            <div className="hero-content">
              <p className="hero-overline">SELFIEPETTI EVENT EXPERIENCES</p>
              <h1>Fun • Games •<br />Memories</h1>
              <p className="hero-copy">Photobooths, 360-degree video, arcade and carnival games for celebrations across Tamil Nadu.</p>
            </div>
            <div className="hero-dock">
              <NavLink className="dock-btn dock-dark" to="/products">Rent a device</NavLink>
              <NavLink className="dock-btn dock-pink" to="/contact">Get proposal</NavLink>
              <a className="dock-btn dock-green" href="https://wa.me/919043717464" target="_blank" rel="noreferrer">WhatsApp</a>
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
            <span className="eyebrow">Experiences</span>
            <h2>Professional event attractions for every kind of celebration.</h2>
          </div>
          <NavLink className="btn btn-ghost" to="/products">Open products</NavLink>
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
            <span className="eyebrow">Showcase reel</span>
            <h2>Video-led storytelling for instant attraction.</h2>
            <p>Switch between photobooth, robot booth, arcade and action-led moments. The section is responsive across desktop, tablet and mobile automatically.</p>
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
            <span className="eyebrow">Why choose us</span>
            <h2>More fun. Less effort.</h2>
            <div className="reason-stack">
              <div><strong>Complete event support</strong><p>From setup to guest guidance, every experience is designed to run smoothly.</p></div>
              <div><strong>Product-led booking flow</strong><p>Guests can pick experiences, add them to a quote cart and continue directly to a proper form.</p></div>
              <div><strong>Responsive by default</strong><p>The layout adapts across mobile, tablet and desktop automatically.</p></div>
            </div>
            <NavLink className="btn btn-primary" to="/contact">Plan your event</NavLink>
          </div>
        </div>
      </section>

      <section id="reviews" className="section review-section">
        <div className="container section-head-wrap">
          <div>
            <span className="eyebrow">Client stories</span>
            <h2>Good experiences. Great reactions.</h2>
          </div>
        </div>
        <div className="container card-grid three-up">
          {reviews.map((review) => (
            <article key={review.name} className="review-card hover-rise glow-card">
              <div className="stars">★★★★★</div>
              <p className="review-quote">“{review.quote}”</p>
              <div className="review-author">
                <strong>{review.name}</strong>
                <span>{review.type}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container cta-panel hover-rise">
          <span className="eyebrow">Let’s create something memorable</span>
          <h2>Move from attraction to enquiry in a faster, cleaner and more professional way.</h2>
          <p>Browse devices, build a quote cart, send your details and keep the hidden admin page separate from the public website.</p>
          <div className="button-row">
            <NavLink className="btn btn-primary" to="/products">Rent a device</NavLink>
            <NavLink className="btn btn-ghost" to="/contact">Get proposal</NavLink>
          </div>
        </div>
      </section>
    </>
  );
}
