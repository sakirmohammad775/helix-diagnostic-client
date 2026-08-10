# Helix Diagnostic Center — Server

Backend RESTful API engine for the Helix Diagnostic Center client application. Built with Node.js, Express, and MongoDB to manage user accounts, medical test bookings, patient metadata, and platform services.

---

## 🚀 Key Features

* **Express Server Architecture**: Clean ES Module setup using `import/export` patterns.
* **MongoDB Atlas Integration**: Native MongoDB driver connection with connection pooling and secure error-handling routines.
* **Environment Security**: Encrypted database credentials and environment isolation using `dotenv`.
* **CORS Middleware**: Cross-origin requests configured for multi-domain communication with frontend clients.
* **Health Checks & Monitoring**: REST endpoints to verify database state and server connection health.

---

## 🛠️ Tech Stack

* **Runtime**: Node.js
* **Framework**: Express.js
* **Database**: MongoDB Atlas (Official Native Driver `mongodb`)
* **Utility & Middleware**: `cors`, `dotenv`, `nodemon`

---

## 📋 Prerequisites

Before running the backend locally, ensure you have:

1. [Node.js](https://nodejs.org/) (v18 or higher recommended)
2. A running [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster with write access
3. An active database user and network access whitelist set to your IP (or `0.0.0.0/0` for development)

---

## ⚙️ Installation & Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/sakirmohammad775/helix-diagnostic-server.git
cd helix-diagnostic-server

```

### 2. Install Dependencies

```bash
npm install

```

### 3. Environment Variable Configuration

Create a `.env` file in the root directory:

```env
PORT=5000
DB_USER=your_mongodb_username
DB_PASSWORD=your_mongodb_password

```

---

## 🚦 Running the Application

### Development Mode (with hot-reloading via `nodemon`):

```bash
npm run dev

```

### Production Mode:

```bash
npm start

```

When successfully launched, your terminal output will display:

```bash
Server currently listening on port: 5000
Successfully established secure handshake connection with MongoDB Database!

```

---

## 📡 API Endpoints Summary

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/` | Root verification endpoint for backend status |
| `GET` | `/health` | Server health check endpoint |

---

## 📂 Project Directory Structure

```text
helix-diagnostic-server/
├── index.js          # Application entry point & database initialization
├── package.json      # Dependency manifest & script declarations
├── .env              # Environment configurations (Git ignored)
└── .gitignore        # Version control exclusions

```

---

## 🛡️ License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).
