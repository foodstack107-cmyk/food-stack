/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@tanstack/react-query';

import { Orders } from '@/lib/endpoints/orders';
import { callApi } from '@/lib/http';

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: (payload: any) =>
      callApi({
        uriEndPoint: Orders.createOrder.v1,
        body: payload,
      }),
  });
};

export const useUpdateOrderStatus = () => {
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      callApi({
        uriEndPoint: Orders.updateOrderStatus.v1,
        pathParams: { id },
        body: payload,
      }),
  });
};
