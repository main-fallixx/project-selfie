import { services } from '../data/siteData';
import { NavLink } from 'react-router-dom';

export default function ServicesPage() {
  return (
    <section className="section page-intro-gap">
      <div className="container page-copy page-copy-wide">
        <span className="eyebrow">Photo Booth & Event Entertainment Services</span>
        <h1>Premium photo booth rentals and event entertainment designed for fun, energy and memorable guest interaction.</h1>
        <p>From mirror photo booths and AI photo booths to 360 video booths and interactive event games, each service below is presented clearly so you can compare options, find the right fit for your wedding, corporate event or brand activation, and move straight into your quote cart.</p>
      </div>
      <div className="container card-grid three-up services-grid">
        {services.map((service) => (
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
      <div className="container inline-cta-row">
        <NavLink className="btn btn-primary" to="/products">Rent a Photo Booth</NavLink>
        <NavLink className="btn btn-ghost" to="/contact">Start Your Proposal</NavLink>
      </div>
    </section>
  );
}