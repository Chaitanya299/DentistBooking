# 🦷 Dentist Appointment Booking Platform

A premium, full-stack **MERN (MongoDB, Express.js, React.js, Node.js)** application designed for seamless dentist discovery and appointment scheduling. This platform features a high-performance frontend, a secure RESTful API, and a robust Admin Panel for management.

---

## 🚀 Live Demo & Deployment
- **Frontend:** [Deployed Vercel URL]
- **Backend:** [Deployed Render URL]
- **Deployment Guide:** See [DEPLOYMENT.md](DEPLOYMENT.md) for step-by-step hosting instructions.

---

## ✨ Key Features

### 👨‍⚕️ User Experience (Patient Side)
- **Responsive Dentist Listing:** A polished, mobile-first grid of **16 unique dentists** with professional profiles.
- **Advanced Discovery:**
    - **Global Search:** Find dentists by Name or Clinic Name.
    - **Smart Filters:** Filter by Location (City) and Minimum Experience.
    - **Smooth Pagination:** Effortlessly browse through listings with functional navigation.
- **Interactive Booking Flow:**
    - Real-time modal booking form (Patient Name, Age, Gender, Appointment Date).
    - **Validation:** Prevents past-date scheduling and ensures data integrity.
    - **Confirmation:** Instant success feedback upon booking.

### 🔐 Admin Dashboard (Management Side)
- **Secure Authentication:** JWT-protected login system.
- **Password Visibility:** Integrated eye-icon toggle for easier credential management.
- **Centralized Management:** A comprehensive table view of all patient appointments.
- **Dynamic Status Updates:** Update appointment states (Booked, Completed, Cancelled) in real-time.

---

## 🛠 Tech Stack

- **Frontend:** React.js, Tailwind CSS, Axios, Lucide React (Icons), Vite
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT, Dotenv, BcryptJS
- **Database:** MongoDB Atlas (Cloud)

---

## 📂 Project Structure

```text
├── backend/          # Express API, Mongoose Models, Auth Middleware
├── frontend/         # React (Vite) App, Tailwind Styles, UI Components
├── server.js         # Root entry point for Render deployment
├── DEPLOYMENT.md     # Specific hosting steps for Vercel/Render
└── README.md         # Comprehensive project documentation
```

---

## 🔑 Admin Access (Default)
Access the **Admin Panel** via the navigation bar:
- **Username:** `admin`
- **Password:** `password123`
- *(Verified with JWT security and persistent login via LocalStorage)*

---

## 🛠 Local Setup & Installation

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18.x or later)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account

### 2. Backend Configuration
1. Navigate to backend: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5001
   JWT_SECRET=dentalcare_secret_2024
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=password123
   ```
4. Seed the database: `node seed.js`
5. Start server: `npm start` (Runs on `http://localhost:5001`)

### 3. Frontend Configuration
1. Navigate to frontend: `cd frontend`
2. Install dependencies: `npm install`
3. Start development server: `npm run dev` (Runs on `http://localhost:5173`)

---

## 📄 License
This project is open-source and available under the **MIT License**.
