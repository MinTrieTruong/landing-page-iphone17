import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Simple RFC 4122 v4 compliant client-side UUID generator
const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

const AppContext = createContext();

// Setup base URL for axios (empty string defaults to current host/domain, which works in Vercel Monorepo deployment)
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || '';

export const AppProvider = ({ children }) => {
  // Session ID for cart/favorites mapping
  const [sessionId, setSessionId] = useState('');
  const [theme, setTheme] = useState('dark'); // default dark mode
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [viewedHistory, setViewedHistory] = useState([]);
  const [toasts, setToasts] = useState([]);

  // Toast helper
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // 1. Initialize Session and Theme
  useEffect(() => {
    let sessId = localStorage.getItem('iphone17_session');
    if (!sessId) {
      sessId = uuidv4();
      localStorage.setItem('iphone17_session', sessId);
    }
    setSessionId(sessId);

    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Toggle Theme
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    showToast(`Đã chuyển sang chế độ ${nextTheme === 'dark' ? 'Tối' : 'Sáng'}`, 'info');
  };

  // Fetch Cart, Favorites, Viewed History
  const fetchData = async () => {
    if (!sessionId) return;
    try {
      // Cart
      const cartRes = await axios.get(`/api/cart/${sessionId}`).catch(() => null);
      if (cartRes && cartRes.data?.success) setCart(cartRes.data.data);

      // Favorites
      const favRes = await axios.get(`/api/favorites/${sessionId}`).catch(() => null);
      if (favRes && favRes.data?.success) setFavorites(favRes.data.data);

      // Viewed History
      const viewRes = await axios.get(`/api/viewed/${sessionId}`).catch(() => null);
      if (viewRes && viewRes.data?.success) setViewedHistory(viewRes.data.data);
    } catch (err) {
      console.error('Lỗi tải dữ liệu:', err);
    }
  };

  useEffect(() => {
    if (sessionId) {
      fetchData();
    }
  }, [sessionId]);

  // Cart operations
  const addToCart = async (productId, productName) => {
    try {
      const res = await axios.post('/api/cart', { session_id: sessionId, product_id: productId });
      if (res.data?.success) {
        showToast(`Đã thêm ${productName || 'sản phẩm'} vào giỏ hàng!`);
        fetchData();
      }
    } catch (err) {
      showToast('Không thể thêm sản phẩm vào giỏ hàng', 'error');
    }
  };

  const updateCartQty = async (cartItemId, newQty) => {
    if (newQty < 1) return;
    try {
      const res = await axios.put(`/api/cart/${cartItemId}`, { quantity: newQty });
      if (res.data?.success) {
        fetchData();
      }
    } catch (err) {
      showToast('Lỗi cập nhật số lượng', 'error');
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      const res = await axios.delete(`/api/cart/${cartItemId}`);
      if (res.data?.success) {
        showToast('Đã xóa sản phẩm khỏi giỏ hàng');
        fetchData();
      }
    } catch (err) {
      showToast('Lỗi xóa sản phẩm', 'error');
    }
  };

  // Favorites toggle
  const toggleFavorite = async (productId, productName) => {
    try {
      const res = await axios.post('/api/favorites', { session_id: sessionId, product_id: productId });
      if (res.data?.success) {
        if (res.data.action === 'added') {
          showToast(`Đã lưu ${productName} vào danh sách yêu thích!`);
        } else {
          showToast(`Đã xóa ${productName} khỏi danh sách yêu thích`);
        }
        fetchData();
      }
    } catch (err) {
      showToast('Lỗi cập nhật yêu thích', 'error');
    }
  };

  // Viewed History log
  const logViewProduct = async (productId) => {
    if (!sessionId) return;
    try {
      await axios.post('/api/viewed', { session_id: sessionId, product_id: productId });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AppContext.Provider value={{
      sessionId,
      theme,
      toggleTheme,
      cart,
      favorites,
      viewedHistory,
      toasts,
      showToast,
      removeToast,
      addToCart,
      updateCartQty,
      removeFromCart,
      toggleFavorite,
      logViewProduct,
      refreshData: fetchData
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
