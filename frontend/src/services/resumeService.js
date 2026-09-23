import api from './api';

const resumeService = {
  uploadResume: async (formData) => {
    const response = await api.post('/resume/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },

  parseToBuilder: async (formData) => {
    const response = await api.post('/resume/parse-to-builder', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getResumes: async () => {
    const response = await api.get('/resume');
    return response.data;
  },

  getResumeDetails: async (resumeId) => {
    const response = await api.get(`/resume/${resumeId}`);
    return response.data;
  },

  updateResume: async (resumeId, formData) => {
    const response = await api.put(`/resume/${resumeId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteResume: async (resumeId) => {
    const response = await api.delete(`/resume/${resumeId}`);
    return response.data;
  },
};

export default resumeService;