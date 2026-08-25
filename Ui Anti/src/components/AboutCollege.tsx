import React from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquareText,
  FileCheck2,
  Mic,
  Navigation,
  Sparkles,
  CheckCircle2,
  Building
} from 'lucide-react';

const FEATURES = [
  {
    icon: Building,
    title: 'Comprehensive College Information',
    desc: 'Instant access to department catalogs, admissions guidelines, laboratory facilities, and placement records.',
    badgeColor: 'bg-blue-100 text-blue-700'
  },
  {
    icon: MessageSquareText,
    title: 'Natural Conversational Experience',
    desc: 'Ask questions naturally in plain English without needing to memorize search keywords or complex menus.',
    badgeColor: 'bg-amber-100 text-amber-800'
  },
  {
    icon: FileCheck2,
    title: 'Clear Structured Answers',
    desc: 'Receive well-organized bulleted responses with highlighted key contacts, locations, and actionable details.',
    badgeColor: 'bg-emerald-100 text-emerald-800'
  },
  {
    icon: Mic,
    title: 'Voice-Enabled Assistance',
    desc: 'Speak your questions hands-free and listen to natural audio readouts powered by modern Web Speech APIs.',
    badgeColor: 'bg-red-100 text-red-700'
  },
  {
    icon: Navigation,
    title: 'Interactive Campus Navigation',
    desc: 'Step-by-step walking routes with distance metrics and animated vector map visualization across all campus blocks.',
    badgeColor: 'bg-blue-100 text-blue-700'
  },
  {
    icon: Sparkles,
    title: 'Instant Student Helpdesk',
    desc: 'Quick access to exam rules, library timings, transport routes, and upcoming technical symposiums 24/7.',
    badgeColor: 'bg-purple-100 text-purple-700'
  }
];

export const AboutCollege: React.FC = () => {
  return (
    <section id="about" className="py-14 sm:py-20 bg-gradient-to-b from-white to-[#F8FAFC] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>SMART CAMPUS COMPANION</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Your College,{' '}
            <span className="bg-gradient-to-r from-blue-600 via-amber-500 to-red-500 bg-clip-text text-transparent">
              One Intelligent Assistant
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
            College AI helps students, faculty, and campus visitors quickly access campus knowledge, locate facilities, and navigate effortlessly through a simple, friendly conversational interface.
          </p>
        </div>

        {/* Features 2x3 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feat, idx) => {
            const Icon = feat.icon;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft hover:shadow-card transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-xs ${feat.badgeColor}`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                    {feat.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-blue-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Integrated Frontend Feature</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
