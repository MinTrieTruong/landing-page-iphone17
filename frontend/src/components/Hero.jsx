import React, { useState, useRef } from 'react';

export const Hero = () => {
  const [selectedColor, setSelectedColor] = useState(null);
  const heroRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const colors = [
    { name: 'Tím Oải Hương (Lavender)', id: 'lavender', hex: '#D1C4E9', img: '/images/iphone17-lavender.jpg' },
    { name: 'Xanh Lá Xô Thơm (Sage)', id: 'sage', hex: '#C8E6C9', img: '/images/iphone17-all.jpg' },
    { name: 'Xanh Lam Khói (Mist Blue)', id: 'mist_blue', hex: '#B3E5FC', img: '/images/iphone17-all.jpg' },
    { name: 'Đen (Black)', id: 'black', hex: '#212121', img: '/images/iphone17-black.png' },
    { name: 'Trắng (White)', id: 'white', hex: '#F5F5F5', img: '/images/iphone17-white.png' },
  ];

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotX = (y / (rect.height / 2)) * -12; // tilt max 12 deg
    const rotY = (x / (rect.width / 2)) * 12;
    setRotation({ x: rotX, y: rotY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  const activeColor = selectedColor ? colors.find((c) => c.id === selectedColor) : null;
  const activeImg = activeColor ? activeColor.img : '/images/iphone17-hero.webp';

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-hero-light dark:bg-hero-dark pt-12 transition-colors duration-300"
    >
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

        {/* Left Info Column */}
        <div className="text-center lg:text-left space-y-6 reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-500 text-xs font-bold tracking-wider uppercase">
            🚀 Mới Nhất • Trí Tuệ Nhân Tạo Apple Intelligence
          </div>
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-none">
            iPhone 17
          </h1>
          <p className="text-2xl sm:text-3xl font-medium text-gray-500 dark:text-zinc-400">
            Beyond Intelligence.
          </p>
          <p className="text-gray-600 dark:text-zinc-300 max-w-lg mx-auto lg:mx-0 text-sm sm:text-base leading-relaxed">
            Khám phá kỷ nguyên mới với Apple Intelligence hoàn toàn tiếng Việt, khung Titan siêu bền bỉ, và hiệu năng từ siêu chip A19 3nm thế hệ tiếp theo.
          </p>

          {/* Color Selector */}
          <div className="space-y-3">
            <span className="text-sm font-semibold text-gray-500 dark:text-zinc-400 block">
              Màu sắc: <strong className="text-gray-900 dark:text-white">{activeColor ? activeColor.name : 'Titanium'}</strong>
            </span>
            <div className="flex justify-center lg:justify-start gap-3">
              {colors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setSelectedColor(color.id)}
                  style={{ backgroundColor: color.hex }}
                  className={`color-dot ${selectedColor === color.id ? 'active' : ''}`}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">
            <a
              href="#order-form-section"
              className="btn-primary"
            >
              Đặt trước ngay
            </a>
            <a
              href="#ai"
              className="btn-secondary"
            >
              Khám phá thêm
            </a>
          </div>
        </div>

        {/* Right 3D Column */}
        <div
          ref={heroRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="flex justify-center items-center h-[400px] sm:h-[550px] relative cursor-pointer"
        >
          <div
            className="phone-3d relative w-full max-w-lg aspect-square lg:aspect-video flex items-center justify-center transition-transform duration-100 ease-out"
            style={{
              transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            }}
          >
            <img
              src={activeImg}
              alt={activeColor ? `iPhone 17 ${activeColor.name}` : 'iPhone 17 Pro Hero'}
              className="w-full h-full max-h-[480px] object-contain pointer-events-none drop-shadow-2xl rounded-2xl"
              fetchpriority="high"
              onError={(e) => {
                e.target.src = '/images/iphone17-black.png';
              }}
            />
          </div>
        </div>

      </div>
    </section>
  );
};
