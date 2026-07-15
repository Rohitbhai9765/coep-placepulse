import {
  LayoutDashboard,
  Building2,
  BarChart3,
  Settings,
  Megaphone,
  CalendarDays,
} from "lucide-react";

export const sidebarItems = [
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
    title: "Statistics",
    path: "/statistics",
    icon: BarChart3,
  },

  // {
  //   title: "Leaderboard",
  //   path: "/leaderboard",
  //   icon: Trophy,
  // },

  {
    title: "Admin",
    path: "/admin",
    icon: Settings,
  },

  {
    title: "Announcements",
    path: "/announcements",
    icon: Megaphone,
  },

  {
    title: "Calendar",
    path: "/calendar",
    icon: CalendarDays,
  },



  {
  title: "Dashboard Content",
  path: "/admin/dashboard-content",
  icon: LayoutDashboard,
}

  
];