import React from 'react';
import { motion } from 'framer-motion';
import { EXPLORE_CARDS } from '../data/quickQuestions';
import { ExploreCardItem } from '../types/chat';
import {
  GraduationCap,
  Briefcase,
  Building2,
  Sparkles,
  BookOpen,
  Bus,
  ArrowUpRight,
  Compass
} from 'lucide-react';

interface ExploreCollegeProps {
  onCardClick: (query: string) => void;
}

const iconMapping: Record<string, React.ElementType> = {
  GraduationCap,
  Briefcase,
  Building2,
  Sparkles,
  BookOpen,
  Bus
};

export const ExploreCollege: React.FC<ExploreCollegeProps> = ({ onCardClick }) => {
  const colorSchemes = {
    blue: {
      borderHover: 'hover:border-blue-300 hover:shadow-blue-500/10',
      iconBg: 'bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white',
      badge: 'bg-blue-50 text-blue-700',
      accent: 'group-hover:text-blue-600'
    },
    yellow: {
      borderHover: 'hover:border-amber-300 hover:shadow-amber-500/10',
      iconBg: 'bg-amber-100 text-amber-600 group-hover:bg-amber-500 group-hover:text-white',
      badge: 'bg-amber-50 text-amber-700',
      accent: 'group-hover:text-amber-600'
    },
    red: {
      borderHover: 'hover:border-red-300 hover:shadow-red-500/10',
      iconBg: 'bg-red-100 text-red-600 group-hover:bg-red-600 group-hover:text-white',
      badge: 'bg-red-50 text-red-700',
      accent: 'group-hover:text-red-600'
    }
  };

  const handleCardPress = (query: string) => {
    onCardClick(query);
    const chatElem = document.getElementById('chatbot');
    if (chatElem) {
      chatElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest font-mono bg-blue-50 px-3 py-1 rounded-full mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>CAMPUS DIRECTORY</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Explore Your College
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-2">
            Tap a card to ask the AI instantly and learn everything about campus.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {EXPLORE_CARDS.map((card: ExploreCardItem, idx: number) => {
            const Icon = iconMapping[card.icon] || Sparkles;
            const theme = colorSchemes[card.colorScheme];

            return (
              <motion.div
                key={card.id}
                onClick={() => handleCardPress(card.query)}
                whileHover={{ y: -5, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className={`bg-white rounded-3xl p-6 border border-slate-200 shadow-card hover:shadow-elevated transition-all duration-300 cursor-pointer group flex flex-col justify-between ${theme.borderHover}`}
              >
                <div>
                  {/* Top Bar: Icon + Action Arrow */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-300 shadow-xs ${theme.iconBg}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-blue-600 group-hover:text-white text-slate-400 flex items-center justify-center transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shadow-2xs">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className={`text-lg sm:text-xl font-extrabold text-slate-900 transition-colors ${theme.accent}`}>
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
                    {card.subtitle}
                  </p>
                </div>

                {/* Bottom Prompt Tag */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-blue-600 transition-colors">
                  <span>Ask about {card.title.toLowerCase()}</span>
                  <span className="text-[11px] bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200">
                    Instant AI
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
