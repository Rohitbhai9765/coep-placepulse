import { NavLink } from "react-router-dom";
import { X } from "lucide-react";

import { sidebarItems } from "@/constants/sidebar";
import { studentSidebarItems } from "@/constants/studentSidebar";

import { useAuth } from "@/context/AuthContext";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { user } = useAuth();

  const items =
    user?.role === "student"
      ? studentSidebarItems
      : sidebarItems;

  return (
    <>
      <button
        type="button"
        aria-label="Close navigation"
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-black/60 transition-opacity lg:hidden ${
          isOpen
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        id="main-navigation"
        aria-label="Main navigation"
        className={`fixed inset-y-0 left-0 z-[60] h-screen w-72 max-w-[85vw] overflow-y-auto border-r border-zinc-800 bg-[#111113] px-6 py-6 transition-transform duration-300 lg:translate-x-0 lg:py-8 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >

        <div className="mb-10 flex items-start justify-between gap-4">

          <div>
            <h1 className="text-2xl font-bold">
              COEP PlacePulse
            </h1>

            <p className="mt-2 text-sm text-zinc-500">
              {user?.role === "student"
                ? "Student Portal"
                : "Placement Analytics"}
            </p>
          </div>

          <button
            type="button"
            aria-label="Close navigation"
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>

        </div>

        <nav className="space-y-2 pb-6">

        {items.map((item) => {

          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-xl px-4 py-3 transition-all ${
                  isActive
                    ? "bg-violet-600 text-white"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                }`
              }
            >
              <Icon size={20} />

              <span>{item.title}</span>

            </NavLink>
          );

        })}

        </nav>

      </aside>
    </>
  );
};

export default Sidebar;
