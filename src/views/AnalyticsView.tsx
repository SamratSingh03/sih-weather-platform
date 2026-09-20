import React, { useState } from 'react';
import type { WeatherReport } from '../types/weather';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';
import { 
  BarChart3, 
  PieChart as PieIcon, 
  Download, 
  Search, 
  MapPin, 
  Archive,
  TrendingUp
} from 'lucide-react';

interface AnalyticsViewProps {
  reports: WeatherReport[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ reports }) => {
  const [archiveSearch, setArchiveSearch] = useState('');
  const archiveState = 'All';

  // Chart Data 1: Category Distribution
  const categoryCount = reports.reduce((acc, r) => {
    acc[r.eventType] = (acc[r.eventType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categoryData = Object.entries(categoryCount).map(([name, count]) => ({
    name,
    count,
  }));

  // Chart Data 2: Verified vs Pending vs Under Review
  const statusCount = reports.reduce((acc, r) => {
    acc[r.verificationStatus] = (acc[r.verificationStatus] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusData = Object.entries(statusCount).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = ['#10b981', '#f59e0b', '#3b82f6', '#ef4444', '#8b5cf6'];

  // Chart Data 3: Reports Timeline (Mock hourly timeline)
  const timelineData = [
    { time: '08:00', reports: 12, confidence: 88 },
    { time: '09:00', reports: 24, confidence: 91 },
    { time: '10:00', reports: 45, confidence: 93 },
    { time: '11:00', reports: 68, confidence: 94 },
    { time: '12:00', reports: 85, confidence: 92 },
    { time: '13:00', reports: 110, confidence: 95 },
    { time: '14:00', reports: 127, confidence: 94 },
  ];

  // Top Affected Cities
  const topRegions = [
    { city: 'Chennai', state: 'Tamil Nadu', count: 27, status: 'Severe Flood Alert', color: 'text-red-700 bg-red-50' },
    { city: 'Mumbai', state: 'Maharashtra', count: 42, status: 'Heavy Downpour', color: 'text-red-700 bg-red-50' },
    { city: 'Kolkata', state: 'West Bengal', count: 28, status: 'Tidal Waterlogging', color: 'text-amber-700 bg-amber-50' },
    { city: 'Bengaluru', state: 'Karnataka', count: 15, status: 'Thunderstorm Hail', color: 'text-amber-700 bg-amber-50' },
    { city: 'Delhi', state: 'Delhi NCR', count: 58, status: 'Heatwave Alert', color: 'text-red-700 bg-red-50' },
  ];

  // Filtered Archive
  const archiveFiltered = reports.filter((r) => {
    if (archiveState !== 'All' && r.state !== archiveState) return false;
    if (archiveSearch) {
      const q = archiveSearch.toLowerCase();
      return (
        r.id.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleExportCsv = () => {
    alert('Historical Intelligence Data exported to CSV successfully! (Filename: national_weather_archive_2026.csv)');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-blue-700" />
            <span>National Big Data Analytics Dashboard</span>
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Statistical insights, AI verification metrics, and searchable historical intelligence archives.
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          className="bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold py-2.5 px-4 rounded-lg shadow-sm cursor-pointer transition-colors flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span>Export Historical Dataset (CSV)</span>
        </button>
      </div>

      {/* Grid of Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Weather Events by Category */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
            Weather Events by Category
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px' }} />
                <Bar dataKey="count" fill="#1e3a8a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Reports Over Time */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span>Crowd Ingestion Velocity (Reports / Hour)</span>
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData}>
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="reports" stroke="#0d9488" fill="#ccfbf1" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Verification Distribution Pie */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2 flex items-center gap-2">
            <PieIcon className="w-4 h-4 text-purple-600" />
            <span>Verification Status Breakdown</span>
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${((percent || 0) * 100).toFixed(0)}%)`}
                >
                  {statusData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Affected Regions List */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-red-600" />
            <span>Top Affected Municipal Regions</span>
          </h3>

          <div className="space-y-3 text-xs">
            {topRegions.map((region, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 bg-slate-50">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-900 text-white font-bold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <div>
                    <span className="font-bold text-slate-900 block text-sm">{region.city}</span>
                    <span className="text-slate-500 text-[11px]">{region.state}</span>
                  </div>
                </div>

                <div className="text-right space-y-0.5">
                  <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${region.color}`}>
                    {region.status}
                  </span>
                  <div className="text-slate-600 text-[11px] font-semibold">
                    {region.count} Corroborated Reports
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Historical Weather Intelligence Archive */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Archive className="w-5 h-5 text-blue-800" />
            <h3 className="font-bold text-slate-900 text-base">
              Historical Weather Intelligence Archive
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search historical records..."
                value={archiveSearch}
                onChange={(e) => setArchiveSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 border-b border-slate-200 font-bold uppercase tracking-wider">
                <th className="py-2.5 px-4">Report ID</th>
                <th className="py-2.5 px-4">Date & Time</th>
                <th className="py-2.5 px-4">Location</th>
                <th className="py-2.5 px-4">Category</th>
                <th className="py-2.5 px-4">Confidence</th>
                <th className="py-2.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {archiveFiltered.map((report) => (
                <tr key={report.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-4 font-mono font-bold text-blue-900">{report.id}</td>
                  <td className="py-2.5 px-4 text-slate-700">{report.timestamp}</td>
                  <td className="py-2.5 px-4 font-semibold text-slate-900">{report.location}, {report.state}</td>
                  <td className="py-2.5 px-4 text-slate-700">{report.eventType}</td>
                  <td className="py-2.5 px-4 font-bold text-blue-700">{report.confidence}%</td>
                  <td className="py-2.5 px-4">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                      {report.verificationStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
