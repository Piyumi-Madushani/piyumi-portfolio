"use client";

import {
  ArrowUpRight,
  BrainCircuit,
  Code2,
  Database,
  Smartphone,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getProjects } from "@/lib/api";

interface Project {
  _id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  createdAt: string;
}

const projectVisuals: Record<
  string,
  {
    category: string;
    icon: typeof BrainCircuit;
    gradient: string;
  }
> = {
  OpenJustice: {
    category: "AI-Powered Legal Assistant",
    icon: BrainCircuit,
    gradient: "from-[#6c5ce7]/20 to-[#00c2ff]/10",
  },

  CarePoint: {
    category: "Healthcare Platform",
    icon: Code2,
    gradient: "from-[#00c2ff]/15 to-[#6c5ce7]/10",
  },

  ProStudy: {
    category: "Education Platform",
    icon: Database,
    gradient: "from-[#6c5ce7]/15 to-[#00c2ff]/10",
  },

  Consy: {
    category: "Delivery Gateway",
    icon: Smartphone,
    gradient: "from-[#00c2ff]/15 to-[#6c5ce7]/10",
  },
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Failed to load projects:", error);
        setError("Failed to load projects.");
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return (
    <section
      id="projects"
      className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32"
    >
      {/* Background glow */}
      <div className="absolute right-0 top-1/4 -z-10 h-64 w-64 rounded-full bg-[#6c5ce7]/10 blur-[100px] sm:h-80 sm:w-80 sm:blur-[115px] lg:h-96 lg:w-96 lg:blur-[130px]" />

      <div className="mx-auto w-full max-w-7xl">
        {/* Heading */}
        <div className="mb-12 flex flex-col justify-between gap-6 sm:mb-16 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#00c2ff] sm:text-sm sm:tracking-[0.3em]">
              Selected Projects
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Things I&apos;ve{" "}
              <span className="bg-gradient-to-r from-[#6c5ce7] to-[#00c2ff] bg-clip-text text-transparent">
                built.
              </span>
            </h2>

            <p className="mt-5 text-sm leading-6 text-slate-400 sm:mt-6 sm:text-base sm:leading-7 lg:text-lg">
              A selection of applications and systems I&apos;ve worked on across
              software engineering, AI, backend development, mobile
              applications, and project-based work.
            </p>
          </div>

          {/* Selected work indicator */}
          <div className="flex items-center gap-2 text-xs text-slate-500 sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-[#00c2ff]" />
            Selected work
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="py-16 text-center text-sm text-slate-400 sm:py-20">
            Loading projects...
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="py-16 text-center text-sm text-red-400 sm:py-20">
            {error}
          </div>
        )}

        {/* Projects */}
        {!loading && !error && (
          <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
            {projects.map((project, index) => {
              const visual =
                projectVisuals[project.title] || {
                  category: "Software Project",
                  icon: Code2,
                  gradient: "from-[#6c5ce7]/15 to-[#00c2ff]/10",
                };

              const Icon = visual.icon;

              return (
                <article
                  key={project._id}
                  className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${visual.gradient} p-[1px] transition-all duration-500 hover:-translate-y-1 hover:border-white/20`}
                >
                  <div className="relative h-full overflow-hidden rounded-[23px] bg-[#0b0f1a]">
                    {/* Visual header */}
                    <div className="relative flex h-44 items-center justify-center overflow-hidden border-b border-white/10 sm:h-52 lg:h-56">
                      {/* Decorative circles */}
                      <div className="absolute h-32 w-32 rounded-full border border-white/5 sm:h-40 sm:w-40" />

                      <div className="absolute h-24 w-24 rounded-full border border-white/5 sm:h-28 sm:w-28" />

                      <div className="absolute h-14 w-14 rounded-full border border-white/10 sm:h-16 sm:w-16" />

                      {/* Project image / fallback icon */}
{project.image ? (
  <img
    src={project.image}
    alt={`${project.title} project`}
    className="relative z-10 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
  />
) : (
  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-[#8b7cf6] shadow-2xl shadow-[#6c5ce7]/10 transition-transform duration-500 group-hover:scale-110 sm:h-16 sm:w-16">
    <Icon size={26} className="sm:hidden" />
    <Icon size={30} className="hidden sm:block" />
  </div>
)}
                      {/* Number */}
                      <span className="absolute right-4 top-4 text-[10px] font-medium tracking-[0.2em] text-slate-600 sm:right-6 sm:top-5 sm:text-xs">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      {/* Category */}
                      <span className="absolute bottom-4 left-4 max-w-[75%] truncate rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-[10px] text-slate-400 backdrop-blur-sm sm:bottom-5 sm:left-6 sm:text-xs">
                        {visual.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-7 lg:p-8">
                      {/* Title */}
<div>
  <h3 className="text-xl font-semibold text-white sm:text-2xl">
    {project.title}
  </h3>
</div>

                      {/* Description */}
                      <p className="mt-4 text-sm leading-6 text-slate-400 sm:leading-7">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="mt-5 flex flex-wrap gap-2 sm:mt-6">
                        {project.technologies.map((technology) => (
                          <span
                            key={technology}
                            className="rounded-lg border border-white/10 bg-white/[0.02] px-2.5 py-1.5 text-[11px] text-slate-500 transition-colors group-hover:text-slate-400 sm:px-3 sm:text-xs"
                          >
                            {technology}
                          </span>
                        ))}
                      </div>

                      {/* Footer / Project Links */}
<div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 sm:mt-8 sm:pt-5">
  <span className="text-[10px] uppercase tracking-[0.15em] text-slate-600 sm:text-xs sm:tracking-[0.2em]">
    Project Links
  </span>

  <div className="flex items-center gap-3">
    {/* Live URL - only shown when available */}
    {project.liveUrl?.trim() && (
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${project.title} live project`}
        className="flex items-center gap-1 text-xs text-slate-500 transition-colors hover:text-[#6c5ce7]"
      >
        Live
        <ArrowUpRight size={14} />
      </a>
    )}

    {/* GitHub URL - only shown when available */}
    {project.githubUrl?.trim() && (
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${project.title} GitHub repository`}
        className="flex items-center gap-1 text-xs text-slate-500 transition-colors hover:text-[#00c2ff]"
      >
        GitHub
        <ArrowUpRight size={14} />
      </a>
    )}
  </div>
</div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}