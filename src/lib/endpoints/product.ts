import { defaults } from '@/lib/endpoints/default';

export const Product = {
  createProduct: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/api/v1/products',
    },
  },
  getAllProducts: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/api/v1/products',
    },
  },
  getProductById: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/products/:id',
    },
  },
  updateProduct: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/api/v1/products/:id',
    },
  },
  deleteProduct: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: '/api/v1/products/:id',
    },
  },

  getCategoryTypePercentage: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/api/v1/products/category-type-percentage',
    },
  },
};
