import {
  FileText,
  Image as ImageIcon,
  LayoutDashboard,
  Plus,
} from 'lucide-react';
import Image from 'next/image';
import React, { FormEvent, useState } from 'react';
import { toast } from 'sonner';

import {
  useCreateBlog,
  useDeleteBlog,
  useUpdateBlog,
} from '@/hooks/blog/mutation';
import { useGetAllBlogs } from '@/hooks/blog/query';

import BlogCard from './BlogCard';
import { Modal } from './Modal';

// Interfaces
interface Blog {
  _id: string;
  description: string;
  image: string;
  title?: string;
  author?: string;
  date?: string;
  blogType?: string; // Aligned with backend schema
}

interface BlogFormData {
  title: string;
  description: string;
  image: File | null;
}

export function Blogs() {
  // States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    description: '',
    image: null,
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('Food');
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Queries and Mutations
  const {
    data: blogs = [],
    refetch: refetchBlogs,
    isLoading: isBlogLoading,
  } = useGetAllBlogs();

  const { mutate: createBlog, isPending: isCreating } = useCreateBlog();
  const { mutate: updateBlog, isPending: isUpdating } = useUpdateBlog();
  const { mutate: deleteBlog, isPending: isDeleting } = useDeleteBlog();

  // Categories
  const categories: string[] = ['Food', 'News'];

  // Handlers
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    if (name === 'category') {
      setSelectedCategory(value);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const openModalForEdit = (blog: Blog) => {
    setEditingBlogId(blog._id);
    setSelectedCategory(blog.blogType || 'Food');
    setFormData({
      title: blog.title || '',
      description: blog.description,
      image: null,
    });
    setExistingImageUrl(blog.image || null);
    setImagePreview(null);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setEditingBlogId(null);
    setFormData({
      title: '',
      description: '',
      image: null,
    });
    setSelectedCategory('Food');
    setExistingImageUrl(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const jsonData = {
        title: formData.title,
        description: formData.description,
        blogType: selectedCategory,
      };

      const dataToSend = new FormData();
      dataToSend.append('blogData', JSON.stringify(jsonData));

      // If there's a new image, use it
      if (formData.image) {
        dataToSend.append('image', formData.image);
      }
      // If no new image, but an existing image URL exists, fetch and send it
      else if (existingImageUrl) {
        try {
          const response = await fetch(existingImageUrl);
          if (!response.ok) throw new Error('Failed to fetch existing image');
          const blob = await response.blob();
          const file = new File([blob], 'existing-image.jpg', {
            type: blob.type,
          });

          dataToSend.append('image', file); // Send the existing image as a file
        } catch (error) {
          console.error('Error processing existing image:', error);
          toast.error('Failed to process the existing image');
          return;
        }
      } else {
        toast.error('Please provide an image for the blog post');
        return;
      }

      if (editingBlogId) {
        updateBlog(
          { id: editingBlogId, payload: dataToSend },
          {
            onSuccess: () => {
              toast.success('Blog updated successfully');
              refetchBlogs();
              setIsModalOpen(false);
              resetForm();
            },
            onError: (error: Error) => {
              toast.error(`Failed to update blog: ${error.message}`);
            },
          },
        );
      } else {
        await createBlog(dataToSend, {
          onSuccess: () => {
            toast.success('Blog created successfully');
            refetchBlogs();
            setIsModalOpen(false);
            resetForm();
          },
          onError: (error: Error) => {
            toast.error(`Failed to create blog: ${error.message}`);
          },
        });
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await deleteBlog(id, {
          onSuccess: () => {
            toast.success('Blog deleted successfully');
            refetchBlogs();
          },
          onError: (error: Error) => {
            toast.error(`Failed to delete blog: ${error.message}`);
          },
        });
      } catch (error) {
        toast.error('An unexpected error occurred');
        console.error('Error:', error);
      }
    }
  };

  // Loading state
  if (isBlogLoading) {
    return (
      <div className='h-screen flex items-center justify-center'>
        <div className='text-center'>
          <div className='w-16 h-16 border-4 border-t-blue-600 border-b-blue-600 border-l-transparent border-r-transparent rounded-full animate-spin mx-auto mb-4'></div>
          <p className='text-gray-600'>Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8 max-w-7xl'>
      <div className='mb-8'>
        <div className='flex   justify-between items-start sm:items-center gap-4 mb-6'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>
              Blog Management
            </h1>
            <p className='text-gray-600 mt-1'>
              Create and manage your blog content
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center transition-colors duration-200'
          >
            <Plus className='w-4 h-4 mr-2' />
            Create New Post
          </button>
        </div>
      </div>

      {/* Blog Post Grid */}
      <div className='relative'>
        <div className='border-b border-gray-200 mb-6'>
          <div className='flex items-center space-x-1 text-sm font-medium text-gray-600'>
            <div className='p-4 border-b-2 border-blue-600 text-blue-600 flex items-center'>
              <LayoutDashboard className='w-4 h-4 mr-2' />
              All Posts ({blogs.length})
            </div>
          </div>
        </div>

        {blogs.length === 0 ? (
          <div className='bg-white rounded-xl border border-gray-200 p-12 text-center'>
            <div className='mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4'>
              <FileText className='w-12 h-12 text-gray-400' />
            </div>
            <h3 className='text-xl font-semibold text-gray-800 mb-2'>
              No blog posts yet
            </h3>
            <p className='text-gray-600 mb-6 max-w-md mx-auto'>
              Create your first blog post by clicking the "Create New Post"
              button above.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className='inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
            >
              <Plus className='w-4 h-4 mr-2' />
              Create New Post
            </button>
          </div>
        ) : (
          <div className='h-[calc(80vh-200px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 p-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {blogs?.map((blog: Blog) => (
                <BlogCard
                  key={blog._id}
                  blog={blog}
                  onEdit={openModalForEdit}
                  onDelete={handleDelete}
                  isDeleting={isDeleting}
                  isUpdating={isUpdating}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}
        title={editingBlogId ? 'Edit Blog Post' : 'Create New Blog Post'}
      >
        <div className='max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 p-4'>
          <form onSubmit={handleSubmit} className='space-y-5'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Title
              </label>
              <input
                name='title'
                value={formData.title}
                onChange={handleChange}
                type='text'
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all'
                placeholder='Enter a compelling title'
                required
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Content
              </label>
              <textarea
                name='description'
                value={formData.description}
                onChange={handleChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all'
                rows={5}
                placeholder='Write your blog post content here...'
                required
              ></textarea>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Category
              </label>
              <select
                name='category'
                value={selectedCategory}
                onChange={handleChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all'
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Featured Image
              </label>

              <div className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg'>
                <div className='space-y-2 text-center'>
                  {imagePreview || existingImageUrl ? (
                    <div className='relative w-full aspect-video mb-3'>
                      <Image
                        src={imagePreview || existingImageUrl || ''}
                        alt='Preview'
                        className='mx-auto max-h-40 object-contain rounded-md'
                        layout='fill'
                        objectFit='contain'
                      />
                    </div>
                  ) : (
                    <div className='mx-auto h-24 w-24 flex items-center justify-center rounded-full bg-gray-100 text-gray-400'>
                      <ImageIcon className='h-10 w-10' />
                    </div>
                  )}

                  <div className='flex justify-center text-sm text-gray-600'>
                    <label
                      htmlFor='file-upload'
                      className='relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500'
                    >
                      <span>
                        {imagePreview || existingImageUrl
                          ? 'Change image'
                          : 'Upload an image'}
                      </span>
                      <input
                        id='file-upload'
                        name='file-upload'
                        type='file'
                        className='sr-only'
                        onChange={handleImageChange}
                        accept='image/*'
                      />
                    </label>
                  </div>
                  <p className='text-xs text-gray-500'>
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>

            <div className='flex items-center justify-end space-x-3 pt-4'>
              <button
                type='button'
                onClick={() => {
                  setIsModalOpen(false);
                  resetForm();
                }}
                className='px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors'
              >
                Cancel
              </button>
              <button
                type='submit'
                className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center'
                disabled={isCreating || isUpdating}
              >
                {isCreating || isUpdating ? (
                  <>
                    <svg
                      className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      ></circle>
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : editingBlogId ? (
                  'Update Post'
                ) : (
                  'Publish Post'
                )}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
