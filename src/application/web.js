const express = require("express")
const { config } = require("dotenv")
const { dbConnect } = require("./database.js")

config()
dbConnect()

const web = express()

web.use(express.json())
web.use(express.urlencoded({ extended: true }))

module.exports = { web }