'use client';

import {
  BookDashed as DoorDash,
  Heater as UberEats,
  Package,
  Pencil,
  Plus,
  Search,
  Trash2,
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import * as Yup from 'yup';

import { useGetAllCategories } from '@/hooks/categories/query';
import { useGetAllDietary } from '@/hooks/dietaryTags/query';
import {
  useCreateProduct,
  useDeleteProduct,
  useGetAllProducts,
  useUpdateProduct,
} from '@/hooks/product';

import { MultiSelectDropdown } from '@/components/MultiSelectDropdwon/MultiSelectDropdown';
import { SingleSelectDropdown } from '@/components/SingleSelectDropdown/SingleSelectDropdown';

import { Modal } from './Modal';

// Yup validation schema
const productSchema = Yup.object().shape({
  productName: Yup.string()
    .required('Product name is required')
    .min(2, 'Product name must be at least 2 characters'),
  price: Yup.string()
    .required('Price is required')
    .matches(/^\d+(\.\d{1,2})?$/, 'Price must be a valid number (e.g., 10.99)'),
  category: Yup.string().required('Category is required'),
  tags: Yup.array().of(Yup.string()).optional(),
  description: Yup.string().optional(),
  doordashLink: Yup.string().url('Must be a valid URL').optional().nullable(),
  uberEatsLink: Yup.string().url('Must be a valid URL').optional().nullable(),
  image: Yup.mixed().required('Product image is required').nullable(),
});

export function Products() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    productName: string;
    price: string;
    category: string;
    tags: string[];
    description: string;
    image: File | null;
    doordashLink: string;
    uberEatsLink: string;
  }>({
    productName: '',
    price: '',
    category: '',
    tags: [],
    description: '',
    image: null,
    doordashLink: '',
    uberEatsLink: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const {
    data: products = [],
    refetch: refetchProducts,
    isLoading: isProductsLoading,
  } = useGetAllProducts();
  const { data: categories = [] } = useGetAllCategories();
  const { mutate: createProduct, isPending: isCreating } = useCreateProduct();
  const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();
  const { mutate: deleteProduct } = useDeleteProduct();
  const { data: dietaryTags = [] } = useGetAllDietary();

  const categoryNames = categories.map(
    (category: { categoryName: string }) => category.categoryName,
  );
  const tagNames = dietaryTags
    .filter(
      (tag: { dietaryName: string }) => typeof tag.dietaryName === 'string',
    )
    .map((tag: { dietaryName: string }) => tag.dietaryName);

  const [filteredProducts, setFilteredProducts] = useState<
    {
      _id: string;
      productName: string;
      price: string;
      categories: { categoryName: string };
      tags: { _id: string; dietaryName: string }[];
      description: string;
      image: string;
      doordashLink?: string;
      uberEatsLink?: string;
    }[]
  >([]);

  useEffect(() => {
    if (!products) return;
    if (searchTerm.trim() === '') {
      setFilteredProducts(products);
    } else {
      const lowercaseSearch = searchTerm.toLowerCase();
      const filtered = products.filter(
        (product: {
          productName?: string;
          description?: string;
          categories?: { categoryName?: string };
        }) =>
          (product.productName &&
            product.productName.toLowerCase().includes(lowercaseSearch)) ||
          (product.description &&
            product.description.toLowerCase().includes(lowercaseSearch)) ||
          (product.categories &&
            product.categories.categoryName &&
            product.categories.categoryName
              .toLowerCase()
              .includes(lowercaseSearch)),
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      setErrors((prev) => ({ ...prev, image: '' }));
    }
  };

  const handleSelect = (option: string) => {
    setFormData({ ...formData, category: option });
    setErrors((prev) => ({ ...prev, category: '' }));
  };

  const handleAddNew = (newOption: string): void => {
    setFormData({ ...formData, category: newOption });
    setErrors((prev) => ({ ...prev, category: '' }));
  };

  const handleTagSelect = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag) ? prev.tags : [...prev.tags, tag],
    }));
  };

  const handleTagRemove = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleAddNewTag = (newTag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(newTag) ? prev.tags : [...prev.tags, newTag],
    }));
  };

  interface Product {
    _id: string;
    productName: string;
    price: string;
    categories: { categoryName: string };
    tags: Array<{ _id: string; dietaryName: string }>;
    description: string;
    image: string;
    doordashLink?: string;
    uberEatsLink?: string;
  }

  const openModalForEdit = (product: Product) => {
    setEditingProductId(product._id);
    setFormData({
      productName: product.productName || '',
      price: product.price || '',
      category: product.categories?.categoryName || '',
      tags:
        product.tags
          ?.map((tag) => tag.dietaryName)
          .filter((tag): tag is string => typeof tag === 'string') || [],
      description: product.description || '',
      image: null,
      doordashLink: product.doordashLink || '',
      uberEatsLink: product.uberEatsLink || '',
    });
    setImagePreview(product.image || null);
    setErrors({});
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setEditingProductId(null);
    setFormData({
      productName: '',
      price: '',
      category: '',
      tags: [],
      description: '',
      image: null,
      doordashLink: '',
      uberEatsLink: '',
    });
    setImagePreview(null);
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare data for validation
    const dataToValidate = {
      productName: formData.productName,
      price: formData.price,
      category: formData.category,
      tags: formData.tags,
      description: formData.description,
      doordashLink: formData.doordashLink || '',
      uberEatsLink: formData.uberEatsLink || '',
      image: formData.image,
    };

    try {
      // Validate form data using Yup
      await productSchema.validate(dataToValidate, { abortEarly: false });
      setErrors({});

      // Prepare data for submission
      const jsonData = {
        productName: formData.productName,
        price: formData.price,
        categories: formData.category,
        tags: formData.tags,
        description: formData.description,
        doordashLink: formData.doordashLink,
        uberEatsLink: formData.uberEatsLink,
      };
      const dataToSend = new FormData();
      dataToSend.append('productData', JSON.stringify(jsonData));
      if (formData.image) {
        dataToSend.append('image', formData.image);
      }

      const onSuccess = () => {
        refetchProducts();
        setIsModalOpen(false);
        resetForm();
      };

      if (editingProductId) {
        updateProduct(
          { id: editingProductId, payload: dataToSend },
          { onSuccess },
        );
      } else {
        createProduct(dataToSend, { onSuccess });
      }
    } catch (validationError) {
      // Handle validation errors
      if (validationError instanceof Yup.ValidationError) {
        const errorMessages: Record<string, string> = {};
        validationError.inner.forEach((error) => {
          if (error.path) {
            errorMessages[error.path] = error.message;
          }
        });
        setErrors(errorMessages);
      }
    }
  };

  return (
    <div className='flex flex-col h-full bg-gray-50'>
      <div className='bg-white shadow-sm border-b z-10 px-6 py-4'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex justify-between items-center mb-4'>
            <div className='flex items-center space-x-3'>
              <Package className='h-6 w-6 text-blue-600' />
              <h1 className='text-2xl font-semibold text-gray-900'>Products</h1>
              <span className='bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full'>
                {filteredProducts.length} items
              </span>
            </div>
            <button
              onClick={() => {
                resetForm();
                setIsModalOpen(true);
              }}
              className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center transition-colors duration-200'
            >
              <Plus className='w-5 h-5 mr-2' />
              Add Product
            </button>
          </div>

          <div className='relative max-w-2xl'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
            <input
              type='text'
              placeholder='Search products, categories, or descriptions...'
              className='w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className='flex-1 overflow-hidden px-6 py-6'>
        <div className='max-w-7xl mx-auto h-full'>
          <div className='h-full overflow-y-auto'>
            {isProductsLoading ? (
              <div className='flex items-center justify-center h-64'>
                <div role='status' className='text-center'>
                  <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent align-[-0.125em]'></div>
                  <p className='mt-2 text-gray-600'>Loading products...</p>
                </div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className='text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200'>
                <Package className='mx-auto h-12 w-12 text-gray-400' />
                <h3 className='mt-4 text-lg font-medium text-gray-900'>
                  No products found
                </h3>
                <p className='mt-1 text-gray-500'>
                  {searchTerm ? (
                    <>
                      No results for "{searchTerm}".{' '}
                      <button
                        className='text-blue-600 hover:text-blue-800 font-medium'
                        onClick={() => setSearchTerm('')}
                      >
                        Clear search
                      </button>
                    </>
                  ) : (
                    'Get started by adding your first product'
                  )}
                </p>
              </div>
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {filteredProducts.map((product) => {
                  const description =
                    product.description || 'No description provided.';

                  return (
                    <div
                      key={product._id}
                      className='group rounded-2xl border border-gray-200 bg-white shadow transition hover:shadow-lg hover:-translate-y-1 flex flex-col'
                    >
                      <div className='relative aspect-[4/3] overflow-hidden rounded-t-2xl'>
                        <Image
                          src={product.image}
                          alt={product.productName || 'Product'}
                          fill
                          className='object-cover transition-transform duration-200 group-hover:scale-105'
                        />
                        <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

                        <div className='absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                          <button
                            onClick={() => openModalForEdit(product)}
                            className='p-2 rounded-full bg-white shadow hover:bg-blue-100'
                            title='Edit Product'
                          >
                            <Pencil className='w-4 h-4 text-blue-600' />
                          </button>
                          <button
                            onClick={() => {
                              if (
                                window.confirm(
                                  'Are you sure you want to delete this product?',
                                )
                              ) {
                                deleteProduct(product._id, {
                                  onSuccess: () => refetchProducts(),
                                  onError: (error: Error) => {
                                    toast.error(
                                      `Failed to delete product: ${error.message}`,
                                    );
                                  },
                                });
                              }
                            }}
                            className='p-2 rounded-full bg-white shadow hover:bg-red-100'
                            title='Delete Product'
                          >
                            <Trash2 className='w-4 h-4 text-red-600' />
                          </button>
                        </div>

                        <div className='absolute bottom-3 left-3'>
                          <p className='text-lg font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                            ${product.price || 'N/A'}
                          </p>
                        </div>
                      </div>

                      <div className='p-5 flex flex-col flex-grow'>
                        <h3 className='text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors'>
                          {product.productName || 'Unnamed Product'}
                        </h3>

                        {product.categories?.categoryName && (
                          <div className='mt-2 flex flex-wrap gap-1.5'>
                            <span className='px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full'>
                              {product.categories.categoryName}
                            </span>
                          </div>
                        )}

                        <div className='mt-3 text-sm text-gray-600'>
                          <div className='max-h-20 overflow-y-auto'>
                            <p className='break-words'>{description}</p>
                          </div>
                        </div>

                        {product.tags?.length > 0 && (
                          <div className='mt-4'>
                            <p className='text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide'>
                              Tags
                            </p>
                            <div className='flex flex-wrap gap-1.5'>
                              {product.tags.map((tag) => (
                                <span
                                  key={tag._id}
                                  className='px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full'
                                >
                                  {tag.dietaryName}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {(product.doordashLink || product.uberEatsLink) && (
                          <div className='mt-5 pt-4 border-t border-gray-100 flex flex-wrap gap-2'>
                            {product.doordashLink && (
                              <a
                                href={product.doordashLink}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='flex items-center px-3 py-1.5 bg-red-50 text-red-700 text-sm rounded-lg hover:bg-red-100'
                              >
                                <DoorDash className='w-4 h-4 mr-2' />
                                DoorDash
                              </a>
                            )}
                            {product.uberEatsLink && (
                              <a
                                href={product.uberEatsLink}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='flex items-center px-3 py-1.5 bg-green-50 text-green-700 text-sm rounded-lg hover:bg-green-100'
                              >
                                <UberEats className='w-4 h-4 mr-2' />
                                Uber Eats
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}
        title={editingProductId ? 'Edit Product' : 'Add Product'}
      >
        <div className='max-h-[calc(100vh-200px)] overflow-y-auto'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Product Name
                </label>
                <input
                  type='text'
                  name='productName'
                  value={formData.productName}
                  onChange={handleChange}
                  className='w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white'
                  placeholder='Enter product name'
                />
                {errors.productName && (
                  <p className='mt-1 text-sm text-red-600'>
                    {errors.productName}
                  </p>
                )}
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Price
                </label>
                <input
                  type='text'
                  name='price'
                  value={formData.price}
                  onChange={handleChange}
                  className='w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white'
                  placeholder='Enter price'
                />
                {errors.price && (
                  <p className='mt-1 text-sm text-red-600'>{errors.price}</p>
                )}
              </div>

              <div>
                <SingleSelectDropdown
                  options={categoryNames}
                  selectedOption={formData.category}
                  onSelect={handleSelect}
                  onAddNew={handleAddNew}
                  placeholder='Select or add category'
                  label='Select Category'
                />
                {errors.category && (
                  <p className='mt-1 text-sm text-red-600'>{errors.category}</p>
                )}
              </div>

              <div>
                <MultiSelectDropdown
                  options={tagNames}
                  selectedOptions={formData.tags}
                  onSelect={handleTagSelect}
                  onRemove={handleTagRemove}
                  onAddNew={handleAddNewTag}
                  placeholder='Select or add dietary tags'
                  label='Dietary Tags'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Description
                </label>
                <textarea
                  name='description'
                  value={formData.description}
                  onChange={handleChange}
                  className='w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white'
                  placeholder='Enter description'
                  rows={3}
                />
              </div>

              <div className='space-y-2'>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Product Image
                </label>
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleImageChange}
                  className='w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
                />
                {errors.image && (
                  <p className='mt-1 text-sm text-red-600'>{errors.image}</p>
                )}
                {imagePreview && (
                  <div className='relative w-full h-48 mt-2 rounded-lg overflow-hidden'>
                    <Image
                      src={imagePreview}
                      alt='Product preview'
                      fill
                      className='object-cover'
                    />
                  </div>
                )}
              </div>
            </div>

            <button
              type='submit'
              disabled={isCreating || isUpdating}
              className='w-full bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
            >
              {editingProductId
                ? isUpdating
                  ? 'Updating...'
                  : 'Update Product'
                : isCreating
                  ? 'Adding...'
                  : 'Add Product'}
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
