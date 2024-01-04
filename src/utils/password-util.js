const bcrypt = require("bcrypt")

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(Number(process.env.SALT))
    return await bcrypt.hash(password, salt)
}

const verifyPassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword)
}

module.exports = { hashPassword, verifyPassword }