# 🚗 RideWave — A Real-Time Ride Matching Platform

**RideWave** is a monolithic backend system that simulates a real-time ride-hailing platform, enabling fast and efficient driver-passenger matching using geospatial data and live socket communication.

> Built with: **Node.js**, **Express**, **MongoDB**, **Redis**, **Socket.IO**

---

## 🌐 System Overview

- Real-time socket connections between drivers and passengers
- Location-aware matching via geospatial indexing
- Redis-backed proximity search and event handling

---

## ⚙️ Tech Stack

| Purpose                   | Technology       |
| ------------------------- | ---------------- |
| Backend Framework         | Node.js, Express |
| Database                  | MongoDB          |
| Real-time Communication   | Socket.IO        |
| Caching & Location Lookup | Redis (with GEO) |

---

## 🧠 Key Features

### 🧩 Redis for Performance Optimization

- **Driver ↔ Socket ID Mapping:**  
  Redis stores driver `socketId`s for instant ride dispatching.
- **Redis GEO:**  
  Enables fast proximity-based queries using `GEORADIUS`.

### 📍 Geohashing & Proximity Matching

- Implements geospatial logic to find and match the nearest drivers to a given passenger location.

### 🔌 Real-Time WebSocket Communication

- Uses **Socket.IO** to:
  - Emit and receive ride lifecycle events
  - Support live updates for booking, confirmation, and cancellation

### 🗃️ MongoDB for Persistent Storage

- Used to manage:
  - User profiles
  - Booking history
  - Ride metadata

---

## 📁 Project Structure

```bash

ridewave/
├── src/
│ ├── controllers/ # Booking and business logic controllers
│ ├── middlewares/ # Middleware for validation or auth (future)
│ ├── models/ # MongoDB schemas
│ ├── public/ # Static files
│ ├── repository/ # Data access layer (Mongo/Redis)
│ ├── routes/ # All route definitions
│ ├── services/ # Location and booking services
│ ├── utils/ # Redis client, DB connectors, helpers
│ └── index.js # App entry point, server + socket setup
├── .env
├── package.json
└── README.md

```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v16+
- Redis installed and running
- MongoDB running locally or via cloud (MongoDB Atlas)

### Installation

```bash
git clone https://github.com/yourusername/ridewave.git
cd ridewave
npm install
```

### Start the App

```bash
npm start
```

---

## 📡 WebSocket Events Overview

| Event Name      | Description                                |
| --------------- | ------------------------------------------ |
| `newBooking`    | Triggered when a passenger requests a ride |
| `rideConfirmed` | Sent when a driver confirms a ride         |
| `removeBooking` | Triggered on timeout or cancellation       |

---

## 📝 Environment Variables (`.env`)

```bash
PORT=8000
MONGO_URI=mongodb://localhost:27017/ridewave
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret
BASIC_FARE=50
RATE_PER_KM=1.2
```

---

## 👨‍💻 Author

**Krrish Kumar**
Backend Engineer | B.Tech CSE @ AKGEC
[GitHub](https://github.com/KrrishKumar125)
[LinkedIn](https://www.linkedin.com/in/krrishkumar125/)
[mailto:krrishkumar2028@gmail.com](mailto:krrishkumar2028@gmail.com)

---

## 📌 Future Improvements

- Add driver/rider rating system
- Deploy using Docker and container orchestration
- Integrate a queue for fault-tolerant event handling
- Switch to microservices architecture

---

## 📝 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file.

---

## 📬 Contact

For any queries or contributions, feel free to reach out via GitHub or email.

---
