import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface HeroProps {
  onStartChat?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartChat }) => {
  const scrollToChat = () => {
    if (onStartChat) {
      onStartChat();
    } else {
      const chatElement = document.getElementById('chatbot');
      if (chatElement) {
        chatElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <section className="relative pt-6 pb-8 md:pt-10 md:pb-12 overflow-hidden">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[280px] bg-gradient-to-tr from-blue-400/10 via-amber-300/10 to-red-400/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 shadow-2xs mb-4"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-spin" style={{ animationDuration: '6s' }} />
          <span className="text-xs font-extrabold uppercase tracking-wider bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent font-mono">
            AI-POWERED CAMPUS ASSISTANT
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#0F172A] tracking-tight leading-[1.15]"
        >
          How can I help you{' '}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-blue-600 via-amber-500 to-red-500 bg-clip-text text-transparent">
              today?
            </span>
            <svg
              className="absolute -bottom-2 left-0 w-full h-3 text-amber-400 opacity-80"
              viewBox="0 0 100 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path d="M0 8C30 2 70 2 100 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal"
        >
          Your intelligent guide to college information, academics, campus facilities, placements, events and interactive campus navigation.
        </motion.p>

        {/* Animated AI Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 flex flex-col items-center justify-center"
        >
          <div className="relative group cursor-pointer" onClick={scrollToChat}>
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-amber-400 to-red-500 rounded-full blur-md opacity-30 group-hover:opacity-60 transition duration-500 animate-pulse" />

            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
              className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white border-4 border-blue-600 flex items-center justify-center shadow-elevated"
            >
              <span className="absolute top-1 right-2 w-3.5 h-3.5 rounded-full bg-amber-500 ring-2 ring-white" />
              <span className="absolute bottom-1.5 left-2 w-3 h-3 rounded-full bg-red-500 ring-2 ring-white" />

              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-b from-blue-50 to-blue-100/60 border border-blue-200 flex flex-col items-center justify-center p-1.5 shadow-inner">
                <div className="w-2 h-1 bg-blue-600 rounded-t-sm mb-0.5" />
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 ring-1 ring-blue-300 animate-pulse" />
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 ring-1 ring-blue-300 animate-pulse" />
                </div>
                <div className="w-5 h-1 rounded-full bg-amber-500" />
              </div>
            </motion.div>
          </div>

          <p className="mt-3 text-xs sm:text-sm font-bold text-slate-700 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Ask me anything about your college.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
