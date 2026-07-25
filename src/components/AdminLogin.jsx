import { useState } from 'react';
import { login } from '../data/adminAuth';
import '../admin.css';

export default function AdminLogin({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = login(email, password);
    if (!result.success) {
      setError(result.error);
      return;
    }
    setError('');
    onSuccess(result.admin);
  };

  return (
    <div className="admin-shell admin-login-shell">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <span className="admin-header-eyebrow">Selfie Petti Admin</span>
        <h1 className="admin-login-title">Admin Sign In</h1>
        <p className="admin-login-subtitle">Enter your credentials to access the dashboard.</p>

        {error && <div className="admin-login-error">{error}</div>}

        <label className="admin-label">
          Email
          <input
            type="email"
            className="admin-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />
        </label>
        <label className="admin-label">
          Password
          <input
            type="password"
            className="admin-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit" className="admin-btn admin-btn-primary admin-login-btn">
          Sign In
        </button>
      </form>
    </div>
  );
}