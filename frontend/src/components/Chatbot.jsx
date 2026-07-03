import React, { useState, useRef, useEffect } from 'react';
import { MessageSquareCode, Send, X, ArrowUpRight } from 'lucide-react';

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Xin chào! Mình là trợ lý ảo Helicorp. Mình có thể giúp bạn giải đáp thắc mắc về dòng iPhone 17 thế hệ mới. Chọn câu hỏi mẫu bên dưới hoặc gõ tin nhắn nhé!'
    }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  const faqData = [
    {
      keywords: ['khác biệt', 'nổi bật', 'so sánh', 'nâng cấp', 'mới'],
      answer: 'iPhone 17 nâng cấp mạnh mẽ với Apple Intelligence hỗ trợ tiếng Việt hoàn chỉnh, chip A19 3nm tiên tiến, khung Titanium mỏng nhẹ hơn và camera Fusion 48MP Zoom 5x sắc nét.'
    },
    {
      keywords: ['đặt trước', 'order', 'giao hàng', 'bao giờ', 'khi nào'],
      answer: 'Chương trình đặt trước bắt đầu ngay hôm nay trên website. Dự kiến giao hàng bắt đầu từ 25/09 theo thứ tự đặt chỗ trước.'
    },
    {
      keywords: ['pro', 'air', 'mỏng', 'dày'],
      answer: 'iPhone 17 Pro tập trung hiệu năng chuyên nghiệp (cam 5x, A19 Pro). Còn iPhone Air nổi bật với thiết kế siêu mỏng nhẹ đột phá chỉ 5.5mm.'
    },
    {
      keywords: ['intelligence', 'ai', 'trí tuệ'],
      answer: 'Apple Intelligence chạy trực tiếp trên máy với nhân Neural Engine 16 nhân cực kỳ bảo mật, hỗ trợ đắc lực các công cụ Viết/Dịch thuật tiếng Việt.'
    },
    {
      keywords: ['bảo hành', 'chính hãng', 'lỗi'],
      answer: 'Tất cả iPhone 17 bán ra đều được bảo hành chính hãng 12 tháng 1 đổi 1 tại các trung tâm ủy quyền Apple toàn quốc.'
    }
  ];

  const suggestedQuestions = [
    "iPhone 17 có gì mới?",
    "iPhone Air mỏng bao nhiêu?",
    "Khi nào giao hàng?",
    "Chính sách bảo hành?"
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (textToSend) => {
    const userMsg = textToSend || input;
    if (!userMsg.trim()) return;

    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    if (!textToSend) setInput('');

    // Process Bot Response after small delay
    setTimeout(() => {
      const textLower = userMsg.toLowerCase();
      let matchedAns = 'Mình chưa hiểu rõ câu hỏi này. Bạn có thể hỏi về: thiết kế mới, thời gian giao hàng, so sánh dòng Pro và Air, hoặc chính sách bảo hành nhé!';

      for (const faq of faqData) {
        if (faq.keywords.some((kw) => textLower.includes(kw))) {
          matchedAns = faq.answer;
          break;
        }
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: matchedAns }]);
    }, 600);
  };

  return (
    <div className="chatbot-widget">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 pointer-events-auto flex items-center gap-2 group"
        aria-label="Trợ lý ảo"
      >
        <MessageSquareCode className="w-6 h-6 animate-pulse-glow rounded-full" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out text-sm font-bold whitespace-nowrap">
          Hỏi Đáp iPhone 17
        </span>
      </button>

      {/* Chat Window */}
      <div className={`chatbot-window border border-gray-150 dark:border-zinc-800 bg-white dark:bg-zinc-900 ${isOpen ? '' : 'closed'}`}>
        
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
            <h4 className="font-bold text-sm">Hỗ Trợ Trực Tuyến Helicorp</h4>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded-full">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message Panel */}
        <div className="chat-messages bg-zinc-50 dark:bg-zinc-950/40">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                msg.sender === 'user'
                  ? 'bg-blue-500 text-white self-end rounded-br-none'
                  : 'bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-200 border border-gray-150 dark:border-zinc-700/60 self-start rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Suggestions */}
        <div className="px-4 py-2 border-t border-gray-100 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 overflow-x-auto flex gap-2 no-scrollbar">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-[11px] font-semibold text-blue-500 dark:text-blue-400 border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 px-2.5 py-1 rounded-full shrink-0 flex items-center gap-1 transition-all"
            >
              {q} <ArrowUpRight className="w-3 h-3" />
            </button>
          ))}
        </div>

        {/* Input Footer */}
        <div className="p-3 border-t border-gray-150 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Nhập câu hỏi tại đây..."
            className="flex-grow form-input !py-2 !px-3 !text-sm border-gray-200 dark:border-zinc-800"
          />
          <button
            onClick={() => handleSend()}
            className="p-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl active:scale-95 transition-all shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
