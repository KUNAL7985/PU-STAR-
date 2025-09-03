# FacultyGalaxy (MERN)

A full-stack MERN app for a university faculty directory with colorful UI, autocomplete search, JWT login (no open registration), role-based profile editing, and photo upload stored in MongoDB.

## Features
- Colorful header & footer with social icons
- Beautiful faculty cards with circular photos
- 10–12 featured faculty cards shown by default (before search)
- Smart search with database-backed autocomplete suggestions
- Clickable suggestions that open the profile
- Login using provided credentials only (no self sign-up)
- Faculty can edit **their own** profile after login
- Upload/replace profile picture (stored in MongoDB as binary)
- Optimized, responsive, Tailwind-based UI
- Seed script for >10 faculty + preset users

## Quick Start

### 1) Backend
```bash
cd server
cp .env.example .env
# edit .env if needed (Mongo URI, CLIENT_URL)
npm install
npm run seed
npm run dev
```

### 2) Frontend
```bash
cd ../client
npm install
npm run dev
```

- Backend runs on `http://localhost:5000`
- Frontend runs on `http://localhost:5173`

### Login Credentials
- Faculty: `alice` / `Passw0rd!` (linked to Dr. Alice Verma)
- Faculty: `bharat` / `Passw0rd!` (linked to Prof. Bharat Singh)
- Viewer: `viewer01` / `Passw0rd!`
- Admin: `admin` / `Admin@123`

> Only admin or the linked faculty user can edit a profile.

## Notes
- Photos are stored in MongoDB (Faculty.photo as Buffer).
- Suggest endpoint: `/api/faculty/suggest?q=Ali` returns names starting with query.
- Search endpoint: `/api/faculty?q=ml` searches name, subjects, research areas.
