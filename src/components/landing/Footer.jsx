import {
  FaRobot,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Footer() {
  return (
    <footer
      id="contact"
      className="bg-linear-to-r from-sky-50 via-white to-blue-50 border-t border-sky-100"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">

        <div className="grid lg:grid-cols-2 gap-20">

          {/* Left */}

          <div>

            <div className="flex items-center gap-3">

              <div className="w-14 h-14 rounded-2xl bg-linear-to-r from-sky-500 to-blue-600 flex items-center justify-center text-white text-2xl">

                <FaRobot />

              </div>

              <div>

                <h2 className="text-3xl font-bold">

                  Skillora AI

                </h2>

                <p className="text-gray-500">

                  Learn Smarter. Grow Faster.

                </p>

              </div>

            </div>

            <p className="text-gray-600 mt-8 leading-8 max-w-lg">

              Skillora AI is an AI-powered career guidance platform that
              helps students build ATS-friendly resumes, analyze skills,
              prepare for interviews and discover the best career path.

            </p>

            <div className="flex gap-4 mt-8">

              {[FaFacebookF, FaInstagram, FaLinkedinIn, FaGithub].map(
                (Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-12 h-12 rounded-xl bg-white shadow flex items-center justify-center hover:bg-blue-600 hover:text-white transition"
                  >
                    <Icon />
                  </a>
                )
              )}

            </div>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-2xl font-bold mb-8">

              Contact Us

            </h3>

            <div className="space-y-6">

              <div className="flex items-center gap-4">

                <FaEnvelope className="text-blue-600 text-xl" />

                <span>skillora.ai@gmail.com</span>

              </div>

              <div className="flex items-center gap-4">

                <FaPhone className="text-blue-600 text-xl" />

                <span>+91 98765 43210</span>

              </div>

              <div className="flex items-center gap-4">

                <FaMapMarkerAlt className="text-blue-600 text-xl" />

                <span>Gandhinagar, Gujarat, India</span>

              </div>

            </div>

          </div>

        </div>

      </div>

      <div className="border-t border-sky-100 py-6">

        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between">

          <p className="text-gray-500">

            © {new Date().getFullYear()} Skillora AI. All Rights Reserved.

          </p>

          <div className="flex gap-6 mt-3 md:mt-0">

            <a href="#">Privacy</a>

            <a href="#">Terms</a>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;