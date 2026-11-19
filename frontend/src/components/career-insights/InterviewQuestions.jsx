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
  FaHeart,
  FaListOl,
  FaUser,
} from "react-icons/fa";
import careerService from "../../services/careerService";

// ─── Level configuration (technical tabs) ─────────────────────────────────
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

// HR tab config (synthetic — not in LEVELS array, handled separately)
const HR_TAB = {
  key: "hr_behavioral",
  label: "HR & Behavioral",
  emoji: "🤝",
  badge: "bg-violet-100 text-violet-700 border-violet-200",
  tab: "bg-violet-600 text-white",
  tabIdle: "text-violet-600 hover:bg-violet-50 border-violet-200",
  ring: "ring-violet-300",
  description:
    "Personalised behavioral questions drawn from your real resume — projects, education, and experience",
};

// ─── Technical Question Card ───────────────────────────────────────────────
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

// ─── HR Question Card ──────────────────────────────────────────────────────
function HRQuestionCard({ item, index }) {
  const [open, setOpen] = useState(false);
  const framework = item.answer_framework;

  return (
    <div
      className={`rounded-2xl border bg-white shadow-sm transition-all duration-200 hover:shadow-md ${
        open ? "ring-2 ring-violet-300" : "border-slate-200"
      }`}
    >
      {/* Question row */}
      <button
        className="w-full text-left px-5 py-4 flex items-start gap-4 group"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        id={`hr-question-${index}`}
      >
        {/* Number badge */}
        <span className="flex-shrink-0 w-7 h-7 rounded-full text-xs font-black flex items-center justify-center border bg-violet-100 text-violet-700 border-violet-200">
          {index + 1}
        </span>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-800 leading-snug">
            {item.question}
          </p>

          <div className="flex flex-wrap gap-2 mt-2">
            {/* Category chip */}
            <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border bg-violet-100 text-violet-700 border-violet-200">
              <span>{item.category_emoji}</span>
              {item.category}
            </span>

            {/* Framework name chip */}
            {framework?.name && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border bg-sky-50 text-sky-700 border-sky-200">
                <FaListOl size={9} />
                {framework.name}
              </span>
            )}
          </div>
        </div>

        {/* Expand icon */}
        <span className="flex-shrink-0 text-slate-400 group-hover:text-slate-600 mt-0.5 transition-colors">
          {open ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
        </span>
      </button>

      {/* Answer framework panel */}
      {open && (
        <div className="px-5 pb-5 pt-0 border-t border-slate-100">
          {framework?.steps?.length > 0 && (
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-3">
                <FaLightbulb className="text-violet-500 flex-shrink-0" size={13} />
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Suggested Answer Structure
                </p>
              </div>

              <ol className="space-y-2">
                {framework.steps.map((step, si) => {
                  // Split "Label — description" for bold label
                  const dashIdx = step.indexOf(" — ");
                  const label = dashIdx !== -1 ? step.slice(0, dashIdx) : null;
                  const body = dashIdx !== -1 ? step.slice(dashIdx + 3) : step;

                  return (
                    <li
                      key={si}
                      className="flex items-start gap-3 bg-violet-50 border border-violet-100 rounded-xl px-4 py-2.5"
                    >
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-violet-200 text-violet-800 text-[10px] font-black flex items-center justify-center mt-0.5">
                        {si + 1}
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {label && (
                          <span className="font-bold text-violet-800">
                            {label}
                          </span>
                        )}
                        {label && " — "}
                        {body}
                      </p>
                    </li>
                  );
                })}
              </ol>
            </div>
          )}

          {/* Context used note */}
          {item.context_used && (
            <p className="mt-3 text-[10px] text-slate-400 font-medium italic">
              📌 Personalised from your resume: {item.context_used}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Resume Context Banner ─────────────────────────────────────────────────
function ResumeContextBanner({ ctx }) {
  if (!ctx) return null;
  const chips = [
    ctx.name && { label: "Candidate", value: ctx.name, emoji: "👤" },
    ctx.top_project && { label: "Project", value: ctx.top_project, emoji: "🛠️" },
    ctx.education && { label: "Education", value: ctx.education, emoji: "🎓" },
    ctx.top_skill && { label: "Top Skill", value: ctx.top_skill, emoji: "⚡" },
  ].filter(Boolean);

  if (chips.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-violet-50 to-sky-50 border border-violet-100 rounded-2xl px-5 py-3.5 mb-5">
      <p className="text-[10px] font-extrabold uppercase tracking-wider text-violet-600 mb-2 flex items-center gap-1.5">
        <FaUser size={9} /> Resume Context Used for Personalisation
      </p>
      <div className="flex flex-wrap gap-2">
        {chips.map((c) => (
          <span
            key={c.label}
            className="inline-flex items-center gap-1 text-[11px] font-semibold bg-white border border-violet-200 text-slate-700 px-3 py-1 rounded-full shadow-sm"
          >
            <span>{c.emoji}</span>
            <span className="text-violet-600 font-bold">{c.label}:</span>
            {c.value}
          </span>
        ))}
      </div>
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
  const isHRTab = activeTab === "hr_behavioral";
  const activeQuestions = isHRTab
    ? result?.hr_behavioral || []
    : result?.[activeTab] || [];

  const hrCount = result?.hr_behavioral?.length || 0;

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

          {/* ── Tab bar: Technical levels + HR tab ── */}
          <div className="flex gap-2 mb-5 flex-wrap">
            {/* Technical level tabs */}
            {LEVELS.map((lvl) => {
              const isActive = activeTab === lvl.key;
              const count = result[lvl.key]?.length || 0;
              return (
                <button
                  key={lvl.key}
                  onClick={() => setActiveTab(lvl.key)}
                  className={`flex-1 min-w-[100px] py-2.5 rounded-xl text-sm font-extrabold border flex items-center justify-center gap-1.5 transition-all ${
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

            {/* HR & Behavioral tab — only shown when HR questions were returned */}
            {hrCount > 0 && (
              <button
                onClick={() => setActiveTab("hr_behavioral")}
                className={`flex-1 min-w-[130px] py-2.5 rounded-xl text-sm font-extrabold border flex items-center justify-center gap-1.5 transition-all ${
                  isHRTab
                    ? HR_TAB.tab
                    : HR_TAB.tabIdle + " bg-white border"
                }`}
              >
                <FaHeart size={12} />
                HR &amp; Behavioral
                <span
                  className={`ml-1 text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                    isHRTab ? "bg-white/30" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {hrCount}
                </span>
              </button>
            )}
          </div>

          {/* Tab description */}
          <p className="text-xs text-slate-500 font-medium mb-4 italic">
            {isHRTab ? HR_TAB.description : activeLevelCfg.description}
          </p>

          {/* ── HR tab content ── */}
          {isHRTab && (
            <>
              <ResumeContextBanner ctx={result.resume_context} />
              {activeQuestions.length > 0 ? (
                <div className="space-y-3">
                  {activeQuestions.map((q, i) => (
                    <HRQuestionCard key={i} item={q} index={i} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-slate-400">
                  <FaHeart className="mx-auto mb-3 opacity-30" size={32} />
                  <p className="text-sm font-semibold">No HR questions generated.</p>
                </div>
              )}
            </>
          )}

          {/* ── Technical tab content ── */}
          {!isHRTab && (
            <>
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
            </>
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
