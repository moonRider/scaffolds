export const config = {
  port: Number(Bun.env.PORT || 3000),
  databaseUrl: Bun.env.DATABASE_URL,
}
