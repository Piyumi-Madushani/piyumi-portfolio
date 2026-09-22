import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://piyumi-portfolio-one.vercel.app"),

  title: {
    default: "Piyumi Madushani | Software Engineer",
    template: "%s | Piyumi Madushani",
  },

  description:
    "Portfolio of Piyumi Madushani, an ICT undergraduate and software engineer with practical experience in full-stack development, AI-powered applications, mobile development, backend systems, and project management.",

  keywords: [
    "Piyumi Madushani",
    "Software Engineer",
    "Full Stack Developer",
    "AI Engineer",
    "AI Developer",
    "Project Management",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Python",
    "FastAPI",
    "MongoDB",
    "PostgreSQL",
    "Sri Lanka",
  ],

  authors: [
    {
      name: "Piyumi Madushani",
    },
  ],

  creator: "Piyumi Madushani",

  applicationName: "Piyumi Madushani Portfolio",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Piyumi Madushani | Software Engineer",
    description:
      "Portfolio of Piyumi Madushani — Software Engineer, AI & Full-Stack Developer with Project Management experience.",
    type: "website",
    locale: "en_US",
    siteName: "Piyumi Madushani Portfolio",

    images: [
      {
        url: "/og-image.jpeg",
        width: 1200,
        height: 630,
        alt: "Piyumi Madushani — Software Engineer Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Piyumi Madushani | Software Engineer",
    description:
      "Software Engineer, AI & Full-Stack Developer with Project Management experience.",
    images: ["/og-image.jpeg"],
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