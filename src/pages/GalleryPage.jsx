import { galleryItems } from '../data/siteData';
import { NavLink } from 'react-router-dom';

export default function GalleryPage() {
  return (
    <section className="section page-intro-gap">
      <div className="container page-copy page-copy-wide">
        <span className="eyebrow">Gallery</span>
        <h1>Arcade games, bull rider, catch the stick, gel blaster and premium booth experiences in one rich gallery.</h1>
        <p>This page gives the games and attraction inventory much stronger visual weight so visitors feel the variety before they ask about price.</p>
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

      <div className="container split-grid gallery-split">
        <div className="glow-panel hover-rise">
          <span className="eyebrow">Premium game zones</span>
          <h2>More game-led experiences for a bigger wow factor.</h2>
          <ul className="feature-list">
            <li>Arcade game booths for repeat play and friendly competition</li>
            <li>Bull rider setups for hero-stage excitement</li>
            <li>Catch the stick for quick reaction fun</li>
            <li>Dragon egg gel blaster zones for visual action and high participation</li>
          </ul>
        </div>
        <div className="cta-panel hover-rise small-cta">
          <span className="eyebrow">Book your combo</span>
          <h2>Show the variety before talking price.</h2>
          <p>A richer gallery improves perceived value because visitors can instantly see more reasons to book.</p>
          <NavLink className="btn btn-primary" to="/products">Build a quote cart</NavLink>
        </div>
      </div>
    </section>
  );
}
