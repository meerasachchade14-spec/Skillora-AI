import UploadCard from "../../components/upload/UploadCard";
import UploadArea from "../../components/upload/UploadArea";
import UploadedResume from "../../components/upload/UploadedResume";

function ResumeUpload() {
  return (
    <div className="space-y-8">

      <UploadCard />

      <div className="grid lg:grid-cols-2 gap-8">

        <UploadArea />

        <UploadedResume />

      </div>

    </div>
  );
}

export default ResumeUpload;