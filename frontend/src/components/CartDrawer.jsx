import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

export const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, updateCartQty, removeFromCart } = useApp();

  const totalAmount = cart.reduce((total, item) => total + (Number(item.price) * item.quantity), 0);

  const formatPrice = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  const handleCheckoutClick = () => {
    onClose();
    const orderSection = document.getElementById('order-form-section');
    if (orderSection) {
      orderSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9980] transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div className={`cart-drawer ${isOpen ? 'open' : ''} flex flex-col`}>
        {/* Header */}
        <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-lg">
            <ShoppingBag className="w-5 h-5 text-blue-500" />
            Giỏ Hàng ({cart.length})
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-grow p-5 overflow-y-auto space-y-4">
          {cart.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-gray-500 space-y-3">
              <ShoppingBag className="w-12 h-12 stroke-[1.5]" />
              <p>Giỏ hàng của bạn đang trống</p>
              <button
                onClick={onClose}
                className="text-sm font-semibold text-blue-500 hover:underline"
              >
                Tiếp tục khám phá
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-3 bg-zinc-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl"
              >
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-16 h-16 object-contain bg-white dark:bg-transparent rounded-lg"
                  loading="lazy"
                />
                <div className="flex-grow">
                  <h4 className="font-semibold text-sm line-clamp-1">{item.name}</h4>
                  <p className="text-xs text-gray-500 dark:text-zinc-400">
                    Màu: {item.color} | {item.storage}
                  </p>
                  <p className="text-sm font-bold text-blue-500 mt-1">
                    {formatPrice(item.price)}
                  </p>
                  {/* Controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateCartQty(item.id, item.quantity - 1)}
                      className="p-1 border border-gray-300 dark:border-zinc-700 rounded hover:bg-gray-200 dark:hover:bg-zinc-800"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-semibold px-2">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQty(item.id, item.quantity + 1)}
                      className="p-1 border border-gray-300 dark:border-zinc-700 rounded hover:bg-gray-200 dark:hover:bg-zinc-800"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-gray-200 dark:border-gray-800 bg-zinc-50 dark:bg-zinc-950">
            <div className="flex items-center justify-between font-bold text-base mb-4">
              <span>Tổng tiền:</span>
              <span className="text-blue-500 text-lg">{formatPrice(totalAmount)}</span>
            </div>
            <button
              onClick={handleCheckoutClick}
              className="w-full btn-primary text-center justify-center font-bold"
            >
              Đặt hàng ngay
            </button>
          </div>
        )}
      </div>
    </>
  );
};
