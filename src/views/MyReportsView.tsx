import React, { useState } from 'react';
import type { WeatherReport } from '../types/weather';
import type { User } from '../types/auth';
import { 
  FileText, 
  CheckCircle2, 
  Eye,
  Loader2
} from 'lucide-react';

interface MyReportsViewProps {
  user: User;
  reports: WeatherReport[];
  onNavigateToReport: () => void;
  onSelectReport: (report: WeatherReport) => void;
}

export const MyReportsView: React.FC<MyReportsViewProps> = ({
  user,
  reports,
  onNavigateToReport,
  onSelectReport,
}) => {
  const [selectedMyReport, setSelectedMyReport] = useState<WeatherReport | null>(null);

  // Filter citizen's reports (or fallback demo reports if user newly logged in)
  const citizenReports = reports.filter((r) => r.source === 'Citizen').slice(0, 5);

  const statusPipelineSteps = [
    { title: 'Report Submitted', desc: 'Geotagged observation received' },
    { title: 'Location Extracted', desc: 'Spatial coordinates mapped to district' },
    { title: 'AI Classified', desc: 'spaCy NLP event categorization' },
    { title: 'Duplicate Check', desc: 'pHash media similarity verified' },
    { title: 'Official Verification', desc: 'Awaiting operator confirmation' }
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-900" />
            <span>My Submitted Weather Reports</span>
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Track the status, AI classification, and verification progression of reports submitted by {user.name}.
          </p>
        </div>

        <button
          onClick={onNavigateToReport}
          className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold py-2 px-4 rounded-lg shadow-sm cursor-pointer transition-colors"
        >
          + Submit New Report
        </button>
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 border-b border-slate-200 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Report ID</th>
                <th className="py-3 px-4">Event Category</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Submitted Time</th>
                <th className="py-3 px-4">AI Confidence</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-sans">
              {citizenReports.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    You have not submitted any weather reports yet.
                  </td>
                </tr>
              ) : (
                citizenReports.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-blue-900">{report.id}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{report.eventType}</td>
                    <td className="py-3 px-4 text-slate-700">{report.location}, {report.state}</td>
                    <td className="py-3 px-4 text-slate-500 whitespace-nowrap">{report.timeAgo}</td>
                    <td className="py-3 px-4 font-bold text-blue-700">{report.confidence}%</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        report.verificationStatus.includes('Verified')
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {report.verificationStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedMyReport(report)}
                        className="bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold py-1 px-3 rounded shadow-xs cursor-pointer transition-colors"
                      >
                        Track Status
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Citizen Report Status Progress Modal */}
      {selectedMyReport && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden space-y-6 p-6">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">
                  My Report Progression Tracking
                </h3>
                <span className="font-mono text-xs text-slate-500">ID: {selectedMyReport.id}</span>
              </div>

              <button
                onClick={() => setSelectedMyReport(null)}
                className="text-slate-400 hover:text-slate-700 text-xs font-bold cursor-pointer"
              >
                Close ✕
              </button>
            </div>

            {/* Event Summary */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between font-bold text-slate-900 border-b border-slate-200 pb-1">
                <span>{selectedMyReport.eventType} — {selectedMyReport.location}</span>
                <span className="text-blue-700">{selectedMyReport.confidence}% AI Confidence</span>
              </div>
              <p className="text-slate-600 font-medium">"{selectedMyReport.description}"</p>
            </div>

            {/* Citizen Status Timeline */}
            <div className="space-y-4">
              <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                Verification Pipeline Progress
              </h4>

              <div className="space-y-3 pl-2 text-xs">
                {statusPipelineSteps.map((step, idx) => {
                  const isVerified = selectedMyReport.verificationStatus.includes('Verified');
                  const isPassed = idx < 4 || (idx === 4 && isVerified);
                  const isCurrent = idx === 4 && !isVerified;

                  return (
                    <div key={idx} className="flex items-start gap-3">
                      {isPassed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      ) : isCurrent ? (
                        <Loader2 className="w-5 h-5 text-amber-500 animate-spin shrink-0" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-slate-300 shrink-0"></div>
                      )}

                      <div>
                        <div className={`font-bold ${isPassed ? 'text-slate-900' : isCurrent ? 'text-amber-800' : 'text-slate-400'}`}>
                          Step {idx + 1}: {step.title}
                        </div>
                        <div className="text-[11px] text-slate-500">{step.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Info note */}
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 text-[11px] text-blue-900 italic">
              * Reports are reviewed by NDMA / IMD emergency operators. You will be notified automatically once official verification is completed.
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => {
                  onSelectReport(selectedMyReport);
                  setSelectedMyReport(null);
                }}
                className="text-xs font-bold text-blue-900 hover:underline cursor-pointer flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Full Public Evidence Page</span>
              </button>

              <button
                onClick={() => setSelectedMyReport(null)}
                className="bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold py-1.5 px-4 rounded-lg cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
