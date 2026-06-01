import { Elysia, t } from 'elysia'

import { db } from '../db'

export const userRoutes = new Elysia({ prefix: '/users' })
  .get(
    '/',
    () =>
      db
        .selectFrom('users')
        .select(['id', 'email', 'name', 'created_at'])
        .orderBy('id', 'desc')
        .execute(),
    {
      detail: {
        summary: 'List users',
        tags: ['Users'],
      },
    },
  )
  .post(
    '/',
    async ({ body, set }) => {
      const user = await db
        .insertInto('users')
        .values(body)
        .returning(['id', 'email', 'name', 'created_at'])
        .executeTakeFirstOrThrow()

      set.status = 201

      return user
    },
    {
      body: t.Object({
        email: t.String({ format: 'email' }),
        name: t.String({ minLength: 1 }),
      }),
      detail: {
        summary: 'Create user',
        tags: ['Users'],
      },
    },
  )
