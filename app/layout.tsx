import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Piyumi Madushani | Software Engineer",
  description:
    "Portfolio of Piyumi Madushani, an ICT undergraduate and software engineer specializing in full-stack, backend, mobile, and AI-powered applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}