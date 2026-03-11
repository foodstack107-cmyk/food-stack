/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Schedule } from '@/lib/endpoints/schedule';
import { callApi } from '@/lib/http';

import { ISchedule, SchedulePayload } from '@/types/schedule';

export const useSchedules = () => {
  // Fetch all schedules
  const {
    data: schedules = [],
    isLoading,
    error,
  } = useQuery<ISchedule[], Error>({
    queryKey: ['schedules'],
    queryFn: async () =>
      callApi({
        uriEndPoint: Schedule.getAllSchedules.v1,
      }).then((res: any) => res.data),
    staleTime: 1000 * 60 * 5, // 5-minute cache
  });

  const queryClient = useQueryClient();

  // Create a schedule
  const createMutation = useMutation({
    mutationFn: (payload: SchedulePayload) =>
      callApi({
        uriEndPoint: Schedule.createSchedule.v1,
        body: payload,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
    },
  });

  // Update a schedule
  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: SchedulePayload }) =>
      callApi({
        uriEndPoint: Schedule.updateSchedule.v1,
        pathParams: { id },
        body: payload,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
    },
  });

  // Delete a schedule
  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      callApi({
        uriEndPoint: Schedule.deleteSchedule.v1,
        pathParams: { id },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
    },
  });

  return {
    schedules,
    isLoading,
    error,
    addSchedule: createMutation.mutate,
    updateSchedule: updateMutation.mutate,
    deleteSchedule: deleteMutation.mutate,
  };
};
