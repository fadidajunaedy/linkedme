const User = require("../models/user-model.js")
const { verifyToken } = require("../utils/token-util.js")

const authMiddleware = async (req, res, next) => {
    try {
        const authorization = req.get('authorization')
        let token = ''
        if (authorization && authorization.toLowerCase().startsWith('bearer')) {
          token = authorization.substring(7)
        }
        const decodedToken = await verifyToken(token)
        const user = await User.findOne({ _id: decodedToken._id })

        !user && res.status(401).send({ errors: "Unauthorized" }).end()

        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ errors: "Token missing or invalid" }).end()
    }
}


module.exports = { authMiddleware }