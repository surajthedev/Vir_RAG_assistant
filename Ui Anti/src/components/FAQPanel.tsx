import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQ_DATA } from '../data/faq';
import { FAQItem } from '../types/chat';
import {
  ChevronDown,
  ChevronUp,
  Search,
  HelpCircle,
  Building2,
  GraduationCap,
  Briefcase,
  Bus,
  Calendar,
  Sparkles,
  Send
} from 'lucide-react';

interface FAQPanelProps {
  onQuestionClick: (questionText: string) => void;
}

const CATEGORY_TABS: Array<{ name: FAQItem['category']; label: string; icon: React.ElementType }> = [
  { name: 'College', label: 'College', icon: Building2 },
  { name: 'Academics', label: 'Academics', icon: GraduationCap },
  { name: 'Career', label: 'Career', icon: Briefcase },
  { name: 'Campus', label: 'Campus', icon: Bus },
  { name: 'Events', label: 'Events', icon: Calendar }
];

export const FAQPanel: React.FC<FAQPanelProps> = ({ onQuestionClick }) => {
  const [activeCategory, setActiveCategory] = useState<FAQItem['category'] | 'All'>('All');
  const [expandedId, setExpandedId] = useState<string | null>('college-1');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter FAQs
  const filteredFAQs = FAQ_DATA.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleItemClick = (item: FAQItem) => {
    setExpandedId(expandedId === item.id ? null : item.id);
  };

  const handleAskAIClick = (questionText: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onQuestionClick(questionText);

    // Smooth scroll to chatbot card
    const chatElement = document.getElementById('chatbot');
    if (chatElement) {
      chatElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div
      id="faqs"
      className="bg-white rounded-3xl border border-slate-200 shadow-card p-5 sm:p-6 flex flex-col h-[750px] sm:h-[800px] overflow-hidden"
    >
      {/* Header */}
      <div className="mb-4 flex-shrink-0">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-widest font-mono mb-1">
          <HelpCircle className="w-4 h-4 text-amber-500" />
          <span>Frequently Asked</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Popular Questions
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Tap any question to see details or send it directly to College AI.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative mb-3 flex-shrink-0">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search FAQs (e.g. IT, placements, courses)..."
          className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-800"
        />
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-3 no-scrollbar flex-shrink-0">
        <button
          onClick={() => setActiveCategory('All')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeCategory === 'All'
              ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
          }`}
        >
          All Categories
        </button>

        {CATEGORY_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeCategory === tab.name;

          return (
            <button
              key={tab.name}
              onClick={() => setActiveCategory(tab.name)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Accordion FAQ List */}
      <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 scroll-smooth">
        {filteredFAQs.map((item) => {
          const isExpanded = expandedId === item.id;

          return (
            <div
              key={item.id}
              className={`rounded-2xl border transition-all ${
                isExpanded
                  ? 'bg-blue-50/40 border-blue-200 shadow-sm'
                  : 'bg-slate-50/80 hover:bg-slate-50 border-slate-200'
              }`}
            >
              {/* Question Header */}
              <button
                onClick={() => handleItemClick(item)}
                className="w-full p-3.5 text-left flex items-center justify-between gap-3 cursor-pointer group"
              >
                <div className="flex items-start gap-2.5">
                  <span
                    className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md mt-0.5 flex-shrink-0 ${
                      item.category === 'College'
                        ? 'bg-blue-100 text-blue-700'
                        : item.category === 'Academics'
                        ? 'bg-amber-100 text-amber-800'
                        : item.category === 'Career'
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.category === 'Campus'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {item.category}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors leading-snug">
                    {item.question}
                  </span>
                </div>

                <div className="p-1 rounded-lg bg-white border border-slate-200 text-slate-400 group-hover:text-blue-600 flex-shrink-0 shadow-2xs">
                  {isExpanded ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </div>
              </button>

              {/* Collapsible Answer Body */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-4 pb-3.5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-blue-100/60"
                  >
                    <p className="mt-1">{item.answer}</p>

                    {/* Action Bar */}
                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-200/60">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {item.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] bg-white text-slate-500 px-2 py-0.5 rounded border border-slate-200 font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Ask AI Button */}
                      <button
                        onClick={(e) => handleAskAIClick(item.question, e)}
                        className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs transition-all hover:scale-105 ml-2 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        <span>Ask AI</span>
                        <Send className="w-3 h-3 ml-0.5" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {filteredFAQs.length === 0 && (
          <div className="text-center py-8 text-slate-400 text-xs">
            No matching questions found for "{searchQuery}".
          </div>
        )}
      </div>
    </div>
  );
};
