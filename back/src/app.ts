import type { WebSocket } from 'ws'
import type { FastifyInstance, FastifyServerOptions } from 'fastify'
import type { Card } from './cards'
import fastify from 'fastify'
import fastifyWebsocket from '@fastify/websocket'
import { buildPlayer } from './buildPlayer'
import { cards } from './cards'
import { serializeMatch } from './serializeMatch'

export type Match = {
  players: Player[]
  openCard: Card
}
export type Player = {
  id: string
  matchId: number
  cards: Card[]
  socket: WebSocket
  currentPlayer: boolean
  isAlive: boolean
}

const shuffledCards = cards.sort(() => Math.random() - 0.5)
const openCard = shuffledCards.splice(0, 1)[0]
const match: Match = {
  players: [],
  openCard,
}
let matchId = 1

export async function build(options: FastifyServerOptions = {}): Promise<FastifyInstance> {
  const app = fastify(options)
  await app.register(fastifyWebsocket)

  app.get('/', { websocket: true }, (connection, request) => {
    const socket = connection.socket
    const userId = request.headers['sec-websocket-protocol']

    if (userId == null) {
      socket.terminate()
      return
    }

    for (const player of match.players) {
      if (player.id === userId) player.socket.terminate()
    }

    const existingPlayer = match.players.find(player => player.id === userId)
    if (existingPlayer == null) {
      addPlayer(socket, userId)
    } else {
      existingPlayer.socket = socket
    }

    for (const player of match.players) sendMatch(player)
  })

  return await Promise.resolve(app)
}

function addPlayer(socket: WebSocket, userId: string): void {
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

  startHeartbeat(newPlayer)
  socket.on('pong', () => {
    newPlayer.isAlive = true
  })
}

function startHeartbeat(player: Player): void {
  const socket = player.socket
  setInterval(() => {
    if (!player.isAlive) {
      match.players = match.players.filter(matchPlayer => matchPlayer.id !== player.id)
      socket.terminate()
      return
    }
    player.isAlive = false
    socket.ping()
  }, 30000)
}

function sendMatch(player: Player): void {
  const payload = serializeMatch(player, match)
  player.socket.send(JSON.stringify(payload))
}
