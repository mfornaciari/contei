import { build } from './app'

describe('App', () => {
  it('returns JSON', async () => {
    const app = build()

    const response = await app.inject({
      method: 'GET',
      url: '/',
    })

    expect(response.statusCode).toBe(200)
    expect(response.body).toBe(JSON.stringify({ hello: 'world' }))
  })
})
