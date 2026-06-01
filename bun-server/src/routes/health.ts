import { Elysia } from 'elysia'

export const healthRoutes = new Elysia({ prefix: '/health' }).get(
  '/',
  () => ({
    ok: true,
    uptime: process.uptime(),
  }),
  {
    detail: {
      summary: 'Health check',
      tags: ['System'],
    },
  },
)
