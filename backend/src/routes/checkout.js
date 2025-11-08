import { Router } from 'express';
import { Cart } from '../models/Cart.js';
import { Order } from '../models/Order.js';

const router = Router();
const MOCK_USER_ID = 'demo-user';

router.post('/', async (req, res, next) => {
  try {
    const { name, email } = req.body || {};
    if (!name || !email) return res.status(400).json({ message: 'Name and email are required' });

    const cart = await Cart.findOne({ userId: MOCK_USER_ID }).populate('items.product');
    if (!cart || cart.items.length === 0) return res.status(400).json({ message: 'Cart is empty' });

    const items = cart.items.map(i => ({
      product: i.product._id,
      qty: i.qty,
      priceAtPurchase: i.product.price,
    }));
    const total = items.reduce((acc, it) => acc + it.qty * it.priceAtPurchase, 0);

    const order = await Order.create({ userId: MOCK_USER_ID, name, email, items, total });

    // clear cart
    cart.items = [];
    await cart.save();

    res.status(201).json({
      receipt: {
        orderId: order._id,
        total,
        timestamp: order.createdAt,
      }
    });
  } catch (e) {
    next(e);
  }
});

export default router;
