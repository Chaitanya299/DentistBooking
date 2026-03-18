# 🦷 Dentist Appointment Booking Platform

A full-stack, responsive Dentist Appointment Booking Platform built with the **MERN (MongoDB, Express.js, React.js, Node.js)** stack. This application allows users to discover dentists, view clinical details, and book appointments seamlessly. It also features a secure Admin Panel for appointment management.

---

## 🚀 Key Features

### 💻 Frontend (React.js)
- **Dentist Discovery:** Browse a curated list of dentists with full clinical profiles.
- **Advanced Search & Filters:**
  - Search by Dentist or Clinic Name.
  - Filter by Location (City) and Minimum Experience.
- **Smart Pagination:** Smooth navigation through extensive listings.
- **Instant Booking:** Responsive modal booking form with real-time patient detail capture.
- **Admin Dashboard:**
  - **Secure Access:** JWT-protected login with password visibility toggle.
  - **Management Console:** Comprehensive table view of all appointments.
  - **Status Control:** Live updates for appointment statuses (Booked, Completed, Cancelled).
- **Responsive Design:** Mobile-first approach using **Tailwind CSS**.
- **Enhanced UX:** Smooth loading states, error handling, and profile image fallbacks.

### ⚙️ Backend (Node.js & Express.js)
- **RESTful API Architecture:** Scalable and well-structured API endpoints.
- **Robust Security:** Protected routes using JWT middleware for admin functions.
- **Database:** MongoDB for persistent and scalable data storage.

---

## 🛠 Tech Stack

- **Frontend:** React.js, Tailwind CSS, Axios, Lucide React (Icons), Vite
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT, Dotenv

---

## 📂 Project Structure

```text
├── backend/          # Node.js server, API routes, models, and db config
├── frontend/         # React application with Vite and Tailwind
├── DEPLOYMENT.md     # Step-by-step guide for hosting on Vercel/Render
└── README.md         # Project documentation
```

---

## 🛠 Setup & Installation

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v16.x or later)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account or local MongoDB instance

### 2. Backend Configuration
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
4. Update the `.env` with your MongoDB URI and desired secrets.
5. Seed the database with sample data:
   ```bash
   node seed.js
   ```
6. Start the server: `npm start` (Runs on `http://localhost:5001`)

### 3. Frontend Configuration
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
4. Start the development server: `npm run dev` (Runs on `http://localhost:5173`)

---

## 🔑 Admin Access (Default)
- **Username:** `admin`
- **Password:** `password123`
*(Note: These can be changed in your backend `.env` file)*

---

## 🌐 Deployment

For detailed instructions on how to deploy this application to **Render** (Backend) and **Vercel** (Frontend), please refer to the [DEPLOYMENT.md](DEPLOYMENT.md) guide.

---

## 📄 License

This project is open-source and available under the MIT License.
