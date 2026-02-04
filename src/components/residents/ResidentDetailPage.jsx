import { useState, useRef } from "react";
import { useNotifications } from "../ui/NotificationContext.jsx";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import html2canvas from "html2canvas";

function ResidentDetailPage({ resident, updateResident, goBack }) {
  const { addNotification } = useNotifications();
  const [formData, setFormData] = useState({ ...resident });
  const [history, setHistory] = useState(resident.history || []);
  const [selectedIndices, setSelectedIndices] = useState(new Set());
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);

  // Filter history by date range
  const filteredHistory = history.filter(h => {
    const hDate = new Date(h.date);
    if (startDate && hDate < new Date(startDate)) return false;
    if (endDate && hDate > new Date(endDate)) return false;
    return true;
  });

  // Calculate summary statistics
  function calculateStats() {
    if (filteredHistory.length === 0) {
      return { avgBP: 0, maxHR: 0, totalPrice: 0, minBP: 0, avgHR: 0 };
    }

    let totalBP = 0, totalHR = 0, totalPrice = 0, maxHR = 0, minBP = Infinity;
    let bpCount = 0, hrCount = 0;

    filteredHistory.forEach(h => {
      const bp = h.bloodPressure && h.bloodPressure !== "-" ? parseInt(h.bloodPressure.split("/")[0]) : 0;
      const hr = h.heartRate && h.heartRate !== "-" ? parseInt(h.heartRate) : 0;
      const price = h.price && h.price !== "-" ? parseFloat(String(h.price).replace(/[^\d.]/g, "")) : 0;

      if (bp > 0) { totalBP += bp; bpCount++; minBP = Math.min(minBP, bp); }
      if (hr > 0) { totalHR += hr; hrCount++; maxHR = Math.max(maxHR, hr); }
      totalPrice += price;
    });

    return {
      avgBP: bpCount > 0 ? (totalBP / bpCount).toFixed(1) : 0,
      maxHR: maxHR > 0 ? maxHR : 0,
      totalPrice: totalPrice.toFixed(2),
      minBP: minBP !== Infinity ? minBP : 0,
      avgHR: hrCount > 0 ? (totalHR / hrCount).toFixed(1) : 0,
    };
  }

  const stats = calculateStats();

  // Download chart as image
  async function downloadChart(ref, name) {
    if (!ref.current) return;
    try {
      const canvas = await html2canvas(ref.current, { backgroundColor: "#ffffff" });
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `${name}_${new Date().getTime()}.png`;
      link.click();
      addNotification(`Downloaded ${name}`);
    } catch (err) {
      console.error("Chart download failed", err);
      addNotification("Failed to download chart");
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function toggleRowSelection(idx) {
    setSelectedIndices(prev => {
      const updated = new Set(prev);
      if (updated.has(idx)) {
        updated.delete(idx);
      } else {
        updated.add(idx);
      }
      return updated;
    });
  }

  function selectAllRows() {
    if (selectedIndices.size === history.length) {
      setSelectedIndices(new Set());
    } else {
      setSelectedIndices(new Set(history.map((_, i) => i)));
    }
  }

  const selectedRecords = history.filter((_, idx) => selectedIndices.has(idx));

  function exportSelectedToCSV() {
    if (selectedRecords.length === 0) {
      addNotification("Please select records to export");
      return;
    }

    const rows = selectedRecords.map(h => {
      const bp = h.bloodPressure && h.bloodPressure !== "-" ? parseFloat(h.bloodPressure.split("/")[0]) : 0;
      const hr = h.heartRate && h.heartRate !== "-" ? parseInt(h.heartRate) : 0;
      const pr = h.price && h.price !== "-" ? h.price : "0";
      return `${h.date},${bp},${hr},${pr}`;
    });

    const csv = `Date,Blood Pressure (systolic),Heart Rate,Price Paid\n${rows.join("\n")}`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `resident_${resident.residentNumber}_${new Date().getTime()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    addNotification(`Exported ${selectedRecords.length} record(s) to CSV`);
  }

  function emailSelectedRecords() {
    if (selectedRecords.length === 0) {
      addNotification("Please select records to email");
      return;
    }

    const emailBody = selectedRecords
      .map(h => `Date: ${h.date}, BP: ${h.bloodPressure}, HR: ${h.heartRate}, Price: ${h.price}`)
      .join("\n\n");

    window.location.href = `mailto:${resident.emailAddress}?subject=Resident Report - ${resident.firstName} ${resident.lastName}&body=${encodeURIComponent(emailBody)}`;

    addNotification(`Emailing ${selectedRecords.length} record(s)`);
  }

  function handleSave() {
    const snapshot = {
      date: new Date().toLocaleString(),
      bloodPressure: formData.bloodPressure || "-",
      heartRate: formData.heartRate || "-",
      price: formData.price || "-",
    };

    const updatedHistory = [snapshot, ...history];

    const updatedResident = {
      ...formData,
      history: updatedHistory,
    };

    updateResident(updatedResident);
    setHistory(updatedHistory);
    addNotification("Resident data saved");
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

         <div>
          <label className="block font-semibold">Price Paid</label>
          <input
            name="price"
            value={formData.price || ""}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
            placeholder="e.g. ₦5000"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={handleSave}
          className="md:px-4 md:py-2 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
        <button
          onClick={exportSelectedToCSV}
          disabled={selectedIndices.size === 0}
          className="md:px-4 md:py-2 px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
        >
          Export Selected to CSV ({selectedIndices.size})
        </button>
        <button
          onClick={emailSelectedRecords}
          disabled={selectedIndices.size === 0}
          className="md:px-4 md:py-2 px-2 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:bg-gray-400"
        >
          Email Selected ({selectedIndices.size})
        </button>
      </div>

      {/* Date Range Filter */}
      {history.length > 0 && (
        <div className="mb-6 p-4 bg-purple-50 rounded border border-purple-200">
          <h4 className="font-semibold text-purple-700 mb-3">Filter by Date Range</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
            </div>
            <button
              onClick={() => { setStartDate(""); setEndDate(""); }}
              className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
            >
              Clear Filter
            </button>
          </div>
        </div>
      )}

      {/* Summary Statistics */}
      {history.length > 0 && (
        <div className="mb-6 grid grid-cols-1 md:grid-cols-5 gap-3">
          <div className="bg-blue-50 p-4 rounded border border-blue-200">
            <div className="text-sm text-gray-600">Avg Blood Pressure</div>
            <div className="text-2xl font-bold text-blue-600">{stats.avgBP}</div>
            <div className="text-xs text-gray-500">mmHg (systolic)</div>
          </div>
          <div className="bg-red-50 p-4 rounded border border-red-200">
            <div className="text-sm text-gray-600">Min BP</div>
            <div className="text-2xl font-bold text-red-600">{stats.minBP}</div>
            <div className="text-xs text-gray-500">mmHg</div>
          </div>
          <div className="bg-pink-50 p-4 rounded border border-pink-200">
            <div className="text-sm text-gray-600">Avg Heart Rate</div>
            <div className="text-2xl font-bold text-pink-600">{stats.avgHR}</div>
            <div className="text-xs text-gray-500">bpm</div>
          </div>
          <div className="bg-orange-50 p-4 rounded border border-orange-200">
            <div className="text-sm text-gray-600">Max Heart Rate</div>
            <div className="text-2xl font-bold text-orange-600">{stats.maxHR}</div>
            <div className="text-xs text-gray-500">bpm</div>
          </div>
          <div className="bg-green-50 p-4 rounded border border-green-200">
            <div className="text-sm text-gray-600">Total Price Paid</div>
            <div className="text-2xl font-bold text-green-600">₦{stats.totalPrice}</div>
            <div className="text-xs text-gray-500">{filteredHistory.length} visits</div>
          </div>
        </div>
      )}

      {/* Analytics Section */}
      {history.length > 0 && (
        <div className="mt-8 mb-8 bg-gray-50 p-6 rounded-lg">
          <h3 className="font-bold text-purple-700 mb-4">Analytics Charts</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Blood Pressure & Heart Rate Line Chart */}
            <div ref={lineChartRef} className="bg-white p-4 rounded border">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-gray-700">Blood Pressure & Heart Rate Trend</h4>
                <button
                  onClick={() => downloadChart(lineChartRef, "bp_hr_chart")}
                  className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                   Download
                </button>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={filteredHistory.map((h) => ({
                  date: new Date(h.date).toLocaleDateString(),
                  bp: h.bloodPressure && h.bloodPressure !== "-" ? parseInt(h.bloodPressure.split("/")[0]) : 0,
                  hr: h.heartRate && h.heartRate !== "-" ? parseInt(h.heartRate) : 0,
                }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="bp" stroke="#8b5cf6" name="BP (Systolic)" />
                  <Line type="monotone" dataKey="hr" stroke="#ec4899" name="Heart Rate" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Price Paid Bar Chart */}
            <div ref={barChartRef} className="bg-white p-4 rounded border">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-gray-700">Price Paid Over Time</h4>
                <button
                  onClick={() => downloadChart(barChartRef, "price_chart")}
                  className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                   Download
                </button>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={filteredHistory.map((h) => ({
                  date: new Date(h.date).toLocaleDateString(),
                  price: h.price && h.price !== "-" ? parseFloat(String(h.price).replace(/[^\d.]/g, "")) : 0,
                }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="price" fill="#8b61ff" name="Price (₦)" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Price Distribution Pie Chart */}
            <div ref={pieChartRef} className="bg-white p-4 rounded border">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-gray-700">Price Distribution</h4>
                <button
                  onClick={() => downloadChart(pieChartRef, "price_distribution")}
                  className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                   Download
                </button>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={filteredHistory.map((h) => ({
                      name: new Date(h.date).toLocaleDateString(),
                      value: h.price && h.price !== "-" ? parseFloat(String(h.price).replace(/[^\d.]/g, "")) : 0,
                    }))}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {filteredHistory.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={["#6f00ff", "#4c068d", "rgb(255, 255, 255)", "#b798da", "#8b5cf6", "#bfb0ff"][index % 6]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* History Section */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-purple-700">History</h3>
          {history.length > 0 && (
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedIndices.size === history.length && history.length > 0}
                onChange={selectAllRows}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-600">Select All</span>
            </label>
          )}
        </div>

        {history.length === 0 ? (
          <p className="text-gray-500">No history yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-purple-100">
                <tr>
                  <th className="px-2 py-1 border-b text-center w-10">
                    <input
                      type="checkbox"
                      checked={selectedIndices.size === history.length && history.length > 0}
                      onChange={selectAllRows}
                      className="w-4 h-4"
                    />
                  </th>
                  <th className="px-2 py-1 border-b">Date</th>
                  <th className="px-2 py-1 border-b">Blood Pressure</th>
                  <th className="px-2 py-1 border-b">Heart Rate</th>
                  <th className="px-2 py-1 border-b">Price Paid</th>
                </tr>
              </thead>
              <tbody>
                {history.map((h, idx) => (
                  <tr key={idx} className={`${idx % 2 === 0 ? "bg-white" : "bg-purple-50"} ${selectedIndices.has(idx) ? "bg-blue-100" : ""}`}>
                    <td className="px-2 py-1 border-b text-center">
                      <input
                        type="checkbox"
                        checked={selectedIndices.has(idx)}
                        onChange={() => toggleRowSelection(idx)}
                        className="w-4 h-4"
                      />
                    </td>
                    <td className="px-2 py-1 border-b">{h.date}</td>
                    <td className="px-2 py-1 border-b">{h.bloodPressure}</td>
                    <td className="px-2 py-1 border-b">{h.heartRate}</td>
                    <td className="px-2 py-1 border-b">{h.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResidentDetailPage;
