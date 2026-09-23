import api from './api';

const analysisService = {
  analyzeResume: async (resumeId, jobDescription = "") => {
    const response = await api.post(`/analysis/${resumeId}`, { jobDescription });
    return response.data;
  },
};

export default analysisService;