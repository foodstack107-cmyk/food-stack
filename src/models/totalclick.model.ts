import mongoose from 'mongoose';

const TotalClickSchema = new mongoose.Schema(
  {
    buttonType: { type: String, required: true },
    page: { type: String, required: true },
    itemId: { type: String, required: true },
    itemName: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.models.TotalClick ||
  mongoose.model('TotalClick', TotalClickSchema);
