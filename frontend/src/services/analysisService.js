import api from './api';

const analysisService = {
  analyzeResume: async (resumeId) => {
    const response = await api.post(`/analysis/${resumeId}`);
    return response.data;
  },
};

export default analysisService;