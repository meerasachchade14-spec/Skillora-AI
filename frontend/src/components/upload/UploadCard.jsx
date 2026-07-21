import { FaCloudUploadAlt } from "react-icons/fa";

function UploadCard() {
  return (
    <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-3xl p-10 text-white shadow-xl">

      <div className="flex items-center gap-5">

        <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-5xl">

          <FaCloudUploadAlt />

        </div>

        <div>

          <h1 className="text-4xl font-bold">
            Upload Your Resume
          </h1>

          <p className="mt-2 text-blue-100 text-lg">
            Upload your resume in PDF or DOCX format to receive AI-powered ATS analysis and personalized career recommendations.
          </p>

        </div>

      </div>

    </div>
  );
}

export default UploadCard;