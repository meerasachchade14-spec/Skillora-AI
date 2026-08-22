import api from './api';

const matcherService = {
  matchSkills: async (data) => {
    const response = await api.post('/skills/match', data);
    return response.data;
  },

  getMatchHistory: async () => {
    const response = await api.get('/skills/match');
    return response.data;
  },
};

export default matcherService;