"use client";

import {
  BrainCircuit,
  Database,
  FolderKanban,
  GitBranch,
  Layout,
  Server,
  Smartphone,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getSkills } from "@/lib/api";

interface Skill {
  _id: string;
  name: string;
  category: string;
  level?: string;
  icon?: string;
  order: number;
}

const categoryIcons: Record<string, typeof Layout> = {
  "Frontend Development": Layout,
  "Backend Development": Server,
  Databases: Database,
  "Mobile Development": Smartphone,
  "AI & Intelligent Systems": BrainCircuit,
  "Development Tools": GitBranch,
};

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const data = await getSkills();

        const sortedSkills = [...data].sort(
          (a: Skill, b: Skill) => a.order - b.order
        );

        setSkills(sortedSkills);
      } catch (error) {
        console.error("Failed to load skills:", error);
        setError("Failed to load skills.");
      } finally {
        setLoading(false);
      }
    };

    void loadSkills();
  }, []);

  const softwareSkills = skills.filter(
    (skill) => skill.category !== "Project Management"
  );

  const projectManagementSkills = skills.filter(
    (skill) => skill.category === "Project Management"
  );

  const softwareCategories = Array.from(
    new Set(softwareSkills.map((skill) => skill.category))
  );

  return (
    <section
      id="skills"
      className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32"
    >
      {/* Background glow */}
      <div className="absolute left-0 top-1/3 -z-10 h-56 w-56 rounded-full bg-[#6c5ce7]/10 blur-[90px] sm:h-72 sm:w-72 sm:blur-[110px] lg:h-80 lg:w-80 lg:blur-[120px]" />

      <div className="mx-auto w-full max-w-7xl">
        {/* Section heading */}
        <div className="mb-12 max-w-3xl sm:mb-16">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#00c2ff] sm:text-sm sm:tracking-[0.3em]">
            Skills & Expertise
          </p>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Technical skills backed by{" "}
            <span className="bg-gradient-to-r from-[#6c5ce7] to-[#00c2ff] bg-clip-text text-transparent">
              practical experience.
            </span>
          </h2>

          <p className="mt-5 text-sm leading-6 text-slate-400 sm:mt-6 sm:text-base sm:leading-7 lg:text-lg">
            My skill set combines software development, AI application
            development, and project coordination, built through academic
            work, internships, and practical projects.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="py-16 text-center text-sm text-slate-400 sm:py-20">
            Loading skills...
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="py-16 text-center text-sm text-red-400 sm:py-20">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Software Engineering */}
            <div>
              {/* Section title */}
              <div className="mb-7 flex items-start gap-3 sm:mb-8 sm:items-center">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#6c5ce7]/10 text-[#8b7cf6]">
                  <Server size={20} />
                </div>

                <div>
                  <h3 className="text-xl font-semibold sm:text-2xl">
                    Software Engineering
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                    Technologies I use to design and build software.
                  </p>
                </div>
              </div>

              {/* Software skill categories */}
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                {softwareCategories.map((category) => {
                  const Icon = categoryIcons[category] || Server;

                  const categorySkills = softwareSkills.filter(
                    (skill) => skill.category === category
                  );

                  return (
                    <div
                      key={category}
                      className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#6c5ce7]/30 hover:bg-white/[0.04] sm:p-6"
                    >
                      {/* Category heading */}
                      <div className="mb-4 flex items-center gap-3 sm:mb-5">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-[#00c2ff] sm:h-10 sm:w-10">
                          <Icon size={18} />
                        </div>

                        <h4 className="text-sm font-semibold text-white sm:text-base">
                          {category}
                        </h4>
                      </div>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2">
                        {categorySkills.map((skill) => (
                          <span
                            key={skill._id}
                            className="rounded-lg border border-white/10 bg-[#0b0f1a] px-2.5 py-1.5 text-[11px] text-slate-400 transition-colors duration-200 group-hover:text-slate-300 sm:px-3 sm:text-xs"
                            title={skill.level || undefined}
                          >
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Project Management */}
            <div className="mt-20 sm:mt-24">
              {/* Section title */}
              <div className="mb-7 flex items-start gap-3 sm:mb-8 sm:items-center">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#00c2ff]/10 text-[#00c2ff]">
                  <FolderKanban size={20} />
                </div>

                <div>
                  <h3 className="text-xl font-semibold sm:text-2xl">
                    Project Management
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                    Practices that support planning, coordination, and
                    delivery.
                  </p>
                </div>
              </div>

              {/* Project Management container */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-8">
                <div className="grid gap-7 lg:grid-cols-[1fr_280px] lg:gap-8">
                  {/* PM Skills */}
                  <div className="flex flex-wrap content-start gap-2.5 sm:gap-3">
                    {projectManagementSkills.map((skill) => (
                      <span
                        key={skill._id}
                        title={skill.level || undefined}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-slate-300 transition-all duration-300 hover:border-[#00c2ff]/40 hover:bg-[#00c2ff]/10 hover:text-white sm:px-4 sm:py-2.5 sm:text-sm"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>

                  {/* Supporting message */}
                  <div className="border-t border-white/10 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                    <Users
                      size={24}
                      className="mb-4 text-[#00c2ff]"
                    />

                    <h4 className="font-semibold text-white">
                      Collaboration & Delivery
                    </h4>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      I value clear communication, structured planning,
                      collaboration, progress visibility, documentation, and
                      keeping project activities aligned with delivery goals.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}