import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ClipboardList, ArrowRight, ShieldCheck } from 'lucide-react';
import axios from 'axios';

export const OrderForm = () => {
  const { cart, showToast, sessionId, refreshData } = useApp();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    model: 'iphone17',
    color: 'Titan Đen',
    storage: '128GB',
    note: ''
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [dbProducts, setDbProducts] = useState([]);

  // Fetch product list for select dynamic color/storage mapping
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/products');
        if (res.data?.success) {
          setDbProducts(res.data.data);
        }
      } catch (err) {
        console.warn('Cannot fetch products list for order form dropdowns');
      }
    };
    fetchProducts();
  }, []);

  // Pre-fill model selection from cart if cart has items
  useEffect(() => {
    if (cart.length > 0) {
      const firstItem = cart[0];
      setFormData((prev) => ({
        ...prev,
        model: firstItem.model,
        color: firstItem.color,
        storage: firstItem.storage
      }));
    }
  }, [cart]);

  // Client-side real-time validation
  const validateField = (name, value) => {
    let err = '';
    if (name === 'fullName') {
      if (!value.trim()) err = 'Họ tên là bắt buộc';
      else if (value.trim().length < 2) err = 'Họ tên phải có ít nhất 2 ký tự';
    }
    if (name === 'phone') {
      if (!value.trim()) err = 'Số điện thoại là bắt buộc';
      else if (!/^(0|\+84)[0-9]{9}$/.test(value.trim())) err = 'Số điện thoại phải gồm 10 chữ số (VD: 0912345678)';
    }
    if (name === 'email') {
      if (!value.trim()) err = 'Email là bắt buộc';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) err = 'Định dạng email không hợp lệ';
    }
    if (name === 'address') {
      if (!value.trim()) err = 'Địa chỉ giao hàng là bắt buộc';
      else if (value.trim().length < 5) err = 'Địa chỉ phải có ít nhất 5 ký tự';
    }
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const triggerWebhookLog = async (actionData) => {
    try {
      await axios.post('/api/webhook/order', {
        event_type: 'order_click',
        session_id: sessionId,
        payload: actionData
      });
    } catch (err) {
      console.warn('Webhook logging failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trigger webhook log immediately when submit is clicked
    triggerWebhookLog({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      model: formData.model,
      timestamp: new Date().toISOString()
    });

    // Validate all fields
    const formErrors = {};
    validateField('fullName', formData.fullName);
    validateField('phone', formData.phone);
    validateField('email', formData.email);
    validateField('address', formData.address);

    // Re-check locally
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) formErrors.fullName = 'Họ tên không hợp lệ';
    if (!formData.phone.trim() || !/^(0|\+84)[0-9]{9}$/.test(formData.phone.trim())) formErrors.phone = 'SĐT không hợp lệ';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) formErrors.email = 'Email không hợp lệ';
    if (!formData.address.trim() || formData.address.trim().length < 5) formErrors.address = 'Địa chỉ không hợp lệ';

    if (Object.keys(formErrors).length > 0 || Object.values(errors).some(x => x)) {
      setErrors((prev) => ({ ...prev, ...formErrors }));
      showToast('Vui lòng kiểm tra lại thông tin biểu mẫu!', 'warning');
      return;
    }

    setSubmitting(true);

    // Map model string to productId
    // Fallback: Default to seed mappings
    let productId = 1; // Default iPhone 17
    if (formData.model === 'iphone17_pro') productId = 6;
    if (formData.model === 'iphone17_pro_max') productId = 8;
    if (formData.model === 'iphone_air') productId = 10;

    // Check if dynamic DB product matches
    const matchedProd = dbProducts.find((p) => p.model === formData.model && p.color === formData.color);
    if (matchedProd) productId = matchedProd.id;

    try {
      const res = await axios.post('/api/pre-orders', {
        full_name: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        product_id: productId,
        color: formData.color,
        storage: formData.storage,
        note: formData.note
      });

      if (res.data?.success) {
        showToast('Đặt trước thành công! Helicorp sẽ liên hệ bạn sớm nhất.', 'success');
        // Clear cart
        await axios.delete(`/api/cart/session/${sessionId}`).catch(() => null);
        refreshData();
        // Reset form
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          address: '',
          model: 'iphone17',
          color: 'Titan Đen',
          storage: '128GB',
          note: ''
        });
        setErrors({});
      }
    } catch (err) {
      const serverErrors = err.response?.data?.errors;
      if (serverErrors && serverErrors.length > 0) {
        showToast(serverErrors[0], 'error');
      } else {
        showToast('Gửi biểu mẫu thất bại. Vui lòng thử lại!', 'error');
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Model change helper to update default colors
  const handleModelChange = (e) => {
    const selectedModel = e.target.value;
    let defaultColor = 'Titan Đen';
    let defaultStorage = '128GB';

    if (selectedModel === 'iphone17_pro') {
      defaultColor = 'Bạc';
      defaultStorage = '256GB';
    } else if (selectedModel === 'iphone17_pro_max') {
      defaultColor = 'Bạc';
      defaultStorage = '256GB';
    } else if (selectedModel === 'iphone_air') {
      defaultColor = 'Ánh Sao';
      defaultStorage = '128GB';
    }

    setFormData((prev) => ({
      ...prev,
      model: selectedModel,
      color: defaultColor,
      storage: defaultStorage
    }));
  };

  return (
    <section id="order-form-section" className="section bg-zinc-100 dark:bg-zinc-950/80 transition-colors duration-300">
      <div className="container max-w-5xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 reveal">
          <div className="p-3 bg-blue-500/10 rounded-2xl w-fit mx-auto text-blue-500 mb-4">
            <ClipboardList className="w-8 h-8" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Đăng Ký Đặt Hàng Trước
          </h2>
          <p className="text-gray-500 dark:text-zinc-400 mt-3 text-sm sm:text-base">
            Nhận tin tức ưu đãi độc quyền và giữ chỗ sở hữu iPhone 17 thế hệ mới đầu tiên tại Việt Nam.
          </p>
        </div>

        {/* Form Container */}
        <div className="glass-card bg-white dark:bg-zinc-900 border border-gray-150 dark:border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-lg reveal-scale">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left Column: Customer Information */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg border-b border-gray-100 dark:border-zinc-800 pb-2 mb-4">
                Thông Tin Cá Nhân
              </h3>
              
              <div>
                <label className="form-label" htmlFor="fullName">Họ và Tên <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Nguyễn Văn A"
                  className={`form-input ${errors.fullName ? 'error' : ''}`}
                />
                {errors.fullName && <p className="form-error">{errors.fullName}</p>}
              </div>

              <div>
                <label className="form-label" htmlFor="phone">Số Điện Thoại <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="0912345678"
                  className={`form-input ${errors.phone ? 'error' : ''}`}
                />
                {errors.phone && <p className="form-error">{errors.phone}</p>}
              </div>

              <div>
                <label className="form-label" htmlFor="email">Địa Chỉ Email <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="nguyenvana@gmail.com"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                />
                {errors.email && <p className="form-error">{errors.email}</p>}
              </div>

              <div>
                <label className="form-label" htmlFor="address">Địa Chỉ Nhận Hàng <span className="text-red-500">*</span></label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Số nhà, Tên đường, Phường/Xã, Quận/Huyện, Tỉnh/Thành Phố"
                  rows="3"
                  className={`form-input resize-none ${errors.address ? 'error' : ''}`}
                />
                {errors.address && <p className="form-error">{errors.address}</p>}
              </div>
            </div>

            {/* Right Column: Product Selectors */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg border-b border-gray-100 dark:border-zinc-800 pb-2 mb-4">
                Thông Tin Sản Phẩm đặt trước
              </h3>

              <div>
                <label className="form-label" htmlFor="model">Phiên bản iPhone 17</label>
                <select
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleModelChange}
                  className="form-input cursor-pointer"
                >
                  <option value="iphone17">iPhone 17 (Tiêu chuẩn)</option>
                  <option value="iphone17_pro">iPhone 17 Pro</option>
                  <option value="iphone17_pro_max">iPhone 17 Pro Max</option>
                  <option value="iphone_air">iPhone Air (Siêu mỏng)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label" htmlFor="color">Chọn màu sắc</label>
                  <select
                    id="color"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className="form-input cursor-pointer"
                  >
                    {formData.model === 'iphone17' && (
                      <>
                        <option value="Titan Đen">Titan Đen</option>
                        <option value="Cát Sa Mạc">Cát Sa Mạc</option>
                        <option value="Xanh Trời">Xanh Trời</option>
                        <option value="Ánh Sao">Ánh Sao</option>
                        <option value="Tím Sâu">Tím Sâu</option>
                      </>
                    )}
                    {formData.model === 'iphone17_pro' && (
                      <>
                        <option value="Bạc">Bạc (Silver)</option>
                        <option value="Xanh Đậm">Xanh Đậm (Deep Blue)</option>
                        <option value="Cam Vũ Trụ">Cam Vũ Trụ (Cosmic Orange)</option>
                      </>
                    )}
                    {formData.model === 'iphone17_pro_max' && (
                      <>
                        <option value="Bạc">Bạc (Silver)</option>
                        <option value="Xanh Đậm">Xanh Đậm (Deep Blue)</option>
                        <option value="Cam Vũ Trụ">Cam Vũ Trụ (Cosmic Orange)</option>
                      </>
                    )}
                    {formData.model === 'iphone_air' && (
                      <>
                        <option value="Ánh Sao">Ánh Sao</option>
                        <option value="Titan Đen">Titan Đen</option>
                        <option value="Hồng">Hồng</option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label className="form-label" htmlFor="storage">Dung lượng bộ nhớ</label>
                  <select
                    id="storage"
                    name="storage"
                    value={formData.storage}
                    onChange={handleChange}
                    className="form-input cursor-pointer"
                  >
                    {formData.model.includes('pro') ? (
                      <>
                        <option value="256GB">256GB</option>
                        <option value="512GB">512GB</option>
                        <option value="1TB">1TB</option>
                      </>
                    ) : (
                      <>
                        <option value="128GB">128GB</option>
                        <option value="256GB">256GB</option>
                        <option value="512GB">512GB</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              <div>
                <label className="form-label" htmlFor="note">Ghi Chú Đơn Hàng (Nếu có)</label>
                <textarea
                  id="note"
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  placeholder="Yêu cầu khác về thời gian giao hàng hoặc xuất hóa đơn VAT..."
                  rows="3"
                  className="form-input resize-none"
                />
              </div>

              <div className="pt-4 flex items-center justify-between text-xs text-gray-500 dark:text-zinc-400">
                <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-emerald-500" /> Cam kết bảo mật thông tin</span>
                <span>* Trường bắt buộc</span>
              </div>
            </div>

            {/* Submit Button Span Across 2 Columns */}
            <div className="md:col-span-2 pt-4 flex justify-center">
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full max-w-sm flex items-center justify-center gap-2 text-base font-bold shadow-lg"
              >
                {submitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Đang gửi thông tin...
                  </>
                ) : (
                  <>
                    Xác Nhận Đặt Hàng Ngay
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
};
