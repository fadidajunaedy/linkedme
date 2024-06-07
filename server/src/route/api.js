const express = require("express")
const authMiddleware = require("../middlewares/auth_middleware.js")

const userController = require("../controllers/user_controller.js")
const linkController = require("../controllers/link_controller.js")

const privateRouter = new express.Router()

privateRouter.use(authMiddleware)

privateRouter.get('/api/users/me', userController.get)
privateRouter.patch('/api/users/me', userController.update)
privateRouter.post('/api/users/me/change-password', userController.changePassword)

privateRouter.post('/api/links', linkController.create)
privateRouter.patch('/api/links', linkController.update)
privateRouter.get('/api/links/me', linkController.get)

module.exports = { privateRouter }