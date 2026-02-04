/* eslint-disable react-refresh/only-export-components */
// src/ui/NotificationContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem("notifications");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("notifications", JSON.stringify(notifications));
    } catch (err) {
      // If localStorage fails (e.g., quota), log for debugging
      // but don't crash the app
      console.error('Failed to persist notifications', err);
    }
  }, [notifications]);

  function addNotification(message) {
    const entry = {
      id: Date.now(),
      message,
      timestamp: new Date().toLocaleString(),
      read: false,
    };
    setNotifications(prev => [entry, ...prev]);
  }

  function markAllAsRead() {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }

  function removeNotification(id) {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }

  function markAsRead(id) {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  }

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, markAllAsRead, removeNotification, markAsRead }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationContext);
}
export default NotificationContext;