// models/Banner.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IBanner extends Document {
  showBanner: boolean;
  bannerColor: string;
  message: string;
  buttonLabel?: string;
  link?: string;
  openInNewTab: boolean;
  visibilityOption: 'home' | 'all';
}

const BannerSchema = new Schema<IBanner>({
  showBanner: { type: Boolean, required: true },
  bannerColor: { type: String, required: true },
  message: { type: String, required: true },
  buttonLabel: { type: String },
  link: { type: String },
  openInNewTab: { type: Boolean, required: true },
  visibilityOption: { type: String, enum: ['home', 'all'], required: true },
});

export default mongoose.models.Banner ||
  mongoose.model<IBanner>('Banner', BannerSchema);
