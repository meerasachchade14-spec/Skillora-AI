import { useState } from "react";
import {
FaRobot,
FaLinkedinIn,
FaGithub,
FaEnvelope,
FaPhone,
FaMapMarkerAlt,
} from "react-icons/fa";

const teamMembers = {
github: [
{
name: "Meera Sachchade",
link: "https://github.com/meerasachchade14-spec",
},
{
name: "Jhanvi Ramani",
link: "https://github.com/ramanijhanvi88",
},
{
name: "Nisha Satasia",
link: "https://github.com/NishaSatasiya",
},
],

linkedin: [
{
name: "Meera Sachchade",
link: "https://www.linkedin.com/in/meera-sachchade-208123395/",
},
{
name: "Jhanvi Ramani",
link: "https://www.linkedin.com/in/jhanvi-ramani-a15b123a8/",
},
{
name: "Nisha Satasia",
link: "https://www.linkedin.com/in/nisha-satasiya-b53276320/",
},
],

email: [
{
name: "Meera Sachchade",
link: "mailto:meerasachchade14@gmail.com",
},
{
name: "Jhanvi Ramani",
link: "mailto:ramanijhanvi88@gmail.com",
},
{
name: "Nisha Satasia",
link: "mailto:nishasatasiya@gmail.com",
},
],
};

