import React from 'react';
import { motion } from 'framer-motion';
import { QUICK_QUESTIONS } from '../data/quickQuestions';
import { QuickQuestionItem } from '../types/chat';
import {
  BookOpen,
  Building2,
  Briefcase,
  GraduationCap,
  Sparkles,
  PhoneCall,
  BookMarked,
  Bus,
  MapPin,
  Compass
} from 'lucide-react';

interface QuickQuestionsProps {
  onSelectQuestion: (query: string, isMapAction?: boolean) => void;
  disabled?: boolean;
}

const iconMap: Record<string, React.ElementType> = {
  BookOpen,
  Building2,
  Briefcase,
  GraduationCap,
  Sparkles,
  PhoneCall,
  BookMarked,
  Bus,
  MapPin,
  Compass
};

export const QuickQuestions: React.FC<QuickQuestionsProps> = ({
  onSelectQuestion,
  disabled = false
}) => {
  const colorStyles = {
    blue: 'hover:border-blue-300 hover:bg-blue-50/70 text-slate-800 group-hover:text-blue-700 icon-blue',
    yellow: 'hover:border-amber-300 hover:bg-amber-50/70 text-slate-800 group-hover:text-amber-700 icon-yellow',
    red: 'hover:border-red-300 hover:bg-red-50/70 text-slate-800 group-hover:text-red-700 icon-red'
  };

  const iconColorStyles = {
    blue: 'bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white',
    yellow: 'bg-amber-100 text-amber-600 group-hover:bg-amber-500 group-hover:text-white',
    red: 'bg-red-100 text-red-600 group-hover:bg-red-600 group-hover:text-white'
  };

  return (
    <div className="w-full pt-4 border-t border-slate-200/80">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-600" />
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-600 font-mono">
            QUICK QUESTIONS
          </h4>
        </div>
        <span className="text-[11px] text-slate-400 font-medium hidden sm:inline-block">
          Tap any topic to ask instantly
        </span>
      </div>

      {/* Grid of quick question chips */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {QUICK_QUESTIONS.map((item: QuickQuestionItem, idx: number) => {
          const IconComponent = iconMap[item.icon] || Sparkles;
          const isMap = item.isMapAction;

          return (
            <motion.button
              key={item.id}
              onClick={() => onSelectQuestion(item.query, item.isMapAction)}
              disabled={disabled}
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: idx * 0.03 }}
              className={`flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs transition-all text-left group cursor-pointer ${
                colorStyles[item.color]
              } ${isMap ? 'ring-1 ring-red-200 bg-red-50/30' : ''}`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors shadow-xs ${
                  iconColorStyles[item.color]
                }`}
              >
                <IconComponent className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold truncate flex-1">
                {item.title}
              </span>
              {isMap && (
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping flex-shrink-0" />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
