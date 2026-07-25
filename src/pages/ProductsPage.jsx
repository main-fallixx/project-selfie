import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getAllProducts } from '../data/productStore';
import { useCart } from '../context/CartContext';

export default function ProductsPage() {
  const { cartItems, addToCart, removeFromCart, cartCount } = useCart();
  const filters = [
  "All",
  "Photo Experiences",
  "Photography Products",
  "Arcade Games",
  "Carnival Games",
];

const [activeFilter, setActiveFilter] = useState("All");
const [products, setProducts] = useState([]);

useEffect(() => {
  setProducts(getAllProducts());
}, []);

  const inCart = (productId) => cartItems.some((item) => item.id === productId);
const filteredProducts =
  activeFilter === "All"
    ? products
    : products.filter(
        (product) => product.category === activeFilter
      );
  return (
    <section className="section page-intro-gap">
      <div className="container page-copy page-copy-wide">
        <span className="eyebrow">Rent a Photo Booth or Event Game</span>
        <h1>Browse our photo booth rentals and event games, add them to your quote cart, and continue to your personalised proposal.</h1>
        <p>This catalogue makes booking simple: browse mirror photo booths, AI photo booths, 360 video booths, arcade games and carnival attractions, add your favourites to a quote, then continue directly to the enquiry form with your selections already attached.</p>
      </div>

      <div className="container products-layout">
      
     <div className="product-left">
<div className="product-filter">
  {filters.map((filter) => (
    <button
      key={filter}
      className={`filter-btn ${
        activeFilter === filter ? "active" : ""
      }`}
      onClick={() => setActiveFilter(filter)}
    >
      {filter}
    </button>
  ))}
</div>
        <div className="card-grid three-up products-grid">
          {filteredProducts.map((product) => {
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
     </div>
      
        <aside className="quote-cart-panel hover-rise">
          <span className="eyebrow">Your Selected Experiences</span>
          <h2>{cartCount} product{cartCount === 1 ? '' : 's'} in your quote</h2>
          <p>Review your selected photo booths and event games below, then continue to the quote request form to get your personalised proposal from Selfie Petti.</p>
          <div className="mini-cart-list">
            {cartItems.length === 0 ? (
              <div className="empty-cart">No products added yet. Browse our photo booths and event games to get started.</div>
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
          <NavLink className="btn btn-primary full-width" to="/contact">Continue to Quote Form</NavLink>
        </aside>
      </div>
    </section>
  );
}