import { useState, useEffect } from "react";
import UploadCard from "../../components/upload/UploadCard";
import UploadArea from "../../components/upload/UploadArea";
import UploadedResume from "../../components/upload/UploadedResume";
import resumeService from "../../services/resumeService";

function ResumeUpload() {
  const [resumes, setResumes] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchResumes = async () => {
    try {
      const res = await resumeService.getResumes();
      if (res.success && res.data) {
        setResumes(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch resumes", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("resume_file", file);

    try {
      const res = await resumeService.uploadResume(formData);
      if (res.success && res.data) {
        setResumes((prev) => [res.data, ...prev]);
        alert("Resume uploaded successfully!");
      } else {
        alert(res.message || "Upload failed");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error uploading resume");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-8">
      <UploadCard />
      <div className="grid lg:grid-cols-2 gap-8">
        <UploadArea onUpload={handleUpload} uploading={uploading} />
        <UploadedResume resumes={resumes} loading={loading} />
      </div>
    </div>
  );
}

export default ResumeUpload;