import React from 'react';

export const Footer = () => {
  const footerLinks = [
    {
      title: "Khám Phá",
      links: [
        { name: "iPhone 17 Pro Max", href: "#lineup" },
        { name: "iPhone 17 Pro", href: "#lineup" },
        { name: "iPhone 17", href: "#lineup" },
        { name: "iPhone Air", href: "#lineup" },
      ]
    },
    {
      title: "Hỗ Trợ",
      links: [
        { name: "Trung Tâm Trợ Giúp", href: "#faq" },
        { name: "Chính Sách Bảo Hành", href: "#faq" },
        { name: "Đặt Hàng Trước", href: "#order-form-section" },
        { name: "Trạng Thái Đơn Hàng", href: "#order-form-section" },
      ]
    },
    {
      title: "Helicorp",
      links: [
        { name: "Về Helicorp", href: "https://helicorp.vn" },
        { name: "Cơ Hội Thực Tập", href: "https://helicorp.vn" },
        { name: "Dự Án Trọng Điểm", href: "https://helicorp.vn" },
        { name: "Liên Hệ", href: "#order-form-section" },
      ]
    }
  ];

  return (
    <footer className="bg-zinc-50 dark:bg-zinc-950 border-t border-gray-150 dark:border-zinc-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Footer Top Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          
          {/* Logo & Brand statement */}
          <div className="col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-2 font-black text-xl tracking-tight">
              <svg viewBox="0 0 170 170" className="w-6 h-6 fill-current text-gray-900 dark:text-white">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.13-1.92-14.35-6.15-2.89-2.38-6.69-6.9-11.38-13.56-6.68-9.74-11.83-20.35-15.43-31.84-3.6-11.49-5.41-22.01-5.41-31.57 0-14.28 3.57-25.82 10.71-34.63 7.14-8.81 16.2-13.27 27.18-13.39 5.27 0 10.63 1.48 16.07 4.43 5.44 2.95 9.15 4.43 11.12 4.43 2.08 0 5.79-1.48 11.13-4.43 5.34-2.95 10.5-4.37 15.49-4.25 11.22.23 20.31 4.54 27.26 12.92 6.96 8.38 10.19 18.52 9.71 30.43-1.04 7.63-3.69 14.56-7.95 20.81-4.26 6.25-9.33 12.38-15.22 18.39zm-29.27-111.43c.04 4.53-1.37 8.91-4.21 13.15-2.84 4.24-6.8 7.37-11.9 9.39-1.22.49-2.45.88-3.7 1.17-.49-4.83.95-9.49 4.31-13.97 3.36-4.48 7.9-7.6 13.62-9.37 1.25-.4 2.11-.47 2.58-.2 2.3 0 2.2 0 2.2.06-.63-1-1.36-1.9-2.22-2.73-1.9-1.78-3.95-3.21-6.15-4.29z" />
              </svg>
              <span className="font-bold text-lg text-gray-900 dark:text-white">iPhone 17</span>
            </a>
            <p className="text-sm text-gray-500 dark:text-zinc-400 max-w-sm leading-relaxed">
              Trang đích giới thiệu sản phẩm iPhone 17 phục vụ bài kiểm tra năng lực Thực Tập Sinh tại Công Ty Công Nghệ Helicorp.
            </p>
          </div>

          {/* Links lists */}
          {footerLinks.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-gray-400 dark:text-zinc-500">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <a
                      href={link.href}
                      className="text-sm font-semibold text-gray-600 dark:text-zinc-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Footer Bottom copyright */}
        <div className="pt-8 border-t border-gray-200 dark:border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© 2026 Helicorp Việt Nam. Tất cả quyền được bảo lưu.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Điều khoản sử dụng</a>
            <a href="#" className="hover:underline">Chính sách bảo mật</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
