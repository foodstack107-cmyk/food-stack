'use client';
import { useQuery } from '@tanstack/react-query';

import { Category } from '@/lib/endpoints/categories';
import { callApi } from '@/lib/http';

/// make query for get all categories
export const useGetAllCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () =>
      callApi({
        uriEndPoint: Category.getAllCategories.v1,
        query: { keyword: '' }, // sending an empty keyword by default
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }).then((res: any) => res.data), // assuming `res.data` contains the category array
    staleTime: 1000 * 60 * 5, // optional: cache for 5 mins
  });
};
