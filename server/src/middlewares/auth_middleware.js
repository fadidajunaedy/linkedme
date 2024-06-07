const jwt = require("jsonwebtoken")
const { User } = require("../application/database.js")

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: "Unauthorized" }).end()
        return
    }

    const token = authHeader.substring(7)

    if (!token) {
        res.status(401).json({ error: "Unauthorized" }).end()
    } else {
        try {
            const decodedAccessToken = jwt.verify(token, process.env.SECRET_KEY)
            const user = await User.findOne({ 
                where: { 
                    id: decodedAccessToken.id, 
                    email: decodedAccessToken.email 
                } 
            })
            if (!user) {
                res.status(401).send({ error: "Unauthorized" }).end()
            } else {
                req.user = user
                next()
            }
        } catch (err) {
            console.error("Error verifying JWT token:", err.message)
            res.status(401).json({ error: "Unauthorized" }).end()
        }
    }
}

module.exports = authMiddleware