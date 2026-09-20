import React from 'react';
import { Filter, RotateCcw, Search } from 'lucide-react';
import type { FilterState } from '../types/weather';
import { INDIAN_STATES, EVENT_TYPES } from '../data/mockData';

interface FilterPanelProps {
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  onReset: () => void;
  resultCount: number;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filterState,
  setFilterState,
  onReset,
  resultCount
}) => {
  const handleChange = (field: keyof FilterState, value: any) => {
    setFilterState((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs mb-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-blue-700" />
          <h3 className="font-bold text-slate-800 text-sm tracking-wide">
            Intelligence Filters & Search
          </h3>
          <span className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full font-semibold border border-blue-200">
            {resultCount} Events Match
          </span>
        </div>

        <button
          onClick={onReset}
          className="flex items-center gap-1 text-xs text-slate-600 hover:text-blue-700 font-medium cursor-pointer transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Filters</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Search Query */}
        <div className="lg:col-span-1">
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Search Location / Keyword
          </label>
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="e.g. Chennai, Flood..."
              value={filterState.searchQuery}
              onChange={(e) => handleChange('searchQuery', e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
        </div>

        {/* Event Type */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Event Type
          </label>
          <select
            value={filterState.eventType}
            onChange={(e) => handleChange('eventType', e.target.value)}
            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
          >
            {EVENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* State */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            State / UT
          </label>
          <select
            value={filterState.state}
            onChange={(e) => handleChange('state', e.target.value)}
            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
          >
            {INDIAN_STATES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        {/* Verification Status */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Verification Status
          </label>
          <select
            value={filterState.verificationStatus}
            onChange={(e) => handleChange('verificationStatus', e.target.value)}
            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
          >
            <option value="All">All Statuses</option>
            <option value="AI Verified">AI Verified</option>
            <option value="Under Review">Under Review</option>
            <option value="Verified">Official Verified</option>
          </select>
        </div>

        {/* Severity */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Severity Level
          </label>
          <select
            value={filterState.severity}
            onChange={(e) => handleChange('severity', e.target.value)}
            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
          >
            <option value="All">All Severities</option>
            <option value="High">High</option>
            <option value="Moderate">Moderate</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>
    </div>
  );
};
