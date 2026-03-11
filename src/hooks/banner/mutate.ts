import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { callApi } from '@/lib/http';

import { BannerSettings } from '@/types/banner';

interface ApiResponse<T> {
  success: boolean;
  banner?: T;
  message?: string;
}
const fetchBanner = async (): Promise<BannerSettings> => {
  const data = await callApi<ApiResponse<BannerSettings>>({
    uriEndPoint: {
      uri: '/api/banner',
      method: 'GET',
      version: '',
    },
  });
  if (!data.banner) {
    throw new Error('No banner settings found');
  }
  return data.banner;
};

// Query hook to fetch banner settings
export const useBannerQuery = () => {
  return useQuery<BannerSettings, Error>({
    queryKey: ['banner'],
    queryFn: fetchBanner,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: 2, // Retry failed requests twice
    refetchOnWindowFocus: true, // 👈 Refetch when window/tab becomes active
    refetchOnReconnect: true, // 👈 Refetch when internet reconnects
  });
};

// Mutation hook to create or update banner settings
export const useCreateOrUpdateBanner = () => {
  const queryClient = useQueryClient();

  return useMutation<BannerSettings, Error, BannerSettings>({
    mutationFn: (payload: BannerSettings) =>
      callApi<ApiResponse<BannerSettings>>({
        uriEndPoint: {
          uri: '/api/banner',
          method: 'POST',
          version: '',
        },
        //skip any validation
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        body: payload as any,
      }).then((response) => {
        if (!response.banner) {
          throw new Error('No banner data received');
        }
        return response.banner;
      }),
    onSuccess: (data) => {
      // Update the query cache with the new banner settings
      queryClient.setQueryData(['banner'], data);
      // Optionally invalidate to refetch
      queryClient.invalidateQueries({ queryKey: ['banner'] });
    },
    onError: (error) => {
      console.error('Mutation error:', error.message);
    },
  });
};
