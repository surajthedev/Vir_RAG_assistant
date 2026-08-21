import React from 'react';
import { motion } from 'framer-motion';
import { ChatMessageData, CampusLocation } from '../types/chat';
import { Volume2, RotateCcw, Sparkles, User, ArrowRight, FileText, Database, MapPin, Cpu, CheckCircle2 } from 'lucide-react';
import { VoiceVisualizer } from './VoiceVisualizer';
import { CampusMap } from './CampusMap';
import { MapNavigation } from './MapNavigation';
import { speechService } from '../services/speechService';

interface ChatMessageProps {
  message: ChatMessageData;
  isSpeaking: boolean;
  onSelectOrigin?: (origin: CampusLocation) => void;
  onSelectDestination?: (dest: CampusLocation) => void;
  onSuggestedPrompt?: (prompt: string) => void;
  selectedOriginName?: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isSpeaking,
  onSelectOrigin,
  onSelectDestination,
  onSuggestedPrompt,
  selectedOriginName
}) => {
  const isUser = message.sender === 'user';

  const handleListen = () => {
    speechService.speak(message.text, message.id, true);
  };

  const handleStop = () => {
    speechService.stopSpeaking();
  };

  const handleListenAgain = () => {
    speechService.stopSpeaking();
    setTimeout(() => {
      speechService.speak(message.text, message.id, true);
    }, 150);
  };

  const renderFormattedText = (rawText: string) => {
    const lines = rawText.split('\n');

    return (
      <div className="space-y-2 leading-relaxed text-[15px]">
        {lines.map((line, idx) => {
          if (!line.trim()) {
            return <div key={idx} className="h-1" />;
          }

          // Format Sources line as a highlighted callout
          if (line.trim().startsWith('**Sources:**') || line.trim().startsWith('Sources:')) {
            const sourceText = line.replace(/^\*?\*?Sources:\*?\*?\s*/i, '');
            return (
              <div
                key={idx}
                className="mt-3 p-2.5 bg-blue-50/80 border border-blue-200/80 rounded-xl flex items-start gap-2 text-xs text-blue-900"
              >
                <FileText className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-blue-700 block">Verified Source Document:</span>
                  <span className="font-medium text-slate-700">{sourceText}</span>
                </div>
              </div>
            );
          }

          if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
            const content = line.trim().replace(/^[•\-]\s*/, '');
            return (
              <div key={idx} className="flex items-start gap-2 pl-1">
                <span className="text-blue-500 font-bold mt-1 text-xs">•</span>
                <span>{renderInlineMarkdown(content)}</span>
              </div>
            );
          }

          return <p key={idx}>{renderInlineMarkdown(line)}</p>;
        })}
      </div>
    );
  };


  const renderInlineMarkdown = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);

    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-bold text-slate-900">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return (
          <em key={i} className="italic text-slate-600">
            {part.slice(1, -1)}
          </em>
        );
      }
      return part;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      className={`flex items-start gap-3 my-3.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar Icon */}
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
          isUser
            ? 'bg-blue-600 text-white ring-2 ring-blue-200'
            : 'bg-white border border-slate-200 text-blue-600 ring-2 ring-blue-50'
        }`}
      >
        {isUser ? (
          <User className="w-5 h-5" />
        ) : (
          <div className="relative">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-500" />
          </div>
        )}
      </div>

      {/* Message Content Container */}
      <div className={`flex flex-col max-w-[88%] sm:max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
        {!isUser && message.categoryTag && (
          <div className="flex items-center gap-1.5 mb-1 px-1">
            <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md uppercase tracking-wider border border-blue-100/80">
              {message.categoryTag}
            </span>
          </div>
        )}

        <div
          className={`px-4 py-3.5 rounded-2xl shadow-sm text-sm transition-all ${
            isUser
              ? 'bg-blue-600 text-white rounded-tr-xs shadow-blue-500/10'
              : 'bg-white text-slate-800 border border-slate-200 rounded-tl-xs shadow-slate-200/50'
          }`}
        >
          {isUser ? (
            <p className="text-[15px] leading-relaxed font-medium whitespace-pre-wrap">{message.text}</p>
          ) : (
            renderFormattedText(message.text)
          )}

          {!isUser && message.isNavigationPrompt && message.navigationStep && (
            message.navigationStep === 'select_current' || message.navigationStep === 'select_destination'
          ) && onSelectOrigin && onSelectDestination && (
            <MapNavigation
              step={message.navigationStep}
              onSelectOrigin={onSelectOrigin}
              onSelectDestination={onSelectDestination}
              selectedOriginName={selectedOriginName}
            />
          )}

          {!isUser && message.routeData && (
            <CampusMap route={message.routeData} />
          )}

          {!isUser && message.debug && (message.debug.tools_used?.length || message.debug.rounds || message.source) && (
            <div className="flex items-center flex-wrap gap-1.5 mt-2.5 pt-2 border-t border-slate-100/80 text-[11px] text-slate-500 font-medium">
              <span className="text-slate-400 font-semibold flex items-center gap-1">
                <Cpu className="w-3 h-3 text-blue-500" />
                <span>Engine:</span>
              </span>
              {message.debug.tools_used && message.debug.tools_used.map((tool, idx) => (
                <span
                  key={idx}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md font-mono text-[10px] flex items-center gap-1 border border-slate-200"
                >
                  {tool.includes('sql') ? (
                    <Database className="w-2.5 h-2.5 text-emerald-600" />
                  ) : tool.includes('vector') ? (
                    <FileText className="w-2.5 h-2.5 text-blue-600" />
                  ) : (
                    <MapPin className="w-2.5 h-2.5 text-amber-600" />
                  )}
                  {tool}
                </span>
              ))}
              {message.debug.rounds && (
                <span className="text-slate-400 text-[10px]">
                  ({message.debug.rounds} round{message.debug.rounds > 1 ? 's' : ''})
                </span>
              )}
            </div>
          )}

          {!isUser && (
            <div className="flex items-center justify-between flex-wrap gap-2 mt-3 pt-2.5 border-t border-slate-100">
              <div className="flex items-center gap-2">
                {isSpeaking ? (
                  <div className="flex items-center gap-2 bg-blue-50 border border-blue-200/80 px-2.5 py-1 rounded-lg">
                    <span className="text-xs font-semibold text-blue-700 flex items-center gap-1">
                      <Volume2 className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
                      AI is speaking
                    </span>
                    <VoiceVisualizer mode="speaking" size="sm" barCount={7} />
                    <button
                      onClick={handleStop}
                      className="ml-1 text-[11px] font-bold text-red-600 hover:text-red-700 bg-white hover:bg-red-50 px-2 py-0.5 rounded border border-red-200 transition-colors cursor-pointer"
                      title="Stop speaking"
                    >
                      Stop
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleListen}
                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 hover:bg-blue-50 px-2.5 py-1 rounded-lg border border-slate-200/70 transition-all shadow-2xs cursor-pointer"
                    title="Listen to message"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>Listen</span>
                  </button>
                )}

                {!isSpeaking && (
                  <button
                    onClick={handleListenAgain}
                    className="flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 px-2 py-1 rounded-md transition-colors cursor-pointer"
                    title="Replay speech"
                  >
                    <RotateCcw className="w-3 h-3 text-slate-400" />
                    <span>Listen Again</span>
                  </button>
                )}
              </div>

              <span className="text-[11px] text-slate-400 font-medium ml-auto">
                {message.timestamp}
              </span>
            </div>
          )}
        </div>


        {!isUser && message.suggestedFollowups && message.suggestedFollowups.length > 0 && onSuggestedPrompt && (
          <div className="flex items-center flex-wrap gap-1.5 mt-2 px-1">
            <span className="text-[11px] font-semibold text-slate-400 mr-1">Suggested:</span>
            {message.suggestedFollowups.map((prompt, i) => (
              <button
                key={i}
                onClick={() => onSuggestedPrompt(prompt)}
                className="text-xs bg-white hover:bg-blue-50 active:bg-blue-100 text-blue-700 font-medium px-2.5 py-1 rounded-full border border-blue-200 hover:border-blue-300 transition-all flex items-center gap-1 shadow-2xs group cursor-pointer"
              >
                <span>{prompt}</span>
                <ArrowRight className="w-3 h-3 text-blue-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};
