import React from 'react';
import { Cpu, Gamepad2, BatteryCharging } from 'lucide-react';

export const Performance = () => {
  const perfStats = [
    {
      title: "Hiệu năng CPU Chip A19",
      desc: "Nhanh hơn 30% so với thế hệ tiền nhiệm nhờ tiến trình 3nm tối ưu.",
      percent: "92%",
      width: "92%",
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "Xử lý đồ họa GPU (Gaming)",
      desc: "Dựng hình Ray Tracing nhanh gấp đôi, mượt mà ở mọi tựa game AAA nặng.",
      percent: "88%",
      width: "88%",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Hiệu suất năng lượng (Pin)",
      desc: "Tăng thêm tới 4 giờ sử dụng liên tục nhờ các nhân tiết kiệm điện mới.",
      percent: "95%",
      width: "95%",
      color: "from-emerald-500 to-teal-500"
    }
  ];

  return (
    <section id="performance" className="section bg-white dark:bg-black transition-colors duration-300">
      <div className="container max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 reveal">
          <h2 className="text-sm font-bold tracking-wider text-emerald-500 uppercase mb-3">Sức Mạnh Tuyệt Đối</h2>
          <h3 className="text-3xl sm:text-5xl font-black tracking-tight">
            Siêu Chip A19 Thế Hệ Mới
          </h3>
          <p className="text-gray-500 dark:text-zinc-400 mt-4 text-sm sm:text-base">
            Kiến trúc bán dẫn tối tân, mang đến khả năng xử lý hàng chục nghìn tỷ phép tính mỗi giây mà vẫn tiết kiệm điện năng đỉnh cao.
          </p>
        </div>

        {/* Infographics Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Infographics Details */}
          <div className="lg:col-span-6 space-y-8 reveal-left">
            {perfStats.map((stat, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-end font-bold text-sm sm:text-base">
                  <span>{stat.title}</span>
                  <span className="text-blue-500 dark:text-blue-400 text-lg">{stat.percent}</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-zinc-400">{stat.desc}</p>
                <div className="w-full h-2.5 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className={`perf-bar h-full bg-gradient-to-r ${stat.color}`}
                    data-width={stat.width}
                    style={{ width: '0%' }} // Animated by IntersectionObserver in useScrollReveal
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Graphical Chip visualization */}
          <div className="lg:col-span-6 flex justify-center reveal-right">
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-[40px] border border-gray-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-8 text-center group cursor-pointer hover:border-emerald-500/20 transition-all duration-300 shadow-md">
              {/* Animated Glowing Ring */}
              <div className="absolute inset-0 rounded-[40px] border-2 border-transparent group-hover:border-emerald-500/30 group-hover:scale-105 transition-all duration-700 pointer-events-none" />
              
              {/* Glowing background */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-emerald-500/5 dark:bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />

              <div className="p-4 bg-white dark:bg-zinc-800 rounded-3xl text-emerald-500 mb-6 shadow-sm relative z-10 group-hover:scale-110 transition-transform duration-300">
                <Cpu className="w-12 h-12 stroke-[1.5] animate-spin-slow" />
              </div>

              <h4 className="text-2xl font-bold tracking-tight mb-2 relative z-10">A19 Bionic Chip</h4>
              <p className="text-sm text-gray-500 dark:text-zinc-400 max-w-xs leading-relaxed relative z-10">
                Trang bị 6 nhân CPU, 6 nhân GPU thế hệ mới, và 16 nhân Neural Engine tăng cường hiệu năng AI tiếng Việt vượt bậc.
              </p>

              {/* Badges footer */}
              <div className="flex gap-4 mt-6 relative z-10">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-zinc-400 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 px-3 py-1.5 rounded-full">
                  <Gamepad2 className="w-4 h-4 text-purple-500" />
                  Ray Tracing
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-zinc-400 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 px-3 py-1.5 rounded-full">
                  <BatteryCharging className="w-4 h-4 text-emerald-500" />
                  48h Standby
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
