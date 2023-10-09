import type { WebSocket } from 'ws'
import type { Card } from './cards'
import type { Player } from './app'

type BuildPlayerArgs = {
  cards: Card[]
  currentPlayer: boolean
  matchId: number
  socket: WebSocket
  userId: string
}

export function buildPlayer({ cards, currentPlayer, matchId, socket, userId }: BuildPlayerArgs): Player {
  const playerCards = cards.splice(0, 7)
  return {
    id: userId,
    matchId,
    cards: playerCards,
    socket,
    isAlive: true,
    currentPlayer,
  }
}