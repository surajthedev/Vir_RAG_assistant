import React, { useState, useEffect, useRef } from 'react';
import { Send, Mic, MicOff, AlertCircle } from 'lucide-react';
import { speechService } from '../services/speechService';
import { VoiceVisualizer } from './VoiceVisualizer';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  disabled = false,
  placeholder = 'Ask about your college...'
}) => {
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed || disabled) return;

    onSendMessage(trimmed);
    setInputText('');
    setVoiceError(null);
    if (isListening) {
      speechService.stopListening();
      setIsListening(false);
    }
  };

  const handleToggleVoiceInput = () => {
    setVoiceError(null);

    if (isListening) {
      speechService.stopListening();
      setIsListening(false);
      return;
    }

    const started = speechService.startListening(
      (transcript, isFinal) => {
        setInputText(transcript);
        if (isFinal) {
          setIsListening(false);
          // Automatically submit after a brief pause
          setTimeout(() => {
            if (transcript.trim()) {
              onSendMessage(transcript.trim());
              setInputText('');
            }
          }, 300);
        }
      },
      (errorMsg) => {
        setIsListening(false);
        setVoiceError(errorMsg);
        setTimeout(() => setVoiceError(null), 5000);
      },
      () => {
        setIsListening(false);
      }
    );

    if (started) {
      setIsListening(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full space-y-2">
      {/* Voice Recognition Error Alert */}
      <AnimatePresence>
        {voiceError && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="flex items-center gap-2 text-xs bg-red-50 text-red-700 px-3 py-2 rounded-xl border border-red-200 shadow-2xs"
          >
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
            <span>{voiceError}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Input Form */}
      <form
        onSubmit={handleSubmit}
        className={`relative flex items-center gap-2 p-2 bg-slate-50 border rounded-2xl transition-all shadow-xs ${
          isListening
            ? 'border-red-400 bg-red-50/40 ring-2 ring-red-100'
            : 'border-slate-200 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-3 focus-within:ring-blue-100'
        }`}
      >
        {/* Left: Microphone Voice Input Button */}
        <button
          type="button"
          onClick={handleToggleVoiceInput}
          disabled={disabled}
          aria-label={isListening ? 'Stop voice listening' : 'Start voice input'}
          className={`relative p-2.5 rounded-xl transition-all flex items-center justify-center flex-shrink-0 ${
            isListening
              ? 'bg-red-500 text-white shadow-md shadow-red-500/25 ring-2 ring-red-300 animate-pulse'
              : 'bg-white hover:bg-blue-50 text-slate-600 hover:text-blue-600 border border-slate-200/80 shadow-2xs'
          }`}
          title={isListening ? 'Listening... click to stop' : 'Click to speak question'}
        >
          {isListening ? (
            <MicOff className="w-4 h-4 text-white" />
          ) : (
            <Mic className="w-4 h-4 text-blue-600" />
          )}
        </button>

        {/* Listening Active Visualizer Indicator */}
        {isListening ? (
          <div className="flex-1 flex items-center gap-3 px-3 py-1 bg-white/80 rounded-xl border border-red-200">
            <span className="text-xs font-bold text-red-600 flex items-center gap-1.5 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              Listening...
            </span>
            <VoiceVisualizer mode="listening" size="md" barCount={9} className="flex-1 max-w-[140px]" />
            <span className="text-xs text-slate-500 truncate italic">
              {inputText || 'Speak your question now...'}
            </span>
          </div>
        ) : (
          /* Text Input Field */
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder={placeholder}
            className="flex-1 bg-transparent px-2 py-1.5 text-[15px] text-slate-800 placeholder-slate-400 focus:outline-none"
          />
        )}

        {/* Right: Send Button */}
        <motion.button
          type="submit"
          disabled={disabled || (!inputText.trim() && !isListening)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Send message"
          className={`p-2.5 rounded-xl transition-all flex items-center justify-center flex-shrink-0 ${
            inputText.trim() && !disabled
              ? 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-md shadow-blue-600/20'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <Send className="w-4 h-4" />
        </motion.button>
      </form>
    </div>
  );
};
