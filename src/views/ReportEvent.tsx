import React, { useState } from 'react';
import type { WeatherReport, EventType } from '../types/weather';
import { 
  MapPin, 
  Upload, 
  Mic, 
  CheckCircle2, 
  ShieldCheck, 
  Loader2, 
  ArrowLeft,
  Sparkles
} from 'lucide-react';

interface ReportEventProps {
  onAddReport: (newReport: WeatherReport) => void;
  onSelectReport: (report: WeatherReport) => void;
  onNavigateHome: () => void;
}

export const ReportEvent: React.FC<ReportEventProps> = ({
  onAddReport,
  onSelectReport,
  onNavigateHome,
}) => {
  const [locationName, setLocationName] = useState('');
  const [stateName, setStateName] = useState('Tamil Nadu');
  const [eventType, setEventType] = useState<EventType>('Flood');
  const [description, setDescription] = useState('');
  const [hasConsent, setHasConsent] = useState(true);

  // Geo state
  const [latitude, setLatitude] = useState(13.0827);
  const [longitude, setLongitude] = useState(80.2707);

  // File upload state
  const [imagePreview, setImagePreview] = useState<string | null>(
    'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80'
  );

  // Voice recording state
  const [isRecording, setIsRecording] = useState(false);
  const [voiceRecorded, setVoiceRecorded] = useState(false);

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [submittedReport, setSubmittedReport] = useState<WeatherReport | null>(null);

  const processingSteps = [
    'Report received & timestamped',
    'Spatial coordinates & location extracted',
    'Computer Vision & media authenticity analyzed',
    'Perceptual hash (pHash) duplicate check complete',
    'spaCy NLP event classification generated',
    'AI Multi-factor Trust Score computed'
  ];

  const handleUseMyLocation = () => {
    // Simulate geolocation detection
    setLocationName('Velachery, Chennai');
    setStateName('Tamil Nadu');
    setLatitude(13.0827);
    setLongitude(80.2707);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      alert('Please provide a description of the weather event.');
      return;
    }

    setIsProcessing(true);
    setCurrentStep(0);

    // Simulate step-by-step pipeline animation
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setCurrentStep(step);
      if (step >= processingSteps.length) {
        clearInterval(interval);
        
        // Generate submitted report
        const newReportId = `WX-2026-${Math.floor(100000 + Math.random() * 900000)}`;
        const report: WeatherReport = {
          id: newReportId,
          title: `Reported ${eventType} Event`,
          eventType: eventType,
          location: locationName || 'Chennai',
          district: locationName || 'Chennai',
          state: stateName || 'Tamil Nadu',
          latitude: latitude,
          longitude: longitude,
          timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
          timeAgo: 'Just now',
          description: description,
          source: 'Citizen',
          verificationStatus: 'Under Review',
          confidence: 93,
          severity: 'High',
          duplicateRisk: 'Low',
          reportCount: 1,
          image: imagePreview || undefined,
          aiClassification: `${eventType} (AI Confidence 93%)`,
          affectedRadiusKm: 3.5,
          recommendedAction: 'Stay updated via local authority bulletins.',
          trustScoreBreakdown: {
            sourceReliability: 91,
            locationConfidence: 96,
            mediaAuthenticity: 93,
            crossReportAgreement: 92,
          },
          evidenceSummary: {
            supporting: [
              'Geotagged mobile device metadata verified',
              'Perceptual hash match score < 0.05 (Unique image)',
              'Corroborating weather radar precipitation anomaly'
            ],
            contradicting: [],
            duplicateAnalysis: 'No duplicate image found in national archive.'
          },
          timeline: [
            { time: 'Just now', title: 'Citizen Report Submitted', description: 'Geotagged observation ingested into processing queue' },
            { time: 'Just now', title: 'AI Verification Completed', description: 'Trust score 93% assigned. Pending official operator check.' }
          ]
        };

        onAddReport(report);
        setSubmittedReport(report);
        setIsProcessing(false);
      }
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Report Weather Event</span>
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Help us build a real-time picture of weather conditions in your area for disaster authorities.
          </p>
        </div>

        <button
          onClick={onNavigateHome}
          className="flex items-center gap-1 text-xs text-slate-600 hover:text-blue-900 font-semibold cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Processing Modal / Overlay */}
      {isProcessing && (
        <div className="bg-slate-900 text-white rounded-xl p-8 shadow-xl text-center space-y-6 animate-fade-in">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-blue-600/30 border-2 border-blue-400 flex items-center justify-center animate-pulse">
              <Sparkles className="w-8 h-8 text-blue-300" />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-extrabold text-white">Analyzing Report with AI Pipeline...</h3>
            <p className="text-xs text-blue-200 mt-1">
              Extracting geotags, verifying media authenticity & detecting duplicates
            </p>
          </div>

          <div className="max-w-md mx-auto space-y-2 text-left text-xs bg-slate-800 p-4 rounded-lg border border-slate-700">
            {processingSteps.map((stepText, idx) => (
              <div key={idx} className="flex items-center gap-3">
                {idx < currentStep ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : idx === currentStep ? (
                  <Loader2 className="w-4 h-4 text-blue-400 animate-spin shrink-0" />
                ) : (
                  <span className="w-4 h-4 rounded-full border border-slate-600 shrink-0 inline-block"></span>
                )}
                <span className={idx <= currentStep ? 'text-slate-100 font-medium' : 'text-slate-500'}>
                  Step {idx + 1}: {stepText}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Result Card after Submission */}
      {!isProcessing && submittedReport && (
        <div className="bg-white rounded-xl border border-emerald-200 shadow-md p-6 space-y-6">
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Report Ingestion Complete
              </div>
              <h2 className="text-lg font-extrabold text-slate-900">
                REPORT ANALYSIS COMPLETE
              </h2>
              <p className="text-xs text-slate-600">
                Report ID: <span className="font-mono font-bold text-slate-900">{submittedReport.id}</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div className="space-y-2">
              <div className="flex justify-between border-b border-slate-200 pb-1">
                <span className="text-slate-500 font-medium">Event Type:</span>
                <span className="font-bold text-slate-900">{submittedReport.eventType}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1">
                <span className="text-slate-500 font-medium">Location:</span>
                <span className="font-bold text-slate-900">{submittedReport.location}, {submittedReport.state}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1">
                <span className="text-slate-500 font-medium">AI Classification:</span>
                <span className="font-bold text-blue-700">{submittedReport.aiClassification}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between border-b border-slate-200 pb-1">
                <span className="text-slate-500 font-medium">AI Confidence:</span>
                <span className="font-bold text-emerald-700">{submittedReport.confidence}%</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1">
                <span className="text-slate-500 font-medium">Media Check:</span>
                <span className="font-bold text-emerald-700">No duplicate detected (pHash ok)</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1">
                <span className="text-slate-500 font-medium">Source Trust:</span>
                <span className="font-bold text-emerald-700">High Reliability</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onSelectReport(submittedReport)}
              className="bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold py-2.5 px-5 rounded-lg shadow-sm cursor-pointer transition-colors"
            >
              View Full Report Details & Evidence
            </button>
            <button
              onClick={onNavigateHome}
              className="bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold py-2.5 px-5 rounded-lg cursor-pointer transition-colors"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      )}

      {/* Main Reporting Form */}
      {!isProcessing && !submittedReport && (
        <form onSubmit={handleFormSubmit} className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-6">
          {/* Location Section */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              1. Event Location <span className="text-red-500">*</span>
            </label>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="Enter area, landmark, or city (e.g. Velachery, Chennai)"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <button
                type="button"
                onClick={handleUseMyLocation}
                className="bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 text-xs font-bold px-4 py-2 rounded-md flex items-center justify-center gap-2 cursor-pointer transition-colors whitespace-nowrap"
              >
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                <span>Use My Location (GPS)</span>
              </button>
            </div>
          </div>

          {/* Event Type Dropdown */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              2. Weather Event Category <span className="text-red-500">*</span>
            </label>

            <select
              value={eventType}
              onChange={(e) => setEventType(e.target.value as EventType)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="Flood">Flood / Waterlogging</option>
              <option value="Rainfall">Heavy Rainfall</option>
              <option value="Thunderstorm">Thunderstorm / Lightning / Hail</option>
              <option value="Heatwave">Heatwave / Extreme Heat</option>
              <option value="Fog">Dense Fog / Low Visibility</option>
              <option value="Dust Storm">Dust Storm (Andhi)</option>
              <option value="Strong Wind">Strong Wind / Coastal Squall</option>
              <option value="Other">Other Weather Event</option>
            </select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              3. Description of Observations <span className="text-red-500">*</span>
            </label>

            <textarea
              rows={4}
              required
              placeholder="Describe what you are experiencing (water depth, visibility, wind intensity, road conditions...)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-300 rounded-md text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            ></textarea>
          </div>

          {/* Media Upload & Optional Voice Report */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Upload Image/Video */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                4. Upload Photo / Video Attachment
              </label>

              <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center bg-slate-50/50 hover:bg-slate-50 transition-colors">
                {imagePreview ? (
                  <div className="space-y-2">
                    <img
                      src={imagePreview}
                      alt="Upload Preview"
                      className="w-full h-32 object-cover rounded border border-slate-200"
                    />
                    <button
                      type="button"
                      onClick={() => setImagePreview(null)}
                      className="text-[11px] text-red-600 font-semibold hover:underline"
                    >
                      Remove Photo
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2 py-2">
                    <Upload className="w-8 h-8 text-slate-400 mx-auto" />
                    <p className="text-xs text-slate-600 font-medium">
                      Drag & drop image file here, or click to browse
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Geotagged EXIF metadata automatically parsed
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setImagePreview(URL.createObjectURL(e.target.files[0]));
                        }
                      }}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="inline-block bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold px-3 py-1 rounded cursor-pointer transition-colors"
                    >
                      Select Image
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Optional Voice Report */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                5. Voice Report (Optional)
              </label>

              <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 flex flex-col items-center justify-center text-center h-[178px] space-y-3">
                <div
                  onClick={() => {
                    setIsRecording(!isRecording);
                    if (!isRecording) setVoiceRecorded(true);
                  }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                    isRecording
                      ? 'bg-red-600 text-white animate-bounce ring-4 ring-red-200'
                      : voiceRecorded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  <Mic className="w-6 h-6" />
                </div>

                <div className="text-xs">
                  {isRecording ? (
                    <span className="font-bold text-red-600 animate-pulse">
                      Recording audio... (Click to stop)
                    </span>
                  ) : voiceRecorded ? (
                    <span className="font-bold text-emerald-700 flex items-center gap-1 justify-center">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Voice note captured (0:14)
                    </span>
                  ) : (
                    <span className="text-slate-600 font-medium">
                      Click microphone to record a quick audio description
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Consent Checkbox */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3.5 flex items-start gap-3">
            <input
              type="checkbox"
              id="consent"
              checked={hasConsent}
              onChange={(e) => setHasConsent(e.target.checked)}
              className="mt-0.5 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
            />
            <label htmlFor="consent" className="text-xs text-slate-700 leading-relaxed">
              I consent to the use of this report for weather intelligence and understand that personal identifiers will be anonymized per NDMA data privacy guidelines.
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!hasConsent}
            className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-300 text-white text-sm font-extrabold py-3 px-6 rounded-lg shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>Submit Report & Run AI Verification</span>
          </button>
        </form>
      )}
    </div>
  );
};
