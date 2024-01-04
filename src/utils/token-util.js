const jwt = require("jsonwebtoken")

const tokenSign = async (user) => {
    const payload = { email: user.email }
    return jwt.sign(
        payload,
        process.env.SECRET_KEY,
        { expiresIn: "180m" }
    )
}

module.exports = { tokenSign }