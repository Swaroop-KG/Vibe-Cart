import { useState } from 'react';
import ProductsPage from './pages/ProductsPage';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import { useCart } from './hooks/useCart';

export default function App() {
  const { items, total, add, update, remove, checkout } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <img src="/images/logo.png" alt="Vibe Cart Logo" className="h-8 w-8 object-contain" />
            <span className="text-lg font-semibold">Vibe Cart</span>
          </div>
          <button className="btn-outline" onClick={() => setCartOpen(true)}>
            Cart ({items.reduce((a, i) => a + i.qty, 0)})
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl">
        <ProductsPage 
          cartItems={items}
          onAdd={(id) => add(id, 1)} 
          onInc={(id, q) => update(id, q)}
          onDec={(id, q) => update(id, q)}
        />
      </main>

      <CartDrawer
        open={cartOpen}
        items={items}
        total={total}
        onClose={() => setCartOpen(false)}
        onInc={(id, q) => update(id, q)}
        onDec={(id, q) => update(id, q)}
        onRemove={(id) => remove(id)}
        onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }}
      />

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onSubmit={async (name, email) => {
          const r = await checkout(name, email);
          return r;
        }}
      />

      <footer className="mx-auto max-w-6xl p-6 text-center text-sm text-gray-500">
        Built for Vibe Commerce screening. Mock payments only.
      </footer>
    </div>
  );
}
