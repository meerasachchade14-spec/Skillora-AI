import { useRef, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

function UploadArea() {

  const inputRef = useRef(null);

  const [file, setFile] = useState(null);

  const handleFile = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <h2 className="text-2xl font-bold mb-6">
        Upload Resume
      </h2>

      <div
        onClick={() => inputRef.current.click()}
        className="border-2 border-dashed border-sky-400 rounded-3xl p-16 text-center cursor-pointer hover:bg-sky-50 transition"
      >

        <FaCloudUploadAlt className="text-7xl text-sky-500 mx-auto" />

        <h3 className="text-2xl font-bold mt-6">

          Drag & Drop Resume Here

        </h3>

        <p className="text-gray-500 mt-2">

          PDF or DOCX (Max 5MB)

        </p>

        <button
          className="mt-8 px-8 py-4 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >

          Browse File

        </button>

        <input
          ref={inputRef}
          type="file"
          hidden
          accept=".pdf,.doc,.docx"
          onChange={handleFile}
        />

      </div>

      {file && (

        <div className="mt-6 bg-green-50 border border-green-200 rounded-2xl p-4">

          <p className="font-semibold text-green-700">

            Selected File:

          </p>

          <p>{file.name}</p>

        </div>

      )}

    </div>
  );
}

export default UploadArea;