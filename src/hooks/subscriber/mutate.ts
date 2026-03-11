/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@tanstack/react-query';

import { Subscriber } from '@/lib/endpoints/subscriber';
import { callApi } from '@/lib/http';

export const useSubscriber = () => {
  return useMutation({
    mutationFn: (payload: any) =>
      callApi({
        uriEndPoint: Subscriber.createSubscriber.v1,
        body: payload,
      }),
  });
};
