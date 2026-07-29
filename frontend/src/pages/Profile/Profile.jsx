import { useState, useRef, useEffect } from "react";
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
  FaPhoneAlt,
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

  // Separate states for School and Graduation cards
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

  // Sync state with user context on mount or user change
  useEffect(() => {
    if (user) {
      setPersonalInfoForm({
        name: user.name || "",
        dob: user.dob || "",
        phone_number: user.phone_number || "",
        linkedin: user.linkedin || "",
        github: user.github || "",
        bio: user.bio || "",
      });

      setSchoolForm({
        name: user.education?.school?.name || "",
        board: user.education?.school?.board || "",
        passing_year: user.education?.school?.passing_year || "",
        percentage: user.education?.school?.percentage || "",
      });

      setGraduationForm({
        college: user.education?.graduation?.college || "",
        degree: user.education?.graduation?.degree || "",
        branch: user.education?.graduation?.branch || "",
        passing_year: user.education?.graduation?.passing_year || "",
        cgpa_percentage: user.education?.graduation?.cgpa_percentage || "",
      });

      setExperienceForm(user.experience || []);
      setProjectsForm(user.projects || []);
      setCertificationsForm(user.certifications || []);
    }
  }, [user]);

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
      toast.error("Failed to save personal information.");
    }
  };

  const handleSaveSchool = async (e) => {
    if (e) e.preventDefault();
    try {
      const updatedUser = await authService.updateProfile({
        education: {
          school: schoolForm,
          graduation: graduationForm, // preserve existing graduation
        },
      });
      updateUser(updatedUser);
      setIsEditingSchool(false);
      toast.success("School details saved successfully.");
    } catch (err) {
      toast.error("Failed to save school details.");
    }
  };

  const handleSaveGraduation = async (e) => {
    if (e) e.preventDefault();
    try {
      const updatedUser = await authService.updateProfile({
        education: {
          school: schoolForm, // preserve existing school
          graduation: graduationForm,
        },
      });
      updateUser(updatedUser);
      setIsEditingGraduation(false);
      toast.success("Graduation details saved successfully.");
    } catch (err) {
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
      toast.error("Failed to delete account. Please try again.");
    }
  };

  // Personal Info Form Validation
  const isPersonalInfoSaveDisabled = !personalInfoForm.name || !personalInfoForm.dob || !personalInfoForm.phone_number;

  return (
    <div className="space-y-8 pb-16 relative">
      {/* Decorative Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* 1. Profile Header Card */}
      <div className="bg-gradient-to-br from-white to-blue-50/20 rounded-[28px] border border-slate-200/80 shadow-md p-8 relative overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500"></div>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
          
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            {/* Avatar with floating Camera trigger & Remove Trigger */}
            <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
              {user?.profile_picture ? (
                <img
                  src={user.profile_picture}
                  alt={user?.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:brightness-90"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black text-4xl shadow-lg border-4 border-white transition-transform duration-300 group-hover:scale-105">
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
              <div className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-md border-2 border-white transition-colors duration-200">
                <FaCamera size={14} />
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                accept="image/*"
                className="hidden"
              />
            </div>

            {/* Name, Email, Credentials */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {user?.name || "Skillora User"}
                </h1>
                <span className="bg-blue-600 text-white text-[10px] font-black px-3.5 py-1 rounded-full border border-blue-500 uppercase tracking-wider shadow-sm">
                  Premium SaaS
                </span>
              </div>
              <p className="text-slate-500 font-semibold text-sm flex items-center justify-center md:justify-start gap-2">
                <FaEnvelope className="text-blue-500" /> {user?.email}
              </p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3.5 pt-1">
                <button
                  onClick={handleAvatarClick}
                  className="px-4.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition duration-200 cursor-pointer shadow-sm flex items-center gap-1.5"
                >
                  <FaUpload size={11} /> Upload Photo
                </button>
                {user?.profile_picture && (
                  <button
                    onClick={handleRemoveAvatar}
                    className="px-4.5 py-2 bg-white hover:bg-red-550 text-red-600 border border-red-200 text-xs font-bold rounded-xl transition duration-200 cursor-pointer shadow-sm flex items-center gap-1.5"
                  >
                    <FaTrash size={11} /> Remove
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Profile Strength & Completion Progress Badge */}
          <div className="w-full lg:w-80 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-3.5">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black text-slate-400 uppercase tracking-wider">
                Profile strength
              </span>
              <span className="bg-sky-50 text-sky-700 text-xs font-black px-2.5 py-1 rounded-lg border border-sky-100">
                {completionScore}% Complete
              </span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-sky-400 transition-all duration-500"
                style={{ width: `${completionScore}%` }}
              ></div>
            </div>
            <p className="text-[11px] text-slate-400 font-bold flex items-center gap-1">
              <FaCheckCircle className="text-emerald-500" /> Complete pending cards to hit 100%!
            </p>
          </div>

        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column (2/3 width) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* 2. Personal Information Card */}
          <div className="bg-white rounded-[28px] border border-slate-200/80 shadow-sm p-8 transition-all duration-300 hover:shadow-md">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg border border-blue-100">
                  <FaUser />
                </div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  Personal Information
                </h2>
              </div>
              {!isEditingPersonalInfo ? (
                <button
                  onClick={() => setIsEditingPersonalInfo(true)}
                  className="flex items-center gap-2 px-4.5 py-2 text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100 rounded-xl hover:bg-blue-600 hover:text-white transition duration-200 shadow-sm cursor-pointer"
                >
                  <FaEdit /> Edit Section
                </button>
              ) : (
                <button
                  onClick={() => setIsEditingPersonalInfo(false)}
                  className="flex items-center gap-2 px-4.5 py-2 text-xs font-bold bg-slate-50 text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-100 transition duration-200 shadow-sm cursor-pointer"
                >
                  <FaTimes /> Cancel
                </button>
              )}
            </div>

            {!isEditingPersonalInfo ? (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-slate-50/50 rounded-2xl p-4.5 border border-slate-100">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                      Full Name *
                    </span>
                    <span className="text-slate-800 font-extrabold block mt-1.5 text-sm">
                      {user?.name}
                    </span>
                  </div>
                  <div className="bg-slate-50/50 rounded-2xl p-4.5 border border-slate-100">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                      Email Address (Read Only)
                    </span>
                    <span className="text-slate-400 font-bold block mt-1.5 text-sm">
                      {user?.email}
                    </span>
                  </div>
                  <div className="bg-slate-50/50 rounded-2xl p-4.5 border border-slate-100">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block flex items-center gap-1.5">
                      <FaBirthdayCake className="text-slate-400" /> Date of Birth *
                    </span>
                    <span className="text-slate-800 font-extrabold block mt-1.5 text-sm">
                      {user?.dob || "Not specified"}
                    </span>
                  </div>
                  <div className="bg-slate-50/50 rounded-2xl p-4.5 border border-slate-100">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block flex items-center gap-1.5">
                      <FaPhone className="text-slate-400" /> Phone Number *
                    </span>
                    <span className="text-slate-800 font-extrabold block mt-1.5 text-sm">
                      {user?.phone_number || "Not specified"}
                    </span>
                  </div>
                  <div className="bg-slate-50/50 rounded-2xl p-4.5 border border-slate-100">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block flex items-center gap-1.5">
                      <FaLinkedin className="text-blue-500" /> LinkedIn URL
                    </span>
                    {user?.linkedin ? (
                      <a
                        href={user.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 font-extrabold block mt-1.5 hover:underline truncate text-sm"
                      >
                        {user.linkedin}
                      </a>
                    ) : (
                      <span className="text-slate-400 font-bold block mt-1.5 text-sm">
                        Not specified
                      </span>
                    )}
                  </div>
                  <div className="bg-slate-50/50 rounded-2xl p-4.5 border border-slate-100">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block flex items-center gap-1.5">
                      <FaGithub className="text-slate-800" /> GitHub URL
                    </span>
                    {user?.github ? (
                      <a
                        href={user.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-800 font-extrabold block mt-1.5 hover:underline truncate text-sm"
                      >
                        {user.github}
                      </a>
                    ) : (
                      <span className="text-slate-400 font-bold block mt-1.5 text-sm">
                        Not specified
                      </span>
                    )}
                  </div>
                </div>

                <div className="bg-blue-50/40 rounded-2xl p-5 border border-blue-100/50">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider block">
                    Bio Summary
                  </span>
                  <p className="text-slate-700 mt-2 text-sm leading-relaxed whitespace-pre-wrap font-semibold">
                    {user?.bio || "No professional bio added yet."}
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSavePersonalInfo} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
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
                      className={`w-full bg-slate-50 border rounded-2xl px-4 py-3 text-slate-900 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition duration-200 text-sm font-semibold ${
                        !personalInfoForm.name ? "border-red-200 bg-red-50/10" : "border-slate-200"
                      }`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-wider block">
                      Email (Read Only)
                    </label>
                    <input
                      type="email"
                      disabled
                      value={user?.email || ""}
                      className="w-full bg-slate-100 border border-slate-200 rounded-2xl px-4 py-3 text-slate-400 font-bold cursor-not-allowed outline-none text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
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
                      className={`w-full bg-slate-50 border rounded-2xl px-4 py-3 text-slate-900 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition duration-200 text-sm font-semibold ${
                        !personalInfoForm.dob ? "border-red-200 bg-red-50/10" : "border-slate-200"
                      }`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
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
                      className={`w-full bg-slate-50 border rounded-2xl px-4 py-3 text-slate-900 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition duration-200 text-sm font-semibold ${
                        !personalInfoForm.phone_number ? "border-red-200 bg-red-50/10" : "border-slate-200"
                      }`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
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
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition duration-200 text-sm font-semibold"
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
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
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition duration-200 text-sm font-semibold"
                      placeholder="https://github.com/username"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
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
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition duration-200 text-sm font-semibold resize-none"
                    placeholder="Brief description about your experience, achievements, and career interests..."
                  />
                </div>

                <div className="flex justify-between items-center pt-2">
                  {isPersonalInfoSaveDisabled && (
                    <span className="text-xs text-red-500 font-bold flex items-center gap-1">
                      ⚠️ Name, DOB and Phone are required to save.
                    </span>
                  )}
                  <div className="ml-auto">
                    <button
                      type="submit"
                      disabled={isPersonalInfoSaveDisabled}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl shadow-md hover:scale-[1.01] hover:brightness-105 transition duration-200 cursor-pointer flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                      <FaSave /> Save Personal Info
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* 3. Education - Separate School and College Cards */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg border border-blue-100">
                <FaGraduationCap />
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Education Details
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Card 1: Secondary School Details */}
              <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm p-6 relative hover:shadow-md transition-all duration-355 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm border border-indigo-100">
                        <FaSchool />
                      </div>
                      <h3 className="text-base font-extrabold text-slate-800">
                        School Education
                      </h3>
                    </div>
                    {!isEditingSchool ? (
                      <button
                        onClick={() => setIsEditingSchool(true)}
                        className="text-blue-600 hover:text-blue-700 text-xs font-bold flex items-center gap-1 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100 transition"
                      >
                        <FaEdit size={10} /> Edit
                      </button>
                    ) : (
                      <button
                        onClick={() => setIsEditingSchool(false)}
                        className="text-slate-500 hover:text-slate-600 text-xs font-bold flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100 transition"
                      >
                        <FaTimes size={10} /> Cancel
                      </button>
                    )}
                  </div>

                  {!isEditingSchool ? (
                    <div className="space-y-3.5 text-sm pt-2 border-t border-slate-100">
                      <p className="text-slate-600 flex justify-between">
                        <span className="font-bold text-slate-400">School Name:</span>
                        <span className="font-extrabold text-slate-700 text-right max-w-[150px] truncate">{schoolForm.name || "Not specified"}</span>
                      </p>
                      <p className="text-slate-600 flex justify-between">
                        <span className="font-bold text-slate-400">Board:</span>
                        <span className="font-extrabold text-slate-700">{schoolForm.board || "Not specified"}</span>
                      </p>
                      <p className="text-slate-600 flex justify-between">
                        <span className="font-bold text-slate-400">Passing Year:</span>
                        <span className="font-extrabold text-slate-700">{schoolForm.passing_year || "Not specified"}</span>
                      </p>
                      <p className="text-slate-600 flex justify-between">
                        <span className="font-bold text-slate-400">Percentage/CGPA:</span>
                        <span className="font-black text-blue-600">{schoolForm.percentage || "Not specified"}</span>
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSaveSchool} className="space-y-3 pt-2 border-t border-slate-100 text-left">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-600 uppercase tracking-wider block">School Name</label>
                        <input
                          type="text"
                          required
                          value={schoolForm.name}
                          onChange={(e) => setSchoolForm({ ...schoolForm, name: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:border-blue-500 focus:bg-white outline-none text-xs font-semibold transition"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-600 uppercase tracking-wider block">Board</label>
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
                          <label className="text-[10px] font-black text-slate-600 uppercase tracking-wider block">Passing Year</label>
                          <input
                            type="text"
                            value={schoolForm.passing_year}
                            onChange={(e) => setSchoolForm({ ...schoolForm, passing_year: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:border-blue-500 focus:bg-white outline-none text-xs font-semibold transition"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-black text-slate-600 uppercase tracking-wider block">Percentage</label>
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
                        className="w-full mt-2 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 shadow-sm hover:scale-[1.01]"
                      >
                        <FaSave size={10} /> Save School Info
                      </button>
                    </form>
                  )}
                </div>
              </div>

              {/* Card 2: College / Graduation Details */}
              <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm p-6 relative hover:shadow-md transition-all duration-355 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm border border-blue-100">
                        <FaUniversity />
                      </div>
                      <h3 className="text-base font-extrabold text-slate-800">
                        Graduation Details
                      </h3>
                    </div>
                    {!isEditingGraduation ? (
                      <button
                        onClick={() => setIsEditingGraduation(true)}
                        className="text-blue-600 hover:text-blue-700 text-xs font-bold flex items-center gap-1 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100 transition"
                      >
                        <FaEdit size={10} /> Edit
                      </button>
                    ) : (
                      <button
                        onClick={() => setIsEditingGraduation(false)}
                        className="text-slate-500 hover:text-slate-600 text-xs font-bold flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100 transition"
                      >
                        <FaTimes size={10} /> Cancel
                      </button>
                    )}
                  </div>

                  {!isEditingGraduation ? (
                    <div className="space-y-3.5 text-sm pt-2 border-t border-slate-100">
                      <p className="text-slate-600 flex justify-between">
                        <span className="font-bold text-slate-400">College Name:</span>
                        <span className="font-extrabold text-slate-700 text-right max-w-[150px] truncate">{graduationForm.college || "Not specified"}</span>
                      </p>
                      <p className="text-slate-600 flex justify-between">
                        <span className="font-bold text-slate-400">Degree:</span>
                        <span className="font-extrabold text-slate-700">{graduationForm.degree || "Not specified"}</span>
                      </p>
                      <p className="text-slate-600 flex justify-between">
                        <span className="font-bold text-slate-400">Branch:</span>
                        <span className="font-extrabold text-slate-700">{graduationForm.branch || "Not specified"}</span>
                      </p>
                      <p className="text-slate-600 flex justify-between">
                        <span className="font-bold text-slate-400">Passing Year:</span>
                        <span className="font-extrabold text-slate-700">{graduationForm.passing_year || "Not specified"}</span>
                      </p>
                      <p className="text-slate-600 flex justify-between">
                        <span className="font-bold text-slate-400">CGPA / %:</span>
                        <span className="font-black text-blue-600">{graduationForm.cgpa_percentage || "Not specified"}</span>
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSaveGraduation} className="space-y-3 pt-2 border-t border-slate-100 text-left">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-600 uppercase tracking-wider block">College Name</label>
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
                          <label className="text-[10px] font-black text-slate-600 uppercase tracking-wider block">Degree</label>
                          <input
                            type="text"
                            placeholder="e.g. B.Tech, BE, BCA"
                            value={graduationForm.degree}
                            onChange={(e) => setGraduationForm({ ...graduationForm, degree: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:border-blue-500 focus:bg-white outline-none text-xs font-semibold transition"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-black text-slate-600 uppercase tracking-wider block">Branch</label>
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
                          <label className="text-[10px] font-black text-slate-600 uppercase tracking-wider block">Passing Year</label>
                          <input
                            type="text"
                            value={graduationForm.passing_year}
                            onChange={(e) => setGraduationForm({ ...graduationForm, passing_year: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:border-blue-500 focus:bg-white outline-none text-xs font-semibold transition"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-black text-slate-600 uppercase tracking-wider block">CGPA / %</label>
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
                        className="w-full mt-2 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 shadow-sm hover:scale-[1.01]"
                      >
                        <FaSave size={10} /> Save Graduation Info
                      </button>
                    </form>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* 4. Experience Card */}
          <div className="bg-white rounded-[28px] border border-slate-200/80 shadow-sm p-8 transition-all duration-300 hover:shadow-md">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg border border-blue-100">
                  <FaBriefcase />
                </div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  Work Experience
                </h2>
              </div>
              {!isEditingExperience ? (
                <button
                  onClick={() => setIsEditingExperience(true)}
                  className="flex items-center gap-2 px-4.5 py-2 text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100 rounded-xl hover:bg-blue-600 hover:text-white transition duration-200 shadow-sm cursor-pointer"
                >
                  <FaEdit /> Edit Experience
                </button>
              ) : (
                <button
                  onClick={handleSaveExperience}
                  className="flex items-center gap-2 px-4.5 py-2 text-xs font-bold bg-green-50 text-green-600 border border-green-100 rounded-xl hover:bg-green-600 hover:text-white transition duration-200 shadow-sm cursor-pointer"
                >
                  <FaSave /> Save Experience
                </button>
              )}
            </div>

            {!isEditingExperience ? (
              <div className="space-y-6">
                {experienceForm.length === 0 ? (
                  <p className="text-slate-400 text-sm italic py-4">
                    No work experience added yet. Click edit to add.
                  </p>
                ) : (
                  <div className="relative border-l-2 border-slate-100 pl-6 space-y-6 ml-4">
                    {experienceForm.map((exp, idx) => (
                      <div key={idx} className="relative">
                        <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-blue-500 border-4 border-white shadow-sm"></div>
                        <div className="bg-slate-50/50 rounded-2xl p-5 border border-slate-150 transition-all hover:bg-slate-50/80">
                          <h3 className="text-base font-extrabold text-slate-800">
                            {exp.role}
                          </h3>
                          <div className="flex flex-wrap items-center gap-3.5 text-[11px] font-bold text-slate-500 mt-2">
                            <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100/50">
                              {exp.company}
                            </span>
                            <span>•</span>
                            <span>{exp.employment_type}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1.5">
                              <FaCalendarAlt className="text-slate-400" /> {exp.start_date} -{" "}
                              {exp.is_present ? "Present" : exp.end_date}
                            </span>
                          </div>
                          <p className="text-slate-600 text-sm mt-3.5 leading-relaxed whitespace-pre-wrap font-semibold">
                            {exp.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {experienceForm.map((exp, idx) => (
                  <div
                    key={idx}
                    className="p-6 bg-slate-50/50 rounded-2xl border border-slate-200 relative space-y-4 text-left"
                  >
                    <button
                      onClick={() => removeExperienceItem(idx)}
                      className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition cursor-pointer"
                      title="Remove Role"
                    >
                      <FaTrash size={14} />
                    </button>
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                      Position #{idx + 1}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
                          Company Name
                        </label>
                        <input
                          type="text"
                          required
                          value={exp.company}
                          onChange={(e) =>
                            updateExperienceItem(idx, "company", e.target.value)
                          }
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:border-blue-500 outline-none text-sm font-semibold transition"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
                          Job Title / Role
                        </label>
                        <input
                          type="text"
                          required
                          value={exp.role}
                          onChange={(e) =>
                            updateExperienceItem(idx, "role", e.target.value)
                          }
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:border-blue-500 outline-none text-sm font-semibold transition"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
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
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:border-blue-500 outline-none text-sm font-semibold transition"
                        >
                          <option value="Full-time">Full-time</option>
                          <option value="Part-time">Part-time</option>
                          <option value="Internship">Internship</option>
                          <option value="Freelance">Freelance</option>
                          <option value="Contract">Contract</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
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
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:border-blue-500 outline-none text-sm font-semibold transition"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
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
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:border-blue-500 outline-none text-sm font-semibold transition disabled:bg-slate-100 disabled:cursor-not-allowed"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
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
                        className="rounded text-blue-600 focus:ring-blue-500/20 border-slate-300 w-4 h-4"
                      />
                      <label
                        htmlFor={`is_present_${idx}`}
                        className="text-xs font-bold text-slate-700 select-none cursor-pointer"
                      >
                        I currently work in this role
                      </label>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
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
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:border-blue-500 outline-none text-sm font-semibold resize-none transition"
                        placeholder="Detail your projects, tasks, and accomplishments..."
                      />
                    </div>
                  </div>
                ))}

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <button
                    onClick={addExperienceItem}
                    className="flex items-center gap-2 px-4 py-2 text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100 rounded-xl hover:bg-blue-600 hover:text-white transition duration-200 cursor-pointer shadow-sm"
                  >
                    <FaPlus /> Add New Position
                  </button>
                  <button
                    onClick={handleSaveExperience}
                    className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow hover:scale-[1.01] transition duration-200 cursor-pointer"
                  >
                    <FaSave /> Save Experience Changes
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 5. Projects Card */}
          <div className="bg-white rounded-[28px] border border-slate-200/80 shadow-sm p-8 transition-all duration-300 hover:shadow-md">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg border border-blue-100">
                  <FaProjectDiagram />
                </div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  Academic Projects
                </h2>
              </div>
              {!isEditingProjects ? (
                <button
                  onClick={() => setIsEditingProjects(true)}
                  className="flex items-center gap-2 px-4.5 py-2 text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100 rounded-xl hover:bg-blue-600 hover:text-white transition duration-200 shadow-sm cursor-pointer"
                >
                  <FaEdit /> Edit Projects
                </button>
              ) : (
                <button
                  onClick={handleSaveProjects}
                  className="flex items-center gap-2 px-4.5 py-2 text-xs font-bold bg-green-50 text-green-600 border border-green-100 rounded-xl hover:bg-green-600 hover:text-white transition duration-200 shadow-sm cursor-pointer"
                >
                  <FaSave /> Save Projects
                </button>
              )}
            </div>

            {!isEditingProjects ? (
              <div className="grid md:grid-cols-2 gap-6">
                {projectsForm.length === 0 ? (
                  <p className="text-slate-400 text-sm italic col-span-2 py-4">
                    No projects listed yet. Click edit to add projects.
                  </p>
                ) : (
                  projectsForm.map((proj, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-50/50 rounded-2xl p-6 border border-slate-150 hover:shadow-md transition duration-300 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="text-base font-extrabold text-slate-800 truncate">
                            {proj.title}
                          </h3>
                          {proj.duration && (
                            <span className="text-[10px] font-bold bg-slate-200/60 text-slate-600 px-2.5 py-1 rounded-lg border border-slate-300/10">
                              {proj.duration}
                            </span>
                          )}
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed mb-4 whitespace-pre-wrap font-semibold">
                          {proj.description}
                        </p>
                        {proj.technologies && (
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {proj.technologies.split(",").map((tech, i) => (
                              <span
                                key={i}
                                className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-[10px] font-black border border-blue-100/50"
                              >
                                {tech.trim()}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {proj.github && (
                          <a
                            href={proj.github}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-slate-850 hover:bg-slate-900 text-white rounded-lg transition"
                          >
                            <FaGithub /> GitHub
                          </a>
                        )}
                        {proj.live && (
                          <a
                            href={proj.live}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white rounded-lg hover:shadow transition"
                          >
                            <FaEye /> Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {projectsForm.map((proj, idx) => (
                  <div
                    key={idx}
                    className="p-6 bg-slate-50/50 rounded-2xl border border-slate-200 relative space-y-4 text-left"
                  >
                    <button
                      onClick={() => removeProjectItem(idx)}
                      className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition cursor-pointer"
                      title="Remove Project"
                    >
                      <FaTrash size={14} />
                    </button>
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                      Project #{idx + 1}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
                          Project Name
                        </label>
                        <input
                          type="text"
                          required
                          value={proj.title}
                          onChange={(e) =>
                            updateProjectItem(idx, "title", e.target.value)
                          }
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:border-blue-500 outline-none text-sm font-semibold transition"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
                          Duration
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 2024 (or May 2024)"
                          value={proj.duration}
                          onChange={(e) =>
                            updateProjectItem(idx, "duration", e.target.value)
                          }
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:border-blue-500 outline-none text-sm font-semibold transition"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
                          GitHub Link
                        </label>
                        <input
                          type="url"
                          value={proj.github}
                          onChange={(e) =>
                            updateProjectItem(idx, "github", e.target.value)
                          }
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:border-blue-500 outline-none text-sm font-semibold transition"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
                          Live Demo URL
                        </label>
                        <input
                          type="url"
                          value={proj.live}
                          onChange={(e) =>
                            updateProjectItem(idx, "live", e.target.value)
                          }
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:border-blue-500 outline-none text-sm font-semibold transition"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
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
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:border-blue-500 outline-none text-sm font-semibold transition"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
                        Description
                      </label>
                      <textarea
                        rows="3"
                        required
                        value={proj.description}
                        onChange={(e) =>
                          updateProjectItem(idx, "description", e.target.value)
                        }
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:border-blue-500 outline-none text-sm font-semibold resize-none transition"
                        placeholder="Describe the application goals, technical highlights, and your personal contribution..."
                      />
                    </div>
                  </div>
                ))}

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <button
                    onClick={addProjectItem}
                    className="flex items-center gap-2 px-4 py-2 text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100 rounded-xl hover:bg-blue-600 hover:text-white transition duration-200 cursor-pointer shadow-sm"
                  >
                    <FaPlus /> Add Project
                  </button>
                  <button
                    onClick={handleSaveProjects}
                    className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow hover:scale-[1.01] transition duration-200 cursor-pointer"
                  >
                    <FaSave /> Save Projects
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 6. Certifications Card (Editable) */}
          <div className="bg-white rounded-[28px] border border-slate-200/80 shadow-sm p-8 transition-all duration-300 hover:shadow-md">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg border border-blue-100">
                  <FaCertificate />
                </div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  Certifications
                </h2>
              </div>
              {!isEditingCertifications ? (
                <button
                  onClick={() => setIsEditingCertifications(true)}
                  className="flex items-center gap-2 px-4.5 py-2 text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100 rounded-xl hover:bg-blue-600 hover:text-white transition duration-200 shadow-sm cursor-pointer"
                >
                  <FaEdit /> Edit Certifications
                </button>
              ) : (
                <button
                  onClick={handleSaveCertifications}
                  className="flex items-center gap-2 px-4.5 py-2 text-xs font-bold bg-green-50 text-green-600 border border-green-100 rounded-xl hover:bg-green-600 hover:text-white transition duration-200 shadow-sm cursor-pointer"
                >
                  <FaSave /> Save Certifications
                </button>
              )}
            </div>

            {!isEditingCertifications ? (
              <div className="space-y-6">
                {certificationsForm.length === 0 ? (
                  <p className="text-slate-400 text-sm italic py-4">
                    No certifications listed yet. Click edit to add certifications.
                  </p>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    {certificationsForm.map((cert, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-50/50 rounded-2xl p-6 border border-slate-150 hover:shadow-md transition duration-300 flex flex-col justify-between"
                      >
                        <div>
                          <h3 className="text-base font-extrabold text-slate-800 truncate">
                            {cert.name || "Untitled Certification"}
                          </h3>
                          <p className="text-sm font-semibold text-slate-500 mt-1">
                            {cert.issuer || "Unknown Issuer"}
                          </p>
                          <div className="mt-3.5 space-y-2 text-xs text-slate-500 font-bold border-t border-slate-200/40 pt-3">
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
                          <div className="mt-4 pt-1">
                            <a
                              href={cert.credential_url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100 rounded-xl hover:bg-blue-600 hover:text-white transition duration-200 shadow-sm"
                            >
                              <FaExternalLinkAlt size={10} /> View Credential
                            </a>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {certificationsForm.map((cert, idx) => (
                  <div
                    key={idx}
                    className="p-6 bg-slate-50/50 rounded-2xl border border-slate-200 relative space-y-4 text-left"
                  >
                    <button
                      onClick={() => removeCertificationItem(idx)}
                      className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition cursor-pointer"
                      title="Remove Certification"
                    >
                      <FaTrash size={14} />
                    </button>
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                      Certification #{idx + 1}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
                          Certificate Name
                        </label>
                        <input
                          type="text"
                          required
                          value={cert.name}
                          onChange={(e) =>
                            updateCertificationItem(idx, "name", e.target.value)
                          }
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:border-blue-500 outline-none text-sm font-semibold transition"
                          placeholder="e.g. AWS Solutions Architect"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
                          Organization
                        </label>
                        <input
                          type="text"
                          required
                          value={cert.issuer}
                          onChange={(e) =>
                            updateCertificationItem(idx, "issuer", e.target.value)
                          }
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:border-blue-500 outline-none text-sm font-semibold transition"
                          placeholder="e.g. Amazon Web Services"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
                          Issue Date
                        </label>
                        <input
                          type="text"
                          required
                          value={cert.issue_date}
                          onChange={(e) =>
                            updateCertificationItem(idx, "issue_date", e.target.value)
                          }
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:border-blue-500 outline-none text-sm font-semibold transition"
                          placeholder="e.g. Jan 2025"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
                          Expiration Date
                        </label>
                        <input
                          type="text"
                          disabled={cert.is_never_expire}
                          value={cert.is_never_expire ? "" : cert.expiration_date}
                          onChange={(e) =>
                            updateCertificationItem(idx, "expiration_date", e.target.value)
                          }
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:border-blue-500 outline-none text-sm font-semibold transition disabled:bg-slate-100 disabled:cursor-not-allowed"
                          placeholder="e.g. Jan 2028"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
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
                        className="rounded text-blue-600 focus:ring-blue-555/20 border-slate-300 w-4 h-4"
                      />
                      <label
                        htmlFor={`is_never_expire_${idx}`}
                        className="text-xs font-bold text-slate-700 select-none cursor-pointer"
                      >
                        This credential does not expire
                      </label>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
                        Credential URL
                      </label>
                      <input
                        type="url"
                        value={cert.credential_url}
                        onChange={(e) =>
                          updateCertificationItem(idx, "credential_url", e.target.value)
                        }
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:border-blue-500 outline-none text-sm font-semibold transition"
                        placeholder="https://example.com/verify/..."
                      />
                    </div>
                  </div>
                ))}

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <button
                    onClick={addCertificationItem}
                    className="flex items-center gap-2 px-4 py-2 text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100 rounded-xl hover:bg-blue-600 hover:text-white transition duration-200 cursor-pointer shadow-sm"
                  >
                    <FaPlus /> Add Certification
                  </button>
                  <button
                    onClick={handleSaveCertifications}
                    className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl shadow hover:scale-[1.01] transition duration-200 cursor-pointer"
                  >
                    <FaSave /> Save Certifications
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (1/3 width) */}
        <div className="space-y-8">
          {/* 8. Resume Manager Card */}
          <div className="bg-white rounded-[30px] shadow-xl p-8 border border-slate-100 relative">
            <div className="flex items-center gap-3 mb-6">
              <FaFilePdf className="text-2xl text-red-500" />
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Resume Manager
              </h2>
            </div>

            {user?.resume?.filename ? (
              <div className="space-y-6">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-2 h-full bg-green-500"></div>
                  <h3 className="font-bold text-slate-800 truncate mb-1">
                    {user.resume.filename}
                  </h3>
                  <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">
                    Uploaded: {user.resume.uploadDate}
                  </span>

                  {/* ATS Score Indicator */}
                  {user.resume.atsScore && (
                    <div className="mt-4">
                      <div className="flex justify-between items-center text-xs font-bold text-slate-600 mb-1.5">
                        <span>ATS Score Assessment</span>
                        <span className="text-green-600 font-extrabold text-sm">
                          {user.resume.atsScore}%
                        </span>
                      </div>
                      <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-sky-400 to-green-500 transition-all duration-700"
                          style={{ width: `${user.resume.atsScore}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2 text-[10px] font-bold">
                  <button
                    onClick={() => navigate("/resume-analysis")}
                    className="flex items-center justify-center gap-1.5 py-3 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition cursor-pointer border-0 outline-none"
                  >
                    <FaEye /> View
                  </button>
                  <button
                    onClick={handleDownloadResume}
                    className="flex items-center justify-center gap-1.5 py-3 rounded-xl bg-green-50 text-green-600 hover:bg-green-100 transition cursor-pointer border-0 outline-none"
                  >
                    <FaDownload /> Get
                  </button>
                  <button
                    onClick={handleDeleteResume}
                    className="flex items-center justify-center gap-1.5 py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition cursor-pointer border-0 outline-none"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center">
                <p className="text-slate-400 text-sm font-medium">
                  No resume uploaded yet.
                </p>
              </div>
            )}

            <button
              onClick={triggerResumeUpload}
              className="w-full mt-5 flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-2xl font-bold shadow-md hover:scale-[1.01] transition cursor-pointer border-0 outline-none"
            >
              <FaUpload /> Upload New Resume
            </button>
            <input
              type="file"
              ref={resumeInputRef}
              onChange={handleResumeChange}
              accept=".pdf"
              className="hidden"
            />
          </div>

          {/* 6. Skills Overview Card */}
          <Skills />

          {/* 7. AI Profile Insights Card */}
          <AIProfileInsights />

          {/* Premium Security Card */}
          <div className="bg-white rounded-[30px] shadow-xl p-8 border border-slate-150/80 space-y-6 transition duration-300 hover:shadow-2xl">
            <div className="flex items-center gap-3.5 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl border border-blue-100 shadow-sm">
                <FaShieldAlt className="animate-pulse" />
              </div>
              <div className="text-left">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  Security Settings
                </h2>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">
                  Protect and manage your account access and safety
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 text-left">
              {/* Change Password */}
              <button
                onClick={() => navigate("/forgot-password")}
                className="group w-full flex items-center justify-between p-5 bg-gradient-to-r from-slate-50 to-white hover:from-blue-50/40 hover:to-sky-50/20 rounded-2xl border border-slate-150 hover:border-blue-200 transition-all duration-300 text-left cursor-pointer shadow-sm hover:shadow-md outline-none"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-md border border-blue-100 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                    <FaLock />
                  </div>
                  <div className="space-y-0.5">
                    <span className="font-extrabold text-slate-800 text-sm block tracking-tight">
                      Change Password
                    </span>
                    <span className="text-[11px] text-slate-400 font-semibold block tracking-normal">
                      Update your password via secure email OTP flow
                    </span>
                  </div>
                </div>
                <FaChevronRight className="text-slate-300 transition duration-300 group-hover:text-blue-500 group-hover:translate-x-1" size={12} />
              </button>

              {/* Report a Bug */}
              <button
                onClick={() => setIsBugModalOpen(true)}
                className="group w-full flex items-center justify-between p-5 bg-gradient-to-r from-slate-50 to-white hover:from-blue-50/40 hover:to-sky-50/20 rounded-2xl border border-slate-150 hover:border-blue-200 transition-all duration-300 text-left cursor-pointer shadow-sm hover:shadow-md outline-none"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-md border border-blue-100 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                    <FaBug />
                  </div>
                  <div className="space-y-0.5">
                    <span className="font-extrabold text-slate-800 text-sm block tracking-tight">
                      Report a Bug
                    </span>
                    <span className="text-[11px] text-slate-400 font-semibold block tracking-normal">
                      Submit application issues directly to the development team
                    </span>
                  </div>
                </div>
                <FaChevronRight className="text-slate-300 transition duration-300 group-hover:text-blue-500 group-hover:translate-x-1" size={12} />
              </button>

              {/* Delete Account */}
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="group w-full flex items-center justify-between p-5 bg-gradient-to-r from-slate-50 to-white hover:from-red-550/15 hover:to-rose-50/10 rounded-2xl border border-slate-150 hover:border-red-200 transition-all duration-300 text-left cursor-pointer shadow-sm hover:shadow-md outline-none"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center text-md border border-red-100 transition-colors group-hover:bg-red-600 group-hover:text-white">
                    <FaTrash />
                  </div>
                  <div className="space-y-0.5">
                    <span className="font-extrabold text-slate-800 text-sm block tracking-tight">
                      Delete Account
                    </span>
                    <span className="text-[11px] text-red-400 font-semibold block tracking-normal">
                      Permanently erase all user documents and profiles
                    </span>
                  </div>
                </div>
                <FaChevronRight className="text-slate-300 transition duration-300 group-hover:text-red-500 group-hover:translate-x-1" size={12} />
              </button>

              {/* Logout */}
              <button
                onClick={() => {
                  logout();
                  toast.success("Logged out successfully.");
                  navigate("/login", { replace: true });
                }}
                className="group w-full flex items-center justify-between p-5 bg-gradient-to-r from-slate-50 to-white hover:from-red-50/30 hover:to-rose-50/15 rounded-2xl border border-slate-150 hover:border-red-200 transition-all duration-300 text-left cursor-pointer shadow-sm hover:shadow-md outline-none"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center text-md border border-red-100 transition-colors group-hover:bg-red-600 group-hover:text-white">
                    <FaSignOutAlt />
                  </div>
                  <div className="space-y-0.5">
                    <span className="font-extrabold text-slate-800 text-sm block tracking-tight">
                      Logout Session
                    </span>
                    <span className="text-[11px] text-slate-400 font-semibold block tracking-normal">
                      Securely end session and clear credentials
                    </span>
                  </div>
                </div>
                <FaChevronRight className="text-slate-300 transition duration-300 group-hover:text-red-500 group-hover:translate-x-1" size={12} />
              </button>
            </div>
          </div>

          {/* Premium Contact Support Card */}
          <div className="bg-white rounded-[30px] shadow-xl p-8 border border-slate-150/80 space-y-6 transition duration-300 hover:shadow-2xl text-left">
            <div className="flex items-center gap-3.5 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl border border-blue-100 shadow-sm">
                <FaHeadset className="animate-bounce" style={{ animationDuration: "3s" }} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  Contact Support
                </h2>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">
                  Reach out directly for help and information
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Email */}
              <a
                href="mailto:meera.ldrp.7@gmail.com"
                className="group flex flex-col justify-between p-5 bg-gradient-to-br from-slate-50 to-white hover:from-blue-50/40 hover:to-sky-50/20 rounded-2xl border border-slate-150 hover:border-blue-200 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md decoration-none text-slate-800 animate-fade-in"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-md border border-blue-100 transition-colors group-hover:bg-blue-600 group-hover:text-white mb-4">
                  <FaEnvelope />
                </div>
                <div className="space-y-1">
                  <span className="font-extrabold text-slate-800 text-sm block tracking-tight">
                    Email Support
                  </span>
                  <span className="text-[11px] text-slate-500 font-semibold block break-all">
                    meera.ldrp.7@gmail.com
                  </span>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/meera-sachchade-208123395/"
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col justify-between p-5 bg-gradient-to-br from-slate-50 to-white hover:from-blue-50/40 hover:to-sky-50/20 rounded-2xl border border-slate-150 hover:border-blue-200 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md decoration-none text-slate-800 animate-fade-in"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-md border border-blue-100 transition-colors group-hover:bg-blue-600 group-hover:text-white mb-4">
                  <FaLinkedin />
                </div>
                <div className="space-y-1">
                  <span className="font-extrabold text-slate-800 text-sm block tracking-tight">
                    LinkedIn
                  </span>
                  <span className="text-[11px] text-slate-500 font-semibold block break-all">
                    meera-sachchade-208123395
                  </span>
                </div>
              </a>

              {/* Phone (Optional) */}
              <div
                className="group flex flex-col justify-between p-5 bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-150 shadow-sm cursor-default animate-fade-in"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center text-md border border-slate-100 mb-4">
                  <FaPhoneAlt />
                </div>
                <div className="space-y-1">
                  <span className="font-extrabold text-slate-800 text-sm block tracking-tight">
                    Phone Support
                  </span>
                  <span className="text-[11px] text-slate-400 font-semibold block">
                    +91 98765 43210 (Optional)
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Policy & Academic Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
        {/* 1. Privacy Policy Card */}
        <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-[30px] border border-slate-200/80 shadow-xl p-8 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 relative overflow-hidden flex flex-col justify-between group">
          <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500"></div>
          <div>
            <div className="flex items-center gap-4 mb-6 text-left">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl border border-blue-100 shadow-sm transition-colors group-hover:bg-blue-600 group-hover:text-white shrink-0">
                <FaShieldAlt />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Privacy Policy</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Data Usage & Protection</p>
              </div>
            </div>
            <p className="text-slate-500 text-xs font-semibold leading-relaxed mb-6 text-left">
              This policy describes how user documents and metrics are handled within our educational application environment.
            </p>
            <ul className="space-y-4 text-left">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-55/60 border border-blue-150 flex items-center justify-center shrink-0 mt-0.5 text-[10px] text-blue-650 font-black">✓</div>
                <p className="text-xs text-slate-650 font-semibold leading-relaxed">
                  <strong className="text-slate-800">Academic Project:</strong> Built solely as an educational college project.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-55/60 border border-blue-150 flex items-center justify-center shrink-0 mt-0.5 text-[10px] text-blue-650 font-black">✓</div>
                <p className="text-xs text-slate-650 font-semibold leading-relaxed">
                  <strong className="text-slate-800">No Government Affiliation:</strong> Skillora AI is not affiliated with any government agency or official body.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-55/60 border border-blue-150 flex items-center justify-center shrink-0 mt-0.5 text-[10px] text-blue-650 font-black">✓</div>
                <p className="text-xs text-slate-650 font-semibold leading-relaxed">
                  <strong className="text-slate-800">Resume Processing:</strong> Uploaded resumes are utilized strictly for AI resume diagnostic scoring and career path mapping.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-55/60 border border-blue-150 flex items-center justify-center shrink-0 mt-0.5 text-[10px] text-blue-650 font-black">✓</div>
                <p className="text-xs text-slate-650 font-semibold leading-relaxed">
                  <strong className="text-slate-800">Data Confidentiality:</strong> Personal data and files are strictly private and are never sold or shared with external parties.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-55/60 border border-blue-150 flex items-center justify-center shrink-0 mt-0.5 text-[10px] text-blue-650 font-black">✓</div>
                <p className="text-xs text-slate-650 font-semibold leading-relaxed">
                  <strong className="text-slate-800">Content Ownership:</strong> Users retain complete ownership rights over all uploaded resumes and academic data.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-55/60 border border-blue-150 flex items-center justify-center shrink-0 mt-0.5 text-[10px] text-blue-650 font-black">✓</div>
                <p className="text-xs text-slate-650 font-semibold leading-relaxed">
                  <strong className="text-slate-800">No Employment Guarantees:</strong> The platform does not guarantee placement, job offers, or internships.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-55/60 border border-blue-150 flex items-center justify-center shrink-0 mt-0.5 text-[10px] text-blue-650 font-black">✓</div>
                <p className="text-xs text-slate-650 font-semibold leading-relaxed">
                  <strong className="text-slate-800">Guidance Only:</strong> Intended solely for academic evaluation, resume reviews, and general guidance.
                </p>
              </li>
            </ul>
          </div>
          <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">
            <FaInfoCircle /> Last Updated: July 2026
          </div>
        </div>

        {/* 2. Terms & Conditions Card */}
        <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-[30px] border border-slate-200/80 shadow-xl p-8 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 relative overflow-hidden flex flex-col justify-between group">
          <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-blue-500 via-indigo-500 to-indigo-600"></div>
          <div>
            <div className="flex items-center gap-4 mb-6 text-left">
              <div className="w-12 h-12 rounded-2xl bg-blue-55 text-blue-600 flex items-center justify-center text-xl border border-blue-100 shadow-sm transition-colors group-hover:bg-blue-600 group-hover:text-white shrink-0">
                <FaInfoCircle />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Terms & Conditions</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Rules & Guidelines</p>
              </div>
            </div>
            <p className="text-slate-550 text-xs font-semibold leading-relaxed mb-6 text-left">
              Please review the basic terms governing academic demonstration, user responsibilities, and system updates.
            </p>
            <ul className="space-y-4 text-left">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-55/60 border border-blue-150 flex items-center justify-center shrink-0 mt-0.5 text-[10px] text-blue-650 font-black">✓</div>
                <p className="text-xs text-slate-650 font-semibold leading-relaxed">
                  <strong className="text-slate-800">Educational Platform:</strong> Built for demonstration and learning as a college Capstone initiative.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-55/60 border border-blue-150 flex items-center justify-center shrink-0 mt-0.5 text-[10px] text-blue-650 font-black">✓</div>
                <p className="text-xs text-slate-650 font-semibold leading-relaxed">
                  <strong className="text-slate-800">Suggestions Disclaimer:</strong> AI-generated advice, roadmaps, and scores are suggestions and reference metrics only.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-55/60 border border-blue-150 flex items-center justify-center shrink-0 mt-0.5 text-[10px] text-blue-650 font-black">✓</div>
                <p className="text-xs text-slate-650 font-semibold leading-relaxed">
                  <strong className="text-slate-800">Information Accuracy:</strong> Users are solely responsible for the validity and correctness of their uploaded profiles.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-55/60 border border-blue-150 flex items-center justify-center shrink-0 mt-0.5 text-[10px] text-blue-650 font-black">✓</div>
                <p className="text-xs text-slate-650 font-semibold leading-relaxed">
                  <strong className="text-slate-800">No Placement Assurance:</strong> The system does not guarantee matching jobs or internship selections.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-55/60 border border-blue-150 flex items-center justify-center shrink-0 mt-0.5 text-[10px] text-blue-650 font-black">✓</div>
                <p className="text-xs text-slate-650 font-semibold leading-relaxed">
                  <strong className="text-slate-800">Development Updates:</strong> Features and performance standards may be modified, improved, or retired during project cycles.
                </p>
              </li>
            </ul>
          </div>
          <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">
            <FaInfoCircle /> Terms Version 1.1
          </div>
        </div>

        {/* 3. About Skillora AI Card */}
        <div className="bg-gradient-to-br from-white to-blue-50/40 rounded-[30px] border border-blue-100 shadow-xl p-8 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 relative overflow-hidden flex flex-col justify-between group">
          <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600"></div>
          <div>
            <div className="flex items-center gap-4 mb-6 text-left">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl border border-blue-100 shadow-sm transition-colors group-hover:bg-blue-600 group-hover:text-white shrink-0">
                <FaGraduationCap />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">About Skillora AI</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Academic Project</p>
              </div>
            </div>
            <p className="text-slate-500 text-xs font-semibold leading-relaxed mb-6 text-left">
              Skillora AI is an AI-powered career development platform built as a college academic project to help students with resume analysis, skill matching, learning roadmaps, career insights, and job recommendations.
            </p>
            
            <div className="space-y-4">
              <span className="text-[11px] font-black uppercase tracking-wider text-blue-600 block border-b border-slate-100 pb-2 text-left">
                Team Members
              </span>
              <ul className="space-y-3.5 text-left">
                {/* Meera */}
                <li className="bg-slate-50/50 p-3.5 rounded-2xl border border-slate-150 flex flex-col gap-2 transition-colors hover:bg-slate-50">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-800 font-black text-sm">Meera Sachchade</span>
                    <span className="text-[9px] bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-md font-black border border-blue-100/50 uppercase tracking-wider">Team Lead</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 pt-1 border-t border-slate-100 text-[11px] font-bold text-slate-500">
                    <a href="mailto:meerasachchade14@gmail.com" className="hover:text-blue-650 flex items-center gap-1">
                      <FaEnvelope className="text-[10px] text-blue-500" /> meerasachchade14@gmail.com
                    </a>
                    <span>•</span>
                    <a href="https://www.linkedin.com/in/meera-sachchade-208123395/" target="_blank" rel="noreferrer" className="hover:text-blue-650 flex items-center gap-1">
                      <FaLinkedin className="text-[10px] text-blue-500" /> LinkedIn
                    </a>
                  </div>
                </li>
                {/* Janvi */}
                <li className="bg-slate-50/50 p-3.5 rounded-2xl border border-slate-150 flex flex-col gap-2 transition-colors hover:bg-slate-50">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-800 font-black text-sm">Janvi Ramani</span>
                    <span className="text-[9px] bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-md font-black border border-indigo-100/50 uppercase tracking-wider">Developer</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 pt-1 border-t border-slate-100 text-[11px] font-bold text-slate-500">
                    <a href="mailto:ramanijhanvi88@gmail.com" className="hover:text-blue-650 flex items-center gap-1">
                      <FaEnvelope className="text-[10px] text-blue-500" /> ramanijhanvi88@gmail.com
                    </a>
                    <span>•</span>
                    <a href="https://www.linkedin.com/in/jhanvi-ramani-a15b123a8/" target="_blank" rel="noreferrer" className="hover:text-blue-650 flex items-center gap-1">
                      <FaLinkedin className="text-[10px] text-blue-500" /> LinkedIn
                    </a>
                  </div>
                </li>
                {/* Nisha */}
                <li className="bg-slate-50/50 p-3.5 rounded-2xl border border-slate-150 flex flex-col gap-2 transition-colors hover:bg-slate-50">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-800 font-black text-sm">Nisha Satasiya</span>
                    <span className="text-[9px] bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-md font-black border border-indigo-100/50 uppercase tracking-wider">Developer</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 pt-1 border-t border-slate-100 text-[11px] font-bold text-slate-500">
                    <a href="mailto:nishasatasiya@gmail.com" className="hover:text-blue-650 flex items-center gap-1">
                      <FaEnvelope className="text-[10px] text-blue-500" /> nishasatasiya@gmail.com
                    </a>
                    <span>•</span>
                    <a href="https://www.linkedin.com/in/nisha-satasiya-b53276320/" target="_blank" rel="noreferrer" className="hover:text-blue-650 flex items-center gap-1">
                      <FaLinkedin className="text-[10px] text-blue-500" /> LinkedIn
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">
            <FaInfoCircle /> Skillora AI Project 2026
          </div>
        </div>
      </div>

      {/* Report Bug Modal */}
      {isBugModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xl p-4">
          <div className="bg-white rounded-[28px] shadow-2xl border border-slate-100 max-w-md w-full p-8 space-y-6 animate-fade-in">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <FaBug className="text-blue-600" /> Report a Bug
              </h3>
              <button
                onClick={() => setIsBugModalOpen(false)}
                className="text-slate-400 hover:text-slate-650 transition cursor-pointer bg-transparent border-0 outline-none"
              >
                <FaTimes size={18} />
              </button>
            </div>

            <form onSubmit={handleReportBug} className="space-y-5 text-left">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
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
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:border-blue-500 focus:bg-white outline-none text-sm font-medium transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
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
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:border-blue-500 focus:bg-white outline-none text-sm font-medium resize-none transition"
                />
              </div>

              <button
                type="submit"
                disabled={bugSubmitting}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white rounded-xl font-bold shadow-md hover:scale-[1.01] transition disabled:opacity-50 cursor-pointer border-0 outline-none text-sm uppercase tracking-wider"
              >
                {bugSubmitting ? "Sending Bug Report..." : "Send Bug Report"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Account Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xl p-4">
          <div className="bg-white rounded-[28px] shadow-2xl border border-slate-100 max-w-md w-full p-8 text-center space-y-5 animate-fade-in">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-red-50 text-red-600 flex items-center justify-center text-2xl border border-red-100 shadow-sm animate-pulse">
              <FaTrash />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                Delete Account Permanently?
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed font-semibold">
                This action is permanent and cannot be undone. All of your profile
                data, resumes, analysis history, matches, roadmaps, and registration
                records will be completely and permanently deleted from MongoDB.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3.5 font-bold text-xs pt-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="py-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-650 border border-slate-200 transition cursor-pointer outline-none"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white shadow transition hover:scale-[1.01] cursor-pointer border-0 outline-none"
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
