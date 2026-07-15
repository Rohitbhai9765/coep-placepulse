import {
  LayoutDashboard,
  Building2,
  CalendarDays,
  Megaphone,
  BarChart3,
  User,
} from "lucide-react";

export const studentSidebarItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Branch Analysis",
    path: "/branch-analysis",
    icon: BarChart3,
  },
  {
    title: "Companies",
    path: "/companies",
    icon: Building2,
  },
  {
    title: "Placement Calendar",
    path: "/calendar",
    icon: CalendarDays,
  },
  {
    title: "Announcements",
    path: "/announcements",
    icon: Megaphone,
  },
  {
    title: "Statistics",
    path: "/statistics",
    icon: BarChart3,
  },

  {
    title: "My Profile",
    path: "/student/profile",
    icon: User,
  },
];