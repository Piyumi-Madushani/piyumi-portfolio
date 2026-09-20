"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not configured");
}

const emptyForm = {
  title: "",
  issuer: "",
  issueDate: "",
  credentialId: "",
  credentialUrl: "",
  image: "",
  status: "",
};

export default function AdminCertificationsPage() {
  const router = useRouter();

  const [certifications, setCertifications] = useState<
    Certification[]
  >([]);

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

    fetchCertifications();
  }, [router]);

  // --------------------------------
  // Get all certifications
  // --------------------------------

  const fetchCertifications = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/certifications`
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to fetch certifications"
        );
      }

      setCertifications(result.data || []);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to fetch certifications"
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
      [name]: value,
    }));
  };

  // --------------------------------
  // Add / Update certification
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

      const certificationData = {
        title: formData.title,
        issuer: formData.issuer,
        issueDate: formData.issueDate,
        credentialId: formData.credentialId,
        credentialUrl: formData.credentialUrl,
        image: formData.image,
        status: formData.status,
      };

      const url = editingId
        ? `${API_URL}/certifications/${editingId}`
        : `${API_URL}/certifications`;

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(certificationData),
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
          result.message ||
            "Failed to save certification"
        );
      }

      setSuccess(
        editingId
          ? "Certification updated successfully."
          : "Certification created successfully."
      );

      setFormData(emptyForm);
      setEditingId(null);

      await fetchCertifications();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to save certification"
      );
    } finally {
      setSaving(false);
    }
  };

  // --------------------------------
  // Edit certification
  // --------------------------------

  const handleEdit = (
    certification: Certification
  ) => {
    setEditingId(certification._id);

    setFormData({
      title: certification.title,
      issuer: certification.issuer,
      issueDate: certification.issueDate,
      credentialId:
        certification.credentialId || "",
      credentialUrl:
        certification.credentialUrl || "",
      image: certification.image || "",
      status: certification.status || "",
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
  // Delete certification
  // --------------------------------

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this certification?"
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
        `${API_URL}/certifications/${id}`,
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
          result.message ||
            "Failed to delete certification"
        );
      }

      setSuccess(
        "Certification deleted successfully."
      );

      await fetchCertifications();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to delete certification"
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
              Manage Certifications
            </h1>

            <p className="mt-2 text-gray-400">
              Add, edit, and manage your professional
              certifications.
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
                ? "Edit Certification"
                : "Add New Certification"}
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

            {/* Title */}

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm text-gray-300">
                Certification Title
              </label>

              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="AWS Certified Cloud Practitioner"
                className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-[#6C5CE7]"
              />
            </div>

            {/* Issuer */}

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Issuer
              </label>

              <input
                name="issuer"
                value={formData.issuer}
                onChange={handleChange}
                required
                placeholder="Amazon Web Services"
                className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-[#6C5CE7]"
              />
            </div>

            {/* Issue Date */}

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Issue Date
              </label>

              <input
                name="issueDate"
                value={formData.issueDate}
                onChange={handleChange}
                required
                placeholder="2026"
                className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-[#6C5CE7]"
              />
            </div>

            {/* Credential ID */}

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Credential ID
              </label>

              <input
                name="credentialId"
                value={formData.credentialId}
                onChange={handleChange}
                placeholder="ABC123456"
                className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-[#6C5CE7]"
              />
            </div>

            {/* Status */}

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Status
              </label>

              <input
                name="status"
                value={formData.status}
                onChange={handleChange}
                placeholder="Completed"
                className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-[#6C5CE7]"
              />
            </div>

            {/* Credential URL */}

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm text-gray-300">
                Credential URL
              </label>

              <input
                type="url"
                name="credentialUrl"
                value={formData.credentialUrl}
                onChange={handleChange}
                placeholder="https://example.com/verify/..."
                className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-[#6C5CE7]"
              />
            </div>

            {/* Image */}

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm text-gray-300">
                Certificate Image URL
              </label>

              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/certificate.jpg"
                className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-[#6C5CE7]"
              />

              <p className="mt-2 text-xs text-gray-500">
                Optional. Enter the URL of the certificate
                image.
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
                    ? "Update Certification"
                    : "Add Certification"}
              </button>
            </div>

          </form>
        </section>

        {/* Certification List */}

        <section>

          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">
                Existing Certifications
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {certifications.length} certification
                {certifications.length !== 1
                  ? "s"
                  : ""}
              </p>
            </div>
          </div>

          {loading ? (
            <p className="text-gray-400">
              Loading certifications...
            </p>
          ) : certifications.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center text-gray-400">
              No certifications found.
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">

              {certifications.map(
                (certification) => (
                  <article
                    key={certification._id}
                    className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-white/20"
                  >

                    {/* Image */}

                    {certification.image ? (
                      <div className="mb-5 overflow-hidden rounded-xl border border-white/10 bg-black/20">
                        <img
                          src={certification.image}
                          alt={
                            certification.title
                          }
                          className="h-48 w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="mb-5 flex h-32 items-center justify-center rounded-xl border border-white/10 bg-black/20 text-sm text-gray-600">
                        No certificate image
                      </div>
                    )}

                    {/* Header */}

                    <div className="mb-5">

                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                        <div>
                          <h3 className="text-xl font-semibold">
                            {certification.title}
                          </h3>

                          <p className="mt-1 text-[#6C5CE7]">
                            {certification.issuer}
                          </p>
                        </div>

                        {certification.status && (
                          <span className="w-fit rounded-full bg-white/5 px-3 py-1 text-xs text-gray-400">
                            {certification.status}
                          </span>
                        )}

                      </div>

                    </div>

                    {/* Details */}

                    <div className="space-y-3 text-sm">

                      <div>
                        <span className="text-gray-500">
                          Issue Date:
                        </span>

                        <span className="ml-2 text-gray-300">
                          {certification.issueDate}
                        </span>
                      </div>

                      {certification.credentialId && (
                        <div>
                          <span className="text-gray-500">
                            Credential ID:
                          </span>

                          <span className="ml-2 break-all text-gray-300">
                            {
                              certification.credentialId
                            }
                          </span>
                        </div>
                      )}

                      {certification.credentialUrl && (
                        <div>
                          <a
                            href={
                              certification.credentialUrl
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#8b80ff] transition hover:text-white"
                          >
                            View Credential →
                          </a>
                        </div>
                      )}

                    </div>

                    {/* Actions */}

                    <div className="mt-6 flex gap-3">

                      <button
                        type="button"
                        onClick={() =>
                          handleEdit(
                            certification
                          )
                        }
                        className="flex-1 rounded-lg border border-white/10 px-3 py-2 text-sm transition hover:bg-white/10"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(
                            certification._id
                          )
                        }
                        className="flex-1 rounded-lg border border-red-500/20 px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
                      >
                        Delete
                      </button>

                    </div>

                  </article>
                )
              )}

            </div>
          )}

        </section>

      </div>
    </main>
  );
}