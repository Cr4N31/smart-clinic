import { useResidentSelection } from "../../contexts/ResidentSelectionContext";

function ResidentActionButton({ resident, onSelectResident }) {
  const ctx = useResidentSelection();

  function handleClick() {
    const fn = typeof onSelectResident === "function" ? onSelectResident : ctx?.setSelectedResident;
    if (typeof fn === "function") {
      fn(resident);
    } else {
      console.warn("No selection handler available", { onSelectResident, context: ctx });
    }
  }

  return (
    <button
      className="text-blue-600 hover:text-blue-800"
      title="View Details"
      onClick={handleClick}
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
        <circle cx="12" cy="12" r="3" />
      </svg>
    </button>
  );
}

export default ResidentActionButton;
