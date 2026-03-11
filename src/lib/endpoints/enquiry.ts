import { defaults } from '@/lib/endpoints/default';

export const Enquiry = {
  createEnquiry: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/api/v1/enquiries',
    },
  },
  getAllEnquiries: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/api/v1/enquiries',
    },
  },

  deleteEnquiry: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: '/api/v1/enquiries/:id',
    },
  },
  getWeeklyEnquiryTrend: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/api/v1/enquiries/weekly-enquiry-trend',
    },
  },
};
