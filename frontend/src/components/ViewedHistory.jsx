import React from 'react';
import { useApp } from '../context/AppContext';
import { Eye, ChevronRight, ShoppingCart } from 'lucide-react';

export const ViewedHistory = () => {
  const { viewedHistory, addToCart } = useApp();

  if (viewedHistory.length === 0) return null;

  return (
    <section className="section-sm bg-zinc-50 dark:bg-zinc-950/80 border-t border-b border-gray-100 dark:border-zinc-900 transition-colors duration-300">
      <div className="container max-w-7xl mx-auto px-4">
        
        {/* Title */}
        <div className="flex items-center justify-between mb-8 reveal">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-500">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-lg sm:text-xl">Sản Phẩm Bạn Đã Xem</h3>
          </div>
          <span className="text-xs font-semibold text-gray-400 flex items-center gap-1">
            Kéo để xem thêm <ChevronRight className="w-4 h-4" />
          </span>
        </div>

        {/* Carousel Track */}
        <div className="carousel-track">
          {viewedHistory.map((item) => (
            <div
              key={item.id}
              className="carousel-item w-64 sm:w-72 bg-white dark:bg-zinc-900 border border-gray-150 dark:border-zinc-800 rounded-2xl p-4 flex gap-4 hover:border-blue-500/30 transition-all cursor-pointer shadow-sm relative group"
            >
              <img
                src={item.image_url ? item.image_url.replace('.webp', '.png') : '/images/iphone17-black.png'}
                alt={item.name}
                className="w-16 h-16 object-contain bg-zinc-50 dark:bg-transparent rounded-lg group-hover:scale-105 transition-transform"
                onError={(e) => {
                  e.target.src = '/images/iphone17-hero.png';
                }}
              />
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-sm line-clamp-1">{item.name}</h4>
                  <p className="text-xs text-gray-500 dark:text-zinc-400 mt-0.5">
                    Màu: {item.color} | {item.storage}
                  </p>
                  <p className="text-sm font-extrabold text-blue-500 dark:text-blue-400 mt-1">
                    {item.price_label}
                  </p>
                </div>
                {/* Action button inside slide */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(item.product_id, item.name);
                  }}
                  className="mt-2 text-xs font-bold text-blue-500 hover:text-blue-600 flex items-center gap-1.5"
                >
                  <ShoppingCart className="w-3.5 h-3.5" /> Thêm vào giỏ
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
