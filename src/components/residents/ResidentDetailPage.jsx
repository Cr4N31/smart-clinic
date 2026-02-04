import { useState } from "react";

function ResidentDetailPage({ resident, updateResident, goBack }) {
  const [formData, setFormData] = useState({ ...resident });
  const [history, setHistory] = useState(resident.history || []);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleSave() {
    const snapshot = {
      date: new Date().toLocaleString(),
      bloodPressure: formData.bloodPressure || "-",
      heartRate: formData.heartRate || "-",
    };

    const updatedHistory = [snapshot, ...history];

    const updatedResident = {
      ...formData,
      history: updatedHistory,
    };

    updateResident(updatedResident);
    setHistory(updatedHistory);
    alert("Resident updated successfully!");
  }

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <button
        onClick={goBack}
        className="mb-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← Back
      </button>

      <h2 className="text-xl font-bold text-purple-700 mb-4">
        {resident.firstName} {resident.lastName}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block font-semibold">Blood Pressure</label>
          <input
            name="bloodPressure"
            value={formData.bloodPressure || ""}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
            placeholder="e.g., 120/80"
          />
        </div>

        <div>
          <label className="block font-semibold">Heart Rate</label>
          <input
            name="heartRate"
            value={formData.heartRate || ""}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
            placeholder="e.g., 72 bpm"
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Save Changes
      </button>

      {/* History Section */}
      <div className="mt-6">
        <h3 className="font-bold text-purple-700 mb-2">History</h3>
        {history.length === 0 ? (
          <p className="text-gray-500">No history yet.</p>
        ) : (
          <table className="min-w-full border border-gray-300">
            <thead className="bg-purple-100">
              <tr>
                <th className="px-2 py-1 border-b">Date</th>
                <th className="px-2 py-1 border-b">Blood Pressure</th>
                <th className="px-2 py-1 border-b">Heart Rate</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-purple-50"}>
                  <td className="px-2 py-1 border-b">{h.date}</td>
                  <td className="px-2 py-1 border-b">{h.bloodPressure}</td>
                  <td className="px-2 py-1 border-b">{h.heartRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ResidentDetailPage;
