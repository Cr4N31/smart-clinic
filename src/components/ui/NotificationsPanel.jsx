import { useNotifications } from "./NotificationContext.jsx";

export default function NotificationsPanel({ onClose }) {
  const { notifications, removeNotification, markAsRead } = useNotifications();

  return (
    <div className="w-80 bg-white rounded-lg shadow-lg border border-gray-200 p-3">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-700">Notifications</h4>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-800">✕</button>
      </div>

      {notifications.length === 0 ? (
        <p className="text-sm text-gray-500">No notifications yet.</p>
      ) : (
        <ul className="space-y-2 max-h-60 overflow-y-auto">
          {notifications.map(n => (
            <li key={n.id} className={`p-2 rounded ${n.read ? 'bg-gray-50' : 'bg-purple-50'}`}>
              <div className="text-sm text-gray-700">{n.message}</div>
              <div className="text-xs text-gray-400 mt-1">{n.timestamp}</div>
              <div className="mt-2 flex items-center justify-end gap-2">
                {!n.read && (
                  <button onClick={() => markAsRead(n.id)} className="text-xs text-blue-600 hover:underline">Mark read</button>
                )}
                <button onClick={() => removeNotification(n.id)} className="text-xs text-red-600 hover:underline">Dismiss</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
