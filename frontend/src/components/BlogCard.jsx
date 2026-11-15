import { Link } from 'react-router-dom';

export default function BlogCard({ blog, featured = false }) {
  return (
    <article className={`blog-card ${featured ? 'featured-card' : ''}`}>
      <Link to={`/blogs/${blog._id}`} className="card-image-wrap">
        <img src={blog.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200'} alt="" />
      </Link>
      <div className="card-meta"><span>{blog.category || 'Notes'}</span><span>{new Date(blog.createdAt).toLocaleDateString()}</span></div>
      <h3><Link to={`/blogs/${blog._id}`}>{blog.title}</Link></h3>
      <p>{blog.excerpt || blog.description}</p>
      <Link className="text-link" to={`/blogs/${blog._id}`}>Read article ↗</Link>
    </article>
  );
}
