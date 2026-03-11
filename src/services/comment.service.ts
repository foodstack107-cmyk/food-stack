import mongoose from 'mongoose';

import CommentModel from '../models/comment.model';

interface CommentData {
  content: string;
  author: string;
  postId: string;
  createdAt?: Date;
}

export const createComment = async (commentData: CommentData) => {
  const comment = await CommentModel.create(commentData);
  return comment;
};
export const getCommentWithReplies = async (commentId: string) => {
  return await CommentModel.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(commentId) } },
    {
      $graphLookup: {
        from: 'comments',
        startWith: '$_id',
        connectFromField: '_id',
        connectToField: 'parentCommentId',
        as: 'replies',
      },
    },
  ]);
};

export const getAllComments = async () => {
  const comments = await CommentModel.find();
  return comments;
};

export const getCommentById = async (id: string) => {
  const comment = await CommentModel.findById(id);
  if (!comment) throw new Error('Comment not found');
  return comment;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateCommentById = async (id: string, commentData: any) => {
  const comment = await CommentModel.findByIdAndUpdate(
    id,
    { ...commentData },
    { new: true, runValidators: true },
  );
  if (!comment) throw new Error('Comment not found');
  return comment;
};

export const deleteCommentById = async (id: string) => {
  const comment = await CommentModel.findByIdAndDelete(id);
  if (!comment) throw new Error('Comment not found');
  return comment;
};
