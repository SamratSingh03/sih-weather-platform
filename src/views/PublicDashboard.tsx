import React, { useState, useMemo } from 'react';
import type { WeatherReport, FilterState } from '../types/weather';
import { StatCard } from '../components/StatCard';
import { WeatherMap } from '../components/WeatherMap';
import { FilterPanel } from '../components/FilterPanel';
import { EventFeed } from '../components/EventFeed';
import { Activity, ShieldCheck, Clock, MapPin } from 'lucide-react';

interface PublicDashboardProps {
  reports: WeatherReport[];
  onSelectReport: (report: WeatherReport) => void;
  onNavigateToReport: () => void;
}

export const PublicDashboard: React.FC<PublicDashboardProps> = ({
  reports,
  onSelectReport,
  onNavigateToReport,
}) => {
  const [filterState, setFilterState] = useState<FilterState>({
    searchQuery: '',
    eventType: 'All Categories',
    state: 'All States',
    district: '',
    verificationStatus: 'All',
    severity: 'All',
    highRiskOnly: false,
    verifiedOnly: false,
  });

  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All Categories');
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [highRiskOnly, setHighRiskOnly] = useState<boolean>(false);

  // Sync controls with filter state
  const activeCategory = selectedCategoryFilter !== 'All Categories' ? selectedCategoryFilter : filterState.eventType;

  const filteredReports = useMemo(() => {
    return reports.filter((r) => {
      // Search query
      if (filterState.searchQuery) {
        const q = filterState.searchQuery.toLowerCase();
        const matchesLoc = r.location.toLowerCase().includes(q) || r.state.toLowerCase().includes(q);
        const matchesTitle = r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q);
        if (!matchesLoc && !matchesTitle) return false;
      }

      // Event Type
      if (activeCategory !== 'All Categories' && r.eventType !== activeCategory) {
        return false;
      }

      // State
      if (filterState.state !== 'All States' && r.state !== filterState.state) {
        return false;
      }

      // Verification Status
      if (filterState.verificationStatus !== 'All' && r.verificationStatus !== filterState.verificationStatus) {
        return false;
      }

      // Severity
      if (filterState.severity !== 'All' && r.severity !== filterState.severity) {
        return false;
      }

      // Map Quick Toggles
      if (verifiedOnly && !r.verificationStatus.includes('Verified')) {
        return false;
      }

      if (highRiskOnly && r.severity !== 'High') {
        return false;
      }

      return true;
    });
  }, [reports, filterState, activeCategory, verifiedOnly, highRiskOnly]);

  const handleResetFilters = () => {
    setFilterState({
      searchQuery: '',
      eventType: 'All Categories',
      state: 'All States',
      district: '',
      verificationStatus: 'All',
      severity: 'All',
      highRiskOnly: false,
      verifiedOnly: false,
    });
    setSelectedCategoryFilter('All Categories');
    setVerifiedOnly(false);
    setHighRiskOnly(false);
  };

  return (
    <div className="space-y-6">
      {/* Hero Banner Header */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-950 to-slate-900 rounded-xl text-white p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-800/60 text-blue-200 text-xs font-semibold mb-3 border border-blue-700/50">
            <Activity className="w-3.5 h-3.5 text-blue-400" />
            <span>SIH 2026 Innovation Proposal • Disaster Management</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2 text-white">
            National Weather Intelligence
          </h1>

          <p className="text-blue-100 text-sm sm:text-base leading-relaxed mb-4">
            AI-verified hyperlocal weather intelligence synthesized from citizen observations, public sensor datasets, and satellite radar streams across India.
          </p>

          <p className="text-xs text-blue-300 font-medium italic border-l-2 border-amber-400 pl-3">
            "Turning crowd-sourced reports into trusted, geo-tagged weather intelligence."
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={onNavigateToReport}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-xs sm:text-sm font-bold shadow-md transition-colors cursor-pointer flex items-center gap-2"
          >
            <span>+ Report Weather Event</span>
          </button>
          <div className="text-xs text-blue-200 bg-blue-900/80 px-3 py-2 rounded-lg border border-blue-800">
            Current Status: <span className="font-bold text-emerald-400">● 127 Active Events Ingested</span>
          </div>
        </div>
      </div>

      {/* 4 KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Weather Events"
          value={127}
          subtitle="Monitored across 28 States & UTs"
          icon={Activity}
          iconBgColor="bg-red-50"
          iconColor="text-red-600"
          badge="Real-time Stream"
          badgeType="warning"
        />
        <StatCard
          title="Verified Reports"
          value="1,842"
          subtitle="AI & NLP Authenticated Signals"
          icon={ShieldCheck}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-600"
          badge="94.2% Avg Confidence"
          badgeType="success"
        />
        <StatCard
          title="Reports Under Review"
          value={64}
          subtitle="Operator Queue Reviewing"
          icon={Clock}
          iconBgColor="bg-amber-50"
          iconColor="text-amber-600"
          badge="Action Required"
          badgeType="warning"
        />
        <StatCard
          title="Affected Locations"
          value={38}
          subtitle="Districts with High-Risk Alerts"
          icon={MapPin}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
          badge="Geo-tagged Zones"
          badgeType="info"
        />
      </div>

      {/* Filter Panel */}
      <FilterPanel
        filterState={filterState}
        setFilterState={setFilterState}
        onReset={handleResetFilters}
        resultCount={filteredReports.length}
      />

      {/* Main Map & Live Feed Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Interactive Map (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <WeatherMap
            reports={filteredReports}
            onSelectReport={onSelectReport}
            selectedCategoryFilter={selectedCategoryFilter}
            setSelectedCategoryFilter={setSelectedCategoryFilter}
            verifiedOnly={verifiedOnly}
            setVerifiedOnly={setVerifiedOnly}
            highRiskOnly={highRiskOnly}
            setHighRiskOnly={setHighRiskOnly}
          />
        </div>

        {/* Live Intelligence Feed (4 cols) */}
        <div className="lg:col-span-4 h-full">
          <EventFeed
            reports={filteredReports}
            onSelectReport={onSelectReport}
          />
        </div>
      </div>
    </div>
  );
};
