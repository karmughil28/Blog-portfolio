import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 160 },
  description: { type: String, required: true, trim: true, maxlength: 400 },
  excerpt: { type: String, trim: true, maxlength: 240, default: '' },
  content: { type: String, required: true },
  category: { type: String, trim: true, default: 'Notes' },
  image: { type: String, trim: true, default: '' },
  author: { type: String, trim: true, default: 'Admin' }
}, { timestamps: true });

export default mongoose.model('Blog', blogSchema);
