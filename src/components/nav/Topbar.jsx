import { FiMenu, FiBell, FiUser } from "react-icons/fi";

function Topbar({ logo, currentPage, user, toggleSidebar }) {
  return (
    <div className="bg-indigo-600 border-b-2 border-purple-300 text-white">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        {/* Left: Hamburger + Logo + Page Name */}
        <div className="flex items-center gap-3">
          <button
            className="md:hidden focus:outline-none"
            onClick={toggleSidebar}
          >
            <FiMenu className="w-6 h-6" />
          </button>
          <img src={logo} alt="Logo" className="w-10 h-10 rounded" />
          <h2 className="text-lg font-semibold mr-2">
            {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}
          </h2>
        </div>

        {/* Right: Desktop Only */}
        <div className="hidden md:flex flex-1 items-center justify-end gap-5">
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 px-4 py-2 rounded-lg bg-purple-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <span className="flex items-center gap-1 font-medium">
            <FiUser /> {user.username || "Guest"}
          </span>
          <button className="relative">
            <FiBell className="w-6 h-6" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-indigo-600"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
