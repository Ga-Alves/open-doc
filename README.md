# open-doc

<p align="center">
	<img src="./web-client/public/duck.svg" alt="open-doc logo" width="120" />
</p>

<p align="center">
	Document things in a smart way.
</p>

<p align="center">
	<a href="https://github.com/Ga-Alves/open-doc/actions/workflows/test-web-server.yaml">
		<img src="https://github.com/Ga-Alves/open-doc/actions/workflows/test-web-server.yaml/badge.svg" alt="PR checks status" />
	</a>
</p>

open-doc is an open source writing platform for publishing articles, collaborating in real time, and exploring content from other authors. It combines a React frontend, a Spring Boot API, PostgreSQL persistence, and a lightweight WebRTC signaling service for live collaborative editing.

## Highlights

- Real-time collaborative editing powered by Yjs and WebRTC share links.
- Rich article authoring with draft/edit flows and public article publishing.
- Authentication and role-aware navigation for users and admins.
- Social feed features to discover authors and follow accounts.
- OpenAPI-based frontend client generation for typed API integration.

## What you can do

- Create and edit articles from a private dashboard.
- Publish articles for public reading.
- Start a live collaborative session and share the generated room link.
- Sign in, manage accounts, and access admin-only flows.
- Browse community articles and follow authors to build a personalized feed.

## Project structure

```text
.
├── web-client/         # React + TypeScript + Vite frontend
├── web-server/         # Spring Boot API, auth, persistence, Swagger
├── webrtc-signaling/   # Yjs/WebRTC signaling server
└── infra/              # Docker Compose and TLS/certbot setup
```

## Tech stack

- Frontend: React 19, TypeScript, Vite, TanStack Query, ProseMirror, Yjs
- Backend: Spring Boot 4, Spring Security, JPA, Flyway, PostgreSQL
- Infra: Docker Compose, Nginx, Certbot

## Local development

### 1. Start the backend database

Create a `.env` file for the backend from the example file in `web-server/`, then start PostgreSQL:

```bash
docker container run -it \
	-e POSTGRES_PASSWORD="$DB_PASSWORD" \
	-e POSTGRES_DB="$DB_NAME" \
	-e POSTGRES_USER="$DB_USER_NAME" \
	-p "$DB_PORT":5432 \
	--name postgres \
	-d postgres:latest
```

### 2. Run the API

```bash
cd web-server
./mvnw spring-boot:run
```

Swagger UI is available at `http://localhost:8080/swagger-ui/index.html`.

### 3. Run the frontend

```bash
cd web-client
npm install
npm run dev
```

### 4. Run the signaling server

```bash
cd webrtc-signaling
npm install
npm start
```

## Tests

Backend tests:

```bash
cd web-server
./mvnw test
```

Frontend CI is wired into the PR workflow and currently runs install, build, and the configured `npm test` script from `web-client/`.

## Production deployment

The `infra/` folder contains the Docker Compose setup for running the full stack with TLS.

```bash
cd infra
cp .env.production.example .env.production
source .env.production
docker compose up -d
```

After the stack is up, you can seed the first admin user directly in PostgreSQL as described in `infra/README.md`.

## Roadmap ideas

- Expand frontend automated test coverage beyond the current CI wiring.
- Add richer collaborative presence indicators.
- Improve onboarding and sample content for first-time contributors.

## Contributing

Issues and pull requests are welcome. If you want to contribute, start by opening an issue, or pick a small improvement in the client, API, or infrastructure folders and submit a PR.