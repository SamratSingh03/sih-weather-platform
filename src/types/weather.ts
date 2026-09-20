export type EventType = 
  | 'Flood'
  | 'Rainfall'
  | 'Thunderstorm'
  | 'Heatwave'
  | 'Fog'
  | 'Dust Storm'
  | 'Strong Wind'
  | 'Other';

export type VerificationStatus = 
  | 'AI Verified'
  | 'Under Review'
  | 'Verified'
  | 'Pending'
  | 'Rejected';

export type SeverityLevel = 'High' | 'Moderate' | 'Low';
export type DuplicateRiskLevel = 'Low' | 'Medium' | 'High';

export interface TrustScoreBreakdown {
  sourceReliability: number;
  locationConfidence: number;
  mediaAuthenticity: number;
  crossReportAgreement: number;
}

export interface EvidenceSummary {
  supporting: string[];
  contradicting: string[];
  duplicateAnalysis: string;
}

export interface TimelineStep {
  time: string;
  title: string;
  description: string;
}

export interface WeatherReport {
  id: string;
  title: string;
  eventType: EventType;
  location: string;
  district: string;
  state: string;
  latitude: number;
  longitude: number;
  timestamp: string;
  timeAgo: string;
  description: string;
  source: 'Citizen' | 'Social Media (Twitter/X)' | 'Weather API' | 'IMD Radar' | 'Public Sensor';
  verificationStatus: VerificationStatus;
  confidence: number; // percentage e.g. 94
  severity: SeverityLevel;
  duplicateRisk: DuplicateRiskLevel;
  reportCount: number;
  image?: string;
  aiClassification: string;
  trustScoreBreakdown: TrustScoreBreakdown;
  evidenceSummary: EvidenceSummary;
  timeline: TimelineStep[];
  affectedRadiusKm?: number;
  recommendedAction?: string;
}

export interface FilterState {
  searchQuery: string;
  eventType: string;
  state: string;
  district: string;
  verificationStatus: string;
  severity: string;
  highRiskOnly: boolean;
  verifiedOnly: boolean;
}

export interface AdminKPIs {
  reportsToday: number;
  pendingVerification: number;
  aiVerified: number;
  potentialDuplicates: number;
  highRiskEvents: number;
}
