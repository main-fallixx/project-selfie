import { useEffect, useMemo, useState } from 'react';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const tick = setInterval(() => {
      setProgress((current) => {
        const next = current + Math.ceil((100 - current) * 0.18);
        return next >= 100 ? 100 : next;
      });
    }, 120);

    const done = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setHidden(true), 420);
    }, 2300);

    return () => {
      clearInterval(tick);
      clearTimeout(done);
    };
  }, []);

  const percentage = useMemo(() => String(progress).padStart(2, '0'), [progress]);

  if (hidden) return null;

  return (
    <div className={`preloader ${progress === 100 ? 'fade-out' : ''}`}>
      <div className="preloader-inner">
        <img className="preloader-logo" src="/assets/images/logo.jpg" alt="SelfiePetti logo" />
        <div className="preloader-title">SELFIEPETTI</div>
        <div className="preloader-subtitle">PREPARING YOUR EXPERIENCE</div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
          <div className="progress-robot" style={{ left: `calc(${Math.max(progress, 8)}% - 38px)` }}>
            <div className="mini-robot">
              <span className="mini-antenna" />
              <span className="mini-head"><span /><span /></span>
              <span className="mini-body" />
              <span className="mini-arm left" />
              <span className="mini-arm right" />
              <span className="mini-leg left" />
              <span className="mini-leg right" />
            </div>
          </div>
        </div>
        <div className="progress-meta">
          <span>Loading</span>
          <strong>{percentage}%</strong>
        </div>
      </div>
    </div>
  );
}
