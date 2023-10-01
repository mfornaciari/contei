import type { FastifyInstance, FastifyRequest, FastifyServerOptions } from 'fastify'
import type { SocketStream } from '@fastify/websocket'
import fastify from 'fastify'
import fastifyWebsocket from '@fastify/websocket'

export async function build(options: FastifyServerOptions = {}): Promise<FastifyInstance> {
  const app = fastify(options)
  await app.register(fastifyWebsocket)
  app.get('/', { websocket: true }, (connection: SocketStream, _request: FastifyRequest) => {
    const socket = connection.socket
    socket.on('message', message => {
      for (const client of app.websocketServer.clients) {
        if (client.readyState === 1) client.send(message.toString())
      }
    })
  })
  return await Promise.resolve(app)
}
