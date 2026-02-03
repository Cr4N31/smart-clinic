
import { FiLogOut } from "react-icons/fi";

function Sidebar({ currentPage, setCurrentPage, setUser, isOpen, toggleSidebar }) {
  const sideBarItems = [
    { id: 'register', label: 'Register Residents' },
    { id: 'view', label: 'View Residents' }
  ];

  function handleLogout() {
    localStorage.removeItem("user");
    setUser(null);
    toggleSidebar && toggleSidebar();
  }

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <nav
        className={`
          fixed top-0 left-0 h-full w-64 bg-white shadow-md z-30
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:relative md:block
          flex flex-col justify-between p-4
        `}
      >
        <ul className="space-y-4">
          {sideBarItems.map(item => (
            <li key={item.id}>
              <button
                className={`w-full text-left px-4 py-2 rounded-md font-medium ${
                  currentPage === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-blue-100'
                }`}
                onClick={() => {
                  setCurrentPage(item.id);
                  toggleSidebar && toggleSidebar();
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 rounded-md text-red-600 font-semibold hover:bg-red-100 flex items-center gap-2"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </nav>
    </>
  );
}
export default Sidebar;