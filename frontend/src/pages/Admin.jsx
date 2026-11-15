import { useEffect, useState } from 'react';
import { apiRequest } from '../services/api';

const emptyForm = { title: '', description: '', excerpt: '', content: '', category: 'Development', image: '', author: 'Admin' };

export default function Admin() {
  const [blogs, setBlogs] = useState([]); const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null); const [message, setMessage] = useState(''); const [error, setError] = useState('');
  async function loadBlogs() {
    try { const data = await apiRequest('/blogs'); setBlogs(data.blogs || []); }
    catch (err) { setError(err.message); }
  }
  useEffect(() => { loadBlogs(); }, []);
  function update(field, value) { setForm(current => ({ ...current, [field]: value })); }
  function edit(blog) {
    setEditingId(blog._id);
    setForm({ title: blog.title, description: blog.description, excerpt: blog.excerpt || '', content: blog.content, category: blog.category || 'Development', image: blog.image || '', author: blog.author || 'Admin' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  async function submit(event) {
    event.preventDefault(); setError(''); setMessage('');
    try {
      await apiRequest(editingId ? `/blogs/${editingId}` : '/blogs', { method: editingId ? 'PUT' : 'POST', body: JSON.stringify(form) });
      setMessage(editingId ? 'Article updated.' : 'Article published.'); setForm(emptyForm); setEditingId(null); await loadBlogs();
    } catch (err) { setError(err.message); }
  }
  async function remove(id) {
    if (!window.confirm('Delete this article permanently?')) return;
    try { await apiRequest(`/blogs/${id}`, { method: 'DELETE' }); setMessage('Article deleted.'); await loadBlogs(); }
    catch (err) { setError(err.message); }
  }
  return <main className="page-shell admin-shell"><div className="eyebrow">PUBLISHING STUDIO</div><h1 className="page-title">Your <em>workspace.</em></h1>
    {message && <div className="notice success">{message}</div>}{error && <div className="notice error">{error}</div>}
    <section className="admin-panel"><h2>{editingId ? 'Edit article' : 'Create an article'}</h2><form className="editor-form" onSubmit={submit}>
      <label>Title<input value={form.title} onChange={e => update('title', e.target.value)} required /></label>
      <label>Category<input value={form.category} onChange={e => update('category', e.target.value)} required /></label>
      <label>Short description<input value={form.description} onChange={e => update('description', e.target.value)} required /></label>
      <label>Card excerpt<input value={form.excerpt} onChange={e => update('excerpt', e.target.value)} /></label>
      <label>Cover image URL<input type="url" value={form.image} onChange={e => update('image', e.target.value)} /></label>
      <label>Author<input value={form.author} onChange={e => update('author', e.target.value)} /></label>
      <label className="wide">Article content<textarea rows="9" value={form.content} onChange={e => update('content', e.target.value)} required /></label>
      <div className="form-actions"><button className="button button-dark">{editingId ? 'Save changes' : 'Publish article'}</button>{editingId && <button type="button" className="button button-light" onClick={() => { setEditingId(null); setForm(emptyForm); }}>Cancel</button>}</div>
    </form></section>
    <section className="admin-panel"><div className="section-heading"><h2>Published articles <span className="count">{blogs.length}</span></h2></div>
      {blogs.map(blog => <div className="admin-row" key={blog._id}><div><strong>{blog.title}</strong><small>{blog.category} · {new Date(blog.createdAt).toLocaleDateString()}</small></div><div className="row-actions"><button onClick={() => edit(blog)}>Edit</button><button className="danger-text" onClick={() => remove(blog._id)}>Delete</button></div></div>)}
      {!blogs.length && <p className="muted">No articles have been published.</p>}
    </section>
  </main>;
}
