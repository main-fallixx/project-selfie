import { useMemo, useState } from 'react';
import { contactHighlights, eventTypes } from '../data/siteData';
import { useCart } from '../context/CartContext';

const initialState = {
  name: '',
  phone: '',
  email: '',
  city: '',
  eventType: '',
  eventDate: '',
  message: ''
};

export default function ContactPage() {
  const { cartItems, removeFromCart, saveQuoteRequest } = useCart();
  const [form, setForm] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);

  const summaryText = useMemo(
    () => cartItems.map((item) => `${item.title} (${item.category})`).join(', '),
    [cartItems]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const quote = saveQuoteRequest({
      customerName: form.name,
      phone: form.phone,
      email: form.email,
      city: form.city,
      eventType: form.eventType,
      eventDate: form.eventDate,
      message: form.message
    });

    const lines = [
      'Hello SelfiePetti, I want a quote request.',
      `Selected experiences: ${quote.products.map((item) => item.title).join(', ') || 'No products selected'}`,
      `Name: ${quote.customerName}`,
      `Phone: ${quote.phone}`,
      `Email: ${quote.email || '-'}`,
      `City: ${quote.city}`,
      `Event type: ${quote.eventType}`,
      `Event date: ${quote.eventDate || '-'}`,
      `Message: ${quote.message || '-'}`
    ];
    const message = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/9188838616123?text=${message}`, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
    setForm(initialState);
  };

  return (
    <section className="section page-intro-gap">
      <div className="container contact-layout enhanced-contact-layout">
        <aside className="info-card hover-rise glow-card">
          <span className="eyebrow">Contact Selfie Petti — Photo Booth Rental in Tirunelveli & Madurai</span>
          <h1>{cartItems.length} product{cartItems.length === 1 ? '' : 's'} in your quote request</h1>
          <p>Review your selected photo booths and event entertainment below. When you continue, your quote request is saved for our team to review and also sent directly to us on WhatsApp for a fast response.</p>
          <div className="quote-review-list">
            {cartItems.length === 0 ? (
              <div className="empty-cart">No photo booths or event experiences selected yet. Browse our Rent a Device page to add mirror photo booths, AI photo booths, 360 video booths and more.</div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="quote-review-item">
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.category}</span>
                  </div>
                  <button type="button" onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              ))
            )}
          </div>
          <div className="summary-box">
            <strong>Your quote summary</strong>
            <p>{summaryText || 'Your selected photo booths and event games will appear here automatically.'}</p>
          </div>
          <ul className="feature-list compact-features">
            {contactHighlights.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </aside>

        <form className="form-card hover-rise" onSubmit={handleSubmit}>
          <span className="eyebrow">Get Your Free Photo Booth Quote</span>
          <h2>Tell us about your event in Tamil Nadu</h2>
          {submitted && <div className="success-note">Your quote request has been submitted. It's saved for our team to review and has opened in WhatsApp so we can confirm availability quickly.</div>}

          <div className="form-section-title">01 <span>Your details</span></div>
          <div className="form-grid">
            <label>
              Your name *
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </label>
            <label>
              Phone number *
              <div className="phone-input-wrap">
                <span>+91</span>
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
              </div>
            </label>
            <label>
              Email address
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </label>
            <label>
              City *
              <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} required />
            </label>
          </div>

          <div className="form-section-title">02 <span>Your event</span></div>
          <div className="form-grid">
            <label>
              Event type *
              <select value={form.eventType} onChange={(e) => setForm({ ...form, eventType: e.target.value })} required>
                <option value="">Select your event type</option>
                {eventTypes.map((type) => <option key={type} value={type}>{type}</option>)}
              </select>
            </label>
            <label>
              Event date
              <input type="date" value={form.eventDate} onChange={(e) => setForm({ ...form, eventDate: e.target.value })} />
            </label>
          </div>

          <label>
            Message
            <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Venue, guest count, timing and anything else we should know to plan your photo booth experience..." />
          </label>

          <button className="btn btn-primary submit-btn" type="submit">Submit Quote Request</button>
        </form>
      </div>
    </section>
  );
}