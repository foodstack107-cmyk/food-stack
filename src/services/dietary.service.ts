import DietaryTag from '@/models/dietary.model';

export const createOrUpdateTag = async (tagName: string) => {
  const tag = await DietaryTag.findOneAndUpdate(
    { dietaryName: tagName },
    { dietaryName: tagName },
    { new: true, upsert: true },
  );
  return tag._id;
};

export const getTagIds = async (tags: string[]) => {
  if (!tags.length) return [];
  return await Promise.all(tags.map(createOrUpdateTag));
};

export const getAllTags = async () => {
  const tags = await DietaryTag.find({});
  return tags.map((tag) => ({
    _id: tag._id,
    dietaryName: tag.dietaryName,
  }));
};
