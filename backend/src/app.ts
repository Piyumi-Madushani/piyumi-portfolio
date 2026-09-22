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

const allowedOrigins = (process.env.CORS_ORIGINS ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },

    credentials: false,

    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "100kb" }));

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