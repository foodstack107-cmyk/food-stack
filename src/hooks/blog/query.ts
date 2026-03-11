/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';

import { Blogs } from '@/lib/endpoints/blogs'; // Adjust the import path as necessary
import { callApi } from '@/lib/http/'; // or wherever `callApi` is located

export const useGetAllBlogs = () => {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: () =>
      callApi({
        uriEndPoint: Blogs.getAllBlogs.v1,
      }).then((res: any) => res.data),
    staleTime: 1000 * 60 * 5,
  });
};

// getTypePercentages
export const useGetBlogTypePercentages = () => {
  return useQuery({
    queryKey: ['blogTypePercentages'],
    queryFn: () =>
      callApi({
        uriEndPoint: Blogs.getBlogTypePercentages.v1,
      }).then((res: any) => res.data),
    staleTime: 1000 * 60 * 5,
  });
};
