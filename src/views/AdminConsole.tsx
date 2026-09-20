import React, { useState } from 'react';
import type { WeatherReport, AdminKPIs } from '../types/weather';
import { StatCard } from '../components/StatCard';
import { 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Search, 
  X, 
  Database,
  Layers,
  Check,
  Ban,
  RefreshCw,
  Eye
} from 'lucide-react';

interface AdminConsoleProps {
  reports: WeatherReport[];
  kpis: AdminKPIs;
  onVerifyReport: (id: string) => void;
  onRejectReport: (id: string) => void;
  onSelectReport: (report: WeatherReport) => void;
  showToast: (msg: string) => void;
}

export const AdminConsole: React.FC<AdminConsoleProps> = ({
  reports,
  kpis,
  onVerifyReport,
  onRejectReport,
  onSelectReport,
  showToast,
}) => {
  const [activeTab, setActiveTab] = useState<'queue' | 'duplicates' | 'high-risk' | 'simulator'>('queue');
  const [selectedReportForReview, setSelectedReportForReview] = useState<WeatherReport | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // AI Verification Simulator State
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState(0);
  const [simulationComplete, setSimulationComplete] = useState(false);

  const simulationSteps = [
    'Analyzing text with spaCy NLP model...',
    'Extracting geotags & location entities...',
    'Checking media authenticity with OpenCV & pHash...',
    'Comparing nearby reports in 5km spatial radius...',
    'Checking duplicate media archive database...',
    'Cross-validating weather telemetry & IMD station data...'
  ];

  const filteredQueue = reports.filter((r) => {
    if (activeTab === 'high-risk' && r.severity !== 'High') return false;
    if (activeTab === 'duplicates' && r.duplicateRisk === 'Low') return false;

    if (statusFilter !== 'All' && r.verificationStatus !== statusFilter) return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        r.id.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q) ||
        r.eventType.toLowerCase().includes(q) ||
        r.source.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleRunAiSimulator = () => {
    setIsSimulating(true);
    setSimulationComplete(false);
    setSimulationStep(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      setSimulationStep(step);
      if (step >= simulationSteps.length) {
        clearInterval(interval);
        setIsSimulating(false);
        setSimulationComplete(true);
        showToast('AI Multi-Factor Verification complete! Score: 94%');
      }
    }, 500);
  };

  const handleVerifyInDrawer = (id: string) => {
    onVerifyReport(id);
    showToast(`Report ${id} verified and added to trusted weather intelligence!`);
    setSelectedReportForReview(null);
  };

  const handleRejectInDrawer = (id: string) => {
    onRejectReport(id);
    showToast(`Report ${id} rejected and removed from public feed.`);
    setSelectedReportForReview(null);
  };

  return (
    <div className="space-y-6">
      {/* Control Room Header */}
      <div className="bg-slate-900 text-white rounded-xl p-6 shadow-sm border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              Control Room System Operational
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            Weather Intelligence Operations Console
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            NDMA & IMD National Incident Response Center • Real-time Operator Queue
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRunAiSimulator}
            className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-extrabold py-2.5 px-4 rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-2 border border-purple-400/40"
          >
            <Sparkles className="w-4 h-4 text-purple-200" />
            <span>Run AI Verification Pipeline</span>
          </button>
        </div>
      </div>

      {/* Admin KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Reports Ingested Today"
          value={kpis.reportsToday}
          subtitle="Multi-channel stream"
          icon={Database}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Pending Verification"
          value={kpis.pendingVerification}
          subtitle="Awaiting review"
          icon={Clock}
          iconBgColor="bg-amber-50"
          iconColor="text-amber-600"
          badge="Action Required"
          badgeType="warning"
        />
        <StatCard
          title="AI Verified Signals"
          value={kpis.aiVerified}
          subtitle="High confidence"
          icon={CheckCircle2}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-600"
          badge="Auto-Validated"
          badgeType="success"
        />
        <StatCard
          title="Potential Duplicates"
          value={kpis.potentialDuplicates}
          subtitle="pHash Flagged"
          icon={Layers}
          iconBgColor="bg-purple-50"
          iconColor="text-purple-600"
        />
        <StatCard
          title="High Risk Events"
          value={kpis.highRiskEvents}
          subtitle="Active alerts"
          icon={ShieldAlert}
          iconBgColor="bg-red-50"
          iconColor="text-red-600"
          badge="Critical"
          badgeType="warning"
        />
      </div>

      {/* Main Tabs Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('queue')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'queue'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Verification Queue ({reports.length})
          </button>
          <button
            onClick={() => setActiveTab('high-risk')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'high-risk'
                ? 'bg-red-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            High Risk Alerts ({reports.filter(r => r.severity === 'High').length})
          </button>
          <button
            onClick={() => setActiveTab('duplicates')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'duplicates'
                ? 'bg-purple-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Duplicate Analysis ({reports.filter(r => r.duplicateRisk !== 'Low').length})
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'simulator'
                ? 'bg-purple-900 text-purple-100 ring-2 ring-purple-400'
                : 'bg-purple-50 text-purple-900 border border-purple-200 hover:bg-purple-100'
            }`}
          >
            ⚡ AI Pipeline Simulator
          </button>
        </div>

        {/* Quick Filter Inputs */}
        {activeTab !== 'simulator' && (
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Filter queue by ID or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-800 w-48 sm:w-64 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600"
            >
              <option value="All">All Statuses</option>
              <option value="AI Verified">AI Verified</option>
              <option value="Under Review">Under Review</option>
              <option value="Verified">Verified</option>
            </select>
          </div>
        )}
      </div>

      {/* Tab Content 1: AI Pipeline Simulator View */}
      {activeTab === 'simulator' && (
        <div className="bg-white rounded-xl border border-purple-200 shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <span>Interactive AI Verification Engine Demo</span>
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Simulates real-time multi-factor computer vision, NLP, and spatial corroboration processing on raw unstructured reports.
              </p>
            </div>

            <button
              onClick={handleRunAiSimulator}
              disabled={isSimulating}
              className="bg-purple-700 hover:bg-purple-600 disabled:bg-slate-300 text-white text-xs font-bold py-2.5 px-5 rounded-lg shadow-sm cursor-pointer transition-colors flex items-center gap-2"
            >
              {isSimulating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>{isSimulating ? 'Processing Engine Running...' : 'Execute AI Pipeline Demo'}</span>
            </button>
          </div>

          {/* Simulation Progress Animation */}
          {isSimulating && (
            <div className="bg-slate-900 text-white rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-xs">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>AI Ingestion Pipeline Executing Steps:</span>
              </div>

              <div className="space-y-2 text-xs font-mono">
                {simulationSteps.map((stepMsg, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    {idx < simulationStep ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : idx === simulationStep ? (
                      <RefreshCw className="w-4 h-4 text-purple-400 animate-spin shrink-0" />
                    ) : (
                      <span className="w-4 h-4 rounded-full border border-slate-700 inline-block shrink-0"></span>
                    )}
                    <span className={idx <= simulationStep ? 'text-slate-100' : 'text-slate-600'}>
                      {stepMsg}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Simulation Result Card */}
          {simulationComplete && !isSimulating && (
            <div className="bg-slate-900 text-white rounded-xl p-6 border-2 border-emerald-500 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xl border border-emerald-500/50">
                    ✓
                  </div>
                  <div>
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      AI VERIFICATION RESULT
                    </span>
                    <h3 className="text-xl font-extrabold text-white">
                      HIGH CONFIDENCE — VERIFIED SIGNAL
                    </h3>
                  </div>
                </div>

                <div className="bg-emerald-950 border border-emerald-500/40 px-4 py-2 rounded-lg text-right">
                  <div className="text-[10px] text-emerald-300 font-bold uppercase">Confidence Score</div>
                  <div className="text-2xl font-black text-emerald-400">94 / 100</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-sans">
                <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                  <span className="text-slate-400 block text-[10px]">AI Classification:</span>
                  <span className="font-bold text-white text-sm">Flood (Urban Inundation)</span>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                  <span className="text-slate-400 block text-[10px]">Extracted Geotag Location:</span>
                  <span className="font-bold text-white text-sm">Chennai, Tamil Nadu</span>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                  <span className="text-slate-400 block text-[10px]">Media Authenticity:</span>
                  <span className="font-bold text-emerald-400 text-sm">Likely Authentic (pHash ok)</span>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                  <span className="text-slate-400 block text-[10px]">Duplicate Risk:</span>
                  <span className="font-bold text-emerald-400 text-sm">Low (Unique upload)</span>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                  <span className="text-slate-400 block text-[10px]">Spatial Corroboration:</span>
                  <span className="font-bold text-emerald-400 text-sm">High (27 nearby matches)</span>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                  <span className="text-slate-400 block text-[10px]">Final Action Recommendation:</span>
                  <span className="font-bold text-emerald-300 text-sm">APPROVE & BROADCAST</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab Content 2: Verification Queue Table */}
      {activeTab !== 'simulator' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 border-b border-slate-200 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Report ID</th>
                  <th className="py-3 px-4">Event</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Source</th>
                  <th className="py-3 px-4">AI Confidence</th>
                  <th className="py-3 px-4">Duplicate Risk</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Time</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-sans text-slate-800">
                {filteredQueue.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-8 text-center text-slate-500">
                      No reports in queue match the filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredQueue.map((report) => (
                    <tr key={report.id} className="hover:bg-blue-50/40 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-blue-900">
                        {report.id}
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        {report.eventType}
                      </td>
                      <td className="py-3 px-4 text-slate-700">
                        {report.location}, {report.state}
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {report.source}
                      </td>
                      <td className="py-3 px-4 font-bold text-blue-700">
                        {report.confidence}%
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                          report.duplicateRisk === 'High'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {report.duplicateRisk}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          report.verificationStatus.includes('Verified')
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {report.verificationStatus}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                        {report.timeAgo}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setSelectedReportForReview(report)}
                          className="bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold py-1 px-3 rounded shadow-xs cursor-pointer transition-colors"
                        >
                          Review Report
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Admin Report Review Drawer / Modal */}
      {selectedReportForReview && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex justify-end animate-fade-in">
          <div className="w-full max-w-xl bg-white h-full shadow-2xl overflow-y-auto p-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Review Weather Report
                  </h2>
                  <p className="text-xs text-slate-500 font-mono">
                    ID: {selectedReportForReview.id}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedReportForReview(null)}
                  className="p-1 rounded hover:bg-slate-100 text-slate-500 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Photo Preview if available */}
              {selectedReportForReview.image && (
                <div>
                  <img
                    src={selectedReportForReview.image}
                    alt={selectedReportForReview.title}
                    className="w-full h-48 object-cover rounded-lg border border-slate-200"
                  />
                </div>
              )}

              {/* Event Attributes */}
              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div>
                  <span className="text-slate-500 block">Event Type:</span>
                  <span className="font-bold text-slate-900">{selectedReportForReview.eventType}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Location:</span>
                  <span className="font-bold text-slate-900">{selectedReportForReview.location}, {selectedReportForReview.state}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Timestamp:</span>
                  <span className="font-bold text-slate-800">{selectedReportForReview.timestamp}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Source:</span>
                  <span className="font-bold text-slate-800">{selectedReportForReview.source}</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1 text-xs">
                <span className="font-bold text-slate-700">Citizen Description:</span>
                <p className="text-slate-600 bg-white p-3 rounded border border-slate-200 leading-relaxed">
                  "{selectedReportForReview.description}"
                </p>
              </div>

              {/* AI Trust Score Breakdown */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-blue-200 pb-2">
                  <span className="text-xs font-bold text-blue-900 uppercase">AI Trust Score Breakdown</span>
                  <span className="text-lg font-black text-blue-900">{selectedReportForReview.confidence} / 100</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-600 font-medium">Source Reliability:</span>
                    <span className="font-bold text-slate-800">{selectedReportForReview.trustScoreBreakdown?.sourceReliability || 92}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 font-medium">Location Confidence:</span>
                    <span className="font-bold text-slate-800">{selectedReportForReview.trustScoreBreakdown?.locationConfidence || 96}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 font-medium">Media Authenticity:</span>
                    <span className="font-bold text-slate-800">{selectedReportForReview.trustScoreBreakdown?.mediaAuthenticity || 91}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 font-semibold">Cross-Report Agreement:</span>
                    <span className="font-bold text-slate-800">{selectedReportForReview.trustScoreBreakdown?.crossReportAgreement || 95}%</span>
                  </div>
                </div>
              </div>

              {/* Duplicate & Corroboration Info */}
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <span className="font-bold text-purple-900 block mb-0.5">Duplicate Analysis:</span>
                  <span className="text-purple-800">"No matching media found in recent reports. Unique image signature."</span>
                </div>
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <span className="font-bold text-emerald-900 block mb-0.5">Nearby Corroboration:</span>
                  <span className="text-emerald-800">{selectedReportForReview.reportCount} reports within 5 km spatial radius.</span>
                </div>
              </div>

            </div>

            {/* Drawer Action Buttons */}
            <div className="border-t border-slate-200 pt-4 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleVerifyInDrawer(selectedReportForReview.id)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold py-2.5 px-3 rounded-lg shadow-sm cursor-pointer transition-colors flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Verify Report</span>
                </button>

                <button
                  onClick={() => handleRejectInDrawer(selectedReportForReview.id)}
                  className="bg-red-600 hover:bg-red-500 text-white text-xs font-extrabold py-2.5 px-3 rounded-lg shadow-sm cursor-pointer transition-colors flex items-center justify-center gap-1.5"
                >
                  <Ban className="w-4 h-4" />
                  <span>Reject</span>
                </button>
              </div>

              <button
                onClick={() => {
                  onSelectReport(selectedReportForReview);
                  setSelectedReportForReview(null);
                }}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-2 px-3 rounded-lg cursor-pointer transition-colors flex items-center justify-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Full Deep Evidence Details</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
