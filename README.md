# CINEREX Backend

A NestJS backend service for the CINEREX cinema ticketing platform.
This service provides authentication, movie listings, cinema rooms, functions, ticket handling, and static media delivery.

## 🚀 Features

- JWT authentication and role-based access control
- Users, movies, rooms, functions, and tickets APIs
- Request validation with NestJS `ValidationPipe`
- Static file serving from `fotosmovies/`
- PostgreSQL connection using `DATABASE_URL`
- CORS support via `FRONTEND_URL`
- Local development with Docker Compose

## 🧱 Tech stack

- Node.js 18
- NestJS 11
- TypeScript
- TypeORM
- PostgreSQL 14
- Jest + Supertest
- Docker Compose

## 📂 Project structure

- `src/` — application source code
- `src/auth/` — authentication, JWT strategy, guards, decorators
- `src/movies/`, `src/room/`, `src/functions/`, `src/tickets/`, `src/users/` — domain modules
- `fotosmovies/` — static assets served by the app
- `dockerfile` — service container build instructions
- `docker-compose.yml` — local development stack
- `.env` — environment variables

## ⚡ Quick start

```bash
cd backend
npm install
cp .env.example .env # or create .env manually
npm run start:dev
```

Open the API at `http://localhost:4000`.

## 🐳 Run with Docker Compose

```bash
docker compose up -d
```

This starts:
- `db_cinerex` — PostgreSQL database
- `backend` — NestJS application

The backend listens on `http://localhost:4000` and the DB is exposed on host port `5433`.

## 🔧 Environment variables

Create a `.env` file with values like this:

```env
DB_USER=postgres
DB_PASSWORD=anaya
DATABASE=cinerex-db
DATABASE_URL=postgres://postgres:anaya@db_cinerex:5432/cinerex-db
JWT_SECRET=jwt-secret
FRONTEND_URL=
```

### Notes

- `DATABASE_URL` is required by TypeORM to connect to the database.
- `FRONTEND_URL` enables CORS for the frontend.

## 📦 npm scripts

- `npm install` — install dependencies
- `npm run start` — start the API
- `npm run start:dev` — start in watch mode
- `npm run start:prod` — run compiled production code
- `npm run build` — compile TypeScript
- `npm run lint` — lint source files
- `npm run format` — format code with Prettier
- `npm run test` — run unit tests
- `npm run test:e2e` — run end-to-end tests
- `npm run test:cov` — generate coverage report

## 🌐 Runtime behavior

- Serves static assets from the `fotosmovies/` folder at `/fotosmovies/`
- Listens on port `4000`
- Uses `wait-for-it.sh` in Docker to wait for the database before starting
- Logs `DATABASE_URL` on startup for debugging

## ✅ Contributing

- Keep feature logic inside the appropriate module folder
- Use DTOs and `ValidationPipe` for request validation
- Add tests for new routes and behaviors
- Keep `.env` secrets out of source control

## 📚 Helpful links

- [NestJS Documentation](https://docs.nestjs.com)
- [TypeORM Documentation](https://typeorm.io)
- [PostgreSQL Docker image](https://hub.docker.com/_/postgres)

---

_This README is custom-built for the CINEREX backend service._
