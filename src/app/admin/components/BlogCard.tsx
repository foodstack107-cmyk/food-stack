import { Calendar, Pencil, Tag, Trash2, User } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
interface Category {
  categoryName: string;
}

export interface Blog {
  _id: string;
  description: string;
  image: string;
  title?: string;
  author?: string;
  date?: string;
  categories?: Category[];
}

interface BlogCardProps {
  blog: Blog;
  onEdit: (blog: Blog) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
  isUpdating: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({
  blog,
  onEdit,
  onDelete,
  isDeleting,
  isUpdating,
}) => {
  return (
    <div className='bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100'>
      <div className='relative aspect-video w-full overflow-hidden'>
        <Image
          src={blog.image}
          alt={blog.title || 'Blog image'}
          layout='fill'
          objectFit='cover'
          className='transition-transform hover:scale-105 duration-500'
        />
        {blog.categories?.[0]?.categoryName && (
          <span className='absolute top-4 right-4 bg-white/80 backdrop-blur-sm text-xs font-medium px-2.5 py-1 rounded-full flex items-center'>
            <Tag className='w-3 h-3 mr-1' />
            {blog.categories[0].categoryName}
          </span>
        )}
      </div>

      <div className='p-5'>
        <h3 className='text-xl font-bold text-gray-800 mb-2 line-clamp-2'>
          {blog.title}
        </h3>

        <div className='flex items-center text-gray-500 text-sm mb-3 space-x-4'>
          <div className='flex items-center'>
            <Calendar className='w-3.5 h-3.5 mr-1.5' />
            <span>{blog.date || 'No date'}</span>
          </div>

          <div className='flex items-center'>
            <User className='w-3.5 h-3.5 mr-1.5' />
            <span>{blog.author || 'Anonymous'}</span>
          </div>
        </div>

        <p className='text-gray-600 mb-4 max-h-32 overflow-y-auto p-2  '>
          {blog.description}
        </p>
        <div className='flex justify-end space-x-2 mt-4 pt-4 border-t border-gray-100'>
          <button
            onClick={() => onEdit(blog)}
            disabled={isUpdating}
            className='flex items-center px-3 py-1.5 text-sm rounded-lg text-blue-600 hover:bg-blue-50 transition-colors'
          >
            <Pencil className='w-3.5 h-3.5 mr-1.5' />
            Edit
          </button>

          <button
            onClick={() => onDelete(blog._id)}
            disabled={isDeleting}
            className='flex items-center px-3 py-1.5 text-sm rounded-lg text-red-600 hover:bg-red-50 transition-colors'
          >
            <Trash2 className='w-3.5 h-3.5 mr-1.5' />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
