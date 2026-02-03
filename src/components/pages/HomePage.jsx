import { useState, useEffect } from "react";
import RegisterResidents from "./RegisterResidents";
import ViewResidents from "./ViewResidents";
import Sidebar from "../nav/Sidebar";
import Topbar from "../nav/Topbar";

function HomePage({ user, setUser }) {
  // Shared state for all residents
  const [residents, setResidents] = useState(() => {
    const saved = localStorage.getItem("view");
    return saved ? JSON.parse(saved) : [];
  });

  // Persist currentPage across refresh
  const [currentPage, setCurrentPage] = useState(() => {
    const saved = localStorage.getItem("currentPage");
    return saved || "register"; // default to 'register'
  });

  // Update localStorage whenever currentPage changes
  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  // Function to add a new resident
  function addResident(newResident) {
    setResidents(prev => {
      const updated = [...prev, newResident];
      localStorage.setItem("view", JSON.stringify(updated)); // persist residents
      return updated;
    });
  }

  return (
    <div style={{ padding: "2rem" }}>
      <Topbar user={user} currentPage={currentPage} />
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setUser={setUser}
      />

      <h1>Resident Management</h1>

      {/* Render Register or View based on currentPage */}
      {currentPage === "register" && <RegisterResidents addResident={addResident} />}
      {currentPage === "view" && (
        <ViewResidents
          residents={residents}
          setResidents={setResidents}
        />
      )}
    </div>
  );
}

export default HomePage;
