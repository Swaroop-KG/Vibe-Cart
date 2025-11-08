import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import { Product } from '../models/Product.js';
import { samples } from './data.js';

dotenv.config();

(async () => {
  try {
    const conn = await connectDB(process.env.MONGO_URI);
    console.log('Connected to MongoDB:', conn.name);

    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany(samples);
      console.log('Seeded products:', samples.length);
    } else {
      console.log('Products already exist, skipping seed');
    }

    process.exit(0);
  } catch (e) {
    console.error('Seed error', e);
    process.exit(1);
  }
})();
