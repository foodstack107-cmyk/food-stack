/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';

import { Faq } from '@/lib/endpoints/faq';
import { callApi } from '@/lib/http';

export const useGetAllFaq = () => {
  return useQuery({
    queryKey: ['faq'],
    queryFn: () =>
      callApi({
        uriEndPoint: Faq.getAllFaq.v1,
      }).then((res: any) => res.data),
    staleTime: 1000 * 60 * 5,
  });
};
