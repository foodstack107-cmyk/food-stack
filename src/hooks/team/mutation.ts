/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@tanstack/react-query';

import { Team } from '@/lib/endpoints/team';
import { callApi } from '@/lib/http';

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (payload: any) =>
      callApi({
        uriEndPoint: Team.createTeam.v1,
        body: payload,
      }),
  });
};

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: any }) => {
      return await callApi({
        uriEndPoint: Team.updateTeam.v1,
        pathParams: { id },
        body: payload,
      });
    },
  });
};
export function useDeleteUser() {
  return useMutation({
    mutationFn: async (id: string) => {
      return await callApi({
        uriEndPoint: Team.deleteTeam.v1,
        pathParams: { id },
      });
    },
  });
}
