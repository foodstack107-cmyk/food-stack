import { mongoose } from '@/database/mongooseConfig';

export interface BlogData {
  title: string;
  image?: string; // Optional, but schema requires it
  description: string; // Required in schema as optional
  like?: boolean; // Not in schema
  likeCount?: number; // Not in schema
  createdBy: mongoose.Types.ObjectId; // Required, matches schema
  modifiedBy?: mongoose.Types.ObjectId; // Optional, matches schema
  blogType: 'Food' | 'News'; // Matches schema enum
}
