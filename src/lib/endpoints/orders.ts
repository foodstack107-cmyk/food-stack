import { defaults } from '@/lib/endpoints/default';

export const Orders = {
  createOrder: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/api/v1/orders',
    },
  },
  getAllOrders: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/api/v1/orders',
    },
  },
  updateOrderStatus: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/api/v1/orders/:id',
    },
  },
};
