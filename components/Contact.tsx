"use client";

import {
  ArrowUpRight,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { FormEvent, useState } from "react";
import { sendContact } from "@/lib/api";

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: "piyumiinstead@gmail.com",
    href: "mailto:piyumiinstead@gmail.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Sri Lanka",
    href: "#",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [id]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSending(true);
    setSuccess("");
    setError("");

    try {
      await sendContact(formData);

      setSuccess(
        "Your message has been sent successfully. Thank you for reaching out!"
      );

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Failed to send message:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to send message. Please try again."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32"
    >
      {/* Background glow */}
      <div className="absolute left-1/2 top-1/3 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-[#6c5ce7]/15 blur-[100px] sm:h-80 sm:w-80 sm:blur-[120px] lg:h-96 lg:w-96 lg:blur-[130px]" />

      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#00c2ff] sm:mb-4 sm:text-sm sm:tracking-[0.3em]">
            Get In Touch
          </p>

          <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Let's build something{" "}
            <span className="bg-gradient-to-r from-[#6c5ce7] to-[#00c2ff] bg-clip-text text-transparent">
              meaningful.
            </span>
          </h2>

          <p className="mt-5 text-sm leading-6 text-slate-400 sm:mt-6 sm:text-base sm:leading-7 lg:text-lg">
            I'm open to software engineering opportunities, project-based
            work, internships, and opportunities to contribute to
            technology-driven teams.
          </p>
        </div>

        {/* Contact content */}
        <div className="mt-10 grid gap-5 sm:mt-12 sm:gap-6 lg:mt-14 lg:grid-cols-[0.8fr_1.2fr]">

          {/* Contact information */}
          <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:rounded-3xl sm:p-7 lg:p-8">

            <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-[#6c5ce7]/10 text-[#8b7cf6] sm:mb-8 sm:h-12 sm:w-12 sm:rounded-2xl">
              <MessageCircle size={21} className="sm:hidden" />
              <MessageCircle size={23} className="hidden sm:block" />
            </div>

            <h3 className="text-xl font-semibold sm:text-2xl">
              Let's talk
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-500 sm:mt-4 sm:text-base sm:leading-7">
              Whether you have an opportunity, a project idea, or simply
              want to connect, feel free to reach out.
            </p>

            <div className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
              {contactDetails.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="group flex min-w-0 items-center gap-3 rounded-xl border border-white/10 bg-[#0b0f1a] p-3.5 transition-all duration-300 hover:border-[#6c5ce7]/30 hover:bg-white/[0.03] sm:gap-4 sm:rounded-2xl sm:p-4"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 text-[#00c2ff] sm:h-10 sm:w-10 sm:rounded-xl">
                      <Icon size={17} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-[0.15em] text-slate-600 sm:text-xs">
                        {item.label}
                      </p>

                      <p className="mt-1 break-all text-sm text-slate-300 group-hover:text-white">
                        {item.value}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Social links */}
            <div className="mt-6 border-t border-white/10 pt-5 sm:mt-8 sm:pt-6">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600 sm:mb-4 sm:text-xs">
                Find me online
              </p>

              <div className="flex flex-wrap gap-2.5 sm:gap-3">
                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/10 px-3.5 py-2 text-xs text-slate-400 transition hover:border-[#6c5ce7]/40 hover:bg-[#6c5ce7]/10 hover:text-white sm:px-4 sm:text-sm"
                >
                  GitHub
                </a>

                <a
                  href="https://linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/10 px-3.5 py-2 text-xs text-slate-400 transition hover:border-[#00c2ff]/40 hover:bg-[#00c2ff]/10 hover:text-white sm:px-4 sm:text-sm"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:rounded-3xl sm:p-7 lg:p-8">

            <h3 className="text-xl font-semibold sm:text-2xl">
              Send a message
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Have an opportunity or project in mind? Send me a message.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-4 sm:mt-8 sm:space-y-5"
            >

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Name
                </label>

                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#0b0f1a] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-[#6c5ce7]/60"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#0b0f1a] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-[#6c5ce7]/60"
                />
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What would you like to discuss?"
                  className="w-full rounded-xl border border-white/10 bg-[#0b0f1a] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-[#6c5ce7]/60"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your opportunity or project..."
                  required
                  className="w-full resize-none rounded-xl border border-white/10 bg-[#0b0f1a] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-[#6c5ce7]/60"
                />
              </div>

              {/* Success message */}
              {success && (
                <div className="rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm leading-6 text-green-400">
                  {success}
                </div>
              )}

              {/* Error message */}
              {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-400">
                  {error}
                </div>
              )}

              {/* Button */}
              <button
                type="submit"
                disabled={sending}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#6c5ce7] px-5 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#7a6af0] hover:shadow-lg hover:shadow-[#6c5ce7]/20 disabled:cursor-not-allowed disabled:opacity-60 sm:px-6 sm:text-base"
              >
                {sending ? "Sending..." : "Send Message"}

                {!sending && (
                  <ArrowUpRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                )}
              </button>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
}