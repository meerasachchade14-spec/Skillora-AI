import { FaFilePdf } from "react-icons/fa";

function UploadedResume() {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <h2 className="text-2xl font-bold mb-6">
        Uploaded Resume
      </h2>

      <div className="border rounded-2xl p-6 flex items-center gap-5">

        <FaFilePdf className="text-5xl text-red-500" />

        <div>

          <h3 className="font-bold">
            Resume.pdf
          </h3>

          <p className="text-gray-500">
            Ready for AI Analysis
          </p>

        </div>

      </div>

      <button className="w-full mt-8 py-4 rounded-xl bg-blue-600 text-white font-semibold">
        Analyze Resume
      </button>

    </div>
  );
}

export default UploadedResume;