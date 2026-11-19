import { useState, useEffect } from "react";
import {
  FaComments,
  FaChevronDown,
  FaChevronUp,
  FaBolt,
  FaLightbulb,
  FaCode,
  FaBrain,
  FaRocket,
  FaSearch,
  FaClipboardList,
} from "react-icons/fa";
import careerService from "../../services/careerService";

// ─── Level configuration ───────────────────────────────────────────────────
const LEVELS = [
  {
    key: "beginner",
    label: "Beginner",
    emoji: "🟢",
    color: "emerald",
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
    tab: "bg-emerald-500 text-white",
    tabIdle: "text-emerald-600 hover:bg-emerald-50 border-emerald-200",
    ring: "ring-emerald-300",
    icon: FaCode,
    description: "Conceptual & definitional questions on your existing skills",
  },
  {
    key: "intermediate",
    label: "Intermediate",
    emoji: "🟡",
    color: "amber",
    badge: "bg-amber-100 text-amber-700 border-amber-200",
    tab: "bg-amber-500 text-white",
    tabIdle: "text-amber-600 hover:bg-amber-50 border-amber-200",
    ring: "ring-amber-300",
    icon: FaBrain,
    description: "Applied problem-solving using your matched skills",
  },
  {
    key: "advanced",
    label: "Advanced",
    emoji: "🔴",
    color: "rose",
    badge: "bg-rose-100 text-rose-700 border-rose-200",
    tab: "bg-rose-500 text-white",
    tabIdle: "text-rose-600 hover:bg-rose-50 border-rose-200",
    ring: "ring-rose-300",
    icon: FaRocket,
    description: "Architecture & design — targets your skill gaps",
  },
];

