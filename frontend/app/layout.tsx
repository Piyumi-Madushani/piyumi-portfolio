import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
   metadataBase: new URL("https://piyumi-portfolio-one.vercel.app"),
  title: "Piyumi Madushani | Software Engineer",
  description:
    "Portfolio of Piyumi Madushani, an ICT undergraduate and software engineer with experience in full-stack, mobile, AI-powered applications, and project management.",
  alternates: {
  canonical: "/",
  },
  keywords: [
    "Piyumi Madushani",
    "Software Engineer",
    "Full Stack Developer",
    "AI Engineer",
    "Project Management",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "FastAPI",
  ],
  authors: [{ name: "Piyumi Madushani" }],
  creator: "Piyumi Madushani",

  openGraph: {
  title: "Piyumi Madushani | Software Engineer",
  description:
    "Portfolio of Piyumi Madushani — Software Engineer, AI & Full-Stack Developer with Project Management experience.",
  type: "website",
  locale: "en_US",
  siteName: "Piyumi Madushani Portfolio",
  images: [
    {
      url: "/og-image.png",
      width: 1200,
      height: 630,
      alt: "Piyumi Madushani - Software Engineer",
    },
  ],
},

  twitter: {
    card: "summary_large_image",
    title: "Piyumi Madushani | Software Engineer",
    description:
      "Software Engineer, AI & Full-Stack Developer with Project Management experience.",
  },

  robots: {
    index: true,
    follow: true,
  },
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