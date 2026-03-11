import { Document, mongoose, Schema } from '@/database/mongooseConfig';

interface IToken extends Document {
  userId: mongoose.Types.ObjectId;
  refreshToken?: string;
  resetToken?: string;
  resetTokenExpiry?: number;
  inviteToken?: string;
  inviteTokenExpiry?: number;
  verifyToken?: string;
  verifyTokenExpiry?: number;
  createdAt: Date;
}

const TokenSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    refreshToken: { type: String },
    resetToken: { type: String },
    resetTokenExpiry: { type: Number },
    inviteToken: { type: String },
    inviteTokenExpiry: { type: Number },
    verifyToken: { type: String },
    verifyTokenExpiry: { type: Number },
    createdAt: { type: Date, default: Date.now, expires: '7d' },
  },
  { timestamps: true },
);

const Token =
  mongoose.models.Token || mongoose.model<IToken>('Token', TokenSchema);

export default Token;
