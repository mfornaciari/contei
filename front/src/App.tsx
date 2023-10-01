import type { FormEvent } from 'react'
import { useState } from 'react'

export function App() {
  const [text, setText] = useState<string>('Contei')
  const client = new WebSocket('ws://localhost:3001')
  client.addEventListener('message', event => setText(event.data))

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    client.send(event.currentTarget.message.value)
  }

  return (
    <main>
      <p>{text}</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="message">Mensagem</label>
        <input name="message" />

        <button>Enviar</button>
      </form>
    </main>
  )
}
