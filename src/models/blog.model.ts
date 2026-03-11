import { Document, mongoose, Schema } from '@/database/mongooseConfig';

export interface IBlog extends Document {
  title: string;
  _id: string;
  description: string;
  image: string;
  blogType: string;
}

const BlogSchema: Schema = new Schema(
  {
    title: { type: String, required: true },

    description: { type: String, required: false },
    image: { type: String, required: true },
    blogType: {
      type: String,
      enum: ['Food', 'News'],
      default: 'Food',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    modifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

const Blogs =
  mongoose.models.Blogs || mongoose.model<IBlog>('Blogs', BlogSchema);
export default Blogs;
