import { ObjectId } from '@/database/mongooseConfig';

import { BlogData } from '@/interface/blog.interface';
import BlogModel from '@/models/blog.model';

export const createBlog = async (
  blogData: BlogData,
  auth: { userId: string },
) => {
  // Validate required fields from schema
  if (!blogData.title || !blogData.image) {
    throw new Error('Blog title and image are required');
  }

  // Map categories to blogType if it exists (remove this if not needed)
  const finalBlogData = {
    ...blogData,
    blogType: blogData.blogType || 'Food',
    createdBy: new ObjectId(auth.userId),
    modifiedBy: null,
  };

  const newBlog = await BlogModel.create(finalBlogData);

  return newBlog;
};

export const getAllBlogs = async () => {
  const blogs = await BlogModel.find()
    .populate('createdBy')
    .populate('modifiedBy');

  return blogs;
};

export const getBlogById = async (id: string) => {
  const blog = await BlogModel.findById(id)
    .populate('createdBy')
    .populate('modifiedBy');

  if (!blog) {
    throw new Error('Blog not found');
  }

  return blog;
};

export const updateBlog = async (
  id: string,
  blogData: Partial<BlogData>,
  auth: { userId: string },
) => {
  // Only update provided fields, but ensure blogType is valid if provided
  const updateData = { ...blogData };

  // Ensure blogType is valid if provided
  if (updateData.blogType && !['Food', 'News'].includes(updateData.blogType)) {
    throw new Error('Invalid blogType. Must be "Food" or "News"');
  }

  // Update modifiedBy (if not provided, it could be set via middleware)
  updateData.modifiedBy = updateData.modifiedBy || updateData.createdBy;

  const blog = await BlogModel.findByIdAndUpdate(
    id,
    { ...updateData, modifiedBy: new ObjectId(auth.userId) },
    { new: true, runValidators: true }, // Ensures Mongoose validates the update
  );

  if (!blog) {
    throw new Error('Blog not found');
  }

  return blog;
};

export const deleteBlog = async (id: string) => {
  const blog = await BlogModel.findByIdAndDelete({ _id: new ObjectId(id) });

  if (!blog) {
    throw new Error('Blog not found');
  }

  return blog;
};
export const getBlogTypePercentages = async () => {
  // Count blogs for each blogType and total
  const newsCount = await BlogModel.countDocuments({ blogType: 'News' });
  const foodCount = await BlogModel.countDocuments({ blogType: 'Food' });
  const totalCount = newsCount + foodCount;

  // Calculate percentages
  const percentages = {
    News: totalCount > 0 ? (newsCount / totalCount) * 100 : 0,
    Food: totalCount > 0 ? (foodCount / totalCount) * 100 : 0,
  };

  // Return formatted percentages
  return {
    percentages: {
      News: Number(percentages.News.toFixed(2)),
      Food: Number(percentages.Food.toFixed(2)),
    },
  };
};
