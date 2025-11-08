import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { api } from '../api/client';

export default function ProductsPage({ cartItems, onAdd, onInc, onDec }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const list = await api.products();
        setProducts(list);
      } catch (e) { setError(e.message); }
      finally { setLoading(false); }
    })();
  }, []);

  if (loading) return <div className="p-6">Loading products...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map(p => {
        const cartItem = cartItems?.find(item => item.productId === p.id);
        return (
          <ProductCard 
            key={p.id} 
            product={p} 
            cartQty={cartItem?.qty || 0}
            onAdd={onAdd}
            onInc={onInc}
            onDec={onDec}
          />
        );
      })}
    </div>
  );
}
