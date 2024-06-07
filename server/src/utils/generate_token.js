const jwt = require("jsonwebtoken")

const generateAccessToken = async (user) => {
    const payload = { id: user.id, email: user.email }
    return jwt.sign(
        payload,
        process.env.SECRET_KEY,
        { expiresIn: "7d" }
    )
}

module.exports = generateAccessToken
