const express = require("express")
const cors = require('cors')
const { publicRouter } = require("../route/public-api.js")
const { privateRouter } = require("../route/api.js")
const { config } = require("dotenv")
const path = require('path')
const errorMiddleware = require("../middlewares/error_middleware.js")

config()

const web = express()

web.use(express.json())
web.use(express.urlencoded({ extended: true }))
web.use(
    cors({
      setHeader: {
        Authorization: "Bearer "
      },
      origin: ["http://localhost:5173"],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true,
    })
)
web.use('/files', express.static('files'))
web.get('/download/*', function(req, res) {
  try {
    let file = req.params[0]
    let fileLocation = path.resolve('./files', file);
    res.setHeader('Content-Disposition', 'attachment');
    return res.sendFile(fileLocation);
  } catch (error) {
    return res.status(500).send({ error: true, message: error.message })
  }
})

web.use(publicRouter)
web.use(privateRouter)
web.use(errorMiddleware)

module.exports = web