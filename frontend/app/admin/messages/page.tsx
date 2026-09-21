"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Mail,
  MailOpen,
  Trash2,
  Eye,
  X,
  Calendar,
  User,
  MessageSquare,
  RefreshCw,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not configured");
}

export default function MessagesPage() {
  const router = useRouter();

  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [selectedMessage, setSelectedMessage] =
    useState<ContactMessage | null>(null);

  const [deletingId, setDeletingId] = useState<string | null>(null);

  // --------------------------------
  // Get messages from API
  // --------------------------------

  const getMessages = async (): Promise<ContactMessage[]> => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      router.push("/admin/login");
      throw new Error("Authentication required");
    }

    const response = await fetch(`${API_URL}/api/contacts`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("admin");
      router.push("/admin/login");
      throw new Error("Authentication required");
    }

    if (!response.ok) {
      const data = await response.json().catch(() => null);

      throw new Error(
        data?.message || "Failed to fetch messages"
      );
    }

    const data = await response.json();

    return Array.isArray(data) ? data : data.data || [];
  };

  // --------------------------------
  // Initial authentication + load
  // --------------------------------

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      router.push("/admin/login");
      return;
    }

    const loadMessages = async () => {
      try {
        const data = await getMessages();

        setMessages(data);
        setError("");
      } catch (error) {
        if (
          error instanceof Error &&
          error.message === "Authentication required"
        ) {
          return;
        }

        console.error(error);

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load messages."
        );
      } finally {
        setLoading(false);
      }
    };

    void loadMessages();
  }, [router]);

  // --------------------------------
  // Refresh messages
  // --------------------------------

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMessages();

      setMessages(data);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "Authentication required"
      ) {
        return;
      }

      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to load messages."
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------
  // Delete message
  // --------------------------------

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);
      setError("");
      setSuccess("");

      const token = localStorage.getItem("adminToken");

      if (!token) {
        router.push("/admin/login");
        return;
      }

      const response = await fetch(
        `${API_URL}/api/contacts/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("admin");
        router.push("/admin/login");
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete message"
        );
      }

      setMessages((prev) =>
        prev.filter((message) => message._id !== id)
      );

      if (selectedMessage?._id === id) {
        setSelectedMessage(null);
      }

      setSuccess("Message deleted successfully.");

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to delete message."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // --------------------------------
  // Unread count
  // --------------------------------

  const unreadCount = useMemo(() => {
    return messages.filter((message) => !message.read).length;
  }, [messages]);

  // --------------------------------
  // Date formatting
  // --------------------------------

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // --------------------------------
  // Open message + mark as read
  // --------------------------------

  const openMessage = async (message: ContactMessage) => {
    setSelectedMessage(message);

    if (message.read) {
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        router.push("/admin/login");
        return;
      }

      const response = await fetch(
        `${API_URL}/api/contacts/${message._id}/read`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("admin");
        router.push("/admin/login");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to mark message as read");
      }

      setMessages((prev) =>
        prev.map((item) =>
          item._id === message._id
            ? { ...item, read: true }
            : item
        )
      );

      setSelectedMessage((prev) =>
        prev
          ? {
              ...prev,
              read: true,
            }
          : null
      );
    } catch (error) {
      console.error("Mark as read error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white">

      {/* Header */}

      <header className="border-b border-white/10 bg-[#0B0F1A]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <button
              type="button"
              onClick={() => router.push("/admin")}
              className="mb-3 flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#6C5CE7]/15">
                <MessageSquare
                  size={22}
                  className="text-[#6C5CE7]"
                />
              </div>

              <div>
                <h1 className="text-2xl font-bold">
                  Messages
                </h1>

                <p className="text-sm text-gray-400">
                  Manage messages received through your contact form
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={fetchMessages}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-gray-300 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw
              size={16}
              className={loading ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">

        {/* Stats */}

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">
                  Total Messages
                </p>

                <p className="mt-2 text-3xl font-bold">
                  {messages.length}
                </p>
              </div>

              <div className="rounded-xl bg-[#6C5CE7]/15 p-3">
                <Mail
                  size={22}
                  className="text-[#6C5CE7]"
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">
                  Unread Messages
                </p>

                <p className="mt-2 text-3xl font-bold">
                  {unreadCount}
                </p>
              </div>

              <div className="rounded-xl bg-[#00C2FF]/15 p-3">
                <MailOpen
                  size={22}
                  className="text-[#00C2FF]"
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">
                  Latest Message
                </p>

                <p className="mt-2 text-lg font-semibold">
                  {messages.length > 0
                    ? formatDate(messages[0].createdAt)
                    : "No messages"}
                </p>
              </div>

              <div className="rounded-xl bg-purple-500/15 p-3">
                <Calendar
                  size={22}
                  className="text-purple-400"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Success */}

        {success && (
          <div className="mb-6 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
            {success}
          </div>
        )}

        {/* Error */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Messages */}

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">

          <div className="border-b border-white/10 px-6 py-5">
            <h2 className="text-lg font-semibold">
              Contact Messages
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Messages submitted from your portfolio contact form.
            </p>
          </div>

          {loading ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <RefreshCw
                size={28}
                className="animate-spin text-[#6C5CE7]"
              />
            </div>
          ) : messages.length === 0 ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
              <div className="mb-4 rounded-full bg-white/5 p-4">
                <Mail
                  size={30}
                  className="text-gray-500"
                />
              </div>

              <h3 className="text-lg font-semibold">
                No messages yet
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Messages submitted through your contact form
                will appear here.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-white/10">
              {messages.map((message) => (
                <div
                  key={message._id}
                  className={`p-5 transition hover:bg-white/[0.03] ${
                    !message.read
                      ? "border-l-2 border-[#6C5CE7]"
                      : ""
                  }`}
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                    {/* Message Info */}

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start gap-4">

                        <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#6C5CE7]/10 sm:flex">
                          <User
                            size={19}
                            className="text-[#6C5CE7]"
                          />
                        </div>

                        <div className="min-w-0 flex-1">

                          <div className="flex flex-wrap items-center gap-2">
                            <h3
                              className={`font-semibold ${
                                !message.read
                                  ? "text-white"
                                  : "text-gray-300"
                              }`}
                            >
                              {message.name}
                            </h3>

                            {!message.read && (
                              <span className="rounded-full bg-[#6C5CE7]/15 px-2 py-0.5 text-xs font-medium text-[#9b91ff]">
                                New
                              </span>
                            )}
                          </div>

                          <p className="mt-1 break-all text-sm text-gray-400">
                            {message.email}
                          </p>

                          <p className="mt-2 text-sm font-medium text-gray-300">
                            {message.subject || "No subject"}
                          </p>

                          <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                            {message.message}
                          </p>

                          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1.5">
                              <Calendar size={13} />
                              {formatDate(message.createdAt)}
                            </span>

                            <span>
                              {formatTime(message.createdAt)}
                            </span>
                          </div>

                        </div>
                      </div>
                    </div>

                    {/* Actions */}

                    <div className="flex shrink-0 items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openMessage(message)}
                        className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-300 transition hover:bg-white/10 hover:text-white"
                      >
                        <Eye size={16} />
                        View
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(message._id)
                        }
                        disabled={deletingId === message._id}
                        className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {deletingId === message._id ? (
                          <RefreshCw
                            size={16}
                            className="animate-spin"
                          />
                        ) : (
                          <Trash2 size={16} />
                        )}
                        Delete
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>

      {/* Message Modal */}

      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#111625] shadow-2xl">

            {/* Modal Header */}

            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div>
                <p className="text-sm text-gray-400">
                  Contact Message
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  {selectedMessage.subject || "No subject"}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-white/10 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}

            <div className="max-h-[65vh] overflow-y-auto px-6 py-6">

              {/* Sender */}

              <div className="mb-6 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6C5CE7]/15">
                    <User
                      size={18}
                      className="text-[#6C5CE7]"
                    />
                  </div>

                  <div>
                    <p className="font-semibold">
                      {selectedMessage.name}
                    </p>

                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="text-sm text-[#00C2FF] hover:underline"
                    >
                      {selectedMessage.email}
                    </a>
                  </div>

                </div>
              </div>

              {/* Date */}

              <div className="mb-6 flex flex-wrap gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <Calendar size={16} />
                  {formatDate(selectedMessage.createdAt)}
                </span>

                <span>
                  {formatTime(selectedMessage.createdAt)}
                </span>

                <span
                  className={`rounded-full px-2.5 py-1 text-xs ${
                    selectedMessage.read
                      ? "bg-white/5 text-gray-400"
                      : "bg-[#6C5CE7]/15 text-[#9b91ff]"
                  }`}
                >
                  {selectedMessage.read
                    ? "Read"
                    : "Unread"}
                </span>
              </div>

              {/* Message */}

              <div>
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
                  <MessageSquare size={16} />
                  Message
                </div>

                <div className="whitespace-pre-wrap rounded-xl border border-white/10 bg-black/20 p-5 text-sm leading-7 text-gray-300">
                  {selectedMessage.message}
                </div>
              </div>

            </div>

            {/* Modal Footer */}

            <div className="flex justify-end gap-3 border-t border-white/10 px-6 py-4">

              <a
                href={`mailto:${selectedMessage.email}?subject=Re: ${
                  selectedMessage.subject || "Your message"
                }`}
                className="flex items-center gap-2 rounded-lg bg-[#6C5CE7] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#5b4ed0]"
              >
                <Mail size={16} />
                Reply by Email
              </a>

              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-gray-300 transition hover:bg-white/10 hover:text-white"
              >
                Close
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}