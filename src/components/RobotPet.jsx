import { useEffect, useRef } from 'react';

export default function RobotPet() {
  const message = encodeURIComponent('Hi SelfiePetti, I need help choosing the right experience for my event.');
  const petRef = useRef(null);
  const dragging = useRef(false);
  const moved = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const pet = petRef.current;
    if (!pet) return;

    const saved = JSON.parse(localStorage.getItem('robotPetPos') || 'null');
    if (saved) {
      pet.style.right = 'auto';
      pet.style.bottom = 'auto';
      pet.style.left = saved.left + 'px';
      pet.style.top = saved.top + 'px';
    }

    const startDrag = (x, y) => {
      dragging.current = true;
      moved.current = false;
      pet.classList.add('dragging');
      const rect = pet.getBoundingClientRect();
      offset.current = { x: x - rect.left, y: y - rect.top };
    };

    const moveDrag = (x, y) => {
      if (!dragging.current) return;
      moved.current = true;
      let left = x - offset.current.x;
      let top = y - offset.current.y;
      left = Math.max(0, Math.min(window.innerWidth - pet.offsetWidth, left));
      top = Math.max(0, Math.min(window.innerHeight - pet.offsetHeight, top));
      pet.style.right = 'auto';
      pet.style.bottom = 'auto';
      pet.style.left = left + 'px';
      pet.style.top = top + 'px';
    };

    const endDrag = () => {
      if (!dragging.current) return;
      dragging.current = false;
      pet.classList.remove('dragging');
      const rect = pet.getBoundingClientRect();
      localStorage.setItem('robotPetPos', JSON.stringify({ left: rect.left, top: rect.top }));
    };

    const onMouseDown = (e) => {
  e.preventDefault();
  startDrag(e.clientX, e.clientY);
};
    const onMouseMove = (e) => moveDrag(e.clientX, e.clientY);
    const onMouseUp = () => endDrag();

    const onTouchStart = (e) => {
      const t = e.touches[0];
      startDrag(t.clientX, t.clientY);
    };
    const onTouchMove = (e) => {
      const t = e.touches[0];
      moveDrag(t.clientX, t.clientY);
    };
    const onTouchEnd = () => endDrag();

    const onClickCapture = (e) => {
      if (moved.current) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    pet.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    pet.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
    pet.addEventListener('click', onClickCapture, true);

    return () => {
      pet.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      pet.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      pet.removeEventListener('click', onClickCapture, true);
    };
  }, []);

  return (
    <a
      ref={petRef}
  className="robot-pet"
  href={`https://wa.me/919043717464?text=${message}`}
  target="_blank"
  rel="noreferrer"
  aria-label="Chat on WhatsApp"
  draggable={false}
  onDragStart={(e) => e.preventDefault()}
    >
      <span className="robot-pet-bubble">Need help? Chat for a quick quote</span>
      <span className="robot-body-shell">
        <span className="pet-antenna" />
        <span className="pet-head">
          <span className="pet-eye" />
          <span className="pet-eye" />
        </span>
        <span className="pet-body">
          <span className="pet-whatsapp">📞</span>
        </span>
        <span className="pet-arm left" />
        <span className="pet-arm right" />
        <span className="pet-leg left" />
        <span className="pet-leg right" />
      </span>
    </a>
  );
}