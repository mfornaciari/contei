import type { FastifyInstance } from 'fastify'
import { WebSocket } from 'ws'
import { build } from './app'

describe('build', () => {
  let app: FastifyInstance

  beforeAll(async () => {
    app = await build()
    await app.listen({ host: '0.0.0.0', port: 3001 })
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('Sends message to clients upon connection', async () => {
    const user1Id = crypto.randomUUID()
    const user2Id = crypto.randomUUID()
    const user1Client = new WebSocket('ws://0.0.0.0:3001', user1Id)
    const user2Client = new WebSocket('ws://0.0.0.0:3001', user2Id)

    let resolveHandler1: (value: string) => void
    const message1 = new Promise<string>(resolve => {
      resolveHandler1 = resolve
    })
    let resolveHandler2: (value: string) => void
    const message2 = new Promise<string>(resolve => {
      resolveHandler2 = resolve
    })
    user1Client.on('message', event => {
      resolveHandler1(event.toString())
      user1Client.terminate()
    })
    user2Client.on('message', event => {
      resolveHandler2(event.toString())
      user2Client.terminate()
    })

    const user1Match = await message1
    const user1ParsedMatch = JSON.parse(user1Match)
    const user2Match = await message2
    const user2ParsedMatch = JSON.parse(user2Match)

    expect(user1ParsedMatch.player.matchId).toBe(1)
    expect(user1ParsedMatch.player.cards.length).toBe(7)
    expect(user1ParsedMatch.player.currentPlayer).toBe(true)
    expect(user2ParsedMatch.player.matchId).toBe(2)
    expect(user2ParsedMatch.player.cards.length).toBe(7)
    expect(user2ParsedMatch.player.currentPlayer).toBe(false)
    expect(user2ParsedMatch.otherPlayers.length).toBe(1)
    expect(user2ParsedMatch.otherPlayers[0].matchId).toBe(1)
  })
})
