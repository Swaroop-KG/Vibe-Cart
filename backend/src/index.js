import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from './config/db.js';
import productsRoute from './routes/products.js';
import cartRoute from './routes/cart.js';
import checkoutRoute from './routes/checkout.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(morgan('dev'));

const origin = process.env.CORS_ORIGIN || 'http://localhost:5173';
app.use(cors({ origin }));

// Serve static images from frontend/public
const imagesPath = path.join(__dirname, '../../frontend/public/images');
app.use('/images', express.static(imagesPath));

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api/products', productsRoute);
app.use('/api/cart', cartRoute);
app.use('/api/checkout', checkoutRoute);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
  })
  .catch((e) => {
    console.error('Mongo connection failed', e);
    process.exit(1);
  });
