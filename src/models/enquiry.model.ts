import { Document, mongoose, Schema } from '@/database/mongooseConfig';

interface IEnquiry extends Document {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

const EnquirySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: false },
    message: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);
const Enquiry =
  mongoose.models.Enquiry || mongoose.model<IEnquiry>('Enquiry', EnquirySchema);
export default Enquiry;
