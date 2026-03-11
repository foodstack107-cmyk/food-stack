import { defaults } from '@/lib/endpoints/default';

export const Schedule = {
  createSchedule: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/api/v1/schedules',
    },
  },
  getAllSchedules: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/api/v1/schedules',
    },
  },

  updateSchedule: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/api/v1/schedules/:id',
    },
  },
  deleteSchedule: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: '/api/v1/schedules/:id',
    },
  },
};
