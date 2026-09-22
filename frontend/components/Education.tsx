"use client";

import { GraduationCap, Award } from "lucide-react";
import { useEffect, useState } from "react";
import { getEducations, getCertifications } from "@/lib/api";

interface Education {
  _id: string;
  institution: string;
  degree: string;
  field: string;
  specialization?: string;
  startDate: string;
  endDate?: string;
  description?: string;
  grade?: string;
  current: boolean;
}

interface Certification {
  _id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
  image?: string;
  status?: string;
}

export default function Education() {
  const [educations, setEducations] = useState<Education[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [educationData, certificationData] = await Promise.all([
          getEducations(),
          getCertifications(),
        ]);

        setEducations(educationData);
        setCertifications(certificationData);
      } catch (error) {
        console.error("Failed to load education data:", error);
        setError("Failed to load education and certifications.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <section
      id="education"
      className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32"
    >
      {/* Background glow */}
      <div className="absolute left-0 top-1/4 -z-10 h-56 w-56 rounded-full bg-[#6c5ce7]/10 blur-[90px] sm:h-72 sm:w-72 sm:blur-[110px] lg:h-96 lg:w-96 lg:blur-[130px]" />

      <div className="mx-auto w-full max-w-7xl">
        {/* Section Heading */}
        <div className="mb-12 text-center sm:mb-16">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[#00c2ff] sm:text-sm sm:tracking-[0.25em]">
            Education & Certifications
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Academic Background
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-400 sm:mt-5 sm:text-base">
            My academic journey and professional certifications.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="py-16 text-center text-sm text-slate-400 sm:py-20">
            Loading education and certifications...
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="py-16 text-center text-sm text-red-400 sm:py-20">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-8">
            {/* Education */}
            <div>
              {/* Section title */}
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#6c5ce7]/10 sm:h-11 sm:w-11">
                  <GraduationCap className="h-5 w-5 text-[#6c5ce7]" />
                </div>

                <h3 className="text-xl font-semibold text-white sm:text-2xl">
                  Education
                </h3>
              </div>

              <div className="space-y-5 sm:space-y-6">
                {educations.map((education) => {
                  const period = education.current
                    ? `${education.startDate} – Present`
                    : education.endDate
                      ? `${education.startDate} – ${education.endDate}`
                      : education.startDate;

                  return (
                    <div
                      key={education._id}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-all duration-300 hover:border-[#6c5ce7]/30 hover:bg-white/[0.04] sm:p-6"
                    >
                      {/* Education header */}
                      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <h4 className="text-lg font-semibold leading-7 text-white sm:text-xl">
                            {education.degree}
                          </h4>
                       
                          <p className="mt-1 text-sm text-[#00c2ff] sm:text-base">
                            {education.institution}
                          </p>
                        </div>
                       
                        {/* Period */}
                        <span className="w-fit max-w-full rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-400 sm:shrink-0 sm:text-sm">
                          {period}
                        </span>
                      </div>

                      {/* Description */}
                      {education.description && (
                        <p className="text-sm leading-6 text-slate-400 sm:text-base sm:leading-7">
                          {education.description}
                        </p>
                      )}
                      {education.specialization && (
  <span className="rounded-full bg-[#00c2ff]/10 px-3 py-1.5 text-[11px] text-[#66d9ff] sm:text-xs">
    Specialization: {education.specialization}
  </span>
)}
                      {/* Field + Grade */}
                      <div className="mt-5 flex flex-wrap gap-2">
                        {education.field && (
                          <span className="rounded-full bg-[#6c5ce7]/10 px-3 py-1.5 text-[11px] text-[#a99cff] sm:text-xs">
                            {education.field}
                          </span>
                        )}

                        {education.grade && (
                          <span className="rounded-full bg-[#00c2ff]/10 px-3 py-1.5 text-[11px] text-[#66d9ff] sm:text-xs">
                            {education.grade}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Certifications */}
            <div>
              {/* Section title */}
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#00c2ff]/10 sm:h-11 sm:w-11">
                  <Award className="h-5 w-5 text-[#00c2ff]" />
                </div>

                <h3 className="text-xl font-semibold text-white sm:text-2xl">
                  Certifications
                </h3>
              </div>

              <div className="space-y-5 sm:space-y-6">
                {certifications.map((certification) => (
                  <div
                    key={certification._id}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-all duration-300 hover:border-[#00c2ff]/30 hover:bg-white/[0.04] sm:p-6"
                  >
                    {/* Certification title */}
                    <h4 className="text-lg font-semibold leading-7 text-white sm:text-xl">
                      {certification.title}
                    </h4>

                    {/* Issuer */}
                    <p className="mt-2 text-sm text-[#00c2ff] sm:text-base">
                      {certification.issuer}
                    </p>

                    {/* Issue date + status */}
                    <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-400 sm:gap-3 sm:text-sm">
                      <span>
                        Issued: {certification.issueDate}
                      </span>

                      {certification.status && (
                        <span className="rounded-full bg-[#6c5ce7]/10 px-3 py-1.5 text-[11px] text-[#a99cff] sm:text-xs">
                          {certification.status}
                        </span>
                      )}
                    </div>

                    {/* Credential ID */}
                    {certification.credentialId && (
                      <p className="mt-3 break-all text-xs leading-5 text-slate-500 sm:text-sm">
                        Credential ID: {certification.credentialId}
                      </p>
                    )}

                    {/* Credential link */}
                    {certification.credentialUrl && (
                      <a
                        href={certification.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center text-sm text-[#00c2ff] transition hover:text-white"
                      >
                        View Credential →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}