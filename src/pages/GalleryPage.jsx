import { galleryItems } from '../data/siteData';
import { NavLink } from 'react-router-dom';

export default function GalleryPage() {
  return (
    <section className="section page-intro-gap">
      <div className="container page-copy page-copy-wide">
        <span className="eyebrow">Photo Booth & Event Games Gallery</span>
        <h1>Mirror photo booths, arcade games, bull rider, catch the stick, gel blaster and premium event experiences in one gallery.</h1>
        <p>Explore real photos and videos of Selfie Petti's photo booth rentals and interactive event games in action across weddings, corporate events and brand activations in Tirunelveli, Madurai and Tamil Nadu — see the variety before you enquire.</p>
      </div>

      <div className="container card-grid three-up gallery-grid-page">
        {galleryItems.map((item) => (
          <article key={item.title} className={`gallery-card hover-rise accent-${item.accent}`}>
            <div className="media-shell">
              <video autoPlay muted loop playsInline preload="metadata">
                <source src={item.video} type="video/mp4" />
              </video>
            </div>
            <span className="gallery-tag">{item.tag}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
<br /><br />
      <div className="container split-grid gallery-split">
        <div className="glow-panel hover-rise">
          <span className="eyebrow">Premium Game Zones</span>
          <h2>Interactive event games for a bigger wow factor at your celebration.</h2>
          <ul className="feature-list">
            <li>Arcade game booths for repeat play and friendly competition among guests</li>
            <li>Bull rider setups for hero-stage excitement at weddings and corporate events</li>
            <li>Catch the stick for quick reaction fun that keeps guests engaged</li>
            <li>Dragon egg gel blaster zones for visual action and high participation</li>
          </ul>
        </div>
        <div className="cta-panel hover-rise small-cta">
          <span className="eyebrow">Book Your Photo Booth & Games Combo</span>
          <h2>See the variety, then get your personalised quote.</h2>
          <p>A richer gallery means you can instantly see why Selfie Petti is the premium choice for photo booth rental and event entertainment in Tamil Nadu — book with confidence.</p>
          <NavLink className="btn btn-primary" to="/products">Build a Quote Cart</NavLink>
        </div>
      </div>
    </section>
  );
}