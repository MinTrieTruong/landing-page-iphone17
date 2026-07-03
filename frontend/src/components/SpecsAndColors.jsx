import React from 'react';

export const SpecsAndColors = () => {
  const specs = [
    { name: "Màn hình", detail: "Super Retina XDR, OLED 120Hz ProMotion" },
    { name: "Kích thước", detail: "iPhone 17: 6.1\" | Pro: 6.3\" | Pro Max: 6.9\" | Air: 6.6\"" },
    { name: "Vi xử lý", detail: "Apple A19 Bionic (3nm) / A19 Pro (3nm Pro)" },
    { name: "Camera chính", detail: "48MP Fusion, Zoom quang học 5x (Pro/Max)" },
    { name: "Chất liệu", detail: "Titan mỏng nhẹ cấp vũ trụ / Nhôm 100% tái chế (Air)" },
    { name: "Bảo mật", detail: "Face ID ẩn dưới màn hình thế hệ mới" },
    { name: "Độ dày", detail: "iPhone Air: 5.5mm (Siêu mỏng) | Pro Max: 8.2mm" },
    { name: "Cổng kết nối", detail: "USB-C hỗ trợ truyền tải tốc độ cao USB 3" }
  ];

  const colorShowcase = [
    { name: "Titan Đen", hex: "#1C1C1E", desc: "Mạnh mẽ, sang trọng và không bám vân tay." },
    { name: "Cát Sa Mạc", hex: "#C4A882", desc: "Sắc vàng cát ấm áp cực kỳ thu hút ánh nhìn." },
    { name: "Titan Tự Nhiên", hex: "#A89F91", desc: "Vẻ đẹp thuần khiết nguyên bản của kim loại titan." },
    { name: "Xanh Trời", hex: "#7FB3D3", desc: "Tươi mát, trẻ trung và năng động." },
    { name: "Tím Sâu", hex: "#3D1F5E", desc: "Bí ẩn, tinh tế và cực kỳ sang trọng." }
  ];

  return (
    <section id="specs" className="section bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <div className="container max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 reveal">
          <h2 className="text-sm font-bold tracking-wider text-blue-500 uppercase mb-3">Thông Số Kỹ Thuật</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Chi Tiết & Tùy Chọn Màu Sắc
          </h3>
          <p className="text-gray-500 dark:text-zinc-400 mt-4 text-sm sm:text-base">
            Mọi cấu hình phần cứng tối tân của dòng iPhone 17 được tổng hợp đầy đủ và chi tiết nhất.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Table Specs - Column 7 */}
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-gray-150 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm reveal-left">
            <h4 className="text-xl font-bold mb-6">Bảng Thông Số Kỹ Thuật</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm sm:text-base">
                <tbody>
                  {specs.map((spec, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-100 dark:border-zinc-800 last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-950 transition-colors"
                    >
                      <td className="py-4 pr-4 font-bold text-gray-500 dark:text-zinc-400 w-1/3">
                        {spec.name}
                      </td>
                      <td className="py-4 font-medium text-gray-800 dark:text-zinc-200">
                        {spec.detail}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Color Showcase Cards - Column 5 */}
          <div className="lg:col-span-5 space-y-4 reveal-right">
            <h4 className="text-xl font-bold px-2 mb-4">Các Tùy Chọn Màu Sắc Titan</h4>
            <div className="grid grid-cols-1 gap-4">
              {colorShowcase.map((color, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-5 bg-white dark:bg-zinc-900 border border-gray-150 dark:border-zinc-800 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-500/30 transition-all cursor-pointer group"
                >
                  <div
                    className="w-12 h-12 rounded-2xl border border-black/10 dark:border-white/10 shadow-inner flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div>
                    <h5 className="font-bold text-base text-gray-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                      {color.name}
                    </h5>
                    <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">
                      {color.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
