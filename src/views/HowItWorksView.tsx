import React from 'react';
import { 
  Users, 
  Database, 
  Cpu, 
  Server, 
  Code, 
  LayoutDashboard, 
  ShieldCheck,
  CheckCircle2,
  Lock,
  Zap
} from 'lucide-react';

export const HowItWorksView: React.FC = () => {
  const steps = [
    {
      number: '1',
      title: 'Data Sources & Signal Acquisition',
      icon: Users,
      color: 'bg-blue-600',
      description: 'Multi-modal crowd-sourced reports submitted via Citizen Mobile Web App, geotagged Twitter/X posts, IMD automated weather station APIs, and public OpenStreetMap spatial layers.'
    },
    {
      number: '2',
      title: 'High-Throughput Streaming Ingestion',
      icon: Server,
      color: 'bg-slate-700',
      description: 'Real-time Apache Kafka topic pipeline ingesting unstructured text, high-resolution photo attachments, and sensor telemetry stream data at scale.'
    },
    {
      number: '3',
      title: 'AI / ML Processing Engine',
      icon: Cpu,
      color: 'bg-purple-600',
      description: 'spaCy NLP entity extraction (Location/Event), Hugging Face Transformer classification, OpenCV EXIF parsing, and Perceptual Hashing (pHash) for anti-fake duplicate filtering.'
    },
    {
      number: '4',
      title: 'Dual Structured & Vector Storage',
      icon: Database,
      color: 'bg-emerald-600',
      description: 'PostgreSQL Relational DB for verified geo-intelligence, MongoDB for unstructured raw media, and spatial GIS indexing for fast radius queries.'
    },
    {
      number: '5',
      title: 'Secure OpenAPI Intelligence Layer',
      icon: Code,
      color: 'bg-amber-600',
      description: 'FastAPI REST & WebSockets layer delivering high-confidence geoJSON payloads to national disaster emergency command centers.'
    },
    {
      number: '6',
      title: 'NDMA / IMD Dashboard & Alerting',
      icon: LayoutDashboard,
      color: 'bg-blue-900',
      description: 'Real-time interactive decision console for State Disaster Response Forces (SDRF) to verify evidence, dispatch relief teams, and issue public advisories.'
    }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Hero Title */}
      <div className="text-center space-y-3 bg-white p-8 rounded-xl border border-slate-200 shadow-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-extrabold border border-blue-200">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>Smart India Hackathon 2026 Proposal • Problem ID SIH26069</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          How National Weather Intelligence Works
        </h1>

        <p className="text-slate-600 text-sm max-w-2xl mx-auto leading-relaxed">
          Converting unstructured crowd observations and social signals into trusted, geo-tagged weather intelligence for disaster management across India.
        </p>

        <div className="pt-4 border-t border-slate-100 max-w-2xl mx-auto">
          <p className="text-xs font-semibold text-blue-900 bg-blue-50 p-3 rounded-lg border border-blue-200 leading-relaxed italic">
            "AI does not replace official weather systems. It provides an additional hyperlocal ground-truth layer that can help authorities investigate and respond faster."
          </p>
        </div>
      </div>

      {/* 6-Step Pipeline Architecture Diagram */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 text-center border-b border-slate-200 pb-2">
          End-to-End System Architecture Pipeline
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex items-start gap-4">
                <div className={`w-10 h-10 rounded-lg ${s.color} text-white flex items-center justify-center font-bold text-base shrink-0 shadow-sm`}>
                  {s.number}
                </div>
                <div className="space-y-1">
                  <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <Icon className="w-4 h-4 text-slate-600" />
                    <span>{s.title}</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    {s.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Key Innovation Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 text-sm">pHash Anti-Fake Check</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Detects reused stock imagery or recycled social media photos using perceptual hash distance comparisons against our historical database.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
            <Zap className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 text-sm">Spatial Cluster Corroboration</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Automatically boosts trust scores when multiple independent citizens submit reports within the same 5km geographic radius.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
            <Lock className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 text-sm">Privacy & Anonymization</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Strips EXIF personal identifiers while preserving essential geotag coordinates and timestamps for official disaster response.
          </p>
        </div>
      </div>
    </div>
  );
};
