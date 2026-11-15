import { useEffect, useState } from 'react';
import BlogCard from '../components/BlogCard';
import { apiRequest } from '../services/api';

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => { apiRequest('/blogs').then(data => setBlogs(data.blogs || [])).catch(err => setError(err.message)); }, []);
  return <main className="page-shell"><div className="eyebrow">THE JOURNAL</div><h1 className="page-title">Stories & <em>notes.</em></h1><p className="page-intro">Ideas, lessons, and things worth sharing.</p>
    {error ? <div className="notice error">{error} — check that the backend is running.</div> : null}
    {blogs.length ? <div className="blog-grid">{blogs.map(blog => <BlogCard key={blog._id} blog={blog} />)}</div> : <div className="empty-state">No articles published yet.</div>}
  </main>;
}
