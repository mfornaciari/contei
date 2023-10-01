import { build } from './app'

build()
  .then(app => {
    app.listen({ host: '0.0.0.0', port: 3001 }, (error, _address) => {
      if (error != null) {
        app.log.error(error)
        process.exit(1)
      }
    })
  })
  .catch(error => {
    console.log(error)
  })
