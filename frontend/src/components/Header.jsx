import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Moon, Sun, ShoppingCart, Heart, Menu, X } from 'lucide-react';
import { CartDrawer } from './CartDrawer';

export const Header = () => {
  const { theme, toggleTheme, cart, favorites } = useApp();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const menuItems = [
    { name: 'Trang Chủ', href: '#hero' },
    { name: 'Apple Intelligence', href: '#ai' },
    { name: 'Hiệu Năng', href: '#performance' },
    { name: 'So Sánh', href: '#lineup' },
    { name: 'Đặt Hàng', href: '#order-form-section' },
  ];

  return (
    <>
      <header className="sticky top-0 z-[9900] bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-100 dark:border-zinc-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 font-black text-xl tracking-tight">
            <svg viewBox="0 0 170 170" className="w-6 h-6 fill-current text-gray-900 dark:text-white">
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.13-1.92-14.35-6.15-2.89-2.38-6.69-6.9-11.38-13.56-6.68-9.74-11.83-20.35-15.43-31.84-3.6-11.49-5.41-22.01-5.41-31.57 0-14.28 3.57-25.82 10.71-34.63 7.14-8.81 16.2-13.27 27.18-13.39 5.27 0 10.63 1.48 16.07 4.43 5.44 2.95 9.15 4.43 11.12 4.43 2.08 0 5.79-1.48 11.13-4.43 5.34-2.95 10.5-4.37 15.49-4.25 11.22.23 20.31 4.54 27.26 12.92 6.96 8.38 10.19 18.52 9.71 30.43-1.04 7.63-3.69 14.56-7.95 20.81-4.26 6.25-9.33 12.38-15.22 18.39zm-29.27-111.43c.04 4.53-1.37 8.91-4.21 13.15-2.84 4.24-6.8 7.37-11.9 9.39-1.22.49-2.45.88-3.7 1.17-.49-4.83.95-9.49 4.31-13.97 3.36-4.48 7.9-7.6 13.62-9.37 1.25-.4 2.11-.47 2.58-.2 2.3 0 2.2 0 2.2.06-.63-1-1.36-1.9-2.22-2.73-1.9-1.78-3.95-3.21-6.15-4.29z" />
            </svg>
            <span className="font-bold text-lg hidden sm:inline">iPhone 17</span>
          </a>

          {/* Desktop Navigation Menu */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold text-gray-600 dark:text-zinc-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Icons and Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Favorites Icon */}
            <a
              href="#lineup"
              className="p-2 text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors relative"
              aria-label="Favorites"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-badge-pop">
                  {favorites.length}
                </span>
              )}
            </a>

            {/* Cart Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-badge-pop">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 md:hidden text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden px-4 pt-2 pb-4 space-y-1 bg-white dark:bg-black border-b border-gray-200 dark:border-zinc-900 transition-colors duration-300">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-semibold text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-lg transition-all"
              >
                {item.name}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};
