import { ArrowUp, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-10">
      <div className="mx-auto max-w-7xl">

        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">

          {/* Brand */}
          <div>
            <a
              href="#home"
              className="text-xl font-bold tracking-tight text-white"
            >
              P<span className="text-[#6c5ce7]">.</span>
            </a>

            <p className="mt-2 text-sm text-slate-600">
              Software Engineer · Project Manager
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-slate-500">
            <a
              href="#about"
              className="transition hover:text-white"
            >
              About
            </a>

            <a
              href="#skills"
              className="transition hover:text-white"
            >
              Skills
            </a>

            <a
              href="#experience"
              className="transition hover:text-white"
            >
              Experience
            </a>

            <a
              href="#projects"
              className="transition hover:text-white"
            >
              Projects
            </a>

            <a
              href="#education"
              className="transition hover:text-white"
            >
              Education
            </a>

            <a
              href="#contact"
              className="transition hover:text-white"
            >
              Contact
            </a>
          </nav>

          {/* Back to top */}
          <a
            href="#home"
            aria-label="Back to top"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-all duration-300 hover:border-[#6c5ce7]/40 hover:bg-[#6c5ce7]/10 hover:text-white"
          >
            <ArrowUp size={17} />
          </a>
        </div>

        {/* Bottom */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-slate-600 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Piyumi Madushani. All rights reserved.
          </p>

          <p className="flex items-center gap-1.5">
            Built with
            <Heart size={13} className="text-[#6c5ce7]" />
            Next.js & Tailwind CSS
          </p>
        </div>

      </div>
    </footer>
  );
}