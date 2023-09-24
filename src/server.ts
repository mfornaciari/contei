import { build } from './app'

const server = build()

server.listen({ port: 3000 }, (error, _address) => {
  if (error != null) {
    server.log.error(error)
    process.exit(1)
  }
})
