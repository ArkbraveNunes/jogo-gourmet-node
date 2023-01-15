require('custom-env').env(true)

const express = require('express')
const cors = require('cors')

const app = express()

const helmet = require('helmet')
const Logger = require('./utils/logger')
const Router = require('./routes/routes')

module.exports = class Launcher {
  constructor() {
    this.port = process.env.PORT
    app.use(express.json())
    app.use(helmet())
    app.use(cors())
    app.use(Router.initialize())
  }

  start() {
    app
      .listen(this.port, () => Logger.info(`Listening at http://localhost:${this.port}`))
      .on('error', (err) => Logger.error(`Err: Error listen server: ${err}`))
  }
}
