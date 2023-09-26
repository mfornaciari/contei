import type { FastifyInstance } from 'fastify'
import WebSocket from 'ws'
import { build } from './app'

describe('App', () => {
  let app: FastifyInstance

  beforeAll(async () => {
    app = await build()
    await app.listen({ host: '0.0.0.0', port: 3000 })
  })

  it('returns Connected message', done => {
    const client = new WebSocket(`ws://0.0.0.0:3000`)

    client.addEventListener('open', () => {
      client.send('Test')
    })

    client.addEventListener('message', event => {
      expect(event.data).toBe('Connected')
      client.close()
    })
    client.addEventListener('close', event => {
      done()
    })
  })

  afterAll(async () => {
    await app.close()
  })
})
