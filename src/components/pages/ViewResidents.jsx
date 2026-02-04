import { useState } from "react";
import ResidentsTable from "../residents/ResidentsTable";
import { ResidentSelectionProvider } from "../../contexts/ResidentSelectionContext";
import ResidentDetailPage from "../residents/ResidentDetailPage";

function ViewResidents({ residents, setResidents, user }) {
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

  //CSV export function
    function exportResidentsToCSV(residents) {
    if (!residents || residents.length === 0) return;

    const headers = [
        "Resident Number",
        "First Name",
        "Last Name",
        "Blood Pressure",
        "Heart Rate"
    ];

    const rows = residents.map(r => [
        r.residentNumber,
        r.firstName,
        r.lastName,
        r.bloodPressure || "",
        r.heartRate || ""
    ]);

    const csvContent = [
        headers.join(","),
        ...rows.map(row => row.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "residents.csv";
    link.click();

    URL.revokeObjectURL(url);
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
              user={user}
            />
          </ResidentSelectionProvider>

          <div className="mt-6 gap-3 flex justify-end">
            <button
              onClick={clearAll}
              className="px-4 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition"
            >
              Clear All Residents
            </button>
            <button
                onClick={() => exportResidentsToCSV(residents)}
                className="px-4 py-2 bg-indigo-400 transition-all ease duration-250 text-white rounded hover:bg-indigo-700"
                >
                Export CSV
            </button>
          </div>
        </>
      ) : (
        <ResidentDetailPage
          resident={selectedResident}
          residents={residents}
          updateResident={updateResident}
          residentCSV={exportResidentsToCSV}
          goBack={() => setSelectedResident(null)}
        />
      )}
      
    </div>
  );
}

export default ViewResidents;
