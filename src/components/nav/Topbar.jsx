import React from "react";

function Topbar({ logo, currentPage, user }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 20px",
        backgroundColor: "#fff",
        borderBottom: "1px solid #ccc"
      }}
    >
      {/* Left: Logo + Page Name */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img src={logo} alt="Logo" style={{ width: "40px", height: "40px" }} />
        <h2 style={{ margin: 0 }}>{currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}</h2>
      </div>

      {/* Center: Search Bar */}
      <div style={{ flex: 1, margin: "0 20px" }}>
        <input
          type="text"
          placeholder="Search..."
          style={{
            width: "100%",
            padding: "8px 12px",
            border: "1px solid #ccc",
            borderRadius: "4px"
          }}
        />
      </div>

      {/* Right: User Name + Notification Bell */}
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <span>{user.username || "Guest"}</span>
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            position: "relative",
            padding: 0
          }}
          title="Notifications"
        >
          {/* Simple Eye Icon as Notification Bell */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            width="24"
            height="24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405M19 13v-2a7 7 0 10-14 0v2m7 4v2"
            />
          </svg>
          {/* Notification badge */}
          <span
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "8px",
              height: "8px",
              backgroundColor: "red",
              borderRadius: "50%"
            }}
          ></span>
        </button>
      </div>
    </div>
  );
}

export default Topbar;
