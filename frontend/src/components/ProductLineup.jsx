import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingCart, Heart, Shield } from 'lucide-react';
import axios from 'axios';

export const ProductLineup = () => {
  const { addToCart, toggleFavorite, favorites, logViewProduct } = useApp();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Default seed products fallback in case database connection fails
  const fallbackProducts = [
    {
      id: 1,
      name: 'iPhone 17',
      model: 'iphone17',
      price: 27990000,
      price_label: '27.990.000đ',
      color: 'Tím Oải Hương',
      color_hex: '#D1C4E9',
      storage: '128GB',
      image_url: '/images/iphone17-lavender.jpg',
      description: 'Thiết kế mỏng nhẹ, chip A19, camera 48MP'
    },
    {
      id: 6,
      name: 'iPhone 17 Pro',
      model: 'iphone17_pro',
      price: 35990000,
      price_label: '35.990.000đ',
      color: 'Bạc',
      color_hex: '#d6d6d6',
      storage: '256GB',
      image_url: '/images/iphone17pro-silver.jpg',
      description: 'Khung titan, camera 5x, chip A19 Pro'
    },
    {
      id: 8,
      name: 'iPhone 17 Pro Max',
      model: 'iphone17_pro_max',
      price: 42990000,
      price_label: '42.990.000đ',
      color: 'Bạc',
      color_hex: '#d6d6d6',
      storage: '256GB',
      image_url: '/images/iphone17pro-silver.jpg',
      description: 'Màn hình 6.9", pin 29 giờ, camera 5x Pro'
    },
    {
      id: 10,
      name: 'iPhone Air',
      model: 'iphone_air',
      price: 23990000,
      price_label: '23.990.000đ',
      color: 'Tím Oải Hương',
      color_hex: '#D1C4E9',
      storage: '128GB',
      image_url: '/images/iphone17-lavender.jpg',
      description: 'Mỏng nhất từ trước đến nay, chỉ 5.5mm'
    }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/products');
        if (res.data?.success && res.data.data.length > 0) {
          // Filter unique models to show one card per product line
          const uniqueModels = [];
          const seen = new Set();
          res.data.data.forEach((p) => {
            if (!seen.has(p.model)) {
              seen.add(p.model);
              // Use correct generated local assets if backend points to .webp
              let img = p.image_url.replace('.webp', '.png');
              if (p.model === 'iphone_air') img = '/images/iphone-air-white.png';
              uniqueModels.push({ ...p, image_url: img });
            }
          });
          setProducts(uniqueModels);
        } else {
          setProducts(fallbackProducts);
        }
      } catch (err) {
        console.warn('API error, using fallback seed products');
        setProducts(fallbackProducts);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleCardClick = (product) => {
    logViewProduct(product.id);
  };

  const isFavorite = (productId) => {
    return favorites.some((f) => f.product_id === productId);
  };

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Đang tải sản phẩm...</p>
      </div>
    );
  }

  return (
    <section id="lineup" className="section bg-white dark:bg-black transition-colors duration-300">
      <div className="container max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-wider text-blue-500 uppercase mb-3">Bộ Sưu Tập</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Chọn Dòng iPhone 17 Phù Hợp
          </h3>
          <p className="text-gray-500 dark:text-zinc-400 mt-4 text-sm sm:text-base">
            Từ thiết kế mỏng nhẹ tinh tế đến đỉnh cao hiệu năng chuyên nghiệp, luôn có một lựa chọn dành riêng cho bạn.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card flex flex-col justify-between cursor-pointer"
              onClick={() => handleCardClick(product)}
            >
              {/* Image & Favorite Icon */}
              <div className="relative p-6 bg-zinc-50 dark:bg-zinc-900/50 flex items-center justify-center aspect-square overflow-hidden group">
                {/* Favorite Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(product.id, product.name);
                  }}
                  className={`absolute top-4 right-4 p-2.5 rounded-full border bg-white dark:bg-zinc-800 transition-colors z-10 ${isFavorite(product.id)
                      ? 'border-red-500/20 text-red-500 bg-red-500/5'
                      : 'border-gray-200 dark:border-zinc-700 text-gray-400 hover:text-red-500'
                    }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
                </button>

                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-44 h-44 object-contain group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = '/images/iphone17-hero.png';
                  }}
                />
              </div>

              {/* Card Body */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h4 className="font-extrabold text-lg sm:text-xl">{product.name}</h4>
                    <span className="text-xs font-semibold px-2.5 py-1 bg-blue-500/10 text-blue-500 dark:bg-blue-400/10 dark:text-blue-400 rounded-full shrink-0">
                      {product.storage}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-zinc-400 line-clamp-2 min-h-[2rem] leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="mt-6 space-y-4">
                  {/* Color representation */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-400">Màu chuẩn:</span>
                    <div
                      className="w-4 h-4 rounded-full border border-black/10 dark:border-white/10 shadow-inner"
                      style={{ backgroundColor: product.color_hex }}
                      title={product.color}
                    />
                    <span className="text-xs font-semibold text-gray-600 dark:text-zinc-300">
                      {product.color}
                    </span>
                  </div>

                  {/* Price Tag */}
                  <div className="flex justify-between items-end pt-2 border-t border-gray-100 dark:border-zinc-800">
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 block uppercase tracking-wider">Giá bán từ</span>
                      <span className="font-extrabold text-base sm:text-lg text-blue-500 dark:text-blue-400">
                        {product.price_label}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product.id, product.name);
                      }}
                      className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all shadow-sm hover:shadow-md active:scale-95"
                      title="Thêm vào giỏ"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
