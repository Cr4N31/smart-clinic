import { useState } from "react";
import ResidentsTable from "../residents/ResidentsTable";
import { ResidentSelectionProvider } from "../../contexts/ResidentSelectionContext";
import ResidentDetailPage from "../residents/ResidentDetailPage";

function ViewResidents({ residents, setResidents }) {
  const [selectedResident, setSelectedResident] = useState(null);

  // Update resident and persist changes
  function updateResident(updatedResident) {
    const updatedResidents = residents.map(res =>
      res.residentNumber === updatedResident.residentNumber
        ? updatedResident
        : res
    );
    setResidents(updatedResidents);
    localStorage.setItem("view", JSON.stringify(updatedResidents));
  }

  // Clear all residents
  function clearAll() {
    localStorage.removeItem("view");
    setResidents([]);
    setSelectedResident(null);
  }

  if (!residents || residents.length === 0) {
    return (
      <p className="text-center mt-8 text-gray-500 text-lg">
        No residents registered yet.
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4" data-aos="fade-up">
      {!selectedResident ? (
        <>
          <h2 className="text-2xl font-bold text-purple-700 text-center mb-6">
            Registered Residents
          </h2>

          <ResidentSelectionProvider value={{ setSelectedResident }}>
            <ResidentsTable
              residents={residents}
              onSelectResident={setSelectedResident}
            />
          </ResidentSelectionProvider>

          <div className="mt-6 flex justify-end">
            <button
              onClick={clearAll}
              className="px-4 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition"
            >
              Clear All Residents
            </button>
          </div>
        </>
      ) : (
        <ResidentDetailPage
          resident={selectedResident}
          updateResident={updateResident}
          goBack={() => setSelectedResident(null)}
        />
      )}
    </div>
  );
}

export default ViewResidents;