// ─── Single Question Card ──────────────────────────────────────────────────
function QuestionCard({ item, index, levelCfg }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`rounded-2xl border bg-white shadow-sm transition-all duration-200 hover:shadow-md ${
        open ? `ring-2 ${levelCfg.ring}` : "border-slate-200"
      }`}
    >
      {/* Question row */}
      <button
        className="w-full text-left px-5 py-4 flex items-start gap-4 group"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {/* Number badge */}
        <span
          className={`flex-shrink-0 w-7 h-7 rounded-full text-xs font-black flex items-center justify-center border ${levelCfg.badge}`}
        >
          {index + 1}
        </span>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-800 leading-snug">
            {item.question}
          </p>
          {/* Skill chip */}
          <span
            className={`inline-block mt-2 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${levelCfg.badge}`}
          >
            {item.skill}
          </span>
        </div>

        {/* Expand icon */}
        <span className="flex-shrink-0 text-slate-400 group-hover:text-slate-600 mt-0.5 transition-colors">
          {open ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
        </span>
      </button>

      {/* Hint panel */}
      {open && (
        <div className="px-5 pb-4 pt-0 border-t border-slate-100">
          <div className="flex items-start gap-2 mt-3">
            <FaLightbulb className="text-amber-400 flex-shrink-0 mt-0.5" size={13} />
            <p className="text-xs text-slate-500 leading-relaxed">
              <span className="font-bold text-slate-700">Answering tip: </span>
              {item.hint}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────
function InterviewQuestions() {
  const [availableRoles, setAvailableRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [customJD, setCustomJD] = useState("");
  const [useCustomJD, setUseCustomJD] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState("beginner");
  const [error, setError] = useState("");

  // Fetch role list once on mount
  useEffect(() => {
    careerService
      .getAvailableRoles()
      .then((data) => setAvailableRoles(data.roles || []))
      .catch(() => setAvailableRoles([]));
  }, []);

  const canGenerate = useCustomJD
    ? customJD.trim().length > 20
    : selectedRole.trim().length > 0;

  const handleGenerate = async () => {
    if (!canGenerate) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const payload = useCustomJD
        ? { job_description: customJD.trim() }
        : { job_role: selectedRole };

      const data = await careerService.generateInterviewQuestions(payload);
      setResult(data);
      setActiveTab("beginner");
    } catch (err) {
      setError(
        err?.response?.data?.error ||
          "Failed to generate questions. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const activeLevelCfg = LEVELS.find((l) => l.key === activeTab) || LEVELS[0];
  const activeQuestions = result?.[activeTab] || [];

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-black flex items-center gap-3 text-slate-900">
            <FaComments className="text-blue-600" />
            Interview Questions
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Personalised questions generated from your resume skills &amp; target role
          </p>
        </div>
        {result && (
          <div className="text-right">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {result.summary?.total_questions} Questions
            </span>
            <br />
            <span className="text-xs text-slate-400">
              {result.summary?.skills_covered} skills covered
            </span>
          </div>
        )}
      </div>

      {/* ── Role / JD Selector ── */}
      <div className="bg-slate-50 rounded-2xl p-5 mb-6 border border-slate-200">
        {/* Toggle */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setUseCustomJD(false)}
            className={`flex-1 py-2 rounded-xl text-sm font-bold border transition-all ${
              !useCustomJD
                ? "bg-blue-600 text-white border-blue-600 shadow"
                : "bg-white text-slate-600 border-slate-300 hover:bg-blue-50"
            }`}
          >
            <FaClipboardList className="inline mr-2 opacity-80" />
            Select Job Role
          </button>
          <button
            onClick={() => setUseCustomJD(true)}
            className={`flex-1 py-2 rounded-xl text-sm font-bold border transition-all ${
              useCustomJD
                ? "bg-blue-600 text-white border-blue-600 shadow"
                : "bg-white text-slate-600 border-slate-300 hover:bg-blue-50"
            }`}
          >
            <FaSearch className="inline mr-2 opacity-80" />
            Paste Job Description
          </button>
        </div>

        {/* Role Dropdown */}
        {!useCustomJD && (
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            <option value="">— Choose a target job role —</option>
            {availableRoles.map((r) => (
              <option key={r.key} value={r.key}>
                {r.label}
              </option>
            ))}
          </select>
        )}

        {/* Custom JD textarea */}
        {useCustomJD && (
          <textarea
            value={customJD}
            onChange={(e) => setCustomJD(e.target.value)}
            rows={4}
            placeholder="Paste the job description here (at least 20 characters)…"
            className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
          />
        )}

        {/* Generate button */}
        <button
          onClick={handleGenerate}
          disabled={!canGenerate || loading}
          className={`mt-4 w-full py-3 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all ${
            canGenerate && !loading
              ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-md hover:shadow-lg hover:scale-[1.01]"
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
          }`}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              Generating questions…
            </>
          ) : (
            <>
              <FaBolt />
              Generate Interview Questions
            </>
          )}
        </button>

        {error && (
          <p className="mt-3 text-sm text-rose-600 font-semibold text-center">
            ⚠️ {error}
          </p>
        )}
      </div>

      {/* ── Results ── */}
      {result && (
        <div className="fade-in">
          {/* Skills used banner */}
          {result.resume_skills_used?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5 items-center">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
                Skills used:
              </span>
              {result.resume_skills_used.map((s) => (
                <span
                  key={s}
                  className="text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-0.5 rounded-full"
                >
                  {s}
                </span>
              ))}
            </div>
          )}

          {/* Level tabs */}
          <div className="flex gap-2 mb-5">
            {LEVELS.map((lvl) => {
              const isActive = activeTab === lvl.key;
              const count = result[lvl.key]?.length || 0;
              return (
                <button
                  key={lvl.key}
                  onClick={() => setActiveTab(lvl.key)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-extrabold border flex items-center justify-center gap-1.5 transition-all ${
                    isActive ? lvl.tab : lvl.tabIdle + " bg-white border"
                  }`}
                >
                  <span>{lvl.emoji}</span>
                  {lvl.label}
                  <span
                    className={`ml-1 text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                      isActive ? "bg-white/30" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Tab description */}
          <p className="text-xs text-slate-500 font-medium mb-4 italic">
            {activeLevelCfg.description}
          </p>

          {/* Question cards */}
          {activeQuestions.length > 0 ? (
            <div className="space-y-3">
              {activeQuestions.map((q, i) => (
                <QuestionCard
                  key={i}
                  item={q}
                  index={i}
                  levelCfg={activeLevelCfg}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-slate-400">
              <FaComments className="mx-auto mb-3 opacity-30" size={32} />
              <p className="text-sm font-semibold">No questions generated for this level.</p>
            </div>
          )}
        </div>
      )}

      {/* Empty state before generation */}
      {!result && !loading && (
        <div className="text-center py-10 text-slate-400">
          <FaComments className="mx-auto mb-3 opacity-20" size={40} />
          <p className="text-sm font-semibold text-slate-500">
            Select a role or paste a job description above, then click Generate.
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Questions are dynamically built from your actual resume skills.
          </p>
        </div>
      )}
    </div>
  );
}

export default InterviewQuestions;
