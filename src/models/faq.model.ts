import { mongoose, Schema } from '@/database/mongooseConfig';

interface IFAQ extends Document {
  question: string;
  answer: string;
  isArchived: { type: boolean; default: false };
  createdBy?: mongoose.Types.ObjectId;
  modifiedBy?: mongoose.Types.ObjectId;
}

const FAQSchema: Schema = new Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    isArchived: { type: Boolean, default: false },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    modifiedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

const FAQ = mongoose.models.FAQ || mongoose.model<IFAQ>('FAQ', FAQSchema);
export default FAQ;
