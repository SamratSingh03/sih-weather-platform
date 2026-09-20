import React from 'react';
import type { User } from '../types/auth';
import type { WeatherReport } from '../types/weather';
import { WeatherMap } from '../components/WeatherMap';
import { 
  PlusCircle, 
  MapPin, 
  FileText, 
  Users, 
  ArrowRight,
  ShieldCheck,
  CloudSun
} from 'lucide-react';

interface CitizenDashboardProps {
  user: User;
  reports: WeatherReport[];
  onSelectReport: (report: WeatherReport) => void;
  onNavigateToReport: () => void;
  onNavigateToMyReports: () => void;
  onNavigateToAlerts: () => void;
}

export const CitizenDashboard: React.FC<CitizenDashboardProps> = ({
  user,
  reports,
  onSelectReport,
  onNavigateToReport,
  onNavigateToMyReports,
  onNavigateToAlerts
}) => {
  const userCity = user.city || 'Chennai';
  const nearbyAlerts = reports.filter((r) => r.severity === 'High');
  const recentVerified = reports.filter((r) => r.verificationStatus.includes('Verified')).slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-950 to-slate-900 rounded-xl text-white p-6 sm:p-8 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-200 mb-1">
            <CloudSun className="w-4 h-4 text-blue-400" />
            <span>Citizen Weather Portal • Location: {userCity}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {user.name}
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 mt-1">
            Here is the latest hyperlocal weather intelligence and disaster warnings around your area.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onNavigateToReport}
            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold py-2.5 px-4 rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Report Weather Event</span>
          </button>

          <button
            onClick={onNavigateToMyReports}
            className="bg-blue-800 hover:bg-blue-700 text-white text-xs font-bold py-2.5 px-4 rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-2 border border-blue-600"
          >
            <FileText className="w-4 h-4" />
            <span>My Submitted Reports</span>
          </button>
        </div>
      </div>

      {/* Nearby Alerts Cards */}
      {nearbyAlerts.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-red-200 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-600 animate-pulse"></span>
              <h2 className="text-sm font-extrabold text-red-800 uppercase tracking-wider">
                HIGH RISK NEARBY ALERTS ({nearbyAlerts.length})
              </h2>
            </div>
            <button
              onClick={onNavigateToAlerts}
              className="text-xs text-red-700 font-bold hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>View All Public Advisories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nearbyAlerts.slice(0, 2).map((alert) => (
              <div
                key={alert.id}
                onClick={() => onSelectReport(alert)}
                className="bg-white rounded-xl border-2 border-red-300 hover:border-red-500 p-5 shadow-xs transition-all cursor-pointer space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="bg-red-100 text-red-800 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                      CRITICAL WARNING
                    </span>
                    <h3 className="font-extrabold text-slate-900 text-base mt-1">
                      {alert.eventType} — {alert.location}
                    </h3>
                    <p className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {alert.state} • ~2 km from your location
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 block">
                      {alert.confidence}% Conf.
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">{alert.timeAgo}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">
                  {alert.description}
                </p>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    {alert.reportCount} Corroborated Reports
                  </span>
                  <span className="font-bold text-blue-900">View Details →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Interactive Weather Map Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
            Interactive National Weather Map
          </h2>
          <span className="text-xs text-slate-500 font-medium">Click markers to inspect hyperlocal ground evidence</span>
        </div>

        <div className="h-[480px]">
          <WeatherMap
            reports={reports}
            onSelectReport={onSelectReport}
            selectedCategoryFilter="All Categories"
            setSelectedCategoryFilter={() => {}}
            verifiedOnly={false}
            setVerifiedOnly={() => {}}
            highRiskOnly={false}
            setHighRiskOnly={() => {}}
          />
        </div>
      </div>

      {/* Recent Verified Events Feed */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Recently Verified Weather Signals</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {recentVerified.map((report) => (
            <div
              key={report.id}
              onClick={() => onSelectReport(report)}
              className="p-4 rounded-lg border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-md transition-all cursor-pointer space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">{report.location}</span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                  AI Verified
                </span>
              </div>
              <p className="font-semibold text-slate-800">{report.eventType}</p>
              <p className="text-[11px] text-slate-600 line-clamp-2">{report.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
