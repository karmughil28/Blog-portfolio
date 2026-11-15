# Blog Portfolio

A full-stack blog portfolio starter built with React + Vite, Express, MongoDB Atlas, and Firebase Authentication.

## Features
- Public home and blog listing/detail pages
- Firebase email/password signup, login, and logout
- Backend Firebase ID-token verification
- Admin-only create, edit, and delete blog operations
- MongoDB persistence with Mongoose
- Responsive editorial-style UI
- Environment variables for all secrets

## Requirements
- Node.js 18+
- MongoDB Atlas database
- Firebase project with Email/Password Authentication enabled

## 1. Install dependencies

Open two terminals:

```bash
cd frontend
npm install
```

```bash
cd backend
npm install
```

## 2. Configure Firebase

1. Create a Firebase project.
2. Enable Authentication -> Sign-in method -> Email/Password.
3. Register a Web App and copy its Firebase config values into `frontend/.env`.
4. In Firebase Console -> Project settings -> Service accounts, generate a private key.
5. Keep the downloaded service-account JSON private. Copy its values into `backend/.env`.
6. Create the first admin user through the signup page. Copy that user's Firebase UID into `ADMIN_UIDS` in `backend/.env`.

Do not put Firebase Admin credentials or MongoDB URI in the frontend.

## 3. Configure environment files

Copy `.env.example` to `.env` in both `frontend/` and `backend/`.

Frontend:
```bash
cd frontend
cp .env.example .env
```

Backend:
```bash
cd backend
cp .env.example .env
```

Fill in the values.

`VITE_API_URL` should point to the backend, for local development:
`http://localhost:5000/api`

Backend `ADMIN_UIDS` accepts comma-separated Firebase UIDs. Only these UIDs can use admin APIs.

## 4. Run locally

Terminal 1:
```bash
cd backend
npm run dev
```

Terminal 2:
```bash
cd frontend
npm run dev
```

Open the Vite URL printed in the terminal (usually http://localhost:5173).

## API routes

- `GET /api/health`
- `GET /api/blogs`
- `GET /api/blogs/:id`
- `POST /api/blogs` (Firebase token + admin)
- `PUT /api/blogs/:id` (Firebase token + admin)
- `DELETE /api/blogs/:id` (Firebase token + admin)

## Security notes
- The frontend route guard improves UX but is not the security boundary.
- Every admin API request is independently authenticated by Firebase Admin and checked against `ADMIN_UIDS`.
- Never commit `.env` files, service-account JSON files, or database credentials.
- For production, use HTTPS, strong secrets, restricted MongoDB network access, and a managed secret store.
