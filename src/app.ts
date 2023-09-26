import type { FastifyInstance, FastifyRequest, FastifyServerOptions } from 'fastify'
import type { SocketStream } from '@fastify/websocket'
import fastify from 'fastify'
import fastifyWebsocket from '@fastify/websocket'

export async function build(options: FastifyServerOptions = {}): Promise<FastifyInstance> {
  const app = fastify(options)
  await app.register(fastifyWebsocket)
  app.get('/', { websocket: true }, async (connection: SocketStream, request: FastifyRequest) => {
    connection.socket.on('message', message => {
      connection.socket.send('Connected')
    })
  })
  return await Promise.resolve(app)
}
