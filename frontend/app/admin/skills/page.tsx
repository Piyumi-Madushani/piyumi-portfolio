"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Skill {
  _id: string;
  name: string;
  category: string;
  level?: string;
  icon?: string;
  order: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not configured");
}
const emptyForm = {
  name: "",
  category: "",
  level: "",
  icon: "",
  order: 0,
};

export default function AdminSkillsPage() {
  const router = useRouter();

  const [skills, setSkills] = useState<Skill[]>([]);
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

    fetchSkills();
  }, [router]);

  // --------------------------------
  // Get all skills
  // --------------------------------

  const fetchSkills = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/api/skills`);

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to fetch skills"
        );
      }

      setSkills(result.data || []);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to fetch skills"
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------
  // Handle input changes
  // --------------------------------

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: name === "order" ? Number(value) : value,
    }));
  };

  // --------------------------------
  // Add / Update skill
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

      const skillData = {
        name: formData.name,
        category: formData.category,
        level: formData.level,
        icon: formData.icon,
        order: formData.order,
      };

      const url = editingId
        ? `${API_URL}/skills/${editingId}`
        : `${API_URL}/skills`;

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(skillData),
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
          result.message || "Failed to save skill"
        );
      }

      setSuccess(
        editingId
          ? "Skill updated successfully."
          : "Skill created successfully."
      );

      setFormData(emptyForm);
      setEditingId(null);

      await fetchSkills();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to save skill"
      );
    } finally {
      setSaving(false);
    }
  };

  // --------------------------------
  // Edit skill
  // --------------------------------

  const handleEdit = (skill: Skill) => {
    setEditingId(skill._id);

    setFormData({
      name: skill.name,
      category: skill.category,
      level: skill.level || "",
      icon: skill.icon || "",
      order: skill.order ?? 0,
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
  // Delete skill
  // --------------------------------

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this skill?"
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
        `${API_URL}/skills/${id}`,
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
          result.message || "Failed to delete skill"
        );
      }

      setSuccess("Skill deleted successfully.");

      await fetchSkills();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to delete skill"
      );
    }
  };

  // --------------------------------
  // Group skills by category
  // --------------------------------

  const categories = Array.from(
    new Set(skills.map((skill) => skill.category))
  );

  return (
    <main className="min-h-screen bg-[#0B0F1A] px-4 py-8 text-white">
      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Manage Skills
            </h1>

            <p className="mt-2 text-gray-400">
              Add, edit, and manage your technical skills.
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
                ? "Edit Skill"
                : "Add New Skill"}
            </h2>

            {editingId && (
              <button
                type="button"
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

            {/* Skill Name */}

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Skill Name
              </label>

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="React.js"
                className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-[#6C5CE7]"
              />
            </div>

            {/* Category */}

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Category
              </label>

              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                placeholder="Frontend"
                className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-[#6C5CE7]"
              />
            </div>

            {/* Level */}

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Level
              </label>

              <input
                name="level"
                value={formData.level}
                onChange={handleChange}
                placeholder="Advanced"
                className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-[#6C5CE7]"
              />
            </div>

            {/* Icon */}

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Icon
              </label>

              <input
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                placeholder="react"
                className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-[#6C5CE7]"
              />

              <p className="mt-2 text-xs text-gray-500">
                Enter an icon name, icon URL, or identifier
                used by your portfolio.
              </p>
            </div>

            {/* Order */}

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Display Order
              </label>

              <input
                type="number"
                name="order"
                value={formData.order}
                onChange={handleChange}
                min="0"
                className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-[#6C5CE7]"
              />

              <p className="mt-2 text-xs text-gray-500">
                Lower numbers appear first within a category.
              </p>
            </div>

            {/* Submit */}

            <div className="flex items-end">
              <button
                type="submit"
                disabled={saving}
                className="w-full rounded-lg bg-[#6C5CE7] px-6 py-3 font-semibold text-white transition hover:bg-[#5a4bd1] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update Skill"
                    : "Add Skill"}
              </button>
            </div>

          </form>
        </section>

        {/* Skills List */}

        <section>

          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">
                Existing Skills
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {skills.length} skill
                {skills.length !== 1 ? "s" : ""}
                {" · "}
                {categories.length} categor
                {categories.length !== 1 ? "ies" : "y"}
              </p>
            </div>
          </div>

          {loading ? (
            <p className="text-gray-400">
              Loading skills...
            </p>
          ) : skills.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center text-gray-400">
              No skills found.
            </div>
          ) : (
            <div className="space-y-8">

              {categories.map((category) => {

                const categorySkills = skills.filter(
                  (skill) =>
                    skill.category === category
                );

                return (
                  <div key={category}>

                    {/* Category Header */}

                    <div className="mb-4 flex items-center gap-3">
                      <h3 className="text-lg font-semibold">
                        {category}
                      </h3>

                      <span className="rounded-full bg-[#6C5CE7]/10 px-2.5 py-1 text-xs text-[#9b91ff]">
                        {categorySkills.length}
                      </span>
                    </div>

                    {/* Skills */}

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

                      {categorySkills.map((skill) => (
                        <article
                          key={skill._id}
                          className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-white/20"
                        >

                          {/* Skill Header */}

                          <div className="mb-4 flex items-start justify-between gap-3">

                            <div className="flex items-center gap-3">

                              {skill.icon ? (
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#6C5CE7]/10 text-xs font-semibold text-[#9b91ff]">
                                  {skill.icon
                                    .slice(0, 2)
                                    .toUpperCase()}
                                </div>
                              ) : (
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-gray-500">
                                  •
                                </div>
                              )}

                              <div>
                                <h4 className="font-semibold">
                                  {skill.name}
                                </h4>

                                {skill.level && (
                                  <p className="mt-1 text-xs text-gray-500">
                                    {skill.level}
                                  </p>
                                )}
                              </div>

                            </div>

                            <span className="rounded-full bg-white/5 px-2 py-1 text-xs text-gray-500">
                              #{skill.order}
                            </span>

                          </div>

                          {/* Icon */}

                          {skill.icon && (
                            <p className="mb-4 text-xs text-gray-600">
                              Icon: {skill.icon}
                            </p>
                          )}

                          {/* Actions */}

                          <div className="flex gap-3">

                            <button
                              type="button"
                              onClick={() =>
                                handleEdit(skill)
                              }
                              className="flex-1 rounded-lg border border-white/10 px-3 py-2 text-sm transition hover:bg-white/10"
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleDelete(skill._id)
                              }
                              className="flex-1 rounded-lg border border-red-500/20 px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
                            >
                              Delete
                            </button>

                          </div>

                        </article>
                      ))}

                    </div>
                  </div>
                );
              })}

            </div>
          )}

        </section>

      </div>
    </main>
  );
}