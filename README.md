# Endo Diet

Endo Diet is an application that helps people living with endometriosis decide whether certain meals support an anti-inflammatory diet. Users can upload food photos, and the system stores the image, sends it to OpenAI for multimodal analysis, and saves the generated guidance for later review.

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, React Router, React Hook Form, Axios
- **Backend:** Node.js, Express, TypeScript, MySQL, Cloudinary, OpenAI API

## Features

- Account registration and login with password hashing and expiring auth tokens
- Upload food photos and receive AI-generated recommendations tuned for endometriosis-friendly eating
- Automatic storage of uploaded assets in Cloudinary
- View, revisit, and delete previous analyses
- Health check endpoint for service monitoring

## Project Structure

```
api - Express + TypeScript backend
frontend - React + Vite client
```

## Environment Variables

### Backend (`api/.env`)

```
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=endo_user
DB_PASSWORD=supersecure
DB_NAME=endo_diet

OPEN_AI_API_KEY=sk-...

CLOUDINARY_NAME=your-cloud-name
CLOUDINARY_KEY=123456789
CLOUDINARY_PASSWORD=your-cloudinary-secret
```

### Frontend (`frontend/.env`)

```
VITE_API_URL=http://localhost:3000
```

## Database Setup

Create the database and tables before starting the API. Adjust types/indexes as needed for your environment. Run §api/migrations/create.sql§

## Installation & Local Development

### Backend

```bash
cd api
npm install
npm run dev
```

The development server runs on the port specified in `PORT` and recompiles on changes via `ts-node-dev`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Vite serves the client (default: `http://localhost:5173`) and proxies API calls directly to the backend URL set in `VITE_API_URL`.

## Usage Flow

1. Register a new user, or log in with existing credentials.
2. Upload a meal photo; the app converts it to base64, sends it to the backend, and then to OpenAI for analysis.
3. View the AI feedback, which is stored along with the Cloudinary image URL.
4. Browse historical analyses from the dashboard and drill down for full details.
