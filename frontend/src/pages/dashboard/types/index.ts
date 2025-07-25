export interface User {
  id: string;
  firstName: string;
  lastName: string;
  userType: 'artist' | 'company' | 'general';
  avatar?: string;
}

export interface Post {
  id: string;
  content: string;
  author: User;
  createdAt: Date;
  likes: number;
  comments: number;
  type: 'post' | 'nota' | 'blog';
  mediaUrl?: string;
}

export interface QuickLink {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
}

export interface SuggestedArtist {
  id: string;
  name: string;
  role: string;
  location: string;
  avatar?: string;
}
