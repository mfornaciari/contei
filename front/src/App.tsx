import { useEffect, useState } from 'react'
import './App.css'

type Card = {
  number: number
}

type CurrentPlayer = {
  cards: Card[]
  currentPlayer: boolean
  matchId: number
}
type OtherPlayer = {
  currentPlayer: boolean
  numberOfCards: number
  matchId: number
}
type Match = {
  player: CurrentPlayer | null
  openCard: Card | null
  otherPlayers: OtherPlayer[]
}

export function App() {
  const [_client, setClient] = useState<WebSocket | null>(null)
  const [match, setMatch] = useState<Match>({
    player: null,
    openCard: null,
    otherPlayers: [],
  })

  const { player, openCard, otherPlayers } = match

  useEffect(() => {
    let userId = sessionStorage.getItem('userId')
    if (userId == null) {
      const newId = crypto.randomUUID()
      sessionStorage.setItem('userId', newId)
      userId = newId
    }
    const newClient = new WebSocket('ws://localhost:3001', userId)
    newClient.addEventListener('message', event => {
      console.log(event.data)
      setMatch(JSON.parse(event.data))
    })
    setClient(newClient)
    return () => {
      newClient.close()
    }
  }, [])

  const started = player != null && openCard != null && match.otherPlayers.length >= 1

  if (!started)
    return (
      <main>
        <p>Aguardando início da partida...</p>
      </main>
    )

  const otherPlayerCards = otherPlayers.map(otherPlayer => {
    return (
      <ol key={otherPlayer.matchId}>
        {Array(otherPlayer.numberOfCards)
          .fill(1)
          .map((_item, index) => (
            <li key={`${otherPlayer.matchId}-${index}`} className="card" />
          ))}
      </ol>
    )
  })
  const playerCards = (
    <ol>
      {player.cards.map((card, index) => (
        <li key={`${player.matchId}-${index}`} className="card">
          {card.number}
        </li>
      ))}
    </ol>
  )

  return (
    <main>
      {otherPlayerCards}
      {openCard && <div className="card">{openCard.number}</div>}
      {playerCards}
    </main>
  )
}
