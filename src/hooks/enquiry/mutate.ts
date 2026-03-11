/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Enquiry } from '@/lib/endpoints/enquiry';
import { callApi } from '@/lib/http/'; // or wherever `callApi` is located

export const useCreateEnquiry = () => {
  return useMutation({
    mutationFn: (payload: any) =>
      callApi({
        uriEndPoint: Enquiry.createEnquiry.v1,
        body: payload,
      }),
  });
};

export const useGetAllEnquiries = () => {
  return useQuery({
    queryKey: ['enquiries'],
    queryFn: () =>
      callApi({
        uriEndPoint: Enquiry.getAllEnquiries.v1,
      }).then((res: any) => res.data), // assuming `res.data` contains the Enquiry array
    staleTime: 1000 * 60 * 5, // optional: cache for 5 mins
  });
};

export function useDeleteEnquiry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return await callApi({
        uriEndPoint: Enquiry.deleteEnquiry.v1,
        pathParams: { id },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enquiries'] });
    },
    onError: (error) => {
      console.error('Error deleting enquiry:', error);
      // Optionally show a toast or notification here
    },
  });
}

export function useGetWeeklyEnquiryTrend() {
  return useQuery({
    queryKey: ['weeklyEnquiryTrend'],
    queryFn: () =>
      callApi({
        uriEndPoint: Enquiry.getWeeklyEnquiryTrend.v1,
      }).then((res: any) => res.data), // assuming `res.data` contains the weekly trend data
    staleTime: 1000 * 60 * 5, // optional: cache for 5 mins
  });
}
