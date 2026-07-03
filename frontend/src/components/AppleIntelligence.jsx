import React from 'react';
import { Sparkles, MessageSquare, Languages, BrainCircuit, ShieldAlert } from 'lucide-react';

export const AppleIntelligence = () => {
  const cards = [
    {
      icon: <Sparkles className="w-8 h-8 text-indigo-500" />,
      title: "Apple Intelligence Việt Nam",
      description: "Trí tuệ nhân tạo cá nhân, hỗ trợ sâu sắc tiếng Việt, giúp bạn viết lách, giao tiếp tự nhiên và giải quyết công việc tức thì.",
      size: "col-span-1 lg:col-span-2 row-span-1",
      glow: "from-indigo-500/10 to-purple-500/10",
    },
    {
      icon: <BrainCircuit className="w-8 h-8 text-pink-500" />,
      title: "Siri Đột Phá Mới",
      description: "Siri thế hệ mới với sự thấu hiểu ngữ cảnh sâu rộng, thiết kế viền sáng rực rỡ chạy quanh màn hình khi kích hoạt.",
      size: "col-span-1 row-span-2",
      glow: "from-pink-500/10 to-rose-500/10",
    },
    {
      icon: <Languages className="w-8 h-8 text-teal-500" />,
      title: "Dịch Thuật Thời Gian Thực",
      description: "Dịch trực tiếp văn bản, giọng nói và cuộc hội thoại hai chiều cực kỳ chính xác nhờ phần cứng Neural Engine 16 nhân.",
      size: "col-span-1 row-span-1",
      glow: "from-teal-500/10 to-emerald-500/10",
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-blue-500" />,
      title: "Công Cụ Viết (Writing Tools)",
      description: "Hiệu đính, viết lại hoặc tóm tắt các đoạn văn bản trong mọi ứng dụng Email, Ghi chú hay các app bên thứ ba.",
      size: "col-span-1 lg:col-span-2 row-span-1",
      glow: "from-blue-500/10 to-cyan-500/10",
    },
  ];

  return (
    <section id="ai" className="section bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <div className="container">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 reveal">
          <h2 className="text-sm font-bold tracking-wider text-blue-500 uppercase mb-3">Trí Tuệ Cá Nhân</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Apple Intelligence
          </h3>
          <p className="text-gray-500 dark:text-zinc-400 mt-4">
            Được tích hợp trực tiếp sâu vào lõi hệ điều hành, bảo vệ quyền riêng tư tuyệt đối cho dữ liệu của bạn.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-[220px]">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className={`${card.size} glass-card relative overflow-hidden p-8 flex flex-col justify-end group cursor-pointer hover:border-blue-500/30 transition-all duration-300 reveal-scale`}
            >
              {/* Radial Glow on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.glow} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <div className="relative z-10 space-y-4">
                <div className="p-3 bg-white dark:bg-zinc-800 rounded-2xl w-fit shadow-sm">
                  {card.icon}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {card.title}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-zinc-400 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Privacy Card */}
        <div className="mt-8 glass-card bg-gradient-to-r from-blue-500/5 to-purple-500/5 border border-blue-500/10 p-8 flex flex-col md:flex-row items-center gap-6 justify-between reveal">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-lg font-bold">Điện Toán Đám Mây Riêng Tư</h4>
              <p className="text-sm text-gray-500 dark:text-zinc-400">
                Xử lý dữ liệu phức tạp của bạn bằng các máy chủ Apple Silicon bảo mật cao nhất thế giới.
              </p>
            </div>
          </div>
          <a href="#order-form-section" className="btn-primary shrink-0">Đăng ký trải nghiệm</a>
        </div>

      </div>
    </section>
  );
};
