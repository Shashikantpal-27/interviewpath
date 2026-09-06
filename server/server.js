import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dns from "dns";
import path from "path";

import "./config/dns.js";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";
import studyPlannerRoutes from "./routes/studyPlannerRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import problemRoutes from "./routes/problemRoutes.js";
import submissionRoutes from "./routes/submissionRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

import adminRoutes from "./routes/admin.routes.js";
import adminLogRoutes from "./routes/adminLog.routes.js";
import adminProfileRoutes from "./routes/adminProfile.routes.js";
import companyAdminRoutes from "./routes/company.routes.js";
import interviewExperienceAdminRoutes from "./routes/interviewExperience.routes.js";
import reportAdminRoutes from "./routes/report.routes.js";
import roadmapAdminRoutes from "./routes/roadmap.routes.js";
import roleAdminRoutes from "./routes/role.routes.js";
import settingsAdminRoutes from "./routes/settings.routes.js";

import analyticsRoutes from "./routes/analyticsRoutes.js";
import userAdminRoutes from "./routes/user.routes.js";
import interviewCommunityRoutes from "./routes/interviewCommunity.routes.js";

dotenv.config();

dns.setServers([
  "8.8.8.8",
  "1.1.1.1",
]);

await connectDB();

const app = express();

// ================= MIDDLEWARE =================

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header
      // such as Postman or server-to-server requests.
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// ================= STATIC UPLOADS =================

app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

// ================= USER ROUTES =================

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/resume", resumeRoutes);

app.use("/api/v1/interview", interviewRoutes);

app.use(
  "/api/v1/study-planner",
  studyPlannerRoutes
);

app.use(
  "/api/v1/dashboard",
  dashboardRoutes
);

app.use(
  "/api/v1/companies",
  companyRoutes
);

app.use(
  "/api/v1/problems",
  problemRoutes
);

app.use(
  "/api/v1/submissions",
  submissionRoutes
);

app.use(
  "/api/v1/profile",
  profileRoutes
);

// ================= ADMIN ROUTES =================

app.use(
  "/api/v1/admin",
  adminRoutes
);

app.use(
  "/api/v1/admin/logs",
  adminLogRoutes
);

app.use(
  "/api/v1/admin/profile",
  adminProfileRoutes
);

app.use(
  "/api/v1/admin/users",
  userAdminRoutes
);

app.use(
  "/api/v1/admin/companies",
  companyAdminRoutes
);

app.use(
  "/api/v1/admin/interviews",
  interviewExperienceAdminRoutes
);

app.use(
  "/api/v1/interview-experiences",
  interviewCommunityRoutes
);

app.use(
  "/api/v1/admin/reports",
  reportAdminRoutes
);

app.use(
  "/api/v1/admin/roadmaps",
  roadmapAdminRoutes
);

app.use(
  "/api/v1/admin/roles",
  roleAdminRoutes
);

app.use(
  "/api/v1/admin/settings",
  settingsAdminRoutes
);

app.use(
  "/api/v1/admin/analytics",
  analyticsRoutes
);

// ================= HEALTH =================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "InterviewPath AI Backend Running",
  });
});

// ================= SERVER =================

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});