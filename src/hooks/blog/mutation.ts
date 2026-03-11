/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@tanstack/react-query';

import { Blogs } from '@/lib/endpoints/blogs'; // Adjust the import path as necessary
import { callApi } from '@/lib/http/'; // or wherever `callApi` is located

export const useCreateBlog = () => {
  return useMutation({
    mutationFn: (payload: any) =>
      callApi({
        uriEndPoint: Blogs.createBlog.v1,
        body: payload,
        multipart: true,
      }),
  });
};
//make update blog
export const useUpdateBlog = () => {
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: any }) => {
      return await callApi({
        uriEndPoint: Blogs.updateBlog.v1,
        pathParams: { id },
        body: payload,
        multipart: true,
      });
    },
  });
};
export function useDeleteBlog() {
  return useMutation({
    mutationFn: async (id: string) => {
      return await callApi({
        uriEndPoint: Blogs.deleteBlog.v1,
        pathParams: { id },
      });
    },
  });
}
