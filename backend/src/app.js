import express from 'express';
import cors from 'cors';
import blogRoutes from './routes/blogRoutes.js';

const app = express();

app.use(cors({
  origin: process.env.CLIENT_ORIGIN?.split(',').map(origin => origin.trim()) || 'http://localhost:5173'
}));
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'blog-portfolio-api' }));
app.use('/api/blogs', blogRoutes);

// Central error handler keeps server errors consistent and avoids leaking stack traces.
app.use((err, req, res, next) => {
  console.error(err);
  if (err.name === 'ValidationError') return res.status(400).json({ message: err.message });
  res.status(500).json({ message: 'An unexpected server error occurred.' });
});

export default app;
