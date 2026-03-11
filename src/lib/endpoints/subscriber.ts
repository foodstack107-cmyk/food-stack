import { defaults } from '@/lib/endpoints/default';

export const Subscriber = {
  createSubscriber: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/api/v1/subscribers',
    },
  },

  getAllSubscribers: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/api/v1/subscribers',
    },
  },
};
