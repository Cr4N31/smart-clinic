function ViewResidents({ residents, setResidents }) {
  if (!residents || residents.length === 0) {
    return (
      <p className="text-center mt-8 text-gray-500 text-lg">
        No residents registered yet.
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4" data-aos="fade-up">
      <h2 className="text-2xl font-bold text-purple-700 text-center mb-6">
        Registered Residents
      </h2>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-purple-100">
            <tr>
              {[
                "S/N",
                "First Name",
                "Other Names",
                "Last Name",
                "Resident Number",
                "Genotype / Blood Group",
                "Phone Number",
                "Registered By",
                "Action"
              ].map((header) => (
                <th
                  key={header}
                  className="text-left px-4 py-2 text-gray-700 font-semibold border-b border-gray-300"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {residents.map((res, idx) => (
              <tr
                key={res.residentNumber}
                className={idx % 2 === 0 ? "bg-white" : "bg-purple-50"}
              >
                <td className="px-4 py-2 border-b border-gray-200">{idx + 1}</td>
                <td className="px-4 py-2 border-b border-gray-200">{res.firstName}</td>
                <td className="px-4 py-2 border-b border-gray-200">{res.otherName}</td>
                <td className="px-4 py-2 border-b border-gray-200">{res.lastName}</td>
                <td className="px-4 py-2 border-b border-gray-200">{res.residentNumber}</td>
                <td className="px-4 py-2 border-b border-gray-200">{res.genotype} / {res.bloodGroup || "-"}</td>
                <td className="px-4 py-2 border-b border-gray-200">{res.phone || "-"}</td>
                <td className="px-4 py-2 border-b border-gray-200">{res.registeredBy || "-"}</td>
                <td className="px-4 py-2 border-b border-gray-200 text-center">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    title="View / Edit"
                    onClick={() => alert(`Edit ${res.firstName} ${res.lastName}`)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5 inline-block"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7z"
                      />
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={() => {
            localStorage.removeItem("view");
            setResidents([]);
          }}
          className="px-4 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition"
        >
          Clear All Residents
        </button>
      </div>
    </div>
  );
}

export default ViewResidents;
