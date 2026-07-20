import {
  FaGithub,
  FaLinkedin,
  FaGlobe,
  FaEnvelope,
  FaTwitter,
  FaExternalLinkAlt,
} from "react-icons/fa";

const socialLinks = [
  {
    name: "GitHub",
    username: "github.com/johndoe",
    url: "#",
    icon: <FaGithub className="text-3xl text-gray-800" />,
    color: "hover:bg-gray-100",
  },
  {
    name: "LinkedIn",
    username: "linkedin.com/in/johndoe",
    url: "#",
    icon: <FaLinkedin className="text-3xl text-blue-600" />,
    color: "hover:bg-blue-50",
  },
  {
    name: "Portfolio",
    username: "www.johndoe.dev",
    url: "#",
    icon: <FaGlobe className="text-3xl text-green-600" />,
    color: "hover:bg-green-50",
  },
  {
    name: "Email",
    username: "john@gmail.com",
    url: "#",
    icon: <FaEnvelope className="text-3xl text-red-500" />,
    color: "hover:bg-red-50",
  },
  {
    name: "Twitter / X",
    username: "@johndoe",
    url: "#",
    icon: <FaTwitter className="text-3xl text-sky-500" />,
    color: "hover:bg-sky-50",
  },
];

function SocialLinks() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* Header */}

      <div className="mb-8">

        <h2 className="text-3xl font-bold text-slate-800">
          Social Links
        </h2>

        <p className="text-gray-500 mt-2">
          Connect with me through professional platforms.
        </p>

      </div>

      {/* Cards */}

      <div className="grid md:grid-cols-2 gap-6">

        {socialLinks.map((item, index) => (

          <div
            key={index}
            className={`border rounded-2xl p-6 transition duration-300 ${item.color}`}
          >

            <div className="flex justify-between items-center">

              <div className="flex items-center gap-5">

                {item.icon}

                <div>

                  <h3 className="text-xl font-bold text-slate-800">
                    {item.name}
                  </h3>

                  <p className="text-gray-500 mt-1">
                    {item.username}
                  </p>

                </div>

              </div>

              <button className="w-12 h-12 rounded-full bg-sky-500 text-white flex items-center justify-center hover:bg-blue-600 transition">

                <FaExternalLinkAlt />

              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default SocialLinks;