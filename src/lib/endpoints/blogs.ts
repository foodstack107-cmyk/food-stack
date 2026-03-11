import { defaults } from '@/lib/endpoints/default';

export const Blogs = {
  createBlog: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/api/v1/blogs',
    },
  },
  getAllBlogs: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/api/v1/blogs',
    },
  },
  getBlogById: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/blogs/:id',
    },
  },
  updateBlog: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/api/v1/blogs/:id',
    },
  },
  deleteBlog: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: '/api/v1/blogs/:id',
    },
  },
  getBlogTypePercentages: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/api/v1/blogs/blogtype-percentage',
    },
  },
};
