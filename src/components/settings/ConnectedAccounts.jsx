import { useState } from 'react';
import {
  FaLink,
  FaGoogle,
  FaLinkedin,
  FaGithub,
  FaMicrosoft,
  FaCloud,
  FaDropbox,
  FaCheckCircle,
  FaTimesCircle,
  FaSyncAlt,
} from 'react-icons/fa';

function ConnectedAccounts() {
  const [accounts, setAccounts] = useState([
    {
      id: 'google',
      name: 'Google',
      icon: <FaGoogle className="text-red-500 text-2xl" />,
      connected: true,
      email: 'john@gmail.com',
      lastSync: '2 hours ago',
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: <FaLinkedin className="text-blue-600 text-2xl" />,
      connected: true,
      email: 'linkedin.com/in/johndoe',
      lastSync: 'Yesterday',
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: <FaGithub className="text-gray-800 text-2xl" />,
      connected: true,
      email: 'github.com/johndoe',
      lastSync: '5 minutes ago',
    },
    {
      id: 'microsoft',
      name: 'Microsoft',
      icon: <FaMicrosoft className="text-blue-500 text-2xl" />,
      connected: false,
      email: 'Not connected',
      lastSync: '-',
    },
    {
      id: 'gdrive',
      name: 'Google Drive',
      icon: <FaCloud className="text-green-500 text-2xl" />,
      connected: true,
      email: 'Resume backup enabled',
      lastSync: 'Today',
    },
    {
      id: 'dropbox',
      name: 'Dropbox',
      icon: <FaDropbox className="text-blue-500 text-2xl" />,
      connected: false,
      email: 'Not connected',
      lastSync: '-',
    },
  ]);

  const toggleConnection = (id) => {
    setAccounts((prev) =>
      prev.map((account) =>
        account.id === id
          ? {
              ...account,
              connected: !account.connected,
              email: !account.connected
                ? `Connected with ${account.name}`
                : 'Not connected',
              lastSync: !account.connected ? 'Just now' : '-',
            }
          : account
      )
    );
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center text-white text-2xl">
          <FaLink />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-slate-800">
            Connected Accounts
          </h2>
          <p className="text-gray-500">
            Connect external services to sync your profile, resumes and projects.
          </p>
        </div>
      </div>

      {/* Accounts */}
      <div className="space-y-5">
        {accounts.map((account) => (
          <div
            key={account.id}
            className="border rounded-2xl p-5 hover:border-sky-400 transition"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-5">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center">
                  {account.icon}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-xl font-bold text-slate-800">
                      {account.name}
                    </h3>

                    {account.connected ? (
                      <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-600 text-sm font-semibold">
                        <FaCheckCircle />
                        Connected
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 text-red-600 text-sm font-semibold">
                        <FaTimesCircle />
                        Disconnected
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600 mt-1">{account.email}</p>

                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                    <FaSyncAlt className="text-sky-600" />
                    Last sync: {account.lastSync}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                {account.connected && (
                  <button className="px-4 py-2 rounded-xl border border-sky-300 text-sky-600 hover:bg-sky-50 transition flex items-center gap-2">
                    <FaSyncAlt />
                    Sync
                  </button>
                )}

                <button
                  onClick={() => toggleConnection(account.id)}
                  className={`px-5 py-2 rounded-xl text-white transition ${
                    account.connected
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-sky-500 hover:bg-blue-600'
                  }`}
                >
                  {account.connected ? 'Disconnect' : 'Connect'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info Box */}
      <div className="mt-8 bg-sky-50 rounded-2xl p-6 border border-sky-100">
        <h3 className="text-xl font-bold text-slate-800 mb-3">
          Why connect accounts?
        </h3>

        <ul className="space-y-2 text-gray-600">
          <li>• Import projects directly from GitHub</li>
          <li>• Sync your LinkedIn profile information</li>
          <li>• Backup resumes automatically to Google Drive</li>
          <li>• Use single sign-on for faster login</li>
          <li>• Keep your career data synchronized across platforms</li>
        </ul>
      </div>
    </div>
  );
}

export default ConnectedAccounts;