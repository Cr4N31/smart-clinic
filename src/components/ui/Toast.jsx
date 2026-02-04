import { useEffect } from "react";
import { FiX } from "react-icons/fi";

function Toast({ data, onClose, duration = 3000 }) {
  useEffect(() => {
    if (!data) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [data, duration, onClose]);

  if (!data) return null;

  return (
    <div className="fixed top-5 right-5 z-50 w-80 p-4 bg-purple-100 border-l-4 border-purple-600 text-purple-800 rounded-lg shadow-lg">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold mb-1">{data.title}</h3>
          <p className="text-sm">
            <strong>Resident No:</strong> {data.residentNumber}
          </p>
          <p className="text-sm">
            {data.firstName} {data.lastName}
          </p>
        </div>

        <button
          onClick={onClose}
          className="text-purple-700 hover:text-purple-900"
        >
          <FiX />
        </button>
      </div>
    </div>
  );
}

export default Toast;
