const userLinkService = require("../services/user-link-service.js")

const addLink = async (req, res, next) => {
    try {
        const user = req.user
        const request = req.body
        const result = await userLinkService.addLink(user, request)
        res.status(200).json({
            message: "Add Link Successfully",
            data: result
        })
    } catch (e) {
        next(e)
    }
}

module.exports = { 
    addLink
}