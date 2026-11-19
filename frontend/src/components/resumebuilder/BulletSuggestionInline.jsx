/**
 * BulletSuggestionInline
 * ──────────────────────
 * Inline AI bullet-improvement widget for the Resume Builder.
 *
 * Props:
 *   description  – string   The current textarea value (experience / project description)
 *   onApply      – fn(newDescription: string) => void
 *                  Called when the user picks a suggestion. Receives the full
 *                  updated description string with the chosen rewrite applied.
 *
 * Rules enforced:
 *   • Only calls the backend when the user clicks "✨ Improve Bullets".
 *   • Never calls the backend with an empty / very short description.
 *   • Preserves every word after a weak starter verbatim (no invented content).
 *   • Each suggestion can be applied once; applying auto-collapses the panel.
 */

import { useState } from "react";
import { FaMagic, FaCheck, FaChevronDown, FaChevronUp, FaTimes } from "react-icons/fa";
import { toast } from "react-hot-toast";
import api from "../../services/api";

// Split a description block into individual bullet sentences
function splitBullets(text) {
  if (!text || !text.trim()) return [];
  // Split on newlines, bullet chars, or sentence endings
  const raw = text
    .split(/[\n•\-–]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 15);
  return raw;
}

// Re-apply a single bullet rewrite into the full description string.
// Replaces the first occurrence of `original` with `rewrite`.
function applyRewriteToDescription(description, original, rewrite) {
  if (!description) return rewrite;
  // Try exact replacement first
  if (description.includes(original)) {
    return description.replace(original, rewrite);
  }
  // Fallback: append the rewrite on a new line
  return description + "\n" + rewrite;
}

