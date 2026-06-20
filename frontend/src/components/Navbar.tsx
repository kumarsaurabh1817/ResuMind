import { BrainCircuit } from "lucide-react";
import { useState } from "react";
import { useAppData } from "../context/AppContext";
import { Link } from "react-router-dom";
import { Lock, Menu, X } from "lucide-react";

const navLinks = [
  { to: "/analyse", label: "Analyse" },
  { to: "/jobmatcher", label: "Job Matcher" },
  { to: "/jdmatcher", label: "JD Match" },
  { to: "/resumebuilder", label: "Resume Builder" },
  { to: "/interviewprep", label: "Interview Prep" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { isAuth, user } = useAppData();
  return (
    <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 border-b border-white/6 bg-[#080b14]/80 backdrop-blur-xl">
      <Link to={"/"} className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-linear-to-br from-indigo-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-indigo-500/30">
          <BrainCircuit size={17} className="text-white" />
        </div>
        <span
          className="font-bold text-lg tracking-tight"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Resu<span className="text-gradient">Mind</span>
        </span>
      </Link>

      {/* Desktop nav links */}
      <div className="hidden md:flex items-center gap-8 text-sm text-white/50">
        {navLinks.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center gap-1 transition-colors ${
              !isAuth
                ? "text-white/25 hover:text-white/45"
                : "hover:text-white"
            }`}
            title={!isAuth ? "Sign in to access" : undefined}
          >
            {!isAuth && <Lock size={10} className="shrink-0" />}
            {label}
          </Link>
        ))}
      </div>

      {/* Desktop auth buttons */}
      <div className="hidden md:flex items-center gap-3">
        {isAuth ? (
          <Link
            to={"/account"}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <img
              src={user?.image || "/user.png"}
              alt={user?.name || "User"}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-white/10"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/user.png";
              }}
            />
            <span className="text-sm text-white/70">
              {user?.name?.split(" ")[0]}
            </span>
          </Link>
        ) : (
          <>
            <Link
              to={"/login"}
              className="text-sm text-white/50 hover:text-white transition-colors px-4 py-2"
            >
              Sign in
            </Link>
            <Link
              to={"/login"}
              className="btn-primary text-sm px-5 py-2 rounded-lg"
            >
              Get Started Free
            </Link>
          </>
        )}
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden text-white/60 hover:text-white"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-full inset-x-0 bg-[#080b14]/95 backdrop-blur-xl border-b border-white/6 flex flex-col gap-4 px-6 py-6 md:hidden">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-1.5 transition-colors ${
                !isAuth
                  ? "text-white/25 hover:text-white/45"
                  : "hover:text-white"
              }`}
              title={!isAuth ? "Sign in to access" : undefined}
            >
              {!isAuth && <Lock size={10} className="shrink-0" />}
              {label}
            </Link>
          ))}

          {isAuth ? (
            <Link
              to={"/account"}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              onClick={() => setOpen(false)}
            >
              <img
                src={user?.image || "/user.png"}
                alt={user?.name || "User"}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-white/10"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/user.png";
                }}
              />
              <span className="text-sm text-white/70">
                {user?.name?.split(" ")[0]}
              </span>
            </Link>
          ) : (
            <>
              <Link
                to={"/login"}
                className="text-sm text-white/50 hover:text-white transition-colors px-4 py-2"
                onClick={() => setOpen(false)}
              >
                Sign in
              </Link>
              <Link
                to={"/login"}
                className="btn-primary text-sm px-5 py-2 rounded-lg"
                onClick={() => setOpen(false)}
              >
                Get Started Free
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
