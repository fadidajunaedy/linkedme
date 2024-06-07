const bcrypt = require("bcryptjs")
const { config } = require("dotenv")

config()

const hashPassword = (password) => {
    return bcrypt.hashSync(password, 8)
}

const comparePassword = (password, passwordHash) => {
    return bcrypt.compare(password, passwordHash)
}

module.exports ={
    hashPassword,
    comparePassword
}