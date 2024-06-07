const linkService = require("../services/link_service.js")

const create = async (req, res, next) => {
    try {
        const user = req.user
        const request = req.body
        const result = await linkService.create(user, request)
        res.status(200).json({
            success: true,
            message: "Create user's link success",
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const update = async (req, res, next) => {
    try {
        const user = req.user
        const request = req.body
        const result = await linkService.update(user, request)
        res.status(200).json({
            success: true,
            message: "Update user's link success",
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const get = async (req, res, next) => {
    try {
        const user = req.user
        const result = await linkService.get(user)
        res.status(200).json({
            success: true,
            message: "Get user's link success",
            data: result
        })
    } catch (e) {
        next(e)
    }
}

module.exports = {
    create,
    update,
    get
}