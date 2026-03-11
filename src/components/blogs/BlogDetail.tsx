'use client';

import { ArrowLeft, Calendar, ChefHat, Tag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

import { useGetAllBlogs } from '@/hooks/blog/query';

interface BlogDetailProps {
  resourceType: 'latest-news' | 'food-tips';
}

interface Blog {
  _id: string;
  title: string;
  blogType: string;
  image: string;
  description: string;
}

const BlogDetail = ({ resourceType }: BlogDetailProps) => {
  const params = useParams();
  const router = useRouter();
  const { data: blogs = [], isLoading } = useGetAllBlogs();

  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const blog = blogs.find((b: Blog) => b._id === id);

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

  /* ---------------- LOADING ---------------- */

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-[#0B1426]'>
        <div className='animate-pulse flex flex-col items-center'>
          <div className='bg-[#E8552D] w-12 h-12 rounded-full mb-4 opacity-70'></div>
          <p className='text-white/60 text-xl'>
            Loading {config.titlePrefix.toLowerCase()}...
          </p>
        </div>
      </div>
    );
  }

  /* ---------------- BLOG NOT FOUND ---------------- */

  if (!blog) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-[#0B1426] text-white'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold mb-4'>Blog Not Found</h2>
          <button
            onClick={() => router.back()}
            className='bg-[#E8552D] px-6 py-3 rounded-lg'
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  /* ---------------- RELATED BLOGS ---------------- */

  const relatedBlogs: Blog[] = blogs
    .filter((b: Blog) => b.blogType === blog.blogType && b._id !== blog._id)
    .slice(0, 3);

  return (
    <div className='min-h-screen bg-[#0B1426] text-white relative overflow-hidden'>
      {/* Background */}
      <div className='fixed inset-0 pointer-events-none'>
        <div className='absolute inset-0 bg-gradient-to-b from-[#1A2744]/20 to-[#0B1426]' />
        <div className='absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full bg-[#E8552D]/5 blur-[150px]' />
      </div>

      {/* HERO SECTION */}

      <div className='relative h-[60vh] min-h-[400px] w-full'>
        <div className='absolute inset-0 bg-gradient-to-t from-[#0B1426] via-[#0B1426]/60 to-transparent z-10' />

        <Image
          src={blog.image}
          alt={blog.title}
          fill
          priority
          className='object-cover'
        />

        <div className='container mx-auto px-6 relative z-10 h-full flex flex-col justify-end pb-16 max-w-5xl'>
          <button
            onClick={() => router.back()}
            className='flex items-center gap-2 text-white/70 mb-6 hover:text-white'
          >
            <ArrowLeft className='w-4 h-4' />
            Back
          </button>

          <div
            className={`${config.bgColor} text-white text-xs font-bold px-4 py-2 rounded-full w-fit mb-6`}
          >
            {config.titlePrefix}
          </div>

          <h1 className='text-4xl md:text-6xl font-black leading-tight'>
            {blog.title}
          </h1>
        </div>
      </div>

      {/* CONTENT */}

      <div className='container mx-auto px-6 py-12 max-w-5xl relative z-10'>
        <div className='bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl mt-[-8rem]'>
          {/* META */}

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

          {/* DESCRIPTION */}

          <div className='prose prose-lg max-w-none text-gray-300 prose-headings:text-white'>
            {blog.description
              ?.split('\n\n')
              .map((paragraph: string, idx: number) => (
                <p key={idx} className='mb-6 leading-relaxed'>
                  {paragraph}
                </p>
              ))}
          </div>
        </div>

        {/* RELATED BLOGS */}

        {relatedBlogs.length > 0 && (
          <div className='mt-24'>
            <h2 className='text-3xl font-bold mb-8'>
              Related {resourceType === 'food-tips' ? 'Tips' : 'Articles'}
            </h2>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              {relatedBlogs.map((relatedBlog: Blog) => (
                <Link
                  key={relatedBlog._id}
                  href={`/${resourceType}/${relatedBlog._id}`}
                  className='group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-[#E8552D]/50 transition-all hover:-translate-y-2 flex flex-col'
                >
                  <div className='relative h-48'>
                    <Image
                      src={relatedBlog.image}
                      alt={relatedBlog.title}
                      fill
                      className='object-cover group-hover:scale-110 transition-transform'
                    />
                  </div>

                  <div className='p-6 flex flex-col flex-1'>
                    <h3 className='font-bold text-lg mb-3 group-hover:text-[#E8552D]'>
                      {relatedBlog.title}
                    </h3>

                    <p className='text-sm text-white/60 line-clamp-2 mb-4'>
                      {relatedBlog.description}
                    </p>

                    <div
                      className={`mt-auto text-sm ${config.textColor} flex items-center gap-2`}
                    >
                      Read Guide
                      <ArrowLeft className='w-4 h-4 rotate-180' />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;
