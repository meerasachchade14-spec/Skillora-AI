import api from './api';

const roadmapService = {
  getRoadmap: async () => {
    const response = await api.get('/roadmap');
    return response.data;
  },

  updateRoadmap: async (data) => {
    const response = await api.put('/roadmap', data);
    return response.data;
  },
};

export default roadmapService;
