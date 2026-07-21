import { useState } from 'react';
import {
  FaQuestionCircle,
  FaEnvelope,
  FaPhoneAlt,
  FaBook,
  FaVideo,
  FaPaperPlane,
  FaComments,
} from 'react-icons/fa';

function HelpSupport() {
  const [ticket, setTicket] = useState({
    subject: '',
    category: 'general',
    message: '',
  });

  const faqs = [
    {
      question: 'How do I improve my ATS score?',
      answer:
        'Use relevant keywords, clear headings, and quantify your achievements in the resume.',
    },
    {
      question: 'Can I download my resume in PDF format?',
      answer:
        'Yes, Skillora AI allows you to export resumes as PDF directly from the Resume Builder.',
    },
    {
      question: 'How does AI job recommendation work?',
      answer:
        'Our AI matches your skills, projects, and resume with job descriptions to find relevant opportunities.',
    },
    {
      question: 'Is my data secure?',
      answer:
        'Yes, we use encryption and secure authentication methods to protect your personal data.',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Support ticket submitted successfully!');
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center text-white text-2xl">
          <FaQuestionCircle />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-slate-800">
            Help & Support
          </h2>
          <p className="text-gray-500">
            Get help, contact support, and access learning resources.
          </p>
        </div>
      </div>

      {/* Support Channels */}
      <div className="grid md:grid-cols-3 gap-5 mb-10">
        <div className="bg-sky-50 border border-sky-100 rounded-2xl p-5 text-center">
          <FaEnvelope className="text-3xl text-sky-600 mx-auto mb-3" />
          <h3 className="font-bold text-slate-800">Email Support</h3>
          <p className="text-gray-600 mt-2">support@skillora.ai</p>
        </div>

        <div className="bg-sky-50 border border-sky-100 rounded-2xl p-5 text-center">
          <FaPhoneAlt className="text-3xl text-sky-600 mx-auto mb-3" />
          <h3 className="font-bold text-slate-800">Phone Support</h3>
          <p className="text-gray-600 mt-2">+91 98765 43210</p>
        </div>

        <div className="bg-sky-50 border border-sky-100 rounded-2xl p-5 text-center">
          <FaComments className="text-3xl text-sky-600 mx-auto mb-3" />
          <h3 className="font-bold text-slate-800">Live Chat</h3>
          <p className="text-gray-600 mt-2">Available 24/7</p>
        </div>
      </div>

      {/* FAQ */}
      <div className="mb-10">
        <h3 className="text-2xl font-bold text-slate-800 mb-5">
          Frequently Asked Questions
        </h3>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="border rounded-2xl p-5 group"
            >
              <summary className="cursor-pointer font-semibold text-slate-800 group-open:text-sky-600">
                {faq.question}
              </summary>
              <p className="text-gray-600 mt-3 leading-7">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>

      {/* Resources */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="border rounded-2xl p-6 hover:border-sky-400 transition">
          <div className="flex items-center gap-3 mb-3">
            <FaBook className="text-2xl text-sky-600" />
            <h3 className="text-xl font-bold text-slate-800">
              Documentation
            </h3>
          </div>
          <p className="text-gray-600 mb-4">
            Read detailed guides and feature documentation.
          </p>
          <button className="text-sky-600 font-semibold hover:underline">
            Open Docs →
          </button>
        </div>

        <div className="border rounded-2xl p-6 hover:border-sky-400 transition">
          <div className="flex items-center gap-3 mb-3">
            <FaVideo className="text-2xl text-sky-600" />
            <h3 className="text-xl font-bold text-slate-800">
              Tutorial Videos
            </h3>
          </div>
          <p className="text-gray-600 mb-4">
            Watch step-by-step tutorials for Skillora AI modules.
          </p>
          <button className="text-sky-600 font-semibold hover:underline">
            Watch Videos →
          </button>
        </div>
      </div>

      {/* Support Ticket */}
      <div className="bg-slate-50 rounded-3xl p-6">
        <h3 className="text-2xl font-bold text-slate-800 mb-6">
          Submit a Support Ticket
        </h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 font-semibold text-slate-700">
              Subject
            </label>
            <input
              type="text"
              value={ticket.subject}
              onChange={(e) =>
                setTicket({ ...ticket, subject: e.target.value })
              }
              placeholder="Enter issue subject"
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-slate-700">
              Category
            </label>
            <select
              value={ticket.category}
              onChange={(e) =>
                setTicket({ ...ticket, category: e.target.value })
              }
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none"
            >
              <option value="general">General</option>
              <option value="billing">Billing</option>
              <option value="technical">Technical Issue</option>
              <option value="account">Account Support</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-semibold text-slate-700">
              Message
            </label>
            <textarea
              rows="5"
              value={ticket.message}
              onChange={(e) =>
                setTicket({ ...ticket, message: e.target.value })
              }
              placeholder="Describe your issue in detail"
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none resize-none"
              required
            />
          </div>

          <button
            type="submit"
            className="flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:scale-105 transition"
          >
            <FaPaperPlane />
            Submit Ticket
          </button>
        </form>
      </div>
    </div>
  );
}

export default HelpSupport;