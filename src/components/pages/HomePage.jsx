import { useState, useEffect } from "react";
import RegisterResidents from "./RegisterResidents";
import ViewResidents from "./ViewResidents";
import Sidebar from "../nav/Sidebar";
import Topbar from "../nav/Topbar";

function HomePage({ user, setUser }) {
  const [residents, setResidents] = useState(() => {
    const saved = localStorage.getItem("view");
    return saved ? JSON.parse(saved) : [];
  });

  const [currentPage, setCurrentPage] = useState(() => {
    const saved = localStorage.getItem("currentPage");
    return saved || "register";
  });

  // NEW: Sidebar open state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  function addResident(newResident) {
    setResidents(prev => {
      const updated = [...prev, newResident];
      localStorage.setItem("view", JSON.stringify(updated));
      return updated;
    });
  }

  // Toggle function for hamburger
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  return (
    <div className="flex flex-col h-screen">
      {/* Topbar */}
      <Topbar
        user={user}
        currentPage={currentPage}
        toggleSidebar={toggleSidebar}
        logo="/logo.png" // your logo path here
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setUser={setUser}
          isOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
        />

        {/* Main content */}
        <main className="flex-1 p-6 overflow-auto bg-gray-50">
          <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">
            Resident Management
          </h1>

          {currentPage === "register" && <RegisterResidents user={user} addResident={addResident} />}
          {currentPage === "view" && <ViewResidents user={user} residents={residents} setResidents={setResidents} />}
        </main>
      </div>
    </div>
  );
}

export default HomePage;
