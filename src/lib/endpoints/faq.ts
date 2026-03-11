import { defaults } from '@/lib/endpoints/default';

// create faq routes
export const Faq = {
  createFaq: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/api/v1/faq',
    },
  },
  getAllFaq: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/api/v1/faq',
    },
  },

  updateFaq: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/api/v1/faq/:id',
    },
  },
  deleteFaq: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: '/api/v1/faq/:id',
    },
  },
};
