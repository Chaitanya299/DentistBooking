# Simple Deployment Guide

Follow these exact steps to get your Dentist Booking Platform live.

## 1. Backend (Render.com)
Render is the simplest way to host your Node.js backend.

1.  **Create an account** at [render.com](https://render.com/).
2.  Click **"New +"** -> **"Web Service"**.
3.  Connect your GitHub repository.
4.  **Configuration:**
    *   **Name:** `dentist-booking-backend`
    *   **Root Directory:** `backend`
    *   **Runtime:** `Node`
    *   **Build Command:** `npm install`
    *   **Start Command:** `node server.js`
5.  **Environment Variables (Click "Advanced"):**
    *   `MONGO_URI`: (Your MongoDB Atlas URI)
    *   `JWT_SECRET`: `dentalcare_secret_2024`
    *   `ADMIN_USERNAME`: `admin`
    *   `ADMIN_PASSWORD`: `password123`
    *   `PORT`: `10000`
6.  Click **"Create Web Service"**.
7.  **COPY the URL** Render gives you (e.g., `https://dentist-booking-backend.onrender.com`).

---

## 2. Frontend (Vercel.com)
Vercel is the best way to host your React frontend.

1.  **Create an account** at [vercel.com](https://vercel.com/).
2.  Click **"Add New"** -> **"Project"**.
3.  Import your GitHub repository.
4.  **Edit Settings:**
    *   **Framework Preset:** `Vite`
    *   **Root Directory:** `frontend`
5.  **Environment Variables:**
    *   `VITE_API_URL`: (Paste your Render Backend URL here + `/api`)
        *   *Example:* `https://dentist-booking-backend.onrender.com/api`
6.  Click **"Deploy"**.

---

## ✅ Deployment Checklist
*   [ ] Backend status is "Live" on Render.
*   [ ] Frontend status is "Ready" on Vercel.
*   [ ] Ensure your MongoDB Atlas IP Whitelist allows `0.0.0.0/0` (Access from anywhere) so the Render server can connect.
