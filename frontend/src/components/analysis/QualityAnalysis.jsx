import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMagic,
  FaExclamationTriangle,
  FaTimesCircle,
  FaCheckCircle,
  FaClipboard,
  FaArrowRight,
  FaTools,
  FaRegLightbulb,
  FaListAlt,
  FaPencilAlt,
  FaRedo,
} from "react-icons/fa";
import { toast } from "react-hot-toast";

// ─── Grade Badge ─────────────────────────────────────────────────────────────

const GRADE_STYLES = {
  Excellent:        { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", badge: "bg-emerald-100 text-emerald-700" },
  Good:             { bg: "bg-blue-50",    border: "border-blue-200",    text: "text-blue-700",    badge: "bg-blue-100 text-blue-700"    },
  "Needs Work":     { bg: "bg-amber-50",   border: "border-amber-200",   text: "text-amber-700",   badge: "bg-amber-100 text-amber-700"   },
  Critical:         { bg: "bg-red-50",     border: "border-red-200",     text: "text-red-700",     badge: "bg-red-100 text-red-700"     },
  "Insufficient Data": { bg: "bg-slate-50", border: "border-slate-200", text: "text-slate-500",  badge: "bg-slate-100 text-slate-500"  },
};

function GradeBadge({ grade }) {
  const style = GRADE_STYLES[grade] || GRADE_STYLES["Insufficient Data"];
  return (
    <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold ${style.badge} border ${style.border}`}>
      {grade === "Excellent" && <FaCheckCircle className="text-emerald-500" />}
      {grade === "Critical"  && <FaTimesCircle className="text-red-500" />}
      {(grade === "Needs Work" || grade === "Good") && <FaExclamationTriangle className="text-amber-500" />}
      {grade}
    </span>
  );
}

// ─── Priority Badge ───────────────────────────────────────────────────────────

function PriorityBadge({ priority }) {
  const map = {
    High:   "bg-red-100 text-red-700 border border-red-200",
    Medium: "bg-amber-100 text-amber-700 border border-amber-200",
    Low:    "bg-slate-100 text-slate-600 border border-slate-200",
  };
  return (
    <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${map[priority] || map.Low}`}>
      {priority}
    </span>
  );
}

// ─── Weak Bullets Panel ───────────────────────────────────────────────────────

