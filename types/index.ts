export type UserRole = "FREE" | "VIP";

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
}

export interface VideoItem {
  id: string;
  title: string;
  category: string;
  duration: string;
  badge: string;
  poster: string;
  videoUrl: string;
  isExclusive?: boolean;
}

