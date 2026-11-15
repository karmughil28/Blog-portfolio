import mongoose from 'mongoose';
import Blog from '../models/Blog.js';

export async function getBlogs(req, res, next) {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }).lean();
    res.json({ blogs });
  } catch (error) { next(error); }
}

export async function getBlog(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid blog ID.' });
    const blog = await Blog.findById(req.params.id).lean();
    if (!blog) return res.status(404).json({ message: 'Article not found.' });
    res.json({ blog });
  } catch (error) { next(error); }
}

export async function createBlog(req, res, next) {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json({ message: 'Article published.', blog });
  } catch (error) { next(error); }
}

export async function updateBlog(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid blog ID.' });
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!blog) return res.status(404).json({ message: 'Article not found.' });
    res.json({ message: 'Article updated.', blog });
  } catch (error) { next(error); }
}

export async function deleteBlog(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid blog ID.' });
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Article not found.' });
    res.json({ message: 'Article deleted.' });
  } catch (error) { next(error); }
}
