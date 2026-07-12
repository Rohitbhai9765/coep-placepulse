import { Bell, Moon, Search, LogOut, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/context/AuthContext";

interface NavbarProps {
  isSidebarOpen: boolean;
  onMenuClick: () => void;
}

const Navbar = ({ isSidebarOpen, onMenuClick }: NavbarProps) => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-3 border-b border-zinc-800 bg-[#09090B]/80 px-4 backdrop-blur-xl sm:h-20 sm:px-6 lg:px-8">

      {/* Search */}

      <div className="flex min-w-0 flex-1 items-center gap-3">
        <button
          type="button"
          aria-label="Open navigation"
          aria-controls="main-navigation"
          aria-expanded={isSidebarOpen}
          onClick={onMenuClick}
          className="rounded-xl border border-zinc-800 bg-zinc-900 p-2.5 text-zinc-200 transition hover:border-violet-500 lg:hidden"
        >
          <Menu size={20} />
        </button>

        <span className="hidden text-base font-semibold text-white sm:inline lg:hidden">
          PlacePulse
        </span>

        <div className="relative hidden w-full max-w-[420px] md:block">

          <Search
            size={18}
            className="absolute left-4 top-4 text-zinc-500"
          />

          <input
            placeholder="Search..."
            className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/80 py-3 pl-11 pr-4 text-white outline-none transition focus:border-violet-500"
          />

        </div>

      </div>

      {/* Right Section */}

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">

        <button
          type="button"
          aria-label="Toggle color mode"
          className="hidden rounded-xl border border-zinc-800 bg-zinc-900 p-3 hover:border-violet-500 sm:inline-flex"
        >

          <Moon size={18} />

        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="rounded-xl border border-zinc-800 bg-zinc-900 p-2.5 transition hover:border-violet-500 sm:p-3"
        >

          <Bell size={18} />

        </button>

        {/* User */}

        <div className="flex items-center rounded-xl border border-zinc-800 bg-zinc-900 p-1.5 sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-2">
          
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-purple-600 text-base font-semibold sm:h-11 sm:w-11 sm:text-lg">

            {user?.name?.charAt(0).toUpperCase()}

          </div>

          <div className="hidden xl:block">

            <p className="font-semibold">
              {user?.name}
            </p>

            <p className="text-xs capitalize text-zinc-500">
              {user?.role}
            </p>

          </div>

        </div>

        {/* Logout */}

        <button
          onClick={handleLogout}
          aria-label="Log out"
          className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2.5 text-red-400 transition hover:bg-red-500 hover:text-white sm:px-4 sm:py-3"
        >

          <LogOut size={18} />

          <span className="hidden xl:inline">Logout</span>

        </button>

      </div>

    </header>
  );
};

export default Navbar;
