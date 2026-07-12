import {
  Building2,
  Users,
  CalendarDays,
  IndianRupee,
  Plus,
  Megaphone,
  BarChart3,
  ChartNoAxesCombined,
} from "lucide-react";

import AdminStat from "@/components/admin/AdminStat";
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

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <AdminStat
          title="Companies"
          value="86"
          icon={Building2}
          color="bg-violet-600/20 text-violet-400"
        />

        <AdminStat
          title="Students"
          value="1420"
          icon={Users}
          color="bg-emerald-600/20 text-emerald-400"
        />

        <AdminStat
          title="Upcoming Drives"
          value="24"
          icon={CalendarDays}
          color="bg-blue-600/20 text-blue-400"
        />

        <AdminStat
          title="Average Package"
          value="₹18.2 LPA"
          icon={IndianRupee}
          color="bg-orange-600/20 text-orange-400"
        />

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