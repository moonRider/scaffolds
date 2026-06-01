import { describe, expect, it } from 'bun:test'

describe('health route', () => {
  it('returns service status', async () => {
    Bun.env.DATABASE_URL ||= 'postgres://postgres:postgres@localhost:5432/app_test'

    const { app } = await import('../src/server')
    const response = await app.handle(new Request('http://localhost/health'))

    expect(response.status).toBe(200)
    expect(await response.json()).toMatchObject({ ok: true })
  })
})
