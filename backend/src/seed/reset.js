import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import { Product } from '../models/Product.js';
import { samples } from './data.js';

dotenv.config();

(async () => {
  try {
    const conn = await connectDB(process.env.MONGO_URI);
    console.log('Connected to MongoDB:', conn.name);

    await Product.deleteMany({});
    await Product.insertMany(samples);
    console.log('Reset and seeded products:', samples.length);

    process.exit(0);
  } catch (e) {
    console.error('Reset seed error', e);
    process.exit(1);
  }
})();
