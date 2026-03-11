import { defaults } from '@/lib/endpoints/default';

export const totalClicks = {
  getTotalClicks: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/api/v1/total-clicks',
    },
  },
};
