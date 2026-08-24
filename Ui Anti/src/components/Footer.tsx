import React from 'react';
import { Sparkles, Building, Compass } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-[#0F172A] text-slate-300 pt-14 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <div className="text-xl font-extrabold text-white tracking-tight flex items-center gap-1.5">
                  <span>COLLEGE</span>
                  <span className="bg-gradient-to-r from-blue-400 via-amber-400 to-red-400 bg-clip-text text-transparent">
                    AI
                  </span>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono block">
                  SMART CAMPUS ASSISTANT
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 max-w-md leading-relaxed font-normal">
              Your Smart Campus Assistant. Ask. Learn. Discover. Empowering students, faculty, and visitors with instant intelligent guidance, campus navigation, and academic information.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-800/80 p-3 rounded-2xl border border-slate-700/60 max-w-md">
              <Building className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span className="font-medium">
                P.T. Lee Chengalvaraya Naicker College of Engineering and Technology
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-mono mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('chatbot')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Ask AI Assistant
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('faqs')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('about')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  About College
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Campus & Resources */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-mono mb-4">
              Campus Resources
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <button
                  onClick={() => {
                    scrollTo('chatbot');
                  }}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5 text-red-400" />
                  <span>Interactive Campus Map</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('chatbot')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Academic Departments
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('chatbot')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Training & Placement Wing
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('chatbot')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Central Digital Library
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 College AI. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Built for Modern Campus Intelligence</span>
            <span className="w-1 h-1 rounded-full bg-slate-700" />
            <span className="text-slate-400">Frontend Release</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
