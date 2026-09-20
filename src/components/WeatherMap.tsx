import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

import type { WeatherReport } from '../types/weather';
import { 
  CloudRain, 
  Waves, 
  Zap, 
  Sun, 
  CloudFog, 
  Wind, 
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

interface WeatherMapProps {
  reports: WeatherReport[];
  onSelectReport: (report: WeatherReport) => void;
  selectedCategoryFilter: string;
  setSelectedCategoryFilter: (category: string) => void;
  verifiedOnly: boolean;
  setVerifiedOnly: (val: boolean) => void;
  highRiskOnly: boolean;
  setHighRiskOnly: (val: boolean) => void;
  centerLat?: number;
  centerLng?: number;
  zoom?: number;
  showZoneRadius?: boolean;
}

export const WeatherMap: React.FC<WeatherMapProps> = ({
  reports,
  onSelectReport,
  selectedCategoryFilter,
  setSelectedCategoryFilter,
  verifiedOnly,
  setVerifiedOnly,
  highRiskOnly,
  setHighRiskOnly,
  centerLat = 22.5937,
  centerLng = 78.9629,
  zoom = 5,
  showZoneRadius = false
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  // Helper to get marker color based on category/severity
  const getMarkerStyle = (report: WeatherReport) => {
    switch (report.eventType) {
      case 'Flood':
        return { bg: '#dc2626', border: '#991b1b', text: '🌊', label: 'Flood' };
      case 'Rainfall':
        return { bg: '#2563eb', border: '#1e40af', text: '🌧️', label: 'Rainfall' };
      case 'Thunderstorm':
        return { bg: '#7c3aed', border: '#5b21b6', text: '⚡', label: 'Storm' };
      case 'Heatwave':
        return { bg: '#ea580c', border: '#c2410c', text: '☀️', label: 'Heatwave' };
      case 'Fog':
        return { bg: '#64748b', border: '#334155', text: '🌫️', label: 'Fog' };
      case 'Dust Storm':
        return { bg: '#d97706', border: '#b45309', text: '🌪️', label: 'Dust Storm' };
      case 'Strong Wind':
        return { bg: '#0d9488', border: '#115e59', text: '💨', label: 'Wind' };
      default:
        return { bg: '#475569', border: '#1e293b', text: '⚠️', label: 'Other' };
    }
  };

  // Initialize map once
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [centerLat, centerLng],
        zoom: zoom,
        zoomControl: true,
        scrollWheelZoom: true,
      });

      // Use clean government-style tile layer (CartoDB Positron / Light)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        maxZoom: 18,
        subdomains: 'abcd',
      }).addTo(map);

      markersLayerRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    } else {
      mapInstanceRef.current.setView([centerLat, centerLng], zoom);
    }

    return () => {
      // Map cleanup on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [centerLat, centerLng, zoom]);

  // Update markers whenever reports or filters change
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    const layerGroup = markersLayerRef.current;
    layerGroup.clearLayers();

    reports.forEach((report) => {
      const style = getMarkerStyle(report);
      const isHighRisk = report.severity === 'High';

      // Create HTML div icon
      const iconHtml = `
        <div class="custom-leaflet-marker ${isHighRisk ? 'custom-pulse-marker' : ''}" style="
          width: 34px;
          height: 34px;
          background-color: ${style.bg};
          border: 2px solid #ffffff;
          box-shadow: 0 4px 8px rgba(0,0,0,0.25);
          font-size: 16px;
          color: ${style.bg};
        ">
          <span style="font-size: 16px;">${style.text}</span>
        </div>
      `;

      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'custom-map-icon',
        iconSize: [34, 34],
        iconAnchor: [17, 17],
        popupAnchor: [0, -18],
      });

      const marker = L.marker([report.latitude, report.longitude], { icon: customIcon });

      // Popup Content
      const popupContent = document.createElement('div');
      popupContent.className = 'p-1 font-sans text-slate-800 text-xs min-w-[240px]';
      popupContent.innerHTML = `
        <div class="border-b border-slate-200 pb-2 mb-2">
          <div class="flex items-center justify-between gap-2">
            <span class="font-bold text-sm text-slate-900">${report.title}</span>
          </div>
          <div class="flex items-center gap-1 text-slate-600 text-xs mt-0.5">
            <span class="font-semibold text-slate-700">${report.location}, ${report.state}</span>
          </div>
        </div>

        <div class="space-y-1.5 text-xs text-slate-600 mb-3">
          <div class="flex justify-between">
            <span class="text-slate-500">Reported:</span>
            <span class="font-medium text-slate-700">${report.timeAgo}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-slate-500">Verification:</span>
            <span class="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-bold ${
              report.verificationStatus.includes('Verified')
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-amber-100 text-amber-800'
            }">${report.verificationStatus}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-500">AI Confidence:</span>
            <span class="font-bold text-blue-700">${report.confidence}%</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-500">Corroboration:</span>
            <span class="font-medium text-slate-700">${report.reportCount} reports</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-500">Source:</span>
            <span class="font-medium text-slate-700">${report.source}</span>
          </div>
        </div>

        <button 
          id="btn-view-details-${report.id}"
          class="w-full bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold py-1.5 px-3 rounded shadow-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
        >
          <span>View Details & Evidence</span>
        </button>
      `;

      // Attach click event for button inside popup
      marker.bindPopup(popupContent);
      marker.on('popupopen', () => {
        const btn = document.getElementById(`btn-view-details-${report.id}`);
        if (btn) {
          btn.onclick = () => {
            onSelectReport(report);
          };
        }
      });

      layerGroup.addLayer(marker);

      // If showZoneRadius is enabled (e.g. for event details view)
      if (showZoneRadius && report.affectedRadiusKm) {
        const circle = L.circle([report.latitude, report.longitude], {
          color: style.bg,
          fillColor: style.bg,
          fillOpacity: 0.2,
          radius: report.affectedRadiusKm * 1000,
        });
        layerGroup.addLayer(circle);
      }
    });
  }, [reports, onSelectReport, showZoneRadius]);

  const categoryToggles = [
    { id: 'All Categories', label: 'All Events', icon: AlertCircle },
    { id: 'Flood', label: 'Flood', icon: Waves },
    { id: 'Rainfall', label: 'Rainfall', icon: CloudRain },
    { id: 'Thunderstorm', label: 'Storm', icon: Zap },
    { id: 'Heatwave', label: 'Heatwave', icon: Sun },
    { id: 'Fog', label: 'Fog', icon: CloudFog },
    { id: 'Strong Wind', label: 'Wind', icon: Wind },
  ];

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-slate-300 shadow-sm bg-white">
      {/* Top Map Controls Bar */}
      <div className="bg-slate-900 text-white p-3 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 z-20 relative">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Map Controls & Toggles:
          </span>
          <div className="flex flex-wrap items-center gap-1">
            {categoryToggles.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategoryFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategoryFilter(cat.id)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                    isSelected
                      ? 'bg-blue-600 text-white font-semibold shadow-xs'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setVerifiedOnly(!verifiedOnly)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded font-medium border transition-colors ${
              verifiedOnly
                ? 'bg-emerald-600 border-emerald-500 text-white'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Verified Only</span>
          </button>

          <button
            onClick={() => setHighRiskOnly(!highRiskOnly)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded font-medium border transition-colors ${
              highRiskOnly
                ? 'bg-red-600 border-red-500 text-white'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>High Risk Only</span>
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative w-full h-[520px] bg-slate-100">
        <div ref={mapContainerRef} className="w-full h-full" />

        {/* Legend Overlay at Bottom Right */}
        <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-xs border border-slate-300 p-3 rounded-lg shadow-md z-30 text-xs text-slate-800 w-52">
          <div className="font-bold text-slate-900 mb-2 border-b border-slate-200 pb-1 flex items-center justify-between">
            <span>Map Legend</span>
            <span className="text-[10px] text-slate-500 font-normal">Active Events</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-red-600 border border-white shrink-0"></span>
              <span>Flood (Red Pulse = High Risk)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-blue-600 border border-white shrink-0"></span>
              <span>Heavy Rainfall</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-purple-600 border border-white shrink-0"></span>
              <span>Thunderstorm / Hail</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-amber-600 border border-white shrink-0"></span>
              <span>Heatwave / Dust Storm</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-teal-600 border border-white shrink-0"></span>
              <span>Strong Winds / Fog</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
