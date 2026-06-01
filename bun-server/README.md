# /* @echo name */

## Get Started

```bash
bun install
cp .env.example .env
bun run db:migrate
bun run dev
```

The API runs on `http://localhost:3000`.
OpenAPI documentation is available at `http://localhost:3000/openapi`.

## Database

This template uses Postgres with dbmate migrations and Kysely query types.

```bash
bun run db:new create_posts
bun run db:migrate
bun run db:status
```
