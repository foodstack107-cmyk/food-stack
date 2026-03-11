'use client';
import { ArrowLeft, Calendar, ChefHat, Tag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

import { useGetAllBlogs } from '@/hooks/blog/query';

interface BlogDetailProps {
  resourceType: 'latest-news' | 'food-tips';
}

const BlogDetail = ({ resourceType }: BlogDetailProps) => {
  const { id } = useParams();
  const router = useRouter();
  const { data: blogs = [] } = useGetAllBlogs();

  interface Blog {
    _id: string;
    title: string;
    blogType: string;
    image: string;
    description: string;
  }

  const blog = blogs.find((b: Blog) => b._id === id);

  // Define resource-specific configurations
  const resourceConfig = {
    'latest-news': {
      titlePrefix: 'Latest News',
      iconColor: 'text-[#E8552D]',
      bgColor: 'bg-[#E8552D]',
      textColor: 'text-[#E8552D]',
      borderColor: 'border-[#E8552D]',
      hoverColor: 'hover:bg-[#F97316]',
    },
    'food-tips': {
      titlePrefix: 'Food Tip',
      iconColor: 'text-[#E8552D]',
      bgColor: 'bg-[#E8552D]',
      textColor: 'text-[#E8552D]',
      borderColor: 'border-[#E8552D]',
      hoverColor: 'hover:bg-[#F97316]',
    },
  };

  const config = resourceConfig[resourceType];

  if (!blog) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-[#0B1426]'>
        <div className='absolute inset-0 z-0 pointer-events-none'>
          <div className='absolute inset-0 bg-gradient-to-b from-[#1A2744]/20 to-[#0B1426] backdrop-blur-3xl' />
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-[#E8552D]/10 rounded-full blur-[150px]' />
        </div>
        <div className='animate-pulse flex flex-col items-center relative z-10'>
          <div className='bg-[#E8552D] w-12 h-12 rounded-full mb-4 opacity-70 shadow-[0_0_20px_rgba(232,85,45,0.4)]'></div>
          <p className='text-white/60 text-xl font-medium'>
            Loading {resourceConfig[resourceType].titlePrefix.toLowerCase()}...
          </p>
        </div>
      </div>
    );
  }

  // Get related blogs (same type, excluding current)
  const relatedBlogs: Blog[] = blogs
    .filter((b: Blog) => b.blogType === blog.blogType && b._id !== id)
    .slice(0, 3);

  return (
    <div className='min-h-screen bg-[#0B1426] text-white relative overflow-hidden'>
      {/* Background decoration */}
      <div className='fixed inset-0 z-0 pointer-events-none'>
        <div className='absolute inset-0 bg-gradient-to-b from-[#1A2744]/20 to-[#0B1426] backdrop-blur-3xl' />
        <div className='absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full bg-[#E8552D]/5 blur-[150px]' />
      </div>

      {/* Hero Section with Image */}
      <div className='relative h-[60vh] min-h-[400px] w-full'>
        <div className='absolute inset-0 bg-gradient-to-t from-[#0B1426] via-[#0B1426]/60 to-transparent z-10' />
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className='object-cover'
          priority
        />
        <div className='container mx-auto px-6 relative z-10 h-full flex flex-col justify-end pb-12 sm:pb-20 max-w-5xl'>
          <button
            onClick={() => router.back()}
            className='flex items-center gap-2 text-white/70 mb-6 hover:text-white group w-fit transition-colors'
          >
            <div className='w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#E8552D] group-hover:border-transparent transition-all'>
              <ArrowLeft className='w-4 h-4 group-hover:-translate-x-0.5 transition-transform' />
            </div>
            Back to overview
          </button>
          <div
            className={`${config.bgColor} text-white text-xs font-bold tracking-wider uppercase px-4 py-2 rounded-full w-fit mb-6 shadow-lg`}
          >
            {config.titlePrefix}
          </div>
          <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight'>
            {blog.title}
          </h1>
        </div>
      </div>

      <div className='container mx-auto px-6 py-12 max-w-5xl relative z-10'>
        <div className='bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl mt-[-8rem] relative z-20'>
          {/* Blog Meta */}
        <div className='flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-8 border-b border-gray-800 pb-6'>
          <div className='flex items-center gap-2'>
            <ChefHat className={`w-4 h-4 ${config.iconColor}`} />
            <span>{blog.blogType}</span>
          </div>
          <div className='flex items-center gap-2'>
            <Calendar className={`w-4 h-4 ${config.iconColor}`} />
            <span>Published today</span>
          </div>
          <div className='flex items-center gap-2'>
            <Tag className={`w-4 h-4 ${config.iconColor}`} />
            <span>{resourceType === 'latest-news' ? 'News' : 'Tips'}</span>
          </div>
        </div>

        {/* Blog Content */}
        <div className='prose prose-lg max-w-none text-gray-300 prose-headings:text-white prose-strong:text-white'>
          {blog.description
            .split('\n\n')
            .map((paragraph: string, idx: number) => (
              <p key={idx} className='mb-6 leading-relaxed'>
                {paragraph}
              </p>
            ))}
        </div>

          </div>
        </div>

        {/* Related Content */}
        {relatedBlogs.length > 0 && (
          <div className='mt-24'>
            <div className='flex items-center justify-between mb-8'>
              <h2 className='text-3xl font-bold text-white'>
                Related {resourceType === 'food-tips' ? 'Tips' : 'Articles'}
              </h2>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              {relatedBlogs.map((relatedBlog: Blog) => (
                <Link
                  href={`/${resourceType}/${relatedBlog._id}`}
                  key={relatedBlog._id}
                  className='group bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:border-[#E8552D]/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col'
                >
                  <div className='relative h-48 overflow-hidden'>
                    <Image
                      src={relatedBlog.image}
                      alt={relatedBlog.title}
                      fill
                      className='object-cover group-hover:scale-110 transition-transform duration-700'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-[#0B1426] via-transparent to-transparent opacity-80' />
                  </div>
                  <div className='p-6 flex flex-col flex-1'>
                    <h3 className='font-bold text-lg text-white mb-3 line-clamp-2 group-hover:text-[#E8552D] transition-colors'>
                      {relatedBlog.title}
                    </h3>
                    <p className='text-sm text-white/60 line-clamp-2 flex-1 mb-4'>
                      {relatedBlog.description}
                    </p>
                    <div
                      className={`mt-auto text-sm ${config.textColor} flex items-center font-bold gap-2 group-hover:gap-3 transition-all`}
                    >
                      Read Guide <ArrowLeft className='w-4 h-4 rotate-180' />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        {/* <div
          className={`mt-16 border ${config.borderColor} border-opacity-30 rounded-xl p-8 text-center bg-gradient-to-b from-gray-800/50 to-gray-900/50`}
        >
          <h3 className='text-2xl font-bold text-white mb-3'>
            Explore More{' '}
            {resourceType === 'food-tips' ? 'Culinary Tips' : 'Latest News'}
          </h3>
          <p className='text-white mb-6 max-w-lg mx-auto'>
            Discover our collection of{' '}
            {resourceType === 'food-tips'
              ? 'expert culinary advice'
              : 'trending stories'}{' '}
            to enhance your dining experience.
          </p>
          <Link
            href={`/${resourceType}`}
            className={`${config.bgColor} ${config.hoverColor} text-gray-900 px-6 py-3 rounded-lg font-medium inline-block transition-colors`}
          >
            View All {resourceType === 'food-tips' ? 'Tips' : 'Articles'}
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default BlogDetail;
