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

  getResumes: async () => {
    const response = await api.get('/resume');
    return response.data;
  },

  deleteResume: async (resumeId) => {
    const response = await api.delete(`/resume/${resumeId}`);
    return response.data;
  },
};

export default resumeService;