import { useState } from "react";
import { FiMenu, FiBell, FiUser } from "react-icons/fi";
import logo from "../../assets/smartclinic.png";
import { useNotifications } from "../ui/NotificationContext.jsx";
import NotificationsPanel from "../ui/NotificationsPanel";

function Topbar({ currentPage, user, toggleSidebar }) {
  const { notifications, markAllAsRead } = useNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;
  const [open, setOpen] = useState(false);

  function togglePanel() {
    const willOpen = !open;
    setOpen(willOpen);
    if (willOpen) markAllAsRead();
  }

  return (
    <div className="bg-white border-b-2 border-purple-100 text-purple-500">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        {/* Left: Hamburger + Logo + Page Name */}
        <div className="flex items-center gap-3">
          <button
            className="md:hidden focus:outline-none"
            onClick={toggleSidebar}
          >
            <FiMenu className="w-6 h-6" />
          </button>
          <img src={logo} alt="Logo" className="w-16 h-16 rounded" />
          <h2 className="text-lg font-semibold mr-4">
            {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}
          </h2>
        </div>

        {/* Right: Desktop Only */}
        <div className="hidden md:flex flex-1 items-center justify-end gap-5 relative">
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 px-4 py-2 rounded-lg bg-purple-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <span className="flex items-center gap-1 font-medium">
            <FiUser /> {user?.username || "Guest"}
          </span>

          <button className="relative" onClick={togglePanel} aria-label="Toggle notifications">
            <FiBell className="w-6 h-6" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-2 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-semibold leading-none text-white bg-red-600 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>

          {open && (
            <div className="absolute right-0 top-12 z-50">
              <NotificationsPanel onClose={() => setOpen(false)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Topbar;
