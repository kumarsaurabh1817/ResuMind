# AI Resume Project

An AI-powered resume builder project containing a frontend and a backend application.

## Project Structure
- `frontend`: Contains the Vite + React frontend application.
- `backend`: Contains the Node.js backend server.

## Setup Instructions

### Prerequisites
- Node.js installed

### 1. Environment Setup
You need to set up environment variables for both the frontend and backend. Example files are provided.

**Backend:**
1. Navigate to the backend directory: `cd backend`
2. Copy the example environment file: `cp .env.example .env` (or manually copy and rename it)
3. Fill in the required values in `backend/.env` (MongoDB URI, Google Client ID/Secret, Razorpay details, etc.)

**Frontend:**
1. Navigate to the frontend directory: `cd frontend`
2. Copy the example environment file: `cp .env.example .env` (or manually copy and rename it)
3. Fill in the required values in `frontend/.env`

### 2. Installation & Running
Run the following commands in both the `frontend` and `backend` directories:

```bash
npm install
npm run dev
```

The frontend will run on its respective port (usually `http://localhost:5173`) and the backend will run on `http://localhost:5000`.
