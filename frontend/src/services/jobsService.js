import api from './api';

const jobsService = {
  getRecommendedJobs: async () => {
    const response = await api.get('/jobs/recommended');
    return response.data;
  },
};

export default jobsService;