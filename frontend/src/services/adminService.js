import api from "./api";

const adminService = {
  // Get system dashboard overview stats
  getStats: async () => {
    const response = await api.get("/admin/stats");
    return response.data;
  },

  // Users management
  getUsers: async () => {
    const response = await api.get("/admin/users");
    return response.data;
  },
  createUser: async (data) => {
    const response = await api.post("/admin/users", data);
    return response.data;
  },
  updateUser: async (data) => {
    const response = await api.put("/admin/users", data);
    return response.data;
  },
  deleteUser: async (id) => {
    const response = await api.delete(`/admin/users?id=${id}`);
    return response.data;
  },

  // Resumes management
  getResumes: async () => {
    const response = await api.get("/admin/resumes");
    return response.data;
  },
  deleteResume: async (id) => {
    const response = await api.delete(`/admin/resumes?id=${id}`);
    return response.data;
  },

  // Jobs management
  getJobs: async () => {
    const response = await api.get("/admin/jobs");
    return response.data;
  },
  createJob: async (data) => {
    const response = await api.post("/admin/jobs", data);
    return response.data;
  },
  updateJob: async (data) => {
    const response = await api.put("/admin/jobs", data);
    return response.data;
  },
  deleteJob: async (id) => {
    const response = await api.delete(`/admin/jobs?id=${id}`);
    return response.data;
  },

  // Skills management
  getSkills: async () => {
    const response = await api.get("/admin/skills");
    return response.data;
  },
  addSkill: async (data) => {
    const response = await api.post("/admin/skills", data);
    return response.data;
  },
  updateSkill: async (data) => {
    const response = await api.put("/admin/skills", data);
    return response.data;
  },
  deleteSkill: async (id) => {
    const response = await api.delete(`/admin/skills?id=${id}`);
    return response.data;
  },

  // Learning resources management
  getResources: async () => {
    const response = await api.get("/admin/resources");
    return response.data;
  },
  addResource: async (data) => {
    const response = await api.post("/admin/resources", data);
    return response.data;
  },
  updateResource: async (data) => {
    const response = await api.put("/admin/resources", data);
    return response.data;
  },
  deleteResource: async (id) => {
    const response = await api.delete(`/admin/resources?id=${id}`);
    return response.data;
  },

  // Bug reports management
  getBugs: async () => {
    const response = await api.get("/admin/bugs");
    return response.data;
  },
  updateBugStatus: async (id, status) => {
    const response = await api.put("/admin/bugs", { id, status });
    return response.data;
  },

  // System settings management
  getSettings: async () => {
    const response = await api.get("/admin/settings");
    return response.data;
  },
  saveSettings: async (data) => {
    const response = await api.post("/admin/settings", data);
    return response.data;
  }
};

export default adminService;
