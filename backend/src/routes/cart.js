import { Router } from 'express';
import { Cart } from '../models/Cart.js';
import { Product } from '../models/Product.js';

const router = Router();
const MOCK_USER_ID = 'demo-user';

function computeTotal(populatedItems) {
  return populatedItems.reduce((acc, it) => acc + it.qty * (it.product?.price || 0), 0);
}

router.get('/', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: MOCK_USER_ID }).populate('items.product');
    let items = cart?.items || [];

    // Drop items whose product no longer exists (e.g., after reseeding)
    const before = items.length;
    items = items.filter(i => !!i.product);
    if (cart && items.length !== before) {
      cart.items = items.map(i => ({ product: i.product._id, qty: i.qty }));
      await cart.save();
    }

    const total = computeTotal(items);
    res.json({
      items: items.map(i => ({
        productId: i.product._id,
        name: i.product.name,
        price: i.product.price,
        image: i.product.image,
        qty: i.qty,
      })),
      total,
    });
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { productId, qty = 1 } = req.body || {};
    if (!productId || qty <= 0) return res.status(400).json({ message: 'Invalid payload' });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    let cart = await Cart.findOne({ userId: MOCK_USER_ID });
    if (!cart) cart = await Cart.create({ userId: MOCK_USER_ID, items: [] });

    const idx = cart.items.findIndex(i => i.product.toString() === productId);
    if (idx >= 0) {
      cart.items[idx].qty += qty;
    } else {
      cart.items.push({ product: product._id, qty });
    }

    await cart.save();
    const populated = await cart.populate('items.product');
    const total = computeTotal(populated.items);

    res.status(201).json({ message: 'Added to cart', total });
  } catch (e) {
    next(e);
  }
});

router.patch('/', async (req, res, next) => {
  try {
    const { productId, qty } = req.body || {};
    if (!productId || qty == null || qty < 0) return res.status(400).json({ message: 'Invalid payload' });

    let cart = await Cart.findOne({ userId: MOCK_USER_ID });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const idx = cart.items.findIndex(i => i.product.toString() === productId);
    if (idx < 0) return res.status(404).json({ message: 'Item not in cart' });

    if (qty === 0) {
      cart.items.splice(idx, 1);
    } else {
      cart.items[idx].qty = qty;
    }

    await cart.save();
    const populated = await cart.populate('items.product');
    const total = computeTotal(populated.items);

    res.json({ message: 'Cart updated', total });
  } catch (e) {
    next(e);
  }
});

router.delete('/:productId', async (req, res, next) => {
  try {
    const { productId } = req.params;
    let cart = await Cart.findOne({ userId: MOCK_USER_ID });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const before = cart.items.length;
    cart.items = cart.items.filter(i => i.product.toString() !== productId);
    if (cart.items.length === before) return res.status(404).json({ message: 'Item not in cart' });

    await cart.save();
    const populated = await cart.populate('items.product');
    const total = computeTotal(populated.items);

    res.json({ message: 'Item removed', total });
  } catch (e) {
    next(e);
  }
});

export default router;
