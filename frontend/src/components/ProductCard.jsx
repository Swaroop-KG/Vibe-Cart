import SafeImage from './SafeImage';

export default function ProductCard({ product, cartQty = 0, onAdd, onInc, onDec }) {
  const fallback = `https://placehold.co/600x600/7c3aed/ffffff?text=${encodeURIComponent(product.name)}`;
  const inCart = cartQty > 0;

  return (
    <div className="card p-4 flex flex-col">
      <SafeImage 
        src={product.image} 
        alt={product.name} 
        fallback={fallback} 
        className="h-48 w-full object-cover rounded-md" 
      />
      <div className="mt-3 flex-1">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">{product.description}</p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
        {inCart ? (
          <div className="flex items-center gap-2">
            <button 
              className="btn-outline px-3 py-1" 
              onClick={() => onDec(product.id, cartQty - 1)}
              aria-label="decrease quantity"
            >
              -
            </button>
            <span className="w-8 text-center font-semibold">{cartQty}</span>
            <button 
              className="btn-outline px-3 py-1" 
              onClick={() => onInc(product.id, cartQty + 1)}
              aria-label="increase quantity"
            >
              +
            </button>
          </div>
        ) : (
          <button className="btn-primary" onClick={() => onAdd(product.id)}>Add to Cart</button>
        )}
      </div>
    </div>
  );
}
