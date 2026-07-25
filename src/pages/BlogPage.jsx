import { blogPosts } from '../data/siteData';

export default function BlogPage() {
  return (
    <section className="section page-intro-gap">
      <div className="container page-copy page-copy-wide">
        <span className="eyebrow">Selfie Petti Blog</span>
        <h1>Photo booth tips, event entertainment ideas and guest engagement insights from Tamil Nadu's premium photo booth company.</h1>
        <p>Explore expert advice on choosing the right photo booth for weddings and corporate events, ideas for brand activations, and tips to make your next celebration in Tirunelveli, Madurai, Thoothukudi, Kanyakumari, Nagercoil, Tenkasi, Sivakasi or anywhere in Tamil Nadu unforgettable.</p>
      </div>
      <div className="container card-grid three-up blog-grid-page">
        {blogPosts.map((post) => (
          <article key={post.id} className="blog-card hover-rise glow-card">
            <span className="service-tag">{post.category}</span>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <div className="blog-meta-row">
              <span>{post.date}</span>
              <span>{post.readTime}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}