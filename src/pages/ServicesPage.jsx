import { services } from '../data/siteData';
import { NavLink } from 'react-router-dom';

export default function ServicesPage() {
  return (
    <section className="section page-intro-gap">
      <div className="container page-copy page-copy-wide">
        <span className="eyebrow">Services</span>
        <h1>Premium attractions designed for fun, energy and memorable guest interaction.</h1>
        <p>Every experience is presented more clearly so visitors can understand the offer faster, compare options more easily and move toward the quote cart without friction.</p>
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
        <NavLink className="btn btn-primary" to="/products">Go to rent a device</NavLink>
        <NavLink className="btn btn-ghost" to="/contact">Start proposal</NavLink>
      </div>
    </section>
  );
}
