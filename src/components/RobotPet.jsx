import { useRef, useState, useEffect } from 'react';

export default function RobotPet() {
  const message = encodeURIComponent('Hi SelfiePetti, I need help choosing the right experience for my event.');

  const petRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(null); // null = use default CSS right/bottom
  const offset = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);

  const startDrag = (x, y) => {
    const rect = petRef.current.getBoundingClientRect();
    offset.current = { x: x - rect.left, y: y - rect.top };
    hasMoved.current = false;
    setIsDragging(true);
    setPosition({ left: rect.left, top: rect.top });
  };

  const moveDrag = (x, y) => {
    hasMoved.current = true;
    const pet = petRef.current;
    let newX = x - offset.current.x;
    let newY = y - offset.current.y;

    const maxX = window.innerWidth - pet.offsetWidth;
    const maxY = window.innerHeight - pet.offsetHeight;
    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));

    setPosition({ left: newX, top: newY });
  };

  const endDrag = () => setIsDragging(false);

  useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (e) => moveDrag(e.clientX, e.clientY);
    const onTouchMove = (e) => {
      const t = e.touches[0];
      moveDrag(t.clientX, t.clientY);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', endDrag);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', endDrag);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', endDrag);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', endDrag);
    };
  }, [isDragging]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    startDrag(e.clientX, e.clientY);
  };

  const handleTouchStart = (e) => {
    const t = e.touches[0];
    startDrag(t.clientX, t.clientY);
  };

  const handleClick = (e) => {
    if (hasMoved.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const style = position
    ? { left: position.left, top: position.top, right: 'auto', bottom: 'auto' }
    : undefined;

  return (
    <a
      ref={petRef}
      className={`robot-pet${isDragging ? ' dragging' : ''}`}
      style={style}
      href={`https://wa.me/919043717464?text=${message}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onClick={handleClick}
    >
      <span className="robot-pet-bubble">Need help? Chat for a quick quote</span>
      <span className="robot-body-shell">
        <span className="pet-antenna" />
        <span className="pet-head">
          <span className="pet-eye" />
          <span className="pet-eye" />
        </span>
        <span className="pet-body">
          <span className="pet-whatsapp">✆</span>
        </span>
        <span className="pet-arm left" />
        <span className="pet-arm right" />
        <span className="pet-leg left" />
        <span className="pet-leg right" />
      </span>
    </a>
  );
}
