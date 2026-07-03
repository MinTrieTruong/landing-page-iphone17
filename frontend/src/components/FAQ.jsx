import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const FAQ = () => {
  const [openIdx, setOpenIdx] = useState(null);

  const faqs = [
    {
      q: "iPhone 17 có gì khác biệt nổi bật so với thế hệ trước?",
      a: "Dòng iPhone 17 mang đến nâng cấp lớn về AI (Apple Intelligence được tối ưu hóa tiếng Việt sâu rộng), thiết kế khung Titanium thế hệ mới mỏng nhẹ hơn, siêu chip A19 tiến trình 3nm tối tân và hệ thống camera Fusion 48MP hỗ trợ zoom quang học 5x sắc nét."
    },
    {
      q: "Thời gian mở đặt hàng trước và giao hàng dự kiến là khi nào?",
      a: "Chương trình đặt hàng trước sẽ diễn ra từ hôm nay trực tiếp tại website. Lịch giao hàng dự kiến bắt đầu từ ngày 25 tháng 9 năm nay, ưu tiên theo thứ tự đăng ký đặt hàng trước."
    },
    {
      q: "Sự khác biệt giữa iPhone 17 Pro và iPhone Air là gì?",
      a: "iPhone 17 Pro tập trung vào hiệu năng chuyên nghiệp (khung Titan bền bỉ, camera tele 5x, chip A19 Pro). Trong khi đó, iPhone Air tập trung vào tính thẩm mỹ cao với độ mỏng kỷ lục chỉ 5.5mm, phù hợp với người dùng yêu thích thiết kế siêu nhẹ, hiện đại."
    },
    {
      q: "Apple Intelligence hoạt động như thế nào trên iPhone 17?",
      a: "Apple Intelligence hoạt động dựa trên các mô hình ngôn ngữ lớn chạy trực tiếp trên thiết bị thông qua bộ xử lý Neural Engine 16 nhân. Đảm bảo tốc độ phản hồi cực nhanh, bảo mật dữ liệu tuyệt đối và hỗ trợ đắc lực tiếng Việt."
    },
    {
      q: "Chính sách bảo hành sản phẩm khi mua trước tại đây ra sao?",
      a: "Toàn bộ sản phẩm iPhone 17 được cung cấp chính hãng và hưởng trọn chính sách bảo hành 12 tháng 1 đổi 1 của Apple Việt Nam tại tất cả các trung tâm bảo hành ủy quyền toàn quốc."
    }
  ];

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="section bg-white dark:bg-black transition-colors duration-300">
      <div className="container max-w-4xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <div className="p-3 bg-blue-500/10 rounded-2xl w-fit mx-auto text-blue-500 mb-4">
            <HelpCircle className="w-8 h-8" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Giải Đáp Thắc Mắc
          </h2>
          <p className="text-gray-500 dark:text-zinc-400 mt-3 text-sm sm:text-base">
            Các câu hỏi thường gặp về sản phẩm, dịch vụ và quy trình đặt mua iPhone 17.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4 reveal-scale">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="border border-gray-150 dark:border-zinc-800 rounded-2xl overflow-hidden bg-zinc-50 dark:bg-zinc-900/40 transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex justify-between items-center gap-4 font-bold text-sm sm:text-base text-gray-800 dark:text-zinc-150 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/40 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-blue-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                  )}
                </button>
                <div className={`accordion-body ${isOpen ? 'open' : ''}`}>
                  <div className="p-5 pt-0 text-sm sm:text-base text-gray-500 dark:text-zinc-400 border-t border-gray-100 dark:border-zinc-800/40 leading-relaxed">
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
