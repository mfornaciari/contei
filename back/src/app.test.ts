import type { Data } from 'ws'
import type { FastifyInstance } from 'fastify'
import WebSocket from 'ws'
import { build } from './app'

describe('App', () => {
  let app: FastifyInstance

  beforeAll(async () => {
    app = await build()
    await app.listen({ host: '0.0.0.0', port: 3000 })
  })

  it('Sends message to connected clients', async () => {
    const client1 = new WebSocket('ws://0.0.0.0:3000')
    const client2 = new WebSocket('ws://0.0.0.0:3000')
    const client3 = new WebSocket('ws://0.0.0.0:3000')
    let resolveHandler2: (value: Data) => void
    let resolveHandler3: (value: Data) => void
    const message2 = new Promise(resolve => {
      resolveHandler2 = resolve
    })
    const message3 = new Promise(resolve => {
      resolveHandler3 = resolve
    })
    client2.addEventListener('message', event => {
      resolveHandler2(event.data)
      client1.close()
      client2.close()
    })
    client3.addEventListener('message', event => {
      resolveHandler3(event.data)
      client3.close()
    })
    client3.addEventListener('open', () => {
      client1.send('Test')
    })

    await expect(message2).resolves.toBe('Test')
    await expect(message3).resolves.toBe('Test')
  })

  afterAll(async () => {
    await app.close()
  })
})
