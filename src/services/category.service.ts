import { mongoose } from '@/database/mongooseConfig';

import Category from '@/models/category.model';

export const createOrUpdateCategory = async (categoryName: string) => {
  const category = await Category.findOneAndUpdate(
    { categoryName },
    { categoryName },
    { new: true, upsert: true },
  );
  return category._id;
};

export const getCategoryIds = async (
  category: string,
): Promise<mongoose.Types.ObjectId> => {
  if (!category) {
    throw new Error('Category name is required');
  }
  return await createOrUpdateCategory(category);
};
export const getAllCategories = async () => {
  const categories = await Category.find({});
  return categories.map((category) => ({
    _id: category._id,
    categoryName: category.categoryName,
  }));
};
