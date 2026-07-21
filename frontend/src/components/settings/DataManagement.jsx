import {
  FaDatabase,
  FaDownload,
  FaFileExport,
  FaCloudUploadAlt,
  FaUndo,
  FaTrashAlt,
  FaChartPie,
  FaSave,
} from 'react-icons/fa';

function DataManagement() {
  const storage = {
    used: 3.2,
    total: 10,
    percentage: 32,
  };

  const dataItems = [
    {
      title: 'Account Data',
      description: 'Download your complete account information and settings.',
      icon: <FaDownload className="text-sky-600 text-2xl" />,
      action: 'Download',
      color: 'bg-sky-500 hover:bg-blue-600',
    },
    {
      title: 'Export Resumes',
      description: 'Export all resumes in ZIP format.',
      icon: <FaFileExport className="text-green-600 text-2xl" />,
      action: 'Export',
      color: 'bg-green-500 hover:bg-green-600',
    },
    {
      title: 'Create Backup',
      description: 'Create a secure backup of your profile and career data.',
      icon: <FaCloudUploadAlt className="text-purple-600 text-2xl" />,
      action: 'Create',
      color: 'bg-purple-500 hover:bg-purple-600',
    },
    {
      title: 'Restore Backup',
      description: 'Restore your account from a previously created backup.',
      icon: <FaUndo className="text-orange-500 text-2xl" />,
      action: 'Restore',
      color: 'bg-orange-500 hover:bg-orange-600',
    },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center text-white text-2xl">
          <FaDatabase />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-slate-800">
            Data Management
          </h2>
          <p className="text-gray-500">
            Manage backups, exports and storage usage for your Skillora AI account.
          </p>
        </div>
      </div>

      {/* Storage Usage */}
      <div className="bg-slate-50 rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <FaChartPie className="text-sky-600 text-2xl" />
          <h3 className="text-2xl font-bold text-slate-800">
            Storage Usage
          </h3>
        </div>

        <div className="flex justify-between mb-3">
          <span className="font-semibold text-slate-700">
            {storage.used} GB used of {storage.total} GB
          </span>
          <span className="font-bold text-sky-600">
            {storage.percentage}%
          </span>
        </div>

        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sky-500 to-blue-600 rounded-full"
            style={{ width: `${storage.percentage}%` }}
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white rounded-xl p-4 border">
            <p className="text-gray-500 text-sm">Resumes</p>
            <h4 className="text-xl font-bold text-slate-800 mt-1">1.8 GB</h4>
          </div>

          <div className="bg-white rounded-xl p-4 border">
            <p className="text-gray-500 text-sm">AI Reports</p>
            <h4 className="text-xl font-bold text-slate-800 mt-1">0.9 GB</h4>
          </div>

          <div className="bg-white rounded-xl p-4 border">
            <p className="text-gray-500 text-sm">Backups</p>
            <h4 className="text-xl font-bold text-slate-800 mt-1">0.5 GB</h4>
          </div>
        </div>
      </div>

      {/* Data Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        {dataItems.map((item, index) => (
          <div
            key={index}
            className="border rounded-2xl p-6 hover:border-sky-400 transition"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center">
                {item.icon}
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-800">
                  {item.title}
                </h3>
                <p className="text-gray-500 mt-2 leading-6">
                  {item.description}
                </p>
              </div>
            </div>

            <button
              className={`mt-6 px-5 py-3 rounded-xl text-white transition ${item.color}`}
            >
              {item.action}
            </button>
          </div>
        ))}
      </div>

      {/* Backup Schedule */}
      <div className="mt-8 bg-sky-50 rounded-2xl p-6 border border-sky-100">
        <div className="flex items-center gap-3 mb-4">
          <FaSave className="text-sky-600 text-2xl" />
          <h3 className="text-2xl font-bold text-slate-800">
            Automatic Backup
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-4 text-slate-700">
          <p><strong>Status:</strong> Enabled</p>
          <p><strong>Frequency:</strong> Weekly</p>
          <p><strong>Last Backup:</strong> 18 July 2026</p>
          <p><strong>Next Backup:</strong> 25 July 2026</p>
        </div>

        <button className="mt-5 px-6 py-3 rounded-xl bg-sky-500 text-white hover:bg-blue-600 transition">
          Change Backup Schedule
        </button>
      </div>

      {/* Clear AI History */}
      <div className="mt-8 border border-red-300 bg-red-50 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="flex items-center gap-3 text-red-600">
          <FaTrashAlt className="text-2xl" />
          <div>
            <h3 className="text-xl font-bold">Clear AI History</h3>
            <p className="text-red-500 text-sm">
              Remove stored AI conversations, resume analyses and recommendation history.
            </p>
          </div>
        </div>

        <Spacer />

        <button className="px-6 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition">
          Clear History
        </button>
      </div>
    </div>
  );
}

export default DataManagement;