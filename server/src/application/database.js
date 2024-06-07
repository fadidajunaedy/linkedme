const logger = require("./logging.js")
const { Sequelize, DataTypes } = require('sequelize')
const { config } = require("dotenv")

config()

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "mysql",
        logging: (message) => logger.info(message),
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000

        }
    }
)

sequelize.authenticate()
.then(() => {
    logger.info('Connection has been established successfully.')
    console.info('Connection has been established successfully.')
})
.catch(err => {
    logger.error('Unable to connect to the database:', err)
    console.error('Unable to connect to the database:', err)
})

const User = require("./../models/user_model.js")(sequelize, DataTypes)
const Link = require("./../models/links_model.js")(sequelize, DataTypes)

User.hasOne(Link, { foreignKey: 'email', sourceKey: 'email' })
Link.belongsTo(User, { foreignKey: 'email', targetKey: 'email' })

sequelize.sync({ force: false }).then(() => {
    logger.info('Models synced with database.')
    console.log('Models synced with database.')
}).catch(err => {
    logger.error('Error syncing models with database:', err.message)
    console.error('Error syncing models with database:', err.message)
})

module.exports = {
    User,
    Link
}