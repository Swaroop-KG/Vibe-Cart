import { useState } from 'react';

export default function CheckoutModal({ open, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const disabled = loading || !name || !email;

  if (!open) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const r = await onSubmit(name, email);
      setReceipt(r);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="card w-full max-w-md p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Checkout</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        {receipt ? (
          <div className="mt-4">
            <p className="text-green-700 font-medium">Payment successful (mock)!</p>
            <div className="mt-2 text-sm">
              <div><span className="font-medium">Order:</span> {receipt.orderId}</div>
              <div><span className="font-medium">Total:</span> ${receipt.total.toFixed(2)}</div>
              <div><span className="font-medium">Time:</span> {new Date(receipt.timestamp).toLocaleString()}</div>
            </div>
            <button className="btn-primary mt-4 w-full" onClick={onClose}>Close</button>
          </div>
        ) : (
          <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input className="mt-1 w-full rounded border border-gray-300 p-2" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input type="email" className="mt-1 w-full rounded border border-gray-300 p-2" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <button className="btn-primary w-full" disabled={disabled}>{loading ? 'Processing...' : 'Submit'}</button>
          </form>
        )}
      </div>
    </div>
  );
}
