import { Router } from 'express';
import { createBlog, deleteBlog, getBlog, getBlogs, updateBlog } from '../controllers/blogController.js';
import { requireAdmin, requireAuth } from '../middleware/auth.js';

const router = Router();

// Public read routes
router.get('/', getBlogs);
router.get('/:id', getBlog);

// Protected write routes: valid Firebase user AND approved admin UID required
router.post('/', requireAuth, requireAdmin, createBlog);
router.put('/:id', requireAuth, requireAdmin, updateBlog);
router.delete('/:id', requireAuth, requireAdmin, deleteBlog);

export default router;
