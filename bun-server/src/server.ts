import { openapi } from '@elysia/openapi'
import { Elysia } from 'elysia'

import { config } from './config'
import { healthRoutes } from './routes/health'
import { userRoutes } from './routes/users'

export const app = new Elysia()
  .use(
    openapi({
      documentation: {
        info: {
          title: '/* @echo name */ API',
          version: '0.0.0',
        },
      },
    }),
  )
  .use(healthRoutes)
  .use(userRoutes)

if (import.meta.main) {
  app.listen(config.port)

  console.log(`Server is running at http://localhost:${config.port}`)
  console.log(
    `OpenAPI documentation is available at http://localhost:${config.port}/openapi`,
  )
}

export type App = typeof app
