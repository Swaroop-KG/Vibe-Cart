import { Router } from 'express';
import { Product } from '../models/Product.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find({}).sort({ createdAt: 1 });
    res.json(products.map(p => ({
      id: p._id,
      name: p.name,
      price: p.price,
      image: p.image,
      description: p.description,
    })));
  } catch (e) {
    next(e);
  }
});

export default router;
