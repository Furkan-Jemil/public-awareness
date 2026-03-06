// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// User Types
export interface User {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  trustScore: number;
  isBanned: boolean;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = 'user' | 'admin' | 'super_admin';

// Report Types
export interface Report {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  category: Category;
  urgencyLevel: UrgencyLevel;
  cityId: string;
  city: City;
  areaId: string;
  area: Area;
  specificPlaceName?: string;
  status: ReportStatus;
  confidenceScore: number;
  reporterId: string;
  reporter: Pick<User, 'id' | 'displayName' | 'trustScore'>;
  reportsVotes: number;
  createdAt: string;
  updatedAt: string;
  expiresAt?: string;
  media: Media[];
  reactions: Reaction[];
}

export type UrgencyLevel = 'info' | 'warning' | 'critical';
export type ReportStatus = 'published' | 'under_review' | 'removed' | 'verified';

// Category Types
export interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
}

// Region Types
export interface City {
  id: string;
  name: string;
  createdAt: string;
}

export interface Area {
  id: string;
  cityId: string;
  name: string;
  createdAt: string;
  city?: City;
}

// Media Types
export interface Media {
  id: string;
  reportId: string;
  type: MediaType;
  url: string;
  thumbnailUrl?: string;
  duration?: number; // In seconds for videos
  processingStatus: ProcessingStatus;
  createdAt: string;
  updatedAt: string;
}

export type MediaType = 'image' | 'video';
export type ProcessingStatus = 'pending' | 'processing' | 'completed' | 'failed';

// Interaction Types
export interface Reaction {
  id: string;
  reportId: string;
  userId: string;
  isFake: boolean; // true = "Fake", false = "Real"
  createdAt: string;
}

// Filter Types
export interface ReportsFilter {
  city?: string;
  area?: string;
  category?: string;
  urgency?: UrgencyLevel;
  status?: ReportStatus;
  search?: string;
  sort?: SortOption;
  page?: number;
  limit?: number;
}

export type SortOption = 'recent' | 'urgent' | 'confidence';

// Form Types
export interface CreateReportFormData {
  title: string;
  description: string;
  categoryId: string;
  urgencyLevel: UrgencyLevel;
  cityId: string;
  areaId: string;
  specificPlaceName?: string;
  mediaFiles: File[];
}

export interface UpdateReportFormData {
  title?: string;
  description?: string;
  categoryId?: string;
  urgencyLevel?: UrgencyLevel;
  cityId?: string;
  areaId?: string;
  specificPlaceName?: string;
  status?: ReportStatus;
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  displayName: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

// Admin Types
export interface ModerationReport {
  id: string;
  reportId: string;
  reporterId: string;
  reason: string;
  status: ModerationStatus;
  createdAt: string;
}

export type ModerationStatus = 'pending' | 'resolved';

export interface ModerationAction {
  reportId: string;
  action: 'approve' | 'remove' | 'verify' | 'ban';
  reason: string;
}