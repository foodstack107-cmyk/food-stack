// hooks/useAnalytics.ts
import { useQuery } from '@tanstack/react-query';

import { totalClicks } from '@/lib/endpoints/totalclick';
import { callApi } from '@/lib/http';

export const useTotalClicks = (
  button: 'doordash' | 'ubereats' | 'combined' | 'shivshakti',
) => {
  interface ClickData {
    name: string;
    clicks: number;
  }

  interface ApiResponse {
    success: boolean;
    message: string;
    data: {
      doordash: ClickData[];
      ubereats: ClickData[];
      shivshakti: ClickData[];
      combined: ClickData[];
    };
  }

  return useQuery<ApiResponse>({
    queryKey: ['totalclicks', button],
    queryFn: () =>
      callApi<ApiResponse>({
        uriEndPoint: totalClicks.getTotalClicks.v1,
        query: { button },
      }),
  });
};
