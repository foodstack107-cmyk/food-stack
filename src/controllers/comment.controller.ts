import { NextRequest, NextResponse } from 'next/server';

import {
  createComment,
  deleteCommentById,
  getAllComments,
  getCommentById,
  getCommentWithReplies,
  updateCommentById,
} from '../services/comment.service';

//create comment
export async function createCommentHandler(req: NextRequest) {
  try {
    const body = await req.json();
    const comment = await createComment(body);
    return NextResponse.json(
      { data: comment, message: 'Comment created successfully', success: true },
      { status: 201 },
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}

// Get All Comments
export async function getAllCommentsHandler() {
  try {
    const comments = await getAllComments();
    return NextResponse.json(
      { data: comments, success: true, total: comments.length },
      { status: 200 },
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}

export const fetchCommentWithReplies = async (id: string) => {
  try {
    const comment = await getCommentWithReplies(id);
    return NextResponse.json({ data: comment, success: true }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
};

// Get Comment by ID
export async function getCommentByIdHandler(id: string) {
  try {
    const comment = await getCommentById(id);
    if (!comment)
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    return NextResponse.json({ data: comment, success: true }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}
// Update Comment by ID
export async function updateCommentHandler(req: NextRequest) {
  try {
    const { id, ...updateData } = await req.json();
    if (!id)
      return NextResponse.json(
        { error: 'Comment ID is required' },
        { status: 400 },
      );
    const updatedComment = await updateCommentById(id, updateData);
    if (!updatedComment)
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    return NextResponse.json(
      {
        data: updatedComment,
        message: 'Comment updated successfully',
        success: true,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}
// Delete Comment by ID
export async function deleteCommentHandler(id: string) {
  try {
    const comment = await deleteCommentById(id);
    if (!comment)
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    return NextResponse.json(
      { data: comment, message: 'Comment deleted successfully', success: true },
      { status: 200 },
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}
