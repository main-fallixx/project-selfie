export default function RobotPet() {
  const message = encodeURIComponent('Hi SelfiePetti, I need help choosing the right experience for my event.');

  return (
    <a
      className="robot-pet"
      href={`https://wa.me/919043717464?text=${message}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
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
