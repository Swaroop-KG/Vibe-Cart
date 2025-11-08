import SafeImage from './SafeImage';

export default function CartItem({ item, onInc, onDec, onRemove }) {
  const fallback = `https://placehold.co/200x200/7c3aed/ffffff?text=${encodeURIComponent(item.name)}`;
  
  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-200">
      <SafeImage 
        src={item.image} 
        alt={item.name} 
        fallback={fallback} 
        className="h-14 w-14 rounded object-cover" 
      />
      <div className="flex-1">
        <div className="font-medium">{item.name}</div>
        <div className="text-sm text-gray-500">
          ${Number(item.price ?? 0).toFixed(2)}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="btn-outline px-2" onClick={onDec} aria-label="decrease">-</button>
        <span className="w-8 text-center">{item.qty}</span>
        <button className="btn-outline px-2" onClick={onInc} aria-label="increase">+</button>
      </div>
      <button className="ml-3 text-red-600 hover:text-red-700" onClick={onRemove}>
        Remove
      </button>
    </div>
  );
}
