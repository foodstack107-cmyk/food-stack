/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';

import { Team } from '@/lib/endpoints/team';
import { callApi } from '@/lib/http';

export const useGetAlUsers = (query?: any) => {
  return useQuery({
    queryKey: ['users', query],
    queryFn: () =>
      callApi({
        uriEndPoint: Team.getAllTeam.v1,
        ...(query && { query }),
      }).then((res: any) => res.data),
    staleTime: 1000 * 60 * 5,
  });
};
