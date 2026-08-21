import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CAMPUS_ORIGINS, CAMPUS_DESTINATIONS } from '../data/campusLocations';
import { MapPin, Search, ArrowRight, Building } from 'lucide-react';
import { CampusLocation } from '../types/chat';

interface MapNavigationProps {
  step: 'select_current' | 'select_destination';
  onSelectOrigin: (origin: CampusLocation) => void;
  onSelectDestination: (destination: CampusLocation) => void;
  selectedOriginName?: string;
}

export const MapNavigation: React.FC<MapNavigationProps> = ({
  step,
  onSelectOrigin,
  onSelectDestination,
  selectedOriginName
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDestinations = CAMPUS_DESTINATIONS.filter(dest =>
    dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dest.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (dest.contactPerson && dest.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/90 backdrop-blur-sm border border-blue-200/80 rounded-2xl p-3.5 shadow-sm my-2 space-y-3"
    >
      {step === 'select_current' && (
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Select Your Current Starting Location:</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {CAMPUS_ORIGINS.map((location) => (
              <button
                key={location.id}
                onClick={() => onSelectOrigin(location)}
                className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-50 hover:bg-blue-50 active:bg-blue-100 border border-slate-200 hover:border-blue-300 text-slate-800 text-xs font-semibold transition-all hover:scale-[1.02] shadow-xs text-left group cursor-pointer"
              >
                <div className="w-6 h-6 rounded-lg bg-white group-hover:bg-blue-600 group-hover:text-white text-blue-600 flex items-center justify-center transition-colors shadow-xs flex-shrink-0">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span className="truncate">{location.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'select_destination' && (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between flex-wrap gap-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>Select Destination / Office:</span>
            </div>
            {selectedOriginName && (
              <span className="text-[11px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md font-semibold">
                Origin: {selectedOriginName}
              </span>
            )}
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Type destination or person's name (e.g. IT, Principal, Placement)..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-800"
            />
          </div>

          {/* Destination Chips */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
            {filteredDestinations.map((destination) => (
              <button
                key={destination.id}
                onClick={() => onSelectDestination(destination)}
                className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-red-50 active:bg-red-100 border border-slate-200 hover:border-red-300 text-slate-800 text-xs font-semibold transition-all hover:scale-[1.02] shadow-xs text-left group cursor-pointer"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <div className="w-6 h-6 rounded-lg bg-white group-hover:bg-red-500 group-hover:text-white text-red-500 flex items-center justify-center transition-colors shadow-xs flex-shrink-0">
                    <Building className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate">
                    <span className="block truncate font-bold text-slate-800">{destination.name}</span>
                    {destination.floor && (
                      <span className="block text-[10px] text-slate-500 truncate font-normal">
                        {destination.floor.split('-')[0]}
                      </span>
                    )}
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-500 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </button>
            ))}

            {filteredDestinations.length === 0 && (
              <div className="col-span-3 text-center py-3 text-xs text-slate-500">
                No matching campus location found. Try "IT Department", "Principal", or "Library".
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};
