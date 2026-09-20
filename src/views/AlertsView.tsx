import React from 'react';
import type { WeatherReport } from '../types/weather';
import { ShieldAlert, Users, MapPin, ExternalLink } from 'lucide-react';

interface AlertsViewProps {
  reports: WeatherReport[];
  onSelectReport: (report: WeatherReport) => void;
}

export const AlertsView: React.FC<AlertsViewProps> = ({ reports, onSelectReport }) => {
  const highRisk = reports.filter((r) => r.severity === 'High');
  const moderate = reports.filter((r) => r.severity === 'Moderate');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-950 via-slate-900 to-blue-950 rounded-xl text-white p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldAlert className="w-5 h-5 text-red-400" />
            <span className="text-xs font-bold text-red-300 uppercase tracking-wider">
              National Disaster Management Cell
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            Active Weather & Disaster Public Advisories
          </h1>
          <p className="text-xs text-blue-200 mt-1">
            Official AI-verified public advisories for emergency preparedness and public safety.
          </p>
        </div>

        <div className="bg-red-900/60 border border-red-700/50 px-4 py-2 rounded-lg text-xs font-bold text-red-200">
          <span>{highRisk.length} High-Risk Active Warnings</span>
        </div>
      </div>

      {/* HIGH RISK SECTION */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 border-b border-red-200 pb-2">
          <span className="w-3 h-3 rounded-full bg-red-600 animate-pulse"></span>
          <h2 className="text-sm font-extrabold text-red-800 uppercase tracking-wider">
            HIGH RISK ADVISORIES ({highRisk.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {highRisk.map((report) => (
            <div
              key={report.id}
              onClick={() => onSelectReport(report)}
              className="bg-white rounded-xl border-2 border-red-300 hover:border-red-500 p-5 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="bg-red-100 text-red-800 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                    HIGH RISK WARNING
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-base mt-1">
                    {report.eventType} — {report.location}
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {report.state}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200 block">
                    {report.confidence}% Conf.
                  </span>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    {report.timeAgo}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {report.description}
              </p>

              <div className="bg-red-50/70 p-3 rounded-lg border border-red-200 text-xs">
                <span className="font-bold text-red-900 block mb-0.5">
                  Recommended Public Safety Action:
                </span>
                <span className="text-red-800 font-medium">
                  "{report.recommendedAction || 'Residents in affected low-lying areas should follow local authority advisories and avoid non-essential travel.'}"
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  {report.reportCount} Corroborated Reports
                </span>
                <span className="font-bold text-blue-900 flex items-center gap-1 hover:underline">
                  View Intelligence Details <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODERATE RISK SECTION */}
      <div className="space-y-3 pt-4">
        <div className="flex items-center gap-2 border-b border-amber-200 pb-2">
          <span className="w-3 h-3 rounded-full bg-amber-500"></span>
          <h2 className="text-sm font-extrabold text-amber-800 uppercase tracking-wider">
            MODERATE ADVISORIES ({moderate.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {moderate.map((report) => (
            <div
              key={report.id}
              onClick={() => onSelectReport(report)}
              className="bg-white rounded-xl border border-amber-300 hover:border-amber-500 p-5 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                    MODERATE ADVISORY
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-base mt-1">
                    {report.eventType} — {report.location}
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {report.state}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200 block">
                    {report.confidence}% Conf.
                  </span>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    {report.timeAgo}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {report.description}
              </p>

              <div className="bg-amber-50/70 p-3 rounded-lg border border-amber-200 text-xs">
                <span className="font-bold text-amber-900 block mb-0.5">
                  Recommended Action:
                </span>
                <span className="text-amber-800 font-medium">
                  "{report.recommendedAction || 'Drive with caution and stay updated via local state radio or IMD bulletins.'}"
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
