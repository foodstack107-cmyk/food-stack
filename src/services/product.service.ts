import { mongoose, ObjectId } from '@/database/mongooseConfig';

import { ProductData } from '@/interface/product.interface';
import ProductModel from '@/models/product.model';
import { getCategoryIds } from '@/services/category.service';
import { getTagIds } from '@/services/dietary.service';
export const createProduct = async (
  productData: ProductData,
  auth: { userId: string },
) => {
  const {
    productName,
    categories,
    description,
    price,
    tags = [],
    image,

    modifiedBy,
    uberEatsLink = '',
    doordashLink = '',
  } = productData;

  // Check required fields
  const requiredFields = {
    productName,
    description,
    price,
  };

  const missingFields = Object.entries(requiredFields)
    .filter(([_, value]) => !value || value === '')
    .map(([field]) => field);

  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(', ')}.`);
  }

  // Validate and format price
  if (!price || isNaN(Number(price))) {
    throw new Error('Invalid price: Price must be a valid number');
  }
  const formattedPrice = formatAndValidatePrice(price);

  try {
    // Convert categories and tags to ObjectId arrays
    let categoryId: mongoose.Types.ObjectId | null = null;
    if (categories) {
      categoryId = await getCategoryIds(categories); // Pass single string
    }
    const tagIds = Array.isArray(tags)
      ? await getTagIds(tags)
      : [await getTagIds(tags)];

    // Create product
    const product = await ProductModel.create({
      productName,
      categories: categoryId,
      description,
      price: formattedPrice,
      tags: tagIds,
      image: image || '', // Ensure image has default empty string
      createdBy: new ObjectId(auth.userId), // Use auth.userId instead of productData.createdBy
      uberEatsLink: uberEatsLink || '',
      doordashLink: doordashLink || '',
      modifiedBy: modifiedBy
        ? new ObjectId(modifiedBy)
        : new ObjectId(auth.userId),
      isActive: true,
    });

    return product;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to create product: ${error.message}`);
    } else {
      throw new Error('Failed to create product due to an unknown error');
    }
  }
};

// Helper function to format and validate price (assumed existing function)
const formatAndValidatePrice = (price: string | number): number => {
  const numericPrice = Number(price);
  if (isNaN(numericPrice) || numericPrice < 0) {
    throw new Error('Invalid price value');
  }
  return numericPrice;
};
export const getAllProducts = async () => {
  const products = await ProductModel.find({ isActive: true })
    .sort({ 'categories.name': 1 }) // Sort A to Z by category name
    .populate('categories')
    .populate('tags');

  const total = await ProductModel.countDocuments({ isActive: true });
  return { products, total };
};
export const getProductById = async (id: string) => {
  const product = await ProductModel.findById({ _id: new ObjectId(id) })
    .populate('categories')
    .populate('createdBy')
    .populate('modifiedBy');
  if (!product) throw new Error('Product not found');
  return product;
};

export const updateProductById = async (
  id: string,
  productData: ProductData,
  auth: { userId: string },
) => {
  const {
    productName,
    categories,
    description,
    price,
    tags = [],
    image,
  } = productData;

  if (!productName || !description || !price) {
    throw new Error(
      'Missing required fields: productName, description, or price.',
    );
  }

  const formattedPrice = formatAndValidatePrice(price);
  let categoryId: mongoose.Types.ObjectId | null = null;
  if (categories) {
    categoryId = await getCategoryIds(categories); // Pass single string
  }

  const tagIds = await getTagIds(tags);

  const product = await ProductModel.findByIdAndUpdate(
    { _id: new ObjectId(id) },
    {
      ...productData,
      productName,
      categories: categoryId,
      description,
      price: formattedPrice,
      tags: tagIds,
      image,
      modifiedBy: new ObjectId(auth.userId) || null,
    },
    { new: true, runValidators: true },
  );

  if (!product) throw new Error('Product not found');

  return product;
};

export const deleteProductById = async (id: string) => {
  const product = await ProductModel.findByIdAndUpdate(
    {
      _id: new ObjectId(id),
    },
    { isActive: false },
    { new: true },
  );
  if (!product) throw new Error('Product not found');
  return product;
};

//get product by the categrioes how much category use = [
//   { name: 'Appetizers', count: 12 },
//   { name: 'Main Course', count: 20 },
//   { name: 'Desserts', count: 8 },
//   { name: 'Beverages', count: 15 },
//   { name: 'Sides', count: 6 },
// ];
// like this
export const getProductCategoryPercentages = async () => {
  const products = await ProductModel.find({ isActive: true }).populate(
    'categories',
  );

  const categoryCounts: { [key: string]: number } = {};

  products.forEach((product) => {
    const categoryName = product.categories?.categoryName || 'Unknown';
    if (categoryCounts[categoryName]) {
      categoryCounts[categoryName]++;
    } else {
      categoryCounts[categoryName] = 1;
    }
  });

  const totalProducts = products.length;

  const categoryPercentages = Object.entries(categoryCounts).map(
    ([name, count]) => ({
      name,
      count,
      percentage: ((count / totalProducts) * 100).toFixed(2),
    }),
  );

  return categoryPercentages;
};
