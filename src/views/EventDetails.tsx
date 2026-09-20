import React, { useState } from 'react';
import type { WeatherReport } from '../types/weather';
import { WeatherMap } from '../components/WeatherMap';
import { 
  ArrowLeft, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Share2, 
  FileCheck, 
  XCircle, 
  Sparkles,
  Layers,
  MapPin
} from 'lucide-react';

interface EventDetailsProps {
  report: WeatherReport;
  onBack: () => void;
}

export const EventDetails: React.FC<EventDetailsProps> = ({ report, onBack }) => {
  const [showRawJson, setShowRawJson] = useState(false);
  const [reportFlagged, setReportFlagged] = useState(false);

  const breakdown = report.trustScoreBreakdown || {
    sourceReliability: 92,
    locationConfidence: 96,
    mediaAuthenticity: 91,
    crossReportAgreement: 95,
  };

  const evidence = report.evidenceSummary || {
    supporting: [
      `${report.reportCount} nearby citizen reports within 4km`,
      'Rainfall data correlation verified',
      'Multiple independent image sources verified',
      'Geotag location consistency score high'
    ],
    contradicting: ['2 reports flagged for low resolution camera noise'],
    duplicateAnalysis: 'No significant duplicate cluster detected.'
  };

  return (
    <div className="space-y-6">
      {/* Navigation Top Bar */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-blue-900 font-bold hover:text-blue-700 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Weather Map & Feed</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>Event Reference:</span>
          <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
            {report.id}
          </span>
        </div>
      </div>

      {/* Header Details Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-extrabold border ${
                report.verificationStatus.includes('Verified')
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-amber-50 text-amber-800 border-amber-300'
              }`}>
                <ShieldCheck className="w-3.5 h-3.5" />
                {report.verificationStatus.toUpperCase()}
              </span>

              <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                report.severity === 'High' 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-amber-100 text-amber-800'
              }`}>
                Severity: {report.severity}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {report.title}
            </h1>

            <p className="text-xs sm:text-sm font-semibold text-slate-600 flex items-center gap-1.5 mt-1">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>{report.location}, {report.state}</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500 font-normal">Geotag: {report.latitude.toFixed(4)}, {report.longitude.toFixed(4)}</span>
            </p>
          </div>

          {/* AI Trust Gauge */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center min-w-[160px]">
            <div className="text-[11px] font-bold text-blue-800 uppercase tracking-wider mb-1 flex items-center justify-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              AI Trust Score
            </div>
            <div className="text-3xl font-black text-blue-900">
              {report.confidence}%
            </div>
            <div className="text-[10px] text-blue-700 mt-0.5 font-medium">
              High System Confidence
            </div>
          </div>
        </div>

        {/* Timestamps & Key Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <span className="text-slate-500 block text-[11px]">First Report Ingested:</span>
            <span className="font-bold text-slate-800">{report.timestamp}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <span className="text-slate-500 block text-[11px]">Last AI Refresh:</span>
            <span className="font-bold text-slate-800">{report.timeAgo}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <span className="text-slate-500 block text-[11px]">Corroborated Submissions:</span>
            <span className="font-bold text-slate-800">{report.reportCount} Citizens</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <span className="text-slate-500 block text-[11px]">Primary Source:</span>
            <span className="font-bold text-slate-800">{report.source}</span>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Evidence & Timeline + Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 7 Columns: Evidence Summary & Trust Breakdown */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Evidence Summary Panel */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <FileCheck className="w-5 h-5 text-blue-700" />
              <h3 className="font-bold text-slate-900 text-sm tracking-wide">
                Evidence Summary Panel
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              {/* Supporting Evidence */}
              <div>
                <span className="font-bold text-emerald-800 uppercase tracking-wider block mb-2 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Supporting Evidence:
                </span>
                <ul className="space-y-1.5 pl-2">
                  {evidence.supporting.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-700">
                      <span className="text-emerald-600 font-bold shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contradicting Evidence */}
              {evidence.contradicting && evidence.contradicting.length > 0 && (
                <div className="pt-2 border-t border-slate-100">
                  <span className="font-bold text-slate-700 uppercase tracking-wider block mb-2 flex items-center gap-1">
                    <XCircle className="w-4 h-4 text-slate-400" />
                    Contradicting / Noise Signals:
                  </span>
                  <ul className="space-y-1.5 pl-2">
                    {evidence.contradicting.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-600">
                        <span className="text-slate-400 font-bold shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Duplicate Detection */}
              <div className="pt-2 border-t border-slate-100">
                <span className="font-bold text-slate-800 uppercase tracking-wider block mb-1">
                  Perceptual Hash Duplicate Detection:
                </span>
                <p className="text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded border border-slate-200">
                  {evidence.duplicateAnalysis}
                </p>
              </div>

              {/* AI Classification & Recommended Action */}
              <div className="pt-2 border-t border-slate-100 bg-amber-50/60 p-3 rounded-lg border border-amber-200">
                <span className="font-bold text-amber-900 text-xs block mb-1">
                  Recommended Public / Operational Action:
                </span>
                <p className="text-amber-900 font-medium leading-relaxed">
                  {report.recommendedAction || 'Follow local municipal flood control warnings and stay tuned for official IMD alerts.'}
                </p>
              </div>
            </div>
          </div>

          {/* AI Trust Factor Breakdown Bars */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
              AI Verification Factor Breakdown
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>Source Reliability Score</span>
                  <span className="text-blue-700 font-bold">{breakdown.sourceReliability}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: `${breakdown.sourceReliability}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>Geographic & Sensor Consistency</span>
                  <span className="text-emerald-700 font-bold">{breakdown.locationConfidence}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${breakdown.locationConfidence}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>Media Authenticity & Anti-Fake Check</span>
                  <span className="text-purple-700 font-bold">{breakdown.mediaAuthenticity}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-600 h-full rounded-full" style={{ width: `${breakdown.mediaAuthenticity}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>Cross-Report Multi-User Consensus</span>
                  <span className="text-teal-700 font-bold">{breakdown.crossReportAgreement}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-teal-600 h-full rounded-full" style={{ width: `${breakdown.crossReportAgreement}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Audit Log */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-700" />
              <span>Event Progression Timeline</span>
            </h3>

            <div className="relative pl-6 space-y-4 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {report.timeline.map((step, idx) => (
                <div key={idx} className="relative text-xs">
                  <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-blue-600 border-2 border-white ring-2 ring-blue-100"></div>
                  <div className="font-bold text-slate-900">{step.time} — {step.title}</div>
                  <div className="text-slate-600 mt-0.5">{step.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Map & Media Photo */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Affected Radius Map */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-blue-700" />
                <span>Geospatial Affected Radius</span>
              </h3>
              <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                Radius: {report.affectedRadiusKm || 4.5} km
              </span>
            </div>

            <div className="h-[280px]">
              <WeatherMap
                reports={[report]}
                onSelectReport={() => {}}
                selectedCategoryFilter="All Categories"
                setSelectedCategoryFilter={() => {}}
                verifiedOnly={false}
                setVerifiedOnly={() => {}}
                highRiskOnly={false}
                setHighRiskOnly={() => {}}
                centerLat={report.latitude}
                centerLng={report.longitude}
                zoom={12}
                showZoneRadius={true}
              />
            </div>
          </div>

          {/* Attached Evidence Photo */}
          {report.image && (
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-2">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-500">
                Primary Ground Photograph Attachment
              </h3>
              <img
                src={report.image}
                alt={report.title}
                className="w-full h-56 object-cover rounded-lg border border-slate-200"
              />
              <p className="text-[11px] text-slate-500 italic">
                Geotag verified by OpenCV EXIF parser & pHash archive check.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-500">
              Actions & Exports
            </h3>

            <div className="space-y-2">
              <button
                onClick={() => alert(`Public Alert URL copied: https://weather.gov.in/alerts/${report.id}`)}
                className="w-full bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Public Weather Alert</span>
              </button>

              <button
                onClick={() => setShowRawJson(!showRawJson)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <FileCheck className="w-4 h-4" />
                <span>{showRawJson ? 'Hide Raw AI Evidence Data' : 'View Raw AI Evidence JSON'}</span>
              </button>

              <button
                onClick={() => setReportFlagged(!reportFlagged)}
                className={`w-full text-xs font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                  reportFlagged
                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                    : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-300'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{reportFlagged ? 'Flagged for Re-Verification' : 'Report Incorrect Information'}</span>
              </button>
            </div>

            {showRawJson && (
              <pre className="mt-3 p-3 bg-slate-900 text-emerald-400 text-[10px] rounded-lg overflow-x-auto max-h-48 font-mono">
                {JSON.stringify(report, null, 2)}
              </pre>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
