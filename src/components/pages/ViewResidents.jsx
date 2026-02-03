
function ViewResidents({ residents, setResidents }) {
  if (!residents || residents.length === 0) {
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>No residents registered yet.</p>;
  }

  return (
    <div style={{ maxWidth: "1000px", margin: "2rem auto" }}>
      <h2 style={{ textAlign: "center" }}>Registered Residents</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "1rem",
          textAlign: "left"
        }}
      >
        <thead>
          <tr>
            {[
              "S/N",
              "First Name",
              "Other Names",
              "Last Name",
              "Resident Number",
              "Email",
              "Phone Number",
              "Registered By",
              "Action"
            ].map(header => (
              <th
                key={header}
                style={{ border: "1px solid #ccc", padding: "0.5rem", background: "#f5f5f5" }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {residents.map((res, idx) => (
            <tr key={res.residentNumber}>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{idx + 1}</td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{res.firstName}</td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{res.otherName}</td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{res.lastName}</td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{res.residentNumber}</td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{res.email || "-"}</td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{res.phone || "-"}</td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{res.registeredBy || "-"}</td>
              <td
                style={{
                  border: "1px solid #ccc",
                  padding: "0.5rem",
                  textAlign: "center"
                }}
              >
                <button
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer"
                  }}
                  title="View / Edit"
                  onClick={() => alert(`Edit ${res.firstName} ${res.lastName}`)}
                >
                  {/* Eye SVG */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    width={20}
                    height={20}
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
      <div>
        <button onClick={() => {
            localStorage.removeItem("residents");
            setResidents([]);
            }}>
            Clear All Residents
        </button>

      </div>
    </div>
  );
}

export default ViewResidents;
