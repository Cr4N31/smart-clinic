#  Smart Clinic Web App

Smart Clinic is a modern web-based clinic management system built with **React + Vite**.  
It helps clinics manage residents (patients), track activities, export data, and receive real-time notifications — all in a clean, responsive dashboard.

---

## Features

-  Authentication (Login)
-  Resident registration & management
-  View residents and detailed medical records
-  CSV export of resident data
-  Email CSV reports
-  Global notification system
-  Sidebar + Topbar navigation
-  Fast build with Vite
-  Tailwind-based UI

---

## Project Structure

```
smart-clinic/
│
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   │   └── smartclinic.png
│   │
│   ├── components/
│   │   ├── auth/
│   │   │   └── LoginForm.jsx
│   │   │
│   │   ├── nav/
│   │   │   ├── LoadingScreen.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Topbar.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── RegisterResidents.jsx
│   │   │   └── ViewResidents.jsx
│   │   │
│   │   ├── residents/
│   │   │   ├── ResidentActionButton.jsx
│   │   │   ├── ResidentActionModal.jsx
│   │   │   ├── ResidentDetailPage.jsx
│   │   │   ├── ResidentRow.jsx
│   │   │   └── ResidentsTable.jsx
│   │   │
│   │   └── ui/
│   │       ├── NotificationContext.jsx
│   │       ├── NotificationsPanel.jsx
│   │       └── Toast.jsx
│   │
│   ├── contexts/
│   ├── services/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

## Architecture Highlights

### Notification System
- Global `NotificationContext`
- Any action (add resident, export CSV, send email, etc.) can trigger notifications
- Displayed in the **Topbar bell icon** and Notifications panel

### Residents Module
- Centralized state in `ResidentsTable`
- Row-level actions via `ResidentActionButton`
- Modals handled by `ResidentActionModal`

### CSV Export & Email
- Client-side CSV generation
- `mailto:` integration for quick email sending
- Future-ready for backend email services

---

## Tech Stack

- **React**
- **Vite**
- **Tailwind CSS**
- **React Icons**
- **Context API**
- **ESLint**

---

## Installation

```bash
git clone https://github.com/your-username/smart-clinic.git
cd smart-clinic
npm install
npm run dev
```

---

##  Future Improvements

- Backend email service (no mailto limits)
- Role-based access control
- Persistent notifications
- PDF export
- Analytics dashboard

---

## Author

**Bitrus Yacham Duniya**  
Frontend / Full‑Stack Developer  
📧 cran3.js.dev@gmail.com

---

> Smart Clinic — making healthcare data simple, fast, and accessible.
