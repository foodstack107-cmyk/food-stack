import mongoose from 'mongoose';

const VisitSchema = new mongoose.Schema(
  {
    ip: { type: String },
    page: { type: String },
  },
  { timestamps: true },
);

export default mongoose.models.Visit || mongoose.model('Visit', VisitSchema);
