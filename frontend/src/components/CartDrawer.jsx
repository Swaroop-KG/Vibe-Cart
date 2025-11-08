import CartItem from './CartItem';

export default function CartDrawer({ open, items, total, onClose, onInc, onDec, onRemove, onCheckout }) {
  return (
    <div className={`fixed inset-0 z-40 ${open ? '' : 'pointer-events-none'}`}>
      <div className={`absolute inset-0 bg-black/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      <aside className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        <div className="h-[calc(100%-160px)] overflow-y-auto p-4">
          {items.length === 0 ? (
            <p className="text-gray-500">Your cart is empty</p>
          ) : (
            items.map((item, idx) => (
              <CartItem
                key={item.productId || idx}
                item={item}
                onInc={() => onInc(item.productId, item.qty + 1)}
                onDec={() => onDec(item.productId, Math.max(0, item.qty - 1))}
                onRemove={() => onRemove(item.productId)}
              />
            ))
          )}
        </div>
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-xl font-bold">${total.toFixed(2)}</span>
          </div>
          <button className="btn-primary mt-4 w-full" onClick={onCheckout} disabled={!items.length}>Checkout</button>
        </div>
      </aside>
    </div>
  );
}
