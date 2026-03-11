/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';

import { Orders } from '@/lib/endpoints/orders';
import { callApi } from '@/lib/http';

export const useGetAllOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: () =>
      callApi({
        uriEndPoint: Orders.getAllOrders.v1,
      }).then((res: any) => res.data),
    staleTime: 1000 * 60 * 5,
  });
};
