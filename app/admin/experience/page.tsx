"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const emptyForm = {
  company: "",
  position: "",
  startDate: "",
  endDate: "",
  description: "",
  technologies: "",
  current: false,
};

export default function AdminExperiencePage() {
  const router = useRouter();

  const [experiences, setExperiences] = useState<Experience[]>([]);
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

    fetchExperiences();
  }, [router]);

  // --------------------------------
  // Get all experiences
  // --------------------------------

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/experience`);

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to fetch experiences"
        );
      }

      setExperiences(result.data || []);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to fetch experiences"
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
  // Add / Update experience
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

      const experienceData = {
        company: formData.company,
        position: formData.position,
        startDate: formData.startDate,
        endDate: formData.current ? "" : formData.endDate,
        description: formData.description
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
        technologies: formData.technologies
          .split(",")
          .map((technology) => technology.trim())
          .filter(Boolean),
        current: formData.current,
      };

      const url = editingId
        ? `${API_URL}/experience/${editingId}`
        : `${API_URL}/experience`;

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(experienceData),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("adminToken");
          localStorage.removeItem("admin");
          router.replace("/admin/login");
          return;
        }

        throw new Error(
          result.message || "Failed to save experience"
        );
      }

      setSuccess(
        editingId
          ? "Experience updated successfully."
          : "Experience created successfully."
      );

      setFormData(emptyForm);
      setEditingId(null);

      await fetchExperiences();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to save experience"
      );
    } finally {
      setSaving(false);
    }
  };

  // --------------------------------
  // Edit experience
  // --------------------------------

  const handleEdit = (experience: Experience) => {
    setEditingId(experience._id);

    setFormData({
      company: experience.company,
      position: experience.position,
      startDate: experience.startDate,
      endDate: experience.endDate || "",
      description: experience.description.join("\n"),
      technologies: experience.technologies.join(", "),
      current: experience.current,
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
  // Delete experience
  // --------------------------------

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this experience?"
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

      const response = await fetch(
        `${API_URL}/experience/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("adminToken");
          localStorage.removeItem("admin");
          router.replace("/admin/login");
          return;
        }

        throw new Error(
          result.message || "Failed to delete experience"
        );
      }

      setSuccess("Experience deleted successfully.");

      await fetchExperiences();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to delete experience"
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
              Manage Experience
            </h1>

            <p className="mt-2 text-gray-400">
              Add, edit, and manage your professional experience.
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
              {editingId
                ? "Edit Experience"
                : "Add New Experience"}
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

            {/* Company */}

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Company
              </label>

              <input
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                placeholder="ClanCode Labs"
                className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-[#6C5CE7]"
              />
            </div>

            {/* Position */}

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Position
              </label>

              <input
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                placeholder="Intern Software Engineer"
                className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-[#6C5CE7]"
              />
            </div>

            {/* Start Date */}

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Start Date
              </label>

              <input
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                placeholder="Jun 2025"
                className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-[#6C5CE7]"
              />
            </div>

            {/* End Date */}

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                End Date
              </label>

              <input
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                disabled={formData.current}
                placeholder="Oct 2025"
                className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-[#6C5CE7] disabled:cursor-not-allowed disabled:opacity-40"
              />
            </div>

            {/* Current */}

            <div className="md:col-span-2">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  name="current"
                  checked={formData.current}
                  onChange={handleChange}
                  className="h-4 w-4"
                />

                <span className="text-sm text-gray-300">
                  Currently working here
                </span>
              </label>
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
                rows={6}
                placeholder={`Supported software project development and coordination
Worked with Node.js, TypeScript, React, and MongoDB
Participated in testing, documentation, and project activities`}
                className="w-full resize-none rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-[#6C5CE7]"
              />

              <p className="mt-2 text-xs text-gray-500">
                Enter each description point on a new line.
              </p>
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
                placeholder="Node.js, TypeScript, React, MongoDB"
                className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-[#6C5CE7]"
              />

              <p className="mt-2 text-xs text-gray-500">
                Separate technologies with commas.
              </p>
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
                    ? "Update Experience"
                    : "Add Experience"}
              </button>
            </div>

          </form>
        </section>

        {/* Experience List */}

        <section>

          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Existing Experience
            </h2>

            <span className="text-sm text-gray-500">
              {experiences.length} experience
              {experiences.length !== 1 ? "s" : ""}
            </span>
          </div>

          {loading ? (
            <p className="text-gray-400">
              Loading experience...
            </p>
          ) : experiences.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center text-gray-400">
              No experience records found.
            </div>
          ) : (
            <div className="space-y-5">

              {experiences.map((experience) => (
                <article
                  key={experience._id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6"
                >

                  {/* Header */}

                  <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                    <div>
                      <h3 className="text-xl font-semibold">
                        {experience.position}
                      </h3>

                      <p className="mt-1 text-[#6C5CE7]">
                        {experience.company}
                      </p>
                    </div>

                    <span className="w-fit rounded-full bg-white/5 px-3 py-1 text-xs text-gray-400">
                      {experience.startDate}
                      {" — "}
                      {experience.current
                        ? "Present"
                        : experience.endDate || "Present"}
                    </span>

                  </div>

                  {/* Description */}

                  {experience.description.length > 0 && (
                    <ul className="mb-5 space-y-2">
                      {experience.description.map(
                        (item, index) => (
                          <li
                            key={`${experience._id}-description-${index}`}
                            className="flex gap-3 text-sm leading-6 text-gray-400"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6C5CE7]" />

                            <span>{item}</span>
                          </li>
                        )
                      )}
                    </ul>
                  )}

                  {/* Technologies */}

                  {experience.technologies.length > 0 && (
                    <div className="mb-5 flex flex-wrap gap-2">
                      {experience.technologies.map(
                        (technology) => (
                          <span
                            key={technology}
                            className="rounded-full bg-[#6C5CE7]/10 px-2.5 py-1 text-xs text-[#b4adff]"
                          >
                            {technology}
                          </span>
                        )
                      )}
                    </div>
                  )}

                  {/* Actions */}

                  <div className="flex gap-3">

                    <button
                      onClick={() =>
                        handleEdit(experience)
                      }
                      className="flex-1 rounded-lg border border-white/10 px-3 py-2 text-sm transition hover:bg-white/10"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(experience._id)
                      }
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

