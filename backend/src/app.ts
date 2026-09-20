import express from "express";
import cors from "cors";

import experienceRoutes from "./routes/experience.routes.js";
import educationRoutes from "./routes/education.routes.js";
import skillRoutes from "./routes/skill.routes.js";
import certificationRoutes from "./routes/certification.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an origin
      if (!origin) {
        return callback(null, true);
      }

      // Allow production Vercel domain
      if (origin === "https://piyumi-portfolio.vercel.app") {
        return callback(null, true);
      }

      // Allow Vercel preview deployments
      if (
        /^https:\/\/piyumi-portfolio-[a-z0-9]+-piyumi-madushanis-projects\.vercel\.app$/.test(
          origin
        )
      ) {
        return callback(null, true);
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "Piyumi Portfolio API is running 🚀",
  });
});

app.use("/api/projects", projectRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/certifications", certificationRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/auth", authRoutes);

export default app;