function Footer({ darkMode }) {
const [openMenu, setOpenMenu] = useState(null);

const toggleMenu = (menu) => {
setOpenMenu(openMenu === menu ? null : menu);
};

return (
<footer
id="contact"
className={`border-t transition-colors duration-500 ${
        darkMode
          ? "bg-slate-950 border-slate-800"
          : "bg-gradient-to-r from-sky-50 via-white to-blue-50 border-sky-100"
      }`}
> <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">

```
    <div className="grid lg:grid-cols-2 gap-20">

      {/* LEFT SECTION */}

      <div>

        {/* Logo */}

        <div className="flex items-center gap-3">

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center text-white text-2xl">
            <FaRobot />
          </div>

          <div>

            <h2
              className={`text-3xl font-bold ${
                darkMode
                  ? "text-white"
                  : "text-slate-900"
              }`}
            >
              Skillora AI
            </h2>

            <p
              className={
                darkMode
                  ? "text-slate-400"
                  : "text-gray-500"
              }
            >
              Learn Smarter. Grow Faster.
            </p>

          </div>

        </div>

        {/* Description */}

        <p
          className={`mt-8 leading-8 max-w-lg ${
            darkMode
              ? "text-slate-300"
              : "text-gray-600"
          }`}
        >
          Skillora AI is an AI-powered career guidance platform that
          helps students analyze their resumes, identify skill gaps,
          discover career opportunities, and build personalized learning
          roadmaps using Artificial Intelligence and Machine Learning.
        </p>

        {/* SOCIAL LINKS */}

        <div className="flex gap-4 mt-8">

          {/* GITHUB */}

          <div className="relative">

            <button
              onClick={() => toggleMenu("github")}
              className={`w-12 h-12 rounded-xl shadow flex items-center justify-center transition ${
                darkMode
                  ? "bg-slate-800 text-slate-200 hover:bg-blue-600 hover:text-white"
                  : "bg-white text-slate-700 hover:bg-blue-600 hover:text-white"
              }`}
            >
              <FaGithub />
            </button>

            {openMenu === "github" && (
              <div
                className={`absolute bottom-14 left-0 shadow-xl rounded-xl p-3 w-56 z-20 border ${
                  darkMode
                    ? "bg-slate-800 border-slate-700"
                    : "bg-white border-blue-100"
                }`}
              >

                <p
                  className={`font-bold text-sm mb-2 ${
                    darkMode
                      ? "text-white"
                      : "text-slate-900"
                  }`}
                >
                  GitHub Profiles
                </p>

                {teamMembers.github.map((member) => (
                  <a
                    key={member.name}
                    href={member.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block text-sm rounded-lg px-2 py-2 transition ${
                      darkMode
                        ? "text-slate-300 hover:text-blue-400 hover:bg-slate-700"
                        : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    {member.name}
                  </a>
                ))}

              </div>
            )}

          </div>

          {/* LINKEDIN */}

          <div className="relative">

            <button
              onClick={() => toggleMenu("linkedin")}
              className={`w-12 h-12 rounded-xl shadow flex items-center justify-center transition ${
                darkMode
                  ? "bg-slate-800 text-slate-200 hover:bg-blue-600 hover:text-white"
                  : "bg-white text-slate-700 hover:bg-blue-600 hover:text-white"
              }`}
            >
              <FaLinkedinIn />
            </button>

            {openMenu === "linkedin" && (
              <div
                className={`absolute bottom-14 left-0 shadow-xl rounded-xl p-3 w-56 z-20 border ${
                  darkMode
                    ? "bg-slate-800 border-slate-700"
                    : "bg-white border-blue-100"
                }`}
              >

                <p
                  className={`font-bold text-sm mb-2 ${
                    darkMode
                      ? "text-white"
                      : "text-slate-900"
                  }`}
                >
                  LinkedIn Profiles
                </p>

                {teamMembers.linkedin.map((member) => (
                  <a
                    key={member.name}
                    href={member.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block text-sm rounded-lg px-2 py-2 transition ${
                      darkMode
                        ? "text-slate-300 hover:text-blue-400 hover:bg-slate-700"
                        : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    {member.name}
                  </a>
                ))}

              </div>
            )}

          </div>

          {/* EMAIL */}

          <div className="relative">

            <button
              onClick={() => toggleMenu("email")}
              className={`w-12 h-12 rounded-xl shadow flex items-center justify-center transition ${
                darkMode
                  ? "bg-slate-800 text-slate-200 hover:bg-blue-600 hover:text-white"
                  : "bg-white text-slate-700 hover:bg-blue-600 hover:text-white"
              }`}
            >
              <FaEnvelope />
            </button>

            {openMenu === "email" && (
              <div
                className={`absolute bottom-14 left-0 shadow-xl rounded-xl p-3 w-64 z-20 border ${
                  darkMode
                    ? "bg-slate-800 border-slate-700"
                    : "bg-white border-blue-100"
                }`}
              >

                <p
                  className={`font-bold text-sm mb-2 ${
                    darkMode
                      ? "text-white"
                      : "text-slate-900"
                  }`}
                >
                  Email Team Members
                </p>

                {teamMembers.email.map((member) => (
                  <a
                    key={member.name}
                    href={member.link}
                    className={`block text-sm rounded-lg px-2 py-2 transition ${
                      darkMode
                        ? "text-slate-300 hover:text-blue-400 hover:bg-slate-700"
                        : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    {member.name}
                  </a>
                ))}

              </div>
            )}

          </div>

        </div>

      </div>

      {/* CONTACT SECTION */}

      <div>

        <h3
          className={`text-2xl font-bold mb-8 ${
            darkMode
              ? "text-white"
              : "text-slate-900"
          }`}
        >
          Contact Us
        </h3>

        <div className="space-y-6">

          {/* EMAIL */}

          <div className="flex items-center gap-4">

            <FaEnvelope className="text-blue-500 text-xl" />

            <a
              href="mailto:meera.ldrp.7@gmail.com"
              className={`transition ${
                darkMode
                  ? "text-slate-300 hover:text-blue-400"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              meera.ldrp.7@gmail.com
            </a>

          </div>

          {/* PHONE */}

          <div className="flex items-center gap-4">

            <FaPhone className="text-blue-500 text-xl" />

            <span
              className={
                darkMode
                  ? "text-slate-300"
                  : "text-gray-700"
              }
            >
              +91 7984059194
            </span>

          </div>

          {/* LOCATION */}

          <div className="flex items-center gap-4">

            <FaMapMarkerAlt className="text-blue-500 text-xl" />

            <span
              className={
                darkMode
                  ? "text-slate-300"
                  : "text-gray-700"
              }
            >
              Gandhinagar, Gujarat, India
            </span>

          </div>

        </div>

      </div>

    </div>

  </div>

  {/* COPYRIGHT */}

  <div
    className={`border-t py-6 ${
      darkMode
        ? "border-slate-800"
        : "border-sky-100"
    }`}
  >

    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between">

      <p
        className={
          darkMode
            ? "text-slate-400"
            : "text-gray-500"
        }
      >
        © {new Date().getFullYear()} Skillora AI. All Rights Reserved.
      </p>

      <div className="flex gap-6 mt-3 md:mt-0">

        <a
          href="#"
          className={
            darkMode
              ? "text-slate-400 hover:text-blue-400"
              : "text-gray-500 hover:text-blue-600"
          }
        >
          Privacy
        </a>

        <a
          href="#"
          className={
            darkMode
              ? "text-slate-400 hover:text-blue-400"
              : "text-gray-500 hover:text-blue-600"
          }
        >
          Terms
        </a>

      </div>

    </div>

  </div>

</footer>


);
}

export default Footer;
