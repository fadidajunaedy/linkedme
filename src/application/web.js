const cors = require('cors')
const express = require("express")
const cookieParser = require("cookie-parser")
const { config } = require("dotenv")
const { dbConnect } = require("./database.js")
const { errorMiddleware } = require("../middlewares/error-middleware.js")
const { publicRouter } = require("../routes/public-api.js")
const { privateRouter } = require("../routes/api.js")

config()
dbConnect()

const web = express()

web.use(express.json())
web.use(express.urlencoded({ extended: true }))
web.use(
    cors({
      origin: ["http://localhost:5173"],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true,
    })
)

web.use(publicRouter)
web.use(privateRouter)

web.use(errorMiddleware)

module.exports = { web }