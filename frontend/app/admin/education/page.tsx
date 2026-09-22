"use client";

import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useRouter } from "next/navigation";

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

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not configured");
}

const emptyForm = {
  institution: "",
  degree: "",
  field: "",
  specialization: "",
  startDate: "",
  endDate: "",
  description: "",
  grade: "",
  current: false,
};

export default function AdminEducationPage() {
  const router = useRouter();

  const [educations, setEducations] = useState<Education[]>([]);
  const [formData, setFormData] = useState(emptyForm);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // --------------------------------
  // Get education records from API
  // --------------------------------

  const getEducations = async (): Promise<Education[]> => {
    const response = await fetch(`${API_URL}/api/education`);

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || "Failed to fetch education"
      );
    }

    return result.data || [];
  };

  // --------------------------------
  // Check authentication + initial load
  // --------------------------------

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      router.replace("/admin/login");
      return;
    }

    const loadEducations = async () => {
      try {
        const data = await getEducations();

        setEducations(data);
        setError("");
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to fetch education"
        );
      } finally {
        setLoading(false);
      }
    };

    void loadEducations();
  }, [router]);

  // --------------------------------
  // Refresh education records
  // --------------------------------

  const fetchEducations = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getEducations();

      setEducations(data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to fetch education"
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------
  // Handle input changes
  // --------------------------------

  const handleChange = (
    event: ChangeEvent<
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
  // Add / Update education
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

      const educationData = {
        institution: formData.institution,
        degree: formData.degree,
        field: formData.field,
        specialization: formData.specialization,
        startDate: formData.startDate,
        endDate: formData.current
          ? ""
          : formData.endDate,
        description: formData.description,
        grade: formData.grade,
        current: formData.current,
      };

      const url = editingId
        ? `${API_URL}/api/education/${editingId}`
        : `${API_URL}/api/education`;

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(educationData),
      });

      const result = await response.json();

      if (!response.ok) {
        if (
          response.status === 401 ||
          response.status === 403
        ) {
          localStorage.removeItem("adminToken");
          localStorage.removeItem("admin");

          router.replace("/admin/login");
          return;
        }

        throw new Error(
          result.message || "Failed to save education"
        );
      }

      setSuccess(
        editingId
          ? "Education updated successfully."
          : "Education created successfully."
      );

      setFormData(emptyForm);
      setEditingId(null);

      await fetchEducations();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to save education"
      );
    } finally {
      setSaving(false);
    }
  };

  // --------------------------------
  // Edit education
  // --------------------------------

  const handleEdit = (education: Education) => {
    setEditingId(education._id);

    setFormData({
      institution: education.institution,
      degree: education.degree,
      field: education.field,
      specialization: education.specialization || "",
      startDate: education.startDate,
      endDate: education.endDate || "",
      description: education.description || "",
      grade: education.grade || "",
      current: education.current
      
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
  // Delete education
  // --------------------------------

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this education record?"
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
        `${API_URL}/api/education/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        if (
          response.status === 401 ||
          response.status === 403
        ) {
          localStorage.removeItem("adminToken");
          localStorage.removeItem("admin");

          router.replace("/admin/login");
          return;
        }

        throw new Error(
          result.message || "Failed to delete education"
        );
      }

      setSuccess("Education deleted successfully.");

      await fetchEducations();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to delete education"
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
              Manage Education
            </h1>

            <p className="mt-2 text-gray-400">
              Add, edit, and manage your education history.
            </p>
          </div>

          <button
            type="button"
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
                ? "Edit Education"
                : "Add New Education"}
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

            {/* Institution */}

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm text-gray-300">
                Institution
              </label>

              <input
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                required
                placeholder="Uva Wellassa University of Sri Lanka"
                className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-[#6C5CE7]"
              />
            </div>

            {/* Degree */}

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Degree
              </label>

              <input
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                required
                placeholder="Bachelor of Information & Communication Technology"
                className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-[#6C5CE7]"
              />
            </div>

            {/* Field */}

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Field of Study
              </label>

              <input
                name="field"
                value={formData.field}
                onChange={handleChange}
                required
                placeholder="Information & Communication Technology"
                className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-[#6C5CE7]"
              />
            </div>
           {/* Specialization */}
<div>
  <label className="mb-2 block text-sm text-gray-300">
    Specialization
  </label>

  <input
    name="specialization"
    value={formData.specialization}
    onChange={handleChange}
    placeholder="Software Technology"
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
                placeholder="2021"
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
                placeholder="2026"
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
                  Currently studying here
                </span>
              </label>
            </div>

            {/* Grade */}

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Grade / GPA
              </label>

              <input
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                placeholder="e.g. 3.45 / 4.00"
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
                rows={5}
                placeholder="Describe your degree, academic focus, achievements, or relevant coursework..."
                className="w-full resize-none rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-[#6C5CE7]"
              />
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
                    ? "Update Education"
                    : "Add Education"}
              </button>
            </div>

          </form>
        </section>

        {/* Education List */}

        <section>

          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Existing Education
            </h2>

            <span className="text-sm text-gray-500">
              {educations.length} education
              {educations.length !== 1
                ? " records"
                : " record"}
            </span>
          </div>

          {loading ? (
            <p className="text-gray-400">
              Loading education...
            </p>
          ) : educations.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center text-gray-400">
              No education records found.
            </div>
          ) : (
            <div className="space-y-5">

              {educations.map((education) => (
                <article
                  key={education._id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6"
                >

                  {/* Header */}

                  <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                    <div>
                      <h3 className="text-xl font-semibold">
                        {education.degree}
                      </h3>

                      <p className="mt-1 text-[#6C5CE7]">
                        {education.institution}
                      </p>

                      {education.field && (
                        <p className="mt-1 text-sm text-gray-500">
                          {education.field}
                        </p>
                      )}
                    </div>
                    {education.specialization && (
  <p className="mt-1 text-sm text-[#00c2ff]">
    Specialization: {education.specialization}
  </p>
)}
                    <span className="w-fit rounded-full bg-white/5 px-3 py-1 text-xs text-gray-400">
                      {education.startDate}
                      {" — "}
                      {education.current
                        ? "Present"
                        : education.endDate || "Present"}
                    </span>

                  </div>

                  {/* Grade */}

                  {education.grade && (
                    <div className="mb-4">
                      <span className="text-sm text-gray-500">
                        Grade / GPA:
                      </span>

                      <span className="ml-2 text-sm text-gray-300">
                        {education.grade}
                      </span>
                    </div>
                  )}

                  {/* Description */}

                  {education.description && (
                    <p className="mb-5 text-sm leading-6 text-gray-400">
                      {education.description}
                    </p>
                  )}

                  {/* Actions */}

                  <div className="flex gap-3">

                    <button
                      type="button"
                      onClick={() =>
                        handleEdit(education)
                      }
                      className="flex-1 rounded-lg border border-white/10 px-3 py-2 text-sm transition hover:bg-white/10"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(education._id)
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