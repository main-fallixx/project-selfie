import { useRef, useEffect, useState } from "react";

function StarRow({ count = 5 }) {
  return (
    <span className="rev-stars" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" width="14" height="14" fill="#ffbf2f">
          <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.2-5.4 3.2 1.3-6L1.3 7.7l6.1-.6z" />
        </svg>
      ))}
    </span>
  );
}

const GoogleG = ({ size = 20 }) => (
  <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden="true">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8 3l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"/>
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.1 8 3l5.7-5.7C34.6 6.1 29.6 4 24 4c-7.4 0-13.8 4.1-17.1 10.1z"/>
    <path fill="#4CAF50" d="M24 44c5.5 0 10.4-2.1 14.1-5.5l-6.5-5.5C29.6 34.9 27 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.6 5.1C9.9 39.7 16.4 44 24 44z"/>
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.6l6.5 5.5C39.5 37.4 44 31.4 44 24c0-1.3-.1-2.7-.4-3.5z"/>
  </svg>
);

function ReviewCard({ review, isDuplicate }) {
  return (
    <article className="rev-card" aria-hidden={isDuplicate ? "true" : undefined}>
      <div className="rev-card-top">
        <img
          src={`/assets/images/reviews/${review.slug}.jpg`}
          alt={isDuplicate ? "" : review.name}
          className="rev-avatar"
          loading="lazy"
          decoding="async"
          draggable="false"
        />
        <div className="rev-who">
          <strong>{review.name}</strong>
          <span>{review.type}</span>
        </div>
        <GoogleG size={20} />
      </div>
      <StarRow count={review.stars} />
      <p className="rev-text">{review.quote}</p>
    </article>
  );
}

function MarqueeRow({ reviews, direction = "left", duration = 55 }) {
  const track = [...reviews, ...reviews];
  return (
    <div className="rev-marquee">
      <div
        className={`rev-track rev-track-${direction}`}
        style={{ "--rev-duration": `${duration}s` }}
      >
        {track.map((r, i) => (
          <ReviewCard key={`${r.slug}-${i}`} review={r} isDuplicate={i >= reviews.length} />
        ))}
      </div>
    </div>
  );
}

export default function GoogleReviews({
  reviews = [],
  googleReviewUrl = "https://www.google.com/search?q=selfiepetti&oq=selfiepetti&gs_lcrp=EgZjaHJvbWUqBggAEEUYOzIGCAAQRRg7MgYIARBFGDwyEQgCEC4YChgLGK8BGMcBGIAEMgYIAxBFGDwyBggEEEUYPDIGCAUQRRg80gEIMTExMWowajSoAgCwAgE&sourceid=chrome&source=chrome.ob&ie=UTF-8#lrd=0x3b040fb3267152a7:0x3696a00c18a0622,1,,,,",
}) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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
      { threshold: 0.12 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  if (!reviews.length) return null;

  const mid = Math.ceil(reviews.length / 2);
  const rowA = reviews.slice(0, mid);
  const rowB = reviews.slice(mid);

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className={`google-reviews-section${isVisible ? " is-visible" : ""}`}
      aria-labelledby="google-reviews-heading"
    >
      <div className="google-reviews-glow" aria-hidden="true" />

      <div className="container google-reviews-head">
        <span className="eyebrow">Client Stories</span>
        <h2 id="google-reviews-heading">Real Events, Real Reactions — See Why Clients Trust Selfie Petti</h2>
        <p className="google-reviews-subtitle">
          Real reviews from real weddings, receptions, and corporate events across Tamil Nadu.
        </p>

        <div className="google-rating-badge">
          <GoogleG size={28} />
          <div className="google-rating-badge-text">
            <strong>5.0 <StarRow /></strong>
            <span>Google Review Rating</span>
          </div>
        </div>
      </div>

      <div className="google-reviews-rows">
        <MarqueeRow reviews={rowA} direction="left" duration={58} />
        <MarqueeRow reviews={rowB} direction="right" duration={50} />
      </div>

      <div className="google-reviews-cta">
        <a href={googleReviewUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
          Read All Reviews on Google
        </a>
      </div>
    </section>
  );
}