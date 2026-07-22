import { useEffect, useState } from 'react';
import { getStoredQuotes } from '../context/CartContext';

export default function AdminPage() {
  const [quotes, setQuotes] = useState([]);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const key = window.prompt('Enter admin access key');
    if (key === 'selfiepetti-admin') {
      setAllowed(true);
      setQuotes(getStoredQuotes());
    }
  }, []);

  if (!allowed) {
    return (
      <div className="admin-page">
        <div className="admin-login-card">
          <h1>Admin dashboard locked</h1>
          <p>This page is intentionally not linked anywhere on the public website. Change the access key inside <code>src/pages/AdminPage.jsx</code> before deployment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-shell">
        <div className="admin-topbar">
          <div>
            <span className="eyebrow">Hidden admin</span>
            <h1>Quote requests</h1>
          </div>
          <button className="btn btn-ghost" type="button" onClick={() => setQuotes(getStoredQuotes())}>Refresh</button>
        </div>

        <div className="admin-grid">
          {quotes.length === 0 ? (
            <div className="admin-card">No local quote requests yet.</div>
          ) : (
            quotes.map((quote) => (
              <article key={quote.id} className="admin-card">
                <h3>{quote.customerName}</h3>
                <p><strong>Phone:</strong> {quote.phone}</p>
                <p><strong>Email:</strong> {quote.email || '-'}</p>
                <p><strong>City:</strong> {quote.city}</p>
                <p><strong>Event:</strong> {quote.eventType}</p>
                <p><strong>Date:</strong> {quote.eventDate || '-'}</p>
                <p><strong>Products:</strong> {quote.products.map((item) => item.title).join(', ') || '-'}</p>
                <p><strong>Message:</strong> {quote.message || '-'}</p>
                <small>{quote.createdAt}</small>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
