import api from './api';

const careerService = {
  getCareerInsights: async () => {
    const response = await api.get('/career-insights');
    return response.data;
  },

  /**
   * Fetch available job roles from the taxonomy.
   * Returns { roles: [{ key, label }, ...] }
   */
  getAvailableRoles: async () => {
    const response = await api.get('/interview-questions');
    return response.data;
  },

  /**
   * Generate interview questions for a given role or job description.
   * @param {Object} payload
   * @param {string} [payload.job_role]        - Taxonomy role key (e.g. "junior backend developer")
   * @param {string} [payload.job_description] - Freeform job description text
   */
  generateInterviewQuestions: async (payload) => {
    const response = await api.post('/interview-questions', payload);
    return response.data;
  },
};

export default careerService;
