import type { WebSocket } from 'ws'
import type { FastifyInstance, FastifyServerOptions } from 'fastify'
import type { Card } from './cards'
import fastify from 'fastify'
import fastifyWebsocket from '@fastify/websocket'
import { buildPlayer } from './buildPlayer'
import { cards } from './cards'
import { serializeMatch } from './serializeMatch'

declare module 'fastify' {
  interface Session {
    playerId?: number
  }
}

export type Player = {
  id: string
  matchId: number
  cards: Card[]
  socket: WebSocket
  currentPlayer: boolean
  isAlive: boolean
}

export type Match = {
  players: Player[]
  openCard: Card
}

const shuffledCards = cards.sort(() => Math.random() - 0.5)
const openCard = shuffledCards.splice(0, 1)[0]
let match: Match = {
  players: [],
  openCard: openCard,
}
let matchId = 1

export async function build(options: FastifyServerOptions = {}): Promise<FastifyInstance> {
  const app = fastify(options)
  await app.register(fastifyWebsocket)

  app.get('/', { websocket: true }, (connection, request) => {
    const userId = request.headers['sec-websocket-protocol']
    if (userId == null) return

    for (const player of match.players) {
      if (player.id === userId) player.socket.terminate()
    }

    const socket = connection.socket
    const existingPlayer = match.players.find(player => player.id === userId)
    if (existingPlayer == null) {
      addPlayer(socket, userId)
    } else {
      existingPlayer.socket = socket
    }

    for (const player of match.players) {
      const playerSocket = player.socket
      const payload = serializeMatch(player, match)
      playerSocket.send(JSON.stringify(payload))
    }
  })

  return await Promise.resolve(app)
}

function addPlayer(socket: WebSocket, userId: string) {
  const currentPlayer = match.players.length === 0
  const newPlayer = buildPlayer({
    cards: shuffledCards,
    matchId,
    currentPlayer,
    socket,
    userId,
  })
  matchId += 1
  match.players.push(newPlayer)

  socket.on('pong', () => {
    newPlayer.isAlive = true
  })
  setInterval(() => {
    if (!newPlayer.isAlive) {
      match.players = match.players.filter(player => player.id !== newPlayer.id)
      return socket.terminate()
    }
    newPlayer.isAlive = false
    socket.ping()
  }, 30000)
}
