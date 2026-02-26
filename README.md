# URL Shortener

URL shortening service with Redis caching and rate limiting.

## Tech Stack

**Frontend:** React, TypeScript, Tailwind CSS, Vite

**Backend:** Hono, Bun, Drizzle ORM, Neon PostgreSQL, Redis

## Features

- Shorten long URLs into shareable links
- Redis caching for fast redirects
- Rate limiting (30 requests/minute)

## Project Structure
```
url-shortner/
├── frontend/    # React frontend
└── backend/     # Hono API server
```
## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed
- [Node.js](https://nodejs.org/) installed
- [Neon](https://neon.tech/) PostgreSQL database
- [Redis](https://redis.io/) instance (Upstash, Railway, etc.)

### Backend Setup
```
cd backend
bun install
cp .env.example .env
# Update .env with your credentials
bun run db:push
bun run dev
```

### Frontend Setup
```
cd frontend
npm install
npm run dev
```

### Environment Variables
DATABASE_URL=your_neon_connection_string <br>
REDIS_URL=your_redis_connection_string <br>
PORT=3000
