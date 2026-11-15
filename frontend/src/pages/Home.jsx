import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { apiRequest } from '../services/api';
import BlogCard from '../components/BlogCard';

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => { apiRequest('/blogs').then(data => setBlogs(data.blogs || [])).catch(() => {}); }, []);
  return (
    <>
      <section className="hero">
        <div className="eyebrow">INDEPENDENT JOURNAL · EST. 2026</div>
        <h1>Ideas worth<br /><em>staying with.</em></h1>
        <p>A personal collection of notes on technology, design, learning, and the things that make us curious.</p>
        <Link className="button button-dark" to="/blogs">Explore the journal <span>↗</span></Link>
        <div className="hero-note">THOUGHTFULLY MADE. OCCASIONALLY UPDATED.</div>
      </section>
      <section className="section" id="about">
        <div className="section-heading"><div><div className="eyebrow">THE LATEST</div><h2>Recent stories</h2></div><Link className="text-link" to="/blogs">View all stories ↗</Link></div>
        {blogs.length ? <div className="blog-grid">{blogs.slice(0, 3).map(blog => <BlogCard key={blog._id} blog={blog} />)}</div>
          : <div className="empty-state">The journal is getting ready. New stories will appear here soon.</div>}
      </section>
      <section className="about-strip"><div className="eyebrow">A LITTLE ABOUT THIS SPACE</div><h2>Curiosity is a<br /><em>practice.</em></h2><p>Fieldnotes is a home for experiments, useful discoveries, and honest notes from the process of building things.</p></section>
    </>
  );
}
