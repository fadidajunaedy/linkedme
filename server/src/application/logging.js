const winston = require("winston")
const path = require("path")

const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: path.join('logs', 'error.log'), level: 'error', timestamp: true }),
        new winston.transports.File({ filename: path.join('logs', 'info.log'), level: 'info', timestamp: true }),
        new winston.transports.File({ filename: path.join('logs', 'query.log'), level: 'query', timestamp: true }),
        new winston.transports.File({ filename: path.join('logs', 'warning.log'), level: 'warn', timestamp: true }),
        new winston.transports.File({ filename: path.join('logs', 'combined.log'), timestamp: true }),
        new winston.transports.Console({ filename: path.join('logs', 'error.log'), level: 'error', timestamp: true }),
        new winston.transports.Console({ filename: path.join('logs', 'info.log'), level: 'info', timestamp: true })
    ]
})

module.exports = logger