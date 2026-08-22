import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import authService from "../../services/authService";
import Skills from "../../components/profile/Skills";
import AIProfileInsights from "../../components/profile/AIProfileInsights";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBirthdayCake,
  FaLinkedin,
  FaGithub,
  FaGraduationCap,
  FaBriefcase,
  FaProjectDiagram,
  FaFilePdf,
  FaLock,
  FaSignOutAlt,
  FaTrash,
  FaBug,
  FaCamera,
  FaUpload,
  FaDownload,
  FaEye,
  FaCalendarAlt,
  FaEdit,
  FaTimes,
  FaPlus,
  FaSave,
  FaInfoCircle,
  FaCertificate,
  FaExternalLinkAlt,
  FaUniversity,
  FaSchool,
  FaCheckCircle,
  FaShieldAlt,
  FaChevronRight,
  FaHeadset,
} from "react-icons/fa";

function Profile() {
  const navigate = useNavigate();
  const { user, logout, updateUser } = useAuth();
  const fileInputRef = useRef(null);
  const resumeInputRef = useRef(null);

  // --- Modal & Edit States ---
  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
  const [personalInfoForm, setPersonalInfoForm] = useState({
    name: "",
    dob: "",
    phone_number: "",
    linkedin: "",
    github: "",
    bio: "",
  });

  const [isEditingSchool, setIsEditingSchool] = useState(false);
  const [schoolForm, setSchoolForm] = useState({
    name: "",
    board: "",
    passing_year: "",
    percentage: "",
  });

  const [isEditingGraduation, setIsEditingGraduation] = useState(false);
  const [graduationForm, setGraduationForm] = useState({
    college: "",
    degree: "",
    branch: "",
    passing_year: "",
    cgpa_percentage: "",
  });

  const [isEditingExperience, setIsEditingExperience] = useState(false);
  const [experienceForm, setExperienceForm] = useState([]);

  const [isEditingProjects, setIsEditingProjects] = useState(false);
  const [projectsForm, setProjectsForm] = useState([]);

  const [isEditingCertifications, setIsEditingCertifications] = useState(false);
  const [certificationsForm, setCertificationsForm] = useState([]);

  // Support modals
  const [isBugModalOpen, setIsBugModalOpen] = useState(false);
  const [bugForm, setBugForm] = useState({ subject: "", description: "" });
  const [bugSubmitting, setBugSubmitting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // --- Action Handlers to populate states only when entering edit mode ---
  const handleEditPersonalInfo = () => {
    if (user) {
      setPersonalInfoForm({
        name: user.name || "",
        dob: user.dob || "",
        phone_number: user.phone_number || "",
        linkedin: user.linkedin || "",
        github: user.github || "",
        bio: user.bio || "",
      });
    }
    setIsEditingPersonalInfo(true);
  };

  const handleEditSchool = () => {
    if (user) {
      setSchoolForm({
        name: user.education?.school?.name || "",
        board: user.education?.school?.board || "",
        passing_year: user.education?.school?.passing_year || "",
        percentage: user.education?.school?.percentage || "",
      });
    }
    setIsEditingSchool(true);
  };

  const handleEditGraduation = () => {
    if (user) {
      setGraduationForm({
        college: user.education?.graduation?.college || "",
        degree: user.education?.graduation?.degree || "",
        branch: user.education?.graduation?.branch || "",
        passing_year: user.education?.graduation?.passing_year || "",
        cgpa_percentage: user.education?.graduation?.cgpa_percentage || "",
      });
    }
    setIsEditingGraduation(true);
  };

  const handleEditExperience = () => {
    setExperienceForm(user?.experience || []);
    setIsEditingExperience(true);
  };

  const handleEditProjects = () => {
    setProjectsForm(user?.projects || []);
    setIsEditingProjects(true);
  };

  const handleEditCertifications = () => {
    setCertificationsForm(user?.certifications || []);
    setIsEditingCertifications(true);
  };

  // --- Dynamic Completion Score Calculation ---
  const calculateCompletion = () => {
    let score = 0;
    // Personal Info (20% total)
    if (user?.name) score += 5;
    if (user?.dob) score += 5;
    if (user?.phone_number) score += 5;
    if (user?.bio) score += 5;

    // Education (20% total)
    if (user?.education?.school?.name) score += 10;
    if (user?.education?.graduation?.college) score += 10;

    // Skills (15% total)
    if (user?.skills && user.skills.length > 0) score += 15;

    // Experience (15% total)
    if (user?.experience && user.experience.length > 0) score += 15;

    // Projects (15% total)
    if (user?.projects && user.projects.length > 0) score += 15;

    // Certifications (10% total)
    if (user?.certifications && user.certifications.length > 0) score += 10;

    // Resume (5% total)
    if (user?.resume?.filename) score += 5;

    return score;
  };

  const completionScore = calculateCompletion();

  // --- Avatar Logic ---
  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Avatar image size must be less than 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = reader.result;
        try {
          const updatedUser = await authService.updateProfile({
            profile_picture: base64Data,
          });
          updateUser(updatedUser);
          toast.success("Profile picture updated!");
        } catch (err) {
          console.error("Error updating profile picture:", err);
          toast.error("Failed to update profile picture.");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = async () => {
    try {
      const updatedUser = await authService.updateProfile({
        profile_picture: null,
      });
      updateUser(updatedUser);
      toast.success("Profile picture removed.");
    } catch (err) {
      console.error("Error removing profile picture:", err);
      toast.error("Failed to remove profile picture.");
    }
  };

  // --- Save Handlers ---
  const handleSavePersonalInfo = async (e) => {
    e.preventDefault();
    if (!personalInfoForm.name || !personalInfoForm.dob || !personalInfoForm.phone_number) {
      toast.error("Please fill in all mandatory fields.");
      return;
    }
    try {
      const updatedUser = await authService.updateProfile(personalInfoForm);
      updateUser(updatedUser);
      setIsEditingPersonalInfo(false);
      toast.success("Personal information updated successfully.");
    } catch (err) {
      console.error("Error saving personal info:", err);
      toast.error("Failed to save personal information.");
    }
  };

  const handleSaveSchool = async (e) => {
    if (e) e.preventDefault();
    try {
      const updatedUser = await authService.updateProfile({
        education: {
          school: schoolForm,
          graduation: user?.education?.graduation || null, // preserve existing graduation
        },
      });
      updateUser(updatedUser);
      setIsEditingSchool(false);
      toast.success("School details saved successfully.");
    } catch (err) {
      console.error("Error saving school details:", err);
      toast.error("Failed to save school details.");
    }
  };

  const handleSaveGraduation = async (e) => {
    if (e) e.preventDefault();
    try {
      const updatedUser = await authService.updateProfile({
        education: {
          school: user?.education?.school || null, // preserve existing school
          graduation: graduationForm,
        },
      });
      updateUser(updatedUser);
      setIsEditingGraduation(false);
      toast.success("Graduation details saved successfully.");
    } catch (err) {
      console.error("Error saving graduation details:", err);
      toast.error("Failed to save graduation details.");
    }
  };

  const handleSaveExperience = async () => {
    try {
      const updatedUser = await authService.updateProfile({
        experience: experienceForm,
      });
      updateUser(updatedUser);
      setIsEditingExperience(false);
      toast.success("Work experience updated.");
    } catch (err) {
      console.error("Error saving experience details:", err);
      toast.error("Failed to save experience details.");
    }
  };

  const handleSaveProjects = async () => {
    try {
      const updatedUser = await authService.updateProfile({
        projects: projectsForm,
      });
      updateUser(updatedUser);
      setIsEditingProjects(false);
      toast.success("Projects list updated successfully.");
    } catch (err) {
      console.error("Error saving projects:", err);
      toast.error("Failed to save projects.");
    }
  };

  const handleSaveCertifications = async () => {
    try {
      const updatedUser = await authService.updateProfile({
        certifications: certificationsForm,
      });
      updateUser(updatedUser);
      setIsEditingCertifications(false);
      toast.success("Certifications list updated successfully.");
    } catch (err) {
      console.error("Error saving certifications:", err);
      toast.error("Failed to save certifications.");
    }
  };

  // --- Experience Helper Actions ---
  const addExperienceItem = () => {
    setExperienceForm([
      ...experienceForm,
      {
        company: "",
        role: "",
        employment_type: "Full-time",
        start_date: "",
        end_date: "",
        is_present: false,
        description: "",
      },
    ]);
  };

  const removeExperienceItem = (index) => {
    setExperienceForm(experienceForm.filter((_, i) => i !== index));
  };

  const updateExperienceItem = (index, field, value) => {
    const updated = [...experienceForm];
    updated[index] = { ...updated[index], [field]: value };
    setExperienceForm(updated);
  };

  // --- Projects Helper Actions ---
  const addProjectItem = () => {
    setProjectsForm([
      ...projectsForm,
      {
        title: "",
        duration: "",
        description: "",
        technologies: "",
        github: "",
        live: "",
      },
    ]);
  };

  const removeProjectItem = (index) => {
    setProjectsForm(projectsForm.filter((_, i) => i !== index));
  };

  const updateProjectItem = (index, field, value) => {
    const updated = [...projectsForm];
    updated[index] = { ...updated[index], [field]: value };
    setProjectsForm(updated);
  };

  // --- Certifications Helper Actions ---
  const addCertificationItem = () => {
    setCertificationsForm([
      ...certificationsForm,
      {
        name: "",
        issuer: "",
        issue_date: "",
        expiration_date: "",
        is_never_expire: false,
        credential_id: "",
        credential_url: "",
      },
    ]);
  };

  const removeCertificationItem = (index) => {
    setCertificationsForm(certificationsForm.filter((_, i) => i !== index));
  };

  const updateCertificationItem = (index, field, value) => {
    const updated = [...certificationsForm];
    updated[index] = { ...updated[index], [field]: value };
    setCertificationsForm(updated);
  };

  // --- Resume Manager Logic ---
  const triggerResumeUpload = () => {
    resumeInputRef.current.click();
  };

  const handleResumeChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== "application/pdf") {
        toast.error("Please upload a PDF format resume.");
        return;
      }
      const loadToast = toast.loading("Uploading and analyzing resume...");
      setTimeout(async () => {
        toast.dismiss(loadToast);
        const score = Math.floor(Math.random() * 20) + 76; // Generate 76 - 95
        const uploadDate = new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
        const resumePayload = {
          filename: file.name,
          atsScore: score,
          uploadDate: uploadDate,
        };
        try {
          const updatedUser = await authService.updateProfile({
            resume: resumePayload,
          });
          updateUser(updatedUser);
          toast.success(`Resume uploaded! ATS Score: ${score}%`);
        } catch (err) {
          console.error("Error uploading resume:", err);
          toast.error("Failed to persist resume upload.");
        }
      }, 2000);
    }
  };

  const handleDownloadResume = () => {
    if (!user?.resume?.filename) {
      toast.error("No resume available to download.");
      return;
    }
    // Simulate direct download
    const element = document.createElement("a");
    const file = new Blob(["Academic project resume file placeholder"], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = user.resume.filename;
    document.body.appendChild(element);
    element.click();
    toast.success("Resume downloaded successfully!");
  };

  const handleDeleteResume = async () => {
    try {
      const updatedUser = await authService.updateProfile({
        resume: null,
      });
      updateUser(updatedUser);
      toast.success("Resume deleted successfully.");
    } catch (err) {
      console.error("Error deleting resume:", err);
      toast.error("Failed to delete resume.");
    }
  };

  // --- Security & Support Actions ---
  const handleReportBug = async (e) => {
    e.preventDefault();
    if (!bugForm.subject || !bugForm.description) {
      toast.error("All bug report fields are required.");
      return;
    }
    setBugSubmitting(true);
    try {
      await authService.reportBug(bugForm);
      toast.success("Bug report submitted to meera.ldrp.7@gmail.com!");
      setIsBugModalOpen(false);
      setBugForm({ subject: "", description: "" });
    } catch (err) {
      console.error("Error reporting bug:", err);
      toast.error("Failed to submit bug report.");
    } finally {
      setBugSubmitting(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await authService.deleteAccount();
      toast.success("Your account has been deleted permanently.");
      setShowDeleteConfirm(false);
      logout();
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Error deleting account:", err);
      toast.error("Failed to delete account. Please try again.");
    }
  };

  // Personal Info Form Validation
  const isPersonalInfoSaveDisabled = !personalInfoForm.name || !personalInfoForm.dob || !personalInfoForm.phone_number;

  return (
    <div className="space-y-6 pb-16 relative">
      {/* Decorative background ambient glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Main Responsive Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ================= LEFT COLUMN (~35% -> lg:col-span-4) ================= */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* 1. Profile Header Card */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 relative overflow-hidden transition-all duration-300 hover:shadow-md text-center">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500" />
            
            {/* Avatar block */}
            <div className="flex flex-col items-center gap-4 mt-2">
              <div className="relative group cursor-pointer inline-block" onClick={handleAvatarClick}>
                {user?.profile_picture ? (
                  <img
                    src={user.profile_picture}
                    alt={user?.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md transition-transform duration-300 group-hover:scale-105 group-hover:brightness-90"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black text-2xl shadow-md border-4 border-white transition-transform duration-300 group-hover:scale-105">
                    {user?.name
                      ? user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                          .substring(0, 2)
                      : "US"}
                  </div>
                )}
                
                {/* Floating Camera Button */}
                <div className="absolute bottom-0 right-0 w-7 h-7 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-md border-2 border-white transition-colors duration-200">
                  <FaCamera size={10} />
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleAvatarChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              {/* Name and badge */}
              <div className="space-y-1">
                <h1 className="text-lg font-bold text-slate-900 tracking-tight leading-tight">
                  {user?.name || "Skillora User"}
                </h1>
                <div className="inline-block mt-0.5">
                  <span className="bg-blue-50 text-blue-600 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-blue-100 uppercase tracking-wider">
                    Premium User
                  </span>
                </div>
              </div>

              {/* Email */}
              <p className="text-slate-500 font-medium text-xs flex items-center gap-1.5 justify-center">
                <FaEnvelope className="text-blue-500" /> {user?.email}
              </p>
              
              {/* Photo Actions */}
              <div className="flex items-center gap-2 justify-center pt-1 w-full">
                <button
                  onClick={handleAvatarClick}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold rounded-lg transition duration-200 cursor-pointer shadow-xs flex items-center gap-1 border-0"
                >
                  <FaUpload size={10} /> Upload
                </button>
                {user?.profile_picture && (
                  <button
                    onClick={handleRemoveAvatar}
                    className="px-3 py-1.5 bg-white hover:bg-red-50 text-red-600 border border-red-100 text-[11px] font-bold rounded-lg transition duration-200 cursor-pointer shadow-xs flex items-center gap-1"
                  >
                    <FaTrash size={10} /> Remove
                  </button>
                )}
              </div>
            </div>

            {/* Profile Strength Badge */}
            <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-4 shadow-2xs space-y-2 mt-6 text-left">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Profile strength
                </span>
                <span className="bg-sky-100 text-sky-800 text-sky-700 text-[10px] font-black px-2 py-0.5 rounded border border-sky-100">
                  {completionScore}%
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-sky-400 transition-all duration-500"
                  style={{ width: `${completionScore}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                <FaCheckCircle className="text-emerald-500 shrink-0" size={11} /> Complete all cards to hit 100%!
              </p>
            </div>
          </div>

          {/* 2. Personal Information Card */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 transition-all duration-300 hover:shadow-md">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm border border-blue-100">
                  <FaUser />
                </div>
                <h2 className="text-sm font-bold text-slate-800 tracking-tight">
                  Personal Info
                </h2>
              </div>
              {!isEditingPersonalInfo ? (
                <button
                  onClick={handleEditPersonalInfo}
                  className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-blue-55 text-blue-600 border border-blue-100 rounded-lg hover:bg-blue-600 hover:text-white transition duration-200 shadow-2xs cursor-pointer"
                >
                  <FaEdit size={10} /> Edit
                </button>
              ) : (
                <button
                  onClick={() => setIsEditingPersonalInfo(false)}
                  className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-slate-50 text-slate-500 border border-slate-200 rounded-lg hover:bg-slate-100 transition duration-200 shadow-2xs cursor-pointer"
                >
                  <FaTimes size={10} /> Cancel
                </button>
              )}
            </div>

            {!isEditingPersonalInfo ? (
              <div className="space-y-3.5 text-left">
                <div className="grid grid-cols-1 gap-2.5">
                  <div className="bg-slate-50/30 rounded-xl p-3 border border-slate-100">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                      Full Name *
                    </span>
                    <span className="text-slate-800 font-bold block mt-0.5 text-xs">
                      {user?.name}
                    </span>
                  </div>
                  <div className="bg-slate-50/30 rounded-xl p-3 border border-slate-100">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                      Email Address (Read Only)
                    </span>
                    <span className="text-slate-500 font-medium block mt-0.5 text-xs truncate">
                      {user?.email}
                    </span>
                  </div>
                  <div className="bg-slate-50/30 rounded-xl p-3 border border-slate-100">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
                      <FaBirthdayCake className="text-slate-400" size={10} /> Date of Birth *
                    </span>
                    <span className="text-slate-800 font-bold block mt-0.5 text-xs">
                      {user?.dob || "Not specified"}
                    </span>
                  </div>
                  <div className="bg-slate-50/30 rounded-xl p-3 border border-slate-100">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
                      <FaPhone className="text-slate-400" size={10} /> Phone Number *
                    </span>
                    <span className="text-slate-800 font-bold block mt-0.5 text-xs">
                      {user?.phone_number || "Not specified"}
                    </span>
                  </div>
                  <div className="bg-slate-50/30 rounded-xl p-3 border border-slate-100">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
                      <FaLinkedin className="text-blue-500" size={10} /> LinkedIn URL
                    </span>
                    {user?.linkedin ? (
                      <a
                        href={user.linkedin}
            
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-650 font-bold block mt-0.5 hover:underline truncate text-xs"
                      >
                        {user.linkedin}
                      </a>
                    ) : (
                      <span className="text-slate-400 font-medium block mt-0.5 text-xs">
                        Not specified
                      </span>
                    )}
                  </div>
                  <div className="bg-slate-50/30 rounded-xl p-3 border border-slate-100">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
                      <FaGithub className="text-slate-800" size={10} /> GitHub URL
                    </span>
                    {user?.github ? (
                      <a
                        href={user.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-800 font-bold block mt-0.5 hover:underline truncate text-xs"
                      >
                        {user.github}
                      </a>
                    ) : (
                      <span className="text-slate-400 font-medium block mt-0.5 text-xs">
                        Not specified
                      </span>
                    )}
                  </div>
                </div>

                <div className="bg-blue-50/30 rounded-xl p-4 border border-blue-100/50 mt-1">
                  <span className="text-[9px] font-bold text-blue-600 uppercase tracking-wider block">
                    Bio Summary
                  </span>
                  <p className="text-slate-700 mt-1 text-xs leading-relaxed whitespace-pre-wrap font-medium">
                    {user?.bio || "No professional bio added yet."}
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSavePersonalInfo} className="space-y-4 text-left">
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={personalInfoForm.name}
                      onChange={(e) =>
                        setPersonalInfoForm({
                          ...personalInfoForm,
                          name: e.target.value,
                        })
                      }
                      className={`w-full bg-slate-50 border rounded-xl px-3.5 py-2 text-slate-900 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition duration-200 text-xs font-semibold ${
                        !personalInfoForm.name ? "border-red-200 bg-red-50/10" : "border-slate-200"
                      }`}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Email (Read Only)
                    </label>
                    <input
                      type="email"
                      disabled
                      value={user?.email || ""}
                      className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-400 font-bold cursor-not-allowed outline-none text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      required
                      value={personalInfoForm.dob}
                      onChange={(e) =>
                        setPersonalInfoForm({
                          ...personalInfoForm,
                          dob: e.target.value,
                        })
                      }
                      className={`w-full bg-slate-50 border rounded-xl px-3.5 py-2 text-slate-900 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition duration-200 text-xs font-semibold ${
                        !personalInfoForm.dob ? "border-red-200 bg-red-50/10" : "border-slate-200"
                      }`}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={personalInfoForm.phone_number}
                      onChange={(e) =>
                        setPersonalInfoForm({
                          ...personalInfoForm,
                          phone_number: e.target.value,
                        })
                      }
                      className={`w-full bg-slate-50 border rounded-xl px-3.5 py-2 text-slate-900 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition duration-200 text-xs font-semibold ${
                        !personalInfoForm.phone_number ? "border-red-200 bg-red-50/10" : "border-slate-200"
                      }`}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">
                      LinkedIn URL
                    </label>
                    <input
                      type="url"
                      value={personalInfoForm.linkedin}
                      onChange={(e) =>
                        setPersonalInfoForm({
                          ...personalInfoForm,
                          linkedin: e.target.value,
                        })
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition duration-200 text-xs font-semibold"
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      value={personalInfoForm.github}
                      onChange={(e) =>
                        setPersonalInfoForm({
                          ...personalInfoForm,
                          github: e.target.value,
                        })
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition duration-200 text-xs font-semibold"
                      placeholder="https://github.com/username"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">
                      Bio Summary
                    </label>
                    <textarea
                      rows="3"
                      value={personalInfoForm.bio}
                      onChange={(e) =>
                        setPersonalInfoForm({
                          ...personalInfoForm,
                          bio: e.target.value,
                        })
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition duration-200 text-xs font-semibold resize-none"
                      placeholder="Brief description about your career..."
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-1">
                  {isPersonalInfoSaveDisabled && (
                    <span className="text-[10px] text-red-500 font-bold">
                      ⚠️ Name, DOB and Phone are required.
                    </span>
                  )}
                  <button
                    type="submit"
                    disabled={isPersonalInfoSaveDisabled}
                    className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-xs hover:brightness-105 transition duration-200 cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed text-xs border-0"
                  >
                    <FaSave size={11} /> Save Personal Info
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* 3. School Education Card */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 relative hover:shadow-md transition-all duration-300 text-left">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm border border-indigo-100">
                  <FaSchool />
                </div>
                <h3 className="text-sm font-bold text-slate-800">
                  School Education
                </h3>
              </div>
              {!isEditingSchool ? (
                <button
                  onClick={handleEditSchool}
                  className="text-blue-600 hover:text-blue-700 text-[11px] font-semibold flex items-center gap-1 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100 transition cursor-pointer"
                >
                  <FaEdit size={10} /> Edit
                </button>
              ) : (
                <button
                  onClick={() => setIsEditingSchool(false)}
                  className="text-slate-500 hover:text-slate-600 text-[11px] font-semibold flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100 transition cursor-pointer"
                >
                  <FaTimes size={10} /> Cancel
                </button>
              )}
            </div>

            {!isEditingSchool ? (
              <div className="space-y-2.5 text-xs pt-1">
                <p className="text-slate-600 flex justify-between">
                  <span className="font-bold text-slate-400">School Name:</span>
                  <span className="font-bold text-slate-700 text-right max-w-[160px] truncate">{user?.education?.school?.name || "Not specified"}</span>
                </p>
                <p className="text-slate-600 flex justify-between">
                  <span className="font-bold text-slate-400">Board:</span>
                  <span className="font-bold text-slate-700">{user?.education?.school?.board || "Not specified"}</span>
                </p>
                <p className="text-slate-600 flex justify-between">
                  <span className="font-bold text-slate-400">Passing Year:</span>
                  <span className="font-bold text-slate-700">{user?.education?.school?.passing_year || "Not specified"}</span>
                </p>
                <p className="text-slate-600 flex justify-between">
                  <span className="font-bold text-slate-400">Percentage/CGPA:</span>
                  <span className="font-extrabold text-blue-600">{user?.education?.school?.percentage || "Not specified"}</span>
                </p>
              </div>
            ) : (
              <form onSubmit={handleSaveSchool} className="space-y-3 pt-1 text-left">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-600 uppercase tracking-wider block">School Name</label>
                  <input
                    type="text"
                    required
                    value={schoolForm.name}
                    onChange={(e) => setSchoolForm({ ...schoolForm, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:border-blue-500 focus:bg-white outline-none text-xs font-semibold transition"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-600 uppercase tracking-wider block">Board</label>
                  <input
                    type="text"
                    placeholder="e.g. CBSE, ICSE, State Board"
                    value={schoolForm.board}
                    onChange={(e) => setSchoolForm({ ...schoolForm, board: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:border-blue-500 focus:bg-white outline-none text-xs font-semibold transition"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-600 uppercase tracking-wider block">Passing Year</label>
                    <input
                      type="text"
                      value={schoolForm.passing_year}
                      onChange={(e) => setSchoolForm({ ...schoolForm, passing_year: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:border-blue-500 focus:bg-white outline-none text-xs font-semibold transition"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-600 uppercase tracking-wider block">Percentage</label>
                    <input
                      type="text"
                      value={schoolForm.percentage}
                      onChange={(e) => setSchoolForm({ ...schoolForm, percentage: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:border-blue-500 focus:bg-white outline-none text-xs font-semibold transition"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full mt-2 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 shadow-xs hover:scale-[1.01] border-0"
                >
                  <FaSave size={10} /> Save School Info
                </button>
              </form>
            )}
          </div>

          {/* 4. College Education Card */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 relative hover:shadow-md transition-all duration-300 text-left">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm border border-blue-100">
                  <FaUniversity />
                </div>
                <h3 className="text-sm font-bold text-slate-800">
                  College Education
                </h3>
              </div>
              {!isEditingGraduation ? (
                <button
                  onClick={handleEditGraduation}
                  className="text-blue-600 hover:text-blue-700 text-[11px] font-semibold flex items-center gap-1 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100 transition cursor-pointer"
                >
                  <FaEdit size={10} /> Edit
                </button>
              ) : (
                <button
                  onClick={() => setIsEditingGraduation(false)}
                  className="text-slate-500 hover:text-slate-600 text-[11px] font-semibold flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100 transition cursor-pointer"
                >
                  <FaTimes size={10} /> Cancel
                </button>
              )}
            </div>

            {!isEditingGraduation ? (
              <div className="space-y-2.5 text-xs pt-1">
                <p className="text-slate-600 flex justify-between">
                  <span className="font-bold text-slate-400">College Name:</span>
                  <span className="font-bold text-slate-700 text-right max-w-[160px] truncate">{user?.education?.graduation?.college || "Not specified"}</span>
                </p>
                <p className="text-slate-600 flex justify-between">
                  <span className="font-bold text-slate-400">Degree:</span>
                  <span className="font-bold text-slate-700">{user?.education?.graduation?.degree || "Not specified"}</span>
                </p>
                <p className="text-slate-600 flex justify-between">
                  <span className="font-bold text-slate-400">Branch:</span>
                  <span className="font-bold text-slate-700">{user?.education?.graduation?.branch || "Not specified"}</span>
                </p>
                <p className="text-slate-600 flex justify-between">
                  <span className="font-bold text-slate-400">Passing Year:</span>
                  <span className="font-bold text-slate-700">{user?.education?.graduation?.passing_year || "Not specified"}</span>
                </p>
                <p className="text-slate-600 flex justify-between">
                  <span className="font-bold text-slate-400">CGPA / %:</span>
                  <span className="font-extrabold text-blue-600">{user?.education?.graduation?.cgpa_percentage || "Not specified"}</span>
                </p>
              </div>
            ) : (
              <form onSubmit={handleSaveGraduation} className="space-y-3 pt-1 text-left">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-600 uppercase tracking-wider block">College Name</label>
                  <input
                    type="text"
                    required
                    value={graduationForm.college}
                    onChange={(e) => setGraduationForm({ ...graduationForm, college: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:border-blue-500 focus:bg-white outline-none text-xs font-semibold transition"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-600 uppercase tracking-wider block">Degree</label>
                    <input
                      type="text"
                      placeholder="e.g. B.Tech, BE, BCA"
                      value={graduationForm.degree}
                      onChange={(e) => setGraduationForm({ ...graduationForm, degree: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:border-blue-500 focus:bg-white outline-none text-xs font-semibold transition"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-600 uppercase tracking-wider block">Branch</label>
                    <input
                      type="text"
                      placeholder="e.g. CSE, IT, ECE"
                      value={graduationForm.branch}
                      onChange={(e) => setGraduationForm({ ...graduationForm, branch: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:border-blue-500 focus:bg-white outline-none text-xs font-semibold transition"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-600 uppercase tracking-wider block">Passing Year</label>
                    <input
                      type="text"
                      value={graduationForm.passing_year}
                      onChange={(e) => setGraduationForm({ ...graduationForm, passing_year: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:border-blue-500 focus:bg-white outline-none text-xs font-semibold transition"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-600 uppercase tracking-wider block">CGPA / %</label>
                    <input
                      type="text"
                      value={graduationForm.cgpa_percentage}
                      onChange={(e) => setGraduationForm({ ...graduationForm, cgpa_percentage: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:border-blue-500 focus:bg-white outline-none text-xs font-semibold transition"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full mt-2 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 shadow-xs hover:scale-[1.01] border-0"
                >
                  <FaSave size={10} /> Save Graduation Info
                </button>
              </form>
            )}
          </div>

          {/* 5. Experience Card */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 transition-all duration-300 hover:shadow-md">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm border border-blue-100">
                  <FaBriefcase />
                </div>
                <h2 className="text-sm font-bold text-slate-800 tracking-tight">
                  Experience
                </h2>
              </div>
              {!isEditingExperience ? (
                <button
                  onClick={handleEditExperience}
                  className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-blue-50 text-blue-600 border border-blue-100 rounded-lg hover:bg-blue-600 hover:text-white transition duration-200 shadow-2xs cursor-pointer"
                >
                  <FaEdit size={10} /> Edit
                </button>
              ) : (
                <button
                  onClick={handleSaveExperience}
                  className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-green-50 text-green-700 border border-green-100 rounded-lg hover:bg-green-600 hover:text-white transition duration-200 shadow-2xs cursor-pointer"
                >
                  <FaSave size={10} /> Save
                </button>
              )}
            </div>

            {!isEditingExperience ? (
              <div className="space-y-4 text-left">
                {(!user?.experience || user.experience.length === 0) ? (
                  <p className="text-slate-400 text-xs italic py-2">
                    No work experience added yet. Click edit to add.
                  </p>
                ) : (
                  <div className="relative border-l-2 border-slate-100 pl-4 space-y-4 ml-2">
                    {user.experience.map((exp, idx) => (
                      <div key={idx} className="relative">
                        <div className="absolute -left-[23px] top-1.5 w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow-xs" />
                        <div className="bg-slate-50/50 rounded-xl p-3 border border-slate-200 transition-all hover:bg-slate-50/80">
                          <h3 className="text-xs font-bold text-slate-800">
                            {exp.role}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2 text-[9px] font-bold text-slate-500 mt-1">
                            <span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded border border-blue-100/50">
                              {exp.company}
                            </span>
                            <span>•</span>
                            <span>{exp.employment_type}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <FaCalendarAlt className="text-slate-400" size={8} /> {exp.start_date} -{" "}
                              {exp.is_present ? "Present" : exp.end_date}
                            </span>
                          </div>
                          <p className="text-slate-600 text-xs mt-2 leading-relaxed whitespace-pre-wrap font-medium">
                            {exp.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {experienceForm.map((exp, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-slate-50/50 rounded-xl border border-slate-200 relative space-y-3 text-left"
                  >
                    <button
                      onClick={() => removeExperienceItem(idx)}
                      className="absolute top-3 right-3 text-slate-450 hover:text-red-500 transition cursor-pointer bg-transparent border-0 outline-none"
                      title="Remove Role"
                    >
                      <FaTrash size={12} />
                    </button>
                    <h3 className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                      Position #{idx + 1}
                    </h3>
                    <div className="space-y-2">
                      <div className="space-y-0.5">
                        <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">
                          Company Name
                        </label>
                        <input
                          type="text"
                          required
                          value={exp.company}
                          onChange={(e) =>
                            updateExperienceItem(idx, "company", e.target.value)
                          }
                          className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:border-blue-500 outline-none text-xs font-semibold transition"
                        />
                      </div>
                      <div className="space-y-0.5">
                        <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">
                          Job Title / Role
                        </label>
                        <input
                          type="text"
                          required
                          value={exp.role}
                          onChange={(e) =>
                            updateExperienceItem(idx, "role", e.target.value)
                          }
                          className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:border-blue-500 outline-none text-xs font-semibold transition"
                        />
                      </div>
                      <div className="space-y-0.5">
                        <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">
                          Employment Type
                        </label>
                        <select
                          value={exp.employment_type}
                          onChange={(e) =>
                            updateExperienceItem(
                              idx,
                              "employment_type",
                              e.target.value
                            )
                          }
                          className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:border-blue-500 outline-none text-xs font-semibold transition"
                        >
                          <option value="Full-time">Full-time</option>
                          <option value="Part-time">Part-time</option>
                          <option value="Internship">Internship</option>
                          <option value="Freelance">Freelance</option>
                          <option value="Contract">Contract</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-0.5">
                          <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">
                            Start Date
                          </label>
                          <input
                            type="text"
                            placeholder="Jan 2024"
                            required
                            value={exp.start_date}
                            onChange={(e) =>
                              updateExperienceItem(
                                idx,
                                "start_date",
                                e.target.value
                              )
                            }
                            className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:border-blue-500 outline-none text-xs font-semibold transition"
                          />
                        </div>
                        <div className="space-y-0.5">
                          <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">
                            End Date
                          </label>
                          <input
                            type="text"
                            placeholder="Present"
                            disabled={exp.is_present}
                            value={exp.is_present ? "" : exp.end_date}
                            onChange={(e) =>
                              updateExperienceItem(
                                idx,
                                "end_date",
                                e.target.value
                              )
                            }
                            className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:border-blue-500 outline-none text-xs font-semibold transition disabled:bg-slate-100 disabled:cursor-not-allowed"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`is_present_${idx}`}
                        checked={exp.is_present}
                        onChange={(e) =>
                          updateExperienceItem(
                            idx,
                            "is_present",
                            e.target.checked
                          )
                        }
                        className="rounded text-blue-600 focus:ring-blue-500/20 border-slate-300 w-3.5 h-3.5"
                      />
                      <label
                        htmlFor={`is_present_${idx}`}
                        className="text-[10px] font-bold text-slate-700 select-none cursor-pointer"
                      >
                        I currently work in this role
                      </label>
                    </div>

                    <div className="space-y-0.5">
                      <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">
                        Description
                      </label>
                      <textarea
                        rows="3"
                        required
                        value={exp.description}
                        onChange={(e) =>
                          updateExperienceItem(
                            idx,
                            "description",
                            e.target.value
                          )
                        }
                        className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 outline-none text-xs font-semibold resize-none transition focus:border-blue-500"
                        placeholder="Detail your projects, tasks, and accomplishments..."
                      />
                    </div>
                  </div>
                ))}

                <div className="flex flex-col gap-2 pt-1">
                  <button
                    onClick={addExperienceItem}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100 rounded-xl hover:bg-blue-600 hover:text-white transition duration-200 cursor-pointer shadow-xs"
                  >
                    <FaPlus size={10} /> Add New Position
                  </button>
                  <button
                    onClick={handleSaveExperience}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-xs hover:brightness-105 transition duration-200 cursor-pointer border-0"
                  >
                    <FaSave size={10} /> Save Experience Changes
                  </button>
                </div>
              </div>
            )}
          </div>

{/* 4. Academic Projects Card */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 transition-all duration-300 hover:shadow-md">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm border border-blue-100">
                  <FaProjectDiagram />
                </div>
                <h2 className="text-sm font-bold text-slate-800 tracking-tight">
                  Academic Projects
                </h2>
              </div>
              {!isEditingProjects ? (
                <button
                  onClick={handleEditProjects}
                  className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-blue-50 text-blue-600 border border-blue-100 rounded-lg hover:bg-blue-600 hover:text-white transition duration-200 shadow-2xs cursor-pointer"
                >
                  <FaEdit size={10} /> Edit Projects
                </button>
              ) : (
                <button
                  onClick={handleSaveProjects}
                  className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-green-50 text-green-700 border border-green-100 rounded-lg hover:bg-green-600 hover:text-white transition duration-200 shadow-2xs cursor-pointer"
                >
                  <FaSave size={10} /> Save Projects
                </button>
              )}
            </div>

            {!isEditingProjects ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                {(!user?.projects || user.projects.length === 0) ? (
                  <p className="text-slate-400 text-xs italic col-span-2 py-2">
                    No academic projects listed yet. Click edit to add projects.
                  </p>
                ) : (
                  user.projects.map((proj, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-50/30 rounded-xl p-4 border border-slate-200 hover:shadow-xs transition duration-300 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-xs font-bold text-slate-800 truncate max-w-[160px]">
                            {proj.title}
                          </h3>
                          {proj.duration && (
                            <span className="text-[9px] font-bold bg-slate-150 text-slate-500 px-1.5 py-0.5 rounded">
                              {proj.duration}
                            </span>
                          )}
                        </div>
                        <p className="text-slate-600 text-xs leading-relaxed mb-3 whitespace-pre-wrap font-medium">
                          {proj.description}
                        </p>
                        {proj.technologies && (
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {proj.technologies.split(",").map((tech, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[9px] font-bold border border-blue-100/50"
                              >
                                {tech.trim()}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2 pt-1 border-t border-slate-100/60">
                        {proj.github && (
                          <a
                            href={proj.github}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold bg-slate-800 hover:bg-slate-900 text-white rounded transition text-decoration-none"
                          >
                            <FaGithub size={10} /> GitHub
                          </a>
                        )}
                        {proj.live && (
                          <a
                            href={proj.live}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold bg-gradient-to-r from-sky-400 to-blue-500 hover:brightness-105 text-white rounded shadow-2xs transition text-decoration-none"
                          >
                            <FaEye size={10} /> Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {projectsForm.map((proj, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-slate-50/50 rounded-xl border border-slate-200 relative space-y-3 text-left"
                  >
                    <button
                      onClick={() => removeProjectItem(idx)}
                      className="absolute top-3 right-3 text-slate-450 hover:text-red-500 transition cursor-pointer bg-transparent border-0 outline-none"
                      title="Remove Project"
                    >
                      <FaTrash size={12} />
                    </button>
                    <h3 className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                      Project #{idx + 1}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-0.5">
                        <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">
                          Project Name
                        </label>
                        <input
                          type="text"
                          required
                          value={proj.title}
                          onChange={(e) =>
                            updateProjectItem(idx, "title", e.target.value)
                          }
                          className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:border-blue-500 outline-none text-xs font-semibold transition"
                        />
                      </div>
                      <div className="space-y-0.5">
                        <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">
                          Duration
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 2024 (or May 2024)"
                          value={proj.duration}
                          onChange={(e) =>
                            updateProjectItem(idx, "duration", e.target.value)
                          }
                          className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:border-blue-500 outline-none text-xs font-semibold transition"
                        />
                      </div>
                      <div className="space-y-0.5">
                        <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">
                          GitHub Link
                        </label>
                        <input
                          type="url"
                          value={proj.github}
                          onChange={(e) =>
                            updateProjectItem(idx, "github", e.target.value)
                          }
                          className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:border-blue-500 outline-none text-xs font-semibold transition"
                        />
                      </div>
                      <div className="space-y-0.5">
                        <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">
                          Live Demo URL
                        </label>
                        <input
                          type="url"
                          value={proj.live}
                          onChange={(e) =>
                            updateProjectItem(idx, "live", e.target.value)
                          }
                          className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:border-blue-500 outline-none text-xs font-semibold transition"
                        />
                      </div>
                    </div>

                    <div className="space-y-0.5">
                      <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">
                        Tech Stack (comma separated)
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="React, Node.js, Express, MongoDB"
                        value={proj.technologies}
                        onChange={(e) =>
                          updateProjectItem(idx, "technologies", e.target.value)
                        }
                        className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:border-blue-500 outline-none text-xs font-semibold transition"
                      />
                    </div>

                    <div className="space-y-0.5">
                      <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">
                        Description
                      </label>
                      <textarea
                        rows="3"
                        required
                        value={proj.description}
                        onChange={(e) =>
                          updateProjectItem(idx, "description", e.target.value)
                        }
                        className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 outline-none text-xs font-semibold resize-none transition focus:border-blue-500"
                        placeholder="Describe the application goals, technical highlights..."
                      />
                    </div>
                  </div>
                ))}

                <div className="flex flex-col gap-2 pt-1">
                  <button
                    onClick={addProjectItem}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100 rounded-xl hover:bg-blue-600 hover:text-white transition duration-200 cursor-pointer shadow-xs"
                  >
                    <FaPlus size={10} /> Add Project
                  </button>
                  <button
                    onClick={handleSaveProjects}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-xs hover:brightness-105 transition duration-200 cursor-pointer border-0"
                  >
                    <FaSave size={10} /> Save Projects Changes
                  </button>
                </div>
              </div>
            )}
          </div>

{/* 5. Certifications Card */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 transition-all duration-300 hover:shadow-md">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm border border-blue-100">
                  <FaCertificate />
                </div>
                <h2 className="text-sm font-bold text-slate-800 tracking-tight">
                  Certifications
                </h2>
              </div>
              {!isEditingCertifications ? (
                <button
                  onClick={handleEditCertifications}
                  className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-blue-50 text-blue-600 border border-blue-100 rounded-lg hover:bg-blue-600 hover:text-white transition duration-200 shadow-2xs cursor-pointer"
                >
                  <FaEdit size={10} /> Edit Certifications
                </button>
              ) : (
                <button
                  onClick={handleSaveCertifications}
                  className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-green-50 text-green-700 border border-green-100 rounded-lg hover:bg-green-600 hover:text-white transition duration-200 shadow-2xs cursor-pointer"
                >
                  <FaSave size={10} /> Save Certifications
                </button>
              )}
            </div>

            {!isEditingCertifications ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                {(!user?.certifications || user.certifications.length === 0) ? (
                  <p className="text-slate-400 text-xs italic col-span-2 py-2">
                    No certifications listed yet. Click edit to add certifications.
                  </p>
                ) : (
                  user.certifications.map((cert, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-50/30 rounded-xl p-4 border border-slate-200 hover:shadow-xs transition duration-300 flex flex-col justify-between"
                    >
                      <div>
                        <h3 className="text-xs font-bold text-slate-800 truncate">
                          {cert.name || "Untitled Certification"}
                        </h3>
                        <p className="text-[11px] font-bold text-slate-400 mt-0.5">
                          {cert.issuer || "Unknown Issuer"}
                        </p>
                        <div className="mt-3 space-y-1.5 text-[11px] text-slate-500 font-medium border-t border-slate-100 pt-2">
                          <p className="flex justify-between">
                            <span className="text-slate-400">Issued:</span>
                            <span className="text-slate-700">{cert.issue_date || "Not specified"}</span>
                          </p>
                          <p className="flex justify-between">
                            <span className="text-slate-400">Expires:</span>
                            <span className="text-slate-700">
                              {cert.is_never_expire ? "Never Expires" : (cert.expiration_date || "Not specified")}
                            </span>
                          </p>
                        </div>
                      </div>

                      {cert.credential_url && (
                        <div className="mt-3 pt-2 border-t border-slate-100/60">
                          <a
                            href={cert.credential_url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100 rounded hover:bg-blue-600 hover:text-white transition duration-200 shadow-2xs text-decoration-none"
                          >
                            <FaExternalLinkAlt size={8} /> Verify
                          </a>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {certificationsForm.map((cert, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-slate-50/50 rounded-xl border border-slate-200 relative space-y-3 text-left"
                  >
                    <button
                      onClick={() => removeCertificationItem(idx)}
                      className="absolute top-3 right-3 text-slate-450 hover:text-red-500 transition cursor-pointer bg-transparent border-0 outline-none"
                      title="Remove Certification"
                    >
                      <FaTrash size={12} />
                    </button>
                    <h3 className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                      Certification #{idx + 1}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-0.5">
                        <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">
                          Certificate Name
                        </label>
                        <input
                          type="text"
                          required
                          value={cert.name}
                          onChange={(e) =>
                            updateCertificationItem(idx, "name", e.target.value)
                          }
                          className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:border-blue-500 outline-none text-xs font-semibold transition"
                          placeholder="e.g. AWS Solutions Architect"
                        />
                      </div>
                      <div className="space-y-0.5">
                        <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">
                          Organization
                        </label>
                        <input
                          type="text"
                          required
                          value={cert.issuer}
                          onChange={(e) =>
                            updateCertificationItem(idx, "issuer", e.target.value)
                          }
                          className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:border-blue-500 outline-none text-xs font-semibold transition"
                          placeholder="e.g. Amazon Web Services"
                        />
                      </div>
                      <div className="space-y-0.5">
                        <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">
                          Issue Date
                        </label>
                        <input
                          type="text"
                          required
                          value={cert.issue_date}
                          onChange={(e) =>
                            updateCertificationItem(idx, "issue_date", e.target.value)
                          }
                          className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:border-blue-500 outline-none text-xs font-semibold transition"
                          placeholder="e.g. Jan 2025"
                        />
                      </div>
                      <div className="space-y-0.5">
                        <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">
                          Expiration Date
                        </label>
                        <input
                          type="text"
                          disabled={cert.is_never_expire}
                          value={cert.is_never_expire ? "" : cert.expiration_date}
                          onChange={(e) =>
                            updateCertificationItem(idx, "expiration_date", e.target.value)
                          }
                          className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:border-blue-500 outline-none text-xs font-semibold transition disabled:bg-slate-100 disabled:cursor-not-allowed"
                          placeholder="e.g. Jan 2028"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`is_never_expire_${idx}`}
                        checked={cert.is_never_expire}
                        onChange={(e) =>
                          updateCertificationItem(
                            idx,
                            "is_never_expire",
                            e.target.checked
                          )
                        }
                        className="rounded text-blue-600 focus:ring-blue-500/20 border-slate-300 w-3.5 h-3.5"
                      />
                      <label
                        htmlFor={`is_never_expire_${idx}`}
                        className="text-[10px] font-bold text-slate-700 select-none cursor-pointer"
                      >
                        This credential does not expire
                      </label>
                    </div>

                    <div className="space-y-0.5">
                      <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">
                        Credential URL
                      </label>
                      <input
                        type="url"
                        value={cert.credential_url}
                        onChange={(e) =>
                          updateCertificationItem(idx, "credential_url", e.target.value)
                        }
                        className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 outline-none text-xs font-semibold transition focus:border-blue-500"
                        placeholder="https://example.com/verify/..."
                      />
                    </div>
                  </div>
                ))}

                <div className="flex flex-col gap-2 pt-1">
                  <button
                    onClick={addCertificationItem}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100 rounded-xl hover:bg-blue-600 hover:text-white transition duration-200 cursor-pointer shadow-xs"
                  >
                    <FaPlus size={10} /> Add Certification
                  </button>
                  <button
                    onClick={handleSaveCertifications}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl shadow-xs hover:brightness-105 transition duration-200 cursor-pointer border-0"
                  >
                    <FaSave size={10} /> Save Certifications Changes
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* ================= RIGHT COLUMN (~65% -> lg:col-span-8) ================= */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* 1. Resume Manager Card */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100 relative">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100 text-left">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center text-lg border border-red-100 shadow-xs">
                <FaFilePdf />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-800 tracking-tight">
                  Resume Manager
                </h2>
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  Analyze and manage your professional curriculum vitae
                </p>
              </div>
            </div>

            {user?.resume?.filename ? (
              <div className="space-y-4 text-left">
                <div className="bg-slate-50/50 border border-slate-200 rounded-xl p-4 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-blue-500 to-sky-400" />
                  <div className="space-y-1 pl-2">
                    <h3 className="font-bold text-slate-800 truncate text-xs max-w-[320px]">
                      {user.resume.filename}
                    </h3>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
                      Uploaded: {user.resume.uploadDate}
                    </span>
                  </div>

                  {/* ATS Score Indicator */}
                  {user.resume.atsScore && (
                    <div className="min-w-[180px] bg-white border border-slate-100 rounded-xl p-3 shadow-2xs">
                      <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 mb-1">
                        <span>ATS Score Assessment</span>
                        <span className="text-green-600 font-bold text-xs">
                          {user.resume.atsScore}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-sky-400 to-green-500 transition-all duration-700"
                          style={{ width: `${user.resume.atsScore}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-3 text-xs font-bold">
                  <button
                    onClick={() => navigate("/resume-analysis")}
                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition cursor-pointer border border-blue-100 outline-none"
                  >
                    <FaEye size={11} /> View Analysis
                  </button>
                  <button
                    onClick={handleDownloadResume}
                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-green-50 text-green-600 hover:bg-green-600 hover:text-white transition cursor-pointer border border-green-100 outline-none"
                  >
                    <FaDownload size={11} /> Download
                  </button>
                  <button
                    onClick={handleDeleteResume}
                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition cursor-pointer border border-red-100 outline-none"
                  >
                    <FaTrash size={11} /> Delete
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-xl p-6 text-center">
                <p className="text-slate-400 text-xs font-medium">
                  No resume uploaded yet. Upload your PDF resume to generate AI insights.
                </p>
              </div>
            )}

            <button
              onClick={triggerResumeUpload}
              className="w-full mt-4 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl font-bold shadow-xs hover:brightness-105 transition cursor-pointer border-0 outline-none text-xs tracking-wide"
            >
              <FaUpload size={12} /> Upload New Resume (PDF)
            </button>
            <input
              type="file"
              ref={resumeInputRef}
              onChange={handleResumeChange}
              accept=".pdf"
              className="hidden"
            />
          </div>

          {/* 2. Skills Overview Card */}
          <Skills />

          {/* 3. AI Insights Card */}
          <AIProfileInsights />

          {/* 6. Security Settings Card */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100 space-y-4 transition duration-300 hover:shadow-md">
            <div className="flex items-center gap-3 mb-2 text-left">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg border border-blue-100 shadow-xs">
                <FaShieldAlt className="animate-pulse" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-800 tracking-tight">
                  Security Settings
                </h2>
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  Protect and manage your account access and safety
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 text-left">
              {/* Change Password */}
              <button
                onClick={() => navigate("/forgot-password")}
                className="group w-full flex items-center justify-between p-3.5 bg-gradient-to-r from-slate-50 to-white hover:from-blue-50/40 hover:to-sky-50/20 rounded-xl border border-slate-200 hover:border-blue-200 transition-all duration-300 text-left cursor-pointer shadow-2xs hover:shadow-xs outline-none"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8.5 h-8.5 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs border border-blue-100 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                    <FaLock />
                  </div>
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-700 text-xs block tracking-tight">
                      Change Password
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium block">
                      Update your password via secure email OTP flow
                    </span>
                  </div>
                </div>
                <FaChevronRight className="text-slate-300 transition duration-300 group-hover:text-blue-500 group-hover:translate-x-0.5" size={9} />
              </button>

              {/* Report a Bug */}
              <button
                onClick={() => setIsBugModalOpen(true)}
                className="group w-full flex items-center justify-between p-3.5 bg-gradient-to-r from-slate-50 to-white hover:from-blue-50/40 hover:to-sky-50/20 rounded-xl border border-slate-200 hover:border-blue-200 transition-all duration-300 text-left cursor-pointer shadow-2xs hover:shadow-xs outline-none"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8.5 h-8.5 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs border border-blue-100 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                    <FaBug />
                  </div>
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-700 text-xs block tracking-tight">
                      Report a Bug
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium block">
                      Submit application issues directly to the development team
                    </span>
                  </div>
                </div>
                <FaChevronRight className="text-slate-300 transition duration-300 group-hover:text-blue-500 group-hover:translate-x-0.5" size={9} />
              </button>

              {/* Delete Account */}
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="group w-full flex items-center justify-between p-3.5 bg-gradient-to-r from-slate-50 to-white hover:from-red-50 hover:to-rose-50/10 rounded-xl border border-slate-200 hover:border-red-200 transition-all duration-300 text-left cursor-pointer shadow-2xs hover:shadow-xs outline-none"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8.5 h-8.5 rounded-lg bg-red-50 text-red-500 flex items-center justify-center text-xs border border-red-100 transition-colors group-hover:bg-red-600 group-hover:text-white">
                    <FaTrash />
                  </div>
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-700 text-xs block tracking-tight">
                      Delete Account
                    </span>
                    <span className="text-[10px] text-red-500 font-medium block">
                      Permanently erase all user documents and profiles
                    </span>
                  </div>
                </div>
                <FaChevronRight className="text-slate-300 transition duration-300 group-hover:text-red-500 group-hover:translate-x-0.5" size={9} />
              </button>

              {/* Logout */}
              <button
                onClick={() => {
                  logout();
                  toast.success("Logged out successfully.");
                  navigate("/login", { replace: true });
                }}
                className="group w-full flex items-center justify-between p-3.5 bg-gradient-to-r from-slate-50 to-white hover:from-red-50 hover:to-rose-50/15 rounded-xl border border-slate-200 hover:border-red-200 transition-all duration-300 text-left cursor-pointer shadow-2xs hover:shadow-xs outline-none"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8.5 h-8.5 rounded-lg bg-red-50 text-red-500 flex items-center justify-center text-xs border border-red-100 transition-colors group-hover:bg-red-600 group-hover:text-white">
                    <FaSignOutAlt />
                  </div>
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-700 text-xs block tracking-tight">
                      Logout Session
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium block">
                      Securely end session and clear credentials
                    </span>
                  </div>
                </div>
                <FaChevronRight className="text-slate-300 transition duration-300 group-hover:text-red-500 group-hover:translate-x-0.5" size={9} />
              </button>
            </div>
          </div>

                    {/* 7. Support & Policy Grid Section inside Right Column */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            
            {/* Privacy Policy Card */}
            <div className="bg-gradient-to-br from-white to-blue-50/10 rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-all duration-300 relative overflow-hidden flex flex-col justify-between group text-left">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500" />
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8.5 h-8.5 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm border border-blue-100 shadow-2xs group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                    <FaShieldAlt />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-800 tracking-tight">Privacy Policy</h3>
                    <p className="text-[8px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Data Usage & Safety</p>
                  </div>
                </div>
                <p className="text-slate-500 text-[11px] font-medium leading-relaxed mb-3">
                  This policy describes how user documents and metrics are handled within our educational application environment.
                </p>
                <ul className="space-y-1.5">
                  <li className="flex items-start gap-1.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 mt-0.5 text-[8px] text-blue-600 font-black">✓</div>
                    <p className="text-[10px] text-slate-600 font-medium">
                      <strong className="text-slate-700">Academic Project:</strong> Built solely as an educational Capstone initiative.
                    </p>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 mt-0.5 text-[8px] text-blue-600 font-black">✓</div>
                    <p className="text-[10px] text-slate-600 font-medium">
                      <strong className="text-slate-700">No Affiliation:</strong> Skillora AI is not affiliated with any official government body.
                    </p>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 mt-0.5 text-[8px] text-blue-600 font-black">✓</div>
                    <p className="text-[10px] text-slate-600 font-medium">
                      <strong className="text-slate-700">Resume Processing:</strong> Utilized strictly for diagnostics and roadmaps.
                    </p>
                  </li>
                </ul>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-100/60 flex items-center gap-1 text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                <FaInfoCircle size={9} /> Updated: July 2026
              </div>
            </div>
            
            {/* Premium Contact Support Card */}
            <div className="bg-white rounded-2xl shadow-sm p-5 border border-slate-100 space-y-3.5 hover:shadow-md transition duration-300 text-left">
              <div className="flex items-center gap-3">
                <div className="w-8.5 h-8.5 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-base border border-blue-100 shadow-2xs shrink-0">
                  <FaHeadset className="animate-bounce" style={{ animationDuration: "3s" }} />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-slate-800 tracking-tight">
                    Contact Support
                  </h2>
                  <p className="text-[8px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                    Help Desk
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {/* Email */}
                <a
                  href="mailto:meera.ldrp.7@gmail.com"
                  className="group flex items-center gap-3 p-2 bg-gradient-to-r from-slate-50 to-white hover:from-blue-50/40 hover:to-sky-50/20 rounded-xl border border-slate-200 hover:border-blue-200 transition-all duration-300 cursor-pointer shadow-2xs text-decoration-none text-slate-800"
                >
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                    <FaEnvelope size={10} />
                  </div>
                  <div className="space-y-0.5 overflow-hidden">
                    <span className="font-bold text-slate-700 text-[10px] block tracking-tight">
                      Email Support
                    </span>
                    <span className="text-[9px] text-slate-500 font-medium block truncate">
                      meera.ldrp.7@gmail.com
                    </span>
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/meera-sachchade-208123395/"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 p-2 bg-gradient-to-r from-slate-50 to-white hover:from-blue-50/40 hover:to-sky-50/20 rounded-xl border border-slate-200 hover:border-blue-200 transition-all duration-300 cursor-pointer shadow-2xs text-decoration-none text-slate-800"
                >
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                    <FaLinkedin size={10} />
                  </div>
                  <div className="space-y-0.5 overflow-hidden">
                    <span className="font-bold text-slate-700 text-[10px] block tracking-tight">
                      LinkedIn
                    </span>
                    <span className="text-[9px] text-slate-500 font-medium block truncate">
                      meera-sachchade-208123395
                    </span>
                  </div>
                </a>
              </div>
            </div>
            
            {/* About Skillora AI Card */}
            <div className="bg-gradient-to-br from-white to-blue-50/10 rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-all duration-300 relative overflow-hidden flex flex-col justify-between group text-left">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-650" />
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8.5 h-8.5 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm border border-blue-100 shadow-2xs group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                    <FaGraduationCap />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-800 tracking-tight">About Skillora AI</h3>
                    <p className="text-[8px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Academic Project</p>
                  </div>
                </div>
                <p className="text-slate-500 text-[11px] font-medium leading-relaxed mb-3">
                  Skillora AI is an AI-powered career development platform built to help students with resume analysis, matching, and roadmap insights.
                </p>
                
                <div className="space-y-1.5">
                  <span className="text-[8px] font-bold uppercase tracking-wider text-blue-600 block border-b border-slate-100 pb-0.5">
                    Team Members
                  </span>
                  <ul className="space-y-1">
                    <li className="bg-slate-50/50 p-1.5 rounded-lg border border-slate-200 flex justify-between items-center">
                      <span className="text-slate-700 font-bold text-[10px]">Meera Sachchade</span>
                      <span className="text-[8px] bg-blue-50 text-blue-700 px-1 py-0.2 rounded border border-blue-100 uppercase font-bold">Lead</span>
                    </li>
                    <li className="bg-slate-50/50 p-1.5 rounded-lg border border-slate-200 flex justify-between items-center">
                      <span className="text-slate-700 font-bold text-[10px]">Janvi Ramani</span>
                      <span className="text-[8px] bg-indigo-50 text-indigo-700 px-1 py-0.2 rounded border border-indigo-100 uppercase font-bold">Dev</span>
                    </li>
                    <li className="bg-slate-50/50 p-1.5 rounded-lg border border-slate-200 flex justify-between items-center">
                      <span className="text-slate-700 font-bold text-[10px]">Nisha Satasiya</span>
                      <span className="text-[8px] bg-indigo-50 text-indigo-700 px-1 py-0.2 rounded border border-indigo-100 uppercase font-bold">Dev</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-100/60 flex items-center gap-1 text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                <FaInfoCircle size={9} /> Skillora 2026
              </div>
            </div>
            
            {/* Terms & Conditions Card */}
            <div className="bg-gradient-to-br from-white to-blue-50/10 rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-all duration-300 relative overflow-hidden flex flex-col justify-between group text-left">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-500 via-indigo-500 to-indigo-600" />
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8.5 h-8.5 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm border border-blue-100 shadow-2xs group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                    <FaInfoCircle />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-800 tracking-tight">Terms & Conditions</h3>
                    <p className="text-[8px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Rules & Guidelines</p>
                  </div>
                </div>
                <p className="text-slate-500 text-[11px] font-medium leading-relaxed mb-3">
                  Please review the basic terms governing academic demonstration, user responsibilities, and system updates.
                </p>
                <ul className="space-y-1.5">
                  <li className="flex items-start gap-1.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 mt-0.5 text-[8px] text-blue-600 font-black">✓</div>
                    <p className="text-[10px] text-slate-600 font-medium">
                      <strong className="text-slate-700">Educational:</strong> Made for demonstration and Capstone evaluation.
                    </p>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 mt-0.5 text-[8px] text-blue-600 font-black">✓</div>
                    <p className="text-[10px] text-slate-600 font-medium">
                      <strong className="text-slate-700">AI Disclaimer:</strong> Insights and metrics are for general reference only.
                    </p>
                  </li>
                </ul>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-100/60 flex items-center gap-1 text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                <FaInfoCircle size={9} /> Terms Version 1.1
              </div>
            </div>
            
          </div>

        </div>

      </div>

      {/* Report Bug Modal */}
      {isBugModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 max-w-md w-full p-6 space-y-4 animate-fade-in">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-800 tracking-tight flex items-center gap-2">
                <FaBug className="text-blue-600" /> Report a Bug
              </h3>
              <button
                onClick={() => setIsBugModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition cursor-pointer bg-transparent border-0 outline-none"
              >
                <FaTimes size={14} />
              </button>
            </div>

            <form onSubmit={handleReportBug} className="space-y-4 text-left">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Profile picture upload failing"
                  value={bugForm.subject}
                  onChange={(e) =>
                    setBugForm({ ...bugForm, subject: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:border-blue-500 focus:bg-white outline-none text-xs font-semibold transition"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                  Description
                </label>
                <textarea
                  required
                  rows="4"
                  placeholder="Please provide steps to reproduce, expected vs actual behavior..."
                  value={bugForm.description}
                  onChange={(e) =>
                    setBugForm({ ...bugForm, description: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-855 focus:border-blue-500 focus:bg-white outline-none text-xs font-semibold resize-none transition"
                />
              </div>

              <button
                type="submit"
                disabled={bugSubmitting}
                className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white rounded-xl font-bold shadow-xs hover:scale-[1.005] transition disabled:opacity-50 cursor-pointer border-0 outline-none text-xs uppercase tracking-wider"
              >
                {bugSubmitting ? "Sending Bug Report..." : "Send Bug Report"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Account Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 max-w-md w-full p-6 text-center space-y-4 animate-fade-in">
            <div className="w-12 h-12 mx-auto rounded-xl bg-red-50 text-red-500 flex items-center justify-center text-xl border border-red-100 shadow-xs animate-pulse">
              <FaTrash />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-slate-800 tracking-tight">
                Delete Account Permanently?
              </h3>

              <p className="text-slate-500 text-xs leading-relaxed font-medium">
                This action is permanent and cannot be undone. All of your
                profile data, resumes, analysis history, matches, roadmaps, and
                registration records will be completely and permanently deleted.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 font-bold text-xs pt-1">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-xl transition cursor-pointer outline-none"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteAccount}
                className="py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-xs transition hover:scale-[1.005] cursor-pointer border-0 outline-none"
              >
                Yes, Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;