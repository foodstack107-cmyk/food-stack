import { Document, mongoose, Schema } from '@/database/mongooseConfig';

interface ICategory extends Document {
  categoryName: string;
}

const CategorySchema: Schema = new Schema(
  {
    categoryName: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

const Category =
  mongoose.models.Category ||
  mongoose.model<ICategory>('Category', CategorySchema);
export default Category;
