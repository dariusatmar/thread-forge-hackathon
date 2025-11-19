// Database types
export interface CallData {
  call_id: number;
  customer_id: string;
  startdatetime: Date;
  enddatetime: Date;
}

export interface TranscriptData {
  call_id: number;
  customer_id: string;
  call_reason: string;
  transcript: string;
}

export interface Customer {
  customer_id: string;
  customer_name: string;
  service_plan: string;
  service_address: string;
  provisioned_bandwidth_down_mbps: number;
  provisioned_bandwidth_up_mbps: number;
  router_serial_number: string;
  account_status: string;
  email: string;
  location: string; // ZIP code
  created_at: Date;
  updated_at: Date;
  contact_phone: string;
  multi_site: boolean;
  subscription_tier: string;
  industry: string;
}

// API Response types
export interface ZipCoordinate {
  lat: number;
  lon: number;
  city: string;
}

export interface OutageDataPoint {
  zip_code: string;
  call_count: number;
  avg_duration: number;
  coordinates: ZipCoordinate;
  customer_ids: string[];
}

export interface OutageDataResponse {
  data: OutageDataPoint[];
  timestamp: string;
  time_range_hours: number;
}

export interface TimelineDataPoint {
  timestamp: string;
  call_count: number;
  hour_label: string;
}

export interface TimelineDataResponse {
  data: TimelineDataPoint[];
  time_range_hours: number;
}

export interface StatsResponse {
  total_calls: number;
  unique_customers: number;
  avg_duration_minutes: number;
  last_call_time: string | null;
  time_range_hours: number;
}

// Component Props types
export interface TimeRangeOption {
  label: string;
  hours: number;
}

export interface MapMarkerData {
  position: [number, number];
  zipCode: string;
  callCount: number;
  avgDuration: number;
  city: string;
}

export interface HeatmapPoint {
  lat: number;
  lng: number;
  intensity: number;
}

// Social Media types
export interface SocialMediaPost {
  id: number;
  username: string;
  social_media: string;
  comment: string;
  location: string;
  timestamp: string;
  category: string;
}

export interface SocialMediaDataResponse {
  data: SocialMediaPost[];
  total: number;
  page: number;
  pageSize: number;
  timestamp: string;
}

export interface SentimentDataPoint {
  date: string;
  positive: number;
  negative: number;
  neutral: number;
  total: number;
}

export interface CategoryCount {
  category: string;
  count: number;
  percentage: number;
}

export interface LocationSentiment {
  location: string;
  positive: number;
  negative: number;
  neutral: number;
  total: number;
}

export interface PlatformCount {
  platform: string;
  count: number;
  percentage: number;
}

export interface SentimentDataResponse {
  timeSeriesData: SentimentDataPoint[];
  categoryBreakdown: CategoryCount[];
  locationSentiment: LocationSentiment[];
  platformDistribution: PlatformCount[];
  overallStats: {
    totalPosts: number;
    positivePercentage: number;
    negativePercentage: number;
    neutralPercentage: number;
  };
  timeRangeHours: number;
}

export interface ActionItem {
  id: string;
  title: string;
  description: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  department: 'Sales' | 'Support' | 'PR' | 'Tech';
  relatedPostIds: number[];
  relatedPosts?: SocialMediaPost[];
  status?: 'pending' | 'done' | 'dismissed';
}

export interface ActionItemsResponse {
  actionItems: ActionItem[];
  generatedAt: string;
  postsAnalyzed: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface SocialChatRequest {
  messages: ChatMessage[];
  filters?: {
    platform?: string;
    category?: string;
    location?: string;
    hours?: number;
  };
}

export interface SocialChatResponse {
  reply: string;
  contextUsed: {
    postCount: number;
    timeRangeHours: number;
  };
}

export interface ResponseDraft {
  postId: number;
  originalComment: string;
  draftResponse: string;
  tone: string;
}

export interface ResponseGeneratorRequest {
  postIds: number[];
  tone?: 'professional' | 'empathetic' | 'promotional';
  template?: string;
}

export interface ResponseGeneratorResponse {
  responses: ResponseDraft[];
  generatedAt: string;
}
