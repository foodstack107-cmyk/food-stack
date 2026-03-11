// hooks/useAnalytics.ts
import { useQuery } from '@tanstack/react-query';

import { visits } from '@/lib/endpoints/visits';
import { callApi } from '@/lib/http';

type AnalyticsResponse = {
  daily: number;
  weekly: number;
  monthly: number;
  byPage: { page: string; visits: number }[];
  data: {
    date: string;
    visitors: number;
    isToday?: boolean;
    isCurrent?: boolean;
  }[];
};

export const useAnalytics = (timeframe: 'DAILY' | 'WEEKLY' | 'MONTHLY') => {
  return useQuery<AnalyticsResponse>({
    queryKey: ['analytics', timeframe],
    queryFn: () =>
      callApi<AnalyticsResponse>({
        uriEndPoint: visits.getVisitsAnalytics.v1,
        query: { timeframe },
      }),
  });
};
