import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const TypingIndicator: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.25 }}
      className="flex items-center gap-3 py-2 px-1"
    >
      {/* Robot Avatar Mini */}
      <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 shadow-sm flex-shrink-0">
        <Sparkles className="w-4 h-4 text-blue-600 animate-spin" style={{ animationDuration: '4s' }} />
      </div>

      {/* Bubble Container */}
      <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-2.5 shadow-sm flex items-center gap-2.5">
        <span className="text-xs font-semibold text-slate-600">
          College AI is thinking
        </span>
        
        {/* Animated Bouncing Dots */}
        <div className="flex items-center gap-1">
          <motion.span
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut", delay: 0 }}
            className="w-2 h-2 rounded-full bg-blue-600 inline-block"
          />
          <motion.span
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut", delay: 0.2 }}
            className="w-2 h-2 rounded-full bg-amber-500 inline-block"
          />
          <motion.span
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut", delay: 0.4 }}
            className="w-2 h-2 rounded-full bg-red-500 inline-block"
          />
        </div>
      </div>
    </motion.div>
  );
};
