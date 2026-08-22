import api from './api';

const careerService = {
  getCareerInsights: async () => {
    const response = await api.get('/career-insights');
    return response.data;
  },
};

export default careerService;
