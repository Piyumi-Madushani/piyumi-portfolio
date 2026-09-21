import {
  BriefcaseBusiness,
  Code2,
  GraduationCap,
  Target,
} from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Software Engineering",
    description:
      "Hands-on experience developing full-stack, backend, mobile, and AI-powered applications using modern technologies.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Project Management",
    description:
      "Experience supporting project planning, task coordination, progress tracking, reporting, and Agile development activities.",
  },
  {
    icon: Target,
    title: "Problem Solving",
    description:
      "Focused on understanding requirements, solving technical challenges, and turning ideas into practical digital solutions.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden px-6 py-32"
    >
      {/* Background glow */}
      <div className="absolute right-0 top-1/4 -z-10 h-80 w-80 rounded-full bg-[#6c5ce7]/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-16 max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#00c2ff]">
            About Me
          </p>

          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Engineering solutions with a{" "}
            <span className="bg-gradient-to-r from-[#6c5ce7] to-[#00c2ff] bg-clip-text text-transparent">
              delivery mindset.
            </span>
          </h2>
        </div>

        {/* Main content */}
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">

          {/* About text */}
          <div>
            <p className="text-lg leading-8 text-slate-300">
              I&apos;m Piyumi Madushani, an Information and Communication
              Technology undergraduate at Uva Wellassa University with a
              strong interest in software engineering and project management.
            </p>

            <p className="mt-6 leading-7 text-slate-400">
              Through academic projects, internships, and independent
              development, I have gained practical experience building
              web applications, backend services, mobile applications, and
              AI-powered systems. I enjoy working across different parts of
              the development process, from understanding requirements and
              designing solutions to implementing, testing, and documenting
              software.
            </p>

            <p className="mt-6 leading-7 text-slate-400">
              Alongside technical development, I have experience supporting
              project activities such as task planning, progress tracking,
              team coordination, reporting, and Agile practices. This
              combination allows me to understand both the technical side of
              a product and the coordination needed to move a project
              toward delivery.
            </p>

            {/* Education mini card */}
            <div className="mt-10 flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#6c5ce7]/10 text-[#8b7cf6]">
                <GraduationCap size={21} />
              </div>

              <div>
                <p className="text-sm font-medium text-slate-500">
                  Currently pursuing
                </p>

                <h3 className="mt-1 font-semibold text-white">
                  Bachelor of Information & Communication Technology
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  Uva Wellassa University
                </p>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="space-y-4">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#6c5ce7]/30 hover:bg-white/[0.04]"
                >
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-[#00c2ff]">
                      <Icon size={20} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-white">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}