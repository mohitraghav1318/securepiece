# Securepiece

Securepiece is a full-stack authentication and account management project built with a React frontend and an Express/MongoDB backend. It supports modern signup and login flows (password and OTP), JWT-based authentication, and authenticated profile management.

## Project Overview

This repository is organized as a two-part application:

- `client/` -> React + Vite frontend
- `server/` -> Node.js + Express + MongoDB API

## Folder Structure

```text
r-level/
├── client/                     # Frontend application (React + Vite)
│   ├── src/
│   └── package.json
├── server/                     # Backend API (Express + MongoDB)
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── services/
│   ├── .env
│   └── package.json
└── README.md
```

## Local URLs

- Frontend (Vite): http://localhost:5173
- Backend API: http://localhost:3000
- API base path: http://localhost:3000/api

## Tech Stack

### Frontend (`client/`)

- React 19
- Vite
- React Router
- Axios
- Framer Motion
- Three.js + React Three Fiber + Drei

### Backend (`server/`)

- Node.js
- Express
- MongoDB + Mongoose
- JWT (`jsonwebtoken`)
- Password hashing (`bcryptjs`)
- Email delivery (`nodemailer`)

## Core Features

- Multi-step signup flow:
  - Start signup (`name + email`)
  - Verify email OTP
  - Complete signup with password
- Login options:
  - Password login
  - OTP login (request + verify)
- Protected dashboard APIs:
  - Fetch authenticated user profile
  - Update profile (name/email)
  - Delete account (password confirmation)
- Token-based route protection in frontend and backend

## API Endpoints

### Auth Routes (`/api/auth`)

- `POST /signup/start`
- `POST /signup/verify-otp`
- `POST /signup/complete`
- `POST /login/password`
- `POST /login/otp/request`
- `POST /login/otp/verify`
- `POST /register` (legacy alias)
- `POST /login` (legacy alias)

### Dashboard Routes (`/api/dashboard`) [Requires Bearer token]

- `GET /`
- `PATCH /profile`
- `DELETE /account`

## Getting Started

### 1. Clone and enter project

```bash
git clone <repository-url>
cd authentication
```

### 2. Install dependencies

```bash
cd client && npm install
cd ../server && npm install
```

### 3. Configure backend environment

Create/update `server/.env` with your own values:

```env
PORT=3000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-long-random-secret>
JWT_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=10
NODE_ENV=development

SMTP_HOST=<smtp-host>
SMTP_PORT=<smtp-port>
SMTP_SECURE=<true-or-false>
SMTP_USER=<smtp-username>
SMTP_PASS=<smtp-password>
SMTP_FROM=<from-email-address>
```

### 4. Run backend

```bash
cd server
npm run dev
```

### 5. Run frontend

```bash
cd client
npm run dev
```

## Available Scripts

### Frontend (`client/package.json`)

- `npm run dev` -> Start Vite dev server
- `npm run build` -> Build production assets
- `npm run preview` -> Preview production build
- `npm run lint` -> Run ESLint

### Backend (`server/package.json`)

- `npm run dev` -> Start API with nodemon
- `npm start` -> Start API with Node

## Security Notes

- Do not commit real secrets (MongoDB URI, JWT secret, SMTP credentials) to source control.
- Rotate credentials immediately if they were ever exposed.
- Use strong, unique values in production.

## Deployment Notes

- Frontend deployment config is present in `client/vercel.json`.
- Configure `VITE_API_BASE_URL` in frontend environments when backend URL differs from local.
- Ensure backend environment variables are configured in your hosting provider.

## Health Check

Backend root route:

- `GET /` -> returns `Hello, World!`

## License

No license file is currently defined. Add a `LICENSE` file if you plan to distribute this project publicly.
