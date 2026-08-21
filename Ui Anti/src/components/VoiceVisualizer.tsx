import React from 'react';

interface VoiceVisualizerProps {
  mode?: 'speaking' | 'listening';
  barCount?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const VoiceVisualizer: React.FC<VoiceVisualizerProps> = ({
  mode = 'speaking',
  barCount = 7,
  size = 'md',
  className = ''
}) => {
  const isListening = mode === 'listening';

  // Heights configuration for bars
  const heights = isListening
    ? ['60%', '100%', '80%', '40%', '90%', '70%', '50%', '85%', '65%']
    : ['30%', '80%', '50%', '100%', '60%', '90%', '40%', '75%', '55%'];

  const durations = ['0.8s', '0.6s', '1.1s', '0.7s', '0.9s', '0.65s', '1.0s', '0.75s', '0.85s'];
  const delays = ['0s', '0.15s', '0.3s', '0.1s', '0.25s', '0.05s', '0.2s', '0.12s', '0.28s'];

  const sizeClasses = {
    sm: 'h-4 gap-[2px]',
    md: 'h-6 gap-[3px]',
    lg: 'h-8 gap-1'
  };

  const barWidths = {
    sm: 'w-[2.5px] rounded-[1px]',
    md: 'w-[3.5px] rounded-[2px]',
    lg: 'w-[4.5px] rounded-[2px]'
  };

  return (
    <div
      className={`inline-flex items-center justify-center ${sizeClasses[size]} ${className}`}
      aria-label={isListening ? "Microphone listening audio waveform" : "AI speaking audio waveform"}
      role="img"
    >
      {Array.from({ length: barCount }).map((_, index) => {
        const height = heights[index % heights.length];
        const duration = durations[index % durations.length];
        const delay = delays[index % delays.length];

        return (
          <span
            key={index}
            className={`inline-block transition-all duration-200 ${barWidths[size]} ${
              isListening
                ? 'bg-gradient-to-t from-red-600 via-red-500 to-amber-400'
                : 'bg-gradient-to-t from-blue-600 via-blue-500 to-amber-400'
            }`}
            style={{
              height: height,
              animation: `soundwave ${duration} ease-in-out infinite alternate`,
              animationDelay: delay
            }}
          />
        );
      })}
    </div>
  );
};
