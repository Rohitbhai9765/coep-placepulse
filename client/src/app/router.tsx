import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

import Login from "@/pages/Login";

import Dashboard from "@/pages/Dashboard";
import Companies from "@/pages/Companies";
import CompanyDetails from "@/pages/CompanyDetails";

import AdminDashboard from "@/pages/admin/Dashboard";

import AdminCompanies from "@/pages/AdminCompanies";
import AddCompany from "@/pages/AddCompany";
import EditCompany from "@/pages/EditCompany";

import Announcements from "@/pages/Announcements";
import AdminAnnouncements from "@/pages/AdminAnnouncements";
import AdminAnnouncementManagement from "@/pages/AdminAnnouncementManagement";
import EditAnnouncement from "@/pages/EditAnnouncement";

import Calendar from "@/pages/Calendar";
import BranchAnalysis from "@/pages/BranchAnalysis";
import AdminCalendar from "@/pages/AdminCalendar";
import EditEvent from "@/pages/EditEvent";

import AdminStudents from "@/pages/AdminStudents";
import EditStudent from "@/pages/EditStudent";

import Statistics from "@/pages/Statistics";

import StudentDashboard from "@/pages/student/Dashboard";
import StudentProfile from "@/pages/student/Profile";
import ImportStudents from "@/pages/ImportStudents";
import DashboardContent from "@/pages/admin/DashboardContent";
import AnalyticsManagement from "@/pages/admin/AnalyticsManagement";



export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/",
    element: <AppLayout />,

    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },

      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },

      // =======================
      // SHARED (Admin + Student)
      // =======================

      {
        path: "companies",

        element: (
          <ProtectedRoute>
            <Companies />
          </ProtectedRoute>
        ),
      },

      {
        path: "companies/:id",

        element: (
          <ProtectedRoute>
            <CompanyDetails />
          </ProtectedRoute>
        ),
      },

      {
        path: "calendar",

        element: (
          <ProtectedRoute>
            <Calendar />
          </ProtectedRoute>
        ),
      },

      {
        path: "announcements",

        element: (
          <ProtectedRoute>
            <Announcements />
          </ProtectedRoute>
        ),
      },

      {
        path: "statistics",

        element: (
          <ProtectedRoute>
            <Statistics />
          </ProtectedRoute>
        ),
      },

      {
        path: "branch-analysis",

        element: (
          <ProtectedRoute>
            <BranchAnalysis />
          </ProtectedRoute>
        ),
      },

      // =======================
      // STUDENT
      // =======================

      {
        path: "student",

        element: (
          <ProtectedRoute role="student">
            <StudentDashboard />
          </ProtectedRoute>
        ),
      },

      {
        path: "student/profile",

        element: (
          <ProtectedRoute role="student">
            <StudentProfile />
          </ProtectedRoute>
        ),
      },

      // =======================
      // ADMIN
      // =======================

      {
        path: "admin",

        element: (
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },

      {
        path: "admin/companies",

        element: (
          <ProtectedRoute role="admin">
            <AdminCompanies />
          </ProtectedRoute>
        ),
      },

      {
        path: "admin/add-company",

        element: (
          <ProtectedRoute role="admin">
            <AddCompany />
          </ProtectedRoute>
        ),
      },

      {
        path: "admin/companies/edit/:id",

        element: (
          <ProtectedRoute role="admin">
            <EditCompany />
          </ProtectedRoute>
        ),
      },

      {
        path: "admin/announcements",

        element: (
          <ProtectedRoute role="admin">
            <AdminAnnouncements />
          </ProtectedRoute>
        ),
      },

      {
        path: "admin/announcement-management",

        element: (
          <ProtectedRoute role="admin">
            <AdminAnnouncementManagement />
          </ProtectedRoute>
        ),
      },

      {
        path: "admin/announcements/edit/:id",

        element: (
          <ProtectedRoute role="admin">
            <EditAnnouncement />
          </ProtectedRoute>
        ),
      },

      {
        path: "admin/calendar",

        element: (
          <ProtectedRoute role="admin">
            <AdminCalendar />
          </ProtectedRoute>
        ),
      },

      {
        path: "admin/calendar/edit/:id",

        element: (
          <ProtectedRoute role="admin">
            <EditEvent />
          </ProtectedRoute>
        ),
      },

      {
        path: "admin/students",

        element: (
          <ProtectedRoute role="admin">
            <AdminStudents />
          </ProtectedRoute>
        ),
      },

      {
        path: "admin/students/edit/:id",

        element: (
          <ProtectedRoute role="admin">
            <EditStudent />
          </ProtectedRoute>
        ),
      },

      {
        path: "admin/statistics",

        element: (
          <ProtectedRoute role="admin">
            <Statistics />
          </ProtectedRoute>
        ),
      },

      {
        path: "admin/import-students",

        element: (
          <ProtectedRoute role="admin">
            <ImportStudents />
          </ProtectedRoute>
        ),
      },

      {
        path: "admin/dashboard-content",

        element: (
          <ProtectedRoute role="admin">
            <DashboardContent />
          </ProtectedRoute>
        ),
      },

      {
        path: "admin/analytics",

        element: (
          <ProtectedRoute role="admin">
            <AnalyticsManagement />
          </ProtectedRoute>
        ),
      },






    ],
  },
]);