import 'dotenv/config';
import app from './app.js';
import { connectDatabase } from './config/db.js';

const PORT = process.env.PORT || 5000;

try {
  await connectDatabase();
  app.listen(PORT, () => console.log(`API server running on port ${PORT}`));
} catch (error) {
  console.error('Server startup failed:', error.message);
  process.exit(1);
}
