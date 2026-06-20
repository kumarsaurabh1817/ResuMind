import { BrainCircuit } from "lucide-react";

function Footer() {
  return (
    <footer className="border-t border-white/6 px-6 md:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-white/25 text-xs">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-md bg-linear-to-br from-indigo-500 to-emerald-400 flex items-center justify-center">
          <BrainCircuit size={13} className="text-white" />
        </div>
        <span
          style={{ fontFamily: "'Syne', sans-serif" }}
          className="font-bold text-white/40 text-sm"
        >
          Resu<span className="text-gradient">Mind</span>
        </span>
      </div>
      <span>©️ {new Date().getFullYear()} ResuMind. All rights reserved.</span>
      <div className="flex gap-5">
        {["Privacy", "Terms", "Contact"].map((i) => (
          <a key={i} href="#" className="hover:text-white/60 transition-colors">
            {i}
          </a>
        ))}
      </div>
    </footer>
  );
}

export default Footer;