import { ArrowDown, ArrowUpRight } from "lucide-react";

const technicalSkills = [
  "React.js",
  "Next.js",
  "Node.js",
  "TypeScript",
  "Python",
  "FastAPI",
  "MongoDB",
  "PostgreSQL",
  "Flutter",
  "REST APIs",
  "Git",
  "AI / RAG",
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-4 pt-28 pb-12 sm:px-6 sm:pt-32 sm:pb-16 lg:px-8"
    >
      {/* Background glow */}
      <div className="absolute left-1/2 top-1/3 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-[#6c5ce7]/20 blur-[100px] sm:h-80 sm:w-80 lg:h-96 lg:w-96 lg:blur-[120px]" />

      <div className="absolute right-0 top-1/4 -z-10 h-48 w-48 -translate-y-1/4 rounded-full bg-[#00c2ff]/10 blur-[80px] sm:h-64 sm:w-64 lg:h-72 lg:w-72 lg:blur-[100px]" />

      {/* Grid background */}
      <div
        className="absolute inset-0 -z-20 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-5xl">
          {/* Role */}
          <div className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 sm:px-4">
            <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-[#00c2ff]" />

            <span className="text-xs text-slate-400 sm:text-sm">
              Software Engineer · Project Manager
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            Building
            <br />

            <span className="bg-gradient-to-r from-[#6c5ce7] via-[#8b7cf6] to-[#00c2ff] bg-clip-text text-transparent">
              digital solutions
            </span>

            <br />

            and leading projects forward.
          </h1>

          {/* Introduction */}
          <p className="mt-6 max-w-3xl text-sm leading-6 text-slate-400 sm:mt-8 sm:text-base sm:leading-7 lg:text-lg">
            I'm Piyumi Madushani, an ICT undergraduate with hands-on experience
            in software engineering and project management. I enjoy building
            full-stack, mobile, backend, and AI-powered applications while
            helping teams plan, coordinate, and deliver projects effectively.
          </p>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
            <a
              href="#projects"
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-[#6c5ce7] px-6 py-3.5 font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#6c5ce7]/25 sm:w-auto"
            >
              View My Projects

              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>

            <a
              href="/Piyumi_Madushani_CV.pdf"
              download
              className="flex w-full items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3.5 font-medium text-slate-200 transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/5 sm:w-auto"
            >
              Download CV
            </a>
          </div>

          {/* Technical Skills */}
          <div className="mt-12 sm:mt-14">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 sm:tracking-[0.25em]">
              Technologies I Work With
            </p>

            <div className="flex max-w-4xl flex-wrap gap-2.5 sm:gap-3">
              {technicalSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#6c5ce7]/50 hover:bg-[#6c5ce7]/10 hover:text-white sm:px-4 sm:text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Scroll */}
          <a
            href="#about"
            className="mt-12 inline-flex items-center gap-3 text-sm text-slate-500 transition hover:text-white sm:mt-16"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10">
              <ArrowDown size={16} />
            </span>

            Scroll to explore
          </a>
        </div>
      </div>
    </section>
  );
}