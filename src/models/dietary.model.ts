import { Document, mongoose, Schema } from '@/database/mongooseConfig';

interface IDietaryTag extends Document {
  dietaryName: string;
}

const DietaryTagSchema: Schema = new Schema(
  {
    dietaryName: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

const DietaryTag =
  mongoose.models.DietaryTags ||
  mongoose.model<IDietaryTag>('DietaryTags', DietaryTagSchema);
export default DietaryTag;
