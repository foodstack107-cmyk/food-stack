import { defaults } from '@/lib/endpoints/default';

// create faq routes
export const Team = {
  createTeam: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/api/v1/users',
    },
  },
  getAllTeam: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/api/v1/users',
    },
  },
  updateTeam: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/api/v1/users/:id',
    },
  },
  deleteTeam: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: '/api/v1/users/:id',
    },
  },
};
