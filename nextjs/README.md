### Install dependencies

```bash
bun install
```

### Start develop

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Notice
* dbmate 是 schema source of truth：所有表结构变化先写 SQL migration。
* Kysely types 是生成物：每次 dbmate up 后跑 db:types。
* Next Server Components 直接调 server/services，不要在服务端 fetch 自己的 /api。
* Route Handlers 只放公共 API、health check、webhook。
* 本地 Postgres 可以用 Docker Compose，脚本里可以可选生成 docker-compose.yml。
