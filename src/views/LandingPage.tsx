import React from 'react';
import type { WeatherReport } from '../types/weather';
import { 
  ShieldCheck, 
  MapPin, 
  Activity, 
  Users, 
  Database, 
  CheckCircle2, 
  ArrowRight, 
  ShieldAlert, 
  CloudRain, 
  Waves, 
  Zap, 
  Sun, 
  ChevronRight
} from 'lucide-react';

interface LandingPageProps {
  onOpenPublicAuth: (mode?: 'login' | 'signup') => void;
  onOpenAdminAuth: () => void;
  onExploreLiveMap: () => void;
  onReportEvent: () => void;
  reports: WeatherReport[];
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenPublicAuth,
  onOpenAdminAuth,
  onExploreLiveMap,
  onReportEvent,
  reports,
}) => {
  const topPreviewReports = reports.slice(0, 3);

  return (
    <div className="space-y-16 pb-12">
      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-r from-blue-950 via-blue-900 to-slate-900 text-white rounded-2xl p-6 sm:p-10 shadow-md relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Column: Text & Hero CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-800/80 text-blue-200 text-xs font-semibold border border-blue-700/50">
              <Activity className="w-3.5 h-3.5 text-blue-400" />
              <span>Smart India Hackathon 2026 Proposal • Team InnovateX</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                National Weather Intelligence
              </h1>
              <h2 className="text-lg sm:text-xl font-semibold text-blue-200">
                AI-Verified Hyperlocal Weather Intelligence for India
              </h2>
            </div>

            <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
              Turning citizen observations and multi-source weather data into trusted, geo-tagged weather intelligence for faster disaster awareness and response.
            </p>

            {/* Actions: Report Event & Explore Live Intelligence */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onReportEvent}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold py-3 px-5 rounded-lg shadow-md transition-colors cursor-pointer flex items-center gap-2"
              >
                <span>+ Report a Weather Event</span>
              </button>

              <button
                onClick={onExploreLiveMap}
                className="bg-blue-800/80 hover:bg-blue-800 text-white border border-blue-600 text-xs sm:text-sm font-bold py-3 px-5 rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-2"
              >
                <span>Explore Live Intelligence</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Access Choices Box */}
            <div className="pt-6 border-t border-blue-800/80 space-y-3">
              <span className="text-xs font-bold text-blue-300 uppercase tracking-wider block">
                Access the Platform:
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onOpenPublicAuth('login')}
                  className="bg-white hover:bg-slate-100 text-blue-950 font-extrabold text-xs py-2.5 px-4 rounded-lg shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Users className="w-4 h-4 text-blue-700" />
                  <span>Continue as Public</span>
                </button>

                <button
                  onClick={onOpenAdminAuth}
                  className="bg-slate-900/90 hover:bg-slate-900 text-emerald-400 border border-slate-700 font-extrabold text-xs py-2.5 px-4 rounded-lg shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ShieldAlert className="w-4 h-4 text-emerald-400" />
                  <span>Admin Login (Authorities)</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Graphic of India & Weather Markers */}
          <div className="lg:col-span-5 relative">
            <div className="bg-slate-900/80 border border-blue-800/60 rounded-xl p-5 shadow-2xl relative space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs font-bold text-slate-200">National Weather Map Vector</span>
                </div>
                <span className="text-[10px] bg-blue-900 text-blue-200 font-mono px-2 py-0.5 rounded">
                  Live Feed Ingestion
                </span>
              </div>

              {/* Graphic Mock Visual */}
              <div className="relative h-64 bg-slate-950 rounded-lg overflow-hidden border border-slate-800 flex items-center justify-center p-4">
                {/* Background grid lines */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-30"></div>

                {/* Floating Map Badges */}
                <div className="absolute top-3 left-3 bg-slate-900/90 border border-emerald-500/50 text-emerald-400 px-2.5 py-1 rounded text-[10px] font-bold shadow-md flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>AI Verified • 94% Confidence</span>
                </div>

                <div className="absolute bottom-3 right-3 bg-slate-900/90 border border-blue-500/50 text-blue-300 px-2.5 py-1 rounded text-[10px] font-bold shadow-md flex items-center gap-1">
                  <Users className="w-3 h-3 text-blue-400" />
                  <span>27 Corroborated Reports</span>
                </div>

                <div className="absolute top-12 right-4 bg-red-950/90 border border-red-500/50 text-red-300 px-2 py-0.5 rounded text-[10px] font-extrabold animate-pulse">
                  Hyperlocal Alert: Flood
                </div>

                {/* Marker Nodes */}
                <div className="relative z-10 space-y-4 text-center">
                  <div className="inline-flex items-center gap-2 bg-blue-900/90 px-3 py-1.5 rounded-full border border-blue-500 text-xs font-bold text-white shadow-lg">
                    <Waves className="w-4 h-4 text-blue-400" />
                    <span>Chennai (Urban Flood)</span>
                  </div>
                  <div className="flex justify-center gap-4 text-xs font-medium text-slate-300">
                    <span className="bg-slate-800/80 px-2.5 py-1 rounded border border-slate-700 flex items-center gap-1">
                      <CloudRain className="w-3.5 h-3.5 text-blue-400" /> Mumbai
                    </span>
                    <span className="bg-slate-800/80 px-2.5 py-1 rounded border border-slate-700 flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-purple-400" /> Bengaluru
                    </span>
                    <span className="bg-slate-800/80 px-2.5 py-1 rounded border border-slate-700 flex items-center gap-1">
                      <Sun className="w-3.5 h-3.5 text-amber-400" /> Delhi
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. "WHY NATIONAL WEATHER INTELLIGENCE?" SECTION */}
      <section className="space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Why National Weather Intelligence?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Translating unstructured citizen signals into high-confidence weather data for national disaster response.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Hyperlocal Intelligence</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Understand weather conditions at a granular local street level using geotagged citizen observations.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">AI-Assisted Verification</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              AI helps classify events, identify duplicate or potentially misleading reports, and compute confidence scores.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow space-y-3">
            <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Multi-Source Validation</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Citizen reports are cross-validated against IMD radar feeds, satellite weather sensors, and nearby spatial clusters.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Faster Local Awareness</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Provides citizens and disaster management authorities a clearer ground-truth picture of emerging local hazards.
            </p>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS — HORIZONTAL PIPELINE */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="text-center space-y-1 max-w-2xl mx-auto">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            How It Works
          </h2>
          <p className="text-xs text-slate-600">
            Unstructured reports are transformed into structured, geo-tagged weather intelligence through automated processing and verification.
          </p>
        </div>

        {/* Horizontal Process Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-3 text-center relative">
          {[
            { step: '1', title: 'Citizen Reports', desc: 'Photos & Geotags' },
            { step: '2', title: 'Data Ingestion', desc: 'Kafka Pipeline' },
            { step: '3', title: 'AI Classification', desc: 'spaCy NLP Engine' },
            { step: '4', title: 'Verification', desc: 'pHash Anti-Fake' },
            { step: '5', title: 'Geo Intelligence', desc: 'PostgreSQL & GIS' },
            { step: '6', title: 'Dashboards', desc: 'NDMA & Public Alerts' },
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 relative">
              <div className="w-7 h-7 rounded-full bg-blue-900 text-white font-bold text-xs flex items-center justify-center mx-auto shadow-xs">
                {item.step}
              </div>
              <h4 className="font-extrabold text-slate-900 text-xs">{item.title}</h4>
              <p className="text-[10px] text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. TWO TYPES OF ACCESS: ONE PLATFORM, TWO EXPERIENCES */}
      <section className="space-y-6">
        <div className="text-center space-y-1 max-w-xl mx-auto">
          <span className="text-xs font-bold text-blue-900 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Role-Based Platform Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
            One Platform. Two Experiences.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Citizen Experience */}
          <div className="bg-white rounded-xl border-2 border-blue-200 p-6 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg">FOR CITIZENS</h3>
                  <p className="text-xs text-slate-600">Stay informed and contribute local observations.</p>
                </div>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-700 font-sans">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>View nearby weather events and localized warnings</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Receive hyperlocal disaster alerts</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Explore the live interactive map</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Report weather events with photos & optional audio</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Track your personal submitted reports timeline</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onOpenPublicAuth('login')}
              className="w-full bg-blue-900 hover:bg-blue-800 text-white font-extrabold py-3 px-4 rounded-lg shadow-sm transition-colors cursor-pointer text-xs flex items-center justify-center gap-2"
            >
              <span>Continue as Public</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right: Authority Experience */}
          <div className="bg-slate-900 text-white rounded-xl border-2 border-slate-800 p-6 shadow-md flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-700/50 flex items-center justify-center font-bold">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-lg">FOR AUTHORITIES</h3>
                  <p className="text-xs text-slate-400">Investigate, verify and act on emerging weather intelligence.</p>
                </div>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300 font-sans">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>National live event map with district-level overlays</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Real-time operator verification queue</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>AI multi-factor confidence scores & pHash duplicate analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Deep evidence breakdown & sensor telemetry matching</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Historical intelligence archive & big data analytics</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onOpenAdminAuth}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-3 px-4 rounded-lg shadow-sm transition-colors cursor-pointer text-xs flex items-center justify-center gap-2"
            >
              <ShieldAlert className="w-4 h-4 text-white" />
              <span>Admin Login (Restricted Authority Access)</span>
            </button>
          </div>
        </div>
      </section>

      {/* 5. LIVE INTELLIGENCE PREVIEW */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Live Weather Intelligence Across India
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Recent verified event signals processed by our AI pipeline.
            </p>
          </div>

          <button
            onClick={onExploreLiveMap}
            className="bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold py-2 px-4 rounded-lg cursor-pointer transition-colors flex items-center gap-1.5"
          >
            <span>Explore Full Live Intelligence Map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {topPreviewReports.map((report) => (
            <div key={report.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">{report.location}</span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                  {report.verificationStatus}
                </span>
              </div>
              <p className="font-semibold text-slate-700">{report.eventType}</p>
              <p className="text-[11px] text-slate-500 line-clamp-2">{report.description}</p>
              <div className="flex justify-between items-center text-[11px] font-bold text-blue-700 pt-2 border-t border-slate-200">
                <span>AI Confidence: {report.confidence}%</span>
                <span>{report.timeAgo}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
