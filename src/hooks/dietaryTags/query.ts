/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';

import { DietaryTag } from '@/lib/endpoints/dietaryTags';
import { callApi } from '@/lib/http';

/// make query for get all categories
export const useGetAllDietary = () => {
  return useQuery({
    queryKey: ['dietaryTags'],
    queryFn: () =>
      callApi({
        uriEndPoint: DietaryTag.getAllDietaryTags.v1,
        query: { keyword: '' },
      }).then((res: any) => res.data),
    staleTime: 1000 * 60 * 5,
  });
};
