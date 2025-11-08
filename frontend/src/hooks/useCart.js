import { useEffect, useMemo, useState } from 'react';
import { api } from '../api/client';

export function useCart() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const total = useMemo(() => items.reduce((acc, it) => acc + it.qty * it.price, 0), [items]);

  async function refresh() {
    setLoading(true); setError('');
    try {
      const { items } = await api.getCart();
      setItems(items);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }

  async function add(productId, qty = 1) {
    setError('');
    await api.addToCart(productId, qty);
    await refresh();
  }

  async function update(productId, qty) {
    setError('');
    await api.updateQty(productId, qty);
    await refresh();
  }

  async function remove(productId) {
    setError('');
    await api.removeFromCart(productId);
    await refresh();
  }

  async function checkout(name, email) {
    setError('');
    const res = await api.checkout(name, email);
    await refresh();
    return res.receipt;
  }

  useEffect(() => { refresh(); }, []);

  return { items, total, loading, error, add, update, remove, checkout };
}
