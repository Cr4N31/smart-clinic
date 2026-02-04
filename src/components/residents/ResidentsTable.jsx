import ResidentRow from "./ResidentRow";

const headers = [
  "S/N",
  "First Name",
  "Other Names",
  "Last Name",
  "Resident Number",
  "Genotype / Blood Group",
  "Phone Number",
  "Registered By",
  "Action",
];

function ResidentsTable({ residents, onSelectResident }) {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-purple-100">
          <tr>
            {headers.map(h => (
              <th
                key={h}
                className="text-left px-4 py-2 font-semibold border-b"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {residents.map((res, idx) => (
            <ResidentRow
              key={res.residentNumber}
              resident={res}
              index={idx}
              onSelectResident={onSelectResident}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResidentsTable;
