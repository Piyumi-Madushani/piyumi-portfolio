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

const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header
      // (Postman, curl, server-to-server requests, etc.)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
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