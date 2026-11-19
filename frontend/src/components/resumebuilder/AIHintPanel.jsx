import { useState, useEffect } from "react";
import { FaMagic, FaTimes, FaClipboard, FaChevronDown, FaChevronUp, FaSync } from "react-icons/fa";
import { toast } from "react-hot-toast";
import api from "../../services/api";

/**
 * AIHintPanel
 * ───────────
 * Floating AI hint panel for the Resume Builder.
 * Reads quality_analysis data from sessionStorage (key: skillora_quality_hints).
 * If sessionStorage is empty and a resumeId prop is provided, auto-fetches the
 * analysis from the backend so hints appear even on the first builder visit.
 *
 * Props:
 *   currentStep – number  Current 0-indexed step of the Resume Builder stepper
 *   resumeId    – string  Optional. Active resume ID to auto-fetch hints from.
 *
 * Step mapping:
 *   0 → Personal (summary issues)
 *   1 → Education
 *   2 → Experience (weak bullets)
 *   3 → Projects (weak bullets)
 *   4 → Skills
 *   5 → Certifications
 */

function getHintsForStep(qualityData, currentStep) {
  if (!qualityData) return [];

  const hints = [];

  // Weak bullets: show on steps 2 (Experience) and 3 (Projects)
  if (currentStep === 2 || currentStep === 3) {
    const bullets = qualityData.weak_bullets || [];
    bullets.slice(0, 3).forEach((b) => {
      hints.push({
        type:    "rewrite",
        label:   "Weak Bullet — Better Version",
        original: b.original,
        rewrites: b.suggestions || [],
        note:    b.explanation,
      });
    });
  }

  // Missing sections: show on corresponding steps
  const missing = qualityData.missing_sections || [];
  missing.forEach((ms) => {
    const stepForSection = ms.builder_step;
    if (stepForSection === currentStep) {
      hints.push({
        type:  "missing",
        label: `Missing: ${ms.label}`,
        note:  ms.description,
        rewrites: [],
      });
    }
  });

  // Quality issues: show on Personal (step 0) and Skills (step 4)
  if (currentStep === 0 || currentStep === 4) {
    const issues = qualityData.quality_issues || [];
    issues
      .filter((q) => q.priority === "High")
      .slice(0, 2)
      .forEach((q) => {
        hints.push({
          type:    "issue",
          label:   q.title,
          note:    q.description,
          rewrites: [],
        });
      });
  }

  return hints;
}

