const mongoose = require('mongoose')
const { logger } = require('./logging.js')

const dbConnect = () => {
    mongoose.connect(process.env.DB)

    mongoose.connection.on("connected", () => {
        logger.info("Connected to database sucessfully")        
    })

    mongoose.connection.on("error", (err) => {
        logger.error(err)
    })

    mongoose.connection.on("disconnected", () => {
        logger.warn("Mongodb connection disconnected")
    })
}

module.exports = { dbConnect }