function WeakBulletsPanel({ bullets }) {
  const [copiedIdx, setCopiedIdx] = useState(null);
  const navigate = useNavigate();

  if (!bullets || bullets.length === 0) {
    return (
      <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-100 rounded-2xl px-5 py-4 text-emerald-700 font-semibold">
        <FaCheckCircle className="text-emerald-500 text-lg flex-shrink-0" />
        No weak bullet points detected — your resume uses strong action language.
      </div>
    );
  }

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIdx(idx);
      toast.success("Suggestion copied to clipboard!");
      setTimeout(() => setCopiedIdx(null), 2000);
    });
  };

  const handleEditInBuilder = (suggestion) => {
    // Store the suggestion in sessionStorage so the builder can surface it
    const pending = JSON.parse(sessionStorage.getItem("skillora_pending_rewrite") || "[]");
    pending.push(suggestion);
    sessionStorage.setItem("skillora_pending_rewrite", JSON.stringify(pending));
    // Navigate to Experience step (step 2) in the Resume Builder
    navigate("/resume-builder", { state: { startStep: 2, fromQualityHint: true } });
    toast.success("Opening Resume Builder at Experience step…");
  };

  return (
    <div className="space-y-5">
      {bullets.map((item, idx) => (
        <div key={idx} className="rounded-2xl border border-slate-200 overflow-hidden">
          {/* Original bullet */}
          <div className="bg-red-50 border-b border-red-100 px-5 py-3 flex items-start gap-3">
            <FaTimesCircle className="text-red-400 mt-1 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-red-600 uppercase tracking-wider mb-1">Weak Phrasing Found</p>
              <p className="text-slate-700 text-sm font-medium break-words">{item.original}</p>
              <span className="inline-block mt-2 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-semibold">
                Weak starter: "{item.weak_phrase}"
              </span>
            </div>
          </div>

          {/* Explanation */}
          <div className="bg-amber-50 px-5 py-3 border-b border-amber-100">
            <p className="text-xs text-amber-700 font-medium">
              <span className="font-bold">Why it's weak:</span> {item.explanation}
            </p>
          </div>

          {/* AI-suggested rewrites */}
          <div className="bg-white px-5 py-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              <FaRegLightbulb className="inline mr-1 text-amber-500" />
              AI-Suggested Rewrites
            </p>
            <div className="space-y-2">
              {(item.suggestions || []).map((suggestion, sIdx) => (
                <div key={sIdx} className="flex items-center gap-2 group">
                  <div className="flex-1 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-2.5 text-sm text-slate-700 font-medium">
                    <span className="text-emerald-600 font-bold">{suggestion.split(" ")[0]}</span>
                    {" " + suggestion.split(" ").slice(1).join(" ")}
                  </div>
                  {/* Copy button */}
                  <button
                    onClick={() => handleCopy(suggestion, `${idx}-${sIdx}`)}
                    className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition ${
                      copiedIdx === `${idx}-${sIdx}`
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                    }`}
                    title="Copy to clipboard"
                  >
                    <FaClipboard className="text-xs" />
                    {copiedIdx === `${idx}-${sIdx}` ? "Copied!" : "Copy"}
                  </button>
                  {/* Edit in Builder button */}
                  <button
                    onClick={() => handleEditInBuilder(suggestion)}
                    className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition"
                    title="Use this suggestion in Resume Builder"
                  >
                    <FaPencilAlt className="text-xs" />
                    Use
                  </button>
                </div>
              ))}
            </div>
            {/* Quick navigation hint */}
            <p className="text-[11px] text-slate-400 mt-3 italic">
              💡 Click <strong>Use</strong> to open the Resume Builder at the Experience step with this suggestion ready.
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Missing Sections Panel ───────────────────────────────────────────────────

function MissingSectionsPanel({ sections }) {
  const navigate = useNavigate();

  if (!sections || sections.length === 0) {
    return (
      <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-100 rounded-2xl px-5 py-4 text-emerald-700 font-semibold">
        <FaCheckCircle className="text-emerald-500 text-lg flex-shrink-0" />
        All standard resume sections detected — great structure!
      </div>
    );
  }

  const handleGoToBuilder = (step) => {
    navigate("/resume-builder", { state: { startStep: step } });
  };

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {sections.map((section, idx) => (
        <div
          key={idx}
          className={`rounded-2xl border p-5 ${
            section.priority === "High"
              ? "bg-red-50 border-red-200"
              : "bg-amber-50 border-amber-200"
          }`}
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <FaExclamationTriangle
                className={section.priority === "High" ? "text-red-500" : "text-amber-500"}
              />
              <h4 className="font-bold text-slate-800">{section.label}</h4>
            </div>
            <PriorityBadge priority={section.priority} />
          </div>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">{section.description}</p>
          <button
            onClick={() => handleGoToBuilder(section.builder_step)}
            className="flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-800 transition"
          >
            Add in Resume Builder <FaArrowRight className="text-[10px]" />
          </button>
        </div>
      ))}
    </div>
  );
}

// ─── Quality Issues Panel ─────────────────────────────────────────────────────

function QualityIssuesPanel({ issues }) {
  if (!issues || issues.length === 0) {
    return (
      <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-100 rounded-2xl px-5 py-4 text-emerald-700 font-semibold">
        <FaCheckCircle className="text-emerald-500 text-lg flex-shrink-0" />
        No content or formatting issues detected — your resume is well-structured!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {issues.map((issue, idx) => (
        <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-start gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
              issue.priority === "High"   ? "bg-red-100"
              : issue.priority === "Medium" ? "bg-amber-100"
              : "bg-slate-100"
            }`}>
              <FaTools className={`text-sm ${
                issue.priority === "High"   ? "text-red-600"
                : issue.priority === "Medium" ? "text-amber-600"
                : "text-slate-500"
              }`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 mb-1.5">
                <h4 className="font-bold text-slate-800 text-sm">{issue.title}</h4>
                <PriorityBadge priority={issue.priority} />
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{issue.description}</p>
              {issue.examples && issue.examples.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {issue.examples.slice(0, 3).map((ex, eIdx) => (
                    <span key={eIdx} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-lg font-mono">
                      {ex}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const TABS = [
  { id: "weak_bullets",     label: "Weak Bullets",    icon: <FaTimesCircle /> },
  { id: "missing_sections", label: "Missing Sections", icon: <FaListAlt /> },
  { id: "quality_issues",   label: "Content Issues",   icon: <FaTools /> },
];

function QualityAnalysis({ qualityAnalysis, resumeId, onRerun }) {
  const [activeTab, setActiveTab] = useState("weak_bullets");
  const [rerunning, setRerunning] = useState(false);

  const handleRerun = async () => {
    if (!resumeId || !onRerun) {
      toast.error("No resume linked. Upload a resume first.");
      return;
    }
    setRerunning(true);
    try {
      await onRerun();
      toast.success("Quality analysis refreshed!");
    } catch (err) {
      toast.error("Failed to re-run analysis. Please try again.");
    } finally {
      setRerunning(false);
    }
  };

  // Empty/unavailable state
  if (!qualityAnalysis || typeof qualityAnalysis !== "object") {
    return (
      <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
          <FaMagic className="text-slate-400 text-2xl" />
        </div>
        <h2 className="text-xl font-bold text-slate-700 mb-2">Quality Analysis Not Available</h2>
        <p className="text-slate-500 text-sm mb-6">
          Upload or save a resume in the Resume Builder, then run analysis to see quality insights.
        </p>
        {resumeId && onRerun && (
          <button
            onClick={handleRerun}
            disabled={rerunning}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <FaRedo className={rerunning ? "animate-spin" : ""} />
            {rerunning ? "Analysing…" : "Run Quality Analysis"}
          </button>
        )}
      </div>
    );
  }

  const { weak_bullets = [], missing_sections = [], quality_issues = [], overall_grade, total_issues, has_issues } = qualityAnalysis;

  const tabCounts = {
    weak_bullets:     weak_bullets.length,
    missing_sections: missing_sections.length,
    quality_issues:   quality_issues.length,
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 space-y-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-13 h-13 rounded-2xl bg-indigo-50 flex items-center justify-center p-3">
            <FaMagic className="text-indigo-600 text-xl" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">Resume Quality Analysis</h2>
            <p className="text-slate-500 mt-0.5 text-sm">
              AI-powered scan of your actual resume for weak language, missing sections, and formatting issues.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <GradeBadge grade={overall_grade || "Insufficient Data"} />
          {resumeId && onRerun && (
            <button
              onClick={handleRerun}
              disabled={rerunning}
              title="Re-run quality analysis on current resume"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-600 text-xs font-bold transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <FaRedo className={rerunning ? "animate-spin text-indigo-500" : ""} />
              {rerunning ? "Running…" : "Re-run"}
            </button>
          )}
        </div>
      </div>

      {/* Summary strip */}
      <div className={`rounded-2xl border p-5 ${
        !has_issues ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200"
      }`}>
        {!has_issues ? (
          <div className="flex items-center gap-3">
            <FaCheckCircle className="text-emerald-500 text-xl flex-shrink-0" />
            <div>
              <p className="font-bold text-emerald-800">Your resume passes all quality checks!</p>
              <p className="text-sm text-emerald-600 mt-0.5">
                No weak bullets, missing sections, or content issues were found. Great work!
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-3">
            <FaExclamationTriangle className="text-amber-500 text-xl flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-800">
                {total_issues} issue{total_issues !== 1 ? "s" : ""} found across your resume
              </p>
              <p className="text-sm text-amber-700 mt-0.5">
                Review each category below and use the suggested rewrites to strengthen your resume.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Tab navigation */}
      <div className="flex gap-2 flex-wrap">
        {TABS.map((tab) => {
          const count = tabCounts[tab.id];
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition ${
                activeTab === tab.id
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <span className="text-xs">{tab.icon}</span>
              {tab.label}
              <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-black ${
                activeTab === tab.id
                  ? "bg-indigo-500 text-white"
                  : count > 0 ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div>
        {activeTab === "weak_bullets"     && <WeakBulletsPanel     bullets={weak_bullets}     />}
        {activeTab === "missing_sections" && <MissingSectionsPanel sections={missing_sections} />}
        {activeTab === "quality_issues"   && <QualityIssuesPanel   issues={quality_issues}    />}
      </div>

    </div>
  );
}

export default QualityAnalysis;
