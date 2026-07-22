import { blogPosts } from '../data/siteData';

export default function BlogPage() {
  return (
    <section className="section page-intro-gap">
      <div className="container page-copy page-copy-wide">
        <span className="eyebrow">Blog</span>
        <h1>Fresh ideas for premium event entertainment, guest engagement and stronger enquiry-focused presentation.</h1>
        <p>This blog exists only as its own dedicated page and not on the homepage, keeping your front page cleaner while still giving the brand a professional content section.</p>
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
