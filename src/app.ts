import type { FastifyInstance, FastifyServerOptions } from 'fastify'
import Fastify from 'fastify'

export function build(options: FastifyServerOptions = {}): FastifyInstance {
  const app = Fastify(options)
  app.get('/', (_request, _response) => {
    return { hello: 'world' }
  })
  return app
}
