import React from 'react';
import { ShieldCheck, Database, Users, Cpu, FileText } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 text-sm border-t border-slate-800 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
              <span>National Weather Intelligence Platform</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-lg">
              Translating crowd-sourced citizen observations and social media signals into high-confidence, geo-tagged weather intelligence for rapid disaster management across India.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="bg-slate-800 text-blue-300 px-2 py-1 rounded border border-slate-700 font-medium">
                SIH 2026 Problem Statement ID: SIH26069
              </span>
              <span className="bg-slate-800 text-emerald-300 px-2 py-1 rounded border border-slate-700 font-medium">
                Team InnovateX1
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Data Ingestion Sources
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-teal-400" />
                <span>Geotagged Citizen Mobile Reports</span>
              </li>
              <li className="flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                <span>Social Media Signal Mining (spaCy NLP)</span>
              </li>
              <li className="flex items-center gap-2">
                <Database className="w-3.5 h-3.5 text-amber-400" />
                <span>IMD Ground Station & Radar Ingestion</span>
              </li>
              <li className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-purple-400" />
                <span>OpenStreetMap & Satellite Layers</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Disaster Resilience Standards
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Designed for National Disaster Management Authority (NDMA) and State Disaster Response Force (SDRF) integration.
            </p>
            <div className="text-[11px] text-slate-500 italic">
              * Prototype data shown for demonstration purposes.
            </div>
          </div>

        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © 2026 National Weather Intelligence Platform • Team InnovateX1 (SIH26069)
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">NDMA Guidelines</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">IMD Data Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
