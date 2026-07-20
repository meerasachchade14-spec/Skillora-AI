import api from './api';

const matcherService = {
  matchSkills: async ({ jobDescription }) => {
    const response = await api.post('/skills/match/', {
      job_description: jobDescription,
    });
    return response.data;
  },
};

export default matcherService;