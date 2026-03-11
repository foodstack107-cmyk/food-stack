import { Document, mongoose, Schema } from '@/database/mongooseConfig';

interface IComment extends Document {
  title: string;
  parentCommentId?: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  modifiedBy?: mongoose.Types.ObjectId;
}

const CommentSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    parentCommentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comments',
      default: null,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    modifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  { timestamps: true },
);

const Comment =
  mongoose.models.Comments ||
  mongoose.model<IComment>('Comments', CommentSchema);

export default Comment;
