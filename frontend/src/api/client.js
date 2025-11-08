const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

async function req(path, opts = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...opts,
  });
  if (!res.ok) {
    let message = 'Request failed';
    try { const j = await res.json(); message = j.message || message; } catch {}
    throw new Error(message);
  }
  return res.json();
}

export const api = {
  products: () => req('/api/products'),
  getCart: () => req('/api/cart'),
  addToCart: (productId, qty = 1) => req('/api/cart', { method: 'POST', body: JSON.stringify({ productId, qty }) }),
  updateQty: (productId, qty) => req('/api/cart', { method: 'PATCH', body: JSON.stringify({ productId, qty }) }),
  removeFromCart: (productId) => req(`/api/cart/${productId}`, { method: 'DELETE' }),
  checkout: (name, email) => req('/api/checkout', { method: 'POST', body: JSON.stringify({ name, email }) }),
};
