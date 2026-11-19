import api from './api';

const analysisService = {
  /**
   * POST /api/analysis/:resumeId
   * Triggers a fresh analysis (re-runs the full pipeline).
   */
  analyzeResume: async (resumeId, jobDescription = "") => {
    const response = await api.post(`/analysis/${resumeId}`, { jobDescription });
    return response.data;
  },

  /**
   * GET /api/analysis/:resumeId
   * Retrieves a cached analysis result without re-running the pipeline.
   * Falls back to triggering a fresh analysis on the backend if no cache exists.
   */
  getAnalysis: async (resumeId) => {
    const response = await api.get(`/analysis/${resumeId}`);
    return response.data;
  },
};

export default analysisService;