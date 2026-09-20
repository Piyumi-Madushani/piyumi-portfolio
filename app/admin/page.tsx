"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AdminUser {
  id: string;
  username: string;
  email: string;
}

export default function AdminDashboard() {
  const router = useRouter();

  const [admin, setAdmin] = useState<AdminUser | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const storedAdmin = localStorage.getItem("adminUser");

    if (!token || !storedAdmin) {
      router.replace("/admin/login");
      return;
    }

    try {
      setAdmin(JSON.parse(storedAdmin));
    } catch {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
      router.replace("/admin/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");

    router.replace("/admin/login");
  };

  if (!admin) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0B0F1A] px-4">
        <p className="text-sm text-gray-400 sm:text-base">
          Loading...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B0F1A] text-white">

      {/* Header */}
      <header className="border-b border-white/10 bg-white/[0.03]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">

          {/* Header content */}
          <div className="min-w-0">
            <h1 className="text-xl font-bold sm:text-2xl">
              Admin Dashboard
            </h1>

            <p className="mt-1 text-sm text-gray-400">
              Manage your portfolio
            </p>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full rounded-lg border border-white/10 px-4 py-2.5 text-sm text-gray-300 transition hover:border-red-400/30 hover:bg-red-500/10 hover:text-red-300 sm:w-auto"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">

        {/* Welcome */}
        <div className="mb-8 sm:mb-10">
          <h2 className="text-xl font-semibold sm:text-2xl">
            Welcome, {admin.username} 👋
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base">
            Select a section to manage your portfolio content.
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">

          <DashboardCard
            title="Projects"
            description="Add, edit, and delete portfolio projects."
            href="/admin/projects"
          />

          <DashboardCard
            title="Experience"
            description="Manage your work experience."
            href="/admin/experience"
          />

          <DashboardCard
            title="Education"
            description="Manage your education details."
            href="/admin/education"
          />

          <DashboardCard
            title="Skills"
            description="Manage technical and project management skills."
            href="/admin/skills"
          />

          <DashboardCard
            title="Certifications"
            description="Manage your certifications."
            href="/admin/certifications"
          />

          <DashboardCard
            title="Messages"
            description="View messages submitted through your contact form."
            href="/admin/messages"
          />

        </div>
      </section>
    </main>
  );
}

function DashboardCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex min-h-[170px] flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#6C5CE7]/50 hover:bg-white/[0.06] hover:shadow-lg hover:shadow-[#6C5CE7]/5 sm:min-h-[180px] sm:p-6"
    >
      <h3 className="text-base font-semibold transition-colors group-hover:text-[#8B7CF6] sm:text-lg">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-400">
        {description}
      </p>

      <div className="mt-auto pt-5 text-sm font-medium text-[#00C2FF] transition-transform duration-300 group-hover:translate-x-1">
        Manage →
      </div>
    </Link>
  );
}