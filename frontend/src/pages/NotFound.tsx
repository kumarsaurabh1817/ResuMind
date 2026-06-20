import { Link } from "react-router-dom";
import { BrainCircuit, Home, SearchX } from "lucide-react";

const NotFound = () => {
  return (
    <div className="bg-page min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="orb w-80 h-80 bg-indigo-500 top-10 left-10" />
      <div className="orb w-64 h-64 bg-emerald-500 bottom-10 right-10" />

      <div className="relative z-10 flex flex-col items-center gap-6 max-w-md">
        <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-indigo-500 to-emerald-400 flex items-center justify-center shadow-xl shadow-indigo-500/30">
          <SearchX size={38} className="text-white" />
        </div>

        <div>
          <div className="flex items-center justify-center gap-2 mb-3">
            <BrainCircuit size={16} className="text-indigo-400" />
            <span className="text-xs text-indigo-400 font-semibold uppercase tracking-widest">
              ResuMind
            </span>
          </div>
          <h1
            className="text-8xl font-black text-gradient"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            404
          </h1>
          <h2
            className="text-2xl font-bold mt-2"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Page Not Found
          </h2>
          <p className="text-white/40 mt-3 text-sm leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            to="/"
            className="btn-primary px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2"
          >
            <Home size={14} /> Go Home
          </Link>
          <Link
            to="/analyse"
            className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-white/6 border border-white/10 hover:bg-white/10 transition-all duration-200"
          >
            Analyse Resume
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
