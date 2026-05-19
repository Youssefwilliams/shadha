export type ScentFamily = 'زهري' | 'خشبي' | 'فواكه' | 'شرقي' | 'حمضيات' | 'أخرى';

export interface PerfumeNotes {
  top: string[];
  middle: string[];
  base: string[];
}

export interface PerfumeStore {
  name: string;
  price: number;
  link: string;
  inStock: boolean;
  rating: number;
}

export interface SimilarPerfume {
  name: string;
  brand: string;
  notes: PerfumeNotes;
  price: string;
  rating: number;
  image: string;
}

export interface Perfume {
  id: string;
  name: string;
  englishName: string;
  brand: string;
  image: string;
  category: string;
  notes: PerfumeNotes;
  description: string;
  ingredients: string[];
  expectedDuration: string;
  rating: number;
  ratingsCount: number;
  reviewTips: string;
  stores: PerfumeStore[];
  similarPerfumes: SimilarPerfume[];
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlockedAt?: string;
  unlocked: boolean;
}

export interface PerfumeCollection {
  id: string;
  name: string;
  description: string;
  perfumes: Perfume[];
}

export interface UserProfile {
  email: string;
  name: string;
  points: number;
  badges: Badge[];
  collections: PerfumeCollection[];
  preferences: string[];
  scannedCount: number;
  reviewedCount: number;
}

export interface CommunityPost {
  id: string;
  author: string;
  authorAvatar: string;
  content: string;
  perfumeName?: string;
  rating?: number;
  likes: number;
  likedByUser?: boolean;
  commentsCount: number;
  createdAt: string;
}

export interface EducationalArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  readTime: string;
  date: string;
  author: string;
}
