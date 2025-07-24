"use client";

export default function CalendarLoader() {
  return (
    <div className="bg-black text-white flex items-center justify-center min-h-screen">
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-white rounded-full animate-bounce-1"></div>
        <div className="w-3 h-3 bg-white rounded-full animate-bounce-2"></div>
        <div className="w-3 h-3 bg-white rounded-full animate-bounce-3"></div>
        <div className="w-3 h-3 bg-white rounded-full animate-bounce-4"></div>
      </div>

      <style jsx>{`
        @keyframes bounce-dot {
          0%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-12px);
          }
        }

        .animate-bounce-1 {
          animation: bounce-dot 1.4s infinite ease-in-out;
          animation-delay: 0s;
        }

        .animate-bounce-2 {
          animation: bounce-dot 1.4s infinite ease-in-out;
          animation-delay: 0.2s;
        }

        .animate-bounce-3 {
          animation: bounce-dot 1.4s infinite ease-in-out;
          animation-delay: 0.4s;
        }

        .animate-bounce-4 {
          animation: bounce-dot 1.4s infinite ease-in-out;
          animation-delay: 0.6s;
        }
      `}</style>
    </div>
  );
}
