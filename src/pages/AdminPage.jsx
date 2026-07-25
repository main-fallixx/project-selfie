import { useEffect, useMemo, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';
import { getStoredQuotes } from '../context/CartContext';
import { getAllProducts, addProduct, updateProduct, deleteProduct, resetAllOverrides } from '../data/productStore';
import { getCurrentAdmin, getAllAdmins, addAdmin, updateAdmin, deleteAdmin, logout } from '../data/adminAuth';
import AdminLogin from '../components/AdminLogin';
import '../admin.css';

const COLORS = ['#ec4899', '#3b82f6', '#f59e0b', '#10b981', '#8b5cf6', '#ef4444', '#06b6d4'];
const QUOTES_KEY = 'selfiepetti_quote_requests';
const CATEGORIES = ['Photo Experiences', 'Photography Products', 'Arcade Games', 'Carnival Games'];

const emptyProductForm = { id: '', title: '', category: CATEGORIES[0], description: '', video: '', badge: '' };
const emptyAdminForm = { name: '', email: '', password: '' };

export default function AdminPage() {
  const [currentAdmin, setCurrentAdmin] = useState(() => getCurrentAdmin());
  const [activeTab, setActiveTab] = useState('products');

  const [quotes, setQuotes] = useState([]);
  const [search, setSearch] = useState('');

  const [products, setProducts] = useState([]);
  const [productForm, setProductForm] = useState(emptyProductForm);
  const [editingProductId, setEditingProductId] = useState(null);
  const [productSearch, setProductSearch] = useState('');

  const [admins, setAdmins] = useState([]);
  const [adminForm, setAdminForm] = useState(emptyAdminForm);
  const [editingAdminId, setEditingAdminId] = useState(null);
  const [adminError, setAdminError] = useState('');

  useEffect(() => {
    if (!currentAdmin) return;
    setQuotes(getStoredQuotes());
    setProducts(getAllProducts());
    setAdmins(getAllAdmins());
  }, [currentAdmin]);

  const handleLogout = () => {
    logout();
    setCurrentAdmin(null);
  };

  // --- Quote actions ---
  const refresh = () => setQuotes(getStoredQuotes());

  const clearAll = () => {
    if (window.confirm('Delete all stored quote requests? This cannot be undone.')) {
      window.localStorage.removeItem(QUOTES_KEY);
      setQuotes([]);
    }
  };

  const removeQuote = (id) => {
    const updated = quotes.filter((q) => q.id !== id);
    window.localStorage.setItem(QUOTES_KEY, JSON.stringify(updated));
    setQuotes(updated);
  };

  // --- Product actions ---
  const resetProductForm = () => {
    setProductForm(emptyProductForm);
    setEditingProductId(null);
  };

  const handleProductSubmit = (event) => {
    event.preventDefault();
    if (!productForm.title.trim() || !productForm.video.trim()) {
      window.alert('Title and video URL are required.');
      return;
    }
    if (editingProductId) {
      updateProduct(editingProductId, productForm);
    } else {
      addProduct(productForm);
    }
    setProducts(getAllProducts());
    resetProductForm();
  };

  const handleEditProductClick = (product) => {
    setEditingProductId(product.id);
    setProductForm({
      id: product.id,
      title: product.title,
      category: product.category,
      description: product.description,
      video: product.video,
      badge: product.badge || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Delete this product from the public catalogue?')) {
      deleteProduct(id);
      setProducts(getAllProducts());
      if (editingProductId === id) resetProductForm();
    }
  };

  const handleResetOverrides = () => {
    if (window.confirm('Reset all product edits, additions and deletions back to the original catalogue?')) {
      resetAllOverrides();
      setProducts(getAllProducts());
      resetProductForm();
    }
  };

  const filteredAdminProducts = useMemo(() => {
    if (!productSearch.trim()) return products;
    const term = productSearch.toLowerCase();
    return products.filter((p) =>
      [p.title, p.category, p.description].filter(Boolean).some((f) => f.toLowerCase().includes(term))
    );
  }, [products, productSearch]);

  // --- Admin management actions ---
  const resetAdminForm = () => {
    setAdminForm(emptyAdminForm);
    setEditingAdminId(null);
    setAdminError('');
  };

  const handleAdminSubmit = (event) => {
    event.preventDefault();
    setAdminError('');

    if (editingAdminId) {
      const result = updateAdmin(editingAdminId, {
        name: adminForm.name,
        email: adminForm.email,
        ...(adminForm.password ? { password: adminForm.password } : {})
      }, currentAdmin);

      if (!result.success) {
        setAdminError(result.error);
        return;
      }
    } else {
      if (!currentAdmin.isOwner) {
        setAdminError('Only the owner can create new admin accounts.');
        return;
      }
      if (!adminForm.password.trim()) {
        setAdminError('Password is required for a new admin.');
        return;
      }
      const result = addAdmin(adminForm);
      if (!result.success) {
        setAdminError(result.error);
        return;
      }
    }

    setAdmins(getAllAdmins());
    resetAdminForm();
  };

  const handleEditAdminClick = (admin) => {
    setEditingAdminId(admin.id);
    setAdminForm({ name: admin.name, email: admin.email, password: '' });
    setAdminError('');
  };

  const handleDeleteAdminClick = (admin) => {
    if (!window.confirm(`Delete admin "${admin.name}"?`)) return;
    const result = deleteAdmin(admin.id, currentAdmin);
    if (!result.success) {
      window.alert(result.error);
      return;
    }
    setAdmins(getAllAdmins());
  };

  // --- Analytics data ---
  const eventTypeData = useMemo(() => {
    const counts = {};
    quotes.forEach((q) => {
      const key = q.eventType || 'Unspecified';
      counts[key] = (counts[key] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [quotes]);

  const productData = useMemo(() => {
    const counts = {};
    quotes.forEach((q) => {
      (q.products || []).forEach((p) => {
        counts[p.title] = (counts[p.title] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);
  }, [quotes]);

  const cityData = useMemo(() => {
    const counts = {};
    quotes.forEach((q) => {
      const key = q.city || 'Unspecified';
      counts[key] = (counts[key] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [quotes]);

  const timelineData = useMemo(() => {
    const counts = {};
    quotes.forEach((q) => {
      const day = (q.createdAt || '').slice(0, 10);
      if (!day) return;
      counts[day] = (counts[day] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => (a.date > b.date ? 1 : -1));
  }, [quotes]);

  const filteredQuotes = useMemo(() => {
  if (!search.trim()) return quotes;
  const term = search.toLowerCase();
  return quotes.filter((q) =>
    [q.customerName, q.phone, q.email, q.city, q.eventType]
      .filter(Boolean)
      .some((field) => field.toLowerCase().includes(term))
  );
}, [quotes, search]);

if (!currentAdmin) {
  return (
    <AdminLogin
      onSuccess={(admin) => setCurrentAdmin(admin)}
    />
  );
}


  return (
    <div className="admin-shell">
      <div className="admin-header">
        <div>
          <span className="admin-header-eyebrow">Selfie Petti Admin</span>
          <h1>Dashboard</h1>
          <p>Manage your product catalogue, admin accounts and track quote request analytics.</p>
        </div>
      </div>

      <div className="admin-topbar">
        <div className="admin-user-chip">
          {currentAdmin.name || currentAdmin.email}
          {currentAdmin.isOwner && <span className="admin-owner-pill">Owner</span>}
          <button type="button" className="admin-btn admin-btn-ghost" onClick={handleLogout}>Log Out</button>
        </div>
      </div>

      <div className="admin-tabs">
        <button type="button" className={`admin-tab ${activeTab === 'products' ? 'active' : ''}`} onClick={() => setActiveTab('products')}>
          Products
        </button>
        <button type="button" className={`admin-tab ${activeTab === 'analytics' ? 'active' : ''}`} onClick={() => setActiveTab('analytics')}>
          Quote Analytics
        </button>
        <button type="button" className={`admin-tab ${activeTab === 'admins' ? 'active' : ''}`} onClick={() => setActiveTab('admins')}>
          Admin Accounts
        </button>
      </div>

      {activeTab === 'products' && (
        <div className="admin-container">
          <div className="admin-panel">
            <div className="admin-panel-head">
              <div>
                <span className="admin-panel-eyebrow">{editingProductId ? 'Edit Product' : 'Add New Product'}</span>
                <h2>{editingProductId ? `Editing: ${productForm.title}` : 'Add a photo booth or event game'}</h2>
              </div>
            </div>
            <form onSubmit={handleProductSubmit}>
              <div className="admin-form-grid">
                <label className="admin-label">
                  Title *
                  <input className="admin-input" value={productForm.title} onChange={(e) => setProductForm({ ...productForm, title: e.target.value })} required />
                </label>
                <label className="admin-label">
                  Category *
                  <select className="admin-select" value={productForm.category} onChange={(e) => setProductForm({ ...productForm, category: e.target.value })} required>
                    {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </label>
                <label className="admin-label">
                  Badge
                  <input className="admin-input" placeholder="e.g. Trending, New, Most Booked" value={productForm.badge} onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })} />
                </label>
                <label className="admin-label">
                  Video URL *
                  <input className="admin-input" placeholder="https://... (direct .mp4 or Cloudinary link)" value={productForm.video} onChange={(e) => setProductForm({ ...productForm, video: e.target.value })} required />
                </label>
              </div>
              <label className="admin-label" style={{ marginBottom: '1rem' }}>
                Description
                <textarea className="admin-textarea" value={productForm.description} onChange={(e) => setProductForm({ ...productForm, description: e.target.value })} placeholder="Short description shown on the product card..." />
              </label>
              <div className="admin-btn-row">
                <button type="submit" className="admin-btn admin-btn-primary">{editingProductId ? 'Save Changes' : 'Add Product'}</button>
                {editingProductId && <button type="button" className="admin-btn admin-btn-ghost" onClick={resetProductForm}>Cancel Edit</button>}
              </div>
            </form>
          </div>

          <div className="admin-panel">
            <div className="admin-panel-head">
              <div>
                <span className="admin-panel-eyebrow">Catalogue</span>
                <h2>{filteredAdminProducts.length} of {products.length} products</h2>
              </div>
              <button type="button" className="admin-btn admin-btn-ghost" onClick={handleResetOverrides}>Reset to Original Catalogue</button>
            </div>
            <input type="text" className="admin-input admin-search" placeholder="Search products by title, category or description..." value={productSearch} onChange={(e) => setProductSearch(e.target.value)} />
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr><th>Title</th><th>Category</th><th>Badge</th><th>Video</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {filteredAdminProducts.map((p) => (
                    <tr key={p.id}>
                      <td>{p.title}</td>
                      <td>{p.category}</td>
                      <td>{p.badge && <span className="admin-badge-pill">{p.badge}</span>}</td>
                      <td className="admin-cell-truncate"><a href={p.video} target="_blank" rel="noreferrer">{p.video}</a></td>
                      <td>
                        <div className="admin-btn-row">
                          <button type="button" className="admin-btn admin-btn-edit" onClick={() => handleEditProductClick(p)}>Edit</button>
                          <button type="button" className="admin-btn admin-btn-danger" onClick={() => handleDeleteProduct(p.id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="admin-container">
          <div className="admin-panel-head" style={{ marginBottom: '1.5rem' }}>
            <div>
              <span className="admin-panel-eyebrow">Insights</span>
              <h2 style={{ fontSize: '1.3rem' }}>Booking Analytics</h2>
            </div>
            <div className="admin-btn-row">
              <button type="button" className="admin-btn admin-btn-ghost" onClick={refresh}>Refresh Data</button>
              <button type="button" className="admin-btn admin-btn-ghost" onClick={clearAll}>Clear All Quotes</button>
            </div>
          </div>

          <div className="admin-stat-grid">
            <div className="admin-stat-card"><div className="admin-stat-value">{quotes.length}</div><div className="admin-stat-label">Total Quote Requests</div></div>
            <div className="admin-stat-card"><div className="admin-stat-value">{eventTypeData.length}</div><div className="admin-stat-label">Distinct Event Types</div></div>
            <div className="admin-stat-card"><div className="admin-stat-value">{cityData.length}</div><div className="admin-stat-label">Cities Reached</div></div>
            <div className="admin-stat-card"><div className="admin-stat-value">{productData.reduce((sum, p) => sum + p.value, 0)}</div><div className="admin-stat-label">Total Products Requested</div></div>
          </div>

          {quotes.length === 0 ? (
            <div className="admin-empty">No quote requests yet. Once customers submit the contact form, their data and charts will appear here.</div>
          ) : (
            <>
              <div className="admin-split" style={{ marginBottom: '1.5rem' }}>
                <div className="admin-chart-card">
                  <span className="admin-panel-eyebrow">Event Types</span>
                  <h2>Which events bring the most enquiries</h2>
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={eventTypeData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                      <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#a3a3ad' }} interval={0} angle={-20} textAnchor="end" height={70} />
                      <YAxis allowDecimals={false} tick={{ fill: '#a3a3ad' }} />
                      <Tooltip contentStyle={{ background: '#1a1a22', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
                      <Bar dataKey="value" fill="#ec4899" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="admin-chart-card">
                  <span className="admin-panel-eyebrow">Product Demand</span>
                  <h2>Top photo booths &amp; games by demand</h2>
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie data={productData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={95} label>
                        {productData.map((entry, index) => <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />)}
                      </Pie>
                      <Tooltip contentStyle={{ background: '#1a1a22', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
                      <Legend wrapperStyle={{ fontSize: '0.8rem' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="admin-split" style={{ marginBottom: '1.5rem' }}>
                <div className="admin-chart-card">
                  <span className="admin-panel-eyebrow">Locations</span>
                  <h2>Where enquiries are coming from</h2>
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={cityData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                      <XAxis type="number" allowDecimals={false} tick={{ fill: '#a3a3ad' }} />
                      <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 11, fill: '#a3a3ad' }} />
                      <Tooltip contentStyle={{ background: '#1a1a22', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
                      <Bar dataKey="value" fill="#3b82f6" radius={[0, 6, 6, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="admin-chart-card">
                  <span className="admin-panel-eyebrow">Trend</span>
                  <h2>Quote requests over time</h2>
                  <ResponsiveContainer width="100%" height={280}>
                    <LineChart data={timelineData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                      <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#a3a3ad' }} />
                      <YAxis allowDecimals={false} tick={{ fill: '#a3a3ad' }} />
                      <Tooltip contentStyle={{ background: '#1a1a22', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
                      <Line type="monotone" dataKey="count" stroke="#ec4899" strokeWidth={2} dot={{ fill: '#ec4899' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="admin-panel">
                <div className="admin-panel-head">
                  <div>
                    <span className="admin-panel-eyebrow">Requests</span>
                    <h2>{filteredQuotes.length} of {quotes.length} quote requests</h2>
                  </div>
                </div>
                <input type="text" className="admin-input admin-search" placeholder="Search by name, phone, email, city or event type..." value={search} onChange={(e) => setSearch(e.target.value)} />
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr><th>Date</th><th>Name</th><th>Phone</th><th>City</th><th>Event Type</th><th>Products</th><th>Action</th></tr>
                    </thead>
                    <tbody>
                      {filteredQuotes.map((q) => (
                        <tr key={q.id}>
                          <td>{(q.createdAt || '').slice(0, 10)}</td>
                          <td>{q.customerName}</td>
                          <td>{q.phone}</td>
                          <td>{q.city}</td>
                          <td>{q.eventType}</td>
                          <td className="admin-cell-truncate">{(q.products || []).map((p) => p.title).join(', ') || '-'}</td>
                          <td><button type="button" className="admin-btn admin-btn-danger" onClick={() => removeQuote(q.id)}>Delete</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {activeTab === 'admins' && (
        <div className="admin-container">
          <div className="admin-panel">
            <div className="admin-panel-head">
              <div>
                <span className="admin-panel-eyebrow">{editingAdminId ? 'Edit Admin' : 'Add New Admin'}</span>
                <h2>{editingAdminId ? `Editing: ${adminForm.name || adminForm.email}` : 'Create a new admin account'}</h2>
              </div>
            </div>

            {!currentAdmin.isOwner && !editingAdminId && (
              <div className="admin-login-error" style={{ marginBottom: '1rem' }}>
                Only the owner account can create new admins. You may still edit your own name, email and password below by clicking "Edit" on your row.
              </div>
            )}

            {adminError && <div className="admin-login-error" style={{ marginBottom: '1rem' }}>{adminError}</div>}

            <form onSubmit={handleAdminSubmit}>
              <div className="admin-form-grid">
                <label className="admin-label">
                  Name
                  <input className="admin-input" value={adminForm.name} onChange={(e) => setAdminForm({ ...adminForm, name: e.target.value })} required />
                </label>
                <label className="admin-label">
                  Email
                  <input type="email" className="admin-input" value={adminForm.email} onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })} required />
                </label>
                <label className="admin-label">
                  {editingAdminId ? 'New Password (leave blank to keep current)' : 'Password *'}
                  <input type="password" className="admin-input" value={adminForm.password} onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })} required={!editingAdminId} />
                </label>
              </div>
              <div className="admin-btn-row">
                <button
                  type="submit"
                  className="admin-btn admin-btn-primary"
                  disabled={!editingAdminId && !currentAdmin.isOwner}
                >
                  {editingAdminId ? 'Save Changes' : 'Add Admin'}
                </button>
                {editingAdminId && <button type="button" className="admin-btn admin-btn-ghost" onClick={resetAdminForm}>Cancel Edit</button>}
              </div>
            </form>
          </div>

          <div className="admin-panel">
            <div className="admin-panel-head">
              <div>
                <span className="admin-panel-eyebrow">Team</span>
                <h2>{admins.length} admin account{admins.length === 1 ? '' : 's'}</h2>
              </div>
            </div>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr><th>Name</th><th>Email</th><th>Role</th><th>Last Login</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {admins.map((a) => {
                    const isSelf = a.id === currentAdmin.id;
                    const canManage = currentAdmin.isOwner || isSelf;
                    return (
                      <tr key={a.id}>
                        <td>{a.name}</td>
                        <td>{a.email}</td>
                        <td>{a.isOwner ? <span className="admin-owner-pill">Owner</span> : 'Admin'}</td>
                        <td>{a.lastLogin ? new Date(a.lastLogin).toLocaleString() : 'Never'}</td>
                        <td>
                          <div className="admin-btn-row">
                            {canManage && (
                              <button type="button" className="admin-btn admin-btn-edit" onClick={() => handleEditAdminClick(a)}>Edit</button>
                            )}
                            {!a.isOwner && currentAdmin.isOwner && (
                              <button type="button" className="admin-btn admin-btn-danger" onClick={() => handleDeleteAdminClick(a)}>Delete</button>
                            )}
                            {!canManage && !currentAdmin.isOwner && (
                              <span style={{ color: '#6b6b73', fontSize: '0.8rem' }}>Owner-only</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}