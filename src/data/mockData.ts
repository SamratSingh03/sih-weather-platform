import type { WeatherReport, AdminKPIs } from '../types/weather';

export const INITIAL_MOCK_REPORTS: WeatherReport[] = [
  {
    id: 'WX-2026-00184',
    title: 'Severe Urban Flooding & Waterlogging',
    eventType: 'Flood',
    location: 'Chennai',
    district: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0827,
    longitude: 80.2707,
    timestamp: '2026-09-10 14:21 IST',
    timeAgo: '12 min ago',
    description: 'Waist-deep waterlogging observed near Velachery main road. Vehicles stranded, movement severely restricted.',
    source: 'Citizen',
    verificationStatus: 'AI Verified',
    confidence: 94,
    severity: 'High',
    duplicateRisk: 'Low',
    reportCount: 27,
    image: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80',
    aiClassification: 'Severe Urban Flood',
    affectedRadiusKm: 4.5,
    recommendedAction: 'Avoid Velachery main arterial road. Move to designated relief shelters or elevated ground.',
    trustScoreBreakdown: {
      sourceReliability: 92,
      locationConfidence: 96,
      mediaAuthenticity: 91,
      crossReportAgreement: 95,
    },
    evidenceSummary: {
      supporting: [
        '27 nearby citizen reports within 3km',
        'Rainfall gauge correlation (88mm in 3 hours)',
        'Multiple independent media attachments geotagged to Velachery',
        'Spatial cluster density threshold exceeded'
      ],
      contradicting: [
        '2 historical archive photos flagged and discarded by pHash filter'
      ],
      duplicateAnalysis: 'No active duplicate cluster detected. 27 distinct reports aggregated into 1 unified event node.'
    },
    timeline: [
      { time: '14:21 IST', title: 'First Citizen Report', description: 'Initial image report submitted via Mobile Web App' },
      { time: '14:24 IST', title: 'Spatial Corroboration', description: '14 additional citizen reports received within 2km radius' },
      { time: '14:27 IST', title: 'IMD Station Cross-Validation', description: 'Automated ingestion confirmed 88mm rainfall reading' },
      { time: '14:29 IST', title: 'AI Verification Completed', description: 'Confidence score reached 94%. pHash verified photo authenticity' },
      { time: '14:33 IST', title: 'High-Risk Alert Broadcast', description: 'Pushed to Disaster Management Authority Dashboard' }
    ]
  },
  {
    id: 'WX-2026-00183',
    title: 'Torrental Rainfall & Low Visibility',
    eventType: 'Rainfall',
    location: 'Mumbai',
    district: 'Mumbai Suburban',
    state: 'Maharashtra',
    latitude: 19.0760,
    longitude: 72.8777,
    timestamp: '2026-09-10 14:16 IST',
    timeAgo: '17 min ago',
    description: 'Extremely heavy rainfall causing zero visibility on Western Express Highway near Andheri flyover.',
    source: 'Social Media (Twitter/X)',
    verificationStatus: 'AI Verified',
    confidence: 91,
    severity: 'High',
    duplicateRisk: 'Medium',
    reportCount: 42,
    image: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=800&q=80',
    aiClassification: 'Heavy Downpour',
    affectedRadiusKm: 6.0,
    recommendedAction: 'Drive with caution on WEH. Use headlights and expect traffic delays near subways.',
    trustScoreBreakdown: {
      sourceReliability: 88,
      locationConfidence: 94,
      mediaAuthenticity: 90,
      crossReportAgreement: 93,
    },
    evidenceSummary: {
      supporting: [
        '42 social media mentions extracted by NLP',
        'Doppler Weather Radar reflectivity matching heavy precipitation cell',
        'Consistent timestamps across Twitter/X and Instagram citizen posts'
      ],
      contradicting: [
        '1 report claiming localized hail (unsupported by radar)'
      ],
      duplicateAnalysis: 'Duplicate text posts merged using spaCy entity similarity (>0.85).'
    },
    timeline: [
      { time: '14:05 IST', title: 'NLP Extraction Triggered', description: 'Social media pipeline ingested #MumbaiRain keyword spike' },
      { time: '14:10 IST', title: 'Radar Reflectivity Match', description: 'Corroborated with IMD Mumbai Doppler Radar' },
      { time: '14:16 IST', title: 'AI Verified Status', description: 'Event published to public intelligence feed' }
    ]
  },
  {
    id: 'WX-2026-00182',
    title: 'Severe Thunderstorm & Lightning Warnings',
    eventType: 'Thunderstorm',
    location: 'Bengaluru',
    district: 'Bengaluru Urban',
    state: 'Karnataka',
    latitude: 12.9716,
    longitude: 77.5946,
    timestamp: '2026-09-10 14:10 IST',
    timeAgo: '23 min ago',
    description: 'Frequent cloud-to-ground lightning with high-velocity wind squalls near Indiranagar and Whitefield.',
    source: 'Citizen',
    verificationStatus: 'Under Review',
    confidence: 76,
    severity: 'Moderate',
    duplicateRisk: 'Low',
    reportCount: 15,
    image: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&w=800&q=80',
    aiClassification: 'Thunderstorm & Lightning',
    affectedRadiusKm: 5.2,
    recommendedAction: 'Stay indoors. Avoid taking shelter under isolated tall trees or metallic poles.',
    trustScoreBreakdown: {
      sourceReliability: 75,
      locationConfidence: 82,
      mediaAuthenticity: 74,
      crossReportAgreement: 73,
    },
    evidenceSummary: {
      supporting: [
        '15 citizen reports with audio-visual storm attachments',
        'Wind speed telemetry anomaly logged at HAL Airport weather sensor'
      ],
      contradicting: [],
      duplicateAnalysis: 'Clean spatial separation across east Bengaluru zones.'
    },
    timeline: [
      { time: '14:10 IST', title: 'Report Ingested', description: 'Submitted via citizen weather portal' },
      { time: '14:18 IST', title: 'Pending Review', description: 'Awaiting human operator confirmation' }
    ]
  },
  {
    id: 'WX-2026-00181',
    title: 'Extreme Heatwave Warning',
    eventType: 'Heatwave',
    location: 'Delhi',
    district: 'New Delhi',
    state: 'Delhi NCR',
    latitude: 28.6139,
    longitude: 77.2090,
    timestamp: '2026-09-10 13:45 IST',
    timeAgo: '48 min ago',
    description: 'Ambient temperatures recorded at 44.5°C with severe heat stress and dry hot winds (loo).',
    source: 'Public Sensor',
    verificationStatus: 'AI Verified',
    confidence: 96,
    severity: 'High',
    duplicateRisk: 'Low',
    reportCount: 58,
    image: 'https://images.unsplash.com/photo-1504386106331-3e4e71712b38?auto=format&fit=crop&w=800&q=80',
    aiClassification: 'Severe Heatwave',
    affectedRadiusKm: 25.0,
    recommendedAction: 'Stay hydrated. Avoid direct sun exposure between 12:00 PM and 4:00 PM.',
    trustScoreBreakdown: {
      sourceReliability: 98,
      locationConfidence: 97,
      mediaAuthenticity: 94,
      crossReportAgreement: 95,
    },
    evidenceSummary: {
      supporting: [
        'Synchronized readings from 12 Safdarjung & Palam automatic stations',
        '58 corroborating crowd temperature submissions'
      ],
      contradicting: [],
      duplicateAnalysis: 'City-wide baseline anomaly verified.'
    },
    timeline: [
      { time: '13:00 IST', title: 'Sensor Threshold Alert', description: '44°C mark breached at multiple AWS nodes' },
      { time: '13:45 IST', title: 'Public Advisory Issued', description: 'AI verification level: 96%' }
    ]
  },
  {
    id: 'WX-2026-00180',
    title: 'Flash Flood & River Level Rise',
    eventType: 'Flood',
    location: 'Guwahati',
    district: 'Kamrup Metropolitan',
    state: 'Assam',
    latitude: 26.1445,
    longitude: 91.7362,
    timestamp: '2026-09-10 13:30 IST',
    timeAgo: '1 hr ago',
    description: 'Brahmaputra water level rising near Bharalumukh. Inundation in low-lying residential sectors.',
    source: 'Citizen',
    verificationStatus: 'AI Verified',
    confidence: 93,
    severity: 'High',
    duplicateRisk: 'Low',
    reportCount: 31,
    image: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80',
    aiClassification: 'Riverine & Urban Flood',
    affectedRadiusKm: 8.0,
    recommendedAction: 'Residents near Bharalumukh riverbanks should move valuables to upper floors.',
    trustScoreBreakdown: {
      sourceReliability: 91,
      locationConfidence: 95,
      mediaAuthenticity: 92,
      crossReportAgreement: 94,
    },
    evidenceSummary: {
      supporting: [
        'Water level gauge data from CWC station',
        '31 geotagged citizen submissions'
      ],
      contradicting: [],
      duplicateAnalysis: 'Verified no media duplication.'
    },
    timeline: [
      { time: '13:30 IST', title: 'Guwahati Water Level Rise', description: 'Multi-source verification confirmed' }
    ]
  },
  {
    id: 'WX-2026-00179',
    title: 'Dense Fog & Low Visibility',
    eventType: 'Fog',
    location: 'Patna',
    district: 'Patna',
    state: 'Bihar',
    latitude: 25.5941,
    longitude: 85.1376,
    timestamp: '2026-09-10 12:50 IST',
    timeAgo: '1.5 hrs ago',
    description: 'Visibility dropped below 50 meters near Ganga bridge bypass. Vehicle movement slow.',
    source: 'Citizen',
    verificationStatus: 'AI Verified',
    confidence: 89,
    severity: 'Moderate',
    duplicateRisk: 'Low',
    reportCount: 19,
    image: 'https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?auto=format&fit=crop&w=800&q=80',
    aiClassification: 'Dense Radiation Fog',
    affectedRadiusKm: 12.0,
    recommendedAction: 'Drive at low speed with fog lamps on. Keep distance between vehicles.',
    trustScoreBreakdown: {
      sourceReliability: 88,
      locationConfidence: 91,
      mediaAuthenticity: 87,
      crossReportAgreement: 90,
    },
    evidenceSummary: {
      supporting: ['Satellite fog imagery overlay', '19 highway commuter reports'],
      contradicting: [],
      duplicateAnalysis: 'Unique images verified.'
    },
    timeline: [
      { time: '12:50 IST', title: 'Fog Alert Generated', description: 'Ingested into transportation advisory channel' }
    ]
  },
  {
    id: 'WX-2026-00178',
    title: 'Gale Force Gusts & Strong Wind',
    eventType: 'Strong Wind',
    location: 'Kochi',
    district: 'Ernakulam',
    state: 'Kerala',
    latitude: 9.9312,
    longitude: 76.2673,
    timestamp: '2026-09-10 12:15 IST',
    timeAgo: '2 hrs ago',
    description: 'Wind speeds up to 65 km/h along Fort Kochi coastal belt. Tree branches down on Marine Drive.',
    source: 'Weather API',
    verificationStatus: 'AI Verified',
    confidence: 92,
    severity: 'Moderate',
    duplicateRisk: 'Low',
    reportCount: 22,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    aiClassification: 'Squall / Coastal High Winds',
    affectedRadiusKm: 10.0,
    recommendedAction: 'Fishermen advised not to venture into deep sea waters. Secure loose rooftop objects.',
    trustScoreBreakdown: {
      sourceReliability: 93,
      locationConfidence: 94,
      mediaAuthenticity: 89,
      crossReportAgreement: 92,
    },
    evidenceSummary: {
      supporting: ['Coastal buoy anemometer telemetry (62 km/h)', '22 local citizen photos'],
      contradicting: [],
      duplicateAnalysis: 'No duplicates found.'
    },
    timeline: [
      { time: '12:15 IST', title: 'Coastal Wind Warning', description: 'Pushed to Maritime Safety Cell' }
    ]
  },
  {
    id: 'WX-2026-00177',
    title: 'Severe Dust Storm (Andhi)',
    eventType: 'Dust Storm',
    location: 'Jaipur',
    district: 'Jaipur',
    state: 'Rajasthan',
    latitude: 26.9124,
    longitude: 75.7873,
    timestamp: '2026-09-10 11:40 IST',
    timeAgo: '2.5 hrs ago',
    description: 'Heavy dust cloud sweeping through Sikar road into Northern Jaipur. Air Quality Index spiked above 380.',
    source: 'Social Media (Twitter/X)',
    verificationStatus: 'AI Verified',
    confidence: 88,
    severity: 'Moderate',
    duplicateRisk: 'Medium',
    reportCount: 34,
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    aiClassification: 'Convective Dust Storm',
    affectedRadiusKm: 18.0,
    recommendedAction: 'Wear masks outdoors. Keep windows and doors tightly shut.',
    trustScoreBreakdown: {
      sourceReliability: 86,
      locationConfidence: 90,
      mediaAuthenticity: 87,
      crossReportAgreement: 89,
    },
    evidenceSummary: {
      supporting: ['AQI sensor network spike', '34 citizen & driver video clips'],
      contradicting: [],
      duplicateAnalysis: 'Multiple social reposts deduplicated by video keyframe matching.'
    },
    timeline: [
      { time: '11:40 IST', title: 'Dust Storm Ingested', description: 'Multi-source spatial cluster verified' }
    ]
  },
  {
    id: 'WX-2026-00176',
    title: 'Heavy Waterlogging Near Howrah Bridge',
    eventType: 'Flood',
    location: 'Kolkata',
    district: 'Kolkata',
    state: 'West Bengal',
    latitude: 22.5726,
    longitude: 88.3639,
    timestamp: '2026-09-10 11:10 IST',
    timeAgo: '3 hrs ago',
    description: 'Tidal surge combined with heavy monsoon shower causing water accumulation in Central Kolkata.',
    source: 'Citizen',
    verificationStatus: 'AI Verified',
    confidence: 90,
    severity: 'Moderate',
    duplicateRisk: 'Low',
    reportCount: 28,
    image: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80',
    aiClassification: 'Tidal Inundation',
    affectedRadiusKm: 3.5,
    recommendedAction: 'Tram services temporarily suspended near College Street. Use elevated flyovers.',
    trustScoreBreakdown: {
      sourceReliability: 89,
      locationConfidence: 92,
      mediaAuthenticity: 90,
      crossReportAgreement: 89,
    },
    evidenceSummary: {
      supporting: ['28 geotagged citizen photos', 'Hooghly River tide table alignment'],
      contradicting: [],
      duplicateAnalysis: 'Deduplicated.'
    },
    timeline: [
      { time: '11:10 IST', title: 'Report Verified', description: 'Sent to KMC Disaster Control Room' }
    ]
  },
  {
    id: 'WX-2026-00175',
    title: 'Severe Thunderstorm & Squall',
    eventType: 'Thunderstorm',
    location: 'Hyderabad',
    district: 'Hyderabad',
    state: 'Telangana',
    latitude: 17.3850,
    longitude: 78.4867,
    timestamp: '2026-09-10 10:30 IST',
    timeAgo: '3.5 hrs ago',
    description: 'Sudden convective storm over HITEC City and Gachibowli with heavy hail precipitation.',
    source: 'Citizen',
    verificationStatus: 'Verified',
    confidence: 95,
    severity: 'High',
    duplicateRisk: 'Low',
    reportCount: 51,
    image: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&w=800&q=80',
    aiClassification: 'Severe Hailstorm',
    affectedRadiusKm: 7.0,
    recommendedAction: 'Park vehicles in covered structures to prevent hail damage.',
    trustScoreBreakdown: {
      sourceReliability: 96,
      locationConfidence: 95,
      mediaAuthenticity: 94,
      crossReportAgreement: 95,
    },
    evidenceSummary: {
      supporting: ['51 reports showing hail stones', 'Doppler weather radar heavy cloud cell'],
      contradicting: [],
      duplicateAnalysis: 'High authenticity verified.'
    },
    timeline: [
      { time: '10:30 IST', title: 'Official Verification', description: 'Operator approved after AI recommendation' }
    ]
  },
  {
    id: 'WX-2026-00174',
    title: 'Urban Waterlogging on SG Highway',
    eventType: 'Flood',
    location: 'Ahmedabad',
    district: 'Ahmedabad',
    state: 'Gujarat',
    latitude: 23.0225,
    longitude: 72.5714,
    timestamp: '2026-09-10 10:05 IST',
    timeAgo: '4 hrs ago',
    description: 'Water accumulation under Pakwan flyover following intense 45-minute downpour.',
    source: 'Citizen',
    verificationStatus: 'AI Verified',
    confidence: 87,
    severity: 'Moderate',
    duplicateRisk: 'Low',
    reportCount: 16,
    image: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80',
    aiClassification: 'Localized Waterlogging',
    affectedRadiusKm: 2.0,
    recommendedAction: 'Divert via Satellite road.',
    trustScoreBreakdown: {
      sourceReliability: 86,
      locationConfidence: 89,
      mediaAuthenticity: 88,
      crossReportAgreement: 85,
    },
    evidenceSummary: {
      supporting: ['16 citizen photos', 'Municipal storm drain telemetry'],
      contradicting: [],
      duplicateAnalysis: 'No duplicates.'
    },
    timeline: [
      { time: '10:05 IST', title: 'Event Published', description: 'AI Verified confidence 87%' }
    ]
  },
  {
    id: 'WX-2026-00173',
    title: 'Heavy Rainfall & Water Accumulation',
    eventType: 'Rainfall',
    location: 'Pune',
    district: 'Pune',
    state: 'Maharashtra',
    latitude: 18.5204,
    longitude: 73.8567,
    timestamp: '2026-09-10 09:40 IST',
    timeAgo: '4.5 hrs ago',
    description: 'Continuous rainfall in Kothrud and Deccan areas leading to slow-moving traffic on Karve Road.',
    source: 'Citizen',
    verificationStatus: 'AI Verified',
    confidence: 91,
    severity: 'Moderate',
    duplicateRisk: 'Low',
    reportCount: 24,
    image: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=800&q=80',
    aiClassification: 'Monsoon Downpour',
    affectedRadiusKm: 5.0,
    recommendedAction: 'Plan travel with additional 20 minutes buffer time.',
    trustScoreBreakdown: {
      sourceReliability: 90,
      locationConfidence: 93,
      mediaAuthenticity: 91,
      crossReportAgreement: 90,
    },
    evidenceSummary: {
      supporting: ['24 reports', 'Rainfall sensor 42mm/hr'],
      contradicting: [],
      duplicateAnalysis: 'Clean.'
    },
    timeline: [
      { time: '09:40 IST', title: 'Inundation Feed Updated', description: 'Pushed live' }
    ]
  },
  {
    id: 'WX-2026-00172',
    title: 'High Coastal Waves & Gale Winds',
    eventType: 'Strong Wind',
    location: 'Visakhapatnam',
    district: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    latitude: 17.6868,
    longitude: 83.2185,
    timestamp: '2026-09-10 09:15 IST',
    timeAgo: '5 hrs ago',
    description: 'Rough sea conditions with wave heights reaching 3.2m along RK Beach.',
    source: 'Weather API',
    verificationStatus: 'AI Verified',
    confidence: 94,
    severity: 'High',
    duplicateRisk: 'Low',
    reportCount: 37,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    aiClassification: 'Coastal Surge Warning',
    affectedRadiusKm: 14.0,
    recommendedAction: 'Beach promenade closed to public. Follow police advisories.',
    trustScoreBreakdown: {
      sourceReliability: 95,
      locationConfidence: 96,
      mediaAuthenticity: 92,
      crossReportAgreement: 93,
    },
    evidenceSummary: {
      supporting: ['INCOIS ocean wave height model match', '37 beach visitor reports'],
      contradicting: [],
      duplicateAnalysis: 'Deduplicated.'
    },
    timeline: [
      { time: '09:15 IST', title: 'Coastal Safety Triggered', description: 'Alert generated' }
    ]
  },
  {
    id: 'WX-2026-00171',
    title: 'Flash Flood Near Kuakhai River Bed',
    eventType: 'Flood',
    location: 'Bhubaneswar',
    district: 'Khurda',
    state: 'Odisha',
    latitude: 20.2961,
    longitude: 85.8245,
    timestamp: '2026-09-10 08:50 IST',
    timeAgo: '5.5 hrs ago',
    description: 'Low-lying houses near Patia and Rasulgarh flooded due to heavy upstream discharge.',
    source: 'Citizen',
    verificationStatus: 'AI Verified',
    confidence: 92,
    severity: 'High',
    duplicateRisk: 'Low',
    reportCount: 30,
    image: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80',
    aiClassification: 'Flash Inundation',
    affectedRadiusKm: 6.0,
    recommendedAction: 'Emergency relief teams deployed. Evacuate low-level structures if advised.',
    trustScoreBreakdown: {
      sourceReliability: 91,
      locationConfidence: 94,
      mediaAuthenticity: 93,
      crossReportAgreement: 90,
    },
    evidenceSummary: {
      supporting: ['30 citizen reports', 'River gauge alert'],
      contradicting: [],
      duplicateAnalysis: 'Verified.'
    },
    timeline: [
      { time: '08:50 IST', title: 'Flood Alert Sent to ODRAF', description: 'Verified high confidence' }
    ]
  },
  {
    id: 'WX-2026-00170',
    title: 'Severe Heatwave Stress Warning',
    eventType: 'Heatwave',
    location: 'Lucknow',
    district: 'Lucknow',
    state: 'Uttar Pradesh',
    latitude: 26.8467,
    longitude: 80.9462,
    timestamp: '2026-09-10 08:20 IST',
    timeAgo: '6 hrs ago',
    description: 'Max temperature touching 43.8°C with severe heat stress index values.',
    source: 'Public Sensor',
    verificationStatus: 'AI Verified',
    confidence: 95,
    severity: 'High',
    duplicateRisk: 'Low',
    reportCount: 40,
    image: 'https://images.unsplash.com/photo-1504386106331-3e4e71712b38?auto=format&fit=crop&w=800&q=80',
    aiClassification: 'Extreme Heat Stress',
    affectedRadiusKm: 30.0,
    recommendedAction: 'Drink ORS fluids. Keep pets and livestock in shaded areas.',
    trustScoreBreakdown: {
      sourceReliability: 96,
      locationConfidence: 95,
      mediaAuthenticity: 93,
      crossReportAgreement: 96,
    },
    evidenceSummary: {
      supporting: ['Sensor array verified', '40 crowd thermal alerts'],
      contradicting: [],
      duplicateAnalysis: 'Clean.'
    },
    timeline: [
      { time: '08:20 IST', title: 'UP Health Advisory Issued', description: 'Pushed to district portal' }
    ]
  }
];

export const INITIAL_ADMIN_KPIS: AdminKPIs = {
  reportsToday: 342,
  pendingVerification: 18,
  aiVerified: 294,
  potentialDuplicates: 12,
  highRiskEvents: 8,
};

export const INDIAN_STATES = [
  'All States',
  'Andhra Pradesh',
  'Assam',
  'Bihar',
  'Delhi NCR',
  'Gujarat',
  'Karnataka',
  'Kerala',
  'Maharashtra',
  'Odisha',
  'Rajasthan',
  'Tamil Nadu',
  'Telangana',
  'Uttar Pradesh',
  'West Bengal'
];

export const EVENT_TYPES: string[] = [
  'All Categories',
  'Flood',
  'Rainfall',
  'Thunderstorm',
  'Heatwave',
  'Fog',
  'Dust Storm',
  'Strong Wind',
  'Other'
];
