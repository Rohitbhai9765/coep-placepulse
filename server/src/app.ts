import express from "express";
import cors from "cors";
import companyRoutes from "./routes/company.routes";
import announcementRoutes from "./routes/announcement.routes";
import eventRoutes from "./routes/event.routes";
import studentRoutes from "./routes/student.routes";
import statisticsRoutes from "./routes/statistics.routes";
import authRoutes from "./routes/auth.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import analyticsRoutes from "./routes/analytics.routes";
import dashboardHomeRoutes
from "./routes/dashboardHome.routes";


const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.CLIENT_URL || "",
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Health Check
app.get("/", (_, res) => {
  res.send("🚀 COEP PlacePulse API is Running...");
});

app.get("/test123", (_, res) => {
  res.send("WORKING");
});

// Routes
app.use("/api/companies", companyRoutes);

app.use("/api/announcements", announcementRoutes);

app.use("/api/events", eventRoutes);

app.use("/api/students", studentRoutes);

app.use("/api/statistics", statisticsRoutes);

//app.use("/api/dashboard", dashboardRoutes);

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.use(
  "/api/analytics",
  analyticsRoutes
);

app.use(
  "/api/dashboard/home",
  dashboardHomeRoutes
);

export default app;