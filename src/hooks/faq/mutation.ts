/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@tanstack/react-query';

import { Faq } from '@/lib/endpoints/faq';
import { callApi } from '@/lib/http';

export const useCreateFaq = () => {
  return useMutation({
    mutationFn: (payload: any) =>
      callApi({
        uriEndPoint: Faq.createFaq.v1,
        body: payload,
      }),
  });
};

//make update faq
export const useUpdateFaq = () => {
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: any }) => {
      return await callApi({
        uriEndPoint: Faq.updateFaq.v1,
        pathParams: { id },
        body: payload,
      });
    },
  });
};

export function useDeleteFaq() {
  return useMutation({
    mutationFn: async (id: string) => {
      return await callApi({
        uriEndPoint: Faq.deleteFaq.v1,
        pathParams: { id },
      });
    },
  });
}
