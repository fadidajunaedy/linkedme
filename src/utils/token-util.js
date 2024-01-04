const jwt = require("jsonwebtoken")

const tokenSign = async (user) => {
    const payload = { _id: user._id, email: user.email }
    return jwt.sign(
        payload,
        process.env.SECRET_KEY,
        { expiresIn: "180m" }
    )
}

const verifyToken = async (token) => {
    try {
      return jwt.verify(token, process.env.SECRET_KEY)
    } catch (e) {
      return null
    }
}

module.exports = { tokenSign, verifyToken }