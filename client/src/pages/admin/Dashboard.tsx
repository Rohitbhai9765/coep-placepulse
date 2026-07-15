import {
  Building2,
  Users,
  CalendarDays,
  Plus,
  Megaphone,
  BarChart3,
  ChartNoAxesCombined,
} from "lucide-react";

import QuickAction from "@/components/admin/QuickAction";

const Dashboard = () => {
  return (
    <div className="space-y-10">

      <div>

        <h1 className="text-5xl font-bold">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-zinc-500">
          Welcome back, Placement Officer
        </p>

      </div>



      <div>

        <h2 className="mb-5 text-2xl font-semibold">
          Quick Actions
        </h2>

        <div className="grid gap-5 md:grid-cols-3">

          <QuickAction
            title="Add Company"
            icon={Plus}
            to="/admin/add-company"
          />

          <QuickAction
            title="Manage Companies"
            icon={Building2}
            to="/admin/companies"
          />

          <QuickAction
            title="Announcements"
            icon={Megaphone}
            to="/admin/announcement-management"
          />

          <QuickAction
            title="Placement Calendar"
            icon={CalendarDays}
            to="/admin/calendar"
          />


          <QuickAction
            title="Students"
            icon={Users}
            to="/admin/students"
          />

          <QuickAction
            title="Statistics"
            icon={BarChart3}
            to="/admin/statistics"
          />

          <QuickAction
  title="Analytics"
  icon={ChartNoAxesCombined}
  to="/admin/analytics"
/>


          <QuickAction
            title="Import Students"
            icon={Users}
            to="/admin/import-students"
          />

        </div>

      </div>

    </div>
  );
};

export default Dashboard;