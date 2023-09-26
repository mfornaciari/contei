import type { FastifyInstance } from 'fastify'
import WebSocket from 'ws'
import { build } from './app'

describe('App', () => {
  let app: FastifyInstance

  beforeAll(async () => {
    app = await build()
    await app.listen({ host: '0.0.0.0', port: 3000 })
  })

  it('returns Connected message', async () => {
    const client = new WebSocket(`ws://0.0.0.0:3000`)
    let resolveHandler: (value: unknown) => void
    const message = new Promise(resolve => {
      resolveHandler = resolve
    })
    client.addEventListener('message', event => {
      resolveHandler(event.data)
      client.close()
    })
    client.addEventListener('open', () => {
      client.send('Test')
    })

    await expect(message).resolves.toBe('Connected')
  })

  afterAll(async () => {
    await app.close()
  })
})