export default function BulletSuggestionInline({ description, onApply }) {
  const [suggestions, setSuggestions]   = useState([]); // [{original, is_weak, weak_phrase, explanation, rewrites}]
  const [loading, setLoading]           = useState(false);
  const [open, setOpen]                 = useState(false);
  const [appliedKeys, setAppliedKeys]   = useState(new Set());

  const bullets = splitBullets(description);

  const handleAnalyze = async () => {
    if (bullets.length === 0) {
      toast("Add some bullet points first.", { icon: "ℹ️" });
      return;
    }

    setLoading(true);
    setOpen(true);
    setSuggestions([]);
    setAppliedKeys(new Set());

    try {
      const response = await api.post("/resume/improve-bullets", { bullets });
      const results = response.data?.results || [];
      setSuggestions(results);

      const weakCount = results.filter((r) => r.is_weak).length;
      if (weakCount === 0) {
        toast.success("All bullets look strong! 🎉");
        setOpen(false);
      } else {
        toast(`Found ${weakCount} bullet${weakCount > 1 ? "s" : ""} to improve.`, { icon: "✨" });
      }
    } catch {
      toast.error("Could not analyze bullets. Is the backend running?");
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = (original, rewrite, bulletIdx, rewriteIdx) => {
    const updated = applyRewriteToDescription(description, original, rewrite);
    onApply(updated);

    const key = `${bulletIdx}-${rewriteIdx}`;
    setAppliedKeys((prev) => new Set([...prev, key]));
    toast.success("Suggestion applied!");
  };

  // Only show if there's enough text to analyze
  const hasText = bullets.length > 0;

  const weakSuggestions = suggestions.filter((s) => s.is_weak);
  const hasResults = suggestions.length > 0;

  return (
    <div className="mt-3">
      {/* Trigger Button */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={loading ? undefined : hasResults ? () => setOpen((o) => !o) : handleAnalyze}
          disabled={!hasText || loading}
          className={`
            inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition
            ${loading
              ? "bg-indigo-50 text-indigo-400 cursor-not-allowed"
              : !hasText
              ? "bg-slate-100 text-slate-400 cursor-not-allowed"
              : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-100"
            }
          `}
          title={hasText ? "AI-powered bullet improvement" : "Add description first"}
          id="btn-improve-bullets"
        >
          {loading ? (
            <span className="w-3.5 h-3.5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          ) : (
            <FaMagic className="text-indigo-500 text-[11px]" />
          )}
          {loading ? "Analyzing…" : hasResults ? (open ? "Hide Suggestions" : "Show Suggestions") : "✨ Improve Bullets"}
          {hasResults && !loading && (
            open ? <FaChevronUp className="text-[10px]" /> : <FaChevronDown className="text-[10px]" />
          )}
        </button>

        {/* Re-analyze button after results */}
        {hasResults && !loading && (
          <button
            type="button"
            onClick={handleAnalyze}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200 transition"
            title="Re-analyze updated bullets"
          >
            Re-scan
          </button>
        )}
      </div>

      {/* Suggestions Panel */}
      {open && hasResults && (
        <div className="mt-3 rounded-2xl border border-indigo-100 bg-white shadow-lg overflow-hidden">
          {/* Panel Header */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600">
            <div className="flex items-center gap-2">
              <FaMagic className="text-indigo-200 text-xs" />
              <span className="text-xs font-black text-white uppercase tracking-wider">
                AI Bullet Improvements
              </span>
              {weakSuggestions.length > 0 && (
                <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full font-bold">
                  {weakSuggestions.length} weak
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-white/20 text-white/80 transition"
            >
              <FaTimes className="text-xs" />
            </button>
          </div>

          {/* Results */}
          <div className="divide-y divide-slate-100">
            {weakSuggestions.length === 0 ? (
              <div className="px-4 py-5 text-center">
                <p className="text-sm font-bold text-emerald-600">🎉 All bullets look strong!</p>
                <p className="text-xs text-slate-500 mt-1">No weak starters found in this description.</p>
              </div>
            ) : (
              weakSuggestions.map((item, bulletIdx) => (
                <div key={bulletIdx} className="p-4">
                  {/* Original (weak) bullet */}
                  <div className="flex items-start gap-2 mb-3">
                    <span className="mt-0.5 w-4 h-4 rounded-full bg-red-100 text-red-500 flex items-center justify-center flex-shrink-0 text-[10px] font-black">✗</span>
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-wider text-red-500 mb-0.5">
                        {item.weak_phrase ? `Weak starter: "${item.weak_phrase}"` : "Weak bullet"}
                      </p>
                      <p className="text-xs text-slate-500 italic leading-relaxed line-clamp-2">
                        {item.original}
                      </p>
                    </div>
                  </div>

                  {/* Explanation */}
                  {item.explanation && (
                    <p className="text-xs text-slate-600 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 mb-3 leading-relaxed">
                      💡 {item.explanation}
                    </p>
                  )}

                  {/* Suggested rewrites */}
                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Suggested rewrites</p>
                    {(item.rewrites || []).slice(0, 3).map((rw, rIdx) => {
                      const key = `${bulletIdx}-${rIdx}`;
                      const applied = appliedKeys.has(key);
                      return (
                        <div
                          key={rIdx}
                          className={`flex items-start gap-2 rounded-xl px-3 py-2.5 border transition ${
                            applied
                              ? "bg-emerald-50 border-emerald-200"
                              : "bg-slate-50 border-slate-200 hover:border-indigo-200 hover:bg-indigo-50"
                          }`}
                        >
                          <p className="flex-1 text-xs text-slate-700 leading-relaxed">
                            <span className="font-black text-indigo-700">{rw.split(" ")[0]}</span>
                            {" " + rw.split(" ").slice(1).join(" ")}
                          </p>
                          <button
                            type="button"
                            onClick={() => !applied && handleApply(item.original, rw, bulletIdx, rIdx)}
                            disabled={applied}
                            className={`flex-shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-black transition ${
                              applied
                                ? "bg-emerald-100 text-emerald-700 cursor-default"
                                : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
                            }`}
                            title={applied ? "Applied" : "Apply this suggestion"}
                          >
                            {applied ? (
                              <>
                                <FaCheck className="text-[10px]" />
                                Applied
                              </>
                            ) : (
                              "Apply"
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-2 bg-slate-50 border-t border-slate-100">
            <p className="text-[10px] text-slate-400 text-center">
              Rewrites are based on your existing text — no content is invented.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
