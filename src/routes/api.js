const express = require("express")
const { authMiddleware } = require("../middlewares/auth-middleware.js")
const userController = require("../controllers/user-controller.js")

const privateRouter = new express.Router()

privateRouter.use(authMiddleware)

privateRouter.get('/api/users/me', userController.get)
privateRouter.patch('/api/users/me', userController.upload, userController.update)
privateRouter.post('/api/users/me/change-password', userController.changePassword)

module.exports = { privateRouter }