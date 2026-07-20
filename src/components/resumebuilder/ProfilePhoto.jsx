import { useRef } from "react";
import { Camera, Upload, Trash2 } from "lucide-react";

const ProfilePhoto = ({ value, onChange }) => {
  const inputRef = useRef(null);

  const handleSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Allow only images
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    // Max Size 2 MB
    if (file.size > 2 * 1024 * 1024) {
      alert("Image size should be less than 2 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      onChange(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    onChange("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="w-full">

      <label className="block mb-3 text-sm font-semibold text-gray-700">
        Profile Photo
      </label>

      <div className="flex flex-col items-center">

        <div className="relative">

          {value ? (
            <img
              src={value}
              alt="Profile"
              className="w-36 h-36 rounded-full object-cover border-4 border-blue-500 shadow-lg"
            />
          ) : (
            <div className="w-36 h-36 rounded-full bg-gray-200 flex items-center justify-center border-4 border-dashed border-gray-300">
              <Camera size={40} className="text-gray-500" />
            </div>
          )}

        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleSelect}
        />

        <div className="flex gap-3 mt-5">

          <button
            type="button"
            onClick={() => inputRef.current.click()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            <Upload size={18} />
            Upload
          </button>

          {value && (
            <button
              type="button"
              onClick={removePhoto}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
            >
              <Trash2 size={18} />
              Remove
            </button>
          )}

        </div>

        <p className="text-xs text-gray-500 mt-3 text-center">
          JPG, PNG or WEBP <br />
          Maximum Size: 2 MB
        </p>

      </div>

    </div>
  );
};

export default ProfilePhoto;