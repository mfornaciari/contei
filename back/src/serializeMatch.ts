import type { Match, Player } from './app'
import type { Card } from './cards'

type SerializedMatch = {
  player: CurrentPlayer
  openCard: Card
  otherPlayers: OtherPlayer[]
}
type CurrentPlayer = {
  cards: Card[]
  matchId: number
  currentPlayer: boolean
}
type OtherPlayer = {
  currentPlayer: boolean
  matchId: number
  numberOfCards: number
}

export function serializeMatch(thisPlayer: Player, match: Match): SerializedMatch {
  const { id: _id, isAlive: _isAlive, socket: _socket, ...player } = thisPlayer

  const otherPlayers = match.players.filter(player => player.id !== thisPlayer.id)
  const serializedOtherPlayers = otherPlayers.map(player => {
    const { cards, currentPlayer, matchId } = player
    return { currentPlayer, matchId, numberOfCards: cards.length }
  })

  return { player, openCard: match.openCard, otherPlayers: serializedOtherPlayers }
}
