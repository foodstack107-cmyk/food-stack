/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';

import { Subscriber } from '@/lib/endpoints/subscriber';
import { callApi } from '@/lib/http';

export const useGetAllSubscribers = () => {
  return useQuery({
    queryKey: ['subscribers'],
    queryFn: () =>
      callApi({
        uriEndPoint: Subscriber.getAllSubscribers.v1,
      }).then((res: any) => res.data),
    staleTime: 1000 * 60 * 5,
  });
};
