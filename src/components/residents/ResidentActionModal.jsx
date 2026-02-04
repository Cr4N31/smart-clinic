// src/components/residents/ResidentActionModal.jsx
import { useState } from "react";

function ResidentActionModal({ isOpen, onClose, resident, updateResident }) {
  // Local state for editing vitals; declare hooks before any early return
  const [vitals, setVitals] = useState(() =>
    resident?.vitals || {
      bloodPressure: "",
      heartRate: "",
      temperature: "",
      price: "",
    }
  );

  if (!isOpen || !resident) return null;

  function handleChange(e) {
    const { name, value } = e.target;
    setVitals(prev => ({ ...prev, [name]: value }));
  }

  function handleSave() {
    const updatedResident = { ...resident };

    // Initialize history if it doesn't exist
    if (!updatedResident.vitalsHistory) updatedResident.vitalsHistory = [];

    // Push current vitals to history before updating
    updatedResident.vitalsHistory.push({
      ...updatedResident.vitals,
      updatedAt: new Date().toISOString(),
    });

    // Update vitals
    updatedResident.vitals = { ...vitals };

    // Call parent updater
    updateResident(updatedResident);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10">
      <div className="bg-white rounded-lg w-11/12 max-w-lg p-6 relative shadow-lg">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 font-bold"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold text-purple-700 mb-4">
          {resident.firstName} {resident.lastName} - Action
        </h2>

        {/* Vitals Form */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Blood Pressure</label>
            <input
              type="text"
              name="bloodPressure"
              value={vitals.bloodPressure}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Heart Rate</label>
            <input
              type="text"
              name="heartRate"
              value={vitals.heartRate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Temperature</label>
            <input
              type="text"
              name="temperature"
              value={vitals.temperature}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
          </div>

          {/* Price Form */}
          <div className="space-y-3">
            <div>
                <label className="block text-sm font-semibold text-gray-700">Price paid</label>
                <input
                type="text"
                name="price"
                value={vitals.price}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
            </div>
          </div>
        </div>

        {/* History */}
        {resident.vitalsHistory && resident.vitalsHistory.length > 0 && (
          <div className="mt-5">
            <h3 className="font-semibold text-gray-700 mb-2">Vitals History</h3>
            <ul className="max-h-40 overflow-y-auto border border-gray-200 rounded p-2">
              {resident.vitalsHistory
                .slice()
                .reverse()
                .map((h, i) => (
                  <li key={i} className="text-sm border-b border-gray-100 py-1">
                    <span className="font-medium">{new Date(h.updatedAt).toLocaleString()}:</span>{" "}
                    BP: {h.bloodPressure || "-"}, HR: {h.heartRate || "-"}, Temp: {h.temperature || "-"}, Price: {h.price || "-"}
                  </li>
                ))}
            </ul>
          </div>
        )}

        <button
          onClick={handleSave}
          className="mt-5 w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 font-semibold"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default ResidentActionModal;
