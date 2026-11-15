import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiRequest } from '../services/api';

export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => { apiRequest(`/blogs/${id}`).then(data => setBlog(data.blog)).catch(err => setError(err.message)); }, [id]);
  if (error) return <main className="page-shell"><div className="notice error">{error}</div><Link to="/blogs">Back to journal</Link></main>;
  if (!blog) return <div className="page-loader">Loading article…</div>;
  return <main className="article-shell"><Link className="text-link" to="/blogs">← Back to journal</Link><div className="eyebrow article-category">{blog.category}</div><h1>{blog.title}</h1><p className="article-meta">By {blog.author || 'Fieldnotes'} · {new Date(blog.createdAt).toLocaleDateString()}</p>
    {blog.image && <img className="article-cover" src={blog.image} alt="" />}
    <p className="article-lead">{blog.description}</p><div className="article-content">{blog.content}</div>
  </main>;
}
