import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { NavigationRoute } from '../types/chat';
import { Navigation, Clock, Footprints, ChevronDown, ChevronUp, Volume2, ShieldCheck, Compass } from 'lucide-react';
import { speechService } from '../services/speechService';

interface CampusMapProps {
  route: NavigationRoute;
  className?: string;
}

export const CampusMap: React.FC<CampusMapProps> = ({ route, className = '' }) => {
  const [showSteps, setShowSteps] = useState<boolean>(false);
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);

  const { from, to, distanceMeters, walkingTimeMinutes, steps, svgPath } = route;

  const handleSpeakRoute = () => {
    const textToSpeak = `The ${to.name} is approximately ${walkingTimeMinutes} minutes away from the ${from.name}, about ${distanceMeters} meters walking distance.`;
    speechService.speak(textToSpeak, `route-${from.id}-${to.id}`, true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden my-3 ${className}`}
    >
      {/* Map Card Header */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 p-4 text-white">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-slate-900 text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
              <Navigation className="w-3 h-3 text-slate-900" />
              ROUTE FOUND
            </span>
            <span className="text-xs text-blue-100 font-medium hidden sm:inline-flex items-center gap-1">
              <Compass className="w-3.5 h-3.5" /> P.T. Lee CNCET Campus
            </span>
          </div>

          <button
            onClick={handleSpeakRoute}
            className="text-xs bg-white/15 hover:bg-white/25 active:bg-white/30 text-white font-medium px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 backdrop-blur-sm border border-white/20 shadow-sm"
            title="Read route aloud"
          >
            <Volume2 className="w-3.5 h-3.5 text-amber-300" />
            <span>Hear Directions</span>
          </button>
        </div>

        {/* Origin & Destination Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 pt-2 border-t border-white/15 text-sm">
          <div className="flex items-center gap-2 bg-white/10 rounded-lg p-2 backdrop-blur-sm">
            <div className="w-3 h-3 rounded-full bg-emerald-400 ring-4 ring-emerald-400/30 flex-shrink-0" />
            <div className="overflow-hidden">
              <span className="text-[10px] text-blue-200 uppercase font-semibold block leading-tight">FROM</span>
              <span className="font-bold text-white text-sm truncate block">{from.name}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/10 rounded-lg p-2 backdrop-blur-sm">
            <div className="w-3 h-3 rounded-full bg-red-400 ring-4 ring-red-400/30 flex-shrink-0 animate-pulse" />
            <div className="overflow-hidden">
              <span className="text-[10px] text-amber-200 uppercase font-semibold block leading-tight">TO</span>
              <span className="font-bold text-amber-300 text-sm truncate block">{to.name}</span>
            </div>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="flex items-center gap-4 mt-3 text-xs font-semibold text-blue-100">
          <div className="flex items-center gap-1.5 bg-black/20 px-2.5 py-1 rounded-md">
            <Footprints className="w-3.5 h-3.5 text-amber-300" />
            <span>Distance: <strong className="text-white">{distanceMeters} meters</strong></span>
          </div>
          <div className="flex items-center gap-1.5 bg-black/20 px-2.5 py-1 rounded-md">
            <Clock className="w-3.5 h-3.5 text-emerald-300" />
            <span>Est. Walk: <strong className="text-white">{walkingTimeMinutes} min</strong></span>
          </div>
        </div>
      </div>

      {/* Interactive Vector Campus Map Canvas */}
      <div className="relative bg-[#EBF4FF] p-2 sm:p-4 overflow-hidden border-b border-slate-200">
        <div className="w-full aspect-[16/10] max-h-[360px] relative rounded-xl overflow-hidden shadow-inner bg-[#EFF6FF] border border-blue-100">
          <svg
            viewBox="0 0 1000 700"
            className="w-full h-full select-none"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <pattern id="campus-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#DBEAFE" strokeWidth="0.8" />
              </pattern>

              <linearGradient id="route-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="50%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#EF4444" />
              </linearGradient>

              <filter id="map-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#0F172A" floodOpacity="0.15" />
              </filter>
            </defs>

            {/* Background Lawn */}
            <rect x="0" y="0" width="1000" height="700" fill="#F0FDF4" />
            <rect x="0" y="0" width="1000" height="700" fill="url(#campus-grid)" opacity="0.6" />

            {/* Sports Grounds & Green Zones */}
            <rect x="740" y="40" width="220" height="150" rx="16" fill="#DCFCE7" stroke="#86EFAC" strokeWidth="2" />
            <text x="850" y="120" textAnchor="middle" fill="#16A34A" fontSize="13" fontWeight="bold" fontFamily="sans-serif">
              SPORTS ARENA
            </text>

            <ellipse cx="260" cy="180" rx="120" ry="80" fill="#DCFCE7" stroke="#86EFAC" strokeWidth="2" />
            <text x="260" y="185" textAnchor="middle" fill="#16A34A" fontSize="12" fontWeight="bold" fontFamily="sans-serif">
              CENTRAL LAWN
            </text>

            {/* Campus Roadways Network */}
            <path d="M 0 620 L 260 620 L 440 500 L 440 340 L 700 340 L 980 340" fill="none" stroke="#CBD5E1" strokeWidth="36" strokeLinecap="round" />
            <path d="M 0 620 L 260 620 L 440 500 L 440 340 L 700 340 L 980 340" fill="none" stroke="#E2E8F0" strokeWidth="28" strokeLinecap="round" />

            <path d="M 260 620 L 260 420 L 620 420 L 620 220 L 880 220" fill="none" stroke="#E2E8F0" strokeWidth="20" strokeLinecap="round" />
            <path d="M 480 340 L 480 220 L 360 220" fill="none" stroke="#E2E8F0" strokeWidth="18" strokeLinecap="round" />
            <path d="M 700 340 L 780 480" fill="none" stroke="#E2E8F0" strokeWidth="18" strokeLinecap="round" />

            {/* BUILDINGS & BLOCKS */}
            
            {/* 1. Main Gate Area */}
            <g onClick={() => setSelectedBuilding('Main Gate')} className="cursor-pointer">
              <rect x="70" y="550" width="100" height="60" rx="8" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" filter="url(#map-glow)" />
              <rect x="75" y="555" width="90" height="15" rx="3" fill="#2563EB" />
              <text x="120" y="567" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">MAIN GATE</text>
              <text x="120" y="595" textAnchor="middle" fill="#475569" fontSize="10" fontWeight="600">Security & Entry</text>
            </g>

            {/* 2. Bus Bay & Transit Stop */}
            <g onClick={() => setSelectedBuilding('Bus Stop')} className="cursor-pointer">
              <rect x="180" y="620" width="90" height="48" rx="8" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" filter="url(#map-glow)" />
              <text x="225" y="642" textAnchor="middle" fill="#B45309" fontSize="11" fontWeight="bold">BUS BAY</text>
              <text x="225" y="657" textAnchor="middle" fill="#78350F" fontSize="9">Transport Wing</text>
            </g>

            {/* 3. Parking Lot */}
            <g onClick={() => setSelectedBuilding('Parking')} className="cursor-pointer">
              <rect x="130" y="400" width="100" height="60" rx="8" fill="#F1F5F9" stroke="#64748B" strokeWidth="1.5" strokeDasharray="4 3" />
              <text x="180" y="430" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="bold">PARKING</text>
              <text x="180" y="445" textAnchor="middle" fill="#64748B" fontSize="9">2W & 4W Area</text>
            </g>

            {/* 4. Administrative Block */}
            <g onClick={() => setSelectedBuilding('Admin Block')} className="cursor-pointer">
              <rect x="280" y="410" width="120" height="100" rx="10" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2.5" filter="url(#map-glow)" />
              <rect x="285" y="415" width="110" height="20" rx="4" fill="#2563EB" />
              <text x="340" y="430" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">ADMIN BLOCK</text>
              <text x="340" y="460" textAnchor="middle" fill="#0F172A" fontSize="11" fontWeight="bold">Principal Office</text>
              <text x="340" y="480" textAnchor="middle" fill="#64748B" fontSize="10">Placement Cell (2F)</text>
              <text x="340" y="498" textAnchor="middle" fill="#64748B" fontSize="9">Admission Counter</text>
            </g>

            {/* 5. Central Digital Library */}
            <g onClick={() => setSelectedBuilding('Library')} className="cursor-pointer">
              <rect x="430" y="210" width="110" height="90" rx="10" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2" filter="url(#map-glow)" />
              <rect x="435" y="215" width="100" height="18" rx="4" fill="#0284C7" />
              <text x="485" y="228" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">LIBRARY</text>
              <text x="485" y="255" textAnchor="middle" fill="#0F172A" fontSize="11" fontWeight="bold">Digital Hub</text>
              <text x="485" y="275" textAnchor="middle" fill="#64748B" fontSize="9">45,000+ Volumes</text>
            </g>

            {/* 6. Main Academic Block (CSE / IT / ECE) */}
            <g onClick={() => setSelectedBuilding('Academic Block')} className="cursor-pointer">
              <rect x="580" y="270" width="150" height="130" rx="12" fill="#FFFFFF" stroke="#2563EB" strokeWidth="3" filter="url(#map-glow)" />
              <rect x="585" y="275" width="140" height="22" rx="4" fill="#1D4ED8" />
              <text x="655" y="291" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">ACADEMIC COMPLEX</text>
              
              <rect x="592" y="305" width="60" height="22" rx="4" fill="#EFF6FF" stroke="#93C5FD" />
              <text x="622" y="320" textAnchor="middle" fill="#1E40AF" fontSize="10" fontWeight="bold">CSE (2F)</text>

              <rect x="660" y="305" width="60" height="22" rx="4" fill="#FEF3C7" stroke="#FCD34D" />
              <text x="690" y="320" textAnchor="middle" fill="#92400E" fontSize="10" fontWeight="bold">IT (3F)</text>

              <rect x="592" y="335" width="60" height="22" rx="4" fill="#F1F5F9" stroke="#CBD5E1" />
              <text x="622" y="350" textAnchor="middle" fill="#334155" fontSize="10" fontWeight="bold">ECE (1F)</text>

              <rect x="660" y="335" width="60" height="22" rx="4" fill="#F1F5F9" stroke="#CBD5E1" />
              <text x="690" y="350" textAnchor="middle" fill="#334155" fontSize="10" fontWeight="bold">Faculty Hub</text>

              <text x="655" y="385" textAnchor="middle" fill="#64748B" fontSize="9">Smart Lecture Halls</text>
            </g>

            {/* 7. Engineering Labs & Workshop */}
            <g onClick={() => setSelectedBuilding('Laboratories')} className="cursor-pointer">
              <rect x="500" y="440" width="120" height="80" rx="8" fill="#FFFFFF" stroke="#475569" strokeWidth="2" filter="url(#map-glow)" />
              <rect x="505" y="445" width="110" height="18" rx="3" fill="#475569" />
              <text x="560" y="458" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">ENGINEERING LABS</text>
              <text x="560" y="485" textAnchor="middle" fill="#0F172A" fontSize="10" fontWeight="bold">Robotics & Workshop</text>
              <text x="560" y="505" textAnchor="middle" fill="#64748B" fontSize="9">Physics / Chem Labs</text>
            </g>

            {/* 8. Campus Canteen */}
            <g onClick={() => setSelectedBuilding('Canteen')} className="cursor-pointer">
              <rect x="730" y="440" width="110" height="80" rx="10" fill="#FFFFFF" stroke="#EA580C" strokeWidth="2" filter="url(#map-glow)" />
              <rect x="735" y="445" width="100" height="18" rx="4" fill="#EA580C" />
              <text x="785" y="458" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">FOOD COURT</text>
              <text x="785" y="485" textAnchor="middle" fill="#9A3412" fontSize="11" fontWeight="bold">Campus Canteen</text>
              <text x="785" y="505" textAnchor="middle" fill="#64748B" fontSize="9">Snacks & Refreshments</text>
            </g>

            {/* 9. Student Hostel Quadrangle */}
            <g onClick={() => setSelectedBuilding('Hostel')} className="cursor-pointer">
              <rect x="790" y="180" width="110" height="80" rx="8" fill="#FFFFFF" stroke="#7C3AED" strokeWidth="2" filter="url(#map-glow)" />
              <rect x="795" y="185" width="100" height="18" rx="3" fill="#7C3AED" />
              <text x="845" y="198" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">STUDENT HOSTEL</text>
              <text x="845" y="225" textAnchor="middle" fill="#5B21B6" fontSize="11" fontWeight="bold">Residence Block</text>
              <text x="845" y="245" textAnchor="middle" fill="#64748B" fontSize="9">Dining & Recreation</text>
            </g>

            {/* ANIMATED ROUTE PATH LINE */}
            <path
              d={svgPath}
              fill="none"
              stroke="#93C5FD"
              strokeWidth="10"
              strokeLinecap="round"
              opacity="0.7"
            />

            <path
              d={svgPath}
              fill="none"
              stroke="url(#route-line-grad)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="8 6"
              className="animate-pulse"
              style={{
                animation: 'dashAnimation 1.5s linear infinite'
              }}
            />

            {/* START PIN (EMERALD GREEN) */}
            <g transform={`translate(${from.coordinates.x}, ${from.coordinates.y})`}>
              <circle cx="0" cy="0" r="18" fill="#10B981" opacity="0.3" className="animate-ping" />
              <circle cx="0" cy="0" r="12" fill="#10B981" stroke="#FFFFFF" strokeWidth="3" filter="url(#map-glow)" />
              <circle cx="0" cy="0" r="4" fill="#FFFFFF" />
              
              <rect x="-45" y="-36" width="90" height="20" rx="4" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
              <text x="0" y="-23" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">START: {from.name}</text>
            </g>

            {/* DESTINATION PIN (CRIMSON RED) */}
            <g transform={`translate(${to.coordinates.x}, ${to.coordinates.y})`}>
              <circle cx="0" cy="0" r="22" fill="#EF4444" opacity="0.35" className="animate-ping" />
              <circle cx="0" cy="0" r="14" fill="#EF4444" stroke="#FFFFFF" strokeWidth="3" filter="url(#map-glow)" />
              <circle cx="0" cy="0" r="5" fill="#FFFFFF" />

              <rect x="-55" y="-40" width="110" height="22" rx="4" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1.5" />
              <text x="0" y="-25" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">DEST: {to.name}</text>
            </g>
          </svg>
        </div>

        {/* Selected Building Quick Info Pill if clicked */}
        {selectedBuilding && (
          <div className="mt-2 text-xs bg-white border border-blue-200 text-slate-700 px-3 py-1.5 rounded-lg flex items-center justify-between">
            <span className="font-semibold text-blue-700">📍 {selectedBuilding}</span>
            <button
              onClick={() => setSelectedBuilding(null)}
              className="text-slate-400 hover:text-slate-600 font-bold ml-2 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Turn-by-Turn Steps Accordion Drawer */}
      <div className="p-3 sm:p-4 bg-slate-50">
        <button
          onClick={() => setShowSteps(!showSteps)}
          className="w-full flex items-center justify-between text-xs font-bold text-slate-700 hover:text-blue-600 transition-colors py-1 cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            Step-by-Step Walking Navigation ({steps.length} checkpoints)
          </span>
          {showSteps ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showSteps && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 space-y-2 pt-2 border-t border-slate-200"
          >
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center flex-shrink-0 text-[11px]">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
