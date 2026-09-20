"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Project {
  _id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const emptyForm = {
  title: "",
  description: "",
  image: "",
  technologies: "",
  githubUrl: "",
  liveUrl: "",
  featured: false,
};

export default function AdminProjectsPage() {
  const router = useRouter();

  const [projects, setProjects] = useState<Project[]>([]);
  const [formData, setFormData] = useState(emptyForm);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // --------------------------------
  // Check authentication
  // --------------------------------

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      router.replace("/admin/login");
      return;
    }

    fetchProjects();
  }, [router]);

  // --------------------------------
  // Get all projects
  // --------------------------------

  const fetchProjects = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/projects`);

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch projects");
      }

      setProjects(result.data || []);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to fetch projects"
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------
  // Handle input changes
  // --------------------------------

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? (event.target as HTMLInputElement).checked
          : value,
    }));
  };

  // --------------------------------
  // Add / Update project
  // --------------------------------

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        router.replace("/admin/login");
        return;
      }

      const projectData = {
        title: formData.title,
        description: formData.description,
        image: formData.image,
        technologies: formData.technologies
          .split(",")
          .map((technology) => technology.trim())
          .filter(Boolean),
        githubUrl: formData.githubUrl,
        liveUrl: formData.liveUrl,
        featured: formData.featured,
      };

      const url = editingId
        ? `${API_URL}/projects/${editingId}`
        : `${API_URL}/projects`;

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(projectData),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("adminToken");
          localStorage.removeItem("adminUser");
          router.replace("/admin/login");
          return;
        }

        throw new Error(
          result.message || "Failed to save project"
        );
      }

      setSuccess(
        editingId
          ? "Project updated successfully."
          : "Project created successfully."
      );

      setFormData(emptyForm);
      setEditingId(null);

      await fetchProjects();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to save project"
      );
    } finally {
      setSaving(false);
    }
  };

  // --------------------------------
  // Edit project
  // --------------------------------

  const handleEdit = (project: Project) => {
    setEditingId(project._id);

    setFormData({
      title: project.title,
      description: project.description,
      image: project.image || "",
      technologies: project.technologies.join(", "),
      githubUrl: project.githubUrl || "",
      liveUrl: project.liveUrl || "",
      featured: project.featured,
    });

    setSuccess("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // --------------------------------
  // Cancel editing
  // --------------------------------

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setError("");
    setSuccess("");
  };

  // --------------------------------
  // Delete project
  // --------------------------------

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      const token = localStorage.getItem("adminToken");

      if (!token) {
        router.replace("/admin/login");
        return;
      }

      const response = await fetch(`${API_URL}/projects/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("adminToken");
          localStorage.removeItem("adminUser");
          router.replace("/admin/login");
          return;
        }

        throw new Error(
          result.message || "Failed to delete project"
        );
      }

      setSuccess("Project deleted successfully.");

      await fetchProjects();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to delete project"
      );
    }
  };

  return (
    <main className="min-h-screen bg-[#0B0F1A] px-4 py-8 text-white">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Manage Projects
            </h1>

            <p className="mt-2 text-gray-400">
              Add, edit, and manage your portfolio projects.
            </p>
          </div>

          <button
            onClick={() => router.push("/admin")}
            className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 transition hover:bg-white/10"
          >
            ← Dashboard
          </button>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
            {success}
          </div>
        )}

        {/* Form */}
        <section className="mb-10 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {editingId ? "Edit Project" : "Add New Project"}
            </h2>

            {editingId && (
              <button
                onClick={handleCancelEdit}
                className="text-sm text-gray-400 hover:text-white"
              >
                Cancel
              </button>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid gap-5 md:grid-cols-2"
          >
            {/* Title */}
            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Project Title
              </label>

              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="OpenJustice"
                className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-[#6C5CE7]"
              />
            </div>

            {/* Image */}
            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Image URL
              </label>

              <input
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-[#6C5CE7]"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm text-gray-300">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Describe your project..."
                className="w-full resize-none rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-[#6C5CE7]"
              />
            </div>

            {/* Technologies */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm text-gray-300">
                Technologies
              </label>

              <input
                name="technologies"
                value={formData.technologies}
                onChange={handleChange}
                placeholder="React, Node.js, MongoDB, TypeScript"
                className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-[#6C5CE7]"
              />

              <p className="mt-2 text-xs text-gray-500">
                Separate technologies with commas.
              </p>
            </div>

            {/* GitHub */}
            <div>
              <label className="mb-2 block text-sm text-gray-300">
                GitHub URL
              </label>

              <input
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                placeholder="https://github.com/..."
                className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-[#6C5CE7]"
              />
            </div>

            {/* Live URL */}
            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Live URL
              </label>

              <input
                name="liveUrl"
                value={formData.liveUrl}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-[#6C5CE7]"
              />
            </div>

            {/* Featured */}
            <div className="md:col-span-2">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="h-4 w-4"
                />

                <span className="text-sm text-gray-300">
                  ⭐ Featured project
                </span>
              </label>
            </div>

            {/* Submit */}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-[#6C5CE7] px-6 py-3 font-semibold text-white transition hover:bg-[#5a4bd1] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update Project"
                    : "Add Project"}
              </button>
            </div>
          </form>
        </section>

        {/* Project List */}
        <section>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Existing Projects
            </h2>

            <span className="text-sm text-gray-500">
              {projects.length} project
              {projects.length !== 1 ? "s" : ""}
            </span>
          </div>

          {loading ? (
            <p className="text-gray-400">
              Loading projects...
            </p>
          ) : projects.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center text-gray-400">
              No projects found.
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <article
                  key={project._id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold">
                      {project.title}
                    </h3>

                    {project.featured && (
                      <span className="rounded-full bg-yellow-500/10 px-2 py-1 text-xs text-yellow-400">
                        ⭐ Featured
                      </span>
                    )}
                  </div>

                  <p className="mb-4 line-clamp-3 text-sm leading-6 text-gray-400">
                    {project.description}
                  </p>

                  <div className="mb-5 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-full bg-[#6C5CE7]/10 px-2.5 py-1 text-xs text-[#b4adff]"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(project)}
                      className="flex-1 rounded-lg border border-white/10 px-3 py-2 text-sm transition hover:bg-white/10"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(project._id)}
                      className="flex-1 rounded-lg border border-red-500/20 px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}