import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

export const GovernmentBar: React.FC = () => {
  return (
    <div className="bg-slate-900 text-slate-100 text-xs py-1.5 px-4 sm:px-8 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 font-medium tracking-wide">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-semibold text-slate-200">Government of India</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-300">National Weather Intelligence Platform</span>
        </div>
        <span className="hidden md:inline-block text-slate-500">•</span>
        <span className="hidden md:inline-block text-slate-400">
          Disaster Management • Real-time Citizen Intelligence
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-0.5 rounded text-[11px] text-amber-300 border border-amber-500/30">
          <Info className="w-3 h-3 text-amber-400" />
          <span>SIH 2026 Prototype • Team InnovateX (SIH26069)</span>
        </div>
        <div className="flex items-center gap-1 text-slate-300 font-mono text-[11px]">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>NDMA / IMD Standard Compliant</span>
        </div>
      </div>
    </div>
  );
};