export default function AIHintPanel({ currentStep, resumeId }) {
  const [hints, setHints]           = useState([]);
  const [collapsed, setCollapsed]   = useState(false);
  const [copiedKey, setCopiedKey]   = useState(null);
  const [dismissed, setDismissed]   = useState(false);
  const [fetching, setFetching]     = useState(false);

  /**
   * loadHints – reads from sessionStorage and optionally auto-fetches from API.
   * Called on mount and whenever currentStep or resumeId changes.
   */
  const loadHints = async (forceRefresh = false) => {
    try {
      const raw = sessionStorage.getItem("skillora_quality_hints");

      if (raw && !forceRefresh) {
        const data = JSON.parse(raw);
        setHints(getHintsForStep(data, currentStep));
        return;
      }

      // sessionStorage empty (or forced refresh) — auto-fetch if we have a resumeId
      if (resumeId) {
        setFetching(true);
        try {
          const response = await api.get(`/analysis/${resumeId}`);
          const qualityData = response.data?.quality_analysis;
          if (qualityData) {
            sessionStorage.setItem("skillora_quality_hints", JSON.stringify(qualityData));
            setHints(getHintsForStep(qualityData, currentStep));
          } else {
            setHints([]);
          }
        } catch {
          setHints([]);
        } finally {
          setFetching(false);
        }
      } else {
        setHints([]);
      }
    } catch {
      setHints([]);
    }
  };

  useEffect(() => {
    loadHints();
    // Uncollapse when step changes (new hints may appear)
    setCollapsed(false);
  }, [currentStep, resumeId]);  // eslint-disable-line react-hooks/exhaustive-deps

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key);
      toast.success("Suggestion copied to clipboard!");
      setTimeout(() => setCopiedKey(null), 2000);
    });
  };

  const handleRefresh = () => {
    setDismissed(false);
    loadHints(true);
    toast("Refreshing AI quality hints…", { icon: "🔄" });
  };

  // Show subtle loading indicator while fetching
  if (fetching) {
    return (
      <div
        className="fixed bottom-6 right-6 z-50 w-80 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-xl border border-indigo-100 bg-white"
        style={{ boxShadow: "0 8px 40px rgba(99,102,241,0.18)" }}
      >
        <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin flex-shrink-0" />
        <span className="text-sm text-slate-600 font-medium">Loading AI quality hints…</span>
      </div>
    );
  }

  // Don't render if no hints or panel was dismissed
  if (dismissed || hints.length === 0) {
    // Show a collapsed "Refresh" pill so users can re-trigger
    if (resumeId && dismissed) {
      return (
        <button
          onClick={handleRefresh}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-2xl shadow-xl border border-indigo-100 bg-white text-indigo-700 text-xs font-bold hover:bg-indigo-50 transition"
          style={{ boxShadow: "0 4px 20px rgba(99,102,241,0.15)" }}
          title="Show AI Quality Hints"
        >
          <FaMagic className="text-indigo-500" />
          AI Hints
        </button>
      );
    }
    return null;
  }

  return (
    <div
      className="fixed bottom-6 right-6 z-50 w-80 max-h-[70vh] flex flex-col rounded-2xl shadow-2xl border border-indigo-100 bg-white overflow-hidden"
      style={{ boxShadow: "0 8px 40px rgba(99,102,241,0.18)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="flex items-center gap-2">
          <FaMagic className="text-indigo-200 text-sm" />
          <span className="font-bold text-sm">AI Quality Hints</span>
          <span className="text-[11px] bg-indigo-500 text-white px-2 py-0.5 rounded-full font-black">
            {hints.length}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {/* Refresh button */}
          {resumeId && (
            <button
              onClick={handleRefresh}
              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-indigo-500 transition text-indigo-100"
              title="Refresh hints from latest analysis"
            >
              <FaSync className="text-xs" />
            </button>
          )}
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-indigo-500 transition text-indigo-100"
            title={collapsed ? "Expand" : "Collapse"}
          >
            {collapsed ? <FaChevronUp className="text-xs" /> : <FaChevronDown className="text-xs" />}
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-500 transition text-indigo-100"
            title="Dismiss"
          >
            <FaTimes className="text-xs" />
          </button>
        </div>
      </div>

      {/* Body */}
      {!collapsed && (
        <div className="flex-1 overflow-y-auto">
          {hints.map((hint, hIdx) => (
            <div key={hIdx} className="border-b border-slate-100 last:border-0">
              {/* Hint type badge + label */}
              <div className={`px-4 pt-3 pb-1 ${
                hint.type === "rewrite" ? "bg-amber-50" :
                hint.type === "missing" ? "bg-red-50" : "bg-blue-50"
              }`}>
                <p className={`text-[11px] font-black uppercase tracking-wider ${
                  hint.type === "rewrite" ? "text-amber-600" :
                  hint.type === "missing" ? "text-red-600" : "text-blue-600"
                }`}>
                  {hint.label}
                </p>
              </div>

              {/* Original bullet (for rewrites) */}
              {hint.type === "rewrite" && hint.original && (
                <div className="px-4 py-2 bg-red-50 border-b border-red-100">
                  <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-2">
                    ✗ {hint.original}
                  </p>
                </div>
              )}

              {/* Note */}
              {hint.note && (
                <div className="px-4 py-2">
                  <p className="text-xs text-slate-600 leading-relaxed">{hint.note}</p>
                </div>
              )}

              {/* Suggested rewrites */}
              {hint.rewrites && hint.rewrites.length > 0 && (
                <div className="px-4 pb-3 space-y-2">
                  {hint.rewrites.slice(0, 2).map((rw, rIdx) => {
                    const copyKey = `${hIdx}-${rIdx}`;
                    return (
                      <div key={rIdx} className="flex items-start gap-2">
                        <p className="flex-1 text-xs text-slate-700 bg-emerald-50 border border-emerald-100 rounded-lg px-2.5 py-2 leading-relaxed font-medium">
                          <span className="text-emerald-700 font-bold">{rw.split(" ")[0]}</span>
                          {" " + rw.split(" ").slice(1).join(" ")}
                        </p>
                        <button
                          onClick={() => handleCopy(rw, copyKey)}
                          className={`flex-shrink-0 p-2 rounded-lg text-xs transition ${
                            copiedKey === copyKey
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-slate-100 text-slate-500 hover:bg-blue-50 hover:text-blue-600"
                          }`}
                          title="Copy suggestion"
                        >
                          <FaClipboard />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      {!collapsed && (
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100">
          <p className="text-[11px] text-slate-400 text-center font-medium">
            Suggestions based on your resume quality analysis
          </p>
        </div>
      )}
    </div>
  );
}
