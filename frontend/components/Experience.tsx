"use client";

import {
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  FolderKanban,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getExperiences } from "@/lib/api";

interface Experience {
  _id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string[];
  technologies: string[];
  current: boolean;
}

const experienceVisuals: Record<
  string,
  {
    icon: typeof FolderKanban;
  }
> = {
  "Intern Project Manager": {
    icon: FolderKanban,
  },

  "Intern Software Engineer": {
    icon: Code2,
  },
};

export default function Experience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadExperiences = async () => {
      try {
        const data = await getExperiences();
        setExperiences(data);
      } catch (error) {
        console.error("Failed to load experiences:", error);
        setError("Failed to load experience.");
      } finally {
        setLoading(false);
      }
    };

    void loadExperiences();
  }, []);

  return (
    <section
      id="experience"
      className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32"
    >
      {/* Background glow */}
      <div className="absolute left-1/3 top-1/4 -z-10 h-56 w-56 rounded-full bg-[#00c2ff]/5 blur-[90px] sm:h-72 sm:w-72 sm:blur-[110px] lg:h-80 lg:w-80 lg:blur-[120px]" />

      <div className="mx-auto w-full max-w-7xl">
        {/* Section heading */}
        <div className="mb-12 max-w-3xl sm:mb-16">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#00c2ff] sm:text-sm sm:tracking-[0.3em]">
            Experience
          </p>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Experience across{" "}
            <span className="bg-gradient-to-r from-[#6c5ce7] to-[#00c2ff] bg-clip-text text-transparent">
              engineering and delivery.
            </span>
          </h2>

          <p className="mt-5 text-sm leading-6 text-slate-400 sm:mt-6 sm:text-base sm:leading-7 lg:text-lg">
            My experience combines hands-on software development with
            practical project coordination, giving me exposure to both
            building software and supporting the teams and processes behind
            its delivery.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="py-16 text-center text-sm text-slate-400 sm:py-20">
            Loading experience...
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="py-16 text-center text-sm text-red-400 sm:py-20">
            {error}
          </div>
        )}

        {/* Timeline */}
        {!loading && !error && (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-5 top-0 hidden h-full w-px bg-white/10 md:block" />

            <div className="space-y-7 sm:space-y-10 md:space-y-12">
              {experiences.map((experience) => {
                const visual = experienceVisuals[experience.position] || {
                  icon: BriefcaseBusiness,
                };

                const Icon = visual.icon;

                const period = experience.current
                  ? `${experience.startDate} – Present`
                  : `${experience.startDate} – ${
                      experience.endDate || "Present"
                    }`;

                const summary =
                  experience.description.length > 0
                    ? experience.description[0]
                    : "";

                const contributions =
                  experience.description.length > 1
                    ? experience.description.slice(1)
                    : [];

                return (
                  <div
                    key={experience._id}
                    className="relative md:pl-16"
                  >
                    {/* Timeline icon */}
                    <div className="absolute left-0 top-0 hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#0b0f1a] text-[#8b7cf6] md:flex">
                      <Icon size={18} />
                    </div>

                    {/* Experience card */}
                    <article className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-all duration-300 hover:border-[#6c5ce7]/30 hover:bg-white/[0.04] sm:p-7 lg:p-8">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-[#00c2ff] sm:text-sm">
                            {period}
                          </p>

                          <h3 className="mt-2 text-xl font-semibold leading-tight text-white sm:text-2xl">
                            {experience.position}
                          </h3>

                          <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 sm:text-sm">
                            <BriefcaseBusiness
                              size={14}
                              className="shrink-0"
                            />

                            <span>{experience.company}</span>

                            <span className="hidden sm:inline">·</span>

                            <span>Sri Lanka</span>
                          </div>
                        </div>

                        {/* Mobile icon */}
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-400 md:hidden sm:h-10 sm:w-10">
                          <Icon size={17} />
                        </div>
                      </div>

                      {/* Summary */}
                      {summary && (
                        <p className="mt-5 max-w-3xl text-sm leading-6 text-slate-400 sm:mt-6 sm:text-base sm:leading-7">
                          {summary}
                        </p>
                      )}

                      {/* Contributions */}
                      {contributions.length > 0 && (
                        <div className="mt-6 sm:mt-7">
                          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:mb-4 sm:text-xs sm:tracking-[0.2em]">
                            Key Contributions
                          </p>

                          <div className="space-y-3">
                            {contributions.map((item, index) => (
                              <div
                                key={`${experience._id}-contribution-${index}`}
                                className="flex items-start gap-2.5 sm:gap-3"
                              >
                                <CheckCircle2
                                  size={16}
                                  className="mt-0.5 shrink-0 text-[#6c5ce7] sm:h-[17px] sm:w-[17px]"
                                />

                                <p className="text-sm leading-6 text-slate-400">
                                  {item}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Technologies */}
                      {experience.technologies.length > 0 && (
                        <div className="mt-6 sm:mt-7">
                          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:text-xs sm:tracking-[0.2em]">
                            Skills &amp; Tools
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {experience.technologies.map((technology) => (
                              <span
                                key={technology}
                                className="rounded-full border border-white/10 bg-[#0b0f1a] px-2.5 py-1.5 text-[11px] text-slate-400 sm:px-3 sm:text-xs"
                              >
                                {technology}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </article>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}