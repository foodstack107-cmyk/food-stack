import { mongoose, Schema } from '@/database/mongooseConfig';

interface ISubscriber extends mongoose.Document {
  email: string;
  blogNotification: boolean;
}

const SubscriberSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    blogNotification: { type: Boolean, default: false },
  },

  { timestamps: true },
);

const Subscriber =
  mongoose.models.Subscriber ||
  mongoose.model<ISubscriber>('Subscriber', SubscriberSchema);
export default Subscriber;
