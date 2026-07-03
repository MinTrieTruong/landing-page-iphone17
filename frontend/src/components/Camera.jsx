import React, { useState } from 'react';
import { Camera as CameraIcon, Sun, Eye, ZoomIn } from 'lucide-react';

export const Camera = () => {
  const [activeTab, setActiveTab] = useState('main');

  const cameraSpecs = {
    main: {
      title: "Cảm Biến Chính 48MP Thế Hệ Mới",
      desc: "Chụp những bức ảnh độ phân giải siêu cao sắc nét vượt trội ở mọi cự ly. Công nghệ gộp pixel thông minh 4 trong 1 nâng tầm chi tiết.",
      features: ["Độ phân giải 48MP siêu rõ nét", "Chống rung cảm biến thế hệ 3", "Lấy nét tự động Focus Pixels 100%"],
      bg: "from-blue-900/40 to-black",
      icon: <CameraIcon className="w-6 h-6 text-blue-400" />
    },
    zoom: {
      title: "Thu Phóng Quang Học 5x Cận Cảnh",
      desc: "Trang bị thấu kính tiềm vọng lăng kính tetraprism tiên tiến, mang lại khả năng zoom 5x sắc nét tuyệt đối, bắt trọn từng khoảnh khắc ở xa.",
      features: ["Zoom quang học 5x sắc nét", "Khẩu độ f/2.8 thu sáng cực tốt", "Tiêu cự tương đương 120mm"],
      bg: "from-indigo-900/40 to-black",
      icon: <ZoomIn className="w-6 h-6 text-indigo-400" />
    },
    night: {
      title: "Chế Độ Ban Đêm (Night Mode) Tự Nhiên",
      desc: "Kết hợp trí tuệ nhân tạo để phục dựng chi tiết vùng tối tối đa, giảm nhiễu hạt vượt trội mà vẫn giữ được độ ấm và màu sắc tự nhiên của ảnh đêm.",
      features: ["Xử lý ảnh đêm bằng AI", "Giảm nhiễu hạt 40% so với thế hệ trước", "Hỗ trợ chụp chân dung ban đêm"],
      bg: "from-purple-900/40 to-black",
      icon: <Sun className="w-6 h-6 text-purple-400" />
    }
  };

  const currentTab = cameraSpecs[activeTab];

  return (
    <section id="camera" className="section bg-black text-white overflow-hidden transition-colors duration-300">
      <div className="container max-w-7xl mx-auto px-4">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 reveal">
          <h2 className="text-sm font-bold tracking-wider text-purple-500 uppercase mb-3">Nhiếp Ảnh Chuyên Nghiệp</h2>
          <h3 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Hệ Thống Camera 48MP Đột Phá
          </h3>
          <p className="text-gray-400 mt-4 text-sm sm:text-base">
            Cảm biến lớn nhất từ trước đến nay, nâng tầm trải nghiệm sáng tạo nhiếp ảnh chuyên nghiệp ngay trên tay bạn.
          </p>
        </div>

        {/* Dynamic Display Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Controls Column */}
          <div className="lg:col-span-5 space-y-6 order-2 lg:order-1 reveal-left">
            <div className="flex flex-col gap-3">
              {Object.keys(cameraSpecs).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`p-5 rounded-2xl border text-left flex items-start gap-4 transition-all duration-300 ${
                    activeTab === key
                      ? 'border-purple-500 bg-purple-950/20 text-white shadow-lg shadow-purple-500/10'
                      : 'border-zinc-800 bg-zinc-950/40 text-gray-400 hover:border-zinc-700 hover:text-white'
                  }`}
                >
                  <div className="p-2 bg-zinc-900 rounded-xl mt-0.5 shrink-0">
                    {cameraSpecs[key].icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-base mb-1">{cameraSpecs[key].title.split(' ')[0] + ' ' + cameraSpecs[key].title.split(' ')[1]}</h4>
                    <p className="text-xs text-gray-500 line-clamp-1">{cameraSpecs[key].desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Visualization Column */}
          <div className="lg:col-span-7 order-1 lg:order-2 reveal-right">
            <div className={`relative aspect-video rounded-3xl overflow-hidden border border-zinc-800 bg-gradient-to-br ${currentTab.bg} transition-all duration-700 p-8 flex flex-col justify-between`}>
              
              {/* Camera Lens simulation decoration */}
              <div className="absolute -top-1/4 -right-1/4 w-80 h-80 rounded-full border border-purple-500/20 flex items-center justify-center pointer-events-none">
                <div className="w-60 h-60 rounded-full border border-purple-500/10 flex items-center justify-center">
                  <div className="w-40 h-40 rounded-full bg-purple-500/5" />
                </div>
              </div>

              {/* Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-700 text-xs font-bold w-fit uppercase">
                {currentTab.icon}
                <span>Tính Năng Tiêu Biểu</span>
              </div>

              {/* Desc */}
              <div className="relative z-10 space-y-4 max-w-lg mt-12">
                <h4 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {currentTab.title}
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {currentTab.desc}
                </p>
                
                {/* Bullet Points */}
                <ul className="space-y-2 pt-2">
                  {currentTab.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs font-medium text-purple-300">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
