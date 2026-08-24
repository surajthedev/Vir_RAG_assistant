import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Sparkles, Menu, X, HelpCircle, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { aiService } from '../services/aiService';
import { BackendHealthStatus } from '../types/chat';

interface HeaderProps {
  onAskAIClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAskAIClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [health, setHealth] = useState<BackendHealthStatus>({ online: false });

  useEffect(() => {
    const unsubscribe = aiService.addHealthListener((status) => {
      setHealth(status);
    });
    return () => unsubscribe();
  }, []);


  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Left: Brand Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 cursor-pointer focus:outline-none"
          >
            <Logo size="md" showSubtitle={true} />
          </a>

          {/* Center/Right Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-bold text-slate-700">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              Home
            </button>

            <button
              onClick={() => scrollToSection('chatbot')}
              className="hover:text-blue-600 transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>Ask AI</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            </button>

            <button
              onClick={() => scrollToSection('faqs')}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              FAQs
            </button>

            <button
              onClick={() => scrollToSection('about')}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              About College
            </button>

            {/* AI Status Indicator */}
            <div
              className={`flex items-center gap-1.5 border px-3 py-1 rounded-full text-xs font-extrabold tracking-wide select-none shadow-2xs transition-all ${
                health.online
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200/80'
                  : 'bg-amber-50 text-amber-700 border-amber-200/80'
              }`}
              title={
                health.online
                  ? `Backend connected (${health.model || 'Groq'} • ${health.latencyMs}ms)`
                  : 'Backend offline (using local knowledge base)'
              }
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  health.online ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                }`}
              />
              <span>{health.online ? 'LIVE RAG AI' : 'STANDBY'}</span>
            </div>

            {/* Help Button */}
            <button
              onClick={() => setShowHelpModal(true)}
              className="flex items-center gap-1 text-slate-500 hover:text-slate-800 transition-colors text-xs font-semibold px-2 py-1 rounded-lg hover:bg-slate-100 cursor-pointer"
              title="Assistant Help Guide"
            >
              <HelpCircle className="w-4 h-4 text-amber-500" />
              <span>Help</span>
            </button>

            {/* Primary Action CTA */}
            <motion.button
              onClick={onAskAIClick}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-extrabold px-4 py-2 rounded-xl shadow-md shadow-blue-600/25 transition-all flex items-center gap-2 text-xs uppercase tracking-wider cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>ASK AI</span>
            </motion.button>
          </nav>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <div
              className={`flex items-center gap-1 border px-2 py-0.5 rounded-full text-[10px] font-bold ${
                health.online
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  health.online ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                }`}
              />
              <span>{health.online ? 'ONLINE' : 'STANDBY'}</span>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Animated Dropdown Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3 shadow-lg"
            >
              <div className="flex flex-col space-y-2 text-sm font-bold text-slate-800">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-left py-2 px-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  Home
                </button>

                <button
                  onClick={() => scrollToSection('chatbot')}
                  className="text-left py-2 px-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span>Ask AI Assistant</span>
                  <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Interactive</span>
                </button>

                <button
                  onClick={() => scrollToSection('faqs')}
                  className="text-left py-2 px-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  Frequently Asked Questions
                </button>

                <button
                  onClick={() => scrollToSection('about')}
                  className="text-left py-2 px-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  About College
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setShowHelpModal(true);
                  }}
                  className="text-left py-2 px-3 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4 text-amber-500" />
                  <span>How to use College AI</span>
                </button>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onAskAIClick();
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3 rounded-xl shadow-md flex items-center justify-center gap-2 text-sm cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>START ASKING AI</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Help Modal */}
      <AnimatePresence>
        {showHelpModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative"
            >
              <button
                onClick={() => setShowHelpModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">How to Use College AI</h3>
                  <p className="text-xs text-slate-500">Fast tips for students & visitors</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
                <div className="p-3 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-2.5">
                  <span className="font-bold text-blue-700 text-sm">1.</span>
                  <div>
                    <strong className="text-slate-900 block font-bold">Ask Anything via Text or Voice</strong>
                    Type any query about departments, admissions, placements, or click the 🎙 mic to speak directly.
                  </div>
                </div>

                <div className="p-3 bg-red-50 rounded-2xl border border-red-100 flex items-start gap-2.5">
                  <span className="font-bold text-red-700 text-sm">2.</span>
                  <div>
                    <strong className="text-slate-900 block font-bold">Interactive Campus Map</strong>
                    Ask "Where is the IT Department?" or click "Campus Map" to get animated walking routes and directions.
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-start gap-2.5">
                  <span className="font-bold text-emerald-700 text-sm">3.</span>
                  <div>
                    <strong className="text-slate-900 block font-bold">Listen Aloud</strong>
                    Enable "Voice ON" to automatically hear responses spoken aloud, or tap "Listen" on any answer.
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowHelpModal(false)}
                className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Got It, Let's Go!
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
