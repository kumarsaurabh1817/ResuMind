import { useRef, useState } from "react";
import type { JDMatchResult } from "../types";
import { toBase64, scoreColor } from "../utils";
import axios from "axios";
import { SERVER_URL } from "../main";
import { ScoreRing } from "../ring";
import {
  AlertCircle,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  ClipboardCopy,
  ExternalLink,
  FileSearch2,
  FileText,
  Lightbulb,
  Loader2,
  Upload,
  X,
  XCircle,
} from "lucide-react";
import toast from "react-hot-toast";

const JDMatcherPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [jd, setJd] = useState("");
  const [result, setResult] = useState<JDMatchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFileChange(f: File) {
    if (f.type !== "application/pdf") return setError("Please upload a PDF file.");
    if (f.size > 5 * 1024 * 1024) return setError("File size must be under 5 MB.");
    setError("");
    setFile(f);
  }

  async function handleAnalyze() {
    if (!file) return setError("Please upload your resume PDF.");
    if (!jd.trim()) return setError("Please paste the job description.");
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const pdfBase64 = await toBase64(file);
      const { data } = await axios.post(
        `${SERVER_URL}/api/ai/jd-match`,
        { pdfBase64, jobDescription: jd },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setResult(data);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function copyBullet(text: string, idx: number) {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedIdx(null), 2000);
  }

  function openLinkedIn() {
    if (!result) return;
    const q = encodeURIComponent(result.linkedinSearchQuery);
    window.open(`https://www.linkedin.com/jobs/search/?keywords=${q}`, "_blank");
  }

  return (
    <div className="bg-page min-h-screen pt-20 px-4 md:px-8 pb-16">
      <div className="max-w-3xl mx-auto flex flex-col gap-5">

        {/* ── Header ── */}
        <div className="text-center mb-2">
          <span className="feature-pill inline-flex mb-3">
            <FileSearch2 size={11} className="text-indigo-400" /> JD Match Analyzer
          </span>
          <h1
            className="text-3xl md:text-4xl font-extrabold tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            How well does your resume{" "}
            <span className="text-gradient">match this job?</span>
          </h1>
          <p className="text-white/40 mt-3 text-sm max-w-md mx-auto">
            Upload your resume and paste the job description — get a match score,
            missing keywords, and copy-paste bullets to boost your chances.
          </p>
        </div>

        {/* ── Step 1: Resume Upload ── */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const f = e.dataTransfer.files[0];
            if (f) handleFileChange(f);
          }}
          onClick={() => fileRef.current?.click()}
          className="glass-card border-dashed border-white/15 flex flex-col items-center justify-center gap-3 py-8 cursor-pointer hover:border-indigo-500/40 hover:bg-white/2 transition-all duration-300 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border-dashed border-indigo-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
            {file ? (
              <FileText size={20} className="text-emerald-400" />
            ) : (
              <Upload size={20} className="text-indigo-400" />
            )}
          </div>
          <div className="text-center">
            <p className="font-semibold text-white/80 text-sm">
              {file ? file.name : "Drop your resume here"}
            </p>
            <p className="text-white/35 text-xs mt-0.5">
              or click to browse • PDF only • max 5 MB
            </p>
          </div>
          {file && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
                setResult(null);
              }}
              className="flex items-center gap-1.5 text-xs text-white/30 hover:text-red-400 transition-colors"
            >
              <X size={12} /> Remove
            </button>
          )}
          <input
            type="file"
            ref={fileRef}
            accept=".pdf"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFileChange(f);
              e.target.value = "";
            }}
          />
        </div>

        {/* ── Step 2: Job Description ── */}
        <div className="glass-card p-5 flex flex-col gap-3">
          <label className="text-xs text-white/30 uppercase tracking-widest">
            Job Description
          </label>
          <textarea
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            rows={8}
            placeholder="Paste the full job description here — include requirements, responsibilities, and skills..."
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-indigo-500/50 transition-colors resize-none leading-relaxed"
          />
          <p className="text-xs text-white/25">
            {jd.trim().length > 0 ? `${jd.trim().split(/\s+/).length} words` : "Paste the complete JD for best results"}
          </p>
        </div>

        {/* ── Error ── */}
        {error && (
          <p className="text-red-400 text-sm flex items-center gap-1.5">
            <AlertCircle size={14} /> {error}
          </p>
        )}

        {/* ── Analyze Button ── */}
        {!loading && (
          <button
            onClick={handleAnalyze}
            className="btn-primary py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
          >
            <Briefcase size={16} /> Analyze Match
          </button>
        )}

        {/* ── Loading ── */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 size={36} className="text-indigo-400 animate-spin" />
            <p className="text-white/40 text-sm">
              Analyzing your resume against the JD...
            </p>
          </div>
        )}

        {/* ── Results ── */}
        {result && !loading && (
          <div className="flex flex-col gap-4">

            {/* Match Score Card */}
            <div className="glass-card p-6 flex items-center gap-6 flex-wrap">
              <div className="relative flex items-center justify-center shrink-0">
                <ScoreRing score={result.matchScore} />
                <div className="absolute flex flex-col items-center">
                  <span className={`text-2xl font-black ${scoreColor(result.matchScore)}`}>
                    {result.matchScore}
                  </span>
                  <span className="text-[10px] text-white/30">Match</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold mb-1">Match Score</p>
                <p className="text-white/45 text-sm leading-relaxed">{result.summary}</p>
              </div>
              {/* LinkedIn Button */}
              <button
                onClick={openLinkedIn}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-blue-600/20 border border-blue-500/30 text-blue-400 hover:bg-blue-600/30 transition-all duration-200 shrink-0"
              >
                <ExternalLink size={14} />
                Find Jobs on LinkedIn
              </button>
            </div>

            {/* Keywords Card */}
            <div className="glass-card p-6 flex flex-col gap-5">
              <p className="text-xs text-white/30 uppercase tracking-widest">Keyword Analysis</p>

              <div className="flex flex-col gap-4 md:flex-row md:gap-6">
                {/* Matched */}
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold uppercase tracking-widest">
                    <CheckCircle2 size={12} /> Matched ({result.matchedKeywords.length})
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {result.matchedKeywords.map((kw) => (
                      <span
                        key={kw}
                        className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 border border-emerald-500/25 text-emerald-400"
                      >
                        {kw}
                      </span>
                    ))}
                    {result.matchedKeywords.length === 0 && (
                      <span className="text-white/25 text-xs">None matched</span>
                    )}
                  </div>
                </div>

                <div className="hidden md:block w-px bg-white/8 self-stretch" />

                {/* Missing */}
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex items-center gap-1.5 text-red-400 text-xs font-semibold uppercase tracking-widest">
                    <XCircle size={12} /> Missing ({result.missingKeywords.length})
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {result.missingKeywords.map((kw) => (
                      <span
                        key={kw}
                        className="px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/10 border border-red-500/25 text-red-400"
                      >
                        {kw}
                      </span>
                    ))}
                    {result.missingKeywords.length === 0 && (
                      <span className="text-white/25 text-xs">None missing 🎉</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Suggested Bullets Card */}
            <div className="glass-card p-6 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <p className="text-xs text-white/30 uppercase tracking-widest">
                  Suggested Resume Bullets
                </p>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/25 text-indigo-400 font-semibold">
                  Copy & paste into your resume
                </span>
              </div>

              <div className="flex flex-col gap-2">
                {result.suggestedBullets.map((bullet, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-white/4 border border-white/8 group hover:border-indigo-500/30 transition-all duration-200"
                  >
                    <ChevronRight
                      size={14}
                      className="text-indigo-400 shrink-0 mt-0.5"
                    />
                    <p className="flex-1 text-sm text-white/70 leading-relaxed">{bullet}</p>
                    <button
                      onClick={() => copyBullet(bullet, i)}
                      className={`shrink-0 flex items-center gap-1.5 text-xs font-medium transition-all duration-200 px-2.5 py-1.5 rounded-lg ${
                        copiedIdx === i
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-white/5 text-white/30 hover:text-white/70 hover:bg-white/10 border border-white/10"
                      }`}
                    >
                      <ClipboardCopy size={11} />
                      {copiedIdx === i ? "Copied!" : "Copy"}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Improvement Plan Card */}
            <div className="glass-card p-6 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Lightbulb size={14} className="text-amber-400" />
                <p className="text-xs text-white/30 uppercase tracking-widest">
                  Improvement Plan
                </p>
              </div>
              <div className="flex flex-col gap-2.5">
                {result.improvementPlan.map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-1 p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/15"
                  >
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                      {item.area}
                    </span>
                    <p className="text-sm text-white/60 leading-relaxed">
                      {item.action}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom LinkedIn CTA */}
            <button
              onClick={openLinkedIn}
              className="flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-semibold bg-blue-600/15 border border-blue-500/25 text-blue-400 hover:bg-blue-600/25 transition-all duration-200"
            >
              <ExternalLink size={15} />
              Search Matching Jobs on LinkedIn →
            </button>

          </div>
        )}
      </div>
    </div>
  );
};

export default JDMatcherPage;
