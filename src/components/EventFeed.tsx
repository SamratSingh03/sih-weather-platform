import React from 'react';
import type { WeatherReport } from '../types/weather';
import { ShieldCheck, Clock, ArrowRight } from 'lucide-react';

interface EventFeedProps {
  reports: WeatherReport[];
  onSelectReport: (report: WeatherReport) => void;
}

export const EventFeed: React.FC<EventFeedProps> = ({ reports, onSelectReport }) => {
  const getSeverityBadge = (report: WeatherReport) => {
    switch (report.severity) {
      case 'High':
        return { dot: '🔴', bg: 'bg-red-50 text-red-700 border-red-200' };
      case 'Moderate':
        return { dot: '🟠', bg: 'bg-amber-50 text-amber-700 border-amber-200' };
      default:
        return { dot: '🟡', bg: 'bg-yellow-50 text-yellow-700 border-yellow-200' };
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 flex flex-col h-full">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
        <div>
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
            Live Intelligence Feed
          </h3>
          <p className="text-xs text-slate-500">Real-time geo-tagged signal stream</p>
        </div>
        <span className="text-xs bg-slate-100 font-semibold text-slate-700 px-2 py-0.5 rounded">
          {reports.length} Signals
        </span>
      </div>

      <div className="space-y-3 overflow-y-auto max-h-[580px] pr-1">
        {reports.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-500">
            No active weather events match the current filter criteria.
          </div>
        ) : (
          reports.map((report) => {
            const badge = getSeverityBadge(report);
            return (
              <div
                key={report.id}
                onClick={() => onSelectReport(report)}
                className="group p-3 rounded-lg border border-slate-200 hover:border-blue-400 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm group-hover:text-blue-900 transition-colors">
                    <span>{badge.dot}</span>
                    <span>{report.eventType}</span>
                    <span className="text-slate-400 font-normal">—</span>
                    <span className="text-slate-800">{report.location}</span>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${badge.bg}`}>
                    {report.severity}
                  </span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 my-2 leading-relaxed">
                  {report.description}
                </p>

                <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      {report.verificationStatus}
                    </span>
                    <span className="font-bold text-blue-700">
                      {report.confidence}% Conf.
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-500">
                    <span className="flex items-center gap-0.5">
                      <Clock className="w-3 h-3" />
                      {report.timeAgo}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
