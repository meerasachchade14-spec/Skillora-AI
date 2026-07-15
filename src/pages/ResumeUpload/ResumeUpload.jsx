import UploadCard from "../../components/upload/UploadCard";
import UploadArea from "../../components/upload/UploadArea";
import UploadedResume from "../../components/upload/UploadedResume";

function ResumeUpload() {
  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <UploadCard />

      <div className="grid lg:grid-cols-2 gap-8 mt-8">

        <UploadArea />

        <UploadedResume />

      </div>

    </div>
  );
}

export default ResumeUpload;