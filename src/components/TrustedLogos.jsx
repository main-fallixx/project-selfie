import { useRef, useEffect, useState } from "react";
export default function TrustedLogos({
  logos = [],
  speed = 38,
  heading = 'Trusted By Leading Brands & Event Partners',
  subtitle = 'Event Organizers • Wedding Planners • Decorators • Corporate Clients • Educational Institutions',
}) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Reveal the section with a fade-in once it scrolls into view.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  if (!logos.length) return null;

  // Duplicate the list so the marquee can loop seamlessly (track scrolls
  // exactly -50%, at which point the second copy lines up perfectly with
  // where the first copy started).
  const trackLogos = [...logos, ...logos];

  return (
    <section
      ref={sectionRef}
      className={`trusted-logos-section${isVisible ? ' is-visible' : ''}`}
      aria-labelledby="trusted-logos-heading"
      style={{ '--marquee-duration': `${speed}s` }}
    >
      <div className="trusted-logos-glow" aria-hidden="true" />

      <div className="container trusted-logos-head">
        <span className="eyebrow">Who We Work With</span>
        <h2 id="trusted-logos-heading">{heading}</h2>
        <p className="trusted-logos-subtitle">{subtitle}</p>
      </div>

      <div className="trusted-logos-marquee" role="group" aria-label="Client and partner logos">
        <div className="trusted-logos-fade trusted-logos-fade-left" aria-hidden="true" />
        <div className="trusted-logos-fade trusted-logos-fade-right" aria-hidden="true" />

        <div className="trusted-logos-track">
          {trackLogos.map((logo, index) => {
            // Small deterministic "randomness" (based on index) so cards get
            // a natural, non-repeating tilt without re-randomizing on every
            // render.
            const tiltPool = [-2, -1, 0, 1, 2];
            const tilt = tiltPool[index % tiltPool.length];
            const isDuplicate = index >= logos.length;

            return (
              <div
                key={`${logo.id}-${index}`}
                className="trusted-logo-card"
                style={{ '--card-tilt': `${tilt}deg` }}
                // Duplicated set is purely decorative for the seamless loop.
                aria-hidden={isDuplicate ? 'true' : undefined}
              >
                <img
                  src={logo.image}
                  alt={isDuplicate ? '' : logo.name}
                  loading="lazy"
                  decoding="async"
                  draggable="false"
                  className="trusted-logo-img"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}