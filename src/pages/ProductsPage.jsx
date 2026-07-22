import { NavLink } from 'react-router-dom';
import { products } from '../data/siteData';
import { useCart } from '../context/CartContext';

export default function ProductsPage() {
  const { cartItems, addToCart, removeFromCart, cartCount } = useCart();
  const inCart = (productId) => cartItems.some((item) => item.id === productId);

  return (
    <section className="section page-intro-gap">
      <div className="container page-copy page-copy-wide">
        <span className="eyebrow">Rent a device</span>
        <h1>Choose products and add them into a quote cart before continuing to your proposal form.</h1>
        <p>This page acts like a professional product catalogue. Visitors can browse experiences, add them to their quote, then continue directly into the contact form with selected items already attached.</p>
      </div>

      <div className="container products-layout">
        <div className="card-grid three-up products-grid">
          {products.map((product) => {
            const selected = inCart(product.id);
            return (
              <article key={product.id} className="product-card hover-rise glow-card">
                <div className="media-shell">
                  <video autoPlay muted loop playsInline preload="metadata">
                    <source src={product.video} type="video/mp4" />
                  </video>
                </div>
                <div className="product-top-row">
                  <span className="product-category">{product.category}</span>
                  <span className="product-badge">{product.badge}</span>
                </div>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <div className="button-row product-actions">
                  <button
                    type="button"
                    className={`btn ${selected ? 'btn-ghost' : 'btn-primary'}`}
                    onClick={() => (selected ? removeFromCart(product.id) : addToCart(product))}
                  >
                    {selected ? 'Remove from quote' : 'Add to quote'}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <aside className="quote-cart-panel hover-rise">
          <span className="eyebrow">Selected experiences</span>
          <h2>{cartCount} product{cartCount === 1 ? '' : 's'} in your quote</h2>
          <p>Review the products before continuing to the quote request form.</p>
          <div className="mini-cart-list">
            {cartItems.length === 0 ? (
              <div className="empty-cart">No products added yet.</div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="mini-cart-item">
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.category}</span>
                  </div>
                  <button type="button" onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              ))
            )}
          </div>
          <NavLink className="btn btn-primary full-width" to="/contact">Continue to quote form</NavLink>
        </aside>
      </div>
    </section>
  );
}
